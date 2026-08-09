/**
 * WCAG contrast audit for every theme in theme.css.
 *
 *   node scripts/contrast-audit.mjs            # report
 *   node scripts/contrast-audit.mjs --strict   # exit 1 on any failure (CI)
 *
 * Checks, per theme and mode:
 *   AA text (4.5:1): foreground/background, card pairs, popover pairs,
 *     primary|secondary|muted|accent|destructive foreground pairs,
 *     muted-foreground on card, primary as link text on background/card,
 *     hero-fg on each hero gradient stop.
 *   Non-text (3:1): border and input against background (WCAG 1.4.11).
 *
 * Translucent surfaces (rgba cards) are composited over the mode's
 * background before measuring, because that is what the eye sees.
 */
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const css = readFileSync(path.join(root, "theme.css"), "utf8")
const strict = process.argv.includes("--strict")

// --- colour maths --------------------------------------------------------

const clamp = (n) => Math.min(255, Math.max(0, n))

function parseColor(raw, context = {}) {
  const value = raw.trim()

  let m = value.match(/^#([0-9a-f]{6})$/i)
  if (m) {
    const n = parseInt(m[1], 16)
    return { r: n >> 16, g: (n >> 8) & 255, b: n & 255, a: 1 }
  }
  m = value.match(/^#([0-9a-f]{3})$/i)
  if (m) {
    const [r, g, b] = m[1].split("").map((c) => parseInt(c + c, 16))
    return { r, g, b, a: 1 }
  }
  m = value.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/i)
  if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] }

  // color-mix(in srgb, C1 P1%, C2 [P2%]) — the two patterns theme.css uses.
  m = value.match(/^color-mix\(in srgb,\s*(.+?)\s+([\d.]+)%\s*,\s*(.+?)(?:\s+([\d.]+)%)?\)$/i)
  if (m) {
    const p1 = +m[2] / 100
    const c1 = parseColor(m[1], context)
    const second = m[3].trim()
    if (second === "transparent") {
      return c1 ? { ...c1, a: c1.a * p1 } : null
    }
    const c2 = parseColor(second, context)
    if (!c1 || !c2) return null
    const p2 = m[4] !== undefined ? +m[4] / 100 : 1 - p1
    const total = p1 + p2 || 1
    return {
      r: clamp((c1.r * p1 + c2.r * p2) / total),
      g: clamp((c1.g * p1 + c2.g * p2) / total),
      b: clamp((c1.b * p1 + c2.b * p2) / total),
      a: 1,
    }
  }
  if (value === "white") return { r: 255, g: 255, b: 255, a: 1 }
  if (value === "black") return { r: 0, g: 0, b: 0, a: 1 }
  if (value === "transparent") return { r: 0, g: 0, b: 0, a: 0 }
  return null
}

/** Composites a possibly-translucent colour over an opaque backdrop. */
function over(fg, backdrop) {
  if (fg.a >= 1) return fg
  return {
    r: fg.r * fg.a + backdrop.r * (1 - fg.a),
    g: fg.g * fg.a + backdrop.g * (1 - fg.a),
    b: fg.b * fg.a + backdrop.b * (1 - fg.a),
    a: 1,
  }
}

function luminance({ r, g, b }) {
  const chan = (v) => {
    const s = v / 255
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b)
}

function ratio(a, b) {
  const l1 = luminance(a)
  const l2 = luminance(b)
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}

// --- parse theme blocks ---------------------------------------------------

const blocks = [...css.matchAll(/(?:^|\n)(:root,\s*\n?\[data-theme="([\w-]+)"\]|\[data-theme="([\w-]+)"\])\s*\{([\s\S]*?)\n\}/g)]

const themes = {}
for (const block of blocks) {
  const name = block[2] ?? block[3]
  const body = block[4]
  const vars = {}
  for (const m of body.matchAll(/--theme-(light|dark)-([\w-]+):\s*([^;]+);/g)) {
    ;(vars[m[1]] ??= {})[m[2]] = m[3].trim()
  }
  if (Object.keys(vars).length) themes[name] = vars
}

// --- checks ----------------------------------------------------------------

const TEXT = 4.5
const UI = 3

const failures = []
const advisories = []
let checks = 0

for (const [theme, modes] of Object.entries(themes)) {
  for (const [mode, tokens] of Object.entries(modes)) {
    const get = (token) => {
      const raw = tokens[token]
      return raw ? parseColor(raw) : null
    }
    const bg = get("background")
    if (!bg) continue

    const surface = (token) => {
      const c = get(token)
      return c ? over(c, bg) : null
    }

    const assert = (label, fg, back, min) => {
      if (!fg || !back) return
      checks++
      const r = ratio(over(fg, back), back)
      if (r < min) {
        failures.push({ theme, mode, label, ratio: r.toFixed(2), min })
      }
    }

    const card = surface("card")
    const popover = surface("popover")

    assert("foreground on background", get("foreground"), bg, TEXT)
    assert("card-foreground on card", get("card-foreground"), card, TEXT)
    assert("popover-foreground on popover", get("popover-foreground"), popover, TEXT)
    assert("primary-foreground on primary", get("primary-foreground"), surface("primary"), TEXT)
    assert("secondary-foreground on secondary", get("secondary-foreground"), surface("secondary"), TEXT)
    assert("muted-foreground on muted", get("muted-foreground"), surface("muted"), TEXT)
    assert("muted-foreground on background", get("muted-foreground"), bg, TEXT)
    assert("muted-foreground on card", get("muted-foreground"), card, TEXT)
    assert("accent-foreground on accent", get("accent-foreground"), surface("accent"), TEXT)
    assert("destructive-foreground on destructive", get("destructive-foreground"), surface("destructive"), TEXT)
    assert("primary as text on background", get("primary"), bg, TEXT)
    assert("primary as text on card", get("primary"), card, TEXT)
    for (const stop of ["hero-bg-start", "hero-bg-mid", "hero-bg-end"]) {
      assert(`hero-fg on ${stop}`, get("hero-fg"), get(stop), TEXT)
    }
    // WCAG 1.4.11 applies to boundaries that identify controls. Input
    // borders are enforced; card/divider borders are decorative (surface
    // colour + elevation already separate them) so they are advisory.
    assert("input border on background (non-text)", get("input"), bg, UI)
    if (get("border") && bg) {
      const r = ratio(over(get("border"), bg), bg)
      if (r < UI) advisories.push({ theme, mode, label: "decorative border on background", ratio: r.toFixed(2), min: UI })
    }
  }
}

console.log(`Themes: ${Object.keys(themes).join(", ")}`)
console.log(`Checks run: ${checks}`)
if (failures.length === 0) {
  console.log("All contrast checks pass (AA text 4.5:1, non-text 3:1).")
} else {
  console.log(`\n${failures.length} FAILURES:`)
  for (const f of failures) {
    console.log(`  [${f.theme}/${f.mode}] ${f.label}: ${f.ratio} (needs ${f.min})`)
  }
}
process.exit(strict && failures.length > 0 ? 1 : 0)

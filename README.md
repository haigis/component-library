# @haigis/component-library

Mark's React component library, built with Tailwind CSS v4, [class-variance-authority](https://cva.style/), and Radix primitives. Bundled with [tsup](https://tsup.egoist.dev/) as ESM + CJS with TypeScript declarations.

**Exports:** `Button`, `Card` (+ `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`), `SplitFeatureCard`, `ImageCard`, `PageLane`, `SectionIntro`, plus the helpers `cn`, `buttonVariants`, `cardVariants`, `cardClass`, `shellClass`, `gridClass`, `laneClass`.

---

## Installation

### Option A — straight from GitHub (simplest)

```sh
npm install github:haigis/component-library
```

The `prepare` script builds `dist/` automatically on install. No registry setup needed.

### Option B — from GitHub Packages

Add to your project's `.npmrc`:

```
@haigis:registry=https://npm.pkg.github.com
```

Then:

```sh
npm install @haigis/component-library
```

(Requires the package to be published — see [Publishing](#publishing) — and a GitHub token with `read:packages` for private access.)

`react` and `react-dom` (18 or 19) are peer dependencies — your app provides them.

---

## Required setup in the consuming app

The components are styled with Tailwind utility classes and shadcn-style design tokens. Two things must be true in the consuming app:

### 1. Tell Tailwind to scan the package

In your CSS entry (Tailwind v4):

```css
@import "tailwindcss";
@source "../node_modules/@haigis/component-library/dist";
```

Without the `@source` line, Tailwind won't generate the classes the components use and they will render unstyled.

### 2. Define the design tokens

The components reference tokens like `bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring`. Define them once per project — this is what makes the library themeable. A complete working starting point:

```css
:root {
    --background: oklch(0.985 0.002 250);
    --foreground: oklch(0.2 0.02 260);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.2 0.02 260);
    --primary: oklch(0.55 0.2 262);
    --primary-foreground: oklch(0.98 0.005 260);
    --secondary: oklch(0.94 0.01 260);
    --secondary-foreground: oklch(0.3 0.03 260);
    --muted: oklch(0.955 0.005 260);
    --muted-foreground: oklch(0.5 0.02 260);
    --accent: oklch(0.7 0.15 200);
    --accent-foreground: oklch(0.2 0.02 260);
    --destructive: oklch(0.55 0.2 25);
    --destructive-foreground: oklch(0.98 0.005 25);
    --border: oklch(0.9 0.008 260);
    --input: oklch(0.88 0.008 260);
    --ring: oklch(0.55 0.2 262);
}

@theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-card: var(--card);
    --color-card-foreground: var(--card-foreground);
    --color-primary: var(--primary);
    --color-primary-foreground: var(--primary-foreground);
    --color-secondary: var(--secondary);
    --color-secondary-foreground: var(--secondary-foreground);
    --color-muted: var(--muted);
    --color-muted-foreground: var(--muted-foreground);
    --color-accent: var(--accent);
    --color-accent-foreground: var(--accent-foreground);
    --color-destructive: var(--destructive);
    --color-destructive-foreground: var(--destructive-foreground);
    --color-border: var(--border);
    --color-input: var(--input);
    --color-ring: var(--ring);
}

/* used by Card tone="alt" — style to taste */
.site-card-alt {
    background: linear-gradient(135deg, oklch(0.97 0.01 262), oklch(0.96 0.015 200));
}
```

---

## Components

### Button

cva-based button with `asChild` support via Radix Slot (render any element — e.g. a router `<Link>` — with button styling).

```tsx
import { Button } from "@haigis/component-library"

<Button>Save</Button>
<Button variant="outline" size="lg">Cancel</Button>
<Button variant="destructive" disabled>Delete</Button>
<Button size="icon" aria-label="Search"><SearchIcon /></Button>

// Render a link styled as a button
<Button asChild variant="ghost">
    <Link to="/docs">Docs</Link>
</Button>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "default" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link"` | `"primary"` | `default` is an alias of `primary` |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | `icon` is a square 36px button |
| `asChild` | `boolean` | `false` | Merges props onto the child element instead of rendering a `<button>` |
| …rest | `React.ButtonHTMLAttributes` | | `type` defaults to `"button"` |

`buttonVariants({ variant, size })` is also exported if you need the raw class string.

### Card

Composable card. All slots are optional `<div>`s — compose what you need.

```tsx
import {
    Card, CardHeader, CardTitle, CardDescription,
    CardAction, CardContent, CardFooter, Button,
} from "@haigis/component-library"

<Card tone="elevated">
    <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>Manage your plan and invoices.</CardDescription>
        <CardAction>
            <Button variant="ghost" size="icon" aria-label="More">…</Button>
        </CardAction>
    </CardHeader>
    <CardContent>Content goes here.</CardContent>
    <CardFooter>
        <Button size="sm">Save</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
    </CardFooter>
</Card>
```

Card props:

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `tone` | `"default" \| "alt" \| "muted" \| "elevated"` | `"default"` | `alt` uses the consumer-defined `site-card-alt` class |
| `size` | `"default" \| "sm"` | `"default"` | `p-6` vs `p-4` padding |

`cardClass({ tone, size, className })` returns the card class string for styling your own elements as cards (e.g. `<article className={cardClass()}>`). `cardVariants` is the underlying cva function.

### SplitFeatureCard

Two-panel feature card: intro (title, description, optional link) on the left, clickable icon rows on the right. Stacks vertically below the `lg` breakpoint.

```tsx
import { SplitFeatureCard } from "@haigis/component-library"
import { Zap, ShieldCheck } from "lucide-react"

<SplitFeatureCard
    title="Featured scripts"
    description="Tools for checking pages and reducing repetitive work."
    linkLabel="Browse all toolkits"
    onLinkClick={() => navigate("/toolkits")}
    items={[
        { icon: Zap, label: "Fast", body: "Quick checks.", onClick: () => navigate("/fast") },
        { icon: ShieldCheck, label: "Safe", body: "Validated output." },
    ]}
/>
```

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | `string` | yes | |
| `description` | `string` | yes | |
| `items` | `SplitFeatureCardItem[]` | yes | `{ icon, label, body, onClick? }` — `icon` is any component accepting `className` (lucide icons fit) |
| `linkLabel` | `string` | no | Renders a link-style button with a chevron |
| `onLinkClick` | `() => void` | no | |
| `className` | `string` | no | |

### ImageCard

Media card: image area on top (any `ReactNode` — an `<img>`, a gradient div, a mini illustration), then eyebrow, title, body, and an optional outline action button.

```tsx
import { ImageCard } from "@haigis/component-library"

<ImageCard
    eyebrow="Navigation"
    title="AEM navigation toolkit"
    body="Check menus, hierarchy, breadcrumbs, and redirects."
    actionLabel="View tools"
    onAction={() => navigate("/nav")}
    image={<img src="/nav.png" alt="" className="h-full w-full object-cover" />}
/>
```

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | `string` | yes | |
| `body` | `string` | yes | |
| `eyebrow` | `string` | no | Small primary-colored label above the title |
| `actionLabel` | `string` | no | Renders an outline button when set |
| `onAction` | `() => void` | no | |
| `image` | `ReactNode` | no | Rendered inside a clipped area with a bottom border |
| `imageAspectRatio` | `string` | no (`"16 / 9"`) | Any CSS `aspect-ratio` value |
| `imageClassName` | `string` | no | e.g. a gradient background behind a transparent illustration |
| `className` | `string` | no | |

### PageLane and SectionIntro

Layout primitives: a 12-column grid shell (max-width 1600px) with a centered content lane.

```tsx
import { PageLane, SectionIntro } from "@haigis/component-library"

<PageLane width={10} className="space-y-6">
    <SectionIntro
        id="featured-title"
        title="Featured toolkits"
        description="Key areas of the toolkit."
    />
    {/* section content */}
</PageLane>
```

PageLane: `width` is `8 | 10 | 12` (default `10`) — the number of grid columns the lane spans on `lg+`; always full-width on small screens. SectionIntro: `title` (required), `description`, `id` (for the `<h2>`, useful with `aria-labelledby`).

Raw class helpers for building custom layouts: `shellClass` (max-width + padding), `gridClass` (12-col grid), `laneClass(8 | 10 | 12)` (lane column spans).

### cn

`clsx` + `tailwind-merge`: combines class values and resolves Tailwind conflicts (later classes win).

```tsx
import { cn } from "@haigis/component-library"

<div className={cn("p-4 text-sm", isActive && "bg-primary", className)} />
```

---

## Not (yet) in the library

Nav/header, hero, and footer are currently app-level code in the marks-stack playground, not library components. Candidates for extraction.

---

## Development

```sh
npm install
npm run build   # one-off build to dist/
npm run dev     # rebuild on change
```

Source lives in `src/`, output in `dist/` (gitignored — built on install via `prepare`).

## Publishing

Bump `version` in `package.json`, then:

```sh
npm publish
```

Publishes to GitHub Packages per `publishConfig`; requires a GitHub token with `write:packages` (e.g. `npm login --registry=https://npm.pkg.github.com`).

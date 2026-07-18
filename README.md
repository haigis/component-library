# @haigis/component-library

Mark's React component library, built with Tailwind CSS v4, [class-variance-authority](https://cva.style/), and Radix primitives. Bundled with [tsup](https://tsup.egoist.dev/) as ESM + CJS with TypeScript declarations. Ships its own `theme.css` (design tokens, light + dark, typography, hero styles).

Designed so every component prop is **JSON-serializable** (URLs instead of callbacks, icon names instead of components) — ready to be driven by a CMS such as Payload, where authors or agents compose pages from blocks.

**Site components:** `SiteHeader`, `Hero`, `SiteFooter`
**Content components:** `Button`, `Card` family, `SplitFeatureCard`, `ImageCard`
**Layout:** `PageLane`, `Section`, `SectionIntro`, `CardGrid`
**Helpers:** `cn`, `iconRegistry`/`iconNames`/`resolveIcon`, variant functions, layout class constants

---

## Installation

### Option A — straight from GitHub (simplest)

```sh
npm install github:haigis/component-library
```

The `prepare` script builds `dist/` automatically on install.

### Option B — from GitHub Packages

Add to your project's `.npmrc`:

```
@haigis:registry=https://npm.pkg.github.com
```

Then `npm install @haigis/component-library`. (Requires the package to be published and a GitHub token with `read:packages`.)

`react` and `react-dom` (18 or 19) are peer dependencies — your app provides them.

## Setup (two lines of CSS)

In your app's CSS entry (Tailwind v4 required):

```css
@import "tailwindcss";
@import "@haigis/component-library/theme.css";
@source "../node_modules/@haigis/component-library/dist";
```

- `theme.css` provides the design tokens (light + `.dark` variants), base typography, and the hero/card styles. Override any `--token` in your own `:root` to re-theme a project.
- `@source` tells Tailwind to generate the utility classes the components use. Without it, components render unstyled.
- Dark mode: add class `dark` to `<html>`.

## Full-page example

```tsx
import {
    SiteHeader, Hero, PageLane, Section, CardGrid,
    ImageCard, SplitFeatureCard, SiteFooter,
} from "@haigis/component-library"

const nav = [
    { id: "home", label: "Home", href: "/" },
    { id: "docs", label: "Docs", href: "/docs" },
]

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader brand="Mark's Tools" brandHref="/" items={nav} activeId="home" />

            <div className="flex-1 pb-10">
                <div className="space-y-16">
                    <Hero
                        chip="Adobe AEM authoring tools and scripts"
                        title="Mark's Tools"
                        body="Scripts and utilities for content authoring on Adobe AEM."
                        actions={[
                            { label: "Browse tools", href: "/tools" },
                            { label: "View documentation", href: "/docs", variant: "secondary" },
                        ]}
                    />

                    <PageLane width={10}>
                        <div className="space-y-16">
                            <Section title="Featured toolkits" description="Key areas of the toolkit.">
                                <CardGrid columns={3}>
                                    <ImageCard
                                        eyebrow="Navigation"
                                        title="AEM navigation toolkit"
                                        body="Check menus, hierarchy, breadcrumbs, and redirects."
                                        actionLabel="View tools"
                                        actionHref="/tools/nav"
                                    />
                                    {/* … */}
                                </CardGrid>
                            </Section>
                        </div>
                    </PageLane>
                </div>
            </div>

            <SiteFooter brand="Mark's Design System" tagline="Design system, notes, tools." items={nav} />
        </main>
    )
}
```

---

## Site components

### SiteHeader

Sticky site header: brand, pill-style desktop nav, hamburger menu on mobile with active-item indicator.

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `brand` | `ReactNode` | required | Site name / logo |
| `brandHref` | `string` | | Renders brand as `<a>`; else a `<button>` with `onBrandClick` |
| `onBrandClick` | `() => void` | | |
| `items` | `NavItem[]` | `[]` | `{ id, label, href?, onClick? }` |
| `activeId` | `string` | | Highlights the matching item |
| `width` | `8 \| 10 \| 12` | `10` | Content lane width |

### Hero

Full-width dark gradient hero with glow effects (styles ship in `theme.css`).

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | required | |
| `chip` | `string` | | Pill label above the title |
| `body` | `string` | | |
| `actions` | `HeroAction[]` | | `{ label, href?, onClick?, variant?: "primary" \| "secondary" }` — gradient primary / glass secondary buttons |
| `width` | `8 \| 10 \| 12` | `10` | |
| `titleId` | `string` | | For `aria-labelledby` |

### SiteFooter

| Prop | Type | Default |
| --- | --- | --- |
| `brand` | `ReactNode` | required |
| `tagline` | `string` | |
| `items` | `NavItem[]` | `[]` |
| `width` | `8 \| 10 \| 12` | `10` |

`NavItem`: `{ id: string; label: string; href?: string; onClick?: () => void }` — `href` renders a real `<a>`, otherwise a `<button>`.

## Content components

### Button

cva-based button with `asChild` support via Radix Slot.

```tsx
<Button variant="outline" size="lg">Cancel</Button>
<Button asChild variant="ghost"><Link to="/docs">Docs</Link></Button>
```

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"primary" \| "default" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link" \| "heroPrimary" \| "heroSecondary"` | `"primary"` |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` |
| `asChild` | `boolean` | `false` |

`heroPrimary`/`heroSecondary` are the gradient/glass styles used inside `Hero` (need `theme.css`). `buttonVariants({ variant, size })` exported for raw class strings.

### Card

Composable card. All slots are optional `<div>`s.

```tsx
<Card tone="elevated">
    <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>Manage your plan.</CardDescription>
        <CardAction>…</CardAction>
    </CardHeader>
    <CardContent>…</CardContent>
    <CardFooter>…</CardFooter>
</Card>
```

Card props: `tone` (`"default" | "alt" | "muted" | "elevated"`, `alt` styled by `theme.css`), `size` (`"default" | "sm"`). `cardClass({ tone, size, className })` returns the class string for your own card-like elements.

### SplitFeatureCard

Two-panel feature card: intro + optional link on the left, clickable icon rows on the right. Stacks below `lg`.

```tsx
<SplitFeatureCard
    title="Featured scripts"
    description="Tools for checking pages."
    linkLabel="Browse all toolkits"
    linkHref="/toolkits"
    items={[
        { icon: "compass", label: "Navigation", body: "Menus, breadcrumbs", href: "/nav" },
        { icon: "search", label: "Site search", body: "Indexing, journeys", href: "/search" },
    ]}
/>
```

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `title`, `description` | `string` | yes | |
| `items` | `SplitFeatureCardItem[]` | yes | `{ icon, label, body, href?, onClick? }` — `icon` is a registry name (`"zap"`) or a component |
| `linkLabel` | `string` | no | Link-style button with chevron |
| `linkHref` / `onLinkClick` | | no | `<a>` when `linkHref` set |

### ImageCard

Media card: optional image area (any `ReactNode`), eyebrow, title, body, optional action. Also works image-less as a plain text card.

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | `string` | yes | |
| `body` | `ReactNode` | yes | String or rich content (multiple `<p>`, CMS rich text) |
| `eyebrow` | `string` | no | |
| `actionLabel` | `string` | no | Outline button |
| `actionHref` / `onAction` | | no | `<a>` when `actionHref` set |
| `image` | `ReactNode` | no | |
| `imageAspectRatio` | `string` | no (`"16 / 9"`) | |
| `imageClassName` | `string` | no | e.g. gradient background |

## Layout

- **`PageLane`** — 12-col grid shell (max-width 1600px) with a centered lane: `width` is `8 | 10 | 12` (default `10`).
- **`Section`** — page section: optional `SectionIntro` heading (`title`, `description`, `id`) + children with consistent spacing.
- **`SectionIntro`** — standalone heading block (self-contained typography).
- **`CardGrid`** — responsive card grid: `columns` is `2 | 3` (default `3`); 1 column on mobile.
- Raw class helpers: `shellClass`, `gridClass`, `laneClass(width)`.

## Icons

`lucide-react` icons addressable by name, so a CMS can store icon choices as strings:

- `iconRegistry` — `{ "search": SearchIcon, … }` (~50 common icons)
- `iconNames` — all names, handy for CMS select-field options
- `resolveIcon(nameOrComponent)` — used internally by `SplitFeatureCard`

Anywhere an `icon` prop exists you can pass either `"shield-check"` or a component.

### cn

`clsx` + `tailwind-merge`: `cn("p-4", isActive && "bg-primary", className)`.

---

## Using with Payload CMS

The intended mapping:

- **Globals:** Header → `SiteHeader`, Footer → `SiteFooter` (nav array field ↔ `NavItem[]`)
- **Blocks:** Hero → `Hero`; Section → `Section` (intro fields + nested blocks); FeatureSplit → `SplitFeatureCard` (items array with an icon **select** field fed by `iconNames`); CardGrid → `CardGrid` + `ImageCard` items (upload field → `image`, rich text → `body`)

All props are strings/numbers/arrays — a page document is an array of blocks, and the front-end maps block `type` → component. The whole bundle is marked `"use client"`, so the components drop into a Next.js/Payload front-end directly.

## Development

```sh
npm install
npm run build   # one-off build to dist/
npm run dev     # rebuild on change
```

Source in `src/`, output in `dist/` (gitignored — built on install via `prepare`). Build config in `tsup.config.ts`.

## Publishing

Bump `version` in `package.json`, then `npm publish` (GitHub Packages per `publishConfig`; requires a token with `write:packages`).

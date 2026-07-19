# @haigis/component-library

Mark's React component library, built with Tailwind CSS v4, [class-variance-authority](https://cva.style/), and Radix primitives. Bundled with [tsup](https://tsup.egoist.dev/) as ESM + CJS with TypeScript declarations. Ships its own `theme.css` (semantic design tokens, named colour themes, typography, and component styles).

Designed so every component prop is **JSON-serializable** (URLs instead of callbacks, icon names instead of components) — ready to be driven by a CMS such as Payload, where authors or agents compose pages from blocks.

**Foundations:** `ThemeProvider`, `Heading`, `Text`, `Icon`
**Site components:** `SiteHeader`, `Hero`, `Breadcrumbs`, `SiteFooter`
**Content components:** `Button`, `Card` family, `Banner`, `SplitFeatureCard`, `ImageCard`
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

- `theme.css` provides semantic tokens, four colour themes, light/dark/system modes, base typography, and component styles.
- `@source` tells Tailwind to generate the utility classes the components use. Without it, components render unstyled.
- The legacy `.dark` class remains supported.

## Colour themes

`ThemeProvider` applies the same inherited design tokens to a whole application, one page, or a nested section. Available themes are `indigo`, `ocean`, `forest`, and `coral`; modes are `light`, `dark`, and `system`.

Apply a theme globally in the root layout:

```tsx
import { ThemeProvider } from "@haigis/component-library"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider
                    theme="ocean"
                    mode="system"
                    className="min-h-screen"
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
```

Override it for a page by nesting another provider:

```tsx
export default function CampaignPage() {
    return (
        <ThemeProvider theme="coral" mode="dark" className="min-h-screen">
            <CampaignContent />
        </ThemeProvider>
    )
}
```

The nearest provider wins, so a light page can sit inside a dark application shell. For server-rendered document-level theming, the equivalent attributes are:

```html
<html data-theme="forest" data-color-mode="dark">
```

In Storybook, the palette and mode toolbars apply globally. A story can pin its page theme with `parameters.designTheme`:

```tsx
export const CampaignPage = {
    parameters: {
        designTheme: { theme: "coral", mode: "dark" },
    },
}
```

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

## Typography

`Heading` keeps semantic level separate from visual size:

```tsx
<Heading as="h1" size="display">Page title</Heading>
<Heading as="h2" size="section">Section title</Heading>
<Heading as="h3" size="card">Card title</Heading>
```

| Prop | Options | Default |
| --- | --- | --- |
| `as` | `h1` through `h6` | `h2` |
| `size` | `display`, `page`, `section`, `card`, `subheading`, `inherit` | `section` |
| `tone` | `default`, `hero`, `inherit` | `default` |

`Text` provides reusable prose and label styling:

```tsx
<Text size="lead">Introductory copy.</Text>
<Text size="sm" tone="muted">Supporting copy.</Text>
<Text as="span" size="xs" weight="medium">Label</Text>
```

| Prop | Options | Default |
| --- | --- | --- |
| `as` | `p`, `span`, `div`, `small` | `p` |
| `size` | `lead`, `body`, `sm`, `xs`, `inherit` | `body` |
| `tone` | `default`, `muted`, `primary`, `hero`, `inherit` | `default` |
| `weight` | `normal`, `medium`, `semibold`, `inherit` | `normal` |

The site and content components use these primitives internally while preserving their existing heading hierarchy.

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
| `breadcrumbs` | `BreadcrumbItem[]` | | Breadcrumb trail at the very top of the hero |
| `chip` | `string` | | Pill label above the title |
| `body` | `string` | | |
| `actions` | `HeroAction[]` | | `{ label, href?, onClick?, variant?: "primary" \| "secondary" }` — gradient primary / glass secondary buttons |
| `width` | `8 \| 10 \| 12` | `10` | |
| `titleId` | `string` | | For `aria-labelledby` |

### Breadcrumbs

Breadcrumb trail. The last item is the current page (rendered as text with `aria-current="page"`); earlier items render as links (`href`) or buttons (`onClick`).

The usual placement is at the top of the hero via Hero's `breadcrumbs` prop (which uses `tone="hero"` automatically). Standalone use on a regular page:

```tsx
<Breadcrumbs
    items={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Lorem ipsum dolor" },
    ]}
/>
```

| Prop | Type | Notes |
| --- | --- | --- |
| `items` | `BreadcrumbItem[]` | `{ label, href?, onClick? }` |
| `tone` | `"default" \| "hero"` | `hero` restyles for the dark Hero background |
| `className` | `string` | |

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

### Banner

Horizontal or stacked callout with independent supporting icon, image media, and action placement. `iconPosition` controls only the icon relative to the text; `mediaPosition` controls only image or rich media.

| Prop | Type | Default |
| --- | --- | --- |
| `icon` | `IconProp` | |
| `iconPosition` | `"top" \| "left" \| "right"` | `"top"` |
| `media` | `ReactNode` | |
| `mediaPosition` | `"top" \| "left" \| "right"` | `"left"` |
| `actionPosition` | `"below" \| "left" \| "right"` | `"right"` |
| `tone` | `"default" \| "alt" \| "muted" \| "elevated"` | `"default"` |

Icons and images can be used independently or together. A top icon is placed above the title and aligned to the content edge; it never uses the image media slot.

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

Media card with an optional top image and an optional supporting icon in the content area. Images and icons may be used independently or together; image media stays above the content while `iconPosition` controls the icon relative to the text.

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | `string` | yes | |
| `body` | `ReactNode` | yes | String or rich content (multiple `<p>`, CMS rich text) |
| `icon` | `IconProp` | no | Registry name or icon component |
| `iconPosition` | `"top" \| "left" \| "right"` | no (`"top"`) | Top icons align with the title left edge |
| `eyebrow` | `string` | no | |
| `actionLabel` | `string` | no | Text action with arrow icon |
| `actionHref` / `onAction` | | no | `<a>` when `actionHref` set |
| `image` | `ReactNode` | no | |
| `imageAspectRatio` | `string` | no (`"16 / 9"`) | |
| `imageClassName` | `string` | no | e.g. gradient background |

## Layout

- **`PageLane`** — 12-col grid shell (max-width 1600px) with a centered lane: `width` is `8 | 10 | 12` (default `10`).
- **`Section`** — page section: optional `SectionIntro` heading (`title`, `description`, `id`) + children with consistent spacing.
- **`SectionIntro`** — standalone heading block (self-contained typography).
- **`CardGrid`** — responsive card grid: `columns` is `2 | 3 | 4` (default `3`); 1 column on mobile.
- Raw class helpers: `shellClass`, `gridClass`, `laneClass(width)`.

## Icons

`lucide-react` icons addressable by name, so a CMS can store icon choices as strings:

- `iconRegistry` — `{ "search": SearchIcon, … }` (~50 common icons)
- `iconNames` — all names, handy for CMS select-field options
- `resolveIcon(nameOrComponent)` — used internally by `SplitFeatureCard`

Anywhere an `icon` prop exists you can pass either `"shield-check"` or a component.

Icons are decorative by default. Pass `label` to `Icon` when a standalone icon conveys information that is not also present in text.

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
npm run dev             # rebuild the package on change
npm run storybook       # component workshop at localhost:6006
npm run build-storybook # static Storybook build
```

Source in `src/`, output in `dist/` (gitignored — built on install via `prepare`). Build config in `tsup.config.ts`.

## Publishing

Bump `version` in `package.json`, then `npm publish` (GitHub Packages per `publishConfig`; requires a token with `write:packages`).

# @haigis/component-library

Mark's React component library, built with Tailwind CSS v4, [class-variance-authority](https://cva.style/), and Radix primitives. Bundled with [tsup](https://tsup.egoist.dev/) (ESM + CJS + type declarations).

## Components

- `Button` / `buttonVariants` — cva-based button with `asChild` support (Radix Slot)
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`
- `SplitFeatureCard` — feature card with icon list and CTA
- `ImageCard` — image + copy card
- `PageLane`, `SectionIntro` and layout helpers (`shellClass`, `gridClass`, `laneClass`)
- `cn` — `clsx` + `tailwind-merge` class helper

## Install

The package is published to GitHub Packages. Add this to your project's `.npmrc`:

```
@haigis:registry=https://npm.pkg.github.com
```

Then:

```sh
npm install @haigis/component-library
```

Or install straight from the repo (the `prepare` script builds `dist` automatically):

```sh
npm install github:haigis/component-library
```

## Usage

```tsx
import { Button, Card, CardContent, cn } from "@haigis/component-library"

export function Example() {
    return (
        <Card>
            <CardContent>
                <Button variant="secondary" size="lg">Click me</Button>
            </CardContent>
        </Card>
    )
}
```

Styling uses Tailwind utility classes and shadcn-style design tokens (`bg-primary`, `text-card-foreground`, `ring-ring`, …). The consuming app must have Tailwind CSS v4 set up with those theme tokens defined, and must include this package in Tailwind's content sources so the classes are generated, e.g. in your CSS entry:

```css
@import "tailwindcss";
@source "../node_modules/@haigis/component-library/dist";
```

## Development

```sh
npm install
npm run build   # one-off build to dist/
npm run dev     # rebuild on change
```

## Publishing

Bump `version` in `package.json`, then:

```sh
npm publish
```

(Publishes to GitHub Packages per `publishConfig`; requires a GitHub token with `write:packages`.)

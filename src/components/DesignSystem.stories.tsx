import type { CSSProperties, ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./Button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./card"
import { Heading } from "./Heading"
import { Icon } from "./Icon"
import { PageLane } from "./layout"
import { Text } from "./Text"
import {
    ThemeProvider,
    colorThemeNames,
    type ColorTheme,
    type ThemeMode,
} from "./ThemeProvider"

const themeLabels: Record<ColorTheme, string> = {
    indigo: "Indigo",
    ocean: "Ocean",
    forest: "Forest",
    coral: "Coral",
}

const colourRoles = [
    {
        label: "Primary",
        value: "var(--primary)",
        foreground: "var(--primary-foreground)",
    },
    {
        label: "Secondary",
        value: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
    },
    {
        label: "Accent",
        value: "var(--accent)",
        foreground: "var(--accent-foreground)",
    },
    {
        label: "Muted",
        value: "var(--muted)",
        foreground: "var(--muted-foreground)",
    },
    {
        label: "Card",
        value: "var(--card)",
        foreground: "var(--card-foreground)",
    },
    {
        label: "Destructive",
        value: "var(--destructive)",
        foreground: "var(--destructive-foreground)",
    },
]

function ColourRole({
    label,
    value,
    foreground,
}: {
    label: string
    value: string
    foreground: string
}) {
    const style = {
        backgroundColor: value,
        color: foreground,
    } satisfies CSSProperties

    return (
        <div
            className="flex h-24 min-w-0 items-end border border-border p-3"
            style={style}
        >
            <Text as="span" size="xs" weight="semibold" tone="inherit">
                {label}
            </Text>
        </div>
    )
}

function ColourRoles() {
    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {colourRoles.map((role) => (
                <ColourRole key={role.label} {...role} />
            ))}
        </div>
    )
}

function ComponentSample() {
    return (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
            <Card tone="elevated">
                <CardHeader>
                    <CardTitle>Publishing workflow</CardTitle>
                    <CardDescription>
                        Review content quality before release.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                        <Icon icon="shield-check" size="md" />
                    </span>
                    <Text size="sm" tone="muted">
                        Accessibility, links, and metadata are ready for approval.
                    </Text>
                </CardContent>
                <CardFooter>
                    <Button size="sm">Open review</Button>
                    <Button size="sm" variant="outline">View details</Button>
                </CardFooter>
            </Card>

            <div className="border-y border-border py-5">
                <Text as="span" size="xs" tone="primary" weight="semibold">
                    RELEASE STATUS
                </Text>
                <Heading as="h3" size="card" className="mt-2">
                    Ready to publish
                </Heading>
                <Text size="sm" tone="muted" className="mt-2">
                    All required checks passed.
                </Text>
                <div className="mt-5 flex items-center gap-2 text-accent">
                    <Icon icon="check-circle" size="md" />
                    <Text as="span" size="sm" tone="inherit" weight="medium">
                        12 checks complete
                    </Text>
                </div>
            </div>
        </div>
    )
}

function FoundationSample() {
    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="border-t border-border pt-5">
                <Text as="span" size="xs" tone="primary" weight="semibold">
                    DISPLAY
                </Text>
                <Heading as="h2" size="page" className="mt-3">
                    Clear hierarchy at every scale
                </Heading>
                <Text tone="muted" className="mt-3 max-w-xl">
                    Semantic levels and visual sizes remain independent.
                </Text>
            </div>
            <div className="grid content-start gap-5 border-t border-border pt-5">
                <Heading as="h3" size="section">Section heading</Heading>
                <Heading as="h4" size="card">Card heading</Heading>
                <Text>Body text supports sustained reading across layouts.</Text>
                <Text size="sm" tone="muted">Muted supporting text</Text>
            </div>
        </div>
    )
}

function DesignSystemOverview() {
    return (
        <main className="min-h-screen bg-background py-10 text-foreground">
            <PageLane width={12}>
                <div className="space-y-12">
                    <header className="border-b border-border pb-8">
                        <Text as="span" size="xs" tone="primary" weight="semibold">
                            FOUNDATIONS
                        </Text>
                        <Heading as="h1" size="page" className="mt-3">
                            Design system
                        </Heading>
                        <Text tone="muted" className="mt-3 max-w-2xl">
                            Semantic foundations and production components.
                        </Text>
                    </header>

                    <section className="space-y-5" aria-labelledby="colour-roles">
                        <Heading id="colour-roles" as="h2" size="section">
                            Colour roles
                        </Heading>
                        <ColourRoles />
                    </section>

                    <section className="space-y-5" aria-labelledby="type-system">
                        <Heading id="type-system" as="h2" size="section">
                            Typography
                        </Heading>
                        <FoundationSample />
                    </section>

                    <section className="space-y-5" aria-labelledby="component-system">
                        <Heading id="component-system" as="h2" size="section">
                            Components
                        </Heading>
                        <ComponentSample />
                    </section>
                </div>
            </PageLane>
        </main>
    )
}

function ThemeBand({
    theme,
    mode,
}: {
    theme: ColorTheme
    mode: Exclude<ThemeMode, "system">
}) {
    return (
        <ThemeProvider
            theme={theme}
            mode={mode}
            className="border-b border-border px-6 py-9 first:border-t sm:px-8"
        >
            <div className="mx-auto grid w-full max-w-7xl gap-7">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <Text as="span" size="xs" tone="primary" weight="semibold">
                            {mode.toUpperCase()}
                        </Text>
                        <Heading as="h2" size="section" className="mt-2">
                            {themeLabels[theme]}
                        </Heading>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm">Primary</Button>
                        <Button size="sm" variant="secondary">Secondary</Button>
                        <Button size="icon" variant="outline" aria-label="Theme settings">
                            <Icon icon="settings" size="sm" />
                        </Button>
                    </div>
                </div>
                <ColourRoles />
                <ComponentSample />
            </div>
        </ThemeProvider>
    )
}

function ThemeCollection({ mode }: { mode: Exclude<ThemeMode, "system"> }) {
    return (
        <main>
            {colorThemeNames.map((theme) => (
                <ThemeBand key={theme} theme={theme} mode={mode} />
            ))}
        </main>
    )
}

function PageHeader({ children }: { children: ReactNode }) {
    return (
        <header className="border-b border-border bg-card/80 px-6 py-4">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
                <Text as="span" weight="semibold">{children}</Text>
                <Button size="icon" variant="ghost" aria-label="Open settings">
                    <Icon icon="settings" size="md" />
                </Button>
            </div>
        </header>
    )
}

function PageThemeExample({
    theme,
    mode,
    title,
    body,
}: {
    theme: ColorTheme
    mode: ThemeMode
    title: string
    body: string
}) {
    return (
        <ThemeProvider theme={theme} mode={mode} className="min-h-[26rem]">
            <PageHeader>{themeLabels[theme]} page</PageHeader>
            <PageLane width={10} className="py-12">
                <Text as="span" size="xs" tone="primary" weight="semibold">
                    CONTENT WORKSPACE
                </Text>
                <Heading as="h2" size="page" className="mt-3 max-w-3xl">
                    {title}
                </Heading>
                <Text tone="muted" className="mt-4 max-w-2xl">
                    {body}
                </Text>
                <div className="mt-7 flex flex-wrap gap-3">
                    <Button>Review page</Button>
                    <Button variant="outline">Open preview</Button>
                </div>
            </PageLane>
        </ThemeProvider>
    )
}

const meta = {
    title: "Foundations/Design System",
    component: ThemeProvider,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Semantic tokens and scoped colour themes for the component library.",
            },
        },
    },
} satisfies Meta<typeof ThemeProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
    render: () => <DesignSystemOverview />,
}

export const LightThemes: Story = {
    render: () => <ThemeCollection mode="light" />,
}

export const DarkThemes: Story = {
    render: () => <ThemeCollection mode="dark" />,
}

export const PerPageThemes: Story = {
    render: () => (
        <ThemeProvider theme="indigo" mode="dark" className="min-h-screen bg-background">
            <PageHeader>Global indigo shell</PageHeader>
            <main className="mx-auto grid max-w-[1600px] gap-px bg-border lg:grid-cols-2">
                <PageThemeExample
                    theme="forest"
                    mode="light"
                    title="Editorial planning"
                    body="A light forest theme scoped to this page."
                />
                <PageThemeExample
                    theme="coral"
                    mode="dark"
                    title="Campaign review"
                    body="A dark coral theme scoped beside it."
                />
            </main>
        </ThemeProvider>
    ),
}

export const StoryThemeOverride: Story = {
    name: "Per-story theme override",
    parameters: {
        designTheme: {
            theme: "ocean",
            mode: "dark",
        },
    },
    render: () => <DesignSystemOverview />,
}

import type { Meta, StoryObj } from "@storybook/react-vite"

import {
    Heading,
    type HeadingLevel,
    type HeadingProps,
} from "./Heading"

const meta = {
    title: "Foundations/Heading",
    component: Heading,
    parameters: {
        layout: "centered",
    },
    args: {
        as: "h2",
        size: "section",
        tone: "default",
        children: "A clear, semantic heading",
    },
    argTypes: {
        as: {
            control: "select",
            options: ["h1", "h2", "h3", "h4", "h5", "h6"],
        },
        size: {
            control: "radio",
            options: ["display", "page", "section", "card", "subheading"],
        },
        tone: {
            control: "radio",
            options: ["default", "hero"],
        },
    },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

const sizes: NonNullable<HeadingProps["size"]>[] = [
    "display",
    "page",
    "section",
    "card",
    "subheading",
]

export const Playground: Story = {}

export const Sizes: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="grid gap-8">
            {sizes.map((size) => (
                <div key={size} className="grid gap-2">
                    <span className="text-xs text-muted-foreground">{size}</span>
                    <Heading as="h2" size={size}>
                        Heading size
                    </Heading>
                </div>
            ))}
        </div>
    ),
}

export const SemanticLevels: Story = {
    render: () => (
        <div className="grid gap-4">
            {(["h1", "h2", "h3", "h4", "h5", "h6"] as HeadingLevel[]).map(
                (level) => (
                    <Heading key={level} as={level} size="subheading">
                        {level.toUpperCase()} with a shared visual size
                    </Heading>
                )
            )}
        </div>
    ),
}

export const HeroTone: Story = {
    parameters: {
        layout: "fullscreen",
    },
    render: () => (
        <div className="site-hero p-10">
            <Heading as="h1" size="display" tone="hero">
                Heading on a hero surface
            </Heading>
        </div>
    ),
}

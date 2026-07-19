import type { Meta, StoryObj } from "@storybook/react-vite"

import { Hero } from "./Hero"

const meta = {
    title: "Patterns/Hero",
    component: Hero,
    parameters: {
        layout: "fullscreen",
    },
    args: {
        chip: "Content operations",
        title: "Build clearer publishing workflows",
        body: "Reusable components and structured content patterns for teams that publish at scale.",
        actions: [
            { label: "Browse components", href: "#components" },
            { label: "Read documentation", href: "#documentation", variant: "secondary" },
        ],
        width: 10,
        titleId: "hero-story-title",
    },
    argTypes: {
        width: {
            control: "radio",
            options: [8, 10, 12],
        },
        actions: {
            control: "object",
        },
        breadcrumbs: {
            control: "object",
        },
        className: {
            control: false,
        },
    },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithBreadcrumbs: Story = {
    args: {
        breadcrumbs: [
            { label: "Home", href: "#home" },
            { label: "Patterns", href: "#patterns" },
            { label: "Hero" },
        ],
    },
}

export const NarrowLane: Story = {
    args: {
        width: 8,
        title: "A focused message with a narrower reading measure",
    },
}

export const Minimal: Story = {
    args: {
        chip: undefined,
        body: undefined,
        actions: undefined,
        title: "A concise page introduction",
    },
}

export const SingleAction: Story = {
    args: {
        actions: [{ label: "Get started", href: "#get-started" }],
    },
}

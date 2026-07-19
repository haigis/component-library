import type { Meta, StoryObj } from "@storybook/react-vite"

import { Breadcrumbs } from "./Breadcrumbs"

const items = [
    { label: "Home", href: "#home" },
    { label: "Toolkits", href: "#toolkits" },
    { label: "Content operations" },
]

const meta = {
    title: "Patterns/Breadcrumbs",
    component: Breadcrumbs,
    parameters: {
        layout: "centered",
    },
    args: {
        items,
        tone: "default",
    },
    argTypes: {
        tone: {
            control: "radio",
            options: ["default", "hero"],
        },
        className: {
            control: false,
        },
    },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const LinkedAndButtonItems: Story = {
    args: {
        items: [
            { label: "Home", href: "#home" },
            { label: "Library", onClick: () => undefined },
            { label: "Breadcrumbs" },
        ],
    },
}

export const HeroTone: Story = {
    parameters: {
        layout: "fullscreen",
    },
    render: (args) => (
        <div className="site-hero p-8">
            <Breadcrumbs {...args} tone="hero" />
        </div>
    ),
}

export const LongTrail: Story = {
    args: {
        items: [
            { label: "Home", href: "#home" },
            { label: "Documentation", href: "#documentation" },
            { label: "Content management", href: "#content-management" },
            { label: "Component library", href: "#component-library" },
            { label: "Breadcrumb patterns" },
        ],
    },
}

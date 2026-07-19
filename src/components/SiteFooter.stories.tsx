import type { Meta, StoryObj } from "@storybook/react-vite"

import type { NavItem } from "../lib/nav"
import { SiteFooter } from "./SiteFooter"

const navigation: NavItem[] = [
    { id: "components", label: "Components", href: "#components" },
    { id: "patterns", label: "Patterns", href: "#patterns" },
    { id: "accessibility", label: "Accessibility", href: "#accessibility" },
    { id: "github", label: "GitHub", href: "#github" },
]

const meta = {
    title: "Patterns/SiteFooter",
    component: SiteFooter,
    parameters: {
        layout: "fullscreen",
    },
    args: {
        brand: "Haigis UI",
        tagline: "A practical component library for structured sites.",
        items: navigation,
        width: 10,
    },
    argTypes: {
        brand: {
            control: "text",
        },
        width: {
            control: "radio",
            options: [8, 10, 12],
        },
        className: {
            control: false,
        },
    },
} satisfies Meta<typeof SiteFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const BrandOnly: Story = {
    args: {
        tagline: undefined,
        items: [],
    },
}

export const ButtonNavigation: Story = {
    args: {
        items: navigation.map(({ href: _href, ...item }) => ({
            ...item,
            onClick: () => undefined,
        })),
    },
}

export const WideLane: Story = {
    args: {
        width: 12,
    },
}

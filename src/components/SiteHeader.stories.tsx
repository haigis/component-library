import type { Meta, StoryObj } from "@storybook/react-vite"

import type { NavItem } from "../lib/nav"
import { SiteHeader } from "./SiteHeader"

const navigation: NavItem[] = [
    { id: "home", label: "Home", href: "#home" },
    { id: "components", label: "Components", href: "#components" },
    { id: "patterns", label: "Patterns", href: "#patterns" },
    { id: "guides", label: "Guides", href: "#guides" },
]

const meta = {
    title: "Patterns/SiteHeader",
    component: SiteHeader,
    parameters: {
        layout: "fullscreen",
    },
    args: {
        brand: "Haigis UI",
        brandHref: "#home",
        items: navigation,
        activeId: "components",
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
        onBrandClick: {
            control: false,
        },
        className: {
            control: false,
        },
    },
} satisfies Meta<typeof SiteHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const BrandOnly: Story = {
    args: {
        items: [],
        activeId: undefined,
    },
}

export const WideLane: Story = {
    args: {
        width: 12,
        activeId: "home",
    },
}

export const ButtonNavigation: Story = {
    args: {
        brandHref: undefined,
        onBrandClick: () => undefined,
        items: navigation.map(({ href: _href, ...item }) => ({
            ...item,
            onClick: () => undefined,
        })),
    },
}

export const MobileNavigation: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1",
        },
    },
}

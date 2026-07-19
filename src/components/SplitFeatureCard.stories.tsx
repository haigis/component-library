import type { Meta, StoryObj } from "@storybook/react-vite"

import { SplitFeatureCard } from "./SplitFeatureCard"

const items = [
    {
        icon: "compass" as const,
        label: "Navigation",
        body: "Menus, hierarchy, breadcrumbs, and redirects.",
        href: "#navigation",
    },
    {
        icon: "search" as const,
        label: "Search journeys",
        body: "Index coverage, result quality, and discovery paths.",
        href: "#search",
    },
    {
        icon: "shield-check" as const,
        label: "Quality checks",
        body: "Automated checks before content reaches production.",
        href: "#quality",
    },
]

const meta = {
    title: "Patterns/Split Feature Card",
    component: SplitFeatureCard,
    parameters: {
        layout: "padded",
    },
    args: {
        title: "Featured toolkits",
        description: "Focused workflows for common content operations tasks.",
        actionLabel: "Browse all toolkits",
        actionHref: "#toolkits",
        actionStyle: "link",
        actionVariant: "primary",
        items,
    },
    argTypes: {
        actionStyle: {
            control: "radio",
            options: ["link", "button"],
        },
        actionVariant: {
            control: "select",
            options: ["primary", "secondary", "outline"],
        },
        onAction: {
            control: false,
        },
        className: {
            control: false,
        },
    },
    render: (args) => (
        <div className="mx-auto w-full max-w-6xl">
            <SplitFeatureCard {...args} />
        </div>
    ),
} satisfies Meta<typeof SplitFeatureCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithoutIntroAction: Story = {
    args: {
        actionLabel: undefined,
        actionHref: undefined,
    },
}

export const ButtonAction: Story = {
    args: {
        actionStyle: "button",
        actionVariant: "outline",
    },
}

export const TwoItems: Story = {
    args: {
        items: items.slice(0, 2),
    },
}

export const ButtonItems: Story = {
    args: {
        items: items.map(({ href: _href, ...item }) => ({
            ...item,
            onClick: () => undefined,
        })),
        actionHref: undefined,
        onAction: () => undefined,
    },
}

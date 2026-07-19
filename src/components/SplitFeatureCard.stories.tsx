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
    title: "Patterns/SplitFeatureCard",
    component: SplitFeatureCard,
    parameters: {
        layout: "padded",
    },
    args: {
        title: "Featured toolkits",
        description: "Focused workflows for common content operations tasks.",
        linkLabel: "Browse all toolkits",
        linkHref: "#toolkits",
        items,
    },
    argTypes: {
        onLinkClick: {
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

export const WithoutIntroLink: Story = {
    args: {
        linkLabel: undefined,
        linkHref: undefined,
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
        linkHref: undefined,
        onLinkClick: () => undefined,
    },
}

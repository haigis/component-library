import type { Meta, StoryObj } from "@storybook/react-vite"

import {
    DescriptionList,
    DescriptionListDescription,
    DescriptionListItem,
    DescriptionListTerm,
} from "./DescriptionList"

const workflowItems = [
    {
        id: "navigation",
        icon: "compass" as const,
        term: "Navigation",
        description: "Menus, hierarchy, breadcrumbs, and redirects.",
        href: "#navigation",
    },
    {
        id: "search",
        icon: "search" as const,
        term: "Search journeys",
        description: "Index coverage, result quality, and discovery paths.",
        href: "#search",
    },
    {
        id: "quality",
        icon: "shield-check" as const,
        term: "Quality checks",
        description: "Automated checks before content reaches production.",
        href: "#quality",
    },
]

const meta = {
    title: "Components/Description List",
    component: DescriptionList,
    parameters: {
        layout: "centered",
    },
    args: {
        items: workflowItems,
        layout: "stacked",
        surface: "plain",
    },
    argTypes: {
        layout: {
            control: "radio",
            options: ["stacked", "inline"],
        },
        surface: {
            control: "radio",
            options: ["plain", "contained"],
        },
        children: {
            control: false,
        },
        className: {
            control: false,
        },
    },
    render: (args) => (
        <DescriptionList
            {...args}
            className="w-[min(42rem,calc(100vw-4rem))]"
        />
    ),
} satisfies Meta<typeof DescriptionList>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Inline: Story = {
    args: {
        layout: "inline",
        items: [
            {
                id: "owner",
                term: "Owner",
                description: "Content operations",
            },
            {
                id: "status",
                term: "Status",
                description: "Ready for review",
            },
            {
                id: "published",
                term: "Last published",
                description: "19 July 2026 at 16:42",
            },
        ],
    },
}

export const Contained: Story = {
    args: {
        surface: "contained",
    },
}

export const Static: Story = {
    args: {
        items: workflowItems.map(({ href: _href, ...item }) => item),
    },
}

export const Composed: Story = {
    render: () => (
        <DescriptionList
            layout="inline"
            surface="contained"
            className="w-[min(42rem,calc(100vw-4rem))]"
        >
            <DescriptionListItem
                layout="inline"
                term="Accessibility"
                description="Automated checks enabled"
                icon="check-circle"
            />
            <div className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[minmax(11rem,0.45fr)_minmax(0,1fr)]">
                <DescriptionListTerm>Release channel</DescriptionListTerm>
                <DescriptionListDescription className="sm:col-start-2">
                    Production
                </DescriptionListDescription>
            </div>
        </DescriptionList>
    ),
}

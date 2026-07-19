import type { Meta, StoryObj } from "@storybook/react-vite"

import { SplitPanel } from "./SplitPanel"

const checklist = [
    { icon: "check" as const, label: "Structured content modelling" },
    { icon: "check" as const, label: "Accessible component patterns" },
    { icon: "check" as const, label: "Production-ready delivery" },
]

function OfficeImage() {
    return (
        <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85"
            alt="A modern collaborative workspace"
            className="h-full w-full object-cover"
        />
    )
}

const meta = {
    title: "Patterns/Split Panel",
    component: SplitPanel,
    parameters: {
        layout: "padded",
    },
    args: {
        title: "A focused content platform",
        description:
            "Bring editorial planning, reusable components, and release workflows into one dependable system.",
        items: checklist,
        actionLabel: "Explore the platform",
        actionHref: "#platform",
        actionStyle: "link",
        actionVariant: "primary",
        image: <OfficeImage />,
        cardTitle: "Built for delivery",
        cardDescription: "A compact supporting panel over the media area.",
        cardItems: checklist.slice(0, 2),
        cardActionLabel: "View capabilities",
        cardActionHref: "#capabilities",
        cardActionStyle: "button",
        cardActionVariant: "primary",
        tone: "default",
    },
    argTypes: {
        tone: {
            control: "radio",
            options: ["default", "dark", "primary"],
        },
        actionStyle: {
            control: "radio",
            options: ["link", "button"],
        },
        actionVariant: {
            control: "select",
            options: ["primary", "secondary", "outline"],
        },
        cardActionStyle: {
            control: "radio",
            options: ["link", "button"],
        },
        cardActionVariant: {
            control: "select",
            options: ["primary", "secondary", "outline"],
        },
        image: {
            control: false,
        },
        onAction: {
            control: false,
        },
        onCardAction: {
            control: false,
        },
        className: {
            control: false,
        },
    },
    render: (args) => (
        <div className="mx-auto w-full max-w-7xl">
            <SplitPanel {...args} />
        </div>
    ),
} satisfies Meta<typeof SplitPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Dark: Story = {
    args: {
        tone: "dark",
        actionStyle: "button",
        actionVariant: "secondary",
    },
}

export const Primary: Story = {
    args: {
        tone: "primary",
        actionStyle: "button",
        actionVariant: "outline",
    },
}

export const MediaOnly: Story = {
    args: {
        cardTitle: undefined,
        cardDescription: undefined,
        cardItems: undefined,
        cardActionLabel: undefined,
    },
}

export const CardOnly: Story = {
    args: {
        image: undefined,
    },
}

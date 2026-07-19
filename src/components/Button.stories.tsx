import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button, type ButtonProps } from "./Button"
import { Icon } from "./Icon"

const meta = {
    title: "Components/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    args: {
        children: "Button label",
        variant: "primary",
        size: "default",
    },
    argTypes: {
        variant: {
            control: "select",
            options: [
                "primary",
                "default",
                "secondary",
                "outline",
                "ghost",
                "destructive",
                "link",
                "heroPrimary",
                "heroSecondary",
            ],
        },
        size: {
            control: "radio",
            options: ["sm", "default", "lg", "icon"],
        },
        asChild: {
            control: false,
        },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const standardVariants: NonNullable<ButtonProps["variant"]>[] = [
    "primary",
    "secondary",
    "outline",
    "ghost",
    "destructive",
    "link",
]

export const Playground: Story = {}

export const Variants: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            {standardVariants.map((variant) => (
                <Button key={variant} variant={variant}>
                    {variant}
                </Button>
            ))}
        </div>
    ),
}

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Continue">
                <Icon icon="arrow-right" size="md" />
            </Button>
        </div>
    ),
}

export const States: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Button>Enabled</Button>
            <Button disabled>Disabled</Button>
            <Button variant="outline">
                <Icon icon="download" size="sm" />
                With icon
            </Button>
            <Button asChild variant="link">
                <a href="#button-link">Rendered as a link</a>
            </Button>
        </div>
    ),
}

export const HeroVariants: Story = {
    parameters: {
        layout: "fullscreen",
    },
    render: () => (
        <div className="site-hero flex min-h-56 items-center justify-center gap-3 p-8">
            <Button variant="heroPrimary" size="lg">
                Primary action
            </Button>
            <Button variant="heroSecondary" size="lg">
                Secondary action
            </Button>
        </div>
    ),
}

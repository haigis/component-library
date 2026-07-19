import type { Meta, StoryObj } from "@storybook/react-vite"

import { iconNames } from "../lib/icons"
import { Icon } from "./Icon"

const meta = {
    title: "Foundations/Icons",
    component: Icon,
    parameters: {
        layout: "centered",
    },
    args: {
        icon: "sparkles",
        size: "xl",
        label: "Sparkles",
    },
    argTypes: {
        icon: {
            control: "select",
            options: iconNames,
        },
        size: {
            control: "radio",
            options: ["xs", "sm", "md", "lg", "xl"],
        },
    },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
    render: () => (
        <div className="flex items-end gap-6 text-primary">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                <div key={size} className="grid justify-items-center gap-2">
                    <Icon icon="sparkles" size={size} />
                    <span className="text-xs text-muted-foreground">{size}</span>
                </div>
            ))}
        </div>
    ),
}

export const Registry: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-3">
            {iconNames.map((icon) => (
                <div
                    key={icon}
                    className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card p-3 text-center"
                >
                    <Icon icon={icon} size="lg" className="text-primary" />
                    <code className="text-xs text-muted-foreground">{icon}</code>
                </div>
            ))}
        </div>
    ),
}

export const DecorativeAndMeaningful: Story = {
    render: () => (
        <div className="grid gap-5">
            <div className="flex items-center gap-2">
                <Icon icon="check-circle" className="text-primary" />
                <span>Decorative icon with adjacent text</span>
            </div>
            <Icon icon="alert-circle" size="lg" label="Warning" className="text-destructive" />
        </div>
    ),
}

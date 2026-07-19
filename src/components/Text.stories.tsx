import type { Meta, StoryObj } from "@storybook/react-vite"

import { Text, type TextProps } from "./Text"

const meta = {
    title: "Foundations/Text",
    component: Text,
    parameters: {
        layout: "centered",
    },
    args: {
        as: "p",
        size: "body",
        tone: "default",
        weight: "normal",
        children: "Reusable text keeps rhythm and color consistent across components.",
    },
    argTypes: {
        as: {
            control: "radio",
            options: ["p", "span", "div", "small"],
        },
        size: {
            control: "radio",
            options: ["lead", "body", "sm", "xs"],
        },
        tone: {
            control: "radio",
            options: ["default", "muted", "primary", "hero"],
        },
        weight: {
            control: "radio",
            options: ["normal", "medium", "semibold"],
        },
    },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

const sizes: NonNullable<TextProps["size"]>[] = ["lead", "body", "sm", "xs"]
const tones: NonNullable<TextProps["tone"]>[] = ["default", "muted", "primary"]

export const Playground: Story = {}

export const Sizes: Story = {
    render: () => (
        <div className="grid max-w-2xl gap-5">
            {sizes.map((size) => (
                <Text key={size} size={size}>
                    {size}: Reusable text with a predictable line height.
                </Text>
            ))}
        </div>
    ),
}

export const Tones: Story = {
    render: () => (
        <div className="grid gap-3">
            {tones.map((tone) => (
                <Text key={tone} tone={tone}>
                    {tone} text tone
                </Text>
            ))}
        </div>
    ),
}

export const Weights: Story = {
    render: () => (
        <div className="grid gap-3">
            <Text weight="normal">Normal text</Text>
            <Text weight="medium">Medium text</Text>
            <Text weight="semibold">Semibold text</Text>
        </div>
    ),
}

export const HeroTone: Story = {
    parameters: {
        layout: "fullscreen",
    },
    render: () => (
        <div className="site-hero p-10">
            <Text size="lead" tone="hero" className="max-w-3xl">
                Hero text retains the same semantic paragraph while using the
                quieter foreground designed for dark hero surfaces.
            </Text>
        </div>
    ),
}

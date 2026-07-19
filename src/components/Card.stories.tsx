import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./Button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    type CardProps,
} from "./card"
import { Icon } from "./Icon"

const meta = {
    title: "Components/Card",
    component: Card,
    parameters: {
        layout: "centered",
    },
    args: {
        tone: "default",
        size: "default",
    },
    argTypes: {
        tone: {
            control: "radio",
            options: ["default", "alt", "muted", "elevated"],
        },
        size: {
            control: "radio",
            options: ["default", "sm"],
        },
    },
    render: (args) => (
        <Card {...args} className="w-[min(28rem,calc(100vw-4rem))]">
            <CardHeader>
                <CardTitle>Project health</CardTitle>
                <CardDescription>Build and deployment status.</CardDescription>
                <CardAction>
                    <Button size="icon" variant="ghost" aria-label="Open settings">
                        <Icon icon="settings" size="md" />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    All production checks passed two minutes ago.
                </p>
            </CardContent>
            <CardFooter>
                <Button size="sm">View report</Button>
                <Button size="sm" variant="outline">Dismiss</Button>
            </CardFooter>
        </Card>
    ),
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const tones: NonNullable<CardProps["tone"]>[] = [
    "default",
    "alt",
    "muted",
    "elevated",
]

export const Playground: Story = {}

export const Tones: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="grid w-full max-w-5xl gap-5 md:grid-cols-2">
            {tones.map((tone) => (
                <Card key={tone} tone={tone}>
                    <CardHeader>
                        <CardTitle>{tone}</CardTitle>
                        <CardDescription>
                            The {tone} surface treatment.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Cards preserve the same content structure across tones.
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    ),
}

export const Compact: Story = {
    args: {
        size: "sm",
        tone: "muted",
    },
}

export const ContentOnly: Story = {
    render: () => (
        <Card className="w-[min(28rem,calc(100vw-4rem))]">
            <p className="text-sm text-muted-foreground">
                Card slots are optional. Use the base surface for simple grouped content.
            </p>
        </Card>
    ),
}

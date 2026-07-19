import type { Meta, StoryObj } from "@storybook/react-vite"

import { iconNames } from "../lib/icons"
import { Icon } from "./Icon"
import {
    Banner,
    type BannerIconPosition,
    type BannerProps,
} from "./Banner"

function WideMedia() {
    return (
        <div
            role="img"
            aria-label="Abstract release dashboard"
            className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(120deg,#111827_0%,#1d4ed8_52%,#0d9488_100%)] text-white"
        >
            <div className="absolute inset-x-[12%] bottom-[14%] top-[18%] rounded-lg border border-white/25 bg-white/10 shadow-xl" />
            <Icon icon="trending-up" size="xl" className="relative" />
        </div>
    )
}

const meta = {
    title: "Components/Banner",
    component: Banner,
    parameters: {
        layout: "centered",
    },
    args: {
        eyebrow: "Release status",
        title: "Everything is ready to publish",
        body: "Review the final checks, then send this release to production.",
        icon: "shield-check",
        iconPosition: "top",
        action: {
            label: "Review release",
            href: "#banner",
        },
        actionPosition: "right",
        tone: "default",
    },
    argTypes: {
        icon: {
            control: "select",
            options: iconNames,
        },
        iconPosition: {
            control: "radio",
            options: ["top", "left", "right"],
        },
        media: {
            control: false,
        },
        mediaPosition: {
            control: "radio",
            options: ["left", "right", "top"],
        },
        actionPosition: {
            control: "radio",
            options: ["left", "right", "below"],
        },
        tone: {
            control: "radio",
            options: ["default", "alt", "muted", "elevated"],
        },
        body: {
            control: "text",
        },
        className: {
            control: false,
        },
        mediaClassName: {
            control: false,
        },
    },
    render: (args) => (
        <div className="w-[min(64rem,calc(100vw-4rem))]">
            <Banner {...args} />
        </div>
    ),
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const IconPositions: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="grid w-full max-w-5xl gap-5">
            {(["top", "left", "right"] as BannerIconPosition[]).map((position) => (
                <Banner
                    key={position}
                    eyebrow="Icon position"
                    title={position[0].toUpperCase() + position.slice(1)}
                    body="The supporting icon stays aligned with the content and never enters the image media slot."
                    icon="shield-check"
                    iconPosition={position}
                    action={{ label: "Continue", href: "#icon-position" }}
                    actionPosition="right"
                />
            ))}
        </div>
    ),
}

export const MediaPositions: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="grid w-full max-w-5xl gap-5">
            {(["left", "right", "top"] as NonNullable<BannerProps["mediaPosition"]>[]).map(
                (position) => (
                    <Banner
                        key={position}
                        eyebrow="Media position"
                        title={position[0].toUpperCase() + position.slice(1)}
                        body="Image media has a stable slot independent from both the supporting icon and call to action."
                        media={<WideMedia />}
                        mediaPosition={position}
                        action={{ label: "Continue", href: "#media-position" }}
                        actionPosition="right"
                    />
                )
            )}
        </div>
    ),
}

export const ImageAndIcon: Story = {
    args: {
        media: <WideMedia />,
        mediaPosition: "top",
        mediaAspectRatio: "21 / 7",
        icon: "rocket",
        iconPosition: "left",
    },
}

export const ActionPositions: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="grid w-full max-w-5xl gap-5">
            {(["left", "right", "below"] as NonNullable<BannerProps["actionPosition"]>[]).map(
                (position) => (
                    <Banner
                        key={position}
                        title={`Action ${position}`}
                        body="The action can lead, trail, or sit below the supporting copy."
                        action={{ label: "Take action", href: "#action-position" }}
                        actionPosition={position}
                        tone="muted"
                    />
                )
            )}
        </div>
    ),
}

export const Tones: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="grid w-full max-w-5xl gap-5">
            {(["default", "alt", "muted", "elevated"] as NonNullable<BannerProps["tone"]>[]).map(
                (tone) => (
                    <Banner
                        key={tone}
                        eyebrow="Surface tone"
                        title={tone[0].toUpperCase() + tone.slice(1)}
                        body="Banner layout remains stable across every card surface."
                        tone={tone}
                    />
                )
            )}
        </div>
    ),
}

export const TopImage: Story = {
    args: {
        media: <WideMedia />,
        mediaPosition: "top",
        mediaAspectRatio: "21 / 7",
        icon: undefined,
        actionPosition: "below",
    },
}

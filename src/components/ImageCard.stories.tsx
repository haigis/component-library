import type { Meta, StoryObj } from "@storybook/react-vite"

import { iconNames } from "../lib/icons"
import { Icon } from "./Icon"
import {
    ImageCard,
    type ImageCardIconPosition,
} from "./ImageCard"

function SampleImage() {
    return (
        <div
            role="img"
            aria-label="Abstract product workspace"
            className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#334155_45%,#0891b2_100%)] text-white"
        >
            <div className="absolute left-[12%] top-[18%] h-[46%] w-[38%] rounded-lg border border-white/25 bg-white/10 shadow-xl" />
            <div className="absolute bottom-[14%] right-[10%] h-[44%] w-[44%] rounded-lg border border-white/30 bg-white/15 shadow-xl" />
            <Icon icon="layers" size="xl" className="relative" />
        </div>
    )
}

const meta = {
    title: "Components/ImageCard",
    component: ImageCard,
    parameters: {
        layout: "centered",
    },
    args: {
        eyebrow: "Toolkit",
        title: "Content operations",
        body: "Plan, review, and publish structured content with a repeatable workflow.",
        icon: "layers",
        iconPosition: "top",
        actionLabel: "Explore toolkit",
        actionHref: "#image-card",
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
        image: {
            control: false,
        },
        body: {
            control: "text",
        },
        onAction: {
            control: false,
        },
        className: {
            control: false,
        },
        imageClassName: {
            control: false,
        },
    },
    render: (args) => (
        <div className="w-[min(24rem,calc(100vw-4rem))]">
            <ImageCard {...args} />
        </div>
    ),
} satisfies Meta<typeof ImageCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const IconPositions: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="grid w-full max-w-6xl gap-5 lg:grid-cols-3">
            {(["top", "left", "right"] as ImageCardIconPosition[]).map((position) => (
                <ImageCard
                    key={position}
                    eyebrow="Icon position"
                    title={position[0].toUpperCase() + position.slice(1)}
                    body="The icon remains a supporting element while the title and body keep a stable reading order."
                    icon="compass"
                    iconPosition={position}
                    actionLabel="View details"
                    actionHref="#icon-position"
                />
            ))}
        </div>
    ),
}

export const ImageAndIcon: Story = {
    args: {
        image: <SampleImage />,
        imageAspectRatio: "16 / 9",
        icon: "rocket",
        iconPosition: "left",
        title: "Launch workspace",
    },
}

export const ImageOnly: Story = {
    args: {
        image: <SampleImage />,
        icon: undefined,
        title: "Visual feature card",
    },
}

export const ContentOnly: Story = {
    args: {
        image: undefined,
        icon: undefined,
        eyebrow: undefined,
        title: "Simple content card",
        actionLabel: undefined,
    },
}

export const RichBody: Story = {
    args: {
        body: (
            <>
                <p>Use rich content when the supporting copy needs more structure.</p>
                <p>Spacing is preserved between paragraphs without changing the card layout.</p>
            </>
        ),
    },
}

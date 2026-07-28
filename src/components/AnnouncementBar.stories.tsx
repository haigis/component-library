import type { Meta, StoryObj } from "@storybook/react-vite"

import { AnnouncementBar, type AnnouncementBarItem } from "./AnnouncementBar"

const ecommerceItems: AnnouncementBarItem[] = [
    { icon: "star", text: "5-Star Rated", highlight: true },
    { icon: "users", text: "Trusted by 10,000+ Customers" },
    { icon: "send", text: "Free UK Shipping Over £75", highlight: true },
    { icon: "shield-check", text: "12-Month Warranty", highlight: true },
]

const meta = {
    title: "Components/AnnouncementBar",
    component: AnnouncementBar,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Top-of-page bar for trust signals, promotions, and status messages. " +
                    "The first two items always show; items beyond two are hidden on mobile " +
                    "and revealed at `md`. Use `highlight` to accent an item with the theme primary colour.",
            },
        },
    },
    args: {
        items: ecommerceItems,
    },
    argTypes: {
        className: { control: false },
    },
} satisfies Meta<typeof AnnouncementBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const TrustSignals: Story = {
    name: "E-commerce trust signals",
    args: {
        items: ecommerceItems,
    },
}

export const TwoItems: Story = {
    name: "Two items (no overflow)",
    args: {
        items: [
            { icon: "zap", text: "Flash Sale — 20% off all builds", highlight: true },
            { icon: "send", text: "Free Next-Day Delivery", highlight: true },
        ],
    },
}

export const ThreeItems: Story = {
    name: "Three items (third hidden on mobile)",
    args: {
        items: [
            { icon: "star", text: "5-Star Rated", highlight: true },
            { icon: "users", text: "Trusted Worldwide" },
            { icon: "shield-check", text: "Money-Back Guarantee", highlight: true },
        ],
    },
}

export const NoIcons: Story = {
    name: "Text only (no icons)",
    args: {
        items: [
            { text: "Summer Sale — 20% off all builds" },
            { text: "Free UK Shipping Over £75" },
            { text: "12-Month Warranty on all products" },
        ],
    },
}

export const AllHighlighted: Story = {
    name: "All items highlighted",
    args: {
        items: [
            { icon: "zap", text: "Flash Sale", highlight: true },
            { icon: "package", text: "Free Next-Day Delivery", highlight: true },
            { icon: "shield-check", text: "Satisfaction Guaranteed", highlight: true },
        ],
    },
}

export const NoHighlights: Story = {
    name: "No highlights (subdued)",
    args: {
        items: [
            { icon: "clock", text: "Dispatched within 24 hours" },
            { icon: "send", text: "Tracked delivery" },
            { icon: "heart", text: "Handmade with care" },
            { icon: "shield-check", text: "1-Year warranty" },
        ],
    },
}

export const SingleItem: Story = {
    name: "Single promotional item",
    args: {
        items: [
            { icon: "zap", text: "Black Friday — 30% off sitewide", highlight: true },
        ],
    },
}

export const ManyItems: Story = {
    name: "Five items (overflow hidden on mobile)",
    args: {
        items: [
            { icon: "star", text: "5-Star Rated", highlight: true },
            { icon: "users", text: "10,000+ Customers" },
            { icon: "send", text: "Free Shipping", highlight: true },
            { icon: "shield-check", text: "12-Month Warranty", highlight: true },
            { icon: "heart", text: "Handmade in the UK" },
        ],
    },
}

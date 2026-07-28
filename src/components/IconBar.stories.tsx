import type { Meta, StoryObj } from "@storybook/react-vite"

import { IconBar, type IconBarItem } from "./IconBar"

const trustItems: IconBarItem[] = [
    { icon: "shield-check", title: "12-Month Warranty", description: "All builds come with our workmanship warranty." },
    { icon: "send", title: "Free UK Shipping", description: "On all orders over £75. Fast, tracked & secure." },
    { icon: "wrench", title: "Expertly Built", description: "Professionally tested and perfected before shipping." },
    { icon: "check-circle", title: "Quality Parts", description: "Premium components for reliability and longevity." },
    { icon: "message-circle", title: "Dedicated Support", description: "Questions? We're here before and after your purchase." },
]

const footerTrust: IconBarItem[] = [
    { icon: "lock", title: "Secure Payment", description: "Shop with confidence. Your data is safe." },
    { icon: "layers", title: "Multiple Options", description: "Klarna, Clearpay, PayPal and more." },
    { icon: "check-circle", title: "Hassle-Free Returns", description: "Not 100% happy? We'll make it right." },
]

const featureItems: IconBarItem[] = [
    { icon: "zap", title: "Lightning Fast", description: "Sub-100ms response times globally." },
    { icon: "shield-check", title: "Enterprise Security", description: "SOC 2 certified with end-to-end encryption." },
    { icon: "globe", title: "Global CDN", description: "Served from 200+ edge locations worldwide." },
    { icon: "code", title: "Developer First", description: "Comprehensive API with SDKs for every language." },
]

const meta = {
    title: "Components/IconBar",
    component: IconBar,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Trust or feature bar with icon, title, and optional description. " +
                    "Two layouts: `centered` (icon stacked above text) and `inline` (icon beside text). " +
                    "Column count is responsive — always 2-col on mobile, expanding to the " +
                    "specified count at `md`/`lg` breakpoints.",
            },
        },
    },
    args: {
        items: trustItems,
        layout: "centered",
        columns: 5,
    },
    argTypes: {
        layout: {
            control: "radio",
            options: ["centered", "inline"],
        },
        columns: {
            control: "radio",
            options: [2, 3, 4, 5],
        },
        className: { control: false },
    },
} satisfies Meta<typeof IconBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const CenteredFiveColumns: Story = {
    name: "Centered · 5 columns (trust bar)",
    args: {
        layout: "centered",
        columns: 5,
        items: trustItems,
    },
}

export const CenteredFourColumns: Story = {
    name: "Centered · 4 columns (features)",
    args: {
        layout: "centered",
        columns: 4,
        items: featureItems,
    },
}

export const CenteredThreeColumns: Story = {
    name: "Centered · 3 columns (footer trust)",
    args: {
        layout: "centered",
        columns: 3,
        items: footerTrust,
    },
}

export const CenteredTwoColumns: Story = {
    name: "Centered · 2 columns",
    args: {
        layout: "centered",
        columns: 2,
        items: trustItems.slice(0, 2),
    },
}

export const InlineThreeColumns: Story = {
    name: "Inline · 3 columns (compact footer)",
    args: {
        layout: "inline",
        columns: 3,
        items: footerTrust,
    },
}

export const InlineFourColumns: Story = {
    name: "Inline · 4 columns",
    args: {
        layout: "inline",
        columns: 4,
        items: featureItems,
    },
}

export const InlineFiveColumns: Story = {
    name: "Inline · 5 columns",
    args: {
        layout: "inline",
        columns: 5,
        items: trustItems,
    },
}

export const TitlesOnly: Story = {
    name: "Titles only (no descriptions)",
    args: {
        columns: 4,
        items: [
            { icon: "lock", title: "Secure Payment" },
            { icon: "layers", title: "Multiple Options" },
            { icon: "check-circle", title: "Hassle-Free Returns" },
            { icon: "heart", title: "Loved by Customers" },
        ],
    },
}

export const TitlesOnlyInline: Story = {
    name: "Titles only · inline layout",
    args: {
        layout: "inline",
        columns: 4,
        items: [
            { icon: "lock", title: "Secure Payment" },
            { icon: "layers", title: "Multiple Options" },
            { icon: "check-circle", title: "Hassle-Free Returns" },
            { icon: "heart", title: "Loved by Customers" },
        ],
    },
}

export const LayoutComparison: Story = {
    name: "Layout comparison (centered vs inline)",
    render: () => (
        <div>
            <IconBar items={footerTrust} layout="centered" columns={3} />
            <div className="h-4" />
            <IconBar items={footerTrust} layout="inline" columns={3} />
        </div>
    ),
}

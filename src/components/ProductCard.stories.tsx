import type { Meta, StoryObj } from "@storybook/react-vite"

import { Icon } from "./Icon"
import { ProductCard, type ProductBadgeVariant } from "./ProductCard"

function PlaceholderImage({ emoji = "🎮", bg }: { emoji?: string; bg?: string }) {
    return (
        <div className="flex h-full w-full items-center justify-center" style={bg ? { background: bg } : undefined}>
            <span className="text-5xl opacity-30">{emoji}</span>
        </div>
    )
}

const meta = {
    title: "Components/ProductCard",
    component: ProductCard,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "E-commerce product card with square image area, optional badge, price, " +
                    "and star rating. When `href` is provided the entire card wraps in an `<a>`. " +
                    "Badges come in three variants: `default` (primary), `success` (green), " +
                    "and `danger` (red). The image slot accepts any `ReactNode` — an `<img>`, " +
                    "an emoji placeholder, or an `Icon` component.",
            },
        },
    },
    args: {
        title: "GBC — Crystal Purple IPS Premium Build",
        price: "£209.99",
        rating: 5,
        reviewCount: 82,
        badge: { label: "New", variant: "default" },
        image: <PlaceholderImage />,
        href: "#product",
    },
    argTypes: {
        image: { control: false },
        className: { control: false },
    },
    render: (args) => (
        <div className="w-56">
            <ProductCard {...args} />
        </div>
    ),
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const BadgeVariants: Story = {
    name: "Badge variants (default / success / danger)",
    parameters: { layout: "padded" },
    render: () => (
        <div className="flex flex-wrap gap-4">
            {(
                [
                    { label: "New", variant: "default", title: "Crystal Purple IPS Premium", emoji: "🟣", price: "£209.99" },
                    { label: "Best Seller", variant: "success", title: "Pikachu Edition IPS Build", emoji: "🟡", price: "£219.99" },
                    { label: "Limited", variant: "danger", title: "Clear Smoke IPS Premium", emoji: "🔘", price: "£214.99" },
                ] as const
            ).map((p) => (
                <div key={p.variant} className="w-56">
                    <ProductCard
                        title={p.title}
                        price={p.price}
                        badge={{ label: p.label, variant: p.variant as ProductBadgeVariant }}
                        rating={5}
                        reviewCount={82}
                        image={<PlaceholderImage emoji={p.emoji} />}
                        href="#badge"
                    />
                </div>
            ))}
        </div>
    ),
}

export const NoBadge: Story = {
    name: "Without badge",
    args: {
        badge: undefined,
        title: "GBA — Clean White IPS & USB-C Build",
        price: "£189.99",
        rating: 4.5,
        reviewCount: 64,
        image: <PlaceholderImage emoji="🕹️" />,
    },
}

export const NoRating: Story = {
    name: "Without rating",
    args: {
        rating: undefined,
        reviewCount: undefined,
        badge: undefined,
        title: "Replacement Shell — Atomic Purple",
        price: "£12.99",
    },
}

export const NoHref: Story = {
    name: "Non-clickable (no href)",
    args: {
        href: undefined,
        badge: undefined,
        title: "Display-only product card",
        price: "£149.99",
    },
}

export const WithIconImage: Story = {
    name: "Icon as image",
    args: {
        image: (
            <div className="flex flex-col items-center gap-1 text-primary">
                <Icon icon="package" size="xl" />
            </div>
        ),
        title: "USB-C Battery Mod Kit",
        price: "£24.99",
        badge: undefined,
        rating: 5,
        reviewCount: 41,
    },
}

export const LongTitle: Story = {
    name: "Long title (2-line clamp)",
    args: {
        title: "Game Boy Color — Crystal Purple IPS V3 Premium Build with USB-C Charging and CleanAmp Pro Audio",
        price: "£249.99",
        badge: { label: "New", variant: "default" },
    },
}

export const HalfStarRating: Story = {
    name: "4.5 star rating",
    args: {
        rating: 4.5,
        reviewCount: 53,
        badge: { label: "Limited", variant: "danger" },
        title: "GBC — Clear Smoke IPS Premium Build",
        price: "£214.99",
        image: <PlaceholderImage emoji="🔘" />,
    },
}

export const GridTwoColumns: Story = {
    name: "Grid · 2 columns",
    parameters: { layout: "padded" },
    render: () => (
        <div className="grid max-w-lg grid-cols-2 gap-4">
            {[
                { title: "GBC — Atomic Purple IPS", price: "£189.99", emoji: "🟣", badge: "New" },
                { title: "GBC — Berry IPS Premium", price: "£199.99", emoji: "🔴", badge: "New" },
                { title: "GBA — Glacier IPS & USB-C", price: "£209.99", emoji: "🔵", badge: "Best Seller" },
                { title: "GBC — Pikachu Edition", price: "£219.99", emoji: "🟡", badge: "Limited" },
            ].map((p) => (
                <ProductCard
                    key={p.title}
                    title={p.title}
                    price={p.price}
                    badge={{
                        label: p.badge,
                        variant: p.badge === "Best Seller" ? "success" : p.badge === "Limited" ? "danger" : "default",
                    }}
                    rating={5}
                    reviewCount={Math.floor(Math.random() * 80) + 30}
                    image={<PlaceholderImage emoji={p.emoji} />}
                    href="#grid"
                />
            ))}
        </div>
    ),
}

export const GridFourColumns: Story = {
    name: "Grid · 4 columns",
    parameters: { layout: "padded" },
    render: () => (
        <div className="grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
                { title: "GBC — Atomic Purple IPS", price: "£189.99", emoji: "🟣", badge: "New" },
                { title: "GBC — Berry IPS Premium", price: "£199.99", emoji: "🔴", badge: "New" },
                { title: "GBA — Glacier IPS & USB-C", price: "£209.99", emoji: "🔵", badge: "Best Seller" },
                { title: "GBC — Pikachu Edition", price: "£219.99", emoji: "🟡", badge: "Limited" },
            ].map((p) => (
                <ProductCard
                    key={p.title}
                    title={p.title}
                    price={p.price}
                    badge={{
                        label: p.badge,
                        variant: p.badge === "Best Seller" ? "success" : p.badge === "Limited" ? "danger" : "default",
                    }}
                    rating={5}
                    reviewCount={Math.floor(Math.random() * 80) + 30}
                    image={<PlaceholderImage emoji={p.emoji} />}
                    href="#grid"
                />
            ))}
        </div>
    ),
}

export const GridFiveColumns: Story = {
    name: "Grid · 5 columns (product listing)",
    parameters: { layout: "padded" },
    render: () => (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {[
                { title: "GBC — Crystal Purple IPS", price: "£209.99", emoji: "🟣", badge: "New", reviews: 82 },
                { title: "GBA — Clean White IPS", price: "£189.99", emoji: "⚪", badge: "New", reviews: 64 },
                { title: "GBC — Pikachu Edition IPS", price: "£219.99", emoji: "🟡", badge: "Best Seller", reviews: 97 },
                { title: "GBC — Clear Smoke IPS", price: "£214.99", emoji: "🔘", badge: "Limited", reviews: 53 },
                { title: "GBA — Clear Green IPS", price: "£199.99", emoji: "🟢", badge: "New", reviews: 71 },
            ].map((p) => (
                <ProductCard
                    key={p.title}
                    title={p.title}
                    price={p.price}
                    badge={{
                        label: p.badge,
                        variant: p.badge === "Best Seller" ? "success" : p.badge === "Limited" ? "danger" : "default",
                    }}
                    rating={5}
                    reviewCount={p.reviews}
                    image={<PlaceholderImage emoji={p.emoji} />}
                    href="#grid"
                />
            ))}
        </div>
    ),
}

export const MixedContent: Story = {
    name: "Mixed content (accessories + builds)",
    parameters: { layout: "padded" },
    render: () => (
        <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
            <ProductCard
                title="GBC — Crystal Purple IPS Premium Build"
                price="£209.99"
                badge={{ label: "New", variant: "default" }}
                rating={5}
                reviewCount={82}
                image={<PlaceholderImage emoji="🟣" />}
                href="#builds"
            />
            <ProductCard
                title="IPS V3 Screen Kit"
                price="£44.99"
                rating={5}
                reviewCount={128}
                image={
                    <div className="flex h-full w-full items-center justify-center text-primary">
                        <Icon icon="eye" size="xl" />
                    </div>
                }
                href="#parts"
            />
            <ProductCard
                title="USB-C Battery Mod Kit"
                price="£24.99"
                rating={4.5}
                reviewCount={41}
                image={
                    <div className="flex h-full w-full items-center justify-center text-primary">
                        <Icon icon="zap" size="xl" />
                    </div>
                }
                href="#parts"
            />
        </div>
    ),
}

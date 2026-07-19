import * as React from "react"

import { cn } from "../lib/utils"
import { Button } from "./Button"
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs"
import { Heading } from "./Heading"
import { Icon } from "./Icon"
import { gridClass, laneClass, type LaneWidth } from "./layout"
import { Text } from "./Text"

export type HeroAction = {
    label: string
    href?: string
    onClick?: () => void
    style?: "link" | "button"
    variant?: "primary" | "secondary"
}

export type HeroVariant = "default" | "split" | "centered" | "minimal"

export type HeroProps = {
    breadcrumbs?: BreadcrumbItem[]
    chip?: string
    title: string
    body?: string
    actions?: HeroAction[]
    image?: React.ReactNode
    imagePosition?: "right" | "left"
    headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    variant?: HeroVariant
    width?: LaneWidth
    titleId?: string
    className?: string
}

function HeroBreadcrumbs({ breadcrumbs, width, tone }: { breadcrumbs: BreadcrumbItem[]; width: LaneWidth; tone: "hero" | "default" }) {
    return (
        <div className={`${gridClass} px-6 xl:px-8`}>
            <div className={laneClass(width)}>
                <Breadcrumbs tone={tone} items={breadcrumbs} />
            </div>
        </div>
    )
}

function HeroChip({ chip, isLight }: { chip: string; isLight?: boolean }) {
    return (
        <Text
            as="span"
            size="inherit"
            tone="inherit"
            weight="inherit"
            className={isLight ? "inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary" : "site-hero-chip"}
        >
            {chip}
        </Text>
    )
}

function HeroContent({
    chip,
    title,
    body,
    actions,
    titleId,
    headingLevel = "h1",
    isLight,
    centered,
}: {
    chip?: string
    title: string
    body?: string
    actions?: HeroAction[]
    titleId?: string
    headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    isLight?: boolean
    centered?: boolean
}) {
    return (
        <div className={cn("space-y-8", centered && "text-center")}>
            {chip ? <HeroChip chip={chip} isLight={isLight} /> : null}

            <div className="space-y-5">
                <Heading
                    as={headingLevel}
                    size="display"
                    tone={isLight ? "default" : "hero"}
                    id={titleId}
                    className={cn("max-w-4xl", centered && "mx-auto")}
                >
                    {title}
                </Heading>

                {body ? (
                    <Text
                        size="lead"
                        tone={isLight ? "muted" : "hero"}
                        className={cn("max-w-3xl", centered && "mx-auto")}
                    >
                        {body}
                    </Text>
                ) : null}
            </div>

            {actions?.length ? (
                <div className={cn("flex flex-wrap gap-3", centered && "justify-center")}>
                    {actions.map(({ label, href, onClick, style = "button", variant }) => (
                        style === "link" ? (
                            href ? (
                                <a
                                    key={label}
                                    href={href}
                                    onClick={onClick}
                                    className={cn(
                                        "inline-flex items-center gap-1 text-sm font-medium hover:underline",
                                        isLight ? "text-foreground" : "text-white/90 hover:text-white",
                                    )}
                                >
                                    {label}
                                    <Icon icon="arrow-right" size="sm" />
                                </a>
                            ) : (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={onClick}
                                    className={cn(
                                        "inline-flex items-center gap-1 text-sm font-medium hover:underline",
                                        isLight ? "text-foreground" : "text-white/90 hover:text-white",
                                    )}
                                >
                                    {label}
                                    <Icon icon="arrow-right" size="sm" />
                                </button>
                            )
                        ) : (
                            <Button
                                key={label}
                                size="lg"
                                variant={
                                    isLight
                                        ? variant === "secondary" ? "secondary" : "primary"
                                        : variant === "secondary" ? "heroSecondary" : "heroPrimary"
                                }
                                onClick={href ? undefined : onClick}
                                asChild={Boolean(href)}
                            >
                                {href ? (
                                    <a href={href} onClick={onClick}>
                                        {label}
                                    </a>
                                ) : (
                                    label
                                )}
                            </Button>
                        )
                    ))}
                </div>
            ) : null}
        </div>
    )
}

function HeroImage({ image, className }: { image: React.ReactNode; className?: string }) {
    return (
        <div className={cn("overflow-hidden rounded-2xl shadow-2xl", className)}>
            {image}
        </div>
    )
}

function DefaultHero({ breadcrumbs, chip, title, body, actions, headingLevel, width = 10, titleId, className }: HeroProps) {
    const hasBreadcrumbs = Boolean(breadcrumbs?.length)

    return (
        <section className={cn("site-hero", className)} aria-labelledby={titleId}>
            <div className="site-hero-glow site-hero-glow-right" />
            <div className="site-hero-glow site-hero-glow-left" />

            <div
                className={cn(
                    "relative mx-auto w-full max-w-[1600px] pb-14 lg:pb-20",
                    hasBreadcrumbs ? "pt-5" : "pt-14 lg:pt-20"
                )}
            >
                {hasBreadcrumbs ? <HeroBreadcrumbs breadcrumbs={breadcrumbs!} width={width} tone="hero" /> : null}

                <div
                    className={cn(
                        `${gridClass} px-6 xl:px-8`,
                        hasBreadcrumbs && "pt-10 lg:pt-14"
                    )}
                >
                    <div className={`${laneClass(width)} space-y-8`}>
                        <HeroContent chip={chip} title={title} body={body} actions={actions} titleId={titleId} headingLevel={headingLevel} />
                    </div>
                </div>
            </div>
        </section>
    )
}

function SplitHero({ breadcrumbs, chip, title, body, actions, image, imagePosition = "right", headingLevel, width = 12, titleId, className }: HeroProps) {
    const hasBreadcrumbs = Boolean(breadcrumbs?.length)
    const isLeft = imagePosition === "left"

    return (
        <section className={cn("site-hero", className)} aria-labelledby={titleId}>
            <div className="site-hero-glow site-hero-glow-right" />
            <div className="site-hero-glow site-hero-glow-left" />

            <div
                className={cn(
                    "relative mx-auto w-full max-w-[1600px] pb-14 lg:pb-20",
                    hasBreadcrumbs ? "pt-5" : "pt-14 lg:pt-20"
                )}
            >
                {hasBreadcrumbs ? <HeroBreadcrumbs breadcrumbs={breadcrumbs!} width={width} tone="hero" /> : null}

                <div
                    className={cn(
                        `${gridClass} px-6 xl:px-8`,
                        hasBreadcrumbs && "pt-10 lg:pt-14"
                    )}
                >
                    <div className={cn(
                        laneClass(width),
                        "flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16",
                        isLeft && "lg:flex-row-reverse",
                    )}>
                        <div className="flex-1">
                            <HeroContent chip={chip} title={title} body={body} actions={actions} titleId={titleId} headingLevel={headingLevel} />
                        </div>
                        {image ? (
                            <div className="flex-1">
                                <HeroImage image={image} />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    )
}

function CenteredHero({ breadcrumbs, chip, title, body, actions, image, headingLevel, width = 10, titleId, className }: HeroProps) {
    const hasBreadcrumbs = Boolean(breadcrumbs?.length)

    return (
        <section className={cn("site-hero", className)} aria-labelledby={titleId}>
            <div className="site-hero-glow site-hero-glow-right" />
            <div className="site-hero-glow site-hero-glow-left" />

            <div
                className={cn(
                    "relative mx-auto w-full max-w-[1600px] pb-14 lg:pb-20",
                    hasBreadcrumbs ? "pt-5" : "pt-14 lg:pt-20"
                )}
            >
                {hasBreadcrumbs ? <HeroBreadcrumbs breadcrumbs={breadcrumbs!} width={width} tone="hero" /> : null}

                <div
                    className={cn(
                        `${gridClass} px-6 xl:px-8`,
                        hasBreadcrumbs && "pt-10 lg:pt-14"
                    )}
                >
                    <div className={laneClass(width)}>
                        <HeroContent chip={chip} title={title} body={body} actions={actions} titleId={titleId} headingLevel={headingLevel} centered />

                        {image ? (
                            <div className="mt-12 lg:mt-16">
                                <HeroImage image={image} className="mx-auto max-w-4xl" />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    )
}

function MinimalHero({ breadcrumbs, chip, title, body, actions, image, imagePosition = "right", headingLevel, width = 12, titleId, className }: HeroProps) {
    const hasBreadcrumbs = Boolean(breadcrumbs?.length)
    const isLeft = imagePosition === "left"

    return (
        <section
            className={cn(
                "relative w-full border-b border-border bg-background",
                className,
            )}
            aria-labelledby={titleId}
        >
            <div
                className={cn(
                    "relative mx-auto w-full max-w-[1600px] pb-10 lg:pb-14",
                    hasBreadcrumbs ? "pt-5" : "pt-10 lg:pt-14"
                )}
            >
                {hasBreadcrumbs ? <HeroBreadcrumbs breadcrumbs={breadcrumbs!} width={width} tone="default" /> : null}

                <div
                    className={cn(
                        `${gridClass} px-6 xl:px-8`,
                        hasBreadcrumbs && "pt-8 lg:pt-10"
                    )}
                >
                    <div className={cn(
                        laneClass(width),
                        image
                            ? cn("flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16", isLeft && "lg:flex-row-reverse")
                            : "",
                    )}>
                        <div className={image ? "flex-1" : ""}>
                            <HeroContent chip={chip} title={title} body={body} actions={actions} titleId={titleId} headingLevel={headingLevel} isLight />
                        </div>
                        {image ? (
                            <div className="flex-1">
                                <HeroImage image={image} className="shadow-lg" />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    )
}

const variants: Record<HeroVariant, React.ComponentType<HeroProps>> = {
    default: DefaultHero,
    split: SplitHero,
    centered: CenteredHero,
    minimal: MinimalHero,
}

export function Hero(props: HeroProps) {
    const Variant = variants[props.variant || "default"]
    return <Variant {...props} />
}

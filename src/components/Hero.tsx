import * as React from "react"

import { cn } from "../lib/utils"
import { Button } from "./Button"
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs"
import { Heading } from "./Heading"
import { gridClass, laneClass, type LaneWidth } from "./layout"
import { Text } from "./Text"

export type HeroAction = {
    label: string
    href?: string
    onClick?: () => void
    variant?: "primary" | "secondary"
}

export type HeroProps = {
    /** Breadcrumb trail shown at the very top of the hero. */
    breadcrumbs?: BreadcrumbItem[]
    /** Small pill label above the title. */
    chip?: string
    title: string
    body?: string
    actions?: HeroAction[]
    width?: LaneWidth
    titleId?: string
    className?: string
}

/**
 * Full-width dark gradient hero with glow effects.
 * Styling ships in the package's theme.css (site-hero-* classes).
 */
export function Hero({
    breadcrumbs,
    chip,
    title,
    body,
    actions,
    width = 10,
    titleId,
    className,
}: HeroProps) {
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
                {hasBreadcrumbs ? (
                    <div className={`${gridClass} px-6 xl:px-8`}>
                        <div className={laneClass(width)}>
                            <Breadcrumbs tone="hero" items={breadcrumbs!} />
                        </div>
                    </div>
                ) : null}

                <div
                    className={cn(
                        `${gridClass} px-6 xl:px-8`,
                        hasBreadcrumbs && "pt-10 lg:pt-14"
                    )}
                >
                    <div className={`${laneClass(width)} space-y-8`}>
                        {chip ? (
                            <Text
                                as="span"
                                size="inherit"
                                tone="inherit"
                                weight="inherit"
                                className="site-hero-chip"
                            >
                                {chip}
                            </Text>
                        ) : null}

                        <div className="space-y-5">
                            <Heading
                                as="h1"
                                size="display"
                                tone="hero"
                                id={titleId}
                                className="max-w-4xl"
                            >
                                {title}
                            </Heading>

                            {body ? (
                                <Text size="lead" tone="hero" className="max-w-3xl">
                                    {body}
                                </Text>
                            ) : null}
                        </div>

                        {actions?.length ? (
                            <div className="flex flex-wrap gap-3">
                                {actions.map(({ label, href, onClick, variant }) => (
                                    <Button
                                        key={label}
                                        size="lg"
                                        variant={
                                            variant === "secondary" ? "heroSecondary" : "heroPrimary"
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
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    )
}

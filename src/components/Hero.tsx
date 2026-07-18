import * as React from "react"

import { cn } from "../lib/utils"
import { Button } from "./Button"
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs"
import { gridClass, laneClass, type LaneWidth } from "./layout"

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
    return (
        <section className={cn("site-hero", className)} aria-labelledby={titleId}>
            <div className="site-hero-glow site-hero-glow-right" />
            <div className="site-hero-glow site-hero-glow-left" />

            <div className="relative mx-auto w-full max-w-[1600px] py-14 lg:py-20">
                <div className={`${gridClass} px-6 xl:px-8`}>
                    <div className={`${laneClass(width)} space-y-8`}>
                        {breadcrumbs?.length ? (
                            <Breadcrumbs tone="hero" items={breadcrumbs} />
                        ) : null}

                        {chip ? <div className="site-hero-chip">{chip}</div> : null}

                        <div className="space-y-5">
                            <h1
                                id={titleId}
                                className="site-hero-title max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl"
                            >
                                {title}
                            </h1>

                            {body ? (
                                <p className="site-hero-body max-w-3xl text-lg leading-8 sm:text-xl">
                                    {body}
                                </p>
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

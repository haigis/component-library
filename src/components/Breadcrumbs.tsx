import * as React from "react"

import { cn } from "../lib/utils"
import { Icon } from "./Icon"

export type BreadcrumbItem = {
    label: string
    href?: string
    onClick?: () => void
}

export type BreadcrumbsProps = {
    items: BreadcrumbItem[]
    /** "hero" restyles for the dark Hero background. */
    tone?: "default" | "hero"
    className?: string
}

/** Breadcrumb trail. The last item is the current page (not a link). */
export function Breadcrumbs({ items, tone = "default", className }: BreadcrumbsProps) {
    const isHero = tone === "hero"

    const navClass = isHero
        ? "site-hero-body text-sm"
        : "text-sm text-muted-foreground"
    const linkClass = cn(
        "underline-offset-4 transition-colors hover:underline",
        isHero ? "hover:text-[var(--hero-fg)]" : "hover:text-foreground"
    )
    const currentClass = cn(
        "font-medium",
        isHero ? "text-[var(--hero-fg)]" : "text-foreground"
    )

    return (
        <nav aria-label="Breadcrumb" className={cn(navClass, className)}>
            <ol className="flex flex-wrap items-center gap-1.5">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                            {index > 0 ? (
                                <Icon
                                    icon="chevron-right"
                                    size="sm"
                                    className="shrink-0 opacity-60"
                                />
                            ) : null}

                            {isLast ? (
                                <span aria-current="page" className={currentClass}>
                                    {item.label}
                                </span>
                            ) : item.href ? (
                                <a href={item.href} onClick={item.onClick} className={linkClass}>
                                    {item.label}
                                </a>
                            ) : item.onClick ? (
                                <button type="button" onClick={item.onClick} className={linkClass}>
                                    {item.label}
                                </button>
                            ) : (
                                <span>{item.label}</span>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

import * as React from "react"

import { cn } from "../lib/utils"
import type { NavItem } from "../lib/nav"
import { shellClass, gridClass, laneClass, type LaneWidth } from "./layout"
import { Text } from "./Text"

export type SiteFooterProps = {
    brand: React.ReactNode
    tagline?: string
    items?: NavItem[]
    width?: LaneWidth
    className?: string
}

/** Site footer: brand and tagline on the left, nav links on the right. */
export function SiteFooter({
    brand,
    tagline,
    items = [],
    width = 10,
    className,
}: SiteFooterProps) {
    const linkClass = "transition-colors hover:text-foreground"

    return (
        <footer className={cn("border-t border-border bg-card", className)}>
            <div className={shellClass}>
                <div className={gridClass}>
                    <div
                        className={`${laneClass(width)} flex flex-col gap-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between`}
                    >
                        <div>
                            <Text size="sm" weight="medium">{brand}</Text>
                            {tagline ? <Text size="sm" tone="muted">{tagline}</Text> : null}
                        </div>

                        {items.length ? (
                            <nav className="flex flex-wrap gap-4">
                                {items.map((item) =>
                                    item.href ? (
                                        <a
                                            key={item.id}
                                            href={item.href}
                                            onClick={item.onClick}
                                            className={linkClass}
                                        >
                                            {item.label}
                                        </a>
                                    ) : (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={item.onClick}
                                            className={linkClass}
                                        >
                                            {item.label}
                                        </button>
                                    )
                                )}
                            </nav>
                        ) : null}
                    </div>
                </div>
            </div>
        </footer>
    )
}

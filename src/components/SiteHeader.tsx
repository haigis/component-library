import * as React from "react"

import { cn } from "../lib/utils"
import { Icon } from "./Icon"
import type { NavItem } from "../lib/nav"
import { shellClass, gridClass, laneClass, type LaneWidth } from "./layout"
import { Text } from "./Text"

export type SiteHeaderProps = {
    brand: React.ReactNode
    brandHref?: string
    onBrandClick?: () => void
    items?: NavItem[]
    /** id of the currently active nav item. */
    activeId?: string
    width?: LaneWidth
    className?: string
}

/** Sticky site header: brand, pill-style desktop nav, hamburger menu on mobile. */
export function SiteHeader({
    brand,
    brandHref,
    onBrandClick,
    items = [],
    activeId,
    width = 10,
    className,
}: SiteHeaderProps) {
    const [menuOpen, setMenuOpen] = React.useState(false)

    const brandClass =
        "shrink-0 text-left text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"

    const handleItem = (item: NavItem) => {
        setMenuOpen(false)
        item.onClick?.()
    }

    return (
        <header
            className={cn(
                "sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-xl",
                className
            )}
        >
            <div className={shellClass}>
                <div className={gridClass}>
                    <div
                        className={`${laneClass(width)} flex h-18 items-center justify-between gap-6`}
                    >
                        {brandHref ? (
                            <a href={brandHref} onClick={onBrandClick} className={brandClass}>
                                {brand}
                            </a>
                        ) : (
                            <button type="button" onClick={onBrandClick} className={brandClass}>
                                {brand}
                            </button>
                        )}

                        <nav className="hidden items-center gap-1 md:flex">
                            {items.map((item) => {
                                const isActive = activeId === item.id
                                const itemClass = cn(
                                    "relative rounded-full px-4 py-2.5 text-sm transition-colors",
                                    isActive
                                        ? "bg-card text-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-card/70 hover:text-foreground"
                                )

                                return item.href ? (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => handleItem(item)}
                                        className={itemClass}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleItem(item)}
                                        className={itemClass}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        {item.label}
                                    </button>
                                )
                            })}
                        </nav>

                        {items.length ? (
                            <button
                                type="button"
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={menuOpen}
                                onClick={() => setMenuOpen((open) => !open)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted md:hidden"
                            >
                                {menuOpen ? <Icon icon="x" size="md" /> : <Icon icon="menu" size="md" />}
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>

            {menuOpen ? (
                <div className="border-t border-border bg-background md:hidden">
                    <div className={shellClass}>
                        <div className={gridClass}>
                            <div className={`${laneClass(width)} py-4`}>
                                <nav className="grid gap-2">
                                    {items.map((item) => {
                                        const isActive = activeId === item.id
                                        const itemClass = cn(
                                            "flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
                                            isActive
                                                ? "border-border bg-card text-foreground shadow-sm"
                                                : "border-transparent bg-transparent text-muted-foreground hover:border-border hover:bg-card/70 hover:text-foreground"
                                        )
                                        const content = (
                                            <>
                                                <span>{item.label}</span>
                                                {isActive ? (
                                                    <Text as="span" size="xs" tone="primary" weight="medium">
                                                        Current
                                                    </Text>
                                                ) : null}
                                            </>
                                        )

                                        return item.href ? (
                                            <a
                                                key={item.id}
                                                href={item.href}
                                                onClick={() => handleItem(item)}
                                                className={itemClass}
                                            >
                                                {content}
                                            </a>
                                        ) : (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => handleItem(item)}
                                                className={itemClass}
                                            >
                                                {content}
                                            </button>
                                        )
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    )
}

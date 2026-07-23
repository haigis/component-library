import * as React from "react"

import { cn } from "../lib/utils"
import type { IconProp } from "../lib/icons"
import { Icon } from "./Icon"

export type AnnouncementBarItem = {
    icon?: IconProp
    text: string
    highlight?: boolean
}

export type AnnouncementBarProps = {
    items: AnnouncementBarItem[]
    className?: string
}

export function AnnouncementBar({ items, className }: AnnouncementBarProps) {
    return (
        <div
            className={cn(
                "border-b border-border bg-muted text-muted-foreground text-[0.8125rem]",
                className
            )}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
                <div className="flex items-center gap-6">
                    {items.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs">
                            {item.icon ? (
                                <span className={item.highlight ? "text-primary" : undefined}>
                                    <Icon icon={item.icon} size="sm" />
                                </span>
                            ) : null}
                            <span
                                className={
                                    item.highlight
                                        ? "font-medium text-primary"
                                        : undefined
                                }
                            >
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
                {items.length > 2 ? (
                    <div className="hidden items-center gap-6 md:flex">
                        {items.slice(2).map((item, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs">
                                {item.icon ? (
                                    <span className={item.highlight ? "text-primary" : undefined}>
                                        <Icon icon={item.icon} size="sm" />
                                    </span>
                                ) : null}
                                <span
                                    className={
                                        item.highlight
                                            ? "font-medium text-primary"
                                            : undefined
                                    }
                                >
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

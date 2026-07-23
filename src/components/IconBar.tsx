import * as React from "react"

import { cn } from "../lib/utils"
import type { IconProp } from "../lib/icons"
import { Icon } from "./Icon"
import { Text } from "./Text"

export type IconBarItem = {
    icon: IconProp
    title: string
    description?: string
}

export type IconBarLayout = "centered" | "inline"

export type IconBarProps = {
    items: IconBarItem[]
    layout?: IconBarLayout
    columns?: 2 | 3 | 4 | 5
    className?: string
}

export function IconBar({
    items,
    layout = "centered",
    columns = 5,
    className,
}: IconBarProps) {
    const colsClass =
        columns === 2
            ? "grid-cols-2"
            : columns === 3
              ? "grid-cols-2 md:grid-cols-3"
              : columns === 4
                ? "grid-cols-2 md:grid-cols-4"
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"

    return (
        <div
            className={cn(
                "border-y border-border bg-card py-8",
                className
            )}
        >
            <div className={cn("mx-auto grid max-w-7xl gap-6 px-4", colsClass)}>
                {items.map((item, i) => (
                    <div
                        key={i}
                        className={cn(
                            layout === "centered"
                                ? "flex flex-col items-center text-center"
                                : "flex items-start gap-3"
                        )}
                    >
                        <div
                            className={cn(
                                "shrink-0 text-primary",
                                layout === "centered" ? "mb-2" : "mt-0.5"
                            )}
                        >
                            <Icon
                                icon={item.icon}
                                size={layout === "centered" ? "md" : "sm"}
                            />
                        </div>
                        <div>
                            <Text
                                as="span"
                                size="xs"
                                weight="semibold"
                                className="font-bold uppercase tracking-wider"
                            >
                                {item.title}
                            </Text>
                            {item.description ? (
                                <Text size="xs" tone="muted" className="leading-relaxed">
                                    {item.description}
                                </Text>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

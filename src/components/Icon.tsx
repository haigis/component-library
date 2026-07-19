import * as React from "react"

import { cn } from "../lib/utils"
import { resolveIcon, type IconProp } from "../lib/icons"

const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-3.5 w-3.5",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-10 w-10",
} as const

export type IconSize = keyof typeof sizeClasses | "full"

export type IconProps = {
    icon: IconProp
    size?: IconSize
    className?: string
    /** Accessible name for meaningful standalone icons. Omit for decorative icons. */
    label?: string
}

export function Icon({ icon, size = "md", className, label }: IconProps) {
    const Resolved = resolveIcon(icon)
    const accessibilityProps = label
        ? { "aria-label": label, role: "img" as const }
        : { "aria-hidden": true as const }

    if (size === "full") {
        return (
            <span className={cn("inline-flex h-full aspect-square", className)}>
                <Resolved
                    {...accessibilityProps}
                    className="h-full w-full"
                    focusable="false"
                />
            </span>
        )
    }

    return (
        <Resolved
            {...accessibilityProps}
            className={cn(sizeClasses[size], className)}
            focusable="false"
        />
    )
}

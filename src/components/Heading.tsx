import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

export const headingVariants = cva(
    "scroll-m-20 text-balance font-semibold tracking-normal",
    {
        variants: {
            size: {
                display: "text-5xl sm:text-6xl",
                page: "text-4xl",
                section: "text-3xl",
                card: "text-xl",
                subheading: "text-lg",
                inherit: "",
            },
            tone: {
                default: "text-foreground",
                hero: "site-hero-title",
                inherit: "",
            },
        },
        defaultVariants: {
            size: "section",
            tone: "default",
        },
    }
)

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export interface HeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof headingVariants> {
    /** Semantic heading element, independent from the visual size. */
    as?: HeadingLevel
}

export function Heading({
    as: Comp = "h2",
    size = "section",
    tone = "default",
    className,
    ...props
}: HeadingProps) {
    return (
        <Comp
            data-slot="heading"
            className={cn(headingVariants({ size, tone }), className)}
            {...props}
        />
    )
}

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

export const textVariants = cva("", {
    variants: {
        size: {
            lead: "text-lg leading-8 sm:text-xl",
            body: "text-base leading-7",
            sm: "text-sm leading-6",
            xs: "text-xs leading-4",
            inherit: "",
        },
        tone: {
            default: "text-foreground",
            muted: "text-muted-foreground",
            primary: "text-primary",
            hero: "site-hero-body",
            inherit: "",
        },
        weight: {
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            inherit: "",
        },
    },
    defaultVariants: {
        size: "body",
        tone: "default",
        weight: "normal",
    },
})

export type TextElement = "p" | "span" | "div" | "small"

export interface TextProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof textVariants> {
    /** Semantic text element, independent from the visual style. */
    as?: TextElement
}

export function Text({
    as = "p",
    size = "body",
    tone = "default",
    weight = "normal",
    className,
    ...props
}: TextProps) {
    const Comp = as as React.ElementType

    return (
        <Comp
            data-slot="text"
            className={cn(textVariants({ size, tone, weight }), className)}
            {...props}
        />
    )
}

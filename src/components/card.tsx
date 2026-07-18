

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

export const cardVariants = cva(
    [
        "rounded-2xl border text-card-foreground",
        "shadow-sm transition-[background,border-color,box-shadow] duration-200",
    ],
    {
        variants: {
            tone: {
                default: "bg-card border-border",
                alt: "site-card-alt border-border",
                muted: "bg-muted/60 border-border",
                elevated: "bg-card border-border shadow-md",
            },
            size: {
                default: "p-6",
                sm: "p-4",
            },
        },
        defaultVariants: {
            tone: "default",
            size: "default",
        },
    }
)

type CardVariantProps = VariantProps<typeof cardVariants>

export function cardClass(
    props: CardVariantProps & { className?: string } = {}
) {
    const { tone = "default", size = "default", className } = props
    return cn(cardVariants({ tone, size }), className)
}

export type CardProps = React.ComponentProps<"div"> & CardVariantProps

export function Card({
    className,
    tone = "default",
    size = "default",
    ...props
}: CardProps) {
    return (
        <div
            data-slot="card"
            className={cn(cardVariants({ tone, size }), className)}
            {...props}
        />
    )
}

export function CardHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-header"
            className={cn(
                "grid auto-rows-min grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1.5",
                className
            )}
            {...props}
        />
    )
}

export function CardTitle({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-title"
            className={cn("text-xl font-semibold tracking-tight text-foreground", className)}
            {...props}
        />
    )
}

export function CardDescription({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-description"
            className={cn("col-start-1 text-sm text-muted-foreground", className)}
            {...props}
        />
    )
}

export function CardAction({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-action"
            className={cn("col-start-2 row-span-2 row-start-1 self-start", className)}
            {...props}
        />
    )
}

export function CardContent({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-content"
            className={cn("mt-5", className)}
            {...props}
        />
    )
}

export function CardFooter({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-footer"
            className={cn("mt-5 flex flex-wrap items-center gap-3", className)}
            {...props}
        />
    )
}


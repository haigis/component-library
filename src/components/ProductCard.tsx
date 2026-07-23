import * as React from "react"

import { cn } from "../lib/utils"
import { cardClass } from "./card"

export type ProductBadgeVariant = "default" | "success" | "danger"

export type ProductCardBadge = {
    label: string
    variant?: ProductBadgeVariant
}

export type ProductCardProps = {
    title: string
    price: string
    badge?: ProductCardBadge
    rating?: number
    reviewCount?: number
    href?: string
    image?: React.ReactNode
    className?: string
}

const badgeClass: Record<ProductBadgeVariant, string> = {
    default: "bg-primary text-primary-foreground",
    success: "bg-green-500 text-green-950",
    danger: "bg-red-500 text-white",
}

function StarRating({
    rating,
    reviewCount,
}: {
    rating: number
    reviewCount: number
}) {
    const stars = Math.ceil(rating)
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5 text-xs text-primary">
                {Array.from({ length: stars }, (_, i) => (
                    <span key={i}>★</span>
                ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>
    )
}

function CardInner({
    title,
    price,
    badge,
    rating,
    reviewCount,
    image,
    className,
}: Omit<ProductCardProps, "href">) {
    return (
        <div
            className={cardClass({
                className: cn(
                    "flex h-full flex-col overflow-hidden p-0 transition-[border-color] duration-200 hover:border-primary/50",
                    className
                ),
            })}
        >
            <div className="relative flex aspect-square items-center justify-center bg-muted">
                {badge ? (
                    <div className="absolute left-2 top-2">
                        <span
                            className={cn(
                                "inline-block rounded px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider",
                                badgeClass[badge.variant ?? "default"]
                            )}
                        >
                            {badge.label}
                        </span>
                    </div>
                ) : null}
                {image}
            </div>
            <div className="p-3">
                <h3 className="mb-1.5 line-clamp-2 text-xs font-medium leading-snug text-foreground">
                    {title}
                </h3>
                <p className="mb-1.5 text-sm font-bold text-foreground">{price}</p>
                {rating != null && reviewCount != null ? (
                    <StarRating rating={rating} reviewCount={reviewCount} />
                ) : null}
            </div>
        </div>
    )
}

export function ProductCard({
    href,
    ...rest
}: ProductCardProps) {
    if (href) {
        return (
            <a href={href} className="group block">
                <CardInner {...rest} />
            </a>
        )
    }

    return <CardInner {...rest} />
}

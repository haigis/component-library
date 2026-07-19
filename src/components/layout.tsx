import type { ReactNode } from "react"

import { cn } from "../lib/utils"
import { Heading } from "./Heading"
import { Text } from "./Text"

export type LaneWidth = 8 | 10 | 12

export const shellClass = "mx-auto w-full max-w-[1600px] px-6 xl:px-8"
export const gridClass = "grid grid-cols-12 gap-x-6 xl:gap-x-8"

export function laneClass(width: LaneWidth) {
    if (width === 8) return "col-span-12 lg:col-span-8 lg:col-start-3"
    if (width === 10) return "col-span-12 lg:col-span-10 lg:col-start-2"
    return "col-span-12"
}

export function PageLane({
    width = 10,
    children,
    className = "",
}: {
    width?: LaneWidth
    children: ReactNode
    className?: string
}) {
    return (
        <div className={shellClass}>
            <div className={gridClass}>
                <div className={`${laneClass(width)} ${className}`}>{children}</div>
            </div>
        </div>
    )
}

export function SectionIntro({
    title,
    description,
    id,
    headingLevel = "h2",
}: {
    title: string
    description?: string
    id?: string
    headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}) {
    return (
        <div className="space-y-2">
            <Heading as={headingLevel} size="section" id={id}>
                {title}
            </Heading>
            {description ? (
                <Text tone="muted" className="max-w-prose">
                    {description}
                </Text>
            ) : null}
        </div>
    )
}

export type SectionProps = {
    title?: string
    description?: string
    id?: string
    headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    children: ReactNode
    className?: string
}

/** A page section: optional SectionIntro heading followed by content. */
export function Section({ title, description, id, headingLevel, children, className }: SectionProps) {
    return (
        <section className={cn("space-y-6", className)} aria-labelledby={id}>
            {title ? <SectionIntro id={id} title={title} description={description} headingLevel={headingLevel} /> : null}
            {children}
        </section>
    )
}

export type CardGridProps = {
    columns?: 2 | 3 | 4
    children: ReactNode
    className?: string
}

const gridCols: Record<2 | 3 | 4, string> = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 xl:grid-cols-3",
    4: "md:grid-cols-2 xl:grid-cols-4",
}

/** Responsive grid for cards: 1 column on mobile, up to `columns` on wide screens. */
export function CardGrid({ columns = 3, children, className }: CardGridProps) {
    return (
        <div
            className={cn("grid gap-5", gridCols[columns], className)}
        >
            {children}
        </div>
    )
}

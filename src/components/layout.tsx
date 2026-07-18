import type { ReactNode } from "react"

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
}: {
    title: string
    description?: string
    id?: string
}) {
    return (
        <div className="space-y-2">
            <h2 id={id}>{title}</h2>
            {description ? (
                <p className="max-w-3xl text-muted-foreground">{description}</p>
            ) : null}
        </div>
    )
}
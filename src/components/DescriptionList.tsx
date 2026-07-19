import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import type { IconProp } from "../lib/icons"
import { cn } from "../lib/utils"
import { Icon } from "./Icon"
import { textVariants } from "./Text"

export type DescriptionListLayout = "stacked" | "inline"

export type DescriptionListEntry = {
    id?: string
    term: string
    description: string
    icon?: IconProp
    href?: string
    onClick?: () => void
}

export const descriptionListVariants = cva(
    "grid divide-y divide-border",
    {
        variants: {
            surface: {
                plain: "",
                contained: "rounded-lg border border-border bg-card px-5",
            },
        },
        defaultVariants: {
            surface: "plain",
        },
    }
)

export interface DescriptionListProps
    extends React.ComponentPropsWithoutRef<"dl">,
        VariantProps<typeof descriptionListVariants> {
    items?: DescriptionListEntry[]
    layout?: DescriptionListLayout
}

export function DescriptionList({
    items,
    layout = "stacked",
    surface = "plain",
    className,
    children,
    ...props
}: DescriptionListProps) {
    return (
        <dl
            data-slot="description-list"
            data-layout={layout}
            className={cn(descriptionListVariants({ surface }), className)}
            {...props}
        >
            {items
                ? items.map((item, index) => (
                    <DescriptionListItem
                        key={item.id ?? index}
                        {...item}
                        layout={layout}
                    />
                ))
                : children}
        </dl>
    )
}

export function DescriptionListTerm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"dt">) {
    return (
        <dt
            data-slot="description-list-term"
            className={cn(
                textVariants({
                    size: "sm",
                    tone: "default",
                    weight: "semibold",
                }),
                className
            )}
            {...props}
        />
    )
}

export function DescriptionListDescription({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"dd">) {
    return (
        <dd
            data-slot="description-list-description"
            className={cn(
                textVariants({
                    size: "sm",
                    tone: "muted",
                    weight: "normal",
                }),
                className
            )}
            {...props}
        />
    )
}

export interface DescriptionListItemProps
    extends Omit<React.ComponentPropsWithoutRef<"div">, "onClick"> {
    term: React.ReactNode
    description: React.ReactNode
    icon?: IconProp
    href?: string
    onClick?: () => void
    layout?: DescriptionListLayout
}

function TermContent({
    term,
    href,
    onClick,
}: Pick<DescriptionListItemProps, "term" | "href" | "onClick">) {
    const className = cn(
        "relative flex min-w-0 items-center justify-between gap-3 rounded-sm",
        "outline-none after:absolute after:inset-0 after:content-['']",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background",
        (href || onClick) && "group-hover:text-primary"
    )
    const content = (
        <>
            <span className="min-w-0">{term}</span>
            {href || onClick ? (
                <Icon
                    icon="chevron-right"
                    size="sm"
                    className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                />
            ) : null}
        </>
    )

    if (href) {
        return (
            <a href={href} onClick={onClick} className={className}>
                {content}
            </a>
        )
    }

    if (onClick) {
        return (
            <button type="button" onClick={onClick} className={cn(className, "w-full text-left")}>
                {content}
            </button>
        )
    }

    return <span className="flex min-w-0 items-center gap-3">{term}</span>
}

export function DescriptionListItem({
    term,
    description,
    icon,
    href,
    onClick,
    layout = "stacked",
    className,
    ...props
}: DescriptionListItemProps) {
    if (layout === "inline") {
        return (
            <div
                data-slot="description-list-item"
                className={cn(
                    "group relative grid gap-x-6 gap-y-1 py-4 first:pt-0 last:pb-0",
                    "sm:grid-cols-[minmax(11rem,0.45fr)_minmax(0,1fr)]",
                    className
                )}
                {...props}
            >
                <DescriptionListTerm className="flex min-w-0 items-start gap-3">
                    {icon ? (
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
                            <Icon icon={icon} size="sm" />
                        </span>
                    ) : null}
                    <TermContent term={term} href={href} onClick={onClick} />
                </DescriptionListTerm>
                <DescriptionListDescription className="sm:col-start-2">
                    {description}
                </DescriptionListDescription>
            </div>
        )
    }

    return (
        <div
            data-slot="description-list-item"
            className={cn(
                "group relative grid gap-x-4 gap-y-0.5 py-4 first:pt-0 last:pb-0",
                icon ? "grid-cols-[2.5rem_minmax(0,1fr)]" : "grid-cols-1",
                className
            )}
            {...props}
        >
            {icon ? (
                <span className="row-span-2 flex size-10 items-center justify-center rounded-md border border-border bg-background text-primary">
                    <Icon icon={icon} size="md" />
                </span>
            ) : null}
            <DescriptionListTerm className={icon ? "col-start-2" : undefined}>
                <TermContent term={term} href={href} onClick={onClick} />
            </DescriptionListTerm>
            <DescriptionListDescription className={icon ? "col-start-2" : undefined}>
                {description}
            </DescriptionListDescription>
        </div>
    )
}

import * as React from "react"

import type { IconProp } from "../lib/icons"
import { cn } from "../lib/utils"
import { Button } from "./Button"
import { cardClass } from "./card"
import { Heading } from "./Heading"
import { Icon } from "./Icon"
import { Text } from "./Text"

export type SplitPanelItem = {
    icon: IconProp
    label: string
}

export type SplitPanelTone = "default" | "dark" | "primary"

export type SplitPanelProps = {
    title: string
    description?: string
    items?: SplitPanelItem[]
    actionLabel?: string
    actionHref?: string
    actionStyle?: "link" | "button"
    actionVariant?: "primary" | "secondary" | "outline"
    onAction?: () => void

    image?: React.ReactNode

    cardTitle?: string
    cardDescription?: string
    cardItems?: SplitPanelItem[]
    cardActionLabel?: string
    cardActionHref?: string
    cardActionStyle?: "link" | "button"
    cardActionVariant?: "primary" | "secondary" | "outline"
    onCardAction?: () => void

    headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    cardHeadingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    tone?: SplitPanelTone
    listLayout?: "below" | "beside"
    className?: string
}

function ActionButton({
    label,
    href,
    style = "link",
    variant = "primary",
    onClick,
    tone = "default",
}: {
    label: string
    href?: string
    style?: "link" | "button"
    variant?: "primary" | "secondary" | "outline"
    onClick?: () => void
    tone?: SplitPanelTone
}) {
    if (style === "button") {
        return (
            <Button
                variant={variant}
                size="sm"
                onClick={onClick}
                asChild={Boolean(href)}
            >
                {href ? <a href={href}>{label}</a> : label}
            </Button>
        )
    }

    const linkClass = cn(
        "inline-flex items-center gap-1.5 rounded-sm text-sm font-medium outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        tone === "default" && "text-foreground hover:text-primary",
        tone === "dark" && "text-white/90 hover:text-white",
        tone === "primary" && "text-primary-foreground/90 hover:text-primary-foreground"
    )
    const content = (
        <>
            {label}
            <Icon icon="arrow-right" size="sm" />
        </>
    )

    return href ? (
        <a href={href} onClick={onClick} className={linkClass}>
            {content}
        </a>
    ) : (
        <button type="button" onClick={onClick} className={linkClass}>
            {content}
        </button>
    )
}

function ChecklistItem({
    icon,
    label,
    tone = "default",
}: {
    icon: IconProp
    label: string
    tone?: SplitPanelTone
}) {
    return (
        <li className="flex items-center gap-2.5">
            <span
                className={cn(
                    "flex size-5 shrink-0 items-center justify-center",
                    tone === "default" && "text-primary",
                    tone === "dark" && "text-white/80",
                    tone === "primary" && "text-primary-foreground/80"
                )}
            >
                <Icon icon={icon} size="sm" />
            </span>
            <Text
                size="sm"
                className={cn(
                    tone === "dark" && "text-white/90",
                    tone === "primary" && "text-primary-foreground/90"
                )}
            >
                {label}
            </Text>
        </li>
    )
}

function PanelCardContent({
    title,
    description,
    items,
    actionLabel,
    actionHref,
    actionStyle,
    actionVariant,
    onAction,
    headingLevel,
}: {
    title?: string
    description?: string
    items?: SplitPanelItem[]
    actionLabel?: string
    actionHref?: string
    actionStyle?: "link" | "button"
    actionVariant?: "primary" | "secondary" | "outline"
    onAction?: () => void
    headingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}) {
    return (
        <>
            {title ? (
                <Heading as={headingLevel} size="card">
                    {title}
                </Heading>
            ) : null}

            {description ? (
                <Text size="sm" tone="muted" className="mt-2">
                    {description}
                </Text>
            ) : null}

            {items?.length ? (
                <ul className="mt-4 flex flex-col gap-2.5">
                    {items.map((item) => (
                        <ChecklistItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))}
                </ul>
            ) : null}

            {actionLabel ? (
                <div className="mt-5">
                    <ActionButton
                        label={actionLabel}
                        href={actionHref}
                        style={actionStyle}
                        variant={actionVariant}
                        onClick={onAction}
                    />
                </div>
            ) : null}
        </>
    )
}

const toneStyles: Record<SplitPanelTone, string> = {
    default: "bg-gradient-to-br from-primary/10 via-accent/5 to-background",
    dark: "bg-neutral-950 text-white",
    primary: "bg-primary text-primary-foreground",
}

export function SplitPanel({
    title,
    description,
    items,
    actionLabel,
    actionHref,
    actionStyle = "link",
    actionVariant = "primary",
    onAction,
    image,
    cardTitle,
    cardDescription,
    cardItems,
    cardActionLabel,
    cardActionHref,
    cardActionStyle = "button",
    cardActionVariant = "primary",
    onCardAction,
    headingLevel = "h2",
    cardHeadingLevel = "h3",
    tone = "default",
    listLayout = "below",
    className,
}: SplitPanelProps) {
    const hasCard = Boolean(
        cardTitle ||
        cardDescription ||
        cardItems?.length ||
        cardActionLabel
    )
    const hasAside = Boolean(image || hasCard)

    const card = hasCard ? (
        <div
            className={cardClass({
                className:
                    "w-full rounded-lg bg-card/95 p-6 shadow-lg backdrop-blur-sm",
            })}
        >
            <PanelCardContent
                title={cardTitle}
                description={cardDescription}
                items={cardItems}
                actionLabel={cardActionLabel}
                actionHref={cardActionHref}
                actionStyle={cardActionStyle}
                actionVariant={cardActionVariant}
                onAction={onCardAction}
                headingLevel={cardHeadingLevel}
            />
        </div>
    ) : null

    return (
        <article
            className={cn(
                "relative overflow-hidden rounded-lg",
                tone === "default" && "border border-border",
                className
            )}
        >
            <div className={cn("grid", hasAside && "lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]")}>
                <div
                    className={cn(
                        "relative z-10 p-8 lg:p-10",
                        toneStyles[tone]
                    )}
                >
                    <div className={cn(
                        "grid gap-6",
                        listLayout === "beside" && items?.length
                            ? "lg:grid-cols-[2fr_1fr]"
                            : "",
                    )}>
                        <div className="flex flex-col justify-center gap-4">
                            <Heading
                                as={headingLevel}
                                size="section"
                                className={cn(
                                    tone === "dark" && "text-white",
                                    tone === "primary" && "text-primary-foreground"
                                )}
                            >
                                {title}
                            </Heading>

                            {description ? (
                                <Text
                                    tone={tone === "default" ? "muted" : "inherit"}
                                    className={cn(
                                        tone === "dark" && "text-white/80",
                                        tone === "primary" && "text-primary-foreground/80"
                                    )}
                                >
                                    {description}
                                </Text>
                            ) : null}

                            {listLayout === "below" && items?.length ? (
                                <ul className="mt-1 flex flex-col gap-2.5">
                                    {items.map((item) => (
                                        <ChecklistItem
                                            key={item.label}
                                            icon={item.icon}
                                            label={item.label}
                                            tone={tone}
                                        />
                                    ))}
                                </ul>
                            ) : null}

                            {actionLabel ? (
                                <div className="mt-2">
                                    <ActionButton
                                        label={actionLabel}
                                        href={actionHref}
                                        style={actionStyle}
                                        variant={actionVariant}
                                        onClick={onAction}
                                        tone={tone}
                                    />
                                </div>
                            ) : null}
                        </div>

                        {listLayout === "beside" && items?.length ? (
                            <ul className="flex flex-col justify-center gap-2.5">
                                {items.map((item) => (
                                    <ChecklistItem
                                        key={item.label}
                                        icon={item.icon}
                                        label={item.label}
                                        tone={tone}
                                    />
                                ))}
                            </ul>
                        ) : null}
                    </div>
                </div>

                {hasAside ? (
                    <div className="relative min-h-64 bg-muted/50 lg:min-h-0">
                        {image ? (
                            <div className="absolute inset-0 [&>*]:h-full [&>*]:w-full">
                                {image}
                            </div>
                        ) : null}

                        {hasCard ? (
                            <div className="relative z-10 hidden h-full items-center p-6 lg:flex">
                                {card}
                            </div>
                        ) : null}
                    </div>
                ) : null}

                {hasCard ? (
                    <div className="border-t border-border bg-card p-6 lg:hidden">
                        {card}
                    </div>
                ) : null}
            </div>
        </article>
    )
}

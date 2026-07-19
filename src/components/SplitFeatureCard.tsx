import * as React from "react"

import type { IconProp } from "../lib/icons"
import { cn } from "../lib/utils"
import { Button } from "./Button"
import { cardClass } from "./card"
import { DescriptionList } from "./DescriptionList"
import { Heading } from "./Heading"
import { Icon } from "./Icon"
import { Text } from "./Text"

export type SplitFeatureCardItem = {
    /** Registry name (e.g. "search") or an icon component. */
    icon: IconProp
    label: string
    body: string
    href?: string
    onClick?: () => void
}

export type SplitFeatureCardProps = {
    title: string
    description: string
    actionLabel?: string
    actionHref?: string
    actionStyle?: "link" | "button"
    actionVariant?: "primary" | "secondary" | "outline"
    onAction?: () => void
    items: SplitFeatureCardItem[]
    headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    className?: string
}

export function SplitFeatureCard({
    title,
    description,
    actionLabel,
    actionHref,
    actionStyle = "link",
    actionVariant = "primary",
    onAction,
    items,
    headingLevel = "h3",
    className,
}: SplitFeatureCardProps) {
    const action = actionLabel ? (
        actionStyle === "button" ? (
            <Button
                variant={actionVariant}
                size="sm"
                onClick={onAction}
                asChild={Boolean(actionHref)}
            >
                {actionHref ? <a href={actionHref}>{actionLabel}</a> : actionLabel}
            </Button>
        ) : (
            <Button
                variant="link"
                className="h-auto self-start px-0"
                onClick={actionHref ? undefined : onAction}
                asChild={Boolean(actionHref)}
            >
                {actionHref ? (
                    <a href={actionHref} onClick={onAction}>
                        {actionLabel}
                        <Icon icon="chevron-right" size="sm" />
                    </a>
                ) : (
                    <>
                        {actionLabel}
                        <Icon icon="chevron-right" size="sm" />
                    </>
                )}
            </Button>
        )
    ) : null

    return (
        <article className={cardClass({ className: cn("overflow-hidden p-0", className) })}>
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="flex flex-col justify-start gap-3 border-b border-border bg-gradient-to-br from-primary/10 via-accent/10 to-transparent p-8 lg:border-b-0 lg:border-r">
                    <Heading as={headingLevel} size="section">
                        {title}
                    </Heading>
                    <Text tone="muted" className="max-w-xl">
                        {description}
                    </Text>
                    {action}
                </div>

                <DescriptionList
                    className="p-6"
                    items={items.map(({ label, body, ...item }) => ({
                        ...item,
                        term: label,
                        description: body,
                    }))}
                />
            </div>
        </article>
    )
}

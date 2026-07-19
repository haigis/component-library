import * as React from "react"

import { cn } from "../lib/utils"
import type { IconProp } from "../lib/icons"
import { Button } from "./Button"
import { cardClass } from "./card"
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
    linkLabel?: string
    linkHref?: string
    onLinkClick?: () => void
    items: SplitFeatureCardItem[]
    className?: string
}

const itemClass =
    "group flex items-center gap-4 py-4 text-left first:pt-0 last:pb-0"

function ItemContent({ icon, label, body }: Pick<SplitFeatureCardItem, "icon" | "label" | "body">) {
    return (
        <>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary">
                <Icon icon={icon} size="md" />
            </div>
            <div className="flex-1">
                <Text size="sm" weight="semibold">{label}</Text>
                <Text size="sm" tone="muted" className="mt-0.5">{body}</Text>
            </div>
            <Icon icon="chevron-right" size="sm" className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </>
    )
}

export function SplitFeatureCard({
    title,
    description,
    linkLabel,
    linkHref,
    onLinkClick,
    items,
    className,
}: SplitFeatureCardProps) {
    const linkButton = linkLabel ? (
        <Button
            variant="link"
            className="h-auto self-start px-0"
            onClick={linkHref ? undefined : onLinkClick}
            asChild={Boolean(linkHref)}
        >
            {linkHref ? (
                <a href={linkHref} onClick={onLinkClick}>
                    {linkLabel}
                    <Icon icon="chevron-right" size="sm" />
                </a>
            ) : (
                <>
                    {linkLabel}
                    <Icon icon="chevron-right" size="sm" />
                </>
            )}
        </Button>
    ) : null

    return (
        <article className={cardClass({ className: cn("overflow-hidden p-0", className) })}>
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="flex flex-col justify-start gap-3 border-b border-border bg-gradient-to-br from-primary/10 via-accent/10 to-transparent p-8 lg:border-b-0 lg:border-r">
                    <Heading as="h3" size="section">
                        {title}
                    </Heading>

                    <Text tone="muted" className="max-w-xl">{description}</Text>

                    {linkButton}
                </div>

                <div className="flex flex-col justify-center divide-y divide-border p-6">
                    {items.map(({ icon, label, body, href, onClick }) =>
                        href ? (
                            <a key={label} href={href} onClick={onClick} className={itemClass}>
                                <ItemContent icon={icon} label={label} body={body} />
                            </a>
                        ) : (
                            <button
                                key={label}
                                type="button"
                                onClick={onClick}
                                className={itemClass}
                            >
                                <ItemContent icon={icon} label={label} body={body} />
                            </button>
                        )
                    )}
                </div>
            </div>
        </article>
    )
}

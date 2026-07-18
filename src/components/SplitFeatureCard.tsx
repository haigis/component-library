import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "../lib/utils"
import { resolveIcon, type IconProp } from "../lib/icons"
import { Button } from "./Button"
import { cardClass } from "./card"

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
    const Icon = resolveIcon(icon)

    return (
        <>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary">
                <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{body}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
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
                    <ChevronRight className="h-4 w-4" />
                </a>
            ) : (
                <>
                    {linkLabel}
                    <ChevronRight className="h-4 w-4" />
                </>
            )}
        </Button>
    ) : null

    return (
        <article className={cardClass({ className: cn("overflow-hidden p-0", className) })}>
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="flex flex-col justify-start gap-3 border-b border-border bg-gradient-to-br from-primary/10 via-accent/10 to-transparent p-8 lg:border-b-0 lg:border-r">
                    <h3 className="text-3xl font-semibold tracking-tight text-foreground">
                        {title}
                    </h3>

                    <p className="max-w-xl text-muted-foreground">{description}</p>

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

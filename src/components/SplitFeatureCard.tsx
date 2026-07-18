import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "./Button"
import { cardClass } from "./card"

export type SplitFeatureCardItem = {
    icon: React.ComponentType<{ className?: string }>
    label: string
    body: string
    onClick?: () => void
}

export type SplitFeatureCardProps = {
    title: string
    description: string
    linkLabel?: string
    onLinkClick?: () => void
    items: SplitFeatureCardItem[]
    className?: string
}

export function SplitFeatureCard({
    title,
    description,
    linkLabel,
    onLinkClick,
    items,
    className,
}: SplitFeatureCardProps) {
    return (
        <article className={cardClass({ className: cn("overflow-hidden p-0", className) })}>
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="flex flex-col justify-start gap-3 border-b border-border bg-gradient-to-br from-primary/10 via-accent/10 to-transparent p-8 lg:border-b-0 lg:border-r">
                    <h3 className="text-3xl font-semibold tracking-tight text-foreground">
                        {title}
                    </h3>

                    <p className="max-w-xl text-muted-foreground">{description}</p>

                    {linkLabel ? (
                        <Button
                            variant="link"
                            className="h-auto self-start px-0"
                            onClick={onLinkClick}
                        >
                            {linkLabel}
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : null}
                </div>

                <div className="flex flex-col justify-center divide-y divide-border p-6">
                    {items.map(({ icon: Icon, label, body, onClick }) => (
                        <button
                            key={label}
                            type="button"
                            onClick={onClick}
                            className="group flex items-center gap-4 py-4 text-left first:pt-0 last:pb-0"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary">
                                <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-foreground">{label}</p>
                                <p className="mt-0.5 text-sm text-muted-foreground">{body}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </button>
                    ))}
                </div>
            </div>
        </article>
    )
}

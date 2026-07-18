import * as React from "react"

import { cn } from "../lib/utils"
import { Button } from "./Button"
import { cardClass } from "./card"

export type ImageCardProps = {
    eyebrow?: string
    title: string
    body: string
    actionLabel?: string
    onAction?: () => void
    image?: React.ReactNode
    imageAspectRatio?: string
    imageClassName?: string
    className?: string
}

export function ImageCard({
    eyebrow,
    title,
    body,
    actionLabel,
    onAction,
    image,
    imageAspectRatio = "16 / 9",
    imageClassName,
    className,
}: ImageCardProps) {
    return (
        <article
            className={cardClass({
                className: cn("flex h-full flex-col overflow-hidden p-0", className),
            })}
        >
            {image ? (
                <div
                    className={cn("overflow-hidden border-b border-border", imageClassName)}
                    style={{ aspectRatio: imageAspectRatio }}
                >
                    {image}
                </div>
            ) : null}

            <div className="flex flex-1 flex-col p-6">
                {eyebrow ? (
                    <p className="text-sm font-medium text-primary">{eyebrow}</p>
                ) : null}

                <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                    {title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">{body}</p>

                {actionLabel ? (
                    <div className="mt-5">
                        <Button
                            variant="outline"
                            className="bg-transparent"
                            size="sm"
                            onClick={onAction}
                        >
                            {actionLabel}
                        </Button>
                    </div>
                ) : null}
            </div>
        </article>
    )
}

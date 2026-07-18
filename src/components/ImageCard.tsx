import * as React from "react"

import { cn } from "../lib/utils"
import { Button } from "./Button"
import { cardClass } from "./card"

export type ImageCardProps = {
    eyebrow?: string
    title: string
    /** Plain string, or rich content (multiple paragraphs, CMS rich text). */
    body: React.ReactNode
    actionLabel?: string
    actionHref?: string
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
    actionHref,
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

                <div className="mt-3 space-y-3 text-sm text-muted-foreground [&_p]:leading-6">
                    {typeof body === "string" ? <p>{body}</p> : body}
                </div>

                {actionLabel ? (
                    <div className="mt-5">
                        <Button
                            variant="outline"
                            className="bg-transparent"
                            size="sm"
                            onClick={actionHref ? undefined : onAction}
                            asChild={Boolean(actionHref)}
                        >
                            {actionHref ? (
                                <a href={actionHref} onClick={onAction}>
                                    {actionLabel}
                                </a>
                            ) : (
                                actionLabel
                            )}
                        </Button>
                    </div>
                ) : null}
            </div>
        </article>
    )
}

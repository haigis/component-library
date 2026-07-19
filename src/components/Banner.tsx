import * as React from "react"

import { cn } from "../lib/utils"
import { Button, type ButtonProps } from "./Button"
import { cardClass } from "./card"

export type BannerAction = {
    label: string
    href?: string
    onClick?: () => void
    variant?: ButtonProps["variant"]
}

export type BannerProps = {
    eyebrow?: string
    title: string
    /** Plain string, or rich content (multiple paragraphs, CMS rich text). */
    body?: React.ReactNode
    /** Image or icon rendered in a fixed side slot. */
    media?: React.ReactNode
    mediaPosition?: "left" | "right"
    mediaAspectRatio?: string
    mediaClassName?: string
    action?: BannerAction
    actionPosition?: "left" | "right"
    tone?: "default" | "alt" | "muted" | "elevated"
    className?: string
}

function MediaSlot({
    media,
    mediaAspectRatio,
    mediaClassName,
}: Pick<BannerProps, "media" | "mediaAspectRatio" | "mediaClassName">) {
    return (
        <div
            className={cn(
                "flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-background md:h-24 md:w-24",
                mediaClassName
            )}
            style={mediaAspectRatio ? { aspectRatio: mediaAspectRatio } : undefined}
        >
            {media}
        </div>
    )
}

function ActionSlot({ action }: { action: BannerAction }) {
    const { label, href, onClick, variant = "primary" } = action

    return (
        <Button
            variant={variant}
            onClick={href ? undefined : onClick}
            asChild={Boolean(href)}
            className="shrink-0"
        >
            {href ? (
                <a href={href} onClick={onClick}>
                    {label}
                </a>
            ) : (
                label
            )}
        </Button>
    )
}

/**
 * Horizontal banner: optional media and action pinned to either side.
 * The content block (eyebrow/title/body) fills whatever space is left,
 * so the three sections auto-space themselves regardless of which
 * optional pieces are present.
 */
export function Banner({
    eyebrow,
    title,
    body,
    media,
    mediaPosition = "left",
    mediaAspectRatio,
    mediaClassName,
    action,
    actionPosition = "right",
    tone = "default",
    className,
}: BannerProps) {
    const renderSlot = (position: "left" | "right") => {
        const showMedia = Boolean(media) && mediaPosition === position
        const showAction = Boolean(action) && actionPosition === position

        if (!showMedia && !showAction) return null

        return (
            <div className="flex shrink-0 flex-col items-start gap-4 md:items-center">
                {showMedia ? (
                    <MediaSlot
                        media={media}
                        mediaAspectRatio={mediaAspectRatio}
                        mediaClassName={mediaClassName}
                    />
                ) : null}
                {showAction && action ? <ActionSlot action={action} /> : null}
            </div>
        )
    }

    return (
        <article
            className={cardClass({
                tone,
                className: cn("flex flex-col gap-6 md:flex-row md:items-center", className),
            })}
        >
            {renderSlot("left")}

            <div className="min-w-0 flex-1 space-y-2">
                {eyebrow ? (
                    <p className="text-sm font-medium text-primary">{eyebrow}</p>
                ) : null}
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {title}
                </h3>
                {body ? (
                    <div className="space-y-3 text-sm text-muted-foreground [&_p]:leading-6">
                        {typeof body === "string" ? <p>{body}</p> : body}
                    </div>
                ) : null}
            </div>

            {renderSlot("right")}
        </article>
    )
}

import * as React from "react"

import { cn } from "../lib/utils"
import type { IconProp } from "../lib/icons"
import { Button, type ButtonProps } from "./Button"
import { cardClass } from "./card"
import { Heading } from "./Heading"
import { Icon } from "./Icon"
import { Text } from "./Text"

export type BannerAction = {
    label: string
    href?: string
    onClick?: () => void
    variant?: ButtonProps["variant"]
}

export type BannerIconPosition = "top" | "left" | "right"

export type BannerProps = {
    eyebrow?: string
    title: string
    /** Plain string, or rich content (multiple paragraphs, CMS rich text). */
    body?: React.ReactNode
    /** Supporting icon rendered with the text content. */
    icon?: IconProp
    iconPosition?: BannerIconPosition
    /** Image or rich media rendered in its own fixed slot. */
    media?: React.ReactNode
    mediaPosition?: "left" | "right" | "top"
    mediaAspectRatio?: string
    mediaClassName?: string
    action?: BannerAction
    actionPosition?: "left" | "right" | "below"
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
                "flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-background text-primary md:h-24 md:w-24",
                mediaClassName
            )}
            style={mediaAspectRatio ? { aspectRatio: mediaAspectRatio } : undefined}
        >
            {media}
        </div>
    )
}

function IconSlot({ icon, className }: { icon: IconProp; className?: string }) {
    return (
        <div
            className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary",
                className
            )}
        >
            <Icon icon={icon} size="md" />
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

export function Banner({
    eyebrow,
    title,
    body,
    icon,
    iconPosition = "top",
    media,
    mediaPosition = "left",
    mediaAspectRatio,
    mediaClassName,
    action,
    actionPosition = "right",
    tone = "default",
    className,
}: BannerProps) {
    const isTopMedia = Boolean(media) && mediaPosition === "top"
    const isBelowAction = actionPosition === "below"

    const renderSideSlot = (position: "left" | "right") => {
        const showMedia = Boolean(media) && mediaPosition === position
        const showAction = Boolean(action) && actionPosition === position

        if (!showMedia && !showAction) return null

        return (
            <div className="flex shrink-0 items-center gap-4">
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
                className: cn("overflow-hidden", isTopMedia && "p-0", className),
            })}
        >
            {isTopMedia ? (
                <div
                    className={cn("overflow-hidden", mediaClassName)}
                    style={{ aspectRatio: mediaAspectRatio || "16 / 9" }}
                >
                    {media}
                </div>
            ) : null}

            <div
                className={cn(
                    "flex flex-col gap-6 md:flex-row md:items-center",
                    isTopMedia && "p-6"
                )}
            >
                {renderSideSlot("left")}

                <div
                    className={cn(
                        "flex min-w-0 flex-1",
                        icon && iconPosition !== "top" ? "items-start gap-4" : "flex-col"
                    )}
                >
                    {icon && iconPosition === "left" ? <IconSlot icon={icon} /> : null}

                    <div className="min-w-0 flex-1">
                        {icon && iconPosition === "top" ? (
                            <IconSlot icon={icon} className="mb-4" />
                        ) : null}

                        <div className="space-y-2">
                            {eyebrow ? (
                                <Text size="sm" tone="primary" weight="medium">{eyebrow}</Text>
                            ) : null}
                            <Heading as="h3" size="card">
                                {title}
                            </Heading>
                            {body ? (
                                <div className="space-y-3 text-sm text-muted-foreground [&_p]:text-inherit [&_p]:leading-6">
                                    {typeof body === "string" ? (
                                        <Text size="sm" tone="muted">{body}</Text>
                                    ) : body}
                                </div>
                            ) : null}
                        </div>

                        {isBelowAction && action ? (
                            <div className="pt-5">
                                <ActionSlot action={action} />
                            </div>
                        ) : null}
                    </div>

                    {icon && iconPosition === "right" ? <IconSlot icon={icon} /> : null}
                </div>

                {renderSideSlot("right")}
            </div>
        </article>
    )
}

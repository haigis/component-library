import * as React from "react"

import { cn } from "../lib/utils"
import type { IconProp } from "../lib/icons"
import { Button } from "./Button"
import { cardClass } from "./card"
import { Heading } from "./Heading"
import { Icon } from "./Icon"
import { Text } from "./Text"

export type ImageCardIconPosition = "top" | "left" | "right"

export type ImageCardProps = {
    /** Supporting icon shown with the text content. */
    icon?: IconProp
    iconPosition?: ImageCardIconPosition
    eyebrow?: string
    title: string
    /** Plain string, or rich content (multiple paragraphs, CMS rich text). */
    body: React.ReactNode
    actionLabel?: string
    actionHref?: string
    actionStyle?: "link" | "button"
    actionVariant?: "primary" | "secondary" | "outline"
    onAction?: () => void
    image?: React.ReactNode
    imageAspectRatio?: string
    headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    imageClassName?: string
    className?: string
}

export function ImageCard({
    icon,
    iconPosition = "top",
    eyebrow,
    title,
    body,
    actionLabel,
    actionHref,
    actionStyle = "link",
    actionVariant = "primary",
    onAction,
    image,
    imageAspectRatio = "16 / 9",
    headingLevel = "h3",
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
                <div className="relative">
                    <div
                        className={cn("overflow-hidden", imageClassName)}
                        style={{ aspectRatio: imageAspectRatio }}
                    >
                        {image}
                    </div>
                    {eyebrow ? (
                        <Text
                            as="span"
                            size="xs"
                            tone="inherit"
                            weight="medium"
                            className="absolute bottom-0 left-4 translate-y-1/2 rounded-full bg-primary px-3 py-1 text-primary-foreground"
                        >
                            {eyebrow}
                        </Text>
                    ) : null}
                </div>
            ) : eyebrow ? (
                <div className="px-6 pt-6">
                    <Text
                        as="span"
                        size="xs"
                        tone="inherit"
                        weight="medium"
                        className="rounded-full bg-primary px-3 py-1 text-primary-foreground"
                    >
                        {eyebrow}
                    </Text>
                </div>
            ) : null}

            <div
                className={cn(
                    "flex flex-1 p-6",
                    icon && iconPosition !== "top" ? "items-start gap-4" : "flex-col"
                )}
            >
                {icon && iconPosition === "left" ? (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary">
                        <Icon icon={icon} size="md" />
                    </div>
                ) : null}

                <div className="flex min-w-0 flex-1 flex-col">
                    {icon && iconPosition === "top" ? (
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-primary">
                            <Icon icon={icon} size="md" />
                        </div>
                    ) : null}

                    <Heading as={headingLevel} size="card">
                        {title}
                    </Heading>

                    <div className="mt-3 flex-1 space-y-3 text-sm text-muted-foreground [&_p]:text-inherit [&_p]:leading-6">
                        {typeof body === "string" ? (
                            <Text size="sm" tone="muted">{body}</Text>
                        ) : body}
                    </div>

                    {actionLabel ? (
                        <div className="mt-5">
                            {actionStyle === "button" ? (
                                <Button
                                    variant={actionVariant}
                                    size="sm"
                                    onClick={onAction}
                                    asChild={Boolean(actionHref)}
                                >
                                    {actionHref ? (
                                        <a href={actionHref}>{actionLabel}</a>
                                    ) : (
                                        actionLabel
                                    )}
                                </Button>
                            ) : actionHref ? (
                                <a
                                    href={actionHref}
                                    onClick={onAction}
                                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary"
                                >
                                    {actionLabel}
                                    <Icon icon="arrow-right" size="sm" />
                                </a>
                            ) : (
                                <button
                                    type="button"
                                    onClick={onAction}
                                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary"
                                >
                                    {actionLabel}
                                    <Icon icon="arrow-right" size="sm" />
                                </button>
                            )}
                        </div>
                    ) : null}
                </div>

                {icon && iconPosition === "right" ? (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary">
                        <Icon icon={icon} size="md" />
                    </div>
                ) : null}
            </div>
        </article>
    )
}

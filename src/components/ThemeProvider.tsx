import * as React from "react"

import { cn } from "../lib/utils"

export const colorThemeNames = ["indigo", "ocean", "forest", "coral"] as const

export type ColorTheme = (typeof colorThemeNames)[number]
export type ThemeMode = "light" | "dark" | "system"

export interface ThemeProviderProps extends React.ComponentPropsWithoutRef<"div"> {
    /** Named colour palette applied to this scope and all descendants. */
    theme?: ColorTheme
    /** Light, dark, or the visitor's operating-system preference. */
    mode?: ThemeMode
}

/**
 * Applies design tokens to a site, page, or section. Theme scopes can be nested;
 * the nearest provider supplies the inherited CSS custom properties.
 */
export const ThemeProvider = React.forwardRef<HTMLDivElement, ThemeProviderProps>(
    ({ theme = "indigo", mode = "light", className, ...props }, ref) => (
        <div
            {...props}
            ref={ref}
            data-theme={theme}
            data-color-mode={mode}
            className={cn("bg-background text-foreground", className)}
        />
    )
)

ThemeProvider.displayName = "ThemeProvider"

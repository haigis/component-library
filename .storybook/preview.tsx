import type { Decorator, Preview } from "@storybook/react-vite"

import {
    ThemeProvider,
    type ColorTheme,
    type ThemeMode,
} from "../src/components/ThemeProvider"

import "./storybook.css"

type DesignThemeParameter = {
    theme?: ColorTheme
    mode?: ThemeMode
}

const withDesignTheme: Decorator = (Story, context) => {
    const pageTheme = context.parameters.designTheme as
        | DesignThemeParameter
        | undefined
    const theme = (
        pageTheme?.theme ??
        context.globals.colorTheme ??
        "indigo"
    ) as ColorTheme
    const mode = (
        pageTheme?.mode ??
        context.globals.colorMode ??
        "light"
    ) as ThemeMode

    if (typeof document !== "undefined") {
        document.documentElement.dataset.theme = theme
        document.documentElement.dataset.colorMode = mode
        document.documentElement.classList.remove("dark")
    }

    return (
        <ThemeProvider theme={theme} mode={mode} className="contents">
            <Story />
        </ThemeProvider>
    )
}

const preview: Preview = {
    globalTypes: {
        colorTheme: {
            description: "Design-system colour theme",
            toolbar: {
                icon: "paintbrush",
                dynamicTitle: true,
                items: [
                    { value: "indigo", title: "Indigo" },
                    { value: "ocean", title: "Ocean" },
                    { value: "forest", title: "Forest" },
                    { value: "coral", title: "Coral" },
                ],
            },
        },
        colorMode: {
            description: "Colour mode",
            toolbar: {
                icon: "contrast",
                dynamicTitle: true,
                items: [
                    { value: "light", title: "Light" },
                    { value: "dark", title: "Dark" },
                    { value: "system", title: "System" },
                ],
            },
        },
    },
    initialGlobals: {
        colorTheme: "indigo",
        colorMode: "light",
    },
    decorators: [withDesignTheme],
    parameters: {
        layout: "centered",
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: "error",
        },
        options: {
            storySort: {
                order: [
                    "Foundations",
                    ["Design System", "Theme Provider", "Heading", "Text", "Icon"],
                    "Components",
                    "Patterns",
                    "Layout",
                ],
            },
        },
    },
    tags: ["autodocs"],
}

export default preview

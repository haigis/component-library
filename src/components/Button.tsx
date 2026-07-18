import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

export const buttonVariants = cva(
    [
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md",
        "text-sm font-medium transition-[background-color,border-color,color,box-shadow,opacity,transform]",
        "outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:scale-[0.98]",
        "select-none shrink-0",
    ].join(" "),
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-primary-foreground shadow-sm hover:opacity-90",
                default:
                    "bg-primary text-primary-foreground shadow-sm hover:opacity-90",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                ghost:
                    "hover:bg-accent hover:text-accent-foreground",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:opacity-90",
                link:
                    "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-6",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, type, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                ref={ref}
                data-slot="button"
                className={cn(buttonVariants({ variant, size }), className)}
                type={asChild ? undefined : type ?? "button"}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"
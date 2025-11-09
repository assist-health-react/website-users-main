import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "../../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-blue text-white hover:bg-brand-dark shadow-sm hover:shadow-md",
        secondary: "bg-brand-secondary text-white hover:bg-brand-secondary/90 shadow-sm hover:shadow-md",
        outline: "border-2 border-brand-blue bg-white text-brand-blue hover:bg-brand-blue hover:text-white shadow-sm hover:shadow-md",
        ghost: "text-brand-blue hover:bg-brand-light hover:text-brand-dark",
        link: "text-brand-blue underline-offset-4 hover:underline",
        success: "bg-accent-green text-white hover:bg-accent-green/90 shadow-sm hover:shadow-md",
        warning: "bg-accent-yellow text-white hover:bg-accent-yellow/90 shadow-sm hover:shadow-md",
        destructive: "bg-accent-red text-white hover:bg-accent-red/90 shadow-sm hover:shadow-md",
        highlight: "bg-accent-purple text-white hover:bg-accent-purple/90 shadow-sm hover:shadow-md"
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        xl: "h-14 px-10 py-3.5 text-lg",
        icon: "h-11 w-11"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 
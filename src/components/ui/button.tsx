import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-[#708F96] text-white hover:bg-[#708F96]/90 shadow-md shadow-[#708F96]/20",
        gradient: "bg-gradient-to-r from-[#708F96] to-[#AA895F] text-white hover:opacity-90 shadow-lg shadow-[#AA895F]/20 border-0",
        destructive: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
        outline: "border border-[#333] bg-transparent hover:bg-[#252526] hover:text-[#e0e0e0]",
        secondary: "bg-[#AA895F] text-white hover:bg-[#AA895F]/90",
        ghost: "hover:bg-[#252526] hover:text-[#708F96]",
        link: "text-[#708F96] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
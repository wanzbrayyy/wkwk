import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#333] bg-[#252526] px-3 py-2 text-sm text-[#e0e0e0] ring-offset-[#1e1e1e] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#666] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#708F96] disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-[#444]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
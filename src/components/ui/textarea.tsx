import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-[#333] bg-[#252526] px-3 py-2 text-sm text-[#e0e0e0] ring-offset-[#1e1e1e] placeholder:text-[#666] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#708F96] disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-[#444]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
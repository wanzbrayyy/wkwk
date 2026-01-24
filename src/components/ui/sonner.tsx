"use client"

import { Toaster as SonnerToaster } from "sonner"

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#2d2d2d] group-[.toaster]:text-[#e0e0e0] group-[.toaster]:border-[#333] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#858585]",
          actionButton: "group-[.toast]:bg-[#AA895F] group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-[#333] group-[.toast]:text-[#e0e0e0]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
import { ReactNode } from "react"

export default function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#1e1e1e] text-foreground flex flex-col font-sans">
      {children}
    </div>
  )
}
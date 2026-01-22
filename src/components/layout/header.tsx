import Link from "next/link"
import { Code2 } from "lucide-react"
import { UserNav } from "./user-nav"
import { cn } from "@/lib/utils"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#333] bg-[#1e1e1e]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#1e1e1e]/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#708F96] to-[#AA895F]">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="hidden font-bold text-white sm:inline-block">
              AutoCode.ai
            </span>
          </Link>
          
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/dashboard"
              className={cn(
                "transition-colors hover:text-[#708F96]",
                "text-[#e0e0e0]"
              )}
            >
              Overview
            </Link>
            <Link
              href="/dashboard/projects"
              className={cn(
                "transition-colors hover:text-[#708F96]",
                "text-[#858585]"
              )}
            >
              Projects
            </Link>
            <Link
              href="/dashboard/settings"
              className={cn(
                "transition-colors hover:text-[#708F96]",
                "text-[#858585]"
              )}
            >
              Settings
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </div>
    </header>
  )
}
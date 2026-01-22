"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  FolderGit2, 
  Settings, 
  CreditCard,
  HelpCircle
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-[#708F96]"
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderGit2,
    color: "text-[#AA895F]"
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
    color: "text-[#cccccc]"
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "text-[#cccccc]"
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="relative hidden h-screen w-72 border-r border-[#333] bg-[#1e1e1e] pt-16 lg:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-[#858585] uppercase">
              Platform
            </h2>
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-[#2d2d2d] transition-all",
                  pathname === item.href 
                    ? "bg-[#2d2d2d] text-white border-r-2 border-[#708F96]" 
                    : "text-[#858585]"
                )}
              >
                <item.icon className={cn("mr-2 h-4 w-4", item.color)} />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-[#858585] uppercase">
              Support
            </h2>
            <Link
              href="/docs"
              className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-[#858585] hover:bg-[#2d2d2d] hover:text-white transition-all"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Documentation</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
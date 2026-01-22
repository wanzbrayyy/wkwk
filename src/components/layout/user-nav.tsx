"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, CreditCard, Settings, LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

export function UserNav() {
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full ring-2 ring-[#333] hover:ring-[#708F96] transition-all">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
            <AvatarFallback className="bg-[#AA895F] text-white">
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#1e1e1e] border-[#333] text-[#e0e0e0]" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
            <p className="text-xs leading-none text-[#858585]">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#333]" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-[#2d2d2d] focus:bg-[#2d2d2d] cursor-pointer">
            <User className="mr-2 h-4 w-4 text-[#708F96]" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-[#2d2d2d] focus:bg-[#2d2d2d] cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4 text-[#AA895F]" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-[#2d2d2d] focus:bg-[#2d2d2d] cursor-pointer">
            <Settings className="mr-2 h-4 w-4 text-[#cccccc]" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#333]" />
        <DropdownMenuItem 
          className="text-red-400 hover:bg-[#2d2d2d] focus:bg-[#2d2d2d] cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Link from "next/link"
import { User, LogOut, Code2 } from "lucide-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Code2 className="h-6 w-6 text-primary" />
            <span>AutoCode.ai</span>
          </div>
          
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Projects
            </Link>
            <div className="flex items-center gap-2 pl-4 border-l border-border">
              <span className="text-sm text-muted-foreground">{session.user?.name}</span>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                 {session.user?.image ? (
                   <img src={session.user.image} alt="User" className="h-8 w-8 rounded-full" />
                 ) : (
                   <User className="h-4 w-4" />
                 )}
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
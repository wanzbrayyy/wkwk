import Link from "next/link"
import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react"
import { getServerSession } from "next-auth" // Import getServerSession
import { authOptions } from "@/lib/auth" // Import authOptions
import { redirect } from "next/navigation"

export default async function LandingPage() {
  // Cek sesi. Jika user sudah login, arahkan ke dashboard.
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/40 backdrop-blur-sm fixed w-full z-50 bg-background/80">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">AutoCode.ai</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/auth" className="text-sm font-medium hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link href="/auth" className="text-sm font-medium bg-gradient-brand text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1 pt-24">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center text-center px-4">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8">
              <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium backdrop-blur-xl">
                <span className="flex h-2 w-2 rounded-full bg-[#708F96] mr-2"></span>
                <span className="bg-gradient-to-r from-[#708F96] to-[#AA895F] bg-clip-text text-transparent">
                  v2.0 Now Available
                </span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-4xl">
                Turn your ideas into <br />
                <span className="text-gradient-brand">Production Code</span>
              </h1>
              
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                Describe your dream website in plain English. Our AI architect constructs the file structure, writes the code, and prepares it for deployment instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 min-w-[300px] justify-center">
                <Link 
                  href="/auth" // Arahkan ke halaman auth
                  className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-brand px-8 text-sm font-medium text-white shadow transition-all hover:opacity-90 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Start Building Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-accent/5">
          <div className="container px-4 md:px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center p-6 border-gradient-brand rounded-2xl bg-card/50">
              <div className="p-3 rounded-full bg-[#708F96]/10 text-[#708F96]">
                <Zap className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">Instant Generation</h2>
              <p className="text-muted-foreground">
                Get a full Next.js project structure with TypeScript and Tailwind CSS in seconds.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 border border-border rounded-2xl bg-card/50">
              <div className="p-3 rounded-full bg-[#AA895F]/10 text-[#AA895F]">
                <Code2 className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">Clean Code</h2>
              <p className="text-muted-foreground">
                Our AI writes maintainable, component-based code that adheres to industry standards.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 border border-border rounded-2xl bg-card/50">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">Smart Refactoring</h2>
              <p className="text-muted-foreground">
                Highlight any code block and ask the AI to optimize, debug, or rewrite it.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          © 2024 AutoCode.ai. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
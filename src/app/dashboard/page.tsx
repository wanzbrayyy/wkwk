import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import Link from "next/link"
import { Plus, FolderGit2, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) return null

  const projects = await db.project.findMany({
    where: {
      user: {
        email: session.user.email
      }
    },
    orderBy: {
      updatedAt: 'desc'
    },
    include: {
      _count: {
        select: { files: true }
      }
    }
  })

  return (
    <div className="container max-w-screen-2xl py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your AI-generated projects.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button className="group relative flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border p-8 hover:border-primary/50 hover:bg-accent/50 transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold">New Project</h3>
            <p className="text-sm text-muted-foreground">Start generating code from scratch</p>
          </div>
        </button>

        {projects.map((project) => (
          <Link 
            key={project.id} 
            href={`/editor/${project.id}`}
            className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <FolderGit2 className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                  {project._count.files} files
                </span>
              </div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description || "No description provided."}
              </p>
            </div>
            
            <div className="mt-6 flex items-center text-xs text-muted-foreground pt-4 border-t border-border">
              <Clock className="mr-1 h-3 w-3" />
              Updated {formatDistanceToNow(project.updatedAt)} ago
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
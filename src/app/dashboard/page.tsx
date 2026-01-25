import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import Link from "next/link"
import { FolderGit2, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { NewProjectButton } from "@/components/project/new-project-button" // Import komponen baru

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
          <h1 className="text-3xl font-bold tracking-tight text-[#e0e0e0]">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your AI-generated projects.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewProjectButton /> {/* Gunakan komponen NewProjectButton di sini */}

        {projects.map((project) => (
          <Link 
            key={project.id} 
            href={`/editor/${project.id}`}
            className="group flex flex-col justify-between rounded-xl border border-[#333] bg-[#2d2d2d] p-6 shadow-sm hover:shadow-md hover:border-[#708F96] transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-md bg-[#708F96]/10 text-[#708F96]">
                  <FolderGit2 className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground bg-[#444] px-2 py-1 rounded-full">
                  {project._count.files} files
                </span>
              </div>
              <h3 className="font-semibold text-lg group-hover:text-[#708F96] transition-colors text-[#e0e0e0]">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description || "No description provided."}
              </p>
            </div>
            
            <div className="mt-6 flex items-center text-xs text-muted-foreground pt-4 border-t border-[#444]">
              <Clock className="mr-1 h-3 w-3" />
              Updated {formatDistanceToNow(project.updatedAt)} ago
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
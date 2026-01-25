import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect, notFound } from "next/navigation"
import { ClientEditorPage } from "./client-page" // Import ClientEditorPage

interface EditorPageProps {
  params: {
    projectId: string
  }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect("/api/auth/signin")
  }

  const project = await db.project.findUnique({
    where: {
      id: params.projectId,
      user: {
        email: session.user.email
      }
    },
    include: {
      files: true,
      messages: {
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  })

  if (!project) {
    notFound()
  }

  return (
    <ClientEditorPage projectData={JSON.stringify(project)} />
  )
}
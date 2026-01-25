import { useChat } from "ai/react"
import { toast } from "sonner"
import { useEditorStore } from "./use-editor-store"
import React from "react"
import { parseAiFileResponse, mapPrismaRoleToAiRole } from "@/lib/parser" // Import parser
import { Message } from "ai" // Import Message type dari ai

interface UseCodeGenerationProps {
  projectId: string
  initialMessages?: Message[] // Menggunakan Message dari 'ai'
}

export function useCodeGeneration({ projectId, initialMessages = [] }: UseCodeGenerationProps) {
  const { addGeneratedFiles, setActiveFile, openFile } = useEditorStore()

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    setMessages
  } = useChat({
    api: "/api/generate",
    body: {
      projectId
    },
    initialMessages,
    onResponse: (response) => {
      if (response.status === 401) {
        toast.error("You must be logged in to generate code.")
      }
    },
    onFinish: (message) => {
      if (message.role === "assistant") {
        const aiResponse = parseAiFileResponse(message.content);
        if (aiResponse && aiResponse.files.length > 0) {
          addGeneratedFiles(aiResponse.files);
          if (aiResponse.files.length > 0) {
            openFile(aiResponse.files[aiResponse.files.length - 1].path, aiResponse.files[aiResponse.files.length - 1].content);
            setActiveFile(aiResponse.files[aiResponse.files.length - 1].path);
          }
          toast.success(aiResponse.message || "Code generated and added to files.");
        } else {
          // If it's not a structured file response, just show it in chat
          toast("AI Response", { description: "AI responded in plain text or unrecognized format." });
        }
      }
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    }
  })

  const generateCodeForActiveFile = async (instruction: string) => {
    if (!activeFileId) { // activeFileId is not available directly here, needs to be passed or accessed via store
      toast.error("No file selected")
      return
    }
    
    const event = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement> 
    
    handleSubmit(event, {
      data: {
        instruction,
        // targetFile: activeFileId // No longer needed directly for AI file generation
      }
    })
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    generateCodeForActiveFile,
    setMessages
  }
}```

### 6. FILE BARU: `src/app/api/files/route.ts` (API untuk Menyimpan File)

```typescript
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { projectId, path, content, language } = await req.json()

    if (!projectId || !path || content === undefined) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    // Find the project to ensure user owns it
    const project = await db.project.findUnique({
      where: {
        id: projectId,
        userId: user.id,
      }
    })

    if (!project) {
      return new NextResponse("Project not found or unauthorized", { status: 404 })
    }

    // Upsert the file (create if not exists, update if exists)
    const file = await db.file.upsert({
      where: {
        projectId_path: { // Unique constraint defined in schema.prisma
          projectId: projectId,
          path: path,
        },
      },
      update: {
        content: content,
        language: language || "plaintext", // Update language if provided
        updatedAt: new Date(),
      },
      create: {
        projectId: projectId,
        path: path,
        name: path.split('/').pop() || path,
        content: content,
        language: language || "plaintext",
      },
    })

    return NextResponse.json(file)
  } catch (error) {
    console.error("[API_FILES_POST_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
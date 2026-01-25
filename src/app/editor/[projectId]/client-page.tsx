"use client"

import { useCodeGeneration } from "@/hooks/use-code-generation"
import {
  ArrowLeft, Play, Save, Download, FileCode2,
  Settings, Bot, Search, Plus, X, Code2
} from "lucide-react"
import Link from "next/link"
import { ChatInterface } from "@/components/chat/chat-interface"
import { Message } from "ai"
import { Project, File, Message as PrismaMessage } from "@prisma/client" // Import Prisma types
import { useRouter } from "next/navigation"

// Extend Project type for includes
interface ProjectWithDetails extends Project {
  files: File[];
  messages: PrismaMessage[];
}

interface ClientEditorPageProps {
  projectData: string
}

export function ClientEditorPage({ projectData }: ClientEditorPageProps) {
  const project: ProjectWithDetails = JSON.parse(projectData)

  const initialMessages: Message[] = project.messages.map(msg => ({
    id: msg.id,
    role: msg.role === "user" ? "user" : "assistant",
    content: msg.content,
  }))

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useCodeGeneration({
    projectId: project.id,
    initialMessages: initialMessages
  })

  const router = useRouter() // Use client-side router for navigation

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      <header className="h-14 border-b border-[#333] bg-[#1e1e1e] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-[#2d2d2d] rounded-md transition-colors text-[#708F96]">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-gradient-brand flex items-center justify-center">
               <span className="font-bold text-white text-xs">AC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#e0e0e0]">{project.name}</span>
              <span className="text-[10px] text-[#AA895F]">Editing mode</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#252526] rounded-md border border-[#333] px-2 py-1 mr-4">
            <div className="w-2 h-2 rounded-full bg-[#AA895F] animate-pulse mr-2"></div>
            <span className="text-xs text-muted-foreground">AI Ready</span>
          </div>

          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#e0e0e0] hover:bg-[#2d2d2d] rounded-md transition-colors border border-[#333]">
            <Save className="h-3.5 w-3.5" />
            Save
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-gradient-brand text-white hover:opacity-90 rounded-md transition-all shadow-lg shadow-[#708F96]/10">
            <Play className="h-3.5 w-3.5 fill-current" />
            Run Project
          </button>
          <button className="p-2 text-[#708F96] hover:bg-[#2d2d2d] rounded-md transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 border-r border-[#333] bg-[#252526] flex flex-col">
          <div className="p-3 border-b border-[#333] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#858585] uppercase tracking-wider">Explorer</span>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-[#333] rounded"><Plus className="h-3 w-3 text-[#cccccc]" /></button>
              <button className="p-1 hover:bg-[#333] rounded"><Search className="h-3 w-3 text-[#cccccc]" /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {project.files.length === 0 ? (
              <div className="text-xs text-[#858585] p-4 text-center">
                Project is empty.
              </div>
            ) : (
              <div className="flex flex-col">
                {project.files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 px-4 py-1.5 text-sm text-[#cccccc] hover:bg-[#2a2d2e] cursor-pointer transition-colors border-l-2 border-transparent hover:border-[#708F96]"
                  >
                    <FileCode2 className="h-4 w-4 text-[#708F96]" />
                    <span className="truncate">{file.path.split('/').pop()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 flex flex-col bg-[#1e1e1e] relative">
          <div className="flex border-b border-[#333] bg-[#252526] overflow-x-auto">
             <div className="flex items-center gap-2 px-4 py-2 border-t-2 border-[#AA895F] bg-[#1e1e1e] text-[#e0e0e0] text-sm min-w-[120px]">
                <FileCode2 className="h-3 w-3 text-[#AA895F]" />
                <span className="truncate">page.tsx</span>
                <X className="h-3 w-3 ml-auto hover:text-white cursor-pointer" />
             </div>
             <div className="flex items-center gap-2 px-4 py-2 border-t-2 border-transparent text-[#858585] hover:bg-[#2a2d2e] text-sm min-w-[120px] cursor-pointer">
                <FileCode2 className="h-3 w-3" />
                <span className="truncate">layout.tsx</span>
             </div>
          </div>

          <div className="flex-1 p-4 font-mono text-sm text-[#d4d4d4] overflow-auto">
            <div className="flex items-center justify-center h-full flex-col gap-4 opacity-50">
               <Code2 className="h-16 w-16 text-[#333]" />
               <p className="text-[#858585]">Select a file to start editing</p>
            </div>
          </div>
        </main>

        <ChatInterface
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
"use client"

import { X } from "lucide-react"
import { MonacoEditor } from "./monaco-editor"
import { cn } from "@/lib/utils"

interface OpenFile {
  path: string
  content: string
  language: string
}

interface CodeViewProps {
  files: OpenFile[]
  activeFile: string | null
  onCloseFile: (path: string) => void
  onSelectFile: (path: string) => void
  onCodeChange: (value: string) => void
}

export function CodeView({ 
  files, 
  activeFile, 
  onCloseFile, 
  onSelectFile,
  onCodeChange 
}: CodeViewProps) {
  const activeFileObj = files.find(f => f.path === activeFile)

  return (
    <div className="flex h-full w-full flex-col bg-[#1e1e1e]">
      <div className="flex border-b border-[#333] bg-[#252526] overflow-x-auto no-scrollbar">
        {files.map((file) => (
          <div
            key={file.path}
            onClick={() => onSelectFile(file.path)}
            className={cn(
              "group flex items-center gap-2 px-3 py-2 text-sm min-w-[120px] max-w-[200px] border-r border-[#333] cursor-pointer select-none",
              activeFile === file.path
                ? "bg-[#1e1e1e] text-[#e0e0e0] border-t-2 border-t-[#708F96]"
                : "bg-[#2d2d2d] text-[#858585] border-t-2 border-t-transparent hover:bg-[#333]"
            )}
          >
            <span className="truncate flex-1">{file.path.split('/').pop()}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCloseFile(file.path)
              }}
              className="opacity-0 group-hover:opacity-100 hover:bg-[#444] rounded p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex-1 relative">
        {activeFileObj ? (
          <MonacoEditor
            value={activeFileObj.content}
            language={activeFileObj.language}
            onChange={(val) => onCodeChange(val || "")}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#858585]">
            <div className="text-center">
              <p className="mb-2 text-lg font-medium">AutoCode.ai</p>
              <p className="text-sm">Select a file to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
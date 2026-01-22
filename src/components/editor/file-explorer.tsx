"use client"

import { File, Folder, ChevronRight, ChevronDown, FileCode2, FileJson, FileImage } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FileNode {
  id: string
  name: string
  type: "file" | "folder"
  children?: FileNode[]
  path: string
}

interface FileExplorerProps {
  files: FileNode[]
  activeFileId?: string
  onSelectFile: (path: string) => void
}

const getFileIcon = (filename: string) => {
  if (filename.endsWith(".tsx") || filename.endsWith(".ts")) return <FileCode2 className="h-4 w-4 text-[#708F96]" />
  if (filename.endsWith(".css")) return <FileCode2 className="h-4 w-4 text-[#AA895F]" />
  if (filename.endsWith(".json")) return <FileJson className="h-4 w-4 text-yellow-500" />
  if (filename.endsWith(".png") || filename.endsWith(".jpg")) return <FileImage className="h-4 w-4 text-purple-400" />
  return <File className="h-4 w-4 text-[#cccccc]" />
}

export function FileExplorer({ files, activeFileId, onSelectFile }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({ "root": true })

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const renderTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.id} style={{ paddingLeft: level > 0 ? `${level * 12}px` : 0 }}>
        {node.type === "folder" ? (
          <div>
            <div 
              className="flex items-center gap-1.5 py-1 px-2 text-[#cccccc] hover:bg-[#2a2d2e] cursor-pointer select-none"
              onClick={() => toggleFolder(node.id)}
            >
              {expandedFolders[node.id] ? (
                <ChevronDown className="h-3.5 w-3.5 text-[#858585]" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-[#858585]" />
              )}
              <Folder className="h-3.5 w-3.5 text-[#858585]" />
              <span className="text-sm truncate">{node.name}</span>
            </div>
            {expandedFolders[node.id] && node.children && (
              <div>{renderTree(node.children, level + 1)}</div>
            )}
          </div>
        ) : (
          <div
            onClick={() => onSelectFile(node.path)}
            className={cn(
              "flex items-center gap-2 py-1 px-2 cursor-pointer transition-colors border-l-2 border-transparent ml-2",
              activeFileId === node.path 
                ? "bg-[#2a2d2e] text-white border-[#708F96]" 
                : "text-[#858585] hover:bg-[#2a2d2e] hover:text-[#cccccc]"
            )}
          >
            {getFileIcon(node.name)}
            <span className="text-sm truncate">{node.name}</span>
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="h-full w-full bg-[#252526] flex flex-col">
      <div className="p-3 border-b border-[#333] text-xs font-bold text-[#858585] uppercase tracking-wider">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {renderTree(files)}
      </div>
    </div>
  )
}
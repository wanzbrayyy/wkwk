"use client"

import { File, Folder, ChevronRight, ChevronDown, FileCode2, FileJson, FileImage, Plus, Search } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { FileNode, useEditorStore } from "@/hooks/use-editor-store" // Import FileNode dan useEditorStore

interface FileExplorerProps {
  files: FileNode[] // Menerima files dari store
  activeFileId?: string | null // Menerima activeFileId dari store
  onSelectFile: (path: string) => void // Menerima onSelectFile dari client-page
}

const getFileIcon = (filename: string) => {
  if (filename.endsWith(".tsx") || filename.endsWith(".ts")) return <FileCode2 className="h-4 w-4 text-[#708F96]" />
  if (filename.endsWith(".css")) return <FileCode2 className="h-4 w-4 text-[#AA895F]" />
  if (filename.endsWith(".json")) return <FileJson className="h-4 w-4 text-yellow-500" />
  if (filename.endsWith(".png") || filename.endsWith(".jpg") || filename.endsWith(".jpeg") || filename.endsWith(".svg")) return <FileImage className="h-4 w-4 text-purple-400" />
  return <File className="h-4 w-4 text-[#cccccc]" />
}

export function FileExplorer({ onSelectFile }: Omit<FileExplorerProps, 'files' | 'activeFileId'>) {
  const { files, activeFileId } = useEditorStore(); // Mengambil state dari store
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({ "src": true, "src/app": true, "src/components": true }) // Expand default folders

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const renderTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.path}> {/* Gunakan node.path sebagai key */}
        {node.type === "folder" ? (
          <div>
            <div 
              className="flex items-center gap-1.5 py-1 px-2 text-[#cccccc] hover:bg-[#2a2d2e] cursor-pointer select-none"
              style={{ paddingLeft: `${level * 12 + 8}px` }} // Indentasi
              onClick={() => toggleFolder(node.path)}
            >
              {expandedFolders[node.path] ? (
                <ChevronDown className="h-3.5 w-3.5 text-[#858585]" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-[#858585]" />
              )}
              <Folder className="h-3.5 w-3.5 text-[#858585]" />
              <span className="text-sm truncate">{node.name}</span>
            </div>
            {expandedFolders[node.path] && node.children && node.children.length > 0 && (
              <div>{renderTree(node.children, level + 1)}</div>
            )}
          </div>
        ) : (
          <div
            onClick={() => onSelectFile(node.path)}
            className={cn(
              "flex items-center gap-2 py-1 px-2 cursor-pointer transition-colors border-l-2 border-transparent",
              activeFileId === node.path 
                ? "bg-[#2a2d2e] text-white border-[#708F96]" 
                : "text-[#858585] hover:bg-[#2a2d2e] hover:text-[#cccccc]"
            )}
            style={{ paddingLeft: `${level * 12 + 24}px` }} // Indentasi
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
      <div className="p-3 border-b border-[#333] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#858585] uppercase tracking-wider">Explorer</span>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-[#333] rounded"><Plus className="h-3 w-3 text-[#cccccc]" /></button>
          <button className="p-1 hover:bg-[#333] rounded"><Search className="h-3 w-3 text-[#cccccc]" /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {files.length === 0 ? (
          <div className="text-xs text-[#858585] p-4 text-center">
            Project is empty.
          </div>
        ) : (
          renderTree(files)
        )}
      </div>
    </div>
  )
}
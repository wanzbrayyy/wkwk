"use client"

import { useState } from "react"
import { FileExplorer } from "./file-explorer"
import { CodeView } from "./code-view"
import { Terminal } from "./terminal"
import { PreviewPane } from "./preview-pane"
import { PanelLeft, PanelRight, Play } from "lucide-react"

export function Workspace() {
  const [activeFile, setActiveFile] = useState<string | null>("app/page.tsx")
  const [showPreview, setShowPreview] = useState(true)
  
  // Mock data
  const files = [
    {
      id: "root", name: "src", type: "folder" as const, path: "src",
      children: [
        { 
          id: "app", name: "app", type: "folder" as const, path: "src/app",
          children: [
            { id: "page", name: "page.tsx", type: "file" as const, path: "app/page.tsx" },
            { id: "layout", name: "layout.tsx", type: "file" as const, path: "app/layout.tsx" },
            { id: "global", name: "globals.css", type: "file" as const, path: "app/globals.css" }
          ]
        },
        { 
          id: "comp", name: "components", type: "folder" as const, path: "src/components",
          children: [
             { id: "btn", name: "button.tsx", type: "file" as const, path: "components/button.tsx" }
          ]
        }
      ]
    }
  ]

  const [openFiles, setOpenFiles] = useState([
    { 
      path: "app/page.tsx", 
      language: "typescript", 
      content: "export default function Home() {\n  return <div>Hello AutoCode</div>\n}" 
    }
  ])

  const handleFileSelect = (path: string) => {
    if (!openFiles.find(f => f.path === path)) {
      setOpenFiles([...openFiles, { path, language: "typescript", content: "// Loading..." }])
    }
    setActiveFile(path)
  }

  const handleCloseFile = (path: string) => {
    const newFiles = openFiles.filter(f => f.path !== path)
    setOpenFiles(newFiles)
    if (activeFile === path) {
      setActiveFile(newFiles.length > 0 ? newFiles[newFiles.length - 1].path : null)
    }
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 shrink-0 border-r border-[#333]">
        <FileExplorer 
          files={files} 
          activeFileId={activeFile || ""} 
          onSelectFile={handleFileSelect} 
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex-1 flex min-h-0">
          <div className={`flex-1 flex flex-col min-w-0 ${showPreview ? 'border-r border-[#333]' : ''}`}>
            <CodeView 
              files={openFiles} 
              activeFile={activeFile} 
              onCloseFile={handleCloseFile}
              onSelectFile={setActiveFile}
              onCodeChange={(val) => console.log(val)}
            />
            <Terminal />
          </div>
          
          {showPreview && (
            <div className="w-[400px] shrink-0 flex flex-col">
               <PreviewPane />
            </div>
          )}
        </div>
        
        {/* Footer Status Bar */}
        <div className="h-6 bg-[#708F96] text-white flex items-center justify-between px-3 text-xs select-none">
          <div className="flex items-center gap-3">
             <span className="font-bold">main*</span>
             <span>0 errors</span>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setShowPreview(!showPreview)} className="hover:text-[#e0e0e0] flex items-center gap-1">
               <PanelRight className="h-3 w-3" />
               {showPreview ? "Hide Preview" : "Show Preview"}
             </button>
             <span>TypeScript React</span>
          </div>
        </div>
      </div>
    </div>
  )
}
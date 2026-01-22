"use client"

import { Terminal as TerminalIcon, X, ChevronUp } from "lucide-react"
import { useState } from "react"

interface Log {
  id: string
  message: string
  type: "info" | "error" | "success"
  timestamp: string
}

export function Terminal() {
  const [isOpen, setIsOpen] = useState(true)
  const [logs] = useState<Log[]>([
    { id: "1", message: "Build started...", type: "info", timestamp: "10:00:01" },
    { id: "2", message: "Compiling /src/app/page.tsx...", type: "info", timestamp: "10:00:02" },
    { id: "3", message: "✓ Compilation successful", type: "success", timestamp: "10:00:04" },
    { id: "4", message: "Ready on http://localhost:3000", type: "success", timestamp: "10:00:05" },
  ])

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 border-t border-[#333] bg-[#1e1e1e] px-4 py-1 text-xs text-[#cccccc] hover:bg-[#2d2d2d]"
      >
        <TerminalIcon className="h-3 w-3" />
        <span>Terminal</span>
        <ChevronUp className="h-3 w-3 ml-auto" />
      </button>
    )
  }

  return (
    <div className="flex h-48 flex-col border-t border-[#333] bg-[#1e1e1e]">
      <div className="flex items-center justify-between border-b border-[#333] px-4 py-2">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-3 w-3 text-[#AA895F]" />
          <span className="text-xs font-medium text-[#cccccc] uppercase">Terminal</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-[#858585] hover:text-white">
          <X className="h-3 w-3" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 mb-1.5 last:mb-0">
            <span className="text-[#666] shrink-0">{log.timestamp}</span>
            <span className={`
              ${log.type === 'error' ? 'text-red-400' : ''}
              ${log.type === 'success' ? 'text-[#708F96]' : ''}
              ${log.type === 'info' ? 'text-[#cccccc]' : ''}
            `}>
              {log.message}
            </span>
          </div>
        ))}
        <div className="flex gap-4 mt-2">
          <span className="text-[#666]">{new Date().toLocaleTimeString()}</span>
          <span className="text-[#AA895F] animate-pulse">_</span>
        </div>
      </div>
    </div>
  )
}
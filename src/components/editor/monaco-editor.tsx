"use client"

import Editor, { OnMount } from "@monaco-editor/react"
import { useRef } from "react"

interface MonacoEditorProps {
  value: string
  language?: string
  onChange?: (value: string | undefined) => void
  readOnly?: boolean
}

export function MonacoEditor({ 
  value, 
  language = "typescript", 
  onChange,
  readOnly = false 
}: MonacoEditorProps) {
  const editorRef = useRef(null)

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  return (
    <div className="h-full w-full overflow-hidden rounded-md bg-[#1e1e1e]">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        language={language}
        value={value}
        theme="vs-dark"
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineHeight: 24,
          fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
          readOnly,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: "all",
          cursorBlinking: "smooth",
          smoothScrolling: true,
        }}
      />
    </div>
  )
}
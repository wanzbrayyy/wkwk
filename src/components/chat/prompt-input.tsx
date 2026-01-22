"use client"

import { Send, Loader2, ArrowUp } from "lucide-react"
import { useRef, useState, KeyboardEvent } from "react"

interface PromptInputProps {
  onSubmit: (value: string) => void
  isLoading: boolean
}

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        handleSubmit()
      }
    }
  }

  const handleSubmit = () => {
    if (!input.trim()) return
    onSubmit(input)
    setInput("")
  }

  return (
    <div className="relative flex items-end w-full p-3 bg-[#1e1e1e] border-t border-[#333]">
      <div className="relative w-full rounded-xl border border-[#333] bg-[#252526] transition-colors focus-within:border-[#708F96]">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AutoCode to generate or refactor code..."
          className="min-h-[50px] w-full resize-none bg-transparent px-4 py-3 text-sm text-[#e0e0e0] placeholder:text-[#666] focus:outline-none max-h-[200px]"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className="absolute bottom-2 right-2 p-2 rounded-lg bg-[#708F96] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}
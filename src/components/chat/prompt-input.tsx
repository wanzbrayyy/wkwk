"use client"

import { Loader2, ArrowUp } from "lucide-react"
import { useRef, useEffect, KeyboardEvent, ChangeEvent, FormEvent } from "react"

interface PromptInputProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  input: string
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export function PromptInput({ onSubmit, isLoading, input, handleInputChange }: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      // Karena onSubmit sekarang adalah handleSubmit dari useChat, kita panggil langsung.
      // useChat's handleSubmit akan membuat FormEvent sendiri jika input diubah oleh handleInputChange.
      // Jadi, kita hanya perlu memicu submit form.
      if (textareaRef.current) {
        textareaRef.current.form?.requestSubmit()
      }
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [input])

  return (
    <form onSubmit={onSubmit} className="relative flex items-end w-full p-3 bg-[#1e1e1e] border-t border-[#333]">
      <div className="relative w-full rounded-xl border border-[#333] bg-[#252526] transition-colors focus-within:border-[#708F96]">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask AutoCode to generate or refactor code..."
          className="min-h-[50px] w-full resize-none bg-transparent px-4 py-3 pr-12 text-sm text-[#e0e0e0] placeholder:text-[#666] focus:outline-none max-h-[200px]"
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#708F96] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </button>
      </div>
    </form>
  )
}
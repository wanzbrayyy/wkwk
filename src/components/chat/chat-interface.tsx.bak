"use client"

import { useRef, useEffect, FormEvent } from "react"
import { MessageBubble } from "./message-bubble"
import { PromptInput } from "./prompt-input"
import { Bot, Sparkles } from "lucide-react"
import { Message } from "ai"

interface ChatInterfaceProps {
  messages: Message[]
  isLoading: boolean
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function ChatInterface({ messages, isLoading, input, handleInputChange, onSubmit }: ChatInterfaceProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex h-full w-80 shrink-0 flex-col bg-[#1e1e1e] border-l border-[#333]">
      <div className="flex items-center gap-2 border-b border-[#333] p-4 shadow-sm z-10">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#708F96] to-[#AA895F]">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#e0e0e0]">AI Architect</h3>
          <p className="text-xs text-[#AA895F]">Powered by GPT-4</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center space-y-4 opacity-50">
            <div className="rounded-full bg-[#333] p-4">
              <Sparkles className="h-8 w-8 text-[#708F96]" />
            </div>
            <div>
              <p className="font-medium text-[#e0e0e0]">No messages yet</p>
              <p className="text-xs text-[#858585] mt-1 max-w-[200px]">
                Start a conversation to generate code, fix bugs, or ask questions.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
            />
          ))
        )}
        {isLoading && (
          <div className="flex w-full gap-3 p-4 text-sm mb-2 rounded-lg bg-transparent">
            <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border border-[#AA895F]/30 bg-[#AA895F]/10 text-[#AA895F]">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-2 overflow-hidden">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-[#AA895F] animate-bounce-slow" style={{ animationDelay: '0s' }}></div>
                <div className="h-2 w-2 rounded-full bg-[#AA895F] animate-bounce-slow" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 rounded-full bg-[#AA895F] animate-bounce-slow" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <PromptInput
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}
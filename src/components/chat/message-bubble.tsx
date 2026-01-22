import { User, Bot, Copy, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  role: "user" | "assistant" | "system"
  content: string
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isUser = role === "user"

  return (
    <div className={cn(
      "flex w-full gap-3 p-4 text-sm mb-2 rounded-lg",
      isUser ? "bg-[#2d2d2d]" : "bg-transparent"
    )}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border",
        isUser 
          ? "border-[#333] bg-[#1e1e1e] text-[#cccccc]" 
          : "border-[#AA895F]/30 bg-[#AA895F]/10 text-[#AA895F]"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="prose prose-invert max-w-none text-[#e0e0e0] leading-relaxed">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
        
        {!isUser && (
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={onCopy}
              className="flex items-center gap-1.5 text-xs text-[#858585] hover:text-[#708F96] transition-colors"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
import { useChat } from "ai/react"
import { toast } from "sonner"
import { useEditorStore } from "./use-editor-store"

interface UseCodeGenerationProps {
  projectId: string
  initialMessages?: any[]
}

export function useCodeGeneration({ projectId, initialMessages = [] }: UseCodeGenerationProps) {
  const { updateFileContent, activeFileId } = useEditorStore()

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    setMessages
  } = useChat({
    api: "/api/generate",
    body: {
      projectId
    },
    initialMessages,
    onResponse: (response) => {
      if (response.status === 401) {
        toast.error("You must be logged in to generate code.")
      }
    },
    onFinish: (message) => {
      if (message.role === "assistant" && message.content.includes("```")) {
        // Simple heuristic to detect if AI returned a code block to replace content
        // In a real app, you might want structured output or function calling
        toast.success("Code generation completed")
      }
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    }
  })

  const generateCodeForActiveFile = async (instruction: string) => {
    if (!activeFileId) {
      toast.error("No file selected")
      return
    }
    
    // Custom trigger logic could go here to hit a specific code-only endpoint
    // utilizing the handleSubmit manually with a specific system prompt context
    const event = {
      preventDefault: () => {},
    } as React.FormEvent
    
    handleSubmit(event, {
      data: {
        instruction,
        targetFile: activeFileId
      }
    })
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    generateCodeForActiveFile,
    setMessages
  }
}
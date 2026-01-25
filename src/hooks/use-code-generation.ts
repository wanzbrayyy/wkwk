import { useChat } from "ai/react"
import { toast } from "sonner"
import { useEditorStore } from "./use-editor-store"
import React from "react"
import { parseAiFileResponse, mapPrismaRoleToAiRole } from "@/lib/parser"
import { Message } from "ai"

interface UseCodeGenerationProps {
  projectId: string
  initialMessages?: Message[]
}

export function useCodeGeneration({ projectId, initialMessages = [] }: UseCodeGenerationProps) {
  const { addGeneratedFiles, setActiveFile, openFile } = useEditorStore()

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
      if (message.role === "assistant") {
        const aiResponse = parseAiFileResponse(message.content);
        if (aiResponse && aiResponse.files.length > 0) {
          addGeneratedFiles(aiResponse.files);
          if (aiResponse.files.length > 0) {
            // Open the first generated file, or the last one if multiple
            openFile(aiResponse.files.path, aiResponse.files.content);
            setActiveFile(aiResponse.files.path);
          }
          toast.success(aiResponse.message || "Code generated and added to files.");
        } else {
          // If it's not a structured file response, just show it in chat and notify
          if (message.content.trim().length > 0) {
            toast("AI Response", { description: "AI responded in plain text or unrecognized format." });
          }
        }
      }
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    }
  })

  const generateCodeForActiveFile = async (instruction: string) => {
    // This function can be used to manually trigger code generation outside of chat submit
    // For now, it's not directly used by the current UI flow, but kept for future expansion.
    if (!instruction.trim()) {
      toast.error("Please provide an instruction for code generation.");
      return;
    }

    const event = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement> 
    
    handleSubmit(event, {
      data: {
        instruction,
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
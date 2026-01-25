import { FileNode } from "@/types/editor"

export function extractCodeFromMarkdown(content: string): string {
  const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)```/g
  const matches = [...content.matchAll(codeBlockRegex)]
  
  if (matches.length > 0) {
    return matches.map(match => match[1]).join('\n\n')
  }

  return content
}

export function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  switch (ext) {
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'js':
    case 'jsx':
      return 'javascript'
    case 'css':
      return 'css'
    case 'json':
      return 'json'
    case 'html':
      return 'html'
    case 'prisma':
      return 'prisma'
    default:
      return 'plaintext'
  }
}

interface GeneratedFile {
  path: string
  language: string
  content: string
}

export interface AiFileResponse {
  files: GeneratedFile[]
  message: string
}

export function parseAiFileResponse(rawContent: string): AiFileResponse | null {
  try {
    // Attempt to extract JSON from markdown code block
    const jsonCodeBlockMatch = rawContent.match(/```json\n([\s\S]*?)\n```/)
    if (jsonCodeBlockMatch && jsonCodeBlockMatch[1]) {
      return JSON.parse(jsonCodeBlockMatch[1]) as AiFileResponse
    }

    // Attempt to parse directly if no markdown code block
    const parsed = JSON.parse(rawContent)
    if (parsed && Array.isArray(parsed.files)) {
      return parsed as AiFileResponse
    }

  } catch (error) {
    console.error("Failed to parse AI file response:", error)
  }
  return null
}

// Helper to convert plain string role from Prisma to AI SDK role
export function mapPrismaRoleToAiRole(role: string): "user" | "assistant" | "system" {
  if (role === "user") return "user";
  if (role === "assistant") return "assistant";
  return "system"; // Default to system if role is not directly user/assistant
}
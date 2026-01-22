export interface CreateProjectRequest {
  name: string
  description?: string
}

export interface GenerateCodeRequest {
  projectId: string
  messages: {
    role: "user" | "assistant" | "system"
    content: string
  }[]
  currentFile?: string
}

export interface SaveFileRequest {
  projectId: string
  path: string
  content: string
}

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  status: number
}
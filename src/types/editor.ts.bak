export interface FileNode {
  id: string
  name: string
  type: "file" | "folder"
  path: string
  content?: string
  language?: string
  parentId?: string
  children?: FileNode[]
  depth?: number
}

export interface EditorTab {
  path: string
  title: string
  isDirty: boolean
}

export interface TerminalLog {
  id: string
  type: "info" | "warning" | "error" | "success"
  message: string
  timestamp: Date
}

export type ViewMode = "code" | "preview" | "split"
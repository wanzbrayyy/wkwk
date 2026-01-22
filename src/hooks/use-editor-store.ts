import { create } from "zustand"

export interface FileNode {
  id: string
  name: string
  type: "file" | "folder"
  path: string
  content?: string
  language?: string
  children?: FileNode[]
  isOpen?: boolean
}

interface EditorState {
  files: FileNode[]
  activeFileId: string | null
  openFiles: string[] 
  fileContents: Record<string, string> 
  
  setFiles: (files: FileNode[]) => void
  setActiveFile: (path: string) => void
  openFile: (path: string, content?: string) => void
  closeFile: (path: string) => void
  updateFileContent: (path: string, content: string) => void
  getFileContent: (path: string) => string
}

export const useEditorStore = create<EditorState>((set, get) => ({
  files: [],
  activeFileId: null,
  openFiles: [],
  fileContents: {},

  setFiles: (files) => set({ files }),

  setActiveFile: (path) => set({ activeFileId: path }),

  openFile: (path, content = "") => {
    const { openFiles, fileContents } = get()
    
    if (!openFiles.includes(path)) {
      set({ 
        openFiles: [...openFiles, path],
        fileContents: {
          ...fileContents,
          [path]: fileContents[path] || content
        }
      })
    }
    set({ activeFileId: path })
  },

  closeFile: (path) => {
    const { openFiles, activeFileId } = get()
    const newOpenFiles = openFiles.filter((f) => f !== path)
    
    let newActiveId = activeFileId
    if (activeFileId === path) {
      newActiveId = newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null
    }

    set({ 
      openFiles: newOpenFiles, 
      activeFileId: newActiveId 
    })
  },

  updateFileContent: (path, content) => {
    set((state) => ({
      fileContents: {
        ...state.fileContents,
        [path]: content
      }
    }))
  },

  getFileContent: (path) => {
    return get().fileContents[path] || ""
  }
}))
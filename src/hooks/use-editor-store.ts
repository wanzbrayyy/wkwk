import { create } from "zustand"
import { detectLanguage } from "@/lib/parser" // Import detectLanguage

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

// Helper function to recursively add/update a file in the file tree
const updateFileTree = (tree: FileNode[], newFilePath: string, newFileContent: string): FileNode[] => {
  const pathParts = newFilePath.split('/')
  let currentTree = tree

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i]
    const isFile = i === pathParts.length - 1

    let existingNode = currentTree.find(node => node.name === part && node.type === (isFile ? "file" : "folder"))

    if (!existingNode) {
      existingNode = {
        id: Math.random().toString(36).substring(2, 9), // Simple ID generation
        name: part,
        type: isFile ? "file" : "folder",
        path: pathParts.slice(0, i + 1).join('/'),
        children: isFile ? undefined : [],
      }
      currentTree.push(existingNode)
      // Sort to keep folders first and then alphabetically
      currentTree.sort((a, b) => {
        if (a.type === "folder" && b.type === "file") return -1
        if (a.type === "file" && b.type === "folder") return 1
        return a.name.localeCompare(b.name)
      })
    }

    if (isFile) {
      existingNode.content = newFileContent
      existingNode.language = detectLanguage(part)
      break
    } else {
      // Ensure children array exists for folders
      if (!existingNode.children) {
        existingNode.children = []
      }
      currentTree = existingNode.children
    }
  }
  return [...tree] // Return a new array reference to trigger re-render
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
  addGeneratedFiles: (generatedFiles: { path: string; content: string; language: string }[]) => void
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
    const { openFiles, activeFileId, fileContents } = get()
    const newOpenFiles = openFiles.filter((f) => f !== path)
    
    let newActiveId = activeFileId
    if (activeFileId === path) {
      newActiveId = newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null
    }

    // Remove content from fileContents if file is closed
    const newFileContents = { ...fileContents };
    delete newFileContents[path];

    set({ 
      openFiles: newOpenFiles, 
      activeFileId: newActiveId,
      fileContents: newFileContents
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
  },

  // New method to add/update files from AI generation
  addGeneratedFiles: (generatedFiles) => {
    let currentFiles = get().files;
    let newFileContents = { ...get().fileContents };
    let newOpenFiles = [...get().openFiles];
    let newActiveFileId = get().activeFileId;

    generatedFiles.forEach(file => {
      currentFiles = updateFileTree(currentFiles, file.path, file.content);
      newFileContents[file.path] = file.content;

      if (!newOpenFiles.includes(file.path)) {
        newOpenFiles.push(file.path);
      }
      newActiveFileId = file.path; // Set the last generated file as active
    });

    set({
      files: currentFiles,
      fileContents: newFileContents,
      openFiles: newOpenFiles,
      activeFileId: newActiveFileId,
    });
  }
}))
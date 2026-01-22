import { Project, File, Message, User } from "@prisma/client"

export type ProjectWithFiles = Project & {
  files: File[]
}

export type ProjectWithDetails = Project & {
  files: File[]
  messages: Message[]
  user: User
}

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}
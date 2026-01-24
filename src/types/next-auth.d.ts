import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string // Tambahkan properti ID ke user di Session
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string // Tambahkan properti ID ke user secara umum
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string // Tambahkan properti ID ke JWT
  }
}
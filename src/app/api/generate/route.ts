import { OpenAIStream, StreamingTextResponse } from "ai"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { openai } from "@/lib/ai/openai"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { messages, projectId } = await req.json()

  const user = await db.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return new Response("User not found", { status: 404 })
  }

  const lastMessage = messages[messages.length - 1]
  
  // Simpan pesan user ke DB
  await db.message.create({
    data: {
      role: "user",
      content: lastMessage.content,
      projectId: projectId
    }
  })

  // Panggil OpenRouter (Deepseek)
  const response = await openai.chat.completions.create({
    model: "tngtech/deepseek-r1t2-chimera:free",
    stream: true,
    messages: [
      {
        role: "system",
        content: "You are an expert full-stack developer. You write clean, production-ready code. formatting it properly."
      },
      ...messages
    ]
  })

  // PERBAIKAN: Gunakan 'as any' pada response untuk mengatasi error TypeScript
  const stream = OpenAIStream(response as any, {
    onCompletion: async (completion) => {
      // Simpan balasan AI ke DB setelah stream selesai
      await db.message.create({
        data: {
          role: "assistant",
          content: completion,
          projectId: projectId
        }
      })
    }
  })

  return new StreamingTextResponse(stream)
}
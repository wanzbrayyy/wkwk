import { OpenAIStream, StreamingTextResponse } from "ai"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
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
  await db.message.create({
    data: {
      role: "user",
      content: lastMessage.content,
      projectId: projectId
    }
  })

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

  const stream = OpenAIStream(response, {
    onCompletion: async (completion) => {
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
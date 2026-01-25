import { OpenAIStream, StreamingTextResponse } from "ai"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { openai } from "@/lib/ai/openai"
import { SYSTEM_PROMPT } from "@/lib/ai/prompts" // Import SYSTEM_PROMPT

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
        content: SYSTEM_PROMPT // Gunakan SYSTEM_PROMPT yang diperbarui
      },
      ...messages
    ]
  })

  const stream = OpenAIStream(response as any, {
    onCompletion: async (completion) => {
      await db.message.create({
        data: {
          role: "assistant",
          content: completion,
          projectId: projectId
        }
      })
    },
    experimental_onFunctionCall: async ({ name, arguments: args }, create  ) => {
      // Future function call implementation could go here
    }
  })

  return new StreamingTextResponse(stream)
}
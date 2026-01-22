import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { name, description } = await req.json()

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const project = await db.project.create({
      data: {
        name,
        description,
        userId: user.id,
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const projects = await db.project.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(projects)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
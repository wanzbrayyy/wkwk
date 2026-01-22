import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"
import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const project = await db.project.findUnique({
      where: {
        id: params.id,
        user: {
          email: session.user.email
        }
      },
      include: {
        files: true,
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    if (!project) {
      return new NextResponse("Project not found", { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    const { name, description } = await req.json()

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const project = await db.project.update({
      where: {
        id: params.id,
        user: {
          email: session.user.email
        }
      },
      data: {
        name,
        description
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const project = await db.project.delete({
      where: {
        id: params.id,
        user: {
          email: session.user.email
        }
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
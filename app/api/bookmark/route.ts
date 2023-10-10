import { NextRequest, NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const bookmarkPosts = await prismadb.bookmark.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(bookmarkPosts, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.log("[BOOKMARK_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession({ req: NextRequest, ...authOptions })

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const body = await req.json()

    const { title, content, bookUrl } = body

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    if (!bookUrl) {
      return new NextResponse("Url is required", { status: 400 })
    }

    const bookmarkPost = await prismadb.bookmark.create({
      data: {
        title,
        content,
        bookUrl,
      },
    })

    return new NextResponse(JSON.stringify(bookmarkPost), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[BOOKMARK_POST]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

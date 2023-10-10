import { NextRequest, NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { bookmarkId: string } }
) {
  try {
    const bookmark = await prismadb.bookmark.findUnique({
      where: {
        bookmarkId: params.bookmarkId,
      },
    })

    return NextResponse.json(bookmark, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[Bookmark_GET]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { bookmarkId: string } }
) {
  try {
    const session = await getServerSession({ req: NextRequest, ...authOptions })

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const body = await req.json()

    const { title, content, bookUrl } = body

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    if (!bookUrl) {
      return new NextResponse("Url is required", { status: 400 })
    }

    await prismadb.bookmark.update({
      where: {
        bookmarkId: params.bookmarkId,
      },
      data: {
        ...body,
      },
    })

    const bookmarkPost = await prismadb.bookmark.findUnique({
      where: {
        bookmarkId: params.bookmarkId,
      },
    })

    return new NextResponse(JSON.stringify(bookmarkPost), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[Bookmark_PATCH]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { bookmarkId: string } }
) {
  try {
    const session = await getServerSession({ req: NextRequest, ...authOptions })

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const bookmark = await prismadb.bookmark.delete({
      where: {
        bookmarkId: params.bookmarkId,
      },
    })

    return NextResponse.json(JSON.stringify(bookmark), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[BOOKMARK_DELETE", err)
    return new NextResponse("Initial error", { status: 500 })
  }
}

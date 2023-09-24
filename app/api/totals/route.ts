import { NextRequest, NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession({ req: NextRequest, ...authOptions })

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const blogCount = await prismadb.blog.count()
    const newsletterCount = await prismadb.newsletter.count()
    const bookmarkCount = await prismadb.bookmark.count()

    return new NextResponse(
      JSON.stringify({
        blogCount,
        newsletterCount,
        bookmarkCount,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (err) {
    console.log("[TOTAL_COUNT_GET]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

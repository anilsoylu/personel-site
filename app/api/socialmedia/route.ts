import { NextRequest, NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const socialmediaPosts = await prismadb.socialMedia.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(socialmediaPosts)
  } catch (err) {
    console.log("[SOCIALMEDIA_GET]", err)
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

    const { name, url } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!url) {
      return new NextResponse("Url is required", { status: 400 })
    }

    const socialmediaPost = await prismadb.socialMedia.create({
      data: {
        name,
        url,
      },
    })

    return new NextResponse(JSON.stringify(socialmediaPost), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[SOCIALMEDIA_POST]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}

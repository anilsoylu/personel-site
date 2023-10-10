import { NextRequest, NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const blogPosts = await prismadb.blog.findMany({
      include: {
        images: true,
        hits: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(blogPosts, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.log("[BLOG_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession({ req: NextRequest, ...authOptions })

    const body = await req.json()

    const {
      title,
      seoUrl,
      shortContent,
      content,
      images,
      metaTitle,
      metaDescription,
    } = body

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    if (!seoUrl) {
      return new NextResponse("Seo Url is required", { status: 400 })
    }

    if (!shortContent) {
      return new NextResponse("Short Content is required", { status: 400 })
    }

    if (!content) {
      return new NextResponse("Content Url is required", { status: 400 })
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 })
    }

    const blogPost = await prismadb.blog.create({
      data: {
        title,
        seoUrl,
        shortContent,
        content,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        metaTitle,
        metaDescription,
      },
    })

    return new NextResponse(JSON.stringify(blogPost), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[BLOG_POST]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

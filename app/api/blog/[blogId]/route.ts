import { NextRequest, NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const blogPost = await prismadb.blog.findUnique({
      where: {
        blogId: params.blogId,
      },
      include: {
        images: true,
      },
    })

    return new NextResponse(JSON.stringify(blogPost), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[BLOG_GET]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const session = await getServerSession({ req: NextRequest, ...authOptions })

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const blog = await prismadb.blog.delete({
      where: {
        blogId: params.blogId,
      },
    })

    return NextResponse.json(blog)
  } catch (err) {
    console.log("[BLOG_DELETE]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string } }
) {
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
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    if (!seoUrl) {
      return new NextResponse("Seo Url is required", { status: 400 })
    }

    if (!content) {
      return new NextResponse("Content Url is required", { status: 400 })
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 })
    }

    await prismadb.blog.update({
      where: {
        blogId: params.blogId,
      },
      data: {
        title,
        seoUrl,
        shortContent,
        content,
        metaTitle,
        metaDescription,
        images: {
          deleteMany: {},
        },
      },
    })

    const blogPost = await prismadb.blog.update({
      where: {
        blogId: params.blogId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })

    return new NextResponse(JSON.stringify(blogPost), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[BLOG_PATCH]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const blogPost = await prismadb.blog.findUnique({
      where: {
        seoUrl: params.slug,
      },
      include: {
        images: true,
        hits: true,
      },
    })

    if (!blogPost) {
      return new NextResponse("Not found", { status: 404 })
    }

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

export async function addBlogHit(slug: string) {
  try {
    await prismadb.blogHit.create({
      data: {
        seoUrl: slug,
        hitCount: 1,
      },
    })
  } catch (err) {
    console.log("[BLOGHIT_ADD]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

export async function updateBlogHit(slug: string, blogHitId: string) {
  try {
    await prismadb.blogHit.update({
      where: {
        blogHitId,
      },
      data: {
        seoUrl: slug,
        hitCount: {
          increment: 1,
        },
      },
    })
  } catch (err) {
    console.log("[BLOGHIT_UPDATE]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

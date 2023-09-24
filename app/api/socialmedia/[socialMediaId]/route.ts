import { NextRequest, NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { socialMediaId: string } }
) {
  try {
    const socialmedia = await prismadb.socialMedia.findUnique({
      where: {
        socialMediaId: params.socialMediaId,
      },
    })

    return NextResponse.json(socialmedia)
  } catch (err) {
    console.log("[SocialMedia_GET]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { socialMediaId: string } }
) {
  try {
    const session = await getServerSession({ req: NextRequest, ...authOptions })

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const body = await req.json()

    const { name, url } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!url) {
      return new NextResponse("Url is required", { status: 400 })
    }

    await prismadb.socialMedia.update({
      where: {
        socialMediaId: params.socialMediaId,
      },
      data: {
        ...body,
      },
    })

    const socialmediaPost = await prismadb.socialMedia.findUnique({
      where: {
        socialMediaId: params.socialMediaId,
      },
    })

    return new NextResponse(JSON.stringify(socialmediaPost), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[SOCIALMEDIA_PATCH]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { socialMediaId: string } }
) {
  try {
    const session = await getServerSession({ req: NextRequest, ...authOptions })

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    await prismadb.socialMedia.delete({
      where: {
        socialMediaId: params.socialMediaId,
      },
    })

    return new NextResponse(null, {
      status: 204,
    })
  } catch (err) {
    console.log("[SOCIALMEDIA_DELETE]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}

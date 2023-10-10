import { NextRequest, NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { newsletterId: string } }
) {
  try {
    const newsletter = await prismadb.newsletter.findUnique({
      where: {
        newsletterId: params.newsletterId,
      },
    })

    return new NextResponse(JSON.stringify(newsletter), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[NEWSLETTER_GET]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { newsletterId: string } }
) {
  try {
    const session = await getServerSession({ req: NextRequest, ...authOptions })

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const newsletter = await prismadb.newsletter.delete({
      where: {
        newsletterId: params.newsletterId,
      },
    })

    return NextResponse.json(JSON.stringify(newsletter), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[NEWSLETTER_DELETE]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

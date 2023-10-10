import { NextRequest, NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[USER_GET]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession({ req: NextRequest, ...authOptions })

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { name, username, email, hashedPassword, details } = body

    if (!username) {
      return new NextResponse("User name is required", { status: 400 })
    }

    if (!hashedPassword) {
      return new NextResponse("Password is required", { status: 400 })
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 })
    }

    await prismadb.user.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        username,
        email,
        hashedPassword,
      },
    })

    const user = await prismadb.user.findUnique({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json(JSON.stringify(user), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[USER_PATCH]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession({ req: NextRequest, ...authOptions })

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prismadb.user.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json(JSON.stringify(user), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[USER_DELETE]", err)
    return new NextResponse("Interal eror", { status: 500 })
  }
}

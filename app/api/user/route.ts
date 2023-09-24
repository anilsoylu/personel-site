import { NextRequest, NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const users = await prismadb.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(users)
  } catch (err) {
    console.log("[USER_GET]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
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

    const user = await prismadb.user.create({
      data: {
        name,
        username,
        email,
        hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (err) {
    console.log("[USER_POST]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}

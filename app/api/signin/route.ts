import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { username, hashedPassword } = body

    if (!username) {
      return new NextResponse("User name is required", { status: 400 })
    }

    if (!hashedPassword) {
      return new NextResponse("Password is required", { status: 400 })
    }

    const user = await prismadb.user.findUnique({
      where: {
        username,
        hashedPassword,
        isActivated: true,
      },
    })

    return NextResponse.json(user)
  } catch (err) {
    console.log("[USER_POST]", err)
    return new NextResponse("Internal error", { status: 500 })
  }
}

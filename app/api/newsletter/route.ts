import { NextRequest, NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email")

    if (email) {
      const newslatter = await prismadb.newsletter.findFirst({
        where: {
          email,
        },
      })

      if (newslatter) {
        return new NextResponse(JSON.stringify(newslatter), {
          status: 409,
          statusText: "Already subscribed",
          headers: {
            "Content-Type": "application/json",
          },
        })
      }
    } else {
      const newslatter = await prismadb.newsletter.findMany()

      return new NextResponse(JSON.stringify(newslatter), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
  } catch (err) {
    console.log("[NEWSLATTER_GET]", err)
    return new NextResponse("[NEWSLATTER_GET] Interal eror", { status: 500 })
  }
  return new NextResponse("Invalid request", { status: 400 })
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    const newslatter = await prismadb.newsletter.create({
      data: {
        email,
      },
    })

    return new NextResponse(JSON.stringify(newslatter), {
      status: 201,
      statusText: "Subscription successful",
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log("[NEWSLATTER_POST]", err)
    return new NextResponse("[NEWSLATTER_POST] Interal eror", { status: 500 })
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const email = req.nextUrl.searchParams.get("email")

    if (email) {
      const deletedRecords = await prismadb.newsletter.deleteMany({
        where: {
          email: email,
        },
      })

      const deletedCount = deletedRecords.count

      if (deletedCount > 0) {
        return new NextResponse(
          JSON.stringify({
            message: "Email unsubscribed and deleted successfully",
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      } else {
        return new NextResponse(
          JSON.stringify({ message: "Email not found in newsletter list" }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      }
    } else {
      return new NextResponse("[NEWSLATTER_DELETE] Email not provided", {
        status: 400,
      })
    }
  } catch (err) {
    console.log("[NEWSLATTER_DELETE]", err)
    return new NextResponse("[NEWSLATTER_DELETE] Internal error", {
      status: 500,
    })
  }
}

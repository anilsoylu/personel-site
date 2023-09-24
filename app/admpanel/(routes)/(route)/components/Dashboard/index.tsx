"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"
import { getTotals } from "@/actions/getTotalContent"

const apiURL = process.env.NEXT_PUBLIC_API_URL

export const DashboardComponent = () => {
  const { data: session, status } = useSession()
  const userName = (session as Session | null)?.user?.username
  const [totals, setTotals] = useState<{
    blogCount?: number
    newsletterCount?: number
    bookmarkCount?: number
  }>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTotals()
        setTotals(data)
      } catch (error) {
        console.error("Totals couldn't be fetched", error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <h2 className="text-xl mb-5">
        Welcome back, {status === "authenticated" && userName}!
      </h2>
      <p>Here is the overview of your account:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        <div className="p-5 border rounded-md">
          <h3 className="text-lg mb-2">Total Blogs</h3>
          {totals.blogCount || 0}
        </div>
        <div className="p-5 border rounded-md">
          <h3 className="text-lg mb-2">Total Bookmarks</h3>
          {totals.bookmarkCount || 0}
        </div>
        <div className="p-5 border rounded-md">
          <h3 className="text-lg mb-2">Total Newsletters</h3>
          {totals.newsletterCount || 0}
        </div>
      </div>
    </>
  )
}

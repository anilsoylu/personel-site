import { Metadata } from "next"
import { BookmarkClient } from "./components/client"
import { format } from "date-fns"
import prismadb from "@/lib/prismadb"
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Bookmark | Admin Dashboard v1.0",
}

const DashBoardBookmarkPage = async () => {
  const bookmarks = await prismadb.bookmark.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedBookmarks = bookmarks.map((bookmark) => ({
    ...bookmark,
    createdAt: format(new Date(bookmark.createdAt), "dd/MM/yyyy"),
    updatedAt: format(new Date(bookmark.updatedAt), "dd/MM/yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BookmarkClient data={formattedBookmarks} />
      </div>
    </div>
  )
}

export default DashBoardBookmarkPage

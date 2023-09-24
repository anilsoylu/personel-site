import prismadb from "@/lib/prismadb"
import { Bookmark, TransformedBookmark } from "@/types/Bookmark"

const dateToISOString = (date: Date): string => {
  return date.toISOString()
}

export const getBookmarks = async (): Promise<TransformedBookmark[]> => {
  try {
    const bookmarks = await prismadb.bookmark.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    const transformedBookmarks = bookmarks.map((bookmark: Bookmark) => ({
      ...bookmark,
      createdAt: dateToISOString(bookmark.createdAt),
      updatedAt: dateToISOString(bookmark.updatedAt),
    }))

    return transformedBookmarks
  } catch (err) {
    console.log("[BOOKMARKS_GET]", err)
    return []
  }
}

export const getHomeBookmarks = async (): Promise<TransformedBookmark[]> => {
  try {
    const bookmarks = await prismadb.bookmark.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    })

    const transformedBookmarks = bookmarks.map((bookmark: Bookmark) => ({
      ...bookmark,
      createdAt: dateToISOString(bookmark.createdAt),
      updatedAt: dateToISOString(bookmark.updatedAt),
    }))

    return transformedBookmarks
  } catch (err) {
    console.log("[BOOKMARKS_GET]", err)
    return []
  }
}

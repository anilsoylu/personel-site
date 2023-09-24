import { TransformedBookmark } from "@/types/Bookmark"
import Link from "next/link"
import React from "react"

interface Props {
  posts: TransformedBookmark[]
}

const BookmarkItem = ({ posts }: Props) => {
  const groupedBookmarks = groupBookmarksByDate(posts)
  const groupedBookmarkArray = Object.entries(groupedBookmarks).map(
    ([date, bookmarks]) => ({
      date,
      bookmarks,
    })
  )

  return (
    <div className="grid gap-y-4">
      {groupedBookmarkArray.map((group, index) => (
        <section key={index}>
          <h6 className="text-sm lg:text-lg text-gray-500 mb-2">
            {new Date(group.date).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h6>
          <ul>
            {group.bookmarks.map((bookmark) => (
              <li key={bookmark.bookmarkId}>
                <div className="grid gap-y-2 -mx-4">
                  <Link
                    href={bookmark.bookUrl}
                    title={bookmark.title}
                    className="text-[13px] lg:text-lg grid py-1.5 px-4 transition-colors group hover:text-light/95 hover:bg-blue-600/10 rounded-md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-base font-semibold mb-1">
                      {bookmark.title}
                    </div>
                    {bookmark.content && (
                      <p className="text-base mt-1 lg:mt-0 lg:text-base text-gray-500">
                        {bookmark.content}
                      </p>
                    )}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default BookmarkItem

function groupBookmarksByDate(bookmarks: TransformedBookmark[]) {
  const groupedBookmarks: { [key: string]: TransformedBookmark[] } = {}

  bookmarks.forEach((bookmark) => {
    const createdAt = new Date(bookmark.createdAt).toLocaleDateString()

    if (!groupedBookmarks[createdAt]) {
      groupedBookmarks[createdAt] = []
    }

    groupedBookmarks[createdAt].push(bookmark)
  })

  return groupedBookmarks
}

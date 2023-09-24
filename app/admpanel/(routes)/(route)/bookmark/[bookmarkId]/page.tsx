import prismadb from "@/lib/prismadb"

import { BookmarkForm } from "./components/bookmark-form"

const BookmarkPage = async ({ params }: { params: { bookmarkId: string } }) => {
  const bookmarks = await prismadb.bookmark.findUnique({
    where: {
      bookmarkId: params.bookmarkId,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BookmarkForm initialData={bookmarks} />
      </div>
    </div>
  )
}

export default BookmarkPage

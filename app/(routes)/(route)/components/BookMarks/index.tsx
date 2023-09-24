import { TransformedBookmark } from "@/types/Bookmark"
import BookmarkItem from "./BookmarkItem"
import { getBookmarks } from "../../actions/get-bookmarks"

const BookmarkList = async () => {
  const bookmarks: TransformedBookmark[] | undefined = await getBookmarks()

  if (!bookmarks) {
    return <div className={`py-5`}>Yükleniyor...</div>
  }

  return (
    <>
      {bookmarks.length > 0 ? (
        <>
          <BookmarkItem posts={bookmarks} />
        </>
      ) : (
        <p className="border border-white/20 flex items-center gap-x-4 transition-colors hover:border-white/40 p-6 rounded-md group">
          Henüz bir makale yayınlamadım, ama emin ol ki senin için güzel şeyler
          hazırlıyorumdur !
        </p>
      )}
    </>
  )
}

export default BookmarkList

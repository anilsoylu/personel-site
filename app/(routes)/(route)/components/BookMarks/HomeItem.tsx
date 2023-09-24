import { TransformedBookmark } from "@/types/Bookmark"
import Link from "next/link"
import { getHomeBookmarks } from "../../actions/get-bookmarks"

export async function BookMarksHomeItem() {
  const bookmarks: TransformedBookmark[] = await getHomeBookmarks()

  if (!bookmarks) {
    return <div className={`py-5`}>Yükleniyor...</div>
  }

  return (
    <div className="py-5">
      <div className="grid gap-3 lg:gap-2 mb-5 lg:mb-10">
        {bookmarks.map((item) => (
          <section key={item.bookmarkId}>
            <div className="grid gap-y-2 -mx-4">
              <Link
                href={item.bookUrl}
                title={item.title}
                className="text-[13px] lg:text-lg grid py-1.5 px-4 transition-colors group hover:text-light/95 hover:bg-blue-600/10 rounded-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-base font-semibold mb-1">{item.title}</div>
                {item.content && (
                  <p className="text-base mt-1 lg:mt-0 lg:text-base text-gray-500">
                    {item.content}
                  </p>
                )}
              </Link>
            </div>
          </section>
        ))}
        <Link
          className="text-[13px] lg:text-lg grid py-1.5 underline transition-colors group hover:text-light/95 rounded-md"
          href="/bookmark"
          title="Tüm Linkler"
        >
          Tüm Linkler
        </Link>
      </div>
    </div>
  )
}

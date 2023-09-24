export type Bookmark = {
  bookmarkId: string
  title: string
  content: string | null
  bookUrl: string
  createdAt: Date
  updatedAt: Date
}

export type TransformedBookmark = {
  bookmarkId: string
  title: string
  content: string | null
  bookUrl: string
  createdAt: string
  updatedAt: string
}

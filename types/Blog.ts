export type Blog = {
  blogId: string
  title: string
  seoUrl: string
  shortContent?: string | null
  content: string
  metaTitle?: string | null
  metaDescription?: string | null
  createdAt: Date
  updatedAt: Date
  images?: BlogImage[] | null
  hits?: BlogHits[] | null
}

export type BlogImage = {
  imageId: string
  blogId: string
  url: string
  createdAt: Date
  updatedAt: Date
}

export type BlogHits = {
  blogHitId: string
  seoUrl: string
  hitCount: number | null
  createdAt: Date
  updatedAt: Date
}

export type TransformedBlog = Omit<
  Blog,
  "createdAt" | "updatedAt" | "images" | "hits"
> & {
  createdAt: string
  updatedAt: string
  images?: {
    imageId: string
    blogId: string
    url: string
    createdAt: string
    updatedAt: string
  }[]
  hits?: {
    blogHitId: string
    seoUrl: string
    hitCount: number | null
    createdAt: string
    updatedAt: string
  }[]
}

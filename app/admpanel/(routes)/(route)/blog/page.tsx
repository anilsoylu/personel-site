import { format } from "date-fns"
import { Metadata } from "next"
import { BlogClient } from "./components/client"
import prismadb from "@/lib/prismadb"
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog | Admin Dashboard v1.0",
}

const DashBoardBlogPage = async () => {
  const blogs = await prismadb.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
      hits: true,
    },
  })

  const formattedBlogs = blogs.map((blog) => ({
    ...blog,
    shortContent: blog.shortContent || undefined,
    images: blog.images.map((image) => ({
      imageId: image.imageId.toString(),
      blogId: blog.blogId,
      url: image.url,
      createdAt: image.createdAt.toISOString(),
      updatedAt: image.updatedAt.toISOString(),
    })),
    hits: blog.hits.map((hit) => ({
      blogHitId: hit.blogHitId.toString(),
      seoUrl: hit.seoUrl,
      hitCount: hit.hitCount || null,
      createdAt: hit.createdAt.toISOString(),
      updatedAt: hit.updatedAt.toISOString(),
    })),
    createdAt: format(new Date(blog.createdAt), "dd/MM/yyyy"),
    updatedAt: format(new Date(blog.updatedAt), "dd/MM/yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogClient data={formattedBlogs} />
      </div>
    </div>
  )
}

export default DashBoardBlogPage

import { addBlogHit, updateBlogHit } from "@/app/api/bloghit/[slug]/route"
import prismadb from "@/lib/prismadb"
import { Blog, BlogHits, TransformedBlog } from "@/types/Blog"

export const getBlogs = async (): Promise<TransformedBlog[]> => {
  try {
    const blogs = await prismadb.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: true,
        hits: true,
      },
    })

    const transformedBlogs: TransformedBlog[] = blogs.map((blog: Blog) => {
      const images = blog.images
        ? blog.images.map((image) => ({
            imageId: image.imageId,
            blogId: blog.blogId,
            url: image.url,
            createdAt: new Date(image.createdAt).toISOString(),
            updatedAt: new Date(image.updatedAt).toISOString(),
          }))
        : []

      const hits = blog.hits
        ? blog.hits.map((hit) => ({
            blogHitId: hit.blogHitId,
            seoUrl: hit.seoUrl,
            hitCount: hit.hitCount || null,
            createdAt: new Date(hit.createdAt).toISOString(),
            updatedAt: new Date(hit.updatedAt).toISOString(),
          }))
        : []

      return {
        ...blog,
        images,
        hits,
        createdAt: new Date(blog.createdAt).toISOString(),
        updatedAt: new Date(blog.updatedAt).toISOString(),
      }
    })

    return transformedBlogs
  } catch (err) {
    console.log("[BLOG_GET]", err)
    return []
  }
}

export const getHomeBlogs = async (): Promise<TransformedBlog[]> => {
  try {
    const blogs = await prismadb.blog.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: true,
        hits: true,
      },
    })

    const transformedBlogs: TransformedBlog[] = blogs.map((blog: Blog) => {
      const images = blog.images
        ? blog.images.map((image) => ({
            imageId: image.imageId,
            blogId: blog.blogId,
            url: image.url,
            createdAt: new Date(image.createdAt).toISOString(),
            updatedAt: new Date(image.updatedAt).toISOString(),
          }))
        : []

      const hits = blog.hits
        ? blog.hits.map((hit) => ({
            blogHitId: hit.blogHitId,
            seoUrl: hit.seoUrl,
            hitCount: hit.hitCount || null,
            createdAt: new Date(hit.createdAt).toISOString(),
            updatedAt: new Date(hit.updatedAt).toISOString(),
          }))
        : []

      return {
        ...blog,
        images,
        hits,
        createdAt: new Date(blog.createdAt).toISOString(),
        updatedAt: new Date(blog.updatedAt).toISOString(),
      }
    })

    return transformedBlogs
  } catch (err) {
    console.log("[BLOG_GET]", err)
    return []
  }
}

export const getBlogBySlug = async (slug: string) => {
  try {
    const blogPost = await prismadb.blog.findUnique({
      where: {
        seoUrl: slug,
      },
      include: {
        images: true,
        hits: true,
      },
    })

    return blogPost
  } catch (err) {
    console.log("[BLOG_GET]", err)
  }
}

export const getBlogHitBySlug = async (slug: string) => {
  try {
    const blogPost = await prismadb.blogHit.findFirst({
      where: {
        seoUrl: slug,
      },
    })

    return blogPost
  } catch (err) {
    console.log("[BLOGHIT_GET]", err)
  }
}

export const fetchBlogAndIncrementHit = async (slug: string) => {
  try {
    const blogPost = await getBlogBySlug(slug)

    if (blogPost) {
      const hitCount = await prismadb.blogHit.count({
        where: {
          seoUrl: slug,
        },
      })

      if (hitCount === 0) {
        await addBlogHit(slug)
      } else {
        await updateBlogHit(
          slug,
          blogPost.hits.map((hit: BlogHits) => hit.blogHitId)[0]
        )
      }
    } else {
      console.log("blog not found")
    }
  } catch (err) {
    console.log("[BLOGHIT_POST]", err)
  }
}

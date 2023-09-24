import { TransformedBlog } from "@/types/Blog"
import { getBlogs } from "../../actions/get-blogs"
import BlogItem from "./Item"

const Blog = async () => {
  const blogs: TransformedBlog[] = await getBlogs()
  if (!blogs) {
    return <div className={`py-5`}>Yükleniyor...</div>
  }

  return (
    <section className="my-5">
      <div
        className={`grid lg:grid-cols-${
          blogs.length > 0 ? 2 : 1
        } gap-3 lg:gap-5`}
      >
        {blogs.length > 0 ? (
          <>
            <BlogItem posts={blogs} />
          </>
        ) : (
          <p className="border border-white/20 flex items-center gap-x-4 transition-colors hover:border-white/40 p-6 rounded-md group">
            Henüz bir makale yayınlamadım, ama emin ol ki senin için güzel
            şeyler hazırlıyorumdur !
          </p>
        )}
      </div>
    </section>
  )
}

export default Blog

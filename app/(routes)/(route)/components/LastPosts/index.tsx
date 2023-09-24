import { getHomeBlogs } from "../../actions/get-blogs"
import { TransformedBlog } from "@/types/Blog"
import PostItem from "./item"

export async function LastPosts() {
  const blogs: TransformedBlog[] = await getHomeBlogs()

  if (!blogs) {
    return <div className={`py-5`}>Yükleniyor...</div>
  }

  return (
    <section className="my-5">
      <h2 className="text-lg lg:text-3xl font-bold mb-6">Son Yazdıklarım</h2>
      <div
        className={`grid lg:grid-cols-${
          blogs.length > 0 ? 2 : 1
        } gap-3 lg:gap-5`}
      >
        {blogs.length > 0 ? (
          <>
            <PostItem posts={blogs} />
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

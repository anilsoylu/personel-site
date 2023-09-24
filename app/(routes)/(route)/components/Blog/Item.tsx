import { TransformedBlog } from "@/types/Blog"
import Image from "next/image"
import { BsEyeFill, BsCalendar3 } from "react-icons/bs"

interface Props {
  posts: TransformedBlog[]
}

const BlogItem = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <div
          key={post.blogId}
          className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
        >
          <a href={`/blog/${post.seoUrl}`} className="block group">
            <div className="p-4 flex gap-2 flex-col">
              <div className="flex justify-between">
                <h2 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-500 transition duration-200">
                  {post.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <BsCalendar3 />
                    {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    {/* <BsEyeFill /> {post.hits.map((hit) => hit.hitCount)} views */}
                    <BsEyeFill /> {post.hits?.slice(-1)[0]?.hitCount || 0} views
                  </span>
                </div>
              </div>
              <div className="text-gray-700 dark:text-gray-300 flex gap-5">
                <Image
                  src={post?.images?.[0]?.url || ""}
                  alt={post?.title || ""}
                  objectFit="contain"
                  width={96}
                  height={96}
                  className="rounded-lg w-auto h-auto"
                  priority={true}
                  quality={100}
                />
                {post.shortContent}
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  )
}

export default BlogItem

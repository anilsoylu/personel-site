import { TransformedBlog } from "@/types/Blog"

interface Props {
  posts: TransformedBlog[]
}

const PostItem = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <div
          key={post.blogId}
          className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
        >
          <a href={`/blog/${post.seoUrl}`} className="block group">
            <div className="p-4">
              <div className="flex justify-between">
                <h2 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-500 transition duration-200">
                  {post.title}
                </h2>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {post.shortContent}
              </p>
            </div>
          </a>
        </div>
      ))}
    </>
  )
}

export default PostItem

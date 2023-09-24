import type { Metadata, ResolvingMetadata } from "next"

import Image from "next/image"
import { BsEyeFill } from "react-icons/bs"
import {
  fetchBlogAndIncrementHit,
  getBlogBySlug,
} from "../../actions/get-blogs"

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = await params.slug

  const blogDetail = await getBlogBySlug(slug)

  const previousImages = (await parent).openGraph?.images || []
  const blogImageUrl = blogDetail?.images?.[0]?.url

  return {
    title: blogDetail?.metaTitle || blogDetail?.title,
    description: blogDetail?.metaDescription || blogDetail?.title,
    openGraph: {
      images: blogImageUrl ? [blogImageUrl, ...previousImages] : previousImages,
    },
  }
}

export default async function Page({ params, searchParams }: Props) {
  const blogDetail = await getBlogBySlug(params.slug)
  await fetchBlogAndIncrementHit(params.slug)

  const blogContent = blogDetail?.content

  return (
    <>
      <div className="flex justify-between items-start md:items-center gap-4 mb-4 flex-col md:flex-row">
        <h2 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-500 transition duration-200">
          {blogDetail?.title}
        </h2>
        <div className="flex items-center gap-4 w-full md:w-auto justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            {blogDetail?.createdAt
              ? new Date(blogDetail.createdAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : null}
          </span>
          <span className="flex items-center gap-2">
            <BsEyeFill /> {blogDetail?.hits?.slice(-1)[0]?.hitCount || 0} views
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 gap-5">
          {blogDetail?.images?.[0]?.url && (
            <div className="flex-shrink-0 mb-4 mr-4 min-w-[25%] relative max-w-fit float-left">
              <Image
                src={blogDetail?.images?.[0]?.url || ""}
                alt={blogDetail?.title || ""}
                objectFit="contain"
                width={3840}
                height={2160}
                className="rounded-lg w-auto h-auto"
                priority={true}
                quality={100}
              />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: blogContent || "" }} />
        </div>
      </div>
    </>
  )
}

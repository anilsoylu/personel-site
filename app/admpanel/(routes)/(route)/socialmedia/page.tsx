import { Metadata } from "next"
import { SocialMediaClient } from "./components/client"
import { SocialMedia } from "@/types/SocialMedia"
import { format } from "date-fns"
import prismadb from "@/lib/prismadb"
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Bookmark | Admin Dashboard v1.0",
}

const SocialMediaPage = async () => {
  const socialmedias = await prismadb.socialMedia.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedSocialMedias = socialmedias.map((item: SocialMedia) => ({
    socialMediaId: item.socialMediaId,
    name: item.name,
    url: item.url,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    updatedAt: format(new Date(item.updatedAt), "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SocialMediaClient data={formattedSocialMedias} />
      </div>
    </div>
  )
}

export default SocialMediaPage

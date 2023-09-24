import prismadb from "@/lib/prismadb"
import { SocialMediaForm } from "./components/social-form"

const SocialMediaPage = async ({
  params,
}: {
  params: { socialMediaId: string }
}) => {
  const socialMedia = await prismadb.socialMedia.findUnique({
    where: {
      socialMediaId: params.socialMediaId,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SocialMediaForm initialData={socialMedia} />
      </div>
    </div>
  )
}

export default SocialMediaPage

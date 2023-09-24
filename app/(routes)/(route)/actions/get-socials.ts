import prismadb from "@/lib/prismadb"
import { SocialMedia, TransformedSocialMedia } from "@/types/SocialMedia"

const dateToISOString = (date: Date): string => {
  return date.toISOString()
}

export const getSocialMedia = async (): Promise<TransformedSocialMedia[]> => {
  try {
    const socialMedia = await prismadb.socialMedia.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    const transformedSocialMedia = socialMedia.map(
      (socialMedia: SocialMedia) => ({
        ...socialMedia,
        createdAt: dateToISOString(socialMedia.createdAt),
        updatedAt: dateToISOString(socialMedia.updatedAt),
      })
    )

    return transformedSocialMedia
  } catch (err) {
    console.log("[SOCIALMEDIA_GET]", err)
    throw err
  }
}

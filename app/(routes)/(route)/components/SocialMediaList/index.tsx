import { TransformedSocialMedia } from "@/types/SocialMedia"
import SocialMediaItem from "./SocialMediaItem"
import { getSocialMedia } from "../../actions/get-socials"

export const dynamic = "force-dynamic"

export const SocialMediaList = async () => {
  const socialMedia: TransformedSocialMedia[] = await getSocialMedia()

  return (
    <nav className="flex items-center gap-x-4 mt-5">
      {socialMedia.map((media) => (
        <SocialMediaItem key={media.socialMediaId} {...media} />
      ))}
    </nav>
  )
}

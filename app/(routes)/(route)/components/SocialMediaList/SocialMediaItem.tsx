import styles from "./SocialMediaItem.module.css"
import { getSocialIcon } from "@/lib/socials"
import { socialMediaNameClear } from "@/lib/helpers"
import Link from "next/link"
import { TransformedSocialMedia } from "@/types/SocialMedia"

type SocialMediaItemProps = TransformedSocialMedia

const SocialMediaItem: React.FC<SocialMediaItemProps> = ({ name, url }) => {
  const { icon: Icon } = getSocialIcon(socialMediaNameClear(name))

  const dynamicClass = styles[socialMediaNameClear(name)]

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex justify-center items-center rounded-md w-8 h-8 p-1 transition-all duration-300 ease-in-out text-white ${dynamicClass}`}
    >
      <Icon fontSize={15} className={`mx-auto`} />
    </Link>
  )
}

export default SocialMediaItem

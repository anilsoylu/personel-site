import { IconType } from "react-icons"
import {
  BsFacebook,
  BsInstagram,
  BsGoogle,
  BsGithub,
  BsYoutube,
  BsLinkedin,
  BsWhatsapp,
  BsTelegram,
  BsTwitter,
} from "react-icons/bs"

interface SocialIconInfo {
  icon: IconType
}

export const getSocialIcon = (socialName: string): SocialIconInfo => {
  switch (socialName) {
    case "facebook":
      return { icon: BsFacebook }
    case "twitter":
      return { icon: BsTwitter }
    case "i̇nstagram":
      return { icon: BsInstagram }
    case "İnstagram":
      return { icon: BsInstagram }
    case "google-plus":
      return { icon: BsGoogle }
    case "youtube":
      return { icon: BsYoutube }
    case "linkedin":
      return { icon: BsLinkedin }
    case "whatsapp":
      return { icon: BsWhatsapp }
    case "telegram":
      return { icon: BsTelegram }
    case "github":
      return { icon: BsGithub }
    default:
      return { icon: BsFacebook }
  }
}

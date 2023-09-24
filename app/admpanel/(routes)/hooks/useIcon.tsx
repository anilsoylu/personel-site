import {
  BiHomeAlt,
  BiImage,
  BiMenu,
  BiCube,
  BiCog,
  BiUser,
  BiBookAdd,
  BiBookmark,
  BiMailSend,
} from "react-icons/bi"
import { IoShareSocialSharp } from "react-icons/io5"

export const useIcon = (icon: string) => {
  switch (icon) {
    case "BiHomeAlt":
      return <BiHomeAlt size={20} />
    case "BiImage":
      return <BiImage size={20} />
    case "BiMenu":
      return <BiMenu size={22} />
    case "BiCube":
      return <BiCube size={20} />
    case "BiCog":
      return <BiCog size={20} />
    case "BiBookAdd":
      return <BiBookAdd size={20} />
    case "BiBookmark":
      return <BiBookmark size={20} />
    case "BiMailSend":
      return <BiMailSend size={20} />
    case "BiUserCircle":
      return <BiUser size={20} className="!rotate-0" />
    case "IoShareSocialSharp":
      return <IoShareSocialSharp size={20} />
    default:
      return "<BiHomeAlt />"
  }
}

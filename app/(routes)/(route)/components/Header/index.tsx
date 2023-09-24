import Image from "next/image"
import Link from "next/link"
import { SiteMenus } from "../menu"
import SiteMobilMenu from "../mobilmenu"
import { ModeToggle } from "../ModeToggle"

type Props = {}

const Header = (props: Props) => {
  return (
    <header className="pt-3 lg:pt-6 pb-6 lg:pb-8 flex items-center justify-between container mx-auto">
      <Link href="/" className="flex gap-x-4 items-center">
        <div className="w-16 h-16 lg:h-24 lg:w-24 relative">
          <Image
            src="/image/pp.jpg"
            width={96}
            height={96}
            className="bg-white/10 rounded-full border border-white/20"
            alt="Anilsoylu.dev"
            priority={true}
            quality={100}
          />
        </div>
        <div className="hidden md:block">
          <h1 className="text-lg lg:text-2xl font-bold">Anıl SOYLU</h1>
          <h6 className="text-sm lg:text-base text-light/40">Developer</h6>
        </div>
      </Link>

      <div className="flex justify-between items-center gap-3">
        <SiteMenus className="hidden md:flex" />
        <SiteMobilMenu />
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header

import Link from "next/link"
import Newsletter from "./Newsletter"
import UnSubscribe from "./UnSubscribe"

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="bg-yellow/20 py-5 border-t border-yellow/30 mt-4 md:px-0 bottom-0">
      <div className="container mx-auto">
        <div className="flex justify-between gap-3 items-center flex-col md:flex-row">
          <p className="text-sm lg:text-base text-yellow/75">
            Copyright ©{" "}
            <Link href={`/`} title="anilsoylu.dev">
              anilsoylu.dev
            </Link>{" "}
            2023 Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4 flex-col md:flex-row w-full md:w-auto">
            <Newsletter />
            <UnSubscribe />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

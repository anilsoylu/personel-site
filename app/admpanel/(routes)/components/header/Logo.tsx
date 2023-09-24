import Link from "next/link"
import { RxDashboard } from "react-icons/rx"

type Props = {}

const Logo = (props: Props) => {
  return (
    <Link href="/admpanel" className="flex items-center space-x-4">
      <RxDashboard size={"1.5rem"} />
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 hidden md:block">
        Admin Dashboard
      </h1>
    </Link>
  )
}

export default Logo

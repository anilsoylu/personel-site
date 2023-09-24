import Logo from "./header/Logo"
import SupportMenu from "./header/SupportMenu"

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
      <Logo />
      <SupportMenu />
    </header>
  )
}

export default Header

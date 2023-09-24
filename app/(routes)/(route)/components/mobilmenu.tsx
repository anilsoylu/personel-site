import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { HiMenuAlt2 } from "react-icons/hi"
import Link from "next/link"
import { Link as LinkIcon } from "lucide-react"
import { routes } from "../routes"

const SiteMobilMenu = () => {
  return (
    <div className="md:hidden flex h-16 items-center px-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <HiMenuAlt2 size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="text-left">
            <SheetTitle>Anıl SOYLU</SheetTitle>
            <SheetDescription>Developer</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <ul className="flex flex-col gap-3">
              {routes.map((route: any, i) => (
                <li key={i}>
                  <Link
                    href={route.href}
                    title={route.label}
                    className="flex gap-4 items-center text-sm font-medium transition-colors hover:text-primary"
                  >
                    <LinkIcon size={20} />
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default SiteMobilMenu

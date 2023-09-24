"use client"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { BiMenu, BiSupport } from "react-icons/bi"
import { BsEye } from "react-icons/bs"
import { User } from "./User"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SheetMenu from "./SheetMenu"
type Props = {}

const SupportMenu = (props: Props) => {
  const { data } = useSession()
  const userName = data?.user?.username ?? "User"

  return (
    <div className="flex items-center space-x-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="flex items-center gap-2 md:hidden"
          >
            <BiMenu size={24} className="text-zinc-500 dark:text-zinc-400" />
            <span className="sr-only">Site Menus</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-background">
          <SheetMenu />
        </SheetContent>
      </Sheet>
      <Button size="icon" variant="ghost" asChild>
        <Link href="/" target="_blank" className="flex items-center gap-2">
          <BsEye className=" h-5 w-5 text-zinc-500 dark:text-zinc-400" />
          <span className="sr-only">Site Preview</span>
        </Link>
      </Button>
      <Button size="icon" variant="ghost" asChild>
        <Link
          href="mailto:destek@anilsoylu.com"
          className="flex items-center gap-2"
        >
          <BiSupport className=" h-5 w-5 text-zinc-500 dark:text-zinc-400" />
          <span className="sr-only">Support</span>
        </Link>
      </Button>
      <User userName={userName} />
    </div>
  )
}

export default SupportMenu

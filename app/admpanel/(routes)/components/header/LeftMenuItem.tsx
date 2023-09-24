import Link from "next/link"
import { useIcon } from "../../hooks/useIcon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

type Props = {
  title: string
  icon?: React.ReactNode
  url: string
  children?: React.ReactNode
}

const LeftMenuItem = ({ title, icon, url, children }: Props) => {
  return (
    <>
      {!children && (
        <li className="flex flex-col gap-3 w-full hover:bg-slate-400 items-center">
          <Link
            href={url}
            title={title}
            className="flex gap-3 px-4 pt-2 w-full items-center text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            {/* eslint-disable react-hooks/rules-of-hooks */}
            {icon && useIcon(icon.toString())}
            {title}
          </Link>
          <Separator className="w-full" />
        </li>
      )}
      {children && (
        <li className={`flex flex-col gap-3 w-full items-center`}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-none pt-2">
              <AccordionTrigger className="justify-start gap-3 items-center px-4 py-0 pb-3 w-full hover:!no-underline">
                {icon && useIcon(icon.toString())}
                {title}
              </AccordionTrigger>
              <Separator className="w-full" />
              <AccordionContent>
                <ul className="flex flex-col">{children}</ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </li>
      )}
    </>
  )
}

export default LeftMenuItem

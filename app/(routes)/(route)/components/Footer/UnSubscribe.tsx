import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NewsletterButton } from "./NewsletterButton"

const UnSubscribe = async () => {
  return (
    <Sheet>
      <SheetTrigger className="bg-red-400 text-slate-200 dark:text-slate-900  py-3 px-7 rounded-md">
        Unsubscribe
      </SheetTrigger>
      <SheetContent side={"top"}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="E-posta adresiniz"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <NewsletterButton actionType="unsubscribe" />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default UnSubscribe

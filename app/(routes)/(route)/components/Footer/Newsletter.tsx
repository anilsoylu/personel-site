import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NewsletterButton } from "./NewsletterButton"

const Newsletter = async () => {
  return (
    <Sheet>
      <SheetTrigger className="bg-primary text-slate-200 dark:text-slate-900  py-3 px-7 rounded-md">
        Subscribe
      </SheetTrigger>
      <SheetContent side={"top"}>
        <SheetHeader>
          <SheetTitle>Anında haberdar ol!</SheetTitle>
          <SheetDescription>
            Yazdıklarımı kaçırmak istemezseniz abone olmak için aşağıdan e-posta
            adresinizi girip devam edebilirsiniz.
          </SheetDescription>
        </SheetHeader>
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
            <NewsletterButton actionType="subscribe" />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Newsletter

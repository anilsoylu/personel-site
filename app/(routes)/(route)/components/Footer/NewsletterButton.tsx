"use client"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { deleteNewsletter, postNewsletter } from "@/actions/newsletter"

type NewsletterButtonProps = {
  actionType: "subscribe" | "unsubscribe"
}

export const NewsletterButton = ({ actionType }: NewsletterButtonProps) => {
  const isSubscribeAction = actionType === "subscribe"
  const buttonText = isSubscribeAction ? "Send" : "Unsubscribe"
  const buttonColor = isSubscribeAction ? "bg-green-500" : "bg-red-500"

  const handleAction = async () => {
    const emailInput = document.getElementById("email") as HTMLInputElement

    if (emailInput.value === "") {
      toast.error("Please enter your email")
      return
    }

    const response = isSubscribeAction
      ? await postNewsletter(emailInput.value)
      : await deleteNewsletter(emailInput.value)

    if (isSubscribeAction) {
      if (response.status === 201) {
        toast.success("Thanks for subscribing!")
        emailInput.value = ""
      } else if (response.status === 409) {
        toast.error("This email has already been registered!")
      } else {
        toast.error("Something went wrong, try again later")
      }
    } else {
      if (response.status === 200) {
        toast.success(
          "We've removed your email from the newsletter. We're sorry you left us :("
        )
        emailInput.value = ""
      } else if (response.status === 409) {
        toast.error("This Email is not available on our list.")
      } else {
        toast.error("Something went wrong, try again later")
      }
    }
  }

  return (
    <Button
      className={`${buttonColor} text-white hover:text-black`}
      onClick={handleAction}
    >
      {buttonText}
    </Button>
  )
}

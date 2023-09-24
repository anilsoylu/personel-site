"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { SocialMedia } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { useSession } from "next-auth/react"

const formSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
})

type SocialMediaFormValues = z.infer<typeof formSchema>

interface SocialMediaFormProps {
  initialData: SocialMedia | null
}

export const SocialMediaForm: React.FC<SocialMediaFormProps> = ({
  initialData,
}) => {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const isDemo = session?.user?.username === "demo"

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit social media" : "Create social media"
  const description = initialData
    ? "Edit a social media."
    : "Add a new social media"
  const toastMessage = initialData
    ? "Social Media updated."
    : "Social Media created."
  const action = initialData ? "Save changes" : "Create"

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        name: "",
        url: "",
      }

  const form = useForm<SocialMediaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: SocialMediaFormValues) => {
    try {
      setLoading(true)

      if (isDemo && status === "authenticated") {
        toast.error(
          "You are not authorized. This is a demo page. Please set up your own database."
        )
        setLoading(false)
      } else {
        const postData = {
          ...data,
        }

        if (initialData) {
          await axios.patch(
            `/api/socialmedia/${params.socialMediaId}`,
            postData
          )
        } else {
          await axios.post(`/api/socialmedia`, postData)
        }
        router.refresh()
        router.push(`/admpanel/socialmedia`)
        toast.success(toastMessage)
      }
    } catch (error: any) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      if (isDemo && status === "authenticated") {
        toast.error(
          "You are not authorized. This is a demo page. Please set up your own database."
        )
        setLoading(false)
      } else {
        await axios.delete(`/api/socialmedia/${params.socialMediaId}`)
        router.refresh()
        router.push(`/admpanel/socialmedia`)
        toast.success("Social Media deleted.")
      }
    } catch (error: any) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Social Media Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Link</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Social Link"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            type="submit"
            className="ml-auto !bg-slate-700 hover:!bg-slate-900 dark:!bg-stone-200 dark:hover:!bg-stone-500"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

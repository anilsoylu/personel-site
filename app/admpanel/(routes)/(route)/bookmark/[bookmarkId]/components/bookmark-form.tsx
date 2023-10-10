"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Bookmark } from "@prisma/client"
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
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  title: z.string().min(1),
  bookUrl: z.string().min(1),
  content: z.string().min(0),
})

type BookmarkFormValues = z.infer<typeof formSchema>

interface BookmarkFormProps {
  initialData: Bookmark | null
}

export const BookmarkForm: React.FC<BookmarkFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()
  const [content, setContent] = useState(initialData?.content || "")

  const handleContentChange = (newValue: string) => {
    setContent(newValue)
    form.setValue("content", newValue)
  }

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit bookmark" : "Create bookmark"
  const description = initialData ? "Edit a bookmark." : "Add a new bookmark"
  const toastMessage = initialData ? "Bookmark updated." : "Bookmark created."
  const action = initialData ? "Save changes" : "Create"

  const defaultValues = initialData
    ? {
        ...initialData,
        content: initialData.content || "",
      }
    : {
        title: "",
        content: "",
        bookUrl: "",
        metaTitle: "",
        metaDescription: "",
      }

  const form = useForm<BookmarkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: BookmarkFormValues) => {
    try {
      setLoading(true)

      const postData = {
        ...data,
      }

      if (initialData) {
        await axios.patch(`/api/bookmark/${params.bookmarkId}`, postData)
      } else {
        await axios.post(`/api/bookmark`, postData)
      }
      router.refresh()
      router.push(`/admpanel/bookmark`)
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/bookmark/${params.bookmarkId}`)
      router.refresh()
      router.push(`/admpanel/bookmark`)
      toast.success("Bookmark deleted.")
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Blog title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bookUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book URL</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} placeholder="Book URL" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Content</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={loading}
                    placeholder="Short content"
                    maxLength={250}
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

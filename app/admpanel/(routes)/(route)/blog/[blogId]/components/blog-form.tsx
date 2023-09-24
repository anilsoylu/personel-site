"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Blog, Image } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { Editor } from "@/app/admpanel/(routes)/components/text-editor"
import { makeSeoFriendly } from "@/lib/utils"
import checkSeoUrl from "@/actions/check-seo-url"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "@/components/ui/image-upload"
import { useSession } from "next-auth/react"

const formSchema = z.object({
  title: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  seoUrl: z.string().min(1),
  content: z.string().min(1),
  shortContent: z.string().min(1),
  metaTitle: z.string().min(0),
  metaDescription: z.string().min(0),
})

type BlogFormValues = z.infer<typeof formSchema>

interface BlogFormProps {
  initialData:
    | (Blog & {
        images: Image[]
      })
    | null
}

export const BlogForm: React.FC<BlogFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const isDemo = session?.user?.username === "demo"

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(initialData?.content || "")

  const handleEditorChange = (content: string) => {
    setContent(content)
    form.setValue("content", content)
  }

  const title = initialData ? "Edit blog" : "Create blog"
  const description = initialData ? "Edit a blog." : "Add a new blog"
  const toastMessage = initialData ? "Blog updated." : "Blog created."
  const action = initialData ? "Save changes" : "Create"

  const defaultValues = initialData
    ? {
        ...initialData,
        shortContent: initialData.shortContent || "",
        content: initialData.content || "",
        metaTitle: initialData.metaTitle || undefined,
        metaDescription: initialData.metaDescription || undefined,
      }
    : {
        title: "",
        seoUrl: "",
        shortContent: "",
        content: "",
        images: [],
        metaTitle: "",
        metaDescription: "",
      }

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const handleTitleChange = async (e: any) => {
    form.setValue("title", e.target.value)

    let seoUrl = makeSeoFriendly(e.target.value)
    let exists = await checkSeoUrl(seoUrl)
    let counter = 1

    while (exists) {
      counter++
      exists = await checkSeoUrl(`${seoUrl}${counter}`)
    }

    seoUrl = counter > 1 ? `${seoUrl}${counter}` : seoUrl
    form.setValue("seoUrl", seoUrl)
  }

  const onSubmit = async (data: BlogFormValues) => {
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
          content: content,
        }

        if (initialData) {
          await axios.patch(`/api/blog/${params.blogId}`, postData)
        } else {
          await axios.post(`/api/blog`, postData)
        }
        router.refresh()
        router.push(`/admpanel/blog`)
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
        await axios.delete(`/api/blog/${params.blogId}`)
        router.refresh()
        router.push(`/admpanel/blog`)
        toast.success("Blog deleted.")
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
          <Tabs defaultValue="detail" className="w-full">
            <TabsList>
              <TabsTrigger value="detail">Detail</TabsTrigger>
              <TabsTrigger value="seo">Seo</TabsTrigger>
            </TabsList>
            <TabsContent value="detail">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Blog title"
                        onChange={(e) => {
                          const seoUrl = makeSeoFriendly(e.target.value)
                          form.setValue("seoUrl", seoUrl)
                          form.setValue("metaTitle", e.target.value)
                          form.setValue("metaDescription", e.target.value)
                          handleTitleChange(e)
                          field.onChange(e)
                        }}
                        maxLength={100}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seoUrl"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>SEO URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="SEO URL"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortContent"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Short Content</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={loading}
                        placeholder="Short content"
                        maxLength={250}
                      />
                    </FormControl>
                    <FormDescription>
                      250 karakter ile sınırlı kısa içerik alanıdır.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="content"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Editor {...field} onChange={handleEditorChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value.map((image) => image.url)}
                        disabled={loading}
                        onChange={(url) =>
                          field.onChange([...field.value, { url }])
                        }
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter(
                              (current) => current.url !== url
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="seo" className="md:grid md:grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Meta title"
                        maxLength={60}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Meta description"
                        maxLength={160}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>
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

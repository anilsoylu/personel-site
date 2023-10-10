"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { User } from "@prisma/client"
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
import { compare, hash } from "bcryptjs"

const formSchema = z.object({
  name: z.string().nullable(),
  username: z.string().min(1),
  hashedPassword: z.string().min(1),
  email: z.string().email().min(1),
})

type UserFormValues = z.infer<typeof formSchema>

interface UserFormProps {
  initialData: User | null
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit user" : "Create user"
  const description = initialData ? "Edit a user." : "Add a new user"
  const toastMessage = initialData ? "User updated." : "User created."
  const action = initialData ? "Save changes" : "Create"

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        name: "",
        username: "",
        hashedPassword: "",
        email: "",
      }

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true)

      toast.success(
        data.hashedPassword === initialData?.hashedPassword
          ? "Same password"
          : "Different password"
      )

      let newPassword

      if (data.hashedPassword === initialData?.hashedPassword) {
        newPassword = initialData.hashedPassword
      } else {
        newPassword = await hash(data.hashedPassword, 12)
      }

      const postData = {
        ...data,
        hashedPassword: newPassword,
      }

      if (initialData) {
        await axios.patch(`/api/user/${params.id}`, postData)
      } else {
        await axios.post(`/api/user`, postData)
      }
      router.refresh()
      router.push(`/admpanel/users`)
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
      await axios.delete(`/api/user/${params.id}`)
      router.refresh()
      router.push(`/admpanel/users`)
      toast.success("User deleted.")
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="User Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hashedPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    disabled={loading}
                    placeholder="Password"
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

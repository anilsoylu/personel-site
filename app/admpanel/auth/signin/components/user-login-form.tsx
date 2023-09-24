"use client"
import { useRouter } from "next/navigation"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useForm } from "react-hook-form"
import { User } from "@prisma/client"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { signIn } from "next-auth/react"

type SignInFormValues = z.infer<typeof SignInFormValuesSchema>

type SignInFormProps = {
  initialData: User | null
}

const SignInFormValuesSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(5, "Password must be at least 8 characters long"),
})

const UserLoginForm: React.FC<SignInFormProps> = ({ initialData }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        username: "",
        password: "",
      }

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormValuesSchema),
    defaultValues,
  })

  const onSubmit = async (values: SignInFormValues) => {
    setLoading(true)
    setError(null)

    try {
      const { username, password } = values
      const hashedPassword = await bcrypt.hash(password, 12)

      const userData = {
        username,
        password: hashedPassword,
      }

      const response = await axios.post("/api/auth/signin", userData)

      if (response.status === 200) {
        await signIn("credentials", {
          username,
          password,
          callbackUrl: "/admpanel",
        })
        toast.success("Successfully signed in.")
        router.refresh()
        router.push("/admpanel")
      } else {
        toast.error("Something went wrong.")
      }
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 p-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800 font-bold text-base">
                  User Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="username"
                    maxLength={25}
                    className="h-11 bg-zinc-900 text-white focus:text-slate-800 focus:bg-white focus:ring-0 focus:border-slate-800"
                  />
                </FormControl>
                <FormDescription>
                  this is a description for the username field
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800 font-bold text-base">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="password"
                    type="password"
                    maxLength={25}
                    className="h-11 bg-zinc-900 text-white focus:text-slate-800 focus:bg-white focus:ring-0 focus:border-slate-800"
                  />
                </FormControl>
                <FormDescription>
                  this is a description for the password field
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            variant="ghost"
            className="ml-auto w-full bg-zinc-900"
            type="submit"
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UserLoginForm

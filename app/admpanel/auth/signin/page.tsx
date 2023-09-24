import React from "react"

import { Metadata } from "next"
import prismadb from "@/lib/prismadb"
import Image from "next/image"
import UserLoginForm from "./components/user-login-form"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
}

const SignInPage = async () => {
  const user = await prismadb.user.findUnique({
    where: {
      id: "",
    },
    include: {
      accounts: true,
    },
  })

  return (
    <div className="max-w-sm sm:max-w-md w-full rounded-lg shadow-lg bg-white p-0 border border-gray-200 dark:border-gray-700">
      <div className="space-y-2 text-center bg-zinc-700 p-6 rounded-sm">
        <div className="flex relative mb-6 justify-center items-center text-center">
          <Image
            src="/admin/images/logo.png"
            alt="Logo"
            width={217}
            height={217}
          />
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-slate-200">
          <b>Management Panel</b> v1.0
        </h1>
      </div>
      <UserLoginForm initialData={user} />
    </div>
  )
}

export default SignInPage

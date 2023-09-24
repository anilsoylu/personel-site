"use client"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export async function useLoginControl() {
  const { data: session, status } = useSession()
  const route = useRouter()

  if (status === "unauthenticated") {
    route.refresh()
    route.push("/admpanel/auth/signin")
  }

  return { session, status }
}

export async function SignOut() {
  await signOut({ redirect: true, callbackUrl: "/admpanel/auth/signin" })
}

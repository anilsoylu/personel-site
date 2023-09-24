"use client"
import { useLoginControl } from "../hooks/useLoginControl"

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  useLoginControl()

  return <>{children}</>
}

import NextAuthProvider from "@/providers/auth-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { ToastProvider } from "@/providers/toast-provider"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard v1.0",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextAuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ToastProvider />
        {children}
      </ThemeProvider>
    </NextAuthProvider>
  )
}

import { ToastProvider } from "@/providers/toast-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastProvider />
      <Header />
      <main className="flex flex-col container mx-auto">{children}</main>
      <Footer />
    </ThemeProvider>
  )
}

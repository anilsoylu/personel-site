import Header from "./components/Header"
import LeftMenu from "./components/header/LeftMenu"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  return (
    <>
      <div className="flex flex-col h-screen w-screen bg-white dark:bg-zinc-900">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <LeftMenu />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </>
  )
}

"use client"

export default function SignInLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center">
      {children}
    </div>
  )
}

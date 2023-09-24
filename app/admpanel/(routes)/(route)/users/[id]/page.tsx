import prismadb from "@/lib/prismadb"
import { UserForm } from "./components/user-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kullanıcılar | Admin Dashboard v1.0",
}

const DashBoardUsersPage = async ({ params }: { params: { id: string } }) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: params.id,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={user} />
      </div>
    </div>
  )
}

export default DashBoardUsersPage

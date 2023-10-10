import { format } from "date-fns"
import { Metadata } from "next"
import { UserClient } from "./components/client"
import prismadb from "@/lib/prismadb"
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Kullanıcılar | Admin Dashboard v1.0",
}

const DashBoardUsersPage = async () => {
  const users = await prismadb.user.findMany({
    where: {
      isSuperAdmin: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedUsers = users.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    isActivated: user.isActivated,
    createdAt: format(new Date(user.createdAt), "dd/MM/yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserClient data={formattedUsers} />
      </div>
    </div>
  )
}

export default DashBoardUsersPage

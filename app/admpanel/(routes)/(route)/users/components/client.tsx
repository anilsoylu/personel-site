"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ApiList } from "@/components/ui/api-list"

import { UserColumn, columns } from "./columns"

interface UserClientProps {
  data: UserColumn[]
}

export const UserClient: React.FC<UserClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users for your dashboard."
        />
        <Button onClick={() => router.push(`/admpanel/users/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="username" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Users" />
      <Separator />
      <ApiList entityName="user" entityIdName="id" />
    </>
  )
}

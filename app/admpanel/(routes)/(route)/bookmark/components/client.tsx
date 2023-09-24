"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ApiList } from "@/components/ui/api-list"

import { BookmarkColumn, columns } from "./columns"

interface BookmarkClientProps {
  data: BookmarkColumn[]
}

export const BookmarkClient: React.FC<BookmarkClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Bookmarks (${data.length})`}
          description="Manage bookmarks for your dashboard."
        />
        <Button onClick={() => router.push(`/admpanel/bookmark/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Bookmarks" />
      <Separator />
      <ApiList entityName="bookmark" entityIdName="bookmarkId" />
    </>
  )
}

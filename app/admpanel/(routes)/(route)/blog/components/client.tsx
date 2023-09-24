"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ApiList } from "@/components/ui/api-list"

import { BlogColumn, columns } from "./columns"

interface BlogClientProps {
  data: BlogColumn[]
}

export const BlogClient: React.FC<BlogClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Blogs (${data.length})`}
          description="Manage blogs for your dashboard."
        />
        <Button onClick={() => router.push(`/admpanel/blog/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Blogs" />
      <Separator />
      <ApiList entityName="blog" entityIdName="blogId" />
    </>
  )
}

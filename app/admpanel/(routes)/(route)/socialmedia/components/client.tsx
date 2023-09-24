"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ApiList } from "@/components/ui/api-list"

import { SocialMediaColumn, columns } from "./columns"

interface SocialMediaClientProps {
  data: SocialMediaColumn[]
}

export const SocialMediaClient: React.FC<SocialMediaClientProps> = ({
  data,
}) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Social Media (${data.length})`}
          description="Manage social medias for your dashboard."
        />
        <Button onClick={() => router.push(`/admpanel/socialmedia/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Social Medias" />
      <Separator />
      <ApiList entityName="socialmedia" entityIdName="socialMediaId" />
    </>
  )
}

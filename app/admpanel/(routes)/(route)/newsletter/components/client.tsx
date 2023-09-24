"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ApiList } from "@/components/ui/api-list"

import { NewsletterColumn, columns } from "./columns"
import useCSVExport from "@/hooks/useCSVExport"

interface NewsletterClientProps {
  data: NewsletterColumn[]
}

export const NewsletterClient: React.FC<NewsletterClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()
  const { downloadCSV } = useCSVExport()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Newsletter (${data.length})`}
          description="Manage newsletter for your dashboard."
        />
        <Button onClick={() => downloadCSV(data, "newsletter_data.csv")}>
          <Plus className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="email" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Newsletters" />
      <Separator />
      <ApiList entityName="newsletter" entityIdName="newsletterId" />
    </>
  )
}

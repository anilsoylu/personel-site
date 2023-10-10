import { Metadata } from "next"
import { NewsletterClient } from "./components/client"
import { format } from "date-fns"
import prismadb from "@/lib/prismadb"
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Newsletter | Admin Dashboard v1.0",
}

const NewsletterPage = async () => {
  const newsletters = await prismadb.newsletter.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedNewsletters = newsletters.map((item) => ({
    newsletterId: item.newsletterId,
    email: item.email,
    createdAt: format(item.createdAt, "MMMM dd, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewsletterClient data={formattedNewsletters} />
      </div>
    </div>
  )
}

export default NewsletterPage

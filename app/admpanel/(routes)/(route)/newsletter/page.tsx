import prismadb from "@/lib/prismadb"
import { format } from "date-fns"

import { NewsletterClient } from "./components/client"

const NewsletterPage = async () => {
  const newsletters = await prismadb.newsletter.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedNewsletterss = newsletters.map((item) => ({
    newsletterId: item.newsletterId,
    email: item.email,
    createdAt: format(item.createdAt, "MMMM dd, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewsletterClient data={formattedNewsletterss} />
      </div>
    </div>
  )
}

export default NewsletterPage

import axios from "axios"

export const getTotals = async (): Promise<{
  blogCount: number
  newsletterCount: number
  bookmarkCount: number
}> => {
  try {
    const response = await axios.get("/api/totals")
    return response.data
  } catch (error) {
    throw error
  }
}

import axios from "axios"

interface Blog {
  seoUrl: string
}

async function checkSeoUrl(seoUrl: string): Promise<boolean> {
  try {
    const { data } = await axios.get<Blog[]>(`/api/blog`)

    // Eğer data yoksa ya da boşsa hemen false dön.
    if (!data || data.length === 0) {
      return false
    }

    return data.some((blog: Blog) => blog.seoUrl === seoUrl)
  } catch (error) {
    console.error("SEO URL kontrolünde hata:", error)
    return false
  }
}

export default checkSeoUrl

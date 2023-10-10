import { Metadata } from "next"
import Home from "./components/Home"
import { LastPosts } from "./components/LastPosts"
import { BookMarksHomeItem } from "./components/BookMarks/HomeItem"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Anıl Soylu - Kişisel Web Sayfası",
  description: "Anıl Soylu - Kişisel Web Sayfası",
}

const HomePage = () => {
  return (
    <>
      <Home />
      <LastPosts />
      <BookMarksHomeItem />
    </>
  )
}

export default HomePage

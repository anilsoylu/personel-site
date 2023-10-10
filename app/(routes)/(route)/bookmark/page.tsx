import { Metadata } from "next"
import React from "react"
import BookmarkList from "../components/BookMarks"

export const dynamic = "force-dynamic"

type Props = {}

export const metadata: Metadata = {
  title: "Anıl Soylu - Yer İmleri",
}

const Bookmarks = (props: Props) => {
  return (
    <section className="mb-10">
      <h2 className="text-lg lg:text-3xl font-bold mb-3">Yer İmleri</h2>
      <p className="text-sm xl:text-lg mb-4 text-gray-400 pb-6 border-b border-white/10">
        Gün içinde bir çok farklı konuda araştırma yapıyorum ve bulduğum
        linkleri kaybetmek istemiyorum. Çünkü başka bir gün aynı konu mutlaka
        işime yarıyor, bu yüzden linkleri bu sayfada kayıt altına almaya
        başladım.
      </p>
      <BookmarkList />
    </section>
  )
}

export default Bookmarks

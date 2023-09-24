import { Metadata } from "next"
import React from "react"
import Blog from "../components/Blog"

export const metadata: Metadata = {
  title: "Anıl Soylu - Blog",
  description:
    "Yazılım dünyasındaki keşiflerim, notlarım ve önerilerimle bir geliştirici gözünden bilgileri burada paylaşıyorum. Keyifli kodlamalar!",
}

const BlogPage = () => {
  return (
    <section className="mb-10">
      <h2 className="text-lg lg:text-3xl font-bold mb-3 lg:mb-6">
        Blog Sayfam
      </h2>
      <p className="text-sm xl:text-lg mb-4 text-gray-400 pb-6 border-b border-white/10">
        Merhaba, yazılım dünyasının karmaşık ve heyecan verici koridorlarında
        dolaşan bir geliştiriciyim. Her gün yeni bir şeyler öğreniyor,
        karşılaştığım sorunları çözüyor ve bu süreçte edindiğim bilgileri,
        notları burada sizlerle paylaşıyorum. Programlama dilleri, algoritma
        optimizasyonları, en yeni teknolojik trendler ve yazılımın
        derinliklerine dair merak ettiğim her konu hakkında düşüncelerimi,
        önerilerimi ve çözüm yollarımı bu blogda bulabilirsiniz. Siz de benimle
        birlikte bu sürekli öğrenme yolculuğuna katılmak isterseniz, hoş
        geldiniz! Bu platform, hem kendimi geliştirmek hem de bilgimi sizinle
        paylaşmak için var. Keyifli okumalar ve kodlamalar dilerim!
      </p>
      <Blog />
    </section>
  )
}

export default BlogPage

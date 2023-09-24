import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

export const makeSeoFriendly = (str: string) => {
  return (
    str
      .replace(/ş/g, "s") // 'ş' karakterlerini 's' ile değiştirir
      .replace(/ğ/g, "g") // 'ğ' karakterlerini 'g' ile değiştirir
      .replace(/ü/g, "u") // 'ü' karakterlerini 'u' ile değiştirir
      .replace(/ç/g, "c") // 'ç' karakterlerini 'c' ile değiştirir
      .replace(/ı/g, "i") // 'ı' karakterlerini 'i' ile değiştirir
      .replace(/ö/g, "o") // 'ö' karakterlerini 'o' ile değiştirir
      // Eğer büyük harfli Türkçe karakterler de gelecekse onlar için de dönüşüm yapmak gerekebilir:
      .replace(/Ş/g, "s")
      .replace(/Ğ/g, "g")
      .replace(/Ü/g, "u")
      .replace(/Ç/g, "c")
      .replace(/İ/g, "i")
      .replace(/Ö/g, "o")
      .toLowerCase() // Metni küçük harfe çevirir
      .replace(/[^a-z0-9- ]/g, "") // Alfanümerik, tire ve boşluk dışındaki karakterleri kaldırır
      .replace(/\s+/g, "-") // Boşlukları '-' ile değiştirir
      .replace(/-+/g, "-")
  ) // Ardışık '-' karakterlerini tek '-' karakterine indirger
}

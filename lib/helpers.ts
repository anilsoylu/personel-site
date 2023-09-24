export function isAdminPage(): boolean {
  if (typeof window !== "undefined") {
    const url = window.location.pathname
    return url.startsWith("/admpanel")
  }
  return false
}

export const phoneClear = (phone: string): string => {
  return phone.replace(/[\s()+-]/g, "")
}

export const socialMediaNameClear = (name: string): string => {
  return name.replace(/[\s()+-]/g, "-").toLowerCase()
}

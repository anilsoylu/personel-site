import { Metadata } from "next"
import { DashboardComponent } from "./components/Dashboard"

export const metadata: Metadata = {
  title: "Anasayfa | Admin Dashboard v1.0",
}

const DashboardPage = () => {
  return (
    <>
      <DashboardComponent />
    </>
  )
}

export default DashboardPage

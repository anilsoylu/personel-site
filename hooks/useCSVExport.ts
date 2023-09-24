import { useCallback } from "react"

type DataType = { [key: string]: any }

const convertToCSV = (data: DataType[]) => {
  const header = ["email"]
  const csv = [
    header.join(","),
    ...data.map((row) => JSON.stringify(row["email"])),
  ].join("\r\n")

  return csv
}

const useCSVExport = () => {
  const downloadCSV = useCallback(
    (data: DataType[], filename = "export.csv") => {
      const csvData = convertToCSV(data)
      const blob = new Blob([csvData], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    []
  )

  return { downloadCSV }
}

export default useCSVExport

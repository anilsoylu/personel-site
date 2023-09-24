"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

import "react-quill/dist/quill.snow.css"

interface EditorProps {
  onChange: (value: string) => void
  value: string
}

export const Editor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )

  const myColors = [
    "purple",
    "#785412",
    "#452632",
    "#856325",
    "#963254",
    "#254563",
    "white",
  ]

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [
            "link",
            //  "image"
          ],
          [{ color: [] }, { background: [] }, { align: [] }],
          ["clean"],
        ],
      },
    }),
    []
  )

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code",
    "color",
    "background",
    "code-block",
    "align",
  ]

  return (
    <ReactQuill
      className="bg-white text-black"
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
    />
  )
}

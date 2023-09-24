"use client"

import { CldUploadWidget } from "next-cloudinary"
import { useEffect, useState } from "react"

import { Button } from "../ui/button"
import Image from "next/image"
import { ImagePlus, Trash } from "lucide-react"

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
                className="!bg-red-700 hover:!bg-slate-900 dark:!bg-red-700 dark:hover:!bg-stone-500 text-stone-200 dark:text-stone-200"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              className="object-cover"
              alt="Image"
              src={url}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
              className="button !bg-slate-700 hover:!bg-slate-900 dark:!bg-stone-200 dark:hover:!bg-stone-500 text-stone-200 dark:text-slate-800"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload

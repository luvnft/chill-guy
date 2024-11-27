import React from "react"
import { CloudUpload } from "lucide-react"

export function Upload() {
  return (
    <div className="bg-background group relative grid max-w-[600px] w-full min-h-[400px] h-full cursor-pointer place-items-center rounded-xl border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25">
      <div className="grid place-items-center sm:px-5">
        <CloudUpload
          strokeWidth={1}
          className="size-11 text-muted-foreground"
          aria-hidden="true"
        />
        <div className="mt-5 font-medium">
          Select a image or drag and drop here
        </div>
        <div className=" mt-2 text-muted-foreground">
          Recommended: Square (1:1) images work best.
        </div>
        <div className="  text-blue-600 underline underline-offset-2 mt-4 px-3 py-2.5">
          or browse device
        </div>
      </div>
    </div>
  )
}

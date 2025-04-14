"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "./icons"
import { type Accept, useDropzone } from "react-dropzone"
import { Canvas } from "fabric"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HexColorPicker } from "react-colorful"
import { useWindow } from "@/hooks/use-window"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { otherFonts, recommendedFonts } from "@/lib/constants"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DrawingPropertiesProps,
  selectedTextPropertiesProps,
} from "@/hooks/use-fabric"
import { AnimatePresence, motion } from "framer-motion"

interface ToolbarProps {
  setBackgroundImage: (imageUrl: string) => Promise<Canvas | null>
  addText: () => void
  addChillGuy: () => void
  changeFontFamily: (fontFamily: string) => void
  changeTextColor: (color: string) => void
  flipImage: (direction: "horizontal" | "vertical") => void
  deleteSelectedObject: () => void
  downloadCanvas: () => void
  changeBackgroundColor: (color: string) => void
  currentBackgroundColor: string
  selectedTextProperties: selectedTextPropertiesProps
  toggleFilter: () => void
  isImageSelected: boolean
  toggleDrawingMode: () => void
  incrementBrushSize: () => void
  setBrushColor: (color: string) => void
  drawingSettings: DrawingPropertiesProps
}

export function Toolbar({
  setBackgroundImage,
  addText,
  changeFontFamily,
  changeTextColor,
  addChillGuy,
  flipImage,
  deleteSelectedObject,
  downloadCanvas,
  changeBackgroundColor,
  currentBackgroundColor,
  selectedTextProperties,
  toggleFilter,
  isImageSelected,
  toggleDrawingMode,
  incrementBrushSize,
  setBrushColor,
  drawingSettings,
}: ToolbarProps) {
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const dataUrl = URL.createObjectURL(acceptedFiles[0])
        setBackgroundImage(dataUrl).catch((error) => {
          console.error("Error setting background image:", error)
        })
      }
    },
    [setBackgroundImage],
  )

  const accept: Accept = {
    "image/*": [".jpg", ".jpeg", ".png"],
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
  })

  const { isMobile } = useWindow()

  return (
    <div className="max-w-[100vw] px-5">
      <div className="no-scrollbar w-full overflow-x-auto rounded-full border bg-white sm:overflow-visible">
        <div className="flex items-center space-x-2 p-2 text-2xl md:justify-center">
          {/* Background Button */}
          <Button
            {...getRootProps()}
            variant="outline"
            size="icon"
            className="rounded-full hover:animate-jelly tooltip shrink-0"
            aria-label="Upload background image"
          >
            <span className="tooltiptext">Background</span>
            <input {...getInputProps()} />
            <Icons.background className="size-4" />
          </Button>

          {/* Background Color Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:animate-jelly tooltip shrink-0"
                style={{ backgroundColor: currentBackgroundColor }}
                aria-label="Change background color"
              >
                <span className="tooltiptext">Color</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="mt-3 w-fit p-0 bg-transparent rounded-lg"
              align="start"
            >
              <HexColorPicker
                className="border-none"
                color={currentBackgroundColor}
                onChange={changeBackgroundColor}
              />
            </PopoverContent>
          </Popover>

          <div className="h-5">
            <div className="mx-1.5 h-full w-px bg-[#e5e5e5]"></div>
          </div>

          {/* High Guy Button */}
          <Button
            onClick={addChillGuy}
            variant="outline"
            size="icon"
            className="rounded-full hover:animate-jelly tooltip shrink-0"
            aria-label="Add High Guy"
          >
            <span className="tooltiptext">High Guy</span>
            <img
              src={`${process.env.NEXT_PUBLIC_APP_URL}/chillguy.png`}
              className="size-6"
              alt="High Guy icon"
            />
          </Button>

          {/* Image Tools */}
          <AnimatePresence>
            {isImageSelected && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.09 } }}
                transition={{
                  duration: 0.1,
                  stiffness: 900,
                  type: "spring",
                  damping: 50,
                }}
                className="flex items-center space-x-2"
              >
                <Button
                  onClick={() => flipImage("horizontal")}
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:animate-jelly tooltip shrink-0"
                  aria-label="Flip image"
                >
                  <span className="tooltiptext">Flip</span>
                  <Icons.flip className="size-4" />
                </Button>
                <Button
                  onClick={toggleFilter}
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:animate-jelly tooltip shrink-0"
                  aria-label="Apply filters"
                >
                  <Icons.filters className="size-4" />
                  <span className="tooltiptext">Filters</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-5">
            <div className="mx-1.5 h-full w-px bg-[#e5e5e5]"></div>
          </div>

          {/* Text Tools */}
          <Button
            onClick={addText}
            variant="outline"
            size="icon"
            className="rounded-full hover:animate-jelly tooltip shrink-0"
            aria-label="Add text"
          >
            <span className="tooltiptext">Text</span>
            <Icons.text className="size-4" />
          </Button>

          <AnimatePresence>
            {selectedTextProperties.isTextSelected && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.09 } }}
                transition={{
                  duration: 0.1,
                  stiffness: 900,
                  type: "spring",
                  damping: 50,
                }}
                className="flex items-center space-x-2"
              >
                {/* Font Family Selector */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full hover:animate-jelly tooltip shrink-0"
                      aria-label="Change font family"
                    >
                      <span className="tooltiptext">Font Family</span>
                      <Icons.font className="size-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="max-w-[200px] w-full p-0 h-[250px] rounded-lg"
                  >
                    <Command>
                      <CommandInput placeholder="Search font family" />
                      <CommandList className="hide_scrollbar">
                        <CommandEmpty>No font family found.</CommandEmpty>
                        <CommandGroup heading="Recommended">
                          {recommendedFonts.map((fontName) => (
                            <CommandItem
                              key={fontName}
                              value={fontName}
                              className="cursor-pointer"
                              onSelect={changeFontFamily}
                            >
                              <span style={{ fontFamily: `'${fontName}', sans-serif` }}>
                                {fontName}
                              </span>
                              <CheckIcon
                                className={cn(
                                  "ml-auto size-4",
                                  fontName === selectedTextProperties.fontFamily
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandGroup heading="Others">
                          {otherFonts.map((fontName) => (
                            <CommandItem
                              key={fontName}
                              value={fontName}
                              className="cursor-pointer"
                              onSelect={changeFontFamily}
                            >
                              <span style={{ fontFamily: `'${fontName}', sans-serif` }}>
                                {fontName}
                              </span>
                              <CheckIcon
                                className={cn(
                                  "ml-auto size-4",
                                  fontName === selectedTextProperties.fontFamily
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Text Color Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full hover:animate-jelly tooltip shrink-0"
                      style={{ backgroundColor: selectedTextProperties.fontColor }}
                      aria-label="Change text color"
                    >
                      <span className="tooltiptext">Text Color</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="mt-3 w-fit p-0 bg-transparent rounded-lg"
                    align="start"
                  >
                    <HexColorPicker
                      className="border-none"
                      color={selectedTextProperties.fontColor}
                      onChange={changeTextColor}
                    />
                  </PopoverContent>
                </Popover>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-5">
            <div className="mx-1.5 h-full w-px bg-[#e5e5e5]"></div>
          </div>

          {/* Drawing Tools */}
          <Button
            onClick={toggleDrawingMode}
            variant="outline"
            size="icon"
            className={cn(
              "rounded-full hover:animate-jelly tooltip shrink-0",
              drawingSettings.isDrawing && "ring-2 ring-green-500 ring-offset-2",
            )}
            aria-label="Toggle drawing mode"
          >
            <span className="tooltiptext">Draw</span>
            <Icons.draw className="size-4" />
          </Button>

          <AnimatePresence>
            {drawingSettings.isDrawing && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.09 } }}
                transition={{
                  duration: 0.1,
                  stiffness: 900,
                  type: "spring",
                  damping: 50,
                }}
                className="flex items-center space-x-2"
              >
                <Button
                  onClick={incrementBrushSize}
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:animate-jelly tooltip shrink-0"
                  aria-label="Change brush size"
                >
                  <span className="tooltiptext">Brush Size</span>
                  {drawingSettings.brushSize}
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full hover:animate-jelly tooltip shrink-0"
                      style={{ backgroundColor: drawingSettings.brushColor }}
                      aria-label="Change brush color"
                    >
                      <span className="tooltiptext">Brush Color</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="mt-3 w-fit p-0 bg-transparent rounded-lg"
                    align="start"
                  >
                    <HexColorPicker
                      className="border-none"
                      color={drawingSettings.brushColor}
                      onChange={setBrushColor}
                    />
                  </PopoverContent>
                </Popover>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-5">
            <div className="mx-1.5 h-full w-px bg-[#e5e5e5]"></div>
          </div>

          {/* Delete Button */}
          <Button
            onClick={deleteSelectedObject}
            variant="outline"
            size="icon"
            className="rounded-full hover:animate-jelly tooltip shrink-0"
            aria-label="Delete selected object"
          >
            <span className="tooltiptext">Delete</span>
            <Icons.trash className="size-4 text-red-600" />
          </Button>

          <div className="h-5">
            <div className="mx-1.5 h-full w-px bg-[#e5e5e5]"></div>
          </div>

          {/* Download Button */}
          <Button
            onClick={downloadCanvas}
            variant="outline"
            size="icon"
            className="rounded-full hover:animate-jelly tooltip shrink-0"
            aria-label="Download canvas"
          >
            <span className="tooltiptext">Download</span>
            <Icons.download className="size-4" />
          </Button>

          {isMobile && (
            <div className="h-5 invisible">
              <div className="h-full w-px bg-[#e5e5e5]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
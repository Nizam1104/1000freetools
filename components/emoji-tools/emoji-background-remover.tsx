"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, Download, Copy, Check, Sparkles, Image as ImageIcon, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProcessedImage {
  original: string
  processed: string
  name: string
}

export default function EmojiBackgroundRemover() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([])
  const [backgroundColor, setBackgroundColor] = useState("transparent")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setSelectedImage(result)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleEmojiUpload = useCallback((emoji: string) => {
    // Create a canvas with the emoji
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.font = "400px Arial, Segoe UI Emoji, Apple Color Emoji"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(emoji, 256, 256)

    const dataUrl = canvas.toDataURL("image/png")
    setSelectedImage(dataUrl)
  }, [])

  const removeBackground = useCallback(() => {
    if (!selectedImage) return

    setIsProcessing(true)

    // Simulate background removal (in a real app, you'd use ML or API)
    setTimeout(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height

        // Clear canvas (transparent)
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw image
        ctx.drawImage(img, 0, 0)

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // Simple background removal (remove white/light backgrounds)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          // If pixel is very light (likely background), make it transparent
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0
          }
        }

        ctx.putImageData(imageData, 0, 0)

        const processedDataUrl = canvas.toDataURL("image/png")

        setProcessedImages((prev) => [
          ...prev,
          {
            original: selectedImage,
            processed: processedDataUrl,
            name: `emoji-${Date.now()}.png`,
          },
        ])

        setIsProcessing(false)
      }
      img.src = selectedImage
    }, 1000)
  }, [selectedImage])

  const downloadImage = useCallback((image: ProcessedImage) => {
    const link = document.createElement("a")
    link.download = image.name
    link.href = image.processed
    link.click()
  }, [])

  const copyToClipboard = useCallback(async (image: ProcessedImage, key: string) => {
    try {
      // For images, we copy the emoji representation
      const emoji = image.name.split("-")[1]?.split(".")[0] || "🖼️"
      await navigator.clipboard.writeText(emoji)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const clearAll = useCallback(() => {
    setSelectedImage(null)
    setProcessedImages([])
  }, [])

  const popularEmojis = ["😀", "😂", "😍", "🔥", "❤️", "✨", "🎉", "💀", "🙏", "👍", "🌟", "🎂"]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Upload Section */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Upload Emoji Image</Label>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            selectedImage ? "border-primary bg-muted/30" : "border-muted hover:border-primary/50"
          )}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const file = e.dataTransfer.files?.[0]
            if (file && file.type.startsWith("image/")) {
              const reader = new FileReader()
              reader.onload = (ev) => {
                setSelectedImage(ev.target?.result as string)
              }
              reader.readAsDataURL(file)
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Upload className="size-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-2">Drag and drop an image or click to upload</p>
          <p className="text-sm text-muted-foreground mb-4">Supports PNG, JPG, SVG, WebP</p>
          <Button onClick={() => fileInputRef.current?.click()}>
            Choose File
          </Button>
        </div>
      </section>

      {/* Quick Emoji Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Or Select an Emoji</Label>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {popularEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiUpload(emoji)}
              className="aspect-square flex items-center justify-center text-3xl hover:bg-muted rounded-lg transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
      </section>

      {/* Preview */}
      {selectedImage && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Preview</Label>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <Trash2 className="size-4 mr-2" />
              Clear
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground mb-2">Original</p>
              <div
                className="rounded-lg bg-muted/30 p-4 flex items-center justify-center min-h-[150px]"
                style={{
                  backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                }}
              >
                <img src={selectedImage} alt="Original" className="max-h-32" />
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground mb-2">Processed (Transparent)</p>
              <div
                className="rounded-lg p-4 flex items-center justify-center min-h-[150px]"
                style={{
                  backgroundImage: backgroundColor === "transparent"
                    ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
                    : undefined,
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                  backgroundColor: backgroundColor === "transparent" ? undefined : backgroundColor,
                }}
              >
                {processedImages.length > 0 ? (
                  <img src={processedImages[processedImages.length - 1].processed} alt="Processed" className="max-h-32" />
                ) : (
                  <p className="text-muted-foreground text-sm">Click "Remove Background" to process</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Background Color Options */}
      <section className="space-y-2">
        <Label className="text-sm">Output Background</Label>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Transparent", value: "transparent" },
            { name: "White", value: "#ffffff" },
            { name: "Black", value: "#000000" },
            { name: "Red", value: "#ef4444" },
            { name: "Blue", value: "#3b82f6" },
            { name: "Green", value: "#22c55e" },
            { name: "Yellow", value: "#eab308" },
            { name: "Purple", value: "#a855f7" },
          ].map((color) => (
            <button
              key={color.value}
              onClick={() => setBackgroundColor(color.value)}
              className={cn(
                "w-8 h-8 rounded-lg border-2 transition-all",
                backgroundColor === color.value ? "border-primary ring-2 ring-ring" : "border-muted"
              )}
              style={{
                backgroundColor: color.value === "transparent" ? undefined : color.value,
                backgroundImage: color.value === "transparent"
                  ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
                  : undefined,
                backgroundSize: "8px 8px",
                backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
              }}
              title={color.name}
            />
          ))}
        </div>
      </section>

      {/* Action Buttons */}
      {selectedImage && (
        <div className="flex flex-wrap gap-2">
          <Button onClick={removeBackground} disabled={isProcessing}>
            <Sparkles className="size-4 mr-2" />
            {isProcessing ? "Processing..." : "Remove Background"}
          </Button>
          {processedImages.length > 0 && (
            <Button variant="outline" onClick={() => downloadImage(processedImages[processedImages.length - 1])}>
              <Download className="size-4 mr-2" />
              Download PNG
            </Button>
          )}
        </div>
      )}

      {/* Processed Images Gallery */}
      {processedImages.length > 0 && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Processed Images</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {processedImages.map((image, idx) => (
              <div key={idx} className="rounded-lg border p-3 space-y-2">
                <div
                  className="rounded bg-muted/30 p-2 flex items-center justify-center aspect-square"
                  style={{
                    backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "8px 8px",
                  }}
                >
                  <img src={image.processed} alt={image.name} className="max-h-full" />
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => downloadImage(image)}
                  >
                    <Download className="size-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(image, `img-${idx}`)}
                  >
                    {copied === `img-${idx}` ? <Check className="size-3" /> : <Copy className="size-3" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-2">
        <Label className="text-base font-medium">Tips for Best Results</Label>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Use images with solid or simple backgrounds for best results</li>
          <li>High contrast between subject and background works best</li>
          <li>PNG format preserves transparency</li>
          <li>For emoji images, the tool automatically creates transparent backgrounds</li>
        </ul>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Maximize2, Minimize2, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmojiPreset {
  emoji: string
  name: string
}

const POPULAR_EMOJIS: EmojiPreset[] = [
  { emoji: "😀", name: "Grinning" },
  { emoji: "😂", name: "Laughing" },
  { emoji: "😍", name: "Love" },
  { emoji: "🔥", name: "Fire" },
  { emoji: "❤️", name: "Heart" },
  { emoji: "👍", name: "Thumbs Up" },
  { emoji: "🎉", name: "Party" },
  { emoji: "✨", name: "Sparkles" },
  { emoji: "💀", name: "Skull" },
  { emoji: "🙏", name: "Pray" },
  { emoji: "🌟", name: "Star" },
  { emoji: "🎂", name: "Cake" },
]

export default function EmojiSizeChanger() {
  const [selectedEmoji, setSelectedEmoji] = useState("😀")
  const [customEmoji, setCustomEmoji] = useState("")
  const [pixelSize, setPixelSize] = useState([64])
  const [scaleFactor, setScaleFactor] = useState([2])
  const [outputFormat, setOutputFormat] = useState<"png" | "svg">("png")
  const [backgroundColor, setBackgroundColor] = useState("transparent")
  const [copied, setCopied] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleCustomEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emoji = e.target.value
    if (emoji) {
      setCustomEmoji(emoji)
      setSelectedEmoji(emoji[0])
    }
  }

  const downloadAsPNG = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = pixelSize[0] * scaleFactor[0]
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Set background
    if (backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, size, size)
    }

    // Draw emoji
    const fontSize = size * 0.8
    ctx.font = `${fontSize}px Arial, Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(selectedEmoji, size / 2, size / 2)

    // Download
    const link = document.createElement("a")
    link.download = `emoji-${selectedEmoji}-${size}px.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [selectedEmoji, pixelSize, scaleFactor, backgroundColor])

  const downloadAsSVG = useCallback(() => {
    const size = pixelSize[0] * scaleFactor[0]
    const fontSize = size * 0.8

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        ${backgroundColor !== "transparent" ? `<rect width="${size}" height="${size}" fill="${backgroundColor}"/>` : ""}
        <text x="${size / 2}" y="${size / 2}" font-size="${fontSize}" font-family="Arial, Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji" text-anchor="middle" dominant-baseline="central">${selectedEmoji}</text>
      </svg>
    `.trim()

    const blob = new Blob([svg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = `emoji-${selectedEmoji}-${size}px.svg`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }, [selectedEmoji, pixelSize, scaleFactor, backgroundColor])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const presetSizes = [16, 24, 32, 48, 64, 128, 256, 512]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Emoji Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Select Emoji</Label>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 p-4 rounded-lg border bg-muted/30">
          {POPULAR_EMOJIS.map((preset) => (
            <button
              key={preset.emoji}
              onClick={() => {
                setSelectedEmoji(preset.emoji)
                setCustomEmoji("")
              }}
              className={cn(
                "aspect-square flex items-center justify-center text-2xl rounded-lg transition-colors",
                selectedEmoji === preset.emoji ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
              title={preset.name}
            >
              {preset.emoji}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="custom-emoji" className="text-sm">Or Enter Custom Emoji</Label>
          <Input
            id="custom-emoji"
            value={customEmoji}
            onChange={handleCustomEmojiChange}
            placeholder="Paste any emoji here..."
            maxLength={10}
          />
        </div>
      </section>

      {/* Preview */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Preview</Label>
        <div
          className="rounded-lg border bg-muted/30 p-8 flex items-center justify-center min-h-[200px]"
          style={{
            backgroundImage: backgroundColor === "transparent"
              ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
              : undefined,
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
            backgroundColor: backgroundColor === "transparent" ? undefined : backgroundColor,
          }}
        >
          <span
            className="transition-all duration-200"
            style={{
              fontSize: `${pixelSize[0] * scaleFactor[0]}px`,
              lineHeight: 1,
            }}
          >
            {selectedEmoji}
          </span>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>Base: {pixelSize[0]}px</span>
          <span>×</span>
          <span>Scale: {scaleFactor[0]}x</span>
          <span>=</span>
          <span className="font-medium text-foreground">{pixelSize[0] * scaleFactor[0]}px</span>
        </div>
      </section>

      {/* Size Controls */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Size Settings</Label>
        
        <div className="space-y-2">
          <Label className="text-sm">Base Pixel Size: {pixelSize[0]}px</Label>
          <Slider
            value={pixelSize}
            onValueChange={setPixelSize}
            min={16}
            max={512}
            step={16}
            className="w-full"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {presetSizes.map((size) => (
              <Button
                key={size}
                variant={pixelSize[0] === size ? "default" : "outline"}
                size="sm"
                onClick={() => setPixelSize([size])}
              >
                {size}px
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Scale Factor: {scaleFactor[0]}x</Label>
          <Slider
            value={scaleFactor}
            onValueChange={setScaleFactor}
            min={0.5}
            max={10}
            step={0.5}
            className="w-full"
          />
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setScaleFactor([Math.max(0.5, scaleFactor[0] - 0.5)])}
            >
              <Minimize2 className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setScaleFactor([Math.min(10, scaleFactor[0] + 0.5)])}
            >
              <Maximize2 className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setScaleFactor([1])}
            >
              Reset
            </Button>
          </div>
        </div>
      </section>

      {/* Background Color */}
      <section className="space-y-2">
        <Label className="text-sm">Background Color</Label>
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
            { name: "Pink", value: "#ec4899" },
            { name: "Orange", value: "#f97316" },
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

      {/* Output Format */}
      <section className="space-y-2">
        <Label className="text-sm">Output Format</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={outputFormat === "png" ? "default" : "outline"}
            size="sm"
            onClick={() => setOutputFormat("png")}
          >
            PNG (Raster)
          </Button>
          <Button
            variant={outputFormat === "svg" ? "default" : "outline"}
            size="sm"
            onClick={() => setOutputFormat("svg")}
          >
            SVG (Vector)
          </Button>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={downloadAsPNG}>
          <Download className="size-4 mr-2" />
          Download PNG
        </Button>
        <Button variant="outline" onClick={downloadAsSVG}>
          <Download className="size-4 mr-2" />
          Download SVG
        </Button>
        <Button
          variant="outline"
          onClick={() => copyToClipboard(selectedEmoji, "emoji")}
        >
          {copied === "emoji" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
          Copy Emoji
        </Button>
      </div>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Size Comparison */}
      <section className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <ZoomIn className="size-4" />
          Size Comparison
        </Label>
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex items-end gap-4 flex-wrap">
            {[16, 32, 64, 128, 256].map((size) => (
              <div key={size} className="text-center">
                <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>{selectedEmoji}</span>
                <p className="text-xs text-muted-foreground mt-1">{size}px</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Recommended Sizes</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Social Media Profile", size: "180x180", description: "Twitter, Instagram" },
            { name: "Discord Emoji", size: "128x128", description: "Custom server emoji" },
            { name: "Slack Emoji", size: "128x128", description: "Custom reactions" },
            { name: "WhatsApp Sticker", size: "512x512", description: "Sticker format" },
            { name: "Telegram Sticker", size: "512x512", description: "Sticker pack" },
            { name: "Presentation Icon", size: "256x256", description: "Slides, docs" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => {
                const size = parseInt(item.size)
                setPixelSize([size])
                setScaleFactor([1])
              }}
              className="rounded-lg border p-3 text-left hover:bg-muted/50 transition-colors"
            >
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.size} - {item.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

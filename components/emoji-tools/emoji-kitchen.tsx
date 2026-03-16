"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Sparkles, Shuffle, Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface MashupPreset {
  id: string
  emoji1: string
  emoji2: string
  name: string
  description: string
  trending: boolean
}

const MASHUP_PRESETS: MashupPreset[] = [
  { id: "1", emoji1: "❤️", emoji2: "🔥", name: "Burning Heart", description: "Passionate love", trending: true },
  { id: "2", emoji1: "🐱", emoji2: "🦄", name: "Caticorn", description: "Magical cat", trending: true },
  { id: "3", emoji1: "🍕", emoji2: "🍔", name: "Pizzaburger", description: "Ultimate fast food", trending: false },
  { id: "4", emoji1: "🌙", emoji2: "☀️", name: "Eclipse", description: "Celestial blend", trending: true },
  { id: "5", emoji1: "🐶", emoji2: "🦁", name: "Lion Dog", description: "Brave pup", trending: false },
  { id: "6", emoji1: "🎸", emoji2: "🎹", name: "Rock Piano", description: "Musical fusion", trending: false },
  { id: "7", emoji1: "🌊", emoji2: "🔥", name: "Steam", description: "Hot water", trending: true },
  { id: "8", emoji1: "🍦", emoji2: "🍩", name: "Frosted Donut", description: "Sweet treat", trending: false },
  { id: "9", emoji1: "🚀", emoji2: "🌈", name: "Rainbow Rocket", description: "Colorful space", trending: true },
  { id: "10", emoji1: "🦋", emoji2: "🌺", name: "Flower Butterfly", description: "Nature beauty", trending: false },
  { id: "11", emoji1: "👻", emoji2: "🎃", name: "Haunted Pumpkin", description: "Spooky spirit", trending: false },
  { id: "12", emoji1: "🎄", emoji2: "⭐", name: "Star Tree", description: "Holiday magic", trending: false },
]

const EMOJI_OPTIONS = [
  "😀", "😂", "😍", "🥰", "😎", "🤔", "🙏", "💀", "🔥", "✨",
  "❤️", "💔", "💕", "💯", "👍", "👎", "👏", "🙌", "🤝", "💪",
  "🌟", "⭐", "🌙", "☀️", "🌈", "☁️", "🌊", "🔥", "💧", "🌸",
  "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
  "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🦆", "🦅",
  "🍕", "🍔", "🍟", "🌭", "🍿", "🧁", "🍰", "🍫", "🍬", "🍭",
  "🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚀",
  "📱", "💻", "⌨️", "🖥️", "🎮", "🎯", "🎲", "🎸", "🎹", "🎺",
]

export default function EmojiKitchen() {
  const [emoji1, setEmoji1] = useState("❤️")
  const [emoji2, setEmoji2] = useState("🔥")
  const [blendMode, setBlendMode] = useState("overlay")
  const [opacity1, setOpacity1] = useState([80])
  const [opacity2, setOpacity2] = useState([80])
  const [scale, setScale] = useState([100])
  const [rotation, setRotation] = useState([0])
  const [generatedMashup, setGeneratedMashup] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const [showEmojiPicker1, setShowEmojiPicker1] = useState(false)
  const [showEmojiPicker2, setShowEmojiPicker2] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateMashup = useCallback(() => {
    const mashup = `${emoji1}${emoji2}`
    setGeneratedMashup(mashup)
  }, [emoji1, emoji2])

  const randomizeEmojis = useCallback(() => {
    const random1 = EMOJI_OPTIONS[Math.floor(Math.random() * EMOJI_OPTIONS.length)]
    const random2 = EMOJI_OPTIONS[Math.floor(Math.random() * EMOJI_OPTIONS.length)]
    setEmoji1(random1)
    setEmoji2(random2)
  }, [])

  const loadPreset = useCallback((preset: MashupPreset) => {
    setEmoji1(preset.emoji1)
    setEmoji2(preset.emoji2)
  }, [])

  const downloadAsPNG = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 512
    canvas.width = size
    canvas.height = size

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, size, size)

    const centerX = size / 2
    const centerY = size / 2
    const baseSize = 200 * (scale[0] / 100)

    // Draw first emoji
    ctx.save()
    ctx.globalAlpha = opacity1[0] / 100
    ctx.translate(centerX - 50, centerY)
    ctx.rotate((-rotation[0] * Math.PI) / 360)
    ctx.font = `${baseSize}px Arial`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(emoji1, 0, 0)
    ctx.restore()

    // Draw second emoji
    ctx.save()
    ctx.globalAlpha = opacity2[0] / 100
    ctx.translate(centerX + 50, centerY)
    ctx.rotate((rotation[0] * Math.PI) / 360)
    ctx.font = `${baseSize}px Arial`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(emoji2, 0, 0)
    ctx.restore()

    // Download
    const link = document.createElement("a")
    link.download = `emoji-mashup-${emoji1}${emoji2}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [emoji1, emoji2, opacity1, opacity2, scale, rotation])

  const downloadAsSVG = useCallback(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <text x="206" y="280" font-size="200" opacity="${opacity1[0] / 100}" transform="rotate(${-rotation[0]} 206 280)">${emoji1}</text>
        <text x="306" y="280" font-size="200" opacity="${opacity2[0] / 100}" transform="rotate(${rotation[0]} 306 280)">${emoji2}</text>
      </svg>
    `.trim()

    const blob = new Blob([svg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = `emoji-mashup-${emoji1}${emoji2}.svg`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }, [emoji1, emoji2, opacity1, opacity2, rotation])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Emoji Selection */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Select Emojis to Mashup</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Emoji 1 */}
          <div className="space-y-2">
            <Label>Emoji 1</Label>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full h-16 text-4xl"
                onClick={() => setShowEmojiPicker1(!showEmojiPicker1)}
              >
                {emoji1}
              </Button>
              {showEmojiPicker1 && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 rounded-lg border bg-background shadow-lg z-10 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-8 gap-1">
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          setEmoji1(emoji)
                          setShowEmojiPicker1(false)
                        }}
                        className="aspect-square flex items-center justify-center text-xl hover:bg-muted rounded transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Emoji 2 */}
          <div className="space-y-2">
            <Label>Emoji 2</Label>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full h-16 text-4xl"
                onClick={() => setShowEmojiPicker2(!showEmojiPicker2)}
              >
                {emoji2}
              </Button>
              {showEmojiPicker2 && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 rounded-lg border bg-background shadow-lg z-10 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-8 gap-1">
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          setEmoji2(emoji)
                          setShowEmojiPicker2(false)
                        }}
                        className="aspect-square flex items-center justify-center text-xl hover:bg-muted rounded transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button variant="outline" onClick={randomizeEmojis} className="w-full sm:w-auto">
          <Shuffle className="size-4 mr-2" />
          Randomize
        </Button>
      </section>

      {/* Controls */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Mashup Settings</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Emoji 1 Opacity: {opacity1[0]}%</Label>
            <Slider value={opacity1} onValueChange={setOpacity1} min={10} max={100} step={5} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Emoji 2 Opacity: {opacity2[0]}%</Label>
            <Slider value={opacity2} onValueChange={setOpacity2} min={10} max={100} step={5} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Scale: {scale[0]}%</Label>
            <Slider value={scale} onValueChange={setScale} min={50} max={150} step={5} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Rotation: {rotation[0]}°</Label>
            <Slider value={rotation} onValueChange={setRotation} min={-180} max={180} step={5} />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Blend Mode</Label>
          <div className="flex flex-wrap gap-2">
            {["normal", "overlay", "multiply", "screen"].map((mode) => (
              <Button
                key={mode}
                variant={blendMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => setBlendMode(mode)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={generateMashup}>
            <Sparkles className="size-4 mr-2" />
            Generate Mashup
          </Button>
          <Button variant="outline" onClick={downloadAsPNG} disabled={!generatedMashup}>
            <Download className="size-4 mr-2" />
            Download PNG
          </Button>
          <Button variant="outline" onClick={downloadAsSVG} disabled={!generatedMashup}>
            <Download className="size-4 mr-2" />
            Download SVG
          </Button>
        </div>
      </section>

      {/* Preview */}
      {generatedMashup && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Preview</Label>
          <div
            className={cn(
              "rounded-lg border bg-muted/30 p-8 flex items-center justify-center min-h-[200px]",
              blendMode === "overlay" && "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
              blendMode === "multiply" && "bg-muted",
              blendMode === "screen" && "bg-background"
            )}
            style={{ mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"] }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                transform: `scale(${scale[0] / 100})`,
              }}
            >
              <span
                className="text-8xl"
                style={{
                  opacity: opacity1[0] / 100,
                  transform: `rotate(${-rotation[0]}deg)`,
                  display: "inline-block",
                }}
              >
                {emoji1}
              </span>
              <span
                className="text-8xl -ml-4"
                style={{
                  opacity: opacity2[0] / 100,
                  transform: `rotate(${rotation[0]}deg)`,
                  display: "inline-block",
                }}
              >
                {emoji2}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(generatedMashup, "mashup")}
            >
              {copied === "mashup" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy Mashup
            </Button>
          </div>
        </section>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Trending Mashups */}
      <section className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Star className="size-4" />
          Trending Mashups
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MASHUP_PRESETS.filter((p) => p.trending).map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset)}
              className="rounded-lg border p-4 text-center hover:bg-muted/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="text-4xl mb-2">{preset.emoji1}{preset.emoji2}</div>
              <p className="font-medium text-sm">{preset.name}</p>
              <p className="text-xs text-muted-foreground">{preset.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* All Presets Gallery */}
      <section className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Heart className="size-4" />
          More Combinations
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {MASHUP_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset)}
              className="rounded-lg border p-3 text-center hover:bg-muted/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="text-3xl mb-1">{preset.emoji1}{preset.emoji2}</div>
              <p className="font-medium text-xs">{preset.name}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

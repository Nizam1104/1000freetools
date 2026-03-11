"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Image, Type, Palette, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ArtPreset {
  name: string
  emojis: string[]
  description: string
}

const ART_PRESETS: ArtPreset[] = [
  { name: "Nature", emojis: ["🌲", "🌳", "🌴", "🌵", "🌿", "☘️", "🍀", "🍁", "🍂", "🍃"], description: "Forest and plants" },
  { name: "Ocean", emojis: ["🌊", "🐟", "🐠", "🐡", "🦈", "🐙", "🦑", "🦞", "🦀", "🐚"], description: "Sea life" },
  { name: "Space", emojis: ["🌌", "⭐", "🌟", "✨", "🌙", "☀️", "🌍", "🚀", "🛸", "👽"], description: "Cosmic theme" },
  { name: "Food", emojis: ["🍕", "🍔", "🍟", "🌭", "🍿", "🧁", "🍰", "🍫", "🍬", "🍭"], description: "Delicious treats" },
  { name: "Animals", emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"], description: "Cute creatures" },
  { name: "Rainbow", emojis: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", "⚫", "⚪", "🌈"], description: "Color spectrum" },
  { name: "Hearts", emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔"], description: "Love colors" },
  { name: "Party", emojis: ["🎉", "🎊", "🎁", "🎂", "🎄", "🎃", "🎈", "🎀", "🎯", "🎪"], description: "Celebration" },
]

const SAMPLE_TEXTS = [
  "Hello World",
  "Welcome",
  "Happy Birthday",
  "Thank You",
  "Good Morning",
  "Congratulations",
]

export default function EmojiArtGenerator() {
  const [inputText, setInputText] = useState("")
  const [selectedPreset, setSelectedPreset] = useState<ArtPreset | null>(ART_PRESETS[0])
  const [customEmojis, setCustomEmojis] = useState("")
  const [artSize, setArtSize] = useState([50])
  const [density, setDensity] = useState([50])
  const [generatedArt, setGeneratedArt] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const [outputMode, setOutputMode] = useState<"text" | "image">("text")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateEmojiArt = useCallback(() => {
    if (!inputText.trim() && !customEmojis.trim()) return

    const emojis = customEmojis.trim() ? customEmojis.split("") : selectedPreset?.emojis || ["⭐"]
    const text = inputText.trim() || "Hello"
    const size = artSize[0]
    const densityLevel = density[0]

    // Create emoji mosaic based on text
    let art = ""
    const lines = Math.ceil(text.length / Math.max(1, Math.floor(densityLevel / 10)))

    for (let line = 0; line < lines; line++) {
      let lineArt = ""
      const charsPerLine = Math.max(1, Math.floor(densityLevel / 10))
      for (let i = 0; i < charsPerLine; i++) {
        const charIndex = line * charsPerLine + i
        if (charIndex < text.length) {
          const emojiIndex = text.charCodeAt(charIndex) % emojis.length
          lineArt += emojis[emojiIndex] + " "
        }
      }
      art += lineArt.trim() + "\n"
    }

    setGeneratedArt(art.trim())
  }, [inputText, customEmojis, selectedPreset, artSize, density])

  const generateImageArt = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 800
    canvas.width = size
    canvas.height = size

    // Clear and set background
    ctx.fillStyle = "#1a1a2e"
    ctx.fillRect(0, 0, size, size)

    const emojis = customEmojis.trim() ? customEmojis.split("") : selectedPreset?.emojis || ["⭐"]
    const gridSize = 20
    const emojiSize = size / gridSize

    // Generate mosaic
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const emojiIndex = (row * gridSize + col) % emojis.length
        const emoji = emojis[emojiIndex]
        const x = col * emojiSize + emojiSize / 2
        const y = row * emojiSize + emojiSize / 2

        ctx.font = `${emojiSize * 0.8}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(emoji, x, y)
      }
    }
  }, [customEmojis, selectedPreset])

  const downloadAsImage = useCallback(() => {
    generateImageArt()
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "emoji-art.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [generateImageArt])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const loadSampleText = (text: string) => {
    setInputText(text)
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="text" className="text-sm px-4 py-2">
            <Type className="size-4 mr-2" />
            Text to Emoji Art
          </TabsTrigger>
          <TabsTrigger value="image" className="text-sm px-4 py-2">
            <Image className="size-4 mr-2" />
            Image Mosaic
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-6 mt-4">
          {/* Input Section */}
          <section className="space-y-3">
            <Label htmlFor="art-text" className="text-base font-medium">
              Enter Text to Convert
            </Label>
            <Input
              id="art-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
            />
            <div className="flex flex-wrap gap-2">
              {SAMPLE_TEXTS.map((text) => (
                <Button
                  key={text}
                  variant="outline"
                  size="sm"
                  onClick={() => loadSampleText(text)}
                >
                  {text}
                </Button>
              ))}
            </div>
          </section>

          {/* Emoji Palette Selection */}
          <section className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Palette className="size-4" />
              Emoji Palette
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ART_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setSelectedPreset(preset)
                    setCustomEmojis("")
                  }}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-all",
                    selectedPreset?.name === preset.name && !customEmojis
                      ? "border-primary bg-muted/50"
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className="text-xl mb-1">{preset.emojis.slice(0, 5).join("")}</div>
                  <p className="font-medium text-sm">{preset.name}</p>
                  <p className="text-xs text-muted-foreground">{preset.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Custom Emojis */}
          <section className="space-y-3">
            <Label htmlFor="custom-emojis" className="text-base font-medium">
              Or Use Custom Emojis
            </Label>
            <Input
              id="custom-emojis"
              value={customEmojis}
              onChange={(e) => {
                setCustomEmojis(e.target.value)
                setSelectedPreset(null)
              }}
              placeholder="Paste your emoji palette here..."
            />
            <p className="text-sm text-muted-foreground">
              Leave empty to use the selected preset above
            </p>
          </section>

          {/* Settings */}
          <section className="space-y-4">
            <Label className="text-base font-medium">Art Settings</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Size: {artSize[0]}px</Label>
                <Slider
                  value={artSize}
                  onValueChange={setArtSize}
                  min={20}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Density: {density[0]}%</Label>
                <Slider
                  value={density}
                  onValueChange={setDensity}
                  min={10}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </section>

          {/* Generate Button */}
          <Button onClick={generateEmojiArt} className="w-full sm:w-auto">
            <Sparkles className="size-4 mr-2" />
            Generate Emoji Art
          </Button>

          {/* Output */}
          {generatedArt && (
            <section className="space-y-3">
              <Label className="text-base font-medium">Generated Art</Label>
              <div className="rounded-lg border bg-muted/30 p-6 overflow-x-auto">
                <pre className="font-mono text-sm whitespace-pre-wrap break-words">
                  {generatedArt}
                </pre>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generatedArt, "art")}
                >
                  {copied === "art" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy Art
                </Button>
              </div>
            </section>
          )}
        </TabsContent>

        <TabsContent value="image" className="space-y-6 mt-4">
          {/* Input Section */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Select Emoji Palette for Mosaic</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ART_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setSelectedPreset(preset)
                    setCustomEmojis("")
                  }}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-all",
                    selectedPreset?.name === preset.name && !customEmojis
                      ? "border-primary bg-muted/50"
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className="text-xl mb-1">{preset.emojis.slice(0, 5).join("")}</div>
                  <p className="font-medium text-sm">{preset.name}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Custom Emojis */}
          <section className="space-y-3">
            <Label htmlFor="custom-emojis-img" className="text-base font-medium">
              Or Use Custom Emojis
            </Label>
            <Input
              id="custom-emojis-img"
              value={customEmojis}
              onChange={(e) => {
                setCustomEmojis(e.target.value)
                setSelectedPreset(null)
              }}
              placeholder="Paste your emoji palette here..."
            />
          </section>

          {/* Generate and Download */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={generateImageArt}>
              <Sparkles className="size-4 mr-2" />
              Generate Mosaic
            </Button>
            <Button variant="outline" onClick={downloadAsImage}>
              <Download className="size-4 mr-2" />
              Download PNG
            </Button>
          </div>

          {/* Preview */}
          <canvas ref={canvasRef} className="hidden" />
          <section className="space-y-3">
            <Label className="text-base font-medium">Preview</Label>
            <div className="rounded-lg border bg-muted/30 p-4 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Click "Generate Mosaic" to preview</p>
                <div className="text-4xl">
                  {((customEmojis || selectedPreset?.emojis.join("") || "⭐")).slice(0, 9).split("").join(" ")}
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}

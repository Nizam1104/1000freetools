"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Sparkles, Type, Palette, Shapes } from "lucide-react"
import { cn } from "@/lib/utils"

interface WordCloudShape {
  id: string
  name: string
  icon: React.ReactNode
}

const SHAPES: WordCloudShape[] = [
  { id: "rectangle", name: "Rectangle", icon: <Shapes className="size-4" /> },
  { id: "circle", name: "Circle", icon: <Shapes className="size-4" /> },
  { id: "heart", name: "Heart", icon: <Shapes className="size-4" /> },
  { id: "star", name: "Star", icon: <Shapes className="size-4" /> },
]

const COLOR_THEMES = [
  { id: "rainbow", name: "Rainbow", colors: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"] },
  { id: "ocean", name: "Ocean", colors: ["#0c4a6e", "#0369a1", "#0284c7", "#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd"] },
  { id: "forest", name: "Forest", colors: ["#14532d", "#166534", "#15803d", "#16a34a", "#22c55e", "#4ade80", "#86efac"] },
  { id: "sunset", name: "Sunset", colors: ["#7c2d12", "#9a3412", "#c2410c", "#ea580c", "#f97316", "#fb923c", "#fdba74"] },
  { id: "monochrome", name: "Monochrome", colors: ["#18181b", "#27272a", "#3f3f46", "#52525b", "#71717a", "#a1a1aa", "#d4d4d8"] },
  { id: "pastel", name: "Pastel", colors: ["#fda4af", "#fdba74", "#fde047", "#86efac", "#93c5fd", "#c4b5fd", "#f9a8d4"] },
]

const SAMPLE_TEXTS = [
  "I love coding! Programming is fun. JavaScript Python React Node.js are my favorite technologies. Building apps is amazing!",
  "Happy birthday! Wishing you joy, love, and happiness. Celebrate with cake, balloons, and party!",
  "Welcome to our team! We are excited to have you. Together we will achieve great things!",
]

export default function EmojiWordCloud() {
  const [inputText, setInputText] = useState("")
  const [selectedShape, setSelectedShape] = useState("rectangle")
  const [selectedTheme, setSelectedTheme] = useState("rainbow")
  const [emojiDensity, setEmojiDensity] = useState([50])
  const [fontSize, setFontSize] = useState([24])
  const [generatedCloud, setGeneratedCloud] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const emojiMap: Record<string, string> = {
    "love": "❤️", "like": "👍", "happy": "😊", "joy": "😂", "fun": "🎉",
    "coding": "💻", "programming": "🖥️", "javascript": "📜", "python": "🐍",
    "react": "⚛️", "node": "🟢", "app": "📱", "build": "🔨", "create": "✨",
    "birthday": "🎂", "celebrate": "🎉", "cake": "🍰", "party": "🥳",
    "welcome": "👋", "team": "👥", "excited": "🤩", "great": "🌟",
    "amazing": "😍", "awesome": "🔥", "cool": "😎", "best": "🏆",
    "good": "✅", "bad": "❌", "yes": "✔️", "no": "✖️",
    "money": "💰", "time": "⏰", "idea": "💡", "star": "⭐",
    "heart": "❤️", "fire": "🔥", "water": "💧", "earth": "🌍",
    "sun": "☀️", "moon": "🌙", "cloud": "☁️", "rain": "🌧️",
    "snow": "❄️", "wind": "💨", "flower": "🌸", "tree": "🌳",
    "food": "🍕", "drink": "🍺", "music": "🎵", "game": "🎮",
    "sport": "⚽", "book": "📚", "school": "🏫", "work": "💼",
    "home": "🏠", "car": "🚗", "plane": "✈️", "boat": "⛵",
    "dog": "🐶", "cat": "🐱", "bird": "🐦", "fish": "🐟",
    "smile": "🙂", "laugh": "😂", "cry": "😢", "angry": "😠",
    "sleep": "😴", "eat": "🍽️", "run": "🏃", "walk": "🚶",
  }

  const generateWordCloud = useCallback(() => {
    if (!inputText.trim()) return

    const words = inputText.toLowerCase().split(/\s+/).filter((w) => w.length > 2)
    const wordCount = new Map<string, number>()
    
    words.forEach((word) => {
      wordCount.set(word, (wordCount.get(word) || 0) + 1)
    })

    const sortedWords = Array.from(wordCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50)

    const theme = COLOR_THEMES.find((t) => t.id === selectedTheme) || COLOR_THEMES[0]
    
    // Generate emoji cloud as text
    let cloudText = ""
    sortedWords.forEach(([word, count], idx) => {
      const emoji = emojiMap[word] || "✨"
      const size = Math.max(1, Math.min(5, Math.floor((count / sortedWords[0][1]) * 5)))
      const color = theme.colors[idx % theme.colors.length]
      
      // Create styled span (for HTML output)
      cloudText += `<span style="font-size: ${fontSize[0] + size * 4}px; color: ${color}; margin: 4px;">${emoji}</span>`
    })

    setGeneratedCloud(cloudText)
  }, [inputText, selectedTheme, emojiDensity, fontSize])

  const generateImageCloud = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = 800
    const height = 600
    canvas.width = width
    canvas.height = height

    // Clear and set background
    ctx.fillStyle = "#1a1a2e"
    ctx.fillRect(0, 0, width, height)

    const words = inputText.toLowerCase().split(/\s+/).filter((w) => w.length > 2)
    const wordCount = new Map<string, number>()
    
    words.forEach((word) => {
      wordCount.set(word, (wordCount.get(word) || 0) + 1)
    })

    const sortedWords = Array.from(wordCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)

    const theme = COLOR_THEMES.find((t) => t.id === selectedTheme) || COLOR_THEMES[0]

    // Place words/emojis
    sortedWords.forEach(([word, count], idx) => {
      const emoji = emojiMap[word] || "⭐"
      const size = Math.max(16, Math.min(48, fontSize[0] + (count * 4)))
      const color = theme.colors[idx % theme.colors.length]
      
      // Calculate position based on shape
      let x: number, y: number
      const angle = (idx / sortedWords.length) * Math.PI * 2
      const radius = Math.min(width, height) * 0.35 * (idx / sortedWords.length)
      
      if (selectedShape === "circle") {
        x = width / 2 + Math.cos(angle) * radius
        y = height / 2 + Math.sin(angle) * radius
      } else if (selectedShape === "heart") {
        const t = angle
        x = width / 2 + 16 * Math.pow(Math.sin(t), 3) * (idx / sortedWords.length + 0.5)
        y = height / 2 - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * (idx / sortedWords.length + 0.5)
      } else {
        x = 50 + (idx % 6) * (width / 7)
        y = 50 + Math.floor(idx / 6) * (height / 6)
      }

      ctx.font = `${size}px Arial`
      ctx.fillStyle = color
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(emoji, x, y)
    })
  }, [inputText, selectedShape, selectedTheme, fontSize])

  const downloadAsImage = useCallback(() => {
    generateImageCloud()
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "emoji-word-cloud.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [generateImageCloud])

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
      {/* Input Section */}
      <section className="space-y-3">
        <Label htmlFor="cloud-text" className="text-base font-medium">
          Enter Text for Word Cloud
        </Label>
        <Textarea
          id="cloud-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="font-sans text-sm min-h-[100px]"
          placeholder="Enter your text here. Words will be converted to relevant emojis..."
        />
        <div className="flex flex-wrap gap-2">
          {SAMPLE_TEXTS.map((text, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => loadSampleText(text)}
            >
              Sample {idx + 1}
            </Button>
          ))}
        </div>
      </section>

      {/* Shape Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Shapes className="size-4" />
          Cloud Shape
        </Label>
        <div className="flex flex-wrap gap-2">
          {SHAPES.map((shape) => (
            <Button
              key={shape.id}
              variant={selectedShape === shape.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedShape(shape.id)}
            >
              {shape.name}
            </Button>
          ))}
        </div>
      </section>

      {/* Color Theme */}
      <section className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Palette className="size-4" />
          Color Theme
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {COLOR_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={cn(
                "rounded-lg border p-3 text-left transition-all",
                selectedTheme === theme.id ? "border-primary bg-muted/50" : "hover:bg-muted/50"
              )}
            >
              <div className="flex gap-1 mb-2">
                {theme.colors.slice(0, 5).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-sm font-medium">{theme.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Settings */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Cloud Settings</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Emoji Density: {emojiDensity[0]}%</Label>
            <Slider
              value={emojiDensity}
              onValueChange={setEmojiDensity}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Base Font Size: {fontSize[0]}px</Label>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={12}
              max={48}
              step={2}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Generate Button */}
      <Button onClick={generateWordCloud} className="w-full sm:w-auto">
        <Sparkles className="size-4 mr-2" />
        Generate Word Cloud
      </Button>

      {/* Preview */}
      {generatedCloud && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Preview</Label>
          <div className="rounded-lg border bg-muted/30 p-6 min-h-[300px]">
            <div
              className="flex flex-wrap justify-center items-center"
              dangerouslySetInnerHTML={{ __html: generatedCloud }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(generatedCloud.replace(/<[^>]*>/g, ""), "text")}
            >
              {copied === "text" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy Emoji Text
            </Button>
            <Button variant="outline" size="sm" onClick={downloadAsImage}>
              <Download className="size-4 mr-2" />
              Download as Image
            </Button>
          </div>
        </section>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Emoji Mapping Reference */}
      <section className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Type className="size-4" />
          Word to Emoji Mapping
        </Label>
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
            {Object.entries(emojiMap).slice(0, 32).map(([word, emoji]) => (
              <div key={word} className="text-center p-2 bg-background rounded">
                <span className="text-xl">{emoji}</span>
                <p className="text-xs text-muted-foreground">{word}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-2">
        <Label className="text-base font-medium">Tips</Label>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Use descriptive text with repeated keywords for better results</li>
          <li>Longer text creates more diverse word clouds</li>
          <li>Try different shapes and color themes for variety</li>
          <li>Download as PNG for use in presentations or social media</li>
        </ul>
      </section>
    </div>
  )
}

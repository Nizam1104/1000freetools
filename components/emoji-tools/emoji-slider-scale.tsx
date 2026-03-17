"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Plus, Minus, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScalePreset {
  id: string
  name: string
  startEmoji: string
  endEmoji: string
  steps: number
  description: string
}

const SCALE_PRESETS: ScalePreset[] = [
  { id: "rating", name: "Rating Scale", startEmoji: "😢", endEmoji: "😍", steps: 5, description: "Customer satisfaction" },
  { id: "temperature", name: "Temperature", startEmoji: "🥶", endEmoji: "🥵", steps: 5, description: "Hot to cold" },
  { id: "size", name: "Size Scale", startEmoji: "🐜", endEmoji: "🐘", steps: 5, description: "Small to large" },
  { id: "speed", name: "Speed Scale", startEmoji: "🐌", endEmoji: "🚀", steps: 5, description: "Slow to fast" },
  { id: "energy", name: "Energy Level", startEmoji: "🔋", endEmoji: "⚡", steps: 5, description: "Low to high energy" },
  { id: "mood", name: "Mood Scale", startEmoji: "😡", endEmoji: "🤩", steps: 7, description: "Angry to excited" },
  { id: "pain", name: "Pain Scale", startEmoji: "🙂", endEmoji: "😭", steps: 10, description: "No pain to severe" },
  { id: "hunger", name: "Hunger Scale", startEmoji: "😋", endEmoji: "🍖", steps: 5, description: "Full to starving" },
]

export default function EmojiSliderScale() {
  const [startEmoji, setStartEmoji] = useState("😢")
  const [endEmoji, setEndEmoji] = useState("😍")
  const [steps, setSteps] = useState([5])
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal")
  const [showLabels, setShowLabels] = useState(true)
  const [labelText, setLabelText] = useState({ start: "Bad", end: "Excellent" })
  const [generatedScale, setGeneratedScale] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [backgroundColor, setBackgroundColor] = useState("transparent")

  const generateScale = useCallback(() => {
    const scale: string[] = []
    for (let i = 0; i < steps[0]; i++) {
      scale.push(startEmoji)
    }
    scale[scale.length - 1] = endEmoji
    setGeneratedScale(scale)
  }, [startEmoji, endEmoji, steps])

  const loadPreset = useCallback((preset: ScalePreset) => {
    setStartEmoji(preset.startEmoji)
    setEndEmoji(preset.endEmoji)
    setSteps([preset.steps])
    setLabelText({ start: preset.name.split(" ")[0], end: preset.name.split(" ")[1] || "Good" })
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const incrementSteps = () => setSteps([Math.min(20, steps[0] + 1)])
  const decrementSteps = () => setSteps([Math.max(2, steps[0] - 1)])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Preset Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Sparkles className="size-4" />
          Quick Presets
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SCALE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset)}
              className="rounded-lg border p-3 text-left hover:bg-muted/50 transition-all"
            >
              <div className="text-xl mb-1">{preset.startEmoji} → {preset.endEmoji}</div>
              <p className="font-medium text-sm">{preset.name}</p>
              <p className="text-xs text-muted-foreground">{preset.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Custom Scale Settings */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Customize Your Scale</Label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-emoji">Start Emoji</Label>
            <Input id="start-emoji" value={startEmoji} onChange={(e) => setStartEmoji(e.target.value[0] || "😢")} maxLength={2} className="text-2xl text-center" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-emoji">End Emoji</Label>
            <Input id="end-emoji" value={endEmoji} onChange={(e) => setEndEmoji(e.target.value[0] || "😍")} maxLength={2} className="text-2xl text-center" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Number of Steps: {steps[0]}</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={decrementSteps} disabled={steps[0] <= 2}><Minus className="size-4" /></Button>
            <Slider value={steps} onValueChange={setSteps} min={2} max={20} step={1} className="flex-1" />
            <Button variant="outline" size="icon" onClick={incrementSteps} disabled={steps[0] >= 20}><Plus className="size-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-label">Start Label</Label>
            <Input id="start-label" value={labelText.start} onChange={(e) => setLabelText({ ...labelText, start: e.target.value })} placeholder="e.g., Bad" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-label">End Label</Label>
            <Input id="end-label" value={labelText.end} onChange={(e) => setLabelText({ ...labelText, end: e.target.value })} placeholder="e.g., Excellent" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Orientation</Label>
          <div className="flex flex-wrap gap-2">
            <Button variant={orientation === "horizontal" ? "default" : "outline"} size="sm" onClick={() => setOrientation("horizontal")}>Horizontal</Button>
            <Button variant={orientation === "vertical" ? "default" : "outline"} size="sm" onClick={() => setOrientation("vertical")}>Vertical</Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="show-labels" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} className="rounded border-muted" />
          <Label htmlFor="show-labels" className="text-sm cursor-pointer">Show labels</Label>
        </div>

        <Button onClick={generateScale} className="w-full sm:w-auto">
          <Sparkles className="size-4 mr-2" />
          Generate Scale
        </Button>
      </section>

      {/* Preview */}
      {generatedScale.length > 0 && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Preview</Label>
          <div
            className={cn("rounded-lg border bg-muted/30 p-6", orientation === "horizontal" ? "" : "flex flex-col items-center")}
            style={{
              backgroundColor: backgroundColor === "transparent" ? undefined : backgroundColor,
              backgroundImage: backgroundColor === "transparent" ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%)" : undefined,
              backgroundSize: "16px 16px",
            }}
          >
            {orientation === "horizontal" ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  {generatedScale.map((emoji, idx) => (
                    <span key={idx} className="text-4xl flex-1 text-center">{emoji}</span>
                  ))}
                </div>
                {showLabels && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{labelText.start}</span>
                    <span>{labelText.end}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {showLabels && <span className="text-sm text-muted-foreground">{labelText.start}</span>}
                <div className="flex flex-col gap-1">
                  {generatedScale.map((emoji, idx) => (
                    <span key={idx} className="text-4xl">{emoji}</span>
                  ))}
                </div>
                {showLabels && <span className="text-sm text-muted-foreground">{labelText.end}</span>}
              </div>
            )}
          </div>
        </section>
      )}

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
          ].map((color) => (
            <button
              key={color.value}
              onClick={() => setBackgroundColor(color.value)}
              className={cn("w-8 h-8 rounded-lg border-2 transition-all", backgroundColor === color.value ? "border-primary ring-2 ring-ring" : "border-muted")}
              style={{ backgroundColor: color.value === "transparent" ? undefined : color.value }}
              title={color.name}
            />
          ))}
        </div>
      </section>

      {/* Export Options */}
      {generatedScale.length > 0 && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Export</Label>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedScale.join(" "), "scale")}>
              {copied === "scale" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy Scale
            </Button>
            <Button variant="outline" size="sm" onClick={downloadAsImage}>
              <Download className="size-4 mr-2" />
              Download
            </Button>
          </div>
        </section>
      )}

      {/* Use Cases */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Use Cases</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: "Customer Reviews", desc: "Rate products or services" },
            { title: "Feedback Forms", desc: "Collect user feedback" },
            { title: "Social Media Polls", desc: "Engage your audience" },
            { title: "Survey Questions", desc: "Make surveys fun" },
            { title: "Rating Systems", desc: "Visual rating display" },
            { title: "Progress Tracking", desc: "Show progress visually" },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border p-3 bg-muted/30">
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function downloadAsImage() {
  alert("In production, this would download the scale as an image.")
}

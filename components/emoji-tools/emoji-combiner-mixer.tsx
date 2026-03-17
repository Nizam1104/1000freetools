"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Layers, Sparkles, Trash2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmojiCombo {
  id: string
  emojis: string[]
  name: string
  description: string
}

const POPULAR_COMBOS: EmojiCombo[] = [
  { id: "1", emojis: ["❤️", "🔥"], name: "Burning Love", description: "Passionate love" },
  { id: "2", emojis: ["🌙", "⭐"], name: "Night Sky", description: "Peaceful night" },
  { id: "3", emojis: ["☀️", "🌊"], name: "Beach Day", description: "Sunny beach vibes" },
  { id: "4", emojis: ["🎉", "🎂"], name: "Birthday", description: "Celebration time" },
  { id: "5", emojis: ["💪", "🔥"], name: "Strong Fire", description: "Power and energy" },
  { id: "6", emojis: ["🧠", "💡"], name: "Bright Idea", description: "Smart thinking" },
  { id: "7", emojis: ["🎵", "🎶"], name: "Music Vibes", description: "Musical mood" },
  { id: "8", emojis: ["🌈", "☁️"], name: "Rainbow Clouds", description: "Hopeful weather" },
  { id: "9", emojis: ["👻", "🎃"], name: "Spooky Season", description: "Halloween vibes" },
  { id: "10", emojis: ["🎄", "⭐"], name: "Christmas Star", description: "Holiday spirit" },
]

const EMOJI_PALETTE = [
  "😀", "😂", "😍", "🥰", "😎", "🤔", "🙏", "💀", "🔥", "✨",
  "❤️", "💔", "💕", "💯", "👍", "👎", "👏", "🙌", "🤝", "💪",
  "🌟", "⭐", "🌙", "☀️", "🌈", "☁️", "🌊", "🎉", "🎊", "🎁",
  "🎂", "🍕", "🍔", "🐶", "🐱", "🐻", "🦊", "🦁", "🐯", "🐸",
]

export default function EmojiCombinerMixer() {
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])
  const [combinedResult, setCombinedResult] = useState<string>("")
  const [opacity, setOpacity] = useState([50])
  const [scale, setScale] = useState([1])
  const [rotation, setRotation] = useState([0])
  const [copied, setCopied] = useState<string | null>(null)

  const addEmoji = useCallback((emoji: string) => {
    setSelectedEmojis((prev) => [...prev, emoji])
  }, [])

  const removeEmoji = useCallback((index: number) => {
    setSelectedEmojis((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const clearAll = useCallback(() => {
    setSelectedEmojis([])
    setCombinedResult("")
  }, [])

  const combineEmojis = useCallback(() => {
    if (selectedEmojis.length === 0) return
    const combined = selectedEmojis.join("")
    setCombinedResult(combined)
  }, [selectedEmojis])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const loadCombo = useCallback((combo: EmojiCombo) => {
    setSelectedEmojis(combo.emojis)
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Emoji Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Select Emojis to Combine</Label>
        <div className="grid grid-cols-10 gap-2 p-4 rounded-lg border bg-muted/30">
          {EMOJI_PALETTE.map((emoji) => (
            <button key={emoji} onClick={() => addEmoji(emoji)} className="aspect-square flex items-center justify-center text-2xl hover:bg-muted rounded-lg transition-colors" title={`Add ${emoji}`}>
              {emoji}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Click emojis to add them to your combination</p>
      </section>

      {/* Selected Emojis */}
      {selectedEmojis.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Selected Emojis ({selectedEmojis.length})</Label>
            <Button variant="ghost" size="sm" onClick={clearAll}><Trash2 className="size-4 mr-2" />Clear All</Button>
          </div>
          <div className="flex flex-wrap gap-2 p-4 rounded-lg border bg-background">
            {selectedEmojis.map((emoji, index) => (
              <div key={index} className="relative group flex items-center justify-center w-12 h-12 rounded-lg bg-muted hover:bg-destructive/20 transition-colors">
                <span className="text-2xl">{emoji}</span>
                <button onClick={() => removeEmoji(index)} className="absolute -top-1 -right-1 size-4 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs">×</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Controls */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Combination Settings</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Opacity: {opacity[0]}%</Label>
            <Slider value={opacity} onValueChange={setOpacity} min={10} max={100} step={5} className="w-full" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Scale: {scale[0].toFixed(1)}x</Label>
            <Slider value={scale} onValueChange={setScale} min={0.5} max={2} step={0.1} className="w-full" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Rotation: {rotation[0]}°</Label>
            <Slider value={rotation} onValueChange={setRotation} min={0} max={360} step={15} className="w-full" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={combineEmojis} disabled={selectedEmojis.length === 0}><Layers className="size-4 mr-2" />Combine Emojis</Button>
        </div>
      </section>

      {/* Result */}
      {combinedResult && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Combined Result</Label>
          <div className="rounded-lg border bg-muted/30 p-6 flex items-center justify-center">
            <div className="text-center" style={{ transform: `scale(${scale[0]}) rotate(${rotation[0]}deg)`, opacity: opacity[0] / 100 }}>
              <span className="text-6xl">{combinedResult}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(combinedResult, "result")}>
              {copied === "result" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy
            </Button>
          </div>
        </section>
      )}

      {/* Popular Combos Gallery */}
      <section className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2"><Sparkles className="size-4" />Popular Combinations</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {POPULAR_COMBOS.map((combo) => (
            <button key={combo.id} onClick={() => loadCombo(combo)} className="rounded-lg border p-4 text-center hover:bg-muted/50 transition-all">
              <div className="text-3xl mb-2">{combo.emojis.join("")}</div>
              <p className="font-medium text-sm">{combo.name}</p>
              <p className="text-xs text-muted-foreground">{combo.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

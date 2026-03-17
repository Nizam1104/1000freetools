"use client"

import * as React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Download, Play, Pause, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimationPreset {
  id: string
  name: string
  type: "bounce" | "spin" | "pulse" | "shake" | "fade"
  description: string
}

const ANIMATION_PRESETS: AnimationPreset[] = [
  { id: "bounce", name: "Bounce", type: "bounce", description: "Up and down bounce" },
  { id: "spin", name: "Spin", type: "spin", description: "Rotating animation" },
  { id: "pulse", name: "Pulse", type: "pulse", description: "Growing and shrinking" },
  { id: "shake", name: "Shake", type: "shake", description: "Side to side shake" },
  { id: "fade", name: "Fade", type: "fade", description: "Opacity fade in/out" },
]

const EMOJI_OPTIONS = ["😀", "😂", "😍", "🥰", "😎", "🔥", "❤️", "💕", "✨", "🌟", "⭐", "🎉", "🎂", "🍕", "🐶", "🐱", "🦄", "🌈", "💪", "🙏"]

export default function AnimatedEmojiGifMaker() {
  const [selectedEmoji, setSelectedEmoji] = useState("😀")
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationPreset>(ANIMATION_PRESETS[0])
  const [speed, setSpeed] = useState([500])
  const [size, setSize] = useState([64])
  const [isPlaying, setIsPlaying] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [animationFrame, setAnimationFrame] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setAnimationFrame((prev) => (prev + 1) % 60)
    }, speed[0] / 10)

    return () => clearInterval(interval)
  }, [isPlaying, speed])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadGif = useCallback(() => {
    alert("In production, this would generate and download an animated GIF file.")
  }, [])

  const getAnimationStyle = () => {
    const baseStyle: React.CSSProperties = {
      fontSize: `${size[0]}px`,
      display: "inline-block",
    }

    switch (selectedAnimation.type) {
      case "bounce":
        baseStyle.transform = `translateY(${Math.sin(animationFrame * 0.2) * 10}px)`
        break
      case "spin":
        baseStyle.transform = `rotate(${animationFrame * 6}deg)`
        break
      case "pulse":
        baseStyle.transform = `scale(${1 + Math.sin(animationFrame * 0.2) * 0.2})`
        break
      case "shake":
        baseStyle.transform = `translateX(${Math.sin(animationFrame * 0.5) * 5}px)`
        break
      case "fade":
        baseStyle.opacity = 0.5 + Math.sin(animationFrame * 0.2) * 0.5
        break
    }

    return baseStyle
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="create" className="text-sm px-4 py-2"><Sparkles className="size-4 mr-2" />Create</TabsTrigger>
          <TabsTrigger value="presets" className="text-sm px-4 py-2">Presets</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 mt-4">
          {/* Emoji Selection */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Select Emoji</Label>
            <div className="flex flex-wrap gap-2 p-4 rounded-lg border bg-muted/30">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={cn("text-3xl p-2 rounded-lg hover:bg-muted transition-colors", selectedEmoji === emoji ? "bg-primary text-primary-foreground" : "")}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </section>

          {/* Animation Selection */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Animation Style</Label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {ANIMATION_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedAnimation(preset)}
                  className={cn("rounded-lg border p-3 text-center transition-all", selectedAnimation.id === preset.id ? "border-primary bg-muted/50" : "hover:bg-muted/50")}
                >
                  <p className="font-medium text-sm">{preset.name}</p>
                  <p className="text-xs text-muted-foreground">{preset.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Settings */}
          <section className="space-y-4">
            <div className="space-y-2">
              <Label>Animation Speed: {speed[0]}ms</Label>
              <Slider value={speed} onValueChange={setSpeed} min={100} max={1000} step={50} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label>Emoji Size: {size[0]}px</Label>
              <Slider value={size} onValueChange={setSize} min={32} max={128} step={8} className="w-full" />
            </div>
          </section>

          {/* Preview */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Preview</Label>
            <Card className="p-8">
              <CardContent className="flex flex-col items-center gap-4">
                <div style={getAnimationStyle()}>{selectedEmoji}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Action Buttons */}
          <section className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => copyToClipboard(selectedEmoji, "emoji")}>
              {copied === "emoji" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy Emoji
            </Button>
            <Button variant="outline" onClick={downloadGif}>
              <Download className="size-4 mr-2" />
              Download GIF
            </Button>
          </section>
        </TabsContent>

        <TabsContent value="presets" className="space-y-6 mt-4">
          <section className="space-y-3">
            <Label className="text-base font-medium">Quick Animation Presets</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ANIMATION_PRESETS.map((preset) => (
                <Card key={preset.id} className="cursor-pointer" onClick={() => setSelectedAnimation(preset)}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{preset.name}</p>
                      <p className="text-sm text-muted-foreground">{preset.description}</p>
                    </div>
                    <span className="text-4xl">😀</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-2">
        <Label className="text-base font-medium">Tips</Label>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Use animated emojis in Discord, Slack, or other platforms that support GIFs</li>
          <li>Slower speeds create smoother animations</li>
          <li>Combine with emoji mashups for unique effects</li>
          <li>Export as GIF for use in messages and social media</li>
        </ul>
      </section>
    </div>
  )
}

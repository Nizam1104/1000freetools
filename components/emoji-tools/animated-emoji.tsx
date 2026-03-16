"use client"

import * as React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Download, Play, Pause, RotateCcw, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimationFrame {
  id: string
  emoji: string
  duration: number
  effect: string
}

interface AnimationPreset {
  id: string
  name: string
  frames: string[]
  effects: string[]
  description: string
}

const ANIMATION_PRESETS: AnimationPreset[] = [
  { id: "bounce", name: "Bounce", frames: ["⬆️", "⬆️⬆️", "⬆️⬆️⬆️", "⬆️⬆️", "⬆️"], effects: ["scale"], description: "Up and down motion" },
  { id: "spin", name: "Spin", frames: ["↖️", "⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️"], effects: ["rotate"], description: "360 degree rotation" },
  { id: "pulse", name: "Pulse", frames: ["💓", "💗", "💓", "💗"], effects: ["scale"], description: "Heartbeat effect" },
  { id: "fade", name: "Fade", frames: ["🌟", "⭐", "✨", "⭐"], effects: ["opacity"], description: "Opacity transition" },
  { id: "shake", name: "Shake", frames: ["↙️", "↖️", "↙️", "↖️"], effects: ["translate"], description: "Side to side shake" },
  { id: "grow", name: "Grow", frames: ["🌱", "🌿", "🪴", "🌳"], effects: ["scale"], description: "Growing animation" },
  { id: "wink", name: "Wink", frames: ["🙂", "😉", "🙂", "😉"], effects: ["emoji"], description: "Winking face" },
  { id: "laugh", name: "Laugh", frames: ["🙂", "😊", "😂", "🤣"], effects: ["emoji"], description: "Laughing progression" },
]

const EMOJI_OPTIONS = [
  "😀", "😂", "😍", "🥰", "😎", "🤔", "🙏", "💀", "🔥", "✨",
  "❤️", "💔", "💕", "💯", "👍", "👎", "👏", "🙌", "🤝", "💪",
  "🌟", "⭐", "🌙", "☀️", "🌈", "☁️", "🌊", "💧", "🌸", "🎉",
  "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
  "🍕", "🍔", "🍟", "🌭", "🍿", "🧁", "🍰", "🍫", "🍬", "🍭",
]

export default function AnimatedEmoji() {
  const [selectedEmoji, setSelectedEmoji] = useState("😀")
  const [frames, setFrames] = useState<AnimationFrame[]>([
    { id: "1", emoji: "😀", duration: 500, effect: "none" },
    { id: "2", emoji: "😂", duration: 500, effect: "none" },
  ])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [animationSpeed, setAnimationSpeed] = useState([500])
  const [loopCount, setLoopCount] = useState([1])
  const [selectedEffect, setSelectedEffect] = useState("none")
  const [outputFormat, setOutputFormat] = useState<"gif" | "apng">("gif")
  const [copied, setCopied] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const frameTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const addFrame = useCallback(() => {
    const newFrame: AnimationFrame = {
      id: Date.now().toString(),
      emoji: selectedEmoji,
      duration: animationSpeed[0],
      effect: selectedEffect,
    }
    setFrames((prev) => [...prev, newFrame])
  }, [selectedEmoji, animationSpeed, selectedEffect])

  const removeFrame = useCallback((id: string) => {
    setFrames((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const updateFrame = useCallback((id: string, updates: Partial<AnimationFrame>) => {
    setFrames((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }, [])

  const loadPreset = useCallback((preset: AnimationPreset) => {
    const newFrames: AnimationFrame[] = preset.frames.map((emoji, index) => ({
      id: `${preset.id}-${index}`,
      emoji,
      duration: 300,
      effect: preset.effects[0] || "none",
    }))
    setFrames(newFrames)
  }, [])

  const playAnimation = useCallback(() => {
    if (frames.length === 0) return
    setIsPlaying(true)
    let frameIndex = 0
    let loop = 0

    const playFrame = () => {
      setCurrentFrame(frameIndex)
      const frame = frames[frameIndex]
      
      frameTimeoutRef.current = setTimeout(() => {
        frameIndex = (frameIndex + 1) % frames.length
        if (frameIndex === 0) {
          loop++
          if (loop >= loopCount[0] && loopCount[0] > 0) {
            setIsPlaying(false)
            setCurrentFrame(0)
            return
          }
        }
        playFrame()
      }, frame.duration)
    }

    playFrame()
  }, [frames, loopCount])

  const stopAnimation = useCallback(() => {
    setIsPlaying(false)
    setCurrentFrame(0)
    if (frameTimeoutRef.current) {
      clearTimeout(frameTimeoutRef.current)
    }
  }, [])

  const resetAnimation = useCallback(() => {
    stopAnimation()
    setFrames([
      { id: "1", emoji: "😀", duration: 500, effect: "none" },
      { id: "2", emoji: "😂", duration: 500, effect: "none" },
    ])
  }, [stopAnimation])

  const generateGIF = useCallback(() => {
    // For a real implementation, you would use a library like gif.js
    // This is a simplified version that creates a preview
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 256
    canvas.width = size
    canvas.height = size

    const frame = frames[currentFrame]
    ctx.clearRect(0, 0, size, size)
    ctx.font = "180px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(frame.emoji, size / 2, size / 2)

    // In a real implementation, you would capture all frames and create a GIF
    alert("GIF generation would require a library like gif.js. This is a preview of the current frame.")
  }, [frames, currentFrame])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (frameTimeoutRef.current) {
        clearTimeout(frameTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="create" className="text-sm px-4 py-2">
            <Plus className="size-4 mr-2" />
            Create Animation
          </TabsTrigger>
          <TabsTrigger value="presets" className="text-sm px-4 py-2">
            <Play className="size-4 mr-2" />
            Presets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 mt-4">
          {/* Emoji Selection */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Select Emoji for Frame</Label>
            <div className="grid grid-cols-10 gap-2 p-4 rounded-lg border bg-muted/30">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={cn(
                    "aspect-square flex items-center justify-center text-2xl rounded-lg transition-colors",
                    selectedEmoji === emoji ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </section>

          {/* Effect Selection */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Animation Effect</Label>
            <div className="flex flex-wrap gap-2">
              {["none", "bounce", "spin", "pulse", "fade", "shake"].map((effect) => (
                <Button
                  key={effect}
                  variant={selectedEffect === effect ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedEffect(effect)}
                >
                  {effect.charAt(0).toUpperCase() + effect.slice(1)}
                </Button>
              ))}
            </div>
          </section>

          {/* Frame Duration */}
          <section className="space-y-2">
            <Label className="text-sm">Frame Duration: {animationSpeed[0]}ms</Label>
            <Slider
              value={animationSpeed}
              onValueChange={setAnimationSpeed}
              min={100}
              max={2000}
              step={100}
              className="w-full"
            />
          </section>

          {/* Add Frame Button */}
          <Button onClick={addFrame} className="w-full sm:w-auto">
            <Plus className="size-4 mr-2" />
            Add Frame
          </Button>

          {/* Frames Timeline */}
          {frames.length > 0 && (
            <section className="space-y-3">
              <Label className="text-base font-medium">Animation Frames ({frames.length})</Label>
              <div className="flex gap-2 overflow-x-auto p-4 rounded-lg border bg-muted/30">
                {frames.map((frame, index) => (
                  <div
                    key={frame.id}
                    className={cn(
                      "flex-shrink-0 p-3 rounded-lg border bg-background min-w-[80px] text-center relative",
                      currentFrame === index && isPlaying ? "border-primary ring-2 ring-ring" : ""
                    )}
                  >
                    <span className="text-3xl">{frame.emoji}</span>
                    <p className="text-xs text-muted-foreground mt-1">{frame.duration}ms</p>
                    {frames.length > 1 && (
                      <button
                        onClick={() => removeFrame(frame.id)}
                        className="absolute -top-1 -right-1 size-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Playback Controls */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Playback</Label>
            <div className="flex flex-wrap gap-2">
              {!isPlaying ? (
                <Button onClick={playAnimation} disabled={frames.length === 0}>
                  <Play className="size-4 mr-2" />
                  Play
                </Button>
              ) : (
                <Button variant="destructive" onClick={stopAnimation}>
                  <Pause className="size-4 mr-2" />
                  Stop
                </Button>
              )}
              <Button variant="outline" onClick={resetAnimation}>
                <RotateCcw className="size-4 mr-2" />
                Reset
              </Button>
            </div>
          </section>

          {/* Loop Count */}
          <section className="space-y-2">
            <Label className="text-sm">Loop Count: {loopCount[0] === 0 ? "Infinite" : loopCount[0]}</Label>
            <Slider
              value={loopCount}
              onValueChange={setLoopCount}
              min={0}
              max={10}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">0 = infinite loop</p>
          </section>

          {/* Preview */}
          {frames.length > 0 && (
            <section className="space-y-3">
              <Label className="text-base font-medium">Preview</Label>
              <div className="rounded-lg border bg-muted/30 p-8 flex items-center justify-center min-h-[200px]">
                <span
                  className={cn(
                    "text-8xl transition-all duration-300",
                    selectedEffect === "bounce" && "animate-bounce",
                    selectedEffect === "pulse" && "animate-pulse",
                  )}
                  style={{
                    transform: currentFrame < frames.length ? `scale(${1 + (currentFrame / frames.length) * 0.2})` : "scale(1)",
                  }}
                >
                  {frames[currentFrame]?.emoji || selectedEmoji}
                </span>
              </div>
            </section>
          )}

          {/* Export Options */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Export</Label>
            <div className="flex flex-wrap gap-2">
              <Button onClick={generateGIF} disabled={frames.length === 0}>
                <Download className="size-4 mr-2" />
                Export as GIF
              </Button>
              <Button variant="outline" disabled={frames.length === 0}>
                <Download className="size-4 mr-2" />
                Export as APNG
              </Button>
              <Button
                variant="outline"
                onClick={() => copyToClipboard(frames.map((f) => f.emoji).join(""), "frames")}
                disabled={frames.length === 0}
              >
                {copied === "frames" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy Frames
              </Button>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="presets" className="space-y-6 mt-4">
          {/* Animation Presets */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Animation Presets</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ANIMATION_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset)}
                  className="rounded-lg border p-4 text-left hover:bg-muted/50 transition-all"
                >
                  <div className="text-3xl mb-2">{preset.frames.join(" ")}</div>
                  <p className="font-medium text-sm">{preset.name}</p>
                  <p className="text-xs text-muted-foreground">{preset.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Preview Selected Preset */}
          {frames.length > 0 && (
            <section className="space-y-3">
              <Label className="text-base font-medium">Preview</Label>
              <div className="rounded-lg border bg-muted/30 p-8 flex items-center justify-center min-h-[200px]">
                <span className="text-8xl">
                  {frames[currentFrame]?.emoji || frames[0]?.emoji}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {!isPlaying ? (
                  <Button onClick={playAnimation}>
                    <Play className="size-4 mr-2" />
                    Play Animation
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={stopAnimation}>
                    <Pause className="size-4 mr-2" />
                    Stop
                  </Button>
                )}
              </div>
            </section>
          )}
        </TabsContent>
      </Tabs>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

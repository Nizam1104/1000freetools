"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Sparkles, Download, Shuffle } from "lucide-react"
import { cn } from "@/lib/utils"

interface MashupPreset {
  id: string
  emoji1: string
  emoji2: string
  result: string
  name: string
}

const MASHUP_PRESETS: MashupPreset[] = [
  { id: "1", emoji1: "❤️", emoji2: "🔥", result: "❤️🔥", name: "Burning Heart" },
  { id: "2", emoji1: "🌙", emoji2: "⭐", result: "🌙⭐", name: "Night Sky" },
  { id: "3", emoji1: "🐱", emoji2: "👑", result: "🐱👑", name: "Cat King" },
  { id: "4", emoji1: "🍕", emoji2: "❤️", result: "🍕❤️", name: "Pizza Love" },
  { id: "5", emoji1: "🦄", emoji2: "✨", result: "🦄✨", name: "Magic Unicorn" },
  { id: "6", emoji1: "🌈", emoji2: "💕", result: "🌈💕", name: "Rainbow Love" },
  { id: "7", emoji1: "🎉", emoji2: "🎂", result: "🎉🎂", name: "Birthday Party" },
  { id: "8", emoji1: "👻", emoji2: "🎃", result: "👻🎃", name: "Spooky Halloween" },
  { id: "9", emoji1: "🎄", emoji2: "⭐", result: "🎄⭐", name: "Christmas Star" },
  { id: "10", emoji1: "💪", emoji2: "🔥", result: "💪🔥", name: "Strong Fire" },
  { id: "11", emoji1: "🧠", emoji2: "💡", result: "🧠💡", name: "Bright Idea" },
  { id: "12", emoji1: "🎵", emoji2: "🎶", result: "🎵🎶", name: "Music Vibes" },
]

const EMOJI_SELECT_1 = ["😀", "😂", "😍", "🥰", "😎", "🤔", "🙏", "💀", "🔥", "✨", "❤️", "💔", "💕", "👍", "👏", "🌟", "⭐", "🌙", "☀️", "🌈"]
const EMOJI_SELECT_2 = ["🐶", "🐱", "🐻", "🦊", "🦁", "🐯", "🐸", "🐵", "🐔", "🐧", "🍕", "🍔", "🍟", "🎂", "🎉", "🎁", "🎄", "🎃", "🎈", "🎯"]

export default function EmojiKitchenMashup() {
  const [emoji1, setEmoji1] = useState("❤️")
  const [emoji2, setEmoji2] = useState("🔥")
  const [mashupResult, setMashupResult] = useState("❤️🔥")
  const [copied, setCopied] = useState<string | null>(null)
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

  const createMashup = useCallback(() => {
    const mashups = [
      `${emoji1}${emoji2}`,
      `${emoji2}${emoji1}`,
      `${emoji1}${emoji1}${emoji2}`,
      `${emoji1}${emoji2}${emoji2}`,
      `${emoji1}✨${emoji2}`,
      `${emoji1}💕${emoji2}`,
    ]
    const random = mashups[Math.floor(Math.random() * mashups.length)]
    setMashupResult(random)
    setSelectedPreset(null)
  }, [emoji1, emoji2])

  const randomMashup = useCallback(() => {
    const e1 = EMOJI_SELECT_1[Math.floor(Math.random() * EMOJI_SELECT_1.length)]
    const e2 = EMOJI_SELECT_2[Math.floor(Math.random() * EMOJI_SELECT_2.length)]
    setEmoji1(e1)
    setEmoji2(e2)
    setMashupResult(`${e1}${e2}`)
    setSelectedPreset(null)
  }, [])

  const loadPreset = useCallback((preset: MashupPreset) => {
    setEmoji1(preset.emoji1)
    setEmoji2(preset.emoji2)
    setMashupResult(preset.result)
    setSelectedPreset(preset.id)
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

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="create" className="text-sm px-4 py-2"><Sparkles className="size-4 mr-2" />Create</TabsTrigger>
          <TabsTrigger value="presets" className="text-sm px-4 py-2">Presets</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 mt-4">
          {/* Emoji Selection */}
          <section className="space-y-4">
            <Label className="text-base font-medium">Select Your Emojis</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Emoji 1</Label>
                <div className="flex flex-wrap gap-2 p-3 rounded-lg border bg-muted/30">
                  {EMOJI_SELECT_1.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setEmoji1(emoji)}
                      className={cn("text-2xl p-2 rounded-lg hover:bg-muted transition-colors", emoji1 === emoji ? "bg-primary text-primary-foreground" : "")}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Emoji 2</Label>
                <div className="flex flex-wrap gap-2 p-3 rounded-lg border bg-muted/30">
                  {EMOJI_SELECT_2.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setEmoji2(emoji)}
                      className={cn("text-2xl p-2 rounded-lg hover:bg-muted transition-colors", emoji2 === emoji ? "bg-primary text-primary-foreground" : "")}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Mashup Preview */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Mashup Preview</Label>
            <Card className="p-8">
              <CardContent className="flex flex-col items-center gap-4">
                <div className="text-6xl">{mashupResult}</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-2xl">{emoji1}</span>
                  <span>+</span>
                  <span className="text-2xl">{emoji2}</span>
                  <span>=</span>
                  <span className="text-2xl">{mashupResult}</span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Action Buttons */}
          <section className="flex flex-wrap gap-2">
            <Button onClick={createMashup}>
              <Shuffle className="size-4 mr-2" />
              Create Mashup
            </Button>
            <Button variant="outline" onClick={randomMashup}>
              <Sparkles className="size-4 mr-2" />
              Random
            </Button>
            <Button variant="outline" onClick={() => copyToClipboard(mashupResult, "mashup")}>
              {copied === "mashup" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy
            </Button>
          </section>
        </TabsContent>

        <TabsContent value="presets" className="space-y-6 mt-4">
          <section className="space-y-3">
            <Label className="text-base font-medium">Popular Mashups</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {MASHUP_PRESETS.map((preset) => (
                <Card
                  key={preset.id}
                  className={cn("cursor-pointer transition-all hover:scale-105", selectedPreset === preset.id ? "border-primary bg-muted/50" : "")}
                  onClick={() => loadPreset(preset)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{preset.result}</div>
                    <p className="font-medium text-sm">{preset.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{preset.emoji1} + {preset.emoji2}</p>
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
          <li>Combine emojis that relate to each other for meaningful mashups</li>
          <li>Try different orders - sometimes emoji2 + emoji1 looks better</li>
          <li>Add sparkles ✨ or hearts 💕 between emojis for extra flair</li>
          <li>Use mashups in social media bios, messages, and posts</li>
        </ul>
      </section>
    </div>
  )
}

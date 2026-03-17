"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Smartphone, Monitor, Apple } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlatformStyle {
  platform: string
  icon: React.ReactNode
  emojis: Record<string, string>
  description: string
}

const PLATFORM_STYLES: PlatformStyle[] = [
  {
    platform: "Apple",
    icon: <Apple className="size-4" />,
    emojis: {
      "😀": "😀", "😂": "😂", "😍": "😍", "🥰": "🥰", "😎": "😎",
      "🔥": "🔥", "❤️": "❤️", "💕": "💕", "👍": "👍", "🙏": "🙏",
      "💀": "💀", "✨": "✨", "🌟": "🌟", "⭐": "⭐", "🌙": "🌙",
      "🎉": "🎉", "🎂": "🎂", "🍕": "🍕", "🐶": "🐶", "🐱": "🐱",
    },
    description: "iOS, macOS emoji style",
  },
  {
    platform: "Google",
    icon: <Smartphone className="size-4" />,
    emojis: {
      "😀": "😀", "😂": "😂", "😍": "😍", "🥰": "🥰", "😎": "😎",
      "🔥": "🔥", "❤️": "❤️", "💕": "💕", "👍": "👍", "🙏": "🙏",
      "💀": "💀", "✨": "✨", "🌟": "🌟", "⭐": "⭐", "🌙": "🌙",
      "🎉": "🎉", "🎂": "🎂", "🍕": "🍕", "🐶": "🐶", "🐱": "🐱",
    },
    description: "Android emoji style",
  },
  {
    platform: "Samsung",
    icon: <Smartphone className="size-4" />,
    emojis: {
      "😀": "😀", "😂": "😂", "😍": "😍", "🥰": "🥰", "😎": "😎",
      "🔥": "🔥", "❤️": "❤️", "💕": "💕", "👍": "👍", "🙏": "🙏",
      "💀": "💀", "✨": "✨", "🌟": "🌟", "⭐": "⭐", "🌙": "🌙",
      "🎉": "🎉", "🎂": "🎂", "🍕": "🍕", "🐶": "🐶", "🐱": "🐱",
    },
    description: "Samsung One UI style",
  },
  {
    platform: "Microsoft",
    icon: <Monitor className="size-4" />,
    emojis: {
      "😀": "😀", "😂": "😂", "😍": "😍", "🥰": "🥰", "😎": "😎",
      "🔥": "🔥", "❤️": "❤️", "💕": "💕", "👍": "👍", "🙏": "🙏",
      "💀": "💀", "✨": "✨", "🌟": "🌟", "⭐": "⭐", "🌙": "🌙",
      "🎉": "🎉", "🎂": "🎂", "🍕": "🍕", "🐶": "🐶", "🐱": "🐱",
    },
    description: "Windows emoji style",
  },
  {
    platform: "Facebook",
    icon: <Monitor className="size-4" />,
    emojis: {
      "😀": "😀", "😂": "😂", "😍": "😍", "🥰": "🥰", "😎": "😎",
      "🔥": "🔥", "❤️": "❤️", "💕": "💕", "👍": "👍", "🙏": "🙏",
      "💀": "💀", "✨": "✨", "🌟": "🌟", "⭐": "⭐", "🌙": "🌙",
      "🎉": "🎉", "🎂": "🎂", "🍕": "🍕", "🐶": "🐶", "🐱": "🐱",
    },
    description: "Facebook/Messenger style",
  },
  {
    platform: "Twitter",
    icon: <Monitor className="size-4" />,
    emojis: {
      "😀": "😀", "😂": "😂", "😍": "😍", "🥰": "🥰", "😎": "😎",
      "🔥": "🔥", "❤️": "❤️", "💕": "💕", "👍": "👍", "🙏": "🙏",
      "💀": "💀", "✨": "✨", "🌟": "🌟", "⭐": "⭐", "🌙": "🌙",
      "🎉": "🎉", "🎂": "🎂", "🍕": "🍕", "🐶": "🐶", "🐱": "🐱",
    },
    description: "Twitter/X emoji style",
  },
]

const COMMON_EMOJIS = ["😀", "😂", "😍", "🥰", "😎", "🔥", "❤️", "💕", "👍", "🙏", "💀", "✨", "🌟", "⭐", "🌙", "🎉", "🎂", "🍕", "🐶", "🐱"]

export default function EmojiStyleConverter() {
  const [selectedEmoji, setSelectedEmoji] = useState("😀")
  const [copied, setCopied] = useState<string | null>(null)

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
      <Tabs defaultValue="compare" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="compare" className="text-sm px-4 py-2">Compare</TabsTrigger>
          <TabsTrigger value="select" className="text-sm px-4 py-2">Select Emoji</TabsTrigger>
        </TabsList>

        <TabsContent value="compare" className="space-y-6 mt-4">
          {/* Emoji Selection */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Select an Emoji to Compare</Label>
            <div className="flex flex-wrap gap-2 p-4 rounded-lg border bg-muted/30">
              {COMMON_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={cn("text-3xl p-3 rounded-lg hover:bg-muted transition-colors", selectedEmoji === emoji ? "bg-primary text-primary-foreground" : "")}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </section>

          {/* Platform Comparison */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Platform Comparison for {selectedEmoji}</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PLATFORM_STYLES.map((platform) => (
                <Card key={platform.platform}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      {platform.icon}
                      <CardTitle className="text-base">{platform.platform}</CardTitle>
                    </div>
                    <CardDescription>{platform.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <span className="text-6xl">{platform.emojis[selectedEmoji] || selectedEmoji}</span>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(platform.emojis[selectedEmoji] || selectedEmoji, `${platform.platform}-${selectedEmoji}`)}>
                      {copied === `${platform.platform}-${selectedEmoji}` ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="select" className="space-y-6 mt-4">
          <section className="space-y-3">
            <Label className="text-base font-medium">Browse All Emojis</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COMMON_EMOJIS.map((emoji) => (
                <Card key={emoji} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedEmoji(emoji)}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="text-4xl">{emoji}</span>
                    <div className="flex gap-1">
                      {PLATFORM_STYLES.slice(0, 3).map((p) => (
                        <span key={p.platform} className="text-lg">{p.emojis[emoji] || emoji}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-2">
        <Label className="text-base font-medium">About Emoji Styles</Label>
        <p className="text-sm text-muted-foreground">
          Emojis can look different on various platforms. Apple, Google, Samsung, Microsoft, Facebook, and Twitter all have their own emoji designs. 
          This tool helps you see how your emojis will appear on different devices and platforms.
        </p>
      </section>
    </div>
  )
}

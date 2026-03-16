"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmojiCount {
  emoji: string
  count: number
  name: string
}

export default function EmojiCounter() {
  const [text, setText] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const emojiRegex = useMemo(
    () =>
      /[\p{Emoji_Presentation}\p{Extended_Pictographic}](?:\uFE0F)?(?:\u200D[\p{Emoji_Presentation}\p{Extended_Pictographic}](?:\uFE0F)?)*|[\u{1F1E6}-\u{1F1FF}]{2}|[#*0-9]\uFE0F?\u20E3/gu,
    []
  )

  const analysis = useMemo(() => {
    if (!text) {
      return {
        totalEmojis: 0,
        uniqueEmojis: 0,
        characterCount: 0,
        characterCountNoEmoji: 0,
        emojiDensity: 0,
        emojiBytes: 0,
        emojiList: [] as EmojiCount[],
        twitterLength: 0,
      }
    }

    const matches = text.match(emojiRegex) || []
    const emojiMap = new Map<string, number>()

    matches.forEach((emoji) => {
      emojiMap.set(emoji, (emojiMap.get(emoji) || 0) + 1)
    })

    const emojiList: EmojiCount[] = Array.from(emojiMap.entries())
      .map(([emoji, count]) => ({
        emoji,
        count,
        name: getEmojiName(emoji),
      }))
      .sort((a, b) => b.count - a.count)

    const totalEmojis = matches.length
    const uniqueEmojis = emojiMap.size
    const characterCount = text.length
    const textWithoutEmoji = text.replace(emojiRegex, "")
    const characterCountNoEmoji = textWithoutEmoji.length
    const emojiDensity = characterCount > 0 ? ((totalEmojis / characterCount) * 100).toFixed(1) : "0"
    const emojiBytes = new TextEncoder().encode(matches.join("")).length

    // Twitter counts emojis as 2 characters mostly
    const twitterLength = calculateTwitterLength(text, emojiRegex)

    return {
      totalEmojis,
      uniqueEmojis,
      characterCount,
      characterCountNoEmoji,
      emojiDensity,
      emojiBytes,
      emojiList,
      twitterLength,
    }
  }, [text, emojiRegex])

  const calculateTwitterLength = (text: string, regex: RegExp): number => {
    // Twitter's character counting is complex - simplified version
    // Emojis generally count as 2 characters
    const matches = text.match(regex) || []
    const textWithoutEmoji = text.replace(regex, "")
    return textWithoutEmoji.length + matches.length * 2
  }

  const getEmojiName = (emoji: string): string => {
    const emojiNames: Record<string, string> = {
      "😀": "Grinning Face",
      "😂": "Tears of Joy",
      "❤️": "Red Heart",
      "🔥": "Fire",
      "👍": "Thumbs Up",
      "🙏": "Folded Hands",
      "💀": "Skull",
      "🤔": "Thinking",
      "😭": "Crying",
      "🎉": "Party Popper",
      "✨": "Sparkles",
      "👀": "Eyes",
      "💯": "Hundred Points",
      "🥺": "Pleading",
      "😍": "Heart Eyes",
      "🤣": "ROFL",
      "😊": "Smiling",
      "🙌": "Raised Hands",
      "👏": "Clapping",
      "💕": "Two Hearts",
    }
    return emojiNames[emoji] || "Emoji"
  }

  const copyToClipboard = useCallback(async (content: string, key: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const removeEmojis = useCallback(() => {
    setText(text.replace(emojiRegex, ""))
  }, [text, emojiRegex])

  const extractEmojis = useCallback(() => {
    const matches = text.match(emojiRegex) || []
    setText(matches.join(" "))
  }, [text, emojiRegex])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="emoji-text" className="text-base font-medium">
            Text to Analyze
          </Label>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(text, "input")} className="h-7">
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => setText("")} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        <Textarea
          id="emoji-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="font-sans text-sm min-h-[150px]"
          placeholder="Paste or type your text here to count emojis..."
        />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={removeEmojis}>
            Remove Emojis
          </Button>
          <Button variant="outline" size="sm" onClick={extractEmojis}>
            Extract Only Emojis
          </Button>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold">Statistics</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{analysis.totalEmojis}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Emojis</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{analysis.uniqueEmojis}</p>
            <p className="text-xs text-muted-foreground mt-1">Unique Emojis</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{analysis.characterCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Characters</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{analysis.characterCountNoEmoji}</p>
            <p className="text-xs text-muted-foreground mt-1">Text Only</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{analysis.emojiDensity}%</p>
            <p className="text-xs text-muted-foreground mt-1">Emoji Density</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{analysis.twitterLength}</p>
            <p className="text-xs text-muted-foreground mt-1">Twitter Length</p>
          </div>
        </div>

        {/* Twitter Character Limit Warning */}
        {analysis.twitterLength > 280 && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 flex items-center gap-3">
            <Info className="size-5 text-destructive shrink-0" />
            <div>
              <p className="text-sm font-medium text-destructive">Exceeds Twitter character limit</p>
              <p className="text-xs text-muted-foreground">
                Your text is {analysis.twitterLength - 280} characters over the 280 character limit
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Emoji Breakdown */}
      {analysis.emojiList.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Emoji Breakdown</h3>
          <div className="rounded-lg border bg-background divide-y">
            {analysis.emojiList.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.emoji}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">{item.count}x</span>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(item.emoji, item.emoji)}
                    className="h-7"
                  >
                    {copied === item.emoji ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Social Media Limits */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Social Media Limits</h3>
        <div className="rounded-lg border bg-background divide-y">
          <div className="flex items-center justify-between p-3">
            <span className="text-sm font-medium">Twitter / X</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all",
                    analysis.twitterLength > 280 ? "bg-destructive" : "bg-primary"
                  )}
                  style={{ width: `${Math.min((analysis.twitterLength / 280) * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground min-w-[60px] text-right">
                {analysis.twitterLength}/280
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-sm font-medium">Instagram Caption</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all",
                    analysis.characterCount > 2200 ? "bg-destructive" : "bg-primary"
                  )}
                  style={{ width: `${Math.min((analysis.characterCount / 2200) * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground min-w-[60px] text-right">
                {analysis.characterCount}/2200
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-sm font-medium">Instagram Bio</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all",
                    analysis.characterCount > 150 ? "bg-destructive" : "bg-primary"
                  )}
                  style={{ width: `${Math.min((analysis.characterCount / 150) * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground min-w-[60px] text-right">
                {analysis.characterCount}/150
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-sm font-medium">SMS Message</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all",
                    analysis.characterCount > 160 ? "bg-destructive" : "bg-primary"
                  )}
                  style={{ width: `${Math.min((analysis.characterCount / 160) * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground min-w-[60px] text-right">
                {analysis.characterCount}/160
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

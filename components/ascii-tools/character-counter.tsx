"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export default function CharacterCounter() {
  const [inputText, setInputText] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const stats = useMemo(() => {
    if (!inputText) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        uniqueChars: 0,
        readingTime: "0 sec",
        speakingTime: "0 sec",
        charFrequency: [] as { char: string; count: number }[],
      }
    }

    const characters = inputText.length
    const charactersNoSpaces = inputText.replace(/\s/g, "").length
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0
    const sentences = inputText.split(/[.!?]+/).filter((s) => s.trim()).length
    const paragraphs = inputText.split(/\n\s*\n/).filter((p) => p.trim()).length
    const lines = inputText.split("\n").length

    const uniqueChars = new Set(inputText.split("")).size

    const readingTimeMs = (words / 200) * 60 * 1000
    const speakingTimeMs = (words / 150) * 60 * 1000

    const formatTime = (ms: number) => {
      const mins = Math.floor(ms / 60000)
      const secs = Math.floor((ms % 60000) / 1000)
      if (mins > 0) return `${mins} min ${secs} sec`
      return `${secs} sec`
    }

    const charFrequency = Object.entries(
      inputText.split("").reduce((acc, char) => {
        if (!/\s/.test(char)) {
          acc[char] = (acc[char] || 0) + 1
        }
        return acc
      }, {} as Record<string, number>)
    )
      .map(([char, count]) => ({ char, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      uniqueChars,
      readingTime: formatTime(readingTimeMs),
      speakingTime: formatTime(speakingTimeMs),
      charFrequency,
    }
  }, [inputText])

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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-text" className="text-base font-medium">
            Input Text
          </Label>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(inputText, "input")}
            >
              {copied === "input" ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInputText("")}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>

        <Textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="font-mono text-sm min-h-[150px]"
          placeholder="Enter or paste your text here..."
        />
      </section>

      {/* Stats Grid */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold">Statistics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg border bg-background p-4 text-center">
            <p className="text-3xl font-bold">{stats.characters}</p>
            <p className="text-sm text-muted-foreground">Characters</p>
          </div>
          <div className="rounded-lg border bg-background p-4 text-center">
            <p className="text-3xl font-bold">{stats.charactersNoSpaces}</p>
            <p className="text-sm text-muted-foreground">No Spaces</p>
          </div>
          <div className="rounded-lg border bg-background p-4 text-center">
            <p className="text-3xl font-bold">{stats.words}</p>
            <p className="text-sm text-muted-foreground">Words</p>
          </div>
          <div className="rounded-lg border bg-background p-4 text-center">
            <p className="text-3xl font-bold">{stats.sentences}</p>
            <p className="text-sm text-muted-foreground">Sentences</p>
          </div>
          <div className="rounded-lg border bg-background p-4 text-center">
            <p className="text-3xl font-bold">{stats.paragraphs}</p>
            <p className="text-sm text-muted-foreground">Paragraphs</p>
          </div>
          <div className="rounded-lg border bg-background p-4 text-center">
            <p className="text-3xl font-bold">{stats.lines}</p>
            <p className="text-sm text-muted-foreground">Lines</p>
          </div>
          <div className="rounded-lg border bg-background p-4 text-center">
            <p className="text-3xl font-bold">{stats.uniqueChars}</p>
            <p className="text-sm text-muted-foreground">Unique Chars</p>
          </div>
          <div className="rounded-lg border bg-background p-4 text-center">
            <p className="text-lg font-bold">{stats.readingTime}</p>
            <p className="text-sm text-muted-foreground">Reading Time</p>
          </div>
        </div>
      </section>

      {/* Character Frequency */}
      {stats.charFrequency.length > 0 && (
        <section className="space-y-3">
          <h4 className="text-sm font-medium">Most Frequent Characters</h4>
          <div className="space-y-2">
            {stats.charFrequency.map((item, idx) => (
              <div key={item.char} className="flex items-center gap-3">
                <span className="font-mono w-8 text-center font-bold">{item.char}</span>
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(item.count / stats.charactersNoSpaces) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export default function CharacterCounter() {
  const [text, setText] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const analysis = useMemo(() => {
    if (!text) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        readingTime: 0,
        speakingTime: 0,
      }
    }

    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, "").length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length
    const lines = text.split("\n").length
    const readingTime = Math.ceil(words / 200) // 200 words per minute
    const speakingTime = Math.ceil(words / 150) // 150 words per minute

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences: sentences || (words > 0 ? 1 : 0),
      paragraphs: paragraphs || (text.length > 0 ? 1 : 0),
      lines,
      readingTime,
      speakingTime,
    }
  }, [text])

  const copyToClipboard = useCallback(async (content: string, key: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const characterFrequency = useMemo(() => {
    if (!text) return []

    const freq: Record<string, number> = {}
    for (const char of text.toLowerCase()) {
      if (/[a-z]/.test(char)) {
        freq[char] = (freq[char] || 0) + 1
      }
    }

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
  }, [text])

  const topWords = useMemo(() => {
    if (!text) return []

    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || []
    const stopWords = new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "is", "was", "are", "were", "be", "been", "being"])
    
    const freq: Record<string, number> = {}
    for (const word of words) {
      if (!stopWords.has(word) && word.length > 2) {
        freq[word] = (freq[word] || 0) + 1
      }
    }

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
  }, [text])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-input" className="text-base font-medium">
            Your Text
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
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="font-sans text-sm min-h-[200px]"
          placeholder="Type or paste your text here..."
        />
      </section>

      {/* Main Statistics */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Statistics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold">{analysis.characters.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Characters</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold">{analysis.charactersNoSpaces.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">No Spaces</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold">{analysis.words.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Words</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold">{analysis.sentences.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Sentences</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold">{analysis.paragraphs.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Paragraphs</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold">{analysis.lines.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Lines</p>
          </div>
        </div>
      </section>

      {/* Reading Time */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Reading & Speaking Time</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Reading Time</span>
              <span className="text-2xl font-bold">{analysis.readingTime} min</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Based on 200 words per minute</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Speaking Time</span>
              <span className="text-2xl font-bold">{analysis.speakingTime} min</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Based on 150 words per minute</p>
          </div>
        </div>
      </section>

      {/* Character Frequency */}
      {characterFrequency.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Top Characters</h3>
          <div className="rounded-lg border bg-background divide-y">
            {characterFrequency.map(([char, count]) => (
              <div key={char} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-mono w-8 text-center">{char}</span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(count / characterFrequency[0][1]) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Top Words */}
      {topWords.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Top Words</h3>
          <div className="rounded-lg border bg-background divide-y">
            {topWords.map(([word, count]) => (
              <div key={word} className="flex items-center justify-between p-3">
                <span className="font-medium">{word}</span>
                <span className="text-sm text-muted-foreground">{count}x</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Social Media Limits */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Platform Limits</h3>
        <div className="rounded-lg border bg-background divide-y">
          <PlatformLimitRow label="Twitter / X" limit={280} current={analysis.characters} copied={copied} copyToClipboard={copyToClipboard} />
          <PlatformLimitRow label="Instagram Caption" limit={2200} current={analysis.characters} copied={copied} copyToClipboard={copyToClipboard} />
          <PlatformLimitRow label="Instagram Bio" limit={150} current={analysis.characters} copied={copied} copyToClipboard={copyToClipboard} />
          <PlatformLimitRow label="LinkedIn Post" limit={3000} current={analysis.characters} copied={copied} copyToClipboard={copyToClipboard} />
          <PlatformLimitRow label="SMS Message" limit={160} current={analysis.characters} copied={copied} copyToClipboard={copyToClipboard} />
        </div>
      </section>
    </div>
  )
}

function PlatformLimitRow({ label, limit, current, copied, copyToClipboard }: { label: string; limit: number; current: number; copied: string | null; copyToClipboard: (text: string, key: string) => Promise<void> }) {
  const percentage = Math.min((current / limit) * 100, 100)
  const isOver = current > limit
  const remaining = limit - current

  return (
    <div className="flex items-center justify-between p-3">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${isOver ? "bg-destructive" : percentage > 80 ? "bg-yellow-500" : "bg-primary"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={`text-sm min-w-[50px] text-right ${isOver ? "text-destructive" : "text-muted-foreground"}`}>
          {current}/{limit}
        </span>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, FileText } from "lucide-react"

export function MarkdownWordCounter() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)

  const countWords = useCallback((text: string): {
    words: number;
    characters: number;
    charactersNoSpaces: number;
    sentences: number;
    paragraphs: number;
    lines: number;
    readingTime: string;
    speakingTime: string;
  } => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length
    const lines = text.split('\n').length

    // Average reading speed: 200-250 words per minute
    const readingTimeMinutes = words / 200
    const readingTime = readingTimeMinutes < 1 
      ? 'Less than 1 min' 
      : `${Math.ceil(readingTimeMinutes)} min`

    // Average speaking speed: 130-150 words per minute
    const speakingTimeMinutes = words / 140
    const speakingTime = speakingTimeMinutes < 1
      ? 'Less than 1 min'
      : `${Math.ceil(speakingTimeMinutes)} min`

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime
    }
  }, [])

  const countFrequency = useCallback((text: string): Array<{ word: string; count: number }> => {
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || []
    const frequency: Record<string, number> = {}

    words.forEach(word => {
      if (word.length > 2) { // Skip short words
        frequency[word] = (frequency[word] || 0) + 1
      }
    })

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }))
  }, [])

  const stats = countWords(input)
  const topWords = countFrequency(input)

  const handleCopy = useCallback(async () => {
    const statsText = `Words: ${stats.words}\nCharacters: ${stats.characters}\nCharacters (no spaces): ${stats.charactersNoSpaces}\nSentences: ${stats.sentences}\nParagraphs: ${stats.paragraphs}\nLines: ${stats.lines}\nReading Time: ${stats.readingTime}\nSpeaking Time: ${stats.speakingTime}`
    await navigator.clipboard.writeText(statsText)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [stats])

  const handleClear = useCallback(() => {
    setInput("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown Word Counter</h2>
            <p className="text-sm text-muted-foreground">
              Count words, characters, and estimate reading time
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="text-3xl font-bold">{stats.words}</div>
          <div className="text-sm text-muted-foreground">Words</div>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="text-3xl font-bold">{stats.characters}</div>
          <div className="text-sm text-muted-foreground">Characters</div>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="text-3xl font-bold">{stats.sentences}</div>
          <div className="text-sm text-muted-foreground">Sentences</div>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="text-3xl font-bold">{stats.paragraphs}</div>
          <div className="text-sm text-muted-foreground">Paragraphs</div>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="text-3xl font-bold">{stats.lines}</div>
          <div className="text-sm text-muted-foreground">Lines</div>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="text-3xl font-bold">{stats.charactersNoSpaces}</div>
          <div className="text-sm text-muted-foreground">Chars (no spaces)</div>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="text-3xl font-bold">{stats.readingTime}</div>
          <div className="text-sm text-muted-foreground">Reading Time</div>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="text-3xl font-bold">{stats.speakingTime}</div>
          <div className="text-sm text-muted-foreground">Speaking Time</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="input">Markdown Text</Label>
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!input} variant="outline" size="sm">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy Stats"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your Markdown text here to count words, characters, and estimate reading time..."
          className="min-h-[400px] font-mono text-sm"
        />
      </div>

      {topWords.length > 0 && (
        <div className="p-4 bg-muted rounded-lg space-y-2">
          <h3 className="font-medium">Top Words</h3>
          <div className="flex flex-wrap gap-2">
            {topWords.map(({ word, count }) => (
              <span key={word} className="px-2 py-1 bg-background rounded text-sm">
                {word}: {count}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

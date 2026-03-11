"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export function HtmlCharacterCounter() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)

  const stats = React.useMemo(() => {
    const text = input || ""
    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g, '').length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length
    const lines = text.split('\n').length

    // Character frequency
    const charFreq: Record<string, number> = {}
    for (const char of text) {
      charFreq[char] = (charFreq[char] || 0) + 1
    }
    const topChars = Object.entries(charFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([char, count]) => ({
        char,
        count,
        percentage: ((count / chars) * 100).toFixed(1)
      }))

    // Reading time (average 200 wpm)
    const readingTimeMinutes = words / 200
    const readingTime = readingTimeMinutes < 1 
      ? `${Math.ceil(readingTimeMinutes * 60)} sec`
      : `${Math.ceil(readingTimeMinutes)} min`

    // Speaking time (average 130 wpm)
    const speakingTimeMinutes = words / 130
    const speakingTime = speakingTimeMinutes < 1
      ? `${Math.ceil(speakingTimeMinutes * 60)} sec`
      : `${Math.ceil(speakingTimeMinutes)} min`

    return {
      chars,
      charsNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      topChars,
      readingTime,
      speakingTime,
    }
  }, [input])

  const handleCopy = useCallback(async () => {
    if (input) {
      await navigator.clipboard.writeText(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [input])

  const handleClear = useCallback(() => {
    setInput("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Character Counter</h2>
            <p className="text-sm text-muted-foreground">
              Count characters, words, and analyze your text
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!input}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear} disabled={!input}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Text Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="min-h-[500px] font-mono text-sm"
          />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-3xl font-bold">{stats.chars}</p>
              <p className="text-sm text-muted-foreground">Characters</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-3xl font-bold">{stats.charsNoSpaces}</p>
              <p className="text-sm text-muted-foreground">Characters (no spaces)</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-3xl font-bold">{stats.words}</p>
              <p className="text-sm text-muted-foreground">Words</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-3xl font-bold">{stats.sentences}</p>
              <p className="text-sm text-muted-foreground">Sentences</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-3xl font-bold">{stats.paragraphs}</p>
              <p className="text-sm text-muted-foreground">Paragraphs</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-3xl font-bold">{stats.lines}</p>
              <p className="text-sm text-muted-foreground">Lines</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Reading Time</p>
              <p className="text-xl font-semibold">{stats.readingTime}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Speaking Time</p>
              <p className="text-xl font-semibold">{stats.speakingTime}</p>
            </div>
          </div>

          {stats.topChars.length > 0 && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2 text-sm">Top Characters</h3>
              <div className="space-y-1">
                {stats.topChars.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="font-mono bg-background px-2 py-0.5 rounded">
                      {item.char === ' ' ? '(space)' : item.char === '\n' ? '\\n' : item.char}
                    </span>
                    <span className="text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2 text-sm">SEO Recommendations</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Title: 50-60 characters recommended</li>
              <li>• Meta description: 150-160 characters</li>
              <li>• Content: 300+ words for basic SEO</li>
              <li>• Long-form: 1000+ words for better ranking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

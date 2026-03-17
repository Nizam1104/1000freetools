"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Search } from "lucide-react"

export function DatePatternFinder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const datePatterns = [
    { name: "ISO 8601", pattern: /\d{4}-\d{2}-\d{2}/g, example: "2024-01-15" },
    { name: "ISO 8601 with Time", pattern: /\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/g, example: "2024-01-15T10:30:00" },
    { name: "ISO 8601 Full", pattern: /\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}[.,]\d{3}Z?/g, example: "2024-01-15T10:30:00.000Z" },
    { name: "US Format", pattern: /\d{1,2}\/\d{1,2}\/\d{2,4}/g, example: "01/15/2024" },
    { name: "EU Format", pattern: /\d{1,2}\.\d{1,2}\.\d{2,4}/g, example: "15.01.2024" },
    { name: "UK Format", pattern: /\d{1,2}\/\d{1,2}\/\d{2,4}/g, example: "15/01/2024" },
    { name: "Written Format", pattern: /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi, example: "January 15, 2024" },
    { name: "Short Written", pattern: /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{1,2},?\s+\d{4}\b/gi, example: "Jan 15, 2024" },
    { name: "Year Only", pattern: /\b(19|20)\d{2}\b/g, example: "2024" },
    { name: "Timestamp (Unix)", pattern: /\b\d{10}\b/g, example: "1705312200" },
    { name: "Timestamp (Milliseconds)", pattern: /\b\d{13}\b/g, example: "1705312200000" },
    { name: "YYYYMMDD", pattern: /\b\d{8}\b/g, example: "20240115" },
    { name: "DD-MM-YYYY", pattern: /\d{1,2}-\d{1,2}-\d{2,4}/g, example: "15-01-2024" },
    { name: "YYYY.MM.DD", pattern: /\d{4}\.\d{1,2}\.\d{1,2}/g, example: "2024.01.15" },
    { name: "Chinese Format", pattern: /\d{4}年\d{1,2}月\d{1,2}日/g, example: "2024 年 01 月 15 日" },
    { name: "Japanese Format", pattern: /\d{4}\/\d{1,2}\/\d{1,2}/g, example: "2024/01/15" },
  ]

  const findDates = useCallback((text: string) => {
    const results: Array<{ pattern: string; matches: string[]; count: number; example: string }> = []

    datePatterns.forEach(({ name, pattern, example }) => {
      const matches = text.match(pattern)
      if (matches && matches.length > 0) {
        const uniqueMatches = Array.from(new Set(matches))
        results.push({
          pattern: name,
          matches: uniqueMatches.slice(0, 10),
          count: matches.length,
          example
        })
      }
    })

    return results.sort((a, b) => b.count - a.count)
  }, [])

  const handleFind = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }

    const results = findDates(input)

    if (results.length === 0) {
      setOutput("No date patterns found in the input text.")
      return
    }

    let outputText = `# Date Pattern Analysis Results\n\n`
    outputText += `**Total patterns found:** ${results.length}\n\n`
    outputText += `## Detected Date Formats\n\n`

    results.forEach((result, index) => {
      outputText += `### ${index + 1}. ${result.pattern}\n`
      outputText += `- **Count:** ${result.count} occurrence(s)\n`
      outputText += `- **Example:** ${result.example}\n`
      outputText += `- **Matches:** ${result.matches.join(', ')}\n\n`
    })

    setOutput(outputText.trim())
  }, [input, findDates])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "date-patterns.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`Here are some dates in various formats:

ISO dates: 2024-01-15, 2024-02-20, 2024-03-25
With time: 2024-01-15T10:30:00, 2024-06-20 14:45:30
US format: 01/15/2024, 12/25/2023
EU format: 15.01.2024, 25.12.2023
Written: January 15, 2024, December 25, 2023
Short: Jan 15, 2024, Dec 25, 2023
Timestamps: 1705312200, 1705312200000
Other: 20240115, 15-01-2024, 2024.01.15`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Date Pattern Finder</h2>
            <p className="text-sm text-muted-foreground">
              Detect and analyze date formats in text
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="input">Input Text</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text containing dates to analyze..."
          className="min-h-[300px] font-mono text-sm"
        />
        <div className="flex items-center gap-2">
          <Button onClick={handleFind} className="flex-1" disabled={!input}>
            <Search className="h-4 w-4 mr-2" />
            Find Date Patterns
          </Button>
          <Button variant="outline" onClick={handleClear} title="Clear">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Analysis Results</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[400px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Supported Date Formats</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
          {datePatterns.map(({ name, example }) => (
            <div key={name} className="flex justify-between">
              <span>{name}</span>
              <span className="text-muted-foreground/50">{example}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

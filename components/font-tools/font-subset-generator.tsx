"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

function toHex4(n: number) {
  return n.toString(16).toUpperCase().padStart(4, "0")
}

function toUnicodeRange(codePoints: number[]) {
  const uniqSorted = Array.from(new Set(codePoints)).sort((a, b) => a - b)
  const ranges: Array<[number, number]> = []
  for (const cp of uniqSorted) {
    const last = ranges[ranges.length - 1]
    if (!last) ranges.push([cp, cp])
    else if (cp === last[1] + 1) last[1] = cp
    else ranges.push([cp, cp])
  }

  return ranges
    .map(([start, end]) =>
      start === end ? `U+${toHex4(start)}` : `U+${toHex4(start)}-${toHex4(end)}`
    )
    .join(", ")
}

export function FontSubsetGenerator() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const chars = Array.from(input)
      if (chars.length === 0) {
        setOutput("")
        return
      }

      const seen = new Set<string>()
      const uniqueChars: string[] = []
      const codePoints: number[] = []

      for (const ch of chars) {
        if (seen.has(ch)) continue
        seen.add(ch)
        uniqueChars.push(ch)
        codePoints.push(ch.codePointAt(0) ?? 0)
      }

      const subsetString = uniqueChars.join("")
      const unicodeRange = toUnicodeRange(codePoints)
      const codePointList = Array.from(new Set(codePoints))
        .sort((a, b) => a - b)
        .map((cp) => `U+${toHex4(cp)}`)
        .join(" ")

      setOutput(
        [
          subsetString,
          "",
          `Unique characters: ${uniqueChars.length}`,
          `Code points: ${codePointList}`,
          `CSS unicode-range: ${unicodeRange}`,
        ].join("\n")
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion error")
      setOutput("")
    }
  }, [input])

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
    setError("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "output.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Font Subset Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate font subsets with specific characters
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your data here..."
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
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
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">How to use</h3>
        <p className="text-sm text-muted-foreground">
          Enter your data in the input field, click Convert, and the result will appear in the output field.
          You can then copy or download the result.
        </p>
      </div>
    </div>
  )
}

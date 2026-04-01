"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Download } from "lucide-react"

function countSyllables(word: string) {
  const w = word.toLowerCase().replace(/[^a-z]/g, "")
  if (!w) return 0
  if (w.length <= 3) return 1
  const withoutSilentE = w.replace(/e$/i, "")
  const groups = withoutSilentE.match(/[aeiouy]+/g)
  const count = groups ? groups.length : 1
  return Math.max(1, count)
}

function analyzeReadability(text: string) {
  const cleaned = text.trim()
  const chars = cleaned.length
  const letters = (cleaned.match(/[A-Za-z]/g) ?? []).length
  const words = (cleaned.match(/\b[\p{L}\p{N}']+\b/gu) ?? []).length
  const sentences = (cleaned.match(/[.!?]+/g) ?? []).length || (cleaned ? 1 : 0)
  const wordList = cleaned.match(/\b[\p{L}']+\b/gu) ?? []
  const syllables = wordList.reduce((sum, w) => sum + countSyllables(w), 0)

  const wps = words ? words / sentences : 0
  const spw = words ? syllables / words : 0

  // Flesch Reading Ease
  const flesch = words ? 206.835 - 1.015 * wps - 84.6 * spw : 0
  // Flesch–Kincaid Grade
  const fkGrade = words ? 0.39 * wps + 11.8 * spw - 15.59 : 0
  // Coleman–Liau (approx using letters/words, sentences/words)
  const L = words ? (letters / words) * 100 : 0
  const S = words ? (sentences / words) * 100 : 0
  const colemanLiau = words ? 0.0588 * L - 0.296 * S - 15.8 : 0

  return {
    characters: chars,
    letters,
    words,
    sentences,
    syllables,
    fleschReadingEase: Number.isFinite(flesch) ? Number(flesch.toFixed(2)) : 0,
    fleschKincaidGrade: Number.isFinite(fkGrade) ? Number(fkGrade.toFixed(2)) : 0,
    colemanLiauIndex: Number.isFinite(colemanLiau) ? Number(colemanLiau.toFixed(2)) : 0,
  }
}

export function TextReadabilityAnalyzer() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [format, setFormat] = useState<"pretty" | "json">("pretty")

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const stats = analyzeReadability(input)
      if (format === "json") {
        setOutput(JSON.stringify(stats, null, 2))
      } else {
        const lines = [
          `Words: ${stats.words}`,
          `Sentences: ${stats.sentences}`,
          `Characters: ${stats.characters}`,
          `Syllables (approx): ${stats.syllables}`,
          "",
          `Flesch Reading Ease: ${stats.fleschReadingEase}`,
          `Flesch–Kincaid Grade: ${stats.fleschKincaidGrade}`,
          `Coleman–Liau Index: ${stats.colemanLiauIndex}`,
        ]
        setOutput(lines.join("\n"))
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion error")
      setOutput("")
    }
  }, [input, format])

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
            <h2 className="text-2xl font-semibold tracking-tight">Text Readability Analyzer</h2>
            <p className="text-sm text-muted-foreground">
              Analyze text readability scores
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
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="format" className="text-xs text-muted-foreground">
                Output format
              </Label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value as "pretty" | "json")}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="pretty">Readable</option>
                <option value="json">JSON</option>
              </select>
            </div>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text to analyze..."
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

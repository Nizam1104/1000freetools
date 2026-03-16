"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RegexSplitter() {
  const [pattern, setPattern] = useState<string>("\\s+")
  const [text, setText] = useState<string>("")
  const [parts, setParts] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [keepDelimiters, setKeepDelimiters] = useState(false)
  const [removeEmpty, setRemoveEmpty] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  const splitText = useCallback(() => {
    try {
      setError(null)
      
      const regex = new RegExp(pattern, "g")
      let results: string[]
      
      if (keepDelimiters) {
        // Split but keep delimiters
        results = text.split(regex).filter((part, idx, arr) => {
          if (removeEmpty && part === "") return false
          return true
        })
        
        // Add delimiters back
        const matches = [...text.matchAll(regex)]
        const withDelimiters: string[] = []
        let matchIdx = 0
        
        for (let i = 0; i < results.length; i++) {
          withDelimiters.push(results[i])
          if (matchIdx < matches.length) {
            withDelimiters.push(matches[matchIdx][0])
            matchIdx++
          }
        }
        
        results = withDelimiters.filter(p => !removeEmpty || p !== "")
      } else {
        results = text.split(regex)
        if (removeEmpty) {
          results = results.filter(p => p !== "")
        }
      }
      
      setParts(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regex pattern")
      setParts([])
    }
  }, [pattern, text, keepDelimiters, removeEmpty])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const copyAllParts = useCallback(async () => {
    await copyToClipboard(parts.join("\n"), "all")
  }, [parts, copyToClipboard])

  const downloadParts = useCallback(() => {
    const content = parts.join("\n")
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "split-parts.txt"
    a.click()
    URL.revokeObjectURL(url)
  }, [parts])

  const presetPatterns = [
    { name: "Whitespace", pattern: "\\s+", desc: "Split by spaces/tabs/newlines" },
    { name: "Commas", pattern: ",", desc: "CSV-style split" },
    { name: "Lines", pattern: "\\n", desc: "Split by newlines" },
    { name: "Sentences", pattern: "[.!?]+\\s*", desc: "Split by sentence endings" },
    { name: "Words", pattern: "\\b", desc: "Split by word boundaries" },
    { name: "Numbers", pattern: "\\d+", desc: "Split by numbers" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Pattern Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="pattern-input" className="text-base font-medium">
            Split Pattern (Regex)
          </Label>
          <div className="flex gap-2 flex-wrap">
            {presetPatterns.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="xs"
                onClick={() => setPattern(preset.pattern)}
                className="h-7"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/</span>
            <Input
              id="pattern-input"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className={cn(
                "pl-6 pr-6 font-mono text-sm",
                error ? "border-destructive" : ""
              )}
              placeholder="Enter regex pattern to split by..."
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/g</span>
          </div>
        </div>
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </section>

      {/* Options */}
      <section className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <Checkbox
            checked={keepDelimiters}
            onCheckedChange={(checked) => setKeepDelimiters(checked as boolean)}
          />
          Keep delimiters in results
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <Checkbox
            checked={removeEmpty}
            onCheckedChange={(checked) => setRemoveEmpty(checked as boolean)}
          />
          Remove empty parts
        </label>
      </section>

      {/* Text Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-input" className="text-base font-medium">
            Text to Split
          </Label>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(text, "input")}
              className="h-7"
              disabled={!text}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setText("")}
              className="h-7"
              disabled={!text}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>
        
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="font-mono text-sm min-h-[150px]"
          placeholder="Enter text to split..."
        />
      </section>

      {/* Action Button */}
      <Button onClick={splitText} className="w-full sm:w-auto" size="lg">
        Split Text
      </Button>

      {/* Results */}
      {parts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">
              Split Parts ({parts.length})
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={copyAllParts}
              >
                <Copy className="size-3.5 mr-1" />
                Copy All
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={downloadParts}
              >
                <Download className="size-3.5 mr-1" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {parts.map((part, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-background p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Part #{idx + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(part, `part-${idx}`)}
                  >
                    {copied === `part-${idx}` ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </Button>
                </div>
                <div className="font-mono text-sm bg-muted/50 rounded px-2 py-1.5 break-all whitespace-pre-wrap">
                  {part || <span className="text-muted-foreground italic">(empty)</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sample Text */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Sample Text</h3>
        <button
          onClick={() => setText("apple, banana, cherry, date, elderberry")}
          className="w-full text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
        >
          <code className="text-xs font-mono">
            apple, banana, cherry, date, elderberry
          </code>
          <span className="text-xs text-muted-foreground">Click to load sample CSV text</span>
        </button>
      </section>
    </div>
  )
}

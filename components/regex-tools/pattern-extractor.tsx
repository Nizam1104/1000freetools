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

interface MatchResult {
  match: string
  index: number
  line: number
  context: string
  groups: Record<string, string | undefined> | null
}

export default function PatternExtractor() {
  const [pattern, setPattern] = useState<string>("\\b[\\w.-]+@[\\w.-]+\\.[\\w]{2,}\\b")
  const [text, setText] = useState<string>("")
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: true,
  })
  const [copied, setCopied] = useState<string | null>(null)

  const extractMatches = useCallback(() => {
    try {
      setError(null)
      
      let flagsStr = ""
      if (flags.global) flagsStr += "g"
      if (flags.ignoreCase) flagsStr += "i"
      if (flags.multiline) flagsStr += "m"
      
      const regex = new RegExp(pattern, flagsStr)
      const results: MatchResult[] = []
      const lines = text.split("\n")
      
      lines.forEach((line, lineNum) => {
        const lineMatches = [...line.matchAll(regex)]
        lineMatches.forEach((match) => {
          const startInLine = match.index || 0
          const contextStart = Math.max(0, startInLine - 20)
          const contextEnd = Math.min(line.length, startInLine + match[0].length + 20)
          
          results.push({
            match: match[0],
            index: match.index || 0,
            line: lineNum + 1,
            context: line.slice(contextStart, contextEnd),
            groups: match.groups || null,
          })
        })
      })
      
      setMatches(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regex pattern")
      setMatches([])
    }
  }, [pattern, text, flags])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadMatches = useCallback(() => {
    const content = matches.map(m => m.match).join("\n")
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "extracted-matches.txt"
    a.click()
    URL.revokeObjectURL(url)
  }, [matches])

  const copyAllMatches = useCallback(async () => {
    const content = matches.map(m => m.match).join("\n")
    await copyToClipboard(content, "all")
  }, [matches, copyToClipboard])

  const presetPatterns = [
    { name: "Emails", pattern: "\\b[\\w.-]+@[\\w.-]+\\.[\\w]{2,}\\b" },
    { name: "Phones (US)", pattern: "\\b(?:\\+?1[-.]?)?\\(?[0-9]{3}\\)?[-.]?[0-9]{3}[-.]?[0-9]{4}\\b" },
    { name: "URLs", pattern: "https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)" },
    { name: "IPv4", pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b" },
    { name: "Dates (MM/DD/YYYY)", pattern: "\\b(?:0?[1-9]|1[0-2])[\\/\\-](?:0?[1-9]|[12]\\d|3[01])[\\/\\-](?:19|20)?\\d{2}\\b" },
    { name: "Words (5+ chars)", pattern: "\\b\\w{5,}\\b" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Pattern Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="pattern-input" className="text-base font-medium">
            Regex Pattern
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
              placeholder="Enter regex pattern..."
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
              /{flags.global ? "g" : ""}{flags.ignoreCase ? "i" : ""}{flags.multiline ? "m" : ""}
            </span>
          </div>
        </div>
        
        {/* Flags */}
        <div className="flex flex-wrap gap-4">
          {[
            { key: "global", label: "Global (g)", desc: "Find all matches" },
            { key: "ignoreCase", label: "Ignore Case (i)", desc: "Case insensitive" },
            { key: "multiline", label: "Multiline (m)", desc: "^ and $ match lines" },
          ].map((flag) => (
            <label key={flag.key} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={flags[flag.key as keyof typeof flags]}
                onCheckedChange={(checked) => setFlags({ ...flags, [flag.key]: checked as boolean })}
              />
              <div>
                <span className="font-medium">{flag.label}</span>
                <span className="text-muted-foreground ml-2 text-xs">{flag.desc}</span>
              </div>
            </label>
          ))}
        </div>
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </section>

      {/* Text Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-input" className="text-base font-medium">
            Text to Search
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
          placeholder="Enter text to search for patterns..."
        />
      </section>

      {/* Action Button */}
      <Button onClick={extractMatches} className="w-full sm:w-auto" size="lg">
        Extract Matches
      </Button>

      {/* Results */}
      {matches.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">
              Extracted Matches ({matches.length})
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={copyAllMatches}
              >
                <Copy className="size-3.5 mr-1" />
                Copy All
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={downloadMatches}
              >
                <Download className="size-3.5 mr-1" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {matches.map((match, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-background p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Match #{idx + 1}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Line {match.line}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(match.match, `match-${idx}`)}
                  >
                    {copied === `match-${idx}` ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </Button>
                </div>
                <div className="font-mono text-sm bg-muted/50 rounded px-2 py-1.5 break-all">
                  {match.match}
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-mono truncate">
                  ...{match.context}...
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
          onClick={() => setText(`Contact us at support@example.com or sales@company.co.uk
Call us: (555) 123-4567 or +1-800-555-0199
Visit: https://www.example.com/page?id=123
Server IP: 192.168.1.100
Meeting on 12/25/2024 or 01/15/2025`)}
          className="w-full text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
        >
          <code className="text-xs font-mono block">
            Contact us at support@example.com or sales@company.co.uk...
          </code>
          <span className="text-xs text-muted-foreground">Click to load sample text</span>
        </button>
      </section>
    </div>
  )
}

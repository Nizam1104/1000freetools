"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface MatchStats {
  total: number
  perLine: number[]
  linesWithMatches: number
  linesWithoutMatches: number
  avgPerLine: number
  maxInLine: number
}

export default function MatchCounter() {
  const [pattern, setPattern] = useState<string>("\\b\\w+\\b")
  const [text, setText] = useState<string>("")
  const [matches, setMatches] = useState<{ match: string; line: number; index: number }[]>([])
  const [error, setError] = useState<string | null>(null)
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: true,
  })
  const [copied, setCopied] = useState<string | null>(null)

  const countMatches = useCallback(() => {
    try {
      setError(null)
      
      let flagsStr = ""
      if (flags.global) flagsStr += "g"
      if (flags.ignoreCase) flagsStr += "i"
      if (flags.multiline) flagsStr += "m"
      
      const regex = new RegExp(pattern, flagsStr)
      const lines = text.split("\n")
      const allMatches: { match: string; line: number; index: number }[] = []
      
      lines.forEach((line, lineNum) => {
        const lineMatches = [...line.matchAll(regex)]
        lineMatches.forEach((match, matchIdx) => {
          allMatches.push({
            match: match[0],
            line: lineNum + 1,
            index: match.index || 0,
          })
        })
      })
      
      setMatches(allMatches)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regex pattern")
      setMatches([])
    }
  }, [pattern, text, flags])

  const stats = useMemo<MatchStats>(() => {
    const perLine = matches.reduce((acc, m) => {
      acc[m.line - 1] = (acc[m.line - 1] || 0) + 1
      return acc
    }, [] as number[])
    
    const linesWithMatches = perLine.filter(c => c > 0).length
    const linesWithoutMatches = perLine.filter(c => c === 0).length
    const avgPerLine = perLine.length > 0 ? matches.length / perLine.length : 0
    const maxInLine = perLine.length > 0 ? Math.max(...perLine) : 0
    
    return {
      total: matches.length,
      perLine,
      linesWithMatches,
      linesWithoutMatches,
      avgPerLine,
      maxInLine,
    }
  }, [matches])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const uniqueMatches = useMemo(() => {
    const unique = new Map<string, number>()
    matches.forEach(m => {
      unique.set(m.match, (unique.get(m.match) || 0) + 1)
    })
    return Array.from(unique.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
  }, [matches])

  const presetPatterns = [
    { name: "Words", pattern: "\\b\\w+\\b", desc: "Count all words" },
    { name: "Emails", pattern: "\\b[\\w.-]+@[\\w.-]+\\.[\\w]{2,}\\b", desc: "Count email addresses" },
    { name: "Numbers", pattern: "\\d+", desc: "Count numbers" },
    { name: "Sentences", pattern: "[^.!?]+[.!?]", desc: "Count sentences" },
    { name: "Lines", pattern: "^.*$", desc: "Count non-empty lines" },
    { name: "Whitespace", pattern: "\\s+", desc: "Count whitespace sequences" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Pattern Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="pattern-input" className="text-base font-medium">
            Pattern to Count (Regex)
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
            { key: "global", label: "Global (g)", desc: "Count all matches" },
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
            Text to Analyze
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
          placeholder="Enter text to count pattern matches..."
        />
      </section>

      {/* Action Button */}
      <Button onClick={countMatches} className="w-full sm:w-auto" size="lg">
        <BarChart3 className="size-4 mr-2" />
        Count Matches
      </Button>

      {/* Statistics */}
      {matches.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-base font-semibold">Match Statistics</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="rounded-lg border bg-background p-4 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="rounded-lg border bg-background p-4 text-center">
              <div className="text-2xl font-bold">{stats.linesWithMatches}</div>
              <div className="text-sm text-muted-foreground">Lines With</div>
            </div>
            <div className="rounded-lg border bg-background p-4 text-center">
              <div className="text-2xl font-bold">{stats.linesWithoutMatches}</div>
              <div className="text-sm text-muted-foreground">Lines Without</div>
            </div>
            <div className="rounded-lg border bg-background p-4 text-center">
              <div className="text-2xl font-bold">{stats.avgPerLine.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Avg/Line</div>
            </div>
            <div className="rounded-lg border bg-background p-4 text-center">
              <div className="text-2xl font-bold">{stats.maxInLine}</div>
              <div className="text-sm text-muted-foreground">Max/Line</div>
            </div>
            <div className="rounded-lg border bg-background p-4 text-center">
              <div className="text-2xl font-bold">{uniqueMatches.length}</div>
              <div className="text-sm text-muted-foreground">Unique</div>
            </div>
          </div>

          {/* Top Matches */}
          {uniqueMatches.length > 1 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Top Matches</h4>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {uniqueMatches.slice(0, 9).map(([match, count]) => (
                  <div
                    key={match}
                    className="rounded-lg border bg-background p-3 flex items-center justify-between"
                  >
                    <code className="text-sm font-mono truncate mr-2">{match}</code>
                    <span className="text-xs font-medium text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Match Details */}
      {matches.length > 0 && matches.length <= 100 && (
        <section className="space-y-4">
          <h3 className="text-base font-semibold">All Matches ({matches.length})</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {matches.slice(0, 100).map((match, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-background p-2 flex items-center gap-3"
              >
                <span className="text-xs font-medium text-muted-foreground min-w-[60px]">
                  Line {match.line}
                </span>
                <code className="text-sm font-mono bg-muted/50 rounded px-2 py-0.5">
                  {match.match}
                </code>
              </div>
            ))}
          </div>
          {matches.length > 100 && (
            <p className="text-sm text-muted-foreground text-center">
              Showing first 100 of {matches.length} matches
            </p>
          )}
        </section>
      )}

      {/* Sample Text */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Sample Text</h3>
        <button
          onClick={() => setText(`The quick brown fox jumps over the lazy dog.
This sentence contains the word 'the' multiple times.
The word 'the' appears three times in this line.
How many times does 'the' appear in total?`)}
          className="w-full text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
        >
          <code className="text-xs font-mono block">
            The quick brown fox jumps over the lazy dog...
          </code>
          <span className="text-xs text-muted-foreground">Click to load sample text for counting "the"</span>
        </button>
      </section>
    </div>
  )
}

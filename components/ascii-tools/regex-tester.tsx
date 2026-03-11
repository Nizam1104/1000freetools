"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RegexTester() {
  const [testString, setTestString] = useState<string>("")
  const [regexPattern, setRegexPattern] = useState<string>("")
  const [flags, setFlags] = useState<string>("g")
  const [copied, setCopied] = useState<string | null>(null)

  const regexResult = useMemo(() => {
    if (!regexPattern.trim() || !testString) return null

    try {
      const regex = new RegExp(regexPattern, flags)
      const matches = [...testString.matchAll(regex)]
      
      if (matches.length === 0) {
        return { 
          valid: true, 
          matches: [], 
          matchCount: 0,
          error: null 
        }
      }

      const matchDetails = matches.map((match, idx) => ({
        index: idx,
        match: match[0],
        position: match.index,
        groups: match.slice(1),
        namedGroups: match.groups || null
      }))

      return {
        valid: true,
        matches: matchDetails,
        matchCount: matches.length,
        error: null
      }
    } catch (err) {
      return {
        valid: false,
        matches: [],
        matchCount: 0,
        error: err instanceof Error ? err.message : "Invalid regex pattern"
      }
    }
  }, [regexPattern, testString, flags])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setTestString("")
    setRegexPattern("")
  }, [])

  const loadSampleData = useCallback(() => {
    setRegexPattern("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b")
    setTestString(`Contact us at:
support@example.com
sales@company.co.uk
invalid.email@
test.user+tag@domain.org`)
  }, [])

  const highlightMatches = useMemo(() => {
    if (!regexResult || !regexResult.valid || regexResult.matches.length === 0) {
      return testString
    }

    const parts: { text: string; isMatch: boolean }[] = []
    let lastIndex = 0

    regexResult.matches.forEach((match: any) => {
      if (match.position !== undefined && match.position !== null) {
        const pos = match.position as number
        if (pos > lastIndex) {
          parts.push({ text: testString.slice(lastIndex, pos), isMatch: false })
        }
        parts.push({ text: match.match, isMatch: true })
        lastIndex = pos + match.match.length
      }
    })

    if (lastIndex < testString.length) {
      parts.push({ text: testString.slice(lastIndex), isMatch: false })
    }

    return parts
  }, [regexResult, testString])

  const commonPatterns = [
    { name: "Email", pattern: "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b" },
    { name: "URL", pattern: "https?://[^\\s]+" },
    { name: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}" },
    { name: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
    { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
    { name: "HTML Tags", pattern: "<[^>]*>" },
    { name: "Words", pattern: "\\b\\w+\\b" },
    { name: "Digits", pattern: "\\d+" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Regex Pattern Input */}
      <section className="space-y-3">
        <Label htmlFor="regex-pattern" className="text-base font-medium">
          Regular Expression Pattern
        </Label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">/</span>
            <Input
              id="regex-pattern"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              className="font-mono pl-6 pr-6"
              placeholder="Enter regex pattern..."
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">/</span>
          </div>
          <Input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="font-mono w-20"
            placeholder="flags"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Common flags: g (global), i (case-insensitive), m (multiline), s (dotall)
        </p>
      </section>

      {/* Common Patterns */}
      <section className="space-y-2">
        <Label className="text-sm">Common Patterns</Label>
        <div className="flex flex-wrap gap-2">
          {commonPatterns.map((pattern) => (
            <Button
              key={pattern.name}
              variant="outline"
              size="sm"
              onClick={() => setRegexPattern(pattern.pattern)}
              className="text-xs"
            >
              {pattern.name}
            </Button>
          ))}
        </div>
      </section>

      {/* Test String Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="test-string" className="text-base font-medium">
            Test String
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={loadSampleData}
              className="h-7"
            >
              <span className="text-xs">Sample</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(testString, "input")}
              className="h-7"
              disabled={!testString}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="test-string"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="font-mono text-sm min-h-[150px]"
          placeholder="Enter text to test against the regex pattern..."
        />
      </section>

      {/* Results */}
      {regexResult && (
        <>
          {/* Status */}
          <section className={cn(
            "rounded-lg border p-4",
            regexResult.valid 
              ? regexResult.matchCount > 0
                ? "bg-green-500/10 border-green-500/30"
                : "bg-muted/30 border-muted"
              : "bg-destructive/10 border-destructive/30"
          )}>
            <div className="flex items-center gap-3">
              {regexResult.valid ? (
                regexResult.matchCount > 0 ? (
                  <CheckCircle2 className="size-5 text-green-500" />
                ) : (
                  <Info className="size-5 text-muted-foreground" />
                )
              ) : (
                <AlertCircle className="size-5 text-destructive" />
              )}
              <div>
                {regexResult.valid ? (
                  <p className={cn(
                    "font-medium",
                    regexResult.matchCount > 0 ? "text-green-500" : "text-muted-foreground"
                  )}>
                    {regexResult.matchCount > 0 
                      ? `Found ${regexResult.matchCount} match${regexResult.matchCount > 1 ? 'es' : ''}` 
                      : "No matches found"}
                  </p>
                ) : (
                  <p className="text-destructive">{regexResult.error}</p>
                )}
              </div>
            </div>
          </section>

          {/* Highlighted Output */}
          {regexResult.valid && regexResult.matches.length > 0 && (
            <section className="space-y-3">
              <Label className="text-base font-medium">Match Highlights</Label>
              <div className="rounded-lg border bg-muted/30 p-4 font-mono text-sm whitespace-pre-wrap break-all">
                {Array.isArray(highlightMatches) ? (
                  highlightMatches.map((part, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        part.isMatch 
                          ? "bg-primary text-primary-foreground px-0.5 rounded" 
                          : ""
                      )}
                    >
                      {part.text}
                    </span>
                  ))
                ) : (
                  highlightMatches
                )}
              </div>
            </section>
          )}

          {/* Match Details */}
          {regexResult.valid && regexResult.matches.length > 0 && (
            <section className="space-y-3">
              <Label className="text-base font-medium">Match Details</Label>
              <div className="rounded-lg border bg-muted/30 max-h-[400px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="text-left p-3 font-medium">#</th>
                      <th className="text-left p-3 font-medium">Match</th>
                      <th className="text-left p-3 font-medium">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regexResult.matches.map((match: any, idx: number) => (
                      <tr key={idx} className="border-t">
                        <td className="p-3 text-muted-foreground">{idx + 1}</td>
                        <td className="p-3 font-mono text-xs">{match.match}</td>
                        <td className="p-3 text-muted-foreground">{match.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Regular Expression Flags</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div><code className="bg-muted px-1 rounded">g</code> - Global (find all matches)</div>
              <div><code className="bg-muted px-1 rounded">i</code> - Case insensitive</div>
              <div><code className="bg-muted px-1 rounded">m</code> - Multiline (^ and $ match line boundaries)</div>
              <div><code className="bg-muted px-1 rounded">s</code> - Dotall (. matches newlines)</div>
              <div><code className="bg-muted px-1 rounded">u</code> - Unicode</div>
              <div><code className="bg-muted px-1 rounded">y</code> - Sticky (match at start position)</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

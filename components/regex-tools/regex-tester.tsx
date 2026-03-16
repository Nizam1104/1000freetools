"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface MatchResult {
  match: string
  index: number
  groups: Record<string, string | undefined> | null
  fullMatch: RegExpMatchArray
}

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>("\\b\\w+\\b")
  const [testString, setTestString] = useState<string>("Hello World! This is a test string with multiple words.")
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false,
  })
  const [flavor, setFlavor] = useState<"javascript" | "python" | "php" | "pcre">("javascript")
  const [copied, setCopied] = useState<string | null>(null)

  const regexFlags = useMemo(() => {
    let flagsStr = ""
    if (flags.global) flagsStr += "g"
    if (flags.ignoreCase) flagsStr += "i"
    if (flags.multiline) flagsStr += "m"
    if (flags.dotAll) flagsStr += "s"
    if (flags.unicode) flagsStr += "u"
    if (flags.sticky) flagsStr += "y"
    return flagsStr
  }, [flags])

  const { regex, error, matches, executionTime } = useMemo(() => {
    const startTime = performance.now()
    try {
      const regex = new RegExp(pattern, regexFlags)
      const matches: MatchResult[] = []
      
      if (flags.global) {
        let match
        const nonGlobalRegex = new RegExp(pattern, regexFlags.replace("g", ""))
        while ((match = nonGlobalRegex.exec(testString)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.groups || null,
            fullMatch: match,
          })
          if (match.index === nonGlobalRegex.lastIndex) break
        }
      } else {
        const match = regex.exec(testString)
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.groups || null,
            fullMatch: match,
          })
        }
      }
      
      return {
        regex,
        error: null,
        matches,
        executionTime: (performance.now() - startTime).toFixed(2),
      }
    } catch (err) {
      return {
        regex: null,
        error: err instanceof Error ? err.message : "Invalid regex pattern",
        matches: [],
        executionTime: "0",
      }
    }
  }, [pattern, testString, regexFlags, flags.global])

  const highlightedText = useMemo(() => {
    if (error || !regex) return testString
    
    if (!flags.global) {
      const match = regex.exec(testString)
      if (!match) return testString
      
      return (
        <span>
          {testString.slice(0, match.index)}
          <mark className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">
            {match[0]}
          </mark>
          {testString.slice(match.index + match[0].length)}
        </span>
      )
    }
    
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    
    const matchRegex = new RegExp(pattern, regexFlags.replace("g", "") + "g")
    let match
    while ((match = matchRegex.exec(testString)) !== null) {
      if (match.index > lastIndex) {
        parts.push(testString.slice(lastIndex, match.index))
      }
      parts.push(
        <mark key={match.index} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">
          {match[0]}
        </mark>
      )
      lastIndex = match.index + match[0].length
      if (match.index === matchRegex.lastIndex) break
    }
    
    if (lastIndex < testString.length) {
      parts.push(testString.slice(lastIndex))
    }
    
    return <>{parts}</>
  }, [testString, regex, error, pattern, regexFlags, flags.global])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const patternExplanation = useMemo(() => {
    const explanations: { pattern: string; description: string }[] = []
    const patternParts = pattern.match(/(\[.*?\]|\([^?].*?\)|\{.*?\}|\?.*?|\\[wWsSdDnrtfbB]|\.|\*|\+|\?|\||\^|\$|[a-zA-Z0-9])/g) || []
    
    patternParts.forEach((part) => {
      let desc = ""
      switch (part) {
        case "\\w":
          desc = "Matches any word character (alphanumeric & underscore)"
          break
        case "\\W":
          desc = "Matches any non-word character"
          break
        case "\\s":
          desc = "Matches any whitespace character"
          break
        case "\\S":
          desc = "Matches any non-whitespace character"
          break
        case "\\d":
          desc = "Matches any digit (0-9)"
          break
        case "\\D":
          desc = "Matches any non-digit character"
          break
        case "\\n":
          desc = "Matches newline"
          break
        case "\\r":
          desc = "Matches carriage return"
          break
        case "\\t":
          desc = "Matches tab"
          break
        case "\\b":
          desc = "Matches word boundary"
          break
        case "\\B":
          desc = "Matches non-word boundary"
          break
        case ".":
          desc = "Matches any character (except newline)"
          break
        case "*":
          desc = "Quantifier: 0 or more times"
          break
        case "+":
          desc = "Quantifier: 1 or more times"
          break
        case "?":
          desc = "Quantifier: 0 or 1 time"
          break
        case "^":
          desc = "Matches start of string/line"
          break
        case "$":
          desc = "Matches end of string/line"
          break
        case "|":
          desc = "Alternation (OR)"
          break
        default:
          if (part.startsWith("[") && part.endsWith("]")) {
            desc = `Character class: ${part}`
          } else if (part.startsWith("(") && part.endsWith(")")) {
            desc = `Capturing group: ${part}`
          } else if (part.startsWith("{") && part.endsWith("}")) {
            desc = `Quantifier: ${part}`
          } else if (/^[a-zA-Z0-9]$/.test(part)) {
            desc = `Literal character: "${part}"`
          } else {
            desc = `Pattern: ${part}`
          }
      }
      explanations.push({ pattern: part, description: desc })
    })
    
    return explanations
  }, [pattern])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Pattern Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="pattern-input" className="text-base font-medium">
            Regex Pattern
          </Label>
          <Tabs value={flavor} onValueChange={(v) => setFlavor(v as typeof flavor)} className="w-auto">
            <TabsList className="p-1 h-8">
              <TabsTrigger value="javascript" className="text-xs px-2 py-1">JavaScript</TabsTrigger>
              <TabsTrigger value="python" className="text-xs px-2 py-1">Python</TabsTrigger>
              <TabsTrigger value="php" className="text-xs px-2 py-1">PHP</TabsTrigger>
              <TabsTrigger value="pcre" className="text-xs px-2 py-1">PCRE</TabsTrigger>
            </TabsList>
          </Tabs>
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
                error ? "border-destructive focus-visible:border-destructive" : ""
              )}
              placeholder="Enter regex pattern..."
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
              /{regexFlags}
            </span>
          </div>
        </div>
        
        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <Info className="size-4" />
            {error}
          </p>
        )}
        
        {/* Flags */}
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="flag-g"
              checked={flags.global}
              onCheckedChange={(checked) => setFlags({ ...flags, global: checked as boolean })}
            />
            <Label htmlFor="flag-g" className="text-sm font-mono cursor-pointer">
              g <span className="text-muted-foreground">(global)</span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="flag-i"
              checked={flags.ignoreCase}
              onCheckedChange={(checked) => setFlags({ ...flags, ignoreCase: checked as boolean })}
            />
            <Label htmlFor="flag-i" className="text-sm font-mono cursor-pointer">
              i <span className="text-muted-foreground">(ignoreCase)</span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="flag-m"
              checked={flags.multiline}
              onCheckedChange={(checked) => setFlags({ ...flags, multiline: checked as boolean })}
            />
            <Label htmlFor="flag-m" className="text-sm font-mono cursor-pointer">
              m <span className="text-muted-foreground">(multiline)</span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="flag-s"
              checked={flags.dotAll}
              onCheckedChange={(checked) => setFlags({ ...flags, dotAll: checked as boolean })}
            />
            <Label htmlFor="flag-s" className="text-sm font-mono cursor-pointer">
              s <span className="text-muted-foreground">(dotAll)</span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="flag-u"
              checked={flags.unicode}
              onCheckedChange={(checked) => setFlags({ ...flags, unicode: checked as boolean })}
            />
            <Label htmlFor="flag-u" className="text-sm font-mono cursor-pointer">
              u <span className="text-muted-foreground">(unicode)</span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="flag-y"
              checked={flags.sticky}
              onCheckedChange={(checked) => setFlags({ ...flags, sticky: checked as boolean })}
            />
            <Label htmlFor="flag-y" className="text-sm font-mono cursor-pointer">
              y <span className="text-muted-foreground">(sticky)</span>
            </Label>
          </div>
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
              onClick={() => copyToClipboard(testString, "input")}
              className="h-7"
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setTestString("")}
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
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter text to test against your regex pattern..."
        />
      </section>

      {/* Results Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Results</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Matches: <span className="font-medium text-foreground">{matches.length}</span></span>
            <span>Time: <span className="font-medium text-foreground">{executionTime}ms</span></span>
          </div>
        </div>

        {/* Highlighted Text */}
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="font-mono text-sm whitespace-pre-wrap break-words leading-relaxed">
            {highlightedText}
          </p>
        </div>

        {/* Match Details */}
        {matches.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Match Details</h4>
            <div className="space-y-2">
              {matches.map((match, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border bg-background p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Match #{idx + 1} at index {match.index}
                    </span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => copyToClipboard(match.match, `match-${idx}`)}
                      className="h-6"
                    >
                      {copied === `match-${idx}` ? <Check className="size-3" /> : <Copy className="size-3" />}
                    </Button>
                  </div>
                  <div className="font-mono text-sm bg-muted/50 rounded px-2 py-1.5 break-all">
                    {match.match}
                  </div>
                  {match.groups && Object.keys(match.groups).length > 0 && (
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Capture Groups:</span>
                      {Object.entries(match.groups).map(([key, value]) => (
                        <div key={key} className="flex gap-2 text-sm">
                          <span className="font-mono text-muted-foreground min-w-[80px]">{key}:</span>
                          <span className="font-mono">{value || "(empty)"}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pattern Explanation */}
        {!error && patternExplanation.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Pattern Breakdown</h4>
            <div className="rounded-lg border bg-background divide-y">
              {patternExplanation.map((item, idx) => (
                <div key={idx} className="flex gap-3 p-3 text-sm">
                  <code className="font-mono bg-muted px-2 py-0.5 rounded shrink-0">
                    {item.pattern}
                  </code>
                  <span className="text-muted-foreground">{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

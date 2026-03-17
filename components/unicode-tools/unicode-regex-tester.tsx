"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function UnicodeRegexTester() {
  const [input, setInput] = useState("")
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const testRegex = useCallback(() => {
    if (!pattern || !input) {
      setOutput("")
      setError("")
      return
    }

    try {
      const regex = new RegExp(pattern, flags)
      const matches = input.match(regex)
      
      if (!matches) {
        setOutput("No matches found.")
        setError("")
        return
      }

      let outputText = `# Regex Match Results\n\n`
      outputText += `**Pattern:** \`${pattern}\`\n`
      outputText += `**Flags:** ${flags || 'none'}\n`
      outputText += `**Total Matches:** ${matches.length}\n\n`
      outputText += `## Matches\n\n`
      
      matches.forEach((match, index) => {
        outputText += `${index + 1}. \`${match}\` (position: ${input.indexOf(match, index > 0 ? input.indexOf(matches[index - 1]) + 1 : 0)})\n`
      })

      // Show match details
      outputText += `\n## Match Details\n\n`
      outputText += `| # | Match | Length | Code Points |\n`
      outputText += `|---|-------|--------|-------------|\n`
      
      matches.forEach((match, index) => {
        const codePoints = Array.from(match).map(c => 
          `U+${c.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')}`
        ).join(' ')
        outputText += `| ${index + 1} | ${match.substring(0, 20)}${match.length > 20 ? '...' : ''} | ${match.length} | ${codePoints.substring(0, 30)}${codePoints.length > 30 ? '...' : ''} |\n`
      })

      setOutput(outputText)
      setError("")
    } catch (e) {
      setError(`Invalid regex pattern: ${e instanceof Error ? e.message : 'Unknown error'}`)
      setOutput("")
    }
  }, [input, pattern, flags])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setPattern("")
    setOutput("")
    setError("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "regex-results.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput("Hello 世界！Привет مرحبا 123 🌍")
    setPattern("\\p{Script=Han}|\\p{Emoji}|\\d+")
    setFlags("gu")
  }, [])

  const commonPatterns = [
    { name: "Unicode Letters", pattern: "\\p{L}" },
    { name: "Unicode Numbers", pattern: "\\p{N}" },
    { name: "Emoji", pattern: "\\p{Emoji}" },
    { name: "Chinese Characters", pattern: "\\p{Script=Han}" },
    { name: "Arabic Characters", pattern: "\\p{Script=Arabic}" },
    { name: "Cyrillic Characters", pattern: "\\p{Script=Cyrillic}" },
    { name: "Greek Characters", pattern: "\\p{Script=Greek}" },
    { name: "Japanese (Hiragana)", pattern: "\\p{Script=Hiragana}" },
    { name: "Japanese (Katakana)", pattern: "\\p{Script=Katakana}" },
    { name: "Korean (Hangul)", pattern: "\\p{Script=Hangul}" },
    { name: "Any Non-ASCII", pattern: "[^\\x00-\\x7F]" },
    { name: "Whitespace", pattern: "\\s" },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Unicode Regex Tester</h2>
            <p className="text-sm text-muted-foreground">
              Test regular expressions with Unicode character support
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label htmlFor="pattern">Regex Pattern</Label>
            <Input
              id="pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="\p{Emoji}|\p{Script=Han}"
            />
          </div>
          <div className="w-32">
            <Label htmlFor="flags">Flags</Label>
            <Input
              id="flags"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="gmu"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Label>Common Patterns:</Label>
          {commonPatterns.map(({ name, pattern: p }) => (
            <Button
              key={name}
              variant="outline"
              size="sm"
              onClick={() => setPattern(p)}
            >
              {name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Input Text</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to test against the regex pattern..."
            className="min-h-[300px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={testRegex} className="flex-1" disabled={!input || !pattern}>
              <Search className="h-4 w-4 mr-2" />
              Test Regex
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Results</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Match results will appear here..."
            className="min-h-[300px] font-mono text-sm bg-muted"
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
        <h3 className="font-medium">Unicode Regex Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Use <code className="bg-background px-1 rounded">{`\\p{...}`}</code> for Unicode properties</li>
          <li>Add <code className="bg-background px-1 rounded">u</code> flag for full Unicode support</li>
          <li><code className="bg-background px-1 rounded">{`\\p{L}`}</code> matches any letter from any language</li>
          <li><code className="bg-background px-1 rounded">{`\\p{Emoji}`}</code> matches emoji characters</li>
          <li><code className="bg-background px-1 rounded">{`\\p{Script=Name}`}</code> matches characters from a specific script</li>
        </ul>
      </div>
    </div>
  )
}

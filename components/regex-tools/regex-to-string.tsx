"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, RefreshCw, Trash2 } from "lucide-react"

export default function RegexToStringGenerator() {
  const [pattern, setPattern] = useState<string>("\\d{3}-\\d{3}-\\d{4}")
  const [count, setCount] = useState<number>(5)
  const [generated, setGenerated] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const generateStringFromRegex = (regex: RegExp): string => {
    const pattern = regex.source
    let result = ""
    let i = 0

    while (i < pattern.length) {
      const char = pattern[i]

      // Handle character classes
      if (char === "[") {
        const end = pattern.indexOf("]", i)
        if (end === -1) {
          result += "["
          i++
          continue
        }
        const classContent = pattern.slice(i + 1, end)
        const negated = classContent.startsWith("^")
        const chars = negated ? classContent.slice(1) : classContent

        // Parse ranges and individual characters
        const possibleChars: string[] = []
        let j = 0
        while (j < chars.length) {
          if (chars[j + 1] === "-" && chars[j + 2] && chars[j + 2] !== "]") {
            const start = chars.charCodeAt(j)
            const end = chars.charCodeAt(j + 2)
            for (let code = Math.min(start, end); code <= Math.max(start, end); code++) {
              possibleChars.push(String.fromCharCode(code))
            }
            j += 3
          } else if (chars[j] === "\\") {
            const next = chars[j + 1]
            if (next === "d") {
              possibleChars.push(..."0123456789".split(""))
            } else if (next === "w") {
              possibleChars.push(..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_".split(""))
            } else if (next === "s") {
              possibleChars.push(" ", "\t", "\n")
            } else if (next) {
              possibleChars.push(next)
            }
            j += 2
          } else {
            possibleChars.push(chars[j])
            j++
          }
        }

        if (possibleChars.length > 0) {
          const filtered = negated
            ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("").filter(c => !possibleChars.includes(c))
            : possibleChars
          result += filtered[Math.floor(Math.random() * filtered.length)] || "?"
        }
        i = end + 1
        continue
      }

      // Handle escape sequences
      if (char === "\\") {
        const next = pattern[i + 1]
        switch (next) {
          case "d":
            result += Math.floor(Math.random() * 10).toString()
            break
          case "w":
            const wordChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_"
            result += wordChars[Math.floor(Math.random() * wordChars.length)]
            break
          case "s":
            result += " "
            break
          case "D":
            result += "A"
            break
          case "W":
            result += "!"
            break
          case "S":
            result += "A"
            break
          case "n":
            result += "\n"
            break
          case "t":
            result += "\t"
            break
          case "r":
            result += "\r"
            break
          case "0":
            result += "\0"
            break
          case "x":
            result += String.fromCharCode(parseInt(pattern.slice(i + 2, i + 4), 16))
            i += 2
            break
          case "u":
            result += String.fromCharCode(parseInt(pattern.slice(i + 2, i + 6), 16))
            i += 4
            break
          default:
            result += next || ""
        }
        i += 2
        continue
      }

      // Handle quantifiers
      if (char === "{" && pattern.includes("}", i)) {
        const end = pattern.indexOf("}", i)
        const quantContent = pattern.slice(i + 1, end)
        const prevChar = result[result.length - 1]
        const lastChar = result[result.length - 1] || ""
        result = result.slice(0, -1)

        let min = 0, max = 0
        if (quantContent.includes(",")) {
          const [minStr, maxStr] = quantContent.split(",")
          min = parseInt(minStr) || 0
          max = maxStr ? parseInt(maxStr) : 10
        } else {
          min = max = parseInt(quantContent) || 1
        }

        const actualCount = Math.max(1, Math.min(max, min + Math.floor(Math.random() * 3)))
        for (let j = 0; j < actualCount; j++) {
          result += lastChar || "?"
        }
        i = end + 1
        continue
      }

      // Handle other quantifiers
      if (char === "*" || char === "+" || char === "?") {
        const prevChar = result[result.length - 1] || "x"
        if (char === "+") {
          result += prevChar.repeat(Math.floor(Math.random() * 3) + 1)
        } else if (char === "*") {
          result += prevChar.repeat(Math.floor(Math.random() * 3))
        }
        // ? means 0 or 1, we'll skip adding more
        i++
        continue
      }

      // Handle alternation
      if (char === "|") {
        i++
        continue
      }

      // Handle groups
      if (char === "(") {
        let depth = 1
        let j = i + 1
        while (j < pattern.length && depth > 0) {
          if (pattern[j] === "(") depth++
          if (pattern[j] === ")") depth--
          j++
        }
        const groupContent = pattern.slice(i + 1, j - 1)
        
        // Check for non-capturing group or lookahead
        if (groupContent.startsWith("?:") || groupContent.startsWith("?=") || groupContent.startsWith("?!")) {
          i = j
          continue
        }
        
        // Simple alternation in group
        if (groupContent.includes("|")) {
          const options = groupContent.split("|")
          const chosen = options[Math.floor(Math.random() * options.length)]
          result += chosen
        } else {
          // Process group content
          const groupRegex = new RegExp(groupContent)
          result += generateStringFromRegex(groupRegex)
        }
        i = j
        continue
      }

      // Handle closing paren
      if (char === ")") {
        i++
        continue
      }

      // Handle dot (any character)
      if (char === ".") {
        result += "x"
        i++
        continue
      }

      // Handle anchors
      if (char === "^" || char === "$") {
        i++
        continue
      }

      // Regular character
      result += char
      i++
    }

    return result
  }

  const generateStrings = useCallback(() => {
    try {
      setError(null)
      const regex = new RegExp(pattern.replace(/^\//, "").replace(/\/[gimsuy]*$/, ""))
      const strings: string[] = []
      
      for (let i = 0; i < count; i++) {
        const str = generateStringFromRegex(regex)
        strings.push(str)
      }
      
      setGenerated(strings)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regex pattern")
      setGenerated([])
    }
  }, [pattern, count, generateStringFromRegex])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const copyAll = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generated.join("\n"))
      setCopied("all")
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [generated])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Pattern Input */}
      <section className="space-y-3">
        <Label htmlFor="pattern-input" className="text-base font-medium">
          Regex Pattern
        </Label>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/</span>
            <Input
              id="pattern-input"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="pl-6 pr-6 font-mono text-sm"
              placeholder="Enter regex pattern..."
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/</span>
          </div>
        </div>
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </section>

      {/* Count Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="count-input" className="text-base font-medium">
            Number of Strings
          </Label>
          <span className="text-sm text-muted-foreground">{count} strings</span>
        </div>
        
        <Input
          id="count-input"
          type="number"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
          className="w-32"
        />
      </section>

      {/* Generate Button */}
      <Button onClick={generateStrings} className="w-full sm:w-auto" size="lg">
        <RefreshCw className="mr-2 size-4" />
        Generate Strings
      </Button>

      {/* Generated Strings */}
      {generated.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Generated Strings</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={copyAll}
              >
                {copied === "all" ? <Check className="size-3.5 mr-1" /> : <Copy className="size-3.5 mr-1" />}
                Copy All
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            {generated.map((str, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-lg border bg-background p-3"
              >
                <code className="flex-1 font-mono text-sm break-all">{str}</code>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(str, `str-${idx}`)}
                >
                  {copied === `str-${idx}` ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Example Patterns */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Example Patterns</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { pattern: "\\d{3}-\\d{3}-\\d{4}", desc: "Phone number (XXX-XXX-XXXX)" },
            { pattern: "[A-Z]{3}\\d{3}", desc: "License plate (ABC123)" },
            { pattern: "[a-z]+@[a-z]+\\.[a-z]+", desc: "Simple email" },
            { pattern: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}", desc: "IP address format" },
            { pattern: "[A-Z][a-z]+ [A-Z][a-z]+", desc: "Full name" },
            { pattern: "https?://[\\w.-]+\\.[a-z]{2,}", desc: "URL" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setPattern(example.pattern)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <code className="text-xs font-mono text-primary block mb-1">{example.pattern}</code>
              <span className="text-xs text-muted-foreground">{example.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

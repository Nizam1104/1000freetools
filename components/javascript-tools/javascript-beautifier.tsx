"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2 } from "lucide-react"

export default function JavaScriptBeautifier() {
  const [input, setInput] = useState("")
  const [indentSize, setIndentSize] = useState(2)
  const [indentType, setIndentType] = useState<"spaces" | "tabs">("spaces")
  const [copied, setCopied] = useState<string | null>(null)

  const beautify = useCallback((code: string): string => {
    if (!code.trim()) return ""

    let result = ""
    let indent = 0
    const indentStr = indentType === "tabs" ? "\t" : " ".repeat(indentSize)
    let inString = false
    let stringChar = ""
    let inRegex = false
    let inComment = false
    let inMultiComment = false

    for (let i = 0; i < code.length; i++) {
      const char = code[i]
      const nextChar = code[i + 1]
      const prevChar = code[i - 1]

      // Handle string literals
      if (!inString && !inComment && !inMultiComment && !inRegex && (char === '"' || char === "'" || char === "`")) {
        inString = true
        stringChar = char
        result += char
        continue
      }

      if (inString) {
        if (char === stringChar && prevChar !== "\\") {
          inString = false
        }
        result += char
        continue
      }

      // Handle comments
      if (!inComment && !inMultiComment && char === "/" && nextChar === "/") {
        inComment = true
        result += char
        continue
      }

      if (inComment && char === "\n") {
        inComment = false
        result += char
        continue
      }

      if (inComment) {
        result += char
        continue
      }

      if (!inMultiComment && char === "/" && nextChar === "*") {
        inMultiComment = true
        result += char
        continue
      }

      if (inMultiComment && char === "*" && nextChar === "/") {
        inMultiComment = false
        result += char + nextChar
        i++
        continue
      }

      if (inMultiComment) {
        result += char
        continue
      }

      // Handle regex literals (simplified)
      if (!inRegex && char === "/" && !inComment && !inMultiComment) {
        const beforeTrimmed = result.trimEnd()
        const lastChar = beforeTrimmed[beforeTrimmed.length - 1]
        if (lastChar && /[=(:,;!&|?]/.test(lastChar)) {
          inRegex = true
        }
      }

      if (inRegex) {
        if (char === "/" && prevChar !== "\\") {
          inRegex = false
        }
        result += char
        continue
      }

      // Handle braces and indentation
      if (char === "{") {
        result += "{\n"
        indent++
        result += indentStr.repeat(indent)
        continue
      }

      if (char === "}") {
        result = result.trimEnd()
        indent = Math.max(0, indent - 1)
        result += "\n" + indentStr.repeat(indent) + "}\n" + indentStr.repeat(indent)
        continue
      }

      if (char === ";") {
        result += ";\n" + indentStr.repeat(indent)
        continue
      }

      // Skip whitespace
      if (char === " " || char === "\n" || char === "\r" || char === "\t") {
        if (result[result.length - 1] !== " " && result[result.length - 1] !== "\n") {
          result += " "
        }
        continue
      }

      result += char
    }

    // Clean up the result
    result = result
      .replace(/\n\s*\n/g, "\n")
      .replace(/\n\s*([;}])/g, "$1\n")
      .replace(/([{(])\n\s*([})])/g, "$1$2")
      .trim()

    return result
  }, [indentSize, indentType])

  const output = useMemo(() => {
    if (!input.trim()) return ""
    try {
      return beautify(input)
    } catch (err) {
      return "Error: Could not beautify code"
    }
  }, [input, beautify])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const stats = useMemo(() => {
    const originalLines = input.split("\n").length
    const beautifiedLines = output.split("\n").length
    return {
      originalLines,
      beautifiedLines,
      originalChars: input.length,
      beautifiedChars: output.length,
    }
  }, [input, output])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="js-input" className="text-base font-medium">
            Minified JavaScript
          </Label>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7">
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => setInput("")} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        <Textarea
          id="js-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm min-h-[200px]"
          placeholder="// Paste minified JavaScript code here...
function hello(){console.log('Hello');}"
        />
      </section>

      {/* Options */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Formatting Options</Label>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="indent-size" className="text-sm">
              Indent Size:
            </Label>
            <Select value={indentSize.toString()} onValueChange={(v) => setIndentSize(Number(v))}>
              <SelectTrigger id="indent-size" className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 spaces</SelectItem>
                <SelectItem value="4">4 spaces</SelectItem>
                <SelectItem value="8">8 spaces</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="indent-type" className="text-sm">
              Indent Type:
            </Label>
            <Select value={indentType} onValueChange={(v) => setIndentType(v as "spaces" | "tabs")}>
              <SelectTrigger id="indent-type" className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spaces">Spaces</SelectItem>
                <SelectItem value="tabs">Tabs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Beautified Output</Label>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(output, "output")} disabled={!output}>
            {copied === "output" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
            Copy
          </Button>
        </div>
        <Textarea
          value={output}
          readOnly
          className="font-mono text-sm min-h-[300px]"
          placeholder="Beautified code will appear here..."
        />
      </section>

      {/* Statistics */}
      {output && !output.startsWith("Error") && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.originalLines}</p>
              <p className="text-xs text-muted-foreground mt-1">Original Lines</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.beautifiedLines}</p>
              <p className="text-xs text-muted-foreground mt-1">Beautified Lines</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.originalChars.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Original Chars</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.beautifiedChars.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Beautified Chars</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

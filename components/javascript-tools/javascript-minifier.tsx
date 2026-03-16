"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function JavaScriptMinifier() {
  const [input, setInput] = useState("")
  const [options, setOptions] = useState({
    removeComments: true,
    removeWhitespace: true,
    compact: true,
  })
  const [copied, setCopied] = useState<string | null>(null)

  const minify = useCallback((code: string): string => {
    let result = code

    if (options.removeComments) {
      // Remove single-line comments
      result = result.replace(/\/\/[^\n]*/g, "")
      // Remove multi-line comments
      result = result.replace(/\/\*[\s\S]*?\*\//g, "")
    }

    if (options.removeWhitespace) {
      // Remove leading/trailing whitespace from lines
      result = result.replace(/^[ \t]+|[ \t]+$/gm, "")
      // Remove multiple blank lines
      result = result.replace(/\n\s*\n/g, "\n")
    }

    if (options.compact) {
      // Remove newlines
      result = result.replace(/\n/g, "")
      // Remove spaces around operators
      result = result.replace(/\s*([{};:,+\-*/=<>!&|])\s*/g, "$1")
      // Remove multiple spaces
      result = result.replace(/\s+/g, " ")
    }

    return result.trim()
  }, [options])

  const output = useMemo(() => {
    if (!input.trim()) return ""
    try {
      return minify(input)
    } catch (err) {
      return "Error: Invalid JavaScript code"
    }
  }, [input, minify])

  const stats = useMemo(() => {
    const originalSize = new Blob([input]).size
    const minifiedSize = new Blob([output]).size
    const reduction = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1) : 0
    return {
      original: originalSize,
      minified: minifiedSize,
      reduction,
    }
  }, [input, output])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadMinified = useCallback(() => {
    const blob = new Blob([output], { type: "application/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "minified.js"
    a.click()
    URL.revokeObjectURL(url)
  }, [output])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="js-input" className="text-base font-medium">
            JavaScript Code
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
          placeholder="// Paste your JavaScript code here...
function hello() {
  console.log('Hello, World!');
}"
        />
      </section>

      {/* Options */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Options</Label>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remove-comments"
              checked={options.removeComments}
              onCheckedChange={(checked) => setOptions({ ...options, removeComments: checked as boolean })}
            />
            <Label htmlFor="remove-comments" className="text-sm font-normal cursor-pointer">
              Remove Comments
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="remove-whitespace"
              checked={options.removeWhitespace}
              onCheckedChange={(checked) => setOptions({ ...options, removeWhitespace: checked as boolean })}
            />
            <Label htmlFor="remove-whitespace" className="text-sm font-normal cursor-pointer">
              Remove Extra Whitespace
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="compact"
              checked={options.compact}
              onCheckedChange={(checked) => setOptions({ ...options, compact: checked as boolean })}
            />
            <Label htmlFor="compact" className="text-sm font-normal cursor-pointer">
              Compact (Single Line)
            </Label>
          </div>
        </div>
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Minified Output</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={downloadMinified} disabled={!output}>
              <Download className="size-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(output, "output")} disabled={!output}>
              {copied === "output" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy
            </Button>
          </div>
        </div>
        <Textarea
          value={output}
          readOnly
          className={cn(
            "font-mono text-sm min-h-[150px]",
            output.startsWith("Error") && "border-destructive"
          )}
          placeholder="Minified code will appear here..."
        />
      </section>

      {/* Statistics */}
      {output && !output.startsWith("Error") && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.original.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Original (bytes)</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.minified.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Minified (bytes)</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className={cn("text-2xl font-bold", parseFloat(String(stats.reduction)) > 0 ? "text-green-600" : "")}>
                {stats.reduction}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">Reduction</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

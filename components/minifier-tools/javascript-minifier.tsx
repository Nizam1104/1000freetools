"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function JavaScriptMinifier() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [options, setOptions] = useState({
    removeComments: true,
    removeWhitespace: true,
    removeConsole: false,
  })

  const minifyJs = useCallback((js: string, opts: typeof options): string => {
    let minified = js

    // Remove single-line comments
    if (opts.removeComments) {
      minified = minified.replace(/\/\/[^\n]*/g, "")
    }

    // Remove multi-line comments (but not in strings)
    if (opts.removeComments) {
      minified = minified.replace(/\/\*[\s\S]*?\*\//g, "")
    }

    // Remove whitespace
    if (opts.removeWhitespace) {
      minified = minified.replace(/\s*{\s*/g, "{")
      minified = minified.replace(/\s*}\s*/g, "}")
      minified = minified.replace(/\s*;\s*/g, ";")
      minified = minified.replace(/\s*\(\s*/g, "(")
      minified = minified.replace(/\s*\)\s*/g, ")")
      minified = minified.replace(/\s*,\s*/g, ",")
      minified = minified.replace(/\s*=\s*/g, "=")
      minified = minified.replace(/\s*\+\s*/g, "+")
      minified = minified.replace(/\s*-\s*/g, "-")
      minified = minified.replace(/\s*\*\s*/g, "*")
      minified = minified.replace(/\s*\/\s*/g, "/")
      minified = minified.replace(/^\s+|\s+$/g, "")
      minified = minified.replace(/\n+/g, "")
      minified = minified.replace(/  +/g, " ")
    }

    // Remove console.log statements
    if (opts.removeConsole) {
      minified = minified.replace(/console\.(log|warn|error|info|debug)\([^)]*\);?/g, "")
    }

    return minified
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      setOutput(minifyJs(value, options))
    } catch (err) {
      setError("Minification failed")
      setOutput("")
    }
  }, [options, minifyJs])

  const handleOptionChange = useCallback((key: keyof typeof options) => {
    const newOptions = { ...options, [key]: !options[key] }
    setOptions(newOptions)
    setOutput(minifyJs(input, newOptions))
  }, [options, input, minifyJs])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const compressionRatio = output && input ? ((1 - output.length / input.length) * 100).toFixed(1) : null

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Options */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Options</Label>
        <div className="flex flex-wrap gap-4">
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={options.removeComments} onChange={() => handleOptionChange("removeComments")} className="rounded" />
            Remove comments
          </Label>
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={options.removeWhitespace} onChange={() => handleOptionChange("removeWhitespace")} className="rounded" />
            Remove whitespace
          </Label>
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={options.removeConsole} onChange={() => handleOptionChange("removeConsole")} className="rounded" />
            Remove console.log
          </Label>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="js-input" className="text-base font-medium">JavaScript Input</Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7" disabled={!input}>
                {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button variant="ghost" size="xs" onClick={() => { setInput(""); setOutput(""); setError(null); }} className="h-7">
                <Trash2 className="size-3.5" />
                <span className="text-xs">Clear</span>
              </Button>
            </div>
          </div>
          <Textarea id="js-input" value={input} onChange={(e) => handleInputChange(e.target.value)}
            className={cn("font-mono text-sm min-h-[400px]", error ? "border-destructive" : "")}
            placeholder="function hello() { console.log('World'); }" />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </section>

        {/* Output Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="minified-output" className="text-base font-medium">Minified JavaScript</Label>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(output, "output")} className="h-7" disabled={!output}>
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <Textarea id="minified-output" value={output} readOnly className="font-mono text-sm min-h-[400px] bg-muted/50" placeholder="Minified output..." />
        </section>
      </div>

      {/* Stats */}
      {output && input && (
        <section className="flex items-center gap-6 text-sm">
          <span>Original: <span className="font-medium">{input.length}</span> chars</span>
          <span>Minified: <span className="font-medium">{output.length}</span> chars</span>
          <span className="text-green-600 dark:text-green-400">Reduced by: {compressionRatio}%</span>
        </section>
      )}
    </div>
  )
}

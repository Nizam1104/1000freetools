"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CssMinifier() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [options, setOptions] = useState({
    removeComments: true,
    removeWhitespace: true,
    optimizeShorthand: true,
  })

  const minifyCss = useCallback((css: string, opts: typeof options): string => {
    let minified = css

    // Remove comments
    if (opts.removeComments) {
      minified = minified.replace(/\/\*[\s\S]*?\*\//g, "")
    }

    // Remove whitespace
    if (opts.removeWhitespace) {
      minified = minified.replace(/\s*{\s*/g, "{")
      minified = minified.replace(/\s*}\s*/g, "}")
      minified = minified.replace(/\s*:\s*/g, ":")
      minified = minified.replace(/\s*;\s*/g, ";")
      minified = minified.replace(/\s*,\s*/g, ",")
      minified = minified.replace(/^\s+|\s+$/g, "")
      minified = minified.replace(/\s+/g, " ")
    }

    // Optimize shorthand properties
    if (opts.optimizeShorthand) {
      // 4-value to 2-value shorthand (e.g., 10px 20px 10px 20px -> 10px 20px)
      minified = minified.replace(/:(\d+px)\s+(\d+px)\s+\1\s+\2/g, ":$1 $2")
      // 3-value to 2-value shorthand (e.g., 10px 20px 10px -> 10px 20px)
      minified = minified.replace(/:(\d+px)\s+(\d+px)\s+\1(?!\d)/g, ":$1 $2")
    }

    // Remove trailing zeros
    minified = minified.replace(/(\d+)\.0+(px|em|rem|%)/g, "$1$2")
    minified = minified.replace(/(:|\s)0+(px|em|rem|%)/g, "$10$2")

    return minified
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setOutput(minifyCss(value, options))
  }, [minifyCss, options])

  const handleOptionChange = useCallback((key: keyof typeof options) => {
    const newOptions = { ...options, [key]: !options[key] }
    setOptions(newOptions)
    setOutput(minifyCss(input, newOptions))
  }, [options, input, minifyCss])

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
            <input type="checkbox" checked={options.optimizeShorthand} onChange={() => handleOptionChange("optimizeShorthand")} className="rounded" />
            Optimize shorthand
          </Label>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="css-input" className="text-base font-medium">CSS Input</Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7" disabled={!input}>
                {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button variant="ghost" size="xs" onClick={() => { setInput(""); setOutput(""); }} className="h-7">
                <Trash2 className="size-3.5" />
                <span className="text-xs">Clear</span>
              </Button>
            </div>
          </div>
          <Textarea id="css-input" value={input} onChange={(e) => handleInputChange(e.target.value)}
            className="font-mono text-sm min-h-[400px]" placeholder=".class { color: red; }" />
        </section>

        {/* Output Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="minified-output" className="text-base font-medium">Minified CSS</Label>
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

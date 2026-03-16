"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function JsonMinifier() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<"minify" | "pretty">("minify")

  const minifyJson = useCallback((json: string): string => {
    const parsed = JSON.parse(json)
    return JSON.stringify(parsed)
  }, [])

  const prettyJson = useCallback((json: string): string => {
    const parsed = JSON.parse(json)
    return JSON.stringify(parsed, null, 2)
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (value) {
        if (mode === "minify") {
          setOutput(minifyJson(value))
        } else {
          setOutput(prettyJson(value))
        }
      } else {
        setOutput("")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON")
      setOutput("")
    }
  }, [mode, minifyJson, prettyJson])

  const handleModeChange = useCallback((newMode: "minify" | "pretty") => {
    setMode(newMode)
    if (input) {
      try {
        if (newMode === "minify") {
          setOutput(minifyJson(input))
        } else {
          setOutput(prettyJson(input))
        }
      } catch {
        setOutput("")
      }
    }
  }, [input, minifyJson, prettyJson])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const compressionRatio = output && input && mode === "minify" ? ((1 - output.length / input.length) * 100).toFixed(1) : null

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button variant={mode === "minify" ? "default" : "outline"} onClick={() => handleModeChange("minify")} className="flex-1">Minify</Button>
          <Button variant={mode === "pretty" ? "default" : "outline"} onClick={() => handleModeChange("pretty")} className="flex-1">Pretty Print</Button>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="json-input" className="text-base font-medium">JSON Input</Label>
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
          <Textarea id="json-input" value={input} onChange={(e) => handleInputChange(e.target.value)}
            className={cn("font-mono text-sm min-h-[400px]", error ? "border-destructive" : "")}
            placeholder='{"key": "value"}' />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </section>

        {/* Output Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="output" className="text-base font-medium">{mode === "minify" ? "Minified JSON" : "Formatted JSON"}</Label>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(output, "output")} className="h-7" disabled={!output}>
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <Textarea id="output" value={output} readOnly className="font-mono text-sm min-h-[400px] bg-muted/50" placeholder="Output..." />
        </section>
      </div>

      {/* Stats */}
      {output && input && mode === "minify" && (
        <section className="flex items-center gap-6 text-sm">
          <span>Original: <span className="font-medium">{input.length}</span> chars</span>
          <span>Minified: <span className="font-medium">{output.length}</span> chars</span>
          <span className="text-green-600 dark:text-green-400">Reduced by: {compressionRatio}%</span>
        </section>
      )}
    </div>
  )
}

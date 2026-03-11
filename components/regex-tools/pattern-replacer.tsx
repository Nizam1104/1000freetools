"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PatternReplacer() {
  const [pattern, setPattern] = useState<string>("\\s+")
  const [replacement, setReplacement] = useState<string>(" ")
  const [text, setText] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [preview, setPreview] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: true,
  })
  const [copied, setCopied] = useState<string | null>(null)

  const performReplacement = useCallback(() => {
    try {
      setError(null)
      
      let flagsStr = ""
      if (flags.global) flagsStr += "g"
      if (flags.ignoreCase) flagsStr += "i"
      if (flags.multiline) flagsStr += "m"
      
      const regex = new RegExp(pattern, flagsStr)
      const result = text.replace(regex, replacement)
      setOutput(result)
      
      // Generate preview (first 500 chars)
      setPreview(result.slice(0, 500) + (result.length > 500 ? "..." : ""))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regex pattern")
      setOutput("")
      setPreview("")
    }
  }, [pattern, replacement, text, flags])

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
    const originalLength = text.length
    const outputLength = output.length
    const diff = outputLength - originalLength
    return { originalLength, outputLength, diff }
  }, [text, output])

  const presetPatterns = [
    { name: "Multiple Spaces", pattern: "\\s+", replacement: " ", desc: "Normalize whitespace" },
    { name: "Remove HTML Tags", pattern: "<[^>]*>", replacement: "", desc: "Strip HTML" },
    { name: "Phone Format", pattern: "(\\d{3})(\\d{3})(\\d{4})", replacement: "($1) $2-$3", desc: "Format phone" },
    { name: "Date Format", pattern: "(\\d{2})/(\\d{2})/(\\d{4})", replacement: "$3-$1-$2", desc: "MM/DD/YYYY to YYYY-MM-DD" },
    { name: "Trim Lines", pattern: "^\\s+|\\s+$", replacement: "", desc: "Remove line edges" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Pattern Input */}
      <section className="space-y-3">
        <Label htmlFor="pattern-input" className="text-base font-medium">
          Find Pattern (Regex)
        </Label>
        
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
            { key: "global", label: "Global (g)", desc: "Replace all" },
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
      </section>

      {/* Replacement Input */}
      <section className="space-y-3">
        <Label htmlFor="replacement-input" className="text-base font-medium">
          Replace With
        </Label>
        <div className="flex gap-2">
          <Input
            id="replacement-input"
            value={replacement}
            onChange={(e) => setReplacement(e.target.value)}
            className="font-mono text-sm"
            placeholder="Replacement text (use $1, $2 for capture groups)..."
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Use $1, $2, etc. for capture group backreferences
        </p>
      </section>

      {/* Preset Patterns */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Quick Replace Presets</h3>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {presetPatterns.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setPattern(preset.pattern)
                setReplacement(preset.replacement)
              }}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="text-sm font-medium">{preset.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {preset.desc}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Text Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-input" className="text-base font-medium">
            Input Text
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
          placeholder="Enter text to find and replace..."
        />
      </section>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={performReplacement} className="flex-1 sm:flex-none" size="lg">
          Replace
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setText(output)
            setOutput("")
            setPreview("")
          }}
          disabled={!output}
          size="lg"
        >
          <RotateCcw className="size-4 mr-2" />
          Use as Input
        </Button>
      </div>

      {/* Results */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Output</h3>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(output, "output")}
            >
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="text-sm font-medium mb-2">Original</div>
              <div className="font-mono text-sm whitespace-pre-wrap break-all text-muted-foreground">
                {text.slice(0, 300)}{text.length > 300 ? "..." : ""}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {text.length} characters
              </div>
            </div>
            
            <div className="rounded-lg border bg-background p-4">
              <div className="text-sm font-medium mb-2">Result</div>
              <div className="font-mono text-sm whitespace-pre-wrap break-all">
                {preview}
              </div>
              <div className="text-xs text-muted-foreground mt-2 flex gap-4">
                <span>{output.length} characters</span>
                <span className={stats.diff > 0 ? "text-red-600" : stats.diff < 0 ? "text-green-600" : ""}>
                  {stats.diff > 0 ? "+" : ""}{stats.diff} chars
                </span>
              </div>
            </div>
          </div>
          
          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm min-h-[150px] bg-muted/30"
          />
        </section>
      )}

      {error && (
        <div className="rounded-lg border bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 p-4">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}
    </div>
  )
}

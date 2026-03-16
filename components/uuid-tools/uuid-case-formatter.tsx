"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type CaseFormat = "lowercase" | "uppercase"
type HyphenFormat = "with-hyphens" | "without-hyphens" | "with-braces"

interface FormatOptions {
  caseFormat: CaseFormat
  hyphenFormat: HyphenFormat
}

export default function UuidCaseFormatter() {
  const [input, setInput] = useState<string>("")
  const [options, setOptions] = useState<FormatOptions>({
    caseFormat: "lowercase",
    hyphenFormat: "with-hyphens"
  })
  const [copied, setCopied] = useState<string | null>(null)

  const formatUUID = useMemo(() => {
    if (!input.trim()) return null

    // Remove all existing formatting (hyphens, braces, spaces)
    const cleanUUID = input.replace(/[-{} ]/g, "").toLowerCase()
    
    // Validate it's a valid UUID (32 hex chars)
    if (!/^[0-9a-f]{32}$/.test(cleanUUID)) {
      return { error: "Invalid UUID format", formatted: "" }
    }

    let formatted = cleanUUID

    // Apply case format
    if (options.caseFormat === "uppercase") {
      formatted = formatted.toUpperCase()
    }

    // Apply hyphen format
    if (options.hyphenFormat === "with-hyphens") {
      formatted = `${formatted.substring(0, 8)}-${formatted.substring(8, 12)}-${formatted.substring(12, 16)}-${formatted.substring(16, 20)}-${formatted.substring(20)}`
    } else if (options.hyphenFormat === "with-braces") {
      formatted = `{${formatted.substring(0, 8)}-${formatted.substring(8, 12)}-${formatted.substring(12, 16)}-${formatted.substring(16, 20)}-${formatted.substring(20)}}`
    }

    return { error: null, formatted }
  }, [input, options])

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
    setInput("")
  }, [])

  const presets = [
    { name: "Standard (lowercase + hyphens)", caseFormat: "lowercase" as CaseFormat, hyphenFormat: "with-hyphens" as HyphenFormat },
    { name: "Uppercase + Hyphens", caseFormat: "uppercase" as CaseFormat, hyphenFormat: "with-hyphens" as HyphenFormat },
    { name: "No Hyphens", caseFormat: "lowercase" as CaseFormat, hyphenFormat: "without-hyphens" as HyphenFormat },
    { name: "GUID (with braces)", caseFormat: "uppercase" as CaseFormat, hyphenFormat: "with-braces" as HyphenFormat },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="uuid-input" className="text-base font-medium">
            Input UUID
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(input, "input")}
              className="h-7"
              disabled={!input}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!input}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Input
          id="uuid-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono"
          placeholder="Enter UUID in any format..."
        />
        <p className="text-xs text-muted-foreground">
          Accepts UUIDs with or without hyphens, braces, any case
        </p>
      </section>

      {/* Format Options */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Format Options</Label>

        {/* Quick Presets */}
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.name}
              variant={
                options.caseFormat === preset.caseFormat && options.hyphenFormat === preset.hyphenFormat
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => setOptions({ caseFormat: preset.caseFormat, hyphenFormat: preset.hyphenFormat })}
              className="text-xs"
            >
              {preset.name}
            </Button>
          ))}
        </div>

        {/* Case Format */}
        <div className="space-y-2">
          <Label className="text-sm">Case Format</Label>
          <div className="flex gap-2">
            <Button
              variant={options.caseFormat === "lowercase" ? "default" : "outline"}
              size="sm"
              onClick={() => setOptions({ ...options, caseFormat: "lowercase" })}
              className="flex-1"
            >
              Lowercase
            </Button>
            <Button
              variant={options.caseFormat === "uppercase" ? "default" : "outline"}
              size="sm"
              onClick={() => setOptions({ ...options, caseFormat: "uppercase" })}
              className="flex-1"
            >
              Uppercase
            </Button>
          </div>
        </div>

        {/* Hyphen Format */}
        <div className="space-y-2">
          <Label className="text-sm">Hyphen Format</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={options.hyphenFormat === "with-hyphens" ? "default" : "outline"}
              size="sm"
              onClick={() => setOptions({ ...options, hyphenFormat: "with-hyphens" })}
              className="text-xs"
            >
              With Hyphens
            </Button>
            <Button
              variant={options.hyphenFormat === "without-hyphens" ? "default" : "outline"}
              size="sm"
              onClick={() => setOptions({ ...options, hyphenFormat: "without-hyphens" })}
              className="text-xs"
            >
              No Hyphens
            </Button>
            <Button
              variant={options.hyphenFormat === "with-braces" ? "default" : "outline"}
              size="sm"
              onClick={() => setOptions({ ...options, hyphenFormat: "with-braces" })}
              className="text-xs"
            >
              With Braces
            </Button>
          </div>
        </div>
      </section>

      {/* Output */}
      {formatUUID && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {formatUUID.error ? "Error" : "Formatted UUID"}
            </Label>
            {!formatUUID.error && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(formatUUID.formatted, "output")}
                className="h-7"
              >
                {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            )}
          </div>

          <div className={cn(
            "rounded-lg border p-4",
            formatUUID.error 
              ? "bg-destructive/10 border-destructive/30" 
              : "bg-muted/30"
          )}>
            {formatUUID.error ? (
              <p className="text-destructive">{formatUUID.error}</p>
            ) : (
              <p className="font-mono text-lg break-all">{formatUUID.formatted}</p>
            )}
          </div>

          {!formatUUID.error && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Length: <span className="font-medium text-foreground">{formatUUID.formatted.length} characters</span></span>
              <span>Format: <span className="font-medium text-foreground">{options.caseFormat === "uppercase" ? "Uppercase" : "Lowercase"} {options.hyphenFormat.replace("-", " + ")}</span></span>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">UUID Format Standards</h4>
            <p className="text-sm text-muted-foreground">
              UUIDs can be represented in multiple formats. The standard RFC 4122 format uses 
              lowercase hexadecimal with hyphens: <code className="bg-muted px-1 rounded">xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</code>
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><strong>Standard:</strong> Lowercase with hyphens (RFC 4122)</li>
              <li><strong>Uppercase:</strong> Often used in Windows/GUID contexts</li>
              <li><strong>No hyphens:</strong> Used in compact storage or URLs</li>
              <li><strong>With braces:</strong> Microsoft GUID format: {"{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}"}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

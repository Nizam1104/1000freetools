"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function JsonValidator() {
  const [input, setInput] = useState("")
  const [indentSize, setIndentSize] = useState(2)
  const [viewMode, setViewMode] = useState<"pretty" | "compact">("pretty")
  const [copied, setCopied] = useState<string | null>(null)

  const validation = useMemo(() => {
    if (!input.trim()) {
      return { valid: null, error: null, parsed: null }
    }

    try {
      const parsed = JSON.parse(input)
      return { valid: true, error: null, parsed }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid JSON"
      return { valid: false, error: errorMessage, parsed: null }
    }
  }, [input])

  const output = useMemo(() => {
    if (!validation.parsed) return ""

    if (viewMode === "pretty") {
      return JSON.stringify(validation.parsed, null, indentSize)
    } else {
      return JSON.stringify(validation.parsed)
    }
  }, [validation.parsed, viewMode, indentSize])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const getErrorLocation = useCallback((errorMsg: string): { line?: number; column?: number } => {
    const positionMatch = errorMsg.match(/position\s+(\d+)/i)
    if (!positionMatch || !input) return {}

    const position = parseInt(positionMatch[1])
    const textBeforePosition = input.substring(0, position)
    const lines = textBeforePosition.split("\n")
    const line = lines.length
    const column = lines[lines.length - 1].length + 1

    return { line, column }
  }, [input])

  const errorLocation = useMemo(() => {
    if (!validation.error) return {}
    return getErrorLocation(validation.error)
  }, [validation.error, getErrorLocation])

  const stats = useMemo(() => {
    if (!validation.parsed) return null

    const countProperties = (obj: any): number => {
      if (typeof obj !== "object" || obj === null) return 0
      let count = 0
      for (const key in obj) {
        count++
        if (typeof obj[key] === "object" && obj[key] !== null) {
          count += countProperties(obj[key])
        }
      }
      return count
    }

    const countArrayItems = (obj: any): number => {
      if (!Array.isArray(obj)) return 0
      let count = obj.length
      obj.forEach((item) => {
        count += countArrayItems(item)
      })
      return count
    }

    return {
      properties: countProperties(validation.parsed),
      arrayItems: countArrayItems(validation.parsed),
      topLevelKeys: Object.keys(validation.parsed).length,
      depth: JSON.stringify(validation.parsed).split("\n").length,
    }
  }, [validation.parsed])

  const sampleJson = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  },
  "phones": [
    "+1-555-123-4567",
    "+1-555-987-6543"
  ],
  "active": true
}`

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="json-input" className="text-base font-medium">
            JSON Input
          </Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="xs" onClick={() => setInput(sampleJson)} className="h-7">
              Load Sample
            </Button>
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
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[200px]",
            validation.valid === false && "border-destructive focus-visible:border-destructive"
          )}
          placeholder='{"key": "value"}'
        />
      </section>

      {/* Validation Status */}
      {input.trim() && (
        <section>
          {validation.valid === true ? (
            <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4 flex items-center gap-3">
              <CheckCircle2 className="size-5 text-green-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-600">Valid JSON</p>
                <p className="text-xs text-muted-foreground">Your JSON is properly formatted</p>
              </div>
            </div>
          ) : validation.valid === false ? (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 space-y-2">
              <div className="flex items-center gap-3">
                <AlertCircle className="size-5 text-destructive shrink-0" />
                <div>
                  <p className="text-sm font-medium text-destructive">Invalid JSON</p>
                  <p className="text-xs text-muted-foreground">{validation.error}</p>
                </div>
              </div>
              {errorLocation.line && (
                <p className="text-xs text-muted-foreground">
                  Error at line {errorLocation.line}, column {errorLocation.column}
                </p>
              )}
            </div>
          ) : null}
        </section>
      )}

      {/* Options */}
      {validation.valid === true && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Output Options</Label>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="view-mode" className="text-sm">
                View Mode:
              </Label>
              <Select value={viewMode} onValueChange={(v) => setViewMode(v as "pretty" | "compact")}>
                <SelectTrigger id="view-mode" className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pretty">Pretty Print</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {viewMode === "pretty" && (
              <div className="flex items-center gap-2">
                <Label htmlFor="indent-size" className="text-sm">
                  Indent:
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
            )}
          </div>
        </section>
      )}

      {/* Output Section */}
      {validation.valid === true && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Formatted JSON</Label>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(output, "output")}>
              {copied === "output" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm min-h-[300px]"
          />
        </section>
      )}

      {/* Statistics */}
      {stats && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">JSON Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.topLevelKeys}</p>
              <p className="text-xs text-muted-foreground mt-1">Top-level Keys</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.properties}</p>
              <p className="text-xs text-muted-foreground mt-1">Total Properties</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.arrayItems}</p>
              <p className="text-xs text-muted-foreground mt-1">Array Items</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{new Blob([output]).size.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Size (bytes)</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

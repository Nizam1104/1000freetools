"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Download } from "lucide-react"

function parseBasicYaml(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  const lines = yaml.replace(/\r\n/g, "\n").split("\n")
  const stack: { obj: Record<string, unknown>; indent: number }[] = [{ obj: result, indent: -1 }]

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue

    const indent = line.search(/\S/)
    const match = trimmed.match(/^([^\s:#]+)\s*:\s*(.*)$/)
    if (!match) continue

    const [, key, rawValue] = match

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop()
    }

    const current = stack[stack.length - 1].obj

    const value = rawValue.trim()
    if (value === "" || value === "{}") {
      current[key] = {}
      stack.push({ obj: current[key] as Record<string, unknown>, indent })
      continue
    }

    let parsed: unknown = value
    if (value === "true") parsed = true
    else if (value === "false") parsed = false
    else if (value === "null" || value === "~") parsed = null
    else if (/^-?\d+$/.test(value)) parsed = Number.parseInt(value, 10)
    else if (/^-?\d*\.\d+$/.test(value)) parsed = Number.parseFloat(value)
    else if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      parsed = value.slice(1, -1)
    }

    current[key] = parsed
  }

  return result
}

function flattenToProperties(
  value: unknown,
  parentKey = "",
  out: Record<string, string> = {},
): Record<string, string> {
  if (Array.isArray(value)) {
    value.forEach((v, idx) => flattenToProperties(v, parentKey ? `${parentKey}[${idx}]` : `[${idx}]`, out))
    return out
  }
  if (typeof value === "object" && value !== null) {
    for (const [k, v] of Object.entries(value)) {
      const nextKey = parentKey ? `${parentKey}.${k}` : k
      flattenToProperties(v, nextKey, out)
    }
    return out
  }
  if (parentKey) out[parentKey] = String(value ?? "")
  return out
}

export function YamlToPropertiesConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const parsed = parseBasicYaml(input)
      const flattened = flattenToProperties(parsed)
      const properties = Object.entries(flattened)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}=${v}`)
        .join("\n")
      setOutput(properties)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion error")
      setOutput("")
    }
  }, [input])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setError("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "output.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML to Properties Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML to Java properties format
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your data here..."
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="min-h-[400px] font-mono text-sm bg-muted"
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
        <h3 className="font-medium">How to use</h3>
        <p className="text-sm text-muted-foreground">
          Enter your data in the input field, click Convert, and the result will appear in the output field.
          You can then copy or download the result.
        </p>
      </div>
    </div>
  )
}

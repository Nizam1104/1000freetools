"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

function base64UrlToUtf8(input: string) {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=")
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function decodeJwt(token: string) {
  const parts = token.trim().split(".")
  if (parts.length < 2) throw new Error("Expected a JWT with at least header.payload")
  const header = JSON.parse(base64UrlToUtf8(parts[0]))
  const payload = JSON.parse(base64UrlToUtf8(parts[1]))
  return { header, payload, hasSignature: parts.length >= 3 }
}

function stableJson(value: unknown) {
  const seen = new WeakSet<object>()
  const sortObj = (v: any): any => {
    if (!v || typeof v !== "object") return v
    if (seen.has(v)) return v
    seen.add(v)
    if (Array.isArray(v)) return v.map(sortObj)
    return Object.keys(v)
      .sort()
      .reduce((acc: any, k) => {
        acc[k] = sortObj(v[k])
        return acc
      }, {})
  }
  return JSON.stringify(sortObj(value), null, 2)
}

function diffObjects(a: any, b: any) {
  const keys = new Set<string>([...Object.keys(a ?? {}), ...Object.keys(b ?? {})])
  const diffs: Array<{ key: string; a: unknown; b: unknown; change: "added" | "removed" | "changed" | "same" }> = []
  for (const key of Array.from(keys).sort()) {
    const av = a?.[key]
    const bv = b?.[key]
    const aHas = Object.prototype.hasOwnProperty.call(a ?? {}, key)
    const bHas = Object.prototype.hasOwnProperty.call(b ?? {}, key)
    let change: "added" | "removed" | "changed" | "same"
    if (!aHas && bHas) change = "added"
    else if (aHas && !bHas) change = "removed"
    else if (stableJson(av) !== stableJson(bv)) change = "changed"
    else change = "same"
    diffs.push({ key, a: av, b: bv, change })
  }
  return diffs.filter((d) => d.change !== "same")
}

export function JwtTokenDiffCompare() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const tokens = input
        .split(/\s+/)
        .map((t) => t.trim())
        .filter(Boolean)
        .filter((t) => t.includes("."))

      if (tokens.length < 2) {
        throw new Error("Paste two JWTs (separated by whitespace/newlines).")
      }

      const a = decodeJwt(tokens[0])
      const b = decodeJwt(tokens[1])

      const headerDiff = diffObjects(a.header as any, b.header as any)
      const payloadDiff = diffObjects(a.payload as any, b.payload as any)

      const report = {
        tokenA: { hasSignature: a.hasSignature, header: a.header, payload: a.payload },
        tokenB: { hasSignature: b.hasSignature, header: b.header, payload: b.payload },
        diffs: {
          header: headerDiff,
          payload: payloadDiff,
        },
        notes: ["Diff is computed on top-level keys only.", "JWTs are decoded without verifying signatures."],
      }

      setOutput(stableJson(report))
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
            <h2 className="text-2xl font-semibold tracking-tight">JWT Token Diff/Compare</h2>
            <p className="text-sm text-muted-foreground">
              Compare differences between JWT tokens
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

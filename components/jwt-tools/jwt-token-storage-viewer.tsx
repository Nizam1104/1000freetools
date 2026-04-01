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

function tryDecodeJwt(token: string) {
  const parts = token.trim().split(".")
  if (parts.length < 2) return null
  try {
    const header = JSON.parse(base64UrlToUtf8(parts[0]))
    const payload = JSON.parse(base64UrlToUtf8(parts[1]))
    return { header, payload, hasSignature: parts.length >= 3 }
  } catch {
    return null
  }
}

function looksLikeJwt(value: string) {
  const parts = value.trim().split(".")
  return parts.length >= 2 && parts[0].length > 0 && parts[1].length > 0
}

function parseKeyValueLines(text: string) {
  const out: Record<string, string> = {}
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line) continue
    const idx = line.indexOf("=")
    if (idx === -1) continue
    const k = line.slice(0, idx).trim()
    const v = line.slice(idx + 1).trim()
    if (k) out[k] = v
  }
  return out
}

function scanForJwtStrings(value: unknown, path: string, hits: Array<{ path: string; token: string }>) {
  if (typeof value === "string") {
    if (looksLikeJwt(value)) hits.push({ path, token: value.trim() })
    return
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => scanForJwtStrings(v, `${path}[${i}]`, hits))
    return
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      scanForJwtStrings(v, path ? `${path}.${k}` : k, hits)
    }
  }
}

export function JwtTokenStorageViewer() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const trimmed = input.trim()
      if (!trimmed) {
        setOutput("")
        return
      }

      let parsed: unknown = null
      try {
        parsed = JSON.parse(trimmed)
      } catch {
        // If it isn't JSON, try cookie/localStorage exports (key=value per line)
        parsed = parseKeyValueLines(trimmed)
      }

      const hits: Array<{ path: string; token: string }> = []
      scanForJwtStrings(parsed, "", hits)

      const decoded = hits
        .map((h) => {
          const d = tryDecodeJwt(h.token)
          if (!d) return null
          return { path: h.path || "(root)", token: h.token, ...d }
        })
        .filter(Boolean) as Array<{
        path: string
        token: string
        header: unknown
        payload: unknown
        hasSignature: boolean
      }>

      const report = {
        scannedType: Array.isArray(parsed) ? "array" : typeof parsed === "object" && parsed ? "object" : typeof parsed,
        jwtCandidatesFound: hits.length,
        jwtDecoded: decoded.length,
        results: decoded.map((d) => ({
          path: d.path,
          hasSignature: d.hasSignature,
          header: d.header,
          payload: d.payload,
          tokenPreview: d.token.length > 40 ? `${d.token.slice(0, 20)}…${d.token.slice(-20)}` : d.token,
        })),
      }

      setOutput(JSON.stringify(report, null, 2))
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
            <h2 className="text-2xl font-semibold tracking-tight">JWT Token Storage Viewer</h2>
            <p className="text-sm text-muted-foreground">
              View and analyze JWT token storage
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

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

function utf8ToBase64Url(input: string) {
  const bytes = new TextEncoder().encode(input)
  let bin = ""
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

function decodeJwtParts(token: string) {
  const parts = token.trim().split(".")
  if (parts.length < 2) throw new Error("Expected a JWT with at least header.payload")
  const header = JSON.parse(base64UrlToUtf8(parts[0]))
  const payload = JSON.parse(base64UrlToUtf8(parts[1]))
  return { parts, header, payload }
}

function redactPayload(payload: Record<string, unknown>) {
  const keep = new Set(["iss", "sub", "aud", "exp", "iat", "nbf", "jti", "scope"])
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(payload)) {
    if (keep.has(k)) out[k] = v
    else if (v === null) out[k] = null
    else if (typeof v === "number" || typeof v === "boolean") out[k] = v
    else if (typeof v === "string") out[k] = "<redacted>"
    else out[k] = "<redacted>"
  }
  return out
}

function maskMiddle(s: string, head = 8, tail = 8) {
  if (s.length <= head + tail + 3) return s
  return `${s.slice(0, head)}…${s.slice(-tail)}`
}

export function JwtTokenScramblerObfuscator() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const token = input.trim()
      if (!token) {
        setOutput("")
        return
      }

      const { parts, header, payload } = decodeJwtParts(token)
      const redacted = redactPayload(payload ?? {})
      const newHeader = { ...header }

      const headerSeg = utf8ToBase64Url(JSON.stringify(newHeader))
      const payloadSeg = utf8ToBase64Url(JSON.stringify(redacted))
      const scrambledToken = `${headerSeg}.${payloadSeg}.[redacted]`

      const report = {
        original: {
          header,
          payload,
          tokenPreview: maskMiddle(token, 16, 16),
          segments: parts.map((p) => maskMiddle(p, 12, 12)),
        },
        scrambled: {
          token: scrambledToken,
          header: newHeader,
          payload: redacted,
        },
        notes: [
          "This does not preserve the original signature (signature is replaced with [redacted]).",
          "Use this output for sharing examples without leaking sensitive claims.",
        ],
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
            <h2 className="text-2xl font-semibold tracking-tight">JWT Token Scrambler</h2>
            <p className="text-sm text-muted-foreground">
              Obfuscate and scramble JWT tokens
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

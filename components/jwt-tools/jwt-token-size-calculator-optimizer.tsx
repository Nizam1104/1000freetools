"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Download } from "lucide-react"

function byteLengthUtf8(str: string) {
  return new TextEncoder().encode(str).byteLength
}

function base64UrlToString(b64url: string) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((b64url.length + 3) % 4)
  const binary = atob(b64)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function JwtTokenSizeCalculatorOptimizer() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const token = input.trim()
      const parts = token.split(".")
      if (parts.length < 2) throw new Error("JWT must have at least header.payload (and usually signature)")

      const [headerB64, payloadB64, signatureB64 = ""] = parts
      const headerJson = base64UrlToString(headerB64)
      const payloadJson = base64UrlToString(payloadB64)

      let header: unknown = null
      let payload: unknown = null
      try {
        header = JSON.parse(headerJson)
      } catch {}
      try {
        payload = JSON.parse(payloadJson)
      } catch {}

      const totalBytes = byteLengthUtf8(token)
      const report = [
        `Total token length (chars): ${token.length}`,
        `Total token size (utf-8 bytes): ${totalBytes}`,
        "",
        `Header segment (chars): ${headerB64.length}`,
        `Payload segment (chars): ${payloadB64.length}`,
        `Signature segment (chars): ${signatureB64.length}`,
        "",
        `Decoded header bytes: ${byteLengthUtf8(headerJson)}`,
        `Decoded payload bytes: ${byteLengthUtf8(payloadJson)}`,
        "",
        `Header JSON: ${typeof header === "object" && header !== null ? JSON.stringify(header) : headerJson}`,
        `Payload JSON: ${typeof payload === "object" && payload !== null ? JSON.stringify(payload) : payloadJson}`,
        "",
        "Optimization tips:",
        "- Use shorter claim names for custom fields",
        "- Avoid large arrays / embedded objects",
        "- Prefer reference IDs over embedded documents",
        "- If using JWE/JWK inline, consider key IDs (kid) + server-side key lookup",
      ].join("\n")

      setOutput(report)
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
            <h2 className="text-2xl font-semibold tracking-tight">JWT Token Size Calculator</h2>
            <p className="text-sm text-muted-foreground">
              Calculate and optimize JWT token sizes
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

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

function toIsoIfSeconds(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null
  // JWT times are NumericDate: seconds since epoch
  return new Date(value * 1000).toISOString()
}

export function JwtTokenLifespanRenewalSimulator() {
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

      const { header, payload, hasSignature } = decodeJwt(token)
      const nowMs = Date.now()
      const nowSec = Math.floor(nowMs / 1000)

      const exp = (payload as any)?.exp
      const iat = (payload as any)?.iat
      const nbf = (payload as any)?.nbf

      const secondsUntilExp = typeof exp === "number" ? exp - nowSec : null
      const secondsSinceIat = typeof iat === "number" ? nowSec - iat : null
      const secondsUntilNbf = typeof nbf === "number" ? nbf - nowSec : null

      const recommendedRefreshSkewSec = 60
      const recommendedRefreshAt =
        typeof exp === "number" ? Math.max((exp as number) - recommendedRefreshSkewSec, nowSec) : null

      const report = {
        now: { epochSeconds: nowSec, iso: new Date(nowMs).toISOString() },
        hasSignature,
        header,
        claims: {
          iat: { value: iat ?? null, iso: toIsoIfSeconds(iat) },
          nbf: { value: nbf ?? null, iso: toIsoIfSeconds(nbf) },
          exp: { value: exp ?? null, iso: toIsoIfSeconds(exp) },
        },
        derived: {
          secondsSinceIat,
          secondsUntilNbf,
          secondsUntilExp,
          isNotYetValid: typeof secondsUntilNbf === "number" ? secondsUntilNbf > 0 : null,
          isExpired: typeof secondsUntilExp === "number" ? secondsUntilExp <= 0 : null,
          recommendedRefresh: recommendedRefreshAt
            ? { epochSeconds: recommendedRefreshAt, iso: new Date(recommendedRefreshAt * 1000).toISOString() }
            : null,
        },
        notes: [
          "This tool decodes JWT claims without verifying the signature.",
          "JWT time claims (iat/nbf/exp) are interpreted as seconds since UNIX epoch.",
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
            <h2 className="text-2xl font-semibold tracking-tight">JWT Token Lifespan Simulator</h2>
            <p className="text-sm text-muted-foreground">
              Simulate JWT token lifespan and renewal
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

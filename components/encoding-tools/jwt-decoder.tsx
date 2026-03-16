"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function JwtDecoder() {
  const [input, setInput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  interface JwtParts {
    header: Record<string, any> | null
    payload: Record<string, any> | null
    signature: string
    valid: boolean
  }

  const decodeBase64Url = (str: string): string => {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/")
    const padding = base64.length % 4
    if (padding) {
      base64 += "=".repeat(4 - padding)
    }
    return atob(base64)
  }

  const jwtData = useMemo((): JwtParts | null => {
    if (!input.trim()) return null
    
    try {
      const parts = input.trim().split(".")
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. Expected 3 parts separated by dots.")
      }

      const [headerB64, payloadB64, signature] = parts
      
      const header = JSON.parse(decodeBase64Url(headerB64))
      const payload = JSON.parse(decodeBase64Url(payloadB64))

      return {
        header,
        payload,
        signature,
        valid: true
      }
    } catch (err) {
      return {
        header: null,
        payload: null,
        signature: "",
        valid: false
      }
    }
  }, [input])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const formatJson = (obj: Record<string, unknown> | null): string => {
    if (!obj) return ""
    return JSON.stringify(obj, null, 2)
  }

  const formatTime = (timestamp: number): string => {
    try {
      return new Date(timestamp * 1000).toLocaleString()
    } catch {
      return "Invalid timestamp"
    }
  }

  const isExpired = (exp: number): boolean => {
    return Date.now() > exp * 1000
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="jwt-input" className="text-base font-medium">
            JWT Token
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
              onClick={() => {
                setInput("")
                setError(null)
              }}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="jwt-input"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[100px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Paste your JWT token here (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)..."
        />
      </section>

      {/* Decoded Output */}
      {jwtData && (
        <>
          {!jwtData.valid && (
            <section className="rounded-lg border border-destructive bg-destructive/10 p-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="size-5" />
                <span className="font-medium">Invalid JWT</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                The token does not appear to be a valid JWT. Ensure it has three parts separated by dots.
              </p>
            </section>
          )}

          {jwtData.valid && jwtData.header && jwtData.payload && (
            <>
              {/* Header */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Header</Label>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(formatJson(jwtData.header), "header")}
                    className="h-7"
                  >
                    {copied === "header" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <pre className="font-mono text-sm overflow-x-auto">
                    {formatJson(jwtData.header)}
                  </pre>
                </div>
              </section>

              {/* Payload */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Payload</Label>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(formatJson(jwtData.payload), "payload")}
                    className="h-7"
                  >
                    {copied === "payload" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <pre className="font-mono text-sm overflow-x-auto">
                    {formatJson(jwtData.payload)}
                  </pre>
                </div>

                {/* Time-based claims */}
                {(jwtData.payload.exp || jwtData.payload.iat || jwtData.payload.nbf) && (
                  <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                    <Label className="text-sm font-medium">Time Claims</Label>
                    {jwtData.payload.exp && (
                      <div className={cn(
                        "flex items-center justify-between text-sm",
                        isExpired(jwtData.payload.exp as number) ? "text-destructive" : ""
                      )}>
                        <span className="text-muted-foreground">exp (Expiration):</span>
                        <span className="font-mono">
                          {formatTime(jwtData.payload.exp as number)}
                          {isExpired(jwtData.payload.exp as number) && " (EXPIRED)"}
                        </span>
                      </div>
                    )}
                    {jwtData.payload.iat && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">iat (Issued At):</span>
                        <span className="font-mono">{formatTime(jwtData.payload.iat as number)}</span>
                      </div>
                    )}
                    {jwtData.payload.nbf && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">nbf (Not Before):</span>
                        <span className="font-mono">{formatTime(jwtData.payload.nbf as number)}</span>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* Signature */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Signature</Label>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(jwtData.signature, "signature")}
                    className="h-7"
                  >
                    {copied === "signature" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <pre className="font-mono text-xs overflow-x-auto break-all">
                    {jwtData.signature}
                  </pre>
                </div>
              </section>
            </>
          )}
        </>
      )}

      {/* Empty state */}
      {!input && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Paste a JWT token above to decode and inspect its contents</p>
        </div>
      )}
    </div>
  )
}

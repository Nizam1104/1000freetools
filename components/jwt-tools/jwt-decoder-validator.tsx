"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, AlertTriangle, Shield, ShieldOff } from "lucide-react"
import { cn } from "@/lib/utils"

export default function JwtDecoderValidator() {
  const [input, setInput] = useState<string>("")
  const [secret, setSecret] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [validationResult, setValidationResult] = useState<"valid" | "invalid" | "unchecked" | null>(null)

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
        throw new Error("Invalid JWT format")
      }

      const [headerB64, payloadB64, signature] = parts
      const header = JSON.parse(decodeBase64Url(headerB64))
      const payload = JSON.parse(decodeBase64Url(payloadB64))

      return { header, payload, signature, valid: true }
    } catch {
      return { header: null, payload: null, signature: "", valid: false }
    }
  }, [input])

  const verifySignature = useCallback(async (): Promise<boolean> => {
    if (!input || !secret || !jwtData) return false
    
    try {
      const parts = input.trim().split(".")
      const data = parts.slice(0, 2).join(".")
      
      const encoder = new TextEncoder()
      const keyData = encoder.encode(secret)
      
      const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"]
      )
      
      const signature = parts[2].replace(/-/g, "+").replace(/_/g, "/")
      const padding = signature.length % 4
      const paddedSig = padding ? signature + "=".repeat(4 - padding) : signature
      const signatureBytes = Uint8Array.from(atob(paddedSig), c => c.charCodeAt(0))
      
      const isValid = await crypto.subtle.verify(
        "HMAC",
        key,
        signatureBytes,
        encoder.encode(data)
      )
      
      return isValid
    } catch {
      return false
    }
  }, [input, secret, jwtData])

  const handleVerify = useCallback(async () => {
    const isValid = await verifySignature()
    setValidationResult(isValid ? "valid" : "invalid")
  }, [verifySignature])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

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

  const getAlgorithmSecurity = (alg: string): "secure" | "warning" | "danger" => {
    if (alg === "none") return "danger"
    if (alg.startsWith("HS") && alg.length <= 6) return "warning"
    if (["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512"].includes(alg)) {
      return "secure"
    }
    return "warning"
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="jwt-input" className="text-base font-medium">JWT Token</Label>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7" disabled={!input}>
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => { setInput(""); setValidationResult(null); }} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea id="jwt-input" value={input} onChange={(e) => { setInput(e.target.value); setValidationResult(null); }}
          className="font-mono text-sm min-h-[100px]" placeholder="Paste JWT token (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)..." />
      </section>

      {/* Signature Verification */}
      {jwtData?.valid && (
        <section className="space-y-3">
          <Label htmlFor="secret" className="text-base font-medium">Secret / Public Key (for verification)</Label>
          <div className="flex gap-2">
            <Input id="secret" type="password" value={secret} onChange={(e) => { setSecret(e.target.value); setValidationResult(null); }}
              className="font-mono" placeholder="Enter secret key..." />
            <Button onClick={handleVerify} disabled={!secret}>Verify Signature</Button>
          </div>

          {validationResult === "valid" && (
            <div className="rounded-lg border border-green-500 bg-green-500/10 p-3 text-green-600 dark:text-green-400">
              <div className="flex items-center gap-2"><Shield className="size-4" /><span>Signature is valid</span></div>
            </div>
          )}
          {validationResult === "invalid" && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive">
              <div className="flex items-center gap-2"><ShieldOff className="size-4" /><span>Signature is invalid</span></div>
            </div>
          )}
        </section>
      )}

      {/* Decoded Output */}
      {jwtData?.valid && jwtData.header && jwtData.payload && (
        <>
          {/* Header */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Header</Label>
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(JSON.stringify(jwtData.header, null, 2), "header")} className="h-7">
                {copied === "header" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <pre className="font-mono text-sm overflow-x-auto">{JSON.stringify(jwtData.header, null, 2)}</pre>
            </div>
            {jwtData.header.alg && (
              <div className={cn("flex items-center gap-2 text-sm mt-2",
                getAlgorithmSecurity(jwtData.header.alg as string) === "danger" ? "text-destructive" :
                getAlgorithmSecurity(jwtData.header.alg as string) === "warning" ? "text-yellow-600" : "text-green-600"
              )}>
                {getAlgorithmSecurity(jwtData.header.alg as string) === "danger" ? <AlertTriangle className="size-4" /> :
                 getAlgorithmSecurity(jwtData.header.alg as string) === "warning" ? <ShieldOff className="size-4" /> :
                 <Shield className="size-4" />}
                <span>Algorithm: {jwtData.header.alg} - {
                  getAlgorithmSecurity(jwtData.header.alg as string) === "danger" ? "Insecure (none algorithm)" :
                  getAlgorithmSecurity(jwtData.header.alg as string) === "warning" ? "Consider stronger algorithm" : "Secure"
                }</span>
              </div>
            )}
          </section>

          {/* Payload */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Payload</Label>
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(JSON.stringify(jwtData.payload, null, 2), "payload")} className="h-7">
                {copied === "payload" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <pre className="font-mono text-sm overflow-x-auto">{JSON.stringify(jwtData.payload, null, 2)}</pre>
            </div>
            {(jwtData.payload.exp || jwtData.payload.iat) && (
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <Label className="text-sm font-medium">Time Claims</Label>
                {jwtData.payload.exp && (
                  <div className={cn("flex items-center justify-between text-sm", isExpired(jwtData.payload.exp as number) ? "text-destructive" : "")}>
                    <span className="text-muted-foreground">exp:</span>
                    <span className="font-mono">{formatTime(jwtData.payload.exp as number)}{isExpired(jwtData.payload.exp as number) && " (EXPIRED)"}</span>
                  </div>
                )}
                {jwtData.payload.iat && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">iat:</span>
                    <span className="font-mono">{formatTime(jwtData.payload.iat as number)}</span>
                  </div>
                )}
              </div>
            )}
          </section>
        </>
      )}

      {!jwtData?.valid && input && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
          <div className="flex items-center gap-2 text-destructive"><AlertTriangle className="size-5" /><span className="font-medium">Invalid JWT</span></div>
          <p className="text-sm text-muted-foreground mt-1">The token does not appear to be a valid JWT format.</p>
        </div>
      )}
    </div>
  )
}

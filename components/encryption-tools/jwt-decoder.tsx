"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, AlertTriangle, Shield, ShieldOff, Key, Lock, Info, Eye, EyeOff, FileSignature } from "lucide-react"
import { cn } from "@/lib/utils"

interface JwtData {
  header: Record<string, any> | null
  payload: Record<string, any> | null
  signature: string
  valid: boolean
  error?: string
}

export default function JwtDecoder() {
  const [input, setInput] = useState<string>("")
  const [secret, setSecret] = useState<string>("")
  const [publicKey, setPublicKey] = useState<string>("")
  const [secretType, setSecretType] = useState<"hmac" | "rsa" | "ec">("hmac")
  const [showSecret, setShowSecret] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [validationResult, setValidationResult] = useState<"valid" | "invalid" | "unchecked" | null>(null)
  const [isVerifying, setIsVerifying] = useState<boolean>(false)

  const decodeBase64Url = useCallback((str: string): string => {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/")
    const padding = base64.length % 4
    if (padding) {
      base64 += "=".repeat(4 - padding)
    }
    return atob(base64)
  }, [])

  const jwtData = useMemo((): JwtData | null => {
    if (!input.trim()) return null

    try {
      const parts = input.trim().split(".")
      if (parts.length !== 3) {
        return { header: null, payload: null, signature: "", valid: false, error: "Invalid JWT format - expected 3 parts" }
      }

      const [headerB64, payloadB64, signature] = parts

      if (!headerB64 || !payloadB64) {
        return { header: null, payload: null, signature: "", valid: false, error: "Empty header or payload" }
      }

      const header = JSON.parse(decodeBase64Url(headerB64))
      const payload = JSON.parse(decodeBase64Url(payloadB64))

      return { header, payload, signature, valid: true }
    } catch (err) {
      return {
        header: null,
        payload: null,
        signature: "",
        valid: false,
        error: err instanceof Error ? err.message : "Failed to decode JWT",
      }
    }
  }, [input, decodeBase64Url])

  const verifyHmacSignature = useCallback(async (): Promise<boolean> => {
    if (!input || !secret || !jwtData) return false

    try {
      const parts = input.trim().split(".")
      const data = parts.slice(0, 2).join(".")

      const encoder = new TextEncoder()
      const keyData = encoder.encode(secret)

      const algorithm = jwtData.header?.alg === "HS384" ? "SHA-384" :
                        jwtData.header?.alg === "HS512" ? "SHA-512" : "SHA-256"

      const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: algorithm },
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

  const verifyRsaSignature = useCallback(async (): Promise<boolean> => {
    if (!input || !publicKey || !jwtData) return false

    try {
      const parts = input.trim().split(".")
      const data = parts.slice(0, 2).join(".")

      // Extract PEM key content
      const keyContent = publicKey
        .replace(/-----BEGIN.*-----/, "")
        .replace(/-----END.*-----/, "")
        .replace(/\s/g, "")

      const keyBuffer = pemToArrayBuffer(`-----BEGIN PUBLIC KEY-----\n${keyContent}\n-----END PUBLIC KEY-----`)

      const algorithm = jwtData.header?.alg === "RS384" ? "SHA-384" :
                        jwtData.header?.alg === "RS512" ? "SHA-512" : "SHA-256"

      const publicKeyObj = await crypto.subtle.importKey(
        "spki",
        keyBuffer,
        { name: "RSASSA-PKCS1-v1_5", hash: algorithm },
        false,
        ["verify"]
      )

      const signature = parts[2].replace(/-/g, "+").replace(/_/g, "/")
      const padding = signature.length % 4
      const paddedSig = padding ? signature + "=".repeat(4 - padding) : signature
      const signatureBytes = Uint8Array.from(atob(paddedSig), c => c.charCodeAt(0))

      const encoder = new TextEncoder()
      const isValid = await crypto.subtle.verify(
        "RSASSA-PKCS1-v1_5",
        publicKeyObj,
        signatureBytes,
        encoder.encode(data)
      )

      return isValid
    } catch {
      return false
    }
  }, [input, publicKey, jwtData])

  const pemToArrayBuffer = (pem: string): ArrayBuffer => {
    const base64 = pem
      .replace(/-----BEGIN.*-----/, "")
      .replace(/-----END.*-----/, "")
      .replace(/\s/g, "")
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes.buffer
  }

  const handleVerify = useCallback(async () => {
    if (!jwtData?.header?.alg) return

    setIsVerifying(true)

    let isValid = false
    if (secretType === "hmac") {
      isValid = await verifyHmacSignature()
    } else if (secretType === "rsa") {
      isValid = await verifyRsaSignature()
    }

    setValidationResult(isValid ? "valid" : "invalid")
    setIsVerifying(false)
  }, [jwtData, secretType, verifyHmacSignature, verifyRsaSignature])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const formatTime = useCallback((timestamp: number): string => {
    try {
      return new Date(timestamp * 1000).toLocaleString()
    } catch {
      return "Invalid timestamp"
    }
  }, [])

  const isExpired = useCallback((exp: number): boolean => {
    return Date.now() > exp * 1000
  }, [])

  const getAlgorithmSecurity = useCallback((alg: string): "secure" | "warning" | "danger" => {
    if (alg === "none") return "danger"
    if (alg.startsWith("HS") && alg.length <= 6) return "warning"
    if (["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512"].includes(alg)) {
      return "secure"
    }
    return "warning"
  }, [])

  const handleClear = useCallback(() => {
    setInput("")
    setSecret("")
    setPublicKey("")
    setValidationResult(null)
  }, [])

  // Sample JWT for testing
  const loadSampleJwt = useCallback(() => {
    // This is a sample JWT with HMAC signature (not secure for production)
    const sampleJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE4OTM0NTY3ODksImlzcyI6ImV4YW1wbGUuY29tIiwiYXVkIjoiYXBpLmV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    setInput(sampleJwt)
    setSecret("your-256-bit-secret")
    setValidationResult(null)
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Sample JWT Button */}
      {!input && (
        <section className="flex justify-center">
          <Button variant="outline" onClick={loadSampleJwt}>
            Load Sample JWT
          </Button>
        </section>
      )}

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="jwt-input" className="text-base font-medium">JWT Token</Label>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7" disabled={!input}>
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={handleClear} className="h-7" disabled={!input}>
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="jwt-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setValidationResult(null)
          }}
          className="font-mono text-xs min-h-[100px] break-all"
          placeholder="Paste JWT token (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)..."
        />
      </section>

      {/* Signature Verification Section */}
      {jwtData?.valid && jwtData.header && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Signature Verification</Label>
            <Select value={secretType} onValueChange={(v: "hmac" | "rsa" | "ec") => {
              setSecretType(v)
              setValidationResult(null)
            }}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hmac">HMAC</SelectItem>
                <SelectItem value="rsa">RSA</SelectItem>
                <SelectItem value="ec">EC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {secretType === "hmac" && (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showSecret ? "text" : "password"}
                  value={secret}
                  onChange={(e) => {
                    setSecret(e.target.value)
                    setValidationResult(null)
                  }}
                  className="font-mono pr-10"
                  placeholder="Enter secret key..."
                />
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6"
                >
                  {showSecret ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </Button>
              </div>
              <Button onClick={handleVerify} disabled={!secret || isVerifying}>
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
          )}

          {secretType === "rsa" && (
            <>
              <Textarea
                value={publicKey}
                onChange={(e) => {
                  setPublicKey(e.target.value)
                  setValidationResult(null)
                }}
                className="font-mono text-xs min-h-[80px]"
                placeholder="-----BEGIN PUBLIC KEY-----..."
              />
              <Button onClick={handleVerify} disabled={!publicKey || isVerifying} className="w-full">
                {isVerifying ? "Verifying..." : "Verify Signature"}
              </Button>
            </>
          )}

          {validationResult === "valid" && (
            <div className="rounded-lg border border-green-500 bg-green-500/10 p-3 text-green-600 dark:text-green-400">
              <div className="flex items-center gap-2">
                <Shield className="size-4" />
                <span className="font-medium">Signature is valid</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                The token was signed with the provided key and has not been tampered with.
              </p>
            </div>
          )}

          {validationResult === "invalid" && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive">
              <div className="flex items-center gap-2">
                <ShieldOff className="size-4" />
                <span className="font-medium">Signature is invalid</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                The signature does not match. The token may have been tampered with or the wrong key was used.
              </p>
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

            {/* Algorithm Security */}
            {jwtData.header.alg && (
              <div className={cn(
                "flex items-center gap-2 text-sm p-3 rounded-lg",
                getAlgorithmSecurity(jwtData.header.alg as string) === "danger" ? "bg-destructive/10 text-destructive" :
                getAlgorithmSecurity(jwtData.header.alg as string) === "warning" ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" :
                "bg-green-500/10 text-green-600 dark:text-green-400"
              )}>
                {getAlgorithmSecurity(jwtData.header.alg as string) === "danger" ? <AlertTriangle className="size-4" /> :
                 getAlgorithmSecurity(jwtData.header.alg as string) === "warning" ? <ShieldOff className="size-4" /> :
                 <Shield className="size-4" />}
                <span>
                  Algorithm: <span className="font-mono font-medium">{jwtData.header.alg}</span> - {" "}
                  {getAlgorithmSecurity(jwtData.header.alg as string) === "danger" ? "INSECURE - 'none' algorithm allows unsigned tokens!" :
                   getAlgorithmSecurity(jwtData.header.alg as string) === "warning" ? "Consider using asymmetric algorithms (RS256, ES256)" :
                   "Secure algorithm"}
                </span>
              </div>
            )}

            {/* Token Parts Visualization */}
            <div className="flex gap-1 overflow-hidden">
              <div className="flex-1 bg-blue-500/20 border border-blue-500/50 rounded p-2 text-center">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Header</p>
                <p className="text-xs font-mono truncate">{input.split(".")[0]?.slice(0, 20)}...</p>
              </div>
              <div className="flex-1 bg-green-500/20 border border-green-500/50 rounded p-2 text-center">
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">Payload</p>
                <p className="text-xs font-mono truncate">{input.split(".")[1]?.slice(0, 20)}...</p>
              </div>
              <div className="flex-1 bg-purple-500/20 border border-purple-500/50 rounded p-2 text-center">
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Signature</p>
                <p className="text-xs font-mono truncate">{input.split(".")[2]?.slice(0, 20)}...</p>
              </div>
            </div>
          </section>

          {/* Payload */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Payload (Claims)</Label>
              <Button variant="ghost" size="xs" onClick={() => copyToClipboard(JSON.stringify(jwtData.payload, null, 2), "payload")} className="h-7">
                {copied === "payload" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <pre className="font-mono text-sm overflow-x-auto">{JSON.stringify(jwtData.payload, null, 2)}</pre>
            </div>

            {/* Registered Claims */}
            {(jwtData.payload.exp || jwtData.payload.iat || jwtData.payload.nbf || jwtData.payload.iss || jwtData.payload.aud || jwtData.payload.sub) && (
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <FileSignature className="size-4" />
                  Registered Claims
                </Label>

                {jwtData.payload.iss && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">iss (Issuer):</span>
                    <span className="font-mono">{jwtData.payload.iss}</span>
                  </div>
                )}

                {jwtData.payload.sub && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">sub (Subject):</span>
                    <span className="font-mono">{jwtData.payload.sub}</span>
                  </div>
                )}

                {jwtData.payload.aud && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">aud (Audience):</span>
                    <span className="font-mono">{Array.isArray(jwtData.payload.aud) ? jwtData.payload.aud.join(", ") : jwtData.payload.aud}</span>
                  </div>
                )}

                {jwtData.payload.exp && (
                  <div className={cn(
                    "flex items-center justify-between text-sm",
                    isExpired(jwtData.payload.exp as number) ? "text-destructive" : ""
                  )}>
                    <span className="text-muted-foreground">exp (Expiration):</span>
                    <span className="font-mono">
                      {formatTime(jwtData.payload.exp as number)}
                      {isExpired(jwtData.payload.exp as number) && (
                        <span className="ml-2 text-destructive font-medium">(EXPIRED)</span>
                      )}
                    </span>
                  </div>
                )}

                {jwtData.payload.nbf && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">nbf (Not Before):</span>
                    <span className="font-mono">{formatTime(jwtData.payload.nbf as number)}</span>
                  </div>
                )}

                {jwtData.payload.iat && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">iat (Issued At):</span>
                    <span className="font-mono">{formatTime(jwtData.payload.iat as number)}</span>
                  </div>
                )}

                {jwtData.payload.jti && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">jti (JWT ID):</span>
                    <span className="font-mono">{jwtData.payload.jti}</span>
                  </div>
                )}
              </div>
            )}

            {/* Custom Claims */}
            {Object.keys(jwtData.payload).some(k => !["iss", "sub", "aud", "exp", "nbf", "iat", "jti"].includes(k)) && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <Label className="text-sm font-medium mb-2 block">Custom Claims</Label>
                <div className="space-y-2">
                  {Object.entries(jwtData.payload)
                    .filter(([k]) => !["iss", "sub", "aud", "exp", "nbf", "iat", "jti"].includes(k))
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="font-mono">{typeof value === "object" ? JSON.stringify(value) : String(value)}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </section>
        </>
      )}

      {/* Invalid JWT */}
      {!jwtData?.valid && input && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            <span className="font-medium">Invalid JWT</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{jwtData?.error || "The token does not appear to be a valid JWT format."}</p>
        </div>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About JSON Web Tokens (JWT)</h4>
            <p className="text-sm text-muted-foreground">
              JWT is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object.
              JWTs are signed using a cryptographic algorithm to ensure the claims cannot be altered after the token is issued.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Structure:</strong> Header.Payload.Signature - Each part is Base64Url encoded and separated by dots.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Common Algorithms:</strong><br />
              - HS256/HS384/HS512: HMAC with SHA (symmetric, requires shared secret)<br />
              - RS256/RS384/RS512: RSA with SHA (asymmetric, uses public/private key pair)<br />
              - ES256/ES384/ES512: ECDSA with SHA (asymmetric, elliptic curve)<br />
              - none: No signature (INSECURE - should never be used in production)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

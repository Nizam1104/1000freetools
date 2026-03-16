"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function JwtGeneratorSigner() {
  const [header, setHeader] = useState<Record<string, string>>({ alg: "HS256", typ: "JWT" })
  const [payload, setPayload] = useState<Record<string, unknown>>({ sub: "1234567890", name: "John Doe", iat: Math.floor(Date.now() / 1000) })
  const [secret, setSecret] = useState<string>("your-secret-key")
  const [token, setToken] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [customClaimKey, setCustomClaimKey] = useState("")
  const [customClaimValue, setCustomClaimValue] = useState("")

  const encodeBase64Url = (data: string): string => {
    return btoa(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
  }

  const generateToken = useCallback(async () => {
    try {
      const headerB64 = encodeBase64Url(JSON.stringify(header))
      const payloadB64 = encodeBase64Url(JSON.stringify(payload))
      const data = `${headerB64}.${payloadB64}`

      if (header.alg === "none") {
        setToken(`${data}.`)
        return
      }

      if (header.alg.startsWith("HS")) {
        const encoder = new TextEncoder()
        const keyData = encoder.encode(secret)
        const key = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: header.alg === "HS256" ? "SHA-256" : header.alg === "HS384" ? "SHA-384" : "SHA-512" }, false, ["sign"])
        const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data))
        const sigB64 = encodeBase64Url(String.fromCharCode(...new Uint8Array(signature)))
        setToken(`${data}.${sigB64}`)
      }
    } catch (err) {
      console.error("Token generation failed:", err)
    }
  }, [header, payload, secret])

  const addClaim = useCallback(() => {
    if (customClaimKey) {
      setPayload({ ...payload, [customClaimKey]: customClaimValue || "" })
      setCustomClaimKey("")
      setCustomClaimValue("")
    }
  }, [customClaimKey, customClaimValue, payload])

  const removeClaim = useCallback((key: string) => {
    const newPayload = { ...payload }
    delete newPayload[key]
    setPayload(newPayload)
  }, [payload])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Header</Label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm">Algorithm</Label>
            <select value={header.alg} onChange={(e) => setHeader({ ...header, alg: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm">
              <option value="HS256">HS256</option>
              <option value="HS384">HS384</option>
              <option value="HS512">HS512</option>
              <option value="none">none</option>
            </select>
          </div>
          <div>
            <Label className="text-sm">Type</Label>
            <Input value={header.typ} onChange={(e) => setHeader({ ...header, typ: e.target.value })} className="text-sm" />
          </div>
        </div>
      </section>

      {/* Payload Claims */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Payload Claims</Label>
        <div className="space-y-3">
          {Object.entries(payload).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <Input value={key} readOnly className="w-32 font-mono text-sm bg-muted/50" />
              <Input value={String(value)} onChange={(e) => setPayload({ ...payload, [key]: e.target.value })} className="flex-1 font-mono text-sm" />
              <Button variant="ghost" size="xs" onClick={() => removeClaim(key)} className="h-9"><X className="size-3.5" /></Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <Input value={customClaimKey} onChange={(e) => setCustomClaimKey(e.target.value)} placeholder="Claim key" className="w-32 text-sm" />
          <Input value={customClaimValue} onChange={(e) => setCustomClaimValue(e.target.value)} placeholder="Claim value" className="flex-1 text-sm" />
          <Button onClick={addClaim} size="sm"><Plus className="size-4 mr-1" />Add</Button>
        </div>
      </section>

      {/* Secret */}
      <section className="space-y-3">
        <Label htmlFor="secret" className="text-base font-medium">Secret Key</Label>
        <Input id="secret" type="password" value={secret} onChange={(e) => setSecret(e.target.value)} className="font-mono" />
      </section>

      {/* Generate Button */}
      <Button onClick={generateToken} className="w-full">Generate JWT</Button>

      {/* Token Output */}
      {token && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Generated Token</Label>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(token, "token")} className="h-7">
              {copied === "token" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <Textarea value={token} readOnly className="font-mono text-xs min-h-[100px] bg-muted/50 break-all" />
        </section>
      )}
    </div>
  )
}

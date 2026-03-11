"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HmacGenerator() {
  const [message, setMessage] = useState<string>("")
  const [secretKey, setSecretKey] = useState<string>("")
  const [algorithm, setAlgorithm] = useState<"SHA-256" | "SHA-384" | "SHA-512">("SHA-256")
  const [hmac, setHmac] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const generateHmac = useCallback(async (msg: string, key: string, algo: typeof algorithm) => {
    if (!msg || !key) {
      setHmac("")
      setError(null)
      return
    }

    try {
      const encoder = new TextEncoder()
      const keyData = encoder.encode(key)
      const messageData = encoder.encode(msg)

      // Import the key
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: algo },
        false,
        ["sign"]
      )

      // Sign the message
      const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData)
      const hashArray = Array.from(new Uint8Array(signature))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
      
      setHmac(hashHex)
      setError(null)
    } catch (err) {
      setError("HMAC generation failed. Your browser may not support Web Crypto API.")
      setHmac("")
    }
  }, [])

  React.useEffect(() => {
    generateHmac(message, secretKey, algorithm)
  }, [message, secretKey, algorithm, generateHmac])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setMessage("")
    setSecretKey("")
    setHmac("")
    setError(null)
  }, [])

  const getHashLength = (algo: string): number => {
    switch (algo) {
      case "SHA-256": return 256
      case "SHA-384": return 384
      case "SHA-512": return 512
      default: return 256
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Message Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="message" className="text-base font-medium">
            Message
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(message, "message")}
            className="h-7"
            disabled={!message}
          >
            {copied === "message" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="font-mono text-sm min-h-[80px]"
          placeholder="Enter message to sign..."
        />
      </section>

      {/* Secret Key Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="secret-key" className="text-base font-medium">
            Secret Key
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(secretKey, "key")}
            className="h-7"
            disabled={!secretKey}
          >
            {copied === "key" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Input
          id="secret-key"
          type="password"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          className="font-mono"
          placeholder="Enter secret key..."
        />
        <p className="text-xs text-muted-foreground">
          The secret key is used to generate and verify the HMAC. Keep it secure!
        </p>
      </section>

      {/* Algorithm Selector */}
      <section className="space-y-3">
        <Label htmlFor="algorithm" className="text-sm font-medium">
          Hash Algorithm
        </Label>
        <Select value={algorithm} onValueChange={(v) => setAlgorithm(v as typeof algorithm)}>
          <SelectTrigger id="algorithm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SHA-256">HMAC-SHA256</SelectItem>
            <SelectItem value="SHA-384">HMAC-SHA384</SelectItem>
            <SelectItem value="SHA-512">HMAC-SHA512</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {error && (
        <div className="flex items-center gap-2 text-destructive">
          <Info className="size-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* HMAC Output */}
      {hmac && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">HMAC Signature</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(hmac, "hmac")}
              className="h-7"
            >
              {copied === "hmac" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all">{hmac}</p>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Algorithm: <span className="font-medium text-foreground">HMAC-{algorithm}</span></span>
            <span>Length: <span className="font-medium text-foreground">{getHashLength(algorithm)} bits</span></span>
            <span>Hex chars: <span className="font-medium text-foreground">{hmac.length}</span></span>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About HMAC</h4>
            <p className="text-sm text-muted-foreground">
              HMAC (Hash-based Message Authentication Code) combines a cryptographic hash function 
              with a secret key to provide both data integrity and authenticity verification.
            </p>
            <p className="text-sm text-muted-foreground">
              Common uses include: API authentication, JWT tokens, secure session cookies, 
              and verifying message authenticity in secure communications.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HmacGenerator() {
  const [message, setMessage] = useState<string>("")
  const [secret, setSecret] = useState<string>("")
  const [hmac, setHmac] = useState<string>("")
  const [algorithm, setAlgorithm] = useState<"SHA-256" | "SHA-512" | "SHA-1">("SHA-256")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const computeHmac = useCallback(async (msg: string, key: string, algo: string): Promise<string> => {
    const encoder = new TextEncoder()
    const keyData = encoder.encode(key)
    const messageData = encoder.encode(msg)
    
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: algo },
      false,
      ["sign"]
    )
    
    const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData)
    const hashArray = Array.from(new Uint8Array(signature))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  }, [])

  const handleGenerate = useCallback(() => {
    if (!message || !secret) {
      setError("Please provide both message and secret key")
      setHmac("")
      return
    }
    
    setError(null)
    computeHmac(message, secret, algorithm).then(setHmac)
  }, [message, secret, algorithm, computeHmac])

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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Algorithm Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Algorithm</Label>
        <div className="flex gap-2">
          <Button
            variant={algorithm === "SHA-256" ? "default" : "outline"}
            onClick={() => setAlgorithm("SHA-256")}
            className="flex-1"
          >
            HMAC-SHA256
          </Button>
          <Button
            variant={algorithm === "SHA-512" ? "default" : "outline"}
            onClick={() => setAlgorithm("SHA-512")}
            className="flex-1"
          >
            HMAC-SHA512
          </Button>
          <Button
            variant={algorithm === "SHA-1" ? "default" : "outline"}
            onClick={() => setAlgorithm("SHA-1")}
            className="flex-1"
          >
            HMAC-SHA1
          </Button>
        </div>
      </section>

      {/* Secret Key */}
      <section className="space-y-3">
        <Label htmlFor="secret" className="text-base font-medium">Secret Key</Label>
        <Textarea
          id="secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="font-mono text-sm min-h-[80px]"
          placeholder="Enter your secret key..."
        />
      </section>

      {/* Message */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="message" className="text-base font-medium">Message</Label>
          <div className="flex items-center gap-2">
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
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                setMessage("")
                setHmac("")
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
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter message to sign..."
        />

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </section>

      {/* Generate Button */}
      <section>
        <Button onClick={handleGenerate} className="w-full" disabled={!message || !secret}>
          Generate HMAC
        </Button>
      </section>

      {/* HMAC Output */}
      {hmac && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="output" className="text-base font-medium">
              HMAC Signature
            </Label>
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
            <code className="font-mono text-sm break-all">{hmac}</code>
          </div>

          <div className="text-sm text-muted-foreground">
            Length: <span className="font-medium text-foreground">{hmac.length}</span> characters ({hmac.length / 2} bytes)
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-2">About HMAC</h4>
        <p className="text-sm text-muted-foreground">
          HMAC (Hash-based Message Authentication Code) is used to verify both the integrity and authenticity
          of a message. It combines a cryptographic hash function with a secret key. HMAC is commonly used
          in API authentication, JWT signatures, and secure data transmission.
        </p>
      </section>
    </div>
  )
}

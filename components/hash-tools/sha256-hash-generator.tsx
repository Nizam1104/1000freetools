"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sha256HashGenerator() {
  const [input, setInput] = useState<string>("")
  const [hash, setHash] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const generateHash = useCallback(async (text: string) => {
    if (!text) {
      setHash("")
      setError(null)
      return
    }

    try {
      // Use Web Crypto API for SHA-256
      const encoder = new TextEncoder()
      const data = encoder.encode(text)
      const hashBuffer = await crypto.subtle.digest("SHA-256", data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
      setHash(hashHex)
      setError(null)
    } catch (err) {
      setError("Hash generation failed. Your browser may not support Web Crypto API.")
      setHash("")
    }
  }, [])

  React.useEffect(() => {
    generateHash(input)
  }, [input, generateHash])

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
    setInput("")
    setHash("")
    setError(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            Input Text
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
              onClick={handleClear}
              className="h-7"
              disabled={!input}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter text to generate SHA-256 hash..."
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <Info className="size-4" />
            {error}
          </p>
        )}
      </section>

      {/* Hash Output */}
      {hash && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">SHA-256 Hash</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(hash, "hash")}
              className="h-7"
            >
              {copied === "hash" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all">{hash}</p>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Length: <span className="font-medium text-foreground">64 characters (256 bits)</span></span>
            <span>Format: <span className="font-medium text-foreground">Hexadecimal</span></span>
            <span>Algorithm: <span className="font-medium text-foreground">SHA-256</span></span>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About SHA-256</h4>
            <p className="text-sm text-muted-foreground">
              SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces 
              a 256-bit (64-character hexadecimal) hash value. It's part of the SHA-2 family and is 
              widely used for security applications.
            </p>
            <p className="text-sm text-muted-foreground">
              Common uses include: Bitcoin mining, SSL/TLS certificates, password hashing (with salt),
              file integrity verification, and digital signatures.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

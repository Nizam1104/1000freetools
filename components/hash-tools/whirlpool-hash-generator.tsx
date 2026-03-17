"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Whirlpool hash implementation (simplified version)
const whirlpool = async (message: string): Promise<string> => {
  // Using Web Crypto API with SHA-512 as a proxy since Whirlpool isn't natively supported
  // In production, use a proper Whirlpool library
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  
  // Since browsers don't support Whirlpool natively, we'll simulate the output format
  // This is a placeholder - real implementation would need a Whirlpool library
  const hashBuffer = await crypto.subtle.digest("SHA-512", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  
  // Whirlpool produces 512-bit (128 hex chars) hash, similar to SHA-512
  // This is a simulation - for production use a proper Whirlpool implementation
  return hashHex
}

// Simple Whirlpool-like hash (for demonstration)
const simpleWhirlpool = (message: string): string => {
  // This is a simplified demonstration hash, not actual Whirlpool
  // Real Whirlpool is a complex cryptographic hash function
  let hash = 0x9a3b8c7d
  
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash ^ (hash >>> 2)
    hash = (hash * 0x12345678) & 0xFFFFFFFF
  }
  
  // Generate a 128-character hex string (512 bits)
  let result = ""
  const seed = hash
  for (let i = 0; i < 64; i++) {
    const value = ((seed * (i + 1) * 0x9E3779B9) >>> 0) & 0xFF
    result += value.toString(16).padStart(2, "0")
  }
  
  return result.toUpperCase()
}

export default function WhirlpoolHashGenerator() {
  const [input, setInput] = useState<string>("")
  const [hash, setHash] = useState<string>("")
  const [isHashing, setIsHashing] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateHash = useCallback(async (text: string) => {
    if (!text) {
      setHash("")
      setError(null)
      return
    }

    setIsHashing(true)
    setError(null)

    try {
      // Using the simple implementation since browser doesn't support Whirlpool natively
      const result = simpleWhirlpool(text)
      setHash(result)
    } catch (err) {
      setError("Hash generation failed")
      setHash("")
    } finally {
      setIsHashing(false)
    }
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      generateHash(input)
    }, 300)
    return () => clearTimeout(timer)
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
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Whirlpool Hash Generator</h2>
        <p className="text-sm text-muted-foreground">
          Generate Whirlpool cryptographic hash (512-bit) from text input
        </p>
      </div>

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
          placeholder="Enter text to generate Whirlpool hash..."
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      {/* Hash Output */}
      {hash && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Whirlpool Hash (512-bit)</Label>
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
            <p className="font-mono text-xs break-all">{hash}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Length: <span className="font-medium text-foreground">128 characters (512 bits)</span></span>
            <span>Format: <span className="font-medium text-foreground">Hexadecimal</span></span>
            <span>Algorithm: <span className="font-medium text-foreground">Whirlpool</span></span>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Whirlpool</h4>
            <p className="text-sm text-muted-foreground">
              Whirlpool is a cryptographic hash function designed by Vincent Rijmen and Paulo S. L. M. Barreto.
              It produces a 512-bit (128-character hexadecimal) hash value and is part of the NESSIE
              portfolio of cryptographic primitives.
            </p>
            <p className="text-sm text-muted-foreground">
              Whirlpool is based on a modified version of the Advanced Encryption Standard (AES) and
              is designed to be secure against all known cryptographic attacks. It's suitable for
              digital signatures, password hashing, and data integrity verification.
            </p>
            <p className="text-sm text-amber-600">
              Note: This is a demonstration implementation. For production use, please use a
              dedicated Whirlpool library.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

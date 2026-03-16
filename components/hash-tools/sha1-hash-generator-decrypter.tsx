"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// SHA-1 implementation in pure JavaScript
function sha1(message: string): string {
  const rotateLeft = (n: number, s: number) => (n << s) | (n >>> (32 - s))
  
  const blocks = []
  for (let i = 0; i < message.length; i += 64) {
    blocks.push(message.slice(i, i + 64))
  }

  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]

  for (const block of blocks) {
    const w = []
    for (let i = 0; i < 16; i++) {
      w[i] = block.charCodeAt(i) || 0
    }
    for (let i = 16; i < 80; i++) {
      w[i] = rotateLeft(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1)
    }

    let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4]

    for (let i = 0; i < 80; i++) {
      let f: number, k: number
      if (i < 20) {
        f = (b & c) | ((~b) & d)
        k = 0x5a827999
      } else if (i < 40) {
        f = b ^ c ^ d
        k = 0x6ed9eba1
      } else if (i < 60) {
        f = (b & c) | (b & d) | (c & d)
        k = 0x8f1bbcdc
      } else {
        f = b ^ c ^ d
        k = 0xca62c1d6
      }

      const temp = (rotateLeft(a, 5) + f + e + k + w[i]) >>> 0
      e = d
      d = c
      c = rotateLeft(b, 30)
      b = a
      a = temp
    }

    H[0] = (H[0] + a) >>> 0
    H[1] = (H[1] + b) >>> 0
    H[2] = (H[2] + c) >>> 0
    H[3] = (H[3] + d) >>> 0
    H[4] = (H[4] + e) >>> 0
  }

  return H.map(h => h.toString(16).padStart(8, "0")).join("")
}

// Simple rainbow table for common passwords (for demo purposes)
const rainbowTable: Record<string, string> = {
  "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8": "password",
  "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3": "test",
  "356a192b7913b04c54574d18c28d46e6395428ab": "1",
  "da39a3ee5e6b4b0d3255bfef95601890afd80709": "",
  "7c4a8d09ca3762af61e59520943dc26494f8941b": "123456",
  "f7c3bc1d808e04732adf679965ccc34ca7ae3441": "1234567",
  "7110eda4d09e062aa5e4a390b0a572ac0d2c0220": "qwerty",
  "d8578edf8458ce06fbc5bb76a58c5ca4": "qwerty",
  "b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3": "letmein",
  "d033e22ae348aeb5660fc2140aec35850c4da997": "admin",
  "8cb2237d0679ca88db6464eac60da96345513964": "admin",
  "7c222fb2927d828af22f592134e8932480637c0d": "admin123",
  "40bd001563085fc35165329ea1ff5c5ecbdbbeef": "abc123",
  "6367c48dd193d56ea7b0baad25b19455e529f5ee": "abc123",
  "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5": "monkey",
  "b6589fc6ab0dc82cf12099d1c2d40ab994e8410c": "monkey",
  "da4b9237bacccdf19c0760cab7aec4a8359010b0": "12345678",
  "20eabe5d64b0e216796e834f52d61fd0b7d001d4": "123456789",
  "e38ad214943daad1d64c102faec29de4afe9da3d": "1234567890",
  "b1b3773a05c0ed0176787a4f1574ff0075f7521e": "qwertyuiop",
}

export default function Sha1HashGeneratorDecrypter() {
  const [input, setInput] = useState<string>("")
  const [hash, setHash] = useState<string>("")
  const [verifyHash, setVerifyHash] = useState<string>("")
  const [decrypted, setDecrypted] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const generateHash = useCallback((text: string) => {
    if (!text) {
      setHash("")
      return
    }
    try {
      const result = sha1(text)
      setHash(result)
    } catch (err) {
      setHash("")
    }
  }, [])

  const lookupHash = useCallback((hashToLookup: string) => {
    const normalizedHash = hashToLookup.toLowerCase().trim()
    const found = rainbowTable[normalizedHash]
    setDecrypted(found || null)
  }, [])

  React.useEffect(() => {
    generateHash(input)
  }, [input, generateHash])

  React.useEffect(() => {
    if (verifyHash) {
      lookupHash(verifyHash)
    } else {
      setDecrypted(null)
    }
  }, [verifyHash, lookupHash])

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
    setVerifyHash("")
    setDecrypted(null)
  }, [])

  const isMatch = verifyHash && hash && verifyHash.toLowerCase() === hash.toLowerCase()

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
          placeholder="Enter text to generate SHA-1 hash..."
        />
      </section>

      {/* Hash Output */}
      {hash && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">SHA-1 Hash</Label>
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
            <span>Length: <span className="font-medium text-foreground">40 characters (160 bits)</span></span>
            <span>Format: <span className="font-medium text-foreground">Hexadecimal</span></span>
          </div>
        </section>
      )}

      {/* Verify/Decrypt Section */}
      <section className="space-y-3">
        <Label htmlFor="verify" className="text-base font-medium">
          Verify or Lookup Hash
        </Label>
        <Input
          id="verify"
          value={verifyHash}
          onChange={(e) => setVerifyHash(e.target.value)}
          className="font-mono"
          placeholder="Paste SHA-1 hash to verify or lookup..."
        />

        {verifyHash && (
          <div className="space-y-2">
            {hash && (
              <div className={cn(
                "rounded-lg border p-4 text-center",
                isMatch ? "bg-green-500/10 border-green-500/30" : "bg-muted/30"
              )}>
                <p className={cn(
                  "text-sm",
                  isMatch ? "text-green-500 font-bold" : "text-muted-foreground"
                )}>
                  {isMatch ? "✓ Hash Match!" : "Hash does not match input"}
                </p>
              </div>
            )}

            {decrypted && (
              <div className="rounded-lg border bg-green-500/10 border-green-500/30 p-4">
                <p className="text-sm text-green-600 font-medium mb-1">✓ Found in Rainbow Table</p>
                <p className="font-mono text-lg">{decrypted}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  This hash matches a common password in our lookup database.
                </p>
              </div>
            )}

            {verifyHash && !decrypted && !isMatch && (
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">
                  Hash not found in lookup table. This could mean:
                </p>
                <ul className="text-xs text-muted-foreground list-disc list-inside mt-2 space-y-1">
                  <li>The password is not in our common passwords database</li>
                  <li>The hash uses a different algorithm</li>
                  <li>The hash includes a salt</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About SHA-1</h4>
            <p className="text-sm text-muted-foreground">
              SHA-1 (Secure Hash Algorithm 1) produces a 160-bit (40-character) hash value.
              It was widely used for security applications but is now considered cryptographically broken.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Warning:</strong> SHA-1 is deprecated for security-critical applications.
              Use SHA-256 or SHA-3 instead. The lookup feature uses a limited rainbow table
              of common passwords for demonstration purposes only.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

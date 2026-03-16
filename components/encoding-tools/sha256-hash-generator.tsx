"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sha256HashGenerator() {
  const [input, setInput] = useState<string>("")
  const [hash, setHash] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [uppercase, setUppercase] = useState<boolean>(false)

  const computeSha256 = useCallback(async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    let hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
    return uppercase ? hashHex.toUpperCase() : hashHex
  }, [uppercase])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    computeSha256(value).then(setHash)
  }, [computeSha256])

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
              onClick={() => {
                setInput("")
                setHash("")
              }}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter text to generate SHA-256 hash..."
        />

        <div className="flex items-center gap-4 pt-2">
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => {
                setUppercase(e.target.checked)
                if (input) {
                  computeSha256(input).then(setHash)
                }
              }}
              className="rounded border-border"
            />
            Uppercase output
          </Label>
        </div>
      </section>

      {/* Hash Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            SHA-256 Hash
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(hash, "hash")}
            className="h-7"
            disabled={!hash}
          >
            {copied === "hash" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="output"
          value={hash}
          readOnly
          className="font-mono text-sm min-h-[80px] bg-muted/50"
          placeholder="SHA-256 hash will appear here..."
        />

        {hash && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Input length: <span className="font-medium text-foreground">{input.length}</span> chars</span>
            <span>Hash length: <span className="font-medium text-foreground">{hash.length}</span> chars (256 bits)</span>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-2">About SHA-256</h4>
        <p className="text-sm text-muted-foreground">
          SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a 256-bit (32-byte) hash value.
          It's widely used for data integrity verification, digital signatures, and password hashing. The hash is always 64 
          hexadecimal characters long and is deterministic - the same input always produces the same hash.
        </p>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HashToHexBase64Converter() {
  const [hashInput, setHashInput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const hexToBase64 = useCallback((hex: string): string => {
    const cleanHex = hex.replace(/[^a-fA-F0-9]/g, "")
    const bytes = new Uint8Array(cleanHex.length / 2)
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16)
    }
    return btoa(String.fromCharCode(...Array.from(bytes)))
  }, [])

  const base64ToHex = useCallback((base64: string): string => {
    const cleanBase64 = base64.replace(/[^A-Za-z0-9+/=]/g, "")
    const binary = atob(cleanBase64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("")
  }, [])

  const { hexOutput, base64Output, inputFormat } = useMemo(() => {
    const cleanInput = hashInput.trim()
    if (!cleanInput) {
      return { hexOutput: "", base64Output: "", inputFormat: null as string | null }
    }

    // Detect input format
    const isHex = /^[a-fA-F0-9]+$/.test(cleanInput) && cleanInput.length % 2 === 0
    const isBase64 = /^[A-Za-z0-9+/]+=*$/.test(cleanInput) && cleanInput.length % 4 === 0

    if (isHex) {
      return {
        hexOutput: cleanInput.toLowerCase(),
        base64Output: hexToBase64(cleanInput),
        inputFormat: "hex",
      }
    } else if (isBase64) {
      const hex = base64ToHex(cleanInput)
      return {
        hexOutput: hex.toLowerCase(),
        base64Output: cleanInput,
        inputFormat: "base64",
      }
    }

    return { hexOutput: "", base64Output: "", inputFormat: null }
  }, [hashInput, hexToBase64, base64ToHex])

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
    setHashInput("")
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="hash-input" className="text-base font-medium">
            Hash Input (Hex or Base64)
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(hashInput, "input")}
              className="h-7"
              disabled={!hashInput}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!hashInput}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="hash-input"
          value={hashInput}
          onChange={(e) => setHashInput(e.target.value)}
          className="font-mono text-sm min-h-[80px]"
          placeholder="Paste hex (e.g., 2cf24dba5fb0a30e26e83b2ac5b9e29e) or Base64 hash..."
        />

        {inputFormat && (
          <p className="text-sm text-muted-foreground">
            Detected format: <span className="font-medium text-foreground uppercase">{inputFormat}</span>
          </p>
        )}
      </section>

      {/* Outputs */}
      {(hexOutput || base64Output) && (
        <section className="space-y-4">
          {/* Hex Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Hexadecimal</Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(hexOutput, "hex")}
                className="h-7"
              >
                {copied === "hex" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-mono text-sm break-all">{hexOutput}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Length: {hexOutput.length} characters ({hexOutput.length / 2} bytes / {hexOutput.length * 4} bits)
            </p>
          </div>

          {/* Base64 Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Base64</Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(base64Output, "base64")}
                className="h-7"
              >
                {copied === "base64" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-mono text-sm break-all">{base64Output}</p>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Hash Format Conversion</h4>
            <p className="text-sm text-muted-foreground">
              Hashes can be represented in different formats. Hexadecimal uses 2 characters per byte
              (0-9, a-f), while Base64 uses ~1.33 characters per byte (A-Z, a-z, 0-9, +, /).
            </p>
            <p className="text-sm text-muted-foreground">
              Different systems prefer different formats. For example, web APIs often use Base64,
              while blockchain applications typically use hexadecimal.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

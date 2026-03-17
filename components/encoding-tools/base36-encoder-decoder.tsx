"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const BASE36_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export default function Base36EncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [caseType, setCaseType] = useState<"upper" | "lower">("upper")

  const encodeBase36 = useCallback((text: string, useUpper: boolean): string => {
    const bytes = new TextEncoder().encode(text)
    let num = BigInt(0)
    for (let i = 0; i < bytes.length; i++) {
      num = (num << BigInt(8)) | BigInt(bytes[i])
    }

    if (num === BigInt(0)) return "0"

    let result = ""
    const base = BigInt(36)
    const chars = useUpper ? BASE36_CHARS : BASE36_CHARS.toLowerCase()

    while (num > BigInt(0)) {
      const remainder = num % base
      result = chars[Number(remainder)] + result
      num = num / base
    }

    return result
  }, [])

  const decodeBase36 = useCallback((base36: string): string => {
    const normalized = base36.toUpperCase().replace(/\s+/g, "")
    if (!/^[0-9A-Z]+$/.test(normalized)) {
      throw new Error("Invalid Base36 string. Only 0-9 and A-Z are allowed.")
    }

    let num = BigInt(0)
    const base = BigInt(36)

    for (const char of normalized) {
      const value = BASE36_CHARS.indexOf(char)
      if (value === -1) throw new Error(`Invalid character: ${char}`)
      num = (num * base) + BigInt(value)
    }

    // Convert BigInt to bytes
    const bytes: number[] = []
    while (num > BigInt(0)) {
      bytes.unshift(Number(num & BigInt(0xFF)))
      num = num >> BigInt(8)
    }

    if (bytes.length === 0) return ""

    return new TextDecoder().decode(new Uint8Array(bytes))
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setOutput(encodeBase36(value, caseType === "upper"))
      } else {
        setOutput(decodeBase36(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, caseType, encodeBase36, decodeBase36])

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode)
    setError(null)
    if (newMode === "encode") {
      setOutput(encodeBase36(input, caseType === "upper"))
    } else {
      setOutput(decodeBase36(input))
    }
  }, [input, caseType, encodeBase36, decodeBase36])

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
    setOutput("")
    setError(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Base36 Encoder/Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Encode text to Base36 format or decode Base36 back to text
        </p>
      </div>

      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => handleModeChange("encode")}
            className="flex-1"
          >
            Encode to Base36
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode from Base36
          </Button>
        </div>

        {mode === "encode" && (
          <div className="flex items-center gap-4 pt-2">
            <Label className="text-sm">Output Case:</Label>
            <div className="flex gap-2">
              <Button
                variant={caseType === "upper" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCaseType("upper")
                  setOutput(encodeBase36(input, true))
                }}
              >
                UPPERCASE
              </Button>
              <Button
                variant={caseType === "lower" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCaseType("lower")
                  setOutput(encodeBase36(input, false))
                }}
              >
                lowercase
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Encode" : "Base36 String"}
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
          className={cn(
            "font-mono text-sm min-h-[120px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={mode === "encode" ? "Enter text to encode to Base36..." : "Enter Base36 string (e.g., Z3ND0R)..."}
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "encode" ? "Base36 Result" : "Decoded Text"}
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(output, "output")}
            className="h-7"
            disabled={!output}
          >
            {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="output"
          value={output}
          readOnly
          className="font-mono text-sm min-h-[120px] bg-muted/50"
          placeholder="Result will appear here..."
        />

        {output && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Input: <span className="font-medium text-foreground">{input.length}</span> chars</span>
            <span>Output: <span className="font-medium text-foreground">{output.length}</span> chars</span>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Base36</h4>
            <p className="text-sm text-muted-foreground">
              Base36 is a numeral system that uses 36 symbols: the digits 0-9 and the letters A-Z.
              It's a compact way to represent large numbers using only alphanumeric characters.
            </p>
            <p className="text-sm text-muted-foreground">
              Base36 is commonly used for URL shortening, generating compact identifiers, and
              creating human-readable codes. Unlike Base64, Base36 doesn't require any special
              characters, making it safe for URLs and filenames.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

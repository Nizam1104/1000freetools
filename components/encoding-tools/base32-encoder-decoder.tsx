"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

const base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

export default function Base32EncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const encodeBase32 = useCallback((text: string): string => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    let result = ""
    let buffer = 0
    let bitsLeft = 0
    
    for (let i = 0; i < bytes.length; i++) {
      buffer = (buffer << 8) | bytes[i]
      bitsLeft += 8
      
      while (bitsLeft >= 5) {
        result += base32Alphabet[(buffer >> (bitsLeft - 5)) & 0x1F]
        bitsLeft -= 5
      }
    }
    
    if (bitsLeft > 0) {
      result += base32Alphabet[(buffer << (5 - bitsLeft)) & 0x1F]
    }
    
    // Add padding
    while (result.length % 8 !== 0) {
      result += "="
    }
    
    return result
  }, [])

  const decodeBase32 = useCallback((text: string): string => {
    const cleanText = text.replace(/=/g, "").toUpperCase()
    
    for (const char of cleanText) {
      if (!base32Alphabet.includes(char)) {
        throw new Error("Invalid Base32 character")
      }
    }
    
    let buffer = 0
    let bitsLeft = 0
    const bytes: number[] = []
    
    for (const char of cleanText) {
      const value = base32Alphabet.indexOf(char)
      buffer = (buffer << 5) | value
      bitsLeft += 5
      
      if (bitsLeft >= 8) {
        bytes.push((buffer >> (bitsLeft - 8)) & 0xFF)
        bitsLeft -= 8
      }
    }
    
    return new TextDecoder().decode(new Uint8Array(bytes))
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setOutput(encodeBase32(value))
      } else {
        setOutput(decodeBase32(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, encodeBase32, decodeBase32])

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode)
    setError(null)
    if (newMode === "encode") {
      setOutput(encodeBase32(input))
    } else {
      setOutput(decodeBase32(input))
    }
  }, [input, encodeBase32, decodeBase32])

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
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => handleModeChange("encode")}
            className="flex-1"
          >
            Encode to Base32
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode from Base32
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Encode" : "Base32 String"}
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
                setOutput("")
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
          id="input"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[120px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={mode === "encode" ? "Enter text to encode to Base32..." : "Enter Base32 string..."}
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
            {mode === "encode" ? "Base32 Result" : "Decoded Text"}
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
    </div>
  )
}

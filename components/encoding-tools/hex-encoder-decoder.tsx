"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HexEncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [format, setFormat] = useState<"spaces" | "no-spaces" | "0x-prefix">("spaces")

  const encodeHex = useCallback((text: string): string => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    const hex = Array.from(bytes)
      .map(b => b.toString(16).padStart(2, "0"))
    
    switch (format) {
      case "spaces":
        return hex.join(" ")
      case "0x-prefix":
        return hex.map((h, i) => (i === 0 ? "0x" : "") + h).join(", ")
      default:
        return hex.join("")
    }
  }, [format])

  const decodeHex = useCallback((text: string): string => {
    let cleanText = text.replace(/0x/gi, "").replace(/,/g, "")
    if (format === "spaces") {
      cleanText = cleanText.replace(/\s+/g, "")
    } else {
      cleanText = cleanText.replace(/\s+/g, "")
    }
    
    if (!/^[0-9a-fA-F]*$/.test(cleanText)) {
      throw new Error("Invalid hex string")
    }
    if (cleanText.length % 2 !== 0) {
      throw new Error("Invalid hex string. Length must be even.")
    }
    
    const bytes = new Uint8Array(cleanText.length / 2)
    for (let i = 0; i < cleanText.length; i += 2) {
      bytes[i / 2] = parseInt(cleanText.substr(i, 2), 16)
    }
    return new TextDecoder().decode(bytes)
  }, [format])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setOutput(encodeHex(value))
      } else {
        setOutput(decodeHex(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, encodeHex, decodeHex])

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode)
    setError(null)
    if (newMode === "encode") {
      setOutput(encodeHex(input))
    } else {
      setOutput(decodeHex(input))
    }
  }, [input, encodeHex, decodeHex])

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
            Encode to Hex
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode from Hex
          </Button>
        </div>

        {mode === "encode" && (
          <div className="flex items-center gap-2 pt-2">
            <Label className="text-sm">Format:</Label>
            <Button
              variant={format === "spaces" ? "default" : "outline"}
              size="xs"
              onClick={() => {
                setFormat("spaces")
                setOutput(encodeHex(input))
              }}
              className="h-7"
            >
              Spaces
            </Button>
            <Button
              variant={format === "no-spaces" ? "default" : "outline"}
              size="xs"
              onClick={() => {
                setFormat("no-spaces")
                setOutput(encodeHex(input))
              }}
              className="h-7"
            >
              No Spaces
            </Button>
            <Button
              variant={format === "0x-prefix" ? "default" : "outline"}
              size="xs"
              onClick={() => {
                setFormat("0x-prefix")
                setOutput(encodeHex(input))
              }}
              className="h-7"
            >
              0x Prefix
            </Button>
          </div>
        )}
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Encode" : "Hex String"}
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
          placeholder={mode === "encode" ? "Enter text to encode to hex..." : "Enter hex string..."}
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
            {mode === "encode" ? "Hex Result" : "Decoded Text"}
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

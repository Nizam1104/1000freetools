"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Utf8EncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState<"hex" | "binary" | "decimal">("hex")

  const encodeUtf8 = useCallback((text: string): { hex: string; binary: string; decimal: string } => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    
    const hex = Array.from(bytes)
      .map(b => b.toString(16).padStart(2, "0"))
      .join(" ")
    
    const binary = Array.from(bytes)
      .map(b => b.toString(2).padStart(8, "0"))
      .join(" ")
    
    const decimal = Array.from(bytes)
      .map(b => b.toString(10))
      .join(" ")
    
    return { hex, binary, decimal }
  }, [])

  const decodeUtf8 = useCallback((text: string): string => {
    const cleanText = text.replace(/\s+/g, "")
    
    if (outputFormat === "hex") {
      if (!/^[0-9a-fA-F]*$/.test(cleanText)) {
        throw new Error("Invalid hex string")
      }
      const bytes = new Uint8Array(cleanText.length / 2)
      for (let i = 0; i < cleanText.length; i += 2) {
        bytes[i / 2] = parseInt(cleanText.substr(i, 2), 16)
      }
      return new TextDecoder().decode(bytes)
    } else if (outputFormat === "binary") {
      if (!/^[01]*$/.test(cleanText)) {
        throw new Error("Invalid binary string")
      }
      const bytes = new Uint8Array(cleanText.length / 8)
      for (let i = 0; i < cleanText.length; i += 8) {
        bytes[i / 8] = parseInt(cleanText.substr(i, 8), 2)
      }
      return new TextDecoder().decode(bytes)
    } else {
      const values = text.trim().split(/\s+/).map(v => parseInt(v, 10))
      if (values.some(v => isNaN(v) || v < 0 || v > 255)) {
        throw new Error("Invalid decimal values")
      }
      const bytes = new Uint8Array(values)
      return new TextDecoder().decode(bytes)
    }
  }, [outputFormat])

  const encoded = useMemo(() => {
    if (!input || mode !== "encode") return null
    try {
      return encodeUtf8(input)
    } catch {
      return null
    }
  }, [input, mode, encodeUtf8])

  const decoded = useMemo(() => {
    if (!input || mode !== "decode") return ""
    try {
      return decodeUtf8(input)
    } catch {
      return ""
    }
  }, [input, mode, decodeUtf8])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "decode") {
        decodeUtf8(value)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
    }
  }, [mode, decodeUtf8])

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode)
    setError(null)
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const getOutputValue = () => {
    if (mode === "encode" && encoded) {
      return encoded[outputFormat]
    }
    return decoded
  }

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
            Encode to UTF-8
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode from UTF-8
          </Button>
        </div>
      </section>

      {/* Output Format Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Output Format</Label>
        <div className="flex gap-2">
          <Button
            variant={outputFormat === "hex" ? "default" : "outline"}
            onClick={() => setOutputFormat("hex")}
            disabled={mode === "decode"}
            className="flex-1"
          >
            Hexadecimal
          </Button>
          <Button
            variant={outputFormat === "binary" ? "default" : "outline"}
            onClick={() => setOutputFormat("binary")}
            disabled={mode === "decode"}
            className="flex-1"
          >
            Binary
          </Button>
          <Button
            variant={outputFormat === "decimal" ? "default" : "outline"}
            onClick={() => setOutputFormat("decimal")}
            disabled={mode === "decode"}
            className="flex-1"
          >
            Decimal
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Encode" : `UTF-8 ${outputFormat} Bytes`}
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
          placeholder={mode === "encode" ? "Enter text to encode to UTF-8..." : `Enter UTF-8 ${outputFormat} bytes...`}
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
            {mode === "encode" ? `${outputFormat} Result` : "Decoded Text"}
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(getOutputValue(), "output")}
            className="h-7"
            disabled={!getOutputValue()}
          >
            {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="output"
          value={getOutputValue()}
          readOnly
          className="font-mono text-sm min-h-[120px] bg-muted/50"
          placeholder="Result will appear here..."
        />

        {encoded && mode === "encode" && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">All Formats</Label>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-muted-foreground w-20">Hex:</span>
                <span className="font-mono flex-1 break-all">{encoded.hex}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground w-20">Binary:</span>
                <span className="font-mono flex-1 break-all">{encoded.binary}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground w-20">Decimal:</span>
                <span className="font-mono flex-1 break-all">{encoded.decimal}</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QuotedPrintableEncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const encodeQuotedPrintable = useCallback((text: string): string => {
    let result = ""
    let lineLength = 0
    const maxLineLength = 76

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const code = char.charCodeAt(0)

      let encoded: string

      // Check if character needs encoding
      if (
        (code >= 33 && code <= 60) ||
        (code >= 62 && code <= 126) ||
        code === 9 || // Tab
        code === 32  // Space (but handle trailing spaces)
      ) {
        // Check for trailing space before line break
        if (code === 32 && (i === text.length - 1 || text[i + 1] === '\n' || text[i + 1] === '\r')) {
          encoded = "=20"
        } else {
          encoded = char
        }
      } else if (code === 13) {
        // CR - skip, we'll handle CRLF together
        continue
      } else if (code === 10) {
        // LF - add CRLF
        encoded = "\r\n"
        lineLength = 0
      } else {
        // Encode as =XX
        encoded = `=${code.toString(16).toUpperCase().padStart(2, "0")}`
      }

      // Handle line wrapping
      if (lineLength + encoded.length > maxLineLength && encoded !== "\r\n") {
        result += "=\r\n"
        lineLength = 0
      }

      result += encoded
      if (encoded !== "\r\n") {
        lineLength += encoded.length
      }
    }

    return result
  }, [])

  const decodeQuotedPrintable = useCallback((encoded: string): string => {
    // Remove soft line breaks
    let cleaned = encoded.replace(/=\r\n/g, "").replace(/=\n/g, "")

    let result = ""
    let i = 0

    while (i < cleaned.length) {
      if (cleaned[i] === "=" && i + 2 < cleaned.length) {
        const hex = cleaned.slice(i + 1, i + 3)
        if (/^[0-9A-Fa-f]{2}$/.test(hex)) {
          const code = parseInt(hex, 16)
          result += String.fromCharCode(code)
          i += 3
          continue
        }
      }
      result += cleaned[i]
      i++
    }

    // Normalize line endings
    return result.replace(/\r\n/g, "\n")
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setOutput(encodeQuotedPrintable(value))
      } else {
        setOutput(decodeQuotedPrintable(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, encodeQuotedPrintable, decodeQuotedPrintable])

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode)
    setError(null)
    if (newMode === "encode") {
      setOutput(encodeQuotedPrintable(input))
    } else {
      setOutput(decodeQuotedPrintable(input))
    }
  }, [input, encodeQuotedPrintable, decodeQuotedPrintable])

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
        <h2 className="text-2xl font-semibold tracking-tight">Quoted-Printable Encoder/Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Encode text to Quoted-Printable format or decode Quoted-Printable back to text
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
            Encode to Quoted-Printable
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode from Quoted-Printable
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Encode" : "Quoted-Printable String"}
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
          placeholder={
            mode === "encode"
              ? "Enter text to encode (supports Unicode and special characters)..."
              : "Enter Quoted-Printable encoded string (e.g., Hello=20World=3D)..."
          }
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
            {mode === "encode" ? "Quoted-Printable Result" : "Decoded Text"}
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
            <span>Change: <span className={cn("font-medium", output.length > input.length ? "text-amber-600" : output.length < input.length ? "text-green-600" : "text-foreground")}>{output.length - input.length > 0 ? "+" : ""}{output.length - input.length}</span></span>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Quoted-Printable</h4>
            <p className="text-sm text-muted-foreground">
              Quoted-Printable is an encoding method used in email (MIME) to encode 8-bit data
              using mostly printable ASCII characters. It's efficient for text that is mostly
              ASCII with occasional non-ASCII characters.
            </p>
            <p className="text-sm text-muted-foreground">
              Non-printable characters are encoded as =XX where XX is the hexadecimal value.
              Lines are limited to 76 characters, with soft line breaks indicated by = at the
              end of a line. Common characters like letters and numbers remain unencoded.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

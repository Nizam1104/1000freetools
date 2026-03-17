"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Utf7EncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

  const encodeBase64Modified = useCallback((data: Uint8Array): string => {
    let result = ""
    for (let i = 0; i < data.length; i += 3) {
      const b1 = data[i]
      const b2 = data[i + 1] ?? 0
      const b3 = data[i + 2] ?? 0

      result += base64Chars[b1 >> 2]
      result += base64Chars[((b1 & 0x03) << 4) | (b2 >> 4)]
      result += i + 1 < data.length ? base64Chars[((b2 & 0x0F) << 2) | (b3 >> 6)] : ""
      result += i + 2 < data.length ? base64Chars[b3 & 0x3F] : ""
    }
    return result
  }, [])

  const decodeBase64Modified = useCallback((base64: string): Uint8Array => {
    const cleaned = base64.replace(/[^A-Za-z0-9+/]/g, "")
    const bytes: number[] = []

    for (let i = 0; i < cleaned.length; i += 4) {
      const b1 = base64Chars.indexOf(cleaned[i] || "A")
      const b2 = base64Chars.indexOf(cleaned[i + 1] || "A")
      const b3 = base64Chars.indexOf(cleaned[i + 2] || "A")
      const b4 = base64Chars.indexOf(cleaned[i + 3] || "A")

      bytes.push((b1 << 2) | (b2 >> 4))
      if (cleaned[i + 2] && cleaned[i + 2] !== "=") {
        bytes.push(((b2 & 0x0F) << 4) | (b3 >> 2))
      }
      if (cleaned[i + 3] && cleaned[i + 3] !== "=") {
        bytes.push(((b3 & 0x03) << 6) | b4)
      }
    }

    return new Uint8Array(bytes)
  }, [])

  const encodeUtf7 = useCallback((text: string): string => {
    let result = ""
    let buffer: number[] = []

    const flushBuffer = () => {
      if (buffer.length > 0) {
        const encoded = encodeBase64Modified(new Uint8Array(buffer))
        result += "+" + encoded + (encoded.length % 4 === 0 ? "" : "-")
        buffer = []
      }
    }

    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i)

      // Check if character is in the direct character set (printable ASCII except + and ~)
      if (
        (code >= 0x20 && code <= 0x2B && code !== 0x2B) ||
        (code >= 0x2D && code <= 0x3C) ||
        (code >= 0x3E && code <= 0x7E) ||
        code === 0x09 || code === 0x0A || code === 0x0D
      ) {
        flushBuffer()
        result += String.fromCharCode(code)
      } else {
        // Encode as UTF-16BE then Base64
        if (code <= 0xFFFF) {
          buffer.push((code >> 8) & 0xFF)
          buffer.push(code & 0xFF)
        } else {
          // Surrogate pair for characters > 0xFFFF
          const surrogate = String.fromCodePoint(code)
          const h = surrogate.charCodeAt(0)
          const l = surrogate.charCodeAt(1)
          buffer.push((h >> 8) & 0xFF, h & 0xFF, (l >> 8) & 0xFF, l & 0xFF)
        }
      }
    }

    flushBuffer()
    return result
  }, [encodeBase64Modified])

  const decodeUtf7 = useCallback((encoded: string): string => {
    let result = ""
    let i = 0

    while (i < encoded.length) {
      if (encoded[i] === "+") {
        // Find the end of the Base64 section
        let j = i + 1
        while (j < encoded.length && encoded[j] !== "-") {
          if (!/[A-Za-z0-9+]/.test(encoded[j])) break
          j++
        }

        const base64Data = encoded.slice(i + 1, j)
        if (base64Data) {
          const bytes = decodeBase64Modified(base64Data)

          // Decode UTF-16BE
          for (let k = 0; k < bytes.length; k += 2) {
            const high = bytes[k]
            const low = bytes[k + 1] ?? 0
            const code = (high << 8) | low
            if (code !== 0) {
              result += String.fromCharCode(code)
            }
          }
        }

        if (encoded[j] === "-") {
          i = j + 1
        } else {
          // Literal + encoded as +-
          result += "+"
          i = j
        }
      } else {
        result += encoded[i]
        i++
      }
    }

    return result
  }, [decodeBase64Modified])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setOutput(encodeUtf7(value))
      } else {
        setOutput(decodeUtf7(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, encodeUtf7, decodeUtf7])

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode)
    setError(null)
    if (newMode === "encode") {
      setOutput(encodeUtf7(input))
    } else {
      setOutput(decodeUtf7(input))
    }
  }, [input, encodeUtf7, decodeUtf7])

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
        <h2 className="text-2xl font-semibold tracking-tight">UTF-7 Encoder/Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Encode text to UTF-7 format or decode UTF-7 back to text
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
            Encode to UTF-7
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode from UTF-7
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Encode" : "UTF-7 String"}
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
              ? "Enter text to encode (e.g., Hello, \u03B1\u03B2\u03B3, \u4E2D\u6587)..."
              : "Enter UTF-7 encoded string (e.g., Hello,+AGMA,alpha-)..."
          }
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <AlertCircle className="size-4" />
            {error}
          </p>
        )}
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "encode" ? "UTF-7 Result" : "Decoded Text"}
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
            <h4 className="text-sm font-medium">About UTF-7</h4>
            <p className="text-sm text-muted-foreground">
              UTF-7 (7-bit Unicode Transformation Format) is a variable-length character encoding
              designed to encode Unicode text using only 7-bit ASCII characters. It was originally
              intended for email systems that couldn't handle 8-bit data.
            </p>
            <p className="text-sm text-muted-foreground">
              ASCII characters remain unencoded, while non-ASCII characters are encoded using a
              modified Base64 encoding prefixed with + and optionally suffixed with -. Note that
              UTF-7 has known security vulnerabilities and is generally not recommended for new
              applications.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

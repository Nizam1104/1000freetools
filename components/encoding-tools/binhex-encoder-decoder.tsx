"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinhexEncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const binHexEncode = useCallback((text: string): string => {
    const bytes = new TextEncoder().encode(text)
    let result = ""

    // Add header
    result += "(This file must be converted with BinHex 4.0)\n"
    result += ":\n"

    // Encode data
    let prevByte = 0
    let runLength = 0

    for (let i = 0; i < bytes.length; i++) {
      const byte = bytes[i]

      if (byte === prevByte && runLength < 63) {
        runLength++
      } else {
        if (runLength > 0) {
          result += String.fromCharCode(128 + runLength - 1)
          runLength = 0
        }
        if (byte >= 128 || byte === 0 || byte === 9 || byte === 10 || byte === 13) {
          result += String.fromCharCode(128)
          result += String.fromCharCode(byte)
        } else {
          result += String.fromCharCode(byte)
        }
        prevByte = byte
      }
    }

    if (runLength > 0) {
      result += String.fromCharCode(128 + runLength - 1)
    }

    // Calculate CRC (simplified)
    let crc = 0
    for (let i = 0; i < bytes.length; i++) {
      crc = (crc + bytes[i]) & 0xFFFF
    }

    // Add CRC bytes
    result += String.fromCharCode((crc >> 8) & 0xFF)
    result += String.fromCharCode(crc & 0xFF)

    // Convert to hex representation
    let hexOutput = ""
    for (let i = 0; i < result.length; i++) {
      const code = result.charCodeAt(i)
      hexOutput += code.toString(16).toUpperCase().padStart(2, "0")
      if ((i + 1) % 32 === 0 && i < result.length - 1) {
        hexOutput += "\n"
      }
    }

    return hexOutput
  }, [])

  const binHexDecode = useCallback((hexString: string): string => {
    // Remove header and whitespace
    let cleaned = hexString.replace(/\(.*?\)/g, "").replace(/:\n/, "").replace(/\s+/g, "")

    // Convert hex to bytes
    const bytes: number[] = []
    for (let i = 0; i < cleaned.length; i += 2) {
      const hex = cleaned.slice(i, i + 2)
      if (/^[0-9A-Fa-f]{2}$/.test(hex)) {
        bytes.push(parseInt(hex, 16))
      }
    }

    // Decode RLE and special characters
    let result = ""
    let i = 0

    while (i < bytes.length - 2) { // -2 for CRC
      const byte = bytes[i]

      if (byte === 128) {
        // Next byte is literal
        i++
        if (i < bytes.length - 2) {
          result += String.fromCharCode(bytes[i])
        }
      } else if (byte > 128) {
        // Run length encoding
        const runLength = byte - 127
        i++
        if (i < bytes.length - 2) {
          const runByte = bytes[i]
          result += String.fromCharCode(runByte).repeat(runLength)
        }
      } else {
        result += String.fromCharCode(byte)
      }
      i++
    }

    return result
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setOutput(binHexEncode(value))
      } else {
        setOutput(binHexDecode(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, binHexEncode, binHexDecode])

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode)
    setError(null)
    if (newMode === "encode") {
      setOutput(binHexEncode(input))
    } else {
      setOutput(binHexDecode(input))
    }
  }, [input, binHexEncode, binHexDecode])

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

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setInput(result)
        setOutput(binHexEncode(result))
      }
      reader.readAsText(file)
    }
  }, [binHexEncode])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">BinHex Encoder/Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Encode text to BinHex format or decode BinHex back to text
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
            Encode to BinHex
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode from BinHex
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Encode" : "BinHex String"}
          </Label>
          <div className="flex items-center gap-2">
            {mode === "encode" && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => document.getElementById("file-upload")?.click()}
                className="h-7"
              >
                <Upload className="size-3.5" />
                <span className="text-xs">Upload</span>
              </Button>
            )}
            <input
              id="file-upload"
              type="file"
              accept=".txt,.bin"
              onChange={handleFileUpload}
              className="hidden"
            />
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
          placeholder={mode === "encode" ? "Enter text to encode to BinHex..." : "Enter BinHex encoded string..."}
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
            {mode === "encode" ? "BinHex Result" : "Decoded Text"}
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
            <h4 className="text-sm font-medium">About BinHex</h4>
            <p className="text-sm text-muted-foreground">
              BinHex (Binary-to-Hexadecimal) is a file encoding format originally developed for
              the Macintosh. It converts binary data to ASCII text using hexadecimal representation,
              making it safe for email transmission and text-based storage.
            </p>
            <p className="text-sm text-muted-foreground">
              BinHex 4.0 includes run-length encoding (RLE) for compression and a CRC checksum
              for error detection. While largely obsolete today, it was essential for Mac file
              transfers in the pre-Internet era.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

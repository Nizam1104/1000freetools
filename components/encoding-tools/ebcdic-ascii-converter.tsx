"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// EBCDIC to ASCII conversion table (common EBCDIC code page 037)
const EBCDIC_TO_ASCII: Record<number, number> = {
  0x00: 0x00, 0x01: 0x01, 0x02: 0x02, 0x03: 0x03,
  0x05: 0x05, 0x06: 0x06, 0x07: 0x07, 0x08: 0x08,
  0x09: 0x09, 0x0A: 0x0A, 0x0B: 0x0B, 0x0C: 0x0C,
  0x0D: 0x0D, 0x0E: 0x0E, 0x0F: 0x0F,
  0x10: 0x10, 0x11: 0x11, 0x12: 0x12, 0x13: 0x13,
  0x14: 0x14, 0x15: 0x15, 0x16: 0x16, 0x17: 0x17,
  0x18: 0x18, 0x19: 0x19, 0x1A: 0x1A, 0x1B: 0x1B,
  0x1C: 0x1C, 0x1D: 0x1D, 0x1E: 0x1E, 0x1F: 0x1F,
  0x20: 0x20, 0x21: 0x21, 0x22: 0x22, 0x23: 0x23,
  0x24: 0x24, 0x25: 0x25, 0x26: 0x26, 0x27: 0x27,
  0x28: 0x28, 0x29: 0x29, 0x2A: 0x2A, 0x2B: 0x2B,
  0x2C: 0x2C, 0x2D: 0x2D, 0x2E: 0x2E, 0x2F: 0x2F,
  0x30: 0x30, 0x31: 0x31, 0x32: 0x32, 0x33: 0x33,
  0x34: 0x34, 0x35: 0x35, 0x36: 0x36, 0x37: 0x37,
  0x38: 0x38, 0x39: 0x39, 0x3A: 0x3A, 0x3B: 0x3B,
  0x3C: 0x3C, 0x3D: 0x3D, 0x3E: 0x3E, 0x3F: 0x3F,
  0x40: 0x20, 0x41: 0xA0, 0x42: 0xE2, 0x43: 0xE4,
  0x44: 0xE0, 0x45: 0xE1, 0x46: 0xE3, 0x47: 0xE5,
  0x48: 0xE7, 0x49: 0xF1, 0x4A: 0xA2, 0x4B: 0x2E,
  0x4C: 0x3C, 0x4D: 0x28, 0x4E: 0x2B, 0x4F: 0x7C,
  0x50: 0x26, 0x51: 0xE9, 0x52: 0xEA, 0x53: 0xEB,
  0x54: 0xE8, 0x55: 0xED, 0x56: 0xEE, 0x57: 0xEF,
  0x58: 0xEC, 0x59: 0xDF, 0x5A: 0x21, 0x5B: 0x24,
  0x5C: 0x2A, 0x5D: 0x29, 0x5E: 0x3B, 0x5F: 0xAC,
  0x60: 0x2D, 0x61: 0x2F, 0x62: 0xC2, 0x63: 0xC4,
  0x64: 0xC0, 0x65: 0xC1, 0x66: 0xC3, 0x67: 0xC5,
  0x68: 0xC7, 0x69: 0xD1, 0x6A: 0xA6, 0x6B: 0x2C,
  0x6C: 0x25, 0x6D: 0x5F, 0x6E: 0x3E, 0x6F: 0x3F,
  0x70: 0xF8, 0x71: 0xC9, 0x72: 0xCA, 0x73: 0xCB,
  0x74: 0xC8, 0x75: 0xCD, 0x76: 0xCE, 0x77: 0xCF,
  0x78: 0xCC, 0x79: 0xA8, 0x7A: 0x3A, 0x7B: 0x23,
  0x7C: 0x40, 0x7D: 0x27, 0x7E: 0x3D, 0x7F: 0x22,
  0x80: 0x61, 0x81: 0x62, 0x82: 0x63, 0x83: 0x64,
  0x84: 0x65, 0x85: 0x66, 0x86: 0x67, 0x87: 0x68,
  0x88: 0x69, 0x89: 0x6A, 0x8A: 0x6B, 0x8B: 0x6C,
  0x8C: 0x6D, 0x8D: 0x6E, 0x8E: 0x6F, 0x8F: 0x70,
  0x90: 0x71, 0x91: 0x72, 0x92: 0x73, 0x93: 0x74,
  0x94: 0x75, 0x95: 0x76, 0x96: 0x77, 0x97: 0x78,
  0x98: 0x79, 0x99: 0x7A, 0x9A: 0x7B, 0x9B: 0x7C,
  0x9C: 0x7D, 0x9D: 0x7E, 0x9E: 0x7F, 0x9F: 0x80,
  0xA0: 0x81, 0xA1: 0x82, 0xA2: 0x83, 0xA3: 0x84,
  0xA4: 0x85, 0xA5: 0x86, 0xA6: 0x87, 0xA7: 0x88,
  0xA8: 0x89, 0xA9: 0x8A, 0xAA: 0x8B, 0xAB: 0x8C,
  0xAC: 0x8D, 0xAD: 0x8E, 0xAE: 0x8F, 0xAF: 0x90,
  0xB0: 0x91, 0xB1: 0x92, 0xB2: 0x93, 0xB3: 0x94,
  0xB4: 0x95, 0xB5: 0x96, 0xB6: 0x97, 0xB7: 0x98,
  0xB8: 0x99, 0xB9: 0x9A, 0xBA: 0x9B, 0xBB: 0x9C,
  0xBC: 0x9D, 0xBD: 0x9E, 0xBE: 0x9F, 0xBF: 0xA0,
  0xC0: 0xA1, 0xC1: 0x41, 0xC2: 0x42, 0xC3: 0x43,
  0xC4: 0x44, 0xC5: 0x45, 0xC6: 0x46, 0xC7: 0x47,
  0xC8: 0x48, 0xC9: 0x49, 0xCA: 0xA4, 0xCB: 0xA5,
  0xCC: 0xA6, 0xCD: 0xA7, 0xCE: 0xB8, 0xCF: 0xB9,
  0xD0: 0xBA, 0xD1: 0xBB, 0xD2: 0xBC, 0xD3: 0xBD,
  0xD4: 0xBE, 0xD5: 0xBF, 0xD6: 0xAA, 0xD7: 0xAB,
  0xD8: 0x5B, 0xD9: 0x4A, 0xDA: 0x4B, 0xDB: 0x4C,
  0xDC: 0x4D, 0xDD: 0x4E, 0xDE: 0x4F, 0xDF: 0x50,
  0xE0: 0x51, 0xE1: 0x52, 0xE2: 0x53, 0xE3: 0x54,
  0xE4: 0x55, 0xE5: 0x56, 0xE6: 0x57, 0xE7: 0x58,
  0xE8: 0x59, 0xE9: 0x5A, 0xEA: 0xB1, 0xEB: 0xB2,
  0xEC: 0xB3, 0xED: 0xB4, 0xEE: 0xB5, 0xEF: 0xB6,
  0xF0: 0xB7, 0xF1: 0x30, 0xF2: 0x31, 0xF3: 0x32,
  0xF4: 0x33, 0xF5: 0x34, 0xF6: 0x35, 0xF7: 0x36,
  0xF8: 0x37, 0xF9: 0x38, 0xFA: 0x39, 0xFB: 0xAD,
  0xFC: 0xFE, 0xFD: 0xAF, 0xFE: 0x5E, 0xFF: 0x60,
}

// Create reverse mapping (ASCII to EBCDIC)
const ASCII_TO_EBCDIC: Record<number, number> = {}
Object.entries(EBCDIC_TO_ASCII).forEach(([ebcdic, ascii]) => {
  ASCII_TO_EBCDIC[ascii] = parseInt(ebcdic)
})

export default function EbcdicAsciiConverter() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"ebcdic-to-ascii" | "ascii-to-ebcdic">("ebcdic-to-ascii")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState<"text" | "hex">("text")

  const ebcdicToAscii = useCallback((ebcdicHex: string): string => {
    const hexPairs = ebcdicHex.replace(/\s+/g, "").match(/.{1,2}/g)
    if (!hexPairs) throw new Error("Invalid EBCDIC hex string")

    const asciiChars: string[] = []
    for (const hex of hexPairs) {
      const ebcdicCode = parseInt(hex, 16)
      if (isNaN(ebcdicCode)) throw new Error(`Invalid hex value: ${hex}`)

      const asciiCode = EBCDIC_TO_ASCII[ebcdicCode]
      if (asciiCode === undefined) {
        asciiChars.push("?")
      } else if (asciiCode >= 32 && asciiCode <= 126) {
        asciiChars.push(String.fromCharCode(asciiCode))
      } else if (asciiCode === 10 || asciiCode === 13) {
        asciiChars.push(String.fromCharCode(asciiCode))
      } else {
        asciiChars.push(`\\x${asciiCode.toString(16).padStart(2, "0")}`)
      }
    }
    return asciiChars.join("")
  }, [])

  const asciiToEbcdic = useCallback((ascii: string): string => {
    const bytes: string[] = []
    for (let i = 0; i < ascii.length; i++) {
      const asciiCode = ascii.charCodeAt(i)
      const ebcdicCode = ASCII_TO_EBCDIC[asciiCode]
      if (ebcdicCode === undefined) {
        bytes.push("FF") // Unknown character
      } else {
        bytes.push(ebcdicCode.toString(16).toUpperCase().padStart(2, "0"))
      }
    }
    return bytes.join(" ")
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "ebcdic-to-ascii") {
        setOutput(ebcdicToAscii(value))
      } else {
        setOutput(asciiToEbcdic(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, ebcdicToAscii, asciiToEbcdic])

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode)
    setError(null)
    if (newMode === "ebcdic-to-ascii") {
      setOutput(ebcdicToAscii(input))
    } else {
      setOutput(asciiToEbcdic(input))
    }
  }, [input, ebcdicToAscii, asciiToEbcdic])

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
        <h2 className="text-2xl font-semibold tracking-tight">EBCDIC to ASCII Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert between EBCDIC (IBM mainframe) and ASCII character encodings
        </p>
      </div>

      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Conversion Type</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "ebcdic-to-ascii" ? "default" : "outline"}
            onClick={() => handleModeChange("ebcdic-to-ascii")}
            className="flex-1"
          >
            EBCDIC to ASCII
          </Button>
          <Button
            variant={mode === "ascii-to-ebcdic" ? "default" : "outline"}
            onClick={() => handleModeChange("ascii-to-ebcdic")}
            className="flex-1"
          >
            ASCII to EBCDIC
          </Button>
        </div>

        {mode === "ascii-to-ebcdic" && (
          <div className="flex items-center gap-4 pt-2">
            <Label className="text-sm">Output Format:</Label>
            <div className="flex gap-2">
              <Button
                variant={outputFormat === "hex" ? "default" : "outline"}
                size="sm"
                onClick={() => setOutputFormat("hex")}
              >
                Hex Bytes
              </Button>
              <Button
                variant={outputFormat === "text" ? "default" : "outline"}
                size="sm"
                onClick={() => setOutputFormat("text")}
                disabled
              >
                Text (N/A for EBCDIC)
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "ebcdic-to-ascii" ? "EBCDIC Hex Bytes" : "ASCII Text"}
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
            mode === "ebcdic-to-ascii"
              ? "Enter EBCDIC hex bytes (e.g., C8 C5 D3 D3 D6)..."
              : "Enter ASCII text (e.g., HELLO)..."
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
            {mode === "ebcdic-to-ascii" ? "ASCII Result" : "EBCDIC Hex Bytes"}
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
            <h4 className="text-sm font-medium">About EBCDIC</h4>
            <p className="text-sm text-muted-foreground">
              EBCDIC (Extended Binary Coded Decimal Interchange Code) is an 8-bit character encoding
              developed by IBM in 1963. It's primarily used on IBM mainframe and midrange systems.
            </p>
            <p className="text-sm text-muted-foreground">
              Unlike ASCII, EBCDIC has non-contiguous letter sequences and different control character
              assignments. This converter uses EBCDIC code page 037, the most common variant.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

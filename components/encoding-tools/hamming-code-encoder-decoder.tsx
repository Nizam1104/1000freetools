"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HammingCodeEncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hammingType, setHammingType] = useState<"7-4" | "15-11">("7-4")
  const [errorPosition, setErrorPosition] = useState<number | null>(null)

  // Encode 4 bits to 7 bits using Hamming(7,4)
  const encodeHamming74 = useCallback((data: string): string => {
    const bits = data.replace(/\s+/g, "").split("").map(Number)
    if (bits.length % 4 !== 0) {
      throw new Error("Input length must be a multiple of 4 bits for Hamming(7,4)")
    }

    const result: number[] = []
    for (let i = 0; i < bits.length; i += 4) {
      const d = bits.slice(i, i + 4)
      // Positions: p1 p2 d1 p3 d2 d3 d4
      const p1 = d[0] ^ d[1] ^ d[3]
      const p2 = d[0] ^ d[2] ^ d[3]
      const p3 = d[1] ^ d[2] ^ d[3]
      result.push(p1, p2, d[0], p3, d[1], d[2], d[3])
    }
    return result.join("")
  }, [])

  // Decode 7 bits to 4 bits using Hamming(7,4)
  const decodeHamming74 = useCallback((encoded: string): { data: string; errorPos: number | null } => {
    const bits = encoded.replace(/\s+/g, "").split("").map(Number)
    if (bits.length % 7 !== 0) {
      throw new Error("Input length must be a multiple of 7 bits for Hamming(7,4)")
    }

    let result = ""
    let detectedError: number | null = null

    for (let i = 0; i < bits.length; i += 7) {
      const code = bits.slice(i, i + 7)
      // Calculate syndrome
      const s1 = code[0] ^ code[2] ^ code[4] ^ code[6]
      const s2 = code[1] ^ code[2] ^ code[5] ^ code[6]
      const s3 = code[3] ^ code[4] ^ code[5] ^ code[6]

      const errorPos = s1 + (s2 << 1) + (s3 << 2)

      if (errorPos !== 0) {
        // Correct the error
        code[errorPos - 1] ^= 1
        if (detectedError === null) {
          detectedError = errorPos
        }
      }

      // Extract data bits (positions 3, 5, 6, 7 -> indices 2, 4, 5, 6)
      result += code[2] + code[4] + code[5] + code[6]
    }

    return { data: result, errorPos: detectedError }
  }, [])

  // Encode 11 bits to 15 bits using Hamming(15,11)
  const encodeHamming1511 = useCallback((data: string): string => {
    const bits = data.replace(/\s+/g, "").split("").map(Number)
    if (bits.length % 11 !== 0) {
      throw new Error("Input length must be a multiple of 11 bits for Hamming(15,11)")
    }

    const result: number[] = []
    for (let i = 0; i < bits.length; i += 11) {
      const d = bits.slice(i, i + 11)
      // Parity bit positions: 1, 2, 4, 8 (indices 0, 1, 3, 7)
      // Data positions: 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15
      const code = new Array(15).fill(0)

      // Place data bits
      code[2] = d[0]; code[4] = d[1]; code[5] = d[2]; code[6] = d[3]
      code[8] = d[4]; code[9] = d[5]; code[10] = d[6]; code[11] = d[7]
      code[12] = d[8]; code[13] = d[9]; code[14] = d[10]

      // Calculate parity bits
      code[0] = code[2] ^ code[4] ^ code[6] ^ code[8] ^ code[10] ^ code[12] ^ code[14]
      code[1] = code[2] ^ code[5] ^ code[6] ^ code[9] ^ code[10] ^ code[13] ^ code[14]
      code[3] = code[4] ^ code[5] ^ code[6] ^ code[12] ^ code[13] ^ code[14]
      code[7] = code[8] ^ code[9] ^ code[10] ^ code[11] ^ code[12] ^ code[13] ^ code[14]

      result.push(...code)
    }
    return result.join("")
  }, [])

  // Decode 15 bits to 11 bits using Hamming(15,11)
  const decodeHamming1511 = useCallback((encoded: string): { data: string; errorPos: number | null } => {
    const bits = encoded.replace(/\s+/g, "").split("").map(Number)
    if (bits.length % 15 !== 0) {
      throw new Error("Input length must be a multiple of 15 bits for Hamming(15,11)")
    }

    let result = ""
    let detectedError: number | null = null

    for (let i = 0; i < bits.length; i += 15) {
      const code = bits.slice(i, i + 15)

      // Calculate syndrome
      const s1 = code[0] ^ code[2] ^ code[4] ^ code[6] ^ code[8] ^ code[10] ^ code[12] ^ code[14]
      const s2 = code[1] ^ code[2] ^ code[5] ^ code[6] ^ code[9] ^ code[10] ^ code[13] ^ code[14]
      const s3 = code[3] ^ code[4] ^ code[5] ^ code[6] ^ code[12] ^ code[13] ^ code[14]
      const s4 = code[7] ^ code[8] ^ code[9] ^ code[10] ^ code[11] ^ code[12] ^ code[13] ^ code[14]

      const errorPos = s1 + (s2 << 1) + (s3 << 2) + (s4 << 3)

      if (errorPos !== 0 && errorPos <= 15) {
        code[errorPos - 1] ^= 1
        if (detectedError === null) {
          detectedError = errorPos
        }
      }

      // Extract data bits
      result += code[2] + code[4] + code[5] + code[6] + code[8] + code[9] + code[10] + code[11] + code[12] + code[13] + code[14]
    }

    return { data: result, errorPos: detectedError }
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    setErrorPosition(null)
    try {
      if (mode === "encode") {
        if (hammingType === "7-4") {
          setOutput(encodeHamming74(value))
        } else {
          setOutput(encodeHamming1511(value))
        }
      } else {
        if (hammingType === "7-4") {
          const result = decodeHamming74(value)
          setOutput(result.data)
          setErrorPosition(result.errorPos)
        } else {
          const result = decodeHamming1511(value)
          setOutput(result.data)
          setErrorPosition(result.errorPos)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, hammingType, encodeHamming74, encodeHamming1511, decodeHamming74, decodeHamming1511])

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode)
    setError(null)
    setErrorPosition(null)
    handleInputChange(input)
  }, [input, handleInputChange])

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
    setErrorPosition(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Hamming Code Encoder/Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Encode data with Hamming error-correcting code or decode and detect/correct errors
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
            Encode
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Label className="text-sm">Hamming Code Type:</Label>
          <div className="flex gap-2">
            <Button
              variant={hammingType === "7-4" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setHammingType("7-4")
                handleInputChange(input)
              }}
            >
              Hamming(7,4)
            </Button>
            <Button
              variant={hammingType === "15-11" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setHammingType("15-11")
                handleInputChange(input)
              }}
            >
              Hamming(15,11)
            </Button>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Data Bits" : "Encoded Bits (with parity)"}
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
              ? hammingType === "7-4"
                ? "Enter data bits in multiples of 4 (e.g., 1011 0110)..."
                : "Enter data bits in multiples of 11 (e.g., 10110110011)..."
              : hammingType === "7-4"
              ? "Enter encoded bits in multiples of 7..."
              : "Enter encoded bits in multiples of 15..."
          }
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <AlertCircle className="size-4" />
            {error}
          </p>
        )}

        {errorPosition !== null && mode === "decode" && (
          <p className="text-sm text-amber-600 flex items-center gap-2">
            <AlertCircle className="size-4" />
            Error detected and corrected at bit position {errorPosition}
          </p>
        )}
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "encode" ? "Encoded Bits (with parity)" : "Decoded Data Bits"}
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
            <span>Input: <span className="font-medium text-foreground">{input.replace(/\s/g, "").length}</span> bits</span>
            <span>Output: <span className="font-medium text-foreground">{output.replace(/\s/g, "").length}</span> bits</span>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Hamming Code</h4>
            <p className="text-sm text-muted-foreground">
              Hamming code is an error-correcting code invented by Richard Hamming. It can detect
              and correct single-bit errors in data transmission. The code adds parity bits to the
              data bits at specific positions (powers of 2).
            </p>
            <p className="text-sm text-muted-foreground">
              Hamming(7,4) encodes 4 data bits into 7 bits (3 parity bits), while Hamming(15,11)
              encodes 11 data bits into 15 bits (4 parity bits). Both can detect and correct any
              single-bit error.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

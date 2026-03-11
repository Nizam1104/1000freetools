"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryComplementCalculator() {
  const [binaryInput, setBinaryInput] = useState<string>("")
  const [bitWidth, setBitWidth] = useState<number>(8)
  const [copied, setCopied] = useState<string | null>(null)

  const validateBinary = (binary: string): boolean => {
    return /^[01\s]+$/.test(binary)
  }

  const cleanBinary = useMemo(() => {
    return binaryInput.replace(/\s/g, "")
  }, [binaryInput])

  // Pad binary to specified bit width
  const paddedBinary = useMemo(() => {
    if (!cleanBinary || !validateBinary(binaryInput)) return ""
    return cleanBinary.padStart(bitWidth, "0").slice(-bitWidth)
  }, [cleanBinary, binaryInput, bitWidth])

  // One's complement: invert all bits
  const onesComplement = useMemo(() => {
    if (!paddedBinary) return ""
    return paddedBinary.split("").map(b => b === "0" ? "1" : "0").join("")
  }, [paddedBinary])

  // Two's complement: one's complement + 1
  const twosComplement = useMemo(() => {
    if (!onesComplement) return ""
    // Add 1 to one's complement
    let carry = 1
    let result = ""
    
    for (let i = onesComplement.length - 1; i >= 0; i--) {
      const bit = parseInt(onesComplement[i])
      const sum = bit + carry
      result = (sum % 2).toString() + result
      carry = Math.floor(sum / 2)
    }
    
    return result.slice(-bitWidth).padStart(bitWidth, "0")
  }, [onesComplement, bitWidth])

  // Format with spaces every 4 bits
  const formatBinary = (binary: string): string => {
    return binary.replace(/(.{4})/g, "$1 ").trim()
  }

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
    setBinaryInput("")
  }, [])

  const decimalValue = useMemo(() => {
    if (!paddedBinary) return 0
    return parseInt(paddedBinary, 2)
  }, [paddedBinary])

  const onesComplementDecimal = useMemo(() => {
    if (!onesComplement) return 0
    return parseInt(onesComplement, 2)
  }, [onesComplement])

  const twosComplementDecimal = useMemo(() => {
    if (!twosComplement) return 0
    // For two's complement, interpret as signed
    const unsigned = parseInt(twosComplement, 2)
    const signBit = twosComplement[0]
    return signBit === "1" ? unsigned - Math.pow(2, bitWidth) : unsigned
  }, [twosComplement, bitWidth])

  const isValidInput = validateBinary(binaryInput) && cleanBinary.length > 0

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="binary-input" className="text-base font-medium">
            Binary Input
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(cleanBinary, "input")}
              className="h-7"
              disabled={!cleanBinary}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!binaryInput}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Input
          id="binary-input"
          value={binaryInput}
          onChange={(e) => setBinaryInput(e.target.value.replace(/[^01\s]/g, ""))}
          className={cn(
            "font-mono text-base",
            !isValidInput && cleanBinary.length > 0 ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Enter binary number (e.g., 00001010)..."
        />

        {!isValidInput && cleanBinary.length > 0 && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <Info className="size-4" />
            Invalid binary number. Only 0s and 1s are allowed.
          </p>
        )}

        {/* Bit Width Selector */}
        <div className="flex items-center gap-2">
          <Label htmlFor="bit-width" className="text-sm font-medium">
            Bit Width:
          </Label>
          <div className="flex gap-1">
            {[4, 8, 16, 32].map((bits) => (
              <Button
                key={bits}
                variant={bitWidth === bits ? "default" : "outline"}
                size="xs"
                onClick={() => setBitWidth(bits)}
                className="h-7 px-3"
              >
                {bits}-bit
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {isValidInput && (
        <section className="space-y-4">
          {/* Original */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Original Binary</Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(paddedBinary, "original")}
                className="h-7"
              >
                {copied === "original" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-mono text-xl text-center">{formatBinary(paddedBinary)}</p>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Decimal: {decimalValue}
              </p>
            </div>
          </div>

          {/* One's Complement */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">1's Complement (Invert All Bits)</Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(onesComplement, "ones")}
                className="h-7"
              >
                {copied === "ones" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-mono text-xl text-center">{formatBinary(onesComplement)}</p>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Decimal: {onesComplementDecimal}
              </p>
            </div>
          </div>

          {/* Two's Complement */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">2's Complement (1's Complement + 1)</Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(twosComplement, "twos")}
                className="h-7"
              >
                {copied === "twos" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-mono text-xl text-center">{formatBinary(twosComplement)}</p>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Signed Decimal: {twosComplementDecimal} (represents {twosComplementDecimal})
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Step by Step */}
      {isValidInput && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Step-by-Step Calculation</h3>
          <div className="rounded-lg border bg-background divide-y">
            <div className="p-3">
              <p className="text-sm font-medium mb-2">1's Complement (Bitwise NOT)</p>
              <div className="space-y-1 font-mono text-xs">
                <p>Original:  {formatBinary(paddedBinary)}</p>
                <p>Invert:    {formatBinary(paddedBinary.split("").map(b => b === "0" ? "1" : "0").join(""))}</p>
                <p className="text-primary">Result:    {formatBinary(onesComplement)}</p>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium mb-2">2's Complement (Add 1 to 1's Complement)</p>
              <div className="space-y-1 font-mono text-xs">
                <p>1's Comp:  {formatBinary(onesComplement)}</p>
                <p>+ 1:       {formatBinary("1".padStart(bitWidth, "0"))}</p>
                <p className="text-primary">Result:    {formatBinary(twosComplement)}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bit Visualization */}
      {isValidInput && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Bit Visualization</h3>
          <div className="rounded-lg border bg-background p-4 overflow-x-auto">
            <div className="grid grid-cols-3 gap-4 min-w-max">
              <div>
                <p className="text-xs text-muted-foreground mb-2 text-center">Original</p>
                <div className="flex gap-1">
                  {paddedBinary.split("").map((bit, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-8 h-10 rounded font-mono text-sm flex items-center justify-center",
                        bit === "1" ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}
                    >
                      {bit}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 text-center">1's Complement</p>
                <div className="flex gap-1">
                  {onesComplement.split("").map((bit, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-8 h-10 rounded font-mono text-sm flex items-center justify-center",
                        bit === "1" ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}
                    >
                      {bit}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 text-center">2's Complement</p>
                <div className="flex gap-1">
                  {twosComplement.split("").map((bit, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-8 h-10 rounded font-mono text-sm flex items-center justify-center",
                        bit === "1" ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}
                    >
                      {bit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Understanding Binary Complements</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>1's Complement:</strong> Invert all bits (0→1, 1→0). This is the bitwise NOT operation.
              </p>
              <p>
                <strong>2's Complement:</strong> Add 1 to the 1's complement. This is the standard way computers 
                represent negative numbers. For example, in 8-bit: +5 = 00000101, -5 = 11111011.
              </p>
              <p>
                2's complement allows subtraction to be performed as addition: A - B = A + (-B).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

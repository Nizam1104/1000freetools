"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BcdToDecimalConverter() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"bcd-to-decimal" | "decimal-to-bcd">("bcd-to-decimal")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [bcdType, setBcdType] = useState<"packed" | "unpacked">("packed")

  const bcdToDecimal = useCallback((bcd: string, packed: boolean): string => {
    const bits = bcd.replace(/\s+/g, "")
    if (!/^[01]+$/.test(bits)) throw new Error("Invalid BCD binary string")

    if (packed) {
      const bytes = bits.match(/.{1,8}/g) || []
      const digits = bytes.map(byte => {
        const high = parseInt(byte.slice(0, 4), 2)
        const low = parseInt(byte.slice(4, 8), 2)
        if (high > 9 || low > 9) throw new Error(`Invalid BCD: digit > 9 in byte ${byte}`)
        return `${high}${low}`
      })
      return digits.join("").replace(/^0+/, "") || "0"
    } else {
      const bytes = bits.match(/.{1,8}/g) || []
      const digits = bytes.map(byte => {
        const value = parseInt(byte.slice(4, 8), 2)
        if (value > 9) throw new Error(`Invalid BCD: digit > 9 in byte ${byte}`)
        return value.toString()
      })
      return digits.join("").replace(/^0+/, "") || "0"
    }
  }, [])

  const decimalToBcd = useCallback((decimal: string, packed: boolean): string => {
    const digits = decimal.replace(/[^0-9]/g, "")
    if (!digits) throw new Error("Please enter valid decimal digits")

    if (packed) {
      const padded = digits.length % 2 === 1 ? "0" + digits : digits
      const bytes: string[] = []
      for (let i = 0; i < padded.length; i += 2) {
        const high = padded[i]
        const low = padded[i + 1]
        const byte = (parseInt(high) << 4) | parseInt(low)
        bytes.push(byte.toString(2).padStart(8, "0"))
      }
      return bytes.join(" ")
    } else {
      const bytes = digits.split("").map(d => `0000${parseInt(d).toString(2).padStart(4, "0")}`)
      return bytes.join(" ")
    }
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "bcd-to-decimal") {
        setOutput(bcdToDecimal(value, bcdType === "packed"))
      } else {
        setOutput(decimalToBcd(value, bcdType === "packed"))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, bcdType, bcdToDecimal, decimalToBcd])

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode)
    setError(null)
    if (newMode === "bcd-to-decimal") {
      setOutput(bcdToDecimal(input, bcdType === "packed"))
    } else {
      setOutput(decimalToBcd(input, bcdType === "packed"))
    }
  }, [input, bcdType, bcdToDecimal, decimalToBcd])

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
        <h2 className="text-2xl font-semibold tracking-tight">BCD to Decimal Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert Binary Coded Decimal (BCD) to decimal numbers and vice versa
        </p>
      </div>

      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Conversion Type</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "bcd-to-decimal" ? "default" : "outline"}
            onClick={() => handleModeChange("bcd-to-decimal")}
            className="flex-1"
          >
            BCD to Decimal
          </Button>
          <Button
            variant={mode === "decimal-to-bcd" ? "default" : "outline"}
            onClick={() => handleModeChange("decimal-to-bcd")}
            className="flex-1"
          >
            Decimal to BCD
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Label className="text-sm">BCD Format:</Label>
          <div className="flex gap-2">
            <Button
              variant={bcdType === "packed" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setBcdType("packed")
                handleInputChange(input)
              }}
            >
              Packed (2 digits/byte)
            </Button>
            <Button
              variant={bcdType === "unpacked" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setBcdType("unpacked")
                handleInputChange(input)
              }}
            >
              Unpacked (1 digit/byte)
            </Button>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "bcd-to-decimal" ? "BCD Binary" : "Decimal Number"}
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

        <Input
          id="input"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className={cn(
            "font-mono text-sm",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={
            mode === "bcd-to-decimal"
              ? "Enter BCD binary (e.g., 00010010 00110100)..."
              : "Enter decimal number (e.g., 1234)..."
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
            {mode === "bcd-to-decimal" ? "Decimal Result" : "BCD Binary Result"}
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
          className="font-mono text-sm min-h-[100px] bg-muted/50"
          placeholder="Result will appear here..."
        />

        {output && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Input: <span className="font-medium text-foreground">{input.replace(/\s/g, "").length}</span> bits/chars</span>
            <span>Output: <span className="font-medium text-foreground">{output.replace(/\s/g, "").length}</span> bits/chars</span>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About BCD</h4>
            <p className="text-sm text-muted-foreground">
              Binary Coded Decimal (BCD) is a class of binary encodings where each decimal digit
              is represented by a fixed number of bits, usually four or eight.
            </p>
            <p className="text-sm text-muted-foreground">
              Packed BCD stores two decimal digits per byte (more space-efficient), while Unpacked
              BCD stores one digit per byte (simpler for processing). BCD is used in digital displays,
              calculators, and financial systems requiring exact decimal representation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

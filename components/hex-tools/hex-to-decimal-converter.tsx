"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HexToDecimalConverter() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"hex-to-decimal" | "decimal-to-hex">("hex-to-decimal")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [signed, setSigned] = useState<boolean>(false)
  const [outputFormat, setOutputFormat] = useState<"decimal" | "hex" | "binary">("decimal")

  const hexToDecimal = useCallback((hex: string, isSigned: boolean): string => {
    const cleanHex = hex.replace(/[\s0x]/g, "")
    if (!/^[0-9a-fA-F]*$/.test(cleanHex)) {
      throw new Error("Invalid hex string")
    }
    
    if (isSigned && cleanHex.length > 0) {
      const firstNibble = parseInt(cleanHex[0], 16)
      if (firstNibble >= 8) {
        // Negative number in two's complement
        const bits = cleanHex.length * 4
        let value = BigInt("0x" + cleanHex)
        const maxVal = BigInt(1) << BigInt(bits)
        value = value - maxVal
        return value.toString()
      }
    }
    
    return BigInt("0x" + cleanHex).toString()
  }, [])

  const decimalToHex = useCallback((decimal: string): string => {
    const num = BigInt(decimal)
    if (num < BigInt(0)) {
      // Convert to two's complement
      const bits = BigInt(64)
      const maxVal = BigInt(1) << bits
      const twosComplement = maxVal + num
      return "0x" + twosComplement.toString(16).toUpperCase().padStart(16, "0")
    }
    return "0x" + num.toString(16).toUpperCase()
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "hex-to-decimal") {
        setOutput(hexToDecimal(value, signed))
      } else {
        setOutput(decimalToHex(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, hexToDecimal, decimalToHex, signed])

  const handleModeChange = useCallback((newMode: "hex-to-decimal" | "decimal-to-hex") => {
    setMode(newMode)
    setError(null)
    if (newMode === "hex-to-decimal") {
      setOutput(hexToDecimal(input, signed))
    } else {
      setOutput(decimalToHex(input))
    }
  }, [input, hexToDecimal, decimalToHex, signed])

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
            variant={mode === "hex-to-decimal" ? "default" : "outline"}
            onClick={() => handleModeChange("hex-to-decimal")}
            className="flex-1"
          >
            Hex to Decimal
          </Button>
          <Button
            variant={mode === "decimal-to-hex" ? "default" : "outline"}
            onClick={() => handleModeChange("decimal-to-hex")}
            className="flex-1"
          >
            Decimal to Hex
          </Button>
        </div>
      </section>

      {/* Signed Option */}
      {mode === "hex-to-decimal" && (
        <section className="space-y-3">
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={signed}
              onChange={(e) => {
                setSigned(e.target.checked)
                setOutput(hexToDecimal(input, e.target.checked))
              }}
              className="rounded border-border"
            />
            Treat as signed (two&apos;s complement)
          </Label>
        </section>
      )}

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "hex-to-decimal" ? "Hexadecimal" : "Decimal"}
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
            "font-mono text-sm min-h-[100px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={mode === "hex-to-decimal" ? "Enter hex number (e.g., 1A3F or 0x1A3F)..." : "Enter decimal number..."}
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
            {mode === "hex-to-decimal" ? "Decimal" : "Hexadecimal"}
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
      </section>
    </div>
  )
}

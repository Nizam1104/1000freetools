"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryToDecimalConverter() {
  const [binaryInput, setBinaryInput] = useState<string>("")
  const [decimalOutput, setDecimalOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const validateBinary = (binary: string): boolean => {
    return /^[01\s]+$/.test(binary)
  }

  const convertBinaryToDecimal = useCallback((binary: string) => {
    const cleanBinary = binary.replace(/\s/g, "")
    
    if (!cleanBinary) {
      setDecimalOutput("")
      setError(null)
      return
    }

    if (!validateBinary(binary)) {
      setError("Invalid binary number. Only 0s and 1s are allowed.")
      setDecimalOutput("")
      return
    }

    try {
      const decimal = parseInt(cleanBinary, 2)
      if (isNaN(decimal)) {
        throw new Error("Invalid binary number")
      }
      setDecimalOutput(decimal.toLocaleString())
      setError(null)
    } catch (err) {
      setError("Number too large or invalid")
      setDecimalOutput("")
    }
  }, [])

  React.useEffect(() => {
    convertBinaryToDecimal(binaryInput)
  }, [binaryInput, convertBinaryToDecimal])

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
    setDecimalOutput("")
    setError(null)
  }, [])

  const positionalBreakdown = useMemo(() => {
    const cleanBinary = binaryInput.replace(/\s/g, "")
    if (!cleanBinary || !validateBinary(binaryInput)) return []

    const positions: { position: number; bit: string; value: number; contribution: number }[] = []
    const length = cleanBinary.length

    for (let i = 0; i < length; i++) {
      const bit = cleanBinary[i]
      const position = length - 1 - i
      const value = Math.pow(2, position)
      const contribution = bit === "1" ? value : 0
      positions.push({
        position,
        bit,
        value,
        contribution,
      })
    }

    return positions
  }, [binaryInput])

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
              onClick={() => copyToClipboard(binaryInput, "input")}
              className="h-7"
              disabled={!binaryInput}
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
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Enter binary number (e.g., 10101010)..."
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <Info className="size-4" />
            {error}
          </p>
        )}
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="decimal-output" className="text-base font-medium">
            Decimal Output
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(decimalOutput.replace(/,/g, ""), "output")}
            className="h-7"
            disabled={!decimalOutput}
          >
            {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6">
          {decimalOutput ? (
            <p className="font-mono text-3xl font-bold text-center">{decimalOutput}</p>
          ) : (
            <p className="text-sm text-muted-foreground text-center">Decimal value will appear here</p>
          )}
        </div>
      </section>

      {/* Positional Breakdown */}
      {positionalBreakdown.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Positional Weight Breakdown</h3>
          <div className="rounded-lg border bg-background overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-3 py-2 text-left font-medium">Position</th>
                  <th className="px-3 py-2 text-left font-medium">Power of 2</th>
                  <th className="px-3 py-2 text-left font-medium">Bit</th>
                  <th className="px-3 py-2 text-left font-medium">Value</th>
                  <th className="px-3 py-2 text-left font-medium">Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {positionalBreakdown.map((item, idx) => (
                  <tr key={idx} className={item.bit === "1" ? "bg-muted/30" : ""}>
                    <td className="px-3 py-2 font-mono">{item.position}</td>
                    <td className="px-3 py-2 font-mono">2<sup>{item.position}</sup></td>
                    <td className="px-3 py-2 font-mono">{item.bit}</td>
                    <td className="px-3 py-2 font-mono">{item.value.toLocaleString()}</td>
                    <td className="px-3 py-2 font-mono font-medium">
                      {item.contribution > 0 ? item.contribution.toLocaleString() : "0"}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t bg-muted/50 font-medium">
                  <td colSpan={4} className="px-3 py-2 text-right">Total:</td>
                  <td className="px-3 py-2 font-mono">{decimalOutput}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      )}

      {/* Formula Display */}
      {positionalBreakdown.length > 0 && (
        <section className="rounded-lg border bg-muted/30 p-4">
          <h4 className="text-sm font-medium mb-2">Calculation Formula</h4>
          <p className="font-mono text-xs overflow-x-auto whitespace-nowrap">
            {positionalBreakdown
              .filter(item => item.bit === "1")
              .map(item => `2<sup>${item.position}</sup> (${item.value.toLocaleString()})`)
              .join(" + ")}{" "}
            = {decimalOutput}
          </p>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">How Binary to Decimal Conversion Works</h4>
            <p className="text-sm text-muted-foreground">
              Each position in a binary number represents a power of 2, starting from 2⁰ on the right.
              Multiply each bit by its positional value and sum the results.
              For example: 1010 = (1×2³) + (0×2²) + (1×2¹) + (0×2⁰) = 8 + 0 + 2 + 0 = 10
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

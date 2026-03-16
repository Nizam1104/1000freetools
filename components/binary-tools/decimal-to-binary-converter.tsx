"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DecimalToBinaryConverter() {
  const [decimalInput, setDecimalInput] = useState<string>("")
  const [binaryOutput, setBinaryOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [useTwosComplement, setUseTwosComplement] = useState<boolean>(false)
  const [bitWidth, setBitWidth] = useState<number>(8)

  const convertDecimalToBinary = useCallback((decimal: string, twosComplement: boolean, bits: number) => {
    if (!decimal.trim()) {
      setBinaryOutput("")
      setError(null)
      return
    }

    const num = parseInt(decimal.trim(), 10)
    
    if (isNaN(num)) {
      setError("Please enter a valid decimal number")
      setBinaryOutput("")
      return
    }

    try {
      let binary: string

      if (num >= 0) {
        binary = num.toString(2).padStart(bits, "0")
      } else if (twosComplement) {
        // Two's complement for negative numbers
        const absBinary = Math.abs(num).toString(2).padStart(bits, "0")
        const inverted = absBinary.split("").map(b => b === "0" ? "1" : "0").join("")
        const twosCompValue = (parseInt(inverted, 2) + 1) >>> 0
        binary = twosCompValue.toString(2).slice(-bits).padStart(bits, "0")
      } else {
        setError("Negative numbers require Two's Complement mode")
        setBinaryOutput("")
        return
      }

      // Format with spaces every 4 bits
      const formattedBinary = binary.replace(/(.{4})/g, "$1 ").trim()
      setBinaryOutput(formattedBinary)
      setError(null)
    } catch (err) {
      setError("Number too large for selected bit width")
      setBinaryOutput("")
    }
  }, [])

  React.useEffect(() => {
    convertDecimalToBinary(decimalInput, useTwosComplement, bitWidth)
  }, [decimalInput, useTwosComplement, bitWidth, convertDecimalToBinary])

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
    setDecimalInput("")
    setBinaryOutput("")
    setError(null)
  }, [])

  const divisionSteps = useMemo(() => {
    const num = parseInt(decimalInput.trim(), 10)
    if (isNaN(num) || num < 0) return []

    const steps: { dividend: number; quotient: number; remainder: number }[] = []
    let current = num

    while (current > 0) {
      steps.push({
        dividend: current,
        quotient: Math.floor(current / 2),
        remainder: current % 2,
      })
      current = Math.floor(current / 2)
    }

    return steps
  }, [decimalInput])

  const cleanBinary = binaryOutput.replace(/\s/g, "")
  const isValidConversion = cleanBinary.length > 0 && !error

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="decimal-input" className="text-base font-medium">
            Decimal Input
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(decimalInput, "input")}
              className="h-7"
              disabled={!decimalInput}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!decimalInput}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Input
          id="decimal-input"
          type="number"
          value={decimalInput}
          onChange={(e) => setDecimalInput(e.target.value)}
          className={cn(
            "font-mono text-base",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Enter decimal number (e.g., 42)..."
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <Info className="size-4" />
            {error}
          </p>
        )}

        {/* Options */}
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="twos-complement"
              checked={useTwosComplement}
              onCheckedChange={(checked) => setUseTwosComplement(checked as boolean)}
            />
            <Label htmlFor="twos-complement" className="text-sm font-normal cursor-pointer">
              Use Two's Complement (for negative numbers)
            </Label>
          </div>
        </div>

        {/* Bit Width Selector */}
        <div className="flex items-center gap-2">
          <Label htmlFor="bit-width" className="text-sm font-medium">
            Bit Width:
          </Label>
          <div className="flex gap-1">
            {[8, 16, 32].map((bits) => (
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

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="binary-output" className="text-base font-medium">
            Binary Output
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(cleanBinary, "output")}
            className="h-7"
            disabled={!cleanBinary}
          >
            {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="binary-output"
          value={binaryOutput}
          readOnly
          className="font-mono text-lg min-h-[80px] bg-muted/30 text-center"
          placeholder="Binary output will appear here..."
        />

        {isValidConversion && (
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span>Bits: <span className="font-medium text-foreground">{cleanBinary.length}</span></span>
            <span>Bytes: <span className="font-medium text-foreground">{Math.ceil(cleanBinary.length / 8)}</span></span>
          </div>
        )}
      </section>

      {/* Division Steps */}
      {divisionSteps.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Division-by-2 Method (Step-by-Step)</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <div className="grid grid-cols-4 gap-px bg-border border-b">
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Step</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Dividend</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">÷ 2</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Remainder</div>
            </div>
            <div className="divide-y">
              {divisionSteps.map((step, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-px bg-border">
                  <div className="bg-background px-3 py-2 text-xs font-mono text-muted-foreground">{idx + 1}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{step.dividend}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{step.quotient}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono font-medium text-primary">{step.remainder}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Read remainders from bottom to top: <span className="font-mono">{cleanBinary}</span>
          </p>
        </section>
      )}

      {/* Two's Complement Explanation */}
      {useTwosComplement && parseInt(decimalInput.trim() || "0", 10) < 0 && isValidConversion && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Two's Complement Calculation</h3>
          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm">
              For negative numbers, we use Two's Complement representation:
            </p>
            <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
              <li>Take the absolute value: {Math.abs(parseInt(decimalInput.trim(), 10))}</li>
              <li>Convert to binary: {Math.abs(parseInt(decimalInput.trim(), 10)).toString(2).padStart(bitWidth, "0")}</li>
              <li>Invert all bits (One's Complement)</li>
              <li>Add 1 to get Two's Complement: <span className="font-mono">{cleanBinary}</span></li>
            </ol>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">How Decimal to Binary Conversion Works</h4>
            <p className="text-sm text-muted-foreground">
              The division-by-2 method repeatedly divides the decimal number by 2 and records the remainders.
              Reading the remainders from bottom to top gives the binary representation.
              For negative numbers, Two's Complement is used in most computer systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

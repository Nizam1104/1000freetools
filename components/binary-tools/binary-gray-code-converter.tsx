"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, ArrowRightLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryGrayCodeConverter() {
  const [input, setInput] = useState<string>("")
  const [mode, setMode] = useState<"binary-to-gray" | "gray-to-binary">("binary-to-gray")
  const [output, setOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const validateBinary = (binary: string): boolean => {
    return /^[01\s]+$/.test(binary)
  }

  // Binary to Gray code: MSB stays same, each bit is XOR of current and previous binary bit
  const binaryToGray = useCallback((binary: string): string => {
    const bits = binary.split("")
    const gray: string[] = []
    
    for (let i = 0; i < bits.length; i++) {
      if (i === 0) {
        gray.push(bits[i]) // MSB stays the same
      } else {
        // XOR current bit with previous bit
        gray.push(bits[i] === bits[i - 1] ? "0" : "1")
      }
    }
    
    return gray.join("")
  }, [])

  // Gray to Binary: MSB stays same, each bit is XOR of current gray and previous binary result
  const grayToBinary = useCallback((gray: string): string => {
    const bits = gray.split("")
    const binary: string[] = []
    
    for (let i = 0; i < bits.length; i++) {
      if (i === 0) {
        binary.push(bits[i]) // MSB stays the same
      } else {
        // XOR current gray bit with previous binary result
        binary.push(bits[i] === binary[i - 1] ? "0" : "1")
      }
    }
    
    return binary.join("")
  }, [])

  const convert = useCallback((value: string, currentMode: typeof mode) => {
    const cleanValue = value.replace(/\s/g, "")
    
    if (!cleanValue) {
      setOutput("")
      setError(null)
      return
    }

    if (!validateBinary(value)) {
      setError("Invalid input. Only 0s and 1s are allowed.")
      setOutput("")
      return
    }

    try {
      const result = currentMode === "binary-to-gray" 
        ? binaryToGray(cleanValue)
        : grayToBinary(cleanValue)
      
      // Format with spaces every 4 bits
      const formatted = result.replace(/(.{4})/g, "$1 ").trim()
      setOutput(formatted)
      setError(null)
    } catch (err) {
      setError("Conversion error")
      setOutput("")
    }
  }, [binaryToGray, grayToBinary])

  React.useEffect(() => {
    convert(input, mode)
  }, [input, mode, convert])

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

  const cleanInput = input.replace(/\s/g, "")
  const cleanOutput = output.replace(/\s/g, "")

  // Generate comparison table
  const comparisonTable = useMemo(() => {
    const rows: { decimal: number; binary: string; gray: string }[] = []
    const bits = Math.min(Math.max(cleanInput.length, 4), 8)
    const max = Math.pow(2, Math.min(bits, 5)) // Limit to 32 rows for display

    for (let i = 0; i < max; i++) {
      const binary = i.toString(2).padStart(bits, "0")
      const gray = binaryToGray(binary)
      rows.push({ decimal: i, binary, gray })
    }

    return rows
  }, [cleanInput.length, binaryToGray])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selector */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Conversion Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "binary-to-gray" ? "default" : "outline"}
            onClick={() => setMode("binary-to-gray")}
            className="flex-1"
          >
            Binary to Gray Code
          </Button>
          <Button
            variant={mode === "gray-to-binary" ? "default" : "outline"}
            onClick={() => setMode("gray-to-binary")}
            className="flex-1"
          >
            Gray Code to Binary
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "binary-to-gray" ? "Binary Input" : "Gray Code Input"}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(cleanInput, "input")}
              className="h-7"
              disabled={!cleanInput}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!input}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/[^01\s]/g, ""))}
          className={cn(
            "font-mono text-base",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={mode === "binary-to-gray" ? "Enter binary number..." : "Enter Gray code..."}
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
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "binary-to-gray" ? "Gray Code Output" : "Binary Output"}
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(cleanOutput, "output")}
            className="h-7"
            disabled={!cleanOutput}
          >
            {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="output"
          value={output}
          readOnly
          className="font-mono text-lg min-h-[80px] bg-muted/30"
          placeholder="Output will appear here..."
        />
      </section>

      {/* Step by Step */}
      {cleanInput.length > 0 && !error && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Step-by-Step Conversion</h3>
          <div className="rounded-lg border bg-background p-4 space-y-3">
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted-foreground">Input:</span>
              <span>{cleanInput}</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="size-4 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              {mode === "binary-to-gray" ? (
                <>
                  <p className="text-xs text-muted-foreground">
                    Gray[i] = Binary[i] XOR Binary[i-1] (MSB stays same)
                  </p>
                  <div className="flex gap-1 font-mono text-xs">
                    {cleanInput.split("").map((bit, i) => (
                      <div key={i} className="text-center">
                        <div className={i === 0 ? "text-primary font-bold" : ""}>
                          {i === 0 ? bit : `${cleanInput[i]}⊕${cleanInput[i-1]}=${i === 0 ? bit : (parseInt(cleanInput[i]) ^ parseInt(cleanInput[i-1]))}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground">
                    Binary[i] = Gray[i] XOR Binary[i-1] (MSB stays same)
                  </p>
                  <div className="flex gap-1 font-mono text-xs">
                    {cleanInput.split("").map((bit, i) => (
                      <div key={i} className="text-center">
                        <div className={i === 0 ? "text-primary font-bold" : ""}>
                          {i === 0 ? bit : `${cleanInput[i]}⊕prev=${i === 0 ? bit : "calc"}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted-foreground">Output:</span>
              <span className="text-primary font-bold">{cleanOutput}</span>
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium">Binary to Gray Code Reference Table</h3>
        <div className="rounded-lg border bg-background overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-3 py-2 text-left font-medium">Decimal</th>
                <th className="px-3 py-2 text-left font-medium">Binary</th>
                <th className="px-3 py-2 text-left font-medium">Gray Code</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {comparisonTable.map((row) => (
                <tr key={row.decimal} className={cleanInput === row.binary || cleanOutput === row.gray ? "bg-primary/10" : ""}>
                  <td className="px-3 py-2 font-mono">{row.decimal}</td>
                  <td className="px-3 py-2 font-mono">{row.binary}</td>
                  <td className="px-3 py-2 font-mono">{row.gray}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Gray Code</h4>
            <p className="text-sm text-muted-foreground">
              Gray code (reflected binary code) is a binary numeral system where two consecutive values 
              differ in only one bit position. This property makes it useful in digital communications, 
              rotary encoders, and Karnaugh maps for minimizing errors during transitions.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Conversion:</strong> The MSB stays the same. Each subsequent bit is the XOR 
              of the current and previous bit in the original number.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

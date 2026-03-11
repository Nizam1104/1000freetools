"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HexadecimalToBinaryConverter() {
  const [hexInput, setHexInput] = useState<string>("")
  const [binaryOutput, setBinaryOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [padZeros, setPadZeros] = useState<boolean>(true)

  const validateHex = (hex: string): boolean => {
    return /^[0-9A-Fa-f\sx]+$/.test(hex)
  }

  const convertHexToBinary = useCallback((hex: string, pad: boolean) => {
    const cleanHex = hex.replace(/[\sx]/g, "").replace(/^0x/i, "")
    
    if (!cleanHex) {
      setBinaryOutput("")
      setError(null)
      return
    }

    if (!validateHex(hex)) {
      setError("Invalid hexadecimal. Use 0-9 and A-F only.")
      setBinaryOutput("")
      return
    }

    try {
      let binary = ""
      for (const char of cleanHex) {
        const decimal = parseInt(char, 16)
        if (isNaN(decimal)) {
          throw new Error("Invalid hex character")
        }
        binary += decimal.toString(2).padStart(4, "0")
      }

      // Remove leading zeros unless padding is enabled
      if (!pad) {
        binary = binary.replace(/^0+/, "") || "0"
      }

      // Format with spaces every 4 bits
      const formattedBinary = binary.replace(/(.{4})/g, "$1 ").trim()
      setBinaryOutput(formattedBinary)
      setError(null)
    } catch (err) {
      setError("Conversion error")
      setBinaryOutput("")
    }
  }, [])

  React.useEffect(() => {
    convertHexToBinary(hexInput, padZeros)
  }, [hexInput, padZeros, convertHexToBinary])

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
    setHexInput("")
    setBinaryOutput("")
    setError(null)
  }, [])

  const hexBreakdown = useMemo(() => {
    const cleanHex = hexInput.replace(/[\sx]/g, "").replace(/^0x/i, "")
    if (!cleanHex || !validateHex(hexInput)) return []

    return cleanHex.split("").map((char, idx) => {
      const decimal = parseInt(char, 16)
      const binary = decimal.toString(2).padStart(4, "0")
      return {
        hex: char,
        decimal,
        binary,
      }
    })
  }, [hexInput])

  const hexToBinaryMap = useMemo(() => {
    return [
      { hex: "0", binary: "0000", decimal: 0 },
      { hex: "1", binary: "0001", decimal: 1 },
      { hex: "2", binary: "0010", decimal: 2 },
      { hex: "3", binary: "0011", decimal: 3 },
      { hex: "4", binary: "0100", decimal: 4 },
      { hex: "5", binary: "0101", decimal: 5 },
      { hex: "6", binary: "0110", decimal: 6 },
      { hex: "7", binary: "0111", decimal: 7 },
      { hex: "8", binary: "1000", decimal: 8 },
      { hex: "9", binary: "1001", decimal: 9 },
      { hex: "A", binary: "1010", decimal: 10 },
      { hex: "B", binary: "1011", decimal: 11 },
      { hex: "C", binary: "1100", decimal: 12 },
      { hex: "D", binary: "1101", decimal: 13 },
      { hex: "E", binary: "1110", decimal: 14 },
      { hex: "F", binary: "1111", decimal: 15 },
    ]
  }, [])

  const cleanBinary = binaryOutput.replace(/\s/g, "")
  const isValidConversion = cleanBinary.length > 0 && !error

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="hex-input" className="text-base font-medium">
            Hexadecimal Input
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(hexInput, "input")}
              className="h-7"
              disabled={!hexInput}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!hexInput}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Input
          id="hex-input"
          value={hexInput}
          onChange={(e) => setHexInput(e.target.value)}
          className={cn(
            "font-mono text-base uppercase",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Enter hex number (e.g., DA or 0xDA)..."
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
            <Button
              variant={padZeros ? "default" : "outline"}
              size="xs"
              onClick={() => setPadZeros(true)}
              className="h-7"
            >
              Pad with zeros
            </Button>
            <Button
              variant={!padZeros ? "default" : "outline"}
              size="xs"
              onClick={() => setPadZeros(false)}
              className="h-7"
            >
              No padding
            </Button>
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
          className="font-mono text-lg min-h-[80px] bg-muted/30"
          placeholder="Binary output will appear here..."
        />

        {isValidConversion && (
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span>Hex digits: <span className="font-medium text-foreground">{hexBreakdown.length}</span></span>
            <span>Bits: <span className="font-medium text-foreground">{cleanBinary.length}</span></span>
            <span>Bytes: <span className="font-medium text-foreground">{Math.ceil(cleanBinary.length / 8)}</span></span>
          </div>
        )}
      </section>

      {/* Hex Breakdown */}
      {hexBreakdown.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Digit-by-Digit Conversion</h3>
          <div className="rounded-lg border bg-background p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {hexBreakdown.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-mono text-lg font-bold text-primary bg-primary/10 px-3 py-1 rounded mb-1">
                    {item.hex.toUpperCase()}
                  </div>
                  <div className="text-xs text-muted-foreground">↓</div>
                  <div className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {item.binary}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-1">Result:</p>
              <p className="font-mono text-lg">{binaryOutput}</p>
            </div>
          </div>
        </section>
      )}

      {/* Conversion Table */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium">Hexadecimal to Binary Reference Table</h3>
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="grid grid-cols-4 gap-px bg-border">
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Hex</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Binary</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Hex</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Binary</div>
          </div>
          <div className="divide-y">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-px bg-border">
                <div className="bg-background px-3 py-2 text-sm font-mono font-medium">{hexToBinaryMap[idx].hex}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{hexToBinaryMap[idx].binary}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono font-medium">{hexToBinaryMap[idx + 8].hex}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{hexToBinaryMap[idx + 8].binary}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">How Hexadecimal to Binary Conversion Works</h4>
            <p className="text-sm text-muted-foreground">
              Each hexadecimal digit (0-9, A-F) maps directly to a 4-bit binary number.
              Simply replace each hex digit with its 4-bit binary equivalent.
              For example: DA = D(1101) A(1010) = 11011010 in binary.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryToHexadecimalConverter() {
  const [binaryInput, setBinaryInput] = useState<string>("")
  const [hexOutput, setHexOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [uppercase, setUppercase] = useState<boolean>(true)
  const [showGrouping, setShowGrouping] = useState<boolean>(true)

  const validateBinary = (binary: string): boolean => {
    return /^[01\s]+$/.test(binary)
  }

  const convertBinaryToHex = useCallback((binary: string, upper: boolean) => {
    const cleanBinary = binary.replace(/\s/g, "")
    
    if (!cleanBinary) {
      setHexOutput("")
      setError(null)
      return
    }

    if (!validateBinary(binary)) {
      setError("Invalid binary number. Only 0s and 1s are allowed.")
      setHexOutput("")
      return
    }

    try {
      // Pad to multiple of 4 bits
      const paddedBinary = cleanBinary.padStart(
        Math.ceil(cleanBinary.length / 4) * 4,
        "0"
      )

      // Convert each nibble (4 bits) to hex
      let hex = ""
      for (let i = 0; i < paddedBinary.length; i += 4) {
        const nibble = paddedBinary.slice(i, i + 4)
        const decimal = parseInt(nibble, 2)
        hex += decimal.toString(16)
      }

      const result = upper ? hex.toUpperCase() : hex.toLowerCase()
      setHexOutput("0x" + result)
      setError(null)
    } catch (err) {
      setError("Conversion error")
      setHexOutput("")
    }
  }, [])

  React.useEffect(() => {
    convertBinaryToHex(binaryInput, uppercase)
  }, [binaryInput, uppercase, convertBinaryToHex])

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
    setHexOutput("")
    setError(null)
  }, [])

  const nibbleBreakdown = useMemo(() => {
    const cleanBinary = binaryInput.replace(/\s/g, "")
    if (!cleanBinary || !validateBinary(binaryInput)) return []

    const paddedBinary = cleanBinary.padStart(
      Math.ceil(cleanBinary.length / 4) * 4,
      "0"
    )

    const nibbles: { binary: string; decimal: number; hex: string }[] = []
    
    for (let i = 0; i < paddedBinary.length; i += 4) {
      const nibble = paddedBinary.slice(i, i + 4)
      const decimal = parseInt(nibble, 2)
      const hex = uppercase ? decimal.toString(16).toUpperCase() : decimal.toString(16).toLowerCase()
      nibbles.push({ binary: nibble, decimal, hex })
    }

    return nibbles
  }, [binaryInput, uppercase])

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
      { hex: uppercase ? "A" : "a", binary: "1010", decimal: 10 },
      { hex: uppercase ? "B" : "b", binary: "1011", decimal: 11 },
      { hex: uppercase ? "C" : "c", binary: "1100", decimal: 12 },
      { hex: uppercase ? "D" : "d", binary: "1101", decimal: 13 },
      { hex: uppercase ? "E" : "e", binary: "1110", decimal: 14 },
      { hex: uppercase ? "F" : "f", binary: "1111", decimal: 15 },
    ]
  }, [uppercase])

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
          placeholder="Enter binary number (e.g., 11011010)..."
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
              variant={uppercase ? "default" : "outline"}
              size="xs"
              onClick={() => setUppercase(true)}
              className="h-7"
            >
              Uppercase (A-F)
            </Button>
            <Button
              variant={!uppercase ? "default" : "outline"}
              size="xs"
              onClick={() => setUppercase(false)}
              className="h-7"
            >
              Lowercase (a-f)
            </Button>
          </div>
        </div>
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="hex-output" className="text-base font-medium">
            Hexadecimal Output
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(hexOutput, "output")}
            className="h-7"
            disabled={!hexOutput}
          >
            {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="hex-output"
          value={hexOutput}
          readOnly
          className="font-mono text-2xl min-h-[80px] bg-muted/30 text-center"
          placeholder="Hexadecimal output will appear here..."
        />
      </section>

      {/* Nibble Grouping */}
      {nibbleBreakdown.length > 0 && showGrouping && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Nibble Grouping (4 bits each)</h3>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {nibbleBreakdown.map((nibble, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-mono text-sm bg-muted px-2 py-1 rounded mb-1">
                    {nibble.binary}
                  </div>
                  <div className="text-xs text-muted-foreground">↓</div>
                  <div className="font-mono text-lg font-bold text-primary bg-primary/10 px-3 py-1 rounded">
                    {nibble.hex}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-1">Result:</p>
              <p className="font-mono text-xl font-bold">{hexOutput}</p>
            </div>
          </div>
        </section>
      )}

      {/* Conversion Table */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium">Binary to Hex Reference Table</h3>
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="grid grid-cols-4 gap-px bg-border">
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Hex</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Binary</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Hex</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Binary</div>
          </div>
          <div className="divide-y">
            {Array.from({ length: 8 }).map((_, row) => (
              <div key={row} className="grid grid-cols-4 gap-px bg-border">
                <div className="bg-background px-3 py-2 text-sm font-mono font-medium">{hexToBinaryMap[row].hex}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{hexToBinaryMap[row].binary}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono font-medium">{hexToBinaryMap[row + 8].hex}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{hexToBinaryMap[row + 8].binary}</div>
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
            <h4 className="text-sm font-medium">How Binary to Hexadecimal Conversion Works</h4>
            <p className="text-sm text-muted-foreground">
              Group binary digits into sets of 4 (called nibbles), starting from the right.
              Each nibble directly maps to one hexadecimal digit (0-9, A-F).
              For example: 1101 1010 = D A = DA in hexadecimal.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

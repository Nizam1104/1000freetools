"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryToOctalConverter() {
  const [binaryInput, setBinaryInput] = useState<string>("")
  const [octalOutput, setOctalOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const validateBinary = (binary: string): boolean => {
    return /^[01\s]+$/.test(binary)
  }

  const convertBinaryToOctal = useCallback((binary: string) => {
    const cleanBinary = binary.replace(/\s/g, "")
    
    if (!cleanBinary) {
      setOctalOutput("")
      setError(null)
      return
    }

    if (!validateBinary(binary)) {
      setError("Invalid binary number. Only 0s and 1s are allowed.")
      setOctalOutput("")
      return
    }

    try {
      // Pad to multiple of 3 bits
      const paddedBinary = cleanBinary.padStart(
        Math.ceil(cleanBinary.length / 3) * 3,
        "0"
      )

      // Convert each group of 3 bits to octal
      let octal = ""
      for (let i = 0; i < paddedBinary.length; i += 3) {
        const group = paddedBinary.slice(i, i + 3)
        const decimal = parseInt(group, 2)
        octal += decimal.toString()
      }

      setOctalOutput(octal)
      setError(null)
    } catch (err) {
      setError("Conversion error")
      setOctalOutput("")
    }
  }, [])

  React.useEffect(() => {
    convertBinaryToOctal(binaryInput)
  }, [binaryInput, convertBinaryToOctal])

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
    setOctalOutput("")
    setError(null)
  }, [])

  const groupBreakdown = useMemo(() => {
    const cleanBinary = binaryInput.replace(/\s/g, "")
    if (!cleanBinary || !validateBinary(binaryInput)) return []

    const paddedBinary = cleanBinary.padStart(
      Math.ceil(cleanBinary.length / 3) * 3,
      "0"
    )

    const groups: { binary: string; decimal: number; octal: string }[] = []
    
    for (let i = 0; i < paddedBinary.length; i += 3) {
      const group = paddedBinary.slice(i, i + 3)
      const decimal = parseInt(group, 2)
      groups.push({ binary: group, decimal, octal: decimal.toString() })
    }

    return groups
  }, [binaryInput])

  const octalToBinaryMap = useMemo(() => {
    return [
      { octal: "0", binary: "000", decimal: 0 },
      { octal: "1", binary: "001", decimal: 1 },
      { octal: "2", binary: "010", decimal: 2 },
      { octal: "3", binary: "011", decimal: 3 },
      { octal: "4", binary: "100", decimal: 4 },
      { octal: "5", binary: "101", decimal: 5 },
      { octal: "6", binary: "110", decimal: 6 },
      { octal: "7", binary: "111", decimal: 7 },
    ]
  }, [])

  const cleanBinary = binaryInput.replace(/\s/g, "")
  const isValidConversion = cleanBinary.length > 0 && !error

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
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Enter binary number (e.g., 101110)..."
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
          <Label htmlFor="octal-output" className="text-base font-medium">
            Octal Output
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(octalOutput, "output")}
            className="h-7"
            disabled={!octalOutput}
          >
            {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="octal-output"
          value={octalOutput}
          readOnly
          className="font-mono text-2xl min-h-[80px] bg-muted/30 text-center"
          placeholder="Octal output will appear here..."
        />

        {isValidConversion && (
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span>Binary bits: <span className="font-medium text-foreground">{cleanBinary.length}</span></span>
            <span>Octal digits: <span className="font-medium text-foreground">{octalOutput.length}</span></span>
          </div>
        )}
      </section>

      {/* Group Breakdown */}
      {groupBreakdown.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Triplet Grouping (3 bits each)</h3>
          <div className="rounded-lg border bg-background p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {groupBreakdown.map((group, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-mono text-sm bg-muted px-2 py-1 rounded mb-1">
                    {group.binary}
                  </div>
                  <div className="text-xs text-muted-foreground">↓</div>
                  <div className="font-mono text-lg font-bold text-primary bg-primary/10 px-3 py-1 rounded">
                    {group.octal}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-1">Result:</p>
              <p className="font-mono text-xl font-bold">{octalOutput}</p>
            </div>
          </div>
        </section>
      )}

      {/* Conversion Table */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium">Binary to Octal Reference Table</h3>
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="grid grid-cols-4 gap-px bg-border">
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Octal</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Binary</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Octal</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Binary</div>
          </div>
          <div className="divide-y">
            {Array.from({ length: 4 }).map((_, row) => (
              <div key={row} className="grid grid-cols-4 gap-px bg-border">
                <div className="bg-background px-3 py-2 text-sm font-mono font-medium">{octalToBinaryMap[row].octal}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{octalToBinaryMap[row].binary}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono font-medium">{octalToBinaryMap[row + 4].octal}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{octalToBinaryMap[row + 4].binary}</div>
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
            <h4 className="text-sm font-medium">How Binary to Octal Conversion Works</h4>
            <p className="text-sm text-muted-foreground">
              Group binary digits into sets of 3 (triplets), starting from the right.
              Each triplet directly maps to one octal digit (0-7).
              For example: 101 110 = 5 6 = 56 in octal.
            </p>
            <p className="text-sm text-muted-foreground">
              Octal is commonly used in Unix file permissions (e.g., 755, 644).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

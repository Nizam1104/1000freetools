"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function OctalToBinaryConverter() {
  const [octalInput, setOctalInput] = useState<string>("")
  const [binaryOutput, setBinaryOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [padZeros, setPadZeros] = useState<boolean>(true)

  const validateOctal = (octal: string): boolean => {
    return /^[0-7\s]+$/.test(octal)
  }

  const convertOctalToBinary = useCallback((octal: string, pad: boolean) => {
    const cleanOctal = octal.replace(/\s/g, "")
    
    if (!cleanOctal) {
      setBinaryOutput("")
      setError(null)
      return
    }

    if (!validateOctal(octal)) {
      setError("Invalid octal number. Use digits 0-7 only.")
      setBinaryOutput("")
      return
    }

    try {
      let binary = ""
      for (const char of cleanOctal) {
        const decimal = parseInt(char, 8)
        if (isNaN(decimal)) {
          throw new Error("Invalid octal digit")
        }
        binary += decimal.toString(2).padStart(3, "0")
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
    convertOctalToBinary(octalInput, padZeros)
  }, [octalInput, padZeros, convertOctalToBinary])

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
    setOctalInput("")
    setBinaryOutput("")
    setError(null)
  }, [])

  const octalBreakdown = useMemo(() => {
    const cleanOctal = octalInput.replace(/\s/g, "")
    if (!cleanOctal || !validateOctal(octalInput)) return []

    return cleanOctal.split("").map((char, idx) => {
      const decimal = parseInt(char, 8)
      const binary = decimal.toString(2).padStart(3, "0")
      return {
        octal: char,
        decimal,
        binary,
      }
    })
  }, [octalInput])

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

  const cleanBinary = binaryOutput.replace(/\s/g, "")
  const isValidConversion = cleanBinary.length > 0 && !error

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="octal-input" className="text-base font-medium">
            Octal Input
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(octalInput, "input")}
              className="h-7"
              disabled={!octalInput}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!octalInput}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Input
          id="octal-input"
          value={octalInput}
          onChange={(e) => setOctalInput(e.target.value.replace(/[^0-7\s]/g, ""))}
          className={cn(
            "font-mono text-base",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Enter octal number (e.g., 755)..."
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
            <span>Octal digits: <span className="font-medium text-foreground">{octalBreakdown.length}</span></span>
            <span>Bits: <span className="font-medium text-foreground">{cleanBinary.length}</span></span>
            <span>Bytes: <span className="font-medium text-foreground">{Math.ceil(cleanBinary.length / 8)}</span></span>
          </div>
        )}
      </section>

      {/* Octal Breakdown */}
      {octalBreakdown.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Digit-by-Digit Conversion</h3>
          <div className="rounded-lg border bg-background p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {octalBreakdown.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-mono text-lg font-bold text-primary bg-primary/10 px-3 py-1 rounded mb-1">
                    {item.octal}
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
        <h3 className="text-sm font-medium">Octal to Binary Reference Table</h3>
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="grid grid-cols-4 gap-px bg-border">
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Octal</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Binary</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Octal</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Binary</div>
          </div>
          <div className="divide-y">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-px bg-border">
                <div className="bg-background px-3 py-2 text-sm font-mono font-medium">{octalToBinaryMap[idx].octal}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{octalToBinaryMap[idx].binary}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono font-medium">{octalToBinaryMap[idx + 4].octal}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{octalToBinaryMap[idx + 4].binary}</div>
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
            <h4 className="text-sm font-medium">How Octal to Binary Conversion Works</h4>
            <p className="text-sm text-muted-foreground">
              Each octal digit (0-7) maps directly to a 3-bit binary number.
              Simply replace each octal digit with its 3-bit binary equivalent.
              For example: 755 = 7(111) 5(101) 5(101) = 111101101 in binary.
            </p>
            <p className="text-sm text-muted-foreground">
              Octal is commonly used for Unix file permissions where each digit represents
              read (4), write (2), and execute (1) permissions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryBitFlipperManipulator() {
  const [binaryInput, setBinaryInput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [shiftAmount, setShiftAmount] = useState<number>(1)
  const [operation, setOperation] = useState<"flip" | "set" | "clear" | "shift-left" | "shift-right" | "rotate-left" | "rotate-right">("flip")

  const validateBinary = (binary: string): boolean => {
    return /^[01\s]+$/.test(binary)
  }

  const cleanBinary = useMemo(() => {
    return binaryInput.replace(/\s/g, "")
  }, [binaryInput])

  const bits = useMemo(() => {
    return cleanBinary.split("").map((bit, idx) => ({
      value: bit,
      position: cleanBinary.length - 1 - idx,
      index: idx,
    }))
  }, [cleanBinary])

  const handleBitClick = useCallback((index: number) => {
    if (operation !== "flip") return
    
    const bits = cleanBinary.split("")
    bits[index] = bits[index] === "0" ? "1" : "0"
    setBinaryInput(bits.join(""))
  }, [cleanBinary, operation])

  const performOperation = useCallback(() => {
    if (!cleanBinary || !validateBinary(binaryInput)) return

    const bits = cleanBinary.split("")
    let result: string

    switch (operation) {
      case "shift-left":
        result = bits.slice(shiftAmount).join("") + "0".repeat(shiftAmount)
        break
      case "shift-right":
        result = "0".repeat(shiftAmount) + bits.slice(0, -shiftAmount).join("")
        break
      case "rotate-left":
        const leftRotate = bits.slice(shiftAmount).concat(bits.slice(0, shiftAmount))
        result = leftRotate.join("")
        break
      case "rotate-right":
        const rightRotate = bits.slice(-shiftAmount).concat(bits.slice(0, -shiftAmount))
        result = rightRotate.join("")
        break
      default:
        result = cleanBinary
    }

    // Format with spaces every 4 bits
    const formatted = result.replace(/(.{4})/g, "$1 ").trim()
    setBinaryInput(formatted)
  }, [cleanBinary, binaryInput, operation, shiftAmount])

  const setAllBits = useCallback((value: "0" | "1") => {
    const length = cleanBinary.length
    if (length === 0) return
    setBinaryInput(value.repeat(length).replace(/(.{4})/g, "$1 ").trim())
  }, [cleanBinary.length])

  const invertAllBits = useCallback(() => {
    const inverted = cleanBinary.split("").map(b => b === "0" ? "1" : "0").join("")
    setBinaryInput(inverted.replace(/(.{4})/g, "$1 ").trim())
  }, [cleanBinary])

  React.useEffect(() => {
    if (["shift-left", "shift-right", "rotate-left", "rotate-right"].includes(operation)) {
      performOperation()
    }
  }, [shiftAmount, operation, performOperation])

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
    setError(null)
  }, [])

  const decimalValue = useMemo(() => {
    if (!cleanBinary) return 0
    try {
      return parseInt(cleanBinary, 2)
    } catch {
      return 0
    }
  }, [cleanBinary])

  const isValidInput = validateBinary(binaryInput) && cleanBinary.length > 0

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
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

        <Textarea
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

        {/* Quick Actions */}
        {isValidInput && (
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="xs" onClick={() => setAllBits("0")}>
              Set All to 0
            </Button>
            <Button variant="outline" size="xs" onClick={() => setAllBits("1")}>
              Set All to 1
            </Button>
            <Button variant="outline" size="xs" onClick={invertAllBits}>
              Invert All
            </Button>
          </div>
        )}
      </section>

      {/* Bit Visualization */}
      {isValidInput && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">
            {operation === "flip" ? "Click bits to flip them" : "Bit Visualization"}
          </h3>
          <div className="rounded-lg border bg-background p-4 overflow-x-auto">
            <div className="flex gap-1 justify-center min-w-max">
              {bits.map((bit, idx) => (
                <button
                  key={idx}
                  onClick={() => handleBitClick(idx)}
                  className={cn(
                    "w-10 h-12 rounded font-mono text-lg font-bold transition-colors",
                    operation === "flip" && "cursor-pointer hover:ring-2 hover:ring-primary",
                    bit.value === "1"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                  disabled={operation !== "flip"}
                >
                  {bit.value}
                </button>
              ))}
            </div>
            <div className="flex gap-1 justify-center min-w-max mt-2">
              {bits.map((bit, idx) => (
                <div key={idx} className="w-10 text-center text-xs text-muted-foreground">
                  {bit.position}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Operation Controls */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Operations</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            variant={operation === "flip" ? "default" : "outline"}
            onClick={() => setOperation("flip")}
            className="h-10"
          >
            Flip Bit
          </Button>
          <Button
            variant={operation === "shift-left" ? "default" : "outline"}
            onClick={() => setOperation("shift-left")}
            className="h-10"
          >
            Shift Left
          </Button>
          <Button
            variant={operation === "shift-right" ? "default" : "outline"}
            onClick={() => setOperation("shift-right")}
            className="h-10"
          >
            Shift Right
          </Button>
          <Button
            variant={operation === "rotate-left" ? "default" : "outline"}
            onClick={() => setOperation("rotate-left")}
            className="h-10"
          >
            Rotate Left
          </Button>
          <Button
            variant={operation === "rotate-right" ? "default" : "outline"}
            onClick={() => setOperation("rotate-right")}
            className="h-10"
          >
            Rotate Right
          </Button>
        </div>

        {/* Shift Amount */}
        {["shift-left", "shift-right", "rotate-left", "rotate-right"].includes(operation) && (
          <div className="flex items-center gap-4">
            <Label htmlFor="shift-amount" className="text-sm">Shift Amount:</Label>
            <Input
              id="shift-amount"
              type="number"
              min="1"
              max={cleanBinary.length || 32}
              value={shiftAmount}
              onChange={(e) => setShiftAmount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 font-mono"
            />
          </div>
        )}
      </section>

      {/* Value Display */}
      {isValidInput && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Current Value</h3>
          <div className="rounded-lg border bg-muted/30 p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Binary</p>
              <p className="font-mono text-sm">{cleanBinary}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Decimal</p>
              <p className="font-mono text-sm">{decimalValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hexadecimal</p>
              <p className="font-mono text-sm">0x{decimalValue.toString(16).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Octal</p>
              <p className="font-mono text-sm">{decimalValue.toString(8)}</p>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Bit Operations Explained</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Flip:</strong> Click individual bits to toggle between 0 and 1</p>
              <p><strong>Shift Left:</strong> Move all bits left, fill right with zeros (multiply by 2)</p>
              <p><strong>Shift Right:</strong> Move all bits right, fill left with zeros (divide by 2)</p>
              <p><strong>Rotate:</strong> Circular shift - bits that fall off one end wrap to the other</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

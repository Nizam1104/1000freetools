"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GrayCodeEncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"binary-to-gray" | "gray-to-binary" | "decimal-to-gray">("binary-to-gray")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [bits, setBits] = useState<number>(8)

  const binaryToGray = useCallback((binary: string): string => {
    const num = parseInt(binary, 2)
    if (isNaN(num)) throw new Error("Invalid binary number")
    const gray = num ^ (num >> 1)
    return gray.toString(2).padStart(bits, "0")
  }, [bits])

  const grayToBinary = useCallback((gray: string): string => {
    let num = parseInt(gray, 2)
    if (isNaN(num)) throw new Error("Invalid Gray code")
    let mask = num
    while (mask !== 0) {
      mask >>= 1
      num ^= mask
    }
    return num.toString(2).padStart(bits, "0")
  }, [bits])

  const decimalToGray = useCallback((decimal: string): string => {
    const num = parseInt(decimal, 10)
    if (isNaN(num)) throw new Error("Invalid decimal number")
    const gray = num ^ (num >> 1)
    return gray.toString(2).padStart(bits, "0")
  }, [bits])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "binary-to-gray") {
        setOutput(binaryToGray(value.replace(/\s+/g, "")))
      } else if (mode === "gray-to-binary") {
        setOutput(grayToBinary(value.replace(/\s+/g, "")))
      } else {
        setOutput(decimalToGray(value.replace(/[^0-9]/g, "")))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, bits, binaryToGray, grayToBinary, decimalToGray])

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode)
    setError(null)
    if (newMode === "binary-to-gray") {
      setOutput(binaryToGray(input.replace(/\s+/g, "")))
    } else if (newMode === "gray-to-binary") {
      setOutput(grayToBinary(input.replace(/\s+/g, "")))
    } else {
      setOutput(decimalToGray(input.replace(/[^0-9]/g, "")))
    }
  }, [input, bits, binaryToGray, grayToBinary, decimalToGray])

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
        <h2 className="text-2xl font-semibold tracking-tight">Gray Code Encoder/Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Convert between binary/decimal and Gray code (reflected binary code)
        </p>
      </div>

      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Conversion Type</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={mode === "binary-to-gray" ? "default" : "outline"}
            onClick={() => handleModeChange("binary-to-gray")}
          >
            Binary to Gray
          </Button>
          <Button
            variant={mode === "gray-to-binary" ? "default" : "outline"}
            onClick={() => handleModeChange("gray-to-binary")}
          >
            Gray to Binary
          </Button>
          <Button
            variant={mode === "decimal-to-gray" ? "default" : "outline"}
            onClick={() => handleModeChange("decimal-to-gray")}
          >
            Decimal to Gray
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Label className="text-sm">Bit Width:</Label>
          <div className="flex gap-2">
            {[4, 8, 16, 32].map(b => (
              <Button
                key={b}
                variant={bits === b ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setBits(b)
                  handleInputChange(input)
                }}
              >
                {b}-bit
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "binary-to-gray" ? "Binary Number" : mode === "gray-to-binary" ? "Gray Code" : "Decimal Number"}
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
            mode === "binary-to-gray" ? "Enter binary (e.g., 10110011)..." :
            mode === "gray-to-binary" ? "Enter Gray code (e.g., 11101010)..." :
            "Enter decimal number (e.g., 179)..."
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
            {mode === "binary-to-gray" ? "Gray Code Result" : mode === "gray-to-binary" ? "Binary Result" : "Gray Code Result"}
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
            <span>Decimal: <span className="font-medium text-foreground">{parseInt(output, 2)}</span></span>
            <span>Bits: <span className="font-medium text-foreground">{output.length}</span></span>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Gray Code</h4>
            <p className="text-sm text-muted-foreground">
              Gray code (also known as reflected binary code) is a binary numeral system where two
              successive values differ in only one bit. This property makes it useful for error
              correction, digital communications, and rotary encoders.
            </p>
            <p className="text-sm text-muted-foreground">
              Named after Frank Gray, this code minimizes errors in digital systems by ensuring
              only one bit changes at a time during transitions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryToTextConverter() {
  const [binaryInput, setBinaryInput] = useState<string>("")
  const [textOutput, setTextOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [separator, setSeparator] = useState<"space" | "none">("space")

  const convertBinaryToText = useCallback((binary: string) => {
    if (!binary.trim()) {
      setTextOutput("")
      setError(null)
      return
    }

    try {
      // Remove spaces if separator is none, or keep them for parsing
      const cleanBinary = separator === "none" 
        ? binary.replace(/[^01]/g, "")
        : binary.trim()

      // Split by spaces or process as continuous stream
      const binaryStrings = separator === "space"
        ? cleanBinary.split(/\s+/).filter(b => b.length > 0)
        : cleanBinary.match(/.{1,8}/g) || []

      // Validate binary input
      for (const bin of binaryStrings) {
        if (!/^[01]+$/.test(bin)) {
          throw new Error(`Invalid binary sequence: "${bin}". Only 0s and 1s are allowed.`)
        }
      }

      // Convert each binary byte to character
      const text = binaryStrings.map(bin => {
        // Pad to 8 bits if necessary
        const paddedBin = bin.padStart(8, "0")
        const charCode = parseInt(paddedBin, 2)
        return String.fromCharCode(charCode)
      }).join("")

      setTextOutput(text)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid binary input")
      setTextOutput("")
    }
  }, [separator])

  React.useEffect(() => {
    convertBinaryToText(binaryInput)
  }, [binaryInput, convertBinaryToText])

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
    setTextOutput("")
    setError(null)
  }, [])

  const characterBreakdown = React.useMemo(() => {
    if (!binaryInput.trim() || error) return []

    const cleanBinary = separator === "space"
      ? binaryInput.trim().split(/\s+/).filter(b => b.length > 0)
      : binaryInput.replace(/[^01]/g, "").match(/.{1,8}/g) || []

    return cleanBinary.map((bin, idx) => {
      const paddedBin = bin.padStart(8, "0")
      const charCode = parseInt(paddedBin, 2)
      const char = String.fromCharCode(charCode)
      return {
        binary: bin,
        padded: paddedBin,
        decimal: charCode,
        character: char,
        hex: charCode.toString(16).toUpperCase().padStart(2, "0"),
      }
    })
  }, [binaryInput, separator, error])

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

        <Textarea
          id="binary-input"
          value={binaryInput}
          onChange={(e) => setBinaryInput(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[150px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Enter binary code (e.g., 01001000 01100101 01101100 01101100 01101111)..."
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <Info className="size-4" />
            {error}
          </p>
        )}

        {/* Separator Option */}
        <div className="pt-2">
          <Label className="text-sm font-medium">Binary Format</Label>
          <RadioGroup
            value={separator}
            onValueChange={(v) => setSeparator(v as "space" | "none")}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="space" id="space-separator" />
              <Label htmlFor="space-separator" className="text-sm font-normal cursor-pointer">
                Space-separated bytes
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="none" id="no-separator" />
              <Label htmlFor="no-separator" className="text-sm font-normal cursor-pointer">
                Continuous stream
              </Label>
            </div>
          </RadioGroup>
        </div>
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-output" className="text-base font-medium">
            Text Output
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(textOutput, "output")}
            className="h-7"
            disabled={!textOutput}
          >
            {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="text-output"
          value={textOutput}
          readOnly
          className="font-mono text-sm min-h-[100px] bg-muted/30"
          placeholder="Converted text will appear here..."
        />
      </section>

      {/* Character Breakdown */}
      {characterBreakdown.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Character Breakdown</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <div className="grid grid-cols-5 gap-px bg-border border-b">
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">#</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Binary</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Decimal</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Hex</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Char</div>
            </div>
            <div className="divide-y">
              {characterBreakdown.map((item, idx) => (
                <div key={idx} className="grid grid-cols-5 gap-px bg-border">
                  <div className="bg-background px-3 py-2 text-xs font-mono text-muted-foreground">{idx + 1}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{item.binary}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{item.decimal}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{item.hex}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{item.character === " " ? "(space)" : item.character}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">How it works</h4>
            <p className="text-sm text-muted-foreground">
              Each group of 8 binary digits (bits) represents one character in ASCII/UTF-8 encoding.
              For example, <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">01001000</code> equals 72 in decimal, which is the letter "H".
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

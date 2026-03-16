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

export default function TextToBinaryConverter() {
  const [textInput, setTextInput] = useState<string>("")
  const [binaryOutput, setBinaryOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [addSpaces, setAddSpaces] = useState<boolean>(true)
  const [showDecimal, setShowDecimal] = useState<boolean>(false)

  const convertTextToBinary = useCallback((text: string, spaces: boolean) => {
    if (!text) {
      setBinaryOutput("")
      return
    }

    const binary = text
      .split("")
      .map(char => {
        const charCode = char.charCodeAt(0)
        return charCode.toString(2).padStart(8, "0")
      })
      .join(spaces ? " " : "")

    setBinaryOutput(binary)
  }, [])

  React.useEffect(() => {
    convertTextToBinary(textInput, addSpaces)
  }, [textInput, addSpaces, convertTextToBinary])

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
    setTextInput("")
    setBinaryOutput("")
  }, [])

  const characterBreakdown = useMemo(() => {
    if (!textInput) return []

    return textInput.split("").map((char, idx) => {
      const charCode = char.charCodeAt(0)
      const binary = charCode.toString(2).padStart(8, "0")
      const isPrintable = charCode >= 32 && charCode <= 126
      return {
        char,
        display: isPrintable ? char : `(code ${charCode})`,
        binary,
        decimal: charCode,
        hex: charCode.toString(16).toUpperCase().padStart(2, "0"),
      }
    })
  }, [textInput])

  const stats = useMemo(() => {
    const charCount = textInput.length
    const bitCount = charCount * 8
    const byteCount = charCount
    return { charCount, bitCount, byteCount }
  }, [textInput])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-input" className="text-base font-medium">
            Text Input
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(textInput, "input")}
              className="h-7"
              disabled={!textInput}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!textInput}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="text-input"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter text to convert to binary (e.g., Hello)..."
        />

        {/* Options */}
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="add-spaces"
              checked={addSpaces}
              onCheckedChange={(checked) => setAddSpaces(checked as boolean)}
            />
            <Label htmlFor="add-spaces" className="text-sm font-normal cursor-pointer">
              Add spaces between bytes
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="show-decimal"
              checked={showDecimal}
              onCheckedChange={(checked) => setShowDecimal(checked as boolean)}
            />
            <Label htmlFor="show-decimal" className="text-sm font-normal cursor-pointer">
              Show decimal values
            </Label>
          </div>
        </div>
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="binary-output" className="text-base font-medium">
            Binary Output
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(binaryOutput, "output")}
              className="h-7"
              disabled={!binaryOutput}
            >
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="binary-output"
          value={binaryOutput}
          readOnly
          className={cn(
            "font-mono text-sm min-h-[100px] bg-muted/30",
            showDecimal && "min-h-[150px]"
          )}
          placeholder="Binary output will appear here..."
        />

        {showDecimal && binaryOutput && (
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-sm text-muted-foreground mb-2">Decimal Values:</p>
            <p className="font-mono text-sm">
              {textInput.split("").map((char) => char.charCodeAt(0)).join(" ")}
            </p>
          </div>
        )}

        {/* Stats */}
        {textInput && (
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Characters: <span className="font-medium text-foreground">{stats.charCount}</span></span>
            <span>Bits: <span className="font-medium text-foreground">{stats.bitCount}</span></span>
            <span>Bytes: <span className="font-medium text-foreground">{stats.byteCount}</span></span>
          </div>
        )}
      </section>

      {/* Character Breakdown */}
      {characterBreakdown.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Character Breakdown</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <div className="grid grid-cols-5 gap-px bg-border border-b">
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">#</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Char</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Binary</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Decimal</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Hex</div>
            </div>
            <div className="divide-y">
              {characterBreakdown.map((item, idx) => (
                <div key={idx} className="grid grid-cols-5 gap-px bg-border">
                  <div className="bg-background px-3 py-2 text-xs font-mono text-muted-foreground">{idx + 1}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{item.display}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{item.binary}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{item.decimal}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{item.hex}</div>
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
              Each character is converted to its ASCII/UTF-8 code point, then to an 8-bit binary number.
              For example, "H" has a decimal value of 72, which is <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">01001000</code> in binary.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

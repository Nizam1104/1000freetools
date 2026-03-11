"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// CRC32 implementation in pure JavaScript
function crc32(data: string): number {
  const table: number[] = []
  
  // Generate CRC32 lookup table
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1)
    }
    table[i] = c >>> 0
  }

  let crc = 0xffffffff
  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data.charCodeAt(i)) & 0xff] ^ (crc >>> 8)
  }

  return (crc ^ 0xffffffff) >>> 0
}

export default function Crc32HashCalculator() {
  const [input, setInput] = useState<string>("")
  const [crcHex, setCrcHex] = useState<string>("")
  const [crcDecimal, setCrcDecimal] = useState<string>("")
  const [format, setFormat] = useState<"hex" | "decimal" | "both">("both")
  const [copied, setCopied] = useState<string | null>(null)

  const calculateCrc32 = useCallback((text: string) => {
    if (!text) {
      setCrcHex("")
      setCrcDecimal("")
      return
    }

    try {
      const crc = crc32(text)
      setCrcHex(crc.toString(16).padStart(8, "0").toUpperCase())
      setCrcDecimal(crc.toString())
    } catch (err) {
      setCrcHex("")
      setCrcDecimal("")
    }
  }, [])

  React.useEffect(() => {
    calculateCrc32(input)
  }, [input, calculateCrc32])

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
    setCrcHex("")
    setCrcDecimal("")
  }, [])

  const displayValue = format === "hex" ? crcHex : format === "decimal" ? crcDecimal : `${crcHex} (hex) / ${crcDecimal} (decimal)`

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            Input Text
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
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter text to calculate CRC32 checksum..."
        />
      </section>

      {/* Format Selector */}
      <section className="space-y-3">
        <Label>Output Format</Label>
        <div className="flex gap-2">
          {[
            { value: "hex", label: "Hexadecimal" },
            { value: "decimal", label: "Decimal" },
            { value: "both", label: "Both" },
          ].map((f) => (
            <Button
              key={f.value}
              variant={format === f.value ? "default" : "outline"}
              size="xs"
              onClick={() => setFormat(f.value as typeof format)}
              className="h-7"
            >
              {f.label}
            </Button>
          ))}
        </div>
      </section>

      {/* CRC32 Output */}
      {(crcHex || crcDecimal) && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">CRC32 Checksum</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(displayValue, "crc")}
              className="h-7"
            >
              {copied === "crc" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-6">
            <p className="font-mono text-2xl text-center break-all">{displayValue}</p>
          </div>

          {format !== "decimal" && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Hex: <span className="font-medium text-foreground">{crcHex}</span></span>
              <span>Bits: <span className="font-medium text-foreground">32</span></span>
            </div>
          )}
          {format !== "hex" && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Decimal: <span className="font-medium text-foreground">{crcDecimal}</span></span>
              <span>Range: <span className="font-medium text-foreground">0 to 4,294,967,295</span></span>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About CRC32</h4>
            <p className="text-sm text-muted-foreground">
              CRC32 (Cyclic Redundancy Check 32-bit) is an error-detecting function that produces 
              a 32-bit checksum. It's commonly used to detect accidental changes to raw data in 
              networks and storage systems.
            </p>
            <p className="text-sm text-muted-foreground">
              Unlike cryptographic hashes (MD5, SHA), CRC32 is NOT secure against intentional 
              modifications. It's designed for error detection, not security. Common uses include 
              ZIP files, PNG images, and Ethernet frames.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface AsciiEntry {
  dec: number
  hex: string
  oct: string
  bin: string
  char: string
  description: string
}

const asciiTable: AsciiEntry[] = []

// Generate ASCII table (0-127)
for (let i = 0; i <= 127; i++) {
  let char = ""
  let description = ""
  
  if (i < 32) {
    const controlChars: Record<number, string> = {
      0: "NUL", 1: "SOH", 2: "STX", 3: "ETX", 4: "EOT", 5: "ENQ", 6: "ACK",
      7: "BEL", 8: "BS", 9: "TAB", 10: "LF", 11: "VT", 12: "FF", 13: "CR",
      14: "SO", 15: "SI", 16: "DLE", 17: "DC1", 18: "DC2", 19: "DC3", 20: "DC4",
      21: "NAK", 22: "SYN", 23: "ETB", 24: "CAN", 25: "EM", 26: "SUB",
      27: "ESC", 28: "FS", 29: "GS", 30: "RS", 31: "US"
    }
    char = ""
    description = `Control: ${controlChars[i] || "CTRL"}`
  } else if (i === 32) {
    char = " "
    description = "Space"
  } else if (i === 127) {
    char = ""
    description = "Control: DEL"
  } else {
    char = String.fromCharCode(i)
    description = char === " " ? "Space" : `Printable: "${char}"`
  }
  
  asciiTable.push({
    dec: i,
    hex: i.toString(16).toUpperCase().padStart(2, "0"),
    oct: i.toString(8).padStart(3, "0"),
    bin: i.toString(2).padStart(7, "0"),
    char,
    description
  })
}

export default function AsciiCodeConverter() {
  const [input, setInput] = useState<string>("")
  const [outputFormat, setOutputFormat] = useState<"dec" | "hex" | "oct" | "bin">("dec")
  const [copied, setCopied] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [mode, setMode] = useState<"text-to-ascii" | "ascii-to-text">("text-to-ascii")

  const textToAscii = useCallback((text: string): string => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    
    switch (outputFormat) {
      case "hex":
        return Array.from(bytes).map(b => b.toString(16).toUpperCase().padStart(2, "0")).join(" ")
      case "oct":
        return Array.from(bytes).map(b => b.toString(8).padStart(3, "0")).join(" ")
      case "bin":
        return Array.from(bytes).map(b => b.toString(2).padStart(8, "0")).join(" ")
      default:
        return Array.from(bytes).map(b => b.toString(10)).join(" ")
    }
  }, [outputFormat])

  const asciiToText = useCallback((ascii: string): string => {
    const values = ascii.trim().split(/\s+/).map(v => {
      // Try to detect format
      if (v.startsWith("0x") || v.startsWith("0X")) {
        return parseInt(v, 16)
      } else if (v.startsWith("0") && v.length > 1 && /^[0-7]+$/.test(v)) {
        return parseInt(v, 8)
      } else if (/^[01]+$/.test(v) && v.length === 8) {
        return parseInt(v, 2)
      }
      return parseInt(v, 10)
    })
    
    const bytes = new Uint8Array(values.filter(v => !isNaN(v) && v >= 0 && v <= 255))
    return new TextDecoder().decode(bytes)
  }, [])

  const output = useMemo(() => {
    if (!input) return ""
    try {
      return mode === "text-to-ascii" ? textToAscii(input) : asciiToText(input)
    } catch {
      return ""
    }
  }, [input, mode, textToAscii, asciiToText])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const filteredTable = useMemo(() => {
    if (!searchTerm) return asciiTable
    const term = searchTerm.toLowerCase()
    return asciiTable.filter(entry =>
      entry.dec.toString().includes(term) ||
      entry.hex.toLowerCase().includes(term) ||
      entry.char.toLowerCase().includes(term) ||
      entry.description.toLowerCase().includes(term)
    )
  }, [searchTerm])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "text-to-ascii" ? "default" : "outline"}
            onClick={() => setMode("text-to-ascii")}
            className="flex-1"
          >
            Text to ASCII
          </Button>
          <Button
            variant={mode === "ascii-to-text" ? "default" : "outline"}
            onClick={() => setMode("ascii-to-text")}
            className="flex-1"
          >
            ASCII to Text
          </Button>
        </div>
      </section>

      {/* Output Format Selection */}
      {mode === "text-to-ascii" && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Output Format</Label>
          <div className="flex gap-2">
            <Button
              variant={outputFormat === "dec" ? "default" : "outline"}
              onClick={() => setOutputFormat("dec")}
              className="flex-1"
            >
              Decimal
            </Button>
            <Button
              variant={outputFormat === "hex" ? "default" : "outline"}
              onClick={() => setOutputFormat("hex")}
              className="flex-1"
            >
              Hexadecimal
            </Button>
            <Button
              variant={outputFormat === "oct" ? "default" : "outline"}
              onClick={() => setOutputFormat("oct")}
              className="flex-1"
            >
              Octal
            </Button>
            <Button
              variant={outputFormat === "bin" ? "default" : "outline"}
              onClick={() => setOutputFormat("bin")}
              className="flex-1"
            >
              Binary
            </Button>
          </div>
        </section>
      )}

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "text-to-ascii" ? "Text to Convert" : "ASCII Codes"}
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
              onClick={() => {
                setInput("")
              }}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder={mode === "text-to-ascii" ? "Enter text to convert to ASCII codes..." : "Enter ASCII codes (space-separated)..."}
        />
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "text-to-ascii" ? "ASCII Codes" : "Decoded Text"}
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
          className="font-mono text-sm min-h-[120px] bg-muted/50"
          placeholder="Result will appear here..."
        />
      </section>

      {/* ASCII Table Reference */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">ASCII Table Reference</Label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ASCII table..."
              className="pl-8 w-64"
            />
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 gap-px bg-border border-b">
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Dec</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Hex</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Oct</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Bin</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Char</div>
            <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Description</div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredTable.map((entry) => (
              <div key={entry.dec} className="grid grid-cols-6 gap-px bg-border border-b last:border-b-0">
                <div className="bg-background px-3 py-2 text-sm font-mono">{entry.dec}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{entry.hex}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{entry.oct}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{entry.bin}</div>
                <div className="bg-background px-3 py-2 text-sm font-mono">{entry.char || "—"}</div>
                <div className="bg-background px-3 py-2 text-sm text-muted-foreground">{entry.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

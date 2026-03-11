"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Download, FileText, Info, ExternalLink, Type } from "lucide-react"
import { cn } from "@/lib/utils"

// Barcode font encoding mappings
const CODE39_CHARS: Record<string, string> = {
  "0": "bWbWbWnMn", "1": "nMbWbWnMn", "2": "bMWbWnMn", "3": "nMbMWbWnMn",
  "4": "bWbMWnMn", "5": "nMWbMWnMn", "6": "bMWbMWnMn", "7": "bWbWnMMn",
  "8": "nMWbWnMMn", "9": "bMWbWnMMn", "A": "nMbWbWnM", "B": "bMWbWnM",
  "C": "nMbMWbWn", "D": "bMWbMWn", "E": "nWbMWbWn", "F": "bWbMWbWn",
  "G": "nMbWbMWn", "H": "bMWbMWn", "I": "nWbWbMWn", "J": "bWbWbMWn",
  "K": "nMbWbWnM", "L": "bMWbWnM", "M": "nMbMWbWnM", "N": "bMWbMWnM",
  "O": "nWbMWbWnM", "P": "bWbMWbWnM", "Q": "nMbWbMWnM", "R": "bMWbMWnM",
  "S": "nWbWbMWnM", "T": "bWbWbMWnM", "U": "nMWbWbWnM", "V": "bMnWbWnM",
  "W": "nMWbMWbWnM", "X": "bMnWbMWnM", "Y": "nMnWbWbWM", "Z": "bMnWbWbWM",
  "-": "bMnWbWnM", ".": "nMWbWbWnM", " ": "bMWbWbWnM", "$": "bMnMbMnMn",
  "/": "bMnMbWnMn", "+": "bMnMWbWnM", "%": "nMbMnMbWnM", "*": "bMnWbWnMn",
}

const CODE128_START_B = "11010010000" // Simplified representation

export default function BarcodeFontEncoder() {
  const [inputText, setInputText] = useState<string>("")
  const [fontType, setFontType] = useState<"code39" | "code128">("code39")
  const [encodedText, setEncodedText] = useState<string>("")
  const [barcodeUrl, setBarcodeUrl] = useState<string>("")
  const [fontSize, setFontSize] = useState<number>(48)
  const [showHumanReadable, setShowHumanReadable] = useState<boolean>(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const encodeCode39 = useCallback((text: string): string => {
    const cleanText = text.toUpperCase().replace(/[^0-9A-Z\-\.\ \$\/\+\%]/g, "")
    let encoded = "*" // Start character
    
    for (const char of cleanText) {
      if (CODE39_CHARS[char]) {
        encoded += CODE39_CHARS[char]
      }
    }
    
    encoded += "*" // Stop character
    return encoded
  }, [])

  const encodeCode128 = useCallback((text: string): string => {
    // Code 128 encoding is more complex - this is a simplified version
    // In production, use a proper Code 128 encoding library
    const cleanText = text.slice(0, 80) // Code 128 max length
    return `[C128:${cleanText}]`
  }, [])

  const generateBarcode = useCallback(async () => {
    if (!inputText.trim()) {
      setError("Please enter text to encode")
      return
    }

    setError(null)

    let encoded: string
    if (fontType === "code39") {
      encoded = encodeCode39(inputText)
    } else {
      encoded = encodeCode128(inputText)
    }

    setEncodedText(encoded)

    // Generate barcode image using bwip-js
    try {
      const params = new URLSearchParams({
        bcid: fontType,
        text: inputText,
        scale: "3",
        height: "100",
        includetext: showHumanReadable ? "true" : "false",
      })

      const barcodeUrl = `https://bwipjs-api.metafloor.com/?${params.toString()}`
      setBarcodeUrl(barcodeUrl)
    } catch (err) {
      setError("Failed to generate barcode image")
    }
  }, [inputText, fontType, encodeCode39, encodeCode128, showHumanReadable])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadFontFile = useCallback(() => {
    // Create a mock font file download
    // In production, this would download actual barcode font files
    const fontInfo = `
Barcode Font Information
========================
Font Type: ${fontType.toUpperCase()}
Generated: ${new Date().toISOString()}

Installation Instructions:
1. Download a barcode font from:
   - Code 39: https://www.dafont.com/code-39.font
   - Code 128: https://www.dafont.com/code-128.font
   
2. Install the font on your system:
   - Windows: Right-click > Install
   - Mac: Double-click > Install Font
   - Linux: Copy to ~/.fonts/ and run fc-cache

3. Use in applications:
   - Word/Docs: Select the barcode font
   - Paste the encoded text: ${encodedText}
   - Adjust font size as needed

Encoded Text for ${inputText}:
${encodedText}
    `.trim()

    const blob = new Blob([fontInfo], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `barcode-font-${fontType}-instructions.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, [fontType, encodedText, inputText])

  const clearAll = useCallback(() => {
    setInputText("")
    setEncodedText("")
    setBarcodeUrl("")
    setError(null)
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (inputText.trim()) {
        generateBarcode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [inputText, generateBarcode])

  const validateInput = (text: string): string[] => {
    if (fontType === "code39") {
      const invalidChars = text.replace(/[0-9A-Z\-\.\ \$\/\+\%]/gi, "").split("")
      return [...new Set(invalidChars)]
    }
    return []
  }

  const invalidChars = validateInput(inputText)

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            Text to Encode
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!inputText}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <Input
          id="input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={cn("font-mono text-sm", error && "border-destructive")}
          placeholder="Enter text, numbers, or product code..."
        />

        {invalidChars.length > 0 && fontType === "code39" && (
          <p className="text-sm text-amber-500">
            Invalid characters for Code 39: {invalidChars.join(", ")}
          </p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}
      </section>

      {/* Font Type Selection */}
      <section className="space-y-3">
        <Label htmlFor="font-type" className="text-base font-medium">
          Barcode Font Type
        </Label>
        <Select value={fontType} onValueChange={(v) => setFontType(v as typeof fontType)}>
          <SelectTrigger id="font-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="code39">
              <div className="flex flex-col">
                <span>Code 39</span>
                <span className="text-muted-foreground text-xs">Alphanumeric, widely supported</span>
              </div>
            </SelectItem>
            <SelectItem value="code128">
              <div className="flex flex-col">
                <span>Code 128</span>
                <span className="text-muted-foreground text-xs">Full ASCII, more compact</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Display Options */}
      <section className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-medium">Display Options</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="font-size" className="text-sm">
              Preview Font Size: {fontSize}px
            </Label>
            <input
              id="font-size"
              type="range"
              min="24"
              max="96"
              step={12}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex items-end">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show-human"
                checked={showHumanReadable}
                onChange={(e) => setShowHumanReadable(e.target.checked)}
                className="rounded border-input"
              />
              <Label htmlFor="show-human" className="text-sm cursor-pointer">
                Show human-readable text in barcode
              </Label>
            </div>
          </div>
        </div>
      </section>

      {/* Encoded Output */}
      {encodedText && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Encoded Text (for Barcode Font)</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(encodedText, "encoded")}
              >
                {copied === "encoded" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy Encoded
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadFontFile}
              >
                <Download className="size-4 mr-1" />
                Font Instructions
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <Label className="text-xs text-muted-foreground mb-2 block">
              Encoded Text (paste this with barcode font):
            </Label>
            <div
              className="font-mono text-sm break-all bg-background rounded p-3 border"
              style={{ fontFamily: "monospace" }}
            >
              {encodedText}
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <Label className="text-xs text-muted-foreground mb-2 block">
              Preview (simulated barcode font appearance):
            </Label>
            <div
              className="break-all p-3"
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: "monospace",
                letterSpacing: "0.1em",
              }}
            >
              {encodedText.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    display: "inline-block",
                    minWidth: char === "*" ? "0.3em" : "0.5em",
                    textAlign: "center",
                  }}
                >
                  {char === "b" || char === "n" || char === "W" || char === "M" ? "█" : char}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Note: This is a simulation. Install actual barcode fonts for proper rendering.
            </p>
          </div>
        </section>
      )}

      {/* Barcode Image Preview */}
      {barcodeUrl && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Reference Barcode Image</Label>
          <div className="rounded-lg border bg-background p-8 flex items-center justify-center">
            <img src={barcodeUrl} alt="Barcode" className="max-w-full h-auto" />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Use this as a reference to verify your font-encoded barcode
          </p>
        </section>
      )}

      {/* How to Use */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">How to Use Barcode Fonts</h4>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Enter your text in the input field above</li>
              <li>Copy the encoded text from the output box</li>
              <li>Download and install a barcode font on your system</li>
              <li>In your document (Word, Google Docs, etc.), paste the encoded text</li>
              <li>Apply the barcode font to the pasted text</li>
              <li>Adjust font size until the barcode scans correctly</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Font Resources */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-3">Free Barcode Font Resources</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded border bg-background">
            <div className="font-medium flex items-center gap-2">
              <FileText className="size-4" />
              Code 39 Fonts
            </div>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• IDAutomation Code 39</li>
              <li>• Libre Barcode 39 (Google Fonts)</li>
              <li>• Code 39 Extended</li>
            </ul>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium flex items-center gap-2">
              <FileText className="size-4" />
              Code 128 Fonts
            </div>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• IDAutomation Code 128</li>
              <li>• Libre Barcode 128 (Google Fonts)</li>
              <li>• Code 128 Auto</li>
            </ul>
          </div>
        </div>
        <Button
          variant="link"
          className="text-sm mt-3 p-0 h-auto"
          onClick={() => window.open("https://fonts.google.com/?query=barcode", "_blank")}
        >
          Browse Google Fonts for Barcode Fonts <ExternalLink className="size-3 ml-1" />
        </Button>
      </section>

      {/* Character Support */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-3">Supported Characters</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium mb-2">Code 39:</div>
            <div className="font-mono text-xs bg-background p-2 rounded border">
              0-9, A-Z, - . $ / + % (space)
            </div>
            <div className="text-muted-foreground text-xs mt-1">
              Auto-adds start/stop characters (*)
            </div>
          </div>
          <div>
            <div className="font-medium mb-2">Code 128:</div>
            <div className="font-mono text-xs bg-background p-2 rounded border">
              Full ASCII (all printable characters)
            </div>
            <div className="text-muted-foreground text-xs mt-1">
              More compact, better for special chars
            </div>
          </div>
        </div>
      </section>

      {/* Empty State */}
      {!encodedText && !inputText && (
        <div className="text-center py-12 text-muted-foreground">
          <Type className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter text to encode into barcode font format</p>
        </div>
      )}
    </div>
  )
}

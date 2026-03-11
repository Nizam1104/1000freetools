"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export default function TextToUnicodeConverter() {
  const [inputText, setInputText] = useState<string>("")
  const [outputFormat, setOutputFormat] = useState<"hex" | "decimal" | "escape">("hex")
  const [copied, setCopied] = useState<string | null>(null)

  const unicodeOutput = useMemo(() => {
    if (!inputText) return ""
    
    switch (outputFormat) {
      case "hex":
        return inputText
          .split("")
          .map((char) => `U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")}`)
          .join(" ")
      case "decimal":
        return inputText
          .split("")
          .map((char) => char.charCodeAt(0).toString())
          .join(" ")
      case "escape":
        return inputText
          .split("")
          .map((char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`)
          .join("")
      default:
        return ""
    }
  }, [inputText, outputFormat])

  const textOutput = useMemo(() => {
    const hexMatches = inputText.match(/U\+([0-9A-Fa-f]{4})/g)
    if (hexMatches) {
      return hexMatches
        .map((match) => String.fromCharCode(parseInt(match.slice(2), 16)))
        .join("")
    }
    
    const escapeMatches = inputText.match(/\\u([0-9A-Fa-f]{4})/g)
    if (escapeMatches) {
      return escapeMatches
        .map((match) => String.fromCharCode(parseInt(match.slice(2), 16)))
        .join("")
    }
    
    return ""
  }, [inputText])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const characterBreakdown = useMemo(() => {
    if (!inputText) return []
    
    return inputText.split("").map((char, idx) => {
      const code = char.charCodeAt(0)
      return {
        char,
        codePoint: code,
        hex: code.toString(16).toUpperCase().padStart(4, "0"),
        binary: code.toString(2).padStart(16, "0"),
        utf8: encodeURIComponent(char),
      }
    })
  }, [inputText])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-text" className="text-base font-medium">
            Input Text
          </Label>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(inputText, "input")}
            >
              {copied === "input" ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInputText("")}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>

        <Textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter text to convert to Unicode code points..."
        />
      </section>

      {/* Format Selection */}
      <section className="space-y-3">
        <Label>Output Format</Label>
        <div className="flex gap-2">
          <Button
            variant={outputFormat === "hex" ? "default" : "outline"}
            size="sm"
            onClick={() => setOutputFormat("hex")}
          >
            U+XXXX (Hex)
          </Button>
          <Button
            variant={outputFormat === "decimal" ? "default" : "outline"}
            size="sm"
            onClick={() => setOutputFormat("decimal")}
          >
            Decimal
          </Button>
          <Button
            variant={outputFormat === "escape" ? "default" : "outline"}
            size="sm"
            onClick={() => setOutputFormat("escape")}
          >
            \uXXXX (Escape)
          </Button>
        </div>
      </section>

      {/* Output Section */}
      {unicodeOutput && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Unicode Output</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(unicodeOutput, "unicode")}
            >
              {copied === "unicode" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              {copied === "unicode" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all">{unicodeOutput}</p>
          </div>
        </section>
      )}

      {/* Character Breakdown */}
      {characterBreakdown.length > 0 && (
        <section className="space-y-3">
          <h4 className="text-sm font-medium">Character Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {characterBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-background p-3 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{item.char === " " ? "␣" : item.char}</span>
                  <span className="text-xs text-muted-foreground">#{idx}</span>
                </div>
                <div className="text-xs space-y-1 font-mono">
                  <p>U+{item.hex}</p>
                  <p>Dec: {item.codePoint}</p>
                  <p>UTF-8: {item.utf8}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Unicode to Text Section */}
      {textOutput && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Decoded Text (if input is Unicode)</Label>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm">{textOutput}</p>
          </div>
        </section>
      )}
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export default function AsciiToOctalConverter() {
  const [inputText, setInputText] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const octalOutput = useMemo(() => {
    if (!inputText) return ""
    return inputText.split("").map((char) => char.charCodeAt(0).toString(8).padStart(3, "0")).join(" ")
  }, [inputText])

  const textOutput = useMemo(() => {
    const numbers = inputText.trim().split(/\s+/)
    if (numbers.length === 0 || !numbers.every((n) => /^[0-7]+$/.test(n))) return ""
    
    const result: string[] = []
    for (const num of numbers) {
      const code = parseInt(num, 8)
      if (code >= 32 && code <= 126) {
        result.push(String.fromCharCode(code))
      } else {
        result.push("?")
      }
    }
    return result.join("")
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
    
    return inputText.split("").map((char, idx) => ({
      char,
      decimal: char.charCodeAt(0),
      octal: char.charCodeAt(0).toString(8).padStart(3, "0"),
    }))
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
          placeholder="Enter ASCII text to convert to octal..."
        />
      </section>

      {/* Output Section */}
      {octalOutput && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Octal Output</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(octalOutput, "octal")}
            >
              {copied === "octal" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              {copied === "octal" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all">{octalOutput}</p>
          </div>

          {/* Character Breakdown */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Character Breakdown</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {characterBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border bg-background p-2 text-center"
                >
                  <p className="font-mono text-lg font-semibold">{item.char === " " ? "␣" : item.char}</p>
                  <p className="text-xs text-muted-foreground">{item.decimal}</p>
                  <p className="font-mono text-xs">{item.octal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Octal to Text Section */}
      {textOutput && inputText.trim().match(/^[\d\s]+$/) && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Decoded Text (if input is octal)</Label>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm">{textOutput}</p>
          </div>
        </section>
      )}
    </div>
  )
}

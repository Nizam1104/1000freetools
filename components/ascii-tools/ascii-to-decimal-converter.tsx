"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export default function AsciiToDecimalConverter() {
  const [inputText, setInputText] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const decimalOutput = useMemo(() => {
    if (!inputText) return ""
    return inputText.split("").map((char) => char.charCodeAt(0)).join(" ")
  }, [inputText])

  const textOutput = useMemo(() => {
    const numbers = inputText.trim().split(/\s+/)
    if (numbers.length === 0 || !numbers.every((n) => /^\d+$/.test(n))) return ""
    
    const result: string[] = []
    for (const num of numbers) {
      const code = parseInt(num, 10)
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
      binary: char.charCodeAt(0).toString(2).padStart(8, "0"),
      hex: char.charCodeAt(0).toString(16).padStart(2, "0").toUpperCase(),
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
          placeholder="Enter ASCII text to convert to decimal..."
        />
      </section>

      {/* Output Section */}
      {decimalOutput && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Decimal Output</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(decimalOutput, "decimal")}
            >
              {copied === "decimal" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              {copied === "decimal" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all">{decimalOutput}</p>
          </div>

          {/* Character Breakdown Table */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Character Breakdown</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Char</th>
                    <th className="text-left py-2 px-3">Decimal</th>
                    <th className="text-left py-2 px-3">Binary</th>
                    <th className="text-left py-2 px-3">Hex</th>
                    <th className="text-left py-2 px-3">Octal</th>
                  </tr>
                </thead>
                <tbody>
                  {characterBreakdown.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-3 font-mono">{item.char === " " ? "␣" : item.char}</td>
                      <td className="py-2 px-3 font-mono">{item.decimal}</td>
                      <td className="py-2 px-3 font-mono">{item.binary}</td>
                      <td className="py-2 px-3 font-mono">{item.hex}</td>
                      <td className="py-2 px-3 font-mono">{item.octal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Decimal to Text Section */}
      {textOutput && inputText.trim().match(/^[\d\s]+$/) && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Decoded Text (if input is decimal)</Label>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm">{textOutput}</p>
          </div>
        </section>
      )}
    </div>
  )
}

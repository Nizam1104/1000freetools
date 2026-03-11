"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Copy, Check, Trash2 } from "lucide-react"

export default function TextToBinaryConverter() {
  const [inputText, setInputText] = useState<string>("")
  const [bitLength, setBitLength] = useState<8 | 16>(8)
  const [addSpaces, setAddSpaces] = useState<boolean>(true)
  const [copied, setCopied] = useState<string | null>(null)

  const binaryOutput = useMemo(() => {
    if (!inputText) return ""
    
    const result: string[] = []
    for (let i = 0; i < inputText.length; i++) {
      const charCode = inputText.charCodeAt(i)
      const binary = charCode.toString(2).padStart(bitLength, "0")
      result.push(binary)
    }
    
    return addSpaces ? result.join(" ") : result.join("")
  }, [inputText, bitLength, addSpaces])

  const textOutput = useMemo(() => {
    const cleanInput = inputText.replace(/\s+/g, "")
    if (!cleanInput || !/^[01]+$/.test(cleanInput)) return ""
    
    const result: string[] = []
    for (let i = 0; i < cleanInput.length; i += bitLength) {
      const byte = cleanInput.slice(i, i + bitLength)
      if (byte.length === bitLength) {
        const charCode = parseInt(byte, 2)
        if (charCode >= 32 && charCode <= 126) {
          result.push(String.fromCharCode(charCode))
        } else {
          result.push("?")
        }
      }
    }
    return result.join("")
  }, [inputText, bitLength])

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
      code: char.charCodeAt(0),
      binary: char.charCodeAt(0).toString(2).padStart(bitLength, "0"),
    }))
  }, [inputText, bitLength])

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
          placeholder="Enter text to convert to binary..."
        />
      </section>

      {/* Settings Section */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold">Settings</h3>
        
        <div className="space-y-2">
          <Label>Bit Length</Label>
          <RadioGroup value={bitLength.toString()} onValueChange={(v) => setBitLength(Number(v) as 8 | 16)}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="8" id="bit-8" />
              <Label htmlFor="bit-8" className="font-normal">8-bit (ASCII)</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="16" id="bit-16" />
              <Label htmlFor="bit-16" className="font-normal">16-bit (Unicode)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="add-spaces"
            checked={addSpaces}
            onChange={(e) => setAddSpaces(e.target.checked)}
            className="h-4 w-4"
          />
          <Label htmlFor="add-spaces" className="font-normal">Add spaces between bytes</Label>
        </div>
      </section>

      {/* Output Section */}
      {binaryOutput && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Binary Output</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(binaryOutput, "binary")}
            >
              {copied === "binary" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              {copied === "binary" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all">{binaryOutput}</p>
          </div>

          {/* Character Breakdown */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Character Breakdown</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {characterBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border bg-background p-2 text-center"
                >
                  <p className="font-mono text-lg font-semibold">{item.char === " " ? "␣" : item.char}</p>
                  <p className="text-xs text-muted-foreground">{item.code}</p>
                  <p className="font-mono text-xs">{item.binary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Binary to Text Section */}
      {textOutput && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Decoded Text (if input is binary)</Label>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm">{textOutput}</p>
          </div>
        </section>
      )}
    </div>
  )
}

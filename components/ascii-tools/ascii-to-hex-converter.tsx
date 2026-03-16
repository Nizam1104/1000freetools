"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2 } from "lucide-react"

export default function AsciiToHexConverter() {
  const [inputText, setInputText] = useState<string>("")
  const [addPrefix, setAddPrefix] = useState<boolean>(false)
  const [addSpaces, setAddSpaces] = useState<boolean>(true)
  const [uppercase, setUppercase] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)

  const hexOutput = useMemo(() => {
    if (!inputText) return ""
    
    const result: string[] = []
    for (let i = 0; i < inputText.length; i++) {
      const hex = inputText.charCodeAt(i).toString(16)
      const formattedHex = hex.padStart(2, "0")
      result.push(uppercase ? formattedHex.toUpperCase() : formattedHex)
    }
    
    let output = result.join(addSpaces ? " " : "")
    if (addPrefix) {
      output = "0x" + output
    }
    return output
  }, [inputText, addPrefix, addSpaces, uppercase])

  const textOutput = useMemo(() => {
    const cleanInput = inputText.replace(/0x/g, "").replace(/\s+/g, "")
    if (!cleanInput || !/^[0-9a-fA-F]+$/.test(cleanInput) || cleanInput.length % 2 !== 0) return ""
    
    const result: string[] = []
    for (let i = 0; i < cleanInput.length; i += 2) {
      const byte = cleanInput.slice(i, i + 2)
      const charCode = parseInt(byte, 16)
      if (charCode >= 32 && charCode <= 126) {
        result.push(String.fromCharCode(charCode))
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

  const byteBreakdown = useMemo(() => {
    if (!inputText) return []
    
    return inputText.split("").map((char, idx) => ({
      char,
      code: char.charCodeAt(0),
      hex: char.charCodeAt(0).toString(16).padStart(2, "0"),
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
          placeholder="Enter ASCII text to convert to hexadecimal..."
        />
      </section>

      {/* Settings Section */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold">Output Options</h3>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="add-prefix"
              checked={addPrefix}
              onCheckedChange={(checked) => setAddPrefix(checked as boolean)}
            />
            <Label htmlFor="add-prefix" className="font-normal">Add 0x prefix</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="add-spaces"
              checked={addSpaces}
              onCheckedChange={(checked) => setAddSpaces(checked as boolean)}
            />
            <Label htmlFor="add-spaces" className="font-normal">Add spaces between bytes</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="uppercase"
              checked={uppercase}
              onCheckedChange={(checked) => setUppercase(checked as boolean)}
            />
            <Label htmlFor="uppercase" className="font-normal">Uppercase hex</Label>
          </div>
        </div>
      </section>

      {/* Output Section */}
      {hexOutput && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Hexadecimal Output</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(hexOutput, "hex")}
            >
              {copied === "hex" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              {copied === "hex" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all">{hexOutput}</p>
          </div>

          {/* Byte Breakdown */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Byte Breakdown</h4>
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
              {byteBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border bg-background p-2 text-center"
                >
                  <p className="font-mono text-lg font-semibold">{item.char === " " ? "␣" : item.char}</p>
                  <p className="text-xs text-muted-foreground">{item.code}</p>
                  <p className="font-mono text-xs">{uppercase ? item.hex.toUpperCase() : item.hex}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hex to Text Section */}
      {textOutput && inputText.replace(/0x/g, "").replace(/\s+/g, "").match(/^[0-9a-fA-F]+$/) && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Decoded Text (if input is hex)</Label>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm">{textOutput}</p>
          </div>
        </section>
      )}
    </div>
  )
}

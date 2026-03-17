"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export function Utf16EncoderDecoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const encodeToUTF16 = useCallback((text: string): string => {
    let result = ""
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i)
      result += code.toString(16).toUpperCase().padStart(4, '0')
      if (i < text.length - 1) result += " "
    }
    return result
  }, [])

  const decodeFromUTF16 = useCallback((hex: string): string => {
    try {
      const hexValues = hex.trim().split(/\s+/)
      let result = ""
      for (const hexValue of hexValues) {
        const code = parseInt(hexValue, 16)
        if (isNaN(code)) throw new Error(`Invalid hex value: ${hexValue}`)
        result += String.fromCharCode(code)
      }
      return result
    } catch (e) {
      throw new Error(`Decode error: ${e instanceof Error ? e.message : "Unknown error"}`)
    }
  }, [])

  const handleConvert = useCallback(() => {
    try {
      setError("")
      if (mode === "encode") {
        setOutput(encodeToUTF16(input))
      } else {
        setOutput(decodeFromUTF16(input))
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion error")
      setOutput("")
    }
  }, [input, mode, encodeToUTF16, decodeFromUTF16])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setError("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">UTF-16 Encoder/Decoder</h2>
            <p className="text-sm text-muted-foreground">
              Encode text to UTF-16 hex or decode UTF-16 hex back to text
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex gap-4">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => setMode("encode")}
          >
            Encode to UTF-16
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => setMode("decode")}
          >
            Decode from UTF-16
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Label htmlFor="input">{mode === "encode" ? "Text Input" : "UTF-16 Hex Input"}</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter UTF-16 hex values (e.g., 0048 0065 006C 006C 006F)..."}
              className="min-h-[400px] font-mono text-sm"
            />
            <div className="flex items-center gap-2">
              <Button onClick={handleConvert} className="flex-1" disabled={!input}>
                {mode === "encode" ? "Encode" : "Decode"}
              </Button>
              <Button variant="outline" onClick={handleClear} title="Clear">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="output">{mode === "encode" ? "UTF-16 Hex Output" : "Decoded Text"}</Label>
            <Textarea
              id="output"
              value={output}
              readOnly
              placeholder="Output will appear here..."
              className="min-h-[400px] font-mono text-sm bg-muted"
            />
            <Button onClick={handleCopy} disabled={!output} className="w-full">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

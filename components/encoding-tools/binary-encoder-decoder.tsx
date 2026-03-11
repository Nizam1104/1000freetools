"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryEncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [useSpaces, setUseSpaces] = useState<boolean>(true)

  const encodeBinary = useCallback((text: string): string => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    const binary = Array.from(bytes)
      .map(b => b.toString(2).padStart(8, "0"))
    return useSpaces ? binary.join(" ") : binary.join("")
  }, [useSpaces])

  const decodeBinary = useCallback((text: string): string => {
    const cleanText = text.replace(/\s+/g, "")
    if (!/^[01]*$/.test(cleanText)) {
      throw new Error("Invalid binary string. Only 0s and 1s are allowed.")
    }
    if (cleanText.length % 8 !== 0) {
      throw new Error("Invalid binary string. Length must be a multiple of 8.")
    }
    const bytes = new Uint8Array(cleanText.length / 8)
    for (let i = 0; i < cleanText.length; i += 8) {
      bytes[i / 8] = parseInt(cleanText.substr(i, 8), 2)
    }
    return new TextDecoder().decode(bytes)
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setOutput(encodeBinary(value))
      } else {
        setOutput(decodeBinary(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, encodeBinary, decodeBinary])

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode)
    setError(null)
    if (newMode === "encode") {
      setOutput(encodeBinary(input))
    } else {
      setOutput(decodeBinary(input))
    }
  }, [input, encodeBinary, decodeBinary])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => handleModeChange("encode")}
            className="flex-1"
          >
            Encode to Binary
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode from Binary
          </Button>
        </div>

        {mode === "encode" && (
          <div className="flex items-center gap-4 pt-2">
            <Label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={useSpaces}
                onChange={(e) => {
                  setUseSpaces(e.target.checked)
                  setOutput(encodeBinary(input))
                }}
                className="rounded border-border"
              />
              Separate bytes with spaces
            </Label>
          </div>
        )}
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Encode" : "Binary String"}
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
                setOutput("")
                setError(null)
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
          className={cn(
            "font-mono text-sm min-h-[120px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={mode === "encode" ? "Enter text to encode to binary..." : "Enter binary string (0s and 1s)..."}
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "encode" ? "Binary Result" : "Decoded Text"}
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

        {output && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Input: <span className="font-medium text-foreground">{input.length}</span> chars</span>
            <span>Output: <span className="font-medium text-foreground">{output.length}</span> chars</span>
          </div>
        )}
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [encoded, setEncoded] = useState<string>("")
  const [decoded, setDecoded] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const encodeUrl = useCallback((text: string) => {
    try {
      return encodeURIComponent(text)
    } catch (err) {
      return ""
    }
  }, [])

  const decodeUrl = useCallback((text: string) => {
    try {
      return decodeURIComponent(text)
    } catch (err) {
      throw new Error("Invalid URL-encoded string")
    }
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setEncoded(encodeUrl(value))
        setDecoded("")
      } else {
        setDecoded(decodeUrl(value))
        setEncoded("")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      if (mode === "encode") {
        setEncoded("")
      } else {
        setDecoded("")
      }
    }
  }, [mode, encodeUrl, decodeUrl])

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode)
    setError(null)
    if (newMode === "encode") {
      setEncoded(encodeUrl(input))
      setDecoded("")
    } else {
      setDecoded(decodeUrl(input))
      setEncoded("")
    }
  }, [input, encodeUrl, decodeUrl])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const output = mode === "encode" ? encoded : decoded

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
            Encode
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Encode" : "URL-Encoded String"}
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
                setEncoded("")
                setDecoded("")
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
          placeholder={mode === "encode" ? "Enter text to URL-encode..." : "Enter URL-encoded string..."}
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
            {mode === "encode" ? "Encoded Result" : "Decoded Text"}
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

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export default function UrlEncoderDecoder() {
  const [inputText, setInputText] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)

  const output = useMemo(() => {
    if (!inputText) return ""

    try {
      if (mode === "encode") {
        return encodeURIComponent(inputText)
      } else {
        return decodeURIComponent(inputText)
      }
    } catch (err) {
      return mode === "decode" ? "Invalid encoded string" : ""
    }
  }, [inputText, mode])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const commonEncodings = [
    { original: " ", encoded: "%20" },
    { original: "&", encoded: "%26" },
    { original: "=", encoded: "%3D" },
    { original: "?", encoded: "%3F" },
    { original: "#", encoded: "%23" },
    { original: "+", encoded: "%2B" },
    { original: "%", encoded: "%25" },
    { original: "/", encoded: "%2F" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label>Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("encode")}
          >
            Encode
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("decode")}
          >
            Decode
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-text" className="text-base font-medium">
            {mode === "encode" ? "Input Text / URL" : "Encoded URL"}
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
          placeholder={mode === "encode" ? "Enter text or URL to encode..." : "Enter encoded URL to decode..."}
        />
      </section>

      {/* Output Section */}
      {output && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === "encode" ? "Encoded URL" : "Decoded Text"}
            </Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(output, "output")}
            >
              {copied === "output" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              {copied === "output" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all">{output}</p>
          </div>
        </section>
      )}

      {/* Common Encodings Reference */}
      <section className="space-y-3">
        <h4 className="text-sm font-medium">Common URL Encodings</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {commonEncodings.map((item) => (
            <div
              key={item.original}
              className="rounded-lg border bg-background p-2 text-center"
            >
              <p className="font-mono text-lg">{item.original === " " ? "␣" : item.original}</p>
              <p className="text-xs text-muted-foreground font-mono">{item.encoded}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

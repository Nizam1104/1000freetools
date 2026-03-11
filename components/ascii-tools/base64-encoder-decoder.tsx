"use client"

import * as React from "react"
import { useState, useCallback, useMemo, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Upload } from "lucide-react"

export default function Base64EncoderDecoder() {
  const [inputText, setInputText] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [urlSafe, setUrlSafe] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const output = useMemo(() => {
    if (!inputText) return ""

    try {
      if (mode === "encode") {
        let encoded = btoa(inputText)
        if (urlSafe) {
          encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
        }
        return encoded
      } else {
        let decoded = inputText
        if (urlSafe) {
          decoded = decoded.replace(/-/g, "+").replace(/_/g, "/")
          decoded += "=".repeat((4 - decoded.length % 4) % 4)
        }
        return atob(decoded)
      }
    } catch (err) {
      return mode === "decode" ? "Invalid Base64 string" : ""
    }
  }, [inputText, mode, urlSafe])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      const base64 = result.split(",")[1] || result
      setInputText(base64)
      setMode("decode")
    }
    reader.readAsDataURL(file)
  }, [])

  const downloadOutput = useCallback(() => {
    if (!output) return
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = mode === "encode" ? "encoded.txt" : "decoded.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [output, mode])

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
            Encode to Base64
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("decode")}
          >
            Decode from Base64
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-text" className="text-base font-medium">
            {mode === "encode" ? "Input Text" : "Base64 String"}
          </Label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept="*/*"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="size-4 mr-1" />
              Upload File
            </Button>
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
          className="font-mono text-sm min-h-[120px]"
          placeholder={mode === "encode" ? "Enter text to encode to Base64..." : "Enter Base64 string to decode..."}
        />
      </section>

      {/* Options */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="url-safe"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
            className="h-4 w-4"
          />
          <Label htmlFor="url-safe" className="font-normal">
            URL-safe Base64 (uses - and _ instead of + and /)
          </Label>
        </div>
      </section>

      {/* Output Section */}
      {output && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadOutput}
              >
                <Upload className="size-4 mr-1 rotate-180" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(output, "output")}
              >
                {copied === "output" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                {copied === "output" ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm break-all whitespace-pre-wrap">{output}</p>
          </div>
        </section>
      )}
    </div>
  )
}

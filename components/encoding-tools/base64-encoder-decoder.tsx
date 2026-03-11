"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [urlSafe, setUrlSafe] = useState<boolean>(false)

  const encodeBase64 = useCallback((text: string): string => {
    try {
      const bytes = new TextEncoder().encode(text)
      let binary = ""
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      let encoded = btoa(binary)
      if (urlSafe) {
        encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
      }
      return encoded
    } catch (err) {
      throw new Error("Encoding failed")
    }
  }, [urlSafe])

  const decodeBase64 = useCallback((text: string): string => {
    try {
      let decoded = text
      if (urlSafe) {
        decoded = decoded.replace(/-/g, "+").replace(/_/g, "/")
      }
      // Add padding if needed
      const padding = decoded.length % 4
      if (padding) {
        decoded += "=".repeat(4 - padding)
      }
      const binary = atob(decoded)
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
      }
      return new TextDecoder().decode(bytes)
    } catch (err) {
      throw new Error("Invalid Base64 string")
    }
  }, [urlSafe])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setOutput(encodeBase64(value))
      } else {
        setOutput(decodeBase64(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, encodeBase64, decodeBase64])

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode)
    setError(null)
    if (newMode === "encode") {
      setOutput(encodeBase64(input))
    } else {
      setOutput(decodeBase64(input))
    }
  }, [input, encodeBase64, decodeBase64])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setInput(result)
        setOutput(encodeBase64(result))
      }
      reader.readAsText(file)
    }
  }, [encodeBase64])

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
            Encode to Base64
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode from Base64
          </Button>
        </div>

        {mode === "encode" && (
          <div className="flex items-center gap-4 pt-2">
            <Label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={urlSafe}
                onChange={(e) => {
                  setUrlSafe(e.target.checked)
                  setOutput(encodeBase64(input))
                }}
                className="rounded border-border"
              />
              URL-safe Base64
            </Label>
          </div>
        )}
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Encode" : "Base64 String"}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => document.getElementById("file-upload")?.click()}
              className="h-7"
            >
              <Upload className="size-3.5" />
              <span className="text-xs">Upload</span>
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".txt,.json,.xml,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
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
          placeholder={mode === "encode" ? "Enter text to encode to Base64..." : "Enter Base64 string..."}
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
            {mode === "encode" ? "Base64 Result" : "Decoded Text"}
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

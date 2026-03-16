"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DataUriConverter() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mimeType, setMimeType] = useState<string>("text/plain")

  const encodeDataUri = useCallback((text: string, type: string): string => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    let binary = ""
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    const base64 = btoa(binary)
    return `data:${type};base64,${base64}`
  }, [])

  const decodeDataUri = useCallback((dataUri: string): { text: string; mimeType: string } => {
    const match = dataUri.match(/^data:([^;]+);base64,(.+)$/)
    if (!match) {
      throw new Error("Invalid Data URI format")
    }
    
    const [, mimeType, base64Data] = match
    const binary = atob(base64Data)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    const text = new TextDecoder().decode(bytes)
    
    return { text, mimeType }
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "encode") {
        setOutput(encodeDataUri(value, mimeType))
      } else {
        const result = decodeDataUri(value)
        setOutput(result.text)
        setMimeType(result.mimeType)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, encodeDataUri, decodeDataUri, mimeType])

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode)
    setError(null)
    setOutput("")
  }, [])

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
        const dataUri = result
        setInput(dataUri)
        try {
          const decoded = decodeDataUri(dataUri)
          setOutput(decoded.text)
          setMimeType(decoded.mimeType)
          setMode("decode")
        } catch (err) {
          setError("Failed to decode Data URI")
        }
      }
      reader.readAsDataURL(file)
    }
  }, [decodeDataUri])

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
            Encode to Data URI
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Decode Data URI
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Content to Encode" : "Data URI"}
          </Label>
          <div className="flex items-center gap-2">
            {mode === "decode" && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => document.getElementById("file-upload")?.click()}
                className="h-7"
              >
                <Upload className="size-3.5" />
                <span className="text-xs">Upload</span>
              </Button>
            )}
            <input
              id="file-upload"
              type="file"
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
          placeholder={mode === "encode" ? "Enter text or paste Data URI..." : "Enter Data URI (data:...;base64,...)..."}
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      {/* MIME Type Selection for Encode */}
      {mode === "encode" && (
        <section className="space-y-3">
          <Label htmlFor="mime-type" className="text-base font-medium">MIME Type</Label>
          <div className="flex gap-2 flex-wrap">
            {['text/plain', 'text/html', 'image/png', 'image/jpeg', 'image/svg+xml', 'application/json'].map(type => (
              <Button
                key={type}
                variant={mimeType === type ? "default" : "outline"}
                size="xs"
                onClick={() => {
                  setMimeType(type)
                  setOutput(encodeDataUri(input, type))
                }}
                className="h-8"
              >
                {type}
              </Button>
            ))}
          </div>
        </section>
      )}

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "encode" ? "Data URI" : "Decoded Content"}
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

        {output && mode === "encode" && (
          <div className="text-sm text-muted-foreground">
            MIME Type: <span className="font-medium text-foreground">{mimeType}</span>
          </div>
        )}
      </section>
    </div>
  )
}

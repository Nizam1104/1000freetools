"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GzipCompressDecompress() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"compress" | "decompress">("compress")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const compressGzip = useCallback(async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    
    const stream = new Blob([data]).stream()
    const compressedStream = stream.pipeThrough(new CompressionStream("gzip"))
    const compressedBlob = await new Response(compressedStream).blob()
    const compressedArray = await compressedBlob.arrayBuffer()
    
    return btoa(String.fromCharCode(...new Uint8Array(compressedArray)))
  }, [])

  const decompressGzip = useCallback(async (base64Data: string): Promise<string> => {
    try {
      const binaryString = atob(base64Data)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      
      const stream = new Blob([bytes]).stream()
      const decompressedStream = stream.pipeThrough(new DecompressionStream("gzip"))
      const decompressedBlob = await new Response(decompressedStream).blob()
      return await decompressedBlob.text()
    } catch (err) {
      throw new Error("Invalid gzip data")
    }
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    
    if (mode === "compress" && value) {
      compressGzip(value).then(setOutput).catch((err) => {
        setError(err instanceof Error ? err.message : "Compression failed")
        setOutput("")
      })
    } else if (mode === "decompress" && value) {
      decompressGzip(value).then(setOutput).catch((err) => {
        setError(err instanceof Error ? err.message : "Decompression failed")
        setOutput("")
      })
    } else {
      setOutput("")
    }
  }, [mode, compressGzip, decompressGzip])

  const handleModeChange = useCallback((newMode: "compress" | "decompress") => {
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

  const compressionRatio = output && input && mode === "compress" 
    ? ((1 - output.length / (input.length * 4 / 3)) * 100).toFixed(1)
    : null

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "compress" ? "default" : "outline"}
            onClick={() => handleModeChange("compress")}
            className="flex-1"
          >
            Compress (Gzip)
          </Button>
          <Button
            variant={mode === "decompress" ? "default" : "outline"}
            onClick={() => handleModeChange("decompress")}
            className="flex-1"
          >
            Decompress
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "compress" ? "Text to Compress" : "Base64 Gzip Data"}
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
          placeholder={mode === "compress" ? "Enter text to compress with Gzip..." : "Enter Base64-encoded gzip data..."}
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
            {mode === "compress" ? "Compressed Data (Base64)" : "Decompressed Text"}
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

        {compressionRatio && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Original: <span className="font-medium text-foreground">{input.length}</span> chars</span>
            <span>Compressed: <span className="font-medium text-foreground">{output.length}</span> chars (Base64)</span>
            <span className="text-green-600 dark:text-green-400">
              Compression ratio: {compressionRatio}%
            </span>
          </div>
        )}
      </section>
    </div>
  )
}

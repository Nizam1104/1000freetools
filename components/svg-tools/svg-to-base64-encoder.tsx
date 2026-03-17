"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Upload, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SvgToBase64Encoder() {
  const [svgCode, setSvgCode] = useState<string>("")
  const [base64, setBase64] = useState<string>("")
  const [dataUri, setDataUri] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [urlSafe, setUrlSafe] = useState<boolean>(false)
  const [includeMimeType, setIncludeMimeType] = useState<boolean>(true)

  const encodeToBase64 = useCallback((svg: string, safe: boolean): string => {
    try {
      const bytes = new TextEncoder().encode(svg)
      let binary = ""
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      let encoded = btoa(binary)

      if (safe) {
        encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
      }

      return encoded
    } catch (err) {
      throw new Error("Encoding failed")
    }
  }, [])

  const decodeFromBase64 = useCallback((encoded: string, safe: boolean): string => {
    try {
      let decoded = encoded

      if (safe) {
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
  }, [])

  const handleEncode = useCallback(() => {
    if (!svgCode.trim()) {
      setError("Please enter SVG code to encode")
      return
    }

    setError(null)
    try {
      const encoded = encodeToBase64(svgCode, urlSafe)
      setBase64(encoded)

      if (includeMimeType) {
        setDataUri(`data:image/svg+xml${urlSafe ? ";base64,url" : ";base64"},${encoded}`)
      } else {
        setDataUri(`data:image/svg+xml;base64,${encoded}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Encoding failed")
      setBase64("")
      setDataUri("")
    }
  }, [svgCode, urlSafe, includeMimeType, encodeToBase64])

  const handleDecode = useCallback(() => {
    if (!svgCode.trim()) {
      setError("Please enter Base64 string to decode")
      return
    }

    setError(null)
    try {
      // Extract base64 from data URI if present
      let base64String = svgCode
      if (svgCode.includes(",")) {
        base64String = svgCode.split(",")[1]
      }

      const decoded = decodeFromBase64(base64String, urlSafe)
      setBase64(base64String)
      setSvgCode(decoded)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Decoding failed")
      setBase64("")
    }
  }, [svgCode, urlSafe, decodeFromBase64])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setSvgCode("")
    setBase64("")
    setDataUri("")
    setError(null)
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setSvgCode(result)
        setError(null)
      }
      reader.readAsText(file)
    }
  }, [])

  const handleDownload = useCallback(() => {
    if (svgCode) {
      const blob = new Blob([svgCode], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "decoded.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [svgCode])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">SVG to Base64 Encoder</h2>
        <p className="text-sm text-muted-foreground">
          Convert SVG code to Base64 encoded string or Data URI format
        </p>
      </div>

      {/* Options */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="rounded border-border"
            />
            URL-safe Base64
          </Label>
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={includeMimeType}
              onChange={(e) => setIncludeMimeType(e.target.checked)}
              className="rounded border-border"
            />
            Include MIME type in Data URI
          </Label>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="svg-input" className="text-base font-medium">
            SVG Code / Base64 Input
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => document.getElementById("svg-upload")?.click()}
            >
              <Upload className="size-3.5 mr-2" />
              Upload
            </Button>
            <input
              id="svg-upload"
              type="file"
              accept=".svg"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(svgCode, "input")}
              className="h-7"
              disabled={!svgCode}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="svg-input"
          value={svgCode}
          onChange={(e) => setSvgCode(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[150px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Paste SVG code to encode, or Base64 string to decode..."
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={handleEncode} className="flex-1" disabled={!svgCode}>
          Encode to Base64
        </Button>
        <Button onClick={handleDecode} variant="outline" className="flex-1" disabled={!svgCode}>
          Decode from Base64
        </Button>
      </div>

      {/* Output Section */}
      {base64 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Base64 Encoded</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(base64, "base64")}
              className="h-7"
            >
              {copied === "base64" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <Textarea
            value={base64}
            readOnly
            className="font-mono text-xs min-h-[80px] bg-muted/50 break-all"
          />
        </section>
      )}

      {dataUri && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Data URI</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(dataUri, "datauri")}
              className="h-7"
            >
              {copied === "datauri" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <Textarea
            value={dataUri}
            readOnly
            className="font-mono text-xs min-h-[80px] bg-muted/50 break-all"
          />
        </section>
      )}

      {/* Preview */}
      {svgCode && svgCode.startsWith("<") && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Preview</Label>
          <div className="rounded-lg border bg-muted/30 p-4">
            <div
              className="max-w-full"
              dangerouslySetInnerHTML={{ __html: svgCode }}
            />
          </div>
        </section>
      )}

      {/* Download for decoded SVG */}
      {svgCode && svgCode.startsWith("<") && (
        <Button variant="outline" onClick={handleDownload} className="w-full">
          <Download className="size-4 mr-2" />
          Download SVG
        </Button>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Base64 Encoding</h4>
            <p className="text-sm text-muted-foreground">
              Base64 encoding converts binary data (like SVG files) into ASCII text, making it
              safe for transmission in text-based protocols like email or embedding in HTML/CSS.
            </p>
            <p className="text-sm text-muted-foreground">
              Data URIs allow embedding images directly in HTML or CSS using the format:
              <code className="ml-1 px-1 bg-muted rounded">data:image/svg+xml;base64,[encoded-data]</code>
            </p>
            <p className="text-sm text-muted-foreground">
              URL-safe Base64 replaces + with - and / with _ to make the output safe for URLs
              without additional encoding.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

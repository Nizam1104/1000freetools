"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, Upload, Download, FileText, AlertCircle, Shield, ShieldOff, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Base64EncodeDecode() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [urlSafe, setUrlSafe] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [fileContent, setFileContent] = useState<{ name: string; size: number; type: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      let decoded = text.trim()
      if (urlSafe) {
        decoded = decoded.replace(/-/g, "+").replace(/_/g, "/")
      }
      // Add padding if needed
      const padding = decoded.length % 4
      if (padding) {
        decoded += "=".repeat(4 - padding)
      }
      // Validate Base64 format
      const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/
      if (urlSafe) {
        const urlSafeRegex = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2}(?:==)?|[A-Za-z0-9_-]{3}=?)?$/
        if (!urlSafeRegex.test(text.trim())) {
          throw new Error("Invalid Base64 format")
        }
      } else if (!base64Regex.test(decoded)) {
        throw new Error("Invalid Base64 format")
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

  const validateBase64 = useCallback((text: string): boolean => {
    if (!text.trim()) return false
    try {
      let decoded = text.trim()
      if (urlSafe) {
        decoded = decoded.replace(/-/g, "+").replace(/_/g, "/")
      }
      const padding = decoded.length % 4
      if (padding) {
        decoded += "=".repeat(4 - padding)
      }
      const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/
      if (urlSafe) {
        const urlSafeRegex = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2}(?:==)?|[A-Za-z0-9_-]{3}=?)?$/
        return urlSafeRegex.test(text.trim())
      }
      return base64Regex.test(decoded)
    } catch {
      return false
    }
  }, [urlSafe])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    if (mode === "encode") {
      try {
        setOutput(encodeBase64(value))
        setIsValid(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Conversion failed")
        setOutput("")
      }
    } else {
      const valid = validateBase64(value)
      setIsValid(valid)
      if (valid || value === "") {
        try {
          setOutput(decodeBase64(value))
          setError(null)
        } catch (err) {
          setError(err instanceof Error ? err.message : "Invalid Base64")
          setOutput("")
        }
      } else {
        setError("Invalid Base64 format")
        setOutput("")
      }
    }
  }, [mode, encodeBase64, decodeBase64, validateBase64])

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode)
    setError(null)
    setIsValid(null)
    setFileContent(null)
    if (newMode === "encode") {
      try {
        setOutput(encodeBase64(input))
      } catch {
        setOutput("")
      }
    } else {
      try {
        setOutput(decodeBase64(input))
        setIsValid(validateBase64(input))
      } catch {
        setOutput("")
        setIsValid(false)
      }
    }
  }, [input, encodeBase64, decodeBase64, validateBase64])

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
      setFileContent({ name: file.name, size: file.size, type: file.type })
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setInput(result)
        setOutput(encodeBase64(result))
        setError(null)
      }
      reader.onerror = () => {
        setError("Failed to read file")
      }
      reader.readAsText(file)
    }
  }, [encodeBase64])

  const handleBinaryFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileContent({ name: file.name, size: file.size, type: file.type })
      const reader = new FileReader()
      reader.onload = (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer
        const bytes = new Uint8Array(arrayBuffer)
        let binary = ""
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        let encoded = btoa(binary)
        if (urlSafe) {
          encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
        }
        setInput(encoded)
        setOutput(encoded)
        setError(null)
      }
      reader.onerror = () => {
        setError("Failed to read file")
      }
      reader.readAsArrayBuffer(file)
    }
  }, [urlSafe])

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

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setError(null)
    setIsValid(null)
    setFileContent(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
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
              <Checkbox
                checked={urlSafe}
                onCheckedChange={(v) => {
                  setUrlSafe(v as boolean)
                  setOutput(encodeBase64(input))
                }}
              />
              URL-safe Base64 (uses - and _ instead of + and /)
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
              onClick={() => fileInputRef.current?.click()}
              className="h-7"
            >
              <Upload className="size-3.5" />
              <span className="text-xs">Upload File</span>
            </Button>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              accept={mode === "encode" ? ".txt,.json,.xml,.csv,.md" : "*"}
              onChange={mode === "encode" ? handleFileUpload : handleBinaryFileUpload}
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
              onClick={handleClear}
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
            error && isValid === false ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={mode === "encode" ? "Enter text to encode to Base64..." : "Enter Base64 string..."}
        />

        {fileContent && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg p-2">
            <FileText className="size-4" />
            <span>File: {fileContent.name} ({(fileContent.size / 1024).toFixed(2)} KB)</span>
          </div>
        )}

        {mode === "decode" && isValid !== null && (
          <div className={cn(
            "flex items-center gap-2 text-sm rounded-lg p-2",
            isValid ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-destructive/10 text-destructive"
          )}>
            {isValid ? <Shield className="size-4" /> : <ShieldOff className="size-4" />}
            <span>{isValid ? "Valid Base64 format" : "Invalid Base64 format"}</span>
          </div>
        )}

        {error && isValid === false && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <AlertCircle className="size-4" />
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={downloadOutput}
              className="h-7"
              disabled={!output}
            >
              <Download className="size-3.5" />
              <span className="text-xs">Download</span>
            </Button>
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
        </div>

        <Textarea
          id="output"
          value={output}
          readOnly
          className="font-mono text-sm min-h-[120px] bg-muted/50"
          placeholder="Result will appear here..."
        />

        {output && (
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Input: <span className="font-medium text-foreground">{input.length}</span> chars</span>
            <span>Output: <span className="font-medium text-foreground">{output.length}</span> chars</span>
            {mode === "encode" && (
              <span>Size ratio: <span className="font-medium text-foreground">{((output.length / input.length) * 100).toFixed(1)}%</span></span>
            )}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Base64 Encoding</h4>
            <p className="text-sm text-muted-foreground">
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
              It uses 64 characters (A-Z, a-z, 0-9, +, /) and is commonly used for encoding data in URLs,
              email attachments, and embedding images in HTML/CSS.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>URL-safe Base64:</strong> Uses - and _ instead of + and / to make the output safe for URLs.
              Padding (=) may also be omitted. This is commonly used in JWT tokens and OAuth.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

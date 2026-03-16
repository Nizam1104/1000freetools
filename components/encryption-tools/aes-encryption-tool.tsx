"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AesEncryptionTool() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")
  const [key, setKey] = useState<string>("")
  const [keySize, setKeySize] = useState<128 | 192 | 256>(256)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showKey, setShowKey] = useState<boolean>(false)

  const generateKey = useCallback((size: number): string => {
    const array = new Uint8Array(size / 8)
    crypto.getRandomValues(array)
    return Array.from(array, b => b.toString(16).padStart(2, "0")).join("")
  }, [])

  const encryptAes = useCallback(async (text: string, keyHex: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)

    const keyBytes = hexToBytes(keyHex)
    const algorithm = { name: "AES-GCM", length: keyBytes.length * 8 }

    const key = await crypto.subtle.importKey(
      "raw",
      keyBytes.buffer as ArrayBuffer,
      algorithm,
      false,
      ["encrypt"]
    )

    const iv = crypto.getRandomValues(new Uint8Array(12))
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      data
    )

    const result = new Uint8Array(iv.byteLength + encrypted.byteLength)
    result.set(iv, 0)
    result.set(new Uint8Array(encrypted), iv.byteLength)

    return bytesToHex(result)
  }, [])

  const decryptAes = useCallback(async (encryptedHex: string, keyHex: string): Promise<string> => {
    const encryptedBytes = hexToBytes(encryptedHex)
    const iv = encryptedBytes.slice(0, 12)
    const encrypted = encryptedBytes.slice(12)

    const keyBytes = hexToBytes(keyHex)
    const algorithm = { name: "AES-GCM", length: keyBytes.length * 8 }

    const key = await crypto.subtle.importKey(
      "raw",
      keyBytes.buffer as ArrayBuffer,
      algorithm,
      false,
      ["decrypt"]
    )

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encrypted
    )

    return new TextDecoder().decode(decrypted)
  }, [])

  const hexToBytes = (hex: string): Uint8Array => {
    const bytes = new Uint8Array(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16)
    }
    return bytes
  }

  const bytesToHex = (bytes: Uint8Array): string => {
    return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("")
  }

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
  }, [])

  const handleEncrypt = useCallback(async () => {
    if (!input || !key) {
      setError("Please provide both text and encryption key")
      return
    }
    
    try {
      const encrypted = await encryptAes(input, key)
      setOutput(encrypted)
      setError(null)
    } catch (err) {
      setError("Encryption failed. Ensure key is valid.")
      setOutput("")
    }
  }, [input, key, encryptAes])

  const handleDecrypt = useCallback(async () => {
    if (!input || !key) {
      setError("Please provide both encrypted data and decryption key")
      return
    }
    
    try {
      const decrypted = await decryptAes(input, key)
      setOutput(decrypted)
      setError(null)
    } catch (err) {
      setError("Decryption failed. Invalid key or corrupted data.")
      setOutput("")
    }
  }, [input, key, decryptAes])

  const handleModeChange = useCallback((newMode: "encrypt" | "decrypt") => {
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encrypt" ? "default" : "outline"}
            onClick={() => handleModeChange("encrypt")}
            className="flex-1"
          >
            Encrypt
          </Button>
          <Button
            variant={mode === "decrypt" ? "default" : "outline"}
            onClick={() => handleModeChange("decrypt")}
            className="flex-1"
          >
            Decrypt
          </Button>
        </div>
      </section>

      {/* Key Size Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Key Size</Label>
        <div className="flex gap-2">
          <Button
            variant={keySize === 128 ? "default" : "outline"}
            onClick={() => setKeySize(128)}
            className="flex-1"
          >
            128-bit
          </Button>
          <Button
            variant={keySize === 192 ? "default" : "outline"}
            onClick={() => setKeySize(192)}
            className="flex-1"
          >
            192-bit
          </Button>
          <Button
            variant={keySize === 256 ? "default" : "outline"}
            onClick={() => setKeySize(256)}
            className="flex-1"
          >
            256-bit
          </Button>
        </div>
      </section>

      {/* Encryption Key */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="key" className="text-base font-medium">
            Encryption Key (Hex)
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                const newKey = generateKey(keySize)
                setKey(newKey)
              }}
              className="h-7"
            >
              Generate
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowKey(!showKey)}
              className="h-7"
            >
              {showKey ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </Button>
          </div>
        </div>

        <div className="relative">
          <Input
            id="key"
            type={showKey ? "text" : "password"}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="font-mono text-sm pr-20"
            placeholder={`Enter ${keySize}-bit key (${keySize / 4} hex chars)...`}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {key.length}/{keySize / 4}
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encrypt" ? "Text to Encrypt" : "Encrypted Data (Hex)"}
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
          placeholder={mode === "encrypt" ? "Enter text to encrypt..." : "Enter encrypted hex data..."}
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      {/* Action Button */}
      <section>
        <Button
          onClick={mode === "encrypt" ? handleEncrypt : handleDecrypt}
          className="w-full"
          disabled={!input || !key}
        >
          {mode === "encrypt" ? "Encrypt" : "Decrypt"}
        </Button>
      </section>

      {/* Output Section */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="output" className="text-base font-medium">
              {mode === "encrypt" ? "Encrypted Data (Hex)" : "Decrypted Text"}
            </Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(output, "output")}
              className="h-7"
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
          />
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-2">About AES Encryption</h4>
        <p className="text-sm text-muted-foreground">
          AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used for securing sensitive data.
          This tool uses AES-GCM mode which provides both confidentiality and authenticity. The key must be kept secret -
          anyone with the key can decrypt the data. Store your key securely!
        </p>
      </section>
    </div>
  )
}

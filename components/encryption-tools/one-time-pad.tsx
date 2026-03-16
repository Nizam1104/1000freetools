"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Trash2, Download, Key, Lock, Unlock, Shield, AlertTriangle, Info, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function OneTimePad() {
  const [mode, setMode] = useState<"generate" | "encrypt" | "decrypt">("generate")
  const [message, setMessage] = useState<string>("")
  const [pad, setPad] = useState<string>("")
  const [encrypted, setEncrypted] = useState<string>("")
  const [decrypted, setDecrypted] = useState<string>("")
  const [padLength, setPadLength] = useState<number>(32)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [padFormat, setPadFormat] = useState<"hex" | "binary" | "decimal">("hex")

  // Generate cryptographically secure random pad
  const generatePad = useCallback((length: number, format: "hex" | "binary" | "decimal"): string => {
    const randomBytes = crypto.getRandomValues(new Uint8Array(length))

    switch (format) {
      case "hex":
        return Array.from(randomBytes, b => b.toString(16).padStart(2, "0")).join(" ")
      case "binary":
        return Array.from(randomBytes, b => b.toString(2).padStart(8, "0")).join(" ")
      case "decimal":
        return Array.from(randomBytes, b => b.toString(10)).join(" ")
      default:
        return Array.from(randomBytes, b => b.toString(16).padStart(2, "0")).join(" ")
    }
  }, [])

  const handleGeneratePad = useCallback(() => {
    const newPad = generatePad(padLength, padFormat)
    setPad(newPad)
    setEncrypted("")
    setDecrypted("")
    setMessage("")
    setError(null)
  }, [padLength, padFormat, generatePad])

  const parsePad = useCallback((padStr: string, format: "hex" | "binary" | "decimal"): number[] => {
    const parts = padStr.trim().split(/\s+/)
    switch (format) {
      case "hex":
        return parts.map((p): number => parseInt(p, 16)).filter((n): n is number => !isNaN(n))
      case "binary":
        return parts.map((p): number => parseInt(p, 2)).filter((n): n is number => !isNaN(n))
      case "decimal":
        return parts.map((p): number => parseInt(p, 10)).filter((n): n is number => !isNaN(n))
      default:
        return parts.map((p): number => parseInt(p, 16)).filter((n): n is number => !isNaN(n))
    }
  }, [])

  const xorEncrypt = useCallback((text: string, padBytes: number[]): string => {
    const encoder = new TextEncoder()
    const messageBytes = encoder.encode(text)

    if (padBytes.length < messageBytes.length) {
      throw new Error("Pad is shorter than the message")
    }

    const encryptedBytes = Array.from(messageBytes, (byte, i) => byte ^ padBytes[i])
    return encryptedBytes.map((b: number) => b.toString(16).padStart(2, "0")).join("")
  }, [])

  const xorDecrypt = useCallback((encryptedHex: string, padBytes: number[]): string => {
    const encryptedBytes: number[] = []
    for (let i = 0; i < encryptedHex.length; i += 2) {
      encryptedBytes.push(parseInt(encryptedHex.slice(i, i + 2), 16))
    }

    if (padBytes.length < encryptedBytes.length) {
      throw new Error("Pad is shorter than the encrypted data")
    }

    const decryptedBytes = encryptedBytes.map((byte, i) => byte ^ padBytes[i])
    return new TextDecoder().decode(new Uint8Array(decryptedBytes))
  }, [])

  const handleEncrypt = useCallback(() => {
    setError(null)
    if (!message) {
      setError("Please enter a message to encrypt")
      return
    }
    if (!pad) {
      setError("Please enter or generate a one-time pad")
      return
    }

    try {
      const padBytes = parsePad(pad, padFormat)
      const encoder = new TextEncoder()
      const messageBytes = encoder.encode(message)

      if (padBytes.length < messageBytes.length) {
        setError(`Pad too short! Need ${messageBytes.length} bytes, have ${padBytes.length} bytes`)
        return
      }

      const encryptedHex = xorEncrypt(message, padBytes)
      setEncrypted(encryptedHex)
      setDecrypted("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Encryption failed")
      setEncrypted("")
    }
  }, [message, pad, padFormat, parsePad, xorEncrypt])

  const handleDecrypt = useCallback(() => {
    setError(null)
    if (!message) {
      setError("Please enter encrypted data (hex) to decrypt")
      return
    }
    if (!pad) {
      setError("Please enter the one-time pad used for encryption")
      return
    }

    try {
      const padBytes = parsePad(pad, padFormat)
      const decryptedText = xorDecrypt(message, padBytes)
      setDecrypted(decryptedText)
      setEncrypted("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Decryption failed. Invalid pad or corrupted data.")
      setDecrypted("")
    }
  }, [message, pad, padFormat, parsePad, xorDecrypt])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadPad = useCallback((content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  const handleClear = useCallback(() => {
    setMessage("")
    setPad("")
    setEncrypted("")
    setDecrypted("")
    setError(null)
  }, [])

  // Validation checks
  const validationStatus = useMemo(() => {
    if (!message || !pad) return null

    try {
      const padBytes = parsePad(pad, padFormat)
      const encoder = new TextEncoder()
      const messageBytes = mode === "encrypt" ? encoder.encode(message) : new Uint8Array(message.length / 2)

      const isLongEnough = padBytes.length >= messageBytes.length
      const isExactLength = padBytes.length === messageBytes.length

      return {
        isLongEnough,
        isExactLength,
        messageLength: messageBytes.length,
        padLength: padBytes.length,
        remaining: padBytes.length - messageBytes.length,
      }
    } catch {
      return null
    }
  }, [message, pad, padFormat, mode, parsePad])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "generate" ? "default" : "outline"}
            onClick={() => setMode("generate")}
            className="flex-1"
          >
            <Key className="size-4 mr-2" />
            Generate Pad
          </Button>
          <Button
            variant={mode === "encrypt" ? "default" : "outline"}
            onClick={() => setMode("encrypt")}
            className="flex-1"
          >
            <Lock className="size-4 mr-2" />
            Encrypt
          </Button>
          <Button
            variant={mode === "decrypt" ? "default" : "outline"}
            onClick={() => setMode("decrypt")}
            className="flex-1"
          >
            <Unlock className="size-4 mr-2" />
            Decrypt
          </Button>
        </div>
      </section>

      {/* Generate Pad Mode */}
      {mode === "generate" && (
        <>
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Pad Length (bytes)</Label>
              <span className="font-mono text-sm font-medium">{padLength} bytes</span>
            </div>
            <Slider
              value={[padLength]}
              onValueChange={([v]) => setPadLength(v)}
              min={8}
              max={256}
              step={8}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>8</span>
              <span>256</span>
            </div>
          </section>

          <section className="space-y-3">
            <Label>Pad Format</Label>
            <div className="flex gap-2">
              <Button
                variant={padFormat === "hex" ? "default" : "outline"}
                onClick={() => setPadFormat("hex")}
                className="flex-1"
              >
                Hexadecimal
              </Button>
              <Button
                variant={padFormat === "binary" ? "default" : "outline"}
                onClick={() => setPadFormat("binary")}
                className="flex-1"
              >
                Binary
              </Button>
              <Button
                variant={padFormat === "decimal" ? "default" : "outline"}
                onClick={() => setPadFormat("decimal")}
                className="flex-1"
              >
                Decimal
              </Button>
            </div>
          </section>

          <Button onClick={handleGeneratePad} className="w-full">
            <RefreshCw className="size-4 mr-2" />
            Generate Random Pad
          </Button>

          {pad && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">One-Time Pad</Label>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="xs" onClick={() => copyToClipboard(pad, "pad")} className="h-7">
                    {copied === "pad" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span className="text-xs">Copy</span>
                  </Button>
                  <Button variant="ghost" size="xs" onClick={() => downloadPad(pad, `otp_${Date.now()}.txt`)} className="h-7">
                    <Download className="size-3.5" />
                    <span className="text-xs">Download</span>
                  </Button>
                </div>
              </div>
              <Textarea
                value={pad}
                readOnly
                className="font-mono text-xs min-h-[100px] bg-muted/30"
              />
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <Shield className="size-4" />
                <span>Cryptographically secure random bytes</span>
              </div>
            </section>
          )}
        </>
      )}

      {/* Encrypt Mode */}
      {mode === "encrypt" && (
        <>
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="message">Message to Encrypt</Label>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="xs" onClick={() => copyToClipboard(message, "message")} className="h-7" disabled={!message}>
                  {copied === "message" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
                <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
                  <Trash2 className="size-3.5" />
                  <span className="text-xs">Clear</span>
                </Button>
              </div>
            </div>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                setError(null)
              }}
              className="font-mono text-sm min-h-[80px]"
              placeholder="Enter message to encrypt..."
            />
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="pad-input">One-Time Pad</Label>
              <Button variant="ghost" size="xs" onClick={() => setPad(generatePad(32, padFormat))} className="h-7">
                <RefreshCw className="size-3.5" />
                <span className="text-xs">Generate</span>
              </Button>
            </div>
            <Textarea
              id="pad-input"
              value={pad}
              onChange={(e) => {
                setPad(e.target.value)
                setError(null)
              }}
              className="font-mono text-xs min-h-[80px]"
              placeholder={`Enter pad in ${padFormat} format (space-separated)...`}
            />
          </section>

          {/* Validation Status */}
          {validationStatus && (
            <div className={cn(
              "rounded-lg border p-3 flex items-center gap-3",
              validationStatus.isLongEnough ? "border-green-500 bg-green-500/10" : "border-destructive bg-destructive/10"
            )}>
              {validationStatus.isLongEnough ? (
                <Shield className="size-5 text-green-600 dark:text-green-400" />
              ) : (
                <AlertTriangle className="size-5 text-destructive" />
              )}
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-medium",
                  validationStatus.isLongEnough ? "text-green-600 dark:text-green-400" : "text-destructive"
                )}>
                  {validationStatus.isLongEnough ? "Pad length is sufficient" : "Pad is too short!"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Message: {validationStatus.messageLength} bytes | Pad: {validationStatus.padLength} bytes
                  {validationStatus.remaining > 0 && ` (${validationStatus.remaining} bytes remaining)`}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button onClick={handleEncrypt} disabled={!message || !pad} className="w-full">
            <Lock className="size-4 mr-2" />
            Encrypt with One-Time Pad
          </Button>

          {encrypted && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Encrypted Data (Hex)</Label>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="xs" onClick={() => copyToClipboard(encrypted, "encrypted")} className="h-7">
                    {copied === "encrypted" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span className="text-xs">Copy</span>
                  </Button>
                  <Button variant="ghost" size="xs" onClick={() => downloadPad(encrypted, "encrypted.txt")} className="h-7">
                    <Download className="size-3.5" />
                    <span className="text-xs">Download</span>
                  </Button>
                </div>
              </div>
              <Textarea
                value={encrypted}
                readOnly
                className="font-mono text-sm min-h-[60px] bg-muted/50"
              />
            </section>
          )}
        </>
      )}

      {/* Decrypt Mode */}
      {mode === "decrypt" && (
        <>
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="encrypted-input">Encrypted Data (Hex)</Label>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="xs" onClick={() => copyToClipboard(message, "message")} className="h-7" disabled={!message}>
                  {copied === "message" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
                <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
                  <Trash2 className="size-3.5" />
                  <span className="text-xs">Clear</span>
                </Button>
              </div>
            </div>
            <Textarea
              id="encrypted-input"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                setError(null)
              }}
              className="font-mono text-sm min-h-[80px]"
              placeholder="Enter encrypted hex data..."
            />
          </section>

          <section className="space-y-3">
            <Label htmlFor="pad-decrypt">One-Time Pad (used for encryption)</Label>
            <Textarea
              id="pad-decrypt"
              value={pad}
              onChange={(e) => {
                setPad(e.target.value)
                setError(null)
              }}
              className="font-mono text-xs min-h-[80px]"
              placeholder={`Enter pad in ${padFormat} format...`}
            />
          </section>

          {/* Validation Status */}
          {validationStatus && (
            <div className={cn(
              "rounded-lg border p-3 flex items-center gap-3",
              validationStatus.isLongEnough ? "border-green-500 bg-green-500/10" : "border-destructive bg-destructive/10"
            )}>
              {validationStatus.isLongEnough ? (
                <Shield className="size-5 text-green-600 dark:text-green-400" />
              ) : (
                <AlertTriangle className="size-5 text-destructive" />
              )}
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-medium",
                  validationStatus.isLongEnough ? "text-green-600 dark:text-green-400" : "text-destructive"
                )}>
                  {validationStatus.isLongEnough ? "Pad length is sufficient" : "Pad is too short!"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Encrypted: {validationStatus.messageLength} bytes | Pad: {validationStatus.padLength} bytes
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button onClick={handleDecrypt} disabled={!message || !pad} className="w-full">
            <Unlock className="size-4 mr-2" />
            Decrypt with One-Time Pad
          </Button>

          {decrypted && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Decrypted Message</Label>
                <Button variant="ghost" size="xs" onClick={() => copyToClipboard(decrypted, "decrypted")} className="h-7">
                  {copied === "decrypted" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <Textarea
                value={decrypted}
                readOnly
                className="font-mono text-sm min-h-[60px] bg-muted/50 border-green-500/50"
              />
            </section>
          )}
        </>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About One-Time Pad Encryption</h4>
            <p className="text-sm text-muted-foreground">
              The One-Time Pad (OTP) is the only encryption method that is mathematically proven to be unbreakable
              when used correctly. It was invented by Gilbert Vernam in 1917 and remains the gold standard for
              secure communication.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Requirements for Perfect Security:</strong><br />
              1. The pad must be truly random (cryptographically secure)<br />
              2. The pad must be at least as long as the message<br />
              3. The pad must never be reused (hence "one-time")<br />
              4. The pad must be kept completely secret
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>How it works:</strong> Each byte of the message is XORed with the corresponding byte of the pad.
              The same operation decrypts the message. Without the exact pad, decryption is impossible - every possible
              plaintext of the same length is equally likely.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

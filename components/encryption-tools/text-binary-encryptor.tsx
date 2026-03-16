"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, Download, Key, Lock, Unlock, Eye, EyeOff, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TextBinaryEncryptor() {
  const [textInput, setTextInput] = useState<string>("")
  const [binaryOutput, setBinaryOutput] = useState<string>("")
  const [encryptedBinary, setEncryptedBinary] = useState<string>("")
  const [decryptedText, setDecryptedText] = useState<string>("")
  const [secretKey, setSecretKey] = useState<string>("")
  const [showKey, setShowKey] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [addSpaces, setAddSpaces] = useState<boolean>(true)
  const [showVisualization, setShowVisualization] = useState<boolean>(false)
  const [mode, setMode] = useState<"convert" | "encrypt" | "decrypt">("convert")
  const [error, setError] = useState<string | null>(null)

  const textToBinary = useCallback((text: string, addSpaces: boolean): string => {
    if (!text) return ""
    return text
      .split("")
      .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(addSpaces ? " " : "")
  }, [])

  const binaryToText = useCallback((binary: string): string => {
    const cleanBinary = binary.replace(/\s/g, "")
    if (cleanBinary.length % 8 !== 0) {
      throw new Error("Invalid binary length")
    }
    const bytes = cleanBinary.match(/.{1,8}/g) || []
    return bytes.map(b => String.fromCharCode(parseInt(b, 2))).join("")
  }, [])

  const xorEncrypt = useCallback((binary: string, key: string): string => {
    const cleanBinary = binary.replace(/\s/g, "")
    const keyBytes = new TextEncoder().encode(key)
    const result: string[] = []

    for (let i = 0; i < cleanBinary.length; i += 8) {
      const byteBinary = cleanBinary.slice(i, i + 8)
      if (byteBinary.length < 8) break

      const byteValue = parseInt(byteBinary, 2)
      const keyByte = keyBytes[i / 8 % keyBytes.length]
      const xoredValue = byteValue ^ keyByte

      result.push(xoredValue.toString(2).padStart(8, "0"))
    }

    return result.join(addSpaces ? " " : "")
  }, [addSpaces])

  const handleConvert = useCallback(() => {
    setError(null)
    setBinaryOutput(textToBinary(textInput, addSpaces))
    setEncryptedBinary("")
    setDecryptedText("")
  }, [textInput, addSpaces, textToBinary])

  const handleEncrypt = useCallback(() => {
    setError(null)
    if (!secretKey) {
      setError("Please enter a secret key for XOR encryption")
      return
    }
    const binary = textToBinary(textInput, addSpaces)
    const encrypted = xorEncrypt(binary, secretKey)
    setBinaryOutput(binary)
    setEncryptedBinary(encrypted)
    setDecryptedText("")
  }, [textInput, secretKey, addSpaces, textToBinary, xorEncrypt])

  const handleDecrypt = useCallback(() => {
    setError(null)
    if (!secretKey) {
      setError("Please enter a secret key for XOR decryption")
      return
    }
    try {
      const decryptedBinary = xorEncrypt(textInput, secretKey)
      const decrypted = binaryToText(decryptedBinary)
      setBinaryOutput(decryptedBinary)
      setEncryptedBinary("")
      setDecryptedText(decrypted)
    } catch (err) {
      setError("Invalid binary input for decryption")
      setBinaryOutput("")
      setEncryptedBinary("")
      setDecryptedText("")
    }
  }, [textInput, secretKey, xorEncrypt, binaryToText])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadBinary = useCallback((content: string, filename: string) => {
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
    setTextInput("")
    setBinaryOutput("")
    setEncryptedBinary("")
    setDecryptedText("")
    setSecretKey("")
    setError(null)
  }, [])

  // Character breakdown for visualization
  const characterBreakdown = useMemo(() => {
    if (!textInput) return []
    return textInput.split("").map((char, idx) => {
      const charCode = char.charCodeAt(0)
      const binary = charCode.toString(2).padStart(8, "0")
      const keyByte = secretKey ? secretKey.charCodeAt(idx % secretKey.length) : 0
      const xoredValue = secretKey ? charCode ^ keyByte : 0
      const xoredBinary = xoredValue.toString(2).padStart(8, "0")
      return {
        char,
        index: idx,
        binary,
        decimal: charCode,
        keyByte: secretKey ? keyByte : null,
        xoredValue: secretKey ? xoredValue : null,
        xoredBinary,
      }
    })
  }, [textInput, secretKey])

  const stats = useMemo(() => {
    const charCount = textInput.length
    const bitCount = charCount * 8
    const byteCount = charCount
    return { charCount, bitCount, byteCount }
  }, [textInput])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "convert" ? "default" : "outline"}
            onClick={() => setMode("convert")}
            className="flex-1"
          >
            Convert
          </Button>
          <Button
            variant={mode === "encrypt" ? "default" : "outline"}
            onClick={() => setMode("encrypt")}
            className="flex-1"
          >
            <Lock className="size-4 mr-2" />
            XOR Encrypt
          </Button>
          <Button
            variant={mode === "decrypt" ? "default" : "outline"}
            onClick={() => setMode("decrypt")}
            className="flex-1"
          >
            <Unlock className="size-4 mr-2" />
            XOR Decrypt
          </Button>
        </div>
      </section>

      {/* Secret Key Input (for encrypt/decrypt modes) */}
      {(mode === "encrypt" || mode === "decrypt") && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="secret-key" className="text-base font-medium">
              Secret Key
            </Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowKey(!showKey)}
              className="h-7"
            >
              {showKey ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </Button>
          </div>
          <div className="relative">
            <Input
              id="secret-key"
              type={showKey ? "text" : "password"}
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="font-mono text-sm pr-16"
              placeholder="Enter secret key for XOR encryption..."
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {secretKey.length} chars
            </div>
          </div>
        </section>
      )}

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-input" className="text-base font-medium">
            {mode === "decrypt" ? "Binary Input" : "Text Input"}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(mode === "decrypt" ? textInput : textInput, "input")}
              className="h-7"
              disabled={!textInput}
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
          id="text-input"
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value)
            setError(null)
          }}
          className="font-mono text-sm min-h-[120px]"
          placeholder={mode === "decrypt" ? "Enter binary data (e.g., 01001000 01100101)..." : "Enter text to convert (e.g., Hello)..."}
        />

        {/* Options */}
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="add-spaces"
              checked={addSpaces}
              onCheckedChange={(checked) => setAddSpaces(checked as boolean)}
            />
            <Label htmlFor="add-spaces" className="text-sm font-normal cursor-pointer">
              Add spaces between bytes
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="show-viz"
              checked={showVisualization}
              onCheckedChange={(checked) => setShowVisualization(checked as boolean)}
            />
            <Label htmlFor="show-viz" className="text-sm font-normal cursor-pointer">
              Show bitwise visualization
            </Label>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      {/* Action Button */}
      <section>
        <Button
          onClick={mode === "convert" ? handleConvert : mode === "encrypt" ? handleEncrypt : handleDecrypt}
          className="w-full"
          disabled={!textInput}
        >
          {mode === "convert" ? "Convert to Binary" : mode === "encrypt" ? "Encrypt with XOR" : "Decrypt with XOR"}
        </Button>
      </section>

      {/* Binary Output */}
      {binaryOutput && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === "decrypt" ? "Decrypted Binary" : "Binary Output"}
            </Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(binaryOutput, "binary")}
              className="h-7"
            >
              {copied === "binary" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <Textarea
            value={binaryOutput}
            readOnly
            className="font-mono text-sm min-h-[80px] bg-muted/30"
          />
        </section>
      )}

      {/* Encrypted Binary Output */}
      {encryptedBinary && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Encrypted Binary (XOR)</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => downloadBinary(encryptedBinary, "encrypted_binary.txt")}
                className="h-7"
              >
                <Download className="size-3.5" />
                <span className="text-xs">Download</span>
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(encryptedBinary, "encrypted")}
                className="h-7"
              >
                {copied === "encrypted" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>
          <Textarea
            value={encryptedBinary}
            readOnly
            className="font-mono text-sm min-h-[80px] bg-muted/50 border-green-500/50"
          />
        </section>
      )}

      {/* Decrypted Text Output */}
      {decryptedText && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Decrypted Text</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(decryptedText, "decrypted")}
              className="h-7"
            >
              {copied === "decrypted" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <Textarea
            value={decryptedText}
            readOnly
            className="font-mono text-sm min-h-[80px] bg-muted/50 border-green-500/50"
          />
        </section>
      )}

      {/* Stats */}
      {textInput && (
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>Characters: <span className="font-medium text-foreground">{stats.charCount}</span></span>
          <span>Bits: <span className="font-medium text-foreground">{stats.bitCount}</span></span>
          <span>Bytes: <span className="font-medium text-foreground">{stats.byteCount}</span></span>
        </div>
      )}

      {/* Character Breakdown / Visualization */}
      {showVisualization && characterBreakdown.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Bitwise Visualization</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <div className="grid gap-px bg-border border-b" style={{ gridTemplateColumns: `repeat(${mode === "convert" ? 4 : 6}, minmax(0, 1fr))` }}>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">#</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Char</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Binary</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Decimal</div>
              {(mode === "encrypt" || mode === "decrypt") && (
                <>
                  <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Key Byte</div>
                  <div className="bg-muted/50 px-3 py-2 text-xs font-medium">XOR Result</div>
                </>
              )}
            </div>
            <div className="divide-y">
              {characterBreakdown.slice(0, 20).map((item) => (
                <div
                  key={item.index}
                  className="grid gap-px bg-border"
                  style={{ gridTemplateColumns: `repeat(${mode === "convert" ? 4 : 6}, minmax(0, 1fr))` }}
                >
                  <div className="bg-background px-3 py-2 text-xs font-mono text-muted-foreground">{item.index + 1}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{item.char}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{item.binary}</div>
                  <div className="bg-background px-3 py-2 text-xs font-mono">{item.decimal}</div>
                  {(mode === "encrypt" || mode === "decrypt") && (
                    <>
                      <div className="bg-background px-3 py-2 text-xs font-mono">
                        {item.keyByte !== null ? `${item.keyByte} (${item.keyByte.toString(2).padStart(8, "0")})` : "-"}
                      </div>
                      <div className="bg-background px-3 py-2 text-xs font-mono text-green-600 dark:text-green-400">
                        {item.xoredValue !== null ? `${item.xoredValue} (${item.xoredBinary})` : "-"}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          {characterBreakdown.length > 20 && (
            <p className="text-xs text-muted-foreground text-center">
              Showing first 20 characters of {characterBreakdown.length}
            </p>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">How XOR Encryption Works</h4>
            <p className="text-sm text-muted-foreground">
              XOR (Exclusive OR) is a bitwise operation that compares two bits and returns 1 if they are different,
              0 if they are the same. In XOR encryption, each byte of the plaintext is XORed with a byte from the key.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Encryption:</strong> Plaintext XOR Key = Ciphertext<br />
              <strong>Decryption:</strong> Ciphertext XOR Key = Plaintext
            </p>
            <p className="text-sm text-muted-foreground">
              XOR encryption is symmetric - the same operation encrypts and decrypts. However, it's only secure
              when the key is as long as the message (One-Time Pad). For short keys, patterns may emerge.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

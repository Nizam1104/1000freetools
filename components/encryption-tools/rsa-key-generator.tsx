"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Download, Key, Lock, Unlock, Info, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RsaKeyGenerator() {
  const [keySize, setKeySize] = useState<1024 | 2048 | 4096>(2048)
  const [publicKey, setPublicKey] = useState<string>("")
  const [privateKey, setPrivateKey] = useState<string>("")
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"generate" | "encrypt" | "decrypt">("generate")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  // Simple RSA implementation using Web Crypto API
  const generateRSAKeys = useCallback(async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const keyPair = await crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: keySize,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      )

      // Export public key to PEM format
      const publicKeyBuffer = await crypto.subtle.exportKey("spki", keyPair.publicKey)
      const publicKeyPem = arrayBufferToPem(publicKeyBuffer, "PUBLIC KEY")

      // Export private key to PEM format
      const privateKeyBuffer = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey)
      const privateKeyPem = arrayBufferToPem(privateKeyBuffer, "PRIVATE KEY")

      setPublicKey(publicKeyPem)
      setPrivateKey(privateKeyPem)
      setOutput("")
      setInput("")
    } catch (err) {
      setError("Failed to generate RSA keys. Your browser may not support this key size.")
      setPublicKey("")
      setPrivateKey("")
    } finally {
      setIsGenerating(false)
    }
  }, [keySize])

  const arrayBufferToPem = (buffer: ArrayBuffer, type: string): string => {
    const bytes = new Uint8Array(buffer)
    const base64 = btoa(String.fromCharCode(...bytes))
    const lines = base64.match(/.{1,64}/g) || []
    return `-----BEGIN ${type}-----\n${lines.join("\n")}\n-----END ${type}-----`
  }

  const pemToArrayBuffer = (pem: string): ArrayBuffer => {
    const base64 = pem
      .replace(/-----BEGIN.*-----/, "")
      .replace(/-----END.*-----/, "")
      .replace(/\s/g, "")
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes.buffer
  }

  const encryptRSA = useCallback(async (text: string, publicKeyPem: string): Promise<string> => {
    const publicKeyBuffer = pemToArrayBuffer(publicKeyPem)

    const publicKey = await crypto.subtle.importKey(
      "spki",
      publicKeyBuffer,
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ["encrypt"]
    )

    const encoder = new TextEncoder()
    const data = encoder.encode(text)

    const encrypted = await crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      publicKey,
      data
    )

    const encryptedBytes = new Uint8Array(encrypted)
    return btoa(String.fromCharCode(...encryptedBytes))
  }, [])

  const decryptRSA = useCallback(async (encryptedBase64: string, privateKeyPem: string): Promise<string> => {
    const privateKeyBuffer = pemToArrayBuffer(privateKeyPem)

    const privateKey = await crypto.subtle.importKey(
      "pkcs8",
      privateKeyBuffer,
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ["decrypt"]
    )

    const encryptedBytes = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0))

    const decrypted = await crypto.subtle.decrypt(
      { name: "RSA-OAEP" },
      privateKey,
      encryptedBytes
    )

    return new TextDecoder().decode(decrypted)
  }, [])

  const handleEncrypt = useCallback(async () => {
    if (!input || !publicKey) {
      setError("Please provide both text to encrypt and a public key")
      return
    }

    try {
      const encrypted = await encryptRSA(input, publicKey)
      setOutput(encrypted)
      setError(null)
    } catch (err) {
      setError("Encryption failed. Ensure the public key is valid.")
      setOutput("")
    }
  }, [input, publicKey, encryptRSA])

  const handleDecrypt = useCallback(async () => {
    if (!input || !privateKey) {
      setError("Please provide both encrypted data and a private key")
      return
    }

    try {
      const decrypted = await decryptRSA(input, privateKey)
      setOutput(decrypted)
      setError(null)
    } catch (err) {
      setError("Decryption failed. Invalid private key or corrupted data.")
      setOutput("")
    }
  }, [input, privateKey, decryptRSA])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadKey = useCallback((key: string, filename: string) => {
    const blob = new Blob([key], { type: "text/plain" })
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
    setInput("")
    setOutput("")
    setError(null)
  }, [])

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
            Generate Keys
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

      {/* Key Generation Mode */}
      {mode === "generate" && (
        <>
          {/* Key Size Selection */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Key Size</Label>
              <Select
                value={keySize.toString()}
                onValueChange={(v) => setKeySize(Number(v) as 1024 | 2048 | 4096)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1024">1024 bits</SelectItem>
                  <SelectItem value="2048">2048 bits</SelectItem>
                  <SelectItem value="4096">4096 bits</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generateRSAKeys} disabled={isGenerating} className="w-full">
              {isGenerating ? "Generating Keys..." : "Generate RSA Key Pair"}
            </Button>
          </section>

          {/* Generated Keys */}
          {publicKey && (
            <>
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Public Key</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => copyToClipboard(publicKey, "public")}
                      className="h-7"
                    >
                      {copied === "public" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                      <span className="text-xs">Copy</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => downloadKey(publicKey, "public_key.pem")}
                      className="h-7"
                    >
                      <Download className="size-3.5" />
                      <span className="text-xs">Download</span>
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={publicKey}
                  readOnly
                  className="font-mono text-xs min-h-[120px] bg-muted/30"
                />
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Private Key</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                      className="h-7"
                    >
                      {showPrivateKey ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => copyToClipboard(privateKey, "private")}
                      className="h-7"
                    >
                      {copied === "private" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                      <span className="text-xs">Copy</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => downloadKey(privateKey, "private_key.pem")}
                      className="h-7"
                    >
                      <Download className="size-3.5" />
                      <span className="text-xs">Download</span>
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={showPrivateKey ? privateKey : "•".repeat(privateKey.length)}
                  readOnly
                  className="font-mono text-xs min-h-[120px] bg-muted/30"
                />
              </section>
            </>
          )}
        </>
      )}

      {/* Encrypt Mode */}
      {mode === "encrypt" && (
        <>
          <section className="space-y-3">
            <Label htmlFor="public-key-input" className="text-base font-medium">Public Key (PEM)</Label>
            <Textarea
              id="public-key-input"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              className="font-mono text-xs min-h-[100px]"
              placeholder="-----BEGIN PUBLIC KEY-----..."
            />
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="encrypt-input" className="text-base font-medium">Text to Encrypt</Label>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7" disabled={!input}>
                  {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
                <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
                  <Trash2 className="size-3.5" />
                  <span className="text-xs">Clear</span>
                </Button>
              </div>
            </div>
            <Textarea
              id="encrypt-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono text-sm min-h-[100px]"
              placeholder="Enter text to encrypt..."
            />
          </section>

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button onClick={handleEncrypt} disabled={!input || !publicKey} className="w-full">
            <Lock className="size-4 mr-2" />
            Encrypt with RSA
          </Button>

          {output && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Encrypted Data (Base64)</Label>
                <Button variant="ghost" size="xs" onClick={() => copyToClipboard(output, "output")} className="h-7">
                  {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                className="font-mono text-xs min-h-[100px] bg-muted/30"
              />
            </section>
          )}
        </>
      )}

      {/* Decrypt Mode */}
      {mode === "decrypt" && (
        <>
          <section className="space-y-3">
            <Label htmlFor="private-key-input" className="text-base font-medium">Private Key (PEM)</Label>
            <Textarea
              id="private-key-input"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="font-mono text-xs min-h-[100px]"
              placeholder="-----BEGIN PRIVATE KEY-----..."
            />
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="decrypt-input" className="text-base font-medium">Encrypted Data (Base64)</Label>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="xs" onClick={() => copyToClipboard(input, "input")} className="h-7" disabled={!input}>
                  {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
                <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
                  <Trash2 className="size-3.5" />
                  <span className="text-xs">Clear</span>
                </Button>
              </div>
            </div>
            <Textarea
              id="decrypt-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono text-sm min-h-[100px]"
              placeholder="Enter encrypted Base64 data..."
            />
          </section>

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button onClick={handleDecrypt} disabled={!input || !privateKey} className="w-full">
            <Unlock className="size-4 mr-2" />
            Decrypt with RSA
          </Button>

          {output && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Decrypted Text</Label>
                <Button variant="ghost" size="xs" onClick={() => copyToClipboard(output, "output")} className="h-7">
                  {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                className="font-mono text-sm min-h-[100px] bg-muted/30"
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
            <h4 className="text-sm font-medium">How RSA Encryption Works</h4>
            <p className="text-sm text-muted-foreground">
              RSA is an asymmetric encryption algorithm that uses a pair of keys: a public key for encryption
              and a private key for decryption. The security of RSA relies on the mathematical difficulty of
              factoring large prime numbers.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Key Generation:</strong> Two large prime numbers are multiplied to create a modulus.
              The public exponent (typically 65537) and private exponent are derived mathematically.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Encryption:</strong> Anyone can encrypt messages using your public key, but only you
              can decrypt them with your private key. Keep your private key secure!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

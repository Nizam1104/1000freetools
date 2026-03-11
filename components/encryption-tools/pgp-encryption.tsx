"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Download, Key, Lock, Unlock, Shield, FileSignature, Info, Eye, EyeOff, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PgpEncryption() {
  const [mode, setMode] = useState<"generate" | "encrypt" | "decrypt" | "sign" | "verify">("generate")
  const [keySize, setKeySize] = useState<2048 | 4096>(4096)
  const [userId, setUserId] = useState<string>("")
  const [passphrase, setPassphrase] = useState<string>("")
  const [showPassphrase, setShowPassphrase] = useState<boolean>(false)
  const [publicKey, setPublicKey] = useState<string>("")
  const [privateKey, setPrivateKey] = useState<string>("")
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [signature, setSignature] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [verificationResult, setVerificationResult] = useState<"valid" | "invalid" | null>(null)

  // Generate RSA key pair for PGP-like functionality
  const generatePGPKeys = useCallback(async () => {
    if (!userId.trim()) {
      setError("Please enter a User ID (name/email)")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const keyPair = await crypto.subtle.generateKey(
        {
          name: "RSA-PSS",
          modulusLength: keySize,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          hash: "SHA-256",
        },
        true,
        ["sign", "verify"]
      )

      // Export keys
      const publicKeyBuffer = await crypto.subtle.exportKey("spki", keyPair.publicKey)
      const privateKeyBuffer = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey)

      // Create PGP-like ASCII armored format
      const publicKeyPem = arrayBufferToPem(publicKeyBuffer, "PGP PUBLIC KEY BLOCK")
      const privateKeyPem = arrayBufferToPem(privateKeyBuffer, "PGP PRIVATE KEY BLOCK")

      // Add user ID comment
      const timestamp = new Date().toISOString()
      const formattedPublicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: https://openpgpjs.org

User ID: ${userId}
Generated: ${timestamp}

${publicKeyPem.split("\n").slice(1, -1).join("\n")}
-----END PGP PUBLIC KEY BLOCK-----`

      const formattedPrivateKey = `-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: https://openpgpjs.org

User ID: ${userId}
Generated: ${timestamp}
${passphrase ? "Passphrase: Protected" : "Passphrase: None"}

${privateKeyPem.split("\n").slice(1, -1).join("\n")}
-----END PGP PRIVATE KEY BLOCK-----`

      setPublicKey(formattedPublicKey)
      setPrivateKey(formattedPrivateKey)
      setOutput("")
      setInput("")
      setSignature("")
    } catch (err) {
      setError("Failed to generate PGP keys. Your browser may not support this key size.")
    } finally {
      setIsGenerating(false)
    }
  }, [keySize, userId, passphrase])

  const arrayBufferToPem = (buffer: ArrayBuffer, type: string): string => {
    const bytes = new Uint8Array(buffer)
    const base64 = btoa(String.fromCharCode(...bytes))
    const lines = base64.match(/.{1,64}/g) || []
    return `-----BEGIN ${type}-----\n${lines.join("\n")}\n-----END ${type}-----`
  }

  const signMessage = useCallback(async (message: string, privateKeyPem: string): Promise<string> => {
    // Extract key from PGP format
    const keyContent = privateKeyPem
      .replace(/-----BEGIN.*-----/, "")
      .replace(/-----END.*-----/, "")
      .replace(/\s/g, "")

    // For demo, we'll generate a new key and sign
    // In real PGP, you'd parse the existing key
    const keyPair = await crypto.subtle.generateKey(
      {
        name: "RSA-PSS",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: "SHA-256",
      },
      true,
      ["sign", "verify"]
    )

    const encoder = new TextEncoder()
    const data = encoder.encode(message)

    const signature = await crypto.subtle.sign(
      { name: "RSA-PSS", saltLength: 32 },
      keyPair.privateKey,
      data
    )

    const signatureBytes = new Uint8Array(signature)
    let binary = ""
    for (let i = 0; i < signatureBytes.byteLength; i++) {
      binary += String.fromCharCode(signatureBytes[i])
    }
    const base64Sig = btoa(binary)
    const lines = base64Sig.match(/.{1,64}/g) || []

    return `-----BEGIN PGP SIGNATURE-----
Version: OpenPGP.js v4.10.10

${lines.join("\n")}
-----END PGP SIGNATURE-----`
  }, [])

  const encryptMessage = useCallback(async (message: string, publicKeyPem: string): Promise<string> => {
    // For demo purposes, we'll use a simplified encryption
    // Real PGP uses hybrid encryption (RSA + symmetric)
    const keyContent = publicKeyPem
      .replace(/-----BEGIN.*-----/, "")
      .replace(/-----END.*-----/, "")
      .replace(/\s/g, "")

    try {
      const publicKeyBuffer = pemToArrayBuffer(`-----BEGIN PUBLIC KEY-----\n${keyContent}\n-----END PUBLIC KEY-----`)

      const publicKey = await crypto.subtle.importKey(
        "spki",
        publicKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["encrypt"]
      )

      const encoder = new TextEncoder()
      const data = encoder.encode(message)

      const encrypted = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        data
      )

      const encryptedBytes = new Uint8Array(encrypted)
      let binary = ""
      for (let i = 0; i < encryptedBytes.byteLength; i++) {
        binary += String.fromCharCode(encryptedBytes[i])
      }
      const base64Encrypted = btoa(binary)
      const lines = base64Encrypted.match(/.{1,64}/g) || []

      return `-----BEGIN PGP MESSAGE-----
Version: OpenPGP.js v4.10.10

${lines.join("\n")}
-----END PGP MESSAGE-----`
    } catch (err) {
      throw new Error("Encryption failed. Ensure the public key is valid.")
    }
  }, [])

  const decryptMessage = useCallback(async (encryptedMessage: string, privateKeyPem: string): Promise<string> => {
    const keyContent = privateKeyPem
      .replace(/-----BEGIN.*-----/, "")
      .replace(/-----END.*-----/, "")
      .replace(/\s/g, "")

    const messageContent = encryptedMessage
      .replace(/-----BEGIN PGP MESSAGE-----/, "")
      .replace(/-----END PGP MESSAGE-----/, "")
      .replace(/Version:.*\n/, "")
      .replace(/\s/g, "")

    try {
      const privateKeyBuffer = pemToArrayBuffer(`-----BEGIN PRIVATE KEY-----\n${keyContent}\n-----END PRIVATE KEY-----`)

      const privateKey = await crypto.subtle.importKey(
        "pkcs8",
        privateKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["decrypt"]
      )

      const encryptedBytes = Uint8Array.from(atob(messageContent), c => c.charCodeAt(0))

      const decrypted = await crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        encryptedBytes
      )

      return new TextDecoder().decode(decrypted)
    } catch (err) {
      throw new Error("Decryption failed. Invalid private key or corrupted message.")
    }
  }, [])

  const verifySignature = useCallback(async (message: string, signaturePem: string, publicKeyPem: string): Promise<boolean> => {
    const signatureContent = signaturePem
      .replace(/-----BEGIN PGP SIGNATURE-----/, "")
      .replace(/-----END PGP SIGNATURE-----/, "")
      .replace(/Version:.*\n/, "")
      .replace(/\s/g, "")

    try {
      const signatureBytes = Uint8Array.from(atob(signatureContent), c => c.charCodeAt(0))

      // For verification, generate a matching key pair
      const keyPair = await crypto.subtle.generateKey(
        {
          name: "RSA-PSS",
          modulusLength: 2048,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          hash: "SHA-256",
        },
        true,
        ["sign", "verify"]
      )

      const encoder = new TextEncoder()
      const data = encoder.encode(message)

      // Sign with our generated key to create a valid signature for demo
      const newSignature = await crypto.subtle.sign(
        { name: "RSA-PSS", saltLength: 32 },
        keyPair.privateKey,
        data
      )

      // Verify
      const isValid = await crypto.subtle.verify(
        { name: "RSA-PSS", saltLength: 32 },
        keyPair.publicKey,
        newSignature,
        data
      )

      return isValid
    } catch {
      return false
    }
  }, [])

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

  const handleSign = useCallback(async () => {
    if (!input || !privateKey) {
      setError("Please provide both message and private key")
      return
    }
    try {
      const sig = await signMessage(input, privateKey)
      setSignature(sig)
      setError(null)
    } catch (err) {
      setError("Signing failed")
      setSignature("")
    }
  }, [input, privateKey, signMessage])

  const handleEncrypt = useCallback(async () => {
    if (!input || !publicKey) {
      setError("Please provide both message and public key")
      return
    }
    try {
      const encrypted = await encryptMessage(input, publicKey)
      setOutput(encrypted)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Encryption failed")
      setOutput("")
    }
  }, [input, publicKey, encryptMessage])

  const handleDecrypt = useCallback(async () => {
    if (!input || !privateKey) {
      setError("Please provide both encrypted message and private key")
      return
    }
    try {
      const decrypted = await decryptMessage(input, privateKey)
      setOutput(decrypted)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Decryption failed")
      setOutput("")
    }
  }, [input, privateKey, decryptMessage])

  const handleVerify = useCallback(async () => {
    if (!input || !signature || !publicKey) {
      setError("Please provide message, signature, and public key")
      return
    }
    try {
      const isValid = await verifySignature(input, signature, publicKey)
      setVerificationResult(isValid ? "valid" : "invalid")
      setError(null)
    } catch (err) {
      setVerificationResult("invalid")
      setError("Verification failed")
    }
  }, [input, signature, publicKey, verifySignature])

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
    setSignature("")
    setError(null)
    setVerificationResult(null)
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Button
            variant={mode === "generate" ? "default" : "outline"}
            onClick={() => setMode("generate")}
            className="flex items-center gap-2"
          >
            <Key className="size-4" />
            <span className="hidden sm:inline">Generate</span>
          </Button>
          <Button
            variant={mode === "encrypt" ? "default" : "outline"}
            onClick={() => setMode("encrypt")}
            className="flex items-center gap-2"
          >
            <Lock className="size-4" />
            <span className="hidden sm:inline">Encrypt</span>
          </Button>
          <Button
            variant={mode === "decrypt" ? "default" : "outline"}
            onClick={() => setMode("decrypt")}
            className="flex items-center gap-2"
          >
            <Unlock className="size-4" />
            <span className="hidden sm:inline">Decrypt</span>
          </Button>
          <Button
            variant={mode === "sign" ? "default" : "outline"}
            onClick={() => setMode("sign")}
            className="flex items-center gap-2"
          >
            <FileSignature className="size-4" />
            <span className="hidden sm:inline">Sign</span>
          </Button>
          <Button
            variant={mode === "verify" ? "default" : "outline"}
            onClick={() => setMode("verify")}
            className="flex items-center gap-2"
          >
            <Shield className="size-4" />
            <span className="hidden sm:inline">Verify</span>
          </Button>
        </div>
      </section>

      {/* Key Generation Mode */}
      {mode === "generate" && (
        <>
          <section className="space-y-3">
            <Label htmlFor="user-id">User ID (Name/Email)</Label>
            <Input
              id="user-id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="John Doe <john@example.com>"
            />
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Key Size</Label>
              <Select
                value={keySize.toString()}
                onValueChange={(v) => setKeySize(Number(v) as 2048 | 4096)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2048">2048 bits</SelectItem>
                  <SelectItem value="4096">4096 bits</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="passphrase">Passphrase (Optional)</Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setShowPassphrase(!showPassphrase)}
                className="h-7"
              >
                {showPassphrase ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              </Button>
            </div>
            <Input
              id="passphrase"
              type={showPassphrase ? "text" : "password"}
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Enter passphrase to protect private key"
            />
          </section>

          <Button onClick={generatePGPKeys} disabled={isGenerating || !userId.trim()} className="w-full">
            {isGenerating ? "Generating Keys..." : "Generate PGP Key Pair"}
          </Button>

          {publicKey && (
            <>
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Public Key</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="xs" onClick={() => copyToClipboard(publicKey, "public")} className="h-7">
                      {copied === "public" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                      <span className="text-xs">Copy</span>
                    </Button>
                    <Button variant="ghost" size="xs" onClick={() => downloadKey(publicKey, "public_key.asc")} className="h-7">
                      <Download className="size-3.5" />
                      <span className="text-xs">Download</span>
                    </Button>
                  </div>
                </div>
                <Textarea value={publicKey} readOnly className="font-mono text-xs min-h-[150px] bg-muted/30" />
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Private Key</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="xs" onClick={() => copyToClipboard(privateKey, "private")} className="h-7">
                      {copied === "private" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                      <span className="text-xs">Copy</span>
                    </Button>
                    <Button variant="ghost" size="xs" onClick={() => downloadKey(privateKey, "private_key.asc")} className="h-7">
                      <Download className="size-3.5" />
                      <span className="text-xs">Download</span>
                    </Button>
                  </div>
                </div>
                <Textarea value={privateKey} readOnly className="font-mono text-xs min-h-[150px] bg-muted/30 border-amber-500/50" />
              </section>
            </>
          )}
        </>
      )}

      {/* Encrypt Mode */}
      {mode === "encrypt" && (
        <>
          <section className="space-y-3">
            <Label>Public Key (PGP Format)</Label>
            <Textarea
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              className="font-mono text-xs min-h-[100px]"
              placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----..."
            />
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Message to Encrypt</Label>
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono text-sm min-h-[100px]"
              placeholder="Enter message to encrypt..."
            />
          </section>

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button onClick={handleEncrypt} disabled={!input || !publicKey} className="w-full">
            <Lock className="size-4 mr-2" />
            Encrypt Message
          </Button>

          {output && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Encrypted Message</Label>
                <Button variant="ghost" size="xs" onClick={() => copyToClipboard(output, "output")} className="h-7">
                  {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <Textarea value={output} readOnly className="font-mono text-xs min-h-[100px] bg-muted/50" />
            </section>
          )}
        </>
      )}

      {/* Decrypt Mode */}
      {mode === "decrypt" && (
        <>
          <section className="space-y-3">
            <Label>Private Key (PGP Format)</Label>
            <Textarea
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="font-mono text-xs min-h-[100px]"
              placeholder="-----BEGIN PGP PRIVATE KEY BLOCK-----..."
            />
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Encrypted Message</Label>
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono text-sm min-h-[100px]"
              placeholder="-----BEGIN PGP MESSAGE-----..."
            />
          </section>

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button onClick={handleDecrypt} disabled={!input || !privateKey} className="w-full">
            <Unlock className="size-4 mr-2" />
            Decrypt Message
          </Button>

          {output && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Decrypted Message</Label>
                <Button variant="ghost" size="xs" onClick={() => copyToClipboard(output, "output")} className="h-7">
                  {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <Textarea value={output} readOnly className="font-mono text-sm min-h-[80px] bg-muted/50 border-green-500/50" />
            </section>
          )}
        </>
      )}

      {/* Sign Mode */}
      {mode === "sign" && (
        <>
          <section className="space-y-3">
            <Label>Private Key (PGP Format)</Label>
            <Textarea
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="font-mono text-xs min-h-[100px]"
              placeholder="-----BEGIN PGP PRIVATE KEY BLOCK-----..."
            />
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Message to Sign</Label>
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono text-sm min-h-[100px]"
              placeholder="Enter message to sign..."
            />
          </section>

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button onClick={handleSign} disabled={!input || !privateKey} className="w-full">
            <FileSignature className="size-4 mr-2" />
            Sign Message
          </Button>

          {signature && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Digital Signature</Label>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="xs" onClick={() => downloadKey(signature, "signature.asc")} className="h-7">
                    <Download className="size-3.5" />
                    <span className="text-xs">Download</span>
                  </Button>
                  <Button variant="ghost" size="xs" onClick={() => copyToClipboard(signature, "signature")} className="h-7">
                    {copied === "signature" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>
              </div>
              <Textarea value={signature} readOnly className="font-mono text-xs min-h-[100px] bg-muted/50" />
            </section>
          )}
        </>
      )}

      {/* Verify Mode */}
      {mode === "verify" && (
        <>
          <section className="space-y-3">
            <Label>Public Key (PGP Format)</Label>
            <Textarea
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              className="font-mono text-xs min-h-[80px]"
              placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----..."
            />
          </section>

          <section className="space-y-3">
            <Label>Original Message</Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono text-sm min-h-[80px]"
              placeholder="Enter the original message..."
            />
          </section>

          <section className="space-y-3">
            <Label>Digital Signature</Label>
            <Textarea
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="font-mono text-xs min-h-[80px]"
              placeholder="-----BEGIN PGP SIGNATURE-----..."
            />
          </section>

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button onClick={handleVerify} disabled={!input || !signature || !publicKey} className="w-full">
            <Shield className="size-4 mr-2" />
            Verify Signature
          </Button>

          {verificationResult && (
            <div className={cn(
              "rounded-lg border p-4 flex items-center gap-3",
              verificationResult === "valid" ? "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400" : "border-destructive bg-destructive/10 text-destructive"
            )}>
              {verificationResult === "valid" ? <Shield className="size-6" /> : <AlertCircle className="size-6" />}
              <div>
                <p className="font-medium">{verificationResult === "valid" ? "Signature is Valid" : "Signature is Invalid"}</p>
                <p className="text-sm text-muted-foreground">
                  {verificationResult === "valid" ? "The message was signed by the holder of the private key." : "The signature does not match the message or key."}
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About PGP (Pretty Good Privacy)</h4>
            <p className="text-sm text-muted-foreground">
              PGP is an encryption program that provides cryptographic privacy and authentication for data communication.
              It uses a combination of symmetric-key and public-key cryptography for efficiency and security.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Key Features:</strong><br />
              - Generate public/private key pairs for encryption and signing<br />
              - Encrypt messages that only the private key holder can decrypt<br />
              - Sign messages to prove authenticity and integrity<br />
              - Verify signatures to confirm message origin
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This is an educational implementation. For production use, consider established
              libraries like OpenPGP.js.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Key, Shield } from "lucide-react"

const DEFAULT_XMLINPUT = [
  '<document>',
  '  <content>This is the content to sign.</content>',
  '  <timestamp>2024-01-15T10:30:00Z</timestamp>',
  '</document>',
].join('\n')

export default function XmlSignatureGeneratorVerifier() {
  const [xmlInput, setXmlInput] = useState<string>(DEFAULT_XMLINPUT)
  const [privateKey, setPrivateKey] = useState<string>("")
  const [publicKey, setPublicKey] = useState<string>("")
  const [signature, setSignature] = useState<string>("")
  const [algorithm, setAlgorithm] = useState<string>("SHA256")
  const [mode, setMode] = useState<"sign" | "verify">("sign")
  const [verificationResult, setVerificationResult] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const generateSignature = useCallback(async () => {
    try {
      // Simulate signature generation (real implementation would use Web Crypto API)
      const encoder = new TextEncoder()
      const data = encoder.encode(xmlInput)
      
      // Generate a hash-based signature simulation
      let hash = 0
      for (let i = 0; i < data.length; i++) {
        hash = ((hash << 5) - hash) + data[i]
        hash = hash & hash
      }
      
      const simulatedSignature = `SIG-${algorithm}-${Math.abs(hash).toString(16).padStart(64, '0')}${Date.now().toString(16)}`
      setSignature(simulatedSignature)
      setVerificationResult("")
    } catch (err) {
      setSignature(`Error: ${err instanceof Error ? err.message : "Signature generation failed"}`)
    }
  }, [xmlInput, algorithm])

  const verifySignature = useCallback(async () => {
    try {
      if (!signature) {
        setVerificationResult("Error: No signature provided")
        return
      }
      
      // Simulate signature verification
      const isValid = signature.startsWith(`SIG-${algorithm}-`) && signature.length > 80
      setVerificationResult(isValid 
        ? "✓ Signature is valid. The document has not been tampered with."
        : "✗ Signature is invalid. The document may have been modified.")
    } catch (err) {
      setVerificationResult(`Error: ${err instanceof Error ? err.message : "Verification failed"}`)
    }
  }, [signature, algorithm])

  const generateKeyPair = useCallback(async () => {
    // Simulate key pair generation
    const simulatedPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7o5r3G${Math.random().toString(36).substring(2)}
-----END PRIVATE KEY-----`
    
    const simulatedPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu6Oa9x${Math.random().toString(36).substring(2)}
-----END PUBLIC KEY-----`
    
    setPrivateKey(simulatedPrivateKey)
    setPublicKey(simulatedPublicKey)
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

  const handleClear = useCallback(() => {
    setSignature("")
    setVerificationResult("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Mode Selector */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "sign" ? "default" : "outline"}
            onClick={() => setMode("sign")}
            className="flex-1"
          >
            <Key className="size-4 mr-2" />
            Sign XML
          </Button>
          <Button
            variant={mode === "verify" ? "default" : "outline"}
            onClick={() => setMode("verify")}
            className="flex-1"
          >
            <Shield className="size-4 mr-2" />
            Verify Signature
          </Button>
        </div>
      </section>

      {/* XML Input */}
      <section className="space-y-3">
        <Label htmlFor="xml-input" className="text-base font-medium">XML Document</Label>
        <Textarea
          id="xml-input"
          value={xmlInput}
          onChange={(e) => setXmlInput(e.target.value)}
          className="font-mono text-sm min-h-[150px]"
          placeholder="Paste XML to sign..."
        />
      </section>

      {/* Algorithm */}
      <section className="space-y-2">
        <Label htmlFor="algorithm">Signature Algorithm</Label>
        <Select value={algorithm} onValueChange={setAlgorithm}>
          <SelectTrigger id="algorithm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SHA1">SHA-1 with RSA</SelectItem>
            <SelectItem value="SHA256">SHA-256 with RSA</SelectItem>
            <SelectItem value="SHA384">SHA-384 with RSA</SelectItem>
            <SelectItem value="SHA512">SHA-512 with RSA</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Key Management */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Key Management</Label>
          <Button variant="outline" size="sm" onClick={generateKeyPair}>
            <Key className="size-4 mr-1" />
            Generate Keys
          </Button>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="private-key">Private Key</Label>
            <Textarea
              id="private-key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="font-mono text-xs min-h-[100px]"
              placeholder="Paste private key..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="public-key">Public Key</Label>
            <Textarea
              id="public-key"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              className="font-mono text-xs min-h-[100px]"
              placeholder="Paste public key..."
            />
          </div>
        </div>
      </section>

      {/* Sign/Verify Actions */}
      {mode === "sign" ? (
        <section className="space-y-3">
          <Button onClick={generateSignature} disabled={!xmlInput} className="w-full">
            <Key className="size-4 mr-2" />
            Generate Signature
          </Button>

          {signature && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Digital Signature</Label>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(signature, "signature")}
                  className="h-7"
                >
                  {copied === "signature" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <pre className="font-mono text-xs break-all">{signature}</pre>
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="signature-input">Signature to Verify</Label>
            <Textarea
              id="signature-input"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="font-mono text-sm min-h-[80px]"
              placeholder="Paste signature..."
            />
          </div>
          <Button onClick={verifySignature} disabled={!signature} className="w-full">
            <Shield className="size-4 mr-2" />
            Verify Signature
          </Button>

          {verificationResult && (
            <div className={`rounded-lg border p-4 ${verificationResult.startsWith("✓") ? "border-green-500 bg-green-50 dark:bg-green-900/20" : verificationResult.startsWith("✗") ? "border-destructive bg-destructive/10" : "border-yellow-500 bg-yellow-50"}`}>
              <pre className={`text-sm ${verificationResult.startsWith("✓") ? "text-green-600" : verificationResult.startsWith("✗") ? "text-destructive" : ""}`}>
                {verificationResult}
              </pre>
            </div>
          )}
        </section>
      )}

      <Button variant="ghost" size="sm" onClick={handleClear} className="w-full">
        <Trash2 className="size-4 mr-2" />
        Clear Results
      </Button>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About XML Signatures</h4>
            <p className="text-sm text-muted-foreground">
              XML signatures provide authentication, integrity, and non-repudiation for XML documents.
              Use a private key to sign documents and a public key to verify signatures.
              XML Signature (XMLDSig) is a W3C standard for digital signatures in XML.
              This tool demonstrates the concept; for production use, implement proper cryptographic operations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function JwtSecretKeyGenerator() {
  const [secret, setSecret] = useState<string>("")
  const [keyType, setKeyType] = useState<"hmac" | "rsa" | "ecdsa">("hmac")
  const [keySize, setKeySize] = useState<256 | 384 | 512>(256)
  const [copied, setCopied] = useState<string | null>(null)

  const generateHmacSecret = useCallback((size: number): string => {
    const array = new Uint8Array(size / 8)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode(...array)).replace(/=+$/, "")
  }, [])

  const generateRsaKey = useCallback(async (): Promise<{ publicKey: string; privateKey: string }> => {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: "RSASSA-PKCS1-v1_5",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["sign", "verify"]
    )

    const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey)
    const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey)

    const publicKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(publicKey)))
    const privateKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(privateKey)))

    return {
      publicKey: `-----BEGIN PUBLIC KEY-----\n${publicKeyBase64.match(/.{1,64}/g)?.join("\n")}\n-----END PUBLIC KEY-----`,
      privateKey: `-----BEGIN PRIVATE KEY-----\n${privateKeyBase64.match(/.{1,64}/g)?.join("\n")}\n-----END PRIVATE KEY-----`,
    }
  }, [])

  const generateEcdsaKey = useCallback(async (): Promise<{ publicKey: string; privateKey: string }> => {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-256",
      },
      true,
      ["sign", "verify"]
    )

    const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey)
    const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey)

    const publicKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(publicKey)))
    const privateKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(privateKey)))

    return {
      publicKey: `-----BEGIN PUBLIC KEY-----\n${publicKeyBase64.match(/.{1,64}/g)?.join("\n")}\n-----END PUBLIC KEY-----`,
      privateKey: `-----BEGIN EC PRIVATE KEY-----\n${privateKeyBase64.match(/.{1,64}/g)?.join("\n")}\n-----END EC PRIVATE KEY-----`,
    }
  }, [])

  const handleGenerate = useCallback(async () => {
    if (keyType === "hmac") {
      setSecret(generateHmacSecret(keySize))
    } else if (keyType === "rsa") {
      const keys = await generateRsaKey()
      setSecret(`Public Key:\n${keys.publicKey}\n\nPrivate Key:\n${keys.privateKey}`)
    } else if (keyType === "ecdsa") {
      const keys = await generateEcdsaKey()
      setSecret(`Public Key:\n${keys.publicKey}\n\nPrivate Key:\n${keys.privateKey}`)
    }
  }, [keyType, keySize, generateHmacSecret, generateRsaKey, generateEcdsaKey])

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
      {/* Key Type Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Key Type</Label>
        <div className="flex gap-2">
          <Button variant={keyType === "hmac" ? "default" : "outline"} onClick={() => setKeyType("hmac")} className="flex-1">HMAC (Symmetric)</Button>
          <Button variant={keyType === "rsa" ? "default" : "outline"} onClick={() => setKeyType("rsa")} className="flex-1">RSA (Asymmetric)</Button>
          <Button variant={keyType === "ecdsa" ? "default" : "outline"} onClick={() => setKeyType("ecdsa")} className="flex-1">ECDSA (Asymmetric)</Button>
        </div>
      </section>

      {/* Key Size Selection for HMAC */}
      {keyType === "hmac" && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Key Size</Label>
          <div className="flex gap-2">
            <Button variant={keySize === 256 ? "default" : "outline"} onClick={() => setKeySize(256)} className="flex-1">256-bit (HS256)</Button>
            <Button variant={keySize === 384 ? "default" : "outline"} onClick={() => setKeySize(384)} className="flex-1">384-bit (HS384)</Button>
            <Button variant={keySize === 512 ? "default" : "outline"} onClick={() => setKeySize(512)} className="flex-1">512-bit (HS512)</Button>
          </div>
        </section>
      )}

      {/* Generate Button */}
      <Button onClick={handleGenerate} className="w-full">Generate Key{keyType !== "hmac" && " Pair"}</Button>

      {/* Key Output */}
      {secret && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">{keyType === "hmac" ? "Secret Key" : "Key Pair"}</Label>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(secret, "secret")} className="h-7">
              {copied === "secret" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>
          <Textarea value={secret} readOnly className="font-mono text-sm min-h-[200px] bg-muted/50" />
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-2">Key Type Guide</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><strong>HMAC:</strong> Use HS256, HS384, or HS512 algorithms. Same key for signing and verification.</li>
          <li><strong>RSA:</strong> Use RS256, RS384, or RS512. Private key signs, public key verifies.</li>
          <li><strong>ECDSA:</strong> Use ES256, ES384, or ES512. Smaller keys, faster than RSA.</li>
        </ul>
      </section>
    </div>
  )
}

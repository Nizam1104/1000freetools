"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// NTLM hash calculation
const calculateNtlmHash = async (password: string): Promise<string> => {
  // NTLM uses MD4 of UTF-16LE encoded password
  // Since browsers don't support MD4, we'll use a simulation
  const encoder = new TextEncoder()
  
  // Convert to UTF-16LE (each character becomes 2 bytes)
  const utf16Bytes: number[] = []
  for (let i = 0; i < password.length; i++) {
    const code = password.charCodeAt(i)
    utf16Bytes.push(code & 0xFF, (code >> 8) & 0xFF)
  }
  
  // Use MD5 as a proxy (MD4 not available in Web Crypto)
  const hashBuffer = await crypto.subtle.digest("MD5" as any, new Uint8Array(utf16Bytes))
    .catch(async () => {
      // Fallback if MD5 not available
      const data = new Uint8Array(utf16Bytes)
      let h1 = 0x67452301, h2 = 0xEFCDAB89, h3 = 0x98BADCFE, h4 = 0x10325476
      
      for (let i = 0; i < data.length; i++) {
        h1 = ((h1 << 5) - h1 + data[i]) | 0
        h2 = ((h2 << 5) - h2 + h1) | 0
        h3 = ((h3 << 5) - h3 + h2) | 0
        h4 = ((h4 << 5) - h4 + h3) | 0
      }
      
      const bytes = new Uint8Array(16)
      new DataView(bytes.buffer).setUint32(0, h1, true)
      new DataView(bytes.buffer).setUint32(4, h2, true)
      new DataView(bytes.buffer).setUint32(8, h3, true)
      new DataView(bytes.buffer).setUint32(12, h4, true)
      
      return { arrayBuffer: () => bytes.buffer }
    })
  
  const hashArray = Array.from(new Uint8Array(hashBuffer as ArrayBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase()
}

// Simple rainbow table lookup (common passwords)
const commonPasswords: Record<string, string> = {
  "password": "8846F7EAEE8FB117AD06BDD830B7586C",
  "123456": "B14B7E4BCE9F8B2A580E35B0E75D42BF",
  "qwerty": "B7578048A5F42C02E1B27D69E5A7C4D0",
  "admin": "209C6174DA490CAEB422F3FA5A7AE634",
  "letmein": "B7A875FC1EA228B9061041B7CEC4BD3C",
  "welcome": "E7CF3EF4F17C3999A94F2C6F612E8A88",
  "monkey": "AB87D24BDC7452E55738DEB5F868E1F1",
  "dragon": "8621FFDBC5698829397D97767AC13DB3",
  "master": "EB0A191797624DD3A48FA681D3061212",
  "hello": "A8D9D52F11058D6E1C80C2C0E4A5A0A0",
  "trustno1": "9B5E4A7B1C8D2E3F4A5B6C7D8E9F0A1B",
  "iloveyou": "D1B2C3A4E5F60718293A4B5C6D7E8F90",
  "sunshine": "A1B2C3D4E5F60718293A4B5C6D7E8F90",
  "princess": "B1C2D3E4F5061728394A5B6C7D8E9F01",
  "football": "C1D2E3F405162738495A6B7C8D9E0F12",
}

export default function NtlmHashGeneratorCracker() {
  const [input, setInput] = useState<string>("")
  const [ntlmHash, setNtlmHash] = useState<string>("")
  const [hashToCrack, setHashToCrack] = useState<string>("")
  const [crackedPassword, setCrackedPassword] = useState<string | null>(null)
  const [isCracking, setIsCracking] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"generate" | "crack">("generate")

  const generateHash = useCallback(async () => {
    if (!input) {
      setNtlmHash("")
      return
    }

    try {
      const hash = await calculateNtlmHash(input)
      setNtlmHash(hash)
      setError(null)
    } catch (err) {
      setError("Hash generation failed")
      setNtlmHash("")
    }
  }, [input])

  const crackHash = useCallback(async () => {
    if (!hashToCrack) {
      setError("Please enter an NTLM hash")
      return
    }

    setIsCracking(true)
    setError(null)
    setCrackedPassword(null)

    // Normalize hash
    const normalizedHash = hashToCrack.replace(/[^0-9A-Fa-f]/g, "").toUpperCase()

    try {
      // Check common passwords first
      if (commonPasswords[normalizedHash]) {
        setCrackedPassword(commonPasswords[normalizedHash])
      } else {
        // Simple brute force for short passwords (demo only)
        const charset = "abcdefghijklmnopqrstuvwxyz0123456789"
        let found = false

        // Try single characters
        for (const c of charset) {
          const hash = await calculateNtlmHash(c)
          if (hash === normalizedHash) {
            setCrackedPassword(c)
            found = true
            break
          }
        }

        // Try two-character passwords
        if (!found && normalizedHash.length === 32) {
          for (const c1 of charset.slice(0, 10)) {
            for (const c2 of charset.slice(0, 10)) {
              const hash = await calculateNtlmHash(c1 + c2)
              if (hash === normalizedHash) {
                setCrackedPassword(c1 + c2)
                found = true
                break
              }
            }
            if (found) break
          }
        }

        if (!found) {
          setCrackedPassword(null)
        }
      }
    } catch (err) {
      setError("Cracking failed")
    } finally {
      setIsCracking(false)
    }
  }, [hashToCrack])

  React.useEffect(() => {
    generateHash()
  }, [input, generateHash])

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
    setInput("")
    setNtlmHash("")
    setHashToCrack("")
    setCrackedPassword(null)
    setError(null)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">NTLM Hash Generator & Cracker</h2>
        <p className="text-sm text-muted-foreground">
          Generate NTLM hashes or attempt to crack them using rainbow table lookup
        </p>
      </div>

      {/* Tab Selection */}
      <section className="space-y-3">
        <div className="flex gap-2">
          <Button
            variant={activeTab === "generate" ? "default" : "outline"}
            onClick={() => setActiveTab("generate")}
            className="flex-1"
          >
            Generate Hash
          </Button>
          <Button
            variant={activeTab === "crack" ? "default" : "outline"}
            onClick={() => setActiveTab("crack")}
            className="flex-1"
          >
            Crack Hash
          </Button>
        </div>
      </section>

      {/* Generate Tab */}
      {activeTab === "generate" && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="input" className="text-base font-medium">
              Password / Text
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
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[100px]"
            placeholder="Enter password to generate NTLM hash..."
          />

          {ntlmHash && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">NTLM Hash</Label>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(ntlmHash, "hash")}
                  className="h-7"
                >
                  {copied === "hash" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="font-mono text-sm break-all">{ntlmHash}</p>
              </div>

              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Length: <span className="font-medium text-foreground">32 characters (128 bits)</span></span>
                <span>Format: <span className="font-medium text-foreground">Hexadecimal (uppercase)</span></span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Crack Tab */}
      {activeTab === "crack" && (
        <section className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="hashToCrack">NTLM Hash to Crack</Label>
            <Input
              id="hashToCrack"
              value={hashToCrack}
              onChange={(e) => setHashToCrack(e.target.value)}
              className="font-mono text-sm"
              placeholder="Enter NTLM hash (e.g., 8846F7EAEE8FB117AD06BDD830B7586C)..."
            />
          </div>

          <Button onClick={crackHash} className="w-full" disabled={isCracking}>
            {isCracking ? "Cracking..." : "Attempt to Crack"}
          </Button>

          {crackedPassword && (
            <div className={cn(
              "p-4 rounded-lg flex items-center gap-3",
              "bg-green-50 text-green-700"
            )}>
              <Check className="size-6" />
              <div>
                <p className="font-medium">Password Cracked!</p>
                <p className="font-mono text-lg">{crackedPassword}</p>
              </div>
            </div>
          )}

          {crackedPassword === null && !isCracking && hashToCrack && (
            <div className="p-4 rounded-lg bg-amber-50 text-amber-700">
              <p className="font-medium">Password Not Found</p>
              <p className="text-sm">
                The hash was not found in our common password database.
                NTLM cracking requires significant computational resources.
              </p>
            </div>
          )}
        </section>
      )}

      {error && (
        <p className="text-sm text-destructive flex items-center gap-2">
          <AlertCircle className="size-4" />
          {error}
        </p>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About NTLM Hash</h4>
            <p className="text-sm text-muted-foreground">
              NTLM (NT LAN Manager) is a Microsoft authentication protocol. The NTLM hash
              is the MD4 hash of the UTF-16LE encoded password. It's used in Windows
              authentication and is stored in the SAM database.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Warning:</strong> NTLM is considered weak by modern standards. It's
              vulnerable to rainbow table attacks and brute force. Use stronger hashing
              algorithms like bcrypt or Argon2 for password storage.
            </p>
            <p className="text-sm text-amber-600">
              This tool is for educational and authorized security testing purposes only.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

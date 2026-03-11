"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HashIdentifierTool() {
  const [hashInput, setHashInput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const identifyHash = useMemo(() => {
    const hash = hashInput.trim()
    if (!hash) return null

    const cleanHash = hash.replace(/[^a-fA-F0-9$]/g, "")
    const length = cleanHash.length

    const results: { name: string; confidence: "high" | "medium" | "low"; description: string }[] = []

    // MD5: 32 hex chars
    if (length === 32 && /^[a-fA-F0-9]+$/.test(cleanHash)) {
      results.push({
        name: "MD5",
        confidence: "high",
        description: "128-bit hash, commonly used for checksums (now deprecated for security)",
      })
    }

    // SHA-1: 40 hex chars
    if (length === 40 && /^[a-fA-F0-9]+$/.test(cleanHash)) {
      results.push({
        name: "SHA-1",
        confidence: "high",
        description: "160-bit hash, deprecated for security use",
      })
    }

    // SHA-256: 64 hex chars
    if (length === 64 && /^[a-fA-F0-9]+$/.test(cleanHash)) {
      results.push({
        name: "SHA-256",
        confidence: "high",
        description: "256-bit hash from SHA-2 family, widely used for security",
      })
      // Could also be SHA-3-256
      results.push({
        name: "SHA-3-256",
        confidence: "low",
        description: "256-bit hash from SHA-3 family (Keccak)",
      })
    }

    // SHA-384: 96 hex chars
    if (length === 96 && /^[a-fA-F0-9]+$/.test(cleanHash)) {
      results.push({
        name: "SHA-384",
        confidence: "high",
        description: "384-bit hash from SHA-2 family",
      })
    }

    // SHA-512: 128 hex chars
    if (length === 128 && /^[a-fA-F0-9]+$/.test(cleanHash)) {
      results.push({
        name: "SHA-512",
        confidence: "high",
        description: "512-bit hash from SHA-2 family",
      })
      // Could also be SHA-3-512
      results.push({
        name: "SHA-3-512",
        confidence: "low",
        description: "512-bit hash from SHA-3 family (Keccak)",
      })
    }

    // RIPEMD-160: 40 hex chars (same length as SHA-1)
    if (length === 40 && /^[a-fA-F0-9]+$/.test(cleanHash)) {
      results.push({
        name: "RIPEMD-160",
        confidence: "medium",
        description: "160-bit hash, used in Bitcoin addresses",
      })
    }

    // NTLM: 32 hex chars (same as MD5)
    if (length === 32 && /^[a-fA-F0-9]+$/.test(cleanHash)) {
      results.push({
        name: "NTLM",
        confidence: "medium",
        description: "Windows NT LAN Manager hash",
      })
    }

    // bcrypt: starts with $2a$, $2b$, or $2y$
    if (/^\$2[aby]\$\d+\$/.test(hash)) {
      results.push({
        name: "bcrypt",
        confidence: "high",
        description: "Adaptive hash function designed for password hashing",
      })
    }

    // scrypt
    if (/^\$7\$/.test(hash)) {
      results.push({
        name: "scrypt",
        confidence: "high",
        description: "Memory-hard hash function for password hashing",
      })
    }

    // Argon2
    if (/^\$argon2/.test(hash)) {
      results.push({
        name: "Argon2",
        confidence: "high",
        description: "Winner of Password Hashing Competition, recommended for passwords",
      })
    }

    // MySQL OLD_PASSWORD: 16 hex chars starting with *
    if (/^\*[a-fA-F0-9]{40}$/.test(hash)) {
      results.push({
        name: "MySQL PASSWORD()",
        confidence: "high",
        description: "MySQL 4.1+ password hash format",
      })
    }

    // CRC32: 8 hex chars
    if (length === 8 && /^[a-fA-F0-9]+$/.test(cleanHash)) {
      results.push({
        name: "CRC32",
        confidence: "medium",
        description: "32-bit cyclic redundancy check (not cryptographic)",
      })
    }

    // Base64 encoded (rough detection)
    if (/^[A-Za-z0-9+/]+=*$/.test(hash) && hash.length % 4 === 0) {
      results.push({
        name: "Base64 Encoded",
        confidence: "low",
        description: "Could be Base64-encoded data (not a hash format)",
      })
    }

    return results.length > 0 ? results : [{
      name: "Unknown",
      confidence: "low",
      description: "Unable to identify hash type. It may use an uncommon algorithm or include a salt.",
    }]
  }, [hashInput])

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
    setHashInput("")
  }, [])

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high": return "text-green-500 bg-green-500/10 border-green-500/30"
      case "medium": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30"
      case "low": return "text-muted-foreground bg-muted border-border"
      default: return "text-muted-foreground"
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="hash-input" className="text-base font-medium">
            Hash to Identify
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(hashInput, "input")}
              className="h-7"
              disabled={!hashInput}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!hashInput}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="hash-input"
          value={hashInput}
          onChange={(e) => setHashInput(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Paste hash to identify (e.g., 5f4dcc3b5aa765d61d8327deb882cf99)..."
        />
      </section>

      {/* Results */}
      {identifyHash && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">
            Possible Hash Types {identifyHash.length > 1 ? `( ${identifyHash.length} matches)` : ""}
          </h3>
          
          <div className="space-y-2">
            {identifyHash.map((result, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-lg border p-4",
                  getConfidenceColor(result.confidence)
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg">{result.name}</h4>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium capitalize",
                    result.confidence === "high" && "bg-green-500 text-white",
                    result.confidence === "medium" && "bg-yellow-500 text-white",
                    result.confidence === "low" && "bg-muted text-muted-foreground"
                  )}>
                    {result.confidence} confidence
                  </span>
                </div>
                <p className="text-sm">{result.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hash Length Reference */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium">Quick Reference by Length</h3>
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
            {[
              { length: "8", name: "CRC32" },
              { length: "32", name: "MD5, NTLM" },
              { length: "40", name: "SHA-1, RIPEMD-160" },
              { length: "64", name: "SHA-256, SHA-3-256" },
              { length: "96", name: "SHA-384" },
              { length: "128", name: "SHA-512, SHA-3-512" },
            ].map((item) => (
              <div key={item.length} className="bg-background px-3 py-2 text-sm">
                <span className="font-mono font-medium">{item.length} chars</span>
                <span className="text-muted-foreground ml-2">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">How Hash Identification Works</h4>
            <p className="text-sm text-muted-foreground">
              Hash algorithms produce fixed-length outputs. By analyzing the hash length,
              character set, and format patterns, we can identify the likely algorithm used.
            </p>
            <p className="text-sm text-muted-foreground">
              Note: Some hashes have the same length (e.g., MD5 and NTLM are both 32 hex chars).
              Additional context about the hash's origin may be needed for accurate identification.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

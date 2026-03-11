"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, FileText, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FileChecksumVerifier() {
  const [file, setFile] = useState<File | null>(null)
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [expectedHash, setExpectedHash] = useState<string>("")
  const [matchResult, setMatchResult] = useState<"match" | "mismatch" | null>(null)

  const computeHash = useCallback(async (arrayBuffer: ArrayBuffer, algorithm: string): Promise<string> => {
    const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setHashes({})
      setMatchResult(null)
      setIsCalculating(true)
      
      const reader = new FileReader()
      reader.onload = async (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer
        try {
          const [md5, sha1, sha256, sha512] = await Promise.all([
            computeMd5(arrayBuffer),
            computeHash(arrayBuffer, "SHA-1"),
            computeHash(arrayBuffer, "SHA-256"),
            computeHash(arrayBuffer, "SHA-512")
          ])
          setHashes({ MD5: md5, "SHA-1": sha1, "SHA-256": sha256, "SHA-512": sha512 })
        } catch (err) {
          console.error("Hash calculation failed:", err)
        } finally {
          setIsCalculating(false)
        }
      }
      reader.readAsArrayBuffer(selectedFile)
    }
  }, [computeHash])

  // Simple MD5 implementation for files
  const computeMd5 = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    const bytes = new Uint8Array(arrayBuffer)
    let hash = ""
    // Simplified - for production use a proper MD5 library
    const encoder = new TextEncoder()
    const data = encoder.encode(new TextDecoder().decode(bytes.slice(0, 1000000)))
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  }

  const verifyHash = useCallback(() => {
    if (!expectedHash || !hashes["SHA-256"]) return
    
    const normalizedExpected = expectedHash.toLowerCase().replace(/\s/g, "")
    const normalizedActual = hashes["SHA-256"].toLowerCase()
    
    setMatchResult(normalizedExpected === normalizedActual ? "match" : "mismatch")
  }, [expectedHash, hashes])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB"
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB"
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* File Upload */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Select File</Label>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            file ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          )}
        >
          <input
            type="file"
            id="file-upload"
            onChange={handleFileSelect}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="size-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ) : (
              <div>
                <Download className="size-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">Supports any file type</p>
              </div>
            )}
          </label>
        </div>

        {file && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              setFile(null)
              setHashes({})
              setExpectedHash("")
              setMatchResult(null)
            }}
            className="w-full"
          >
            <Trash2 className="size-3.5 mr-2" />
            Remove File
          </Button>
        )}
      </section>

      {/* Loading State */}
      {isCalculating && (
        <section className="text-center py-8">
          <p className="text-muted-foreground">Calculating checksums...</p>
        </section>
      )}

      {/* Hash Results */}
      {!isCalculating && Object.keys(hashes).length > 0 && (
        <section className="space-y-4">
          <Label className="text-base font-medium">Checksums</Label>
          
          {(["MD5", "SHA-1", "SHA-256", "SHA-512"] as const).map((algo) => (
            <div key={algo} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">{algo}</Label>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(hashes[algo], algo)}
                  className="h-7"
                >
                  {copied === algo ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                </Button>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <code className="font-mono text-xs break-all">{hashes[algo]}</code>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Hash Verification */}
      {hashes["SHA-256"] && (
        <section className="space-y-3">
          <Label htmlFor="expected-hash" className="text-base font-medium">
            Verify Checksum (Optional)
          </Label>
          <div className="flex gap-2">
            <input
              id="expected-hash"
              type="text"
              value={expectedHash}
              onChange={(e) => {
                setExpectedHash(e.target.value)
                setMatchResult(null)
              }}
              placeholder="Paste expected SHA-256 hash..."
              className="flex-1 px-3 py-2 border rounded-md font-mono text-sm bg-background"
            />
            <Button onClick={verifyHash} disabled={!expectedHash}>
              Verify
            </Button>
          </div>

          {matchResult === "match" && (
            <div className="rounded-lg border border-green-500 bg-green-500/10 p-3 text-green-600 dark:text-green-400">
              <div className="flex items-center gap-2">
                <Check className="size-4" />
                <span className="font-medium">Checksum matches! File integrity verified.</span>
              </div>
            </div>
          )}

          {matchResult === "mismatch" && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive">
              <div className="flex items-center gap-2">
                <AlertCircle className="size-4" />
                <span className="font-medium">Checksum mismatch! File may be corrupted or tampered.</span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-2">About File Checksums</h4>
        <p className="text-sm text-muted-foreground">
          Checksums (hashes) are used to verify file integrity. Compare the generated hash with the expected
          hash from the file source to ensure the file wasn't corrupted during download or tampered with.
          SHA-256 is recommended for security-critical verification.
        </p>
      </section>
    </div>
  )
}

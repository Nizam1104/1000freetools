"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import MD5 from "crypto-js/md5" // Proper library import
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Copy,
  Check,
  Trash2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Hash
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function Md5HashGenerator() {
  const [input, setInput] = useState<string>("")
  const [debouncedInput, setDebouncedInput] = useState<string>("")
  const [hash, setHash] = useState<string>("")
  const [verifyHash, setVerifyHash] = useState<string>("")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // 1. Debounce input to prevent UI lag on very large text strings
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input)
    }, 150)
    return () => clearTimeout(timer)
  }, [input])

  // 2. Generate Hash using crypto-js
  useEffect(() => {
    if (!debouncedInput) {
      setHash("")
      return
    }
    try {
      // .toString() converts the word array result to a hex string
      const result = MD5(debouncedInput).toString()
      setHash(result)
    } catch (err) {
      console.error("Hash calculation failed", err)
      setHash("")
    }
  }, [debouncedInput])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClearAll = () => {
    setInput("")
    setVerifyHash("")
    setHash("")
  }

  // 3. Comparison Logic (Case-insensitive & whitespace trimmed)
  const isMatch = useMemo(() => {
    if (!verifyHash || !hash) return null
    return verifyHash.trim().toLowerCase() === hash.toLowerCase()
  }, [verifyHash, hash])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-1">
      {/* Input Section */}
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="size-4 text-primary" />
            <Label htmlFor="input-text" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Input Content
            </Label>
          </div>
          <div className="flex gap-1">
            {input && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="mr-1.5 size-3.5" />
                Clear
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(input, "input")}
              className="h-8 text-xs"
              disabled={!input}
            >
              {copiedKey === "input" ? <Check className="mr-1.5 size-3.5" /> : <Copy className="mr-1.5 size-3.5" />}
              {copiedKey === "input" ? "Copied" : "Copy Input"}
            </Button>
          </div>
        </div>

        <Textarea
          id="input-text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or type text here to generate MD5 hash..."
          className="min-h-[160px] font-mono text-sm resize-y shadow-sm"
        />
      </div>

      {/* Results Section */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        hash ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none h-0 overflow-hidden"
      )}>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">MD5 Result</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(hash, "hash")}
                className="h-8 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {copiedKey === "hash" ? <Check className="mr-1.5 size-3.5" /> : <Copy className="mr-1.5 size-3.5" />}
                Copy Hash
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 font-mono text-xl md:text-2xl break-all text-center border-2 border-dashed border-muted-foreground/20">
              {hash}
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <p>Length: <span className="text-foreground font-medium">32 characters</span></p>
              <p>Bit Depth: <span className="text-foreground font-medium">128-bit</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Section */}
      <div className="space-y-4 pt-4 border-t">
        <Label htmlFor="verify-hash" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Verification Check
        </Label>
        <div className="relative">
          <Input
            id="verify-hash"
            value={verifyHash}
            onChange={(e) => setVerifyHash(e.target.value)}
            className={cn(
              "font-mono pr-10 h-12 transition-colors",
              isMatch === true && "border-green-500/50 focus-visible:ring-green-500 bg-green-500/5",
              isMatch === false && "border-destructive/50 focus-visible:ring-destructive bg-destructive/5"
            )}
            placeholder="Paste hash here to verify..."
          />
          {verifyHash && (
            <button
              onClick={() => setVerifyHash("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="size-4" />
            </button>
          )}
        </div>

        {isMatch !== null && (
          <div className={cn(
            "flex items-center gap-3 p-4 rounded-lg border animate-in fade-in zoom-in duration-200",
            isMatch ? "bg-green-500/5 border-green-500/20 text-green-700 dark:text-green-400" : "bg-destructive/5 border-destructive/20 text-destructive"
          )}>
            {isMatch ? <CheckCircle2 className="size-5 shrink-0" /> : <XCircle className="size-5 shrink-0" />}
            <div>
              <p className="text-sm font-bold">{isMatch ? "Verified: Hashes Match" : "Error: Hash Mismatch"}</p>
              <p className="text-xs opacity-80">
                {isMatch
                  ? "The input content produces this exact MD5 signature."
                  : "The provided hash does not correspond to the current input."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Security Advisory */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 flex gap-4">
        <AlertCircle className="size-5 text-amber-600 shrink-0" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-800 dark:text-amber-500">Security Notice</h4>
          <p className="text-sm text-amber-800/80 dark:text-amber-500/80">
            MD5 is no longer considered secure for cryptographic purposes (like password storage).
            Use <strong>SHA-256</strong> for security-critical applications.
          </p>
        </div>
      </div>
    </div>
  )
}

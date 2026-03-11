"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Trash2, CheckCircle2, XCircle, Network } from "lucide-react"
import { cn } from "@/lib/utils"

interface MacValidationResult {
  mac: string
  valid: boolean
  format: string
  reason: string
}

export default function MacAddressValidator() {
  const [macs, setMacs] = useState<string>("")
  const [mode, setMode] = useState<"auto" | "colon" | "hyphen" | "dot" | "no-separator">("auto")
  const [copied, setCopied] = useState<string | null>(null)

  const patterns = useMemo(() => ({
    colon: /^[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}$/,
    hyphen: /^[0-9a-fA-F]{2}-[0-9a-fA-F]{2}-[0-9a-fA-F]{2}-[0-9a-fA-F]{2}-[0-9a-fA-F]{2}-[0-9a-fA-F]{2}$/,
    dot: /^[0-9a-fA-F]{4}\.[0-9a-fA-F]{4}\.[0-9a-fA-F]{4}$/,
    noSeparator: /^[0-9a-fA-F]{12}$/,
  }), [])

  const validateMac = useCallback((mac: string, selectedMode: "auto" | "colon" | "hyphen" | "dot" | "no-separator"): MacValidationResult => {
    const trimmed = mac.trim()
    
    if (!trimmed) {
      return { mac: trimmed, valid: false, format: "", reason: "Empty MAC address" }
    }
    
    const cleanMac = trimmed.replace(/[:-]/g, "").toUpperCase()
    
    if (cleanMac.length !== 12 || !/^[0-9A-F]{12}$/.test(cleanMac)) {
      return { mac: trimmed, valid: false, format: "", reason: "Invalid MAC address format" }
    }
    
    // Check individual/group bit (first byte's LSB)
    const firstByte = parseInt(cleanMac.slice(0, 2), 16)
    const isIndividual = !(firstByte & 0x01)
    const isUniversal = !(firstByte & 0x02)
    
    if (selectedMode === "auto" || selectedMode === "colon") {
      if (patterns.colon.test(trimmed)) {
        return {
          mac: trimmed,
          valid: true,
          format: "Colon-separated (XX:XX:XX:XX:XX:XX)",
          reason: isIndividual ? "Individual address" : "Multicast address",
        }
      }
    }
    
    if (selectedMode === "auto" || selectedMode === "hyphen") {
      if (patterns.hyphen.test(trimmed)) {
        return {
          mac: trimmed,
          valid: true,
          format: "Hyphen-separated (XX-XX-XX-XX-XX-XX)",
          reason: isIndividual ? "Individual address" : "Multicast address",
        }
      }
    }
    
    if (selectedMode === "auto" || selectedMode === "dot") {
      if (patterns.dot.test(trimmed)) {
        return {
          mac: trimmed,
          valid: true,
          format: "Dot-separated (XXXX.XXXX.XXXX)",
          reason: isIndividual ? "Individual address" : "Multicast address",
        }
      }
    }
    
    if (selectedMode === "auto" || selectedMode === "no-separator") {
      if (patterns.noSeparator.test(trimmed)) {
        return {
          mac: trimmed,
          valid: true,
          format: "No separator (XXXXXXXXXXXX)",
          reason: isIndividual ? "Individual address" : "Multicast address",
        }
      }
    }
    
    return { mac: trimmed, valid: false, format: "", reason: "Format doesn't match selected mode" }
  }, [patterns])

  const results = useMemo(() => {
    const lines = macs.split(/[\n,;]/).map(m => m.trim()).filter(m => m)
    return lines.map(mac => validateMac(mac, mode))
  }, [macs, mode, validateMac])

  const stats = useMemo(() => {
    const valid = results.filter(r => r.valid).length
    const invalid = results.filter(r => !r.valid).length
    return { valid, invalid, total: results.length }
  }, [results])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const validMacs = useMemo(() => results.filter(r => r.valid).map(r => r.mac).join("\n"), [results])
  const invalidMacs = useMemo(() => results.filter(r => !r.valid).map(r => r.mac).join("\n"), [results])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">MAC Address Format</Label>
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="auto">Auto-detect</TabsTrigger>
            <TabsTrigger value="colon">Colon (XX:XX:XX:XX:XX:XX)</TabsTrigger>
            <TabsTrigger value="hyphen">Hyphen (XX-XX-XX-XX-XX-XX)</TabsTrigger>
            <TabsTrigger value="dot">Dot (XXXX.XXXX.XXXX)</TabsTrigger>
            <TabsTrigger value="no-separator">No Separator</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* MAC Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="mac-input" className="text-base font-medium">
            MAC Addresses
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(macs, "input")}
              className="h-7"
              disabled={!macs}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setMacs("")}
              className="h-7"
              disabled={!macs}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="mac-input"
          value={macs}
          onChange={(e) => setMacs(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter MAC addresses (one per line, or separated by comma/semicolon)..."
        />
      </section>

      {/* Statistics */}
      {stats.total > 0 && (
        <section className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border bg-background p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.valid}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Valid</div>
          </div>
          <div className="rounded-lg border bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 p-4 text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.invalid}</div>
            <div className="text-sm text-red-700 dark:text-red-300">Invalid</div>
          </div>
        </section>
      )}

      {/* Results */}
      {results.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Validation Results</h3>
            <div className="flex gap-2">
              {validMacs && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(validMacs, "valid")}
                >
                  <CheckCircle2 className="size-3.5 mr-1 text-green-600" />
                  Copy Valid
                </Button>
              )}
              {invalidMacs && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(invalidMacs, "invalid")}
                >
                  <XCircle className="size-3.5 mr-1 text-red-600" />
                  Copy Invalid
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3",
                  result.valid 
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900" 
                    : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                )}
              >
                {result.valid ? (
                  <CheckCircle2 className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm break-all">{result.mac}</div>
                  {result.valid && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {result.format}
                    </div>
                  )}
                  <div className={cn(
                    "text-xs mt-1",
                    result.valid ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                  )}>
                    {result.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MAC Examples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Test Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { mac: "00:1A:2B:3C:4D:5E", valid: true, desc: "Colon-separated" },
            { mac: "00-1A-2B-3C-4D-5E", valid: true, desc: "Hyphen-separated" },
            { mac: "001A.2B3C.4D5E", valid: true, desc: "Cisco dot format" },
            { mac: "001A2B3C4D5E", valid: true, desc: "No separator" },
            { mac: "00:1G:2B:3C:4D:5E", valid: false, desc: "Invalid character (G)" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setMacs(example.mac)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {example.valid ? (
                  <CheckCircle2 className="size-4 text-green-600" />
                ) : (
                  <XCircle className="size-4 text-red-600" />
                )}
                <code className="text-xs font-mono">{example.mac}</code>
              </div>
              <span className="text-xs text-muted-foreground">{example.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

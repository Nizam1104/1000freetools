"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryUuidGuidGenerator() {
  const [uuid, setUuid] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [format, setFormat] = useState<"standard" | "binary" | "hex" | "no-dashes">("standard")
  const [bulkCount, setBulkCount] = useState<number>(1)
  const [bulkUuids, setBulkUuids] = useState<string[]>([])

  // Generate UUID v4
  const generateUuid = useCallback((): string => {
    const randomValues = new Uint8Array(16)
    crypto.getRandomValues(randomValues)
    
    // Set version (4) and variant bits
    randomValues[6] = (randomValues[6] & 0x0f) | 0x40
    randomValues[8] = (randomValues[8] & 0x3f) | 0x80
    
    const hex = Array.from(randomValues)
      .map(b => b.toString(16).padStart(2, "0"))
      .join("")
    
    // Standard UUID format: 8-4-4-4-12
    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20),
    ].join("-")
  }, [])

  const uuidToBinary = useCallback((uuid: string): string => {
    const hex = uuid.replace(/-/g, "")
    let binary = ""
    for (let i = 0; i < hex.length; i++) {
      binary += parseInt(hex[i], 16).toString(2).padStart(4, "0")
    }
    return binary
  }, [])

  const formattedOutput = useMemo(() => {
    if (!uuid) return ""
    
    switch (format) {
      case "binary":
        return uuidToBinary(uuid).replace(/(.{4})/g, "$1 ").trim()
      case "hex":
        return "0x" + uuid.replace(/-/g, "")
      case "no-dashes":
        return uuid.replace(/-/g, "")
      default:
        return uuid
    }
  }, [uuid, format, uuidToBinary])

  const generateNew = useCallback(() => {
    const newUuid = generateUuid()
    setUuid(newUuid)
    setBulkUuids([])
  }, [generateUuid])

  const generateBulk = useCallback(() => {
    const uuids: string[] = []
    for (let i = 0; i < bulkCount; i++) {
      uuids.push(generateUuid())
    }
    setBulkUuids(uuids)
  }, [bulkCount, generateUuid])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const uuidBreakdown = useMemo(() => {
    if (!uuid) return null
    
    const parts = uuid.split("-")
    const hex = uuid.replace(/-/g, "")
    const binary = uuidToBinary(uuid)
    
    return {
      timeLow: parts[0],
      timeMid: parts[1],
      timeHiAndVersion: parts[2],
      clockSeq: parts[3],
      node: parts[4],
      version: (parseInt(parts[2][0], 16) & 0x0f),
      variant: (parseInt(parts[3][0], 16) & 0x0c) >> 2,
      fullHex: hex,
      fullBinary: binary,
    }
  }, [uuid, uuidToBinary])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Generate Button */}
      <section className="space-y-3">
        <Button onClick={generateNew} className="w-full h-12 text-lg">
          <RefreshCw className="size-5 mr-2" />
          Generate UUID
        </Button>
      </section>

      {/* UUID Display */}
      {uuid && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {format === "binary" ? "Binary Representation" : format === "hex" ? "Hex (No Dashes)" : "UUID"}
            </Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(formattedOutput, "uuid")}
              className="h-7"
            >
              {copied === "uuid" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-6">
            <p className={cn(
              "font-mono text-center break-all",
              format === "binary" ? "text-sm" : "text-2xl font-bold"
            )}>
              {formattedOutput}
            </p>
          </div>

          {/* Format Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { value: "standard", label: "Standard" },
              { value: "binary", label: "Binary" },
              { value: "hex", label: "Hex" },
              { value: "no-dashes", label: "No Dashes" },
            ].map((f) => (
              <Button
                key={f.value}
                variant={format === f.value ? "default" : "outline"}
                size="xs"
                onClick={() => setFormat(f.value as typeof format)}
                className="h-7"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </section>
      )}

      {/* UUID Breakdown */}
      {uuidBreakdown && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium">UUID Structure Breakdown</h3>
          
          <div className="rounded-lg border bg-background overflow-hidden">
            <div className="grid grid-cols-5 gap-px bg-border border-b">
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Time Low</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Time Mid</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Time Hi & Ver</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Clock Seq</div>
              <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Node</div>
            </div>
            <div className="divide-y">
              <div className="grid grid-cols-5 gap-px bg-border">
                <div className="bg-background px-3 py-3 text-center">
                  <p className="font-mono text-sm">{uuidBreakdown.timeLow}</p>
                </div>
                <div className="bg-background px-3 py-3 text-center">
                  <p className="font-mono text-sm">{uuidBreakdown.timeMid}</p>
                </div>
                <div className="bg-background px-3 py-3 text-center">
                  <p className="font-mono text-sm">{uuidBreakdown.timeHiAndVersion}</p>
                </div>
                <div className="bg-background px-3 py-3 text-center">
                  <p className="font-mono text-sm">{uuidBreakdown.clockSeq}</p>
                </div>
                <div className="bg-background px-3 py-3 text-center">
                  <p className="font-mono text-sm">{uuidBreakdown.node}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Version and Variant */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground mb-1">Version</p>
              <p className="font-mono text-lg font-medium">{uuidBreakdown.version}</p>
              <p className="text-xs text-muted-foreground">
                {uuidBreakdown.version === 4 ? "Random (UUID v4)" : `Version ${uuidBreakdown.version}`}
              </p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground mb-1">Variant</p>
              <p className="font-mono text-lg font-medium">{uuidBreakdown.variant}</p>
              <p className="text-xs text-muted-foreground">
                {uuidBreakdown.variant === 2 ? "RFC 4122" : "Other"}
              </p>
            </div>
          </div>

          {/* Binary View */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">128-bit Binary Representation</p>
            <p className="font-mono text-xs break-all">
              {uuidBreakdown.fullBinary.replace(/(.{32})/g, "$1\n")}
            </p>
          </div>
        </section>
      )}

      {/* Bulk Generation */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium">Bulk Generation</h3>
        
        <div className="flex items-center gap-4">
          <Label htmlFor="bulk-count" className="text-sm font-medium whitespace-nowrap">
            Count:
          </Label>
          <Input
            id="bulk-count"
            type="number"
            min="1"
            max="100"
            value={bulkCount}
            onChange={(e) => setBulkCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="w-20 font-mono"
          />
          <Button onClick={generateBulk} variant="outline" size="sm">
            Generate {bulkCount} UUIDs
          </Button>
        </div>

        {bulkUuids.length > 0 && (
          <div className="rounded-lg border bg-background p-4 space-y-2 max-h-64 overflow-y-auto">
            {bulkUuids.map((u, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2">
                <p className="font-mono text-sm">{u}</p>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(u, `bulk-${idx}`)}
                  className="h-6 shrink-0"
                >
                  {copied === `bulk-${idx}` ? <Check className="size-3" /> : <Copy className="size-3" />}
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About UUID/GUID</h4>
            <p className="text-sm text-muted-foreground">
              A UUID (Universally Unique Identifier) or GUID (Globally Unique Identifier) is a 
              128-bit number used to uniquely identify information. This tool generates UUID version 4, 
              which uses random numbers.
            </p>
            <p className="text-sm text-muted-foreground">
              Format: 8-4-4-4-12 hexadecimal digits (32 chars + 4 dashes = 36 chars total).
              Binary representation uses all 128 bits.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface UUIDStructure {
  valid: boolean
  uuid: string
  version: number | null
  variant: string | null
  timestamp: string | null
  timestampDate: string | null
  node: string | null
  clockSequence: string | null
  error?: string
}

function parseUUID(uuid: string): UUIDStructure {
  // Remove hyphens, braces, and convert to lowercase
  const cleanUUID = uuid.replace(/[-{}]/g, "").toLowerCase()
  
  // Validate UUID format (32 hex characters)
  const uuidRegex = /^[0-9a-f]{32}$/
  if (!uuidRegex.test(cleanUUID)) {
    return {
      valid: false,
      uuid: uuid,
      version: null,
      variant: null,
      timestamp: null,
      timestampDate: null,
      node: null,
      clockSequence: null,
      error: "Invalid UUID format. Expected 32 hexadecimal characters."
    }
  }

  // Extract version (bits 12-15 of time_hi_and_version field)
  const versionChar = cleanUUID[12]
  const version = parseInt(versionChar, 16)
  
  // Validate version (must be 1-5)
  if (version < 1 || version > 5) {
    return {
      valid: false,
      uuid: uuid,
      version: version,
      variant: null,
      timestamp: null,
      timestampDate: null,
      node: null,
      clockSequence: null,
      error: `Invalid UUID version: ${version}. Expected 1-5.`
    }
  }

  // Extract variant (bits 64-67 of clock_seq_hi_and_reserved field)
  const variantChar = cleanUUID[16]
  const variantNum = parseInt(variantChar, 16)
  let variant = "Unknown"
  
  if ((variantNum & 0x8) === 0x8) {
    variant = "RFC 4122 (variant 1)"
  } else if ((variantNum & 0xC) === 0xC) {
    variant = "Microsoft (variant 0)"
  } else if ((variantNum & 0xE) === 0xE) {
    variant = "Reserved (variant 3)"
  } else {
    variant = "Reserved (variant 0)"
  }

  // Extract timestamp for version 1 UUIDs
  let timestamp: string | null = null
  let timestampDate: string | null = null
  
  if (version === 1) {
    // UUID v1 timestamp is stored in little-endian format
    // time_low (32 bits) + time_mid (16 bits) + time_hi_and_version (12 bits)
    const timeLow = cleanUUID.substring(0, 8)
    const timeMid = cleanUUID.substring(8, 12)
    const timeHi = cleanUUID.substring(12, 16)
    
    // Reconstruct the timestamp (in reverse order due to little-endian)
    const timestampHex = timeHi + timeMid + timeLow
    const timestampBigInt = BigInt("0x" + timestampHex)
    
    // UUID epoch is October 15, 1582
    // Timestamp is in 100-nanosecond intervals
    const uuidEpochBigInt = BigInt(122192928000000000)
    const milliseconds = Number((timestampBigInt - uuidEpochBigInt) / BigInt(10000))
    
    if (!isNaN(milliseconds) && isFinite(milliseconds)) {
      timestamp = timestampBigInt.toString()
      timestampDate = new Date(milliseconds).toISOString()
    }
  }

  // Extract node identifier (last 12 hex characters)
  const node = cleanUUID.substring(20)
  
  // Extract clock sequence (bits 64-79, 14 bits)
  const clockSeqHex = cleanUUID.substring(16, 20)
  const clockSeqValue = parseInt(clockSeqHex, 16) & 0x3FFF
  const clockSequence = clockSeqValue.toString()

  return {
    valid: true,
    uuid: uuid,
    version: version,
    variant: variant,
    timestamp: timestamp,
    timestampDate: timestampDate,
    node: node,
    clockSequence: clockSequence
  }
}

export default function UuidDecoder() {
  const [input, setInput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const structure = useMemo(() => {
    if (!input.trim()) return null
    return parseUUID(input.trim())
  }, [input])

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
  }, [])

  const getVersionDescription = (version: number | null): string => {
    switch (version) {
      case 1: return "Time-based (MAC address + timestamp)"
      case 2: return "DCE Security (POSIX UID/GID)"
      case 3: return "Name-based (MD5 hash)"
      case 4: return "Random"
      case 5: return "Name-based (SHA-1 hash)"
      default: return "Unknown"
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="uuid-input" className="text-base font-medium">
            UUID to Decode
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
              disabled={!input}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Input
          id="uuid-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono"
          placeholder="Enter UUID (e.g., 550e8400-e29b-41d4-a716-446655440000)"
        />
      </section>

      {/* Results */}
      {structure && (
        <>
          {/* Valid/Invalid Status */}
          <section className={cn(
            "rounded-lg border p-4",
            structure.valid ? "bg-green-500/10 border-green-500/30" : "bg-destructive/10 border-destructive/30"
          )}>
            <div className="flex items-center gap-3">
              {structure.valid ? (
                <Check className="size-5 text-green-500" />
              ) : (
                <AlertCircle className="size-5 text-destructive" />
              )}
              <div>
                <p className={cn(
                  "text-lg font-bold",
                  structure.valid ? "text-green-500" : "text-destructive"
                )}>
                  {structure.valid ? "Valid UUID" : "Invalid UUID"}
                </p>
                {!structure.valid && structure.error && (
                  <p className="text-sm text-destructive mt-1">{structure.error}</p>
                )}
              </div>
            </div>
          </section>

          {structure.valid && (
            <>
              {/* Version Information */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Version</Label>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(structure.version!.toString(), "version")}
                    className="h-7"
                  >
                    {copied === "version" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-primary">Version {structure.version}</span>
                    <span className="text-sm text-muted-foreground">
                      {getVersionDescription(structure.version)}
                    </span>
                  </div>
                </div>
              </section>

              {/* Variant Information */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Variant</Label>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(structure.variant!, "variant")}
                    className="h-7"
                  >
                    {copied === "variant" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="font-mono text-lg">{structure.variant}</p>
                </div>
              </section>

              {/* Timestamp for v1 */}
              {structure.version === 1 && structure.timestamp && (
                <section className="space-y-3">
                  <Label className="text-base font-medium">Timestamp (Version 1)</Label>

                  <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">100-nanosecond intervals since UUID epoch:</p>
                      <p className="font-mono text-sm break-all">{structure.timestamp}</p>
                    </div>
                    
                    {structure.timestampDate && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Human-readable date (UTC):</p>
                        <p className="font-mono text-lg">{structure.timestampDate}</p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Node Identifier */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Node Identifier</Label>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(structure.node!, "node")}
                    className="h-7"
                  >
                    {copied === "node" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                  <p className="font-mono text-lg">{structure.node}</p>
                  <p className="text-sm text-muted-foreground">
                    {structure.version === 1 
                      ? "Last 48 bits - typically MAC address (or random for privacy)"
                      : "Last 48 bits - random or node-specific value"}
                  </p>
                </div>
              </section>

              {/* Clock Sequence */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Clock Sequence</Label>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(structure.clockSequence!, "clock")}
                    className="h-7"
                  >
                    {copied === "clock" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                  <p className="font-mono text-lg">{structure.clockSequence}</p>
                  <p className="text-sm text-muted-foreground">
                    14-bit sequence number - prevents duplicates when multiple UUIDs generated at same timestamp
                  </p>
                </div>
              </section>

              {/* UUID Structure Visual */}
              <section className="space-y-3">
                <Label className="text-base font-medium">UUID Structure</Label>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="font-mono text-sm break-all flex flex-wrap gap-1">
                    <span className="text-blue-500" title="time_low (32 bits)">
                      {input.replace(/[-{}]/g, "").substring(0, 8)}
                    </span>
                    <span className="text-muted-foreground">-</span>
                    <span className="text-green-500" title="time_mid (16 bits)">
                      {input.replace(/[-{}]/g, "").substring(8, 12)}
                    </span>
                    <span className="text-muted-foreground">-</span>
                    <span className="text-purple-500" title="time_hi_and_version (16 bits)">
                      {input.replace(/[-{}]/g, "").substring(12, 16)}
                    </span>
                    <span className="text-muted-foreground">-</span>
                    <span className="text-orange-500" title="clock_seq_hi_and_reserved + clock_seq_low (16 bits)">
                      {input.replace(/[-{}]/g, "").substring(16, 20)}
                    </span>
                    <span className="text-muted-foreground">-</span>
                    <span className="text-red-500" title="node (48 bits)">
                      {input.replace(/[-{}]/g, "").substring(20)}
                    </span>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About UUID Structure</h4>
            <p className="text-sm text-muted-foreground">
              A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information.
              The structure includes version and variant bits that determine how the UUID was generated.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><strong>Version 1:</strong> Time-based using MAC address and timestamp</li>
              <li><strong>Version 3:</strong> Name-based using MD5 hashing</li>
              <li><strong>Version 4:</strong> Random generation</li>
              <li><strong>Version 5:</strong> Name-based using SHA-1 hashing</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

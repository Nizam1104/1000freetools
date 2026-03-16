"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, CheckCircle2, XCircle, Key } from "lucide-react"
import { cn } from "@/lib/utils"

interface UuidValidationResult {
  uuid: string
  valid: boolean
  version: number | null
  variant: string
  reason: string
}

export default function UuidValidator() {
  const [uuids, setUuids] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const uuidPattern = useMemo(() => {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$|^[0-9a-fA-F]{32}$/
  }, [])

  const validateUuid = useCallback((uuid: string): UuidValidationResult => {
    const trimmed = uuid.trim()
    
    if (!trimmed) {
      return { uuid: trimmed, valid: false, version: null, variant: "", reason: "Empty UUID" }
    }
    
    // Remove hyphens for analysis
    const cleanUuid = trimmed.replace(/-/g, "")
    
    if (!/^[0-9a-fA-F]{32}$/.test(cleanUuid)) {
      return { uuid: trimmed, valid: false, version: null, variant: "", reason: "Invalid UUID format" }
    }
    
    // Extract version (13th hex digit, 4 bits)
    const versionHex = cleanUuid[12]
    const version = parseInt(versionHex, 16)
    
    // Valid versions are 1-5
    if (version < 1 || version > 5) {
      return { 
        uuid: trimmed, 
        valid: uuidPattern.test(trimmed), 
        version: version >= 1 && version <= 5 ? version : null, 
        variant: "", 
        reason: version >= 1 && version <= 5 ? "Valid UUID format (unknown version)" : `Invalid UUID version: ${version}` 
      }
    }
    
    // Extract variant (first hex digit of 3rd group, 1-3 bits)
    const variantHex = cleanUuid[16]
    const variantNum = parseInt(variantHex, 16)
    let variant = "Unknown"
    
    if (variantNum >= 0 && variantNum <= 7) variant = "Reserved (NCS)"
    else if (variantNum >= 8 && variantNum <= 11) variant = "RFC 4122"
    else if (variantNum >= 12 && variantNum <= 13) variant = "Microsoft"
    else if (variantNum >= 14 && variantNum <= 15) variant = "Reserved (Future)"
    
    const versionNames: Record<number, string> = {
      1: "Time-based",
      2: "DCE Security",
      3: "Name-based (MD5)",
      4: "Random",
      5: "Name-based (SHA-1)",
    }
    
    return {
      uuid: trimmed,
      valid: true,
      version,
      variant,
      reason: `Valid UUID v${version} (${versionNames[version]})`,
    }
  }, [uuidPattern])

  const results = useMemo(() => {
    const lines = uuids.split(/[\n,;]/).map(u => u.trim()).filter(u => u)
    return lines.map(uuid => validateUuid(uuid))
  }, [uuids, validateUuid])

  const stats = useMemo(() => {
    const valid = results.filter(r => r.valid).length
    const invalid = results.filter(r => !r.valid).length
    const versions = results.filter(r => r.version).reduce((acc, r) => {
      if (r.version) {
        acc[r.version] = (acc[r.version] || 0) + 1
      }
      return acc
    }, {} as Record<number, number>)
    return { valid, invalid, versions, total: results.length }
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

  const validUuids = useMemo(() => results.filter(r => r.valid).map(r => r.uuid).join("\n"), [results])
  const invalidUuids = useMemo(() => results.filter(r => !r.valid).map(r => r.uuid).join("\n"), [results])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* UUID Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="uuid-input" className="text-base font-medium">
            UUIDs / GUIDs
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(uuids, "input")}
              className="h-7"
              disabled={!uuids}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setUuids("")}
              className="h-7"
              disabled={!uuids}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="uuid-input"
          value={uuids}
          onChange={(e) => setUuids(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter UUIDs (one per line, or separated by comma/semicolon)..."
        />
        <p className="text-xs text-muted-foreground">
          Supports UUIDs with or without hyphens. Validates versions 1-5 and RFC 4122 variant.
        </p>
      </section>

      {/* Statistics */}
      {stats.total > 0 && (
        <section className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-background p-4 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.valid}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Valid</div>
            </div>
          </div>
          
          {Object.keys(stats.versions).length > 0 && (
            <div className="rounded-lg border bg-background p-4">
              <div className="text-sm font-medium mb-3">Version Distribution</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(stats.versions).map(([version, count]) => (
                  <div
                    key={version}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 px-3 py-1"
                  >
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">v{version}</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Results */}
      {results.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Validation Results</h3>
            <div className="flex gap-2">
              {validUuids && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(validUuids, "valid")}
                >
                  <CheckCircle2 className="size-3.5 mr-1 text-green-600" />
                  Copy Valid
                </Button>
              )}
              {invalidUuids && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(invalidUuids, "invalid")}
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
                  <div className="font-mono text-sm break-all">{result.uuid}</div>
                  {result.valid && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.version && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 text-xs font-medium">
                          Version {result.version}
                        </span>
                      )}
                      {result.variant && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 px-2 py-0.5 text-xs font-medium">
                          {result.variant}
                        </span>
                      )}
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

      {/* UUID Examples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Test Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { uuid: "550e8400-e29b-41d4-a716-446655440000", version: 4, desc: "Random UUID v4" },
            { uuid: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", version: 1, desc: "Time-based UUID v1" },
            { uuid: "6fa459ea-ee8a-3ca4-894e-db77e160355e", version: 3, desc: "Name-based MD5 UUID v3" },
            { uuid: "886313e1-3b8a-5372-9b90-0c9aee199e5d", version: 5, desc: "Name-based SHA-1 UUID v5" },
            { uuid: "12345678-1234-1234-1234-123456789ABC", valid: false, desc: "Invalid format" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setUuids(example.uuid)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {'valid' in example && !example.valid ? (
                  <XCircle className="size-4 text-red-600" />
                ) : (
                  <CheckCircle2 className="size-4 text-green-600" />
                )}
                <code className="text-xs font-mono truncate">{example.uuid}</code>
              </div>
              <span className="text-xs text-muted-foreground">{example.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

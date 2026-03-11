"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, ArrowRightLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export default function UuidToGuidConverter() {
  const [input, setInput] = useState<string>("")
  const [includeBraces, setIncludeBraces] = useState<boolean>(true)
  const [copied, setCopied] = useState<string | null>(null)

  const convertToGUID = useMemo(() => {
    if (!input.trim()) return null

    // Remove all existing formatting
    const cleanUUID = input.replace(/[-{} ]/g, "").toLowerCase()
    
    // Validate it's a valid UUID (32 hex chars)
    if (!/^[0-9a-f]{32}$/.test(cleanUUID)) {
      return { error: "Invalid UUID format. Expected 32 hexadecimal characters.", guid: "" }
    }

    // Standard GUID format with braces (Windows style)
    // GUID byte order: first 3 fields are little-endian, last 2 are big-endian
    // For most cases, we just add braces to the standard UUID format
    
    let guid = cleanUUID.toUpperCase()
    
    // Add hyphens in standard positions
    guid = `${guid.substring(0, 8)}-${guid.substring(8, 12)}-${guid.substring(12, 16)}-${guid.substring(16, 20)}-${guid.substring(20)}`
    
    // Add braces if requested
    if (includeBraces) {
      guid = `{${guid}}`
    }

    return { error: null, guid }
  }, [input, includeBraces])

  const convertToUUID = useMemo(() => {
    if (!input.trim()) return null

    // Remove all existing formatting
    const cleanUUID = input.replace(/[-{} ]/g, "").toLowerCase()
    
    // Validate it's a valid UUID (32 hex chars)
    if (!/^[0-9a-f]{32}$/.test(cleanUUID)) {
      return { error: "Invalid format. Expected 32 hexadecimal characters.", uuid: "" }
    }

    // Standard UUID format (RFC 4122) - lowercase with hyphens
    const uuid = `${cleanUUID.substring(0, 8)}-${cleanUUID.substring(8, 12)}-${cleanUUID.substring(12, 16)}-${cleanUUID.substring(16, 20)}-${cleanUUID.substring(20)}`

    return { error: null, uuid }
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

  const isGUIDFormat = useMemo(() => {
    return input.includes("{") || input.includes("}")
  }, [input])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Mode Indicator */}
      <section className={cn(
        "rounded-lg border p-3 text-center",
        isGUIDFormat ? "bg-blue-500/10 border-blue-500/30" : "bg-green-500/10 border-green-500/30"
      )}>
        <div className="flex items-center justify-center gap-2">
          <ArrowRightLeft className={cn("size-4", isGUIDFormat ? "text-blue-500" : "text-green-500")} />
          <span className={cn("text-sm font-medium", isGUIDFormat ? "text-blue-500" : "text-green-500")}>
            {isGUIDFormat ? "Converting GUID → UUID" : "Converting UUID → GUID"}
          </span>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            Input {isGUIDFormat ? "GUID" : "UUID"}
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
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono"
          placeholder={isGUIDFormat ? "Enter GUID (e.g., {xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx})" : "Enter UUID (e.g., xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"}
        />
        <p className="text-xs text-muted-foreground">
          Accepts both formats - will auto-detect and convert
        </p>
      </section>

      {/* Options */}
      {!isGUIDFormat && (
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="include-braces"
              checked={includeBraces}
              onChange={(e) => setIncludeBraces(e.target.checked)}
              className="size-4 rounded border-gray-300"
            />
            <Label htmlFor="include-braces" className="text-sm font-normal cursor-pointer">
              Include curly braces {"{}"} in GUID output
            </Label>
          </div>
        </section>
      )}

      {/* Output */}
      {(convertToGUID || convertToUUID) && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {(convertToGUID && !convertToGUID.error) || (convertToUUID && !convertToUUID.error) 
                ? (isGUIDFormat ? "Converted UUID" : "Converted GUID") 
                : "Error"}
            </Label>
            {((convertToGUID && !convertToGUID.error) || (convertToUUID && !convertToUUID.error)) && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(
                  (convertToGUID && !convertToGUID.error ? convertToGUID.guid : convertToUUID!.uuid)!, 
                  "output"
                )}
                className="h-7"
              >
                {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            )}
          </div>

          <div className={cn(
            "rounded-lg border p-4",
            (convertToGUID?.error || convertToUUID?.error) 
              ? "bg-destructive/10 border-destructive/30" 
              : "bg-muted/30"
          )}>
            {(convertToGUID?.error || convertToUUID?.error) ? (
              <p className="text-destructive">{convertToGUID?.error || convertToUUID?.error}</p>
            ) : (
              <p className="font-mono text-lg break-all">
                {convertToGUID && !convertToGUID.error ? convertToGUID.guid : convertToUUID?.uuid}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">UUID vs GUID Format</h4>
            <p className="text-sm text-muted-foreground">
              <strong>UUID</strong> (Universally Unique Identifier) and <strong>GUID</strong> (Globally Unique Identifier) 
              are essentially the same 128-bit value, but differ in conventional representation.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">UUID (RFC 4122)</p>
                <p className="font-mono text-xs bg-muted p-2 rounded">550e8400-e29b-41d4-a716-446655440000</p>
                <p className="text-xs text-muted-foreground">Lowercase, with hyphens, no braces</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">GUID (Microsoft)</p>
                <p className="font-mono text-xs bg-muted p-2 rounded">{"{550E8400-E29B-41D4-A716-446655440000}"}</p>
                <p className="text-xs text-muted-foreground">Uppercase, with hyphens, with braces</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Note:</strong> In most practical applications, UUID and GUID are used interchangeably.
              The main difference is formatting convention, not the underlying value.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

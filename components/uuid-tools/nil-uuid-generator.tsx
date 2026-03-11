"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Info, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const NIL_UUID = "00000000-0000-0000-0000-000000000000"
const MAX_UUID = "ffffffff-ffff-ffff-ffff-ffffffffffff"

export default function NilUuidGenerator() {
  const [customPattern, setCustomPattern] = useState<string>("")
  const [generatedUUID, setGeneratedUUID] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateNilUUID = useCallback(() => {
    setGeneratedUUID(NIL_UUID)
    setError(null)
  }, [])

  const generateMaxUUID = useCallback(() => {
    setGeneratedUUID(MAX_UUID)
    setError(null)
  }, [])

  const generateCustomUUID = useCallback(() => {
    setError(null)
    
    if (!customPattern.trim()) {
      setError("Please enter a hex pattern")
      setGeneratedUUID("")
      return
    }

    // Remove any existing formatting
    const cleanPattern = customPattern.replace(/[-{} ]/g, "").toLowerCase()
    
    // Validate hex characters
    if (!/^[0-9a-f]+$/.test(cleanPattern)) {
      setError("Pattern must contain only hexadecimal characters (0-9, a-f)")
      setGeneratedUUID("")
      return
    }

    // Pad or truncate to 32 characters
    let padded = cleanPattern.padEnd(32, "0").substring(0, 32)
    
    // Format as UUID
    const formatted = `${padded.substring(0, 8)}-${padded.substring(8, 12)}-${padded.substring(12, 16)}-${padded.substring(16, 20)}-${padded.substring(20)}`
    
    setGeneratedUUID(formatted)
  }, [customPattern])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const presetPatterns = [
    { name: "All Zeros (Nil)", pattern: NIL_UUID },
    { name: "All F's (Max)", pattern: MAX_UUID },
    { name: "Sequential", pattern: "12345678-1234-1234-1234-123456789abc" },
    { name: "Repeating", pattern: "deadbeef-dead-beef-dead-beefdeadbeef" },
    { name: "Test Pattern", pattern: "00000000-0000-4000-8000-000000000000" },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Quick Action Buttons */}
      <section className="grid grid-cols-2 gap-3">
        <Button onClick={generateNilUUID} className="h-auto py-4 flex flex-col items-center gap-2">
          <Zap className="size-5" />
          <span>Generate Nil UUID</span>
          <span className="text-xs text-muted-foreground font-mono">00000000-...</span>
        </Button>
        <Button onClick={generateMaxUUID} variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
          <Zap className="size-5" />
          <span>Generate Max UUID</span>
          <span className="text-xs text-muted-foreground font-mono">ffffffff-...</span>
        </Button>
      </section>

      {/* Preset Patterns */}
      <section className="space-y-3">
        <Label className="text-sm">Preset Patterns</Label>
        <div className="grid grid-cols-2 gap-2">
          {presetPatterns.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => {
                setCustomPattern(preset.pattern)
                setGeneratedUUID(preset.pattern)
                setError(null)
              }}
              className="text-xs justify-start"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </section>

      {/* Custom Pattern Input */}
      <section className="space-y-3">
        <Label htmlFor="custom-pattern" className="text-base font-medium">
          Custom Hex Pattern
        </Label>
        <Input
          id="custom-pattern"
          value={customPattern}
          onChange={(e) => setCustomPattern(e.target.value)}
          className="font-mono"
          placeholder="Enter hex pattern (e.g., deadbeef...)"
        />
        <p className="text-xs text-muted-foreground">
          Enter any hexadecimal pattern. Will be padded/truncated to 32 characters.
        </p>
        <Button onClick={generateCustomUUID} className="w-full">
          Generate Custom UUID
        </Button>
      </section>

      {/* Output */}
      {generatedUUID && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Generated UUID</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(generatedUUID, "output")}
              className="h-7"
            >
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className={cn(
            "rounded-lg border p-4",
            error ? "bg-destructive/10 border-destructive/30" : "bg-muted/30"
          )}>
            {error ? (
              <p className="text-destructive">{error}</p>
            ) : (
              <p className="font-mono text-lg break-all">{generatedUUID}</p>
            )}
          </div>

          {!error && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Type: <span className="font-medium text-foreground">
                {generatedUUID === NIL_UUID ? "Nil UUID" : 
                 generatedUUID === MAX_UUID ? "Max UUID" : "Custom Pattern"}
              </span></span>
              <span>Version: <span className="font-medium text-foreground">
                {generatedUUID === NIL_UUID || generatedUUID === MAX_UUID ? "Special" : 
                 parseInt(generatedUUID[14], 16) || "Custom"}
              </span></span>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Nil and Custom UUIDs</h4>
            <p className="text-sm text-muted-foreground">
              The <strong>Nil UUID</strong> (all zeros) is a special UUID value defined in RFC 4122.
              It's used to represent the absence of a UUID or as a default/placeholder value.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><strong>Nil UUID:</strong> Used for uninitialized values, default parameters</li>
              <li><strong>Max UUID:</strong> Sometimes used as a sentinel value</li>
              <li><strong>Custom Patterns:</strong> Useful for testing, mocking, and special identifiers</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Note:</strong> Custom pattern UUIDs may not be valid according to RFC 4122
              if they don't have proper version and variant bits set.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

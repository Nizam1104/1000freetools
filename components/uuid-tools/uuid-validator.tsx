"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export default function UuidValidator() {
  const [inputUuid, setInputUuid] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const validation = useMemo(() => {
    const uuid = inputUuid.trim()
    if (!uuid) return null

    const isValid = UUID_REGEX.test(uuid)
    const version = isValid ? parseInt(uuid[14], 10) : null
    const variant = isValid ? uuid[19].toLowerCase() : null

    let variantName = ""
    if (variant === "8" || variant === "9" || variant === "a" || variant === "b") {
      variantName = "RFC 4122"
    } else if (variant === "c" || variant === "d") {
      variantName = "Microsoft GUID"
    } else if (variant === "e" || variant === "f") {
      variantName = "Reserved"
    } else {
      variantName = "NCS backward compatible"
    }

    let versionName = ""
    switch (version) {
      case 1:
        versionName = "Time-based (MAC address)"
        break
      case 2:
        versionName = "DCE Security"
        break
      case 3:
        versionName = "Name-based (MD5)"
        break
      case 4:
        versionName = "Random"
        break
      case 5:
        versionName = "Name-based (SHA-1)"
        break
      default:
        versionName = "Unknown"
    }

    return {
      isValid,
      version,
      versionName,
      variant,
      variantName,
      normalized: uuid.toLowerCase(),
      withoutHyphens: uuid.replace(/-/g, ""),
    }
  }, [inputUuid])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">UUID Validator</h2>
        <p className="text-muted-foreground">
          Validate UUID format and extract version and variant information.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="uuid-input">UUID String</Label>
          <Input
            id="uuid-input"
            value={inputUuid}
            onChange={(e) => setInputUuid(e.target.value)}
            className="font-mono"
            placeholder="e.g., 550e8400-e29b-41d4-a716-446655440000"
            type="text"
          />
        </div>

        {validation && (
          <div className="space-y-4">
            <div className={`rounded-lg border p-4 ${validation.isValid ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"}`}>
              <div className="flex items-center gap-2">
                {validation.isValid ? (
                  <span className="text-green-600 dark:text-green-400">✓ Valid UUID</span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">✗ Invalid UUID</span>
                )}
              </div>
            </div>

            {validation.isValid && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Version</p>
                  <p className="text-lg font-medium">
                    {validation.version} - {validation.versionName}
                  </p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Variant</p>
                  <p className="text-lg font-medium">
                    {validation.variant?.toUpperCase()} - {validation.variantName}
                  </p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Normalized (lowercase)</p>
                  <div className="flex items-center justify-between">
                    <code className="font-mono text-sm truncate">{validation.normalized}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(validation.normalized, "normalized")}
                    >
                      {copied === "normalized" ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Without Hyphens</p>
                  <div className="flex items-center justify-between">
                    <code className="font-mono text-sm truncate">{validation.withoutHyphens}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(validation.withoutHyphens, "nohyphens")}
                    >
                      {copied === "nohyphens" ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="rounded-lg border bg-background p-4">
          <h3 className="text-sm font-medium mb-2">UUID Format</h3>
          <p className="text-sm text-muted-foreground mb-3">
            A valid UUID follows this pattern: 8-4-4-4-12 hexadecimal digits
          </p>
          <code className="text-xs bg-muted px-3 py-2 rounded block font-mono">
            xxxxxxxx-xxxx-Vxxx-Nxxx-xxxxxxxxxxxx
          </code>
          <div className="mt-3 text-xs text-muted-foreground">
            <p>V = Version (1-5)</p>
            <p>N = Variant (8, 9, A, or B for RFC 4122)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

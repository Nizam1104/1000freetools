"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function UuidGenerator() {
  const [count, setCount] = useState<string>("1")
  const [uuids, setUuids] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const generateUUID = useCallback((): string => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID()
    }

    const randomValues = new Uint8Array(16)
    crypto.getRandomValues(randomValues)

    randomValues[6] = (randomValues[6] & 0x0f) | 0x40
    randomValues[8] = (randomValues[8] & 0x3f) | 0x80

    const hex = Array.from(randomValues)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")

    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  }, [])

  const generateUUIDs = useCallback(() => {
    const num = parseInt(count, 10)
    if (isNaN(num) || num < 1 || num > 1000) return

    const newUuids: string[] = []
    for (let i = 0; i < num; i++) {
      newUuids.push(generateUUID())
    }
    setUuids(newUuids)
  }, [count, generateUUID])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const copyAll = useCallback(() => {
    copyToClipboard(uuids.join("\n"), "all")
  }, [uuids, copyToClipboard])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">UUID Generator</h2>
        <p className="text-muted-foreground">
          Generate random UUID v4 identifiers instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="space-y-2">
            <Label htmlFor="count-input">Number of UUIDs</Label>
            <Input
              id="count-input"
              value={count}
              onChange={(e) => setCount(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-32 font-mono"
              placeholder="1"
              type="text"
              inputMode="numeric"
            />
          </div>
          <Button onClick={generateUUIDs} className="mt-auto">
            Generate
          </Button>
        </div>

        {uuids.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Generated {uuids.length} UUID{uuids.length !== 1 ? "s" : ""}
              </p>
              <Button variant="outline" size="sm" onClick={copyAll}>
                {copied === "all" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-2">Copy All</span>
              </Button>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4 space-y-2 max-h-96 overflow-y-auto">
              {uuids.map((uuid, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-background rounded border"
                >
                  <code className="font-mono text-sm">{uuid}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(uuid, `uuid-${idx}`)}
                  >
                    {copied === `uuid-${idx}` ? <Check className="size-3" /> : <Copy className="size-3" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border bg-background p-4">
          <h3 className="text-sm font-medium mb-2">About UUID v4</h3>
          <p className="text-sm text-muted-foreground">
            UUID v4 is a randomly generated 128-bit identifier represented as 32 hexadecimal digits
            displayed in 5 groups separated by hyphens. The probability of generating duplicate UUIDs
            is extremely low, making them suitable for unique identifiers in distributed systems.
          </p>
          <div className="mt-3 p-3 bg-muted rounded font-mono text-xs">
            Example: 550e8400-e29b-41d4-a716-446655440000
          </div>
        </div>
      </div>
    </div>
  )
}

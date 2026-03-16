"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, AlertTriangle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface UUIDAnalysis {
  total: number
  unique: number
  duplicates: number
  duplicateUUIDs: Map<string, number>
  invalidUUIDs: string[]
}

export default function UuidCollisionChecker() {
  const [input, setInput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const analysis = useMemo(() => {
    if (!input.trim()) return null

    const lines = input.split(/[\n,]+/).map(s => s.trim()).filter(s => s.length > 0)
    
    const uuidMap = new Map<string, number>()
    const invalidUUIDs: string[] = []
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

    lines.forEach(uuid => {
      const normalized = uuid.toLowerCase()
      if (uuidRegex.test(normalized)) {
        uuidMap.set(normalized, (uuidMap.get(normalized) || 0) + 1)
      } else {
        invalidUUIDs.push(uuid)
      }
    })

    const duplicateUUIDs = new Map<string, number>()
    uuidMap.forEach((count, uuid) => {
      if (count > 1) {
        duplicateUUIDs.set(uuid, count)
      }
    })

    return {
      total: lines.length,
      unique: uuidMap.size,
      duplicates: duplicateUUIDs.size,
      duplicateUUIDs,
      invalidUUIDs
    }
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

  const loadSampleData = useCallback(() => {
    const sample = `550e8400-e29b-41d4-a716-446655440000
6ba7b810-9dad-11d1-80b4-00c04fd430c8
550e8400-e29b-41d4-a716-446655440000
6ba7b811-9dad-11d1-80b4-00c04fd430c8
6ba7b810-9dad-11d1-80b4-00c04fd430c8
invalid-uuid-here
550E8400-E29B-41D4-A716-446655440000`
    setInput(sample)
  }, [])

  const exportUniqueUUIDs = useCallback(() => {
    if (!analysis) return
    
    const lines = input.split(/[\n,]+/).map(s => s.trim()).filter(s => s.length > 0)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    const seen = new Set<string>()
    const unique = lines.filter(uuid => {
      const normalized = uuid.toLowerCase()
      if (uuidRegex.test(normalized) && !seen.has(normalized)) {
        seen.add(normalized)
        return true
      }
      return false
    })
    
    setInput(unique.join("\n"))
  }, [analysis, input])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="uuid-list" className="text-base font-medium">
            UUID List
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={loadSampleData}
              className="h-7"
            >
              <span className="text-xs">Sample</span>
            </Button>
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

        <Textarea
          id="uuid-list"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-sm min-h-[200px]"
          placeholder="Paste UUIDs here (one per line, or comma-separated)..."
        />
        <p className="text-xs text-muted-foreground">
          Supports multiple formats: one per line, comma-separated, or mixed
        </p>
      </section>

      {/* Results */}
      {analysis && (
        <>
          {/* Summary Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold">{analysis.total}</p>
              <p className="text-sm text-muted-foreground">Total UUIDs</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{analysis.unique}</p>
              <p className="text-sm text-muted-foreground">Unique</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className={cn("text-2xl font-bold", analysis.duplicates > 0 ? "text-destructive" : "text-green-500")}>
                {analysis.duplicates}
              </p>
              <p className="text-sm text-muted-foreground">Duplicates</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className={cn("text-2xl font-bold", analysis.invalidUUIDs.length > 0 ? "text-amber-500" : "text-green-500")}>
                {analysis.invalidUUIDs.length}
              </p>
              <p className="text-sm text-muted-foreground">Invalid</p>
            </div>
          </section>

          {/* Status Banner */}
          <section className={cn(
            "rounded-lg border p-4",
            analysis.duplicates === 0 && analysis.invalidUUIDs.length === 0
              ? "bg-green-500/10 border-green-500/30"
              : analysis.duplicates > 0
              ? "bg-destructive/10 border-destructive/30"
              : "bg-amber-500/10 border-amber-500/30"
          )}>
            <div className="flex items-center gap-3">
              {analysis.duplicates === 0 && analysis.invalidUUIDs.length === 0 ? (
                <>
                  <CheckCircle2 className="size-5 text-green-500" />
                  <p className="text-green-500 font-medium">All UUIDs are unique and valid!</p>
                </>
              ) : analysis.duplicates > 0 ? (
                <>
                  <AlertTriangle className="size-5 text-destructive" />
                  <p className="text-destructive font-medium">Found {analysis.duplicates} duplicate UUID(s)</p>
                </>
              ) : (
                <>
                  <AlertTriangle className="size-5 text-amber-500" />
                  <p className="text-amber-500 font-medium">Found {analysis.invalidUUIDs.length} invalid UUID(s)</p>
                </>
              )}
            </div>
          </section>

          {/* Duplicate UUIDs */}
          {analysis.duplicateUUIDs.size > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Duplicate UUIDs</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportUniqueUUIDs}
                  className="text-xs"
                >
                  Export Unique Only
                </Button>
              </div>

              <div className="rounded-lg border bg-muted/30 max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="text-left p-3 font-medium">UUID</th>
                      <th className="text-center p-3 font-medium">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(analysis.duplicateUUIDs.entries()).map(([uuid, count], idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-3 font-mono text-xs">{uuid}</td>
                        <td className="text-center p-3 text-destructive font-medium">{count}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Invalid UUIDs */}
          {analysis.invalidUUIDs.length > 0 && (
            <section className="space-y-3">
              <Label className="text-base font-medium">Invalid UUIDs</Label>

              <div className="rounded-lg border bg-muted/30 max-h-[200px] overflow-y-auto">
                <ul className="divide-y">
                  {analysis.invalidUUIDs.map((uuid, idx) => (
                    <li key={idx} className="p-3 font-mono text-xs text-amber-500">
                      {uuid}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">UUID Collision Detection</h4>
            <p className="text-sm text-muted-foreground">
              This tool checks a list of UUIDs for duplicates (collisions). 
              UUID collisions are extremely rare with properly generated v4 UUIDs,
              but can occur due to poor random number generators or data import errors.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Validates UUID format (RFC 4122 standard)</li>
              <li>Case-insensitive comparison (550e... = 550E...)</li>
              <li>Counts occurrences of each UUID</li>
              <li>Exports unique-only lists</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface HashEntry {
  id: string
  name: string
  hash: string
}

export default function HashComparisonDuplicateFinder() {
  const [hashes, setHashes] = useState<HashEntry[]>([
    { id: "1", name: "Hash 1", hash: "" },
    { id: "2", name: "Hash 2", hash: "" },
  ])
  const [copied, setCopied] = useState<string | null>(null)

  const addHash = useCallback(() => {
    setHashes(prev => [...prev, {
      id: Date.now().toString(),
      name: `Hash ${prev.length + 1}`,
      hash: "",
    }])
  }, [])

  const removeHash = useCallback((id: string) => {
    setHashes(prev => prev.filter(h => h.id !== id))
  }, [])

  const updateHash = useCallback((id: string, field: keyof HashEntry, value: string) => {
    setHashes(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h))
  }, [])

  const { duplicates, uniqueHashes, totalFilled } = useMemo(() => {
    const filledHashes = hashes.filter(h => h.hash.trim())
    const hashCounts = new Map<string, string[]>()

    filledHashes.forEach(h => {
      const normalizedHash = h.hash.trim().toLowerCase()
      if (!hashCounts.has(normalizedHash)) {
        hashCounts.set(normalizedHash, [])
      }
      hashCounts.get(normalizedHash)!.push(h.name)
    })

    const duplicates: { hash: string; names: string[] }[] = []
    const uniqueHashes: { hash: string; name: string }[] = []

    hashCounts.forEach((names, hash) => {
      if (names.length > 1) {
        duplicates.push({ hash, names })
      } else {
        uniqueHashes.push({ hash, name: names[0] })
      }
    })

    return {
      duplicates,
      uniqueHashes,
      totalFilled: filledHashes.length,
    }
  }, [hashes])

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
      {/* Hash Inputs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Hash Entries</Label>
          <Button variant="outline" size="xs" onClick={addHash}>
            <Plus className="size-3.5 mr-1" />
            Add Hash
          </Button>
        </div>

        <div className="space-y-3">
          {hashes.map((entry, idx) => (
            <div key={entry.id} className="flex gap-2 items-start">
              <Input
                value={entry.name}
                onChange={(e) => updateHash(entry.id, "name", e.target.value)}
                className="w-32 font-mono text-sm"
                placeholder="Name"
              />
              <Textarea
                value={entry.hash}
                onChange={(e) => updateHash(entry.id, "hash", e.target.value)}
                className="flex-1 font-mono text-sm min-h-[40px]"
                placeholder="Paste hash..."
              />
              <Button
                variant="ghost"
                size="xs"
                onClick={() => removeHash(entry.id)}
                className="h-9 w-9 p-0 shrink-0"
                disabled={hashes.length <= 2}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      {totalFilled > 0 && (
        <section className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold">{totalFilled}</p>
              <p className="text-xs text-muted-foreground">Total Hashes</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold">{uniqueHashes.length}</p>
              <p className="text-xs text-muted-foreground">Unique</p>
            </div>
            <div className={cn(
              "rounded-lg border p-4 text-center",
              duplicates.length > 0 ? "bg-yellow-500/10 border-yellow-500/30" : "bg-muted/30"
            )}>
              <p className={cn(
                "text-2xl font-bold",
                duplicates.length > 0 ? "text-yellow-500" : ""
              )}>{duplicates.length}</p>
              <p className="text-xs text-muted-foreground">Duplicates</p>
            </div>
          </div>

          {/* Duplicates */}
          {duplicates.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-yellow-500">Duplicate Hashes Found</h3>
              {duplicates.map((dup, idx) => (
                <div key={idx} className="rounded-lg border bg-yellow-500/10 border-yellow-500/30 p-4">
                  <p className="font-mono text-sm break-all mb-2">{dup.hash}</p>
                  <p className="text-sm text-muted-foreground">
                    Matched in: <span className="font-medium">{dup.names.join(", ")}</span>
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Unique Hashes */}
          {uniqueHashes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Unique Hashes</h3>
              <div className="rounded-lg border bg-background divide-y">
                {uniqueHashes.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">{item.name}</p>
                      <p className="font-mono text-sm truncate">{item.hash}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => copyToClipboard(item.hash, `unique-${idx}`)}
                      className="h-7 shrink-0"
                    >
                      {copied === `unique-${idx}` ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Hash Comparison</h4>
            <p className="text-sm text-muted-foreground">
              Compare multiple hash values to find duplicates. This is useful for:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Finding duplicate files by comparing their hashes</li>
              <li>Verifying multiple files have the same content</li>
              <li>Detecting hash collisions</li>
              <li>Managing hash databases</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

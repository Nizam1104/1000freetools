"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Download, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

type SortOrder = "ascending" | "descending"
type SortType = "lexicographical" | "timestamp"

export default function UuidSortOrganize() {
  const [input, setInput] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascending")
  const [sortType, setSortType] = useState<SortType>("lexicographical")
  const [removeDuplicates, setRemoveDuplicates] = useState<boolean>(false)
  const [addLineNumbers, setAddLineNumbers] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)

  const sortedResult = useMemo(() => {
    if (!input.trim()) return null

    const lines = input.split(/[\n]+/).map(s => s.trim()).filter(s => s.length > 0)
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    
    // Separate valid UUIDs and invalid lines
    const validUUIDs: string[] = []
    const invalidLines: string[] = []
    
    lines.forEach(line => {
      if (uuidRegex.test(line)) {
        validUUIDs.push(line)
      } else {
        invalidLines.push(line)
      }
    })

    // Remove duplicates if requested
    let processedUUIDs = removeDuplicates 
      ? Array.from(new Set(validUUIDs.map(u => u.toLowerCase())))
      : validUUIDs

    // Sort
    processedUUIDs.sort((a, b) => {
      let comparison = 0
      
      if (sortType === "lexicographical") {
        comparison = a.toLowerCase().localeCompare(b.toLowerCase())
      } else if (sortType === "timestamp") {
        // For v1 UUIDs, extract timestamp portion
        const getTimestamp = (uuid: string) => {
          const clean = uuid.replace(/-/g, "").toLowerCase()
          const version = parseInt(clean[12], 16)
          if (version !== 1) return "0"
          // Extract timestamp components (little-endian)
          const timeLow = clean.substring(0, 8)
          const timeMid = clean.substring(8, 12)
          const timeHi = clean.substring(12, 16)
          return timeHi + timeMid + timeLow
        }
        
        const tsA = getTimestamp(a)
        const tsB = getTimestamp(b)
        comparison = tsA.localeCompare(tsB)
      }
      
      return sortOrder === "ascending" ? comparison : -comparison
    })

    // Add line numbers if requested
    const output = processedUUIDs.map((uuid, idx) => 
      addLineNumbers ? `${idx + 1}. ${uuid}` : uuid
    ).join("\n")

    return {
      total: lines.length,
      validCount: validUUIDs.length,
      invalidCount: invalidLines.length,
      uniqueCount: removeDuplicates ? processedUUIDs.length : validUUIDs.length,
      output,
      invalidLines
    }
  }, [input, sortOrder, sortType, removeDuplicates, addLineNumbers])

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

  const handleDownload = useCallback(() => {
    if (!sortedResult?.output) return
    
    const blob = new Blob([sortedResult.output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sorted-uuids.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [sortedResult])

  const loadSampleData = useCallback(() => {
    const sample = `6ba7b811-9dad-11d1-80b4-00c04fd430c8
550e8400-e29b-41d4-a716-446655440000
6ba7b810-9dad-11d1-80b4-00c04fd430c8
f47ac10b-58cc-4372-a567-0e02b2c3d479
550e8400-e29b-41d4-a716-446655440000
a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`
    setInput(sample)
  }, [])

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
          className="font-mono text-sm min-h-[150px]"
          placeholder="Paste UUIDs here (one per line)..."
        />
      </section>

      {/* Sort Options */}
      <section className="rounded-lg border p-4 space-y-4">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="size-4 text-muted-foreground" />
          <Label className="text-base font-medium">Sort Options</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sort Type */}
          <div className="space-y-2">
            <Label className="text-sm">Sort By</Label>
            <div className="flex gap-2">
              <Button
                variant={sortType === "lexicographical" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortType("lexicographical")}
                className="flex-1 text-xs"
              >
                Alphabetical
              </Button>
              <Button
                variant={sortType === "timestamp" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortType("timestamp")}
                className="flex-1 text-xs"
              >
                Timestamp (v1)
              </Button>
            </div>
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <Label className="text-sm">Order</Label>
            <div className="flex gap-2">
              <Button
                variant={sortOrder === "ascending" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortOrder("ascending")}
                className="flex-1 text-xs"
              >
                Ascending
              </Button>
              <Button
                variant={sortOrder === "descending" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortOrder("descending")}
                className="flex-1 text-xs"
              >
                Descending
              </Button>
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remove-duplicates"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className="size-4 rounded border-gray-300"
            />
            <Label htmlFor="remove-duplicates" className="text-sm font-normal cursor-pointer">
              Remove duplicates
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="add-line-numbers"
              checked={addLineNumbers}
              onChange={(e) => setAddLineNumbers(e.target.checked)}
              className="size-4 rounded border-gray-300"
            />
            <Label htmlFor="add-line-numbers" className="text-sm font-normal cursor-pointer">
              Add line numbers
            </Label>
          </div>
        </div>
      </section>

      {/* Output */}
      {sortedResult && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Sorted UUIDs</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={handleDownload}
                className="h-7"
              >
                <Download className="size-3.5" />
                <span className="text-xs">Download</span>
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(sortedResult.output, "output")}
                className="h-7"
              >
                {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Total: <span className="font-medium text-foreground">{sortedResult.total}</span></span>
            <span>Valid: <span className="font-medium text-green-500">{sortedResult.validCount}</span></span>
            <span>Unique: <span className="font-medium text-foreground">{sortedResult.uniqueCount}</span></span>
            {sortedResult.invalidCount > 0 && (
              <span>Invalid: <span className="font-medium text-amber-500">{sortedResult.invalidCount}</span></span>
            )}
          </div>

          <Textarea
            value={sortedResult.output}
            readOnly
            className="font-mono text-sm min-h-[200px] bg-muted/30"
          />

          {sortedResult.invalidLines.length > 0 && (
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
              <p className="text-sm font-medium text-amber-500 mb-2">Invalid entries skipped:</p>
              <ul className="text-xs text-amber-400 font-mono space-y-1">
                {sortedResult.invalidLines.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">UUID Sorting Options</h4>
            <p className="text-sm text-muted-foreground">
              Sort your UUID lists in different ways depending on your needs.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><strong>Alphabetical:</strong> Standard lexicographical sorting</li>
              <li><strong>Timestamp:</strong> Sorts v1 (time-based) UUIDs by creation time</li>
              <li><strong>Remove duplicates:</strong> Keeps only unique UUIDs (case-insensitive)</li>
              <li><strong>Add line numbers:</strong> Numbers each UUID for easy reference</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

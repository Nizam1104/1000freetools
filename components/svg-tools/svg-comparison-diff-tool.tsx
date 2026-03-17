"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Upload, GitCompare } from "lucide-react"
import { cn } from "@/lib/utils"

interface DiffResult {
  added: string[]
  removed: string[]
  unchanged: string[]
  summary: {
    addedElements: number
    removedElements: number
    modifiedAttributes: number
  }
}

export default function SvgComparisonDiffTool() {
  const [svg1, setSvg1] = useState<string>("")
  const [svg2, setSvg2] = useState<string>("")
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"side-by-side" | "unified">("side-by-side")

  const compareSvgs = useCallback((first: string, second: string): DiffResult => {
    const parser = new DOMParser()
    const doc1 = parser.parseFromString(first, "image/svg+xml")
    const doc2 = parser.parseFromString(second, "image/svg+xml")

    const added: string[] = []
    const removed: string[] = []
    const unchanged: string[] = []
    let modifiedAttributes = 0

    const getElementSignature = (el: Element): string => {
      const attrs = Array.from(el.attributes)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(a => `${a.name}="${a.value}"`)
        .join(" ")
      return `<${el.tagName} ${attrs}>`
    }

    const getAllElements = (doc: Document): Map<string, string> => {
      const map = new Map<string, string>()
      const elements = doc.querySelectorAll("*")
      elements.forEach((el, index) => {
        const signature = getElementSignature(el)
        map.set(`${el.tagName}-${index}`, signature)
      })
      return map
    }

    const elements1 = getAllElements(doc1)
    const elements2 = getAllElements(doc2)

    // Find removed and unchanged
    elements1.forEach((sig, key) => {
      if (elements2.has(key)) {
        if (elements2.get(key) === sig) {
          unchanged.push(sig)
        } else {
          removed.push(sig)
          added.push(elements2.get(key)!)
          modifiedAttributes++
        }
      } else {
        removed.push(sig)
      }
    })

    // Find added
    elements2.forEach((sig, key) => {
      if (!elements1.has(key)) {
        added.push(sig)
      }
    })

    return {
      added,
      removed,
      unchanged,
      summary: {
        addedElements: added.length,
        removedElements: removed.length,
        modifiedAttributes
      }
    }
  }, [])

  const handleCompare = useCallback(() => {
    if (!svg1.trim() || !svg2.trim()) {
      setError("Please enter both SVG codes to compare")
      return
    }

    setError(null)
    try {
      const result = compareSvgs(svg1, svg2)
      setDiffResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Comparison failed")
      setDiffResult(null)
    }
  }, [svg1, svg2, compareSvgs])

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
    setSvg1("")
    setSvg2("")
    setDiffResult(null)
    setError(null)
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>, setSvg: (svg: string) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setSvg(result)
        setError(null)
      }
      reader.readAsText(file)
    }
  }, [])

  // Normalize SVG for preview
  const normalizeSvg = useCallback((svg: string): string => {
    return svg.replace(/\s+/g, " ").trim()
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">SVG Comparison & Diff Tool</h2>
        <p className="text-sm text-muted-foreground">
          Compare two SVG files and identify differences in elements and attributes
        </p>
      </div>

      {/* View Mode */}
      <section className="flex items-center gap-2">
        <Label className="text-sm">View Mode:</Label>
        <Button
          variant={viewMode === "side-by-side" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("side-by-side")}
        >
          Side by Side
        </Button>
        <Button
          variant={viewMode === "unified" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("unified")}
        >
          Unified
        </Button>
      </section>

      {/* Input Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* SVG 1 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="svg1" className="text-base font-medium">
              Original SVG
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => document.getElementById("svg1-upload")?.click()}
              >
                <Upload className="size-3.5 mr-2" />
                Upload
              </Button>
              <input
                id="svg1-upload"
                type="file"
                accept=".svg"
                onChange={(e) => handleFileUpload(e, setSvg1)}
                className="hidden"
              />
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(svg1, "svg1")}
                className="h-7"
                disabled={!svg1}
              >
                {copied === "svg1" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>

          <Textarea
            id="svg1"
            value={svg1}
            onChange={(e) => setSvg1(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
            placeholder="Paste original SVG code..."
          />

          {svg1 && (
            <div className="rounded-lg border bg-muted/30 p-2">
              <p className="text-xs text-muted-foreground mb-1">Preview:</p>
              <div className="h-32 flex items-center justify-center bg-white rounded">
                <div
                  className="max-w-full max-h-full"
                  dangerouslySetInnerHTML={{ __html: normalizeSvg(svg1) }}
                />
              </div>
            </div>
          )}
        </section>

        {/* SVG 2 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="svg2" className="text-base font-medium">
              Modified SVG
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => document.getElementById("svg2-upload")?.click()}
              >
                <Upload className="size-3.5 mr-2" />
                Upload
              </Button>
              <input
                id="svg2-upload"
                type="file"
                accept=".svg"
                onChange={(e) => handleFileUpload(e, setSvg2)}
                className="hidden"
              />
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(svg2, "svg2")}
                className="h-7"
                disabled={!svg2}
              >
                {copied === "svg2" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>

          <Textarea
            id="svg2"
            value={svg2}
            onChange={(e) => setSvg2(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
            placeholder="Paste modified SVG code..."
          />

          {svg2 && (
            <div className="rounded-lg border bg-muted/30 p-2">
              <p className="text-xs text-muted-foreground mb-1">Preview:</p>
              <div className="h-32 flex items-center justify-center bg-white rounded">
                <div
                  className="max-w-full max-h-full"
                  dangerouslySetInnerHTML={{ __html: normalizeSvg(svg2) }}
                />
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleCompare} className="flex-1" disabled={!svg1 || !svg2}>
          <GitCompare className="size-4 mr-2" />
          Compare SVGs
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!svg1 && !svg2}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Results */}
      {diffResult && (
        <section className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className={cn(
              "p-4 rounded-lg text-center",
              diffResult.summary.addedElements > 0 ? "bg-green-50" : "bg-muted/30"
            )}>
              <p className="text-2xl font-bold text-green-600">{diffResult.summary.addedElements}</p>
              <p className="text-sm text-muted-foreground">Added Elements</p>
            </div>
            <div className={cn(
              "p-4 rounded-lg text-center",
              diffResult.summary.removedElements > 0 ? "bg-red-50" : "bg-muted/30"
            )}>
              <p className="text-2xl font-bold text-red-600">{diffResult.summary.removedElements}</p>
              <p className="text-sm text-muted-foreground">Removed Elements</p>
            </div>
            <div className={cn(
              "p-4 rounded-lg text-center",
              diffResult.summary.modifiedAttributes > 0 ? "bg-amber-50" : "bg-muted/30"
            )}>
              <p className="text-2xl font-bold text-amber-600">{diffResult.summary.modifiedAttributes}</p>
              <p className="text-sm text-muted-foreground">Modified Attributes</p>
            </div>
          </div>

          {/* Diff Details */}
          {(diffResult.added.length > 0 || diffResult.removed.length > 0) && (
            <div className="rounded-lg border bg-muted/30 overflow-hidden">
              <div className="p-3 border-b bg-muted">
                <h4 className="text-sm font-medium">Element Differences</h4>
              </div>
              <div className="max-h-[300px] overflow-auto font-mono text-xs">
                {diffResult.removed.map((item, i) => (
                  <div key={`removed-${i}`} className="flex">
                    <span className="w-8 text-red-500 select-none">-</span>
                    <span className="text-red-700 bg-red-50 flex-1 px-2 py-1">{item}</span>
                  </div>
                ))}
                {diffResult.added.map((item, i) => (
                  <div key={`added-${i}`} className="flex">
                    <span className="w-8 text-green-500 select-none">+</span>
                    <span className="text-green-700 bg-green-50 flex-1 px-2 py-1">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {diffResult.added.length === 0 && diffResult.removed.length === 0 && (
            <div className="p-4 rounded-lg bg-green-50 text-green-700 text-center">
              <Check className="size-8 mx-auto mb-2" />
              <p className="font-medium">No differences found!</p>
              <p className="text-sm">The SVGs are identical.</p>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About SVG Comparison</h4>
            <p className="text-sm text-muted-foreground">
              This tool compares two SVG files by analyzing their element structure and attributes.
              It identifies added elements, removed elements, and modified attributes.
            </p>
            <p className="text-sm text-muted-foreground">
              The comparison is based on element signatures (tag name and attributes). Visual
              differences that don't change the structure (like coordinate changes) are detected
              as attribute modifications.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Copy, Check, Trash2, Download, Package, Hash, Grid3X3, FileText, Printer, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface SequenceItem {
  id: string
  number: number
  formattedNumber: string
  fullCode: string
  barcodeUrl?: string
}

export default function BarcodeSequenceGenerator() {
  // Sequence settings
  const [prefix, setPrefix] = useState<string>("")
  const [suffix, setSuffix] = useState<string>("")
  const [startNumber, setStartNumber] = useState<number>(1)
  const [endNumber, setEndNumber] = useState<number>(100)
  const [increment, setIncrement] = useState<number>(1)
  const [padding, setPadding] = useState<number>(3)
  const [usePadding, setUsePadding] = useState<boolean>(true)
  
  // Barcode settings
  const [barcodeFormat, setBarcodeFormat] = useState<"code128" | "code39" | "ean13" | "qr">("code128")
  const [barcodeWidth, setBarcodeWidth] = useState<number>(2)
  const [barcodeHeight, setBarcodeHeight] = useState<number>(60)
  const [showHumanReadable, setShowHumanReadable] = useState<boolean>(true)
  
  // Output settings
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [currentPage, setCurrentPage] = useState<number>(0)
  
  // State
  const [sequenceItems, setSequenceItems] = useState<SequenceItem[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const generateSequence = useCallback(async () => {
    if (startNumber >= endNumber) {
      setError("End number must be greater than start number")
      return
    }

    if (endNumber - startNumber > 10000) {
      setError("Maximum sequence length is 10,000 items")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const items: SequenceItem[] = []
      
      for (let num = startNumber; num <= endNumber; num += increment) {
        const formattedNum = usePadding ? num.toString().padStart(padding, "0") : num.toString()
        const fullCode = `${prefix}${formattedNum}${suffix}`
        
        items.push({
          id: `seq-${num}`,
          number: num,
          formattedNumber: formattedNum,
          fullCode: fullCode,
        })
      }

      // Generate barcodes in batches to avoid overwhelming the API
      const itemsWithBarcodes = await Promise.all(
        items.map(async (item) => {
          const params = new URLSearchParams({
            bcid: barcodeFormat,
            text: item.fullCode,
            scale: barcodeWidth.toString(),
            height: barcodeHeight.toString(),
            includetext: showHumanReadable ? "true" : "false",
          })

          const barcodeUrl = `https://bwipjs-api.metafloor.com/?${params.toString()}`
          return { ...item, barcodeUrl }
        })
      )

      setSequenceItems(itemsWithBarcodes)
      setCurrentPage(0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate sequence")
    } finally {
      setIsGenerating(false)
    }
  }, [startNumber, endNumber, increment, prefix, suffix, padding, usePadding, barcodeFormat, barcodeWidth, barcodeHeight, showHumanReadable])

  const downloadAll = useCallback(async () => {
    if (sequenceItems.length === 0) return

    // Download individual files
    for (const item of sequenceItems) {
      if (!item.barcodeUrl) continue
      
      try {
        const response = await fetch(item.barcodeUrl)
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = downloadUrl
        a.download = `barcode-${item.fullCode.replace(/[^a-z0-9]/gi, "-")}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(downloadUrl)
        
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (err) {
        console.error("Failed to download:", item.fullCode, err)
      }
    }
  }, [sequenceItems])

  const downloadCSV = useCallback(() => {
    if (sequenceItems.length === 0) return

    const csvContent = [
      "Number,Formatted Number,Full Code",
      ...sequenceItems.map(item => `${item.number},${item.formattedNumber},${item.fullCode}`)
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `barcode-sequence-${prefix || "seq"}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, [sequenceItems, prefix])

  const printLabels = useCallback(() => {
    alert("Print functionality would open a print dialog with all barcodes formatted for label sheets.")
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const copyAllCodes = useCallback(async () => {
    const allCodes = sequenceItems.map(item => item.fullCode).join("\n")
    await copyToClipboard(allCodes, "all")
  }, [sequenceItems, copyToClipboard])

  const clearAll = useCallback(() => {
    setSequenceItems([])
    setError(null)
    setCurrentPage(0)
  }, [])

  const totalPages = Math.ceil(sequenceItems.length / itemsPerPage)
  const currentPageItems = sequenceItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  // Preset configurations
  const applyPreset = (preset: string) => {
    switch (preset) {
      case "serial":
        setPrefix("SN-")
        setSuffix("")
        setStartNumber(1)
        setEndNumber(100)
        setIncrement(1)
        setPadding(6)
        setUsePadding(true)
        setBarcodeFormat("code128")
        break
      case "ticket":
        setPrefix("TKT")
        setSuffix("")
        setStartNumber(1000)
        setEndNumber(1100)
        setIncrement(1)
        setPadding(4)
        setUsePadding(true)
        setBarcodeFormat("code128")
        break
      case "asset":
        setPrefix("AST-")
        setSuffix("")
        setStartNumber(1)
        setEndNumber(50)
        setIncrement(1)
        setPadding(5)
        setUsePadding(true)
        setBarcodeFormat("code39")
        break
      case "inventory":
        setPrefix("INV")
        setSuffix("")
        setStartNumber(1)
        setEndNumber(200)
        setIncrement(1)
        setPadding(4)
        setUsePadding(true)
        setBarcodeFormat("code128")
        break
    }
    setError(null)
  }

  React.useEffect(() => {
    // Auto-generate when settings change and we have items
    if (sequenceItems.length > 0) {
      generateSequence()
    }
  }, [barcodeFormat, barcodeWidth, barcodeHeight, showHumanReadable])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Preset Configurations */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Quick Presets</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            onClick={() => applyPreset("serial")}
            className="h-auto py-3 flex flex-col gap-1"
          >
            <Hash className="size-5" />
            <span>Serial Numbers</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => applyPreset("ticket")}
            className="h-auto py-3 flex flex-col gap-1"
          >
            <TicketIcon className="size-5" />
            <span>Ticket Numbers</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => applyPreset("asset")}
            className="h-auto py-3 flex flex-col gap-1"
          >
            <Package className="size-5" />
            <span>Asset Tags</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => applyPreset("inventory")}
            className="h-auto py-3 flex flex-col gap-1"
          >
            <Grid3X3 className="size-5" />
            <span>Inventory IDs</span>
          </Button>
        </div>
      </section>

      {/* Sequence Settings */}
      <section className="rounded-lg border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Sequence Settings</h3>
          <Button variant="ghost" size="xs" onClick={clearAll} disabled={sequenceItems.length === 0}>
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prefix" className="text-sm">Prefix</Label>
            <Input
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="e.g., SN-, AST-"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="suffix" className="text-sm">Suffix</Label>
            <Input
              id="suffix"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder="e.g., -A, -2024"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="increment" className="text-sm">Increment</Label>
            <Input
              id="increment"
              type="number"
              value={increment}
              onChange={(e) => setIncrement(parseInt(e.target.value) || 1)}
              min={1}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start" className="text-sm">Start Number</Label>
            <Input
              id="start"
              type="number"
              value={startNumber}
              onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
              min={0}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end" className="text-sm">End Number</Label>
            <Input
              id="end"
              type="number"
              value={endNumber}
              onChange={(e) => setEndNumber(parseInt(e.target.value) || 100)}
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="padding" className="text-sm">Zero Padding</Label>
            <div className="flex items-center gap-2">
              <Input
                id="padding"
                type="number"
                value={padding}
                onChange={(e) => setPadding(parseInt(e.target.value) || 3)}
                min={1}
                max={10}
                disabled={!usePadding}
              />
              <Switch
                checked={usePadding}
                onCheckedChange={setUsePadding}
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-lg border bg-muted/30 p-3">
          <Label className="text-xs text-muted-foreground">Preview (first 5 numbers):</Label>
          <div className="flex flex-wrap gap-2 mt-2 font-mono text-sm">
            {Array.from({ length: Math.min(5, Math.ceil((endNumber - startNumber) / increment)) }, (_, i) => {
              const num = startNumber + (i * increment)
              const formatted = usePadding ? num.toString().padStart(padding, "0") : num.toString()
              return (
                <span key={i} className="px-2 py-1 rounded bg-background border">
                  {prefix}{formatted}{suffix}
                </span>
              )
            })}
            {endNumber - startNumber > 5 * increment && (
              <span className="px-2 py-1 text-muted-foreground">...</span>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Total: {Math.ceil((endNumber - startNumber) / increment) + 1} barcodes will be generated
          </div>
        </div>

        <Button onClick={generateSequence} disabled={isGenerating || startNumber >= endNumber}>
          {isGenerating ? "Generating..." : "Generate Sequence"}
        </Button>
      </section>

      {/* Barcode Settings */}
      {sequenceItems.length > 0 && (
        <section className="rounded-lg border p-4 space-y-4">
          <h3 className="text-sm font-medium">Barcode Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="format" className="text-sm">Format</Label>
              <Select value={barcodeFormat} onValueChange={(v) => setBarcodeFormat(v as typeof barcodeFormat)}>
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="code128">Code 128</SelectItem>
                  <SelectItem value="code39">Code 39</SelectItem>
                  <SelectItem value="ean13">EAN-13</SelectItem>
                  <SelectItem value="qr">QR Code</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bw" className="text-sm">Bar Width: {barcodeWidth}</Label>
              <Slider
                id="bw"
                value={[barcodeWidth]}
                onValueChange={(v) => setBarcodeWidth(v[0])}
                min={1}
                max={4}
                step={0.5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bh" className="text-sm">Height: {barcodeHeight}px</Label>
              <Slider
                id="bh"
                value={[barcodeHeight]}
                onValueChange={(v) => setBarcodeHeight(v[0])}
                min={30}
                max={100}
                step={10}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showHumanReadable}
                onChange={(e) => setShowHumanReadable(e.target.checked)}
                className="rounded border-input"
              />
              Show human-readable text
            </label>
          </div>
        </section>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Generated Barcodes */}
      {sequenceItems.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              Generated Barcodes ({sequenceItems.length})
            </Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={copyAllCodes}>
                {copied === "all" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy All Codes
              </Button>
              <Button variant="outline" size="sm" onClick={downloadCSV}>
                <FileText className="size-4 mr-1" />
                Download CSV
              </Button>
              <Button variant="outline" size="sm" onClick={printLabels}>
                <Printer className="size-4 mr-1" />
                Print
              </Button>
              <Button variant="default" size="sm" onClick={downloadAll}>
                <Download className="size-4 mr-1" />
                Download All
              </Button>
            </div>
          </div>

          {/* Page Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="per-page" className="text-sm">Items per page:</Label>
                <Select value={itemsPerPage.toString()} onValueChange={(v) => {
                  setItemsPerPage(parseInt(v))
                  setCurrentPage(0)
                }}>
                  <SelectTrigger id="per-page" className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Barcode Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {currentPageItems.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border bg-background p-3 space-y-2 text-center group"
              >
                {item.barcodeUrl ? (
                  <img
                    src={item.barcodeUrl}
                    alt={item.fullCode}
                    className="w-full h-auto max-h-[60px]"
                  />
                ) : (
                  <div className="h-10 bg-muted rounded animate-pulse" />
                )}
                <div className="font-mono text-xs truncate">{item.fullCode}</div>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(item.fullCode, item.id)}
                  className="w-full h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copied === item.id ? <Check className="size-3" /> : <Copy className="size-3" />}
                  <span className="text-xs ml-1">Copy</span>
                </Button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Sequence Range</div>
                <div className="font-mono">{startNumber} - {endNumber}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Increment</div>
                <div className="font-mono">+{increment}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Total Items</div>
                <div className="font-mono">{sequenceItems.length}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Format</div>
                <div className="font-mono">{barcodeFormat.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {sequenceItems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Hash className="size-12 mx-auto mb-4 opacity-50" />
          <p>Configure sequence settings and click Generate to create sequential barcodes</p>
        </div>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Sequence Generator Use Cases</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">Serial Numbers</div>
                <div className="text-muted-foreground">
                  Generate unique serial numbers for products, warranties, or certificates
                </div>
              </div>
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">Event Tickets</div>
                <div className="text-muted-foreground">
                  Create sequential ticket numbers with barcodes for events and admissions
                </div>
              </div>
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">Asset Tags</div>
                <div className="text-muted-foreground">
                  Generate barcode labels for equipment tracking and inventory management
                </div>
              </div>
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">Raffle Numbers</div>
                <div className="text-muted-foreground">
                  Create numbered tickets for raffles, giveaways, and contests
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Simple Ticket Icon component
function TicketIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  )
}

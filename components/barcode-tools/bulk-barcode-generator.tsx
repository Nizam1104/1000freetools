"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Download, Upload, FileText, Package, FileSpreadsheet, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface BarcodeItem {
  id: string
  data: string
  label?: string
  barcodeUrl?: string
}

export default function BulkBarcodeGenerator() {
  const [inputMode, setInputMode] = useState<"text" | "csv" | "sequence">("text")
  const [textInput, setTextInput] = useState<string>("")
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [barcodeItems, setBarcodeItems] = useState<BarcodeItem[]>([])
  const [format, setFormat] = useState<"code128" | "code39" | "ean13" | "upc" | "qr">("code128")
  const [width, setWidth] = useState<number>(2)
  const [height, setHeight] = useState<number>(80)
  const [showText, setShowText] = useState<boolean>(true)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  
  // Sequence generation settings
  const [seqStart, setSeqStart] = useState<string>("001")
  const [seqEnd, setSeqEnd] = useState<string>("100")
  const [seqIncrement, setSeqIncrement] = useState<number>(1)
  const [seqPrefix, setSeqPrefix] = useState<string>("")
  const [seqSuffix, setSeqSuffix] = useState<string>("")
  const [seqPadding, setSeqPadding] = useState<number>(3)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const parseCSV = useCallback((content: string): BarcodeItem[] => {
    const lines = content.trim().split("\n")
    const items: BarcodeItem[] = []
    
    lines.forEach((line, index) => {
      const parts = line.split(",")
      if (parts[0]?.trim()) {
        items.push({
          id: `item-${index}`,
          data: parts[0].trim(),
          label: parts[1]?.trim() || parts[0].trim(),
        })
      }
    })
    
    return items
  }, [])

  const generateSequence = useCallback((): BarcodeItem[] => {
    const items: BarcodeItem[] = []
    const start = parseInt(seqStart) || 1
    const end = parseInt(seqEnd) || 100
    
    for (let i = start; i <= end; i += seqIncrement) {
      const paddedNumber = i.toString().padStart(seqPadding, "0")
      items.push({
        id: `seq-${i}`,
        data: `${seqPrefix}${paddedNumber}${seqSuffix}`,
        label: `${seqPrefix}${paddedNumber}${seqSuffix}`,
      })
    }
    
    return items
  }, [seqStart, seqEnd, seqIncrement, seqPrefix, seqSuffix, seqPadding])

  const handleCSVUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".csv")) {
      setError("Please upload a valid CSV file")
      return
    }

    setCsvFile(file)
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      const items = parseCSV(content)
      setBarcodeItems(items)
    }
    reader.readAsText(file)
    event.target.value = ""
  }, [parseCSV])

  const handleTextParse = useCallback(() => {
    if (!textInput.trim()) {
      setError("Please enter data to generate barcodes")
      return
    }

    const lines = textInput.trim().split("\n")
    const items: BarcodeItem[] = lines
      .filter(line => line.trim())
      .map((line, index) => ({
        id: `text-${index}`,
        data: line.trim(),
        label: line.trim(),
      }))

    setBarcodeItems(items)
    setError(null)
  }, [textInput])

  const handleSequenceGenerate = useCallback(() => {
    const items = generateSequence()
    setBarcodeItems(items)
    setError(null)
  }, [generateSequence])

  const generateBarcodes = useCallback(async () => {
    if (barcodeItems.length === 0) {
      setError("No items to generate barcodes for")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const updatedItems = await Promise.all(
        barcodeItems.map(async (item) => {
          const params = new URLSearchParams({
            bcid: format,
            text: item.data,
            scale: width.toString(),
            height: height.toString(),
            includetext: showText ? "true" : "false",
          })

          const barcodeUrl = `https://bwipjs-api.metafloor.com/?${params.toString()}`
          return { ...item, barcodeUrl }
        })
      )

      setBarcodeItems(updatedItems)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate barcodes")
    } finally {
      setIsGenerating(false)
    }
  }, [barcodeItems, format, width, height, showText])

  const downloadAllAsZip = useCallback(async () => {
    const itemsWithUrls = barcodeItems.filter(item => item.barcodeUrl)
    if (itemsWithUrls.length === 0) return

    // For simplicity, download individual files
    // In production, use JSZip library
    for (const item of itemsWithUrls) {
      try {
        const response = await fetch(item.barcodeUrl!)
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = downloadUrl
        a.download = `barcode-${item.data.replace(/[^a-z0-9]/gi, "-").slice(0, 20)}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(downloadUrl)
        
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (err) {
        console.error("Failed to download:", item.data, err)
      }
    }
  }, [barcodeItems])

  const downloadAsPDF = useCallback(async () => {
    // In production, use jsPDF library
    alert("PDF generation would create a printable sheet with all barcodes arranged in a grid. This requires jsPDF library integration.")
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

  const clearAll = useCallback(() => {
    setTextInput("")
    setCsvFile(null)
    setBarcodeItems([])
    setError(null)
  }, [])

  const removeItem = useCallback((id: string) => {
    setBarcodeItems(items => items.filter(item => item.id !== id))
  }, [])

  React.useEffect(() => {
    if (barcodeItems.length > 0 && !barcodeItems[0].barcodeUrl) {
      generateBarcodes()
    }
  }, [format, width, height, showText])

  const formatOptions = [
    { value: "code128", label: "Code 128", description: "General purpose" },
    { value: "code39", label: "Code 39", description: "Industrial" },
    { value: "ean13", label: "EAN-13", description: "Retail products" },
    { value: "upc", label: "UPC-A", description: "US retail" },
    { value: "qr", label: "QR Code", description: "2D code" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Input Method</Label>
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant={inputMode === "text" ? "default" : "outline"}
            onClick={() => setInputMode("text")}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <FileText className="size-5" />
            <span>Text List</span>
          </Button>
          <Button
            variant={inputMode === "csv" ? "default" : "outline"}
            onClick={() => setInputMode("csv")}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <FileSpreadsheet className="size-5" />
            <span>CSV Upload</span>
          </Button>
          <Button
            variant={inputMode === "sequence" ? "default" : "outline"}
            onClick={() => setInputMode("sequence")}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <Package className="size-5" />
            <span>Sequence</span>
          </Button>
        </div>
      </section>

      {/* Text Input Mode */}
      {inputMode === "text" && (
        <section className="space-y-3">
          <Label htmlFor="text-input" className="text-base font-medium">
            Enter Data (one per line)
          </Label>
          <Textarea
            id="text-input"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
            placeholder="ITEM001&#10;ITEM002&#10;ITEM003&#10;..."
          />
          <Button onClick={handleTextParse} disabled={!textInput.trim()}>
            Parse and Generate
          </Button>
        </section>
      )}

      {/* CSV Upload Mode */}
      {inputMode === "csv" && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Upload CSV File</Label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="size-4" />
              <span>Select CSV File</span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
            {csvFile && (
              <div className="flex items-center gap-2 text-sm">
                <FileSpreadsheet className="size-4 text-muted-foreground" />
                <span>{csvFile.name}</span>
                <Button variant="ghost" size="xs" onClick={() => setCsvFile(null)}>
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            CSV format: data,label (label is optional)
          </p>
        </section>
      )}

      {/* Sequence Mode */}
      {inputMode === "sequence" && (
        <section className="rounded-lg border p-4 space-y-4">
          <h3 className="text-sm font-medium">Sequence Settings</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seq-start" className="text-sm">Start Value</Label>
              <Input
                id="seq-start"
                value={seqStart}
                onChange={(e) => setSeqStart(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seq-end" className="text-sm">End Value</Label>
              <Input
                id="seq-end"
                value={seqEnd}
                onChange={(e) => setSeqEnd(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seq-increment" className="text-sm">Increment</Label>
              <Input
                id="seq-increment"
                type="number"
                value={seqIncrement}
                onChange={(e) => setSeqIncrement(parseInt(e.target.value) || 1)}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seq-padding" className="text-sm">Zero Padding</Label>
              <Input
                id="seq-padding"
                type="number"
                value={seqPadding}
                onChange={(e) => setSeqPadding(parseInt(e.target.value) || 3)}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seq-prefix" className="text-sm">Prefix</Label>
              <Input
                id="seq-prefix"
                value={seqPrefix}
                onChange={(e) => setSeqPrefix(e.target.value)}
                placeholder="e.g., SN-"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seq-suffix" className="text-sm">Suffix</Label>
              <Input
                id="seq-suffix"
                value={seqSuffix}
                onChange={(e) => setSeqSuffix(e.target.value)}
                placeholder="e.g., -A"
              />
            </div>
          </div>

          <Button onClick={handleSequenceGenerate}>
            Generate Sequence
          </Button>

          <div className="text-sm text-muted-foreground">
            Preview: {seqPrefix}{parseInt(seqStart)?.toString().padStart(seqPadding, "0")}{seqSuffix} to{" "}
            {seqPrefix}{parseInt(seqEnd)?.toString().padStart(seqPadding, "0")}{seqSuffix}
          </div>
        </section>
      )}

      {/* Barcode Format & Options */}
      <section className="rounded-lg border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Barcode Settings</h3>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            disabled={barcodeItems.length === 0}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear All</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="format" className="text-sm">Format</Label>
            <Select value={format} onValueChange={(v) => setFormat(v as typeof format)}>
              <SelectTrigger id="format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className="flex flex-col">
                      <span>{opt.label}</span>
                      <span className="text-muted-foreground text-xs">{opt.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end pb-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show-text"
                checked={showText}
                onChange={(e) => setShowText(e.target.checked)}
                className="rounded border-input"
              />
              <Label htmlFor="show-text" className="text-sm cursor-pointer">
                Show human-readable text
              </Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width" className="text-sm">Bar Width: {width}</Label>
            <Slider
              id="width"
              value={[width]}
              onValueChange={(v) => setWidth(v[0])}
              min={1}
              max={4}
              step={0.5}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height" className="text-sm">Height: {height}px</Label>
            <Slider
              id="height"
              value={[height]}
              onValueChange={(v) => setHeight(v[0])}
              min={50}
              max={150}
              step={10}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Generated Barcodes Preview */}
      {barcodeItems.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              Generated Barcodes ({barcodeItems.length})
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadAsPDF}
                disabled={isGenerating}
              >
                <FileText className="size-4 mr-1" />
                Download PDF
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={downloadAllAsZip}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="size-4 mr-1 animate-spin" />
                ) : (
                  <Download className="size-4 mr-1" />
                )}
                Download All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {barcodeItems.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border bg-background p-3 space-y-2 relative group"
              >
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => removeItem(item.id)}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                >
                  <Trash2 className="size-3" />
                </Button>
                {item.barcodeUrl ? (
                  <img
                    src={item.barcodeUrl}
                    alt={item.data}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="h-20 flex items-center justify-center bg-muted rounded">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  </div>
                )}
                <div className="text-xs font-mono text-center truncate">{item.data}</div>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(item.data, item.id)}
                  className="w-full h-6"
                >
                  {copied === item.id ? <Check className="size-3" /> : <Copy className="size-3" />}
                  <span className="text-xs ml-1">Copy</span>
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {barcodeItems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter data using one of the input methods above to generate bulk barcodes</p>
        </div>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Bulk Generation Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Use CSV upload for large datasets with labels</li>
          <li>Sequence mode is perfect for serial numbers and sequential IDs</li>
          <li>Test a small batch before generating hundreds of barcodes</li>
          <li>PDF output is ideal for printing on label sheets</li>
          <li>Download All creates individual PNG files for each barcode</li>
        </ul>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Trash2, Download, Upload, FileText, Image as ImageIcon, Grid3X3, LayoutTemplate, Printer, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface BarcodeItem {
  id: string
  data: string
  label?: string
  barcodeUrl?: string
}

interface LabelTemplate {
  id: string
  name: string
  columns: number
  rows: number
  labelWidth: number // mm
  labelHeight: number // mm
  pageWidth: number // mm
  pageHeight: number // mm
  marginTop: number // mm
  marginLeft: number // mm
  gapHorizontal: number // mm
  gapVertical: number // mm
}

const labelTemplates: LabelTemplate[] = [
  { id: "avery-5160", name: "Avery 5160 (US Letter)", columns: 3, rows: 10, labelWidth: 66.67, labelHeight: 25.4, pageWidth: 215.9, pageHeight: 279.4, marginTop: 10.7, marginLeft: 4.76, gapHorizontal: 3.18, gapVertical: 0 },
  { id: "avery-5161", name: "Avery 5161 (US Letter)", columns: 2, rows: 10, labelWidth: 101.6, labelHeight: 25.4, pageWidth: 215.9, pageHeight: 279.4, marginTop: 10.7, marginLeft: 4.76, gapHorizontal: 3.18, gapVertical: 0 },
  { id: "avery-5162", name: "Avery 5162 (US Letter)", columns: 2, rows: 7, labelWidth: 101.6, labelHeight: 33.87, pageWidth: 215.9, pageHeight: 279.4, marginTop: 21.2, marginLeft: 4.76, gapHorizontal: 3.18, gapVertical: 0 },
  { id: "avery-5163", name: "Avery 5163 (US Letter)", columns: 2, rows: 5, labelWidth: 101.6, labelHeight: 50.8, pageWidth: 215.9, pageHeight: 279.4, marginTop: 12.7, marginLeft: 4.76, gapHorizontal: 3.18, gapVertical: 0 },
  { id: "avery-5164", name: "Avery 5164 (US Letter)", columns: 2, rows: 3, labelWidth: 101.6, labelHeight: 88.9, pageWidth: 215.9, pageHeight: 279.4, marginTop: 12.7, marginLeft: 4.76, gapHorizontal: 3.18, gapVertical: 0 },
  { id: "avery-l7160", name: "Avery L7160 (A4)", columns: 3, rows: 7, labelWidth: 63.5, labelHeight: 38.1, pageWidth: 210, pageHeight: 297, marginTop: 15.5, marginLeft: 7, gapHorizontal: 2.5, gapVertical: 0 },
  { id: "avery-l7163", name: "Avery L7163 (A4)", columns: 2, rows: 7, labelWidth: 99.1, labelHeight: 38.1, pageWidth: 210, pageHeight: 297, marginTop: 15.5, marginLeft: 5.95, gapHorizontal: 2.5, gapVertical: 0 },
  { id: "avery-l7165", name: "Avery L7165 (A4)", columns: 2, rows: 5, labelWidth: 99.1, labelHeight: 67.7, pageWidth: 210, pageHeight: 297, marginTop: 15.5, marginLeft: 5.95, gapHorizontal: 2.5, gapVertical: 0 },
  { id: "custom", name: "Custom Template", columns: 3, rows: 5, labelWidth: 70, labelHeight: 40, pageWidth: 210, pageHeight: 297, marginTop: 15, marginLeft: 10, gapHorizontal: 5, gapVertical: 5 },
]

export default function BarcodeToPDF() {
  const [inputMode, setInputMode] = useState<"text" | "upload">("text")
  const [textInput, setTextInput] = useState<string>("")
  const [barcodeItems, setBarcodeItems] = useState<BarcodeItem[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("avery-5160")
  const [barcodeFormat, setBarcodeFormat] = useState<"code128" | "code39" | "ean13" | "qr">("code128")
  const [showLabels, setShowLabels] = useState<boolean>(true)
  const [showHumanReadable, setShowHumanReadable] = useState<boolean>(true)
  const [barcodeWidth, setBarcodeWidth] = useState<number>(2)
  const [barcodeHeight, setBarcodeHeight] = useState<number>(60)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [previewPage, setPreviewPage] = useState<number>(0)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const currentTemplate = labelTemplates.find(t => t.id === selectedTemplate) || labelTemplates[0]

  const handleTextParse = useCallback(() => {
    if (!textInput.trim()) {
      setError("Please enter data to generate barcodes")
      return
    }

    const lines = textInput.trim().split("\n")
    const items: BarcodeItem[] = lines
      .filter(line => line.trim())
      .map((line, index) => {
        const parts = line.split(",")
        return {
          id: `item-${index}`,
          data: parts[0].trim(),
          label: parts[1]?.trim() || parts[0].trim(),
        }
      })

    setBarcodeItems(items)
    setError(null)
  }, [textInput])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".csv")) {
      setError("Please upload a valid CSV file")
      return
    }

    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      const lines = content.trim().split("\n")
      const items: BarcodeItem[] = lines
        .filter(line => line.trim())
        .map((line, index) => {
          const parts = line.split(",")
          return {
            id: `csv-${index}`,
            data: parts[0].trim(),
            label: parts[1]?.trim() || parts[0].trim(),
          }
        })
      setBarcodeItems(items)
    }
    reader.readAsText(file)
    event.target.value = ""
  }, [])

  const generateBarcodes = useCallback(async () => {
    if (barcodeItems.length === 0) return

    setIsGenerating(true)
    setError(null)

    try {
      const updatedItems = await Promise.all(
        barcodeItems.map(async (item) => {
          const params = new URLSearchParams({
            bcid: barcodeFormat,
            text: item.data,
            scale: barcodeWidth.toString(),
            height: barcodeHeight.toString(),
            includetext: showHumanReadable ? "true" : "false",
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
  }, [barcodeItems, barcodeFormat, barcodeWidth, barcodeHeight, showHumanReadable])

  const downloadPDF = useCallback(async () => {
    if (barcodeItems.length === 0 || !currentTemplate) return

    // In production, use jsPDF library
    alert(`PDF Generation would create a printable PDF with:\n\n- Template: ${currentTemplate.name}\n- Labels per page: ${currentTemplate.columns} x ${currentTemplate.rows}\n- Total barcodes: ${barcodeItems.length}\n- Pages needed: ${Math.ceil(barcodeItems.length / (currentTemplate.columns * currentTemplate.rows))}\n\nThis requires jsPDF library integration for actual PDF generation.`)
  }, [barcodeItems, currentTemplate])

  const printLabels = useCallback(() => {
    alert("Print functionality would open a print dialog with the barcode sheet formatted for the selected label template.")
  }, [])

  const clearAll = useCallback(() => {
    setTextInput("")
    setBarcodeItems([])
    setError(null)
    setPreviewPage(0)
  }, [])

  const removeItem = useCallback((id: string) => {
    setBarcodeItems(items => items.filter(item => item.id !== id))
  }, [])

  React.useEffect(() => {
    if (barcodeItems.length > 0 && !barcodeItems[0].barcodeUrl) {
      generateBarcodes()
    }
  }, [barcodeFormat, barcodeWidth, barcodeHeight, showHumanReadable])

  const totalPages = currentTemplate ? Math.ceil(barcodeItems.length / (currentTemplate.columns * currentTemplate.rows)) : 1
  const itemsPerPage = currentTemplate ? currentTemplate.columns * currentTemplate.rows : 15
  const currentPageItems = barcodeItems.slice(previewPage * itemsPerPage, (previewPage + 1) * itemsPerPage)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Input Mode Selection */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Input Method</Label>
          <Button variant="ghost" size="xs" onClick={clearAll} disabled={barcodeItems.length === 0}>
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear All</span>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={inputMode === "text" ? "default" : "outline"}
            onClick={() => setInputMode("text")}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <FileText className="size-5" />
            <span>Text List</span>
          </Button>
          <Button
            variant={inputMode === "upload" ? "default" : "outline"}
            onClick={() => setInputMode("upload")}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <Upload className="size-5" />
            <span>CSV Upload</span>
          </Button>
        </div>
      </section>

      {/* Text Input */}
      {inputMode === "text" && (
        <section className="space-y-3">
          <Label htmlFor="text-input" className="text-base font-medium">
            Enter Data (one per line)
          </Label>
          <div className="flex gap-2">
            <Textarea
              id="text-input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="font-mono text-sm flex-1 min-h-[150px]"
              placeholder="ITEM001, Product A&#10;ITEM002, Product B&#10;ITEM003, Product C"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleTextParse} disabled={!textInput.trim()}>
              Parse and Generate
            </Button>
            <span className="text-sm text-muted-foreground">
              Format: data, label (label optional)
            </span>
          </div>
        </section>
      )}

      {/* CSV Upload */}
      {inputMode === "upload" && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Upload CSV File</Label>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="size-4 mr-2" />
              Select CSV File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            CSV format: data,label (label is optional)
          </p>
        </section>
      )}

      {/* Template Selection */}
      <section className="rounded-lg border p-4 space-y-4">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="size-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Label Template</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm">Preset Templates</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger id="template">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {labelTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name} ({template.columns}x{template.rows} = {template.columns * template.rows} labels)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format" className="text-sm">Barcode Format</Label>
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
        </div>

        {currentTemplate && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="p-3 rounded border bg-muted/30">
              <div className="text-muted-foreground">Page Size</div>
              <div className="font-mono">{currentTemplate.pageWidth} x {currentTemplate.pageHeight} mm</div>
            </div>
            <div className="p-3 rounded border bg-muted/30">
              <div className="text-muted-foreground">Label Size</div>
              <div className="font-mono">{currentTemplate.labelWidth} x {currentTemplate.labelHeight} mm</div>
            </div>
            <div className="p-3 rounded border bg-muted/30">
              <div className="text-muted-foreground">Labels/Page</div>
              <div className="font-mono">{currentTemplate.columns} x {currentTemplate.rows} = {itemsPerPage}</div>
            </div>
            <div className="p-3 rounded border bg-muted/30">
              <div className="text-muted-foreground">Margins</div>
              <div className="font-mono">T:{currentTemplate.marginTop} L:{currentTemplate.marginLeft} mm</div>
            </div>
          </div>
        )}
      </section>

      {/* Barcode Options */}
      <section className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-medium">Barcode Options</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded border-input"
            />
            Show item labels
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showHumanReadable}
              onChange={(e) => setShowHumanReadable(e.target.checked)}
              className="rounded border-input"
            />
            Show human-readable text in barcode
          </label>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Preview */}
      {barcodeItems.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              Preview ({barcodeItems.length} barcodes, {totalPages} page{totalPages > 1 ? "s" : ""})
            </Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={printLabels}>
                <Printer className="size-4 mr-1" />
                Print
              </Button>
              <Button variant="default" size="sm" onClick={downloadPDF}>
                <Download className="size-4 mr-1" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Page Navigation */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewPage(Math.max(0, previewPage - 1))}
                disabled={previewPage === 0}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {previewPage + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewPage(Math.min(totalPages - 1, previewPage + 1))}
                disabled={previewPage === totalPages - 1}
              >
                Next
              </Button>
            </div>
          )}

          {/* Label Grid Preview */}
          <div className="rounded-lg border bg-background p-4">
            <div
              className="grid gap-2 mx-auto"
              style={{
                gridTemplateColumns: `repeat(${currentTemplate?.columns || 3}, 1fr)`,
                maxWidth: `${currentTemplate?.pageWidth || 210}mm`,
              }}
            >
              {currentPageItems.map((item, index) => (
                <div
                  key={item.id}
                  className="border rounded p-2 flex flex-col items-center justify-center min-h-[80px] relative group"
                  style={{
                    width: `${currentTemplate?.labelWidth || 60}mm`,
                    height: `${currentTemplate?.labelHeight || 40}mm`,
                  }}
                >
                  {item.barcodeUrl ? (
                    <img src={item.barcodeUrl} alt={item.data} className="max-w-full h-auto max-h-[50px]" />
                  ) : (
                    <div className="h-10 w-24 bg-muted rounded animate-pulse" />
                  )}
                  {showLabels && item.label && (
                    <div className="text-xs text-center mt-1 truncate max-w-full">{item.label}</div>
                  )}
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => removeItem(item.id)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 h-5 w-5 p-0"
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              ))}
              {/* Empty cells */}
              {Array.from({ length: Math.max(0, itemsPerPage - currentPageItems.length) }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="border border-dashed rounded opacity-30"
                  style={{
                    width: `${currentTemplate?.labelWidth || 60}mm`,
                    height: `${currentTemplate?.labelHeight || 40}mm`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* All Items List */}
          <section className="rounded-lg border p-4">
            <h4 className="text-sm font-medium mb-3">All Barcodes ({barcodeItems.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-[300px] overflow-y-auto">
              {barcodeItems.map((item) => (
                <div key={item.id} className="border rounded p-2 text-center">
                  {item.barcodeUrl ? (
                    <img src={item.barcodeUrl} alt={item.data} className="w-full h-auto max-h-[40px]" />
                  ) : (
                    <div className="h-8 bg-muted rounded animate-pulse" />
                  )}
                  <div className="text-xs truncate mt-1">{item.data}</div>
                </div>
              ))}
            </div>
          </section>
        </section>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Empty State */}
      {barcodeItems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Grid3X3 className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter or upload barcode data to generate printable label sheets</p>
        </div>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">PDF Label Sheet Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Select the template that matches your label sheets (Avery, etc.)</li>
              <li>Test print on plain paper first to verify alignment</li>
              <li>Use Code 128 for general purpose, EAN-13 for retail products</li>
              <li>Ensure barcode height is sufficient for scanners (minimum 15mm)</li>
              <li>Set printer to 100% scale (no fit-to-page)</li>
              <li>Use high-quality label sheets for best scanning results</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

// Add Textarea component import
import { Textarea } from "@/components/ui/textarea"

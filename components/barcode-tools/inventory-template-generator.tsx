"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Check, Trash2, Download, Upload, FileSpreadsheet, Package, Printer, Plus, X, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface InventoryItem {
  id: string
  name: string
  sku: string
  serialNumber?: string
  quantity?: number
  location?: string
  barcodeUrl?: string
}

interface LabelTemplate {
  id: string
  name: string
  type: "sheet" | "continuous"
  columns: number
  rows: number
  labelWidth: number
  labelHeight: number
  pageWidth: number
  pageHeight: number
}

const inventoryTemplates: LabelTemplate[] = [
  { id: "avery-5160", name: "Avery 5160 (Address Labels)", type: "sheet", columns: 3, rows: 10, labelWidth: 66.67, labelHeight: 25.4, pageWidth: 215.9, pageHeight: 279.4 },
  { id: "avery-5163", name: "Avery 5163 (Shipping Labels)", type: "sheet", columns: 2, rows: 5, labelWidth: 101.6, labelHeight: 50.8, pageWidth: 215.9, pageHeight: 279.4 },
  { id: "avery-5164", name: "Avery 5164 (Large Shipping)", type: "sheet", columns: 2, rows: 3, labelWidth: 101.6, labelHeight: 88.9, pageWidth: 215.9, pageHeight: 279.4 },
  { id: "avery-l7160", name: "Avery L7160 (A4 Address)", type: "sheet", columns: 3, rows: 7, labelWidth: 63.5, labelHeight: 38.1, pageWidth: 210, pageHeight: 297 },
  { id: "avery-l7163", name: "Avery L7163 (A4 Shipping)", type: "sheet", columns: 2, rows: 7, labelWidth: 99.1, labelHeight: 38.1, pageWidth: 210, pageHeight: 297 },
  { id: "sheet-4x6", name: "4x6 Shipping Labels", type: "sheet", columns: 1, rows: 2, labelWidth: 101.6, labelHeight: 152.4, pageWidth: 215.9, pageHeight: 279.4 },
  { id: "custom-small", name: "Custom Small (30x15mm)", type: "sheet", columns: 6, rows: 12, labelWidth: 30, labelHeight: 15, pageWidth: 210, pageHeight: 297 },
  { id: "custom-medium", name: "Custom Medium (50x25mm)", type: "sheet", columns: 4, rows: 8, labelWidth: 50, labelHeight: 25, pageWidth: 210, pageHeight: 297 },
]

export default function InventoryTemplateGenerator() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("avery-5160")
  const [barcodeFormat, setBarcodeFormat] = useState<"code128" | "code39" | "ean13" | "qr">("code128")
  const [showFields, setShowFields] = useState<{ name: boolean; sku: boolean; serial: boolean; quantity: boolean; location: boolean }>({
    name: true,
    sku: true,
    serial: false,
    quantity: false,
    location: false,
  })
  const [barcodeHeight, setBarcodeHeight] = useState<number>(40)
  const [fontSize, setFontSize] = useState<number>(10)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  
  // Input fields
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    sku: "",
    serialNumber: "",
    quantity: 1,
    location: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const currentTemplate = inventoryTemplates.find(t => t.id === selectedTemplate) || inventoryTemplates[0]

  const addNewItem = useCallback(() => {
    if (!newItem.name || !newItem.sku) {
      setError("Name and SKU are required")
      return
    }

    const item: InventoryItem = {
      id: `item-${Date.now()}`,
      name: newItem.name,
      sku: newItem.sku,
      serialNumber: newItem.serialNumber,
      quantity: newItem.quantity || 1,
      location: newItem.location,
    }

    setInventoryItems([...inventoryItems, item])
    setNewItem({ name: "", sku: "", serialNumber: "", quantity: 1, location: "" })
    setError(null)
  }, [newItem, inventoryItems])

  const removeItem = useCallback((id: string) => {
    setInventoryItems(items => items.filter(item => item.id !== id))
  }, [])

  const handleCSVUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
      const headers = lines[0].split(",").map(h => h.trim().toLowerCase())
      
      const items: InventoryItem[] = lines.slice(1).map((line, index) => {
        const values = line.split(",").map(v => v.trim())
        const item: InventoryItem = {
          id: `csv-${index}`,
          name: values[headers.indexOf("name")] || values[0] || "Unknown",
          sku: values[headers.indexOf("sku")] || values[1] || `SKU-${index}`,
          serialNumber: values[headers.indexOf("serial")] || values[headers.indexOf("serialnumber")] || "",
          quantity: parseInt(values[headers.indexOf("quantity")] || "1") || 1,
          location: values[headers.indexOf("location")] || "",
        }
        return item
      })

      setInventoryItems([...inventoryItems, ...items])
    }
    reader.readAsText(file)
    event.target.value = ""
  }, [inventoryItems])

  const generateBarcodes = useCallback(async () => {
    if (inventoryItems.length === 0) return

    setIsGenerating(true)
    setError(null)

    try {
      const updatedItems = await Promise.all(
        inventoryItems.map(async (item) => {
          const params = new URLSearchParams({
            bcid: barcodeFormat,
            text: item.sku,
            scale: "2",
            height: barcodeHeight.toString(),
            includetext: "true",
          })

          const barcodeUrl = `https://bwipjs-api.metafloor.com/?${params.toString()}`
          return { ...item, barcodeUrl }
        })
      )

      setInventoryItems(updatedItems)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate barcodes")
    } finally {
      setIsGenerating(false)
    }
  }, [inventoryItems, barcodeFormat, barcodeHeight])

  const downloadPDF = useCallback(async () => {
    if (inventoryItems.length === 0) return

    alert(`PDF Generation would create a printable inventory sheet with:\n\n- Template: ${currentTemplate.name}\n- Total items: ${inventoryItems.length}\n- Labels per page: ${currentTemplate.columns} x ${currentTemplate.rows}\n\nThis requires jsPDF library integration for actual PDF generation.`)
  }, [inventoryItems, currentTemplate])

  const downloadCSV = useCallback(() => {
    if (inventoryItems.length === 0) return

    const headers = ["Name", "SKU", "Serial Number", "Quantity", "Location"]
    const csvContent = [
      headers.join(","),
      ...inventoryItems.map(item => 
        [item.name, item.sku, item.serialNumber || "", item.quantity, item.location || ""].join(",")
      )
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "inventory-list.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, [inventoryItems])

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
    setInventoryItems([])
    setNewItem({ name: "", sku: "", serialNumber: "", quantity: 1, location: "" })
    setError(null)
  }, [])

  React.useEffect(() => {
    if (inventoryItems.length > 0 && !inventoryItems[0].barcodeUrl) {
      generateBarcodes()
    }
  }, [barcodeFormat, barcodeHeight])

  const itemsPerPage = currentTemplate.columns * currentTemplate.rows
  const totalPages = Math.ceil(inventoryItems.length / itemsPerPage)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Add New Item */}
      <section className="rounded-lg border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Add Inventory Item</h3>
          <Button variant="ghost" size="xs" onClick={clearAll} disabled={inventoryItems.length === 0}>
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear All</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="item-name" className="text-sm">Item Name *</Label>
            <Input
              id="item-name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Product name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-sku" className="text-sm">SKU *</Label>
            <Input
              id="item-sku"
              value={newItem.sku}
              onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
              placeholder="SKU-001"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-qty" className="text-sm">Quantity</Label>
            <Input
              id="item-qty"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="item-serial" className="text-sm">Serial Number</Label>
            <Input
              id="item-serial"
              value={newItem.serialNumber}
              onChange={(e) => setNewItem({ ...newItem, serialNumber: e.target.value })}
              placeholder="Optional"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-location" className="text-sm">Location</Label>
            <Input
              id="item-location"
              value={newItem.location}
              onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
              placeholder="Shelf A-1"
            />
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex items-center gap-2">
          <Button onClick={addNewItem}>
            <Plus className="size-4 mr-1" />
            Add Item
          </Button>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="size-4 mr-1" />
            Import CSV
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="hidden"
          />
          <Button variant="outline" onClick={downloadCSV} disabled={inventoryItems.length === 0}>
            <FileSpreadsheet className="size-4 mr-1" />
            Export CSV
          </Button>
        </div>
      </section>

      {/* Template & Format Selection */}
      <section className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-medium">Label Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm">Label Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger id="template">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {inventoryTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
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

          <div className="space-y-2">
            <Label htmlFor="bheight" className="text-sm">Barcode Height: {barcodeHeight}px</Label>
            <Slider
              id="bheight"
              value={[barcodeHeight]}
              onValueChange={(v) => setBarcodeHeight(v[0])}
              min={20}
              max={80}
              step={5}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-medium">Show on label:</span>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showFields.name}
              onChange={(e) => setShowFields({ ...showFields, name: e.target.checked })}
              className="rounded border-input"
            />
            Name
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showFields.sku}
              onChange={(e) => setShowFields({ ...showFields, sku: e.target.checked })}
              className="rounded border-input"
            />
            SKU
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showFields.serial}
              onChange={(e) => setShowFields({ ...showFields, serial: e.target.checked })}
              className="rounded border-input"
            />
            Serial
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showFields.quantity}
              onChange={(e) => setShowFields({ ...showFields, quantity: e.target.checked })}
              className="rounded border-input"
            />
            Quantity
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showFields.location}
              onChange={(e) => setShowFields({ ...showFields, location: e.target.checked })}
              className="rounded border-input"
            />
            Location
          </label>
        </div>

        {currentTemplate && (
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded border bg-muted/30">
              <div className="text-muted-foreground">Label Size</div>
              <div className="font-mono">{currentTemplate.labelWidth} x {currentTemplate.labelHeight} mm</div>
            </div>
            <div className="p-3 rounded border bg-muted/30">
              <div className="text-muted-foreground">Labels/Page</div>
              <div className="font-mono">{currentTemplate.columns} x {currentTemplate.rows} = {itemsPerPage}</div>
            </div>
            <div className="p-3 rounded border bg-muted/30">
              <div className="text-muted-foreground">Total Pages</div>
              <div className="font-mono">{totalPages}</div>
            </div>
          </div>
        )}
      </section>

      {/* Inventory List */}
      {inventoryItems.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              Inventory Items ({inventoryItems.length})
            </Label>
            <Button variant="default" size="sm" onClick={downloadPDF}>
              <Download className="size-4 mr-1" />
              Download PDF
            </Button>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Preview</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Serial</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.barcodeUrl ? (
                        <img src={item.barcodeUrl} alt={item.sku} className="h-8 w-auto" />
                      ) : (
                        <div className="h-6 w-16 bg-muted rounded animate-pulse" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.serialNumber || "-"}</TableCell>
                    <TableCell className="text-sm">{item.quantity}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.location || "-"}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}

      {/* Label Preview */}
      {inventoryItems.length > 0 && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Label Preview</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {inventoryItems.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-3 space-y-2 bg-background"
                style={{
                  width: `${currentTemplate.labelWidth}mm`,
                  minHeight: `${currentTemplate.labelHeight}mm`,
                }}
              >
                <div className="text-center">
                  {item.barcodeUrl ? (
                    <img src={item.barcodeUrl} alt={item.sku} className="h-10 w-auto mx-auto" />
                  ) : (
                    <div className="h-8 w-24 bg-muted rounded mx-auto animate-pulse" />
                  )}
                </div>
                {showFields.name && (
                  <div className="text-sm font-medium text-center truncate">{item.name}</div>
                )}
                {showFields.sku && (
                  <div className="text-xs font-mono text-center text-muted-foreground">{item.sku}</div>
                )}
                {showFields.serial && item.serialNumber && (
                  <div className="text-xs text-center text-muted-foreground">S/N: {item.serialNumber}</div>
                )}
                {showFields.quantity && (
                  <div className="text-xs text-center">Qty: {item.quantity}</div>
                )}
                {showFields.location && item.location && (
                  <div className="text-xs text-center text-muted-foreground">Loc: {item.location}</div>
                )}
              </div>
            ))}
          </div>
          {inventoryItems.length > 8 && (
            <p className="text-sm text-muted-foreground text-center">
              ...and {inventoryItems.length - 8} more items
            </p>
          )}
        </section>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Empty State */}
      {inventoryItems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="size-12 mx-auto mb-4 opacity-50" />
          <p>Add inventory items or import a CSV file to generate barcode labels</p>
        </div>
      )}

      {/* CSV Template */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h4 className="text-sm font-medium">CSV Import Format</h4>
        <p className="text-sm text-muted-foreground">
          Create a CSV file with the following columns:
        </p>
        <div className="font-mono text-xs bg-background p-3 rounded border">
          name,sku,serialNumber,quantity,location<br />
          Widget A,WA-001,SN123456,100,Shelf A-1<br />
          Widget B,WB-002,SN123457,50,Shelf A-2<br />
          Gadget X,GX-003,,25,Shelf B-1
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const template = "name,sku,serialNumber,quantity,location\nProduct Name,SKU-001,Serial123,10,Location A"
            copyToClipboard(template, "csv-template")
          }}
        >
          {copied === "csv-template" ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
          Copy Template
        </Button>
      </section>
    </div>
  )
}

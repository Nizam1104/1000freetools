"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Copy,
  Check,
  Trash2,
  Download,
  Plus,
  Trash,
  QrCode,
  Wand2,
  RefreshCcw
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface QRItem {
  id: string
  type: "url" | "text" | "email" | "phone" | "wifi"
  content: string
}

export function BulkQrCodeGenerator() {
  const [items, setItems] = useState<QRItem[]>([
    { id: "1", type: "url", content: "https://google.com" }
  ])
  const [textInput, setTextInput] = useState("")
  const [size, setSize] = useState(256)
  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [copied, setCopied] = useState(false)

  // Add a single row
  const addItem = useCallback(() => {
    setItems(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      type: "url",
      content: ""
    }])
  }, [])

  // Remove a single row
  const removeItem = useCallback((id: string) => {
    if (items.length > 1) {
      setItems(items.filter(i => i.id !== id))
    }
  }, [items])

  const updateItem = useCallback((id: string, field: keyof QRItem, value: string) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i))
  }, [items])

  // Bulk Import Logic
  const handleBulkImport = () => {
    const lines = textInput.split('\n').filter(l => l.trim())
    const newItems = lines.map((line) => ({
      id: Math.random().toString(36).substr(2, 9),
      type: "url" as const,
      content: line.trim()
    }))
    setItems(prev => [...prev, ...newItems])
    setTextInput("")
  }

  const handleClearAll = () => {
    setItems([{ id: "1", type: "url", content: "" }])
  }

  // Individual Download logic
  const downloadQR = (id: string, fileName: string) => {
    const svg = document.getElementById(id) as SVGGraphicsElement | null
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = size
      canvas.height = size
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = `${fileName.replace(/[^a-z0-9]/gi, '_')}_qr.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }
    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleClearAll}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Settings & Input */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Design Settings</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Size (px)</Label>
                <Input
                  type="number"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>QR Color</Label>
                <div className="flex gap-2">
                  <Input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-12 p-1 h-10" />
                  <Input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="font-mono text-xs" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background</Label>
                <div className="flex gap-2">
                  <Input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 p-1 h-10" />
                  <Input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="font-mono text-xs" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4 pt-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg border group">
                  <select
                    value={item.type}
                    onChange={(e) => updateItem(item.id, "type", e.target.value as any)}
                    className="bg-background border rounded px-2 py-2 text-sm focus:ring-2 ring-primary outline-none"
                  >
                    <option value="url">URL</option>
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                  <Input
                    value={item.content}
                    onChange={(e) => updateItem(item.id, "content", e.target.value)}
                    placeholder="Enter content here..."
                    className="bg-background"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full border-dashed" onClick={addItem}>
                <Plus className="h-4 w-4 mr-2" /> Add Row
              </Button>
            </TabsContent>

            <TabsContent value="bulk" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Paste URLs or Text (One per line)</Label>
                <Textarea
                  placeholder="https://google.com&#10;https://github.com&#10;Some secret text"
                  className="min-h-[200px] font-mono text-sm"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
                <Button className="w-full" onClick={handleBulkImport} disabled={!textInput.trim()}>
                  <Wand2 className="h-4 w-4 mr-2" /> Import Lines
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Preview Grid */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary" />
                Live Preview ({items.filter(i => i.content).length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.filter(i => i.content).map((item, idx) => (
                <Card key={item.id} className="overflow-hidden group relative">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="bg-white p-2 rounded-md shadow-sm border mb-3">
                      <QRCodeSVG
                        id={`qr-${item.id}`}
                        value={item.content}
                        size={120}
                        fgColor={fgColor}
                        bgColor={bgColor}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        #{idx + 1} • {item.type}
                      </p>
                      <p className="text-xs truncate font-mono bg-muted p-1 rounded">
                        {item.content}
                      </p>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => downloadQR(`qr-${item.id}`, item.content)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        PNG
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {items.filter(i => i.content).length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl">
                  <QrCode className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
                  <p className="text-muted-foreground text-sm">Enter some content to see previews</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

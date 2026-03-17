"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Download, Plus, Trash, Grid3X3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QRItem {
  id: string
  type: "url" | "text" | "email" | "phone" | "wifi"
  content: string
}

export function BulkQrCodeGenerator() {
  const [items, setItems] = useState<QRItem[]>([
    { id: "1", type: "url", content: "https://example.com" }
  ])
  const [textInput, setTextInput] = useState("")
  const [defaultType, setDefaultType] = useState<"url" | "text" | "email" | "phone">("url")
  const [size, setSize] = useState(200)
  const [color, setColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const addItem = useCallback(() => {
    const newId = (items.length + 1).toString()
    setItems([...items, { id: newId, type: defaultType, content: "" }])
  }, [items, defaultType])

  const removeItem = useCallback((id: string) => {
    if (items.length > 1) {
      setItems(items.filter(i => i.id !== id))
    }
  }, [items])

  const updateItem = useCallback((id: string, field: keyof QRItem, value: string) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i))
  }, [items])

  const parseTextInput = useCallback(() => {
    const lines = textInput.split('\n').filter(l => l.trim())
    const newItems = lines.map((line, index) => ({
      id: `parsed-${index}`,
      type: defaultType,
      content: line.trim()
    }))
    setItems([...items, ...newItems])
    setTextInput("")
  }, [textInput, items, defaultType])

  const handleGenerate = useCallback(() => {
    setGenerated(true)
  }, [])

  const handleCopy = useCallback(async () => {
    const data = JSON.stringify(items, null, 2)
    await navigator.clipboard.writeText(data)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [items])

  const handleClear = useCallback(() => {
    setItems([{ id: "1", type: "url", content: "https://example.com" }])
    setTextInput("")
    setGenerated(false)
  }, [])

  const handleDownloadAll = useCallback(() => {
    // In real implementation, this would generate a ZIP file with all QR codes
    alert("In production, this would download all QR codes as a ZIP file")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Bulk QR Code Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate multiple QR codes at once
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="size">QR Size (px)</Label>
          <Input
            id="size"
            type="number"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value) || 200)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">QR Color</Label>
          <div className="flex gap-2">
            <Input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-10"
            />
            <Input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bgColor">Background</Label>
          <div className="flex gap-2">
            <Input
              id="bgColor"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-16 h-10"
            />
            <Input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        <div className="flex items-end">
          <Button onClick={handleGenerate} className="w-full">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Generate All
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>QR Code Items ({items.length})</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bulk Import (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste multiple URLs or text here (one per line)..."
              className="min-h-[80px]"
            />
            <div className="flex items-center gap-2">
              <select
                value={defaultType}
                onChange={(e) => setDefaultType(e.target.value as typeof defaultType)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="url">URL</option>
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              <Button variant="outline" size="sm" onClick={parseTextInput} disabled={!textInput}>
                Parse & Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <select
                value={item.type}
                onChange={(e) => updateItem(item.id, "type", e.target.value)}
                className="rounded-md border border-input bg-background px-2 py-2 text-sm w-28"
              >
                <option value="url">URL</option>
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="wifi">WiFi</option>
              </select>
              <Input
                value={item.content}
                onChange={(e) => updateItem(item.id, "content", e.target.value)}
                placeholder={item.type === "url" ? "https://..." : item.type === "email" ? "email@example.com" : "Enter content"}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
                disabled={items.length === 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {generated && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Generated QR Codes</Label>
            <div className="flex items-center gap-2">
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy List"}
              </Button>
              <Button onClick={handleDownloadAll} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.filter(i => i.content).map((item, i) => (
              <Card key={item.id}>
                <CardContent className="pt-4">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-2">
                    <div className="text-center p-4">
                      <Grid3X3 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground truncate max-w-[150px]">{item.content}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">#{i + 1} - {item.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

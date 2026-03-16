"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Download } from "lucide-react"
import { cn } from "@/lib/utils"

// Note: This uses an external API for barcode generation
// For production, consider using bwip-js or JsBarcode library
export default function BarcodeGenerator() {
  const [data, setData] = useState<string>("")
  const [format, setFormat] = useState<"code128" | "code39" | "ean13" | "upc" | "qr" | "datamatrix">("code128")
  const [showText, setShowText] = useState<boolean>(true)
  const [width, setWidth] = useState<number>(2)
  const [height, setHeight] = useState<number>(100)
  const [barcodeUrl, setBarcodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const validateData = (inputData: string, barcodeFormat: string): boolean => {
    switch (barcodeFormat) {
      case "ean13":
        return /^\d{12,13}$/.test(inputData)
      case "upc":
        return /^\d{11,12}$/.test(inputData)
      case "code39":
        return /^[0-9A-Z\-\.\ \$\/\+\%]+$/.test(inputData)
      default:
        return inputData.length > 0
    }
  }

  const generateBarcode = useCallback(async () => {
    if (!data) {
      setError("Please enter data to encode")
      return
    }

    if (!validateData(data, format)) {
      setError(`Invalid data for ${format.toUpperCase()} format`)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Using bwip-js online API for barcode generation
      // Alternative: https://barcode.tec-it.com/barcode.ashx
      const params = new URLSearchParams({
        bcid: format,
        text: data,
        scale: width.toString(),
        height: height.toString(),
        includetext: showText ? "true" : "false",
      })

      const barcodeUrl = `https://bwipjs-api.metafloor.com/?${params.toString()}`
      setBarcodeUrl(barcodeUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate barcode")
    } finally {
      setLoading(false)
    }
  }, [data, format, showText, width, height])

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

  const downloadBarcode = useCallback(async () => {
    if (!barcodeUrl) return
    
    try {
      const response = await fetch(barcodeUrl)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `barcode-${data.replace(/[^a-z0-9]/gi, "-")}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [barcodeUrl, data])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (data) {
        generateBarcode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [data, generateBarcode])

  const clearAll = useCallback(() => {
    setData("")
    setBarcodeUrl("")
  }, [])

  const formatOptions = [
    { value: "code128", label: "Code 128", description: "General purpose, alphanumeric" },
    { value: "code39", label: "Code 39", description: "Industrial, alphanumeric" },
    { value: "ean13", label: "EAN-13", description: "Retail products (13 digits)" },
    { value: "upc", label: "UPC-A", description: "Retail products (12 digits)" },
    { value: "qr", label: "QR Code", description: "2D code, high capacity" },
    { value: "datamatrix", label: "Data Matrix", description: "2D code, compact" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Data Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data" className="text-base font-medium">
            Data to Encode
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!data}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <Input
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value.toUpperCase())}
          className={cn(
            "font-mono text-sm",
            error && "border-destructive"
          )}
          placeholder="Enter text, numbers, or product code..."
        />

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </section>

      {/* Format Selection */}
      <section className="space-y-3">
        <Label htmlFor="format" className="text-base font-medium">
          Barcode Format
        </Label>
        <Select value={format} onValueChange={(v) => setFormat(v as typeof format)}>
          <SelectTrigger id="format">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {formatOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <div className="flex items-center gap-2">
                  <span>{opt.label}</span>
                  <span className="text-muted-foreground text-xs">({opt.description})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Options */}
      <section className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-medium">Display Options</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width" className="text-sm">
              Bar Width: {width}
            </Label>
            <input
              id="width"
              type="range"
              min="1"
              max="4"
              step="0.5"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height" className="text-sm">
              Height: {height}px
            </Label>
            <input
              id="height"
              type="range"
              min="50"
              max="200"
              step="10"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex items-end">
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
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Barcode Result */}
      {barcodeUrl && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Generated Barcode</Label>
            <Button
              variant="default"
              size="sm"
              onClick={downloadBarcode}
            >
              <Download className="size-4 mr-1" />
              Download PNG
            </Button>
          </div>

          <div className="rounded-lg border bg-background p-8 flex items-center justify-center">
            <img
              src={barcodeUrl}
              alt="Barcode"
              className="max-w-full h-auto"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Format: {format.toUpperCase()}</span>
            <span>Data: {data}</span>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!barcodeUrl && !loading && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Enter data and select a format to generate a barcode</p>
        </div>
      )}

      {/* Format Info */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Barcode Format Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {formatOptions.map((opt) => (
            <div
              key={opt.value}
              className={cn(
                "p-3 rounded border",
                format === opt.value ? "border-primary bg-muted" : "border-border"
              )}
            >
              <div className="font-medium">{opt.label}</div>
              <div className="text-muted-foreground text-xs">{opt.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium">Quick Examples</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setData("ABC123456")
              setFormat("code128")
            }}
            className="text-xs"
          >
            Code 128 Sample
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setData("123456789012")
              setFormat("ean13")
            }}
            className="text-xs"
          >
            EAN-13 Sample
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setData("12345678901")
              setFormat("upc")
            }}
            className="text-xs"
          >
            UPC-A Sample
          </Button>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Download, Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import bwipjs from "bwip-js"

export default function BarcodeGenerator() {
  const [data, setData] = useState<string>("")
  const [format, setFormat] = useState<string>("code128")
  const [showText, setShowText] = useState<boolean>(true)
  const [width, setWidth] = useState<number>(2)
  const [height, setHeight] = useState<number>(20)
  const [barcodeDataUrl, setBarcodeDataUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const validateData = (inputData: string, barcodeFormat: string): boolean => {
    if (!inputData) return false
    switch (barcodeFormat) {
      case "ean13":
        return /^\d{12,13}$/.test(inputData)
      case "upca":
        return /^\d{11,12}$/.test(inputData)
      case "code39":
        return /^[0-9A-Z\-\.\ \$\/\+\%]+$/.test(inputData)
      default:
        return inputData.length > 0
    }
  }

  const generateBarcode = useCallback(async () => {
    if (!data) {
      setBarcodeDataUrl("")
      return
    }

    if (!validateData(data, format)) {
      setError(`Invalid data format for ${format.toUpperCase()}`)
      setBarcodeDataUrl("")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const canvas = document.createElement("canvas")

      // bwipjs.toCanvas returns the canvas itself
      bwipjs.toCanvas(canvas, {
        bcid: format,
        text: data,
        scale: width,
        height: height,
        includetext: showText,
        backgroundcolor: "FFFFFF",
        barcolor: "000000",
        textsize: 10,
        padding: 10
      })

      const dataUrl = canvas.toDataURL("image/png")
      setBarcodeDataUrl(dataUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate barcode")
      setBarcodeDataUrl("")
    } finally {
      setLoading(false)
    }
  }, [data, format, showText, width, height])

  // Debounce generation to prevent lag while typing or sliding
  useEffect(() => {
    const timer = setTimeout(() => {
      generateBarcode()
    }, 300)
    return () => clearTimeout(timer)
  }, [generateBarcode])

  const copyToClipboard = useCallback(async () => {
    if (!data) return
    try {
      await navigator.clipboard.writeText(data)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [data])

  const downloadBarcode = useCallback(() => {
    if (!barcodeDataUrl) return
    const a = document.createElement("a")
    a.href = barcodeDataUrl
    a.download = `barcode-${format}-${data.substring(0, 10)}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [barcodeDataUrl, data, format])

  const clearAll = useCallback(() => {
    setData("")
    setBarcodeDataUrl("")
    setError(null)
  }, [])

  const formatOptions = [
    { value: "code128", label: "Code 128", description: "General purpose, alphanumeric" },
    { value: "code39", label: "Code 39", description: "Industrial, alphanumeric" },
    { value: "ean13", label: "EAN-13", description: "Retail products (13 digits)" },
    { value: "upca", label: "UPC-A", description: "Retail products (12 digits)" },
    { value: "qrcode", label: "QR Code", description: "2D code, high capacity" },
    { value: "datamatrix", label: "Data Matrix", description: "2D code, compact" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
      {/* Data Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data" className="text-base font-medium">
            Data to Encode
          </Label>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              disabled={!data}
              className="h-8"
            >
              {copied ? <Check className="size-3.5 mr-1" /> : <Copy className="size-3.5 mr-1" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-8 text-destructive hover:text-destructive"
              disabled={!data}
            >
              <Trash2 className="size-3.5 mr-1" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Input
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className={cn(
            "font-mono text-sm",
            error && "border-destructive focus-visible:ring-destructive"
          )}
          placeholder="Enter text, numbers, or product code..."
        />
      </section>

      {/* Format Selection */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="format" className="text-base font-medium">
            Barcode Format
          </Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger id="format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {formatOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div className="flex flex-col">
                    <span>{opt.label}</span>
                    <span className="text-muted-foreground text-[10px] leading-none">{opt.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Display Options</Label>
          <div className="flex items-center space-x-2 h-10 px-3 rounded-md border bg-muted/20">
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
      </section>

      {/* Sizing Controls */}
      <section className="rounded-lg border p-4 space-y-4 bg-muted/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="width" className="text-sm">Bar Width (Scale)</Label>
              <span className="text-xs font-mono">{width}</span>
            </div>
            <input
              id="width"
              type="range"
              min="1"
              max="10"
              step="1"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="height" className="text-sm">Height (mm)</Label>
              <span className="text-xs font-mono">{height}px</span>
            </div>
            <input
              id="height"
              type="range"
              min="5"
              max="150"
              step="5"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Barcode Result */}
      {barcodeDataUrl ? (
        <section className="space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Generated Barcode</Label>
            <Button
              variant="default"
              size="sm"
              onClick={downloadBarcode}
            >
              <Download className="size-4 mr-2" />
              Download PNG
            </Button>
          </div>

          <div className="rounded-lg border bg-white p-10 flex flex-col items-center justify-center min-h-[200px] shadow-sm">
            <img
              src={barcodeDataUrl}
              alt="Generated Barcode"
              className="max-w-full h-auto"
            />
          </div>
        </section>
      ) : (
        !loading && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
            <p>Enter valid data to generate your {formatOptions.find(f => f.value === format)?.label}</p>
          </div>
        )
      )}

      {/* Quick Examples */}
      <section className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium">Quick Examples</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setData("PROD-8829")
              setFormat("code128")
            }}
            className="text-xs h-8"
          >
            Code 128 (Text)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setData("501234567890")
              setFormat("ean13")
            }}
            className="text-xs h-8"
          >
            EAN-13 (Retail)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setData("https://google.com")
              setFormat("qrcode")
            }}
            className="text-xs h-8"
          >
            QR Code (URL)
          </Button>
        </div>
      </section>
    </div>
  )
}

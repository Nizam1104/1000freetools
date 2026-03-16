"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Trash2, Download, Upload, Image as ImageIcon, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QRCodeGeneratorWithLogo() {
  const [data, setData] = useState<string>("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  
  // Logo settings
  const [logoImage, setLogoImage] = useState<string | null>(null)
  const [logoSize, setLogoSize] = useState<number>(20)
  const [logoPosition, setLogoPosition] = useState<"center">("center")
  
  // Color settings
  const [foregroundColor, setForegroundColor] = useState<string>("#000000")
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")
  
  // QR Code settings
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M")
  const [size, setSize] = useState<number>(300)
  const [outputFormat, setOutputFormat] = useState<"png" | "svg">("png")
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (PNG, JPG)")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setLogoImage(e.target?.result as string)
      setError(null)
    }
    reader.readAsDataURL(file)
    event.target.value = ""
  }, [])

  const generateQRCode = useCallback(async () => {
    if (!data) {
      setError("Please enter data to encode")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Using QR code API with logo support
      const params = new URLSearchParams({
        data: data,
        size: size.toString(),
        ecl: errorCorrection,
        color: foregroundColor.replace("#", ""),
        bgcolor: backgroundColor.replace("#", ""),
        format: outputFormat,
      })

      // Add logo if present
      if (logoImage) {
        params.append("logo", logoImage)
        params.append("logosize", logoSize.toString())
      }

      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`
      setQrCodeUrl(qrUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [data, size, errorCorrection, foregroundColor, backgroundColor, logoImage, logoSize, outputFormat])

  const downloadQRCode = useCallback(async () => {
    if (!qrCodeUrl) return

    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `qr-code-${data.replace(/[^a-z0-9]/gi, "-").slice(0, 30)}.${outputFormat}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, data, outputFormat])

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
    setData("")
    setQrCodeUrl("")
    setLogoImage(null)
    setError(null)
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (data) {
        generateQRCode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [data, generateQRCode])

  const errorCorrectionOptions = [
    { value: "L", label: "Low (7%)", description: "Smallest logo, less recovery" },
    { value: "M", label: "Medium (15%)", description: "Balanced logo size" },
    { value: "Q", label: "Quartile (25%)", description: "Larger logo support" },
    { value: "H", label: "High (30%)", description: "Maximum logo size" },
  ]

  const presetColors = [
    { name: "Classic", fg: "#000000", bg: "#ffffff" },
    { name: "Blue", fg: "#1e40af", bg: "#ffffff" },
    { name: "Green", fg: "#16a34a", bg: "#ffffff" },
    { name: "Red", fg: "#dc2626", bg: "#ffffff" },
    { name: "Purple", fg: "#7c3aed", bg: "#ffffff" },
    { name: "Dark Mode", fg: "#ffffff", bg: "#1f2937" },
    { name: "Gold", fg: "#d97706", bg: "#fef3c7" },
    { name: "Ocean", fg: "#0891b2", bg: "#ecfeff" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Data Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data" className="text-base font-medium">
            QR Code Content
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!data && !logoImage}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <Input
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className={cn("font-mono text-sm", error && "border-destructive")}
          placeholder="Enter URL, text, contact info, WiFi credentials..."
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </section>

      {/* Logo Upload */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Logo / Icon (Optional)</Label>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <Upload className="size-4" />
            <span>Upload Logo</span>
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleLogoUpload}
            className="hidden"
          />

          {logoImage && (
            <div className="relative">
              <img src={logoImage} alt="Logo" className="h-12 w-12 object-contain rounded border" />
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setLogoImage(null)}
                className="absolute -top-2 -right-2 h-5 w-5 p-0 rounded-full bg-destructive text-destructive-foreground"
              >
                <Trash2 className="size-3" />
              </Button>
            </div>
          )}
        </div>

        {logoImage && (
          <div className="space-y-3 pt-2">
            <div className="space-y-2">
              <Label htmlFor="logo-size" className="text-sm">
                Logo Size: {logoSize}%
              </Label>
              <Slider
                id="logo-size"
                value={[logoSize]}
                onValueChange={(v) => setLogoSize(v[0])}
                min={10}
                max={40}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Higher error correction allows larger logos
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Color Settings */}
      <section className="rounded-lg border p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="size-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Color Settings</h3>
        </div>

        {/* Preset Colors */}
        <div className="flex flex-wrap gap-2">
          {presetColors.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => {
                setForegroundColor(preset.fg)
                setBackgroundColor(preset.bg)
              }}
              className={cn(
                "text-xs h-8",
                foregroundColor === preset.fg && backgroundColor === preset.bg
                  ? "ring-2 ring-primary"
                  : ""
              )}
            >
              <div
                className="w-4 h-4 rounded mr-2 border"
                style={{ background: `linear-gradient(135deg, ${preset.fg} 50%, ${preset.bg} 50%)` }}
              />
              {preset.name}
            </Button>
          ))}
        </div>

        {/* Custom Colors */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="fg-color" className="text-sm">
              Foreground Color
            </Label>
            <div className="flex items-center gap-2">
              <input
                id="fg-color"
                type="color"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="h-9 w-12 rounded border cursor-pointer"
              />
              <Input
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="font-mono text-sm h-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bg-color" className="text-sm">
              Background Color
            </Label>
            <div className="flex items-center gap-2">
              <input
                id="bg-color"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="h-9 w-12 rounded border cursor-pointer"
              />
              <Input
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="font-mono text-sm h-9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Options */}
      <section className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-medium">QR Code Options</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="error-correction" className="text-sm">
              Error Correction Level
            </Label>
            <Select value={errorCorrection} onValueChange={(v) => setErrorCorrection(v as typeof errorCorrection)}>
              <SelectTrigger id="error-correction">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {errorCorrectionOptions.map((opt) => (
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

          <div className="space-y-2">
            <Label htmlFor="output-format" className="text-sm">
              Output Format
            </Label>
            <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as typeof outputFormat)}>
              <SelectTrigger id="output-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG (Raster)</SelectItem>
                <SelectItem value="svg">SVG (Vector)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="size" className="text-sm">
            Size: {size}px
          </Label>
          <Slider
            id="size"
            value={[size]}
            onValueChange={(v) => setSize(v[0])}
            min={100}
            max={1000}
            step={50}
            className="w-full"
          />
        </div>
      </section>

      {/* QR Code Result */}
      {qrCodeUrl && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Generated QR Code</Label>
            <Button variant="default" size="sm" onClick={downloadQRCode}>
              <Download className="size-4 mr-1" />
              Download {outputFormat.toUpperCase()}
            </Button>
          </div>

          <div className="rounded-lg border bg-background p-8 flex items-center justify-center">
            <img src={qrCodeUrl} alt="QR Code" className="max-w-full h-auto" />
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Size: {size}x{size}px</span>
            <span>Error Correction: {errorCorrection}</span>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && !loading && (
        <div className="text-center py-12 text-muted-foreground">
          <ImageIcon className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter content and customize to generate a QR code with logo</p>
        </div>
      )}

      {/* Quick Examples */}
      <section className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium">Quick Examples</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setData("https://example.com")
              setForegroundColor("#000000")
              setBackgroundColor("#ffffff")
            }}
            className="text-xs"
          >
            Website URL
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setData("WIFI:T:WPA;S:MyNetwork;P:password123;;")
              setForegroundColor("#1e40af")
              setBackgroundColor("#ffffff")
            }}
            className="text-xs"
          >
            WiFi Credentials
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setData("BEGIN:VCARD\nVERSION:3.0\nN:Doe;John\nTEL:555-1234\nEMAIL:john@example.com\nEND:VCARD")
              setForegroundColor("#16a34a")
              setBackgroundColor("#ffffff")
            }}
            className="text-xs"
          >
            vCard Contact
          </Button>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Tips for Best Results</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Use higher error correction (Q or H) for larger logos</li>
          <li>Ensure good contrast between foreground and background colors</li>
          <li>Simple logos work better than complex images</li>
          <li>Test the QR code with multiple devices before distribution</li>
          <li>PNG format is best for web use, SVG for print and scaling</li>
        </ul>
      </section>
    </div>
  )
}

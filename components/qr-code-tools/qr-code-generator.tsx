"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Download, QrCode } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QrCodeGenerator() {
  const [data, setData] = useState<string>("")
  const [dataType, setDataType] = useState<"text" | "url" | "email" | "phone">("url")
  const [size, setSize] = useState<number>(300)
  const [color, setColor] = useState<string>("000000")
  const [bgColor, setBgColor] = useState<string>("ffffff")
  const [format, setFormat] = useState<"png" | "svg" | "jpg">("png")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const generateQrCode = useCallback(async () => {
    if (!data) return

    setLoading(true)
    setError(null)

    try {
      // Validate based on type
      if (dataType === "url") {
        try {
          new URL(data)
        } catch {
          throw new Error("Please enter a valid URL")
        }
      } else if (dataType === "email" && data && !data.includes("@")) {
        throw new Error("Please enter a valid email address")
      }

      // Using qrserver.com API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&color=${color}&bgcolor=${bgColor}&format=${format}&margin=10`
      
      setQrCodeUrl(qrUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [data, dataType, size, color, bgColor, format])

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

  const downloadQrCode = useCallback(async () => {
    if (!qrCodeUrl) return
    
    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `qr-code.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, format])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (data) {
        generateQrCode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [data, generateQrCode])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Data Type Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">QR Code Type</Label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "url", label: "URL/Website" },
            { value: "text", label: "Plain Text" },
            { value: "email", label: "Email" },
            { value: "phone", label: "Phone" },
          ].map((type) => (
            <Button
              key={type.value}
              variant={dataType === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => setDataType(type.value as typeof dataType)}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data-input" className="text-base font-medium">
            {dataType === "url" && "Website URL"}
            {dataType === "text" && "Text Content"}
            {dataType === "email" && "Email Address"}
            {dataType === "phone" && "Phone Number"}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(data, "input")}
              className="h-7"
              disabled={!data}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setData("")}
              className="h-7"
              disabled={!data}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        {dataType === "text" ? (
          <Textarea
            id="data-input"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="font-mono text-sm min-h-[120px]"
            placeholder="Enter your text content..."
          />
        ) : (
          <Input
            id="data-input"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className={cn(
              "font-mono text-sm",
              error && "border-destructive"
            )}
            placeholder={
              dataType === "url" ? "https://example.com" :
              dataType === "email" ? "name@example.com" :
              "+1234567890"
            }
          />
        )}

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </section>

      {/* Options */}
      <section className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-medium">Customization Options</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="size" className="text-sm">
              Size: {size}px
            </Label>
            <input
              id="size"
              type="range"
              min="100"
              max="600"
              step="50"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="format" className="text-sm">
              Output Format
            </Label>
            <Select value={format} onValueChange={(v) => setFormat(v as typeof format)}>
              <SelectTrigger id="format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="svg">SVG</SelectItem>
                <SelectItem value="jpg">JPG</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Colors</Label>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <input
                  type="color"
                  value={`#${color}`}
                  onChange={(e) => setColor(e.target.value.slice(1))}
                  className="w-8 h-8 rounded border cursor-pointer"
                  title="QR Color"
                />
                <span className="text-xs text-muted-foreground">QR</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="color"
                  value={`#${bgColor}`}
                  onChange={(e) => setBgColor(e.target.value.slice(1))}
                  className="w-8 h-8 rounded border cursor-pointer"
                  title="Background Color"
                />
                <span className="text-xs text-muted-foreground">BG</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Result */}
      {qrCodeUrl && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Your QR Code</Label>
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={downloadQrCode}
              >
                <Download className="size-4 mr-1" />
                Download {format.toUpperCase()}
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="rounded-lg border bg-background p-6">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-64 h-64"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Encoded Data</Label>
                <code className="font-mono text-sm bg-muted px-3 py-2 rounded block break-all">
                  {data}
                </code>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
                  <div className="text-xs text-muted-foreground">Size</div>
                  <div className="font-semibold">{size}x{size}px</div>
                </div>
                <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
                  <div className="text-xs text-muted-foreground">Format</div>
                  <div className="font-semibold">{format.toUpperCase()}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && !loading && (
        <div className="text-center py-12 text-muted-foreground">
          <QrCode className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter {dataType === "url" ? "a URL" : "content"} to generate a QR code</p>
        </div>
      )}

      {/* Quick Examples */}
      <section className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium">Quick Examples</h3>
        <div className="flex flex-wrap gap-2">
          {dataType === "url" ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setData("https://google.com")}
                className="text-xs"
              >
                Google
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setData("https://github.com")}
                className="text-xs"
              >
                GitHub
              </Button>
            </>
          ) : dataType === "email" ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setData("contact@example.com")}
              className="text-xs"
            >
              Example Email
            </Button>
          ) : dataType === "phone" ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setData("+1234567890")}
              className="text-xs"
            >
              Example Phone
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setData("Hello, World!")}
              className="text-xs"
            >
              Hello World
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}

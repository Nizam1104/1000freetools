"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, QrCode } from "lucide-react"
import { cn } from "@/lib/utils"

export default function UrlQrCodeGenerator() {
  const [url, setUrl] = useState<string>("")
  const [size, setSize] = useState<number>(300)
  const [color, setColor] = useState<string>("000000")
  const [bgColor, setBgColor] = useState<string>("ffffff")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const generateQrCode = useCallback(async () => {
    if (!url) return

    setLoading(true)
    setError(null)

    try {
      // Validate URL
      try {
        new URL(url)
      } catch {
        throw new Error("Please enter a valid URL")
      }

      // Using qrserver.com API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&color=${color}&bgcolor=${bgColor}&margin=10`
      
      setQrCodeUrl(qrUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [url, size, color, bgColor])

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
      a.download = `qr-code-${new URL(url).hostname}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, url])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      generateQrCode()
    }
  }, [generateQrCode])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="url-input" className="text-base font-medium">
            URL for QR Code
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(url, "input")}
              className="h-7"
              disabled={!url}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setUrl("")}
              className="h-7"
              disabled={!url}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            id="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            className={cn(
              "font-mono text-sm flex-1",
              error && "border-destructive"
            )}
            placeholder="Enter URL (e.g., https://example.com)"
          />
          <Button
            onClick={generateQrCode}
            disabled={!url || loading}
            className="shrink-0"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Generating...
              </>
            ) : (
              <>
                <QrCode className="size-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </section>

      {/* Options */}
      <section className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-medium">QR Code Options</h3>
        
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
            <Label htmlFor="color" className="text-sm">
              QR Color
            </Label>
            <div className="flex gap-2">
              <input
                id="color"
                type="color"
                value={`#${color}`}
                onChange={(e) => setColor(e.target.value.slice(1))}
                className="w-10 h-10 rounded border cursor-pointer"
              />
              <Input
                value={`#${color}`}
                onChange={(e) => setColor(e.target.value.replace("#", ""))}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bg-color" className="text-sm">
              Background Color
            </Label>
            <div className="flex gap-2">
              <input
                id="bg-color"
                type="color"
                value={`#${bgColor}`}
                onChange={(e) => setBgColor(e.target.value.slice(1))}
                className="w-10 h-10 rounded border cursor-pointer"
              />
              <Input
                value={`#${bgColor}`}
                onChange={(e) => setBgColor(e.target.value.replace("#", ""))}
                className="font-mono text-sm"
              />
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
                variant="outline"
                size="sm"
                onClick={downloadQrCode}
              >
                Download PNG
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(url, "url")}
              >
                {copied === "url" ? <Check className="size-4" /> : <Copy className="size-4" />}
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
                <Label className="text-sm font-medium">Encoded URL</Label>
                <code className="font-mono text-sm bg-muted px-3 py-2 rounded block break-all">
                  {url}
                </code>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">QR Code Image URL</Label>
                <code className="font-mono text-xs bg-muted px-3 py-2 rounded block break-all">
                  {qrCodeUrl}
                </code>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setQrCodeUrl("")
                setUrl("")
              }}
            >
              Create Another
            </Button>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && !loading && (
        <div className="text-center py-12 text-muted-foreground">
          <QrCode className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter a URL and click Generate to create a QR code</p>
        </div>
      )}

      {/* Info */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Tips</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Use high contrast colors for better scannability</li>
          <li>Minimum recommended size: 200x200 pixels for print</li>
          <li>Test your QR code with multiple scanner apps</li>
          <li>Consider adding a margin (quiet zone) around the code</li>
          <li>For large campaigns, use a URL shortener first</li>
        </ul>
      </section>

      {/* Examples */}
      <section className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium">Try Examples</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUrl("https://google.com")}
            className="text-xs"
          >
            Google
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUrl("https://github.com")}
            className="text-xs"
          >
            GitHub
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUrl("https://example.com")}
            className="text-xs"
          >
            Example
          </Button>
        </div>
      </section>
    </div>
  )
}

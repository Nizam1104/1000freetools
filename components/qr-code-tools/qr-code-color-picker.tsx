"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeColorPicker() {
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [content, setContent] = useState("https://example.com")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const presetColors = [
    { fg: "#000000", bg: "#FFFFFF", name: "Classic" },
    { fg: "#1e40af", bg: "#FFFFFF", name: "Blue" },
    { fg: "#dc2626", bg: "#FFFFFF", name: "Red" },
    { fg: "#16a34a", bg: "#FFFFFF", name: "Green" },
    { fg: "#7c3aed", bg: "#FFFFFF", name: "Purple" },
    { fg: "#ea580c", bg: "#FFFFFF", name: "Orange" },
    { fg: "#FFFFFF", bg: "#000000", name: "Inverted" },
    { fg: "#fef3c7", bg: "#92400e", name: "Gold" },
  ]

  const generateQR = useCallback(() => {
    const data = {
      type: "colored_qr",
      content: content,
      foregroundColor: foregroundColor,
      backgroundColor: backgroundColor
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [content, foregroundColor, backgroundColor])

  const applyPreset = useCallback((preset: typeof presetColors[0]) => {
    setForegroundColor(preset.fg)
    setBackgroundColor(preset.bg)
  }, [])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setForegroundColor("#000000")
    setBackgroundColor("#FFFFFF")
    setContent("https://example.com")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="${backgroundColor}"/>
        <rect x="30" y="30" width="140" height="140" fill="${foregroundColor}" opacity="0.1"/>
        <rect x="40" y="40" width="40" height="40" fill="${foregroundColor}"/>
        <rect x="120" y="40" width="40" height="40" fill="${foregroundColor}"/>
        <rect x="40" y="120" width="40" height="40" fill="${foregroundColor}"/>
        <rect x="50" y="50" width="20" height="20" fill="${backgroundColor}"/>
        <rect x="130" y="50" width="20" height="20" fill="${backgroundColor}"/>
        <rect x="50" y="130" width="20" height="20" fill="${backgroundColor}"/>
        <text x="100" y="185" text-anchor="middle" font-size="10" fill="${foregroundColor}">Custom Colors</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "colored-qr.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, foregroundColor, backgroundColor])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code Color Picker</h2>
            <p className="text-sm text-muted-foreground">
              Customize QR code colors to match your brand
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">QR Code Content</Label>
            <Input
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fgColor">Foreground Color</Label>
              <div className="flex gap-2">
                <Input
                  id="fgColor"
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bgColor">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="bgColor"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Preset Colors</Label>
            <div className="grid grid-cols-4 gap-2">
              {presetColors.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  className="flex flex-col h-auto py-2"
                  onClick={() => applyPreset(preset)}
                >
                  <div className="flex gap-1 mb-1">
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: preset.fg }}
                    />
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: preset.bg }}
                    />
                  </div>
                  <span className="text-xs">{preset.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1">
              <Palette className="h-4 w-4 mr-2" />
              Generate Colored QR
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">QR Code Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrData ? (
              <>
                <div 
                  className="aspect-square rounded-lg flex items-center justify-center"
                  style={{ backgroundColor }}
                >
                  <div className="text-center p-8">
                    <div 
                      className="w-32 h-32 mx-auto mb-4 border-4"
                      style={{ 
                        borderColor: foregroundColor,
                        backgroundImage: `linear-gradient(45deg, ${foregroundColor} 25%, transparent 25%), linear-gradient(-45deg, ${foregroundColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${foregroundColor} 75%), linear-gradient(-45deg, transparent 75%, ${foregroundColor} 75%)`,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                      }}
                    />
                    <p className="text-sm font-mono">FG: {foregroundColor}</p>
                    <p className="text-sm font-mono">BG: {backgroundColor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleCopy} className="flex-1" variant="outline">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? "Copied" : "Copy Data"}
                  </Button>
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Select colors to preview QR code</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Color Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Ensure high contrast between foreground and background for best scanning</li>
          <li>Dark colors on light backgrounds work best</li>
          <li>Avoid very light foreground colors (yellow, light gray)</li>
          <li>Test your colored QR code on multiple devices before distribution</li>
        </ul>
      </div>
    </div>
  )
}

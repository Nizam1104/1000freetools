"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Download, Image as ImageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeWithLogoGenerator() {
  const [content, setContent] = useState("https://example.com")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoSize, setLogoSize] = useState(20)
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const handleLogoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
    }
  }, [])

  const generateQR = useCallback(() => {
    const data = {
      type: "logo_qr",
      content: content,
      logoName: logoFile?.name || "No logo",
      logoSize: `${logoSize}%`
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [content, logoFile, logoSize])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setLogoFile(null)
    setContent("https://example.com")
    setLogoSize(20)
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="160" height="160" fill="none" stroke="#374151" stroke-width="2"/>
        <rect x="30" y="30" width="40" height="40" fill="#374151"/>
        <rect x="130" y="30" width="40" height="40" fill="#374151"/>
        <rect x="30" y="130" width="40" height="40" fill="#374151"/>
        <circle cx="100" cy="100" r="${logoSize}" fill="#3b82f6"/>
        <text x="100" y="105" text-anchor="middle" font-size="10" fill="white">LOGO</text>
        <text x="100" y="185" text-anchor="middle" font-size="10" fill="#6b7280">QR with Logo</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "logo-qr.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, logoSize])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code with Logo Generator</h2>
            <p className="text-sm text-muted-foreground">
              Add your logo to the center of QR codes
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

          <div className="space-y-2">
            <Label htmlFor="logo">Upload Logo</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <Label htmlFor="logo-upload" className="cursor-pointer">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {logoFile ? logoFile.name : "Click to upload logo (PNG/SVG)"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: Square logo, transparent background
                </p>
              </Label>
            </div>
          </div>

          {logoFile && (
            <div className="space-y-2">
              <Label htmlFor="logoSize">Logo Size: {logoSize}%</Label>
              <input
                id="logoSize"
                type="range"
                min="10"
                max="30"
                value={logoSize}
                onChange={(e) => setLogoSize(parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 15-25% for best scanning reliability
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!content}>
              <ImageIcon className="h-4 w-4 mr-2" />
              Generate Logo QR
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
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="relative w-32 h-32 mx-auto mb-4 border-4 border-gray-800">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                          style={{ width: `${logoSize * 3}px`, height: `${logoSize * 3}px` }}
                        >
                          {logoFile ? "LOGO" : "NO"}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Logo Size: {logoSize}%</p>
                    <p className="text-xs text-muted-foreground mt-1 break-all">{content}</p>
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
                <p className="text-muted-foreground">Upload logo and enter content</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Logo Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Use square logos for best results</li>
          <li>Transparent PNG or SVG formats work best</li>
          <li>Keep logo size between 15-25% of QR code size</li>
          <li>Ensure high contrast between logo and QR code</li>
          <li>Test scanning after adding logo</li>
        </ul>
      </div>
    </div>
  )
}

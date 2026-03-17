"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeErrorCorrection() {
  const [content, setContent] = useState("")
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const errorLevels = {
    L: { name: "Low (7%)", description: "Recovers up to 7% of damaged code", color: "bg-green-500" },
    M: { name: "Medium (15%)", description: "Recovers up to 15% of damaged code", color: "bg-yellow-500" },
    Q: { name: "Quartile (25%)", description: "Recovers up to 25% of damaged code", color: "bg-orange-500" },
    H: { name: "High (30%)", description: "Recovers up to 30% of damaged code", color: "bg-red-500" }
  }

  const generateQR = useCallback(() => {
    if (!content) {
      setQrData("")
      return
    }
    
    const data = {
      content: content,
      errorCorrection: errorLevel,
      errorRecovery: errorLevels[errorLevel].name
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [content, errorLevel, errorLevels])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setContent("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="160" height="160" fill="none" stroke="#374151" stroke-width="2"/>
        <text x="100" y="60" text-anchor="middle" font-size="14" font-weight="bold" fill="#1f2937">QR Code</text>
        <text x="100" y="90" text-anchor="middle" font-size="24" fill="#374151">Error: ${errorLevel}</text>
        <text x="100" y="120" text-anchor="middle" font-size="10" fill="#6b7280">${errorLevels[errorLevel].name}</text>
        <rect x="50" y="140" width="100" height="30" fill="${errorLevel === 'H' ? '#ef4444' : errorLevel === 'Q' ? '#f97316' : errorLevel === 'M' ? '#eab308' : '#22c55e'}" rx="5"/>
        <text x="100" y="160" text-anchor="middle" font-size="10" fill="white">Recovery: ${errorLevels[errorLevel].description.match(/\d+/)?.[0]}%</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `qr-error-${errorLevel}.svg`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, errorLevel, errorLevels])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code Error Correction</h2>
            <p className="text-sm text-muted-foreground">
              Configure error correction levels for QR code reliability
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
              placeholder="Enter URL or text..."
            />
          </div>

          <div className="space-y-2">
            <Label>Error Correction Level</Label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(errorLevels) as Array<keyof typeof errorLevels>).map((level) => (
                <Button
                  key={level}
                  variant={errorLevel === level ? "default" : "outline"}
                  onClick={() => setErrorLevel(level)}
                  className="flex flex-col h-auto py-3"
                >
                  <span className="font-bold">{level}</span>
                  <span className="text-xs">{errorLevels[level].name}</span>
                </Button>
              ))}
            </div>
          </div>

          {errorLevel && (
            <div className={`p-4 rounded-lg ${errorLevels[errorLevel].color} bg-opacity-10 border`}>
              <div className="flex items-center gap-2">
                <Shield className={`h-5 w-5 ${errorLevel === 'H' ? 'text-red-500' : errorLevel === 'Q' ? 'text-orange-500' : errorLevel === 'M' ? 'text-yellow-500' : 'text-green-500'}`} />
                <div>
                  <p className="font-medium">{errorLevels[errorLevel].name}</p>
                  <p className="text-sm text-muted-foreground">{errorLevels[errorLevel].description}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!content}>
              Generate QR Code
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
                    <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium">Error Correction: {errorLevel}</p>
                    <p className="text-sm text-muted-foreground">{errorLevels[errorLevel].name}</p>
                    <p className="text-xs text-muted-foreground mt-2">{errorLevels[errorLevel].description}</p>
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
                <p className="text-muted-foreground">Enter content and select error level</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Error Correction Guide</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>Level L (7%):</strong> Best for clean environments, smallest QR code size</li>
          <li><strong>Level M (15%):</strong> Good balance, recommended for most use cases</li>
          <li><strong>Level Q (25%):</strong> For harsh environments or when logo overlay is needed</li>
          <li><strong>Level H (30%):</strong> Maximum protection for industrial use or heavy damage risk</li>
        </ul>
      </div>
    </div>
  )
}

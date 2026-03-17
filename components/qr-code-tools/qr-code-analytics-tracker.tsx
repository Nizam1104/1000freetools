"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeAnalyticsTracker() {
  const [baseUrl, setBaseUrl] = useState("")
  const [campaignName, setCampaignName] = useState("")
  const [source, setSource] = useState("")
  const [medium, setMedium] = useState("")
  const [content, setContent] = useState("")
  const [trackingId, setTrackingId] = useState("")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const generateTrackingId = useCallback(() => {
    const id = `QR-${Date.now().toString(36).toUpperCase()}`
    setTrackingId(id)
  }, [])

  const generateQR = useCallback(() => {
    let url = baseUrl
    
    // Add UTM parameters
    const params: string[] = []
    if (campaignName) params.push(`utm_campaign=${encodeURIComponent(campaignName)}`)
    if (source) params.push(`utm_source=${encodeURIComponent(source)}`)
    if (medium) params.push(`utm_medium=${encodeURIComponent(medium)}`)
    if (content) params.push(`utm_content=${encodeURIComponent(content)}`)
    if (trackingId) params.push(`qr_id=${encodeURIComponent(trackingId)}`)
    
    if (params.length > 0) {
      url += (url.includes('?') ? '&' : '?') + params.join('&')
    }

    const data = {
      type: "analytics_qr",
      baseUrl: baseUrl,
      campaignName: campaignName,
      source: source,
      medium: medium,
      content: content,
      trackingId: trackingId,
      trackedUrl: url
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [baseUrl, campaignName, source, medium, content, trackingId])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      const data = JSON.parse(qrData)
      await navigator.clipboard.writeText(data.trackedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setBaseUrl("")
    setCampaignName("")
    setSource("")
    setMedium("")
    setContent("")
    setTrackingId("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="60" text-anchor="middle" font-size="32" fill="#3b82f6">📊</text>
        <text x="100" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="#1f2937">Analytics QR</text>
        <text x="100" y="125" text-anchor="middle" font-size="10" fill="#6b7280">Campaign: ${campaignName || "N/A"}</text>
        <text x="100" y="145" text-anchor="middle" font-size="10" fill="#6b7280">ID: ${trackingId || "N/A"}</text>
        <text x="100" y="175" text-anchor="middle" font-size="10" fill="#9ca3af">Track Scans</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "analytics-qr.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, campaignName, trackingId])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code Analytics Tracker</h2>
            <p className="text-sm text-muted-foreground">
              Add UTM parameters and tracking to QR codes
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://example.com/landing"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaignName">Campaign Name</Label>
            <Input
              id="campaignName"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="summer-sale-2024"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="instagram"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medium">Medium</Label>
              <Input
                id="medium"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="social"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="content">Content (Optional)</Label>
              <Input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="banner-ad"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="trackingId">Tracking ID</Label>
                <Button variant="outline" size="sm" onClick={generateTrackingId}>
                  Generate
                </Button>
              </div>
              <Input
                id="trackingId"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="QR-XXXXX"
                readOnly
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!baseUrl}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Tracking QR
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tracked URL Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrData ? (
              <>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                    <p className="font-medium">Analytics QR Code</p>
                    <p className="text-sm text-muted-foreground">Campaign: {campaignName}</p>
                    <p className="text-xs text-muted-foreground mt-2 font-mono break-all max-w-[250px]">
                      {JSON.parse(qrData).trackedUrl}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleCopy} className="flex-1" variant="outline">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? "Copied" : "Copy URL"}
                  </Button>
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Enter URL and tracking parameters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">UTM Parameters Guide</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>utm_campaign:</strong> Identify the specific campaign</li>
          <li><strong>utm_source:</strong> Where the traffic comes from (google, facebook, etc.)</li>
          <li><strong>utm_medium:</strong> Marketing medium (email, social, cpc, etc.)</li>
          <li><strong>utm_content:</strong> Differentiate similar content or links</li>
          <li><strong>qr_id:</strong> Custom tracking ID for QR-specific analytics</li>
        </ul>
      </div>
    </div>
  )
}

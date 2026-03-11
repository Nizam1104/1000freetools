"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Copy, Check, Trash2, Download, BarChart3, MapPin, Smartphone, Calendar, Clock, Link, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalyticsData {
  totalScans: number
  uniqueScans: number
  scansByDate: { date: string; count: number }[]
  scansByCountry: { country: string; count: number }[]
  scansByDevice: { device: string; count: number }[]
  scansByTime: { hour: number; count: number }[]
}

export default function QRCodeAnalyticsGenerator() {
  const [destinationUrl, setDestinationUrl] = useState<string>("")
  const [campaignName, setCampaignName] = useState<string>("")
  const [qrCodeId, setQrCodeId] = useState<string>("")
  const [shortUrl, setShortUrl] = useState<string>("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  
  // Analytics settings
  const [trackLocation, setTrackLocation] = useState<boolean>(true)
  const [trackDevice, setTrackDevice] = useState<boolean>(true)
  const [trackTime, setTrackTime] = useState<boolean>(true)
  const [trackReferrer, setTrackReferrer] = useState<boolean>(true)
  
  // Campaign settings
  const [expirationDate, setExpirationDate] = useState<string>("")
  const [maxScans, setMaxScans] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [customMessage, setCustomMessage] = useState<string>("")

  // Mock analytics data
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)

  const generateShortId = (): string => {
    return Math.random().toString(36).substring(2, 10)
  }

  const generateQRCode = useCallback(async () => {
    if (!destinationUrl.trim()) {
      setError("Please enter a destination URL")
      return
    }

    // Validate URL
    try {
      new URL(destinationUrl)
    } catch {
      setError("Please enter a valid URL (e.g., https://example.com)")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Generate unique QR code ID
      const id = generateShortId()
      setQrCodeId(id)

      // Create short URL (simulated)
      const short = `https://qr.track/${id}`
      setShortUrl(short)

      // Generate QR code pointing to short URL
      const params = new URLSearchParams({
        data: short,
        size: "300",
        ecl: "M",
      })

      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`
      setQrCodeUrl(qrUrl)

      // Generate mock analytics data
      const mockAnalytics: AnalyticsData = {
        totalScans: Math.floor(Math.random() * 500) + 50,
        uniqueScans: Math.floor(Math.random() * 300) + 30,
        scansByDate: Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - i)
          return {
            date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            count: Math.floor(Math.random() * 50) + 10,
          }
        }).reverse(),
        scansByCountry: [
          { country: "United States", count: 45 },
          { country: "United Kingdom", count: 23 },
          { country: "Germany", count: 18 },
          { country: "France", count: 12 },
          { country: "Others", count: 22 },
        ],
        scansByDevice: [
          { device: "iPhone", count: 52 },
          { device: "Android", count: 38 },
          { device: "iPad", count: 7 },
          { device: "Desktop", count: 3 },
        ],
        scansByTime: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          count: Math.floor(Math.random() * 30) + 5,
        })),
      }
      setAnalyticsData(mockAnalytics)

      setIsGenerated(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [destinationUrl])

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

  const downloadQRCode = useCallback(async () => {
    if (!qrCodeUrl) return

    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `analytics-qr-${qrCodeId}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, qrCodeId])

  const clearAll = useCallback(() => {
    setDestinationUrl("")
    setCampaignName("")
    setQrCodeId("")
    setShortUrl("")
    setQrCodeUrl("")
    setError(null)
    setIsGenerated(false)
    setAnalyticsData(null)
  }, [])

  const openDashboard = useCallback(() => {
    alert(`Dashboard URL: https://qr.track/dashboard/${qrCodeId}\n\nIn production, this would open a real-time analytics dashboard showing scan statistics, maps, and charts.`)
  }, [qrCodeId])

  const regenerateUrl = useCallback(() => {
    if (!destinationUrl) return
    generateQRCode()
  }, [destinationUrl, generateQRCode])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Destination URL */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="destination" className="text-base font-medium">
            Destination URL
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!destinationUrl}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <Input
          id="destination"
          value={destinationUrl}
          onChange={(e) => setDestinationUrl(e.target.value)}
          className={cn("font-mono text-sm", error && "border-destructive")}
          placeholder="https://example.com/landing-page"
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </section>

      {/* Campaign Settings */}
      <section className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-medium">Campaign Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="campaign" className="text-sm">Campaign Name (Optional)</Label>
            <Input
              id="campaign"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Summer Sale 2024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiration" className="text-sm">Expiration Date (Optional)</Label>
            <Input
              id="expiration"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="max-scans" className="text-sm">Max Scans (Optional)</Label>
            <Input
              id="max-scans"
              type="number"
              value={maxScans}
              onChange={(e) => setMaxScans(e.target.value)}
              placeholder="1000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm">Access Password (Optional)</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave empty for public access"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm">Custom Message (Optional)</Label>
          <Input
            id="message"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Message shown after scan"
          />
        </div>
      </section>

      {/* Tracking Options */}
      <section className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-medium">Analytics Tracking Options</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-muted-foreground" />
              <Label htmlFor="track-location" className="text-sm cursor-pointer">
                Track Location
              </Label>
            </div>
            <Switch
              id="track-location"
              checked={trackLocation}
              onCheckedChange={setTrackLocation}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="size-4 text-muted-foreground" />
              <Label htmlFor="track-device" className="text-sm cursor-pointer">
                Track Device Type
              </Label>
            </div>
            <Switch
              id="track-device"
              checked={trackDevice}
              onCheckedChange={setTrackDevice}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              <Label htmlFor="track-time" className="text-sm cursor-pointer">
                Track Time Patterns
              </Label>
            </div>
            <Switch
              id="track-time"
              checked={trackTime}
              onCheckedChange={setTrackTime}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link className="size-4 text-muted-foreground" />
              <Label htmlFor="track-referrer" className="text-sm cursor-pointer">
                Track Referrer Source
              </Label>
            </div>
            <Switch
              id="track-referrer"
              checked={trackReferrer}
              onCheckedChange={setTrackReferrer}
            />
          </div>
        </div>
      </section>

      {/* Generate Button */}
      <section className="flex justify-center">
        <Button
          onClick={generateQRCode}
          disabled={loading || !destinationUrl}
          size="lg"
          className="min-w-[200px]"
        >
          {loading ? "Generating..." : isGenerated ? "Regenerate" : "Generate Analytics QR Code"}
        </Button>
      </section>

      {/* Generated QR Code */}
      {isGenerated && qrCodeUrl && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Generated QR Code</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={openDashboard}>
                <BarChart3 className="size-4 mr-1" />
                View Dashboard
              </Button>
              <Button variant="default" size="sm" onClick={downloadQRCode}>
                <Download className="size-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR Code Display */}
            <div className="rounded-lg border bg-background p-6 flex flex-col items-center">
              <img src={qrCodeUrl} alt="Analytics QR Code" className="w-48 h-48" />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Scan to track analytics
              </p>
            </div>

            {/* URLs */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Tracking URL</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={shortUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(shortUrl, "short")}
                  >
                    {copied === "short" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">QR Code ID</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={qrCodeId}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(qrCodeId, "id")}
                  >
                    {copied === "id" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Destination</Label>
                <div className="rounded border bg-muted/30 p-2 text-sm font-mono break-all">
                  {destinationUrl}
                </div>
              </div>

              {expirationDate && (
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <Calendar className="size-4" />
                  <span>Expires: {new Date(expirationDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Analytics Preview */}
          {analyticsData && (
            <section className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-5" />
                <h3 className="text-base font-medium">Analytics Preview (Mock Data)</h3>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg border bg-muted/30 p-4 text-center">
                  <div className="text-3xl font-bold">{analyticsData.totalScans}</div>
                  <div className="text-sm text-muted-foreground">Total Scans</div>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4 text-center">
                  <div className="text-3xl font-bold">{analyticsData.uniqueScans}</div>
                  <div className="text-sm text-muted-foreground">Unique Scans</div>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4 text-center">
                  <div className="text-3xl font-bold">
                    {((analyticsData.uniqueScans / analyticsData.totalScans) * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Unique Rate</div>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4 text-center">
                  <div className="text-3xl font-bold">
                    {analyticsData.scansByCountry[0]?.country.slice(0, 2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Top Country</div>
                </div>
              </div>

              {/* Charts Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Scans by Date */}
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium mb-3">Scans by Date</h4>
                  <div className="flex items-end gap-2 h-32">
                    {analyticsData.scansByDate.map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-primary rounded-t"
                          style={{ height: `${(item.count / 50) * 100}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scans by Device */}
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium mb-3">Scans by Device</h4>
                  <div className="space-y-2">
                    {analyticsData.scansByDevice.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-sm w-20">{item.device}</span>
                        <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(item.count / 60) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm w-8 text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Countries */}
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-medium mb-3">Top Countries</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {analyticsData.scansByCountry.map((item, i) => (
                    <div key={i} className="text-center p-3 rounded border bg-muted/30">
                      <div className="text-lg font-bold">{item.count}</div>
                      <div className="text-xs text-muted-foreground">{item.country}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </section>
      )}

      {/* Empty State */}
      {!isGenerated && !loading && (
        <div className="text-center py-12 text-muted-foreground">
          <BarChart3 className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter a destination URL and configure tracking to generate an analytics QR code</p>
        </div>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">How Analytics QR Codes Work</h4>
            <p className="text-sm text-muted-foreground">
              Analytics QR codes use a redirect URL that tracks scan data before forwarding to
              your destination. Each scan is logged with metadata like location, device, and time.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Unique short URL for each QR code</li>
              <li>Real-time scan tracking and analytics dashboard</li>
              <li>Geographic location tracking (country/city level)</li>
              <li>Device and OS detection</li>
              <li>Time-based analytics (hour, day, week patterns)</li>
              <li>Editable destination URLs without regenerating QR code</li>
              <li>Optional expiration dates and scan limits</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-3">Common Use Cases</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Marketing Campaigns</div>
            <div className="text-sm text-muted-foreground">
              Track QR code performance across different channels and materials
            </div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Event Management</div>
            <div className="text-sm text-muted-foreground">
              Monitor attendance and engagement at events with time-limited codes
            </div>
          </div>
          <div className="p-3 rounded border bg-background">
            <div className="font-medium">Product Packaging</div>
            <div className="text-sm text-muted-foreground">
              Understand customer engagement with product information and offers
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Smartphone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeAppStore() {
  const [appStore, setAppStore] = useState<"ios" | "android" | "both">("both")
  const [iosUrl, setIosUrl] = useState("")
  const [androidUrl, setAndroidUrl] = useState("")
  const [appName, setAppName] = useState("")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const generateQR = useCallback(() => {
    let data = ""
    
    if (appStore === "ios") {
      data = iosUrl
    } else if (appStore === "android") {
      data = androidUrl
    } else {
      // Create a landing page URL or use a smart link service format
      data = `https://example.com/app-download?ios=${encodeURIComponent(iosUrl)}&android=${encodeURIComponent(androidUrl)}`
    }
    
    setQrData(data)
  }, [appStore, iosUrl, androidUrl])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setIosUrl("")
    setAndroidUrl("")
    setAppName("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      // In a real implementation, this would generate an actual QR code image
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="90" text-anchor="middle" font-size="14" fill="black">QR Code</text>
        <text x="100" y="110" text-anchor="middle" font-size="10" fill="gray">${appName || "App"}</text>
        <text x="100" y="140" text-anchor="middle" font-size="8" fill="gray">${appStore.toUpperCase()}</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${appName || "app"}-qr.svg`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, appName, appStore])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code for App Store</h2>
            <p className="text-sm text-muted-foreground">
              Generate QR codes for iOS App Store and Google Play Store links
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appName">App Name</Label>
            <Input
              id="appName"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="My Awesome App"
            />
          </div>

          <div className="space-y-2">
            <Label>Platform</Label>
            <div className="flex gap-2">
              <Button
                variant={appStore === "ios" ? "default" : "outline"}
                onClick={() => setAppStore("ios")}
                className="flex-1"
              >
                iOS Only
              </Button>
              <Button
                variant={appStore === "android" ? "default" : "outline"}
                onClick={() => setAppStore("android")}
                className="flex-1"
              >
                Android Only
              </Button>
              <Button
                variant={appStore === "both" ? "default" : "outline"}
                onClick={() => setAppStore("both")}
                className="flex-1"
              >
                Both
              </Button>
            </div>
          </div>

          {(appStore === "ios" || appStore === "both") && (
            <div className="space-y-2">
              <Label htmlFor="iosUrl">iOS App Store URL</Label>
              <Input
                id="iosUrl"
                value={iosUrl}
                onChange={(e) => setIosUrl(e.target.value)}
                placeholder="https://apps.apple.com/app/id123456789"
              />
            </div>
          )}

          {(appStore === "android" || appStore === "both") && (
            <div className="space-y-2">
              <Label htmlFor="androidUrl">Google Play Store URL</Label>
              <Input
                id="androidUrl"
                value={androidUrl}
                onChange={(e) => setAndroidUrl(e.target.value)}
                placeholder="https://play.google.com/store/apps/details?id=com.example.app"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!(iosUrl || androidUrl)}>
              <Smartphone className="h-4 w-4 mr-2" />
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
                    <Smartphone className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium">{appName || "App"}</p>
                    <p className="text-sm text-muted-foreground">{appStore.toUpperCase()}</p>
                    <p className="text-xs text-muted-foreground mt-2 break-all">{qrData}</p>
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
                <p className="text-muted-foreground">Enter app URLs to generate QR code</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>For "Both" option, consider using a smart link service like Branch.io or AppsFlyer</li>
          <li>Test your QR code on both iOS and Android devices</li>
          <li>Add your app logo or branding to the QR code for better recognition</li>
          <li>Use a URL shortener for cleaner QR codes</li>
        </ul>
      </div>
    </div>
  )
}

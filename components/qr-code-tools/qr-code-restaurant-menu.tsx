"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Download, UtensilsCrossed } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeRestaurantMenu() {
  const [restaurantName, setRestaurantName] = useState("")
  const [menuUrl, setMenuUrl] = useState("")
  const [tableNumber, setTableNumber] = useState("")
  const [description, setDescription] = useState("")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const generateQR = useCallback(() => {
    const data = {
      type: "restaurant_menu",
      restaurantName: restaurantName,
      menuUrl: menuUrl,
      tableNumber: tableNumber,
      description: description
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [restaurantName, menuUrl, tableNumber, description])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setRestaurantName("")
    setMenuUrl("")
    setTableNumber("")
    setDescription("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
        <rect width="200" height="250" fill="white"/>
        <rect x="10" y="10" width="180" height="230" fill="none" stroke="#1f2937" stroke-width="2" stroke-dasharray="10,5"/>
        <text x="100" y="40" text-anchor="middle" font-size="16" font-weight="bold" fill="#1f2937">${restaurantName || "Restaurant"}</text>
        <text x="100" y="25" text-anchor="middle" font-size="24">🍽️</text>
        <text x="100" y="65" text-anchor="middle" font-size="12" fill="#6b7280">Scan for Menu</text>
        ${tableNumber ? `<text x="100" y="85" text-anchor="middle" font-size="14" font-weight="bold" fill="#dc2626">Table ${tableNumber}</text>` : ''}
        <rect x="50" y="100" width="100" height="100" fill="#f3f4f6" stroke="#374151"/>
        <text x="100" y="155" text-anchor="middle" font-size="12" fill="#374151">QR CODE</text>
        <text x="100" y="220" text-anchor="middle" font-size="10" fill="#9ca3af">${description?.substring(0, 25) || "Contactless Menu"}</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${restaurantName || "menu"}-qr.svg`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, restaurantName, tableNumber, description])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code Restaurant Menu</h2>
            <p className="text-sm text-muted-foreground">
              Create contactless menu QR codes for restaurants
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Restaurant Name</Label>
            <Input
              id="restaurantName"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="The Tasty Bistro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="menuUrl">Menu URL</Label>
            <Input
              id="menuUrl"
              value={menuUrl}
              onChange={(e) => setMenuUrl(e.target.value)}
              placeholder="https://example.com/menu"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tableNumber">Table Number (Optional)</Label>
            <Input
              id="tableNumber"
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Scan to view our menu and order online"
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!restaurantName || !menuUrl}>
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              Generate Menu QR
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Menu QR Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrData ? (
              <>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <UtensilsCrossed className="h-16 w-16 mx-auto mb-4 text-orange-600" />
                    <p className="font-medium">{restaurantName}</p>
                    <p className="text-sm text-muted-foreground">Scan for Menu</p>
                    {tableNumber && (
                      <p className="text-lg font-bold text-red-600 mt-2">Table {tableNumber}</p>
                    )}
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
                <p className="text-muted-foreground">Enter restaurant details to generate QR code</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Best Practices</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Host your menu on a fast, reliable server</li>
          <li>Use a mobile-friendly menu format</li>
          <li>Consider creating unique QR codes for each table</li>
          <li>Print QR codes on weather-resistant material</li>
          <li>Test QR codes in your restaurant lighting conditions</li>
        </ul>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QrCodeGoogleMaps() {
  const [address, setAddress] = useState<string>("")
  const [latitude, setLatitude] = useState<string>("")
  const [longitude, setLongitude] = useState<string>("")
  const [placeName, setPlaceName] = useState<string>("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const generateMapsQrCode = useCallback(async () => {
    let locationData = ""

    if (latitude && longitude) {
      // Use coordinates
      locationData = `https://www.google.com/maps?q=${latitude},${longitude}`
    } else if (address) {
      // Use address
      locationData = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    } else {
      setError("Please enter an address or coordinates")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Using qrserver.com API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(locationData)}&margin=10`
      
      setQrCodeUrl(qrUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [address, latitude, longitude])

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
      a.download = `maps-qr-${placeName || "location"}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, placeName])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (address || (latitude && longitude)) {
        generateMapsQrCode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [address, latitude, longitude, generateMapsQrCode])

  const clearAll = useCallback(() => {
    setAddress("")
    setLatitude("")
    setLongitude("")
    setPlaceName("")
    setQrCodeUrl("")
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Place Name */}
      <section className="space-y-3">
        <Label htmlFor="place-name" className="text-base font-medium">
          Place Name (optional)
        </Label>
        <Input
          id="place-name"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          className="text-sm"
          placeholder="My Store, Office, etc."
        />
      </section>

      {/* Address */}
      <section className="space-y-3">
        <Label htmlFor="address" className="text-base font-medium">
          Address
        </Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={cn(
            "text-sm",
            error && !latitude && !longitude && "border-destructive"
          )}
          placeholder="123 Main Street, City, Country"
        />
        <p className="text-xs text-muted-foreground">
          Enter a full address for best results
        </p>
      </section>

      {/* Or Coordinates */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">Or enter coordinates</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="latitude" className="text-sm">
              Latitude
            </Label>
            <Input
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="text-sm font-mono"
              placeholder="40.7128"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="longitude" className="text-sm">
              Longitude
            </Label>
            <Input
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="text-sm font-mono"
              placeholder="-74.0060"
            />
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* QR Code Result */}
      {qrCodeUrl && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Maps Location QR Code</Label>
            <Button
              variant="default"
              size="sm"
              onClick={downloadQrCode}
            >
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="rounded-lg border bg-background p-6">
              <img
                src={qrCodeUrl}
                alt="Maps QR Code"
                className="w-48 h-48"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-muted-foreground" />
                  <span className="font-medium">{placeName || "Location"}</span>
                </div>
                {address && (
                  <div className="text-sm text-muted-foreground">
                    {address}
                  </div>
                )}
                {latitude && longitude && (
                  <div className="text-sm font-mono text-muted-foreground">
                    {latitude}, {longitude}
                  </div>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                When scanned, this QR code will open the location in Google Maps 
                (or the default maps app) for easy navigation.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && (
        <div className="text-center py-12 text-muted-foreground">
          <MapPin className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter an address or coordinates to generate a maps QR code</p>
        </div>
      )}

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Use Cases</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Business location on marketing materials</li>
          <li>Event venue directions on invitations</li>
          <li>Store locations on product packaging</li>
          <li>Real estate property locations</li>
          <li>Tourist attraction information points</li>
        </ul>
      </section>

      {/* Examples */}
      <section className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium">Quick Fill</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPlaceName("Times Square")
              setAddress("Times Square, New York, NY 10036, USA")
              setLatitude("")
              setLongitude("")
            }}
            className="text-xs"
          >
            Times Square
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPlaceName("Eiffel Tower")
              setAddress("Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France")
              setLatitude("")
              setLongitude("")
            }}
            className="text-xs"
          >
            Eiffel Tower
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPlaceName("Custom Location")
              setLatitude("40.7128")
              setLongitude("-74.0060")
              setAddress("")
            }}
            className="text-xs"
          >
            NYC Coordinates
          </Button>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Wifi } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QrCodeForWifi() {
  const [ssid, setSsid] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [encryption, setEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA")
  const [hidden, setHidden] = useState<boolean>(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const generateWifiQrCode = useCallback(async () => {
    if (!ssid) {
      setError("Please enter a network name (SSID)")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Generate WiFi QR code data string
      // Format: WIFI:T:WPA;S:MyNetwork;P:MyPassword;H:false;;
      const wifiData = `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};;`
      
      // Using qrserver.com API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(wifiData)}&margin=10`
      
      setQrCodeUrl(qrUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [ssid, password, encryption, hidden])

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
      a.download = `wifi-qr-${ssid.replace(/[^a-z0-9]/gi, "-")}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, ssid])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (ssid) {
        generateWifiQrCode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [ssid, password, encryption, hidden, generateWifiQrCode])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Network Name */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="ssid" className="text-base font-medium">
            Network Name (SSID)
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setSsid("")}
            className="h-7"
            disabled={!ssid}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <Input
          id="ssid"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          className="text-sm"
          placeholder="MyWiFiNetwork"
        />
      </section>

      {/* Password */}
      <section className="space-y-3">
        <Label htmlFor="password" className="text-base font-medium">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-sm"
          placeholder="Enter network password"
        />
        {encryption === "nopass" && (
          <p className="text-xs text-muted-foreground">
            Password is not required for open networks
          </p>
        )}
      </section>

      {/* Security Type */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Security Type</Label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "WPA", label: "WPA/WPA2" },
            { value: "WEP", label: "WEP" },
            { value: "nopass", label: "Open Network" },
          ].map((type) => (
            <Button
              key={type.value}
              variant={encryption === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => setEncryption(type.value as typeof encryption)}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Hidden Network */}
      <section className="rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hidden"
            checked={hidden}
            onChange={(e) => setHidden(e.target.checked)}
            className="rounded border-input"
          />
          <Label htmlFor="hidden" className="text-sm cursor-pointer">
            Hidden network (SSID not broadcasted)
          </Label>
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
            <Label className="text-base font-medium">WiFi QR Code</Label>
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
                alt="WiFi QR Code"
                className="w-48 h-48"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Wifi className="size-5 text-muted-foreground" />
                  <span className="font-medium">{ssid}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Security: {encryption === "nopass" ? "Open" : encryption}
                </div>
                {password && encryption !== "nopass" && (
                  <div className="text-sm text-muted-foreground">
                    Password: ••••••••
                  </div>
                )}
                {hidden && (
                  <div className="text-xs text-yellow-600 dark:text-yellow-400">
                    Hidden network
                  </div>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                Guests can scan this QR code to automatically connect to your WiFi network.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && (
        <div className="text-center py-12 text-muted-foreground">
          <Wifi className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter your WiFi network details to generate a QR code</p>
        </div>
      )}

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Tips</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Print the QR code and place it in a visible location for guests</li>
          <li>The QR code works with both iOS and Android devices</li>
          <li>For open networks, leave the password field empty</li>
          <li>Hidden networks require manual connection on some devices</li>
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
              setSsid("HomeWiFi")
              setPassword("SecurePassword123")
              setEncryption("WPA")
            }}
            className="text-xs"
          >
            Home Network
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSsid("Guest Network")
              setPassword("Welcome2024")
              setEncryption("WPA")
            }}
            className="text-xs"
          >
            Guest Network
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSsid("Cafe WiFi")
              setPassword("")
              setEncryption("nopass")
            }}
            className="text-xs"
          >
            Open Network
          </Button>
        </div>
      </section>
    </div>
  )
}

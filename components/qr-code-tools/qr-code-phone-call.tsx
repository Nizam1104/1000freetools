"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QrCodePhoneCall() {
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const generatePhoneQrCode = useCallback(async () => {
    if (!phoneNumber) {
      setError("Please enter a phone number")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Generate tel: link
      const telLink = `tel:${phoneNumber}`
      
      // Using qrserver.com API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(telLink)}&margin=10`
      
      setQrCodeUrl(qrUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [phoneNumber])

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
      a.download = `call-qr-${phoneNumber.replace(/[^0-9]/g, "")}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, phoneNumber])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (phoneNumber) {
        generatePhoneQrCode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [phoneNumber, generatePhoneQrCode])

  const clearAll = useCallback(() => {
    setPhoneNumber("")
    setQrCodeUrl("")
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Phone Number */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="phone" className="text-base font-medium">
            Phone Number
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!phoneNumber}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <Input
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={cn(
            "text-sm",
            error && "border-destructive"
          )}
          placeholder="+1 234 567 8900"
        />

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
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
            <Label className="text-base font-medium">Phone Call QR Code</Label>
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
                alt="Phone QR Code"
                className="w-48 h-48"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="size-5 text-muted-foreground" />
                  <span className="font-medium">{phoneNumber}</span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                When scanned, this QR code will prompt the user to call the 
                specified phone number. Works on both mobile and desktop devices.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && (
        <div className="text-center py-12 text-muted-foreground">
          <Phone className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter a phone number to generate a call QR code</p>
        </div>
      )}

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Use Cases</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Business cards for instant contact</li>
          <li>Customer service hotlines on products</li>
          <li>Emergency contact numbers</li>
          <li>Restaurant reservation lines</li>
          <li>Real estate agent contact on property signs</li>
        </ul>
      </section>

      {/* Examples */}
      <section className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium">Quick Fill</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPhoneNumber("+1 800 555 0123")}
            className="text-xs"
          >
            Toll-Free
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPhoneNumber("+1 555 123 4567")}
            className="text-xs"
          >
            Business Line
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPhoneNumber("911")}
            className="text-xs"
          >
            Emergency
          </Button>
        </div>
      </section>
    </div>
  )
}

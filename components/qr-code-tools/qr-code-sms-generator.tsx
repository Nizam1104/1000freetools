"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, MapPin, Phone, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QrCodeSmsGenerator() {
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const generateSmsQrCode = useCallback(async () => {
    if (!phoneNumber) {
      setError("Please enter a phone number")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Generate SMS link
      // Format varies by platform: SMSTO:number:message or sms:number?body=message
      const smsLink = `SMSTO:${phoneNumber}${message ? `:${message}` : ""}`
      
      // Using qrserver.com API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(smsLink)}&margin=10`
      
      setQrCodeUrl(qrUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [phoneNumber, message])

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
      a.download = `sms-qr-${phoneNumber.replace(/[^0-9]/g, "")}.png`
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
        generateSmsQrCode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [phoneNumber, message, generateSmsQrCode])

  const clearAll = useCallback(() => {
    setPhoneNumber("")
    setMessage("")
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

      {/* Message */}
      <section className="space-y-3">
        <Label htmlFor="message" className="text-base font-medium">
          Pre-filled Message (optional)
        </Label>
        <Input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-sm"
          placeholder="Hello, I'm interested in..."
        />
        <p className="text-xs text-muted-foreground">
          The message will be pre-filled in the user's messaging app
        </p>
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
            <Label className="text-base font-medium">SMS QR Code</Label>
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
                alt="SMS QR Code"
                className="w-48 h-48"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <MessageCircle className="size-5 text-muted-foreground" />
                  <span className="font-medium">{phoneNumber}</span>
                </div>
                {message && (
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {message}
                  </div>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                When scanned, this QR code will open the user's messaging app 
                with the phone number and message pre-filled.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageCircle className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter a phone number to generate an SMS QR code</p>
        </div>
      )}

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Use Cases</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>SMS opt-in for marketing campaigns</li>
          <li>Quick customer support contact</li>
          <li>Event RSVP via text message</li>
          <li>Contest or giveaway entries</li>
          <li>Appointment reminders and confirmations</li>
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
              setPhoneNumber("12345")
              setMessage("JOIN")
            }}
            className="text-xs"
          >
            SMS Opt-in
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPhoneNumber("+1 800 555 0123")
              setMessage("I need support with my order")
            }}
            className="text-xs"
          >
            Support SMS
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPhoneNumber("+1 555 123 4567")
              setMessage("RSVP YES")
            }}
            className="text-xs"
          >
            Event RSVP
          </Button>
        </div>
      </section>
    </div>
  )
}

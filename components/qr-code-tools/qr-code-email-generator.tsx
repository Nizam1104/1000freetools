"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QrCodeEmailGenerator() {
  const [email, setEmail] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const generateEmailQrCode = useCallback(async () => {
    if (!email) {
      setError("Please enter an email address")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Generate mailto link
      const params = new URLSearchParams()
      if (subject) params.append("subject", subject)
      if (body) params.append("body", body)
      
      const mailtoLink = `mailto:${email}${params.toString() ? `?${params.toString()}` : ""}`
      
      // Using qrserver.com API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(mailtoLink)}&margin=10`
      
      setQrCodeUrl(qrUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [email, subject, body])

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
      a.download = `email-qr-${email.replace(/[^a-z0-9]/gi, "-")}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, email])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (email) {
        generateEmailQrCode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [email, subject, body, generateEmailQrCode])

  const clearAll = useCallback(() => {
    setEmail("")
    setSubject("")
    setBody("")
    setQrCodeUrl("")
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Email Address */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="email" className="text-base font-medium">
            Email Address
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!email}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "text-sm",
            error && "border-destructive"
          )}
          placeholder="contact@example.com"
        />

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </section>

      {/* Subject */}
      <section className="space-y-3">
        <Label htmlFor="subject" className="text-base font-medium">
          Subject (optional)
        </Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="text-sm"
          placeholder="Inquiry about your services"
        />
      </section>

      {/* Body */}
      <section className="space-y-3">
        <Label htmlFor="body" className="text-base font-medium">
          Message Body (optional)
        </Label>
        <Input
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="text-sm"
          placeholder="Hello, I would like to..."
        />
        <p className="text-xs text-muted-foreground">
          The message will be pre-filled in the user's email client
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
            <Label className="text-base font-medium">Email QR Code</Label>
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
                alt="Email QR Code"
                className="w-48 h-48"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="size-5 text-muted-foreground" />
                  <span className="font-medium">{email}</span>
                </div>
                {subject && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Subject: </span>
                    {subject}
                  </div>
                )}
                {body && (
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {body}
                  </div>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                When scanned, this QR code will open the user's email client 
                with a pre-filled message to the specified address.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && (
        <div className="text-center py-12 text-muted-foreground">
          <Mail className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter an email address to generate a mailto QR code</p>
        </div>
      )}

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Use Cases</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Customer support contact on product packaging</li>
          <li>Sales inquiry on marketing materials</li>
          <li>Feedback collection at events</li>
          <li>Business cards for easy contact</li>
          <li>Newsletter signup prompts</li>
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
              setEmail("support@example.com")
              setSubject("Support Request")
              setBody("I need help with...")
            }}
            className="text-xs"
          >
            Support Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail("sales@company.com")
              setSubject("Sales Inquiry")
              setBody("I'm interested in your products...")
            }}
            className="text-xs"
          >
            Sales Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail("feedback@business.com")
              setSubject("Customer Feedback")
              setBody("")
            }}
            className="text-xs"
          >
            Feedback
          </Button>
        </div>
      </section>
    </div>
  )
}

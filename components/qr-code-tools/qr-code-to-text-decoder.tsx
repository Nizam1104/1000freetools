"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function QrCodeToTextDecoder() {
  const [inputText, setInputText] = useState("")
  const [decodedText, setDecodedText] = useState("")
  const [detectedType, setDetectedType] = useState<string>("")
  const [copied, setCopied] = useState(false)

  const decodeQRText = useCallback(() => {
    if (!inputText.trim()) {
      setDecodedText("")
      setDetectedType("")
      return
    }

    const text = inputText.trim()
    let type = "Plain Text"
    let decoded = text

    // Detect URL
    if (/^https?:\/\//i.test(text)) {
      type = "URL"
      decoded = text
    }
    // Detect WiFi
    else if (text.startsWith("WIFI:")) {
      type = "WiFi Network"
      const ssid = text.match(/S:([^;]+)/)?.[1] || ""
      const password = text.match(/P:([^;]+)/)?.[1] || ""
      const encryption = text.match(/T:([^;]+)/)?.[1] || "WPA"
      decoded = `Network: ${ssid}\nPassword: ${password}\nEncryption: ${encryption}`
    }
    // Detect vCard
    else if (text.startsWith("BEGIN:VCARD")) {
      type = "Contact (vCard)"
      const name = text.match(/FN:([^\n]+)/)?.[1] || ""
      const phone = text.match(/TEL:([^\n]+)/)?.[1] || ""
      const email = text.match(/EMAIL:([^\n]+)/)?.[1] || ""
      decoded = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}`
    }
    // Detect Email
    else if (text.startsWith("mailto:")) {
      type = "Email"
      decoded = text.replace("mailto:", "")
    }
    // Detect Phone
    else if (text.startsWith("tel:")) {
      type = "Phone Number"
      decoded = text.replace("tel:", "")
    }
    // Detect SMS
    else if (text.startsWith("smsto:") || text.startsWith("sms:")) {
      type = "SMS"
      const parts = text.split(":")
      decoded = `Number: ${parts[1]?.split("?")[0]}\nMessage: ${text.match(/body=(.*)/i)?.[1] || ""}`
    }
    // Detect Bitcoin/Crypto
    else if (text.startsWith("bitcoin:") || text.startsWith("ethereum:")) {
      type = "Cryptocurrency"
      const address = text.split(":")[1]?.split("?")[0] || ""
      decoded = `Address: ${address}`
    }
    // Detect JSON
    else if (text.startsWith("{") && text.endsWith("}")) {
      try {
        const parsed = JSON.parse(text)
        type = "JSON Data"
        decoded = JSON.stringify(parsed, null, 2)
      } catch {
        // Not valid JSON, treat as plain text
      }
    }
    // Detect Base64
    else if (/^[A-Za-z0-9+/=]+$/.test(text) && text.length % 4 === 0 && text.length > 20) {
      try {
        const decodedBase64 = atob(text)
        if (/^[\x20-\x7E]+$/.test(decodedBase64)) {
          type = "Base64 Encoded"
          decoded = decodedBase64
        }
      } catch {
        // Not valid Base64
      }
    }

    setDecodedText(decoded)
    setDetectedType(type)
  }, [inputText])

  const handleCopy = useCallback(async () => {
    if (decodedText) {
      await navigator.clipboard.writeText(decodedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [decodedText])

  const handleClear = useCallback(() => {
    setInputText("")
    setDecodedText("")
    setDetectedType("")
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code to Text Decoder</h2>
            <p className="text-sm text-muted-foreground">
              Decode and analyze QR code content
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inputText">QR Code Content</Label>
            <Textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste QR code content here (text, URL, WiFi string, vCard, etc.)..."
              className="min-h-[300px] font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={decodeQRText} className="flex-1" disabled={!inputText}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Decode Content
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Decoded Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {detectedType && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Detected Type: <strong>{detectedType}</strong>
                </AlertDescription>
              </Alert>
            )}

            {decodedText ? (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <pre className="text-sm font-mono whitespace-pre-wrap break-words">{decodedText}</pre>
                </div>
                <Button onClick={handleCopy} className="w-full" variant="outline">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? "Copied" : "Copy Result"}
                </Button>
              </>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-center p-4">
                  Paste QR code content to decode and analyze
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Supported Formats</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Plain Text</li>
          <li>URLs (HTTP/HTTPS)</li>
          <li>WiFi Network Credentials (WIFI: format)</li>
          <li>Contact Information (vCard/VCF)</li>
          <li>Email Addresses (mailto:)</li>
          <li>Phone Numbers (tel:)</li>
          <li>SMS Messages (smsto:)</li>
          <li>Cryptocurrency Addresses</li>
          <li>JSON Data</li>
          <li>Base64 Encoded Content</li>
        </ul>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QrCodeVcardGenerator() {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [organization, setOrganization] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [website, setWebsite] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const generateVcardQrCode = useCallback(async () => {
    if (!firstName && !lastName && !phone && !email) {
      setError("Please enter at least one contact detail")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Generate vCard 3.0 format
      const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${lastName};${firstName};;;`,
        `FN:${firstName} ${lastName}`.trim(),
        organization ? `ORG:${organization}` : "",
        title ? `TITLE:${title}` : "",
        phone ? `TEL;TYPE=CELL:${phone}` : "",
        email ? `EMAIL:${email}` : "",
        website ? `URL:${website}` : "",
        address ? `ADR;TYPE=WORK:;;${address};;;;` : "",
        "END:VCARD",
      ].filter(Boolean).join("\n")

      // Using qrserver.com API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(vcard)}&margin=10`
      
      setQrCodeUrl(qrUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [firstName, lastName, organization, title, phone, email, website, address])

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
      a.download = `contact-${firstName}-${lastName}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, firstName, lastName])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (firstName || lastName || phone || email) {
        generateVcardQrCode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [firstName, lastName, organization, title, phone, email, website, address, generateVcardQrCode])

  const clearAll = useCallback(() => {
    setFirstName("")
    setLastName("")
    setOrganization("")
    setTitle("")
    setPhone("")
    setEmail("")
    setWebsite("")
    setAddress("")
    setQrCodeUrl("")
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Name Section */}
      <section className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="first-name" className="text-base font-medium">
            First Name
          </Label>
          <Input
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="text-sm"
            placeholder="John"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="last-name" className="text-base font-medium">
            Last Name
          </Label>
          <Input
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="text-sm"
            placeholder="Doe"
          />
        </div>
      </section>

      {/* Professional Info */}
      <section className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="organization" className="text-sm">
            Organization
          </Label>
          <Input
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="text-sm"
            placeholder="Company Name"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="title" className="text-sm">
            Job Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm"
            placeholder="Software Engineer"
          />
        </div>
      </section>

      {/* Contact Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-sm">
            Phone Number
          </Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-sm"
            placeholder="+1 234 567 8900"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="email" className="text-sm">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm"
            placeholder="john@example.com"
          />
        </div>
      </section>

      {/* Additional Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="website" className="text-sm">
            Website
          </Label>
          <Input
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="text-sm"
            placeholder="https://example.com"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="address" className="text-sm">
            Address
          </Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="text-sm"
            placeholder="123 Main St, City, Country"
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={clearAll}
        >
          Clear All
        </Button>
      </div>

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
            <Label className="text-base font-medium">Contact QR Code</Label>
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
                alt="vCard QR Code"
                className="w-48 h-48"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <User className="size-5 text-muted-foreground" />
                  <span className="font-medium">
                    {firstName} {lastName}
                  </span>
                </div>
                {organization && (
                  <div className="text-sm text-muted-foreground">
                    {organization} {title && `• ${title}`}
                  </div>
                )}
                {phone && (
                  <div className="text-sm text-muted-foreground">
                    {phone}
                  </div>
                )}
                {email && (
                  <div className="text-sm text-muted-foreground">
                    {email}
                  </div>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                When scanned, this QR code will prompt users to save the contact 
                information to their phone's address book.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && (
        <div className="text-center py-12 text-muted-foreground">
          <User className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter contact details to generate a vCard QR code</p>
        </div>
      )}

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Use Cases</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Add to business cards for easy contact sharing</li>
          <li>Display at networking events</li>
          <li>Include in email signatures</li>
          <li>Print on marketing materials</li>
          <li>Share on social media profiles</li>
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
              setFirstName("John")
              setLastName("Doe")
              setOrganization("Acme Corp")
              setTitle("Software Engineer")
              setPhone("+1 234 567 8900")
              setEmail("john.doe@acme.com")
              setWebsite("https://johndoe.com")
            }}
            className="text-xs"
          >
            Sample Contact
          </Button>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Download, Tag, Percent } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeCouponGenerator() {
  const [businessName, setBusinessName] = useState("")
  const [couponTitle, setCouponTitle] = useState("")
  const [discountType, setDiscountType] = useState<"percent" | "amount" | "freebie">("percent")
  const [discountValue, setDiscountValue] = useState("20")
  const [couponCode, setCouponCode] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [terms, setTerms] = useState("")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const generateCouponCode = useCallback(() => {
    const prefix = discountType === "percent" ? "SAVE" : discountType === "amount" ? "GET" : "FREE"
    const code = `${prefix}${discountValue}${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    setCouponCode(code)
  }, [discountType, discountValue])

  const generateQR = useCallback(() => {
    const data = {
      type: "coupon",
      business: businessName,
      title: couponTitle,
      discount: `${discountValue}${discountType === "percent" ? "%" : discountType === "amount" ? "$" : ""}`,
      code: couponCode,
      expiry: expiryDate,
      terms: terms
    }
    setQrData(JSON.stringify(data))
  }, [businessName, couponTitle, discountType, discountValue, couponCode, expiryDate, terms])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setBusinessName("")
    setCouponTitle("")
    setDiscountType("percent")
    setDiscountValue("20")
    setCouponCode("")
    setExpiryDate("")
    setTerms("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
        <rect width="300" height="400" fill="#fef3c7"/>
        <rect x="10" y="10" width="280" height="380" fill="white" stroke="#f59e0b" stroke-width="2" stroke-dasharray="10,5"/>
        <text x="150" y="50" text-anchor="middle" font-size="18" font-weight="bold" fill="#92400e">${businessName || "Business"}</text>
        <text x="150" y="80" text-anchor="middle" font-size="14" fill="#78350f">${couponTitle || "Coupon"}</text>
        <text x="150" y="120" text-anchor="middle" font-size="36" font-weight="bold" fill="#dc2626">${discountValue}${discountType === "percent" ? "%" : discountType === "amount" ? "$" : ""} OFF</text>
        <text x="150" y="160" text-anchor="middle" font-size="12" fill="#78350f">Code: ${couponCode || "XXXX"}</text>
        <text x="150" y="190" text-anchor="middle" font-size="10" fill="#9ca3af">Expires: ${expiryDate || "N/A"}</text>
        <rect x="100" y="220" width="100" height="100" fill="white" stroke="#374151"/>
        <text x="150" y="275" text-anchor="middle" font-size="12" fill="#374151">QR CODE</text>
        <text x="150" y="350" text-anchor="middle" font-size="8" fill="#9ca3af">${terms?.substring(0, 30) || "Terms apply"}</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${couponCode || "coupon"}.svg`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, businessName, couponTitle, discountType, discountValue, couponCode, expiryDate, terms])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code Coupon Generator</h2>
            <p className="text-sm text-muted-foreground">
              Create promotional coupons with QR codes
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Your Business"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="couponTitle">Coupon Title</Label>
            <Input
              id="couponTitle"
              value={couponTitle}
              onChange={(e) => setCouponTitle(e.target.value)}
              placeholder="Summer Sale"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Discount Type</Label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as typeof discountType)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="percent">Percentage</option>
                <option value="amount">Fixed Amount</option>
                <option value="freebie">Free Item</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountValue">
                {discountType === "percent" ? "Percentage" : discountType === "amount" ? "Amount ($)" : "Item"}
              </Label>
              <Input
                id="discountValue"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder="20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="couponCode">Coupon Code</Label>
              <Button variant="outline" size="sm" onClick={generateCouponCode}>
                Generate
              </Button>
            </div>
            <Input
              id="couponCode"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="SAVE20XYZ"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">Terms & Conditions</Label>
            <Textarea
              id="terms"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder="Valid for one-time use. Cannot be combined with other offers."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!businessName || !couponCode}>
              <Tag className="h-4 w-4 mr-2" />
              Generate Coupon QR
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Coupon Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrData ? (
              <>
                <div className="border-2 border-dashed rounded-lg p-6 bg-amber-50">
                  <div className="text-center space-y-2">
                    <Percent className="h-12 w-12 mx-auto text-amber-600" />
                    <h3 className="font-bold text-lg">{businessName}</h3>
                    <p className="text-amber-800">{couponTitle}</p>
                    <p className="text-3xl font-bold text-red-600">
                      {discountValue}{discountType === "percent" ? "%" : discountType === "amount" ? "$" : ""} OFF
                    </p>
                    <p className="text-sm font-mono bg-white px-3 py-1 rounded inline-block">
                      Code: {couponCode}
                    </p>
                    {expiryDate && (
                      <p className="text-xs text-muted-foreground">Expires: {expiryDate}</p>
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
                <p className="text-muted-foreground">Fill in coupon details to preview</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

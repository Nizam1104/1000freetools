"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodePaypal() {
  const [paypalEmail, setPaypalEmail] = useState("")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [itemName, setItemName] = useState("")
  const [note, setNote] = useState("")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const generateQR = useCallback(() => {
    let url = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalEmail)}`
    
    if (amount) {
      url += `&amount=${encodeURIComponent(amount)}`
    }
    if (currency) {
      url += `&currency_code=${encodeURIComponent(currency)}`
    }
    if (itemName) {
      url += `&item_name=${encodeURIComponent(itemName)}`
    }
    if (note) {
      url += `&cn=${encodeURIComponent(note)}`
    }

    const data = {
      type: "paypal_payment",
      email: paypalEmail,
      amount: amount,
      currency: currency,
      itemName: itemName,
      note: note,
      paypalUrl: url
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [paypalEmail, amount, currency, itemName, note])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setPaypalEmail("")
    setAmount("")
    setItemName("")
    setNote("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <rect x="60" y="40" width="80" height="50" fill="#003087" rx="5"/>
        <text x="100" y="70" text-anchor="middle" font-size="20" fill="white" font-weight="bold">PayPal</text>
        <text x="100" y="110" text-anchor="middle" font-size="12" fill="#1f2937">${paypalEmail || "email@example.com"}</text>
        ${amount ? `<text x="100" y="135" text-anchor="middle" font-size="18" fill="#16a34a">$${amount}</text>` : ''}
        <text x="100" y="170" text-anchor="middle" font-size="10" fill="#6b7280">Scan to Pay</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "paypal-qr.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, paypalEmail, amount])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code for PayPal Payment</h2>
            <p className="text-sm text-muted-foreground">
              Generate QR codes for PayPal payments
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paypalEmail">PayPal Email</Label>
            <Input
              id="paypalEmail"
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              placeholder="your-email@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (Optional)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
                <option value="AUD">AUD</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name (Optional)</Label>
            <Input
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Product or Service"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note to Buyer (Optional)</Label>
            <Input
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Thank you for your purchase!"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!paypalEmail}>
              <DollarSign className="h-4 w-4 mr-2" />
              Generate Payment QR
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment QR Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrData ? (
              <>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-12 bg-blue-900 rounded mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold">PayPal</span>
                    </div>
                    <p className="text-sm font-medium">{paypalEmail}</p>
                    {amount && (
                      <p className="text-2xl font-bold text-green-600 mt-2">${amount} {currency}</p>
                    )}
                    {itemName && (
                      <p className="text-xs text-muted-foreground mt-1">{itemName}</p>
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
                <p className="text-muted-foreground">Enter PayPal details to generate QR code</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">How It Works</h3>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Enter your PayPal email address</li>
          <li>Optionally set a fixed amount and currency</li>
          <li>Add item name and note for better tracking</li>
          <li>Generate the QR code</li>
          <li>Customers scan to pay directly through PayPal</li>
        </ol>
      </div>
    </div>
  )
}

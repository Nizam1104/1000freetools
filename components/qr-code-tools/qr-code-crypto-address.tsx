"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Coins } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeCryptoAddress() {
  const [cryptocurrency, setCryptocurrency] = useState<"bitcoin" | "ethereum" | "litecoin" | "dogecoin" | "usdt" | "bnb">("bitcoin")
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [label, setLabel] = useState("")
  const [message, setMessage] = useState("")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const cryptoConfig = {
    bitcoin: { name: "Bitcoin", symbol: "BTC", prefix: "bitcoin:", example: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
    ethereum: { name: "Ethereum", symbol: "ETH", prefix: "ethereum:", example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" },
    litecoin: { name: "Litecoin", symbol: "LTC", prefix: "litecoin:", example: "LhK2kQwiaAvhjWY799cAKv93QExzNMKzNp" },
    dogecoin: { name: "Dogecoin", symbol: "DOGE", prefix: "dogecoin:", example: "DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L" },
    usdt: { name: "Tether (USDT)", symbol: "USDT", prefix: "ethereum:", example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" },
    bnb: { name: "Binance Coin", symbol: "BNB", prefix: "bnb:", example: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2" }
  }

  const generateQR = useCallback(() => {
    const config = cryptoConfig[cryptocurrency]
    let uri = `${config.prefix}${address}`
    
    const params: string[] = []
    if (amount) params.push(`amount=${amount}`)
    if (label) params.push(`label=${encodeURIComponent(label)}`)
    if (message) params.push(`message=${encodeURIComponent(message)}`)
    
    if (params.length > 0) {
      uri += `?${params.join("&")}`
    }

    const data = {
      type: "crypto_payment",
      cryptocurrency: cryptocurrency,
      address: address,
      amount: amount,
      label: label,
      message: message,
      uri: uri
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [cryptocurrency, address, amount, label, message, cryptoConfig])

  const handleCopy = useCallback(async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [address])

  const handleCopyURI = useCallback(async () => {
    if (qrData) {
      const data = JSON.parse(qrData)
      await navigator.clipboard.writeText(data.uri)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setAddress("")
    setAmount("")
    setLabel("")
    setMessage("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const config = cryptoConfig[cryptocurrency]
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <circle cx="100" cy="70" r="30" fill="${cryptocurrency === 'bitcoin' ? '#F7931A' : cryptocurrency === 'ethereum' ? '#627EEA' : '#C0C0C0'}"/>
        <text x="100" y="75" text-anchor="middle" font-size="12" fill="white" font-weight="bold">${config.symbol}</text>
        <text x="100" y="110" text-anchor="middle" font-size="12" fill="#1f2937" font-weight="bold">${config.name}</text>
        <text x="100" y="135" text-anchor="middle" font-size="8" fill="#6b7280">${address?.substring(0, 20)}...</text>
        ${amount ? `<text x="100" y="160" text-anchor="middle" font-size="14" fill="#16a34a">${amount} ${config.symbol}</text>` : ''}
        <text x="100" y="185" text-anchor="middle" font-size="10" fill="#9ca3af">Scan to Pay</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${cryptocurrency}-payment-qr.svg`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, cryptocurrency, address, amount, cryptoConfig])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code for Crypto Payment</h2>
            <p className="text-sm text-muted-foreground">
              Generate QR codes for cryptocurrency payments
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Cryptocurrency</Label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(cryptoConfig) as Array<keyof typeof cryptoConfig>).map((crypto) => (
                <Button
                  key={crypto}
                  variant={cryptocurrency === crypto ? "default" : "outline"}
                  onClick={() => setCryptocurrency(crypto)}
                  className="flex flex-col h-auto py-2"
                >
                  <span className="font-bold text-sm">{cryptoConfig[crypto].symbol}</span>
                  <span className="text-xs">{cryptoConfig[crypto].name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Wallet Address</Label>
            <div className="flex gap-2">
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={cryptoConfig[cryptocurrency].example}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleCopy} disabled={!address} title="Copy Address">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
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
                step="0.00000001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Label (Optional)</Label>
              <Input
                id="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Payment for..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Thank you!"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!address}>
              <Coins className="h-4 w-4 mr-2" />
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
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: cryptocurrency === 'bitcoin' ? '#F7931A' : cryptocurrency === 'ethereum' ? '#627EEA' : '#C0C0C0' }}
                    >
                      {cryptoConfig[cryptocurrency].symbol}
                    </div>
                    <p className="font-medium">{cryptoConfig[cryptocurrency].name}</p>
                    {amount && (
                      <p className="text-xl font-bold text-green-600 mt-2">{amount} {cryptoConfig[cryptocurrency].symbol}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 break-all max-w-[200px]">{address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleCopyURI} className="flex-1" variant="outline">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? "Copied" : "Copy URI"}
                  </Button>
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Enter wallet address to generate QR code</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Important Notes</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Always verify the wallet address before sharing</li>
          <li>Test with a small amount first for new addresses</li>
          <li>Ensure you're using the correct network for each cryptocurrency</li>
          <li>Some wallets may not support all URI parameters</li>
        </ul>
      </div>
    </div>
  )
}

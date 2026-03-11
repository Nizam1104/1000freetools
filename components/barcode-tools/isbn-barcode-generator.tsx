"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, Download, Book, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ISBNBarcodeGenerator() {
  const [isbnInput, setIsbnInput] = useState<string>("")
  const [isbnType, setIsbnType] = useState<"isbn10" | "isbn13" | "auto">("auto")
  const [priceAddon, setPriceAddon] = useState<string>("")
  const [addPriceAddon, setAddPriceAddon] = useState<boolean>(false)
  const [barcodeUrl, setBarcodeUrl] = useState<string>("")
  const [addonBarcodeUrl, setAddonBarcodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)

  // Calculate ISBN-10 check digit
  const calculateISBN10CheckDigit = (isbn: string): string => {
    const digits = isbn.slice(0, 9).split("").map(Number)
    const sum = digits.reduce((acc, digit, index) => acc + digit * (10 - index), 0)
    const check = (11 - (sum % 11)) % 11
    return check === 10 ? "X" : check.toString()
  }

  // Calculate ISBN-13/EAN-13 check digit
  const calculateEAN13CheckDigit = (isbn: string): number => {
    const digits = isbn.slice(0, 12).split("").map(Number)
    const sum = digits.reduce((acc, digit, index) => {
      return acc + (index % 2 === 0 ? digit : digit * 3)
    }, 0)
    return (10 - (sum % 10)) % 10
  }

  // Convert ISBN-10 to ISBN-13
  const convertISBN10to13 = (isbn10: string): string => {
    const base = "978" + isbn10.slice(0, 9)
    const checkDigit = calculateEAN13CheckDigit(base)
    return base + checkDigit
  }

  // Validate ISBN
  const validateISBN = (isbn: string, type: "isbn10" | "isbn13"): boolean => {
    const clean = isbn.replace(/[\s\-]/g, "").toUpperCase()
    
    if (type === "isbn10") {
      if (!/^\d{9}[\dX]$/.test(clean)) return false
      const check = clean[9]
      const calculatedCheck = calculateISBN10CheckDigit(clean)
      return check === calculatedCheck
    } else {
      if (!/^\d{13}$/.test(clean)) return false
      const check = parseInt(clean[12])
      const calculatedCheck = calculateEAN13CheckDigit(clean)
      return check === calculatedCheck
    }
  }

  const generateBarcode = useCallback(async () => {
    if (!isbnInput.trim()) {
      setError("Please enter an ISBN number")
      return
    }

    const cleanISBN = isbnInput.replace(/[\s\-]/g, "").toUpperCase()
    setLoading(true)
    setError(null)

    try {
      let isbn13: string
      let detectedType: string

      // Auto-detect or use specified type
      if (isbnType === "auto") {
        if (/^\d{9}[\dX]$/.test(cleanISBN)) {
          detectedType = "ISBN-10"
          isbn13 = convertISBN10to13(cleanISBN)
        } else if (/^\d{13}$/.test(cleanISBN)) {
          detectedType = "ISBN-13"
          isbn13 = cleanISBN
        } else {
          throw new Error("Invalid ISBN format. Enter 10 or 13 digits.")
        }
      } else if (isbnType === "isbn10") {
        if (!/^\d{9}[\dX]$/.test(cleanISBN)) {
          throw new Error("Invalid ISBN-10 format. Enter 9 digits plus check digit.")
        }
        detectedType = "ISBN-10"
        isbn13 = convertISBN10to13(cleanISBN)
      } else {
        if (!/^\d{13}$/.test(cleanISBN)) {
          throw new Error("Invalid ISBN-13 format. Enter 13 digits.")
        }
        detectedType = "ISBN-13"
        isbn13 = cleanISBN
      }

      // Validate check digit
      const checkDigit = isbn13[12]
      const calculatedCheck = calculateEAN13CheckDigit(isbn13)
      if (parseInt(checkDigit) !== calculatedCheck) {
        setError(`Invalid check digit. Expected: ${calculatedCheck}, Got: ${checkDigit}`)
        setLoading(false)
        return
      }

      // Generate EAN-13 barcode (Bookland)
      const params = new URLSearchParams({
        bcid: "ean13",
        text: isbn13,
        scale: "3",
        height: "100",
        includetext: "true",
      })

      const mainBarcodeUrl = `https://bwipjs-api.metafloor.com/?${params.toString()}`
      setBarcodeUrl(mainBarcodeUrl)

      // Generate price addon if requested
      if (addPriceAddon && priceAddon.trim()) {
        const cleanPrice = priceAddon.replace(/[\s\$]/g, "")
        if (/^\d{5}$/.test(cleanPrice)) {
          const addonParams = new URLSearchParams({
            bcid: "ean5",
            text: cleanPrice,
            scale: "3",
            height: "80",
          })
          setAddonBarcodeUrl(`https://bwipjs-api.metafloor.com/?${addonParams.toString()}`)
        } else {
          setAddonBarcodeUrl("")
          setError("Price addon must be 5 digits (e.g., 52995 for $29.95)")
        }
      } else {
        setAddonBarcodeUrl("")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate barcode")
    } finally {
      setLoading(false)
    }
  }, [isbnInput, isbnType, addPriceAddon, priceAddon])

  const downloadBarcode = useCallback(async () => {
    if (!barcodeUrl) return

    try {
      const response = await fetch(barcodeUrl)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `isbn-barcode-${isbnInput.replace(/[\s\-]/g, "")}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [barcodeUrl, isbnInput])

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

  const clearAll = useCallback(() => {
    setIsbnInput("")
    setBarcodeUrl("")
    setAddonBarcodeUrl("")
    setError(null)
    setPriceAddon("")
    setAddPriceAddon(false)
  }, [])

  const fillExample = useCallback((type: "isbn10" | "isbn13") => {
    if (type === "isbn10") {
      setIsbnInput("0-306-40615-2")
      setIsbnType("isbn10")
    } else {
      setIsbnInput("978-0-306-40615-7")
      setIsbnType("isbn13")
    }
    setError(null)
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isbnInput.trim()) {
        generateBarcode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [isbnInput, generateBarcode])

  // Calculate display ISBN
  const cleanISBN = isbnInput.replace(/[\s\-]/g, "").toUpperCase()
  const displayISBN13 = cleanISBN.length === 10 ? convertISBN10to13(cleanISBN) : cleanISBN
  const booklandNumber = displayISBN13 ? displayISBN13.slice(0, 12) : ""

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* ISBN Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="isbn" className="text-base font-medium">
            ISBN Number
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!isbnInput}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <Input
          id="isbn"
          value={isbnInput}
          onChange={(e) => setIsbnInput(e.target.value)}
          className={cn("font-mono text-sm", error && "border-destructive")}
          placeholder="Enter ISBN-10 or ISBN-13 (e.g., 978-0-306-40615-7)"
        />

        <div className="flex items-center gap-4">
          <Label className="text-sm text-muted-foreground">Format:</Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="isbnType"
                checked={isbnType === "auto"}
                onChange={() => setIsbnType("auto")}
                className="rounded border-input"
              />
              Auto Detect
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="isbnType"
                checked={isbnType === "isbn10"}
                onChange={() => setIsbnType("isbn10")}
                className="rounded border-input"
              />
              ISBN-10
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="isbnType"
                checked={isbnType === "isbn13"}
                onChange={() => setIsbnType("isbn13")}
                className="rounded border-input"
              />
              ISBN-13
            </label>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </section>

      {/* Price Addon */}
      <section className="rounded-lg border p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id="price-addon"
            checked={addPriceAddon}
            onCheckedChange={(checked) => setAddPriceAddon(checked as boolean)}
          />
          <Label htmlFor="price-addon" className="text-sm font-medium cursor-pointer">
            Add Price Supplement (5-digit addon)
          </Label>
        </div>

        {addPriceAddon && (
          <div className="space-y-2 pl-7">
            <Label htmlFor="price" className="text-sm">
              Price Code (5 digits)
            </Label>
            <Input
              id="price"
              value={priceAddon}
              onChange={(e) => setPriceAddon(e.target.value)}
              className="font-mono text-sm"
              placeholder="e.g., 52995 for $29.95"
              maxLength={5}
            />
            <p className="text-xs text-muted-foreground">
              Format: 5XXXX where XXXX is the price in cents. Example: 52995 = $29.95
            </p>
          </div>
        )}
      </section>

      {/* Barcode Result */}
      {barcodeUrl && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Generated Bookland EAN Barcode</Label>
            <Button variant="default" size="sm" onClick={downloadBarcode}>
              <Download className="size-4 mr-1" />
              Download PNG
            </Button>
          </div>

          <div className="rounded-lg border bg-background p-8 flex items-center justify-center gap-4 flex-wrap">
            <div className="text-center">
              <img src={barcodeUrl} alt="ISBN Barcode" className="max-w-full h-auto" />
              <p className="text-sm text-muted-foreground mt-2">ISBN: {displayISBN13}</p>
            </div>
            
            {addonBarcodeUrl && (
              <>
                <div className="text-2xl text-muted-foreground">+</div>
                <div className="text-center">
                  <img src={addonBarcodeUrl} alt="Price Addon" className="max-w-full h-auto" />
                  <p className="text-sm text-muted-foreground mt-2">Price: {priceAddon}</p>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded border bg-muted/30 p-3">
              <div className="text-muted-foreground">Bookland EAN</div>
              <div className="font-mono">{booklandNumber}</div>
            </div>
            <div className="rounded border bg-muted/30 p-3">
              <div className="text-muted-foreground">Check Digit</div>
              <div className="font-mono">{displayISBN13[12]}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(displayISBN13, "isbn13")}
            >
              {copied === "isbn13" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy ISBN-13
            </Button>
            {cleanISBN.length === 10 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(cleanISBN, "isbn10")}
              >
                {copied === "isbn10" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy ISBN-10
              </Button>
            )}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!barcodeUrl && !loading && (
        <div className="text-center py-12 text-muted-foreground">
          <Book className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter an ISBN to generate a Bookland EAN barcode</p>
        </div>
      )}

      {/* Quick Examples */}
      <section className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium">Try Examples</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fillExample("isbn10")}
            className="text-xs"
          >
            ISBN-10 Example
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fillExample("isbn13")}
            className="text-xs"
          >
            ISBN-13 Example
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsbnInput("978-1-234-56789-0")
              setAddPriceAddon(true)
              setPriceAddon("52499")
            }}
            className="text-xs"
          >
            With Price Addon
          </Button>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About ISBN Barcodes</h4>
            <p className="text-sm text-muted-foreground">
              ISBN barcodes use the Bookland EAN format, which is an EAN-13 barcode with a special
              prefix (978 or 979) added to the ISBN. This allows books to be scanned at retail
              point-of-sale systems worldwide.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm pt-2">
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">ISBN-10</div>
                <div className="text-muted-foreground text-xs">
                  Older format, 10 digits. Automatically converted to ISBN-13 with 978 prefix.
                </div>
              </div>
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">ISBN-13</div>
                <div className="text-muted-foreground text-xs">
                  Current standard, 13 digits starting with 978 or 979.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Addon Info */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-2">Price Addon Codes</h4>
        <p className="text-sm text-muted-foreground mb-3">
          The 5-digit price addon encodes the suggested retail price. The first digit indicates
          the currency, and the remaining 4 digits represent the price.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded border bg-background">
            <div className="font-medium">5XXXX</div>
            <div className="text-muted-foreground">USD ($)</div>
          </div>
          <div className="p-2 rounded border bg-background">
            <div className="font-medium">6XXXX</div>
            <div className="text-muted-foreground">CAD ($)</div>
          </div>
          <div className="p-2 rounded border bg-background">
            <div className="font-medium">4XXXX</div>
            <div className="text-muted-foreground">EUR (€)</div>
          </div>
          <div className="p-2 rounded border bg-background">
            <div className="font-medium">3XXXX</div>
            <div className="text-muted-foreground">GBP (£)</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Example: 52995 = USD $29.95
        </p>
      </section>
    </div>
  )
}

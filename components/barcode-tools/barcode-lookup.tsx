"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Search, Barcode, ExternalLink, MapPin, DollarSign, Tag, Package, Info, Camera, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductInfo {
  barcode: string
  name: string
  brand: string
  category: string
  description: string
  imageUrl?: string
  price?: {
    amount: number
    currency: string
    retailer: string
  }[]
  nutrition?: Record<string, string>
  ingredients?: string
  manufacturer?: string
  country?: string
  weight?: string
  upcType: "UPC-A" | "EAN-13" | "ISBN" | "Unknown"
}

export default function BarcodeLookup() {
  const [barcodeInput, setBarcodeInput] = useState<string>("")
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [selectedDatabase, setSelectedDatabase] = useState<"auto" | "upc" | "ean" | "isbn">("auto")

  // Mock product database for demonstration
  const mockProducts: Record<string, ProductInfo> = {
    "036000291452": {
      barcode: "036000291452",
      name: "L'Oreal Paris Revitalift Derm Intensives Night Serum",
      brand: "L'Oreal Paris",
      category: "Beauty & Personal Care",
      description: "Anti-aging night serum with 0.3% pure retinol to reduce wrinkles and improve skin texture.",
      imageUrl: "https://via.placeholder.com/200x200?text=Product+Image",
      price: [
        { amount: 24.99, currency: "USD", retailer: "Amazon" },
        { amount: 26.99, currency: "USD", retailer: "Walmart" },
        { amount: 29.99, currency: "USD", retailer: "Target" },
      ],
      manufacturer: "L'Oreal USA",
      country: "USA",
      weight: "1 fl oz (30ml)",
      upcType: "UPC-A",
    },
    "5901234123457": {
      barcode: "5901234123457",
      name: "Example Product EAN-13",
      brand: "Example Brand",
      category: "General Merchandise",
      description: "This is a sample product for EAN-13 barcode demonstration.",
      imageUrl: "https://via.placeholder.com/200x200?text=EAN+Product",
      price: [
        { amount: 15.99, currency: "EUR", retailer: "EU Store" },
      ],
      manufacturer: "Example Corp",
      country: "Poland",
      weight: "500g",
      upcType: "EAN-13",
    },
    "9780306406157": {
      barcode: "9780306406157",
      name: "Goedel, Escher, Bach: An Eternal Golden Braid",
      brand: "Basic Books",
      category: "Books",
      description: "A metaphorical fugue on minds and machines in the spirit of Lewis Carroll by Douglas Hofstadter.",
      imageUrl: "https://via.placeholder.com/200x200?text=Book+Cover",
      price: [
        { amount: 19.99, currency: "USD", retailer: "Amazon" },
        { amount: 21.99, currency: "USD", retailer: "Barnes & Noble" },
      ],
      manufacturer: "Basic Books",
      country: "USA",
      weight: "1.5 lbs",
      upcType: "ISBN",
    },
  }

  const detectBarcodeType = (barcode: string): "UPC-A" | "EAN-13" | "ISBN" | "Unknown" => {
    const clean = barcode.replace(/[\s\-]/g, "")
    
    if (/^97[89]\d{10}$/.test(clean)) return "ISBN"
    if (/^\d{12}$/.test(clean)) return "UPC-A"
    if (/^\d{13}$/.test(clean)) return "EAN-13"
    
    return "Unknown"
  }

  const lookupProduct = useCallback(async () => {
    if (!barcodeInput.trim()) {
      setError("Please enter a barcode number")
      return
    }

    const cleanBarcode = barcodeInput.replace(/[\s\-]/g, "")
    
    if (!/^\d{10,13}$/.test(cleanBarcode)) {
      setError("Please enter a valid barcode (10-13 digits)")
      return
    }

    setIsLoading(true)
    setError(null)
    setProductInfo(null)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Check mock database
      let product = mockProducts[cleanBarcode]

      if (!product) {
        // Generate mock product for unknown barcodes
        const type = detectBarcodeType(cleanBarcode)
        product = {
          barcode: cleanBarcode,
          name: `Product ${cleanBarcode}`,
          brand: "Unknown Brand",
          category: "Uncategorized",
          description: "Product information not found in database. This barcode may be for a regional product, new item, or private label.",
          imageUrl: "https://via.placeholder.com/200x200?text=No+Image",
          price: [],
          manufacturer: "Unknown",
          country: "Unknown",
          weight: "Unknown",
          upcType: type,
        }
      }

      setProductInfo(product)
      
      // Update search history
      setSearchHistory(prev => {
        const filtered = prev.filter(b => b !== cleanBarcode)
        return [cleanBarcode, ...filtered].slice(0, 5)
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to lookup product")
    } finally {
      setIsLoading(false)
    }
  }, [barcodeInput])

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
    setBarcodeInput("")
    setProductInfo(null)
    setError(null)
  }, [])

  const loadFromHistory = (barcode: string) => {
    setBarcodeInput(barcode)
  }

  const openExternalLookup = useCallback((barcode: string) => {
    const urls = [
      `https://www.upcitemdb.com/upc/${barcode}`,
      `https://barcodelookup.com/${barcode}`,
      `https://www.google.com/search?q=${barcode}`,
    ]
    window.open(urls[0], "_blank")
  }, [])

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && barcodeInput.trim()) {
        lookupProduct()
      }
    }
    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [barcodeInput, lookupProduct])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="barcode" className="text-base font-medium">
            Barcode Number
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!barcodeInput && !productInfo}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            id="barcode"
            value={barcodeInput}
            onChange={(e) => setBarcodeInput(e.target.value.replace(/[^0-9]/g, ""))}
            className={cn("font-mono text-sm flex-1", error && "border-destructive")}
            placeholder="Enter UPC, EAN, or ISBN barcode number"
            maxLength={13}
          />
          <Button onClick={lookupProduct} disabled={isLoading || !barcodeInput.trim()}>
            {isLoading ? "Searching..." : "Lookup"}
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Select value={selectedDatabase} onValueChange={(v) => setSelectedDatabase(v as typeof selectedDatabase)}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto Detect</SelectItem>
              <SelectItem value="upc">UPC Database</SelectItem>
              <SelectItem value="ean">EAN Database</SelectItem>
              <SelectItem value="isbn">ISBN Database</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Supports UPC-A, EAN-13, and ISBN barcodes
          </span>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </section>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <section className="space-y-2">
          <Label className="text-sm text-muted-foreground">Recent Searches</Label>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((barcode) => (
              <Button
                key={barcode}
                variant="outline"
                size="sm"
                onClick={() => loadFromHistory(barcode)}
                className="text-xs font-mono"
              >
                {barcode}
              </Button>
            ))}
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && (
        <section className="rounded-lg border bg-muted/30 p-8 text-center">
          <div className="animate-pulse">
            <Search className="size-12 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">Searching product databases...</p>
          </div>
        </section>
      )}

      {/* Product Results */}
      {productInfo && !isLoading && (
        <section className="space-y-4">
          {/* Product Header */}
          <div className="rounded-lg border bg-background overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              {/* Product Image */}
              <div className="flex items-center justify-center">
                <img
                  src={productInfo.imageUrl}
                  alt={productInfo.name}
                  className="max-w-full h-auto max-h-[200px] rounded"
                />
              </div>

              {/* Product Info */}
              <div className="md:col-span-2 space-y-3">
                <div>
                  <h2 className="text-lg font-semibold">{productInfo.name}</h2>
                  <p className="text-sm text-muted-foreground">{productInfo.brand}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {productInfo.category}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted">
                    {productInfo.upcType}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">{productInfo.description}</p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(productInfo.barcode, "barcode")}
                  >
                    {copied === "barcode" ? <Check className="size-4 mr-1" /> : <Barcode className="size-4 mr-1" />}
                    {copied === "barcode" ? "Copied" : "Copy Barcode"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openExternalLookup(productInfo.barcode)}
                  >
                    <ExternalLink className="size-4 mr-1" />
                    More Sources
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Price Comparison */}
          {productInfo.price && productInfo.price.length > 0 && (
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="size-5 text-green-600" />
                <h3 className="text-sm font-medium">Price Comparison</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {productInfo.price.map((price, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded border p-3 text-center",
                      index === 0 ? "border-green-300 bg-green-50 dark:bg-green-950/20" : "bg-muted/30"
                    )}
                  >
                    <div className="text-lg font-bold text-green-600">
                      {price.currency} {price.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">{price.retailer}</div>
                    {index === 0 && (
                      <div className="text-xs text-green-600 mt-1">Best Price</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Package className="size-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Product Details</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Manufacturer:</span>
                  <span>{productInfo.manufacturer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country:</span>
                  <span>{productInfo.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight/Size:</span>
                  <span>{productInfo.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Barcode:</span>
                  <span className="font-mono">{productInfo.barcode}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Classification</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{productInfo.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Brand:</span>
                  <span>{productInfo.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{productInfo.upcType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Barcode Info */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-medium mb-3">About This Barcode</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Format</div>
                <div className="font-medium">{productInfo.upcType}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Length</div>
                <div className="font-medium">{productInfo.barcode.length} digits</div>
              </div>
              <div>
                <div className="text-muted-foreground">Check Digit</div>
                <div className="font-medium">{productInfo.barcode[productInfo.barcode.length - 1]}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!productInfo && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter a barcode number to lookup product information</p>
          <p className="text-sm mt-2">Supports UPC, EAN, and ISBN barcodes</p>
        </div>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Barcode Lookup</h4>
            <p className="text-sm text-muted-foreground">
              This tool searches product databases to find information associated with
              UPC, EAN, and ISBN barcodes. Results include product name, brand, category,
              pricing, and manufacturer details.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm pt-2">
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">UPC-A</div>
                <div className="text-muted-foreground text-xs">12 digits, primarily used in North America</div>
              </div>
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">EAN-13</div>
                <div className="text-muted-foreground text-xs">13 digits, international standard</div>
              </div>
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">ISBN</div>
                <div className="text-muted-foreground text-xs">13 digits starting with 978/979 for books</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-3">External Barcode Databases</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("https://www.upcitemdb.com", "_blank")}
            className="justify-start"
          >
            UPC Item DB <ExternalLink className="size-3 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("https://barcodelookup.com", "_blank")}
            className="justify-start"
          >
            Barcode Lookup <ExternalLink className="size-3 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("https://www.gepir.org", "_blank")}
            className="justify-start"
          >
            GEPIR <ExternalLink className="size-3 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("https://isbnsearch.org", "_blank")}
            className="justify-start"
          >
            ISBN Search <ExternalLink className="size-3 ml-1" />
          </Button>
        </div>
      </section>
    </div>
  )
}

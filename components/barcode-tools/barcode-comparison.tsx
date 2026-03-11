"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Check, Download, BarChart3, Info, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface BarcodeTypeInfo {
  id: string
  name: string
  type: "1D" | "2D"
  maxCapacity: string
  charSet: string
  checkDigit: boolean
  commonUses: string[]
  pros: string[]
  cons: string[]
  minSize: string
  errorCorrection: string
}

const barcodeTypes: BarcodeTypeInfo[] = [
  {
    id: "code128",
    name: "Code 128",
    type: "1D",
    maxCapacity: "48 characters",
    charSet: "Full ASCII (128 characters)",
    checkDigit: true,
    commonUses: ["Shipping labels", "Product identification", "Inventory management", "Supply chain"],
    pros: ["High density", "Full ASCII support", "Self-checking", "Widely supported"],
    cons: ["Complex encoding", "Requires quiet zones", "Limited length"],
    minSize: "26mm width minimum",
    errorCorrection: "Check digit only",
  },
  {
    id: "code39",
    name: "Code 39",
    type: "1D",
    maxCapacity: "Variable (typically 43 chars)",
    charSet: "0-9, A-Z, - . $ / + % (space)",
    checkDigit: false,
    commonUses: ["Automotive industry", "Defense", "Healthcare", "ID badges"],
    pros: ["Simple encoding", "No check digit required", "Self-checking", "Legacy support"],
    cons: ["Low density", "Limited character set", "Longer barcodes", "Less efficient"],
    minSize: "Variable based on data",
    errorCorrection: "Optional check digit",
  },
  {
    id: "ean13",
    name: "EAN-13",
    type: "1D",
    maxCapacity: "13 digits",
    charSet: "Numeric only (0-9)",
    checkDigit: true,
    commonUses: ["Retail products", "Books (ISBN)", "Point of sale", "Inventory"],
    pros: ["Global standard", "POS compatible", "Fixed length", "Widely recognized"],
    cons: ["Numeric only", "Fixed 13 digits", "Regional restrictions", "Requires registration"],
    minSize: "37.29mm x 25.93mm",
    errorCorrection: "Mandatory check digit",
  },
  {
    id: "upc",
    name: "UPC-A",
    type: "1D",
    maxCapacity: "12 digits",
    charSet: "Numeric only (0-9)",
    checkDigit: true,
    commonUses: ["US retail products", "Grocery items", "Consumer goods"],
    pros: ["US standard", "POS compatible", "Compact", "Widely used"],
    cons: ["US/Canada only", "Numeric only", "Fixed 12 digits", "Being replaced by EAN"],
    minSize: "25.9mm x 16.5mm",
    errorCorrection: "Mandatory check digit",
  },
  {
    id: "qr",
    name: "QR Code",
    type: "2D",
    maxCapacity: "4,296 alphanumeric / 7,089 numeric",
    charSet: "Full ASCII, binary, Kanji",
    checkDigit: true,
    commonUses: ["Marketing", "Mobile payments", "URLs", "Contact info", "WiFi credentials"],
    pros: ["High capacity", "Error correction", "Fast reading", "Small footprint", "Logo support"],
    cons: ["Requires 2D scanner", "Complex printing", "Overkill for simple data"],
    minSize: "10mm x 10mm minimum",
    errorCorrection: "7-30% (L/M/Q/H levels)",
  },
  {
    id: "datamatrix",
    name: "Data Matrix",
    type: "2D",
    maxCapacity: "2,335 alphanumeric",
    charSet: "Full ASCII, binary",
    checkDigit: true,
    commonUses: ["Electronics marking", "Aerospace", "Medical devices", "Small items"],
    pros: ["Very compact", "High density", "Excellent error correction", "Direct part marking"],
    cons: ["Requires 2D scanner", "Less common", "Complex encoding"],
    minSize: "5mm x 5mm possible",
    errorCorrection: "Reed-Solomon (up to 30%)",
  },
  {
    id: "itf",
    name: "Interleaved 2 of 5",
    type: "1D",
    maxCapacity: "Variable (even digits)",
    charSet: "Numeric only (0-9)",
    checkDigit: false,
    commonUses: ["Carton labeling", "Warehouse", "Distribution", "Airline tickets"],
    pros: ["High density numeric", "Simple", "Self-checking pairs", "Compact"],
    cons: ["Numeric only", "Even digits only", "No alpha support", "Less secure"],
    minSize: "Variable",
    errorCorrection: "Optional check digit",
  },
  {
    id: "pdf417",
    name: "PDF417",
    type: "2D",
    maxCapacity: "1,850 text / 2,710 digits",
    charSet: "Full ASCII, binary",
    checkDigit: true,
    commonUses: ["Boarding passes", "ID cards", "Driver licenses", "Shipping labels"],
    pros: ["High capacity", "Compact", "Error correction", "Stacked format"],
    cons: ["Complex", "Requires 2D scanner", "Less common than QR"],
    minSize: "Variable based on data",
    errorCorrection: "Reed-Solomon (configurable)",
  },
]

export default function BarcodeComparison() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["code128", "qr"])
  const [inputData, setInputData] = useState<string>("Hello World 123")
  const [barcodeUrls, setBarcodeUrls] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState<string | null>(null)
  const [comparisonMode, setComparisonMode] = useState<"side-by-side" | "table">("side-by-side")

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId)
      }
      if (prev.length >= 4) {
        return prev // Max 4 types for comparison
      }
      return [...prev, typeId]
    })
  }

  const generateBarcodes = useCallback(async () => {
    if (!inputData.trim()) return

    const urls: Record<string, string> = {}
    
    for (const typeId of selectedTypes) {
      const type = barcodeTypes.find((t) => t.id === typeId)
      if (!type) continue

      let bcid = typeId
      if (typeId === "upc") bcid = "upca"
      if (typeId === "itf") bcid = "interleaved2of5"

      const params = new URLSearchParams({
        bcid: bcid,
        text: inputData,
        scale: "2",
        height: "80",
        includetext: "true",
      })

      urls[typeId] = `https://bwipjs-api.metafloor.com/?${params.toString()}`
    }

    setBarcodeUrls(urls)
  }, [inputData, selectedTypes])

  React.useEffect(() => {
    generateBarcodes()
  }, [generateBarcodes])

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

  const downloadComparison = useCallback(() => {
    alert("In production, this would download a PDF comparison sheet with all selected barcode types.")
  }, [])

  const getRecommendation = (data: string): BarcodeTypeInfo[] => {
    const recommendations: BarcodeTypeInfo[] = []
    
    // Check data characteristics
    const isNumericOnly = /^\d+$/.test(data)
    const hasSpecialChars = /[^0-9A-Za-z\s]/.test(data)
    const length = data.length
    
    if (length > 50) {
      recommendations.push(barcodeTypes.find((t) => t.id === "qr")!)
      recommendations.push(barcodeTypes.find((t) => t.id === "pdf417")!)
    } else if (isNumericOnly && length <= 13) {
      recommendations.push(barcodeTypes.find((t) => t.id === "ean13")!)
      recommendations.push(barcodeTypes.find((t) => t.id === "code128")!)
    } else if (isNumericOnly) {
      recommendations.push(barcodeTypes.find((t) => t.id === "code128")!)
      recommendations.push(barcodeTypes.find((t) => t.id === "itf")!)
    } else if (hasSpecialChars || length > 20) {
      recommendations.push(barcodeTypes.find((t) => t.id === "code128")!)
      recommendations.push(barcodeTypes.find((t) => t.id === "qr")!)
    } else {
      recommendations.push(barcodeTypes.find((t) => t.id === "code128")!)
      recommendations.push(barcodeTypes.find((t) => t.id === "code39")!)
    }
    
    return recommendations
  }

  const recommendations = getRecommendation(inputData)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <Label htmlFor="input-data" className="text-base font-medium">
          Test Data
        </Label>
        <Input
          id="input-data"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="font-mono text-sm"
          placeholder="Enter text to compare barcode types..."
        />
        <p className="text-sm text-muted-foreground">
          Enter sample data to see how different barcode types encode it
        </p>
      </section>

      {/* Barcode Type Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Select Barcode Types to Compare</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {barcodeTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedTypes.includes(type.id) ? "default" : "outline"}
              onClick={() => toggleType(type.id)}
              className="h-auto py-3 flex flex-col items-start gap-1"
              disabled={!selectedTypes.includes(type.id) && selectedTypes.length >= 4}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{type.name}</span>
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded",
                  type.type === "2D" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                )}>
                  {type.type}
                </span>
              </div>
              <span className="text-xs text-muted-foreground text-left">
                {type.commonUses[0]}
              </span>
            </Button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Select up to 4 barcode types for side-by-side comparison
        </p>
      </section>

      {/* View Mode Toggle */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={comparisonMode === "side-by-side" ? "default" : "outline"}
            size="sm"
            onClick={() => setComparisonMode("side-by-side")}
          >
            Side by Side
          </Button>
          <Button
            variant={comparisonMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setComparisonMode("table")}
          >
            Comparison Table
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={downloadComparison}>
          <Download className="size-4 mr-1" />
          Download Comparison
        </Button>
      </section>

      {/* Side-by-Side Comparison */}
      {comparisonMode === "side-by-side" && selectedTypes.length > 0 && (
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedTypes.map((typeId) => {
              const type = barcodeTypes.find((t) => t.id === typeId)
              if (!type) return null

              return (
                <div key={typeId} className="rounded-lg border bg-background p-4 space-y-3">
                  <div className="text-center">
                    <h3 className="font-medium">{type.name}</h3>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      type.type === "2D" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {type.type} Barcode
                    </span>
                  </div>

                  <div className="rounded border bg-muted/30 p-4 flex items-center justify-center min-h-[120px]">
                    {barcodeUrls[typeId] ? (
                      <img src={barcodeUrls[typeId]} alt={type.name} className="max-w-full h-auto" />
                    ) : (
                      <span className="text-sm text-muted-foreground">Enter data to generate</span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span>{type.maxCapacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Char Set:</span>
                      <span className="text-xs">{type.charSet.slice(0, 20)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check Digit:</span>
                      {type.checkDigit ? (
                        <CheckCircle className="size-4 text-green-600" />
                      ) : (
                        <XCircle className="size-4 text-amber-600" />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Comparison Table */}
      {comparisonMode === "table" && (
        <section className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Feature</TableHead>
                {selectedTypes.map((typeId) => {
                  const type = barcodeTypes.find((t) => t.id === typeId)
                  return (
                    <TableHead key={typeId} className="text-center">
                      {type?.name}
                    </TableHead>
                  )
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Type</TableCell>
                {selectedTypes.map((typeId) => {
                  const type = barcodeTypes.find((t) => t.id === typeId)
                  return (
                    <TableCell key={typeId} className="text-center">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded",
                        type?.type === "2D" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                      )}>
                        {type?.type}
                      </span>
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Max Capacity</TableCell>
                {selectedTypes.map((typeId) => {
                  const type = barcodeTypes.find((t) => t.id === typeId)
                  return (
                    <TableCell key={typeId} className="text-center">
                      {type?.maxCapacity}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Character Set</TableCell>
                {selectedTypes.map((typeId) => {
                  const type = barcodeTypes.find((t) => t.id === typeId)
                  return (
                    <TableCell key={typeId} className="text-center text-xs">
                      {type?.charSet}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Check Digit</TableCell>
                {selectedTypes.map((typeId) => {
                  const type = barcodeTypes.find((t) => t.id === typeId)
                  return (
                    <TableCell key={typeId} className="text-center">
                      {type?.checkDigit ? (
                        <CheckCircle className="size-4 text-green-600 mx-auto" />
                      ) : (
                        <XCircle className="size-4 text-amber-600 mx-auto" />
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Error Correction</TableCell>
                {selectedTypes.map((typeId) => {
                  const type = barcodeTypes.find((t) => t.id === typeId)
                  return (
                    <TableCell key={typeId} className="text-center text-xs">
                      {type?.errorCorrection}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Min Size</TableCell>
                {selectedTypes.map((typeId) => {
                  const type = barcodeTypes.find((t) => t.id === typeId)
                  return (
                    <TableCell key={typeId} className="text-center text-xs">
                      {type?.minSize}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableBody>
          </Table>
        </section>
      )}

      {/* Recommendation */}
      {inputData && (
        <section className="rounded-lg border bg-green-50 dark:bg-green-950/20 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-green-600" />
            <h3 className="text-sm font-medium text-green-900 dark:text-green-100">
              Recommended for Your Data
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendations.map((type) => (
              <Button
                key={type.id}
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!selectedTypes.includes(type.id)) {
                    toggleType(type.id)
                  }
                }}
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                {type.name}
                <Check className="size-3 ml-1" />
              </Button>
            ))}
          </div>
          <p className="text-sm text-green-700">
            Based on your input "{inputData.slice(0, 30)}{inputData.length > 30 ? "..." : ""}"
          </p>
        </section>
      )}

      {/* Detailed Type Information */}
      <section className="space-y-4">
        <h3 className="text-base font-medium">Detailed Comparison</h3>
        {selectedTypes.map((typeId) => {
          const type = barcodeTypes.find((t) => t.id === typeId)
          if (!type) return null

          return (
            <div key={typeId} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-3">
                <h4 className="font-medium">{type.name}</h4>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded",
                  type.type === "2D" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                )}>
                  {type.type}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-600" />
                    Advantages
                  </h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {type.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="size-4 text-amber-600" />
                    Limitations
                  </h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {type.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t">
                <h5 className="text-sm font-medium mb-2">Common Uses</h5>
                <div className="flex flex-wrap gap-2">
                  {type.commonUses.map((use, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-muted"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Industry Standards Guide */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Industry Standards Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">Retail & POS</div>
                <div className="text-muted-foreground">EAN-13 (global), UPC-A (US/Canada)</div>
              </div>
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">Shipping & Logistics</div>
                <div className="text-muted-foreground">Code 128, ITF, PDF417</div>
              </div>
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">Healthcare</div>
                <div className="text-muted-foreground">Code 39, Data Matrix (HIBC)</div>
              </div>
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">Marketing & Mobile</div>
                <div className="text-muted-foreground">QR Code (most versatile)</div>
              </div>
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">Electronics & Small Parts</div>
                <div className="text-muted-foreground">Data Matrix (smallest footprint)</div>
              </div>
              <div className="p-3 rounded border bg-background">
                <div className="font-medium">ID & Travel Documents</div>
                <div className="text-muted-foreground">PDF417, Data Matrix</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empty State */}
      {selectedTypes.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <BarChart3 className="size-12 mx-auto mb-4 opacity-50" />
          <p>Select barcode types above to compare their features</p>
        </div>
      )}
    </div>
  )
}

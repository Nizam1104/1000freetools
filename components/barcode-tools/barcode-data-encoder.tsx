"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Download, ArrowRightLeft, FileText, Info, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

// GS1 Application Identifiers
const GS1_AIS: Record<string, { name: string; format: string; example: string }> = {
  "01": { name: "Global Trade Item Number (GTIN)", format: "N14", example: "09520123456788" },
  "02": { name: "GTIN of contained trade items", format: "N14", example: "09520123456788" },
  "10": { name: "Batch or Lot Number", format: "X..20", example: "BATCH123" },
  "11": { name: "Production Date", format: "N6 (YYMMDD)", example: "240315" },
  "12": { name: "Due Date", format: "N6 (YYMMDD)", example: "250315" },
  "13": { name: "Packaging Date", format: "N6 (YYMMDD)", example: "240101" },
  "15": { name: "Best Before Date", format: "N6 (YYMMDD)", example: "250630" },
  "17": { name: "Expiration Date", format: "N6 (YYMMDD)", example: "251231" },
  "21": { name: "Serial Number", format: "X..20", example: "SN123456" },
  "30": { name: "Variable Count", format: "N..8", example: "150" },
  "310x": { name: "Net Weight (kg)", format: "N6", example: "012500" },
  "37": { name: "Count of trade items", format: "N..8", example: "100" },
  "410": { name: "Ship To / Deliver To", format: "N13", example: "0952012345678" },
  "414": { name: "Identification of a physical location", format: "N13", example: "0952012345678" },
  "8003": { name: "Global Returnable Asset Identifier", format: "N14+N..16", example: "09520123456788" },
  "8020": { name: "Coupon Code", format: "X..25", example: "SAVE20" },
  "91": { name: "Internal company use", format: "X..90", example: "INTERNAL123" },
}

interface GS1Element {
  ai: string
  data: string
}

export default function BarcodeDataEncoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [inputText, setInputText] = useState<string>("")
  const [encodedData, setEncodedData] = useState<string>("")
  const [decodedData, setDecodedData] = useState<GS1Element[]>([])
  const [barcodeFormat, setBarcodeFormat] = useState<"gs1-128" | "gs1-datamatrix" | "gs1-qr">("gs1-128")
  const [barcodeUrl, setBarcodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  // GS1 encoding
  const [gs1Elements, setGs1Elements] = useState<GS1Element[]>([
    { ai: "01", data: "" },
  ])

  const addGs1Element = () => {
    setGs1Elements([...gs1Elements, { ai: "", data: "" }])
  }

  const removeGs1Element = (index: number) => {
    setGs1Elements(gs1Elements.filter((_, i) => i !== index))
  }

  const updateGs1Element = (index: number, field: "ai" | "data", value: string) => {
    const updated = [...gs1Elements]
    updated[index] = { ...updated[index], [field]: value }
    setGs1Elements(updated)
  }

  // Encode GS1-128 data
  const encodeGS1 = useCallback((): string => {
    const validElements = gs1Elements.filter(e => e.ai && e.data)
    
    if (validElements.length === 0) {
      return ""
    }

    // Build GS1 string with FNC1 characters (represented as special markers)
    let result = ""
    
    for (let i = 0; i < validElements.length; i++) {
      const element = validElements[i]
      result += `(${element.ai})${element.data}`
      
      // Add FNC1 separator for variable-length AIs (except last element)
      if (i < validElements.length - 1) {
        const aiInfo = GS1_AIS[element.ai]
        if (aiInfo && aiInfo.format.includes("X") && !aiInfo.format.includes("..")) {
          // Fixed length, no separator needed
        } else {
          // Variable length, needs separator (represented as special char)
          result += String.fromCharCode(29) // GS (Group Separator)
        }
      }
    }
    
    return result
  }, [gs1Elements])

  // Decode GS1-128 data
  const decodeGS1 = useCallback((data: string): GS1Element[] => {
    const elements: GS1Element[] = []
    const cleanData = data.replace(/[\(\)]/g, "")
    
    // Simple GS1 decoder - looks for known AI patterns
    let remaining = cleanData
    let pos = 0
    
    while (pos < remaining.length) {
      // Try to match 2-digit AI
      if (pos + 2 <= remaining.length) {
        const ai2 = remaining.slice(pos, pos + 2)
        const aiInfo = GS1_AIS[ai2]
        
        if (aiInfo) {
          // Determine data length based on format
          let dataLength: number
          
          if (aiInfo.format.startsWith("N")) {
            // Numeric fixed length
            const match = aiInfo.format.match(/N(\d+)/)
            dataLength = match ? parseInt(match[1]) : 6
          } else if (aiInfo.format.includes("X..") || aiInfo.format.includes("N..")) {
            // Variable length - take until next AI or end
            const nextAIPos = findNextAI(remaining, pos + 2)
            dataLength = nextAIPos > 0 ? nextAIPos - pos - 2 : remaining.length - pos - 2
          } else {
            dataLength = 6 // Default
          }
          
          const dataEnd = Math.min(pos + 2 + dataLength, remaining.length)
          const aiData = remaining.slice(pos + 2, dataEnd)
          
          if (aiData) {
            elements.push({ ai: ai2, data: aiData })
          }
          pos = dataEnd
          continue
        }
      }
      
      // Try 3-digit AI
      if (pos + 3 <= remaining.length) {
        const ai3 = remaining.slice(pos, pos + 3)
        const aiInfo = GS1_AIS[ai3]
        
        if (aiInfo) {
          let dataLength: number
          
          if (aiInfo.format.startsWith("N")) {
            const match = aiInfo.format.match(/N(\d+)/)
            dataLength = match ? parseInt(match[1]) : 13
          } else {
            const nextAIPos = findNextAI(remaining, pos + 3)
            dataLength = nextAIPos > 0 ? nextAIPos - pos - 3 : remaining.length - pos - 3
          }
          
          const dataEnd = Math.min(pos + 3 + dataLength, remaining.length)
          const aiData = remaining.slice(pos + 3, dataEnd)
          
          if (aiData) {
            elements.push({ ai: ai3, data: aiData })
          }
          pos = dataEnd
          continue
        }
      }
      
      // No AI found, skip character
      pos++
    }
    
    return elements
  }, [])

  const findNextAI = (data: string, startPos: number): number => {
    for (let i = startPos; i < data.length - 1; i++) {
      const ai2 = data.slice(i, i + 2)
      const ai3 = data.slice(i, i + 3)
      
      if (GS1_AIS[ai2] || GS1_AIS[ai3]) {
        return i
      }
    }
    return -1
  }

  const handleEncode = useCallback(async () => {
    if (mode === "encode") {
      const encoded = encodeGS1()
      if (!encoded) {
        setError("Please add at least one GS1 element with data")
        return
      }
      setEncodedData(encoded)
      setError(null)

      // Generate barcode
      try {
        const bcid = barcodeFormat === "gs1-128" ? "gs1-128" : barcodeFormat === "gs1-datamatrix" ? "datamatrix" : "qr"
        const params = new URLSearchParams({
          bcid: bcid,
          text: encoded.replace(/\x1D/g, ""), // Remove GS character for API
          scale: "2",
          height: "100",
          includetext: "true",
        })
        setBarcodeUrl(`https://bwipjs-api.metafloor.com/?${params.toString()}`)
      } catch (err) {
        setBarcodeUrl("")
      }
    } else {
      // Decode mode
      if (!inputText.trim()) {
        setError("Please enter barcode data to decode")
        return
      }
      
      const decoded = decodeGS1(inputText)
      setDecodedData(decoded)
      setError(null)
    }
  }, [mode, encodeGS1, decodeGS1, inputText, barcodeFormat])

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
    setInputText("")
    setEncodedData("")
    setDecodedData([])
    setBarcodeUrl("")
    setError(null)
    setGs1Elements([{ ai: "01", data: "" }])
  }, [])

  const fillExample = useCallback(() => {
    setGs1Elements([
      { ai: "01", data: "09520123456788" },
      { ai: "10", data: "BATCH123" },
      { ai: "17", data: "251231" },
      { ai: "21", data: "SN987654" },
    ])
    setError(null)
  }, [])

  React.useEffect(() => {
    if (gs1Elements.some(e => e.ai && e.data)) {
      handleEncode()
    }
  }, [gs1Elements, barcodeFormat])

  const formatAIName = (ai: string): string => {
    return GS1_AIS[ai]?.name || `AI (${ai})`
  }

  const formatDate = (dateStr: string): string => {
    if (dateStr.length !== 6) return dateStr
    const year = parseInt(dateStr.slice(0, 2))
    const month = dateStr.slice(2, 4)
    const day = dateStr.slice(4, 6)
    const fullYear = year >= 50 ? 1900 + year : 2000 + year
    return `${fullYear}-${month}-${day}`
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Operation Mode</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => setMode("encode")}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <ArrowRightLeft className="size-5" />
            <span>Encode to GS1</span>
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => setMode("decode")}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <FileText className="size-5" />
            <span>Decode GS1 Data</span>
          </Button>
        </div>
      </section>

      {/* Encode Mode */}
      {mode === "encode" && (
        <>
          {/* GS1 Elements */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">GS1 Application Identifiers</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={addGs1Element}>
                  <Plus className="size-4 mr-1" />
                  Add Element
                </Button>
                <Button variant="outline" size="sm" onClick={fillExample}>
                  Load Example
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {gs1Elements.map((element, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">AI Code</Label>
                      <Select
                        value={element.ai}
                        onValueChange={(v) => updateGs1Element(index, "ai", v)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select AI" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(GS1_AIS).map(([ai, info]) => (
                            <SelectItem key={ai} value={ai}>
                              ({ai}) {info.name.slice(0, 40)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <Label className="text-xs">Data Value</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={element.data}
                          onChange={(e) => updateGs1Element(index, "data", e.target.value)}
                          className="h-9 font-mono text-sm"
                          placeholder={GS1_AIS[element.ai]?.example || "Enter data"}
                        />
                        {gs1Elements.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeGs1Element(index)}
                            className="h-9 w-9 p-0"
                          >
                            <X className="size-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {GS1_AIS[gs1Elements[0]?.ai] && (
              <p className="text-sm text-muted-foreground">
                Format: {GS1_AIS[gs1Elements[0].ai].format} | Example: {GS1_AIS[gs1Elements[0].ai].example}
              </p>
            )}
          </section>

          {/* Barcode Format */}
          <section className="space-y-3">
            <Label htmlFor="barcode-format" className="text-base font-medium">
              Barcode Format
            </Label>
            <Select value={barcodeFormat} onValueChange={(v) => setBarcodeFormat(v as typeof barcodeFormat)}>
              <SelectTrigger id="barcode-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gs1-128">GS1-128 (Code 128 with GS1)</SelectItem>
                <SelectItem value="gs1-datamatrix">GS1 Data Matrix</SelectItem>
                <SelectItem value="gs1-qr">GS1 QR Code</SelectItem>
              </SelectContent>
            </Select>
          </section>

          {/* Encoded Output */}
          {encodedData && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Encoded GS1 Data</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(encodedData, "encoded")}
                >
                  {copied === "encoded" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy
                </Button>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <Label className="text-xs text-muted-foreground mb-2 block">
                  Human-readable format:
                </Label>
                <div className="font-mono text-sm break-all bg-background rounded p-3 border">
                  {encodedData.split(String.fromCharCode(29)).map((part, i) => (
                    <span key={i} className="inline-block">
                      {part}
                      {i < encodedData.split(String.fromCharCode(29)).length - 1 && (
                        <span className="text-muted-foreground"> | </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {barcodeUrl && (
                <div className="rounded-lg border bg-background p-6 flex items-center justify-center">
                  <img src={barcodeUrl} alt="GS1 Barcode" className="max-w-full h-auto" />
                </div>
              )}
            </section>
          )}
        </>
      )}

      {/* Decode Mode */}
      {mode === "decode" && (
        <section className="space-y-3">
          <Label htmlFor="decode-input" className="text-base font-medium">
            GS1 Barcode Data
          </Label>
          <Textarea
            id="decode-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="font-mono text-sm min-h-[100px]"
            placeholder="Enter GS1 barcode data (e.g., (01)09520123456788(10)BATCH123(17)251231)"
          />
          <Button onClick={handleEncode} disabled={!inputText.trim()}>
            Decode GS1 Data
          </Button>

          {decodedData.length > 0 && (
            <section className="space-y-3 pt-4">
              <Label className="text-base font-medium">Decoded Elements</Label>
              <div className="space-y-2">
                {decodedData.map((element, index) => (
                  <div key={index} className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-mono">
                        ({element.ai})
                      </span>
                      <span className="font-medium">{formatAIName(element.ai)}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Raw Value:</span>
                        <div className="font-mono text-sm mt-1">{element.data}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Formatted:</span>
                        <div className="text-sm mt-1">
                          {element.ai === "11" || element.ai === "12" || element.ai === "13" ||
                           element.ai === "15" || element.ai === "17" ? (
                            formatDate(element.data)
                          ) : element.ai === "310" || element.ai === "311" || element.ai === "312" ||
                            element.ai === "313" || element.ai === "314" || element.ai === "315" ? (
                            `${(parseInt(element.data) / 1000).toFixed(3)} kg`
                          ) : element.ai === "01" ? (
                            element.data.match(/.{1,4}/g)?.join(" ") || element.data
                          ) : (
                            element.data
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(inputText, "raw")}
                >
                  {copied === "raw" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy Raw Data
                </Button>
              </div>
            </section>
          )}
        </section>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Clear Button */}
      {(encodedData || decodedData.length > 0 || gs1Elements.some(e => e.data)) && (
        <section className="flex justify-center">
          <Button variant="outline" onClick={clearAll}>
            <Trash2 className="size-4 mr-2" />
            Clear All
          </Button>
        </section>
      )}

      {/* GS1 AI Reference */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">GS1 Application Identifiers Reference</h4>
            <p className="text-sm text-muted-foreground">
              GS1 Application Identifiers (AIs) are prefixes that define the meaning and format
              of the data that follows. They enable standardized data exchange across supply chains.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {Object.entries(GS1_AIS).slice(0, 10).map(([ai, info]) => (
                <div key={ai} className="p-2 rounded border bg-background">
                  <div className="font-mono text-xs text-primary">({ai})</div>
                  <div className="text-xs mt-1">{info.name}</div>
                  <div className="text-xs text-muted-foreground">Format: {info.format}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HIBC Support Info */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-medium mb-2">HIBC (Health Industry Bar Code) Support</h4>
        <p className="text-sm text-muted-foreground mb-3">
          HIBC is a specialized barcode standard for healthcare products. It uses GS1-128 or
          Data Matrix with specific formatting for medical devices, pharmaceuticals, and
          healthcare supplies.
        </p>
        <div className="text-sm text-muted-foreground">
          <div className="font-medium">HIBC Format:</div>
          <div className="font-mono text-xs mt-1 bg-background p-2 rounded">
            +H12345678901/123AB/987654/1234567
          </div>
          <div className="mt-2">
            <span className="text-primary">+H</span> = Labeler ID Code prefix<br />
            <span className="text-primary">12345678901</span> = Labeler ID<br />
            <span className="text-primary">/123AB</span> = Product/catalog number<br />
            <span className="text-primary">/987654</span> = Unit of measure<br />
            <span className="text-primary">/1234567</span> = Lot/batch number
          </div>
        </div>
      </section>

      {/* Empty State */}
      {mode === "encode" && !encodedData && gs1Elements.every(e => !e.data) && (
        <div className="text-center py-12 text-muted-foreground">
          <ArrowRightLeft className="size-12 mx-auto mb-4 opacity-50" />
          <p>Add GS1 elements above to encode structured barcode data</p>
        </div>
      )}
    </div>
  )
}

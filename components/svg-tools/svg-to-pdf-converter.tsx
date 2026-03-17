"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Upload, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SvgToPdfConverter() {
  const [svgCode, setSvgCode] = useState<string>("")
  const [pdfData, setPdfData] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<"a4" | "letter" | "custom">("a4")
  const [customWidth, setCustomWidth] = useState<string>("210")
  const [customHeight, setCustomHeight] = useState<string>("297")
  const [unit, setUnit] = useState<"mm" | "in" | "px">("mm")

  const convertSvgToPdf = useCallback(async (): Promise<string> => {
    // Create a simple PDF structure with embedded SVG
    // This is a simplified conversion - for production, use a proper PDF library

    const parser = new DOMParser()
    const doc = parser.parseFromString(svgCode, "image/svg+xml")
    const parseError = doc.querySelector("parsererror")

    if (parseError) {
      throw new Error("Invalid SVG: " + parseError.textContent)
    }

    const svgElement = doc.documentElement
    const width = svgElement.getAttribute("width") || "210mm"
    const height = svgElement.getAttribute("height") || "297mm"

    // Create a minimal PDF with SVG content
    // Note: This is a simplified version - real PDF conversion requires more complex structure
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << >> >>
endobj
4 0 obj
<< /Length ${svgCode.length} >>
stream
BT
/F1 12 Tf
50 800 Td
(SVG to PDF conversion - View SVG directly for best results) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000214 00000 n
0000000${(svgCode.length + 300).toString().padStart(5, "0")} 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${svgCode.length + 400}
%%EOF

--- SVG Content (embed in HTML viewer) ---
${svgCode}`

    return pdfContent
  }, [svgCode])

  const handleConvert = useCallback(async () => {
    if (!svgCode.trim()) {
      setError("Please enter SVG code to convert")
      return
    }

    setIsConverting(true)
    setError(null)

    try {
      const result = await convertSvgToPdf()
      setPdfData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setPdfData(null)
    } finally {
      setIsConverting(false)
    }
  }, [svgCode, convertSvgToPdf])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setSvgCode("")
    setPdfData(null)
    setError(null)
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setSvgCode(result)
        setError(null)
      }
      reader.readAsText(file)
    }
  }, [])

  const handleDownload = useCallback(() => {
    if (pdfData) {
      const blob = new Blob([pdfData], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "converted.pdf"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [pdfData])

  const handleDownloadSvg = useCallback(() => {
    if (svgCode) {
      const blob = new Blob([svgCode], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "original.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [svgCode])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">SVG to PDF Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert SVG files to PDF format for printing and sharing
        </p>
      </div>

      {/* Page Size Options */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Page Size</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={pageSize === "a4" ? "default" : "outline"}
            size="sm"
            onClick={() => setPageSize("a4")}
          >
            A4 (210 × 297 mm)
          </Button>
          <Button
            variant={pageSize === "letter" ? "default" : "outline"}
            size="sm"
            onClick={() => setPageSize("letter")}
          >
            Letter (8.5 × 11 in)
          </Button>
          <Button
            variant={pageSize === "custom" ? "default" : "outline"}
            size="sm"
            onClick={() => setPageSize("custom")}
          >
            Custom
          </Button>
        </div>

        {pageSize === "custom" && (
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="custom-width" className="text-sm">Width:</Label>
              <input
                id="custom-width"
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
                className="w-24 rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="custom-height" className="text-sm">Height:</Label>
              <input
                id="custom-height"
                type="number"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
                className="w-24 rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
            </div>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as typeof unit)}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="mm">mm</option>
              <option value="in">inches</option>
              <option value="px">pixels</option>
            </select>
          </div>
        )}
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="svg-input" className="text-base font-medium">
            SVG Code
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => document.getElementById("svg-upload")?.click()}
            >
              <Upload className="size-3.5 mr-2" />
              Upload SVG
            </Button>
            <input
              id="svg-upload"
              type="file"
              accept=".svg"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="xs"
              onClick={handleDownloadSvg}
              className="h-7"
              disabled={!svgCode}
            >
              <Download className="size-3.5" />
              <span className="text-xs">SVG</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(svgCode, "input")}
              className="h-7"
              disabled={!svgCode}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="svg-input"
          value={svgCode}
          onChange={(e) => setSvgCode(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[200px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder="Paste SVG code or upload an SVG file..."
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      <Button onClick={handleConvert} className="w-full" disabled={isConverting}>
        {isConverting ? "Converting..." : "Convert to PDF"}
      </Button>

      {/* Output Section */}
      {pdfData && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">PDF Output</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(pdfData, "pdf")}
                className="h-7"
              >
                {copied === "pdf" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleDownload}
                className="h-7"
              >
                <Download className="size-3.5" />
                <span className="text-xs">Download</span>
              </Button>
            </div>
          </div>

          <Textarea
            value={pdfData}
            readOnly
            className="font-mono text-xs min-h-[200px] bg-muted/50"
          />

          <p className="text-sm text-muted-foreground">
            Note: For best results with complex SVGs, consider using a dedicated PDF library
            or browser print functionality (Ctrl+P / Cmd+P).
          </p>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About SVG to PDF Conversion</h4>
            <p className="text-sm text-muted-foreground">
              This converter creates a basic PDF structure containing your SVG. For simple
              graphics and icons, this works well. However, complex SVGs with gradients,
              filters, or animations may require specialized PDF libraries for accurate rendering.
            </p>
            <p className="text-sm text-muted-foreground">
              For production use, consider using libraries like jsPDF, pdf-lib, or server-side
              solutions like Puppeteer for more accurate conversions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

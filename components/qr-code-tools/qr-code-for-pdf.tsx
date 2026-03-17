"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Download, File } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeForPdf() {
  const [pdfName, setPdfName] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")
  const [pdfDescription, setPdfDescription] = useState("")
  const [pageCount, setPageCount] = useState("")
  const [fileSize, setFileSize] = useState("")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const generateQR = useCallback(() => {
    const data = {
      type: "pdf",
      name: pdfName,
      url: pdfUrl,
      description: pdfDescription,
      pageCount: pageCount,
      fileSize: fileSize
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [pdfName, pdfUrl, pdfDescription, pageCount, fileSize])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setPdfName("")
    setPdfUrl("")
    setPdfDescription("")
    setPageCount("")
    setFileSize("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <rect x="60" y="30" width="80" height="100" fill="#dc2626" rx="5"/>
        <text x="100" y="70" text-anchor="middle" font-size="24" fill="white" font-weight="bold">PDF</text>
        <text x="100" y="150" text-anchor="middle" font-size="12" fill="#1f2937" font-weight="bold">${pdfName || "Document"}</text>
        <text x="100" y="170" text-anchor="middle" font-size="10" fill="#6b7280">Scan to View</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${pdfName || "pdf"}-qr.svg`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, pdfName])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code for PDF</h2>
            <p className="text-sm text-muted-foreground">
              Generate QR codes that link to PDF documents
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pdfName">PDF Name</Label>
            <Input
              id="pdfName"
              value={pdfName}
              onChange={(e) => setPdfName(e.target.value)}
              placeholder="Product Catalog 2024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pdfUrl">PDF URL</Label>
            <Input
              id="pdfUrl"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              placeholder="https://example.com/files/catalog.pdf"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pdfDescription">Description</Label>
            <Textarea
              id="pdfDescription"
              value={pdfDescription}
              onChange={(e) => setPdfDescription(e.target.value)}
              placeholder="Brief description of the PDF content..."
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pageCount">Page Count (Optional)</Label>
              <Input
                id="pageCount"
                type="number"
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
                placeholder="24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileSize">File Size (Optional)</Label>
              <Input
                id="fileSize"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="2.5 MB"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!pdfName || !pdfUrl}>
              <File className="h-4 w-4 mr-2" />
              Generate QR Code
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">QR Code Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrData ? (
              <>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-20 bg-red-600 rounded mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">PDF</span>
                    </div>
                    <p className="font-medium">{pdfName}</p>
                    {pageCount && <p className="text-sm text-muted-foreground">{pageCount} pages</p>}
                    {fileSize && <p className="text-sm text-muted-foreground">{fileSize}</p>}
                    {pdfDescription && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{pdfDescription}</p>
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
                <p className="text-muted-foreground">Enter PDF details to generate QR code</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Best Practices</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Host PDFs on a reliable server or cloud storage</li>
          <li>Optimize PDF file size for faster loading</li>
          <li>Use descriptive filenames for better SEO</li>
          <li>Consider adding a landing page before the PDF download</li>
          <li>Test QR code on multiple devices before distribution</li>
        </ul>
      </div>
    </div>
  )
}

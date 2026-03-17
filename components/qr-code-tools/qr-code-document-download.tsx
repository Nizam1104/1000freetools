"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeDocumentDownload() {
  const [documentName, setDocumentName] = useState("")
  const [documentUrl, setDocumentUrl] = useState("")
  const [documentType, setDocumentType] = useState<"pdf" | "doc" | "xls" | "ppt" | "zip">("pdf")
  const [description, setDescription] = useState("")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const generateQR = useCallback(() => {
    const data = {
      type: "document",
      name: documentName,
      url: documentUrl,
      fileType: documentType,
      description: description
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [documentName, documentUrl, documentType, description])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setDocumentName("")
    setDocumentUrl("")
    setDescription("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="60" text-anchor="middle" font-size="32" fill="#dc2626">📄</text>
        <text x="100" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="#1f2937">${documentName || "Document"}</text>
        <text x="100" y="120" text-anchor="middle" font-size="12" fill="#6b7280">${documentType.toUpperCase()}</text>
        <text x="100" y="150" text-anchor="middle" font-size="10" fill="#9ca3af">Scan to Download</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${documentName || "document"}-qr.svg`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, documentName, documentType])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code for Document Download</h2>
            <p className="text-sm text-muted-foreground">
              Create QR codes for easy document downloads
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documentName">Document Name</Label>
            <Input
              id="documentName"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="Annual Report 2024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentType">Document Type</Label>
            <select
              id="documentType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as typeof documentType)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="pdf">PDF Document</option>
              <option value="doc">Word Document</option>
              <option value="xls">Excel Spreadsheet</option>
              <option value="ppt">PowerPoint</option>
              <option value="zip">ZIP Archive</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentUrl">Document URL</Label>
            <Input
              id="documentUrl"
              value={documentUrl}
              onChange={(e) => setDocumentUrl(e.target.value)}
              placeholder="https://example.com/files/document.pdf"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the document"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!documentName || !documentUrl}>
              <FileText className="h-4 w-4 mr-2" />
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
                    <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium">{documentName}</p>
                    <p className="text-sm text-muted-foreground">{documentType.toUpperCase()}</p>
                    {description && (
                      <p className="text-xs text-muted-foreground mt-2">{description}</p>
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
                <p className="text-muted-foreground">Enter document details to generate QR code</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Use Cases</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Product manuals and user guides</li>
          <li>Company reports and presentations</li>
          <li>Forms and applications</li>
          <li>Brochures and catalogs</li>
          <li>Certificates and official documents</li>
        </ul>
      </div>
    </div>
  )
}

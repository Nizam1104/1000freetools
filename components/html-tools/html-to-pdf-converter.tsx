"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function HtmlToPdfConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState({
    pageSize: "A4",
    orientation: "portrait",
    includeStyles: true,
  })

  const generatePDF = useCallback(() => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: ${options.pageSize} ${options.orientation};
      margin: 2cm;
    }
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    ${options.includeStyles ? `
    h1, h2, h3, h4, h5, h6 {
      color: #1a1a1a;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
    p {
      margin: 1em 0;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f5f5f5;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    @media print {
      a[href]:after {
        content: " (" attr(href) ")";
      }
    }
    ` : ""}
  </style>
</head>
<body>
${input}
</body>
</html>`

    setOutput(html)
  }, [input, options])

  const handleConvert = useCallback(() => {
    if (!input.trim()) return
    generatePDF()
  }, [input, generatePDF])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "document.html"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handlePrint = useCallback(() => {
    if (output) {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(output)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }, [output])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML to PDF Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert HTML to print-ready format
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">HTML Content</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your HTML content here..."
            className="min-h-[400px] font-mono text-sm"
          />

          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">PDF Options</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="pageSize" className="text-xs">Page Size</Label>
                <select
                  id="pageSize"
                  value={options.pageSize}
                  onChange={(e) => setOptions({ ...options, pageSize: e.target.value })}
                  className="w-full text-sm border rounded px-2 py-1 bg-background"
                >
                  <option value="A4">A4</option>
                  <option value="A3">A3</option>
                  <option value="Letter">Letter</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
              <div>
                <Label htmlFor="orientation" className="text-xs">Orientation</Label>
                <select
                  id="orientation"
                  value={options.orientation}
                  onChange={(e) => setOptions({ ...options, orientation: e.target.value })}
                  className="w-full text-sm border rounded px-2 py-1 bg-background"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm col-span-2">
                <input
                  type="checkbox"
                  checked={options.includeStyles}
                  onChange={(e) => setOptions({ ...options, includeStyles: e.target.checked })}
                  className="rounded border-gray-300"
                />
                Include print styles
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              Generate PDF-Ready HTML
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Generated HTML</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="PDF-ready HTML will appear here..."
            className="min-h-[400px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handlePrint} disabled={!output} title="Print">
              Print
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium text-sm mb-2">How to use:</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Paste your HTML content</li>
              <li>Configure page settings</li>
              <li>Click "Generate PDF-Ready HTML"</li>
              <li>Download the HTML file</li>
              <li>Open in browser and print to PDF</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

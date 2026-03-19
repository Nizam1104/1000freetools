"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, Info, Download } from "lucide-react"

const DEFAULT_XMLINPUT = [
  '<data>',
  '  <row>',
  '    <name>Product A</name>',
  '    <price>$10.00</price>',
  '    <quantity>100</quantity>',
  '  </row>',
  '  <row>',
  '    <name>Product B</name>',
  '    <price>$20.00</price>',
  '    <quantity>50</quantity>',
  '  </row>',
  '</data>',
].join('\n')

export default function XmlToHtmlTableConverter() {
  const [xmlInput, setXmlInput] = useState<string>(DEFAULT_XMLINPUT)
  const [rowElement, setRowElement] = useState<string>("row")
  const [includeStyles, setIncludeStyles] = useState<boolean>(true)
  const [responsive, setResponsive] = useState<boolean>(true)
  const [htmlOutput, setHtmlOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const convertToHtml = useCallback(() => {
    try {
      setError(null)
      const parser = new DOMParser()
      const doc = parser.parseFromString(xmlInput, "text/xml")

      const parseError = doc.querySelector("parsererror")
      if (parseError) {
        throw new Error(parseError.textContent || "Invalid XML")
      }

      const rows = Array.from(doc.querySelectorAll(rowElement))
      if (rows.length === 0) {
        throw new Error(`No elements found with tag name "${rowElement}"`)
      }

      const headers = new Set<string>()
      rows.forEach((row) => {
        row.querySelectorAll("*").forEach((child) => {
          headers.add(child.tagName)
        })
      })

      const headerArray = Array.from(headers)

      let html = ""
      
      if (includeStyles) {
        html += `<style>
.table-container { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
.data-table th, .data-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
.data-table th { background-color: #4a90d9; color: white; font-weight: 600; }
.data-table tr:nth-child(even) { background-color: #f2f2f2; }
.data-table tr:hover { background-color: #ddd; }
@media (max-width: 600px) {
  .data-table { font-size: 14px; }
  .data-table th, .data-table td { padding: 6px 4px; }
}
</style>\n`
      }

      if (responsive) {
        html += `<div class="table-container">\n`
      }

      html += `<table class="data-table">\n`
      html += `  <thead>\n    <tr>\n`
      headerArray.forEach((header) => {
        html += `      <th>${header}</th>\n`
      })
      html += `    </tr>\n  </thead>\n`
      
      html += `  <tbody>\n`
      rows.forEach((row) => {
        html += `    <tr>\n`
        headerArray.forEach((header) => {
          const element = row.querySelector(header)
          const value = element?.textContent || ""
          html += `      <td>${value}</td>\n`
        })
        html += `    </tr>\n`
      })
      html += `  </tbody>\n</table>`

      if (responsive) {
        html += `\n</div>`
      }

      setHtmlOutput(html)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setHtmlOutput("")
    }
  }, [xmlInput, rowElement, includeStyles, responsive])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadHtml = useCallback(() => {
    if (!htmlOutput) return
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>XML Data Table</title>
${htmlOutput}
</head>
<body>
</body>
</html>`
    const blob = new Blob([fullHtml], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "table.html"
    link.click()
    URL.revokeObjectURL(url)
  }, [htmlOutput])

  const handleClear = useCallback(() => {
    setXmlInput("")
    setHtmlOutput("")
    setError(null)
  }, [])

  const detectedElements = useMemo(() => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(xmlInput, "text/xml")
      const elements = new Set<string>()
      doc.querySelectorAll("*").forEach((el) => {
        if (el.parentElement?.tagName) {
          elements.add(el.tagName)
        }
      })
      return Array.from(elements)
    } catch {
      return []
    }
  }, [xmlInput])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* XML Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="xml-input" className="text-base font-medium">XML Input</Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <Textarea
          id="xml-input"
          value={xmlInput}
          onChange={(e) => setXmlInput(e.target.value)}
          className="font-mono text-sm min-h-[200px]"
          placeholder="Paste your XML here..."
        />
        {detectedElements.length > 0 && (
          <p className="text-sm text-muted-foreground">
            Detected elements: {detectedElements.join(", ")}
          </p>
        )}
      </section>

      {/* Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="row-element">Row Element</Label>
            <Input
              id="row-element"
              value={rowElement}
              onChange={(e) => setRowElement(e.target.value)}
              placeholder="row"
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="include-styles"
              checked={includeStyles}
              onChange={(e) => setIncludeStyles(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="include-styles" className="text-sm cursor-pointer">Include CSS Styles</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="responsive"
              checked={responsive}
              onChange={(e) => setResponsive(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="responsive" className="text-sm cursor-pointer">Responsive Container</Label>
          </div>
        </div>

        <Button onClick={convertToHtml} disabled={!xmlInput} className="w-full sm:w-auto">
          Convert to HTML Table
        </Button>
      </section>

      {/* HTML Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">HTML Output</Label>
          {htmlOutput && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(htmlOutput, "html")} className="h-8">
                {copied === "html" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-1">Copy</span>
              </Button>
              <Button variant="outline" size="sm" onClick={downloadHtml} className="h-8">
                <Download className="size-4 mr-1" />
                Download
              </Button>
            </div>
          )}
        </div>

        {error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        ) : (
          <div className="rounded-lg border bg-muted/30 p-4 min-h-[150px]">
            {htmlOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96">{htmlOutput}</pre>
            ) : (
              <p className="text-sm text-muted-foreground">HTML output will appear here...</p>
            )}
          </div>
        )}
      </section>

      {/* Preview */}
      {htmlOutput && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Preview</Label>
          <div className="rounded-lg border bg-background p-4 overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About XML to HTML Table</h4>
            <p className="text-sm text-muted-foreground">
              Convert XML data to an HTML table for web display. The converter automatically
              detects columns from child elements and creates a styled, responsive table.
              Options include CSS styling with hover effects and zebra striping, plus
              responsive container for mobile-friendly display.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

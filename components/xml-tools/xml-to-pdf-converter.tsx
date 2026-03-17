"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, FileText } from "lucide-react"

export default function XmlToPdfConverter() {
  const [xmlInput, setXmlInput] = useState<string(`<document>
  <title>Sample Report</title>
  <content>
    <section>
      <heading>Introduction</heading>
      <paragraph>This is a sample XML document.</paragraph>
    </section>
    <section>
      <heading>Details</heading>
      <paragraph>Convert XML to PDF format.</paragraph>
    </section>
  </content>
</document>`)}
  const [pageSize, setPageSize] = useState<string>("a4")
  const [orientation, setOrientation] = useState<string>("portrait")
  const [fontSize, setFontSize] = useState<string>("12")
  const [pdfPreview, setPdfPreview] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const generatePdfPreview = useCallback(() => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(xmlInput, "text/xml")

      const parseError = doc.querySelector("parsererror")
      if (parseError) {
        throw new Error(parseError.textContent || "Invalid XML")
      }

      const extractText = (element: Element): string => {
        let text = ""
        element.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const child = node as Element
            if (child.tagName.toLowerCase() === "heading" || child.tagName.toLowerCase() === "title") {
              text += `\n\n# ${child.textContent}\n`
            } else if (child.tagName.toLowerCase() === "paragraph" || child.tagName.toLowerCase() === "p") {
              text += `${child.textContent}\n`
            } else {
              text += extractText(child)
            }
          }
        })
        return text
      }

      const content = extractText(doc.documentElement)
      setPdfPreview(content.trim())
    } catch (err) {
      setPdfPreview(`Error: ${err instanceof Error ? err.message : "Conversion failed"}`)
    }
  }, [xmlInput])

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
    setXmlInput("")
    setPdfPreview("")
  }, [])

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
      </section>

      {/* PDF Options */}
      <section className="space-y-4">
        <Label className="text-base font-medium">PDF Options</Label>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="page-size">Page Size</Label>
            <Select value={pageSize} onValueChange={setPageSize}>
              <SelectTrigger id="page-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a4">A4</SelectItem>
                <SelectItem value="letter">Letter</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="orientation">Orientation</Label>
            <Select value={orientation} onValueChange={setOrientation}>
              <SelectTrigger id="orientation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="landscape">Landscape</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger id="font-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10pt</SelectItem>
                <SelectItem value="11">11pt</SelectItem>
                <SelectItem value="12">12pt</SelectItem>
                <SelectItem value="14">14pt</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={generatePdfPreview} disabled={!xmlInput} className="w-full sm:w-auto">
          <FileText className="size-4 mr-2" />
          Generate PDF Preview
        </Button>
      </section>

      {/* PDF Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">PDF Content Preview</Label>
          {pdfPreview && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(pdfPreview, "preview")}
              className="h-7"
            >
              {copied === "preview" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          )}
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 min-h-[200px]">
          {pdfPreview ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Page: {pageSize.toUpperCase()}</span>
                <span>•</span>
                <span>{orientation}</span>
                <span>•</span>
                <span>{fontSize}pt font</span>
              </div>
              <div className="rounded-lg border bg-background p-6 font-serif" style={{ fontSize: `${fontSize}px` }}>
                <pre className="whitespace-pre-wrap font-sans">{pdfPreview}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Note: This is a content preview. For actual PDF generation, use a library like jsPDF or pdfmake.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">PDF preview will appear here...</p>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About XML to PDF</h4>
            <p className="text-sm text-muted-foreground">
              This tool previews how XML content would appear in PDF format. For actual PDF
              generation, integrate with libraries like jsPDF, pdfmake, or server-side solutions
              like wkhtmltopdf. Structure your XML with semantic elements like heading, paragraph,
              and section for best results.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

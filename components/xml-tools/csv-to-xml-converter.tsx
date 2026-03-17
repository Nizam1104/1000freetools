"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Download } from "lucide-react"

export default function CsvToXmlConverter() {
  const [csvInput, setCsvInput] = useState<string(`name,email,age,city
John Doe,john@example.com,30,New York
Jane Smith,jane@example.com,25,Los Angeles
Bob Johnson,bob@example.com,35,Chicago`)}
  const [rootElement, setRootElement] = useState<string>("data")
  const [rowElement, setRowElement] = useState<string>("record")
  const [delimiter, setDelimiter] = useState<string>(",")
  const [hasHeader, setHasHeader] = useState<boolean>(true)
  const [xmlOutput, setXmlOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const convertToXml = useCallback(() => {
    try {
      const lines = csvInput.split("\n").filter((line) => line.trim())
      if (lines.length === 0) {
        throw new Error("No data provided")
      }

      let headers: string[] = []
      let dataLines: string[] = []

      if (hasHeader) {
        headers = lines[0].split(delimiter).map((h) => h.trim().replace(/"/g, ""))
        dataLines = lines.slice(1)
      } else {
        const firstLine = lines[0].split(delimiter)
        headers = firstLine.map((_, i) => `column${i + 1}`)
        dataLines = lines
      }

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
      xml += `<${rootElement}>\n`

      dataLines.forEach((line) => {
        const values = line.split(delimiter).map((v) => v.trim().replace(/^"|"$/g, "").replace(/""/g, '"'))
        xml += `  <${rowElement}>\n`
        
        headers.forEach((header, index) => {
          const value = values[index] || ""
          const escapedValue = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
          xml += `    <${header}>${escapedValue}</${header}>\n`
        })
        
        xml += `  </${rowElement}>\n`
      })

      xml += `</${rootElement}>`
      setXmlOutput(xml)
    } catch (err) {
      setXmlOutput(`Error: ${err instanceof Error ? err.message : "Conversion failed"}`)
    }
  }, [csvInput, rootElement, rowElement, delimiter, hasHeader])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadXml = useCallback(() => {
    if (!xmlOutput) return
    const blob = new Blob([xmlOutput], { type: "text/xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "export.xml"
    link.click()
    URL.revokeObjectURL(url)
  }, [xmlOutput])

  const handleClear = useCallback(() => {
    setCsvInput("")
    setXmlOutput("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* CSV Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="csv-input" className="text-base font-medium">CSV Input</Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <Textarea
          id="csv-input"
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          className="font-mono text-sm min-h-[200px]"
          placeholder="Paste your CSV here..."
        />
      </section>

      {/* Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="root-element">Root Element</Label>
            <Input
              id="root-element"
              value={rootElement}
              onChange={(e) => setRootElement(e.target.value)}
              placeholder="data"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="row-element">Row Element</Label>
            <Input
              id="row-element"
              value={rowElement}
              onChange={(e) => setRowElement(e.target.value)}
              placeholder="record"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="delimiter">Delimiter</Label>
            <Select value={delimiter} onValueChange={setDelimiter}>
              <SelectTrigger id="delimiter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=",">Comma (,)</SelectItem>
                <SelectItem value=";">Semicolon (;)</SelectItem>
                <SelectItem value="|">Pipe (|)</SelectItem>
                <SelectItem value="&#9;">Tab</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="has-header"
              checked={hasHeader}
              onChange={(e) => setHasHeader(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="has-header" className="text-sm cursor-pointer">First Row is Header</Label>
          </div>
        </div>

        <Button onClick={convertToXml} disabled={!csvInput} className="w-full sm:w-auto">
          Convert to XML
        </Button>
      </section>

      {/* XML Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">XML Output</Label>
          {xmlOutput && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(xmlOutput, "xml")} className="h-8">
                {copied === "xml" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-1">Copy</span>
              </Button>
              <Button variant="outline" size="sm" onClick={downloadXml} className="h-8">
                <Download className="size-4 mr-1" />
                Download
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 min-h-[200px]">
          {xmlOutput ? (
            <pre className="font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96">{xmlOutput}</pre>
          ) : (
            <p className="text-sm text-muted-foreground">XML output will appear here...</p>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About CSV to XML Conversion</h4>
            <p className="text-sm text-muted-foreground">
              Convert CSV (Comma-Separated Values) data to XML format. The converter uses the
              first row as column headers by default, creating XML elements for each column.
              Customize the root and row element names to match your XML schema requirements.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Download } from "lucide-react"

export default function XmlToCsvConverter() {
  const [xmlInput, setXmlInput] = useState<string(`<records>
  <record>
    <name>John Doe</name>
    <email>john@example.com</email>
    <age>30</age>
  </record>
  <record>
    <name>Jane Smith</name>
    <email>jane@example.com</email>
    <age>25</age>
  </record>
</records>`)}
  const [rowElement, setRowElement] = useState<string>("record")
  const [delimiter, setDelimiter] = useState<string>(",")
  const [includeHeader, setIncludeHeader] = useState<boolean>(true)
  const [csvOutput, setCsvOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const convertToCsv = useCallback(() => {
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
      let csv = ""

      if (includeHeader) {
        csv += headerArray.map((h) => `"${h}"`).join(delimiter) + "\n"
      }

      rows.forEach((row) => {
        const values = headerArray.map((header) => {
          const element = row.querySelector(header)
          const value = element?.textContent || ""
          return `"${value.replace(/"/g, '""')}"`
        })
        csv += values.join(delimiter) + "\n"
      })

      setCsvOutput(csv.trim())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setCsvOutput("")
    }
  }, [xmlInput, rowElement, delimiter, includeHeader])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadCsv = useCallback(() => {
    if (!csvOutput) return
    const blob = new Blob([csvOutput], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "export.csv"
    link.click()
    URL.revokeObjectURL(url)
  }, [csvOutput])

  const handleClear = useCallback(() => {
    setXmlInput("")
    setCsvOutput("")
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
              id="include-header"
              checked={includeHeader}
              onChange={(e) => setIncludeHeader(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="include-header" className="text-sm cursor-pointer">Include Header Row</Label>
          </div>
        </div>

        <Button onClick={convertToCsv} disabled={!xmlInput} className="w-full sm:w-auto">
          Convert to CSV
        </Button>
      </section>

      {/* CSV Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">CSV Output</Label>
          {csvOutput && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(csvOutput, "csv")} className="h-8">
                {copied === "csv" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-1">Copy</span>
              </Button>
              <Button variant="outline" size="sm" onClick={downloadCsv} className="h-8">
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
            {csvOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96">{csvOutput}</pre>
            ) : (
              <p className="text-sm text-muted-foreground">CSV output will appear here...</p>
            )}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About XML to CSV Conversion</h4>
            <p className="text-sm text-muted-foreground">
              Convert XML data to CSV format for use in spreadsheets and databases.
              Specify the row element name (e.g., "record", "item", "entry") and the converter
              will extract all child elements as columns. Values are properly escaped with
              quotes to handle special characters.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

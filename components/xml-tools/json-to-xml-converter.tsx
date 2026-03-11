"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function JsonToXmlConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [rootName, setRootName] = useState("root")

  const convertToXML = useCallback((json: string, root: string): string => {
    const obj = JSON.parse(json)
    return `<?xml version="1.0" encoding="UTF-8"?>\n${convertValueToXML(obj, root)}`
  }, [])

  const convertValueToXML = useCallback((value: any, tagName: string, indent = 0): string => {
    const indentStr = "  ".repeat(indent)

    if (value === null) {
      return `${indentStr}<${tagName} />`
    }

    if (typeof value === "boolean" || typeof value === "number") {
      return `${indentStr}<${tagName}>${value}</${tagName}>`
    }

    if (typeof value === "string") {
      const escaped = value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
      return `${indentStr}<${tagName}>${escaped}</${tagName}>`
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return `${indentStr}<${tagName} />`
      }
      const items = value.map((item, index) => 
        convertValueToXML(item, tagName.endsWith("s") ? tagName.slice(0, -1) : tagName.slice(0, -1) || "item", indent + 1)
      ).join("\n")
      return items
    }

    if (typeof value === "object") {
      const keys = Object.keys(value)
      if (keys.length === 0) {
        return `${indentStr}<${tagName} />`
      }

      let result = `${indentStr}<${tagName}>\n`
      result += keys.map((key) => {
        const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "_")
        return convertValueToXML(value[key], safeKey, indent + 1)
      }).join("\n")
      result += `\n${indentStr}</${tagName}>`
      return result
    }

    return `${indentStr}<${tagName}>${String(value)}</${tagName}>`
  }, [])

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const xml = convertToXML(input, rootName)
      setOutput(xml)
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`)
      setOutput("")
    }
  }, [input, rootName, convertToXML])

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
    setError("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "converted.xml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handlePrettifyJSON = useCallback(() => {
    try {
      const parsed = JSON.parse(input)
      setInput(JSON.stringify(parsed, null, 2))
      setError("")
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`)
    }
  }, [input])

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">JSON to XML Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert JSON data to XML format instantly
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">JSON Input</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrettifyJSON} disabled={!input}>
                Prettify
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear} title="Clear">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here...

{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}'
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="rootName" className="text-sm">Root element:</Label>
              <input
                id="rootName"
                type="text"
                value={rootName}
                onChange={(e) => setRootName(e.target.value)}
                className="px-2 py-1 border rounded text-sm w-32"
                placeholder="root"
              />
            </div>
            <Button onClick={handleConvert} className="flex-1">
              Convert to XML
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">XML Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="XML output will appear here..."
            className="min-h-[500px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

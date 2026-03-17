"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Info, Download } from "lucide-react"

export default function XmlSchemaXsdGenerator() {
  const [xmlInput, setXmlInput] = useState<string(`<person>
  <name>John Doe</name>
  <age>30</age>
  <email>john@example.com</email>
  <address>
    <street>123 Main St</street>
    <city>New York</city>
    <zip>10001</zip>
  </address>
</person>`)}
  const [xsdOutput, setXsdOutput] = useState<string>("")
  const [rootName, setRootName] = useState<string>("root")
  const [targetNamespace, setTargetNamespace] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const inferType = (value: string): string => {
    if (/^\d+$/.test(value)) return "xs:integer"
    if (/^\d+\.\d+$/.test(value)) return "xs:decimal"
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return "xs:date"
    if (/^\d{2}:\d{2}:\d{2}$/.test(value)) return "xs:time"
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) return "xs:dateTime"
    if (/^[true|false]$/i.test(value)) return "xs:boolean"
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return "xs:string"
    return "xs:string"
  }

  const generateXsd = useCallback(() => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(xmlInput, "text/xml")

      const parseError = doc.querySelector("parsererror")
      if (parseError) {
        throw new Error(parseError.textContent || "Invalid XML")
      }

      const root = doc.documentElement
      const actualRootName = rootName || root.tagName

      const generateComplexType = (element: Element, indent: number = 2): string => {
        const spaces = " ".repeat(indent)
        let xsd = `${spaces}<xs:complexType>\n`
        xsd += `${spaces}  <xs:sequence>\n`

        const children = Array.from(element.children)
        children.forEach((child) => {
          const hasChildren = child.children.length > 0
          const type = hasChildren ? null : inferType(child.textContent?.trim() || "")

          xsd += `${spaces}    <xs:element name="${child.tagName}"`
          
          if (hasChildren) {
            xsd += ">\n"
            xsd += generateComplexType(child, indent + 6)
            xsd += `${spaces}    </xs:element>\n`
          } else {
            xsd += ` type="${type}"/>\n`
          }
        })

        xsd += `${spaces}  </xs:sequence>\n`
        xsd += `${spaces}</xs:complexType>`

        return xsd
      }

      let xsd = `<?xml version="1.0" encoding="UTF-8"?>\n`
      xsd += `<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"`
      
      if (targetNamespace) {
        xsd += `\n  targetNamespace="${targetNamespace}"\n  elementFormDefault="qualified"`
      }
      
      xsd += ">\n\n"

      xsd += `  <!-- Root element -->\n`
      xsd += `  <xs:element name="${actualRootName}">\n`
      xsd += generateComplexType(root, 4)
      xsd += `\n  </xs:element>\n\n`

      xsd += `</xs:schema>`

      setXsdOutput(xsd)
    } catch (err) {
      setXsdOutput(`Error: ${err instanceof Error ? err.message : "Schema generation failed"}`)
    }
  }, [xmlInput, rootName, targetNamespace])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadXsd = useCallback(() => {
    if (!xsdOutput) return
    const blob = new Blob([xsdOutput], { type: "text/xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "schema.xsd"
    link.click()
    URL.revokeObjectURL(url)
  }, [xsdOutput])

  const handleClear = useCallback(() => {
    setXmlInput("")
    setXsdOutput("")
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
          className="font-mono text-sm min-h-[250px]"
          placeholder="Paste your XML here..."
        />
      </section>

      {/* Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="root-name">Root Element Name</Label>
            <Input
              id="root-name"
              value={rootName}
              onChange={(e) => setRootName(e.target.value)}
              placeholder="root"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="namespace">Target Namespace (optional)</Label>
            <Input
              id="namespace"
              value={targetNamespace}
              onChange={(e) => setTargetNamespace(e.target.value)}
              placeholder="http://example.com/schema"
            />
          </div>
        </div>

        <Button onClick={generateXsd} disabled={!xmlInput} className="w-full sm:w-auto">
          Generate XSD Schema
        </Button>
      </section>

      {/* XSD Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">XSD Schema</Label>
          {xsdOutput && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(xsdOutput, "xsd")} className="h-8">
                {copied === "xsd" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-1">Copy</span>
              </Button>
              <Button variant="outline" size="sm" onClick={downloadXsd} className="h-8">
                <Download className="size-4 mr-1" />
                Download
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 min-h-[200px]">
          {xsdOutput ? (
            <pre className="font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96">{xsdOutput}</pre>
          ) : (
            <p className="text-sm text-muted-foreground">XSD schema will appear here...</p>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About XSD Schema</h4>
            <p className="text-sm text-muted-foreground">
              XML Schema Definition (XSD) defines the structure and data types of an XML document.
              This tool automatically generates an XSD schema by analyzing your XML structure and
              inferring data types from element values. Use the schema to validate XML documents
              and ensure data consistency.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function YamlToXmlConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [rootElement, setRootElement] = useState("root")
  const [prettyPrint, setPrettyPrint] = useState(true)
  const [includeDeclaration, setIncludeDeclaration] = useState(true)

  const parseYaml = useCallback((yaml: string): any => {
    const lines = yaml.split('\n')
    const result: any = {}
    const stack: { obj: any; key: string; indent: number }[] = [{ obj: result, key: '', indent: -1 }]

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const indent = line.search(/\S/)

      // Pop stack until we find the right parent
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop()
      }

      if (trimmed.startsWith('-')) {
        // List item
        const content = trimmed.substring(1).trim()
        const parent = stack[stack.length - 1]
        
        if (!Array.isArray(parent.obj[parent.key])) {
          parent.obj[parent.key] = []
        }
        
        if (content.includes(':')) {
          const [key, ...valParts] = content.split(':')
          const value = valParts.join(':').trim()
          const item: any = {}
          item[key.trim()] = parseValue(value)
          parent.obj[parent.key].push(item)
          stack.push({ obj: item, key: key.trim(), indent })
        } else {
          parent.obj[parent.key].push(parseValue(content))
        }
        continue
      }

      if (trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':')
        const key = trimmed.substring(0, colonIndex).trim()
        const value = trimmed.substring(colonIndex + 1).trim()

        const parent = stack[stack.length - 1]

        if (value) {
          parent.obj[key] = parseValue(value)
        } else {
          parent.obj[key] = {}
          stack.push({ obj: parent.obj, key, indent })
        }
      }
    }

    return result
  }, [])

  const parseValue = (value: string): any => {
    if (value === 'null' || value === '~') return null
    if (value === 'true' || value === 'True' || value === 'TRUE') return true
    if (value === 'false' || value === 'False' || value === 'FALSE') return false
    if (/^-?\d+$/.test(value)) return parseInt(value, 10)
    if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value)
    
    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      return value.slice(1, -1)
    }
    
    return value
  }

  const escapeXml = useCallback((str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }, [])

  const objectToXml = useCallback((obj: any, tagName: string, indent: number): string => {
    const indentStr = prettyPrint ? '  '.repeat(indent) : ''
    const newline = prettyPrint ? '\n' : ''

    if (obj === null || obj === undefined) {
      return `${indentStr}<${tagName}/> ${newline}`
    }

    if (typeof obj !== 'object') {
      return `${indentStr}<${tagName}>${escapeXml(String(obj))}</${tagName}>${newline}`
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => objectToXml(item, tagName, indent)).join('')
    }

    let result = `${indentStr}<${tagName}>${newline}`
    
    Object.entries(obj).forEach(([key, value]) => {
      result += objectToXml(value, key, indent + 1)
    })
    
    result += `${indentStr}</${tagName}>${newline}`
    return result
  }, [prettyPrint, escapeXml])

  const convertToXml = useCallback((yaml: string): string => {
    try {
      const parsed = parseYaml(yaml)
      let xml = ''

      if (includeDeclaration) {
        xml += '<?xml version="1.0" encoding="UTF-8"?>\n'
      }

      xml += objectToXml(parsed, rootElement, 0)
      return xml.trim()
    } catch (e) {
      return `<!-- Error converting: ${e instanceof Error ? e.message : 'Unknown error'} -->`
    }
  }, [parseYaml, objectToXml, rootElement, includeDeclaration])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const xml = convertToXml(input)
    setOutput(xml)
  }, [input, convertToXml])

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
      const blob = new Blob([output], { type: "text/xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "converted.xml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`person:
  name: John Doe
  age: 30
  email: john@example.com
  address:
    street: 123 Main St
    city: New York`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML to XML Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML documents to XML format
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Root Element:</Label>
          <input
            type="text"
            value={rootElement}
            onChange={(e) => setRootElement(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-32"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={prettyPrint}
            onChange={(e) => setPrettyPrint(e.target.checked)}
            className="rounded border-gray-300"
          />
          Pretty Print
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeDeclaration}
            onChange={(e) => setIncludeDeclaration(e.target.checked)}
            className="rounded border-gray-300"
          />
          Include XML Declaration
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">YAML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML here...

person:
  name: John
  age: 30"
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <ArrowRight className="h-4 w-4 mr-2" />
              Convert to XML
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
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

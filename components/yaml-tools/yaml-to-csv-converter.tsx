"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function YamlToCsvConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [delimiter, setDelimiter] = useState(",")
  const [includeHeader, setIncludeHeader] = useState(true)

  const parseYamlToList = useCallback((yaml: string): Array<Record<string, string>> => {
    const lines = yaml.split('\n')
    const items: Array<Record<string, string>> = []
    let currentItem: Record<string, string> = {}
    let currentKey = ""

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const indent = line.search(/\S/)

      // New list item
      if (trimmed.startsWith('- ')) {
        if (Object.keys(currentItem).length > 0) {
          items.push(currentItem)
        }
        currentItem = {}
        
        const content = trimmed.substring(2)
        if (content.includes(':')) {
          const [key, ...valParts] = content.split(':')
          currentItem[key.trim()] = valParts.join(':').trim()
          currentKey = key.trim()
        }
      } else if (trimmed.includes(':')) {
        const [key, ...valParts] = trimmed.split(':')
        const value = valParts.join(':').trim()
        currentItem[key.trim()] = value
        currentKey = key.trim()
      } else if (indent > 0 && currentKey) {
        // Continuation of previous value
        currentItem[currentKey] += ' ' + trimmed
      }
    }

    if (Object.keys(currentItem).length > 0) {
      items.push(currentItem)
    }

    return items
  }, [])

  const convertToCsv = useCallback((yaml: string): string => {
    const items = parseYamlToList(yaml)
    
    if (items.length === 0) {
      return "# No valid YAML data to convert"
    }

    // Get all unique keys
    const allKeys = Array.from(new Set(items.flatMap(item => Object.keys(item))))
    
    if (allKeys.length === 0) {
      return "# No keys found in YAML data"
    }

    const csvLines: string[] = []

    // Header row
    if (includeHeader) {
      csvLines.push(allKeys.map(k => `"${k}"`).join(delimiter))
    }

    // Data rows
    items.forEach(item => {
      const row = allKeys.map(key => {
        let value = item[key] || ''
        // Escape quotes and wrap in quotes if contains delimiter or quotes
        if (value.includes(delimiter) || value.includes('"') || value.includes('\n')) {
          value = '"' + value.replace(/"/g, '""') + '"'
        }
        return value
      })
      csvLines.push(row.join(delimiter))
    })

    return csvLines.join('\n')
  }, [parseYamlToList, delimiter, includeHeader])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const csv = convertToCsv(input)
    setOutput(csv)
  }, [input, convertToCsv])

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
      const blob = new Blob([output], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "converted.csv"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`- name: John Doe
  age: 30
  city: New York
  country: USA
- name: Jane Smith
  age: 25
  city: London
  country: UK
- name: Bob Johnson
  age: 35
  city: Paris
  country: France`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML to CSV Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML list data to CSV format
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeHeader}
            onChange={(e) => setIncludeHeader(e.target.checked)}
            className="rounded border-gray-300"
          />
          Include Header Row
        </label>

        <div className="flex items-center gap-2">
          <Label>Delimiter:</Label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="|">Pipe (|)</option>
            <option value="	">Tab</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">YAML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML list here...

- name: John
  age: 30
- name: Jane
  age: 25"
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <ArrowRight className="h-4 w-4 mr-2" />
              Convert to CSV
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">CSV Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="CSV output will appear here..."
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

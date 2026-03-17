"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Table } from "lucide-react"

export function YamlToHtmlTable() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [includeStyles, setIncludeStyles] = useState(true)
  const [responsive, setResponsive] = useState(true)
  const [striped, setStriped] = useState(true)

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
        } else {
          currentItem['value'] = parseValue(content)
        }
      } else if (trimmed.includes(':')) {
        const [key, ...valParts] = trimmed.split(':')
        const value = valParts.join(':').trim()
        currentItem[key.trim()] = parseValue(value)
        currentKey = key.trim()
      }
    }

    if (Object.keys(currentItem).length > 0) {
      items.push(currentItem)
    }

    return items
  }, [])

  const parseValue = (value: string): string => {
    if (value === 'null' || value === '~') return ''
    if (value === 'true' || value === 'True' || value === 'TRUE') return 'true'
    if (value === 'false' || value === 'False' || value === 'FALSE') return 'false'
    
    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      return value.slice(1, -1)
    }
    
    return value
  }

  const escapeHtml = useCallback((str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }, [])

  const convertToHtml = useCallback((yaml: string): string => {
    const items = parseYamlToList(yaml)
    
    if (items.length === 0) {
      return "<!-- No valid YAML data to convert -->"
    }

    // Get all unique keys
    const allKeys = Array.from(new Set(items.flatMap(item => Object.keys(item))))
    
    if (allKeys.length === 0) {
      return "<!-- No keys found in YAML data -->"
    }

    const styles = includeStyles ? `
<style>
  .yaml-table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
    font-family: Arial, sans-serif;
  }
  .yaml-table th,
  .yaml-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  .yaml-table th {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
  }
  ${striped ? '.yaml-table tr:nth-child(even) { background-color: #f2f2f2; }' : ''}
  .yaml-table tr:hover { background-color: #ddd; }
  ${responsive ? `
  @media screen and (max-width: 600px) {
    .yaml-table {
      display: block;
      overflow-x: auto;
    }
  }` : ''}
</style>` : ''

    let html = `${styles}
<table class="yaml-table">
  <thead>
    <tr>`
    
    allKeys.forEach(key => {
      html += `
      <th>${escapeHtml(key)}</th>`
    })
    
    html += `
    </tr>
  </thead>
  <tbody>`
    
    items.forEach(item => {
      html += `
    <tr>`
      allKeys.forEach(key => {
        const value = item[key] || ''
        html += `
      <td>${escapeHtml(value)}</td>`
      })
      html += `
    </tr>`
    })
    
    html += `
  </tbody>
</table>`

    return html.trim()
  }, [parseYamlToList, includeStyles, responsive, striped, escapeHtml])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const html = convertToHtml(input)
    setOutput(html)
  }, [input, convertToHtml])

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
      a.download = "table.html"
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
            <h2 className="text-2xl font-semibold tracking-tight">YAML to HTML Table</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML list data to HTML table format
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
            checked={includeStyles}
            onChange={(e) => setIncludeStyles(e.target.checked)}
            className="rounded border-gray-300"
          />
          Include CSS Styles
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={responsive}
            onChange={(e) => setResponsive(e.target.checked)}
            className="rounded border-gray-300"
          />
          Responsive Design
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={striped}
            onChange={(e) => setStriped(e.target.checked)}
            className="rounded border-gray-300"
          />
          Striped Rows
        </label>
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
              <Table className="h-4 w-4 mr-2" />
              Convert to HTML
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">HTML Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="HTML table will appear here..."
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

      {output && (
        <div className="p-4 bg-muted rounded-lg space-y-2">
          <h3 className="font-medium">Preview</h3>
          <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      )}
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Table } from "lucide-react"

export function YamlToMarkdownTable() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [includeHeaders, setIncludeHeaders] = useState(true)

  const parseYamlToArray = useCallback((yaml: string): Array<Record<string, string>> => {
    const lines = yaml.split('\n')
    const items: Array<Record<string, string>> = []
    let currentItem: Record<string, string> = {}
    let currentKey = ""

    for (const line of lines) {
      const trimmed = line.trim()
      
      if (!trimmed || trimmed.startsWith('#')) continue

      const indent = line.search(/\S/)

      // New top-level item (list item or new object)
      if (indent === 0) {
        if (Object.keys(currentItem).length > 0) {
          items.push(currentItem)
        }
        currentItem = {}
      }

      if (trimmed.startsWith('- ')) {
        // List item with value
        const content = trimmed.substring(2)
        if (content.includes(':')) {
          const [key, ...valParts] = content.split(':')
          currentItem[key.trim()] = valParts.join(':').trim()
          currentKey = key.trim()
        } else {
          currentItem[currentKey || 'value'] = content
        }
      } else if (trimmed.includes(':')) {
        const [key, ...valParts] = trimmed.split(':')
        const value = valParts.join(':').trim()
        currentItem[key.trim()] = value
        currentKey = key.trim()
      }
    }

    if (Object.keys(currentItem).length > 0) {
      items.push(currentItem)
    }

    return items
  }, [])

  const convertToMarkdownTable = useCallback((yaml: string, headers: boolean): string => {
    const items = parseYamlToArray(yaml)
    
    if (items.length === 0) {
      return "No valid YAML data to convert"
    }

    // Get all unique keys
    const allKeys = Array.from(new Set(items.flatMap(item => Object.keys(item))))
    
    if (allKeys.length === 0) {
      return "No keys found in YAML data"
    }

    let table = ""

    // Header row
    if (headers) {
      table += `| ${allKeys.join(' | ')} |\n`
      table += `| ${allKeys.map(() => '---').join(' | ')} |\n`
    }

    // Data rows
    items.forEach(item => {
      const row = allKeys.map(key => {
        const value = item[key] || ''
        // Escape pipe characters
        return value.replace(/\|/g, '\\|')
      })
      table += `| ${row.join(' | ')} |\n`
    })

    return table.trim()
  }, [parseYamlToArray])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const markdown = convertToMarkdownTable(input, includeHeaders)
    setOutput(markdown)
  }, [input, includeHeaders, convertToMarkdownTable])

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
      const blob = new Blob([output], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "table.md"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`- name: John Doe
  age: 30
  city: New York
- name: Jane Smith
  age: 25
  city: Los Angeles
- name: Bob Johnson
  age: 35
  city: Chicago`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML to Markdown Table</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML data to Markdown table format
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeHeaders}
            onChange={(e) => setIncludeHeaders(e.target.checked)}
            className="rounded border-gray-300"
          />
          Include Header Row
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">YAML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML list here..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <Table className="h-4 w-4 mr-2" />
              Convert to Table
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Markdown Table</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Markdown table will appear here..."
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
          <div className="overflow-x-auto">
            <div dangerouslySetInnerHTML={{ 
              __html: output.replace(/\n/g, '<br/>').replace(/\|/g, '')
            }} />
          </div>
        </div>
      )}
    </div>
  )
}

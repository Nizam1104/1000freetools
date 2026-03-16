"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function TomlToJsonConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [prettify, setPrettify] = useState(true)

  const parseTOML = useCallback((toml: string): any => {
    const result: any = {}
    let currentSection = result
    let currentSectionPath: string[] = []

    const lines = toml.split('\n')

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim()

      // Skip empty lines and comments
      if (!line || line.startsWith('#')) continue

      // Handle section headers [section] or [[array_of_tables]]
      const arrayTableMatch = line.match(/^\[\[([^\]]+)\]\]$/)
      const tableMatch = line.match(/^\[([^\]]+)\]$/)

      if (arrayTableMatch) {
        const sectionPath = arrayTableMatch[1].split('.')
        currentSectionPath = sectionPath

        // Navigate to parent and create/find array
        let parent = result
        for (let j = 0; j < sectionPath.length - 1; j++) {
          if (!parent[sectionPath[j]]) {
            parent[sectionPath[j]] = {}
          }
          parent = parent[sectionPath[j]]
        }

        const sectionName = sectionPath[sectionPath.length - 1]
        if (!parent[sectionName]) {
          parent[sectionName] = []
        }
        const newObj: any = {}
        parent[sectionName].push(newObj)
        currentSection = newObj
        continue
      }

      if (tableMatch) {
        const sectionPath = tableMatch[1].split('.')
        currentSectionPath = sectionPath

        // Navigate to or create the section
        currentSection = result
        for (const section of sectionPath) {
          if (!currentSection[section]) {
            currentSection[section] = {}
          }
          currentSection = currentSection[section]
        }
        continue
      }

      // Handle key-value pairs
      const kvMatch = line.match(/^([^=]+)=(.*)$/)
      if (kvMatch) {
        let key = kvMatch[1].trim()
        let value = kvMatch[2].trim()

        // Handle dotted keys (a.b.c = value)
        const keyParts = key.split('.')

        // Parse the value
        const parsedValue = parseTOMLValue(value)

        // Navigate to the correct location
        let target = currentSection
        for (let j = 0; j < keyParts.length - 1; j++) {
          if (!target[keyParts[j]]) {
            target[keyParts[j]] = {}
          }
          target = target[keyParts[j]]
        }

        target[keyParts[keyParts.length - 1]] = parsedValue
      }
    }

    return result
  }, [])

  const parseTOMLValue = (value: string): any => {
    // String (basic)
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, -1).replace(/\\"/g, '"')
    }

    // String (literal)
    if (value.startsWith("'") && value.endsWith("'")) {
      return value.slice(1, -1)
    }

    // Boolean
    if (value === 'true') return true
    if (value === 'false') return false

    // Null
    if (value === 'null') return null

    // Array
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1).trim()
      if (!arrayContent) return []
      
      // Simple array parsing
      const items: any[] = []
      let current = ''
      let inString = false
      let stringChar = ''
      let depth = 0

      for (let i = 0; i < arrayContent.length; i++) {
        const char = arrayContent[i]
        
        if (!inString && (char === '"' || char === "'")) {
          inString = true
          stringChar = char
        } else if (inString && char === stringChar && arrayContent[i - 1] !== '\\') {
          inString = false
        } else if (!inString && char === '[') {
          depth++
        } else if (!inString && char === ']') {
          depth--
        } else if (!inString && depth === 0 && char === ',') {
          items.push(parseTOMLValue(current.trim()))
          current = ''
          continue
        }
        
        current += char
      }
      
      if (current.trim()) {
        items.push(parseTOMLValue(current.trim()))
      }
      
      return items
    }

    // Inline table
    if (value.startsWith('{') && value.endsWith('}')) {
      const tableContent = value.slice(1, -1).trim()
      if (!tableContent) return {}
      
      const table: any = {}
      const pairs = splitInlineTable(tableContent)
      
      for (const pair of pairs) {
        const eqIndex = pair.indexOf('=')
        if (eqIndex > 0) {
          const k = pair.substring(0, eqIndex).trim()
          const v = pair.substring(eqIndex + 1).trim()
          table[k] = parseTOMLValue(v)
        }
      }
      
      return table
    }

    // Number (integer)
    if (/^-?\d+$/.test(value)) {
      return parseInt(value, 10)
    }

    // Number (float)
    if (/^-?\d+\.\d+$/.test(value)) {
      return parseFloat(value)
    }

    // Number with underscores (e.g., 1_000_000)
    if (/^-?[\d_]+$/.test(value)) {
      return parseInt(value.replace(/_/g, ''), 10)
    }

    // Date/Time (basic handling)
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
      return value
    }

    // Default: return as string
    return value
  }

  const splitInlineTable = (content: string): string[] => {
    const pairs: string[] = []
    let current = ''
    let depth = 0
    let inString = false
    let stringChar = ''

    for (let i = 0; i < content.length; i++) {
      const char = content[i]

      if (!inString && (char === '"' || char === "'")) {
        inString = true
        stringChar = char
      } else if (inString && char === stringChar && content[i - 1] !== '\\') {
        inString = false
      } else if (!inString && (char === '[' || char === '{')) {
        depth++
      } else if (!inString && (char === ']' || char === '}')) {
        depth--
      } else if (!inString && depth === 0 && char === ',') {
        pairs.push(current.trim())
        current = ''
        continue
      }

      current += char
    }

    if (current.trim()) {
      pairs.push(current.trim())
    }

    return pairs
  }

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const parsed = parseTOML(input)
      const json = prettify ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed)
      setOutput(json)
    } catch (e) {
      setError(`Conversion error: ${e instanceof Error ? e.message : "Unknown error"}`)
      setOutput("")
    }
  }, [input, prettify, parseTOML])

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
      const blob = new Blob([output], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "converted.json"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`# This is a TOML document
title = "TOML Example"

[owner]
name = "John Doe"
age = 30
email = "john@example.com"

[database]
server = "192.168.1.1"
ports = [8000, 8001, 8002]
enabled = true

[servers.alpha]
ip = "10.0.0.1"
role = "frontend"

[servers.beta]
ip = "10.0.0.2"
role = "backend"`)
    setError("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">TOML to JSON Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert TOML configuration to JSON format
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">TOML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your TOML here...

# Example TOML
title = &quot;Example&quot;

[section]
key = &quot;value&quot;
number = 42"
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={prettify}
                onChange={(e) => setPrettify(e.target.checked)}
                className="rounded border-gray-300"
              />
              Prettify JSON output
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              Convert to JSON
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">JSON Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="JSON output will appear here..."
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

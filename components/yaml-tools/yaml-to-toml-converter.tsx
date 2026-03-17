"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function YamlToTomlConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

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

  const formatTomlValue = (value: any): string => {
    if (value === null || value === undefined) {
      return '""'
    }
    
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false'
    }
    
    if (typeof value === 'number') {
      return String(value)
    }
    
    if (Array.isArray(value)) {
      if (value.length === 0) return '[]'
      const items = value.map(formatTomlValue).join(', ')
      return `[${items}]`
    }
    
    // String - escape special characters
    const escaped = String(value)
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t')
    return `"${escaped}"`
  }

  const objectToToml = useCallback((obj: any, prefix: string = ''): string => {
    const lines: string[] = []
    const simpleEntries: Array<[string, any]> = []
    const nestedEntries: Array<[string, any]> = []

    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        nestedEntries.push([key, value])
      } else {
        simpleEntries.push([key, value])
      }
    })

    // Write simple key-value pairs
    simpleEntries.forEach(([key, value]) => {
      lines.push(`${key} = ${formatTomlValue(value)}`)
    })

    // Write nested objects as sections
    nestedEntries.forEach(([key, value]) => {
      if (lines.length > 0) {
        lines.push('')
      }
      
      const sectionName = prefix ? `${prefix}.${key}` : key
      lines.push(`[${sectionName}]`)
      lines.push(objectToToml(value as any, sectionName))
    })

    return lines.join('\n')
  }, [])

  const convertToToml = useCallback((yaml: string): string => {
    try {
      const parsed = parseYaml(yaml)
      return objectToToml(parsed)
    } catch (e) {
      return `# Error converting: ${e instanceof Error ? e.message : 'Unknown error'}`
    }
  }, [parseYaml, objectToToml])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const toml = convertToToml(input)
    setOutput(toml)
  }, [input, convertToToml])

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
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "converted.toml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`database:
  host: localhost
  port: 5432
  enabled: true
  
application:
  name: MyApp
  version: 1.0.0
  tags:
    - web
    - api`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML to TOML Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML configuration to TOML format
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">YAML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML here...

database:
  host: localhost
  port: 5432"
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <ArrowRight className="h-4 w-4 mr-2" />
              Convert to TOML
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">TOML Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="TOML output will appear here..."
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

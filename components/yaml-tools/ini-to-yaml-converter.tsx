"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function IniToYamlConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const parseIni = useCallback((ini: string): Record<string, Record<string, string>> => {
    const result: Record<string, Record<string, string>> = {}
    let currentSection = 'default'
    result[currentSection] = {}

    const lines = ini.split('\n')

    for (const line of lines) {
      const trimmed = line.trim()
      
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith(';')) continue

      // Section header
      const sectionMatch = trimmed.match(/^\[(.+)\]$/)
      if (sectionMatch) {
        currentSection = sectionMatch[1]
        if (!result[currentSection]) {
          result[currentSection] = {}
        }
        continue
      }

      // Key-value pair
      const separatorIndex = Math.min(
        trimmed.indexOf('=') === -1 ? Infinity : trimmed.indexOf('='),
        trimmed.indexOf(':') === -1 ? Infinity : trimmed.indexOf(':')
      )

      if (separatorIndex !== Infinity) {
        const key = trimmed.substring(0, separatorIndex).trim()
        const value = trimmed.substring(separatorIndex + 1).trim()
        result[currentSection][key] = value
      }
    }

    return result
  }, [])

  const convertToYaml = useCallback((ini: string): string => {
    const parsed = parseIni(ini)
    const yamlLines: string[] = []

    const sections = Object.entries(parsed)

    if (sections.length === 1 && sections[0][0] === 'default' && Object.keys(sections[0][1]).length > 0) {
      // Single section - flatten
      Object.entries(sections[0][1]).forEach(([key, value]) => {
        yamlLines.push(`${key}: ${formatValue(value)}`)
      })
    } else {
      // Multiple sections - nested
      sections.forEach(([section, values]) => {
        if (Object.keys(values).length > 0) {
          yamlLines.push(`${section}:`)
          Object.entries(values).forEach(([key, value]) => {
            yamlLines.push(`  ${key}: ${formatValue(value)}`)
          })
        }
      })
    }

    return yamlLines.join('\n')
  }, [parseIni])

  const formatValue = (value: string): string => {
    // Check for boolean
    if (value.toLowerCase() === 'true') return 'true'
    if (value.toLowerCase() === 'false') return 'false'
    
    // Check for number
    if (/^-?\d+$/.test(value)) return value
    if (/^-?\d*\.\d+$/.test(value)) return value

    // Check for null
    if (value.toLowerCase() === 'null' || value === '') return 'null'

    // String - quote if contains special characters
    if (value.includes(':') || value.includes('#') || value.includes('[') || value.includes(']') || 
        value.includes('{') || value.includes('}') || value.includes(',') || value.includes('&') ||
        value.includes('*') || value.includes('!') || value.includes('|') || value.includes('>') ||
        value.includes("'") || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '\\"')}"`
    }

    return value
  }

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const yaml = convertToYaml(input)
    setOutput(yaml)
  }, [input, convertToYaml])

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
      const blob = new Blob([output], { type: "text/yaml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "converted.yaml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`# Database configuration
[database]
host = localhost
port = 5432
name = mydb
enabled = true

[application]
name = MyApp
version = 1.0.0
debug = false`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">INI to YAML Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert INI configuration files to YAML format
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">INI Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your INI content here...

[database]
host = localhost
port = 5432"
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <ArrowRight className="h-4 w-4 mr-2" />
              Convert to YAML
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">YAML Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="YAML output will appear here..."
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

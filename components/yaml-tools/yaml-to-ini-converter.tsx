"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function YamlToIniConverter() {
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

      if (trimmed.startsWith('-')) {
        // Handle list items
        const value = trimmed.substring(1).trim()
        const parent = stack[stack.length - 1]
        if (Array.isArray(parent.obj[parent.key])) {
          parent.obj[parent.key].push(parseValue(value))
        }
        continue
      }

      if (trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':')
        const key = trimmed.substring(0, colonIndex).trim()
        const value = trimmed.substring(colonIndex + 1).trim()

        // Pop stack until we find the right parent
        while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
          stack.pop()
        }

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

  const convertToIni = useCallback((yaml: string): string => {
    try {
      const parsed = parseYaml(yaml)
      const iniLines: string[] = []

      const processObject = (obj: any, section: string = '') => {
        const entries = Object.entries(obj)
        const simpleEntries: Array<[string, any]> = []
        const nestedEntries: Array<[string, any]> = []

        entries.forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            nestedEntries.push([key, value])
          } else {
            simpleEntries.push([key, value])
          }
        })

        // Write simple key-value pairs
        if (simpleEntries.length > 0) {
          if (section) {
            iniLines.push(`[${section}]`)
          }
          simpleEntries.forEach(([key, value]) => {
            if (typeof value === 'boolean') {
              iniLines.push(`${key} = ${value ? 'true' : 'false'}`)
            } else if (value === null) {
              iniLines.push(`${key} = `)
            } else {
              iniLines.push(`${key} = ${value}`)
            }
          })
          if (nestedEntries.length > 0) {
            iniLines.push('')
          }
        }

        // Process nested objects
        nestedEntries.forEach(([key, value]) => {
          const newSection = section ? `${section}.${key}` : key
          processObject(value, newSection)
        })
      }

      processObject(parsed)
      return iniLines.join('\n')
    } catch (e) {
      return `# Error converting: ${e instanceof Error ? e.message : 'Unknown error'}`
    }
  }, [parseYaml])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const ini = convertToIni(input)
    setOutput(ini)
  }, [input, convertToIni])

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
      a.download = "converted.ini"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`database:
  host: localhost
  port: 5432
  name: mydb

application:
  name: MyApp
  version: 1.0.0
  debug: true`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML to INI Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML configuration to INI format
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
              Convert to INI
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">INI Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="INI output will appear here..."
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

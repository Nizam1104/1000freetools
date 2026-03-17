"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Code2 } from "lucide-react"

export function YamlToPythonDict() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [useSingleQuotes, setUseSingleQuotes] = useState(false)
  const [indentSize, setIndentSize] = useState(4)

  const parseYamlValue = useCallback((value: string): string => {
    if (value === 'null' || value === '~') return 'None'
    if (value === 'true' || value === 'True' || value === 'TRUE') return 'True'
    if (value === 'false' || value === 'False' || value === 'FALSE') return 'False'
    if (/^-?\d+$/.test(value)) return value
    if (/^-?\d*\.\d+$/.test(value)) return value
    
    // String value
    const quote = useSingleQuotes ? "'" : '"'
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/'/g, "\\'")
    return `${quote}${escaped}${quote}`
  }, [useSingleQuotes])

  const parseYamlToDict = useCallback((yaml: string, indent: number): string => {
    const lines = yaml.split('\n')
    const result: string[] = []
    const stack: { indent: number; isList: boolean }[] = []
    let currentIndent = -1

    const spaces = ' '.repeat(indentSize)

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const lineIndent = line.search(/\S/)

      // Handle list items
      if (trimmed.startsWith('- ')) {
        const content = trimmed.substring(2)
        const listIndent = ' '.repeat(lineIndent)
        
        if (content.includes(':')) {
          // List item with dict
          const [key, ...valParts] = content.split(':')
          const value = valParts.join(':').trim()
          
          if (value) {
            result.push(`${listIndent}{${parseYamlValue(key.trim())}: ${parseYamlValue(value)}},`)
          } else {
            result.push(`${listIndent}{`)
            stack.push({ indent: lineIndent, isList: true })
          }
        } else {
          result.push(`${listIndent}${parseYamlValue(content)},`)
        }
        continue
      }

      // Handle key-value pairs
      if (trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':')
        const key = trimmed.substring(0, colonIndex).trim()
        const value = trimmed.substring(colonIndex + 1).trim()

        const keyIndent = ' '.repeat(lineIndent)

        if (value) {
          result.push(`${keyIndent}${parseYamlValue(key)}: ${parseYamlValue(value)},`)
        } else {
          result.push(`${keyIndent}${parseYamlValue(key)}: {`)
          stack.push({ indent: lineIndent, isList: false })
        }
      }
    }

    // Close all open structures
    while (stack.length > 0) {
      const item = stack.pop()
      const closeIndent = ' '.repeat(item ? item.indent : 0)
      result.push(`${closeIndent}}`)
    }

    return result.join('\n')
  }, [parseYamlValue, indentSize])

  const convertToPythonDict = useCallback((yaml: string): string => {
    try {
      const dictStr = parseYamlToDict(yaml, indentSize)
      return `# Python Dictionary\nconfig = ${dictStr}`
    } catch (e) {
      return `# Error converting: ${e instanceof Error ? e.message : 'Unknown error'}`
    }
  }, [parseYamlToDict, indentSize])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const pythonDict = convertToPythonDict(input)
    setOutput(pythonDict)
  }, [input, convertToPythonDict])

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
      a.download = "config.py"
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
  debug: true
  version: 1.0.0`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML to Python Dict</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML to Python dictionary syntax
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
            checked={useSingleQuotes}
            onChange={(e) => setUseSingleQuotes(e.target.checked)}
            className="rounded border-gray-300"
          />
          Use Single Quotes
        </label>

        <div className="flex items-center gap-2">
          <Label>Indent:</Label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
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
            placeholder="Paste your YAML here...

database:
  host: localhost
  port: 5432"
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <Code2 className="h-4 w-4 mr-2" />
              Convert to Python
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Python Dictionary</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Python dict will appear here..."
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

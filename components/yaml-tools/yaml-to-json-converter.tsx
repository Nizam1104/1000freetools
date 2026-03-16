"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function YamlToJsonConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [prettify, setPrettify] = useState(true)

  const parseYAML = useCallback((yaml: string): any => {
    // Simple YAML parser for basic YAML structures
    const lines = yaml.split('\n')
    const result: any = {}
    const stack: { obj: any; indent: number }[] = [{ obj: result, indent: -1 }]
    let currentKey = ""
    let currentArray: any[] | null = null
    let arrayIndent = -1

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmed = line.trim()

      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) continue

      const indent = line.search(/\S/)

      // Handle list items
      if (trimmed.startsWith('-')) {
        const value = trimmed.substring(1).trim()
        
        if (currentArray === null || indent !== arrayIndent) {
          currentArray = []
          arrayIndent = indent
          if (stack[stack.length - 1].obj instanceof Object && currentKey) {
            stack[stack.length - 1].obj[currentKey] = currentArray
          }
        }

        if (value.includes(':')) {
          // List item is an object
          const [key, ...valParts] = value.split(':')
          const val = valParts.join(':').trim()
          const item: any = {}
          item[key.trim()] = val ? parseValue(val) : {}
          currentArray.push(item)
          
          // Push this object for potential nested content
          while (stack.length > 0 && stack[stack.length - 1].indent >= indent + 2) {
            stack.pop()
          }
          stack.push({ obj: item[key.trim()], indent: indent + 2 })
        } else {
          currentArray.push(parseValue(value))
        }
        continue
      }

      // Handle key-value pairs
      if (trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':')
        const key = trimmed.substring(0, colonIndex).trim()
        const value = trimmed.substring(colonIndex + 1).trim()

        currentKey = key
        currentArray = null

        if (value) {
          // Simple key-value pair
          setValueAtPath(result, stack, key, parseValue(value))
        } else {
          // Key with nested content
          if (getValueAtPath(result, stack, key) === undefined) {
            setValueAtPath(result, stack, key, {})
          }
          
          // Find or create the nested object
          let nestedObj = getValueAtPath(result, stack, key)
          if (nestedObj === undefined || nestedObj === null) {
            nestedObj = {}
            setValueAtPath(result, stack, key, nestedObj)
          }

          // Adjust stack based on indent
          while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
            stack.pop()
          }
          stack.push({ obj: nestedObj, indent })
        }
      }
    }

    return result
  }, [])

  const parseValue = (value: string): any => {
    if (value === 'null' || value === '~') return null
    if (value === 'true' || value === 'True' || value === 'TRUE') return true
    if (value === 'false' || value === 'False' || value === 'FALSE') return false
    
    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      return value.slice(1, -1)
    }

    // Check for numbers
    if (/^-?\d+$/.test(value)) return parseInt(value, 10)
    if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value)

    return value
  }

  const setValueAtPath = (obj: any, stack: any[], key: string, value: any) => {
    const current = stack[stack.length - 1].obj
    if (current instanceof Object && !(current instanceof Array)) {
      current[key] = value
    }
  }

  const getValueAtPath = (obj: any, stack: any[], key: string): any => {
    const current = stack[stack.length - 1].obj
    if (current instanceof Object && !(current instanceof Array)) {
      return current[key]
    }
    return undefined
  }

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const parsed = parseYAML(input)
      const json = prettify ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed)
      setOutput(json)
    } catch (e) {
      setError(`Conversion error: ${e instanceof Error ? e.message : "Unknown error"}`)
      setOutput("")
    }
  }, [input, prettify, parseYAML])

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
    setInput(`name: John Doe
age: 30
email: john@example.com
address:
  street: 123 Main St
  city: Anytown
  zip: 12345
hobbies:
  - reading
  - gaming
  - hiking
is_active: true`)
    setError("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML to JSON Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML data to JSON format instantly
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
          <Label htmlFor="input">YAML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML here...

name: John Doe
age: 30
hobbies:
  - reading
  - gaming"
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

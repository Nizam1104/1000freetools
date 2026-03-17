"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Code2 } from "lucide-react"

export function YamlToGoStruct() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [structName, setStructName] = useState("Config")
  const [addTags, setAddTags] = useState(true)
  const [pointerFields, setPointerFields] = useState(false)

  const toPascalCase = useCallback((str: string): string => {
    return str
      .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
      .replace(/^(\w)/, (c) => c.toUpperCase())
  }, [])

  const getGoType = useCallback((value: string): string => {
    if (value === 'true' || value === 'false') return 'bool'
    if (value === 'null' || value === '~') return 'interface{}'
    if (/^-?\d+$/.test(value)) return 'int'
    if (/^-?\d*\.\d+$/.test(value)) return 'float64'
    return 'string'
  }, [])

  const parseYamlToStruct = useCallback((yaml: string, options: { 
    structName: string; 
    addTags: boolean;
    pointerFields: boolean 
  }): string => {
    const lines = yaml.split('\n')
    const fields: Array<{ name: string; type: string; yamlKey: string }> = []
    const seenFields = new Set<string>()

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('-')) continue

      const indent = line.search(/\S/)
      if (indent !== 0) continue // Only top-level fields

      if (trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':')
        const key = trimmed.substring(0, colonIndex).trim()
        const value = trimmed.substring(colonIndex + 1).trim()

        if (seenFields.has(key)) continue
        seenFields.add(key)

        const fieldName = toPascalCase(key)
        let goType = getGoType(value)

        if (value === '' || value === '{}') {
          goType = 'interface{}'
        }

        if (options.pointerFields && goType !== 'interface{}') {
          goType = '*' + goType
        }

        fields.push({ name: fieldName, type: goType, yamlKey: key })
      }
    }

    if (fields.length === 0) {
      return "// No valid YAML fields found"
    }

    let result = `type ${options.structName} struct {\n`
    
    fields.forEach(field => {
      const tag = options.addTags ? ` \`yaml:"${field.yamlKey}" json:"${field.yamlKey}"\`` : ''
      result += `	${field.name} ${field.type}${tag}\n`
    })
    
    result += '}'

    return result
  }, [toPascalCase, getGoType])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const goStruct = parseYamlToStruct(input, { structName, addTags, pointerFields })
    setOutput(goStruct)
  }, [input, structName, addTags, pointerFields, parseYamlToStruct])

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
      a.download = "struct.go"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`name: John Doe
age: 30
email: john@example.com
is_active: true
balance: 100.50
metadata: {}`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML to Go Struct</h2>
            <p className="text-sm text-muted-foreground">
              Generate Go struct definitions from YAML
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Struct Name:</Label>
          <input
            type="text"
            value={structName}
            onChange={(e) => setStructName(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-32"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={addTags}
            onChange={(e) => setAddTags(e.target.checked)}
            className="rounded border-gray-300"
          />
          Add YAML/JSON Tags
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={pointerFields}
            onChange={(e) => setPointerFields(e.target.checked)}
            className="rounded border-gray-300"
          />
          Use Pointer Fields
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

name: John Doe
age: 30
email: john@example.com"
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <Code2 className="h-4 w-4 mr-2" />
              Generate Go Struct
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Go Struct</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Go struct will appear here..."
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

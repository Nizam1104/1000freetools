"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Edit3 } from "lucide-react"

export function YamlEditor() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [editMode, setEditMode] = useState<"format" | "flatten" | "expand">("format")
  const [indentSize, setIndentSize] = useState(2)

  const formatYaml = useCallback((yaml: string, indent: number): string => {
    const lines = yaml.split('\n')
    const result: string[] = []

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      const currentIndent = line.search(/\S/)
      const normalizedIndent = Math.floor(currentIndent / indent) * indent
      
      // Normalize spacing around colons
      let formatted = trimmed.replace(/\s*:\s*/g, ': ')
      formatted = formatted.replace(/:\s+/g, ': ')
      
      result.push(' '.repeat(normalizedIndent) + formatted)
    }

    return result.join('\n')
  }, [])

  const flattenYaml = useCallback((yaml: string): string => {
    const lines = yaml.split('\n')
    const result: string[] = []
    const path: string[] = []
    let lastIndent = -1

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const indent = line.search(/\S/)

      // Adjust path based on indent
      if (indent <= lastIndent && indent !== 0) {
        path.pop()
      } else if (indent > lastIndent && lastIndent !== -1) {
        // Going deeper, keep path
      }

      if (trimmed.includes(':')) {
        const [key, ...valParts] = trimmed.split(':')
        const value = valParts.join(':').trim()
        
        if (value) {
          // Simple key-value
          const fullPath = [...path, key.trim()].join('.')
          result.push(`${fullPath}: ${value}`)
        } else {
          // Parent key
          path.push(key.trim())
        }
      } else if (trimmed.startsWith('-')) {
        const value = trimmed.substring(1).trim()
        const fullPath = [...path].join('.')
        result.push(`-${fullPath}: ${value}`)
      }

      lastIndent = indent
    }

    return result.join('\n')
  }, [])

  const expandYaml = useCallback((yaml: string, indent: number): string => {
    // Simple expansion - ensure consistent indentation
    const lines = yaml.split('\n')
    const result: string[] = []

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) {
        result.push('')
        continue
      }

      const currentIndent = line.search(/\S/)
      const normalizedIndent = Math.floor(currentIndent / indent) * indent
      result.push(' '.repeat(normalizedIndent) + trimmed)
    }

    return result.join('\n')
  }, [])

  const handleProcess = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }

    switch (editMode) {
      case "format":
        setOutput(formatYaml(input, indentSize))
        break
      case "flatten":
        setOutput(flattenYaml(input))
        break
      case "expand":
        setOutput(expandYaml(input, indentSize))
        break
    }
  }, [input, editMode, indentSize, formatYaml, flattenYaml, expandYaml])

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
      a.download = "edited.yaml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`name:John Doe
address:
street:123 Main St
city:Anytown
hobbies:
-reading
-gaming`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML Editor</h2>
            <p className="text-sm text-muted-foreground">
              Format, flatten, or expand YAML structures
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Mode:</Label>
          <Button
            variant={editMode === "format" ? "default" : "outline"}
            size="sm"
            onClick={() => setEditMode("format")}
          >
            Format
          </Button>
          <Button
            variant={editMode === "flatten" ? "default" : "outline"}
            size="sm"
            onClick={() => setEditMode("flatten")}
          >
            Flatten
          </Button>
          <Button
            variant={editMode === "expand" ? "default" : "outline"}
            size="sm"
            onClick={() => setEditMode("expand")}
          >
            Expand
          </Button>
        </div>

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
            placeholder="Paste your YAML here..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleProcess} className="flex-1" disabled={!input}>
              <Edit3 className="h-4 w-4 mr-2" />
              {editMode === "format" ? "Format" : editMode === "flatten" ? "Flatten" : "Expand"}
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Result will appear here..."
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

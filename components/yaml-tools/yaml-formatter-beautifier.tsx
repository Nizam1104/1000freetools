"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function YamlFormatterBeautifier() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)
  const [error, setError] = useState("")

  const formatYAML = useCallback((yaml: string, indent: number): string => {
    const lines = yaml.split('\n')
    const result: string[] = []
    const indentStr = ' '.repeat(indent)
    let currentIndent = 0

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
      const trimmed = line.trim()

      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) {
        result.push(line)
        continue
      }

      // Remove existing indentation
      line = trimmed

      // Handle list items
      if (line.startsWith('-')) {
        result.push(indentStr.repeat(currentIndent) + line)
        if (line.length > 2 && !line.substring(2).trim().includes(':')) {
          // Simple list item
          continue
        }
      }

      // Handle key-value pairs
      if (line.includes(':')) {
        const colonIndex = line.indexOf(':')
        const key = line.substring(0, colonIndex)
        const value = line.substring(colonIndex + 1).trim()

        if (!value) {
          // This key has nested content
          result.push(indentStr.repeat(currentIndent) + key + ':')
          currentIndent++
        } else {
          // Simple key-value pair
          result.push(indentStr.repeat(currentIndent) + key + ': ' + value)
        }
      } else if (line.startsWith('-')) {
        result.push(line)
      }
    }

    return result.join('\n')
  }, [])

  const handleFormat = useCallback(() => {
    try {
      setError("")
      const formatted = formatYAML(input, indentSize)
      setOutput(formatted)
    } catch (e) {
      setError(`Format error: ${e instanceof Error ? e.message : "Unknown error"}`)
      setOutput("")
    }
  }, [input, indentSize, formatYAML])

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
      const blob = new Blob([output], { type: "text/yaml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "formatted.yaml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const lineCount = output ? output.split('\n').length : 0
  const charCount = output.length

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML Formatter & Beautifier</h2>
            <p className="text-sm text-muted-foreground">
              Format and beautify YAML with consistent indentation
            </p>
          </div>
          {output && (
            <div className="text-sm text-muted-foreground">
              {lineCount} lines • {charCount} characters
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Input YAML</Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="indentSize" className="text-xs">
                Indent:
              </Label>
              <select
                id="indentSize"
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="text-sm border rounded px-2 py-1 bg-background"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
              </select>
            </div>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML here...

# Example:
name: John Doe
age: 30
hobbies:
- reading
- gaming
address:
street: 123 Main St
city: Anytown"
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleFormat} className="flex-1">
              Format YAML
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Formatted YAML</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Formatted YAML will appear here..."
            className="min-h-[400px] font-mono text-sm bg-muted"
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

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Maximize2 } from "lucide-react"

export function YamlPrettifierCustom() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)
  const [trimTrailingSpaces, setTrimTrailingSpaces] = useState(true)
  const [emptyLinesBetweenSections, setEmptyLinesBetweenSections] = useState(1)

  const prettifyYaml = useCallback((yaml: string, options: { indentSize: number; trimTrailingSpaces: boolean; emptyLinesBetweenSections: number }): string => {
    const lines = yaml.split('\n')
    const processedLines: string[] = []
    let inSection = false

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]

      // Trim trailing spaces if enabled
      if (options.trimTrailingSpaces) {
        line = line.trimEnd()
      }

      // Skip multiple consecutive empty lines
      if (!line.trim()) {
        if (processedLines.length > 0 && processedLines[processedLines.length - 1].trim() === '') {
          continue
        }
      }

      // Normalize indentation
      if (line.trim()) {
        const currentIndent = line.search(/\S/)
        const normalizedIndent = Math.floor(currentIndent / options.indentSize) * options.indentSize
        line = ' '.repeat(normalizedIndent) + line.trim()
      }

      processedLines.push(line)
    }

    // Add empty lines between top-level sections
    if (options.emptyLinesBetweenSections > 0) {
      const finalLines: string[] = []
      let prevWasEmpty = false

      for (let i = 0; i < processedLines.length; i++) {
        const line = processedLines[i]
        const trimmed = line.trim()

        if (!trimmed) {
          if (!prevWasEmpty) {
            finalLines.push('')
            prevWasEmpty = true
          }
          continue
        }

        // Check if this is a top-level key
        if (line.search(/\S/) === 0 && trimmed.includes(':')) {
          if (finalLines.length > 0 && !prevWasEmpty) {
            for (let j = 0; j < options.emptyLinesBetweenSections; j++) {
              finalLines.push('')
            }
          }
        }

        finalLines.push(line)
        prevWasEmpty = false
      }

      return finalLines.join('\n')
    }

    return processedLines.join('\n')
  }, [])

  const handlePrettify = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const prettified = prettifyYaml(input, { indentSize, trimTrailingSpaces, emptyLinesBetweenSections })
    setOutput(prettified)
  }, [input, indentSize, trimTrailingSpaces, emptyLinesBetweenSections, prettifyYaml])

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
      a.download = "prettified.yaml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`name:John Doe
age:30
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
            <h2 className="text-2xl font-semibold tracking-tight">YAML Prettifier</h2>
            <p className="text-sm text-muted-foreground">
              Format and beautify YAML with custom indentation
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Label>Indent Size:</Label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={trimTrailingSpaces}
            onChange={(e) => setTrimTrailingSpaces(e.target.checked)}
            className="rounded border-gray-300"
          />
          Trim Trailing Spaces
        </label>
        <div className="flex items-center gap-2">
          <Label>Empty Lines Between Sections:</Label>
          <select
            value={emptyLinesBetweenSections}
            onChange={(e) => setEmptyLinesBetweenSections(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
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
            <Button onClick={handlePrettify} className="flex-1" disabled={!input}>
              <Maximize2 className="h-4 w-4 mr-2" />
              Prettify
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Prettified YAML</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Prettified YAML will appear here..."
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

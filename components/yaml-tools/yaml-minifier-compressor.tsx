"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Minimize2 } from "lucide-react"

export function YamlMinifierCompressor() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [removeComments, setRemoveComments] = useState(true)
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true)
  const [compactMode, setCompactMode] = useState(false)

  const minifyYaml = useCallback((yaml: string, options: { removeComments: boolean; removeEmptyLines: boolean; compactMode: boolean }): string => {
    let result = yaml
    const lines = yaml.split('\n')
    const processedLines: string[] = []

    for (const line of lines) {
      let processedLine = line

      // Remove comments if enabled
      if (options.removeComments) {
        const commentIndex = processedLine.indexOf('#')
        if (commentIndex !== -1) {
          // Check if # is inside quotes
          const beforeHash = processedLine.substring(0, commentIndex)
          const singleQuotes = (beforeHash.match(/'/g) || []).length
          const doubleQuotes = (beforeHash.match(/"/g) || []).length
          
          if (singleQuotes % 2 === 0 && doubleQuotes % 2 === 0) {
            processedLine = processedLine.substring(0, commentIndex).trimEnd()
          }
        }
      }

      // Skip empty lines if enabled
      if (options.removeEmptyLines && !processedLine.trim()) {
        continue
      }

      processedLines.push(processedLine)
    }

    result = processedLines.join('\n')

    // Compact mode: reduce indentation and remove unnecessary spaces
    if (options.compactMode) {
      result = result.split('\n').map(line => {
        // Reduce multiple spaces to single space (except in indentation)
        const indent = line.match(/^\s*/)?.[0] || ''
        const content = line.substring(indent.length)
        const compacted = content.replace(/:\s+/g, ': ').replace(/\s+/g, ' ')
        return indent.substring(0, Math.floor(indent.length / 2)) + compacted
      }).join('\n')
    }

    return result.trim()
  }, [])

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const minified = minifyYaml(input, { removeComments, removeEmptyLines, compactMode })
    setOutput(minified)
  }, [input, removeComments, removeEmptyLines, compactMode, minifyYaml])

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
      a.download = "minified.yaml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const compressionRatio = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML Minifier & Compressor</h2>
            <p className="text-sm text-muted-foreground">
              Minimize YAML file size by removing comments and whitespace
            </p>
          </div>
          {output.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Compression: {compressionRatio > 0 ? `-${compressionRatio}%` : '0%'}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={removeComments}
            onChange={(e) => setRemoveComments(e.target.checked)}
            className="rounded border-gray-300"
          />
          Remove Comments
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={removeEmptyLines}
            onChange={(e) => setRemoveEmptyLines(e.target.checked)}
            className="rounded border-gray-300"
          />
          Remove Empty Lines
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={compactMode}
            onChange={(e) => setCompactMode(e.target.checked)}
            className="rounded border-gray-300"
          />
          Compact Mode
        </label>
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
            <Button onClick={handleMinify} className="flex-1" disabled={!input}>
              <Minimize2 className="h-4 w-4 mr-2" />
              Minify
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Minified YAML</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Minified YAML will appear here..."
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

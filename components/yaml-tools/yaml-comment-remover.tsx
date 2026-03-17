"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, MessageSquareOff } from "lucide-react"

export function YamlCommentRemover() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [removeInlineComments, setRemoveInlineComments] = useState(true)
  const [removeBlockComments, setRemoveBlockComments] = useState(true)
  const [preserveEmptyLines, setPreserveEmptyLines] = useState(false)

  const removeComments = useCallback((yaml: string, options: { 
    removeInlineComments: boolean; 
    removeBlockComments: boolean;
    preserveEmptyLines: boolean 
  }): string => {
    const lines = yaml.split('\n')
    const processedLines: string[] = []

    for (const line of lines) {
      let processedLine = line

      if (options.removeInlineComments) {
        // Find # that's not inside quotes
        let inSingleQuote = false
        let inDoubleQuote = false
        let commentIndex = -1

        for (let i = 0; i < processedLine.length; i++) {
          const char = processedLine[i]
          
          if (char === "'" && !inDoubleQuote) {
            inSingleQuote = !inSingleQuote
          } else if (char === '"' && !inSingleQuote) {
            inDoubleQuote = !inDoubleQuote
          } else if (char === '#' && !inSingleQuote && !inDoubleQuote) {
            commentIndex = i
            break
          }
        }

        if (commentIndex !== -1) {
          processedLine = processedLine.substring(0, commentIndex).trimEnd()
        }
      }

      // Skip empty lines if not preserving
      if (!options.preserveEmptyLines && !processedLine.trim()) {
        continue
      }

      processedLines.push(processedLine)
    }

    // Remove consecutive empty lines if preserving empty lines
    if (options.preserveEmptyLines) {
      const dedupedLines: string[] = []
      let prevEmpty = false

      for (const line of processedLines) {
        const isEmpty = !line.trim()
        if (isEmpty && prevEmpty) {
          continue
        }
        dedupedLines.push(line)
        prevEmpty = isEmpty
      }

      return dedupedLines.join('\n')
    }

    return processedLines.join('\n')
  }, [])

  const handleRemove = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const result = removeComments(input, { removeInlineComments, removeBlockComments, preserveEmptyLines })
    setOutput(result)
  }, [input, removeInlineComments, removeBlockComments, preserveEmptyLines, removeComments])

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
      a.download = "no-comments.yaml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`# Configuration file
name: MyApp  # Application name
version: 1.0.0

# Database settings
database:
  host: localhost  # Default host
  port: 5432
  # username: admin
  password: secret`)
  }, [])

  const stats = {
    originalLines: input.split('\n').length,
    outputLines: output.split('\n').length,
    commentsRemoved: input.split('\n').filter(l => l.includes('#')).length - output.split('\n').filter(l => l.includes('#')).length
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML Comment Remover</h2>
            <p className="text-sm text-muted-foreground">
              Remove comments from YAML files while preserving structure
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      {stats.commentsRemoved > 0 && (
        <div className="p-3 bg-muted rounded-lg text-sm">
          Removed {stats.commentsRemoved} comment lines
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={removeInlineComments}
            onChange={(e) => setRemoveInlineComments(e.target.checked)}
            className="rounded border-gray-300"
          />
          Remove Inline Comments
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={removeBlockComments}
            onChange={(e) => setRemoveBlockComments(e.target.checked)}
            className="rounded border-gray-300"
          />
          Remove Comment Lines
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={preserveEmptyLines}
            onChange={(e) => setPreserveEmptyLines(e.target.checked)}
            className="rounded border-gray-300"
          />
          Preserve Empty Lines
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">YAML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML with comments here..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleRemove} className="flex-1" disabled={!input}>
              <MessageSquareOff className="h-4 w-4 mr-2" />
              Remove Comments
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">YAML Without Comments</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Clean YAML will appear here..."
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

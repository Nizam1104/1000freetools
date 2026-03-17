"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function PropertiesToYamlConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [preserveComments, setPreserveComments] = useState(true)

  const parseProperties = useCallback((properties: string): Array<{ key: string; value: string; comment?: string }> => {
    const lines = properties.split('\n')
    const result: Array<{ key: string; value: string; comment?: string }> = []

    for (const line of lines) {
      const trimmed = line.trim()
      
      if (!trimmed) continue

      // Check for comment
      if (trimmed.startsWith('#') || trimmed.startsWith('!')) {
        if (preserveComments) {
          result.push({ key: '', value: trimmed, comment: trimmed })
        }
        continue
      }

      // Find the first = or : separator
      const separatorIndex = Math.min(
        trimmed.indexOf('=') === -1 ? Infinity : trimmed.indexOf('='),
        trimmed.indexOf(':') === -1 ? Infinity : trimmed.indexOf(':')
      )

      if (separatorIndex === Infinity) {
        result.push({ key: trimmed, value: '' })
        continue
      }

      const key = trimmed.substring(0, separatorIndex).trim()
      const value = trimmed.substring(separatorIndex + 1).trim()
      
      // Check for inline comment
      let comment: string | undefined
      let processedValue = value
      if (preserveComments) {
        const commentIndex = value.indexOf('#')
        if (commentIndex !== -1) {
          comment = value.substring(commentIndex).trim()
          processedValue = value.substring(0, commentIndex).trim()
        }
      }

      result.push({ key, value: processedValue, comment })
    }

    return result
  }, [preserveComments])

  const convertToYaml = useCallback((properties: string): string => {
    const parsed = parseProperties(properties)
    const yamlLines: string[] = []

    for (const item of parsed) {
      if (item.comment) {
        yamlLines.push(item.comment)
      } else if (item.key) {
        // Convert dot notation to nested YAML
        const keys = item.key.split('.')
        const indent = '  '.repeat(keys.length - 1)
        
        if (keys.length === 1) {
          yamlLines.push(`${item.key}: ${item.value}`)
        } else {
          // Build nested structure
          let currentIndent = ''
          for (let i = 0; i < keys.length - 1; i++) {
            yamlLines.push(`${currentIndent}${keys[i]}:`)
            currentIndent += '  '
          }
          yamlLines.push(`${currentIndent}${keys[keys.length - 1]}: ${item.value}`)
        }
      }
    }

    return yamlLines.join('\n')
  }, [parseProperties])

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
    setInput(`# Application settings
app.name=MyApplication
app.version=1.0.0
app.debug=true

# Database configuration
database.host=localhost
database.port=5432
database.name=mydb
database.username=admin
database.password=secret`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Properties to YAML Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert Java .properties files to YAML format
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={preserveComments}
            onChange={(e) => setPreserveComments(e.target.checked)}
            className="rounded border-gray-300"
          />
          Preserve Comments
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Properties Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your .properties content here...

# Example:
app.name=MyApp
app.version=1.0.0
database.host=localhost"
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

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ArrowRight } from "lucide-react"

export function CsvToYamlConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [hasHeader, setHasHeader] = useState(true)
  const [delimiter, setDelimiter] = useState(",")
  const [outputFormat, setOutputFormat] = useState<"list" | "objects">("list")

  const parseCsv = useCallback((csv: string, options: { hasHeader: boolean; delimiter: string }): Array<Record<string, string>> => {
    const lines = csv.split('\n').filter(line => line.trim())
    if (lines.length === 0) return []

    const delimiter = options.delimiter || ','
    
    // Parse a CSV line respecting quotes
    const parseLine = (line: string): string[] => {
      const result: string[] = []
      let current = ''
      let inQuotes = false

      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        
        if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === delimiter && !inQuotes) {
          result.push(current.trim().replace(/^"|"$/g, ''))
          current = ''
        } else {
          current += char
        }
      }
      result.push(current.trim().replace(/^"|"$/g, ''))
      return result
    }

    const headers = options.hasHeader ? parseLine(lines[0]) : lines[0].split('').map((_, i) => `column${i + 1}`)
    const startIndex = options.hasHeader ? 1 : 0

    const result: Array<Record<string, string>> = []
    for (let i = startIndex; i < lines.length; i++) {
      const values = parseLine(lines[i])
      const row: Record<string, string> = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })
      result.push(row)
    }

    return result
  }, [])

  const convertToYaml = useCallback((csv: string): string => {
    const rows = parseCsv(csv, { hasHeader, delimiter })
    
    if (rows.length === 0) {
      return "# No data to convert"
    }

    const yamlLines: string[] = []

    if (outputFormat === "list") {
      rows.forEach((row, index) => {
        yamlLines.push(`- item_${index + 1}:`)
        Object.entries(row).forEach(([key, value]) => {
          yamlLines.push(`    ${key}: ${value}`)
        })
      })
    } else {
      rows.forEach((row) => {
        yamlLines.push('-')
        Object.entries(row).forEach(([key, value]) => {
          yamlLines.push(`  ${key}: ${value}`)
        })
      })
    }

    return yamlLines.join('\n')
  }, [parseCsv, hasHeader, delimiter, outputFormat])

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
    setInput(`name,age,city,country
John Doe,30,New York,USA
Jane Smith,25,London,UK
Bob Johnson,35,Paris,France`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">CSV to YAML Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert CSV data to YAML format
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
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
            className="rounded border-gray-300"
          />
          First Row is Header
        </label>

        <div className="flex items-center gap-2">
          <Label>Delimiter:</Label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="|">Pipe (|)</option>
            <option value="	">Tab</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Label>Output Format:</Label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as "list" | "objects")}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="list">Named List</option>
            <option value="objects">Objects</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">CSV Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSV data here...

name,age,city
John,30,New York
Jane,25,London"
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

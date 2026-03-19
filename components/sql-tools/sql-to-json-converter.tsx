"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Table } from "lucide-react"
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SqlToJsonConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [previewData, setPreviewData] = useState<any[]>([])
  const [copied, setCopied] = useState(false)
  const [prettify, setPrettify] = useState(true)
  const [arrayFormat, setArrayFormat] = useState(true)

  const parseSQLResults = useCallback((sql: string): any[] => {
    // Try to parse SQL INSERT statements or result set format
    const lines = sql.split('\n').filter(l => l.trim())
    const results: any[] = []

    // Check for INSERT statements
    const insertMatches = sql.matchAll(/INSERT INTO\s+\w+\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/gi)
    for (const match of insertMatches) {
      const columns = match[1].split(',').map(c => c.trim())
      const values = match[2].split(',').map(v => v.trim())
      const row: any = {}
      columns.forEach((col, i) => {
        let val: string | number | boolean | null = values[i]?.trim()
        // Remove quotes
        if ((val?.startsWith("'") && val?.endsWith("'")) || (val?.startsWith('"') && val?.endsWith('"'))) {
          val = val?.slice(1, -1)
        }
        // Handle NULL
        if (val === 'NULL') val = null
        // Handle numbers
        else if (!isNaN(Number(val))) val = Number(val)
        // Handle booleans
        else if (val?.toUpperCase() === 'TRUE') val = true
        else if (val?.toUpperCase() === 'FALSE') val = false
        row[col] = val
      })
      results.push(row)
    }

    // Check for tabular format (pipe or tab separated)
    if (results.length === 0) {
      const separator = sql.includes('|') ? '|' : '\t'
      const tableLines = lines.filter(l => !l.includes('---') && !l.includes('===') && !l.match(/^\s*[-=]+\s*$/))
      
      if (tableLines.length >= 2) {
        const headers = tableLines[0].split(separator).map(h => h.trim())
        for (let i = 1; i < tableLines.length; i++) {
          const values = tableLines[i].split(separator).map(v => v.trim())
          const row: any = {}
          headers.forEach((header, j) => {
            let val: string | number | boolean | null = values[j]
            if (val === 'NULL' || val === '') val = null
            else if (!isNaN(Number(val))) val = Number(val)
            else if (val?.toUpperCase() === 'TRUE') val = true
            else if (val?.toUpperCase() === 'FALSE') val = false
            else if ((val?.startsWith("'") && val?.endsWith("'")) || (val?.startsWith('"') && val?.endsWith('"'))) {
              val = val?.slice(1, -1)
            }
            row[header] = val
          })
          results.push(row)
        }
      }
    }

    // Check for CSV-like format
    if (results.length === 0 && lines.length >= 2) {
      const firstLine = lines[0]
      if (firstLine.includes(',')) {
        const headers = firstLine.split(',').map(h => h.trim())
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim())
          const row: any = {}
          headers.forEach((header, j) => {
            let val: string | number | boolean | null = values[j]
            if (val === 'NULL' || val === '') val = null
            else if (!isNaN(Number(val))) val = Number(val)
            else if ((val?.startsWith("'") && val?.endsWith("'")) || (val?.startsWith('"') && val?.endsWith('"'))) {
              val = val?.slice(1, -1)
            }
            row[header] = val
          })
          results.push(row)
        }
      }
    }

    return results
  }, [])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      setPreviewData([])
      return
    }

    try {
      const data = parseSQLResults(input)
      setPreviewData(data)
      
      if (data.length === 0) {
        setOutput(JSON.stringify({ error: "Could not parse SQL results. Please check the input format." }, null, 2))
        return
      }

      const jsonOutput = arrayFormat 
        ? (prettify ? JSON.stringify(data, null, 2) : JSON.stringify(data))
        : (prettify ? JSON.stringify({ data }, null, 2) : JSON.stringify({ data }))
      
      setOutput(jsonOutput)
    } catch (error) {
      setOutput(JSON.stringify({ error: error instanceof Error ? error.message : "Conversion failed" }, null, 2))
    }
  }, [input, prettify, arrayFormat, parseSQLResults])

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
    setPreviewData([])
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

  const loadExample = useCallback(() => {
    setInput(`INSERT INTO users (id, name, email, age, active) VALUES (1, 'John Doe', 'john@example.com', 30, true);
INSERT INTO users (id, name, email, age, active) VALUES (2, 'Jane Smith', 'jane@example.com', 25, true);
INSERT INTO users (id, name, email, age, active) VALUES (3, 'Bob Wilson', 'bob@example.com', 35, false);`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL to JSON Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert SQL query results or INSERT statements to JSON format
            </p>
          </div>
          <Button onClick={loadExample} variant="outline" size="sm">
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={prettify}
            onChange={(e) => setPrettify(e.target.checked)}
            className="rounded border-gray-300"
          />
          Prettify JSON
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={arrayFormat}
            onChange={(e) => setArrayFormat(e.target.checked)}
            className="rounded border-gray-300"
          />
          Output as array (not wrapped in object)
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">SQL Input</Label>
            <Button variant="outline" size="sm" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste SQL INSERT statements or query results here...

Example:
INSERT INTO users (id, name, email) VALUES (1, 'John', 'john@example.com');
INSERT INTO users (id, name, email) VALUES (2, 'Jane', 'jane@example.com');"
            className="min-h-[500px] font-mono text-sm"
          />
          <Button onClick={handleConvert} disabled={!input} className="w-full">
            <Table className="h-4 w-4 mr-2" />
            Convert to JSON
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="output">JSON Output</Label>
            <div className="flex items-center gap-2">
              <Button onClick={handleCopy} disabled={!output} variant="outline" size="sm">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button onClick={handleDownload} disabled={!output} variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="JSON output will appear here..."
            className="min-h-[500px] font-mono text-sm bg-muted"
          />
        </div>
      </div>

      {previewData.length > 0 && (
        <div className="space-y-4">
          <Label>Data Preview</Label>
          <div className="overflow-x-auto border rounded-lg">
            <UITable>
              <TableHeader>
                <TableRow>
                  {Object.keys(previewData[0]).map((key) => (
                    <TableHead key={key}>{key}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.slice(0, 10).map((row, i) => (
                  <TableRow key={i}>
                    {Object.keys(previewData[0]).map((key) => (
                      <TableCell key={key}>{String(row[key])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </UITable>
          </div>
          {previewData.length > 10 && (
            <p className="text-sm text-muted-foreground">
              Showing 10 of {previewData.length} rows
            </p>
          )}
        </div>
      )}
    </div>
  )
}

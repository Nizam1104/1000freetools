"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function SqlToCsvConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [delimiter, setDelimiter] = useState(",")
  const [includeHeader, setIncludeHeader] = useState(true)
  const [quoteStrings, setQuoteStrings] = useState(true)

  const parseSQLResults = useCallback((sql: string): { headers: string[]; rows: string[][] } => {
    const lines = sql.trim().split('\n').filter(line => line.trim())
    
    if (lines.length < 3) {
      throw new Error("Invalid SQL result format. Expected table format with borders.")
    }

    const headers: string[] = []
    const rows: string[][] = []

    let headerLine = -1
    let separatorLine = -1

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('|') && headerLine === -1) {
        headerLine = i
      }
      if (lines[i].match(/^[\s|+-]+$/) && headerLine !== -1 && separatorLine === -1) {
        separatorLine = i
        break
      }
    }

    if (headerLine === -1 || separatorLine === -1) {
      throw new Error("Could not parse SQL result table format")
    }

    const headerParts = lines[headerLine].split('|').filter((_, i) => i > 0)
    headerParts.forEach(h => headers.push(h.trim()))

    for (let i = separatorLine + 1; i < lines.length; i++) {
      if (lines[i].match(/^[\s|+-]+$/)) continue
      if (!lines[i].includes('|')) continue
      
      const parts = lines[i].split('|').filter((_, j) => j > 0)
      const row = parts.map(p => p.trim())
      if (row.length === headers.length || row.length > 0) {
        rows.push(row)
      }
    }

    return { headers, rows }
  }, [])

  const convertToCSV = useCallback((sql: string): string => {
    const { headers, rows } = parseSQLResults(sql)
    const csvLines: string[] = []

    if (includeHeader) {
      csvLines.push(headers.map(h => quoteStrings ? `"${h}"` : h).join(delimiter))
    }

    rows.forEach(row => {
      csvLines.push(row.map(cell => {
        if (quoteStrings) {
          const escaped = cell.replace(/"/g, '""')
          return `"${escaped}"`
        }
        return cell
      }).join(delimiter))
    })

    return csvLines.join('\n')
  }, [delimiter, includeHeader, quoteStrings, parseSQLResults])

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const csv = convertToCSV(input)
      setOutput(csv)
    } catch (e) {
      setError(`Conversion error: ${e instanceof Error ? e.message : "Unknown error"}`)
      setOutput("")
    }
  }, [input, convertToCSV])

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
      const blob = new Blob([output], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "export.csv"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`+----+----------+-------+--------+
| id | name     | age   | email  |
+----+----------+-------+--------+
| 1  | John     | 30    | john@example.com |
| 2  | Jane     | 25    | jane@example.com |
| 3  | Bob      | 35    | bob@example.com  |
+----+----------+-------+--------+`)
    setError("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL to CSV Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert SQL query results to CSV format
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
          <Label htmlFor="input">SQL Result Table</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your SQL result table here...

+----+----------+-------+
| id | name     | age   |
+----+----------+-------+
| 1  | John     | 30    |
| 2  | Jane     | 25    |
+----+----------+-------+"
            className="min-h-[400px] font-mono text-sm"
          />
          
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">CSV Options</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="delimiter" className="text-sm">Delimiter:</Label>
                <select
                  id="delimiter"
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="text-sm border rounded px-2 py-1 bg-background"
                >
                  <option value=",">Comma (,)</option>
                  <option value=";">Semicolon (;)</option>
                  <option value="|">Pipe (|)</option>
                  <option value="	">Tab</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={includeHeader}
                  onChange={(e) => setIncludeHeader(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Include header row
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={quoteStrings}
                  onChange={(e) => setQuoteStrings(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Quote all fields
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              Convert to CSV
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">CSV Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="CSV output will appear here..."
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

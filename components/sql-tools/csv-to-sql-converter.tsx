"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function CsvToSqlConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [tableName, setTableName] = useState("imported_data")
  const [delimiter, setDelimiter] = useState(",")
  const [includeHeader, setIncludeHeader] = useState(true)
  const [quoteChar, setQuoteChar] = useState('"')

  const parseCSV = useCallback((csv: string): { headers: string[]; rows: string[][] } => {
    const lines = csv.trim().split('\n')
    const headers: string[] = []
    const rows: string[][] = []

    const parseLine = (line: string): string[] => {
      const result: string[] = []
      let current = ""
      let inQuotes = false

      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        
        if (char === quoteChar) {
          if (inQuotes && line[i + 1] === quoteChar) {
            current += quoteChar
            i++
          } else {
            inQuotes = !inQuotes
          }
        } else if (char === delimiter && !inQuotes) {
          result.push(current.trim())
          current = ""
        } else {
          current += char
        }
      }
      result.push(current.trim())
      return result
    }

    if (lines.length === 0) {
      throw new Error("Empty CSV input")
    }

    if (includeHeader) {
      const headerLine = parseLine(lines[0])
      headerLine.forEach(h => headers.push(h.replace(/"/g, "")))
    }

    const startIndex = includeHeader ? 1 : 0
    for (let i = startIndex; i < lines.length; i++) {
      if (lines[i].trim()) {
        rows.push(parseLine(lines[i]))
      }
    }

    return { headers, rows }
  }, [delimiter, includeHeader, quoteChar])

  const generateSQL = useCallback((csv: string): string => {
    const { headers, rows } = parseCSV(csv)
    
    if (headers.length === 0 && rows.length === 0) {
      throw new Error("No data to convert")
    }

    const finalHeaders = headers.length > 0 ? headers : rows[0]?.map((_, i) => `column_${i + 1}`) || []
    const finalRows = headers.length > 0 ? rows : rows.slice(1)

    let sql = `-- Create table\n`
    sql += `CREATE TABLE ${tableName} (\n`
    sql += finalHeaders.map(h => `  ${h} TEXT`).join(',\n')
    sql += `\n);\n\n-- Insert data\n`

    for (const row of finalRows) {
      sql += `INSERT INTO ${tableName} (${finalHeaders.join(', ')}) VALUES (`
      sql += row.map(val => {
        const escaped = val.replace(/'/g, "''")
        return `'${escaped}'`
      }).join(', ')
      sql += `);\n`
    }

    return sql
  }, [tableName, parseCSV])

  const handleConvert = useCallback(() => {
    try {
      setError("")
      const sql = generateSQL(input)
      setOutput(sql)
    } catch (e) {
      setError(`Conversion error: ${e instanceof Error ? e.message : "Unknown error"}`)
      setOutput("")
    }
  }, [input, generateSQL])

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
      const blob = new Blob([output], { type: "text/sql" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "import.sql"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`id,name,age,email
1,John Doe,30,john@example.com
2,Jane Smith,25,jane@example.com
3,Bob Johnson,35,bob@example.com`)
    setError("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">CSV to SQL Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert CSV data to SQL INSERT statements
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
          <Label htmlFor="input">CSV Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSV data here...

id,name,age,email
1,John Doe,30,john@example.com
2,Jane Smith,25,jane@example.com"
            className="min-h-[400px] font-mono text-sm"
          />
          
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <Label className="text-sm font-medium">SQL Options</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="tableName" className="text-sm">Table name:</Label>
                <input
                  id="tableName"
                  type="text"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded text-sm"
                  placeholder="table_name"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="delimiter" className="text-sm">CSV delimiter:</Label>
                <select
                  id="delimiter"
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="flex-1 text-sm border rounded px-2 py-1 bg-background"
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
                First row contains headers
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              Convert to SQL
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">SQL Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="SQL INSERT statements will appear here..."
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

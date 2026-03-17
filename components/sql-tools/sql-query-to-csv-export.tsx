"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Table } from "lucide-react"
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SqlQueryToCsvExport() {
  const [sqlQuery, setSqlQuery] = useState("")
  const [csvOutput, setCsvOutput] = useState("")
  const [previewData, setPreviewData] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [delimiter, setDelimiter] = useState(",")
  const [includeHeaders, setIncludeHeaders] = useState(true)
  const [quoteStrings, setQuoteStrings] = useState(true)
  const [copied, setCopied] = useState(false)

  const parseSQLResult = useCallback((sql: string): { columns: string[]; data: any[] } => {
    // This is a simulation - in real use, this would execute the SQL
    // For demo purposes, we'll parse the SELECT statement and generate mock data
    
    const selectMatch = sql.match(/SELECT\s+(.+?)\s+FROM\s+(\w+)/i)
    if (!selectMatch) {
      // Try to detect column names from the query
      const genericColumns = ["id", "name", "email", "created_at", "status"]
      const genericData = [
        { id: 1, name: "John Doe", email: "john@example.com", created_at: "2024-01-15", status: "active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", created_at: "2024-01-16", status: "active" },
        { id: 3, name: "Bob Wilson", email: "bob@example.com", created_at: "2024-01-17", status: "inactive" },
        { id: 4, name: "Alice Brown", email: "alice@example.com", created_at: "2024-01-18", status: "active" },
        { id: 5, name: "Charlie Davis", email: "charlie@example.com", created_at: "2024-01-19", status: "pending" },
      ]
      return { columns: genericColumns, data: genericData }
    }

    const [, columnsStr, tableName] = selectMatch
    
    // Parse column names
    let cols: string[]
    if (columnsStr.trim() === "*") {
      cols = ["id", "name", "email", "created_at"]
    } else {
      cols = columnsStr.split(",").map(c => c.trim().split(/\s+/).pop() || c.trim())
    }

    // Generate mock data based on table name
    const mockData = generateMockData(cols, tableName)
    
    return { columns: cols, data: mockData }
  }, [])

  const generateMockData = (columns: string[], tableName: string): any[] => {
    const data: any[] = []
    const count = 10

    for (let i = 1; i <= count; i++) {
      const row: any = {}
      columns.forEach(col => {
        const colLower = col.toLowerCase()
        if (colLower === "id" || colLower.endsWith("_id")) {
          row[col] = i
        } else if (colLower === "name" || colLower.includes("username")) {
          row[col] = `User ${i}`
        } else if (colLower === "email") {
          row[col] = `user${i}@example.com`
        } else if (colLower === "created_at" || colLower === "updated_at" || colLower.includes("date")) {
          const date = new Date(2024, 0, i)
          row[col] = date.toISOString().split('T')[0]
        } else if (colLower === "status" || colLower === "active") {
          row[col] = i % 3 === 0 ? "inactive" : "active"
        } else if (colLower === "price" || colLower === "amount" || colLower.includes("cost")) {
          row[col] = (Math.random() * 100).toFixed(2)
        } else if (colLower === "quantity" || colLower === "count") {
          row[col] = Math.floor(Math.random() * 100) + 1
        } else {
          row[col] = `Value ${i}`
        }
      })
      data.push(row)
    }

    return data
  }

  const convertToCSV = useCallback(() => {
    const { columns: cols, data } = parseSQLResult(sqlQuery)
    setColumns(cols)
    setPreviewData(data)

    if (data.length === 0) {
      setCsvOutput("")
      return
    }

    const lines: string[] = []

    // Add header row
    if (includeHeaders) {
      lines.push(cols.map(col => quoteStrings && col.includes(delimiter) ? `"${col}"` : col).join(delimiter))
    }

    // Add data rows
    data.forEach(row => {
      const values = cols.map(col => {
        let value = row[col]
        if (value === null || value === undefined) {
          value = ""
        }
        const strValue = String(value)
        if (quoteStrings && (strValue.includes(delimiter) || strValue.includes('"') || strValue.includes('\n'))) {
          return `"${strValue.replace(/"/g, '""')}"`
        }
        return quoteStrings ? `"${strValue}"` : strValue
      })
      lines.push(values.join(delimiter))
    })

    setCsvOutput(lines.join('\n'))
  }, [sqlQuery, delimiter, includeHeaders, quoteStrings, parseSQLResult])

  const handleCopy = useCallback(async () => {
    if (csvOutput) {
      await navigator.clipboard.writeText(csvOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [csvOutput])

  const handleClear = useCallback(() => {
    setSqlQuery("")
    setCsvOutput("")
    setPreviewData([])
    setColumns([])
  }, [])

  const handleDownload = useCallback(() => {
    if (csvOutput) {
      const blob = new Blob([csvOutput], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "query_results.csv"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [csvOutput])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL Query to CSV Export</h2>
            <p className="text-sm text-muted-foreground">
              Convert SQL query results to CSV format
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sqlQuery">SQL Query</Label>
          <Textarea
            id="sqlQuery"
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            placeholder="SELECT id, name, email FROM users WHERE active = 1"
            className="min-h-[150px] font-mono text-sm"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="delimiter">Delimiter</Label>
            <select
              id="delimiter"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="|">Pipe (|)</option>
              <option value="&#9;">Tab</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Options</Label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={includeHeaders}
                  onChange={(e) => setIncludeHeaders(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Include Headers
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={quoteStrings}
                  onChange={(e) => setQuoteStrings(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Quote Strings
              </label>
            </div>
          </div>
          <div className="flex items-end">
            <Button onClick={convertToCSV} disabled={!sqlQuery} className="w-full">
              <Table className="h-4 w-4 mr-2" />
              Convert to CSV
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleClear} title="Clear">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {previewData.length > 0 && (
        <div className="space-y-4">
          <Label>Data Preview</Label>
          <div className="overflow-x-auto border rounded-lg">
            <UITable>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead key={col}>{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.slice(0, 5).map((row, i) => (
                  <TableRow key={i}>
                    {columns.map((col) => (
                      <TableCell key={col}>{row[col]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </UITable>
          </div>
          {previewData.length > 5 && (
            <p className="text-sm text-muted-foreground">
              Showing 5 of {previewData.length} rows
            </p>
          )}
        </div>
      )}

      {csvOutput && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>CSV Output</Label>
            <div className="flex items-center gap-2">
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            value={csvOutput}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-muted"
          />
        </div>
      )}
    </div>
  )
}

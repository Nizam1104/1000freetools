"use client"

import * as React from "react"
import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Download, Upload, Database, Table } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SqliteViewerOnline() {
  const [dbFile, setDbFile] = useState<File | null>(null)
  const [tables, setTables] = useState<string[]>([])
  const [selectedTable, setSelectedTable] = useState<string>("")
  const [tableData, setTableData] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM ")
  const [queryResult, setQueryResult] = useState<any[]>([])
  const [queryColumns, setQueryColumns] = useState<string[]>([])
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setDbFile(file)
      setError("")
      // Note: In a real implementation, we would use sql.js library to parse the SQLite file
      // For now, we'll show a message about the limitation
      setError("Note: Full SQLite parsing requires the sql.js library. This is a UI demo showing the component structure.")
    }
  }, [])

  const loadTables = useCallback(() => {
    // Simulated table loading - in real implementation would use sql.js
    const simulatedTables = ["users", "orders", "products", "categories"]
    setTables(simulatedTables)
  }, [])

  const loadTableData = useCallback((tableName: string) => {
    setSelectedTable(tableName)
    setSqlQuery(`SELECT * FROM ${tableName}`)
    // Simulated data - in real implementation would query the database
    const simulatedData = [
      { id: 1, name: "John Doe", email: "john@example.com", created_at: "2024-01-15" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", created_at: "2024-01-16" },
      { id: 3, name: "Bob Wilson", email: "bob@example.com", created_at: "2024-01-17" },
    ]
    setTableData(simulatedData)
    setColumns(["id", "name", "email", "created_at"])
  }, [])

  const executeQuery = useCallback(() => {
    // In real implementation, would execute SQL using sql.js
    // For demo, show simulated results
    const simulatedResult = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ]
    setQueryResult(simulatedResult)
    setQueryColumns(["id", "name", "email"])
  }, [])

  const handleCopy = useCallback(async () => {
    const data = JSON.stringify(queryResult.length > 0 ? queryResult : tableData, null, 2)
    if (data) {
      await navigator.clipboard.writeText(data)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [queryResult, tableData])

  const handleDownload = useCallback(() => {
    const data = queryResult.length > 0 ? queryResult : tableData
    if (data.length > 0) {
      const csv = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).map(v => `"${v}"`).join(','))
      ].join('\n')
      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "export.csv"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [queryResult, tableData])

  const handleClear = useCallback(() => {
    setDbFile(null)
    setTables([])
    setSelectedTable("")
    setTableData([])
    setColumns([])
    setSqlQuery("SELECT * FROM ")
    setQueryResult([])
    setQueryColumns([])
    setError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQLite Viewer Online</h2>
            <p className="text-sm text-muted-foreground">
              View and query SQLite database files in your browser
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".sqlite,.sqlite3,.db,.db3"
          onChange={handleFileUpload}
          className="hidden"
          id="db-upload"
        />
        <Button onClick={() => fileInputRef.current?.click()} variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Upload SQLite File
        </Button>
        <Button onClick={loadTables} disabled={!dbFile} variant="outline">
          <Database className="h-4 w-4 mr-2" />
          Load Tables
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {dbFile && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm">
            <span className="font-medium">Loaded file:</span> {dbFile.name} ({(dbFile.size / 1024).toFixed(2)} KB)
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500 rounded-lg text-sm text-yellow-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-4">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Table className="h-5 w-5" />
                Tables
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tables.length > 0 ? (
                <div className="space-y-1">
                  {tables.map((table) => (
                    <Button
                      key={table}
                      variant={selectedTable === table ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => loadTableData(table)}
                    >
                      <Table className="h-4 w-4 mr-2" />
                      {table}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No tables loaded</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SQL Query</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  placeholder="Enter your SQL query..."
                  className="flex-1 min-h-[80px] font-mono text-sm"
                />
                <Button onClick={executeQuery} className="self-start">
                  Execute
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Query Results</span>
                <div className="flex items-center gap-2">
                  <Button onClick={handleCopy} disabled={queryResult.length === 0 && tableData.length === 0} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                  <Button onClick={handleDownload} disabled={queryResult.length === 0 && tableData.length === 0} variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(queryResult.length > 0 || tableData.length > 0) ? (
                <div className="overflow-x-auto">
                  <UITable>
                    <TableHeader>
                      <TableRow>
                        {(queryResult.length > 0 ? queryColumns : columns).map((col) => (
                          <TableHead key={col}>{col}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(queryResult.length > 0 ? queryResult : tableData).map((row, i) => (
                        <TableRow key={i}>
                          {(queryResult.length > 0 ? queryColumns : columns).map((col) => (
                            <TableCell key={col}>{(row as any)[col]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </UITable>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Select a table or execute a query to view results
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

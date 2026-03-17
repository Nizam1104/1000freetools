"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Download, Plus, Trash } from "lucide-react"
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Column {
  id: string
  name: string
  type: "string" | "number" | "email" | "date" | "boolean" | "phone" | "uuid" | "custom"
  options?: string
}

export function SqlRandomDataGenerator() {
  const [tableName, setTableName] = useState("users")
  const [rowCount, setRowCount] = useState(10)
  const [columns, setColumns] = useState<Column[]>([
    { id: "1", name: "id", type: "number", options: "1,1000" },
    { id: "2", name: "name", type: "string" },
    { id: "3", name: "email", type: "email" },
    { id: "4", name: "created_at", type: "date" },
  ])
  const [outputFormat, setOutputFormat] = useState<"insert" | "values" | "csv">("insert")
  const [generatedData, setGeneratedData] = useState<any[]>([])
  const [sqlOutput, setSqlOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const addColumn = useCallback(() => {
    const newId = (columns.length + 1).toString()
    setColumns([...columns, { id: newId, name: `column${newId}`, type: "string" }])
  }, [columns])

  const removeColumn = useCallback((id: string) => {
    if (columns.length > 1) {
      setColumns(columns.filter(c => c.id !== id))
    }
  }, [columns])

  const updateColumn = useCallback((id: string, field: keyof Column, value: string) => {
    setColumns(columns.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ))
  }, [columns])

  const generateRandomData = useCallback(() => {
    const firstNames = ["John", "Jane", "Bob", "Alice", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack", "Kate", "Leo", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Rose"]
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Wilson", "Anderson", "Taylor", "Thomas", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White"]
    const domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com", "test.com"]

    const data: any[] = []

    for (let i = 0; i < rowCount; i++) {
      const row: any = {}
      
      columns.forEach(col => {
        switch (col.type) {
          case "number": {
            const [min, max] = col.options?.split(",").map(Number) || [1, 100]
            row[col.name] = Math.floor(Math.random() * (max - min + 1)) + min
            break
          }
          case "string": {
            const values = col.options?.split(",") || ["value1", "value2", "value3"]
            row[col.name] = values[Math.floor(Math.random() * values.length)]
            break
          }
          case "email": {
            const first = firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase()
            const last = lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase()
            const domain = domains[Math.floor(Math.random() * domains.length)]
            row[col.name] = `${first}.${last}${i}@${domain}`
            break
          }
          case "date": {
            const start = col.options?.split(",")[0] || "2020-01-01"
            const end = col.options?.split(",")[1] || "2024-12-31"
            const startDate = new Date(start)
            const endDate = new Date(end)
            const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
            row[col.name] = randomDate.toISOString().split('T')[0]
            break
          }
          case "boolean": {
            row[col.name] = Math.random() > 0.5
            break
          }
          case "phone": {
            row[col.name] = `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
            break
          }
          case "uuid": {
            row[col.name] = crypto.randomUUID()
            break
          }
          case "custom": {
            const values = col.options?.split(",") || ["custom"]
            row[col.name] = values[Math.floor(Math.random() * values.length)]
            break
          }
        }
      })
      
      data.push(row)
    }

    setGeneratedData(data)
    generateSQL(data)
  }, [rowCount, columns])

  const generateSQL = useCallback((data: any[]) => {
    if (data.length === 0) {
      setSqlOutput("")
      return
    }

    const columnNames = columns.map(c => c.name)
    
    if (outputFormat === "insert") {
      const statements = data.map(row => {
        const values = columnNames.map(col => {
          const val = row[col]
          if (typeof val === "boolean") return val ? "TRUE" : "FALSE"
          if (typeof val === "number") return val.toString()
          if (val === null || val === undefined) return "NULL"
          return `'${String(val).replace(/'/g, "''")}'`
        })
        return `INSERT INTO ${tableName} (${columnNames.join(", ")}) VALUES (${values.join(", ")});`
      })
      setSqlOutput(statements.join("\n"))
    } else if (outputFormat === "values") {
      const valuesList = data.map(row => {
        const values = columnNames.map(col => {
          const val = row[col]
          if (typeof val === "boolean") return val ? "TRUE" : "FALSE"
          if (typeof val === "number") return val.toString()
          if (val === null || val === undefined) return "NULL"
          return `'${String(val).replace(/'/g, "''")}'`
        })
        return `  (${values.join(", ")})`
      })
      setSqlOutput(`INSERT INTO ${tableName} (${columnNames.join(", ")})\nVALUES\n${valuesList.join(",\n")};`)
    } else if (outputFormat === "csv") {
      const lines = [
        columnNames.join(","),
        ...data.map(row => columnNames.map(col => {
          const val = row[col]
          return typeof val === "string" && val.includes(",") ? `"${val}"` : val
        }).join(","))
      ]
      setSqlOutput(lines.join("\n"))
    }
  }, [columns, tableName, outputFormat])

  const handleCopy = useCallback(async () => {
    if (sqlOutput) {
      await navigator.clipboard.writeText(sqlOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [sqlOutput])

  const handleClear = useCallback(() => {
    setGeneratedData([])
    setSqlOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (sqlOutput) {
      const ext = outputFormat === "csv" ? "csv" : "sql"
      const blob = new Blob([sqlOutput], { type: outputFormat === "csv" ? "text/csv" : "application/sql" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${tableName}_data.${ext}`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [sqlOutput, tableName, outputFormat])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL Random Data Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate random test data for database tables
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="tableName">Table Name</Label>
          <Input
            id="tableName"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="users"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rowCount">Number of Rows</Label>
          <Input
            id="rowCount"
            type="number"
            value={rowCount}
            onChange={(e) => setRowCount(parseInt(e.target.value) || 10)}
            min="1"
            max="10000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="outputFormat">Output Format</Label>
          <select
            id="outputFormat"
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as typeof outputFormat)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="insert">INSERT Statements</option>
            <option value="values">VALUES Clause</option>
            <option value="csv">CSV Format</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Columns</Label>
          <Button type="button" variant="outline" size="sm" onClick={addColumn}>
            <Plus className="h-4 w-4 mr-2" />
            Add Column
          </Button>
        </div>
        <div className="space-y-2">
          {columns.map((col) => (
            <div key={col.id} className="flex items-center gap-2">
              <Input
                value={col.name}
                onChange={(e) => updateColumn(col.id, "name", e.target.value)}
                placeholder="Column name"
                className="w-32"
              />
              <select
                value={col.type}
                onChange={(e) => updateColumn(col.id, "type", e.target.value)}
                className="w-32 rounded-md border border-input bg-background px-2 py-2 text-sm"
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                <option value="date">Date</option>
                <option value="boolean">Boolean</option>
                <option value="phone">Phone</option>
                <option value="uuid">UUID</option>
                <option value="custom">Custom List</option>
              </select>
              <Input
                value={col.options || ""}
                onChange={(e) => updateColumn(col.id, "options", e.target.value)}
                placeholder={col.type === "number" ? "min,max" : col.type === "date" ? "start,end" : "option1,option2"}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeColumn(col.id)}
                disabled={columns.length === 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={generateRandomData} className="flex-1">
          Generate Data
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {generatedData.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Data Preview</Label>
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

          <div className="overflow-x-auto border rounded-lg">
            <UITable>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead key={col.name}>{col.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {generatedData.slice(0, 10).map((row, i) => (
                  <TableRow key={i}>
                    {columns.map((col) => (
                      <TableCell key={col.name}>{String(row[col.name])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </UITable>
          </div>
          {generatedData.length > 10 && (
            <p className="text-sm text-muted-foreground">
              Showing 10 of {generatedData.length} rows
            </p>
          )}

          <div className="space-y-2">
            <Label>Generated SQL</Label>
            <Textarea
              value={sqlOutput}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-muted"
            />
          </div>
        </div>
      )}
    </div>
  )
}

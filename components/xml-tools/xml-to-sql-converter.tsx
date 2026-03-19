"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Database } from "lucide-react"

const DEFAULT_XMLINPUT = [
  '<users>',
  '  <user id="1">',
  '    <name>John Doe</name>',
  '    <email>john@example.com</email>',
  '    <age>30</age>',
  '  </user>',
  '  <user id="2">',
  '    <name>Jane Smith</name>',
  '    <email>jane@example.com</email>',
  '    <age>25</age>',
  '  </user>',
  '</users>',
].join('\n')

export default function XmlToSqlConverter() {
  const [xmlInput, setXmlInput] = useState<string>(DEFAULT_XMLINPUT)
  const [tableName, setTableName] = useState<string>("users")
  const [sqlType, setSqlType] = useState<string>("insert")
  const [includeDrop, setIncludeDrop] = useState<boolean>(false)
  const [includeCreate, setIncludeCreate] = useState<boolean>(true)
  const [sqlOutput, setSqlOutput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const inferSqlType = (value: string): string => {
    if (/^\d+$/.test(value)) return "INTEGER"
    if (/^\d+\.\d+$/.test(value)) return "DECIMAL"
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return "DATE"
    return "VARCHAR(255)"
  }

  const convertToSql = useCallback(() => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(xmlInput, "text/xml")

      const parseError = doc.querySelector("parsererror")
      if (parseError) {
        throw new Error(parseError.textContent || "Invalid XML")
      }

      const root = doc.documentElement
      const rowElements = Array.from(root.children)

      if (rowElements.length === 0) {
        throw new Error("No data elements found")
      }

      const columns = new Set<string>()
      const columnTypes = new Map<string, string>()

      rowElements.forEach((row) => {
        Array.from(row.children).forEach((col) => {
          columns.add(col.tagName)
          const value = col.textContent?.trim() || ""
          if (!columnTypes.has(col.tagName) || columnTypes.get(col.tagName) === "VARCHAR(255)") {
            columnTypes.set(col.tagName, inferSqlType(value))
          }
        })
      })

      let sql = ""

      if (includeDrop) {
        sql += `DROP TABLE IF EXISTS ${tableName};\n\n`
      }

      if (includeCreate) {
        sql += `CREATE TABLE ${tableName} (\n`
        sql += `  id INTEGER PRIMARY KEY,\n`
        const columnDefs: string[] = []
        columns.forEach((col) => {
          columnDefs.push(`  ${col} ${columnTypes.get(col)}`)
        })
        sql += columnDefs.join(",\n")
        sql += `\n);\n\n`
      }

      if (sqlType === "insert") {
        rowElements.forEach((row) => {
          const idAttr = row.getAttribute("id")
          const id = idAttr || Array.from(rowElements).indexOf(row) + 1
          
          const columnsList = Array.from(columns)
          const values = columnsList.map((col) => {
            const element = row.querySelector(col)
            const value = element?.textContent?.trim() || ""
            const type = columnTypes.get(col) || "VARCHAR(255)"
            
            if (type === "INTEGER" || type === "DECIMAL") {
              return value || "NULL"
            }
            return `'${value.replace(/'/g, "''")}'`
          })

          sql += `INSERT INTO ${tableName} (id, ${columnsList.join(", ")}) VALUES (${id}, ${values.join(", ")});\n`
        })
      } else if (sqlType === "values") {
        const columnsList = Array.from(columns)
        sql += `INSERT INTO ${tableName} (id, ${columnsList.join(", ")}) VALUES\n`
        
        const valueRows: string[] = []
        rowElements.forEach((row, idx) => {
          const idAttr = row.getAttribute("id")
          const id = idAttr || idx + 1
          
          const values = columnsList.map((col) => {
            const element = row.querySelector(col)
            const value = element?.textContent?.trim() || ""
            const type = columnTypes.get(col) || "VARCHAR(255)"
            
            if (type === "INTEGER" || type === "DECIMAL") {
              return value || "NULL"
            }
            return `'${value.replace(/'/g, "''")}'`
          })

          valueRows.push(`  (${id}, ${values.join(", ")})`)
        })

        sql += valueRows.join(",\n")
        sql += `;\n`
      }

      setSqlOutput(sql)
    } catch (err) {
      setSqlOutput(`Error: ${err instanceof Error ? err.message : "Conversion failed"}`)
    }
  }, [xmlInput, tableName, sqlType, includeDrop, includeCreate])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setXmlInput("")
    setSqlOutput("")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* XML Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="xml-input" className="text-base font-medium">XML Input</Label>
          <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
        <Textarea
          id="xml-input"
          value={xmlInput}
          onChange={(e) => setXmlInput(e.target.value)}
          className="font-mono text-sm min-h-[200px]"
          placeholder="Paste your XML here..."
        />
      </section>

      {/* Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="table-name">Table Name</Label>
            <Input
              id="table-name"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="table_name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sql-type">SQL Type</Label>
            <Select value={sqlType} onValueChange={setSqlType}>
              <SelectTrigger id="sql-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="insert">INSERT statements</SelectItem>
                <SelectItem value="values">Single INSERT with VALUES</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="include-drop"
              checked={includeDrop}
              onChange={(e) => setIncludeDrop(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="include-drop" className="text-sm cursor-pointer">Include DROP TABLE</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="include-create"
              checked={includeCreate}
              onChange={(e) => setIncludeCreate(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="include-create" className="text-sm cursor-pointer">Include CREATE TABLE</Label>
          </div>
        </div>

        <Button onClick={convertToSql} disabled={!xmlInput} className="w-full sm:w-auto">
          <Database className="size-4 mr-2" />
          Convert to SQL
        </Button>
      </section>

      {/* SQL Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">SQL Output</Label>
          {sqlOutput && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(sqlOutput, "sql")}
              className="h-7"
            >
              {copied === "sql" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          )}
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 min-h-[200px]">
          {sqlOutput ? (
            <pre className="font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96">{sqlOutput}</pre>
          ) : (
            <p className="text-sm text-muted-foreground">SQL output will appear here...</p>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About XML to SQL Conversion</h4>
            <p className="text-sm text-muted-foreground">
              Convert XML data to SQL INSERT statements. The tool automatically detects columns
              from XML elements and infers data types from values. Generate standard INSERT
              statements or a single INSERT with multiple VALUES. Include CREATE TABLE and
              DROP TABLE statements for complete database setup.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

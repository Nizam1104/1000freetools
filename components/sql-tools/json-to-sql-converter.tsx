"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function JsonToSqlConverter() {
  const [jsonInput, setJsonInput] = useState<string>("")
  const [tableName, setTableName] = useState<string>("data")
  const [copied, setCopied] = useState<string | null>(null)

  const generateSQL = useCallback((json: string, table: string): { sql: string | null; error: string | null } => {
    try {
      const data = JSON.parse(json)
      const items = Array.isArray(data) ? data : [data]

      if (items.length === 0) {
        return { sql: null, error: "No data to convert" }
      }

      const allKeys = new Set<string>()
      items.forEach((item: any) => {
        if (typeof item === "object" && item !== null) {
          Object.keys(item).forEach((key) => allKeys.add(key))
        }
      })

      const keys = Array.from(allKeys)
      if (keys.length === 0) {
        return { sql: null, error: "No valid object properties found" }
      }

      const getColumnValue = (item: any, key: string): string => {
        const value = item[key]
        if (value === null || value === undefined) return "NULL"
        if (typeof value === "boolean") return value ? "TRUE" : "FALSE"
        if (typeof value === "number") return value.toString()
        if (typeof value === "string") {
          const escaped = value.replace(/'/g, "''")
          return `'${escaped}'`
        }
        return `'${JSON.stringify(value).replace(/'/g, "''")}'`
      }

      let sql = `INSERT INTO ${table} (${keys.map((k) => `"${k}"`).join(", ")})\nVALUES\n`

      const valueRows = items.map((item: any) => {
        return `  (${keys.map((k) => getColumnValue(item, k)).join(", ")})`
      })

      sql += valueRows.join(",\n") + ";"

      return { sql, error: null }
    } catch (err) {
      return {
        sql: null,
        error: err instanceof Error ? err.message : "Invalid JSON",
      }
    }
  }, [])

  const conversionResult = useMemo(() => {
    if (!jsonInput.trim()) return { sql: null, error: null }
    return generateSQL(jsonInput, tableName || "data")
  }, [jsonInput, tableName, generateSQL])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">JSON to SQL Converter</h2>
        <p className="text-muted-foreground">
          Convert JSON data to SQL INSERT statements.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="json-input">JSON Input</Label>
            <Textarea
              id="json-input"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="font-mono text-sm min-h-[200px]"
              placeholder='Paste JSON array or object (e.g., [{"name": "John", "age": 30}])...'
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="table-name">Table Name</Label>
            <Input
              id="table-name"
              value={tableName}
              onChange={(e) => setTableName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
              className="font-mono"
              placeholder="table_name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>SQL Output</Label>
            {conversionResult.sql && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(conversionResult.sql!, "sql")}
              >
                {copied === "sql" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-2">Copy SQL</span>
              </Button>
            )}
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 max-h-96 overflow-auto">
            {conversionResult.error ? (
              <p className="text-destructive text-sm">{conversionResult.error}</p>
            ) : (
              <pre className="font-mono text-sm whitespace-pre-wrap">
                {conversionResult.sql || <span className="text-muted-foreground">SQL output will appear here...</span>}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

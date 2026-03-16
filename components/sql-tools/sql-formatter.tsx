"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function SQLFormatter() {
  const [inputSql, setInputSql] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const formatSQL = useCallback((sql: string): string => {
    if (!sql.trim()) return ""

    const keywords = [
      "SELECT", "FROM", "WHERE", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "OUTER",
      "ON", "AND", "OR", "NOT", "IN", "BETWEEN", "LIKE", "IS", "NULL", "ORDER", "BY",
      "ASC", "DESC", "GROUP", "HAVING", "LIMIT", "OFFSET", "UNION", "ALL", "INSERT",
      "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "ALTER", "DROP",
      "INDEX", "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "CONSTRAINT", "DEFAULT",
      "UNIQUE", "CHECK", "AS", "DISTINCT", "COUNT", "SUM", "AVG", "MIN", "MAX",
      "CASE", "WHEN", "THEN", "ELSE", "END", "EXISTS", "CROSS", "NATURAL", "USING"
    ]

    let result = sql.trim()

    // Add newlines before keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, "gi")
      result = result.replace(regex, "\n$1")
    })

    // Add newlines after commas (except in strings)
    result = result.replace(/,/g, ",\n")

    // Format parentheses
    result = result.replace(/\(\s*/g, "(")
    result = result.replace(/\s*\)/g, ")")

    // Add space around operators
    result = result.replace(/\s*(=|<>|!=|<=|>=|<|>)\s*/g, " $1 ")

    // Clean up multiple spaces and newlines
    result = result.replace(/[ \t]+/g, " ")
    result = result.replace(/\n\s*\n/g, "\n")

    // Indent based on parentheses
    const lines = result.split("\n")
    let indent = 0
    const formattedLines: string[] = []

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (!trimmedLine) continue

      // Decrease indent for closing parentheses
      const closeParens = (trimmedLine.match(/\)/g) || []).length
      const openParens = (trimmedLine.match(/\(/g) || []).length

      indent = Math.max(0, indent - closeParens)
      formattedLines.push("  ".repeat(indent) + trimmedLine)
      indent += openParens
    }

    return formattedLines.join("\n")
  }, [])

  const minifySQL = useCallback((sql: string): string => {
    return sql
      .replace(/--.*$/gm, "") // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
      .replace(/\s+/g, " ") // Replace multiple whitespace with single space
      .trim()
  }, [])

  const formattedSQL = useMemo(() => formatSQL(inputSql), [inputSql, formatSQL])
  const minifiedSQL = useMemo(() => minifySQL(inputSql), [inputSql, minifySQL])

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
        <h2 className="text-2xl font-bold">SQL Formatter & Minifier</h2>
        <p className="text-muted-foreground">
          Format SQL queries for readability or minify them for production use.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sql-input">SQL Query</Label>
          <Textarea
            id="sql-input"
            value={inputSql}
            onChange={(e) => setInputSql(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
            placeholder="Paste your SQL query here..."
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => copyToClipboard(formattedSQL, "formatted")}
            disabled={!inputSql.trim()}
          >
            {copied === "formatted" ? <Check className="size-4" /> : <Copy className="size-4" />}
            <span className="ml-2">Copy Formatted</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => copyToClipboard(minifiedSQL, "minified")}
            disabled={!inputSql.trim()}
          >
            {copied === "minified" ? <Check className="size-4" /> : <Copy className="size-4" />}
            <span className="ml-2">Copy Minified</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Formatted SQL</Label>
            <span className="text-xs text-muted-foreground">
              {formattedSQL.split("\n").length} lines
            </span>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 max-h-96 overflow-auto">
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {formattedSQL || <span className="text-muted-foreground">Formatted output will appear here...</span>}
            </pre>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Minified SQL</Label>
            <span className="text-xs text-muted-foreground">
              {minifiedSQL.length} characters
            </span>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 max-h-96 overflow-auto">
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {minifiedSQL || <span className="text-muted-foreground">Minified output will appear here...</span>}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SQLCaseConverter() {
  const [inputSql, setInputSql] = useState<string>("")
  const [caseType, setCaseType] = useState<string>("upper")
  const [copied, setCopied] = useState<string | null>(null)

  const sqlKeywords = [
    "SELECT", "FROM", "WHERE", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "OUTER",
    "ON", "AND", "OR", "NOT", "IN", "BETWEEN", "LIKE", "IS", "NULL", "ORDER", "BY",
    "ASC", "DESC", "GROUP", "HAVING", "LIMIT", "OFFSET", "UNION", "ALL", "INSERT",
    "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "ALTER", "DROP",
    "INDEX", "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "CONSTRAINT", "DEFAULT",
    "UNIQUE", "CHECK", "AS", "DISTINCT", "COUNT", "SUM", "AVG", "MIN", "MAX",
    "CASE", "WHEN", "THEN", "ELSE", "END", "EXISTS", "CROSS", "NATURAL", "USING"
  ]

  const convertCase = useCallback((sql: string, type: string): string => {
    let result = sql

    sqlKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi")
      result = result.replace(regex, (match) => {
        switch (type) {
          case "upper":
            return keyword
          case "lower":
            return keyword.toLowerCase()
          case "proper":
            return keyword.charAt(0) + keyword.slice(1).toLowerCase()
          default:
            return match
        }
      })
    })

    return result
  }, [])

  const convertedSql = useMemo(() => convertCase(inputSql, caseType), [inputSql, caseType, convertCase])

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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">SQL Case Converter</h2>
        <p className="text-muted-foreground">
          Convert SQL keywords to UPPERCASE, lowercase, or Proper Case.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="case-type" className="shrink-0">Case Style:</Label>
          <Select value={caseType} onValueChange={setCaseType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upper">UPPERCASE</SelectItem>
              <SelectItem value="lower">lowercase</SelectItem>
              <SelectItem value="proper">Proper Case</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sql-input">SQL Query</Label>
          <Textarea
            id="sql-input"
            value={inputSql}
            onChange={(e) => setInputSql(e.target.value)}
            className="font-mono text-sm min-h-[150px]"
            placeholder="Paste your SQL query here..."
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Result</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(convertedSql, "result")}
              disabled={!inputSql}
            >
              {copied === "result" ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span className="ml-2">Copy</span>
            </Button>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 min-h-[150px]">
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {convertedSql || <span className="text-muted-foreground">Converted SQL will appear here...</span>}
            </pre>
          </div>
        </div>

        <div className="rounded-lg border bg-background p-4">
          <h3 className="text-sm font-medium mb-2">Keywords Affected</h3>
          <div className="flex flex-wrap gap-1">
            {sqlKeywords.slice(0, 20).map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-0.5 bg-muted rounded text-xs font-mono"
              >
                {caseType === "upper" ? keyword : caseType === "lower" ? keyword.toLowerCase() : keyword.charAt(0) + keyword.slice(1).toLowerCase()}
              </span>
            ))}
            <span className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
              +{sqlKeywords.length - 20} more
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

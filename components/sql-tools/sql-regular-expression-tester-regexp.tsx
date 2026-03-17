"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, TestTube, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SqlRegularExpressionTesterRegexp() {
  const [pattern, setPattern] = useState("")
  const [testString, setTestString] = useState("")
  const [dbType, setDbType] = useState<"mysql" | "postgresql" | "sqlserver" | "oracle">("mysql")
  const [results, setResults] = useState<{ match: boolean; matches: string[]; sql: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)

  const testRegex = useCallback(() => {
    if (!pattern || !testString) {
      setResults(null)
      return
    }

    try {
      const flags = caseSensitive ? "" : "i"
      const regex = new RegExp(pattern, flags)
      const matches = testString.match(regex) || []
      
      let sqlPattern = ""
      let sql = ""

      if (dbType === "mysql") {
        sqlPattern = pattern
        sql = `SELECT '${testString}' REGEXP '${sqlPattern}' AS matches;
-- Or with WHERE clause:
SELECT * FROM table_name 
WHERE column_name REGEXP '${sqlPattern}';`
      } else if (dbType === "postgresql") {
        const operator = caseSensitive ? "~" : "~*"
        sqlPattern = pattern
        sql = `SELECT '${testString}' ${operator} '${sqlPattern}' AS matches;
-- Or with WHERE clause:
SELECT * FROM table_name 
WHERE column_name ${operator} '${sqlPattern}';`
      } else if (dbType === "sqlserver") {
        // SQL Server uses LIKE with patterns
        sqlPattern = pattern.replace(/\./g, '_').replace(/\*/g, '%')
        sql = `-- SQL Server uses PATINDEX or LIKE
SELECT CASE WHEN PATINDEX('%${sqlPattern}', '${testString}') > 0 THEN 1 ELSE 0 END AS matches;
-- Or with WHERE clause:
SELECT * FROM table_name 
WHERE column_name LIKE '%${sqlPattern}%';`
      } else if (dbType === "oracle") {
        sqlPattern = pattern
        sql = `SELECT REGEXP_LIKE('${testString}', '${sqlPattern}'${caseSensitive ? "" : ", 'i'"}) AS matches FROM dual;
-- Or with WHERE clause:
SELECT * FROM table_name 
WHERE REGEXP_LIKE(column_name, '${sqlPattern}'${caseSensitive ? "" : ", 'i'"});`
      }

      setResults({
        match: matches.length > 0,
        matches: [...matches],
        sql
      })
    } catch (error) {
      setResults({
        match: false,
        matches: [],
        sql: `-- Invalid regex pattern: ${error instanceof Error ? error.message : "Unknown error"}`
      })
    }
  }, [pattern, testString, dbType, caseSensitive])

  const handleCopy = useCallback(async () => {
    if (results?.sql) {
      await navigator.clipboard.writeText(results.sql)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [results])

  const handleClear = useCallback(() => {
    setPattern("")
    setTestString("")
    setResults(null)
  }, [])

  const loadExamples = useCallback(() => {
    setPattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
    setTestString("user@example.com")
  }, [])

  const commonPatterns = [
    { name: "Email", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
    { name: "Phone (US)", pattern: "^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$" },
    { name: "URL", pattern: "^https?://[\\w.-]+(?:/[\\w.-]*)*$" },
    { name: "IPv4 Address", pattern: "^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$" },
    { name: "Date (YYYY-MM-DD)", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
    { name: "Alphanumeric", pattern: "^[a-zA-Z0-9]+$" },
    { name: "Numbers Only", pattern: "^\\d+$" },
    { name: "Letters Only", pattern: "^[a-zA-Z]+$" },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL Regular Expression Tester (REGEXP)</h2>
            <p className="text-sm text-muted-foreground">
              Test and generate SQL regular expression patterns
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dbType">Database Type</Label>
          <select
            id="dbType"
            value={dbType}
            onChange={(e) => setDbType(e.target.value as typeof dbType)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="mysql">MySQL (REGEXP)</option>
            <option value="postgresql">PostgreSQL (~ / ~*)</option>
            <option value="sqlserver">SQL Server (PATINDEX/LIKE)</option>
            <option value="oracle">Oracle (REGEXP_LIKE)</option>
          </select>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded border-gray-300"
            />
            Case Sensitive
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pattern">Regular Expression Pattern</Label>
          <div className="flex gap-2">
            <Input
              id="pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="font-mono"
            />
            <Button onClick={loadExamples} variant="outline" size="sm">
              Examples
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="testString">Test String</Label>
          <Textarea
            id="testString"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter string to test against the pattern..."
            className="min-h-[100px] font-mono text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={testRegex} disabled={!pattern || !testString} className="flex-1">
            <TestTube className="h-4 w-4 mr-2" />
            Test Pattern
          </Button>
          <Button variant="outline" onClick={handleClear} title="Clear">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {results && (
        <div className="space-y-4">
          <Alert variant={results.match ? "default" : "destructive"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {results.match 
                ? `Match found! ${results.matches.length} match(es)`
                : "No match found"
              }
            </AlertDescription>
          </Alert>

          {results.matches.length > 0 && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <Label>Matches</Label>
              <div className="flex flex-wrap gap-2">
                {results.matches.map((match, i) => (
                  <span key={i} className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                    {match}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Generated SQL</Label>
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <pre className="p-4 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
              {results.sql}
            </pre>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Label>Common Patterns</Label>
        <div className="grid gap-2 md:grid-cols-2">
          {commonPatterns.map((item) => (
            <Button
              key={item.name}
              variant="outline"
              className="justify-start text-left h-auto py-2 px-3"
              onClick={() => setPattern(item.pattern)}
            >
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground font-mono truncate max-w-[300px]">
                  {item.pattern}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">SQL Regex Syntax by Database</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>MySQL:</strong> <code className="bg-background px-1 rounded">REGEXP</code> or <code className="bg-background px-1 rounded">RLIKE</code></li>
          <li><strong>PostgreSQL:</strong> <code className="bg-background px-1 rounded">~</code> (case-sensitive), <code className="bg-background px-1 rounded">~*</code> (case-insensitive)</li>
          <li><strong>SQL Server:</strong> <code className="bg-background px-1 rounded">PATINDEX</code> or <code className="bg-background px-1 rounded">LIKE</code> with wildcards</li>
          <li><strong>Oracle:</strong> <code className="bg-background px-1 rounded">REGEXP_LIKE</code></li>
        </ul>
      </div>
    </div>
  )
}

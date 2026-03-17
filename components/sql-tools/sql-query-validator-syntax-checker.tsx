"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SqlQueryValidatorSyntaxChecker() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<{ valid: boolean; errors: string[]; warnings: string[] } | null>(null)
  const [copied, setCopied] = useState(false)
  const [dbType, setDbType] = useState<"sqlserver" | "mysql" | "postgresql" | "sqlite">("sqlserver")

  const validateSQL = useCallback((sql: string): { valid: boolean; errors: string[]; warnings: string[] } => {
    const errors: string[] = []
    const warnings: string[] = []
    const lines = sql.split('\n')
    
    // Track SQL structure
    let hasSelect = false
    let hasFrom = false
    let parenCount = 0
    let inString = false
    let stringChar = ''
    let commentBlock = false
    
    const reservedKeywords = new Set([
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER',
      'ON', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'IS', 'NULL',
      'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'ALL',
      'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE',
      'ALTER', 'DROP', 'INDEX', 'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER',
      'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'CONSTRAINT', 'DEFAULT',
      'UNIQUE', 'CHECK', 'CASCADE', 'AS', 'DISTINCT', 'TOP', 'CASE', 'WHEN',
      'THEN', 'ELSE', 'END', 'CAST', 'CONVERT', 'COALESCE', 'NULLIF',
      'EXISTS', 'ANY', 'SOME', 'CROSS', 'FULL', 'NATURAL', 'USING'
    ])

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      const lineNum = i + 1

      // Skip empty lines and comments
      if (!line || line.startsWith('--') || line.startsWith('#')) continue

      // Check for block comments
      if (line.includes('/*')) {
        commentBlock = true
      }
      if (line.includes('*/')) {
        commentBlock = false
        continue
      }
      if (commentBlock) continue

      // Check for SELECT statement
      if (/^SELECT\b/i.test(line)) hasSelect = true
      if (/^FROM\b/i.test(line) || /\sFROM\s/i.test(line)) hasFrom = true

      // Check for unclosed parentheses
      parenCount += (line.match(/\(/g) || []).length
      parenCount -= (line.match(/\)/g) || []).length

      // Check for SELECT without FROM
      if (/^SELECT\b/i.test(line) && !/FROM/i.test(sql)) {
        warnings.push(`Line ${lineNum}: SELECT statement without FROM clause`)
      }

      // Check for SELECT * (potential performance issue)
      if (/SELECT\s+\*/i.test(line)) {
        warnings.push(`Line ${lineNum}: SELECT * may impact performance. Consider specifying columns`)
      }

      // Check for missing WHERE in UPDATE/DELETE
      if (/^UPDATE\b/i.test(line) && !/WHERE/i.test(sql)) {
        warnings.push(`Line ${lineNum}: UPDATE without WHERE clause will affect all rows`)
      }
      if (/^DELETE\b/i.test(line) && !/WHERE/i.test(sql)) {
        warnings.push(`Line ${lineNum}: DELETE without WHERE clause will delete all rows`)
      }

      // Check for potential SQL injection patterns
      if (/CONCAT\s*\([^)]*\+[^)]*\)/i.test(line) || /\+\s*['"][^'"]*['"]/i.test(line)) {
        warnings.push(`Line ${lineNum}: Potential SQL injection risk with string concatenation`)
      }

      // Check for missing semicolon at end of statement
      if (i === lines.length - 1 && !line.endsWith(';') && line.length > 0) {
        warnings.push(`Line ${lineNum}: Statement may be missing semicolon at the end`)
      }

      // Check for unbalanced quotes
      const singleQuotes = (line.match(/'/g) || []).length
      const doubleQuotes = (line.match(/"/g) || []).length
      if (singleQuotes % 2 !== 0) {
        errors.push(`Line ${lineNum}: Unclosed single quote`)
      }
      if (doubleQuotes % 2 !== 0) {
        errors.push(`Line ${lineNum}: Unclosed double quote`)
      }

      // Check for common typos
      if (/SELEC\b/i.test(line)) {
        errors.push(`Line ${lineNum}: Possible typo - did you mean SELECT?`)
      }
      if (/FRO\b/i.test(line) && !/FROM/i.test(line)) {
        errors.push(`Line ${lineNum}: Possible typo - did you mean FROM?`)
      }
      if (/WHER\b/i.test(line) && !/WHERE/i.test(line)) {
        errors.push(`Line ${lineNum}: Possible typo - did you mean WHERE?`)
      }

      // Check for JOIN without ON
      if (/\bJOIN\b/i.test(line) && !/\bON\b/i.test(sql)) {
        warnings.push(`Line ${lineNum}: JOIN without ON clause (may be CROSS JOIN)`)
      }

      // Check for database-specific syntax
      if (dbType === "sqlite") {
        if (/\bTOP\b/i.test(line)) {
          errors.push(`Line ${lineNum}: TOP is not supported in SQLite. Use LIMIT instead`)
        }
      }
      if (dbType === "mysql") {
        if (/\bFULL\s+OUTER\s+JOIN\b/i.test(line)) {
          errors.push(`Line ${lineNum}: FULL OUTER JOIN is not supported in MySQL`)
        }
      }
    }

    // Check for unbalanced parentheses
    if (parenCount !== 0) {
      errors.push(`Unbalanced parentheses: ${parenCount > 0 ? 'Missing closing' : 'Extra closing'} parenthesis`)
    }

    // Check if query has basic structure
    if (sql.trim().length > 0 && !hasSelect && !/^(INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/i.test(sql)) {
      warnings.push("Query doesn't appear to contain a standard SQL statement")
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    }
  }, [dbType])

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setResult(null)
      return
    }
    const validation = validateSQL(input)
    setResult(validation)
  }, [input, validateSQL])

  const handleCopy = useCallback(async () => {
    if (input) {
      await navigator.clipboard.writeText(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [input])

  const handleClear = useCallback(() => {
    setInput("")
    setResult(null)
  }, [])

  const lineCount = input.split('\n').length
  const charCount = input.length

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL Query Validator & Syntax Checker</h2>
            <p className="text-sm text-muted-foreground">
              Validate SQL syntax and check for common errors
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{lineCount} lines</span>
            <span>{charCount} characters</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Label htmlFor="dbType">Database Type:</Label>
        <select
          id="dbType"
          value={dbType}
          onChange={(e) => setDbType(e.target.value as typeof dbType)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="sqlserver">SQL Server</option>
          <option value="mysql">MySQL</option>
          <option value="postgresql">PostgreSQL</option>
          <option value="sqlite">SQLite</option>
        </select>
      </div>

      {result && (
        <Alert variant={result.valid ? "default" : "destructive"}>
          {result.valid ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>
            {result.valid 
              ? `SQL syntax appears valid! ${result.warnings.length > 0 ? `(${result.warnings.length} warnings)` : ''}`
              : `Found ${result.errors.length} error(s)${result.warnings.length > 0 ? ` and ${result.warnings.length} warning(s)` : ''}`
            }
          </AlertDescription>
        </Alert>
      )}

      {result && result.errors.length > 0 && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg space-y-2">
          <h3 className="font-medium text-destructive">Errors</h3>
          <ul className="text-sm text-destructive space-y-1 list-disc list-inside">
            {result.errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {result && result.warnings.length > 0 && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500 rounded-lg space-y-2">
          <h3 className="font-medium text-yellow-600">Warnings</h3>
          <ul className="text-sm text-yellow-600 space-y-1 list-disc list-inside">
            {result.warnings.map((warning, i) => (
              <li key={i}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="input">SQL Query</Label>
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!input} variant="outline" size="sm">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your SQL query here...

-- Example:
SELECT u.id, u.name, o.order_date
FROM Users u
INNER JOIN Orders o ON u.id = o.user_id
WHERE u.active = 1
ORDER BY o.order_date DESC;"
          className="min-h-[500px] font-mono text-sm"
        />

        <div className="flex items-center gap-2">
          <Button onClick={handleValidate} className="flex-1">
            Validate SQL
          </Button>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Validation Checks</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Unbalanced parentheses and quotes</li>
          <li>SELECT * usage (performance warning)</li>
          <li>UPDATE/DELETE without WHERE clause</li>
          <li>Common SQL typos</li>
          <li>Potential SQL injection patterns</li>
          <li>Database-specific syntax compatibility</li>
          <li>Missing semicolons</li>
        </ul>
      </div>
    </div>
  )
}

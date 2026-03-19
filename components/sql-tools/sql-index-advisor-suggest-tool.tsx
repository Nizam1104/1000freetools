"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Check, Trash2, Lightbulb, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface IndexSuggestion {
  table: string
  columns: string[]
  type: "BTREE" | "HASH" | "FULLTEXT" | "SPATIAL"
  reason: string
  priority: "HIGH" | "MEDIUM" | "LOW"
  createStatement: string
}

export function SqlIndexAdvisorSuggestTool() {
  const [query, setQuery] = useState("")
  const [tableSchema, setTableSchema] = useState("")
  const [suggestions, setSuggestions] = useState<IndexSuggestion[]>([])
  const [copied, setCopied] = useState(false)

  const analyzeQuery = useCallback(() => {
    const suggestions: IndexSuggestion[] = []
    const queryLower = query.toLowerCase()

    // Extract table names from FROM clause
    const fromMatch = queryLower.match(/from\s+(\w+)(?:\s+(\w+))?/i)
    const joinMatches = [...queryLower.matchAll(/join\s+(\w+)(?:\s+(\w+))?/gi)]
    
    const tables: { name: string; alias?: string }[] = []
    if (fromMatch) {
      tables.push({ name: fromMatch[1], alias: fromMatch[2] })
    }
    joinMatches.forEach(match => {
      tables.push({ name: match[1], alias: match[2] })
    })

    // Analyze WHERE clause for potential indexes
    const whereMatch = queryLower.match(/where\s+([\s\S]*?)(?:order|group|limit|$)/i)
    if (whereMatch) {
      const whereClause = whereMatch[1]
      
      // Find equality conditions
      const equalityMatches = [...whereClause.matchAll(/(\w+)\s*=\s*/g)]
      equalityMatches.forEach(match => {
        const column = match[1]
        const table = tables[0]?.name || "unknown"
        suggestions.push({
          table,
          columns: [column],
          type: "BTREE",
          reason: `Column "${column}" is used in equality condition (WHERE ${column} =)`,
          priority: "HIGH",
          createStatement: `CREATE INDEX idx_${table}_${column} ON ${table}(${column});`
        })
      })

      // Find range conditions
      const rangeMatches = [...whereClause.matchAll(/(\w+)\s*(?:>|<|>=|<=|between)/gi)]
      rangeMatches.forEach(match => {
        const column = match[1]
        const table = tables[0]?.name || "unknown"
        suggestions.push({
          table,
          columns: [column],
          type: "BTREE",
          reason: `Column "${column}" is used in range condition`,
          priority: "MEDIUM",
          createStatement: `CREATE INDEX idx_${table}_${column} ON ${table}(${column});`
        })
      })

      // Find LIKE conditions
      const likeMatches = [...whereClause.matchAll(/(\w+)\s+like\s+/gi)]
      likeMatches.forEach(match => {
        const column = match[1]
        const table = tables[0]?.name || "unknown"
        suggestions.push({
          table,
          columns: [column],
          type: "FULLTEXT",
          reason: `Column "${column}" is used in LIKE pattern matching`,
          priority: "MEDIUM",
          createStatement: `CREATE FULLTEXT INDEX idx_${table}_${column} ON ${table}(${column});`
        })
      })

      // Find IN conditions
      const inMatches = [...whereClause.matchAll(/(\w+)\s+in\s*\(/gi)]
      inMatches.forEach(match => {
        const column = match[1]
        const table = tables[0]?.name || "unknown"
        suggestions.push({
          table,
          columns: [column],
          type: "BTREE",
          reason: `Column "${column}" is used in IN clause`,
          priority: "MEDIUM",
          createStatement: `CREATE INDEX idx_${table}_${column} ON ${table}(${column});`
        })
      })
    }

    // Analyze JOIN conditions
    joinMatches.forEach((joinMatch, index) => {
      const onMatch = queryLower.match(new RegExp(`join\\s+${joinMatch[1]}[^o]*on\\s+(\\w+)\\.(\\w+)\\s*=\\s*(\\w+)\\.(\\w+)`, 'i'))
      if (onMatch) {
        const leftTable = onMatch[1]
        const leftColumn = onMatch[2]
        const rightTable = onMatch[3]
        const rightColumn = onMatch[4]
        
        suggestions.push({
          table: leftTable,
          columns: [leftColumn],
          type: "BTREE",
          reason: `Column "${leftColumn}" is used in JOIN condition`,
          priority: "HIGH",
          createStatement: `CREATE INDEX idx_${leftTable}_${leftColumn} ON ${leftTable}(${leftColumn});`
        })
        
        suggestions.push({
          table: rightTable,
          columns: [rightColumn],
          type: "BTREE",
          reason: `Column "${rightColumn}" is used in JOIN condition`,
          priority: "HIGH",
          createStatement: `CREATE INDEX idx_${rightTable}_${rightColumn} ON ${rightTable}(${rightColumn});`
        })
      }
    })

    // Analyze ORDER BY clause
    const orderByMatch = queryLower.match(/order\s+by\s+([\s\S]*?)(?:limit|$)/i)
    if (orderByMatch) {
      const orderByClause = orderByMatch[1]
      const orderColumns = orderByClause.split(',').map(s => s.trim().split(/\s+/)[0])
      
      orderColumns.forEach(column => {
        const table = tables[0]?.name || "unknown"
        suggestions.push({
          table,
          columns: [column],
          type: "BTREE",
          reason: `Column "${column}" is used in ORDER BY clause`,
          priority: "MEDIUM",
          createStatement: `CREATE INDEX idx_${table}_${column} ON ${table}(${column});`
        })
      })
    }

    // Analyze GROUP BY clause
    const groupByMatch = queryLower.match(/group\s+by\s+([\s\S]*?)(?:having|order|limit|$)/i)
    if (groupByMatch) {
      const groupByClause = groupByMatch[1]
      const groupColumns = groupByClause.split(',').map(s => s.trim())
      
      if (groupColumns.length > 1) {
        const table = tables[0]?.name || "unknown"
        suggestions.push({
          table,
          columns: groupColumns,
          type: "BTREE",
          reason: `Columns ${groupColumns.join(", ")} are used together in GROUP BY - consider composite index`,
          priority: "HIGH",
          createStatement: `CREATE INDEX idx_${table}_${groupColumns.join("_")} ON ${table}(${groupColumns.join(", ")});`
        })
      }
    }

    // Analyze table schema if provided
    if (tableSchema.trim()) {
      const schemaLines = tableSchema.split('\n').filter(l => l.trim())
      const columns: string[] = []
      
      schemaLines.forEach(line => {
        const colMatch = line.match(/^\s*(\w+)\s+(?:int|varchar|text|char|bigint|smallint|integer)/i)
        if (colMatch) {
          columns.push(colMatch[1])
        }
      })

      // Check for primary key
      const pkMatch = tableSchema.match(/primary\s+key\s*\(([^)]+)\)/i)
      if (pkMatch) {
        const pkColumns = pkMatch[1].split(',').map(c => c.trim())
        // Primary key already has an index
      }

      // Check for existing indexes
      const existingIndexMatches = [...tableSchema.matchAll(/(?:index|key)\s+(\w+)\s*\(([^)]+)\)/gi)]
      const existingIndexes = existingIndexMatches.map(m => ({
        name: m[1],
        columns: m[2].split(',').map(c => c.trim())
      }))

      // Filter out suggestions for already indexed columns
      const filteredSuggestions = suggestions.filter(s => {
        return !existingIndexes.some(idx => 
          idx.columns.some(col => s.columns.includes(col))
        )
      })

      setSuggestions([...filteredSuggestions])
    } else {
      setSuggestions(suggestions)
    }
  }, [query, tableSchema])

  const handleCopy = useCallback(async (sql: string) => {
    if (sql) {
      await navigator.clipboard.writeText(sql)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [])

  const handleClear = useCallback(() => {
    setQuery("")
    setTableSchema("")
    setSuggestions([])
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH": return "bg-red-500"
      case "MEDIUM": return "bg-yellow-500"
      case "LOW": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL Index Advisor</h2>
            <p className="text-sm text-muted-foreground">
              Analyze queries and get index recommendations for better performance
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query">SQL Query</Label>
            <Textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SELECT * FROM users WHERE email = 'test@example.com' ORDER BY created_at"
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="schema">Table Schema (Optional)</Label>
            <Textarea
              id="schema"
              value={tableSchema}
              onChange={(e) => setTableSchema(e.target.value)}
              placeholder={`CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(100),
  created_at TIMESTAMP,
  INDEX idx_email (email)
);`}
              className="min-h-[150px] font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={analyzeQuery} disabled={!query} className="flex-1">
              <Lightbulb className="h-4 w-4 mr-2" />
              Analyze & Suggest Indexes
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Index Recommendations</Label>
          
          {suggestions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground border rounded-lg">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              <p>No suggestions yet. Enter a SQL query to analyze.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.map((suggestion, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-white text-xs ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.priority}
                      </span>
                      <span className="font-medium">{suggestion.table}.{suggestion.columns.join(", ")}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{suggestion.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                  <div className="flex items-center justify-between bg-muted p-2 rounded">
                    <code className="text-xs font-mono">{suggestion.createStatement}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(suggestion.createStatement)}
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Index Types</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>BTREE:</strong> Default index type, good for equality and range queries</li>
          <li><strong>HASH:</strong> Fast for exact match lookups, not suitable for range queries</li>
          <li><strong>FULLTEXT:</strong> For text search and LIKE pattern matching</li>
          <li><strong>SPATIAL:</strong> For geographic/spatial data types</li>
        </ul>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Index recommendations are based on query analysis. Always test indexes in your environment and consider existing indexes, table size, and write patterns before creating new indexes.
        </AlertDescription>
      </Alert>
    </div>
  )
}

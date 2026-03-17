"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Scissors } from "lucide-react"

interface Token {
  type: "KEYWORD" | "IDENTIFIER" | "OPERATOR" | "LITERAL" | "PUNCTUATION" | "WHITESPACE" | "COMMENT"
  value: string
  position: number
}

export function SqlQueryParserTokenizer() {
  const [input, setInput] = useState("")
  const [tokens, setTokens] = useState<Token[]>([])
  const [copied, setCopied] = useState(false)
  const [outputFormat, setOutputFormat] = useState<"table" | "json" | "csv">("table")

  const tokenize = useCallback((sql: string): Token[] => {
    const tokens: Token[] = []
    const keywords = new Set([
      'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'IS', 'NULL',
      'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'INTERSECT', 'EXCEPT',
      'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP',
      'INDEX', 'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES',
      'CONSTRAINT', 'DEFAULT', 'UNIQUE', 'CHECK', 'CASCADE', 'AS', 'DISTINCT', 'TOP', 'CASE',
      'WHEN', 'THEN', 'ELSE', 'END', 'CAST', 'CONVERT', 'COALESCE', 'NULLIF', 'EXISTS', 'ANY',
      'SOME', 'CROSS', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL', 'NATURAL', 'USING',
      'ON', 'ASC', 'DESC', 'NULLS', 'FIRST', 'LAST', 'WITH', 'RECURSIVE', 'RETURNING'
    ])

    const operators = new Set(['=', '!=', '<>', '<', '>', '<=', '>=', '+', '-', '*', '/', '%', '||', '&&', '!', '~'])

    let i = 0
    while (i < sql.length) {
      const start = i
      const char = sql[i]

      // Whitespace
      if (/\s/.test(char)) {
        let value = ""
        while (i < sql.length && /\s/.test(sql[i])) {
          value += sql[i]
          i++
        }
        tokens.push({ type: "WHITESPACE", value, position: start })
        continue
      }

      // Single-line comment
      if (char === '-' && sql[i + 1] === '-') {
        let value = ""
        while (i < sql.length && sql[i] !== '\n') {
          value += sql[i]
          i++
        }
        tokens.push({ type: "COMMENT", value, position: start })
        continue
      }

      // Multi-line comment
      if (char === '/' && sql[i + 1] === '*') {
        let value = "/*"
        i += 2
        while (i < sql.length && !(sql[i] === '*' && sql[i + 1] === '/')) {
          value += sql[i]
          i++
        }
        if (i < sql.length) {
          value += '*/'
          i += 2
        }
        tokens.push({ type: "COMMENT", value, position: start })
        continue
      }

      // String literal
      if (char === "'" || char === '"') {
        const quote = char
        let value = char
        i++
        while (i < sql.length && sql[i] !== quote) {
          if (sql[i] === '\\' && i + 1 < sql.length) {
            value += sql[i] + sql[i + 1]
            i += 2
          } else {
            value += sql[i]
            i++
          }
        }
        if (i < sql.length) {
          value += sql[i]
          i++
        }
        tokens.push({ type: "LITERAL", value, position: start })
        continue
      }

      // Number literal
      if (/\d/.test(char) || (char === '.' && /\d/.test(sql[i + 1]))) {
        let value = ""
        while (i < sql.length && /[\d.]/.test(sql[i])) {
          value += sql[i]
          i++
        }
        tokens.push({ type: "LITERAL", value, position: start })
        continue
      }

      // Identifier or keyword
      if (/[a-zA-Z_]/.test(char)) {
        let value = ""
        while (i < sql.length && /[a-zA-Z0-9_]/.test(sql[i])) {
          value += sql[i]
          i++
        }
        const upperValue = value.toUpperCase()
        tokens.push({
          type: keywords.has(upperValue) ? "KEYWORD" : "IDENTIFIER",
          value,
          position: start
        })
        continue
      }

      // Operators and punctuation
      if (operators.has(char) || char === '(' || char === ')' || char === ',' || char === ';' || char === '.') {
        let value = char
        // Check for multi-character operators
        if (i + 1 < sql.length) {
          const twoChar = char + sql[i + 1]
          if (operators.has(twoChar)) {
            value = twoChar
            i++
          }
        }
        tokens.push({
          type: operators.has(value) ? "OPERATOR" : "PUNCTUATION",
          value,
          position: start
        })
        i++
        continue
      }

      // Unknown character
      tokens.push({ type: "IDENTIFIER", value: char, position: start })
      i++
    }

    return tokens
  }, [])

  const handleParse = useCallback(() => {
    if (!input.trim()) {
      setTokens([])
      return
    }
    const result = tokenize(input)
    setTokens(result)
  }, [input, tokenize])

  const handleCopy = useCallback(async () => {
    if (tokens.length > 0) {
      let text = ""
      if (outputFormat === "json") {
        text = JSON.stringify(tokens, null, 2)
      } else if (outputFormat === "csv") {
        text = "type,value,position\n" + tokens.map(t => `${t.type},"${t.value.replace(/"/g, '""')}",${t.position}`).join('\n')
      } else {
        text = tokens.map(t => `[${t.type}] ${t.value}`).join('\n')
      }
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [tokens, outputFormat])

  const handleClear = useCallback(() => {
    setInput("")
    setTokens([])
  }, [])

  const getTokenColor = (type: string): string => {
    switch (type) {
      case "KEYWORD": return "text-blue-600 font-semibold"
      case "IDENTIFIER": return "text-gray-800"
      case "OPERATOR": return "text-purple-600"
      case "LITERAL": return "text-green-600"
      case "PUNCTUATION": return "text-gray-600"
      case "WHITESPACE": return "text-gray-300"
      case "COMMENT": return "text-gray-400 italic"
      default: return "text-gray-800"
    }
  }

  const getTokenStats = () => {
    const stats = {
      keywords: tokens.filter(t => t.type === "KEYWORD").length,
      identifiers: tokens.filter(t => t.type === "IDENTIFIER").length,
      operators: tokens.filter(t => t.type === "OPERATOR").length,
      literals: tokens.filter(t => t.type === "LITERAL").length,
      total: tokens.length
    }
    return stats
  }

  const stats = getTokenStats()

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">SQL Query Parser & Tokenizer</h2>
            <p className="text-sm text-muted-foreground">
              Parse SQL queries into tokens for analysis and processing
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="input">SQL Query</Label>
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={tokens.length === 0} variant="outline" size="sm">
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
          placeholder="SELECT u.id, u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id WHERE u.active = 1"
          className="min-h-[200px] font-mono text-sm"
        />

        <div className="flex items-center gap-4">
          <Button onClick={handleParse} disabled={!input} className="flex-1">
            <Scissors className="h-4 w-4 mr-2" />
            Tokenize Query
          </Button>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as typeof outputFormat)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="table">Table View</option>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </div>
      </div>

      {tokens.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.keywords}</div>
              <div className="text-xs text-muted-foreground">Keywords</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.identifiers}</div>
              <div className="text-xs text-muted-foreground">Identifiers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.operators}</div>
              <div className="text-xs text-muted-foreground">Operators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.literals}</div>
              <div className="text-xs text-muted-foreground">Literals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total Tokens</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tokenized Output</Label>
            
            {outputFormat === "table" && (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left">#</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Value</th>
                      <th className="px-4 py-2 text-left">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-4 py-2 text-muted-foreground">{i}</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-muted rounded text-xs font-mono">{token.type}</span>
                        </td>
                        <td className={`px-4 py-2 font-mono ${getTokenColor(token.type)}`}>
                          {token.value}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">{token.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {outputFormat === "json" && (
              <pre className="p-4 bg-muted rounded-lg text-sm font-mono overflow-x-auto max-h-[500px] overflow-y-auto">
                {JSON.stringify(tokens, null, 2)}
              </pre>
            )}

            {outputFormat === "csv" && (
              <pre className="p-4 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                {"type,value,position\n" + tokens.map(t => `${t.type},"${t.value.replace(/"/g, '""')}",${t.position}`).join('\n')}
              </pre>
            )}
          </div>

          <div className="p-4 border rounded-lg">
            <Label>Highlighted Query</Label>
            <div className="mt-2 p-4 bg-muted rounded-lg font-mono text-sm whitespace-pre-wrap">
              {tokens.map((token, i) => (
                <span key={i} className={getTokenColor(token.type)}>
                  {token.value}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

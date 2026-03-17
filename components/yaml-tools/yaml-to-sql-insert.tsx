"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Database } from "lucide-react"

export function YamlToSqlInsert() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [tableName, setTableName] = useState("data")
  const [batchSize, setBatchSize] = useState(10)
  const [useBatchInsert, setUseBatchInsert] = useState(true)

  const parseYamlToList = useCallback((yaml: string): Array<Record<string, any>> => {
    const lines = yaml.split('\n')
    const items: Array<Record<string, any>> = []
    let currentItem: Record<string, any> = {}
    let currentKey = ""

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const indent = line.search(/\S/)

      // New list item
      if (trimmed.startsWith('- ')) {
        if (Object.keys(currentItem).length > 0) {
          items.push(currentItem)
        }
        currentItem = {}
        
        const content = trimmed.substring(2)
        if (content.includes(':')) {
          const [key, ...valParts] = content.split(':')
          currentItem[key.trim()] = parseValue(valParts.join(':').trim())
          currentKey = key.trim()
        } else {
          currentItem['value'] = parseValue(content)
        }
      } else if (trimmed.includes(':')) {
        const [key, ...valParts] = trimmed.split(':')
        const value = valParts.join(':').trim()
        currentItem[key.trim()] = parseValue(value)
        currentKey = key.trim()
      }
    }

    if (Object.keys(currentItem).length > 0) {
      items.push(currentItem)
    }

    return items
  }, [])

  const parseValue = (value: string): any => {
    if (value === 'null' || value === '~') return null
    if (value === 'true' || value === 'True' || value === 'TRUE') return true
    if (value === 'false' || value === 'False' || value === 'FALSE') return false
    if (/^-?\d+$/.test(value)) return parseInt(value, 10)
    if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value)
    
    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      return value.slice(1, -1)
    }
    
    return value
  }

  const escapeSql = useCallback((value: any): string => {
    if (value === null || value === undefined) {
      return 'NULL'
    }
    
    if (typeof value === 'boolean') {
      return value ? 'TRUE' : 'FALSE'
    }
    
    if (typeof value === 'number') {
      return String(value)
    }
    
    // String - escape single quotes
    const escaped = String(value).replace(/'/g, "''")
    return `'${escaped}'`
  }, [])

  const convertToSql = useCallback((yaml: string): string => {
    const items = parseYamlToList(yaml)
    
    if (items.length === 0) {
      return "-- No valid YAML data to convert"
    }

    // Get all unique keys
    const allKeys = Array.from(new Set(items.flatMap(item => Object.keys(item))))
    
    if (allKeys.length === 0) {
      return "-- No keys found in YAML data"
    }

    const sqlLines: string[] = []
    sqlLines.push(`-- SQL INSERT statements for table: ${tableName}`)
    sqlLines.push(`-- Generated from YAML data`)
    sqlLines.push('')

    if (useBatchInsert) {
      // Batch insert format
      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize)
        sqlLines.push(`INSERT INTO ${tableName} (${allKeys.join(', ')}) VALUES`)
        
        const valueRows = batch.map(item => {
          const values = allKeys.map(key => escapeSql(item[key]))
          return `  (${values.join(', ')})`
        })
        
        sqlLines.push(valueRows.join(',\n') + ';')
        sqlLines.push('')
      }
    } else {
      // Individual inserts
      items.forEach(item => {
        const values = allKeys.map(key => escapeSql(item[key]))
        sqlLines.push(`INSERT INTO ${tableName} (${allKeys.join(', ')}) VALUES (${values.join(', ')});`)
      })
    }

    return sqlLines.join('\n')
  }, [parseYamlToList, tableName, batchSize, useBatchInsert, escapeSql])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const sql = convertToSql(input)
    setOutput(sql)
  }, [input, convertToSql])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/sql" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "inserts.sql"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`- name: John Doe
  age: 30
  email: john@example.com
- name: Jane Smith
  age: 25
  email: jane@example.com
- name: Bob Johnson
  age: 35
  email: bob@example.com`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML to SQL INSERT</h2>
            <p className="text-sm text-muted-foreground">
              Convert YAML data to SQL INSERT statements
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Table Name:</Label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-32"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={useBatchInsert}
            onChange={(e) => setUseBatchInsert(e.target.checked)}
            className="rounded border-gray-300"
          />
          Use Batch INSERT
        </label>

        {useBatchInsert && (
          <div className="flex items-center gap-2">
            <Label>Batch Size:</Label>
            <input
              type="number"
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              min={1}
              max={1000}
              className="border rounded px-2 py-1 text-sm w-20"
            />
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">YAML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML list here...

- name: John
  age: 30
- name: Jane
  age: 25"
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <Database className="h-4 w-4 mr-2" />
              Generate SQL
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">SQL Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="SQL INSERT statements will appear here..."
            className="min-h-[500px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function TomlToCsvConverter() {
  const [tomlInput, setTomlInput] = useState('')
  const [csvOutput, setCsvOutput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [copied, setCopied] = useState(false)

  const convertToCsv = () => {
    try {
      const parsed = toml.parse(tomlInput)
      const csvString = jsonToCsv(parsed, delimiter)
      setCsvOutput(csvString)
      toast.success('Successfully converted TOML to CSV')
    } catch (err) {
      toast.error('Invalid TOML. Please check your input.')
    }
  }

  const jsonToCsv = (obj: any, delimiter: string): string => {
    const rows: string[] = []
    const headers = new Set<string>()
    const dataRows: any[] = []

    // Find array of tables
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
        // This is an array of tables - perfect for CSV
        headers.clear()
        dataRows.length = 0

        for (const item of value) {
          const flatRow = flattenObject(item)
          dataRows.push(flatRow)
          Object.keys(flatRow).forEach(k => headers.add(k))
        }

        if (headers.size > 0) {
          const headerArray = Array.from(headers)
          rows.push(headerArray.join(delimiter))

          for (const row of dataRows) {
            const values = headerArray.map(h => {
              const val = row[h]
              if (val === null || val === undefined) return ''
              if (typeof val === 'object') return JSON.stringify(val)
              if (String(val).includes(delimiter) || String(val).includes('"')) {
                return `"${String(val).replace(/"/g, '""')}"`
              }
              return String(val)
            })
            rows.push(values.join(delimiter))
          }

          return rows.join('\n')
        }
      }
    }

    // If no array of tables found, flatten the entire object
    const flatObj = flattenObject(obj)
    const keys = Object.keys(flatObj)
    
    rows.push(keys.join(delimiter))
    rows.push(keys.map(k => {
      const val = flatObj[k]
      if (val === null || val === undefined) return ''
      if (typeof val === 'object') return JSON.stringify(val)
      if (String(val).includes(delimiter) || String(val).includes('"')) {
        return `"${String(val).replace(/"/g, '""')}"`
      }
      return String(val)
    }).join(delimiter))

    return rows.join('\n')
  }

  const flattenObject = (obj: any, prefix = ''): any => {
    const result: any = {}
    
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value, newKey))
      } else {
        result[newKey] = value
      }
    }
    
    return result
  }

  const handleCopy = async () => {
    if (!csvOutput) return
    try {
      await navigator.clipboard.writeText(csvOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!csvOutput) return
    const blob = new Blob([csvOutput], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded data.csv')
  }

  const handleClear = () => {
    setTomlInput('')
    setCsvOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Convert TOML Arrays to CSV</h1>
        <p className="text-muted-foreground mt-2">
          Export TOML array-of-tables data to CSV for use in spreadsheets or data analysis.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="toml-input" className="text-base font-medium">TOML Input</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="toml-input"
            placeholder={`[[users]]
name = "John"
age = 30
email = "john@example.com"

[[users]]
name = "Jane"
age = 25
email = "jane@example.com"`}
            value={tomlInput}
            onChange={(e) => setTomlInput(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="space-y-2">
            <Label>Delimiter:</Label>
            <div className="flex gap-2">
              <Button
                variant={delimiter === ',' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDelimiter(',')}
              >
                Comma (,)
              </Button>
              <Button
                variant={delimiter === '\t' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDelimiter('\t')}
              >
                Tab
              </Button>
              <Button
                variant={delimiter === ';' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDelimiter(';')}
              >
                Semicolon (;)
              </Button>
            </div>
          </div>
          <Button onClick={convertToCsv} className="w-full">
            Convert to CSV
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">CSV Output</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!csvOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!csvOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {csvOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{csvOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">CSV output will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

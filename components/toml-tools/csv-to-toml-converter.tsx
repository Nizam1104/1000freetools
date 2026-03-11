'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function CsvToTomlConverter() {
  const [csvInput, setCsvInput] = useState('')
  const [tomlOutput, setTomlOutput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [tableName, setTableName] = useState('data')
  const [copied, setCopied] = useState(false)

  const convertToToml = () => {
    try {
      const parsed = parseCsv(csvInput, delimiter)
      const tomlString = jsonToToml(parsed, tableName)
      setTomlOutput(tomlString)
      toast.success('Successfully converted CSV to TOML')
    } catch (err) {
      toast.error('Invalid CSV. Please check your input.')
    }
  }

  const parseCsv = (csv: string, delimiter: string): any[] => {
    const lines = csv.split('\n').filter(line => line.trim() !== '')
    if (lines.length === 0) return []

    const headers = parseLine(lines[0], delimiter)
    const data: any[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i], delimiter)
      const row: any = {}
      
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j].trim()
        let value = values[j] ? values[j].trim() : ''
        
        // Remove quotes
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1).replace(/""/g, '"')
        }
        
        // Type inference
        if (value.toLowerCase() === 'true') {
          row[header] = 'true'
        } else if (value.toLowerCase() === 'false') {
          row[header] = 'false'
        } else if (!isNaN(Number(value)) && value !== '') {
          row[header] = String(Number(value))
        } else {
          row[header] = value
        }
      }
      
      data.push(row)
    }

    return data
  }

  const parseLine = (line: string, delimiter: string): string[] => {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === delimiter && !inQuotes) {
        result.push(current)
        current = ''
      } else {
        current += char
      }
    }
    
    result.push(current)
    return result
  }

  const jsonToToml = (data: any[], tableName: string): string => {
    if (!Array.isArray(data) || data.length === 0) {
      return ''
    }

    let result = ''
    
    for (const item of data) {
      result += `[[${tableName}]]\n`
      for (const [key, value] of Object.entries(item)) {
        result += `${key} = ${formatValue(value)}\n`
      }
      result += '\n'
    }

    return result.trim()
  }

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'null'
    if (typeof value === 'boolean') return value ? 'true' : 'false'
    if (typeof value === 'number') return value.toString()
    if (typeof value === 'string') {
      return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
    }
    return '""'
  }

  const handleCopy = async () => {
    if (!tomlOutput) return
    try {
      await navigator.clipboard.writeText(tomlOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!tomlOutput) return
    const blob = new Blob([tomlOutput], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.toml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded data.toml')
  }

  const handleClear = () => {
    setCsvInput('')
    setTomlOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Convert CSV to TOML Array of Tables</h1>
        <p className="text-muted-foreground mt-2">
          Transform CSV spreadsheet data into TOML array of tables format.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="csv-input" className="text-base font-medium">CSV Input</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="csv-input"
            placeholder={`name,age,email
John,30,john@example.com
Jane,25,jane@example.com`}
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
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

          <div className="space-y-2">
            <Label htmlFor="table-name">Table Name:</Label>
            <input
              id="table-name"
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <Button onClick={convertToToml} className="w-full">
            Convert to TOML
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">TOML Output</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!tomlOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!tomlOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {tomlOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{tomlOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">TOML output will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

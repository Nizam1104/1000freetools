'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptCsvJsonConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'csvToJson' | 'jsonToCsv'>('csvToJson')
  const [delimiter, setDelimiter] = useState(',')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      if (mode === 'csvToJson') {
        const json = csvToJson(input, delimiter)
        setOutput(JSON.stringify(json, null, 2))
        toast.success('Converted to JSON')
      } else {
        const csv = jsonToCsv(input, delimiter)
        setOutput(csv)
        toast.success('Converted to CSV')
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Conversion failed')
      setOutput('')
    }
  }

  const csvToJson = (csv: string, delim: string): any[] => {
    const lines = csv.split('\n').filter(line => line.trim() !== '')
    if (lines.length === 0) return []

    const headers = parseLine(lines[0], delim)
    const result = []

    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i], delim)
      const obj: any = {}
      
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j].trim()
        let value = values[j] ? values[j].trim() : ''
        
        // Remove quotes
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1).replace(/""/g, '"')
        }
        
        // Type inference
        if (value.toLowerCase() === 'true') {
          value = true as any
        } else if (value.toLowerCase() === 'false') {
          value = false as any
        } else if (!isNaN(Number(value)) && value !== '') {
          value = Number(value) as any
        }
        
        obj[header] = value
      }
      
      result.push(obj)
    }

    return result
  }

  const parseLine = (line: string, delim: string): string[] => {
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
      } else if (char === delim && !inQuotes) {
        result.push(current)
        current = ''
      } else {
        current += char
      }
    }
    
    result.push(current)
    return result
  }

  const jsonToCsv = (jsonStr: string, delim: string): string => {
    const data = JSON.parse(jsonStr)
    if (!Array.isArray(data)) {
      throw new Error('JSON must be an array of objects')
    }
    if (data.length === 0) return ''

    // Get all unique headers
    const headers = new Set<string>()
    data.forEach(obj => {
      Object.keys(obj).forEach(key => headers.add(key))
    })
    const headerArray = Array.from(headers)

    const rows = [headerArray.join(delim)]

    for (const obj of data) {
      const values = headerArray.map(header => {
        const value = obj[header]
        if (value === null || value === undefined) return ''
        if (typeof value === 'object') return JSON.stringify(value)
        const str = String(value)
        if (str.includes(delim) || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      })
      rows.push(values.join(delim))
    }

    return rows.join('\n')
  }

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!output) return
    const blob = new Blob([output], { type: mode === 'csvToJson' ? 'application/json' : 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = mode === 'csvToJson' ? 'output.json' : 'output.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${mode === 'csvToJson' ? 'output.json' : 'output.csv'}`)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Convert CSV to JSON and JSON to CSV</h2>
        <p className="text-muted-foreground mt-2">
          Transform your data between CSV and JSON formats seamlessly with custom delimiters.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input" className="text-base font-medium">
              {mode === 'csvToJson' ? 'CSV Input' : 'JSON Input'}
            </Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="input"
            placeholder={mode === 'csvToJson' 
              ? 'name,age,city\nJohn,30,New York\nJane,25,Los Angeles' 
              : '[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
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

          <div className="flex gap-2">
            <Button
              variant={mode === 'csvToJson' ? 'default' : 'outline'}
              onClick={() => setMode('csvToJson')}
              className="flex-1"
            >
              CSV to JSON
            </Button>
            <Button
              variant={mode === 'jsonToCsv' ? 'default' : 'outline'}
              onClick={() => setMode('jsonToCsv')}
              className="flex-1"
            >
              JSON to CSV
            </Button>
          </div>

          <Button onClick={convert} className="w-full">
            Convert
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === 'csvToJson' ? 'JSON Output' : 'CSV Output'}
            </Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!output}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {output ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Output will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

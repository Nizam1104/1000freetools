'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelColumnSplitter() {
  const [csvData, setCsvData] = useState('')
  const [result, setResult] = useState('')
  const [columnToSplit, setColumnToSplit] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [customDelimiter, setCustomDelimiter] = useState('')
  const [copied, setCopied] = useState(false)

  const parseCSV = (csv: string): { headers: string[]; rows: string[][] } => {
    const lines = csv.trim().split('\n').filter(line => line.trim())
    if (lines.length === 0) return { headers: [], rows: [] }
    
    const parseLine = (line: string) => {
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
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      result.push(current.trim())
      return result
    }
    
    const headers = parseLine(lines[0])
    const rows = lines.slice(1).map(parseLine)
    return { headers, rows }
  }

  const splitColumn = () => {
    try {
      const { headers, rows } = parseCSV(csvData)
      
      const splitDelim = customDelimiter || delimiter
      const columnIndex = headers.indexOf(columnToSplit)
      
      if (columnIndex === -1) {
        toast.error('Selected column not found')
        return
      }
      
      // Split the selected column and create new headers
      const firstRow = rows[0]
      if (!firstRow) {
        toast.error('No data rows found')
        return
      }
      
      const splitValues = firstRow[columnIndex].split(splitDelim)
      const newHeaders = splitValues.map((_, i) => `${columnToSplit}_${i + 1}`)
      
      // Create new header row
      const newHeaderRow = [
        ...headers.slice(0, columnIndex),
        ...newHeaders,
        ...headers.slice(columnIndex + 1)
      ]
      
      // Process data rows
      const newRows = rows.map(row => {
        const cellValue = row[columnIndex] || ''
        const splitCells = cellValue.split(splitDelim)
        
        // Pad split cells if needed
        while (splitCells.length < newHeaders.length) {
          splitCells.push('')
        }
        
        return [
          ...row.slice(0, columnIndex),
          ...splitCells,
          ...row.slice(columnIndex + 1)
        ]
      })
      
      const output = [
        newHeaderRow.join(','),
        ...newRows.map(row => row.join(','))
      ].join('\n')
      
      setResult(output)
      toast.success(`Column "${columnToSplit}" split into ${newHeaders.length} columns`)
    } catch (err) {
      toast.error('Failed to split column')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setCsvData(content)
      toast.success(`Loaded ${file.name}`)
    }
    reader.readAsText(file)
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!result) return
    const blob = new Blob([result], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'split_columns.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded split_columns.csv')
  }

  const handleClear = () => {
    setCsvData('')
    setResult('')
    setColumnToSplit('')
  }

  const headers = csvData.trim().split('\n')[0]?.split(',').map(h => h.trim()) || []

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Split One Excel Column into Multiple Columns</h1>
        <p className="text-muted-foreground mt-2">
          Split data in a single column into multiple columns based on a delimiter.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="csv-input" className="text-base font-medium">CSV Data Input</Label>
            <div className="flex gap-2">
              <label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".csv,.txt"
                />
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <FileUp className="h-4 w-4 mr-2" />
                    Upload
                  </span>
                </Button>
              </label>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
          <Textarea
            id="csv-input"
            placeholder="name,fullName,email
1,John Doe,john@example.com
2,Jane Smith,jane@example.com"
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="min-h-[250px] font-mono text-sm"
          />
          
          <div className="space-y-2">
            <Label>Column to Split:</Label>
            <select
              value={columnToSplit}
              onChange={(e) => setColumnToSplit(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select a column</option>
              {headers.map((header) => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Split By Delimiter:</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={delimiter === ' ' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDelimiter(' ')}
              >
                Space
              </Button>
              <Button
                variant={delimiter === ',' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDelimiter(',')}
              >
                Comma
              </Button>
              <Button
                variant={delimiter === '-' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDelimiter('-')}
              >
                Dash
              </Button>
              <Button
                variant={delimiter === '_' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDelimiter('_')}
              >
                Underscore
              </Button>
              <Input
                placeholder="Custom"
                value={customDelimiter}
                onChange={(e) => setCustomDelimiter(e.target.value)}
                className="w-24"
              />
            </div>
          </div>

          <Button onClick={splitColumn} className="w-full" disabled={!csvData || !columnToSplit}>
            Split Column
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Result</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!result}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!result}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {result ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{result}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Result will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

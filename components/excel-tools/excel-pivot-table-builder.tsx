'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp, Table2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelPivotTableBuilder() {
  const [csvData, setCsvData] = useState('')
  const [result, setResult] = useState('')
  const [rowsField, setRowsField] = useState('')
  const [columnsField, setColumnsField] = useState('')
  const [valuesField, setValuesField] = useState('')
  const [aggregation, setAggregation] = useState<'sum' | 'count' | 'average' | 'min' | 'max'>('sum')
  const [copied, setCopied] = useState(false)

  const parseCSV = (csv: string): { headers: string[]; rows: any[] } => {
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
    const rows = lines.slice(1).map(line => {
      const values = parseLine(line)
      const obj: any = {}
      headers.forEach((h, i) => {
        let val = values[i] || ''
        const numVal = parseFloat(val)
        obj[h] = isNaN(numVal) ? val : numVal
      })
      return obj
    })
    
    return { headers, rows }
  }

  const buildPivot = () => {
    try {
      const { headers, rows } = parseCSV(csvData)
      
      if (!rowsField || !valuesField) {
        toast.error('Please select required fields')
        return
      }
      
      // Group data
      const grouped: Map<string, Map<string, number[]>> = new Map()
      
      rows.forEach(row => {
        const rowKey = String(row[rowsField] || 'Unknown')
        const colKey = columnsField ? String(row[columnsField] || 'Unknown') : 'Values'
        const value = parseFloat(row[valuesField]) || 0
        
        if (!grouped.has(rowKey)) {
          grouped.set(rowKey, new Map())
        }
        const colMap = grouped.get(rowKey)!
        
        if (!colMap.has(colKey)) {
          colMap.set(colKey, [])
        }
        colMap.get(colKey)!.push(value)
      })
      
      // Aggregate function
      const aggregate = (values: number[]) => {
        if (values.length === 0) return 0
        switch (aggregation) {
          case 'sum': return values.reduce((a, b) => a + b, 0)
          case 'count': return values.length
          case 'average': return values.reduce((a, b) => a + b, 0) / values.length
          case 'min': return Math.min(...values)
          case 'max': return Math.max(...values)
          default: return 0
        }
      }
      
      // Build output
      const colKeys = new Set<string>()
      grouped.forEach(colMap => {
        colMap.forEach((_, key) => colKeys.add(key))
      })
      const colKeyArray = Array.from(colKeys)
      
      // Header row
      let output = `${rowsField},${colKeyArray.join(',')}\n`
      
      // Data rows
      grouped.forEach((colMap, rowKey) => {
        const values = colKeyArray.map(colKey => {
          const values = colMap.get(colKey) || []
          return aggregate(values)
        })
        output += `${rowKey},${values.join(',')}\n`
      })
      
      setResult(output)
      toast.success('Pivot table created')
    } catch (err) {
      toast.error('Failed to build pivot table')
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
    a.download = 'pivot_table.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded pivot_table.csv')
  }

  const handleClear = () => {
    setCsvData('')
    setResult('')
    setRowsField('')
    setColumnsField('')
    setValuesField('')
  }

  const headers = csvData.trim().split('\n')[0]?.split(',').map(h => h.trim()) || []

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Build a Pivot Table from Excel Data Online</h1>
        <p className="text-muted-foreground mt-2">
          Summarize large datasets by dragging fields into rows, columns, and values.
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
            placeholder="Category,Region,Sales
Electronics,North,1000
Clothing,South,500
Electronics,South,800
Clothing,North,600"
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          
          <div className="space-y-2">
            <Label>Rows (Group By):</Label>
            <select
              value={rowsField}
              onChange={(e) => setRowsField(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select field</option>
              {headers.map((header) => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Columns (Optional):</Label>
            <select
              value={columnsField}
              onChange={(e) => setColumnsField(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">None</option>
              {headers.map((header) => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Values (To Aggregate):</Label>
            <select
              value={valuesField}
              onChange={(e) => setValuesField(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select field</option>
              {headers.map((header) => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Aggregation:</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={aggregation === 'sum' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAggregation('sum')}
              >
                Sum
              </Button>
              <Button
                variant={aggregation === 'count' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAggregation('count')}
              >
                Count
              </Button>
              <Button
                variant={aggregation === 'average' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAggregation('average')}
              >
                Average
              </Button>
              <Button
                variant={aggregation === 'min' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAggregation('min')}
              >
                Min
              </Button>
              <Button
                variant={aggregation === 'max' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAggregation('max')}
              >
                Max
              </Button>
            </div>
          </div>

          <Button onClick={buildPivot} className="w-full" disabled={!csvData || !rowsField || !valuesField}>
            <Table2 className="h-4 w-4 mr-2" />
            Build Pivot Table
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Pivot Table Result</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!result}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!result}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[500px]">
            {result ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{result}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Pivot table will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

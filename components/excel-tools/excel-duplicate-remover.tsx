'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp, Trash2, Plus } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelDuplicateRemover() {
  const [csvData, setCsvData] = useState('')
  const [result, setResult] = useState('')
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [action, setAction] = useState<'remove' | 'highlight'>('remove')
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

  const findDuplicates = () => {
    try {
      const { headers, rows } = parseCSV(csvData)
      setHeaders(headers)
      
      if (selectedColumns.length === 0) {
        setSelectedColumns(headers)
      }
      
      const columnIndices = selectedColumns.map(col => headers.indexOf(col)).filter(i => i !== -1)
      
      const seen = new Map<string, number[]>()
      rows.forEach((row, index) => {
        const key = columnIndices.map(i => row[i] || '').join('|')
        if (!seen.has(key)) {
          seen.set(key, [])
        }
        seen.get(key)!.push(index)
      })
      
      const duplicateIndices = new Set<number>()
      seen.forEach((indices) => {
        if (indices.length > 1) {
          indices.forEach(i => duplicateIndices.add(i))
        }
      })
      
      let outputRows: string[][]
      if (action === 'remove') {
        const uniqueKeys = new Set<string>()
        outputRows = rows.filter((row, index) => {
          const key = columnIndices.map(i => row[i] || '').join('|')
          if (uniqueKeys.has(key)) {
            return false
          }
          uniqueKeys.add(key)
          return true
        })
      } else {
        outputRows = rows.map((row, index) => {
          if (duplicateIndices.has(index)) {
            return row.map(cell => `***${cell}***`)
          }
          return row
        })
      }
      
      const output = [headers.join(','), ...outputRows.map(row => row.join(','))].join('\n')
      setResult(output)
      toast.success(`Found ${duplicateIndices.size} duplicate rows`)
    } catch (err) {
      toast.error('Invalid CSV data')
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
    a.download = 'deduplicated.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded deduplicated.csv')
  }

  const handleClear = () => {
    setCsvData('')
    setResult('')
    setHeaders([])
    setSelectedColumns([])
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Find and Remove Duplicates in Excel/CSV</h1>
        <p className="text-muted-foreground mt-2">
          Upload your CSV/Excel data and remove duplicate rows based on selected columns.
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
            placeholder="name,email,age
John,john@example.com,30
Jane,jane@example.com,25
John,john@example.com,30"
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
          
          {headers.length > 0 && (
            <div className="space-y-2">
              <Label>Check Duplicates By Columns:</Label>
              <div className="flex flex-wrap gap-2">
                {headers.map((header) => (
                  <label key={header} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(header)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedColumns([...selectedColumns, header])
                        } else {
                          setSelectedColumns(selectedColumns.filter(c => c !== header))
                        }
                      }}
                      className="h-4 w-4"
                    />
                    {header}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Action:</Label>
            <div className="flex gap-2">
              <Button
                variant={action === 'remove' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAction('remove')}
              >
                Remove Duplicates
              </Button>
              <Button
                variant={action === 'highlight' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAction('highlight')}
              >
                Highlight Only
              </Button>
            </div>
          </div>

          <Button onClick={findDuplicates} className="w-full" disabled={!csvData}>
            <Trash2 className="h-4 w-4 mr-2" />
            Find & Remove Duplicates
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

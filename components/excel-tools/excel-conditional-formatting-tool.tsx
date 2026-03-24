'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp, Wand2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelConditionalFormattingTool() {
  const [csvData, setCsvData] = useState('')
  const [result, setResult] = useState('')
  const [ruleType, setRuleType] = useState<'highlight' | 'duplicates' | 'topBottom'>('highlight')
  const [column, setColumn] = useState('')
  const [condition, setCondition] = useState('greater')
  const [value, setValue] = useState('')
  const [color, setColor] = useState('#FEF3C7')
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

  const applyFormatting = () => {
    try {
      const { headers, rows } = parseCSV(csvData)
      const columnIndex = headers.indexOf(column)
      
      if (columnIndex === -1) {
        toast.error('Selected column not found')
        return
      }

      const formattedRows = rows.map((row, rowIndex) => {
        const cellValue = row[columnIndex]
        let shouldHighlight = false

        if (ruleType === 'highlight') {
          const numValue = parseFloat(cellValue)
          const compareValue = parseFloat(value)
          
          switch (condition) {
            case 'greater':
              shouldHighlight = numValue > compareValue
              break
            case 'less':
              shouldHighlight = numValue < compareValue
              break
            case 'equal':
              shouldHighlight = numValue === compareValue
              break
            case 'contains':
              shouldHighlight = cellValue.includes(value)
              break
          }
        } else if (ruleType === 'duplicates') {
          const occurrences = rows.filter(r => r[columnIndex] === cellValue).length
          shouldHighlight = occurrences > 1
        } else if (ruleType === 'topBottom') {
          const numValues = rows.map(r => parseFloat(r[columnIndex]) || 0)
          const sorted = [...numValues].sort((a, b) => b - a)
          const threshold = condition === 'top' 
            ? sorted[Math.min(parseInt(value) - 1, sorted.length - 1)]
            : sorted[Math.max(sorted.length - parseInt(value), 0)]
          
          const numValue = parseFloat(cellValue)
          shouldHighlight = condition === 'top' ? numValue >= threshold : numValue <= threshold
        }

        if (shouldHighlight) {
          return row.map((cell, i) => 
            i === columnIndex ? `🟦${cell}` : cell
          )
        }
        return row
      })

      const output = [headers.join(','), ...formattedRows.map(row => row.join(','))].join('\n')
      setResult(output)
      toast.success('Conditional formatting applied')
    } catch (err) {
      toast.error('Failed to apply formatting')
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
    a.download = 'formatted.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded formatted.csv')
  }

  const handleClear = () => {
    setCsvData('')
    setResult('')
  }

  const headers = csvData.trim().split('\n')[0]?.split(',').map(h => h.trim()) || []

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Apply Conditional Formatting to Excel Online</h2>
        <p className="text-muted-foreground mt-2">
          Highlight cells based on values, duplicates, or top/bottom rules.
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
            placeholder="name,score,grade
John,85,B
Jane,92,A
Bob,78,C"
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          
          <div className="space-y-2">
            <Label>Rule Type:</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={ruleType === 'highlight' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRuleType('highlight')}
              >
                Highlight Cells
              </Button>
              <Button
                variant={ruleType === 'duplicates' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRuleType('duplicates')}
              >
                Duplicates
              </Button>
              <Button
                variant={ruleType === 'topBottom' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRuleType('topBottom')}
              >
                Top/Bottom
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Column:</Label>
            <select
              value={column}
              onChange={(e) => setColumn(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select column</option>
              {headers.map((header) => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>

          {ruleType === 'highlight' && (
            <>
              <div className="space-y-2">
                <Label>Condition:</Label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="greater">Greater than</option>
                  <option value="less">Less than</option>
                  <option value="equal">Equal to</option>
                  <option value="contains">Contains</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Value:</Label>
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                />
              </div>
            </>
          )}

          {ruleType === 'topBottom' && (
            <>
              <div className="space-y-2">
                <Label>Show:</Label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Number of items:</Label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="e.g., 5"
                />
              </div>
            </>
          )}

          <Button onClick={applyFormatting} className="w-full" disabled={!csvData || !column}>
            <Wand2 className="h-4 w-4 mr-2" />
            Apply Formatting
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
          <Card className="p-4 bg-muted min-h-[500px]">
            {result ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{result}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Formatted data will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

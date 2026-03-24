'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, FileUp, Combine } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelMergeCellsTool() {
  const [csvData, setCsvData] = useState('')
  const [result, setResult] = useState('')
  const [separator, setSeparator] = useState(' ')
  const [customSeparator, setCustomSeparator] = useState('')
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

  const mergeColumns = () => {
    try {
      const { headers, rows } = parseCSV(csvData)
      
      const delim = customSeparator || separator
      
      // Merge all columns in each row
      const newRows = rows.map(row => {
        const mergedValue = row.filter(cell => cell).join(delim)
        return [mergedValue]
      })
      
      const output = [
        'Merged',
        ...newRows.map(row => row.join(','))
      ].join('\n')
      
      setResult(output)
      toast.success(`Merged ${headers.length} columns into 1`)
    } catch (err) {
      toast.error('Failed to merge columns')
    }
  }

  const mergeSelected = (selectedHeaders: string[]) => {
    try {
      const { headers, rows } = parseCSV(csvData)
      
      const delim = customSeparator || separator
      const indices = selectedHeaders.map(h => headers.indexOf(h)).filter(i => i !== -1)
      
      const newRows = rows.map(row => {
        const mergedValue = indices.map(i => row[i] || '').filter(v => v).join(delim)
        const otherColumns = headers
          .map((h, i) => !selectedHeaders.includes(h) ? row[i] : null)
          .filter(v => v !== null)
        
        return [mergedValue, ...otherColumns]
      })
      
      const newHeaders = ['Merged', ...headers.filter(h => !selectedHeaders.includes(h))]
      
      const output = [
        newHeaders.join(','),
        ...newRows.map(row => row.join(','))
      ].join('\n')
      
      setResult(output)
      toast.success(`Merged ${selectedHeaders.length} columns`)
    } catch (err) {
      toast.error('Failed to merge columns')
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
    a.download = 'merged.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded merged.csv')
  }

  const handleClear = () => {
    setCsvData('')
    setResult('')
  }

  const headers = csvData.trim().split('\n')[0]?.split(',').map(h => h.trim()) || []

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Merge or Combine Excel Cells Online</h2>
        <p className="text-muted-foreground mt-2">
          Merge the contents of multiple cells into one with custom separators.
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
            placeholder="firstName,lastName,email
John,Doe,john@example.com
Jane,Smith,jane@example.com"
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="min-h-[250px] font-mono text-sm"
          />
          
          <div className="space-y-2">
            <Label>Separator:</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={separator === ' ' && !customSeparator ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setSeparator(' '); setCustomSeparator('') }}
              >
                Space
              </Button>
              <Button
                variant={separator === ',' && !customSeparator ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setSeparator(','); setCustomSeparator('') }}
              >
                Comma
              </Button>
              <Button
                variant={separator === '-' && !customSeparator ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setSeparator('-'); setCustomSeparator('') }}
              >
                Dash
              </Button>
              <Button
                variant={separator === '\n' && !customSeparator ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setSeparator('\n'); setCustomSeparator('') }}
              >
                New Line
              </Button>
              <Input
                placeholder="Custom"
                value={customSeparator}
                onChange={(e) => setCustomSeparator(e.target.value)}
                className="w-32"
              />
            </div>
          </div>

          <Button onClick={mergeColumns} className="w-full" disabled={!csvData}>
            <Combine className="h-4 w-4 mr-2" />
            Merge All Columns
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

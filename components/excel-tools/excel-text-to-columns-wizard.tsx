'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp, Wand2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelTextToColumnsWizard() {
  const [csvData, setCsvData] = useState('')
  const [result, setResult] = useState('')
  const [splitType, setSplitType] = useState<'delimiter' | 'fixed'>('delimiter')
  const [delimiter, setDelimiter] = useState(',')
  const [customDelimiter, setCustomDelimiter] = useState('')
  const [fixedWidths, setFixedWidths] = useState('10,20,30')
  const [copied, setCopied] = useState(false)

  const parseCSV = (csv: string): { headers: string[]; rows: string[][] } => {
    const lines = csv.trim().split('\n').filter(line => line.trim())
    if (lines.length === 0) return { headers: [], rows: [] }
    
    const parseLine = (line: string, delim: string) => {
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
          result.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      result.push(current.trim())
      return result
    }
    
    const headers = parseLine(lines[0], delimiter)
    const rows = lines.slice(1).map(line => parseLine(line, delimiter))
    return { headers, rows }
  }

  const splitTextToColumns = () => {
    try {
      const lines = csvData.trim().split('\n').filter(line => line.trim())
      if (lines.length === 0) return
      
      let outputLines: string[] = []
      
      if (splitType === 'delimiter') {
        const delim = customDelimiter || delimiter
        
        outputLines = lines.map(line => {
          const parts: string[] = []
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
              parts.push(current.trim())
              current = ''
            } else {
              current += char
            }
          }
          parts.push(current.trim())
          return parts.join(',')
        })
      } else {
        // Fixed width
        const widths = fixedWidths.split(',').map(w => parseInt(w.trim()) || 0)
        
        outputLines = lines.map(line => {
          const parts: string[] = []
          let start = 0
          
          for (const width of widths) {
            if (start >= line.length) break
            const end = Math.min(start + width, line.length)
            parts.push(line.substring(start, end).trim())
            start = end
          }
          
          // Add remaining text
          if (start < line.length) {
            parts.push(line.substring(start).trim())
          }
          
          return parts.join(',')
        })
      }
      
      const output = outputLines.join('\n')
      setResult(output)
      toast.success('Text split to columns')
    } catch (err) {
      toast.error('Failed to split text')
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
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Excel Text to Columns Wizard Online</h2>
        <p className="text-muted-foreground mt-2">
          Split text into columns using delimiters or fixed width positions with preview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="csv-input" className="text-base font-medium">Text Input</Label>
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
            placeholder="John Doe,123 Main St,New York,NY
Jane Smith,456 Oak Ave,Los Angeles,CA"
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          
          <div className="space-y-2">
            <Label>Split Type:</Label>
            <div className="flex gap-2">
              <Button
                variant={splitType === 'delimiter' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSplitType('delimiter')}
              >
                Delimited
              </Button>
              <Button
                variant={splitType === 'fixed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSplitType('fixed')}
              >
                Fixed Width
              </Button>
            </div>
          </div>

          {splitType === 'delimiter' ? (
            <div className="space-y-2">
              <Label>Delimiter:</Label>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={delimiter === ',' && !customDelimiter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setDelimiter(','); setCustomDelimiter('') }}
                >
                  Comma (,)
                </Button>
                <Button
                  variant={delimiter === '\t' && !customDelimiter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setDelimiter('\t'); setCustomDelimiter('') }}
                >
                  Tab
                </Button>
                <Button
                  variant={delimiter === ' ' && !customDelimiter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setDelimiter(' '); setCustomDelimiter('') }}
                >
                  Space
                </Button>
                <Button
                  variant={delimiter === ';' && !customDelimiter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setDelimiter(';'); setCustomDelimiter('') }}
                >
                  Semicolon
                </Button>
                <Input
                  placeholder="Custom"
                  value={customDelimiter}
                  onChange={(e) => setCustomDelimiter(e.target.value)}
                  className="w-24"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Column Widths (comma-separated):</Label>
              <Input
                value={fixedWidths}
                onChange={(e) => setFixedWidths(e.target.value)}
                placeholder="10,20,30"
              />
              <p className="text-xs text-muted-foreground">
                Example: "10,20,30" splits at positions 10, 20, and 30
              </p>
            </div>
          )}

          <Button onClick={splitTextToColumns} className="w-full" disabled={!csvData}>
            <Wand2 className="h-4 w-4 mr-2" />
            Split to Columns
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Result Preview</Label>
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
              <p className="text-muted-foreground text-sm">Split data will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

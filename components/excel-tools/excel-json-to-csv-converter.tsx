'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp, FileType2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelJsonToCsvConverter() {
  const [jsonInput, setJsonInput] = useState('')
  const [csvOutput, setCsvOutput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [copied, setCopied] = useState(false)

  const convertToCsv = () => {
    try {
      const data = JSON.parse(jsonInput)
      const array = Array.isArray(data) ? data : [data]
      
      if (array.length === 0) {
        setCsvOutput('')
        toast.info('Empty data')
        return
      }
      
      // Get all unique headers
      const headers = new Set<string>()
      array.forEach(obj => {
        Object.keys(obj).forEach(key => headers.add(key))
      })
      const headerArray = Array.from(headers)
      
      // Build CSV
      const rows = [headerArray.join(delimiter)]
      
      for (const obj of array) {
        const values = headerArray.map(header => {
          const value = obj[header]
          if (value === null || value === undefined) return ''
          if (typeof value === 'object') return JSON.stringify(value)
          const str = String(value)
          if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`
          }
          return str
        })
        rows.push(values.join(delimiter))
      }
      
      const csv = rows.join('\n')
      setCsvOutput(csv)
      toast.success('Converted to CSV')
    } catch (err) {
      toast.error('Invalid JSON input')
      setCsvOutput('')
    }
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
    a.download = 'converted.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded converted.csv')
  }

  const handleClear = () => {
    setJsonInput('')
    setCsvOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Convert JSON to CSV for Excel Spreadsheets</h2>
        <p className="text-muted-foreground mt-2">
          Transform JSON arrays into CSV format ready for Excel import.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="json-input" className="text-base font-medium">JSON Input</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="json-input"
            placeholder='[{"name": "John", "age": 30, "city": "New York"}, {"name": "Jane", "age": 25, "city": "Los Angeles"}]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
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

          <Button onClick={convertToCsv} className="w-full" disabled={!jsonInput}>
            <FileType2 className="h-4 w-4 mr-2" />
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

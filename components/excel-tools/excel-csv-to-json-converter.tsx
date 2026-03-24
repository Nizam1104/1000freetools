'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp, FileType } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelCsvToJsonConverter() {
  const [csvInput, setCsvInput] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [prettyPrint, setPrettyPrint] = useState(true)
  const [copied, setCopied] = useState(false)

  const parseCSV = (csv: string, delim: string): Record<string, any>[] => {
    const lines = csv.trim().split('\n').filter(line => line.trim())
    if (lines.length === 0) return []

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
    
    const headers = parseLine(lines[0])
    const data = []
    
    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i])
      const obj: any = {}
      
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j].trim()
        let value: string | number | boolean = values[j] ? values[j].trim() : ''

        // Remove quotes
        if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1).replace(/""/g, '"')
        }

        // Type inference
        if (typeof value === 'string') {
          if (value.toLowerCase() === 'true') {
            value = true
          } else if (value.toLowerCase() === 'false') {
            value = false
          } else if (!isNaN(Number(value)) && value !== '') {
            value = Number(value)
          }
        }

        obj[header] = value
      }
      
      data.push(obj)
    }
    
    return data
  }

  const convertToJson = () => {
    try {
      const data = parseCSV(csvInput, delimiter)
      const json = prettyPrint ? JSON.stringify(data, null, 2) : JSON.stringify(data)
      setJsonOutput(json)
      toast.success('Converted to JSON')
    } catch (err) {
      toast.error('Invalid CSV input')
      setJsonOutput('')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setCsvInput(content)
      toast.success(`Loaded ${file.name}`)
    }
    reader.readAsText(file)
  }

  const handleCopy = async () => {
    if (!jsonOutput) return
    try {
      await navigator.clipboard.writeText(jsonOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!jsonOutput) return
    const blob = new Blob([jsonOutput], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded converted.json')
  }

  const handleClear = () => {
    setCsvInput('')
    setJsonOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Convert CSV to Excel JSON Format</h2>
        <p className="text-muted-foreground mt-2">
          Upload CSV files and convert them to JSON format for Excel and web applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="csv-input" className="text-base font-medium">CSV Input</Label>
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
            placeholder="name,age,city
John,30,New York
Jane,25,Los Angeles"
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pretty"
              checked={prettyPrint}
              onChange={(e) => setPrettyPrint(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="pretty" className="text-sm cursor-pointer">
              Pretty print JSON
            </Label>
          </div>

          <Button onClick={convertToJson} className="w-full" disabled={!csvInput}>
            <FileType className="h-4 w-4 mr-2" />
            Convert to JSON
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">JSON Output</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!jsonOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!jsonOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {jsonOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{jsonOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">JSON output will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

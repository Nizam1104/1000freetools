'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, Search } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function TomlKeyValueExtractor() {
  const [tomlInput, setTomlInput] = useState('')
  const [query, setQuery] = useState('')
  const [extractedResult, setExtractedResult] = useState('')
  const [exportFormat, setExportFormat] = useState<'toml' | 'json' | 'csv'>('json')
  const [copied, setCopied] = useState(false)

  const extractValues = () => {
    try {
      const parsed = toml.parse(tomlInput)
      const results = queryToml(parsed, query)
      
      let output = ''
      if (exportFormat === 'json') {
        output = JSON.stringify(results, null, 2)
      } else if (exportFormat === 'toml') {
        output = jsonToToml(results)
      } else if (exportFormat === 'csv') {
        output = jsonToCsv(results)
      }
      
      setExtractedResult(output)
      toast.success(`Found ${Object.keys(results).length} matching keys`)
    } catch (err) {
      toast.error('Invalid TOML or query. Please check your input.')
    }
  }

  const queryToml = (obj: any, pattern: string): any => {
    const results: any = {}
    
    const search = (current: any, currentPath: string) => {
      if (!current || typeof current !== 'object') return
      
      for (const [key, value] of Object.entries(current)) {
        const fullPath = currentPath ? `${currentPath}.${key}` : key
        
        if (matchesPattern(fullPath, pattern)) {
          results[key] = value
        }
        
        if (typeof value === 'object' && value !== null) {
          search(value, fullPath)
        }
      }
    }
    
    search(obj, '')
    return results
  }

  const matchesPattern = (path: string, pattern: string): boolean => {
    if (!pattern) return true
    if (pattern.startsWith('^')) {
      const regex = new RegExp(pattern)
      return regex.test(path)
    }
    return path === pattern || path.endsWith(`.${pattern}`) || path.includes(pattern)
  }

  const jsonToToml = (obj: any, parentKey = ''): string => {
    let result = ''
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result += `[${key}]\n`
        result += jsonToToml(value)
      } else {
        result += `${key} = ${formatValue(value)}\n`
      }
    }
    return result
  }

  const jsonToCsv = (obj: any): string => {
    const rows = []
    const headers = new Set<string>()
    
    const flatten = (o: any, prefix = '') => {
      for (const [key, value] of Object.entries(o)) {
        const fullKey = prefix ? `${prefix}.${key}` : key
        if (typeof value === 'object' && value !== null) {
          flatten(value, fullKey)
        } else {
          headers.add(fullKey)
        }
      }
    }
    
    flatten(obj)
    
    const headerArray = Array.from(headers)
    rows.push(headerArray.join(','))
    
    const getValues = (o: any) => {
      return headerArray.map(h => {
        const parts = h.split('.')
        let current = o
        for (const part of parts) {
          if (current && typeof current === 'object' && part in current) {
            current = current[part]
          } else {
            return ''
          }
        }
        return String(current)
      })
    }
    
    rows.push(getValues(obj).join(','))
    return rows.join('\n')
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
    if (!extractedResult) return
    try {
      await navigator.clipboard.writeText(extractedResult)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!extractedResult) return
    const ext = exportFormat
    const blob = new Blob([extractedResult], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `extracted.${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded extracted.${ext}`)
  }

  const handleClear = () => {
    setTomlInput('')
    setQuery('')
    setExtractedResult('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Extract Keys and Values from TOML</h2>
        <p className="text-muted-foreground mt-2">
          Query and extract specific configuration values from TOML files using dot-notation or regex.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="space-y-4">
          <Label htmlFor="toml-input" className="text-base font-medium">TOML Input</Label>
          <Textarea
            id="toml-input"
            placeholder={`[database]
host = "localhost"
port = 5432

[server]
host = "0.0.0.0"
port = 8080`}
            value={tomlInput}
            onChange={(e) => setTomlInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="query" className="text-base font-medium">Query Pattern</Label>
          <Input
            id="query"
            placeholder="e.g., database.host or ^.*\.port$"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="font-mono"
          />
          <p className="text-sm text-muted-foreground">
            Use dot-notation (e.g., <code className="bg-muted px-1 rounded">database.host</code>) or regex (e.g., <code className="bg-muted px-1 rounded">^.*.port$</code>)
          </p>
          
          <div className="space-y-2">
            <Label>Export Format:</Label>
            <div className="flex gap-2">
              <Button
                variant={exportFormat === 'json' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setExportFormat('json')}
              >
                JSON
              </Button>
              <Button
                variant={exportFormat === 'toml' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setExportFormat('toml')}
              >
                TOML
              </Button>
              <Button
                variant={exportFormat === 'csv' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setExportFormat('csv')}
              >
                CSV
              </Button>
            </div>
          </div>

          <Button onClick={extractValues} className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Extract Values
          </Button>
          <Button variant="ghost" onClick={handleClear} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {extractedResult && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Extracted Result</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[300px]">
            <pre className="font-mono text-sm whitespace-pre-wrap">{extractedResult}</pre>
          </Card>
        </div>
      )}
    </div>
  )
}

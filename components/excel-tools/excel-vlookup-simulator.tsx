'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp, SearchCheck } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelVlookupSimulator() {
  const [table1Data, setTable1Data] = useState('')
  const [table2Data, setTable2Data] = useState('')
  const [lookupColumn, setLookupColumn] = useState('')
  const [returnColumn, setReturnColumn] = useState('')
  const [result, setResult] = useState('')
  const [exactMatch, setExactMatch] = useState(true)
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
        obj[h] = values[i] || ''
      })
      return obj
    })
    
    return { headers, rows }
  }

  const vlookup = () => {
    try {
      const { headers: headers1, rows: table1 } = parseCSV(table1Data)
      const { headers: headers2, rows: table2 } = parseCSV(table2Data)
      
      if (!lookupColumn || !returnColumn) {
        toast.error('Please select lookup and return columns')
        return
      }
      
      // Create lookup map from table2
      const lookupMap = new Map()
      table2.forEach(row => {
        const key = row[lookupColumn]
        if (key) {
          lookupMap.set(key, row)
        }
      })
      
      // Perform VLOOKUP
      const newHeaders = [...headers1, `${returnColumn} (VLOOKUP)`]
      const newRows = table1.map(row => {
        const lookupValue = row[lookupColumn]
        let foundRow: any = null
        
        if (exactMatch) {
          foundRow = lookupMap.get(lookupValue)
        } else {
          // Approximate match - find closest value
          const keys = Array.from(lookupMap.keys()).sort()
          const closestKey = keys.reverse().find(k => k <= lookupValue)
          if (closestKey) {
            foundRow = lookupMap.get(closestKey)
          }
        }
        
        const returnValue = foundRow ? foundRow[returnColumn] : '#N/A'
        return [...Object.values(row), returnValue]
      })
      
      let output = newHeaders.join(',') + '\n'
      output += newRows.map(row => row.join(',')).join('\n')
      
      setResult(output)
      
      const matchCount = newRows.filter(r => r[r.length - 1] !== '#N/A').length
      toast.success(`VLOOKUP complete: ${matchCount}/${table1.length} matches found`)
    } catch (err) {
      toast.error('VLOOKUP failed')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setData: (s: string) => void) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setData(content)
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
    a.download = 'vlookup_result.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded vlookup_result.csv')
  }

  const handleClear = () => {
    setTable1Data('')
    setTable2Data('')
    setResult('')
  }

  const table1Headers = table1Data.trim().split('\n')[0]?.split(',').map(h => h.trim()) || []
  const table2Headers = table2Data.trim().split('\n')[0]?.split(',').map(h => h.trim()) || []

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Practice and Test Excel VLOOKUP Formulas</h1>
        <p className="text-muted-foreground mt-2">
          Learn VLOOKUP by simulating lookups between two datasets with exact or approximate match.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="space-y-4">
          <Label className="text-base font-medium">Lookup Table (Table 1)</Label>
          <div className="flex gap-2">
            <label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, setTable1Data)}
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
          </div>
          <Textarea
            placeholder="ID,Name,Department
1,John,Sales
2,Jane,Marketing
3,Bob,IT"
            value={table1Data}
            onChange={(e) => setTable1Data(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">Source Table (Table 2)</Label>
          <div className="flex gap-2">
            <label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, setTable2Data)}
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
          </div>
          <Textarea
            placeholder="ID,Email,Salary
1,john@example.com,50000
2,jane@example.com,55000
4,unknown@example.com,45000"
            value={table2Data}
            onChange={(e) => setTable2Data(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>
      </div>

      <Card className="p-4 mb-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Lookup Column (in both tables):</Label>
            <select
              value={lookupColumn}
              onChange={(e) => setLookupColumn(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select column</option>
              {table2Headers.map((header) => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Return Column (from Table 2):</Label>
            <select
              value={returnColumn}
              onChange={(e) => setReturnColumn(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select column</option>
              {table2Headers.map((header) => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Match Type:</Label>
            <div className="flex gap-2">
              <Button
                variant={exactMatch ? 'default' : 'outline'}
                size="sm"
                onClick={() => setExactMatch(true)}
                className="flex-1"
              >
                Exact
              </Button>
              <Button
                variant={!exactMatch ? 'default' : 'outline'}
                size="sm"
                onClick={() => setExactMatch(false)}
                className="flex-1"
              >
                Approx
              </Button>
            </div>
          </div>
        </div>

        <Button onClick={vlookup} className="w-full mt-4" disabled={!table1Data || !table2Data || !lookupColumn || !returnColumn}>
          <SearchCheck className="h-4 w-4 mr-2" />
          Run VLOOKUP
        </Button>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">VLOOKUP Result</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[300px]">
            <pre className="font-mono text-sm whitespace-pre-wrap">{result}</pre>
          </Card>
        </div>
      )}

      <Card className="p-4 mt-6 bg-blue-50 dark:bg-blue-950">
        <h3 className="font-semibold mb-2">VLOOKUP Syntax Reference</h3>
        <p className="text-sm text-muted-foreground mb-2">
          <code className="bg-background px-2 py-1 rounded">=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</code>
        </p>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li><strong>lookup_value:</strong> The value to search for in the first column</li>
          <li><strong>table_array:</strong> The range containing the data</li>
          <li><strong>col_index_num:</strong> The column number to return (1-based)</li>
          <li><strong>range_lookup:</strong> TRUE for approximate match, FALSE for exact match</li>
        </ul>
      </Card>
    </div>
  )
}

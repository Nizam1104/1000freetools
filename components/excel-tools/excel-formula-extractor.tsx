'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, FileUp, Code2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelFormulaExtractor() {
  const [csvData, setCsvData] = useState('')
  const [result, setResult] = useState('')
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

  const detectFormulas = () => {
    try {
      const { headers, rows } = parseCSV(csvData)
      
      const formulas: { sheet: string; cell: string; formula: string; value: string }[] = []
      
      rows.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellRef = `${String.fromCharCode(65 + colIndex)}${rowIndex + 2}`

          // Detect Excel formula patterns
          const formulaPattern = /^(SUM|AVERAGE|VLOOKUP|HLOOKUP|INDEX|MATCH|IF|COUNT|COUNTA|MAX|MIN|CONCATENATE|LEFT|RIGHT|MID|LEN|TRIM|UPPER|LOWER|PROPER|TEXT|DATE|TODAY|NOW|RAND|RANDBETWEEN|ROUND|ROUNDUP|ROUNDDOWN|CEILING|FLOOR|ABS|MOD|POWER|SQRT|PI|AND|OR|NOT|ISBLANK|ISNUMBER|ISTEXT|ISERROR|IFERROR|SUMIF|SUMIFS|COUNTIF|COUNTIFS|AVERAGEIF|AVERAGEIFS|LOOKUP|INDIRECT|OFFSET|CHOOSE|TRANSPOSE|FILTER|SORT|UNIQUE|XLOOKUP|XMATCH|LET|LAMBDA)/i
          if (cell.startsWith('=') || cell.match(formulaPattern)) {
            formulas.push({
              sheet: 'Sheet1',
              cell: cellRef,
              formula: cell,
              value: 'Calculated'
            })
          }
        })
      })
      
      if (formulas.length === 0) {
        setResult('No formulas detected in the data.')
        toast.info('No formulas found')
        return
      }
      
      let output = 'Extracted Formulas:\n\n'
      output += 'Sheet\tCell\tFormula\tValue\n'
      formulas.forEach(f => {
        output += `${f.sheet}\t${f.cell}\t${f.formula}\t${f.value}\n`
      })
      
      setResult(output)
      toast.success(`Found ${formulas.length} formulas`)
    } catch (err) {
      toast.error('Failed to extract formulas')
    }
  }

  const generateFormulaCode = () => {
    try {
      const { headers, rows } = parseCSV(csvData)
      
      let output = '// Generated JavaScript functions based on data patterns\n\n'
      
      // Generate common formula equivalents
      if (rows.length > 0) {
        output += `// Data has ${headers.length} columns and ${rows.length} rows\n\n`
        
        // Sum function
        output += `function sumColumn(data, columnIndex) {
  return data.reduce((sum, row) => sum + (parseFloat(row[columnIndex]) || 0), 0);
}\n\n`
        
        // Average function
        output += `function averageColumn(data, columnIndex) {
  const values = data.map(row => parseFloat(row[columnIndex]) || 0).filter(v => v !== 0);
  return values.reduce((a, b) => a + b, 0) / values.length;
}\n\n`
        
        // VLOOKUP equivalent
        output += `function vlookup(data, lookupValue, lookupColumnIndex, returnColumnIndex) {
  const row = data.find(r => r[lookupColumnIndex] === lookupValue);
  return row ? row[returnColumnIndex] : null;
}\n\n`
        
        // IF function equivalent
        output += `function ifFunction(condition, trueValue, falseValue) {
  return condition ? trueValue : falseValue;
}\n\n`
        
        // COUNT function
        output += `function countColumn(data, columnIndex) {
  return data.filter(row => row[columnIndex] !== '').length;
}\n\n`
        
        // MAX function
        output += `function maxColumn(data, columnIndex) {
  return Math.max(...data.map(row => parseFloat(row[columnIndex]) || 0));
}\n\n`
        
        // MIN function
        output += `function minColumn(data, columnIndex) {
  return Math.min(...data.map(row => parseFloat(row[columnIndex]) || 0));
}\n`
      }
      
      setResult(output)
      toast.success('Generated JavaScript formula equivalents')
    } catch (err) {
      toast.error('Failed to generate code')
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
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formulas.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded formulas.txt')
  }

  const handleClear = () => {
    setCsvData('')
    setResult('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Extract All Formulas from an Excel File</h1>
        <p className="text-muted-foreground mt-2">
          Reverse-engineer spreadsheets by extracting formulas and generating JavaScript equivalents.
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
            placeholder={`name,score,grade
=SUM(B2:B10),85,B
=AVERAGE(B2:B10),92,A
=IF(B2>50,"Pass","Fail"),78,C`}
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
          
          <div className="flex gap-2">
            <Button onClick={detectFormulas} className="flex-1" disabled={!csvData}>
              Detect Formulas
            </Button>
            <Button onClick={generateFormulaCode} className="flex-1" disabled={!csvData}>
              <Code2 className="h-4 w-4 mr-2" />
              Generate JS Code
            </Button>
          </div>
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
              <p className="text-muted-foreground text-sm">Extracted formulas will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

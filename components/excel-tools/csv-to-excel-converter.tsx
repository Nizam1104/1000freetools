'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelCsvToExcelConverter() {
  const [csvInput, setCsvInput] = useState('')
  const [excelOutput, setExcelOutput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [sheetName, setSheetName] = useState('Sheet1')
  const [copied, setCopied] = useState(false)

  const parseCSV = (csv: string, delim: string): string[][] => {
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
    
    return lines.map(parseLine)
  }

  const convertToExcel = () => {
    try {
      const data = parseCSV(csvInput, delimiter)
      
      if (data.length === 0) {
        toast.info('No data to convert')
        return
      }
      
      // Generate Excel XML format (SpreadsheetML)
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Created>${new Date().toISOString()}</Created>
 </DocumentProperties>
 <Worksheet ss:Name="${sheetName}">
  <Table>
   ${data.map(row => `
   <Row>
    ${row.map(cell => `
    <Cell><Data ss:Type="String">${escapeXml(cell)}</Data></Cell>
    `).join('')}
   </Row>
   `).join('')}
  </Table>
 </Worksheet>
</Workbook>`
      
      setExcelOutput(xml)
      toast.success('Converted to Excel format')
    } catch (err) {
      toast.error('Conversion failed')
    }
  }

  const escapeXml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
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
    if (!excelOutput) return
    try {
      await navigator.clipboard.writeText(excelOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!excelOutput) return
    const blob = new Blob([excelOutput], { type: 'application/vnd.ms-excel' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted.xls'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded converted.xls')
  }

  const handleClear = () => {
    setCsvInput('')
    setExcelOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Convert CSV to Excel Spreadsheet Online</h2>
        <p className="text-muted-foreground mt-2">
          Upload CSV files and convert them to Excel format (.xls) with proper formatting.
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
            placeholder="Name,Age,City
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

          <div className="space-y-2">
            <Label>Sheet Name:</Label>
            <Input
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              placeholder="Sheet1"
            />
          </div>

          <Button onClick={convertToExcel} className="w-full" disabled={!csvInput}>
            Convert to Excel
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Excel Output</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!excelOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!excelOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {excelOutput ? (
              <pre className="font-mono text-xs whitespace-pre-wrap overflow-auto max-h-[500px]">{excelOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Excel XML will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

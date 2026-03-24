'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, FileUp, FileType } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelToPdfConverter() {
  const [csvData, setCsvData] = useState('')
  const [pdfContent, setPdfContent] = useState('')
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Legal'>('A4')
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
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

  const convertToPdf = () => {
    try {
      const { headers, rows } = parseCSV(csvData)
      
      // Generate HTML that can be printed to PDF
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: ${pageSize} ${orientation};
      margin: 20mm;
    }
    body {
      font-family: Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.4;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #333;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background-color: #4F46E5;
      color: white;
      font-weight: 600;
    }
    tr:nth-child(even) {
      background-color: #F3F4F6;
    }
    tr:hover {
      background-color: #E5E7EB;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #1F2937;
      margin: 0;
      font-size: 18pt;
    }
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 9pt;
      color: #6B7280;
      padding: 10mm;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Excel Data Export</h1>
    <p>Generated on ${new Date().toLocaleDateString()}</p>
  </div>
  <table>
    <thead>
      <tr>
        ${headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${rows.map(row => `
        <tr>
          ${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}
        </tr>
      `).join('')}
    </tbody>
  </table>
  <div class="footer">
    Page <span class="page"></span>
  </div>
  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>`
      
      setPdfContent(html)
      toast.success('PDF ready for download (use Print to save as PDF)')
    } catch (err) {
      toast.error('Conversion failed')
    }
  }

  const escapeHtml = (text: string): string => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
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
    if (!pdfContent) return
    try {
      await navigator.clipboard.writeText(pdfContent)
      setCopied(true)
      toast.success('Copied HTML to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!pdfContent) return
    const blob = new Blob([pdfContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded export.html (open and print to PDF)')
  }

  const handleClear = () => {
    setCsvData('')
    setPdfContent('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Convert Excel to PDF Online for Free</h2>
        <p className="text-muted-foreground mt-2">
          Turn your Excel/CSV spreadsheets into professional PDF documents with formatting preserved.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="csv-input" className="text-base font-medium">Excel/CSV Data</Label>
            <div className="flex gap-2">
              <label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".csv,.txt,.xlsx"
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
            placeholder="Name,Age,City,Salary
John Doe,30,New York,50000
Jane Smith,25,Los Angeles,55000
Bob Johnson,35,Chicago,60000"
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="min-h-[250px] font-mono text-sm"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Page Size:</Label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as any)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
                <option value="Legal">Legal</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Orientation:</Label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as any)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
          </div>

          <Button onClick={convertToPdf} className="w-full" disabled={!csvData}>
            <FileType className="h-4 w-4 mr-2" />
            Convert to PDF
          </Button>

          <Card className="p-4 bg-blue-50 dark:bg-blue-950">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> After conversion, click "Download" to get an HTML file. 
              Open it in your browser and use Print (Ctrl+P) to save as PDF.
            </p>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Preview</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!pdfContent}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!pdfContent}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[500px] overflow-auto">
            {pdfContent ? (
              <iframe
                srcDoc={pdfContent}
                className="w-full h-full min-h-[450px] border rounded bg-white"
                title="PDF Preview"
              />
            ) : (
              <p className="text-muted-foreground text-sm">PDF preview will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

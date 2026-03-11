'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, FileUp, FileDiff } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelCompareTwoSheets() {
  const [file1, setFile1] = useState('')
  const [file2, setFile2] = useState('')
  const [file1Name, setFile1Name] = useState('')
  const [file2Name, setFile2Name] = useState('')
  const [result, setResult] = useState<{ added: string[]; removed: string[]; modified: string[] } | null>(null)
  const [copied, setCopied] = useState(false)

  const parseCSV = (csv: string): string[][] => {
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
    
    return lines.map(parseLine)
  }

  const compareFiles = () => {
    try {
      const data1 = parseCSV(file1)
      const data2 = parseCSV(file2)
      
      const added: string[] = []
      const removed: string[] = []
      const modified: string[] = []
      
      // Convert rows to strings for comparison
      const rows1 = data1.map(row => row.join('|'))
      const rows2 = data2.map(row => row.join('|'))
      
      // Find removed (in file1 but not in file2)
      rows1.forEach((row, i) => {
        if (!rows2.includes(row)) {
          // Check if it's modified (same key, different values)
          const key = row.split('|')[0]
          const matchingRow = rows2.find(r => r.split('|')[0] === key)
          if (matchingRow && matchingRow !== row) {
            modified.push(`Row ${i + 1}: "${data1[i].join(', ')}" → "${data2[rows2.indexOf(matchingRow)].join(', ')}"`)
          } else {
            removed.push(`Row ${i + 1}: ${row}`)
          }
        }
      })
      
      // Find added (in file2 but not in file1)
      rows2.forEach((row, i) => {
        if (!rows1.includes(row)) {
          const key = row.split('|')[0]
          const matchingRow = rows1.find(r => r.split('|')[0] === key)
          if (!matchingRow) {
            added.push(`Row ${i + 1}: ${row}`)
          }
        }
      })
      
      setResult({ added, removed, modified })
      toast.success(`Comparison complete: ${added.length} added, ${removed.length} removed, ${modified.length} modified`)
    } catch (err) {
      toast.error('Failed to compare files')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setFile: (s: string) => void, setName: (s: string) => void) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setFile(content)
      toast.success(`Loaded ${file.name}`)
    }
    reader.readAsText(file)
  }

  const handleCopy = async () => {
    if (!result) return
    const text = `Added:\n${result.added.join('\n')}\n\nRemoved:\n${result.removed.join('\n')}\n\nModified:\n${result.modified.join('\n')}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!result) return
    const text = `Added:\n${result.added.join('\n')}\n\nRemoved:\n${result.removed.join('\n')}\n\nModified:\n${result.modified.join('\n')}`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'comparison-report.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded comparison-report.txt')
  }

  const handleClear = () => {
    setFile1('')
    setFile2('')
    setFile1Name('')
    setFile2Name('')
    setResult(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Compare Two Excel Files and Find Differences</h1>
        <p className="text-muted-foreground mt-2">
          Upload two CSV/Excel files to find added, removed, and modified rows.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="space-y-4">
          <Label className="text-base font-medium">File 1 (Original)</Label>
          <Card className="p-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
              <div className="flex flex-col items-center justify-center">
                <FileUp className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {file1Name || 'Click to upload CSV'}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".csv,.txt"
                onChange={(e) => handleFileUpload(e, setFile1, setFile1Name)}
              />
            </label>
            {file1 && (
              <Textarea
                value={file1}
                onChange={(e) => setFile1(e.target.value)}
                className="mt-2 min-h-[150px] font-mono text-xs"
                placeholder="Or paste CSV data here..."
              />
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">File 2 (Modified)</Label>
          <Card className="p-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
              <div className="flex flex-col items-center justify-center">
                <FileUp className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {file2Name || 'Click to upload CSV'}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".csv,.txt"
                onChange={(e) => handleFileUpload(e, setFile2, setFile2Name)}
              />
            </label>
            {file2 && (
              <Textarea
                value={file2}
                onChange={(e) => setFile2(e.target.value)}
                className="mt-2 min-h-[150px] font-mono text-xs"
                placeholder="Or paste CSV data here..."
              />
            )}
          </Card>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={compareFiles} disabled={!file1 || !file2}>
          <FileDiff className="h-4 w-4 mr-2" />
          Compare Files
        </Button>
        <Button variant="ghost" onClick={handleClear}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      {result && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-4 bg-green-50 dark:bg-green-950">
            <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3">
              Added ({result.added.length})
            </h3>
            <ul className="space-y-2 text-sm max-h-[300px] overflow-y-auto">
              {result.added.map((item, i) => (
                <li key={i} className="text-green-600 dark:text-green-400">+ {item}</li>
              ))}
              {result.added.length === 0 && (
                <li className="text-muted-foreground">No additions</li>
              )}
            </ul>
          </Card>

          <Card className="p-4 bg-red-50 dark:bg-red-950">
            <h3 className="font-semibold text-red-700 dark:text-red-300 mb-3">
              Removed ({result.removed.length})
            </h3>
            <ul className="space-y-2 text-sm max-h-[300px] overflow-y-auto">
              {result.removed.map((item, i) => (
                <li key={i} className="text-red-600 dark:text-red-400">- {item}</li>
              ))}
              {result.removed.length === 0 && (
                <li className="text-muted-foreground">No removals</li>
              )}
            </ul>
          </Card>

          <Card className="p-4 bg-yellow-50 dark:bg-yellow-950">
            <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">
              Modified ({result.modified.length})
            </h3>
            <ul className="space-y-2 text-sm max-h-[300px] overflow-y-auto">
              {result.modified.map((item, i) => (
                <li key={i} className="text-yellow-600 dark:text-yellow-400">~ {item}</li>
              ))}
              {result.modified.length === 0 && (
                <li className="text-muted-foreground">No modifications</li>
              )}
            </ul>
          </Card>
        </div>
      )}

      {result && (
        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            Copy Results
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp, Calendar } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelAgeCalculator() {
  const [csvData, setCsvData] = useState('')
  const [result, setResult] = useState('')
  const [dateColumn, setDateColumn] = useState('')
  const [asOfDate, setAsOfDate] = useState(new Date().toISOString().split('T')[0])
  const [outputFormat, setOutputFormat] = useState<'years' | 'yearsMonths' | 'yearsMonthsDays'>('yearsMonths')
  const [newColumnName, setNewColumnName] = useState('Age')
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

  const calculateAge = (birthDate: string, asOf: Date): string => {
    const birth = new Date(birthDate)
    if (isNaN(birth.getTime())) return ''
    
    let years = asOf.getFullYear() - birth.getFullYear()
    let months = asOf.getMonth() - birth.getMonth()
    let days = asOf.getDate() - birth.getDate()
    
    if (days < 0) {
      months--
      const prevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0)
      days += prevMonth.getDate()
    }
    
    if (months < 0) {
      years--
      months += 12
    }
    
    switch (outputFormat) {
      case 'years':
        return years.toString()
      case 'yearsMonths':
        return `${years}y ${months}m`
      case 'yearsMonthsDays':
        return `${years}y ${months}m ${days}d`
      default:
        return years.toString()
    }
  }

  const calculateAges = () => {
    try {
      const { headers, rows } = parseCSV(csvData)
      const columnIndex = headers.indexOf(dateColumn)
      
      if (columnIndex === -1) {
        toast.error('Selected column not found')
        return
      }
      
      const asOf = new Date(asOfDate)
      
      const newHeaders = [...headers, newColumnName]
      const newRows = rows.map(row => {
        const birthDate = row[columnIndex]
        const age = calculateAge(birthDate, asOf)
        return [...row, age]
      })
      
      const output = [newHeaders.join(','), ...newRows.map(row => row.join(','))].join('\n')
      setResult(output)
      toast.success('Ages calculated')
    } catch (err) {
      toast.error('Failed to calculate ages')
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
    a.download = 'with_ages.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded with_ages.csv')
  }

  const handleClear = () => {
    setCsvData('')
    setResult('')
  }

  const headers = csvData.trim().split('\n')[0]?.split(',').map(h => h.trim()) || []

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Calculate Age from Dates in Excel</h1>
        <p className="text-muted-foreground mt-2">
          Automatically calculate ages from a list of birthdates in your Excel/CSV file.
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
            placeholder="name,birthdate
John,1990-05-15
Jane,1985-08-22
Bob,1995-03-10"
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          
          <div className="space-y-2">
            <Label>Date of Birth Column:</Label>
            <select
              value={dateColumn}
              onChange={(e) => setDateColumn(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select column</option>
              {headers.map((header) => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Calculate Age As Of:</Label>
            <Input
              type="date"
              value={asOfDate}
              onChange={(e) => setAsOfDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Output Column Name:</Label>
            <Input
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="e.g., Age"
            />
          </div>

          <div className="space-y-2">
            <Label>Age Format:</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={outputFormat === 'years' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOutputFormat('years')}
              >
                Years only
              </Button>
              <Button
                variant={outputFormat === 'yearsMonths' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOutputFormat('yearsMonths')}
              >
                Years & Months
              </Button>
              <Button
                variant={outputFormat === 'yearsMonthsDays' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOutputFormat('yearsMonthsDays')}
              >
                Years, Months, Days
              </Button>
            </div>
          </div>

          <Button onClick={calculateAges} className="w-full" disabled={!csvData || !dateColumn}>
            <Calendar className="h-4 w-4 mr-2" />
            Calculate Ages
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
          <Card className="p-4 bg-muted min-h-[500px]">
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

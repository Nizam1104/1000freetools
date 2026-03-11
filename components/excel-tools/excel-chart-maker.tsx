'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, FileUp, BarChart3 } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelChartMaker() {
  const [csvData, setCsvData] = useState('')
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar')
  const [labelColumn, setLabelColumn] = useState('')
  const [valueColumn, setValueColumn] = useState('')
  const [chartTitle, setChartTitle] = useState('My Chart')
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

  const generateChart = () => {
    try {
      const { headers, rows } = parseCSV(csvData)
      
      const labelIndex = headers.indexOf(labelColumn)
      const valueIndex = headers.indexOf(valueColumn)
      
      if (labelIndex === -1 || valueIndex === -1) {
        toast.error('Selected columns not found')
        return
      }
      
      const data = rows.map(row => ({
        label: row[labelIndex] || '',
        value: parseFloat(row[valueIndex]) || 0
      }))
      
      // Generate SVG chart
      const svg = generateSVG(data, chartType, chartTitle)
      setResult(svg)
      toast.success('Chart generated')
    } catch (err) {
      toast.error('Failed to generate chart')
    }
  }

  const [result, setResult] = useState('')

  const generateSVG = (data: { label: string; value: number }[], type: string, title: string) => {
    const width = 600
    const height = 400
    const padding = 60
    const maxValue = Math.max(...data.map(d => d.value))
    
    if (type === 'bar') {
      const barWidth = (width - padding * 2) / data.length - 10
      const chartHeight = height - padding * 2
      
      let bars = ''
      data.forEach((d, i) => {
        const x = padding + i * (barWidth + 10) + 5
        const barHeight = (d.value / maxValue) * chartHeight
        const y = height - padding - barHeight
        bars += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#3B82F6" rx="2"/>`
        bars += `<text x="${x + barWidth/2}" y="${height - padding + 20}" text-anchor="middle" font-size="10" fill="#666">${d.label}</text>`
        bars += `<text x="${x + barWidth/2}" y="${y - 5}" text-anchor="middle" font-size="10" fill="#333">${d.value}</text>`
      })
      
      return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <text x="${width/2}" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="#333">${title}</text>
  <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#ccc" stroke-width="2"/>
  <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#ccc" stroke-width="2"/>
  ${bars}
</svg>`
    }
    
    if (type === 'line') {
      const stepX = (width - padding * 2) / (data.length - 1 || 1)
      const chartHeight = height - padding * 2
      
      const points = data.map((d, i) => {
        const x = padding + i * stepX
        const y = height - padding - (d.value / maxValue) * chartHeight
        return `${x},${y}`
      }).join(' ')
      
      let labels = ''
      data.forEach((d, i) => {
        const x = padding + i * stepX
        labels += `<text x="${x}" y="${height - padding + 20}" text-anchor="middle" font-size="10" fill="#666">${d.label}</text>`
      })
      
      return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <text x="${width/2}" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="#333">${title}</text>
  <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#ccc" stroke-width="2"/>
  <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#ccc" stroke-width="2"/>
  <polyline points="${points}" fill="none" stroke="#3B82F6" stroke-width="2"/>
  ${data.map((d, i) => {
    const x = padding + i * stepX
    const y = height - padding - (d.value / maxValue) * chartHeight
    return `<circle cx="${x}" cy="${y}" r="5" fill="#3B82F6"/><text x="${x}" y="${y - 10}" text-anchor="middle" font-size="10" fill="#333">${d.value}</text>`
  }).join('')}
  ${labels}
</svg>`
    }
    
    if (type === 'pie') {
      const centerX = width / 2
      const centerY = height / 2 + 20
      const radius = Math.min(width, height) / 2 - padding
      const total = data.reduce((sum, d) => sum + d.value, 0)
      
      let slices = ''
      let currentAngle = -90
      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']
      
      data.forEach((d, i) => {
        const sliceAngle = (d.value / total) * 360
        const startAngle = currentAngle
        const endAngle = currentAngle + sliceAngle
        
        const startRad = (startAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180
        
        const x1 = centerX + radius * Math.cos(startRad)
        const y1 = centerY + radius * Math.sin(startRad)
        const x2 = centerX + radius * Math.cos(endRad)
        const y2 = centerY + radius * Math.sin(endRad)
        
        const largeArc = sliceAngle > 180 ? 1 : 0
        
        slices += `<path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${colors[i % colors.length]}"/>`
        
        currentAngle = endAngle
      })
      
      return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <text x="${width/2}" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="#333">${title}</text>
  <g transform="translate(0, 20)">
    ${slices}
  </g>
  <g transform="translate(${width - padding - 100}, ${padding})">
    ${data.map((d, i) => `
      <rect x="0" y="${i * 25}" width="15" height="15" fill="${colors[i % colors.length]}"/>
      <text x="20" y="${i * 25 + 12}" font-size="10" fill="#333">${d.label}</text>
    `).join('')}
  </g>
</svg>`
    }
    
    return ''
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
      toast.success('SVG copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!result) return
    const blob = new Blob([result], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'chart.svg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded chart.svg')
  }

  const handleClear = () => {
    setCsvData('')
    setResult('')
    setLabelColumn('')
    setValueColumn('')
  }

  const headers = csvData.trim().split('\n')[0]?.split(',').map(h => h.trim()) || []

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Charts from Excel Data Online</h1>
        <p className="text-muted-foreground mt-2">
          Turn your spreadsheet numbers into visual charts. Download as SVG for use anywhere.
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
            placeholder="Month,Sales
January,1200
February,1800
March,1500
April,2200"
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          
          <div className="space-y-2">
            <Label>Chart Type:</Label>
            <div className="flex gap-2">
              <Button
                variant={chartType === 'bar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('bar')}
              >
                Bar Chart
              </Button>
              <Button
                variant={chartType === 'line' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('line')}
              >
                Line Chart
              </Button>
              <Button
                variant={chartType === 'pie' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('pie')}
              >
                Pie Chart
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Label Column:</Label>
              <select
                value={labelColumn}
                onChange={(e) => setLabelColumn(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select column</option>
                {headers.map((header) => (
                  <option key={header} value={header}>{header}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Value Column:</Label>
              <select
                value={valueColumn}
                onChange={(e) => setValueColumn(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select column</option>
                {headers.map((header) => (
                  <option key={header} value={header}>{header}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Chart Title:</Label>
            <Input
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Enter chart title"
            />
          </div>

          <Button onClick={generateChart} className="w-full" disabled={!csvData || !labelColumn || !valueColumn}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Chart
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Chart Preview</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!result}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!result}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px] flex items-center justify-center">
            {result ? (
              <div dangerouslySetInnerHTML={{ __html: result }} className="w-full" />
            ) : (
              <p className="text-muted-foreground text-sm">Chart will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

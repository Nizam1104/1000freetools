'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Download, RotateCcw, Check, FileUp, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export default function ExcelRandomDataGenerator() {
  const [result, setResult] = useState('')
  const [numRows, setNumRows] = useState(10)
  const [columns, setColumns] = useState<{ name: string; type: string; options?: string }[]>([
    { name: 'id', type: 'number' },
  ])
  const [copied, setCopied] = useState(false)

  const addColumn = () => {
    setColumns([...columns, { name: `column_${columns.length + 1}`, type: 'text' }])
  }

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index))
  }

  const updateColumn = (index: number, field: string, value: string) => {
    const newColumns = [...columns]
    newColumns[index] = { ...newColumns[index], [field]: value }
    setColumns(newColumns)
  }

  const generateRandom = (type: string, options?: string): string => {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Chris', 'Lisa', 'James', 'Emma', 'Robert', 'Olivia']
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego']
    const products = ['Widget', 'Gadget', 'Device', 'Tool', 'Item', 'Product', 'Package', 'Bundle']
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com', 'company.com']

    switch (type) {
      case 'text':
        if (options) {
          return options.split(',').map(s => s.trim())[Math.floor(Math.random() * options.split(',').length)]
        }
        return `Text_${Math.floor(Math.random() * 1000)}`
      
      case 'number':
        return Math.floor(Math.random() * 1000).toString()
      
      case 'email':
        const first = firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase()
        const last = lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase()
        const domain = domains[Math.floor(Math.random() * domains.length)]
        return `${first}.${last}@${domain}`
      
      case 'name':
        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
      
      case 'date':
        const start = new Date(2020, 0, 1)
        const end = new Date(2024, 11, 31)
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        return date.toISOString().split('T')[0]
      
      case 'phone':
        return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
      
      case 'city':
        return cities[Math.floor(Math.random() * cities.length)]
      
      case 'product':
        return `${products[Math.floor(Math.random() * products.length)]}-${Math.floor(Math.random() * 1000)}`
      
      case 'price':
        return (Math.random() * 1000).toFixed(2)
      
      case 'boolean':
        return Math.random() > 0.5 ? 'true' : 'false'
      
      case 'uuid':
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0
          const v = c === 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
        })
      
      default:
        return 'Unknown'
    }
  }

  const generateData = () => {
    try {
      const headers = columns.map(c => c.name)
      const rows = []
      
      for (let i = 0; i < numRows; i++) {
        const row = columns.map(col => {
          if (col.type === 'number' && col.name.toLowerCase().includes('id')) {
            return (i + 1).toString()
          }
          return generateRandom(col.type, col.options)
        })
        rows.push(row)
      }
      
      const output = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
      setResult(output)
      toast.success(`Generated ${numRows} rows of fake data`)
    } catch (err) {
      toast.error('Failed to generate data')
    }
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
    a.download = 'fake_data.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded fake_data.csv')
  }

  const handleClear = () => {
    setResult('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Generate Fake Data for Excel Spreadsheets</h1>
        <p className="text-muted-foreground mt-2">
          Create realistic fake data for testing, demos, or sample spreadsheets.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Number of Rows:</Label>
            <Input
              type="number"
              value={numRows}
              onChange={(e) => setNumRows(parseInt(e.target.value) || 10)}
              className="w-24"
              min="1"
              max="1000"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Columns:</Label>
              <Button variant="outline" size="sm" onClick={addColumn}>
                <span className="h-4 w-4 mr-2">+</span>
                Add Column
              </Button>
            </div>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {columns.map((col, index) => (
                <Card key={index} className="p-3">
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder="Column name"
                      value={col.name}
                      onChange={(e) => updateColumn(index, 'name', e.target.value)}
                      className="flex-1"
                    />
                    <select
                      value={col.type}
                      onChange={(e) => updateColumn(index, 'type', e.target.value)}
                      className="flex h-10 w-32 rounded-md border border-input bg-background px-2 text-sm"
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="email">Email</option>
                      <option value="name">Name</option>
                      <option value="date">Date</option>
                      <option value="phone">Phone</option>
                      <option value="city">City</option>
                      <option value="product">Product</option>
                      <option value="price">Price</option>
                      <option value="boolean">Boolean</option>
                      <option value="uuid">UUID</option>
                    </select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeColumn(index)}
                      disabled={columns.length === 1}
                    >
                      <span className="h-4 w-4">×</span>
                    </Button>
                  </div>
                  {(col.type === 'text') && (
                    <Input
                      placeholder="Options (comma separated)"
                      value={col.options || ''}
                      onChange={(e) => updateColumn(index, 'options', e.target.value)}
                      className="mt-2"
                    />
                  )}
                </Card>
              ))}
            </div>
          </div>

          <Button onClick={generateData} className="w-full">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Fake Data
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Generated Data</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!result}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!result}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[500px]">
            {result ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{result}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Generated data will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

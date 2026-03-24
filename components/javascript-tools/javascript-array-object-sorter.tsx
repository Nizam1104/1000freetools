'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, RotateCcw, Check, ArrowUpDown } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptArrayObjectSorter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [sortType, setSortType] = useState<'primitive' | 'object'>('primitive')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [sortBy, setSortBy] = useState('')
  const [copied, setCopied] = useState(false)

  const sort = () => {
    try {
      if (sortType === 'primitive') {
        const arr = JSON.parse(input)
        if (!Array.isArray(arr)) {
          throw new Error('Input must be an array')
        }
        
        const sorted = [...arr].sort((a, b) => {
          if (typeof a === 'number' && typeof b === 'number') {
            return order === 'asc' ? a - b : b - a
          }
          const aStr = String(a).toLowerCase()
          const bStr = String(b).toLowerCase()
          if (order === 'asc') {
            return aStr.localeCompare(bStr)
          }
          return bStr.localeCompare(aStr)
        })
        
        setOutput(JSON.stringify(sorted, null, 2))
        toast.success('Array sorted')
      } else {
        const arr = JSON.parse(input)
        if (!Array.isArray(arr)) {
          throw new Error('Input must be an array of objects')
        }
        
        if (!sortBy) {
          throw new Error('Please specify a property to sort by')
        }
        
        const sorted = [...arr].sort((a, b) => {
          const aVal = a[sortBy]
          const bVal = b[sortBy]
          
          if (aVal === undefined && bVal === undefined) return 0
          if (aVal === undefined) return 1
          if (bVal === undefined) return -1
          
          if (typeof aVal === 'number' && typeof bVal === 'number') {
            return order === 'asc' ? aVal - bVal : bVal - aVal
          }
          
          const aStr = String(aVal).toLowerCase()
          const bStr = String(bVal).toLowerCase()
          if (order === 'asc') {
            return aStr.localeCompare(bStr)
          }
          return bStr.localeCompare(aStr)
        })
        
        setOutput(JSON.stringify(sorted, null, 2))
        toast.success('Objects sorted')
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Invalid input')
      setOutput('')
    }
  }

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Sort JavaScript Arrays and Objects</h2>
        <p className="text-muted-foreground mt-2">
          Sort arrays of numbers, strings, or complex objects by any property with custom order.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input" className="text-base font-medium">Input Array</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="input"
            placeholder={sortType === 'primitive' 
              ? '[3, 1, 4, 1, 5, 9, 2, 6]' 
              : '[{ name: "John", age: 30 }, { name: "Jane", age: 25 }]'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
          
          <div className="space-y-2">
            <Label>Sort Type:</Label>
            <div className="flex gap-2">
              <Button
                variant={sortType === 'primitive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortType('primitive')}
              >
                Primitives
              </Button>
              <Button
                variant={sortType === 'object' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortType('object')}
              >
                Objects
              </Button>
            </div>
          </div>

          {sortType === 'object' && (
            <div className="space-y-2">
              <Label htmlFor="sort-by">Sort By Property:</Label>
              <Input
                id="sort-by"
                placeholder="e.g., name, age, price"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant={order === 'asc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOrder('asc')}
              className="flex-1"
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Ascending
            </Button>
            <Button
              variant={order === 'desc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOrder('desc')}
              className="flex-1"
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Descending
            </Button>
          </div>

          <Button onClick={sort} className="w-full">
            Sort Array
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Sorted Output</Label>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {output ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Sorted array will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

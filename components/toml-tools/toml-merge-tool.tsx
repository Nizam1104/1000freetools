'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function TomlMergeTool() {
  const [toml1, setToml1] = useState('')
  const [toml2, setToml2] = useState('')
  const [mergedOutput, setMergedOutput] = useState('')
  const [conflictStrategy, setConflictStrategy] = useState<'overwrite' | 'skip' | 'rename'>('overwrite')
  const [copied, setCopied] = useState(false)

  const mergeToml = () => {
    try {
      const parsed1 = toml.parse(toml1 || '{}')
      const parsed2 = toml.parse(toml2 || '{}')
      
      const merged = deepMerge(parsed1, parsed2, conflictStrategy)
      const tomlString = jsonToToml(merged)
      setMergedOutput(tomlString)
      toast.success('TOML files merged successfully')
    } catch (err) {
      toast.error('Invalid TOML. Please check your input.')
    }
  }

  const deepMerge = (obj1: any, obj2: any, strategy: string, path = ''): any => {
    const result = { ...obj1 }
    
    for (const key of Object.keys(obj2)) {
      const fullPath = path ? `${path}.${key}` : key
      
      if (key in obj1) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object' && 
            obj1[key] !== null && obj2[key] !== null && 
            !Array.isArray(obj1[key]) && !Array.isArray(obj2[key])) {
          result[key] = deepMerge(obj1[key], obj2[key], strategy, fullPath)
        } else {
          if (strategy === 'overwrite') {
            result[key] = obj2[key]
          } else if (strategy === 'skip') {
            // Keep original
          } else if (strategy === 'rename') {
            let newKey = key + '_2'
            let counter = 2
            while (newKey in result) {
              newKey = key + '_' + (++counter)
            }
            result[newKey] = obj2[key]
          }
        }
      } else {
        result[key] = obj2[key]
      }
    }
    
    return result
  }

  const jsonToToml = (obj: any, parentKey = ''): string => {
    if (!obj || typeof obj !== 'object') return ''
    
    let result = ''
    
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key
      
      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
          for (const item of value) {
            result += `[[${fullKey}]]\n`
            result += jsonToToml(item)
          }
        } else {
          const arrayValues = value.map(v => formatTomlValue(v)).join(', ')
          result += `${key} = [${arrayValues}]\n`
        }
      } else if (typeof value === 'object' && value !== null) {
        result += `[${fullKey}]\n`
        result += jsonToToml(value)
      } else {
        result += `${key} = ${formatTomlValue(value)}\n`
      }
    }
    
    return result
  }

  const formatTomlValue = (value: any): string => {
    if (value === null || value === undefined) return 'null'
    if (typeof value === 'boolean') return value ? 'true' : 'false'
    if (typeof value === 'number') return value.toString()
    if (typeof value === 'string') {
      return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
    }
    return '""'
  }

  const handleCopy = async () => {
    if (!mergedOutput) return
    try {
      await navigator.clipboard.writeText(mergedOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!mergedOutput) return
    const blob = new Blob([mergedOutput], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'merged.toml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded merged.toml')
  }

  const handleClear = () => {
    setToml1('')
    setToml2('')
    setMergedOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Merge Multiple TOML Files</h1>
        <p className="text-muted-foreground mt-2">
          Combine configurations from two TOML files with conflict resolution options.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="space-y-4">
          <Label htmlFor="toml1" className="text-base font-medium">Base TOML</Label>
          <Textarea
            id="toml1"
            placeholder={`[package]
name = "my-project"`}
            value={toml1}
            onChange={(e) => setToml1(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="toml2" className="text-base font-medium">TOML to Merge</Label>
          <Textarea
            id="toml2"
            placeholder={`[package]
version = "1.0.0"`}
            value={toml2}
            onChange={(e) => setToml2(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Label>Conflict Strategy:</Label>
        <div className="flex gap-2">
          <Button
            variant={conflictStrategy === 'overwrite' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setConflictStrategy('overwrite')}
          >
            Overwrite
          </Button>
          <Button
            variant={conflictStrategy === 'skip' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setConflictStrategy('skip')}
          >
            Skip
          </Button>
          <Button
            variant={conflictStrategy === 'rename' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setConflictStrategy('rename')}
          >
            Rename
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={mergeToml}>
          <Plus className="h-4 w-4 mr-2" />
          Merge TOML
        </Button>
        <Button variant="ghost" onClick={handleClear}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>

      {mergedOutput && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Merged Output</Label>
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
            <pre className="font-mono text-sm whitespace-pre-wrap">{mergedOutput}</pre>
          </Card>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Minimize2 } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function TomlMinifierCompressor() {
  const [tomlInput, setTomlInput] = useState('')
  const [minifiedOutput, setMinifiedOutput] = useState('')
  const [preserveImportant, setPreserveImportant] = useState(false)
  const [copied, setCopied] = useState(false)

  const minifyToml = () => {
    try {
      const parsed = toml.parse(tomlInput)
      let output = jsonToToml(parsed)
      
      if (preserveImportant) {
        const importantComments = tomlInput
          .split('\n')
          .filter(line => line.trim().startsWith('#!'))
          .join('\n')
        if (importantComments) {
          output = importantComments + '\n' + output
        }
      }
      
      setMinifiedOutput(output)
      toast.success('TOML minified successfully')
    } catch (err) {
      toast.error('Invalid TOML. Please check your input.')
    }
  }

  const jsonToToml = (obj: any): string => {
    let result = ''
    
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
          for (const item of value) {
            result += `[[${key}]]`
            result += jsonToToml(item)
          }
        } else {
          const arrayValues = value.map(v => formatValue(v)).join(',')
          result += `${key}=[${arrayValues}]\n`
        }
      } else if (typeof value === 'object' && value !== null) {
        result += `[${key}]\n`
        result += jsonToToml(value)
      } else {
        result += `${key}=${formatValue(value)}\n`
      }
    }
    
    return result
  }

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'null'
    if (typeof value === 'boolean') return value ? 'true' : 'false'
    if (typeof value === 'number') return value.toString()
    if (typeof value === 'string') {
      return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
    }
    return '""'
  }

  const handleCopy = async () => {
    if (!minifiedOutput) return
    try {
      await navigator.clipboard.writeText(minifiedOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!minifiedOutput) return
    const blob = new Blob([minifiedOutput], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'minified.toml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded minified.toml')
  }

  const handleClear = () => {
    setTomlInput('')
    setMinifiedOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Minify and Compress TOML Files</h2>
        <p className="text-muted-foreground mt-2">
          Reduce TOML file size by removing whitespace and comments for production deployment.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="toml-input" className="text-base font-medium">TOML Input</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="toml-input"
            placeholder={`[package]
name = "my-project"
version = "1.0.0"`}
            value={tomlInput}
            onChange={(e) => setTomlInput(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="preserve"
              checked={preserveImportant}
              onChange={(e) => setPreserveImportant(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="preserve" className="text-sm cursor-pointer">
              Preserve important comments (starting with #!)
            </Label>
          </div>
          <Button onClick={minifyToml} className="w-full">
            <Minimize2 className="h-4 w-4 mr-2" />
            Minify TOML
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Minified Output</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!minifiedOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!minifiedOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {minifiedOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{minifiedOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Minified TOML will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

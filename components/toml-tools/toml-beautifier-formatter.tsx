'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Minimize2, Maximize2 } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function TomlBeautifierFormatter() {
  const [tomlInput, setTomlInput] = useState('')
  const [formattedOutput, setFormattedOutput] = useState('')
  const [compactMode, setCompactMode] = useState(false)
  const [copied, setCopied] = useState(false)

  const formatToml = () => {
    try {
      const parsed = toml.parse(tomlInput)
      const output = compactMode ? minifyToml(parsed) : beautifyToml(parsed)
      setFormattedOutput(output)
      toast.success(compactMode ? 'TOML minified' : 'TOML formatted')
    } catch (err) {
      toast.error('Invalid TOML. Please check your input.')
    }
  }

  const beautifyToml = (obj: any, indent = 0): string => {
    let result = ''
    const spaces = ' '.repeat(indent)
    
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
          for (const item of value) {
            result += `\n[[${key}]]\n`
            result += beautifyToml(item, indent)
          }
        } else {
          const arrayValues = value.map(v => formatValue(v)).join(', ')
          result += `${spaces}${key} = [${arrayValues}]\n`
        }
      } else if (typeof value === 'object' && value !== null) {
        result += `\n[${key}]\n`
        result += beautifyToml(value, indent)
      } else {
        result += `${spaces}${key} = ${formatValue(value)}\n`
      }
    }
    
    return result.trim() + '\n'
  }

  const minifyToml = (obj: any): string => {
    let result = ''
    
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
          for (const item of value) {
            result += `[[${key}]]`
            result += minifyToml(item)
          }
        } else {
          const arrayValues = value.map(v => formatValue(v)).join(',')
          result += `${key}=[${arrayValues}]\n`
        }
      } else if (typeof value === 'object' && value !== null) {
        result += `[${key}]\n`
        result += minifyToml(value)
      } else {
        result += `${key}=${formatValue(value)}\n`
      }
    }
    
    return result
  }

  const formatValue = (value: any): string => {
    if (value === null) return 'null'
    if (typeof value === 'boolean') return value ? 'true' : 'false'
    if (typeof value === 'number') return value.toString()
    if (typeof value === 'string') {
      if (!isNaN(Date.parse(value))) return value
      return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
    }
    return '""'
  }

  const handleCopy = async () => {
    if (!formattedOutput) return
    try {
      await navigator.clipboard.writeText(formattedOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!formattedOutput) return
    const blob = new Blob([formattedOutput], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.toml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded formatted.toml')
  }

  const handleClear = () => {
    setTomlInput('')
    setFormattedOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Beautify and Format TOML Code</h2>
        <p className="text-muted-foreground mt-2">
          Format messy TOML with consistent indentation and spacing, or minify for production.
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
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Formatted Output</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCompactMode(!compactMode)}
                title={compactMode ? 'Pretty format' : 'Minify'}
              >
                {compactMode ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!formattedOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!formattedOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {formattedOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{formattedOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Formatted TOML will appear here</p>
            )}
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={formatToml} className="w-full md:w-auto">
          {compactMode ? 'Minify TOML' : 'Beautify TOML'}
        </Button>
      </div>
    </div>
  )
}

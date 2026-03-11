'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function TomlToIniConverter() {
  const [tomlInput, setTomlInput] = useState('')
  const [iniOutput, setIniOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const convertToIni = () => {
    try {
      const parsed = toml.parse(tomlInput)
      const iniString = jsonToIni(parsed)
      setIniOutput(iniString)
      toast.success('Successfully converted TOML to INI')
    } catch (err) {
      toast.error('Invalid TOML. Please check your input.')
    }
  }

  const jsonToIni = (obj: any, parentKey = ''): string => {
    let result = ''
    let simpleKeys = ''
    
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key
      
      if (Array.isArray(value)) {
        const arrayValues = value.map(v => formatIniValue(v)).join(', ')
        simpleKeys += `${key} = ${arrayValues}\n`
      } else if (typeof value === 'object' && value !== null) {
        result += `\n[${fullKey}]\n`
        result += jsonToIni(value)
      } else {
        simpleKeys += `${key} = ${formatIniValue(value)}\n`
      }
    }
    
    return simpleKeys + result
  }

  const formatIniValue = (value: any): string => {
    if (value === null || value === undefined) return ''
    if (typeof value === 'boolean') return value ? 'true' : 'false'
    if (typeof value === 'number') return value.toString()
    if (typeof value === 'string') {
      return `"${value.replace(/"/g, '\\"')}"`
    }
    return '""'
  }

  const handleCopy = async () => {
    if (!iniOutput) return
    try {
      await navigator.clipboard.writeText(iniOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!iniOutput) return
    const blob = new Blob([iniOutput], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'config.ini'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded config.ini')
  }

  const handleClear = () => {
    setTomlInput('')
    setIniOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Convert TOML to INI Format</h1>
        <p className="text-muted-foreground mt-2">
          Downgrade TOML to INI for compatibility with older software and legacy systems.
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
          <Button onClick={convertToIni} className="w-full">
            Convert to INI
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">INI Output</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!iniOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!iniOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {iniOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{iniOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">INI output will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

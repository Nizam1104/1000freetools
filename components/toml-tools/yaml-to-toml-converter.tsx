'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check } from 'lucide-react'
import { toast } from 'sonner'
import yaml from 'js-yaml'
import * as toml from 'toml'

export default function YamlToTomlConverter() {
  const [yamlInput, setYamlInput] = useState('')
  const [tomlOutput, setTomlOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const convertToToml = () => {
    try {
      const parsed = yaml.load(yamlInput) as any
      const tomlString = jsonToToml(parsed)
      setTomlOutput(tomlString)
      toast.success('Successfully converted YAML to TOML')
    } catch (err) {
      toast.error('Invalid YAML. Please check your input.')
    }
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
    if (!tomlOutput) return
    try {
      await navigator.clipboard.writeText(tomlOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!tomlOutput) return
    const blob = new Blob([tomlOutput], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'config.toml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded config.toml')
  }

  const handleClear = () => {
    setYamlInput('')
    setTomlOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Convert YAML to TOML Online</h2>
        <p className="text-muted-foreground mt-2">
          Transform YAML configurations to TOML format with accurate structure translation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="yaml-input" className="text-base font-medium">YAML Input</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="yaml-input"
            placeholder="package:
  name: my-project
  version: 1.0.0"
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />
          <Button onClick={convertToToml} className="w-full">
            Convert to TOML
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">TOML Output</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!tomlOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!tomlOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {tomlOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{tomlOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">TOML output will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

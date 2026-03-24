'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function TomlToXmlConverter() {
  const [tomlInput, setTomlInput] = useState('')
  const [xmlOutput, setXmlOutput] = useState('')
  const [rootElement, setRootElement] = useState('config')
  const [copied, setCopied] = useState(false)

  const convertToXml = () => {
    try {
      const parsed = toml.parse(tomlInput)
      const xmlString = jsonToXml(parsed, rootElement)
      setXmlOutput(xmlString)
      toast.success('Successfully converted TOML to XML')
    } catch (err) {
      toast.error('Invalid TOML. Please check your input.')
    }
  }

  const jsonToXml = (obj: any, rootName: string, indent = 0): string => {
    const spaces = '  '.repeat(indent)
    let result = `<?xml version="1.0" encoding="UTF-8"?>\n${spaces}<${rootName}>\n`
    
    for (const [key, value] of Object.entries(obj)) {
      result += convertValueToXml(key, value, indent + 1)
    }
    
    result += `${spaces}</${rootName}>`
    return result
  }

  const convertValueToXml = (key: string, value: any, indent: number): string => {
    const spaces = '  '.repeat(indent)
    
    if (Array.isArray(value)) {
      return value.map(item => 
        `${spaces}<${key}>\n${convertValueToXml('item', item, indent + 1)}${spaces}</${key}>\n`
      ).join('')
    } else if (typeof value === 'object' && value !== null) {
      let result = `${spaces}<${key}>\n`
      for (const [k, v] of Object.entries(value)) {
        result += convertValueToXml(k, v, indent + 1)
      }
      result += `${spaces}</${key}>\n`
      return result
    } else {
      return `${spaces}<${key}>${escapeXml(String(value))}</${key}>\n`
    }
  }

  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  const handleCopy = async () => {
    if (!xmlOutput) return
    try {
      await navigator.clipboard.writeText(xmlOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!xmlOutput) return
    const blob = new Blob([xmlOutput], { type: 'text/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'config.xml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded config.xml')
  }

  const handleClear = () => {
    setTomlInput('')
    setXmlOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Convert TOML to XML Format</h2>
        <p className="text-muted-foreground mt-2">
          Transform TOML configurations to well-formed XML with customizable root element.
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
          <div className="flex items-center gap-4">
            <Label htmlFor="root-element" className="text-sm">Root Element Name:</Label>
            <input
              id="root-element"
              type="text"
              value={rootElement}
              onChange={(e) => setRootElement(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <Button onClick={convertToXml} className="w-full">
            Convert to XML
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">XML Output</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!xmlOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!xmlOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {xmlOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{xmlOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">XML output will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function XmlToTomlConverter() {
  const [xmlInput, setXmlInput] = useState('')
  const [tomlOutput, setTomlOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const convertToToml = () => {
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlInput, 'text/xml')
      
      const parseError = xmlDoc.querySelector('parsererror')
      if (parseError) {
        toast.error('Invalid XML. Please check your input.')
        return
      }
      
      const jsonObj = xmlToJson(xmlDoc)
      const tomlString = jsonToToml(jsonObj)
      setTomlOutput(tomlString)
      toast.success('Successfully converted XML to TOML')
    } catch (err) {
      toast.error('Conversion failed. Please check your XML input.')
    }
  }

  const xmlToJson = (xml: any): any => {
    const obj: any = {}
    
    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        for (let i = 0; i < xml.attributes.length; i++) {
          const attribute = xml.attributes[i]
          obj[`@${attribute.nodeName}`] = attribute.nodeValue
        }
      }
    }
    
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes[i]
        const nodeName = item.nodeName
        
        if (item.nodeType === 3) {
          const text = item.nodeValue?.trim()
          if (text) {
            if (Object.keys(obj).length === 0) {
              return text
            }
            obj['#text'] = text
          }
        } else if (item.nodeType === 1) {
          if (obj[nodeName]) {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]]
            }
            obj[nodeName].push(xmlToJson(item))
          } else {
            obj[nodeName] = xmlToJson(item)
          }
        }
      }
    }
    
    return Object.keys(obj).length === 0 ? null : obj
  }

  const jsonToToml = (obj: any, parentKey = ''): string => {
    if (!obj || typeof obj !== 'object') return ''
    
    let result = ''
    
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('@')) continue // Skip attributes for now
      
      const fullKey = parentKey ? `${parentKey}.${key}` : key
      const cleanKey = key.replace(/^@/, '')
      
      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
          for (const item of value) {
            result += `[[${cleanKey}]]\n`
            result += jsonToToml(item)
          }
        } else {
          const arrayValues = value.map(v => formatTomlValue(v)).join(', ')
          result += `${cleanKey} = [${arrayValues}]\n`
        }
      } else if (typeof value === 'object' && value !== null) {
        result += `[${cleanKey}]\n`
        result += jsonToToml(value)
      } else if (key !== '#text') {
        result += `${cleanKey} = ${formatTomlValue(value)}\n`
      }
    }
    
    return result
  }

  const formatTomlValue = (value: any): string => {
    if (value === null || value === undefined) return 'null'
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
    setXmlInput('')
    setTomlOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Convert XML to TOML Online</h2>
        <p className="text-muted-foreground mt-2">
          Simplify complex XML by converting it to human-readable TOML format.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="xml-input" className="text-base font-medium">XML Input</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="xml-input"
            placeholder={`<?xml version="1.0"?>
<config>
  <package>
    <name>my-project</name>
    <version>1.0.0</version>
  </package>
</config>`}
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
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

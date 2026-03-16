'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptObjectToJsonConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'objectToJson' | 'jsonToObject'>('objectToJson')
  const [prettyPrint, setPrettyPrint] = useState(true)
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      if (mode === 'objectToJson') {
        // Parse as JS object literal (simplified - handles basic cases)
        const obj = parseObjectLiteral(input)
        const json = prettyPrint ? JSON.stringify(obj, null, 2) : JSON.stringify(obj)
        setOutput(json)
        toast.success('Converted to JSON')
      } else {
        // Parse JSON and format as object literal
        const obj = JSON.parse(input)
        const objectLiteral = JSON.stringify(obj, null, 2)
          .replace(/"([^"]+)":/g, '$1:')
          .replace(/"/g, "'")
        setOutput(objectLiteral)
        toast.success('Converted to Object')
      }
    } catch (err) {
      toast.error(mode === 'objectToJson' ? 'Invalid object literal' : 'Invalid JSON')
      setOutput('')
    }
  }

  const parseObjectLiteral = (str: string): any => {
    // Clean up the input
    str = str.trim()
    
    // Handle empty input
    if (!str || str === '{}' || str === '{\n}') {
      return {}
    }
    
    // Try to evaluate as JSON first
    try {
      return JSON.parse(str)
    } catch {}
    
    // Simple object literal parser for basic cases
    try {
      // Replace single quotes with double quotes
      let normalized = str.replace(/'/g, '"')
      
      // Remove trailing commas
      normalized = normalized.replace(/,\s*}/g, '}')
      normalized = normalized.replace(/,\s*]/g, ']')
      
      // Remove unquoted keys quotes if they exist
      normalized = normalized.replace(/"(\w+)":/g, '$1:')
      
      // Try to parse as JSON
      try {
        return JSON.parse(normalized)
      } catch {}
      
      // Last resort: use Function constructor (safe for this context)
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${str}`)()
      return result
    } catch (err) {
      throw new Error('Could not parse object literal')
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

  const handleDownload = () => {
    if (!output) return
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = mode === 'objectToJson' ? 'output.json' : 'output.js'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${mode === 'objectToJson' ? 'output.json' : 'output.js'}`)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Convert JavaScript Objects to JSON and Back</h1>
        <p className="text-muted-foreground mt-2">
          Transform JavaScript object literals into JSON strings and parse JSON back into live objects.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input" className="text-base font-medium">Input</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="input"
            placeholder={mode === 'objectToJson' 
              ? '{ name: "John", age: 30, active: true }' 
              : '{"name": "John", "age": 30, "active": true}'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
          
          {mode === 'objectToJson' && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="pretty"
                checked={prettyPrint}
                onChange={(e) => setPrettyPrint(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="pretty" className="text-sm cursor-pointer">
                Pretty print JSON output
              </Label>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant={mode === 'objectToJson' ? 'default' : 'outline'}
              onClick={() => setMode('objectToJson')}
              className="flex-1"
            >
              Object to JSON
            </Button>
            <Button
              variant={mode === 'jsonToObject' ? 'default' : 'outline'}
              onClick={() => setMode('jsonToObject')}
              className="flex-1"
            >
              JSON to Object
            </Button>
          </div>

          <Button onClick={convert} className="w-full">
            {mode === 'objectToJson' ? 'Convert to JSON' : 'Convert to Object'}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === 'objectToJson' ? 'JSON Output' : 'Object Literal Output'}
            </Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!output}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {output ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Output will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

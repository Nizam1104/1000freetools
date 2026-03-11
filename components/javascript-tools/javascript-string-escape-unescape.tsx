'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, RotateCcw, Check } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptStringEscapeUnescape() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'escape' | 'unescape'>('escape')
  const [context, setContext] = useState<'javascript' | 'json' | 'html' | 'url'>('javascript')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      if (mode === 'escape') {
        switch (context) {
          case 'javascript':
            setOutput(escapeJavaScript(input))
            break
          case 'json':
            setOutput(JSON.stringify(input))
            break
          case 'html':
            setOutput(escapeHTML(input))
            break
          case 'url':
            setOutput(encodeURIComponent(input))
            break
        }
        toast.success('String escaped')
      } else {
        switch (context) {
          case 'javascript':
            setOutput(unescapeJavaScript(input))
            break
          case 'json':
            setOutput(JSON.parse(`"${input}"`))
            break
          case 'html':
            setOutput(unescapeHTML(input))
            break
          case 'url':
            setOutput(decodeURIComponent(input))
            break
        }
        toast.success('String unescaped')
      }
    } catch (err) {
      toast.error(mode === 'escape' ? 'Escaping failed' : 'Invalid escaped string')
      setOutput('')
    }
  }

  const escapeJavaScript = (str: string): string => {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')
      .replace(/\f/g, '\\f')
      .replace(/\v/g, '\\v')
      .replace(/\0/g, '\\0')
  }

  const unescapeJavaScript = (str: string): string => {
    return str
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\f/g, '\f')
      .replace(/\\v/g, '\v')
      .replace(/\\0/g, '\0')
      .replace(/\\\\/g, '\\')
  }

  const escapeHTML = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  const unescapeHTML = (str: string): string => {
    const doc = new DOMParser().parseFromString(str, 'text/html')
    return doc.documentElement.textContent || str
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
        <h1 className="text-3xl font-bold tracking-tight">Escape and Unescape JavaScript Strings</h1>
        <p className="text-muted-foreground mt-2">
          Escape special characters for safe embedding in code, JSON, HTML, or URLs.
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
            placeholder={mode === 'escape' ? 'Enter string to escape...' : 'Enter escaped string...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
          
          <div className="space-y-2">
            <Label>Context:</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={context === 'javascript' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setContext('javascript')}
              >
                JavaScript
              </Button>
              <Button
                variant={context === 'json' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setContext('json')}
              >
                JSON
              </Button>
              <Button
                variant={context === 'html' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setContext('html')}
              >
                HTML
              </Button>
              <Button
                variant={context === 'url' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setContext('url')}
              >
                URL
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={mode === 'escape' ? 'default' : 'outline'}
              onClick={() => setMode('escape')}
              className="flex-1"
            >
              Escape
            </Button>
            <Button
              variant={mode === 'unescape' ? 'default' : 'outline'}
              onClick={() => setMode('unescape')}
              className="flex-1"
            >
              Unescape
            </Button>
          </div>

          <Button onClick={convert} className="w-full">
            {mode === 'escape' ? 'Escape String' : 'Unescape String'}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === 'escape' ? 'Escaped Output' : 'Unescaped Output'}
            </Label>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Card className="p-4 bg-muted min-h-[300px]">
            {output ? (
              <pre className="font-mono text-sm whitespace-pre-wrap break-all">{output}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Output will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function TomlCommentRemover() {
  const [tomlInput, setTomlInput] = useState('')
  const [cleanOutput, setCleanOutput] = useState('')
  const [keepInline, setKeepInline] = useState(false)
  const [copied, setCopied] = useState(false)

  const removeComments = () => {
    try {
      // First validate the TOML
      toml.parse(tomlInput)
      
      let output = tomlInput
      
      if (keepInline) {
        // Remove only full-line comments
        output = output.split('\n')
          .filter(line => !line.trim().startsWith('#'))
          .join('\n')
      } else {
        // Remove all comments (full-line and inline)
        output = output.split('\n')
          .map(line => {
            // Find # that's not inside a string
            let result = ''
            let inString = false
            let escapeNext = false
            
            for (let i = 0; i < line.length; i++) {
              const char = line[i]
              
              if (escapeNext) {
                result += char
                escapeNext = false
                continue
              }
              
              if (char === '\\') {
                escapeNext = true
                result += char
                continue
              }
              
              if (char === '"') {
                inString = !inString
              }
              
              if (char === '#' && !inString) {
                break
              }
              
              result += char
            }
            
            return result.trimEnd()
          })
          .filter(line => line.trim() !== '')
          .join('\n')
      }
      
      setCleanOutput(output)
      toast.success('Comments removed successfully')
    } catch (err) {
      toast.error('Invalid TOML. Please check your input.')
    }
  }

  const handleCopy = async () => {
    if (!cleanOutput) return
    try {
      await navigator.clipboard.writeText(cleanOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!cleanOutput) return
    const blob = new Blob([cleanOutput], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'clean.toml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded clean.toml')
  }

  const handleClear = () => {
    setTomlInput('')
    setCleanOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Remove Comments from TOML Files</h2>
        <p className="text-muted-foreground mt-2">
          Strip all comments from TOML configuration files for clean production deployment.
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
            placeholder={`# Database configuration
[database]
host = "localhost"  # Default host
port = 5432`}
            value={tomlInput}
            onChange={(e) => setTomlInput(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="keep-inline"
              checked={keepInline}
              onChange={(e) => setKeepInline(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="keep-inline" className="text-sm cursor-pointer">
              Keep inline comments (remove only full-line comments)
            </Label>
          </div>
          <Button onClick={removeComments} className="w-full">
            <Trash2 className="h-4 w-4 mr-2" />
            Remove Comments
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Clean Output</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!cleanOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!cleanOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {cleanOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{cleanOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">Clean TOML will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

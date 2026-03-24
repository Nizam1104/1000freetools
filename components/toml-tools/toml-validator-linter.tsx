'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, AlertCircle, Check, FileWarning } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function TomlValidatorLinter() {
  const [tomlInput, setTomlInput] = useState('')
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const validateToml = () => {
    try {
      toml.parse(tomlInput)
      setValidationResult({ valid: true, message: 'Valid TOML! No syntax errors detected.' })
      toast.success('TOML is valid')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid TOML syntax'
      setValidationResult({ valid: false, message: errorMessage })
      toast.error('TOML validation failed')
    }
  }

  const handleCopy = async () => {
    if (!tomlInput) return
    try {
      await navigator.clipboard.writeText(tomlInput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!tomlInput) return
    const blob = new Blob([tomlInput], { type: 'text/plain' })
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
    setTomlInput('')
    setValidationResult(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Validate and Lint Your TOML Files</h2>
        <p className="text-muted-foreground mt-2">
          Check your TOML configuration for syntax errors, duplicate keys, and formatting issues.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="toml-input" className="text-base font-medium">TOML Input</Label>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!tomlInput}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} disabled={!tomlInput}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Textarea
          id="toml-input"
          placeholder={`[package]
name = "my-project"
version = "1.0.0"

[dependencies]
react = "^18.0.0"`}
          value={tomlInput}
          onChange={(e) => setTomlInput(e.target.value)}
          className="min-h-[300px] font-mono text-sm"
        />

        <Button onClick={validateToml} className="w-full md:w-auto">
          Validate TOML
        </Button>

        {validationResult && (
          <Card className={`p-4 ${validationResult.valid ? 'bg-green-50 dark:bg-green-950' : 'bg-destructive/10'}`}>
            <div className={`flex items-start gap-3 ${validationResult.valid ? 'text-green-700 dark:text-green-300' : 'text-destructive'}`}>
              {validationResult.valid ? (
                <Check className="h-5 w-5 mt-0.5" />
              ) : (
                <FileWarning className="h-5 w-5 mt-0.5" />
              )}
              <div className="text-sm">
                <p className="font-medium">{validationResult.valid ? 'Valid TOML' : 'Invalid TOML'}</p>
                <p className="mt-1 font-mono">{validationResult.message}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'
import yaml from 'js-yaml'

export default function TomlToYamlConverter() {
  const [tomlInput, setTomlInput] = useState('')
  const [yamlOutput, setYamlOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const convertToYaml = () => {
    try {
      const parsed = toml.parse(tomlInput)
      const yamlString = yaml.dump(parsed, { indent: 2 })
      setYamlOutput(yamlString)
      toast.success('Successfully converted TOML to YAML')
    } catch (err) {
      toast.error('Invalid TOML. Please check your input.')
    }
  }

  const handleCopy = async () => {
    if (!yamlOutput) return
    try {
      await navigator.clipboard.writeText(yamlOutput)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!yamlOutput) return
    const blob = new Blob([yamlOutput], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'config.yaml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded config.yaml')
  }

  const handleClear = () => {
    setTomlInput('')
    setYamlOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Convert TOML to YAML Easily</h1>
        <p className="text-muted-foreground mt-2">
          Translate TOML configuration files to YAML format with proper structure preservation.
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
          <Button onClick={convertToYaml} className="w-full">
            Convert to YAML
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">YAML Output</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!yamlOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!yamlOutput}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="p-4 bg-muted min-h-[400px]">
            {yamlOutput ? (
              <pre className="font-mono text-sm whitespace-pre-wrap">{yamlOutput}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">YAML output will appear here</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

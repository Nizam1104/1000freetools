'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Diff } from 'lucide-react'
import { toast } from 'sonner'
import * as toml from 'toml'

export default function TomlDiffCompare() {
  const [toml1, setToml1] = useState('')
  const [toml2, setToml2] = useState('')
  const [diffResult, setDiffResult] = useState<{ added: string[]; removed: string[]; modified: string[] } | null>(null)
  const [copied, setCopied] = useState(false)

  const compareToml = () => {
    try {
      const parsed1 = toml.parse(toml1)
      const parsed2 = toml.parse(toml2)
      
      const added: string[] = []
      const removed: string[] = []
      const modified: string[] = []
      
      const allKeys = new Set<string>()
      const getAllKeys = (obj: any, prefix = '') => {
        if (!obj || typeof obj !== 'object') return
        for (const key of Object.keys(obj)) {
          const fullKey = prefix ? `${prefix}.${key}` : key
          allKeys.add(fullKey)
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            getAllKeys(obj[key], fullKey)
          }
        }
      }
      
      getAllKeys(parsed1)
      getAllKeys(parsed2)
      
      const getValue = (obj: any, key: string): any => {
        const parts = key.split('.')
        let current = obj
        for (const part of parts) {
          if (current && typeof current === 'object' && part in current) {
            current = current[part]
          } else {
            return undefined
          }
        }
        return current
      }
      
      for (const key of allKeys) {
        const val1 = getValue(parsed1, key)
        const val2 = getValue(parsed2, key)

        const keyName = key.split('.').pop() || ''
        const inObj1 = JSON.stringify(parsed1).includes(keyName)
        const inObj2 = JSON.stringify(parsed2).includes(keyName)
        
        if (val1 === undefined && val2 !== undefined) {
          added.push(`${key}: ${JSON.stringify(val2)}`)
        } else if (val1 !== undefined && val2 === undefined) {
          removed.push(`${key}: ${JSON.stringify(val1)}`)
        } else if (val1 !== undefined && val2 !== undefined && val1 !== val2) {
          modified.push(`${key}: ${JSON.stringify(val1)} → ${JSON.stringify(val2)}`)
        }
      }
      
      setDiffResult({ added, removed, modified })
      toast.success('Comparison complete')
    } catch (err) {
      toast.error('Invalid TOML. Please check your input.')
    }
  }

  const handleCopy = async () => {
    if (!diffResult) return
    const text = `Added:\n${diffResult.added.join('\n')}\n\nRemoved:\n${diffResult.removed.join('\n')}\n\nModified:\n${diffResult.modified.join('\n')}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = () => {
    if (!diffResult) return
    const text = `Added:\n${diffResult.added.join('\n')}\n\nRemoved:\n${diffResult.removed.join('\n')}\n\nModified:\n${diffResult.modified.join('\n')}`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'toml-diff.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded toml-diff.txt')
  }

  const handleClear = () => {
    setToml1('')
    setToml2('')
    setDiffResult(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Compare and Diff TOML Files</h1>
        <p className="text-muted-foreground mt-2">
          See exactly what changed between two TOML configurations with detailed diff output.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="space-y-4">
          <Label htmlFor="toml1" className="text-base font-medium">Original TOML</Label>
          <Textarea
            id="toml1"
            placeholder={`[package]
name = "my-project"
version = "1.0.0"`}
            value={toml1}
            onChange={(e) => setToml1(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="toml2" className="text-base font-medium">Modified TOML</Label>
          <Textarea
            id="toml2"
            placeholder={`[package]
name = "my-project"
version = "2.0.0"`}
            value={toml2}
            onChange={(e) => setToml2(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={compareToml}>
          <Diff className="h-4 w-4 mr-2" />
          Compare TOML
        </Button>
        <Button variant="ghost" onClick={handleClear}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>

      {diffResult && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-4 bg-green-50 dark:bg-green-950">
            <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3">Added ({diffResult.added.length})</h3>
            <ul className="space-y-2 text-sm font-mono">
              {diffResult.added.map((item, i) => (
                <li key={i} className="text-green-600 dark:text-green-400">+ {item}</li>
              ))}
              {diffResult.added.length === 0 && (
                <li className="text-muted-foreground">No additions</li>
              )}
            </ul>
          </Card>

          <Card className="p-4 bg-red-50 dark:bg-red-950">
            <h3 className="font-semibold text-red-700 dark:text-red-300 mb-3">Removed ({diffResult.removed.length})</h3>
            <ul className="space-y-2 text-sm font-mono">
              {diffResult.removed.map((item, i) => (
                <li key={i} className="text-red-600 dark:text-red-400">- {item}</li>
              ))}
              {diffResult.removed.length === 0 && (
                <li className="text-muted-foreground">No removals</li>
              )}
            </ul>
          </Card>

          <Card className="p-4 bg-yellow-50 dark:bg-yellow-950">
            <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">Modified ({diffResult.modified.length})</h3>
            <ul className="space-y-2 text-sm font-mono">
              {diffResult.modified.map((item, i) => (
                <li key={i} className="text-yellow-600 dark:text-yellow-400">~ {item}</li>
              ))}
              {diffResult.modified.length === 0 && (
                <li className="text-muted-foreground">No modifications</li>
              )}
            </ul>
          </Card>
        </div>
      )}

      {diffResult && (
        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            Copy Results
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      )}
    </div>
  )
}

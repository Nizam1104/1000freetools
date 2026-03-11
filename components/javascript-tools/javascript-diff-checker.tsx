'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, RotateCcw, Check, FileDiff } from 'lucide-react'
import { toast } from 'sonner'

export default function JavaScriptDiffChecker() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [diff, setDiff] = useState<{ type: string; value: string }[]>([])
  const [copied, setCopied] = useState(false)

  const compare = () => {
    const originalLines = original.split('\n')
    const modifiedLines = modified.split('\n')
    
    const result: { type: string; value: string }[] = []
    const maxLen = Math.max(originalLines.length, modifiedLines.length)
    
    for (let i = 0; i < maxLen; i++) {
      const origLine = originalLines[i]
      const modLine = modifiedLines[i]
      
      if (origLine === undefined) {
        result.push({ type: 'added', value: modLine! })
      } else if (modLine === undefined) {
        result.push({ type: 'removed', value: origLine })
      } else if (origLine !== modLine) {
        result.push({ type: 'removed', value: origLine })
        result.push({ type: 'added', value: modLine })
      } else {
        result.push({ type: 'unchanged', value: origLine })
      }
    }
    
    setDiff(result)
    toast.success(`Comparison complete. Found ${result.filter(r => r.type !== 'unchanged').length} changes.`)
  }

  const handleCopy = async () => {
    const text = diff.map(d => {
      if (d.type === 'added') return `+ ${d.value}`
      if (d.type === 'removed') return `- ${d.value}`
      return `  ${d.value}`
    }).join('\n')
    
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setOriginal('')
    setModified('')
    setDiff([])
  }

  const stats = {
    added: diff.filter(d => d.type === 'added').length,
    removed: diff.filter(d => d.type === 'removed').length,
    unchanged: diff.filter(d => d.type === 'unchanged').length,
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Compare and Find Differences in JavaScript Code</h1>
        <p className="text-muted-foreground mt-2">
          See exactly what changed between two versions of code with line-by-line diff highlighting.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="original" className="text-base font-medium">Original Code</Label>
            <Button variant="ghost" size="sm" onClick={() => setOriginal('')}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="original"
            placeholder="Paste original code here..."
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="modified" className="text-base font-medium">Modified Code</Label>
            <Button variant="ghost" size="sm" onClick={() => setModified('')}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <Textarea
            id="modified"
            placeholder="Paste modified code here..."
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={compare}>
          <FileDiff className="h-4 w-4 mr-2" />
          Compare Code
        </Button>
        <Button variant="ghost" onClick={handleClear}>
          Clear All
        </Button>
      </div>

      {diff.length > 0 && (
        <>
          <div className="flex gap-4 mb-4">
            <Card className="px-4 py-2 bg-green-50 dark:bg-green-950">
              <span className="text-green-600 dark:text-green-400 font-semibold">+ {stats.added} additions</span>
            </Card>
            <Card className="px-4 py-2 bg-red-50 dark:bg-red-950">
              <span className="text-red-600 dark:text-red-400 font-semibold">- {stats.removed} deletions</span>
            </Card>
            <Card className="px-4 py-2 bg-muted">
              <span className="text-muted-foreground">{stats.unchanged} unchanged</span>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Diff Output</Label>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Card className="p-4 bg-muted min-h-[300px] max-h-[600px] overflow-y-auto">
              <pre className="font-mono text-sm">
                {diff.map((line, i) => (
                  <div
                    key={i}
                    className={`${
                      line.type === 'added'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : line.type === 'removed'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        : ''
                    }`}
                  >
                    <span className="select-none w-6 inline-block text-muted-foreground">
                      {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                    </span>
                    {line.value || ' '}
                  </div>
                ))}
              </pre>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

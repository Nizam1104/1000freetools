"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DiffResult {
  type: 'same' | 'added' | 'removed'
  text: string
}

export default function TextDiffer() {
  const [originalText, setOriginalText] = useState<string>("")
  const [modifiedText, setModifiedText] = useState<string>("")
  const [ignoreWhitespace, setIgnoreWhitespace] = useState<boolean>(false)
  const [ignoreCase, setIgnoreCase] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'side-by-side' | 'inline'>('side-by-side')

  const computeDiff = useMemo(() => {
    if (!originalText && !modifiedText) return null

    let original = originalText
    let modified = modifiedText

    if (ignoreWhitespace) {
      original = original.replace(/\s+/g, ' ').trim()
      modified = modified.replace(/\s+/g, ' ').trim()
    }

    if (ignoreCase) {
      original = original.toLowerCase()
      modified = modified.toLowerCase()
    }

    const originalLines = original.split('\n')
    const modifiedLines = modified.split('\n')

    const diff: { original: DiffResult[]; modified: DiffResult[] } = {
      original: [],
      modified: []
    }

    // Simple line-by-line diff using LCS approach
    const lcs = computeLCS(originalLines, modifiedLines)
    
    let i = 0, j = 0, k = 0
    while (i < originalLines.length || j < modifiedLines.length) {
      if (k < lcs.length && i < originalLines.length && originalLines[i] === lcs[k]) {
        diff.original.push({ type: 'same', text: originalLines[i] })
        diff.modified.push({ type: 'same', text: modifiedLines[j] })
        i++
        j++
        k++
      } else if (i < originalLines.length && (k >= lcs.length || originalLines[i] !== lcs[k])) {
        diff.original.push({ type: 'removed', text: originalLines[i] })
        i++
      } else if (j < modifiedLines.length) {
        diff.modified.push({ type: 'added', text: modifiedLines[j] })
        j++
      }
    }

    return diff
  }, [originalText, modifiedText, ignoreWhitespace, ignoreCase])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setOriginalText("")
    setModifiedText("")
  }, [])

  const loadSampleData = useCallback(() => {
    setOriginalText(`function hello() {
  console.log("Hello, World!");
  return true;
}`)
    setModifiedText(`function hello(name) {
  console.log("Hello, " + name + "!");
  return true;
}

function goodbye() {
  console.log("Goodbye!");
}`)
  }, [])

  const stats = useMemo(() => {
    if (!computeDiff) return null

    const added = computeDiff.modified.filter(d => d.type === 'added').length
    const removed = computeDiff.original.filter(d => d.type === 'removed').length
    const same = computeDiff.modified.filter(d => d.type === 'same').length

    return { added, removed, same }
  }, [computeDiff])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Options */}
      <section className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="ignore-whitespace"
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
            className="size-4 rounded border-gray-300"
          />
          <Label htmlFor="ignore-whitespace" className="text-sm font-normal cursor-pointer">
            Ignore whitespace
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="ignore-case"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="size-4 rounded border-gray-300"
          />
          <Label htmlFor="ignore-case" className="text-sm font-normal cursor-pointer">
            Ignore case
          </Label>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant={viewMode === 'side-by-side' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('side-by-side')}
            className="text-xs"
          >
            Side by Side
          </Button>
          <Button
            variant={viewMode === 'inline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('inline')}
            className="text-xs"
          >
            Inline
          </Button>
        </div>
      </section>

      {/* Input Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original Text */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="original" className="text-base font-medium">
              Original Text
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(originalText, "original")}
                className="h-7"
                disabled={!originalText}
              >
                {copied === "original" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>

          <Textarea
            id="original"
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            className="font-mono text-sm min-h-[250px]"
            placeholder="Paste original text here..."
          />
        </section>

        {/* Modified Text */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="modified" className="text-base font-medium">
              Modified Text
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(modifiedText, "modified")}
                className="h-7"
                disabled={!modifiedText}
              >
                {copied === "modified" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>

          <Textarea
            id="modified"
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            className="font-mono text-sm min-h-[250px]"
            placeholder="Paste modified text here..."
          />
        </section>
      </div>

      {/* Action Buttons */}
      <section className="flex justify-center">
        <Button onClick={loadSampleData} variant="outline">
          Load Sample Data
        </Button>
        <Button onClick={handleClear} variant="ghost" className="ml-2">
          <Trash2 className="size-4 mr-2" />
          Clear All
        </Button>
      </section>

      {/* Stats */}
      {stats && (
        <section className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{stats.added}</p>
            <p className="text-sm text-muted-foreground">Lines Added</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{stats.removed}</p>
            <p className="text-sm text-muted-foreground">Lines Removed</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">{stats.same}</p>
            <p className="text-sm text-muted-foreground">Lines Unchanged</p>
          </div>
        </section>
      )}

      {/* Diff Output */}
      {computeDiff && (
        <section className="space-y-3">
          <Label className="text-base font-medium">
            {viewMode === 'side-by-side' ? 'Side-by-Side Diff' : 'Inline Diff'}
          </Label>

          {viewMode === 'side-by-side' ? (
            <div className="grid grid-cols-2 gap-0 border rounded-lg overflow-hidden">
              {/* Original Column */}
              <div className="border-r">
                <div className="bg-muted p-2 text-sm font-medium border-b">
                  Original
                </div>
                <div className="font-mono text-sm">
                  {computeDiff.original.map((line, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "px-3 py-1",
                        line.type === 'removed' ? "bg-destructive/20 text-destructive" :
                        line.type === 'same' ? "bg-transparent" : ""
                      )}
                    >
                      <span className="inline-block w-6 text-muted-foreground select-none">{idx + 1}</span>
                      <span className={cn(
                        line.type === 'removed' ? "line-through" : ""
                      )}>
                        {line.text || ' '}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modified Column */}
              <div>
                <div className="bg-muted p-2 text-sm font-medium border-b">
                  Modified
                </div>
                <div className="font-mono text-sm">
                  {computeDiff.modified.map((line, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "px-3 py-1",
                        line.type === 'added' ? "bg-green-500/20 text-green-600 dark:text-green-400" :
                        line.type === 'same' ? "bg-transparent" : ""
                      )}
                    >
                      <span className="inline-block w-6 text-muted-foreground select-none">{idx + 1}</span>
                      <span>{line.text || ' '}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border overflow-hidden">
              <div className="font-mono text-sm">
                {computeDiff.modified.map((line, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "px-3 py-1",
                      line.type === 'added' ? "bg-green-500/20 text-green-600 dark:text-green-400" :
                      line.type === 'same' ? "bg-transparent" : ""
                    )}
                  >
                    <span className="inline-block w-6 text-muted-foreground select-none">
                      {line.type === 'added' ? '+' : line.type === 'same' ? ' ' : '-'}
                    </span>
                    <span>{line.text || ' '}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Text Diff Comparison</h4>
            <p className="text-sm text-muted-foreground">
              This tool compares two texts and highlights the differences line by line.
              Green indicates added lines, red indicates removed lines.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Side-by-side view for detailed comparison</li>
              <li>Inline view for quick overview</li>
              <li>Option to ignore whitespace differences</li>
              <li>Option to ignore case differences</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

function computeLCS(a: string[], b: string[]): string[] {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // Backtrack to find LCS
  const lcs: string[] = []
  let i = m, j = n
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs.unshift(a[i - 1])
      i--
      j--
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--
    } else {
      j--
    }
  }

  return lcs
}

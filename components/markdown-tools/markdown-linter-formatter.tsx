"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, ClipboardCheck, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function MarkdownLinterFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [issues, setIssues] = useState<Array<{ line: number; severity: 'error' | 'warning' | 'info'; message: string }>>([])
  const [autoFix, setAutoFix] = useState(false)

  const lintMarkdown = useCallback((markdown: string): Array<{ line: number; severity: 'error' | 'warning' | 'info'; message: string; fix?: string }> => {
    const lines = markdown.split('\n')
    const issues: Array<{ line: number; severity: 'error' | 'warning' | 'info'; message: string; fix?: string }> = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lineNumber = i + 1
      const trimmed = line.trim()

      // Check for trailing whitespace
      if (line !== line.trimEnd() && trimmed) {
        issues.push({
          line: lineNumber,
          severity: 'warning',
          message: 'Trailing whitespace',
          fix: line.trimEnd()
        })
      }

      // Check for multiple consecutive blank lines
      if (!trimmed && i > 0 && !lines[i - 1]?.trim()) {
        issues.push({
          line: lineNumber,
          severity: 'info',
          message: 'Multiple consecutive blank lines'
        })
      }

      // Check for missing space after header
      if (/^#{1,6}[^#\s]/.test(trimmed)) {
        issues.push({
          line: lineNumber,
          severity: 'warning',
          message: 'Missing space after header hash',
          fix: trimmed.replace(/^(#+)([^#\s])/, '$1 $2')
        })
      }

      // Check for header without blank line before
      if (/^#{1,6}\s/.test(trimmed) && i > 0 && lines[i - 1]?.trim()) {
        issues.push({
          line: lineNumber,
          severity: 'info',
          message: 'Consider adding blank line before header'
        })
      }

      // Check for line length (80 chars recommended)
      if (trimmed.length > 80 && !trimmed.startsWith('```') && !trimmed.startsWith('    ')) {
        issues.push({
          line: lineNumber,
          severity: 'info',
          message: `Line exceeds 80 characters (${trimmed.length} chars)`
        })
      }

      // Check for tabs
      if (line.includes('\t')) {
        issues.push({
          line: lineNumber,
          severity: 'error',
          message: 'Tabs should be replaced with spaces',
          fix: line.replace(/\t/g, '  ')
        })
      }

      // Check for inconsistent list markers
      if (/^[-*+]\s/.test(trimmed)) {
        const marker = trimmed[0]
        // Check if other lists use different markers
        const otherMarkers = lines.filter(l => /^[-*+]\s/.test(l.trim())).map(l => l.trim()[0])
        if (otherMarkers.some(m => m !== marker)) {
          issues.push({
            line: lineNumber,
            severity: 'info',
            message: `Inconsistent list marker. Consider using '${otherMarkers[0]}' for consistency`
          })
        }
      }

      // Check for emphasis markers
      if (/\*\*[^*]+\*\*/.test(trimmed) && /__[^_]+__/.test(trimmed)) {
        issues.push({
          line: lineNumber,
          severity: 'info',
          message: 'Inconsistent emphasis markers. Use either ** or __'
        })
      }

      // Check for link without text
      if (/\[\]\([^)]+\)/.test(trimmed)) {
        issues.push({
          line: lineNumber,
          severity: 'warning',
          message: 'Link has no text'
        })
      }

      // Check for image without alt text
      if (/!\[\]\([^)]+\)/.test(trimmed)) {
        issues.push({
          line: lineNumber,
          severity: 'warning',
          message: 'Image has no alt text'
        })
      }
    }

    return issues
  }, [])

  const fixIssues = useCallback((markdown: string, lintIssues: Array<{ line: number; severity: string; message: string; fix?: string }>): string => {
    const lines = markdown.split('\n')
    
    lintIssues.forEach(issue => {
      if (issue.fix && lines[issue.line - 1]) {
        lines[issue.line - 1] = issue.fix
      }
    })

    // Remove consecutive blank lines
    let prevBlank = false
    const filteredLines = lines.filter(line => {
      const isBlank = !line.trim()
      if (isBlank && prevBlank) return false
      prevBlank = isBlank
      return true
    })

    return filteredLines.join('\n')
  }, [])

  const handleLint = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      setIssues([])
      return
    }

    const lintIssues = lintMarkdown(input)
    setIssues(lintIssues)

    if (autoFix) {
      const fixed = fixIssues(input, lintIssues)
      setOutput(fixed)
    } else {
      if (lintIssues.length === 0) {
        setOutput("✓ No issues found! Markdown looks good.")
      } else {
        let outputText = `Found ${lintIssues.length} issue(s):\n\n`
        lintIssues.forEach(issue => {
          const icon = issue.severity === 'error' ? '✗' : issue.severity === 'warning' ? '⚠' : 'ℹ'
          outputText += `${icon} Line ${issue.line} [${issue.severity.toUpperCase()}] ${issue.message}\n`
        })
        setOutput(outputText.trim())
      }
    }
  }, [input, lintMarkdown, autoFix, fixIssues])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setIssues([])
  }, [])

  const errorCount = issues.filter(i => i.severity === 'error').length
  const warningCount = issues.filter(i => i.severity === 'warning').length

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown Linter & Formatter</h2>
            <p className="text-sm text-muted-foreground">
              Check and fix common Markdown issues
            </p>
          </div>
        </div>
      </div>

      {issues.length > 0 && (
        <div className="flex gap-4">
          {errorCount > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorCount} error(s)</AlertDescription>
            </Alert>
          )}
          {warningCount > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{warningCount} warning(s)</AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={autoFix}
            onChange={(e) => setAutoFix(e.target.checked)}
            className="rounded border-gray-300"
          />
          Auto-fix issues
        </label>
      </div>

      <div className="space-y-4">
        <Label htmlFor="input">Markdown Input</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your Markdown here to check for issues..."
          className="min-h-[400px] font-mono text-sm"
        />
        <div className="flex items-center gap-2">
          <Button onClick={handleLint} className="flex-1" disabled={!input}>
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Lint Markdown
          </Button>
          <Button variant="outline" onClick={handleClear} title="Clear">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Result</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-muted"
          />
          <Button onClick={handleCopy} disabled={!output} variant="outline">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy Result"}
          </Button>
        </div>
      )}
    </div>
  )
}

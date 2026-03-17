"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, GitCompare } from "lucide-react"

export function MarkdownDiffChecker() {
  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)
  const [showOnly, setShowOnly] = useState<"all" | "added" | "removed">("all")

  const computeDiff = useCallback((text1: string, text2: string, options: { 
    ignoreWhitespace: boolean;
    showOnly: string 
  }): string => {
    let t1 = text1
    let t2 = text2

    if (options.ignoreWhitespace) {
      t1 = t1.replace(/\s+/g, ' ').trim()
      t2 = t2.replace(/\s+/g, ' ').trim()
    }

    const lines1 = t1.split('\n')
    const lines2 = t2.split('\n')

    const diff: string[] = []
    const set1 = new Set(lines1)
    const set2 = new Set(lines2)

    const added: string[] = []
    const removed: string[] = []
    const unchanged: string[] = []

    // Track which lines from text2 have been matched
    const matched2 = new Set<number>()

    // Find removed and unchanged lines
    lines1.forEach((line, i) => {
      const matchIndex = lines2.findIndex((l2, j) => !matched2.has(j) && l2 === line)
      if (matchIndex !== -1) {
        unchanged.push(line)
        matched2.add(matchIndex)
      } else {
        removed.push(line)
      }
    })

    // Find added lines
    lines2.forEach((line, i) => {
      if (!matched2.has(i)) {
        added.push(line)
      }
    })

    // Build diff output
    if (options.showOnly === "all" || options.showOnly === "removed") {
      removed.forEach(line => {
        diff.push(`- ${line}`)
      })
    }

    if (options.showOnly === "all") {
      unchanged.forEach(line => {
        diff.push(`  ${line}`)
      })
    }

    if (options.showOnly === "all" || options.showOnly === "added") {
      added.forEach(line => {
        diff.push(`+ ${line}`)
      })
    }

    if (diff.length === 0 && t1 === t2) {
      return "# No differences found"
    }

    const summary = [
      `# Diff Summary:`,
      `# - Removed: ${removed.length} line(s)`,
      `# - Added: ${added.length} line(s)`,
      `# - Unchanged: ${unchanged.length} line(s)`,
      ''
    ]

    return [...summary, ...diff].join('\n')
  }, [])

  const handleCompare = useCallback(() => {
    if (!input1.trim() && !input2.trim()) {
      setOutput("")
      return
    }
    const diff = computeDiff(input1, input2, { ignoreWhitespace, showOnly })
    setOutput(diff)
  }, [input1, input2, ignoreWhitespace, showOnly, computeDiff])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput1("")
    setInput2("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "markdown-diff.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleLoadExample = useCallback(() => {
    setInput1(`# My Document

This is the original version.

## Features

- Feature 1
- Feature 2
- Feature 3

Some paragraph text.`)

    setInput2(`# My Document

This is the updated version.

## Features

- Feature 1
- Feature 2
- Feature 4
- Feature 5

Some paragraph text with changes.`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Markdown Diff Checker</h2>
            <p className="text-sm text-muted-foreground">
              Compare two Markdown documents and see the differences
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLoadExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
            className="rounded border-gray-300"
          />
          Ignore Whitespace
        </label>

        <div className="flex items-center gap-2">
          <Label>Show:</Label>
          <select
            value={showOnly}
            onChange={(e) => setShowOnly(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="all">All Changes</option>
            <option value="added">Added Only</option>
            <option value="removed">Removed Only</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input1">Original Markdown</Label>
          <Textarea
            id="input1"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Paste original Markdown here..."
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="input2">Modified Markdown</Label>
          <Textarea
            id="input2"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Paste modified Markdown here..."
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleCompare} className="flex-1" disabled={!input1 && !input2}>
          <GitCompare className="h-4 w-4 mr-2" />
          Compare Documents
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Diff Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Diff output will appear here..."
            className="min-h-[400px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Diff Legend</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><span className="text-red-500">-</span> Removed lines</li>
          <li><span className="text-green-500">+</span> Added lines</li>
          <li><span className="text-muted-foreground"> </span> Unchanged lines</li>
        </ul>
      </div>
    </div>
  )
}

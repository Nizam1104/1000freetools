"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, GitCompare } from "lucide-react"

export function YamlDiffChecker() {
  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)
  const [ignoreComments, setIgnoreComments] = useState(true)
  const [showOnly, setShowOnly] = useState<"all" | "added" | "removed" | "changed">("all")

  const normalizeYaml = useCallback((yaml: string, options: { ignoreWhitespace: boolean; ignoreComments: boolean }): string => {
    let result = yaml

    if (options.ignoreComments) {
      result = result.split('\n').filter(line => !line.trim().startsWith('#')).join('\n')
    }

    if (options.ignoreWhitespace) {
      result = result.split('\n').map(line => line.trim()).filter(line => line).join('\n')
    }

    return result
  }, [])

  const computeDiff = useCallback((yaml1: string, yaml2: string, options: { 
    ignoreWhitespace: boolean; 
    ignoreComments: boolean;
    showOnly: string 
  }): string => {
    const normalized1 = normalizeYaml(yaml1, { ignoreWhitespace: options.ignoreWhitespace, ignoreComments: options.ignoreComments })
    const normalized2 = normalizeYaml(yaml2, { ignoreWhitespace: options.ignoreWhitespace, ignoreComments: options.ignoreComments })

    const lines1 = normalized1.split('\n')
    const lines2 = normalized2.split('\n')

    const diff: string[] = []
    const set1 = new Set(lines1)
    const set2 = new Set(lines2)

    const added: string[] = []
    const removed: string[] = []
    const unchanged: string[] = []

    // Find removed lines (in yaml1 but not in yaml2)
    lines1.forEach(line => {
      if (set2.has(line)) {
        unchanged.push(line)
      } else {
        removed.push(line)
      }
    })

    // Find added lines (in yaml2 but not in yaml1)
    lines2.forEach(line => {
      if (!set1.has(line)) {
        added.push(line)
      }
    })

    // Build diff output
    if (options.showOnly === "all" || options.showOnly === "removed") {
      removed.forEach(line => {
        diff.push(`- ${line}`)
      })
    }

    if (options.showOnly === "all" || options.showOnly === "unchanged") {
      unchanged.forEach(line => {
        diff.push(`  ${line}`)
      })
    }

    if (options.showOnly === "all" || options.showOnly === "added") {
      added.forEach(line => {
        diff.push(`+ ${line}`)
      })
    }

    if (diff.length === 0) {
      return "# No differences found"
    }

    const summary = [
      `# Diff Summary:`,
      `# - Removed: ${removed.length} lines`,
      `# - Added: ${added.length} lines`,
      `# - Unchanged: ${unchanged.length} lines`,
      ''
    ]

    return [...summary, ...diff].join('\n')
  }, [normalizeYaml])

  const handleCompare = useCallback(() => {
    if (!input1.trim() && !input2.trim()) {
      setOutput("")
      return
    }
    const diff = computeDiff(input1, input2, { ignoreWhitespace, ignoreComments, showOnly })
    setOutput(diff)
  }, [input1, input2, ignoreWhitespace, ignoreComments, showOnly, computeDiff])

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
      a.download = "yaml-diff.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleLoadExample = useCallback(() => {
    setInput1(`name: John Doe
age: 30
city: New York
country: USA`)
    setInput2(`name: John Doe
age: 31
city: Los Angeles
email: john@example.com`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML Diff Checker</h2>
            <p className="text-sm text-muted-foreground">
              Compare two YAML files and see the differences
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

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={ignoreComments}
            onChange={(e) => setIgnoreComments(e.target.checked)}
            className="rounded border-gray-300"
          />
          Ignore Comments
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
            <option value="changed">Changed Only</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input1">YAML Original</Label>
          <Textarea
            id="input1"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Paste original YAML here..."
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="input2">YAML Modified</Label>
          <Textarea
            id="input2"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Paste modified YAML here..."
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleCompare} className="flex-1" disabled={!input1 && !input2}>
          <GitCompare className="h-4 w-4 mr-2" />
          Compare YAML
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
    </div>
  )
}

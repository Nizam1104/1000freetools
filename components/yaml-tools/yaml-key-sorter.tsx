"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function YamlKeySorter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortType, setSortType] = useState<"alphabetical" | "length">("alphabetical")

  const sortYamlKeys = useCallback((yaml: string, order: "asc" | "desc", type: "alphabetical" | "length"): string => {
    const lines = yaml.split('\n')
    const result: string[] = []
    const sections: { indent: number; lines: string[] }[] = []
    let currentSection: { indent: number; lines: string[] } | null = null

    for (const line of lines) {
      const trimmed = line.trim()
      
      // Skip empty lines and comments at top level
      if (!trimmed || trimmed.startsWith('#')) {
        if (currentSection) {
          currentSection.lines.push(line)
        } else {
          result.push(line)
        }
        continue
      }

      const indent = line.search(/\S/)

      // Top-level key (no indent or minimal indent)
      if (indent === 0 && trimmed.includes(':')) {
        if (currentSection) {
          sections.push(currentSection)
        }
        currentSection = { indent: 0, lines: [line] }
      } else if (currentSection) {
        currentSection.lines.push(line)
      } else {
        result.push(line)
      }
    }

    if (currentSection) {
      sections.push(currentSection)
    }

    // Sort sections
    sections.sort((a, b) => {
      const keyA = a.lines[0]?.split(':')[0]?.trim() || ''
      const keyB = b.lines[0]?.split(':')[0]?.trim() || ''

      if (type === 'alphabetical') {
        return order === 'asc' ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA)
      } else {
        const lenDiff = keyA.length - keyB.length
        return order === 'asc' ? lenDiff : -lenDiff
      }
    })

    // Rebuild YAML
    const sortedLines = result.flatMap(r => r ? [r] : [])
    sections.forEach(section => {
      sortedLines.push(...section.lines)
    })

    return sortedLines.join('\n')
  }, [])

  const handleSort = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }
    const sorted = sortYamlKeys(input, sortOrder, sortType)
    setOutput(sorted)
  }, [input, sortOrder, sortType, sortYamlKeys])

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
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/yaml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "sorted.yaml"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setInput(`zebra: animal
apple: fruit
banana: fruit
cat: animal
dog: animal
elephant: animal`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">YAML Key Sorter</h2>
            <p className="text-sm text-muted-foreground">
              Sort YAML keys alphabetically or by length
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Sort Order:</Label>
          <Button
            variant={sortOrder === "asc" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortOrder("asc")}
          >
            Ascending
          </Button>
          <Button
            variant={sortOrder === "desc" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortOrder("desc")}
          >
            Descending
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Label>Sort Type:</Label>
          <Button
            variant={sortType === "alphabetical" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortType("alphabetical")}
          >
            Alphabetical
          </Button>
          <Button
            variant={sortType === "length" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortType("length")}
          >
            By Length
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">YAML Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML here..."
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleSort} className="flex-1" disabled={!input}>
              Sort Keys
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Sorted YAML Output</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Sorted YAML will appear here..."
            className="min-h-[500px] font-mono text-sm bg-muted"
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
      </div>
    </div>
  )
}

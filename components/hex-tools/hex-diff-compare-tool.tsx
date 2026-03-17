"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, GitCompare } from "lucide-react"

export function HexDiffCompareTool() {
  const [hex1, setHex1] = useState("")
  const [hex2, setHex2] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [groupBy, setGroupBy] = useState(16)

  const cleanHex = useCallback((hex: string): string => {
    return hex.replace(/[^0-9a-fA-F]/g, '').toUpperCase()
  }, [])

  const formatHex = useCallback((hex: string, groupSize: number): string => {
    const groups = []
    for (let i = 0; i < hex.length; i += groupSize) {
      groups.push(hex.substring(i, i + groupSize))
    }
    return groups.join(' ')
  }, [])

  const computeDiff = useCallback((h1: string, h2: string, groupSize: number): string => {
    const clean1 = cleanHex(h1)
    const clean2 = cleanHex(h2)
    
    const maxLength = Math.max(clean1.length, clean2.length)
    const padded1 = clean1.padEnd(maxLength, '0')
    const padded2 = clean2.padEnd(maxLength, '0')
    
    const diffLines: string[] = []
    const summary = {
      totalBytes: Math.ceil(maxLength / 2),
      identicalBytes: 0,
      differentBytes: 0,
      addedBytes: 0,
      removedBytes: 0
    }

    diffLines.push(`# Hex Diff Comparison\n`)
    diffLines.push(`**Hex 1 length:** ${Math.ceil(clean1.length / 2)} bytes`)
    diffLines.push(`**Hex 2 length:** ${Math.ceil(clean2.length / 2)} bytes\n`)
    diffLines.push(`## Byte-by-Byte Comparison\n`)
    diffLines.push(`| Offset | Hex 1 | Hex 2 | Status |`)
    diffLines.push(`|--------|-------|-------|--------|`)

    for (let i = 0; i < maxLength; i += 2) {
      const offset = (i / 2).toString(16).toUpperCase().padStart(8, '0')
      const byte1 = padded1.substring(i, i + 2)
      const byte2 = padded2.substring(i, i + 2)
      
      let status = ''
      if (i >= clean1.length) {
        status = '🟢 Added'
        summary.addedBytes++
      } else if (i >= clean2.length) {
        status = '🔴 Removed'
        summary.removedBytes++
      } else if (byte1 === byte2) {
        status = '✓ Same'
        summary.identicalBytes++
      } else {
        status = '✗ Different'
        summary.differentBytes++
      }

      const formatted1 = i < clean1.length ? byte1 : '--'
      const formatted2 = i < clean2.length ? byte2 : '--'
      
      diffLines.push(`| 0x${offset} | ${formatted1} | ${formatted2} | ${status} |`)
    }

    summary.totalBytes = Math.ceil(maxLength / 2)
    
    diffLines.push(`\n## Summary\n`)
    diffLines.push(`- **Total bytes compared:** ${summary.totalBytes}`)
    diffLines.push(`- **Identical bytes:** ${summary.identicalBytes}`)
    diffLines.push(`- **Different bytes:** ${summary.differentBytes}`)
    diffLines.push(`- **Added bytes:** ${summary.addedBytes}`)
    diffLines.push(`- **Removed bytes:** ${summary.removedBytes}`)
    
    if (summary.totalBytes > 0) {
      const similarity = Math.round((summary.identicalBytes / summary.totalBytes) * 100)
      diffLines.push(`- **Similarity:** ${similarity}%`)
    }

    return diffLines.join('\n')
  }, [cleanHex])

  const handleCompare = useCallback(() => {
    if (!hex1.trim() && !hex2.trim()) {
      setOutput("")
      return
    }
    const diff = computeDiff(hex1, hex2, groupBy)
    setOutput(diff)
  }, [hex1, hex2, groupBy, computeDiff])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setHex1("")
    setHex2("")
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "hex-diff.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleExample = useCallback(() => {
    setHex1("48656C6C6F20576F726C64")
    setHex2("48656C6C6F20556E697665727365")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Hex Diff & Compare Tool</h2>
            <p className="text-sm text-muted-foreground">
              Compare two hexadecimal values and see the differences
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExample}>
            Load Example
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Label>Group By:</Label>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value={2}>2 bytes</option>
          <option value={4}>4 bytes</option>
          <option value={8}>8 bytes</option>
          <option value={16}>16 bytes</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="hex1">Hex Value 1</Label>
          <Textarea
            id="hex1"
            value={hex1}
            onChange={(e) => setHex1(e.target.value)}
            placeholder="Enter first hex value..."
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="hex2">Hex Value 2</Label>
          <Textarea
            id="hex2"
            value={hex2}
            onChange={(e) => setHex2(e.target.value)}
            placeholder="Enter second hex value..."
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleCompare} className="flex-1" disabled={!hex1 && !hex2}>
          <GitCompare className="h-4 w-4 mr-2" />
          Compare Hex Values
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Diff Results</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
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

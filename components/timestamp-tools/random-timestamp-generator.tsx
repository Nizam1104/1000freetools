"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, RefreshCw, Shuffle } from "lucide-react"
import { Input } from "@/components/ui/input"

export function RandomTimestampGenerator() {
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [count, setCount] = useState(10)
  const [format, setFormat] = useState<"unix" | "unix_ms" | "iso" | "human">("unix")
  const [minDate, setMinDate] = useState("1970-01-01")
  const [maxDate, setMaxDate] = useState(new Date().toISOString().split('T')[0])

  const generateRandomTimestamp = useCallback((minMs: number, maxMs: number, fmt: string): string => {
    const randomMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
    const date = new Date(randomMs)

    switch (fmt) {
      case "unix":
        return Math.floor(randomMs / 1000).toString()
      case "unix_ms":
        return randomMs.toString()
      case "iso":
        return date.toISOString()
      case "human":
        return date.toLocaleString()
      default:
        return date.toISOString()
    }
  }, [])

  const handleGenerate = useCallback(() => {
    const minMs = new Date(minDate).getTime()
    const maxMs = new Date(maxDate).getTime()

    if (isNaN(minMs) || isNaN(maxMs)) {
      setOutput("Please enter valid dates")
      return
    }

    if (minMs > maxMs) {
      setOutput("Minimum date must be before maximum date")
      return
    }

    const timestamps: string[] = []
    for (let i = 0; i < count; i++) {
      timestamps.push(generateRandomTimestamp(minMs, maxMs, format))
    }

    setOutput(timestamps.join('\n'))
  }, [count, format, minDate, maxDate, generateRandomTimestamp])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "random-timestamps.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Random Timestamp Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate random timestamps within a date range
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="count">Number of Timestamps</Label>
          <Input
            id="count"
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
            min="1"
            max="1000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Output Format</Label>
          <select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value as any)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="unix">Unix Timestamp (seconds)</option>
            <option value="unix_ms">Unix Timestamp (milliseconds)</option>
            <option value="iso">ISO 8601</option>
            <option value="human">Human Readable</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minDate">Minimum Date</Label>
          <Input
            id="minDate"
            type="date"
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxDate">Maximum Date</Label>
          <Input
            id="maxDate"
            type="date"
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleGenerate} className="flex-1">
          <Shuffle className="h-4 w-4 mr-2" />
          Generate Random Timestamps
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Generated Timestamps</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-muted"
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
        <h3 className="font-medium">Format Examples</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><strong>Unix (seconds):</strong> 1705312200</li>
          <li><strong>Unix (milliseconds):</strong> 1705312200000</li>
          <li><strong>ISO 8601:</strong> 2024-01-15T10:30:00.000Z</li>
          <li><strong>Human Readable:</strong> 1/15/2024, 10:30:00 AM</li>
        </ul>
      </div>
    </div>
  )
}

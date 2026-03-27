"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

export function FileTimestampConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [inputFormat, setInputFormat] = useState<"unix" | "unix_ms" | "iso" | "custom">("unix")
  const [outputFormat, setOutputFormat] = useState<"iso" | "unix" | "unix_ms" | "human" | "custom">("human")
  const [customFormat, setCustomFormat] = useState("YYYY-MM-DD HH:mm:ss")

  const formatTimestamp = useCallback((timestamp: number | string, format: string): string => {
    const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp)
    
    if (isNaN(date.getTime())) {
      return "Invalid date"
    }

    switch (format) {
      case "iso":
        return date.toISOString()
      case "unix":
        return Math.floor(date.getTime() / 1000).toString()
      case "unix_ms":
        return date.getTime().toString()
      case "human":
        return date.toLocaleString()
      default:
        // Custom format
        return customFormat
          .replace('YYYY', date.getFullYear().toString())
          .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
          .replace('DD', date.getDate().toString().padStart(2, '0'))
          .replace('HH', date.getHours().toString().padStart(2, '0'))
          .replace('mm', date.getMinutes().toString().padStart(2, '0'))
          .replace('ss', date.getSeconds().toString().padStart(2, '0'))
          .replace('SSS', date.getMilliseconds().toString().padStart(3, '0'))
    }
  }, [customFormat])

  const parseTimestamp = useCallback((value: string, format: string): number | null => {
    switch (format) {
      case "unix":
        return parseInt(value) * 1000
      case "unix_ms":
        return parseInt(value)
      case "iso":
        return new Date(value).getTime()
      default:
        return new Date(value).getTime()
    }
  }, [])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      return
    }

    const lines = input.split('\n')
    const results: string[] = []

    lines.forEach(line => {
      const trimmed = line.trim()
      if (!trimmed) return

      const timestamp = parseTimestamp(trimmed, inputFormat)
      
      if (timestamp === null || isNaN(timestamp)) {
        results.push(`${trimmed} -> Invalid input`)
      } else {
        const formatted = formatTimestamp(timestamp, outputFormat)
        results.push(`${trimmed} -> ${formatted}`)
      }
    })

    setOutput(results.join('\n'))
  }, [input, inputFormat, outputFormat, parseTimestamp, formatTimestamp])

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
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "timestamps.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleUseCurrent = useCallback(() => {
    const now = Date.now()
    setInput(now.toString())
    setInputFormat("unix_ms")
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={handleUseCurrent}>
            Use Current Time
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Input Format</Label>
          <select
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value as any)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="unix">Unix Timestamp (seconds)</option>
            <option value="unix_ms">Unix Timestamp (milliseconds)</option>
            <option value="iso">ISO 8601</option>
            <option value="custom">Custom/Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Output Format</Label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as any)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="human">Human Readable</option>
            <option value="iso">ISO 8601</option>
            <option value="unix">Unix Timestamp (seconds)</option>
            <option value="unix_ms">Unix Timestamp (milliseconds)</option>
            <option value="custom">Custom Format</option>
          </select>
        </div>
      </div>

      {outputFormat === "custom" && (
        <div className="space-y-2">
          <Label>Custom Output Format</Label>
          <Input
            value={customFormat}
            onChange={(e) => setCustomFormat(e.target.value)}
            placeholder="YYYY-MM-DD HH:mm:ss"
          />
          <p className="text-xs text-muted-foreground">
            Tokens: YYYY, MM, DD, HH, mm, ss, SSS
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Input Timestamps</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter timestamps (one per line)...

1705312200
1705312200000
2024-01-15T10:30:00Z"
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1" disabled={!input}>
              <Clock className="h-4 w-4 mr-2" />
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Converted Timestamps</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Converted timestamps will appear here..."
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
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Quick Reference</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Unix Timestamp:</strong>
            <p className="text-muted-foreground">Seconds since Jan 1, 1970</p>
            <p className="text-muted-foreground">Example: 1705312200</p>
          </div>
          <div>
            <strong>Unix MS:</strong>
            <p className="text-muted-foreground">Milliseconds since Jan 1, 1970</p>
            <p className="text-muted-foreground">Example: 1705312200000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

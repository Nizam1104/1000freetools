"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Clock } from "lucide-react"

export function SocialMediaTimestampConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [platform, setPlatform] = useState<"twitter" | "facebook" | "instagram" | "youtube" | "tiktok" | "all">("all")

  const formatForPlatform = useCallback((date: Date, platform: string): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)
    const diffWeeks = Math.floor(diffDays / 7)
    const diffMonths = Math.floor(diffDays / 30)
    const diffYears = Math.floor(diffDays / 365)

    switch (platform) {
      case "twitter":
        if (diffSecs < 60) return `${diffSecs}s`
        if (diffMins < 60) return `${diffMins}m`
        if (diffHours < 24) return `${diffHours}h`
        if (diffDays < 7) return `${diffDays}d`
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined })

      case "facebook":
        if (diffSecs < 60) return 'Just now'
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
        if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
        if (diffDays < 30) return `${diffWeeks} wk${diffWeeks > 1 ? 's' : ''} ago`
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

      case "instagram":
        if (diffSecs < 60) return 'NOW'
        if (diffMins < 60) return `${diffMins}m`
        if (diffHours < 24) return `${diffHours}h`
        if (diffDays < 7) return `${diffDays}d`
        if (diffDays < 30) return `${diffWeeks}w`
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

      case "youtube":
        if (diffSecs < 60) return `${diffSecs} seconds ago`
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
        if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
        if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
        return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`

      case "tiktok":
        if (diffSecs < 60) return `${diffSecs}s`
        if (diffMins < 60) return `${diffMins}m`
        if (diffHours < 24) return `${diffHours}h`
        if (diffDays < 7) return `${diffDays}d`
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

      default:
        return date.toLocaleString()
    }
  }, [])

  const parseTimestamp = useCallback((value: string): Date | null => {
    // Try Unix timestamp (seconds)
    if (/^\d{10}$/.test(value)) {
      return new Date(parseInt(value) * 1000)
    }
    // Try Unix timestamp (milliseconds)
    if (/^\d{13}$/.test(value)) {
      return new Date(parseInt(value))
    }
    // Try ISO format
    const isoDate = new Date(value)
    if (!isNaN(isoDate.getTime())) {
      return isoDate
    }
    return null
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

      const date = parseTimestamp(trimmed)
      
      if (!date || isNaN(date.getTime())) {
        results.push(`${trimmed} -> Invalid timestamp`)
        return
      }

      const platforms = platform === "all" 
        ? ["twitter", "facebook", "instagram", "youtube", "tiktok"]
        : [platform]

      let result = `${trimmed}\n`
      platforms.forEach(p => {
        const formatted = formatForPlatform(date, p)
        result += `  ${p.charAt(0).toUpperCase() + p.slice(1)}: ${formatted}\n`
      })
      results.push(result.trim())
    })

    setOutput(results.join('\n\n'))
  }, [input, platform, parseTimestamp, formatForPlatform])

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
      a.download = "social-timestamps.txt"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output])

  const handleUseCurrent = useCallback(() => {
    const now = Math.floor(Date.now() / 1000)
    setInput(now.toString())
  }, [])

  const handleExample = useCallback(() => {
    setInput(`1705312200
1704067200
1700000000
2024-01-15T10:30:00Z`)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Social Media Timestamp Converter</h2>
            <p className="text-sm text-muted-foreground">
              Convert timestamps to social media friendly formats
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleUseCurrent}>
              Use Current Time
            </Button>
            <Button variant="outline" size="sm" onClick={handleExample}>
              Load Example
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Label>Platform:</Label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value as any)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="all">All Platforms</option>
          <option value="twitter">Twitter/X</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">YouTube</option>
          <option value="tiktok">TikTok</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">Input Timestamps</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter timestamps (Unix or ISO format)..."
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
          <Label htmlFor="output">Social Media Formats</Label>
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
        <h3 className="font-medium">Platform Format Examples</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>Twitter/X:</strong>
            <p className="text-muted-foreground">2h, 30m, 5d, Jan 15</p>
          </div>
          <div>
            <strong>Facebook:</strong>
            <p className="text-muted-foreground">2 hours ago, 3 days ago</p>
          </div>
          <div>
            <strong>Instagram:</strong>
            <p className="text-muted-foreground">2h, 30m, JANUARY 15</p>
          </div>
          <div>
            <strong>YouTube:</strong>
            <p className="text-muted-foreground">2 hours ago, 3 days ago</p>
          </div>
          <div>
            <strong>TikTok:</strong>
            <p className="text-muted-foreground">2h, 30m, 5d</p>
          </div>
        </div>
      </div>
    </div>
  )
}

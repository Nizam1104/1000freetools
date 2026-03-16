"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function SQLEscapeString() {
  const [inputString, setInputString] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const escapeSQL = useCallback((str: string): string => {
    return str
      .replace(/'/g, "''") // Escape single quotes
      .replace(/\\/g, "\\\\") // Escape backslashes
      .replace(/\0/g, "\\0") // Escape null bytes
      .replace(/\n/g, "\\n") // Escape newlines
      .replace(/\r/g, "\\r") // Escape carriage returns
      .replace(/\t/g, "\\t") // Escape tabs
      .replace(/%/g, "\\%") // Escape LIKE wildcards
      .replace(/_/g, "\\_")
  }, [])

  const unescapeSQL = useCallback((str: string): string => {
    return str
      .replace(/\\r/g, "\r")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\0/g, "\0")
      .replace(/\\\\/g, "\\")
      .replace(/''/g, "'")
      .replace(/\\%/g, "%")
      .replace(/\\_/g, "_")
  }, [])

  const escapedString = useMemo(() => escapeSQL(inputString), [inputString, escapeSQL])
  const unescapedString = useMemo(() => unescapeSQL(inputString), [inputString, unescapeSQL])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">SQL Escape / Unescape String</h2>
        <p className="text-muted-foreground">
          Escape special characters in strings for safe SQL queries, or unescape previously escaped strings.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input-string">Input String</Label>
          <Textarea
            id="input-string"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            className="font-mono text-sm min-h-[120px]"
            placeholder="Enter string to escape or unescape..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Escaped (for SQL)</Label>
            <div className="rounded-lg border bg-muted/30 p-4 min-h-[100px]">
              <code className="font-mono text-sm break-all">
                {escapedString || <span className="text-muted-foreground">Escaped output...</span>}
              </code>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(escapedString, "escaped")}
              disabled={!inputString}
              className="w-full"
            >
              {copied === "escaped" ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span className="ml-2">Copy Escaped</span>
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Unescaped</Label>
            <div className="rounded-lg border bg-muted/30 p-4 min-h-[100px]">
              <code className="font-mono text-sm break-all">
                {unescapedString || <span className="text-muted-foreground">Unescaped output...</span>}
              </code>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(unescapedString, "unescaped")}
              disabled={!inputString}
              className="w-full"
            >
              {copied === "unescaped" ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span className="ml-2">Copy Unescaped</span>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-background p-4">
          <h3 className="text-sm font-medium mb-2">Characters Escaped</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded">'</code>
              <span className="text-muted-foreground">→</span>
              <code className="bg-muted px-2 py-1 rounded">''</code>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded">\</code>
              <span className="text-muted-foreground">→</span>
              <code className="bg-muted px-2 py-1 rounded">\\</code>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded">newline</code>
              <span className="text-muted-foreground">→</span>
              <code className="bg-muted px-2 py-1 rounded">\n</code>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded">%</code>
              <span className="text-muted-foreground">→</span>
              <code className="bg-muted px-2 py-1 rounded">\%</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

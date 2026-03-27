"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function CurrentTimestamp() {
  const [timestamp, setTimestamp] = useState<{ seconds: number; milliseconds: number }>({
    seconds: Math.floor(Date.now() / 1000),
    milliseconds: Date.now(),
  })
  const [copied, setCopied] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true)

  React.useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      setTimestamp({
        seconds: Math.floor(Date.now() / 1000),
        milliseconds: Date.now(),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const formats = useMemo(() => {
    const now = new Date()
    return {
      iso: now.toISOString(),
      rfc2822: now.toUTCString(),
      local: now.toLocaleString(),
      dateOnly: now.toLocaleDateString(),
      timeOnly: now.toLocaleTimeString(),
    }
  }, [timestamp])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-border"
            />
            Auto-refresh every second
          </label>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setTimestamp({
                seconds: Math.floor(Date.now() / 1000),
                milliseconds: Date.now(),
              })
            }
          >
            Refresh Now
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-muted/30 p-6 space-y-2">
            <p className="text-sm text-muted-foreground">Seconds</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl font-bold font-mono">{timestamp.seconds}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(timestamp.seconds.toString(), "seconds")}
              >
                {copied === "seconds" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-6 space-y-2">
            <p className="text-sm text-muted-foreground">Milliseconds</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl font-bold font-mono text-lg">{timestamp.milliseconds}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(timestamp.milliseconds.toString(), "milliseconds")}
              >
                {copied === "milliseconds" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-background p-4 space-y-3">
          <h3 className="text-sm font-medium">Current Date/Time Formats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ISO 8601:</span>
              <code className="font-mono">{formats.iso}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">RFC 2822:</span>
              <code className="font-mono">{formats.rfc2822}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Local:</span>
              <code className="font-mono">{formats.local}</code>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <h3 className="text-sm font-medium mb-2">About Unix Timestamp</h3>
          <p className="text-sm text-muted-foreground">
            The Unix timestamp is the number of seconds that have elapsed since January 1, 1970,
            00:00:00 UTC (the Unix epoch), not counting leap seconds. It is widely used in computing
            and is a standard way to represent points in time.
          </p>
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState<string>("")
  const [dateString, setDateString] = useState<string>("")
  const [timezone, setTimezone] = useState<string>("local")
  const [copied, setCopied] = useState<string | null>(null)

  const currentTimestamp = Math.floor(Date.now() / 1000)

  const convertedDate = useMemo(() => {
    if (!timestamp) return null
    const ts = parseInt(timestamp, 10)
    if (isNaN(ts)) return null

    const date = new Date(ts * 1000)
    return {
      date,
      iso: date.toISOString(),
      local: date.toLocaleString(),
      utc: date.toUTCString(),
    }
  }, [timestamp])

  const convertedTimestamp = useMemo(() => {
    if (!dateString) return null
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return null

    return {
      seconds: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
    }
  }, [dateString])

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
        <h2 className="text-2xl font-bold">Unix Timestamp Converter</h2>
        <p className="text-muted-foreground">
          Convert Unix timestamps to human-readable dates and vice versa.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current Unix Timestamp</p>
            <p className="text-3xl font-bold font-mono">{currentTimestamp}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setTimestamp(currentTimestamp.toString())
              setCopied("current")
            }}
          >
            {copied === "current" ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Timestamp to Date</h3>
          <div className="space-y-2">
            <Label htmlFor="timestamp-input">Unix Timestamp (seconds)</Label>
            <Input
              id="timestamp-input"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value.replace(/[^0-9]/g, ""))}
              className="font-mono"
              placeholder="e.g., 1711234567"
              type="text"
              inputMode="numeric"
            />
          </div>

          {convertedDate && (
            <div className="rounded-lg border bg-background p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Local Time</p>
                  <p className="font-mono">{convertedDate.local}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">UTC Time</p>
                  <p className="font-mono">{convertedDate.utc}</p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-xs text-muted-foreground">ISO 8601</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono">{convertedDate.iso}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(convertedDate.iso, "iso")}
                    >
                      {copied === "iso" ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Date to Timestamp</h3>
          <div className="space-y-2">
            <Label htmlFor="date-input">Date and Time</Label>
            <Input
              id="date-input"
              type="datetime-local"
              value={dateString}
              onChange={(e) => setDateString(e.target.value)}
            />
          </div>

          {convertedTimestamp && (
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Seconds</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold font-mono">{convertedTimestamp.seconds}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(convertedTimestamp.seconds.toString(), "seconds")}
                    >
                      {copied === "seconds" ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Milliseconds</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold font-mono">{convertedTimestamp.milliseconds}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(convertedTimestamp.milliseconds.toString(), "ms")}
                    >
                      {copied === "ms" ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

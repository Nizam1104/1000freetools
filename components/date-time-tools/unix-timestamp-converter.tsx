"use client"

import * as React from "react"
import { useState, useCallback, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Clock, Calendar } from "lucide-react"

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState<string>("")
  const [dateInput, setDateInput] = useState<string>("")
  const [timeInput, setTimeInput] = useState<string>("00:00")
  const [isMilliseconds, setIsMilliseconds] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const convertedDate = useMemo(() => {
    if (!timestamp) return null

    let ts = parseInt(timestamp.replace(/,/g, ""), 10)
    if (isNaN(ts)) return null

    if (isMilliseconds || timestamp.length > 10) {
      return new Date(ts)
    } else {
      return new Date(ts * 1000)
    }
  }, [timestamp, isMilliseconds])

  const generatedTimestamp = useMemo(() => {
    if (!dateInput) return null

    const date = new Date(`${dateInput}T${timeInput}`)
    if (isNaN(date.getTime())) return null

    return {
      seconds: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
    }
  }, [dateInput, timeInput])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const detectTimestampType = (ts: string): "seconds" | "milliseconds" | null => {
    const clean = ts.replace(/,/g, "")
    if (!/^\d+$/.test(clean)) return null
    if (clean.length > 10) return "milliseconds"
    return "seconds"
  }

  const detectedType = useMemo(() => detectTimestampType(timestamp), [timestamp])

  const commonTimestamps = [
    { label: "Now", value: Math.floor(Date.now() / 1000) },
    { label: "Start of Day", value: Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000) },
    { label: "End of Day", value: Math.floor(new Date(new Date().setHours(23, 59, 59, 999)).getTime() / 1000) },
    { label: "Start of Week", value: Math.floor(new Date(new Date().setDate(new Date().getDate() - new Date().getDay())).setHours(0, 0, 0, 0) / 1000) },
    { label: "Start of Month", value: Math.floor(new Date(new Date().setDate(1)).setHours(0, 0, 0, 0) / 1000) },
    { label: "Start of Year", value: Math.floor(new Date(new Date().getFullYear(), 0, 1).getTime() / 1000) },
    { label: "Unix Epoch", value: 0 },
    { label: "Y2K", value: 946684800 },
    { label: "Jan 1, 2030", value: 1893456000 },
    { label: "Jan 1, 2050", value: 2524608000 },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Unix Timestamp Converter</h2>
        <p className="text-muted-foreground">
          Convert Unix/Epoch timestamps to human-readable dates and vice versa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="size-5" />
              Timestamp to Date
            </h3>

            <div className="space-y-2">
              <Label htmlFor="timestamp">Unix Timestamp</Label>
              <div className="flex gap-2">
                <Input
                  id="timestamp"
                  type="text"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="e.g., 1609459200"
                  className="font-mono"
                />
                {timestamp && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(timestamp, "ts")}
                  >
                    {copied === "ts" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="milliseconds"
                  checked={isMilliseconds}
                  onChange={(e) => setIsMilliseconds(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="milliseconds" className="text-sm font-normal">
                  Timestamp is in milliseconds
                </Label>
              </div>
              {detectedType && (
                <p className="text-xs text-muted-foreground">
                  Detected: {detectedType === "milliseconds" ? "Milliseconds" : "Seconds"}
                </p>
              )}
            </div>

            {convertedDate && !isNaN(convertedDate.getTime()) && (
              <div className="rounded-lg border bg-background p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Converted Date</p>
                    <p className="text-lg font-semibold">{formatDate(convertedDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="text-lg font-semibold font-mono">{formatTime(convertedDate)}</p>
                  </div>
                </div>
                <div className="pt-3 border-t space-y-1">
                  <p className="text-sm text-muted-foreground">ISO 8601 Format</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm">{convertedDate.toISOString()}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(convertedDate.toISOString(), "iso")}
                    >
                      {copied === "iso" ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                </div>
                <div className="pt-3 border-t space-y-1">
                  <p className="text-sm text-muted-foreground">Local Format</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm">{convertedDate.toLocaleString()}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(convertedDate.toLocaleString(), "local")}
                    >
                      {copied === "local" ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-lg border bg-background p-4 space-y-3">
            <h3 className="font-semibold">Quick Timestamps</h3>
            <div className="grid grid-cols-2 gap-2">
              {commonTimestamps.map((ts) => (
                <Button
                  key={ts.label}
                  variant="outline"
                  size="sm"
                  onClick={() => setTimestamp(ts.value.toString())}
                  className="justify-start"
                >
                  {ts.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="size-5" />
              Date to Timestamp
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date-input">Date</Label>
                <Input
                  id="date-input"
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-input">Time</Label>
                <Input
                  id="time-input"
                  type="time"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                />
              </div>
            </div>

            {generatedTimestamp && (
              <div className="rounded-lg border bg-background p-4 space-y-3">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Timestamp (seconds)</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold font-mono">{generatedTimestamp.seconds}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedTimestamp.seconds.toString(), "gen-sec")}
                    >
                      {copied === "gen-sec" ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Timestamp (milliseconds)</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold font-mono">{generatedTimestamp.milliseconds}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedTimestamp.milliseconds.toString(), "gen-ms")}
                    >
                      {copied === "gen-ms" ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-lg border bg-background p-4 space-y-4">
            <h3 className="font-semibold">Current Timestamp</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Seconds</p>
                <p className="text-3xl font-bold font-mono">{Math.floor(currentTimestamp / 1000)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Milliseconds</p>
                <p className="text-2xl font-bold font-mono">{currentTimestamp}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => copyToClipboard(Math.floor(currentTimestamp / 1000).toString(), "current")}
              >
                <Copy className="size-4 mr-2" />
                Copy Current Timestamp
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
            <h3 className="font-semibold">About Unix Timestamps</h3>
            <p className="text-sm text-muted-foreground">
              A Unix timestamp is the number of seconds (or milliseconds) that have elapsed since
              00:00:00 UTC on January 1, 1970 (the Unix Epoch). It's widely used in programming
              and databases for storing and comparing dates.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mt-2">
              <li>10 digits = seconds since epoch</li>
              <li>13 digits = milliseconds since epoch</li>
              <li>Year 2038 problem: 32-bit systems overflow on Jan 19, 2038</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

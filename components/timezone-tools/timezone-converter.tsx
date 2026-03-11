"use client"

import * as React from "react"
import { useState, useCallback, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const commonTimezones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Kolkata",
  "Australia/Sydney",
  "Pacific/Auckland",
]

export default function TimezoneConverter() {
  const [sourceTime, setSourceTime] = useState<string>("")
  const [sourceTimezone, setSourceTimezone] = useState<string>("UTC")
  const [targetTimezone, setTargetTimezone] = useState<string>("America/New_York")
  const [copied, setCopied] = useState<string | null>(null)

  const convertedTime = useMemo(() => {
    if (!sourceTime) return null

    try {
      const date = new Date(sourceTime)
      if (isNaN(date.getTime())) return null

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
        timeZone: targetTimezone,
      }

      const sourceOptions: Intl.DateTimeFormatOptions = {
        ...options,
        timeZone: sourceTimezone,
      }

      return {
        source: new Intl.DateTimeFormat("en-US", sourceOptions).format(date),
        target: new Intl.DateTimeFormat("en-US", options).format(date),
        iso: date.toISOString(),
        sourceOffset: getTimezoneOffset(sourceTimezone, date),
        targetOffset: getTimezoneOffset(targetTimezone, date),
      }
    } catch {
      return null
    }
  }, [sourceTime, sourceTimezone, targetTimezone])

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
        <h2 className="text-2xl font-bold">Time Zone Converter</h2>
        <p className="text-muted-foreground">
          Convert time between different time zones worldwide.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="source-time">Date & Time</Label>
            <Input
              id="source-time"
              type="datetime-local"
              value={sourceTime}
              onChange={(e) => setSourceTime(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source-tz">From Timezone</Label>
            <Select value={sourceTimezone} onValueChange={setSourceTimezone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {commonTimezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-tz">To Timezone</Label>
            <Select value={targetTimezone} onValueChange={setTargetTimezone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {commonTimezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {convertedTime && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <p className="text-sm text-muted-foreground">{sourceTimezone}</p>
              <p className="text-lg font-medium">{convertedTime.source}</p>
              <p className="text-xs text-muted-foreground">
                UTC{convertedTime.sourceOffset >= 0 ? "+" : ""}{convertedTime.sourceOffset}
              </p>
            </div>

            <div className="rounded-lg border bg-primary/10 p-4 space-y-2">
              <p className="text-sm text-muted-foreground">{targetTimezone}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium">{convertedTime.target}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(convertedTime.target, "target")}
                >
                  {copied === "target" ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                UTC{convertedTime.targetOffset >= 0 ? "+" : ""}{convertedTime.targetOffset}
              </p>
            </div>
          </div>
        )}

        <div className="rounded-lg border bg-background p-4">
          <h3 className="text-sm font-medium mb-3">Quick Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {commonTimezones.slice(0, 8).map((tz) => (
              <div key={tz} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="truncate">{tz.split("/")[1]?.replace("_", " ") || tz}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {getTimezoneOffset(tz, new Date()) >= 0 ? "+" : ""}
                  {getTimezoneOffset(tz, new Date())}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function getTimezoneOffset(timezone: string, date: Date): number {
  try {
    const tzString = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "longOffset",
    }).format(date)

    const match = tzString.match(/GMT([+-]\d+)/)
    if (match) {
      return parseInt(match[1], 10)
    }

    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }))
    const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }))
    const offset = (utcDate.getTime() - tzDate.getTime()) / (1000 * 60 * 60)
    return Math.round(offset)
  } catch {
    return 0
  }
}

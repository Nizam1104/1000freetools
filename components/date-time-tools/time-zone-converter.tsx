"use client"

import * as React from "react"
import { useState, useCallback, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Plus, Trash2, Globe } from "lucide-react"

const commonTimeZones = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "New York (EST/EDT)" },
  { value: "America/Chicago", label: "Chicago (CST/CDT)" },
  { value: "America/Denver", label: "Denver (MST/MDT)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Kolkata", label: "Mumbai (IST)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
  { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)" },
  { value: "America/Sao_Paulo", label: "Sao Paulo (BRT)" },
  { value: "Africa/Johannesburg", label: "Johannesburg (SAST)" },
  { value: "Asia/Seoul", label: "Seoul (KST)" },
  { value: "Europe/Moscow", label: "Moscow (MSK)" },
  { value: "America/Toronto", label: "Toronto (EST/EDT)" },
]

interface TimeZoneEntry {
  id: string
  timeZone: string
  time: string
}

export default function TimeZoneConverter() {
  const [baseTime, setBaseTime] = useState<string>("12:00")
  const [baseDate, setBaseDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [fromTimeZone, setFromTimeZone] = useState<string>("UTC")
  const [timeZones, setTimeZones] = useState<TimeZoneEntry[]>([
    { id: "1", timeZone: "America/New_York", time: "" },
    { id: "2", timeZone: "Europe/London", time: "" },
    { id: "3", timeZone: "Asia/Tokyo", time: "" },
  ])
  const [copied, setCopied] = useState<string | null>(null)
  const [currentTimeData, setCurrentTimeData] = useState<Record<string, string>>({})

  const convertTime = useCallback((time: string, date: string, fromTz: string, toTz: string) => {
    if (!time || !date || !fromTz || !toTz) return null

    const [hours, minutes] = time.split(":").map(Number)
    const [year, month, day] = date.split("-").map(Number)

    const baseDate = new Date(Date.UTC(year, month - 1, day, hours, minutes))

    const options: Intl.DateTimeFormatOptions = {
      timeZone: fromTz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }

    const formatter = new Intl.DateTimeFormat("en-US", options)
    const parts = formatter.formatToParts(baseDate)
    const partMap: Record<string, string> = {}
    parts.forEach((part) => {
      if (part.type !== "literal") {
        partMap[part.type] = part.value
      }
    })

    const fromOffset = getTimeZoneOffset(fromTz, baseDate)
    const toOffset = getTimeZoneOffset(toTz, baseDate)

    const utcTime = baseDate.getTime() - fromOffset
    const targetTime = new Date(utcTime + toOffset)

    return targetTime
  }, [])

  const getTimeZoneOffset = (timeZone: string, date: Date): number => {
    const tzDate = new Date(
      date.toLocaleString("en-US", { timeZone }).replace(",", "")
    )
    const utcDate = new Date(
      date.toLocaleString("en-US", { timeZone: "UTC" }).replace(",", "")
    )
    return tzDate.getTime() - utcDate.getTime()
  }

  const convertedTimes = useMemo(() => {
    return timeZones.map((tz) => {
      const converted = convertTime(baseTime, baseDate, fromTimeZone, tz.timeZone)
      if (!converted) return { ...tz, convertedTime: null, dateStr: "" }

      const dateStr = converted.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })

      const timeStr = converted.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: tz.timeZone,
      })

      const tzName = new Intl.DateTimeFormat("en-US", {
        timeZone: tz.timeZone,
        timeZoneName: "short",
      })
        .formatToParts(converted)
        .find((p) => p.type === "timeZoneName")?.value

      return {
        ...tz,
        convertedTime: timeStr,
        dateStr,
        tzName: tzName || tz.timeZone,
      }
    })
  }, [baseTime, baseDate, fromTimeZone, timeZones, convertTime])

  useEffect(() => {
    const updateCurrentTimes = () => {
      const now = new Date()
      const data: Record<string, string> = {}

      commonTimeZones.forEach((tz) => {
        const timeStr = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: tz.value,
        })
        data[tz.value] = timeStr
      })

      setCurrentTimeData(data)
    }

    updateCurrentTimes()
    const interval = setInterval(updateCurrentTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const addTimeZone = () => {
    const newId = Date.now().toString()
    setTimeZones([...timeZones, { id: newId, timeZone: "UTC", time: "" }])
  }

  const removeTimeZone = (id: string) => {
    setTimeZones(timeZones.filter((tz) => tz.id !== id))
  }

  const updateTimeZone = (id: string, timeZone: string) => {
    setTimeZones(timeZones.map((tz) => (tz.id === id ? { ...tz, timeZone } : tz)))
  }

  const fromTimeZoneLabel = commonTimeZones.find((tz) => tz.value === fromTimeZone)?.label || fromTimeZone

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Time Zone Converter</h2>
        <p className="text-muted-foreground">
          Convert time between any two time zones with automatic DST handling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="base-date">Date</Label>
          <Input
            id="base-date"
            type="date"
            value={baseDate}
            onChange={(e) => setBaseDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="base-time">Time</Label>
          <Input
            id="base-time"
            type="time"
            value={baseTime}
            onChange={(e) => setBaseTime(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="from-timezone">From Time Zone</Label>
          <select
            id="from-timezone"
            value={fromTimeZone}
            onChange={(e) => setFromTimeZone(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {commonTimeZones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Source Time</p>
            <p className="text-2xl font-bold">
              {new Date(`${baseDate}T${baseTime}`).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p className="text-sm text-muted-foreground">{fromTimeZoneLabel}</p>
          </div>
          <Button variant="outline" size="sm" onClick={addTimeZone}>
            <Plus className="size-4 mr-2" />
            Add Time Zone
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {convertedTimes.map((tz) => (
            <div
              key={tz.id}
              className="rounded-lg border bg-background p-4 space-y-2 relative group"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeTimeZone(tz.id)}
              >
                <Trash2 className="size-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Globe className="size-4 text-muted-foreground" />
                <select
                  value={tz.timeZone}
                  onChange={(e) => updateTimeZone(tz.id, e.target.value)}
                  className="flex-1 rounded-md border border-input bg-background px-2 py-1 text-sm"
                >
                  {commonTimeZones.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label.split(" (")[0]}
                    </option>
                  ))}
                </select>
              </div>
              {tz.convertedTime && (
                <div className="space-y-1">
                  <p className="text-3xl font-bold">{tz.convertedTime}</p>
                  <p className="text-sm text-muted-foreground">
                    {tz.dateStr} - {tz.tzName}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-background p-4 space-y-4">
        <h3 className="font-semibold">Current Time in Major Cities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {commonTimeZones.slice(0, 15).map((tz) => (
            <div
              key={tz.value}
              className="rounded-lg border bg-muted/30 p-3 space-y-1"
            >
              <p className="text-xs text-muted-foreground truncate">
                {tz.label.split(" (")[0]}
              </p>
              <p className="text-lg font-bold font-mono">
                {currentTimeData[tz.value] || "--:--:--"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

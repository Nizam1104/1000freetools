"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Plus, Trash2, Clock, Globe, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeZoneInfo {
  zone: string
  name: string
  offset: string
  abbreviation: string
}

interface TimeComparison {
  sourceTime: Date
  targetTime: Date
  timeDifference: string
  isNextDay: boolean
  isPrevDay: boolean
}

const TIME_ZONES: TimeZoneInfo[] = [
  { zone: "UTC", name: "Coordinated Universal Time", offset: "+00:00", abbreviation: "UTC" },
  { zone: "America/New_York", name: "Eastern Time (US & Canada)", offset: "-05:00", abbreviation: "EST" },
  { zone: "America/Chicago", name: "Central Time (US & Canada)", offset: "-06:00", abbreviation: "CST" },
  { zone: "America/Denver", name: "Mountain Time (US & Canada)", offset: "-07:00", abbreviation: "MST" },
  { zone: "America/Los_Angeles", name: "Pacific Time (US & Canada)", offset: "-08:00", abbreviation: "PST" },
  { zone: "America/Anchorage", name: "Alaska Time", offset: "-09:00", abbreviation: "AKST" },
  { zone: "Pacific/Honolulu", name: "Hawaii Time", offset: "-10:00", abbreviation: "HST" },
  { zone: "Europe/London", name: "London (GMT/BST)", offset: "+00:00", abbreviation: "GMT" },
  { zone: "Europe/Paris", name: "Paris (CET)", offset: "+01:00", abbreviation: "CET" },
  { zone: "Europe/Berlin", name: "Berlin (CET)", offset: "+01:00", abbreviation: "CET" },
  { zone: "Europe/Moscow", name: "Moscow Time", offset: "+03:00", abbreviation: "MSK" },
  { zone: "Asia/Dubai", name: "Gulf Standard Time", offset: "+04:00", abbreviation: "GST" },
  { zone: "Asia/Kolkata", name: "India Standard Time", offset: "+05:30", abbreviation: "IST" },
  { zone: "Asia/Bangkok", name: "Indochina Time", offset: "+07:00", abbreviation: "ICT" },
  { zone: "Asia/Singapore", name: "Singapore Time", offset: "+08:00", abbreviation: "SGT" },
  { zone: "Asia/Shanghai", name: "China Standard Time", offset: "+08:00", abbreviation: "CST" },
  { zone: "Asia/Tokyo", name: "Japan Standard Time", offset: "+09:00", abbreviation: "JST" },
  { zone: "Asia/Seoul", name: "Korea Standard Time", offset: "+09:00", abbreviation: "KST" },
  { zone: "Australia/Sydney", name: "Australian Eastern Time", offset: "+11:00", abbreviation: "AEDT" },
  { zone: "Australia/Perth", name: "Australian Western Time", offset: "+08:00", abbreviation: "AWST" },
  { zone: "Pacific/Auckland", name: "New Zealand Time", offset: "+13:00", abbreviation: "NZDT" },
  { zone: "America/Sao_Paulo", name: "Brasilia Time", offset: "-03:00", abbreviation: "BRT" },
  { zone: "America/Mexico_City", name: "Central Mexico Time", offset: "-06:00", abbreviation: "CST" },
  { zone: "Africa/Cairo", name: "Eastern European Time", offset: "+02:00", abbreviation: "EET" },
  { zone: "Africa/Johannesburg", name: "South Africa Time", offset: "+02:00", abbreviation: "SAST" },
]

const PRESET_MEETINGS = [
  { name: "9 AM New York", ny: "09:00" },
  { name: "12 PM London", ny: "07:00" },
  { name: "3 PM Tokyo", ny: "01:00" },
  { name: "10 AM PT / 1 PM ET", ny: "13:00" },
]

export default function TimeZoneConverter() {
  const [sourceZone, setSourceZone] = useState("America/New_York")
  const [sourceDate, setSourceDate] = useState(new Date().toISOString().split("T")[0])
  const [sourceTime, setSourceTime] = useState("09:00")
  const [targetZones, setTargetZones] = useState<string[]>(["Europe/London", "Asia/Tokyo", "America/Los_Angeles"])
  const [newTargetZone, setNewTargetZone] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const sourceTimeZoneInfo = useMemo(() => 
    TIME_ZONES.find(tz => tz.zone === sourceZone) || TIME_ZONES[0],
    [sourceZone]
  )

  const convertedTimes = useMemo(() => {
    const sourceDateTime = new Date(`${sourceDate}T${sourceTime}:00`)
    const results: { zone: TimeZoneInfo; time: Date; comparison: TimeComparison }[] = []

    targetZones.forEach(zoneId => {
      const targetTz = TIME_ZONES.find(tz => tz.zone === zoneId)
      if (!targetTz) return

      // Convert source time to target timezone
      const options: Intl.DateTimeFormatOptions = {
        timeZone: zoneId,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }

      const formatter = new Intl.DateTimeFormat("en-US", options)
      const parts = formatter.formatToParts(sourceDateTime)
      const partValues: Record<string, string> = {}
      parts.forEach(part => {
        if (part.type !== "literal") {
          partValues[part.type] = part.value
        }
      })

      const targetTime = new Date(
        parseInt(partValues.year),
        parseInt(partValues.month) - 1,
        parseInt(partValues.day),
        parseInt(partValues.hour),
        parseInt(partValues.minute)
      )

      const isNextDay = targetTime.getDate() > sourceDateTime.getDate() ||
        targetTime.getMonth() > sourceDateTime.getMonth() ||
        targetTime.getFullYear() > sourceDateTime.getFullYear()
      const isPrevDay = targetTime.getDate() < sourceDateTime.getDate() ||
        targetTime.getMonth() < sourceDateTime.getMonth() ||
        targetTime.getFullYear() < sourceDateTime.getFullYear()

      // Calculate time difference
      const sourceOffset = getTimeZoneOffset(sourceZone, sourceDateTime)
      const targetOffset = getTimeZoneOffset(zoneId, sourceDateTime)
      const diffHours = targetOffset - sourceOffset
      const diffSign = diffHours >= 0 ? "+" : ""
      const diffAbs = Math.abs(diffHours)
      const diffHoursInt = Math.floor(diffAbs)
      const diffMinutes = Math.round((diffAbs - diffHoursInt) * 60)
      const timeDifference = `${diffSign}${diffHoursInt}h${diffMinutes > 0 ? diffMinutes + "m" : ""}`

      results.push({
        zone: targetTz,
        time: targetTime,
        comparison: {
          sourceTime: sourceDateTime,
          targetTime,
          timeDifference,
          isNextDay,
          isPrevDay,
        },
      })
    })

    return results
  }, [sourceDate, sourceTime, sourceZone, targetZones])

  const worldClock = useMemo(() => {
    const [allZones, setAllZones] = useState<TimeZoneInfo[]>(TIME_ZONES)
    return TIME_ZONES.map(tz => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: tz.zone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
      const timeStr = new Intl.DateTimeFormat("en-US", options).format(now)
      const dayOptions: Intl.DateTimeFormatOptions = {
        timeZone: tz.zone,
        weekday: "short",
      }
      const dayStr = new Intl.DateTimeFormat("en-US", dayOptions).format(now)
      return { ...tz, currentTime: timeStr, currentDay: dayStr }
    })
  }, [])

  const [currentTimeData, setCurrentTimeData] = useState(worldClock)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimeData(
        TIME_ZONES.map(tz => {
          const now = new Date()
          const options: Intl.DateTimeFormatOptions = {
            timeZone: tz.zone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
          const timeStr = new Intl.DateTimeFormat("en-US", options).format(now)
          const dayOptions: Intl.DateTimeFormatOptions = {
            timeZone: tz.zone,
            weekday: "short",
          }
          const dayStr = new Intl.DateTimeFormat("en-US", dayOptions).format(now)
          return { ...tz, currentTime: timeStr, currentDay: dayStr }
        })
      )
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  function getTimeZoneOffset(timeZone: string, date: Date): number {
    const tzDate = new Date(date.toLocaleString("en-US", { timeZone }))
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }))
    return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60)
  }

  const addTargetZone = useCallback(() => {
    if (newTargetZone && !targetZones.includes(newTargetZone)) {
      setTargetZones(prev => [...prev, newTargetZone])
      setNewTargetZone("")
    }
  }, [newTargetZone, targetZones])

  const removeTargetZone = useCallback((zone: string) => {
    setTargetZones(prev => prev.filter(z => z !== zone))
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

  const generateMeetingSummary = useCallback(() => {
    const sourceTz = TIME_ZONES.find(tz => tz.zone === sourceZone)
    const lines = [
      `Meeting Time: ${new Date(`${sourceDate}T${sourceTime}`).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" })} ${sourceTz?.abbreviation}`,
      "",
      "Times in other locations:",
    ]

    convertedTimes.forEach(({ zone, time, comparison }) => {
      const dayIndicator = comparison.isNextDay ? " (next day)" : comparison.isPrevDay ? " (previous day)" : ""
      lines.push(`• ${zone.name}: ${time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}${dayIndicator}`)
    })

    return lines.join("\n")
  }, [sourceDate, sourceTime, sourceZone, convertedTimes])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Converter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="size-5" />
            Time Zone Converter
          </CardTitle>
          <CardDescription>
            Convert date and time between any time zones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Source Time */}
          <div className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source-zone">From Time Zone</Label>
                <Select value={sourceZone} onValueChange={setSourceZone}>
                  <SelectTrigger id="source-zone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_ZONES.map((tz) => (
                      <SelectItem key={tz.zone} value={tz.zone}>
                        {tz.name} ({tz.abbreviation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source-date">Date</Label>
                <Input
                  id="source-date"
                  type="date"
                  value={sourceDate}
                  onChange={(e) => setSourceDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source-time">Time</Label>
                <Input
                  id="source-time"
                  type="time"
                  value={sourceTime}
                  onChange={(e) => setSourceTime(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              {PRESET_MEETINGS.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSourceTime(preset.ny)
                    setSourceDate(new Date().toISOString().split("T")[0])
                  }}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Target Zones */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ArrowRight className="size-4" />
              <Label>To Time Zones</Label>
            </div>
            <div className="flex gap-2">
              <Select value={newTargetZone} onValueChange={setNewTargetZone}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a time zone..." />
                </SelectTrigger>
                <SelectContent>
                  {TIME_ZONES.filter(tz => !targetZones.includes(tz.zone)).map((tz) => (
                    <SelectItem key={tz.zone} value={tz.zone}>
                      {tz.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addTargetZone} size="sm">
                <Plus className="size-4" />
              </Button>
            </div>

            {targetZones.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {targetZones.map((zone) => {
                  const tz = TIME_ZONES.find(t => t.zone === zone)
                  return (
                    <Badge key={zone} variant="secondary" className="gap-1">
                      {tz?.abbreviation || zone}
                      <button onClick={() => removeTargetZone(zone)} className="hover:text-destructive">
                        <Trash2 className="size-3" />
                      </button>
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>

          {/* Results */}
          {convertedTimes.length > 0 && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Converted Times</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generateMeetingSummary(), "summary")}
                >
                  {copied === "summary" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy Summary
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {convertedTimes.map(({ zone, time, comparison }) => (
                  <div
                    key={zone.zone}
                    className={cn(
                      "p-4 rounded-lg border",
                      comparison.isNextDay && "border-amber-500 bg-amber-50 dark:bg-amber-900/20",
                      comparison.isPrevDay && "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{zone.abbreviation}</span>
                      {comparison.isNextDay && (
                        <Badge variant="outline" className="text-xs">Next Day</Badge>
                      )}
                      {comparison.isPrevDay && (
                        <Badge variant="outline" className="text-xs">Prev Day</Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold">{formatTime(time)}</div>
                    <div className="text-sm text-muted-foreground">{formatDate(time)}</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {zone.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Time diff: {comparison.timeDifference} from source
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* World Clock */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5" />
            World Clock
          </CardTitle>
          <CardDescription>
            Current time around the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {currentTimeData.map((tz) => (
              <div
                key={tz.zone}
                className="p-3 rounded-lg border text-center"
              >
                <div className="text-xs text-muted-foreground mb-1">{tz.abbreviation}</div>
                <div className="text-lg font-bold">{tz.currentTime}</div>
                <div className="text-xs text-muted-foreground">{tz.currentDay}</div>
                <div className="text-[10px] text-muted-foreground mt-1 truncate">
                  {tz.name.split("(")[0].trim()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meeting Planner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            Meeting Time Finder
          </CardTitle>
          <CardDescription>
            Find overlapping business hours across time zones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Best times for meetings across major time zones (9 AM - 5 PM local):
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">US ↔ Europe</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 9 AM ET = 2 PM GMT / 3 PM CET</li>
                  <li>• 10 AM ET = 3 PM GMT / 4 PM CET</li>
                  <li>• 2 PM ET = 7 PM GMT / 8 PM CET</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">US ↔ Asia</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 7 PM ET = 8 AM JST (next day)</li>
                  <li>• 8 PM ET = 9 AM JST (next day)</li>
                  <li>• 9 PM ET = 10 AM JST (next day)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Europe ↔ Asia</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 8 AM CET = 2 PM CST / 3 PM JST</li>
                  <li>• 9 AM CET = 3 PM CST / 4 PM JST</li>
                  <li>• 10 AM CET = 4 PM CST / 5 PM JST</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">All Regions</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Very limited overlap</li>
                  <li>• 7 AM ET = 12 PM GMT = 8 PM JST</li>
                  <li>• Consider async communication</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

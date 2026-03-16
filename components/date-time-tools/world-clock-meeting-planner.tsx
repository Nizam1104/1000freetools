"use client"

import * as React from "react"
import { useState, useCallback, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Clock, Users, Check } from "lucide-react"

const commonTimeZones = [
  { value: "UTC", label: "UTC", city: "Coordinated Universal Time" },
  { value: "America/New_York", label: "ET", city: "New York" },
  { value: "America/Chicago", label: "CT", city: "Chicago" },
  { value: "America/Denver", label: "MT", city: "Denver" },
  { value: "America/Los_Angeles", label: "PT", city: "Los Angeles" },
  { value: "America/Toronto", label: "ET", city: "Toronto" },
  { value: "America/Vancouver", label: "PT", city: "Vancouver" },
  { value: "America/Sao_Paulo", label: "BRT", city: "Sao Paulo" },
  { value: "Europe/London", label: "GMT", city: "London" },
  { value: "Europe/Paris", label: "CET", city: "Paris" },
  { value: "Europe/Berlin", label: "CET", city: "Berlin" },
  { value: "Europe/Moscow", label: "MSK", city: "Moscow" },
  { value: "Asia/Dubai", label: "GST", city: "Dubai" },
  { value: "Asia/Kolkata", label: "IST", city: "Mumbai" },
  { value: "Asia/Singapore", label: "SGT", city: "Singapore" },
  { value: "Asia/Hong_Kong", label: "HKT", city: "Hong Kong" },
  { value: "Asia/Shanghai", label: "CST", city: "Shanghai" },
  { value: "Asia/Tokyo", label: "JST", city: "Tokyo" },
  { value: "Asia/Seoul", label: "KST", city: "Seoul" },
  { value: "Australia/Sydney", label: "AEST", city: "Sydney" },
  { value: "Australia/Melbourne", label: "AEST", city: "Melbourne" },
  { value: "Pacific/Auckland", label: "NZST", city: "Auckland" },
  { value: "Africa/Johannesburg", label: "SAST", city: "Johannesburg" },
  { value: "Africa/Cairo", label: "EET", city: "Cairo" },
]

interface TimeZoneEntry {
  id: string
  timeZone: string
  name: string
}

export default function WorldClockMeetingPlanner() {
  const [timeZones, setTimeZones] = useState<TimeZoneEntry[]>([
    { id: "1", timeZone: "America/New_York", name: "New York" },
    { id: "2", timeZone: "Europe/London", name: "London" },
    { id: "3", timeZone: "Asia/Tokyo", name: "Tokyo" },
    { id: "4", timeZone: "Australia/Sydney", name: "Sydney" },
  ])
  const [currentTimeData, setCurrentTimeData] = useState<Record<string, { time: string; date: string; day: string }>>({})
  const [selectedHour, setSelectedHour] = useState<number>(9)
  const [meetingDuration, setMeetingDuration] = useState<number>(1)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      const data: Record<string, { time: string; date: string; day: string }> = {}

      timeZones.forEach((tz) => {
        const timeStr = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: tz.timeZone,
        })
        const dateStr = now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          timeZone: tz.timeZone,
        })
        const dayStr = now.toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: tz.timeZone,
        })
        data[tz.id] = { time: timeStr, date: dateStr, day: dayStr }
      })

      setCurrentTimeData(data)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [timeZones])

  const addTimeZone = () => {
    const newId = Date.now().toString()
    setTimeZones([...timeZones, { id: newId, timeZone: "UTC", name: "UTC" }])
  }

  const removeTimeZone = (id: string) => {
    if (timeZones.length > 1) {
      setTimeZones(timeZones.filter((tz) => tz.id !== id))
    }
  }

  const updateTimeZone = (id: string, timeZone: string) => {
    const tzInfo = commonTimeZones.find((tz) => tz.value === timeZone)
    setTimeZones(timeZones.map((tz) => (tz.id === id ? { ...tz, timeZone, name: tzInfo?.city || timeZone } : tz)))
  }

  const getHourInTimeZone = useCallback((hour: number, timeZone: string): { hour: number; isPM: boolean; day: string } => {
    const now = new Date()
    now.setHours(hour, 0, 0, 0)

    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      timeZone,
    })

    const dayStr = now.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone,
    })

    const isPM = timeStr.includes("PM")
    const hourNum = parseInt(timeStr.split(":")[0], 10)

    return { hour: hourNum, isPM, day: dayStr }
  }, [])

  const isBusinessHours = (hour: number, timeZone: string): boolean => {
    const { hour: localHour } = getHourInTimeZone(hour, timeZone)
    return localHour >= 9 && localHour < 17
  }

  const findBestMeetingTimes = useMemo(() => {
    const bestTimes: { hour: number; score: number; times: Record<string, string> }[] = []

    for (let hour = 0; hour < 24; hour++) {
      let score = 0
      const times: Record<string, string> = {}

      timeZones.forEach((tz) => {
        const { hour: localHour, isPM, day } = getHourInTimeZone(hour, tz.timeZone)
        times[tz.id] = `${localHour}:${isPM ? "PM" : "AM"} (${day})`

        if (localHour >= 9 && localHour < 17) {
          score += 2
        } else if (localHour >= 7 && localHour < 9) {
          score += 1
        } else if (localHour >= 17 && localHour < 20) {
          score += 1
        }
      })

      if (score > 0) {
        bestTimes.push({ hour, score, times })
      }
    }

    return bestTimes.sort((a, b) => b.score - a.score).slice(0, 5)
  }, [timeZones, getHourInTimeZone])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const hours24 = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">World Clock Meeting Planner</h2>
        <p className="text-muted-foreground">
          Compare times across multiple time zones and find the best meeting time for international participants.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="size-5" />
            Current Times
          </h3>
          <Button variant="outline" size="sm" onClick={addTimeZone}>
            <Plus className="size-4 mr-2" />
            Add Location
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeZones.map((tz) => (
            <div key={tz.id} className="rounded-lg border bg-background p-4 space-y-2 relative group">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeTimeZone(tz.id)}
                disabled={timeZones.length <= 1}
              >
                <Trash2 className="size-4" />
              </Button>
              <div className="space-y-1">
                <select
                  value={tz.timeZone}
                  onChange={(e) => updateTimeZone(tz.id, e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-2 py-1 text-sm"
                >
                  {commonTimeZones.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.city}
                    </option>
                  ))}
                </select>
                <div className="text-center py-2">
                  <p className="text-3xl font-bold font-mono">
                    {currentTimeData[tz.id]?.time || "--:--"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentTimeData[tz.id]?.day}, {currentTimeData[tz.id]?.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-background p-4 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Users className="size-5" />
          Meeting Time Finder
        </h3>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="space-y-1">
            <Label>Meeting Duration</Label>
            <select
              value={meetingDuration}
              onChange={(e) => setMeetingDuration(parseInt(e.target.value, 10))}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value={1}>1 hour</option>
              <option value={2}>2 hours</option>
              <option value={3}>3 hours</option>
              <option value={4}>4 hours</option>
            </select>
          </div>
        </div>

        {findBestMeetingTimes.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium">Recommended Meeting Times (based on 9 AM - 5 PM business hours):</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {findBestMeetingTimes.map((slot, index) => (
                <div
                  key={slot.hour}
                  className={`rounded-lg border p-3 space-y-2 ${
                    index === 0 ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">
                      {index === 0 && "Best "}Time: {new Date().setHours(slot.hour, 0, 0, 0) && new Date().toLocaleTimeString("en-US", { hour: "numeric", hour12: true, timeZone: "UTC" }).replace(/\s[AP]M/, "")} UTC
                    </p>
                    {index === 0 && <Check className="size-4 text-green-600" />}
                  </div>
                  <div className="space-y-1">
                    {timeZones.map((tz) => {
                      const { hour: localHour, isPM, day } = getHourInTimeZone(slot.hour, tz.timeZone)
                      const isBizHours = localHour >= 9 && localHour < 17
                      return (
                        <div key={tz.id} className="flex items-center justify-between text-sm">
                          <span>{tz.name}:</span>
                          <span className={isBizHours ? "text-green-600 font-medium" : "text-muted-foreground"}>
                            {localHour}:{isPM ? "PM" : "AM"} ({day})
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
        <h3 className="font-semibold">24-Hour Comparison Chart</h3>
        <p className="text-sm text-muted-foreground">
          Click on any hour to see the time in all locations
        </p>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-[80px_repeat(4,minmax(120px,1fr))] gap-2">
              <div className="font-semibold text-sm">UTC Hour</div>
              {timeZones.map((tz) => (
                <div key={tz.id} className="font-semibold text-sm text-center">
                  {tz.name}
                </div>
              ))}

              {hours24.map((hour) => (
                <React.Fragment key={hour}>
                  <button
                    onClick={() => setSelectedHour(hour)}
                    className={`p-2 rounded text-sm font-mono text-center transition-colors ${
                      selectedHour === hour
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted"
                    }`}
                  >
                    {String(hour).padStart(2, "0")}:00
                  </button>
                  {timeZones.map((tz) => {
                    const { hour: localHour, isPM, day } = getHourInTimeZone(hour, tz.timeZone)
                    const isBizHours = localHour >= 9 && localHour < 17
                    const isWeekend = day === "Sat" || day === "Sun"

                    return (
                      <div
                        key={tz.id}
                        className={`p-2 rounded text-sm text-center transition-colors ${
                          isWeekend
                            ? "bg-amber-100 dark:bg-amber-900/30"
                            : isBizHours
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-muted/50"
                        }`}
                      >
                        <p className="font-mono">{localHour}:{isPM ? "PM" : "AM"}</p>
                        <p className="text-xs text-muted-foreground">{day}</p>
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30"></div>
            <span>Business Hours (9 AM - 5 PM)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-100 dark:bg-amber-900/30"></div>
            <span>Weekend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted/50"></div>
            <span>Outside Business Hours</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-background p-4 space-y-3">
        <h3 className="font-semibold">Tips for International Meetings</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Green highlighted times indicate business hours (9 AM - 5 PM) in each location</li>
          <li>Consider rotating meeting times to share the inconvenience of odd hours</li>
          <li>Avoid scheduling during major holidays in participants' countries</li>
          <li>For Asia-Europe-US meetings, early morning US / late evening Asia often works best</li>
          <li>Send calendar invites with time zone information to avoid confusion</li>
        </ul>
      </div>
    </div>
  )
}

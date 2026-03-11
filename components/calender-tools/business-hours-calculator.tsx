"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Copy, Check, Briefcase, Clock, Calendar, Plus, Trash2, Calculator } from "lucide-react"
import { cn } from "@/lib/utils"

interface Holiday {
  id: string
  name: string
  date: string
}

interface WorkSchedule {
  day: number
  name: string
  enabled: boolean
  startTime: string
  endTime: string
}

const DEFAULT_SCHEDULE: WorkSchedule[] = [
  { day: 0, name: "Sunday", enabled: false, startTime: "09:00", endTime: "17:00" },
  { day: 1, name: "Monday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: 2, name: "Tuesday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: 3, name: "Wednesday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: 4, name: "Thursday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: 5, name: "Friday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: 6, name: "Saturday", enabled: false, startTime: "09:00", endTime: "17:00" },
]

const PRESET_SCHEDULES = [
  { name: "Standard (9-5, Mon-Fri)", schedule: DEFAULT_SCHEDULE },
  {
    name: "Extended (8-6, Mon-Fri)",
    schedule: DEFAULT_SCHEDULE.map(s => ({ ...s, startTime: "08:00", endTime: "18:00" })),
  },
  {
    name: "24/7 Operations",
    schedule: DEFAULT_SCHEDULE.map(s => ({ ...s, enabled: true, startTime: "00:00", endTime: "23:59" })),
  },
  {
    name: "Retail (10-9, All Week)",
    schedule: DEFAULT_SCHEDULE.map(s => ({ ...s, enabled: true, startTime: "10:00", endTime: "21:00" })),
  },
]

export default function BusinessHoursCalculator() {
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("09:00")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("17:00")
  const [schedule, setSchedule] = useState<WorkSchedule[]>(DEFAULT_SCHEDULE)
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [excludeWeekends, setExcludeWeekends] = useState(true)
  const [newHolidayName, setNewHolidayName] = useState("")
  const [newHolidayDate, setNewHolidayDate] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const [calculationMode, setCalculationMode] = useState<"business-hours" | "deadline">("business-hours")
  const [durationHours, setDurationHours] = useState("8")
  const [durationMinutes, setDurationMinutes] = useState("0")

  const calculateBusinessHours = useCallback(() => {
    if (!startDate || !endDate) return null

    const start = new Date(`${startDate}T${startTime}`)
    const end = new Date(`${endDate}T${endTime}`)

    if (start >= end) return null

    const holidayDates = new Set(holidays.map(h => h.date))

    let totalMinutes = 0
    const current = new Date(start)

    while (current < end) {
      const dateStr = current.toISOString().split("T")[0]
      const dayOfWeek = current.getDay()
      const daySchedule = schedule.find(s => s.day === dayOfWeek)

      // Check if it's a working day
      if (daySchedule?.enabled && !holidayDates.has(dateStr)) {
        const dayStart = new Date(`${dateStr}T${daySchedule.startTime}`)
        const dayEnd = new Date(`${dateStr}T${daySchedule.endTime}`)

        // Calculate overlap between current time range and business hours
        const effectiveStart = new Date(Math.max(current.getTime(), dayStart.getTime()))
        const effectiveEnd = new Date(Math.min(end.getTime(), dayEnd.getTime()))

        if (effectiveStart < effectiveEnd) {
          totalMinutes += Math.floor((effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60))
        }
      }

      // Move to next day
      current.setDate(current.getDate() + 1)
      current.setHours(0, 0, 0, 0)
    }

    // Handle first and last day more precisely
    const startDaySchedule = schedule.find(s => s.day === start.getDay())
    const endDaySchedule = schedule.find(s => s.day === end.getDay())
    const startHoliday = holidays.some(h => h.date === startDate)
    const endHoliday = holidays.some(h => h.date === endDate)

    // Recalculate with precise times
    totalMinutes = 0
    const iter = new Date(start)
    iter.setHours(0, 0, 0, 0)

    while (iter <= end) {
      const dateStr = iter.toISOString().split("T")[0]
      const dayOfWeek = iter.getDay()
      const daySchedule = schedule.find(s => s.day === dayOfWeek)

      if (daySchedule?.enabled && !holidayDates.has(dateStr)) {
        const dayStart = new Date(`${dateStr}T${daySchedule.startTime}`)
        const dayEnd = new Date(`${dateStr}T${daySchedule.endTime}`)

        const dayEffectiveStart = new Date(Math.max(start.getTime(), dayStart.getTime()))
        const dayEffectiveEnd = new Date(Math.min(end.getTime(), dayEnd.getTime()))

        if (dayEffectiveStart < dayEffectiveEnd) {
          totalMinutes += Math.floor((dayEffectiveEnd.getTime() - dayEffectiveStart.getTime()) / (1000 * 60))
        }
      }

      iter.setDate(iter.getDate() + 1)
    }

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const days = Math.floor(hours / 8)
    const remainingHours = hours % 8

    return {
      totalMinutes,
      hours,
      minutes,
      days,
      remainingHours,
      formatted: `${hours}h ${minutes}m`,
      businessDays: Math.ceil(hours / 8),
    }
  }, [startDate, startTime, endDate, endTime, schedule, holidays])

  const calculateDeadline = useCallback(() => {
    if (!startDate || !startTime || !durationHours) return null

    const start = new Date(`${startDate}T${startTime}`)
    const totalDurationMinutes = parseInt(durationHours) * 60 + parseInt(durationMinutes || "0")
    const holidayDates = new Set(holidays.map(h => h.date))

    let remainingMinutes = totalDurationMinutes
    const current = new Date(start)

    while (remainingMinutes > 0) {
      const dateStr = current.toISOString().split("T")[0]
      const dayOfWeek = current.getDay()
      const daySchedule = schedule.find(s => s.day === dayOfWeek)

      if (daySchedule?.enabled && !holidayDates.has(dateStr)) {
        const dayStart = new Date(`${dateStr}T${daySchedule.startTime}`)
        const dayEnd = new Date(`${dateStr}T${daySchedule.endTime}`)

        if (current >= dayStart && current < dayEnd) {
          const minutesInDay = Math.floor((dayEnd.getTime() - current.getTime()) / (1000 * 60))
          if (remainingMinutes <= minutesInDay) {
            current.setMinutes(current.getMinutes() + remainingMinutes)
            remainingMinutes = 0
          } else {
            remainingMinutes -= minutesInDay
            current.setTime(dayEnd.getTime())
          }
        } else if (current < dayStart) {
          current.setTime(dayStart.getTime())
        } else {
          current.setDate(current.getDate() + 1)
          current.setHours(0, 0, 0, 0)
          continue
        }
      }

      if (remainingMinutes > 0) {
        current.setDate(current.getDate() + 1)
        current.setHours(0, 0, 0, 0)
      }
    }

    return {
      deadline: new Date(current),
      date: current.toISOString().split("T")[0],
      time: current.toTimeString().slice(0, 5),
    }
  }, [startDate, startTime, durationHours, durationMinutes, schedule, holidays])

  const businessHoursResult = useMemo(() => calculateBusinessHours(), [calculateBusinessHours])
  const deadlineResult = useMemo(() => calculateDeadline(), [calculateDeadline])

  const addHoliday = useCallback(() => {
    if (!newHolidayName || !newHolidayDate) return
    setHolidays(prev => [...prev, {
      id: Date.now().toString(),
      name: newHolidayName,
      date: newHolidayDate,
    }])
    setNewHolidayName("")
    setNewHolidayDate("")
  }, [newHolidayName, newHolidayDate])

  const removeHoliday = useCallback((id: string) => {
    setHolidays(prev => prev.filter(h => h.id !== id))
  }, [])

  const toggleDay = useCallback((day: number) => {
    setSchedule(prev => prev.map(s =>
      s.day === day ? { ...s, enabled: !s.enabled } : s
    ))
  }, [])

  const updateScheduleTime = useCallback((day: number, field: "startTime" | "endTime", value: string) => {
    setSchedule(prev => prev.map(s =>
      s.day === day ? { ...s, [field]: value } : s
    ))
  }, [])

  const applyPreset = useCallback((presetSchedule: WorkSchedule[]) => {
    setSchedule(presetSchedule)
    setExcludeWeekends(!presetSchedule[0].enabled && !presetSchedule[6].enabled)
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

  const formatDateTime = (dateStr: string, timeStr: string) => {
    if (!dateStr) return ""
    const date = new Date(`${dateStr}T${timeStr}`)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="size-5" />
            Business Hours Calculator
          </CardTitle>
          <CardDescription>
            Calculate business hours between dates or find deadlines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={calculationMode === "business-hours" ? "default" : "outline"}
              onClick={() => setCalculationMode("business-hours")}
              className="flex-1"
            >
              <Clock className="size-4 mr-2" />
              Calculate Business Hours
            </Button>
            <Button
              variant={calculationMode === "deadline" ? "default" : "outline"}
              onClick={() => setCalculationMode("deadline")}
              className="flex-1"
            >
              <Calendar className="size-4 mr-2" />
              Calculate Deadline
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Work Schedule Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="size-5" />
            Work Schedule Configuration
          </CardTitle>
          <CardDescription>
            Set your business hours and working days
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Preset Schedules */}
          <div className="flex flex-wrap gap-2">
            {PRESET_SCHEDULES.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset.schedule)}
              >
                {preset.name}
              </Button>
            ))}
          </div>

          {/* Daily Schedule */}
          <div className="space-y-2">
            <Label>Working Days & Hours</Label>
            <div className="space-y-2">
              {schedule.map((day) => (
                <div
                  key={day.day}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-opacity",
                    !day.enabled && "opacity-50"
                  )}
                >
                  <Checkbox
                    checked={day.enabled}
                    onCheckedChange={() => toggleDay(day.day)}
                  />
                  <span className="w-24 text-sm font-medium">{day.name}</span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={day.startTime}
                      onChange={(e) => updateScheduleTime(day.day, "startTime", e.target.value)}
                      disabled={!day.enabled}
                      className="w-28"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={day.endTime}
                      onChange={(e) => updateScheduleTime(day.day, "endTime", e.target.value)}
                      disabled={!day.enabled}
                      className="w-28"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Holidays */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <Label>Holidays (Non-working Days)</Label>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Holiday name"
                value={newHolidayName}
                onChange={(e) => setNewHolidayName(e.target.value)}
                className="flex-1"
              />
              <Input
                type="date"
                value={newHolidayDate}
                onChange={(e) => setNewHolidayDate(e.target.value)}
              />
              <Button onClick={addHoliday} size="sm">
                <Plus className="size-4" />
              </Button>
            </div>
            {holidays.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {holidays.map((holiday) => (
                  <Badge key={holiday.id} variant="secondary" className="gap-1">
                    {holiday.name} ({new Date(holiday.date).toLocaleDateString()})
                    <button onClick={() => removeHoliday(holiday.id)} className="hover:text-destructive">
                      <Trash2 className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Calculation Input */}
      {calculationMode === "business-hours" ? (
        <Card>
          <CardHeader>
            <CardTitle>Calculate Business Hours Between Dates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date & Time</Label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-28"
                  />
                </div>
                {startDate && (
                  <p className="text-xs text-muted-foreground">{formatDateTime(startDate, startTime)}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>End Date & Time</Label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-28"
                  />
                </div>
                {endDate && (
                  <p className="text-xs text-muted-foreground">{formatDateTime(endDate, endTime)}</p>
                )}
              </div>
            </div>

            {businessHoursResult && (
              <div className="space-y-4 pt-4 border-t">
                <div className="rounded-lg border bg-primary/10 p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Total Business Time</p>
                  <p className="text-4xl font-bold">{businessHoursResult.formatted}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {businessHoursResult.businessDays} business day(s)
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg border bg-muted/30 p-4 text-center">
                    <p className="text-2xl font-bold">{businessHoursResult.hours}</p>
                    <p className="text-xs text-muted-foreground mt-1">Hours</p>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-4 text-center">
                    <p className="text-2xl font-bold">{businessHoursResult.minutes}</p>
                    <p className="text-xs text-muted-foreground mt-1">Minutes</p>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-4 text-center">
                    <p className="text-2xl font-bold">{businessHoursResult.businessDays}</p>
                    <p className="text-xs text-muted-foreground mt-1">Business Days</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(
                      `Business Hours: ${businessHoursResult.formatted} (${businessHoursResult.businessDays} business days)`,
                      "result"
                    )}
                  >
                    {copied === "result" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                    Copy Result
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Calculate Deadline</CardTitle>
            <CardDescription>
              Find when a task will be completed based on business hours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={durationHours}
                    onChange={(e) => setDurationHours(e.target.value)}
                    placeholder="Hours"
                    className="w-20"
                  />
                  <span className="flex items-center">h</span>
                  <Input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    placeholder="Min"
                    className="w-16"
                  />
                  <span className="flex items-center">m</span>
                </div>
              </div>
            </div>

            {deadlineResult && (
              <div className="space-y-4 pt-4 border-t">
                <div className="rounded-lg border bg-primary/10 p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Deadline</p>
                  <p className="text-2xl font-bold">
                    {deadlineResult.deadline.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-lg text-muted-foreground mt-1">
                    at {deadlineResult.time}
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(
                      `Deadline: ${deadlineResult.deadline.toLocaleString()}`,
                      "deadline"
                    )}
                  >
                    {copied === "deadline" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                    Copy Deadline
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* SLA Calculator Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle>SLA Reference Guide</CardTitle>
          <CardDescription>
            Common SLA timeframes in business hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Critical (2 hours)", hours: 2 },
              { name: "High Priority (8 hours)", hours: 8 },
              { name: "Medium (24 hours)", hours: 24 },
              { name: "Low (48 hours)", hours: 48 },
              { name: "1 Business Day", hours: 8 },
              { name: "3 Business Days", hours: 24 },
              { name: "5 Business Days", hours: 40 },
              { name: "10 Business Days", hours: 80 },
            ].map((sla) => (
              <button
                key={sla.name}
                onClick={() => {
                  setDurationHours(Math.floor(sla.hours).toString())
                  setDurationMinutes(((sla.hours % 1) * 60).toString())
                  setCalculationMode("deadline")
                }}
                className="p-3 rounded-lg border text-left hover:bg-muted transition-colors"
              >
                <div className="font-medium text-sm">{sla.name}</div>
                <div className="text-xs text-muted-foreground">{sla.hours} business hours</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

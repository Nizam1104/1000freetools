"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Clock, Calculator } from "lucide-react"

export default function BusinessHoursCalculator() {
  const [startDate, setStartDate] = useState<string>("")
  const [startTime, setStartTime] = useState<string>("09:00")
  const [endDate, setEndDate] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("17:00")
  const [workStartHour, setWorkStartHour] = useState<string>("09:00")
  const [workEndHour, setWorkEndHour] = useState<string>("17:00")
  const [excludeWeekends, setExcludeWeekends] = useState<boolean>(true)
  const [holidays, setHolidays] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number)
    return hours * 60 + minutes
  }

  const calculateBusinessHours = useCallback(() => {
    if (!startDate || !endDate) return null

    const start = new Date(`${startDate}T${startTime}`)
    const end = new Date(`${endDate}T${endTime}`)
    const workStart = parseTime(workStartHour)
    const workEnd = parseTime(workEndHour)
    const holidayList = holidays.split(",").map((d) => d.trim()).filter((d) => d)

    if (end <= start) return null

    let totalMinutes = 0
    const current = new Date(start)

    while (current < end) {
      const dateStr = current.toISOString().split("T")[0]
      const dayOfWeek = current.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const isHoliday = holidayList.includes(dateStr)

      if ((!excludeWeekends || !isWeekend) && !isHoliday) {
        const dayStart = new Date(current)
        dayStart.setHours(Math.floor(workStart / 60), workStart % 60, 0, 0)
        const dayEnd = new Date(current)
        dayEnd.setHours(Math.floor(workEnd / 60), workEnd % 60, 0, 0)

        const effectiveStart = current < dayStart ? dayStart : current
        const effectiveEnd = end > dayEnd ? dayEnd : end

        if (effectiveStart < effectiveEnd) {
          const startMinutes = effectiveStart.getHours() * 60 + effectiveStart.getMinutes()
          const endMinutes = effectiveEnd.getHours() * 60 + effectiveEnd.getMinutes()
          
          if (startMinutes < workEnd && endMinutes > workStart) {
            const actualStart = Math.max(startMinutes, workStart)
            const actualEnd = Math.min(endMinutes, workEnd)
            totalMinutes += Math.max(0, actualEnd - actualStart)
          }
        }
      }

      current.setDate(current.getDate() + 1)
      current.setHours(0, 0, 0, 0)
    }

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const days = hours / 8
    const weeks = days / 5

    return {
      totalMinutes,
      hours,
      minutes,
      days: days.toFixed(2),
      weeks: weeks.toFixed(2),
      formatted: `${hours}h ${minutes}m`,
    }
  }, [startDate, startTime, endDate, endTime, workStartHour, workEndHour, excludeWeekends, holidays])

  const result = useMemo(() => calculateBusinessHours(), [calculateBusinessHours])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setStartDate("")
    setEndDate("")
    setStartTime("09:00")
    setEndTime("17:00")
  }, [])

  const quickAdd = useCallback((hours: number) => {
    if (!startDate) return
    const start = new Date(`${startDate}T${startTime}`)
    const workStart = parseTime(workStartHour)
    const workEnd = parseTime(workEndHour)
    const workDayMinutes = workEnd - workStart

    let remainingMinutes = hours * 60
    const current = new Date(start)

    while (remainingMinutes > 0) {
      const dayOfWeek = current.getDay()
      const dateStr = current.toISOString().split("T")[0]
      const holidayList = holidays.split(",").map((d) => d.trim()).filter((d) => d)
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const isHoliday = holidayList.includes(dateStr)

      if ((!excludeWeekends || !isWeekend) && !isHoliday) {
        const minutesToAdd = Math.min(remainingMinutes, workDayMinutes)
        current.setMinutes(current.getMinutes() + minutesToAdd)
        remainingMinutes -= minutesToAdd
        
        if (current.getHours() * 60 + current.getMinutes() >= workEnd) {
          current.setDate(current.getDate() + 1)
          current.setHours(Math.floor(workStart / 60), workStart % 60, 0, 0)
        }
      } else {
        current.setDate(current.getDate() + 1)
        current.setHours(Math.floor(workStart / 60), workStart % 60, 0, 0)
      }
    }

    setEndDate(current.toISOString().split("T")[0])
    setEndTime(current.toTimeString().slice(0, 5))
  }, [startDate, startTime, workStartHour, workEndHour, excludeWeekends, holidays])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Work Hours Configuration */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Work Hours Configuration</Label>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="work-start">Work Start Time</Label>
            <Input
              id="work-start"
              type="time"
              value={workStartHour}
              onChange={(e) => setWorkStartHour(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="work-end">Work End Time</Label>
            <Input
              id="work-end"
              type="time"
              value={workEndHour}
              onChange={(e) => setWorkEndHour(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="exclude-weekends"
            checked={excludeWeekends}
            onChange={(e) => setExcludeWeekends(e.target.checked)}
            className="h-4 w-4"
          />
          <Label htmlFor="exclude-weekends" className="text-sm cursor-pointer">
            Exclude Weekends (Saturday & Sunday)
          </Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="holidays">Holidays (YYYY-MM-DD, comma-separated)</Label>
          <Input
            id="holidays"
            value={holidays}
            onChange={(e) => setHolidays(e.target.value)}
            placeholder="2024-12-25, 2024-01-01"
          />
        </div>
      </section>

      {/* Date Range */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Date Range</Label>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date & Time</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date & Time</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground self-center">Quick add:</span>
          <Button variant="outline" size="sm" onClick={() => quickAdd(8)} disabled={!startDate}>
            +8 hours
          </Button>
          <Button variant="outline" size="sm" onClick={() => quickAdd(40)} disabled={!startDate}>
            +1 week
          </Button>
          <Button variant="outline" size="sm" onClick={() => quickAdd(160)} disabled={!startDate}>
            +1 month
          </Button>
        </div>

        <Button variant="ghost" size="sm" onClick={handleClear} className="w-full">
          <Trash2 className="size-4 mr-2" />
          Clear
        </Button>
      </section>

      {/* Result */}
      {result && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Business Hours Calculation</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(result.formatted, "result")}
              className="h-7"
            >
              {copied === "result" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-6">
            <div className="text-center space-y-4">
              <Clock className="size-12 mx-auto text-muted-foreground" />
              <p className="text-4xl font-bold">{result.formatted}</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Days (8h)</p>
                  <p className="font-semibold">{result.days}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Weeks (5d)</p>
                  <p className="font-semibold">{result.weeks}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Minutes</p>
                  <p className="font-semibold">{result.totalMinutes.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-background p-4">
            <h4 className="font-medium mb-2">Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">From:</span>
                <span className="font-medium">
                  {new Date(`${startDate}T${startTime}`).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">To:</span>
                <span className="font-medium">
                  {new Date(`${endDate}T${endTime}`).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Work Hours:</span>
                <span className="font-medium">{workStartHour} - {workEndHour}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Calculator className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Business Hours Calculator</h4>
            <p className="text-sm text-muted-foreground">
              Calculate the actual business hours between two dates, excluding weekends,
              holidays, and non-working hours. Useful for project planning, SLA calculations,
              deadline estimation, and time tracking. Configure your work hours and
              exclude specific dates as needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

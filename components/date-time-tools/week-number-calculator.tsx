"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Calendar, ChevronLeft, ChevronRight } from "lucide-react"

export default function WeekNumberCalculator() {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const [weekSystem, setWeekSystem] = useState<"iso" | "us">("iso")
  const [copied, setCopied] = useState<string | null>(null)

  const weekInfo = useMemo(() => {
    if (!selectedDate) return null

    const date = new Date(selectedDate)
    if (isNaN(date.getTime())) return null

    const weekNumber = getWeekNumber(date, weekSystem)
    const weekStart = getWeekStart(date, weekSystem)
    const weekEnd = getWeekEnd(date, weekSystem)

    return {
      weekNumber,
      weekStart,
      weekEnd,
      year: date.getFullYear(),
      date,
    }
  }, [selectedDate, weekSystem])

  const weekDateRange = useMemo(() => {
    if (selectedYear === null || selectedWeek === null) return null

    const date = getDateFromWeekNumber(selectedYear, selectedWeek, weekSystem)
    const weekStart = getWeekStart(date, weekSystem)
    const weekEnd = getWeekEnd(date, weekSystem)

    return {
      weekStart,
      weekEnd,
      year: selectedYear,
      week: selectedWeek,
    }
  }, [selectedYear, selectedWeek, weekSystem])

  const currentWeekInfo = useMemo(() => {
    const today = new Date()
    const weekNumber = getWeekNumber(today, weekSystem)
    const weekStart = getWeekStart(today, weekSystem)
    const weekEnd = getWeekEnd(today, weekSystem)

    return {
      weekNumber,
      weekStart,
      weekEnd,
      year: today.getFullYear(),
    }
  }, [weekSystem])

  const weeksInYear = useMemo(() => {
    const weeks = []
    const lastWeek = weekSystem === "iso" ? 53 : 53

    for (let i = 1; i <= lastWeek; i++) {
      try {
        const date = getDateFromWeekNumber(selectedYear, i, weekSystem)
        if (date.getFullYear() === selectedYear || i <= 52) {
          weeks.push(i)
        }
      } catch {
        break
      }
    }

    return weeks.slice(0, weekSystem === "iso" ? 53 : 53)
  }, [selectedYear, weekSystem])

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
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const goToPreviousYear = () => {
    setSelectedYear(selectedYear - 1)
  }

  const goToNextYear = () => {
    setSelectedYear(selectedYear + 1)
  }

  const goToCurrentYear = () => {
    setSelectedYear(new Date().getFullYear())
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Week Number Calculator</h2>
        <p className="text-muted-foreground">
          Find the week number of any date (ISO 8601 or US system). Convert week numbers back to date ranges.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setWeekSystem("iso")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            weekSystem === "iso"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          ISO 8601 (Monday start)
        </button>
        <button
          onClick={() => setWeekSystem("us")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            weekSystem === "us"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          US System (Sunday start)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Calendar className="size-5" />
            Date to Week Number
          </h3>

          <div className="space-y-2">
            <Label htmlFor="selected-date">Select a Date</Label>
            <Input
              id="selected-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {weekInfo && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-background p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Week Number</p>
                <p className="text-6xl font-bold">{weekInfo.weekNumber}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  of {weekInfo.year} ({weekSystem === "iso" ? "ISO 8601" : "US"})
                </p>
              </div>

              <div className="rounded-lg border bg-background p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Week Starts</span>
                  <span className="font-medium">{formatDate(weekInfo.weekStart)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Week Ends</span>
                  <span className="font-medium">{formatDate(weekInfo.weekEnd)}</span>
                </div>
                <div className="pt-3 border-t flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Selected Date</span>
                  <span className="font-medium">{formatDate(weekInfo.date)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => copyToClipboard(`Week ${weekInfo.weekNumber} of ${weekInfo.year}`, "weekNum")}
                >
                  {copied === "weekNum" ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                  Copy Week Number
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Calendar className="size-5" />
            Week Number to Date Range
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year-input">Year</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={goToPreviousYear}>
                  <ChevronLeft className="size-4" />
                </Button>
                <Input
                  id="year-input"
                  type="number"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value, 10) || new Date().getFullYear())}
                  className="text-center"
                />
                <Button variant="outline" size="icon" onClick={goToNextYear}>
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="week-input">Week Number</Label>
              <Input
                id="week-input"
                type="number"
                min="1"
                max={weekSystem === "iso" ? 53 : 53}
                value={selectedWeek || ""}
                onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10) || null)}
                placeholder="1-52"
              />
            </div>
          </div>

          {weekDateRange && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-background p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Week {weekDateRange.week}</p>
                <p className="text-lg font-medium">
                  {formatDate(weekDateRange.weekStart)} - {formatDate(weekDateRange.weekEnd)}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => copyToClipboard(
                    `Week ${weekDateRange.week}: ${weekDateRange.weekStart.toISOString().split("T")[0]} to ${weekDateRange.weekEnd.toISOString().split("T")[0]}`,
                    "weekRange"
                  )}
                >
                  {copied === "weekRange" ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                  Copy Range
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-background p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Current Week Information</h3>
          <Button variant="outline" size="sm" onClick={goToCurrentYear}>
            Go to Current Year
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-sm text-muted-foreground">Current Week Number</p>
            <p className="text-4xl font-bold">{currentWeekInfo.weekNumber}</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-sm text-muted-foreground">Week Start</p>
            <p className="text-lg font-medium">{formatDate(currentWeekInfo.weekStart)}</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-sm text-muted-foreground">Week End</p>
            <p className="text-lg font-medium">{formatDate(currentWeekInfo.weekEnd)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
        <h3 className="font-semibold">Browse Weeks of {selectedYear}</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-13 gap-2">
          {weeksInYear.map((week) => {
            const date = getDateFromWeekNumber(selectedYear, week, weekSystem)
            const isCurrentWeek = week === currentWeekInfo.weekNumber && selectedYear === currentWeekInfo.year

            return (
              <button
                key={week}
                onClick={() => {
                  setSelectedWeek(week)
                  setSelectedYear(selectedYear)
                }}
                className={`p-2 rounded-lg text-sm text-center transition-colors ${
                  isCurrentWeek
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-muted border"
                }`}
              >
                <p className="font-semibold">W{week}</p>
                <p className="text-xs opacity-70">{date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-lg border bg-background p-4 space-y-3">
        <h3 className="font-semibold">Week Number Systems</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="font-medium">ISO 8601 (International Standard)</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Week starts on Monday</li>
              <li>Week 1 is the week containing January 4th</li>
              <li>Year can have 52 or 53 weeks</li>
              <li>Used in Europe and most international contexts</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-medium">US System</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Week starts on Sunday</li>
              <li>Week 1 starts on January 1st</li>
              <li>Year can have 52 or 53 weeks</li>
              <li>Commonly used in North America</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function getWeekNumber(date: Date, system: "iso" | "us"): number {
  if (system === "us") {
    const startOfYear = new Date(date.getFullYear(), 0, 1)
    const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000))
    const startDay = startOfYear.getDay()
    return Math.ceil((dayOfYear + startDay + 1) / 7)
  }

  // ISO 8601
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

function getWeekStart(date: Date, system: "iso" | "us"): Date {
  const result = new Date(date)
  const day = result.getDay()

  if (system === "iso") {
    const diff = day === 0 ? -6 : 1 - day
    result.setDate(result.getDate() + diff)
  } else {
    const diff = -day
    result.setDate(result.getDate() + diff)
  }

  result.setHours(0, 0, 0, 0)
  return result
}

function getWeekEnd(date: Date, system: "iso" | "us"): Date {
  const start = getWeekStart(date, system)
  const result = new Date(start)
  result.setDate(result.getDate() + 6)
  result.setHours(23, 59, 59, 999)
  return result
}

function getDateFromWeekNumber(year: number, week: number, system: "iso" | "us"): Date {
  if (system === "us") {
    const jan1 = new Date(year, 0, 1)
    const dayOfWeek = jan1.getDay()
    const daysToFirstWeek = (7 - dayOfWeek) % 7
    const firstWeekStart = new Date(jan1)
    firstWeekStart.setDate(jan1.getDate() + daysToFirstWeek)
    const result = new Date(firstWeekStart)
    result.setDate(firstWeekStart.getDate() + (week - 1) * 7)
    return result
  }

  // ISO 8601
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const dayOfWeek = jan4.getUTCDay() || 7
  const weekStart = new Date(jan4)
  weekStart.setUTCDate(jan4.getUTCDate() - dayOfWeek + 1)
  const result = new Date(weekStart)
  result.setUTCDate(weekStart.getUTCDate() + (week - 1) * 7)
  return result
}

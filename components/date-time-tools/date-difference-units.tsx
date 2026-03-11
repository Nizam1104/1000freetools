"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Calendar } from "lucide-react"

export default function DateDifferenceUnits() {
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const difference = useMemo(() => {
    if (!startDate || !endDate) return null

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null

    const diffMs = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    // Calculate precise breakdown
    let years = 0
    let months = 0
    let weeks = 0
    let days = 0
    let hours = 0
    let minutes = 0
    let seconds = 0

    let tempStart = new Date(start)
    const tempEnd = new Date(end)
    const isForward = tempEnd >= tempStart

    // Calculate years
    while (true) {
      const nextYear = new Date(tempStart)
      nextYear.setFullYear(nextYear.getFullYear() + (isForward ? 1 : -1))
      if ((isForward && nextYear <= tempEnd) || (!isForward && nextYear >= tempEnd)) {
        years++
        tempStart = nextYear
      } else {
        break
      }
    }

    // Calculate months
    while (true) {
      const nextMonth = new Date(tempStart)
      nextMonth.setMonth(nextMonth.getMonth() + (isForward ? 1 : -1))
      if ((isForward && nextMonth <= tempEnd) || (!isForward && nextMonth >= tempEnd)) {
        months++
        tempStart = nextMonth
      } else {
        break
      }
    }

    // Calculate weeks
    while (true) {
      const nextWeek = new Date(tempStart)
      nextWeek.setDate(nextWeek.getDate() + (isForward ? 7 : -7))
      if ((isForward && nextWeek <= tempEnd) || (!isForward && nextWeek >= tempEnd)) {
        weeks++
        tempStart = nextWeek
      } else {
        break
      }
    }

    // Calculate remaining days
    while (true) {
      const nextDay = new Date(tempStart)
      nextDay.setDate(nextDay.getDate() + (isForward ? 1 : -1))
      if ((isForward && nextDay <= tempEnd) || (!isForward && nextDay >= tempEnd)) {
        days++
        tempStart = nextDay
      } else {
        break
      }
    }

    // Calculate remaining hours, minutes, seconds
    const remainingMs = Math.abs(tempEnd.getTime() - tempStart.getTime())
    hours = Math.floor(remainingMs / (1000 * 60 * 60))
    minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60))
    seconds = Math.floor((remainingMs % (1000 * 60)) / 1000)

    // Additional calculations
    const totalWeeks = Math.floor(diffDays / 7)
    const totalMonths = diffDays / 30.44
    const totalYears = diffDays / 365.25
    const totalHours = diffDays * 24
    const totalMinutes = totalHours * 60
    const totalSeconds = totalMinutes * 60

    // Percentage of year
    const percentageOfYear = (diffDays / 365.25) * 100

    return {
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      diffDays,
      totalWeeks,
      totalMonths,
      totalYears,
      totalHours,
      totalMinutes,
      totalSeconds,
      percentageOfYear,
      isForward: end >= start,
    }
  }, [startDate, endDate])

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

  const formatBreakdown = (): string => {
    if (!difference) return ""
    const parts = []
    if (difference.years > 0) parts.push(`${difference.years} year${difference.years > 1 ? "s" : ""}`)
    if (difference.months > 0) parts.push(`${difference.months} month${difference.months > 1 ? "s" : ""}`)
    if (difference.weeks > 0) parts.push(`${difference.weeks} week${difference.weeks > 1 ? "s" : ""}`)
    if (difference.days > 0) parts.push(`${difference.days} day${difference.days > 1 ? "s" : ""}`)
    return parts.join(", ") || "0 days"
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Date Difference in Various Units</h2>
        <p className="text-muted-foreground">
          Calculate precise difference between dates in multiple units with comprehensive breakdown.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {difference && (
        <div className="space-y-6">
          <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="size-6 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{formatDate(new Date(startDate))}</p>
                </div>
              </div>
              <div className="text-2xl font-bold">→</div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="font-medium">{formatDate(new Date(endDate))}</p>
                </div>
                <Calendar className="size-6 text-muted-foreground" />
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Precise Breakdown</p>
              <div className="flex flex-wrap items-baseline gap-2">
                {difference.years > 0 && (
                  <>
                    <span className="text-3xl font-bold">{difference.years}</span>
                    <span className="text-lg">year{difference.years > 1 ? "s" : ""},</span>
                  </>
                )}
                {difference.months > 0 && (
                  <>
                    <span className="text-3xl font-bold">{difference.months}</span>
                    <span className="text-lg">month{difference.months > 1 ? "s" : ""},</span>
                  </>
                )}
                {difference.weeks > 0 && (
                  <>
                    <span className="text-3xl font-bold">{difference.weeks}</span>
                    <span className="text-lg">week{difference.weeks > 1 ? "s" : ""},</span>
                  </>
                )}
                {difference.days > 0 && (
                  <>
                    <span className="text-3xl font-bold">{difference.days}</span>
                    <span className="text-lg">day{difference.days > 1 ? "s" : ""}</span>
                  </>
                )}
                {(difference.hours > 0 || difference.minutes > 0 || difference.seconds > 0) && (
                  <>
                    <span className="text-muted-foreground">and</span>
                    {difference.hours > 0 && (
                      <>
                        <span className="text-2xl font-bold">{difference.hours}</span>
                        <span className="text-sm">hours,</span>
                      </>
                    )}
                    {difference.minutes > 0 && (
                      <>
                        <span className="text-2xl font-bold">{difference.minutes}</span>
                        <span className="text-sm">minutes,</span>
                      </>
                    )}
                    {difference.seconds > 0 && (
                      <>
                        <span className="text-2xl font-bold">{difference.seconds}</span>
                        <span className="text-sm">seconds</span>
                      </>
                    )}
                  </>
                )}
                {difference.years === 0 &&
                  difference.months === 0 &&
                  difference.weeks === 0 &&
                  difference.days === 0 && (
                    <span className="text-xl">Same day</span>
                  )}
              </div>
            </div>

            <div className="pt-4 border-t flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Copy breakdown:</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(formatBreakdown(), "breakdown")}
              >
                {copied === "breakdown" ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                Copy
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Days"
              value={difference.diffDays.toLocaleString()}
              copyValue={difference.diffDays.toString()}
              onCopy={copyToClipboard}
              copied={copied === "days"}
              copyKey="days"
            />
            <StatCard
              label="Total Weeks"
              value={difference.totalWeeks.toLocaleString()}
              copyValue={difference.totalWeeks.toString()}
              onCopy={copyToClipboard}
              copied={copied === "weeks"}
              copyKey="weeks"
            />
            <StatCard
              label="Total Months (approx)"
              value={difference.totalMonths.toFixed(2)}
              copyValue={difference.totalMonths.toFixed(2)}
              onCopy={copyToClipboard}
              copied={copied === "months"}
              copyKey="months"
            />
            <StatCard
              label="Total Years (approx)"
              value={difference.totalYears.toFixed(4)}
              copyValue={difference.totalYears.toFixed(4)}
              onCopy={copyToClipboard}
              copied={copied === "years"}
              copyKey="years"
            />
            <StatCard
              label="Total Hours"
              value={difference.totalHours.toLocaleString()}
              copyValue={difference.totalHours.toString()}
              onCopy={copyToClipboard}
              copied={copied === "hours"}
              copyKey="hours"
            />
            <StatCard
              label="Total Minutes"
              value={difference.totalMinutes.toLocaleString()}
              copyValue={difference.totalMinutes.toString()}
              onCopy={copyToClipboard}
              copied={copied === "minutes"}
              copyKey="minutes"
            />
            <StatCard
              label="Total Seconds"
              value={difference.totalSeconds.toLocaleString()}
              copyValue={difference.totalSeconds.toString()}
              onCopy={copyToClipboard}
              copied={copied === "seconds"}
              copyKey="seconds"
            />
            <StatCard
              label="% of Year"
              value={`${difference.percentageOfYear.toFixed(2)}%`}
              copyValue={difference.percentageOfYear.toFixed(2)}
              onCopy={copyToClipboard}
              copied={copied === "percentage"}
              copyKey="percentage"
            />
          </div>

          <div className="rounded-lg border bg-background p-4 space-y-3">
            <h3 className="font-semibold">Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Age Difference</p>
                <p className="text-xs text-muted-foreground">
                  Calculate the exact age difference between two people
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Historical Periods</p>
                <p className="text-xs text-muted-foreground">
                  Measure the duration of historical events or periods
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Project Duration</p>
                <p className="text-xs text-muted-foreground">
                  Track project timelines in multiple units
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Anniversary Planning</p>
                <p className="text-xs text-muted-foreground">
                  Calculate precise time until special dates
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!difference && (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="size-12 mx-auto mb-4 opacity-50" />
          <p>Select two dates to see the difference in various units</p>
        </div>
      )}
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string
  copyValue?: string
  onCopy?: (text: string, key: string) => void
  copied?: boolean
  copyKey?: string
}

function StatCard({ label, value, copyValue, onCopy, copied, copyKey }: StatCardProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold font-mono">{value}</p>
        {onCopy && copyValue && (
          <Button
            variant="ghost"
            size="icon"
            className="size-6"
            onClick={() => onCopy(copyValue, copyKey || "")}
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          </Button>
        )}
      </div>
    </div>
  )
}

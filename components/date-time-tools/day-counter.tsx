"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Calendar } from "lucide-react"

export default function DayCounter() {
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)

  const dayCount = useMemo(() => {
    if (!startDate || !endDate) return null

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null

    const diffMs = end.getTime() - start.getTime()
    let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (includeEndDate) {
      diffDays += 1
    }

    const isNegative = diffDays < 0
    const absDays = Math.abs(diffDays)

    // Calculate weeks and remaining days
    const weeks = Math.floor(absDays / 7)
    const remainingDays = absDays % 7

    // Calculate months (approximate)
    const months = absDays / 30.44

    return {
      totalDays: absDays,
      weeks,
      remainingDays,
      months,
      isNegative,
      formatted: `${weeks}w ${remainingDays}d`,
    }
  }, [startDate, endDate, includeEndDate])

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

  const quickRanges = [
    { label: "1 Week", days: 7 },
    { label: "2 Weeks", days: 14 },
    { label: "1 Month", days: 30 },
    { label: "3 Months", days: 90 },
    { label: "6 Months", days: 180 },
    { label: "1 Year", days: 365 },
  ]

  const setQuickRange = (days: number) => {
    const start = new Date()
    const end = new Date()
    end.setDate(end.getDate() + days)
    setStartDate(start.toISOString().split("T")[0])
    setEndDate(end.toISOString().split("T")[0])
  }

  const setToday = () => {
    const today = new Date().toISOString().split("T")[0]
    setStartDate(today)
    setEndDate(today)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Day Counter Between Dates</h2>
        <p className="text-muted-foreground">
          Simple, fast day count between two dates. Include or exclude end date option.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
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

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="include-end"
              checked={includeEndDate}
              onChange={(e) => setIncludeEndDate(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="include-end" className="text-sm font-normal">
              Include end date (+1 day)
            </Label>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={setToday}>
            Today to Today
          </Button>
          <span className="text-sm text-muted-foreground self-center">|</span>
          {quickRanges.map((range) => (
            <Button
              key={range.label}
              variant="outline"
              size="sm"
              onClick={() => setQuickRange(range.days)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {dayCount && (
        <div className="space-y-4">
          <div className="rounded-lg border bg-background p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Calendar className="size-6 text-muted-foreground" />
                <span className="text-lg font-semibold">Total Days</span>
              </div>

              <div className="flex items-baseline justify-center gap-2">
                <span className="text-7xl font-bold font-mono">{dayCount.totalDays}</span>
                <span className="text-2xl text-muted-foreground">days</span>
              </div>

              <div className="pt-4 border-t flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold font-mono">{dayCount.weeks}</p>
                  <p className="text-sm text-muted-foreground">weeks</p>
                </div>
                <span className="text-2xl text-muted-foreground">+</span>
                <div className="text-center">
                  <p className="text-3xl font-bold font-mono">{dayCount.remainingDays}</p>
                  <p className="text-sm text-muted-foreground">days</p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(dayCount.totalDays.toString(), "days")}
                >
                  {copied === "days" ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                  Copy Days
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Total Days"
              value={dayCount.totalDays.toString()}
              copyValue={dayCount.totalDays.toString()}
              onCopy={copyToClipboard}
              copied={copied === "total"}
              copyKey="total"
            />
            <StatCard
              label="Weeks + Days"
              value={dayCount.formatted}
              copyValue={dayCount.formatted}
              onCopy={copyToClipboard}
              copied={copied === "formatted"}
              copyKey="formatted"
            />
            <StatCard
              label="Months (approx)"
              value={dayCount.months.toFixed(1)}
              copyValue={dayCount.months.toFixed(1)}
              onCopy={copyToClipboard}
              copied={copied === "months"}
              copyKey="months"
            />
            <StatCard
              label="Hours"
              value={(dayCount.totalDays * 24).toString()}
              copyValue={(dayCount.totalDays * 24).toString()}
              onCopy={copyToClipboard}
              copied={copied === "hours"}
              copyKey="hours"
            />
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Date Range</p>
                <p className="font-medium">
                  {startDate && endDate
                    ? `${formatDate(new Date(startDate))} → ${formatDate(new Date(endDate))}`
                    : ""}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `${formatDate(new Date(startDate))} to ${formatDate(new Date(endDate))}`,
                    "range"
                  )
                }
              >
                {copied === "range" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      {!dayCount && (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="size-12 mx-auto mb-4 opacity-50" />
          <p>Select two dates to count the days between them</p>
        </div>
      )}

      <div className="rounded-lg border bg-background p-4 space-y-3">
        <h3 className="font-semibold">When to Use Day Counter</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Simple Calculations</p>
            <p className="text-xs text-muted-foreground">
              Quick day count without complex breakdowns
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Date Ranges</p>
            <p className="text-xs text-muted-foreground">
              Count days in a period for reports or tracking
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Inclusive Counting</p>
            <p className="text-xs text-muted-foreground">
              Option to include both start and end dates
            </p>
          </div>
        </div>
      </div>
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
        <p className="text-xl font-bold font-mono">{value}</p>
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

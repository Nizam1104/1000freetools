"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Calendar, ArrowRight } from "lucide-react"

export default function DateRangeCalculator() {
  const [mode, setMode] = useState<"duration-to-end" | "start-end-to-duration">("duration-to-end")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [duration, setDuration] = useState<string>("")
  const [durationUnit, setDurationUnit] = useState<string>("days")
  const [copied, setCopied] = useState<string | null>(null)

  const calculatedEndDate = useMemo(() => {
    if (!startDate || !duration || mode !== "duration-to-end") return null

    const start = new Date(startDate)
    const dur = parseInt(duration, 10)
    if (isNaN(dur)) return null

    const result = new Date(start)

    switch (durationUnit) {
      case "days":
        result.setDate(result.getDate() + dur)
        break
      case "weeks":
        result.setDate(result.getDate() + dur * 7)
        break
      case "months":
        result.setMonth(result.getMonth() + dur)
        break
      case "years":
        result.setFullYear(result.getFullYear() + dur)
        break
      case "hours":
        result.setHours(result.getHours() + dur)
        break
      case "minutes":
        result.setMinutes(result.getMinutes() + dur)
        break
    }

    return result
  }, [startDate, duration, durationUnit, mode])

  const calculatedDuration = useMemo(() => {
    if (!startDate || !endDate || mode !== "start-end-to-duration") return null

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null

    const diffMs = end.getTime() - start.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    const years = Math.floor(Math.abs(diffDays) / 365.25)
    const remainingDays = Math.abs(diffDays) % 365.25
    const months = Math.floor(remainingDays / 30.44)
    const days = Math.floor(remainingDays % 30.44)

    return {
      totalDays: diffDays,
      years,
      months,
      days,
      weeks: Math.floor(Math.abs(diffDays) / 7),
      hours: Math.floor(diffMs / (1000 * 60 * 60)),
      minutes: Math.floor(diffMs / (1000 * 60)),
      seconds: Math.floor(diffMs / 1000),
      isNegative: diffDays < 0,
    }
  }, [startDate, endDate, mode])

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

  const commonDurations = [
    { label: "7 days", value: "7", unit: "days" },
    { label: "14 days", value: "14", unit: "days" },
    { label: "30 days", value: "30", unit: "days" },
    { label: "1 month", value: "1", unit: "months" },
    { label: "3 months", value: "3", unit: "months" },
    { label: "6 months", value: "6", unit: "months" },
    { label: "1 year", value: "1", unit: "years" },
    { label: "2 weeks", value: "2", unit: "weeks" },
  ]

  const applyDuration = (d: typeof commonDurations[0]) => {
    setDuration(d.value)
    setDurationUnit(d.unit)
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Date Range Calculator</h2>
        <p className="text-muted-foreground">
          Calculate end date from start date and duration, or find duration between two dates.
          Perfect for billing cycles, project phases, and subscriptions.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setMode("duration-to-end")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "duration-to-end"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Calculate End Date
        </button>
        <button
          onClick={() => setMode("start-end-to-duration")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "start-end-to-duration"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Calculate Duration
        </button>
      </div>

      {mode === "duration-to-end" ? (
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="size-5" />
              Calculate End Date from Duration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <select
                  id="unit"
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                  <option value="hours">Hours</option>
                  <option value="minutes">Minutes</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground self-center">Quick:</span>
              {commonDurations.map((d) => (
                <Button
                  key={d.label}
                  variant="outline"
                  size="sm"
                  onClick={() => applyDuration(d)}
                >
                  {d.label}
                </Button>
              ))}
            </div>

            {calculatedEndDate && (
              <div className="rounded-lg border bg-background p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-muted-foreground" />
                  <span className="font-semibold">Start Date</span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                  <span className="font-semibold">End Date</span>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium">{formatDate(new Date(startDate))}</p>
                  </div>
                  <div className="text-2xl font-bold">+</div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{duration} {durationUnit}</p>
                  </div>
                  <div className="text-2xl font-bold">=</div>
                  <div>
                    <p className="text-sm text-muted-foreground">To</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold">{formatDate(calculatedEndDate)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(calculatedEndDate.toISOString().split("T")[0], "end")}
                      >
                        {copied === "end" ? <Check className="size-4" /> : <Copy className="size-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-lg border bg-background p-4 space-y-3">
            <h3 className="font-semibold">Common Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Subscription Billing</p>
                <p className="text-xs text-muted-foreground">
                  Calculate renewal dates for monthly/yearly subscriptions
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Project Deadlines</p>
                <p className="text-xs text-muted-foreground">
                  Find end dates based on project duration
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Trial Periods</p>
                <p className="text-xs text-muted-foreground">
                  Calculate when free trials expire
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Lease Agreements</p>
                <p className="text-xs text-muted-foreground">
                  Determine lease end dates from start date
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="size-5" />
              Calculate Duration Between Dates
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calc-start">Start Date</Label>
                <Input
                  id="calc-start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calc-end">End Date</Label>
                <Input
                  id="calc-end"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {calculatedDuration && (
              <div className="space-y-4">
                <div className="rounded-lg border bg-background p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="size-5 text-muted-foreground" />
                    <span className="font-semibold">Duration</span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    {calculatedDuration.years > 0 && (
                      <>
                        <span className="text-3xl font-bold">{calculatedDuration.years}</span>
                        <span className="text-lg">year{calculatedDuration.years > 1 ? "s" : ""},</span>
                      </>
                    )}
                    {calculatedDuration.months > 0 && (
                      <>
                        <span className="text-3xl font-bold">{calculatedDuration.months}</span>
                        <span className="text-lg">month{calculatedDuration.months > 1 ? "s" : ""},</span>
                      </>
                    )}
                    <span className="text-3xl font-bold">{calculatedDuration.days}</span>
                    <span className="text-lg">day{calculatedDuration.days > 1 ? "s" : ""}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard label="Total Days" value={Math.abs(calculatedDuration.totalDays).toString()} />
                  <StatCard label="Total Weeks" value={calculatedDuration.weeks.toString()} />
                  <StatCard label="Total Hours" value={Math.abs(calculatedDuration.hours).toLocaleString()} />
                  <StatCard label="Total Minutes" value={Math.abs(calculatedDuration.minutes).toLocaleString()} />
                </div>
              </div>
            )}
          </div>

          <div className="rounded-lg border bg-background p-4 space-y-3">
            <h3 className="font-semibold">Common Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Billing Cycles</p>
                <p className="text-xs text-muted-foreground">
                  Calculate the length of billing periods
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Project Phases</p>
                <p className="text-xs text-muted-foreground">
                  Measure duration of project milestones
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Employment Period</p>
                <p className="text-xs text-muted-foreground">
                  Calculate tenure or contract duration
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Rental Periods</p>
                <p className="text-xs text-muted-foreground">
                  Find the length of rental agreements
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-bold font-mono">{value}</p>
    </div>
  )
}

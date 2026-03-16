"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, ArrowLeftRight, Clock, Calendar } from "lucide-react"

export default function SecondsConverter() {
  const [seconds, setSeconds] = useState<string>("")
  const [minutes, setMinutes] = useState<string>("")
  const [hours, setHours] = useState<string>("")
  const [days, setDays] = useState<string>("")
  const [weeks, setWeeks] = useState<string>("")
  const [months, setMonths] = useState<string>("")
  const [years, setYears] = useState<string>("")
  const [activeInput, setActiveInput] = useState<string>("seconds")
  const [copied, setCopied] = useState<string | null>(null)

  const conversions = useMemo(() => {
    let totalSeconds = 0

    switch (activeInput) {
      case "seconds":
        totalSeconds = parseFloat(seconds || "0") || 0
        break
      case "minutes":
        totalSeconds = (parseFloat(minutes || "0") || 0) * 60
        break
      case "hours":
        totalSeconds = (parseFloat(hours || "0") || 0) * 3600
        break
      case "days":
        totalSeconds = (parseFloat(days || "0") || 0) * 86400
        break
      case "weeks":
        totalSeconds = (parseFloat(weeks || "0") || 0) * 604800
        break
      case "months":
        totalSeconds = (parseFloat(months || "0") || 0) * 2629746
        break
      case "years":
        totalSeconds = (parseFloat(years || "0") || 0) * 31556952
        break
    }

    const milliseconds = totalSeconds * 1000
    const totalMinutes = totalSeconds / 60
    const totalHours = totalSeconds / 3600
    const totalDays = totalSeconds / 86400
    const totalWeeks = totalSeconds / 604800
    const totalMonths = totalSeconds / 2629746
    const totalYears = totalSeconds / 31556952

    // Breakdown into components
    const yrs = Math.floor(totalSeconds / 31556952)
    const remainingAfterYears = totalSeconds % 31556952
    const mos = Math.floor(remainingAfterYears / 2629746)
    const remainingAfterMonths = remainingAfterYears % 2629746
    const wks = Math.floor(remainingAfterMonths / 604800)
    const remainingAfterWeeks = remainingAfterMonths % 604800
    const dys = Math.floor(remainingAfterWeeks / 86400)
    const remainingAfterDays = remainingAfterWeeks % 86400
    const hrs = Math.floor(remainingAfterDays / 3600)
    const remainingAfterHours = remainingAfterDays % 3600
    const mins = Math.floor(remainingAfterHours / 60)
    const secs = remainingAfterHours % 60

    return {
      totalSeconds,
      milliseconds,
      totalMinutes,
      totalHours,
      totalDays,
      totalWeeks,
      totalMonths,
      totalYears,
      breakdown: {
        years: yrs,
        months: mos,
        weeks: wks,
        days: dys,
        hours: hrs,
        minutes: mins,
        seconds: secs,
      },
    }
  }, [seconds, minutes, hours, days, weeks, months, years, activeInput])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleInputChange = (value: string, inputType: string) => {
    setActiveInput(inputType)
    switch (inputType) {
      case "seconds":
        setSeconds(value)
        break
      case "minutes":
        setMinutes(value)
        break
      case "hours":
        setHours(value)
        break
      case "days":
        setDays(value)
        break
      case "weeks":
        setWeeks(value)
        break
      case "months":
        setMonths(value)
        break
      case "years":
        setYears(value)
        break
    }
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return num.toExponential(4)
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: 6 })
  }

  const quickConversions = [
    { label: "1 minute", seconds: 60 },
    { label: "5 minutes", seconds: 300 },
    { label: "15 minutes", seconds: 900 },
    { label: "1 hour", seconds: 3600 },
    { label: "8 hours", seconds: 28800 },
    { label: "1 day", seconds: 86400 },
    { label: "1 week", seconds: 604800 },
    { label: "1 month (avg)", seconds: 2629746 },
    { label: "1 year", seconds: 31556952 },
    { label: "100 years", seconds: 3155695200 },
  ]

  const applyQuick = (secs: number) => {
    setActiveInput("seconds")
    setSeconds(secs.toString())
  }

  const formatBreakdown = (): string => {
    const { breakdown } = conversions
    const parts = []
    if (breakdown.years > 0) parts.push(`${breakdown.years} year${breakdown.years > 1 ? "s" : ""}`)
    if (breakdown.months > 0) parts.push(`${breakdown.months} month${breakdown.months > 1 ? "s" : ""}`)
    if (breakdown.weeks > 0) parts.push(`${breakdown.weeks} week${breakdown.weeks > 1 ? "s" : ""}`)
    if (breakdown.days > 0) parts.push(`${breakdown.days} day${breakdown.days > 1 ? "s" : ""}`)
    if (breakdown.hours > 0) parts.push(`${breakdown.hours} hour${breakdown.hours > 1 ? "s" : ""}`)
    if (breakdown.minutes > 0) parts.push(`${breakdown.minutes} minute${breakdown.minutes > 1 ? "s" : ""}`)
    if (breakdown.seconds > 0 || parts.length === 0) parts.push(`${Math.round(breakdown.seconds)} second${breakdown.seconds !== 1 ? "s" : ""}`)
    return parts.join(", ")
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Seconds to Minutes/Hours/Days Converter</h2>
        <p className="text-muted-foreground">
          Convert between seconds and larger time units. Perfect for video lengths, scientific data, and large durations.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeftRight className="size-5 text-muted-foreground" />
          <h3 className="font-semibold">Enter Value</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="seconds">Seconds</Label>
            <Input
              id="seconds"
              type="number"
              min="0"
              step="any"
              value={seconds}
              onChange={(e) => handleInputChange(e.target.value, "seconds")}
              placeholder="0"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minutes">Minutes</Label>
            <Input
              id="minutes"
              type="number"
              min="0"
              step="any"
              value={minutes}
              onChange={(e) => handleInputChange(e.target.value, "minutes")}
              placeholder="0"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Hours</Label>
            <Input
              id="hours"
              type="number"
              min="0"
              step="any"
              value={hours}
              onChange={(e) => handleInputChange(e.target.value, "hours")}
              placeholder="0"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="days">Days</Label>
            <Input
              id="days"
              type="number"
              min="0"
              step="any"
              value={days}
              onChange={(e) => handleInputChange(e.target.value, "days")}
              placeholder="0"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weeks">Weeks</Label>
            <Input
              id="weeks"
              type="number"
              min="0"
              step="any"
              value={weeks}
              onChange={(e) => handleInputChange(e.target.value, "weeks")}
              placeholder="0"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="months">Months (avg)</Label>
            <Input
              id="months"
              type="number"
              min="0"
              step="any"
              value={months}
              onChange={(e) => handleInputChange(e.target.value, "months")}
              placeholder="0"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="years">Years</Label>
            <Input
              id="years"
              type="number"
              min="0"
              step="any"
              value={years}
              onChange={(e) => handleInputChange(e.target.value, "years")}
              placeholder="0"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="milliseconds">Milliseconds</Label>
            <Input
              id="milliseconds"
              type="text"
              value={formatNumber(conversions.milliseconds)}
              readOnly
              className="bg-muted font-mono"
            />
          </div>
        </div>
      </div>

      {conversions.totalSeconds > 0 && (
        <div className="space-y-4">
          <div className="rounded-lg border bg-background p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-muted-foreground" />
              <h3 className="font-semibold">Breakdown</h3>
            </div>

            <div className="text-center py-4">
              <p className="text-lg text-muted-foreground mb-2">Equals approximately:</p>
              <p className="text-2xl font-medium">{formatBreakdown()}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => copyToClipboard(formatBreakdown(), "breakdown")}
              >
                {copied === "breakdown" ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                Copy Breakdown
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Total Seconds"
              value={formatNumber(conversions.totalSeconds)}
              copyValue={conversions.totalSeconds.toString()}
              onCopy={copyToClipboard}
              copied={copied === "totalSeconds"}
              copyKey="totalSeconds"
            />
            <StatCard
              label="Total Minutes"
              value={formatNumber(conversions.totalMinutes)}
              copyValue={conversions.totalMinutes.toString()}
              onCopy={copyToClipboard}
              copied={copied === "totalMinutes"}
              copyKey="totalMinutes"
            />
            <StatCard
              label="Total Hours"
              value={formatNumber(conversions.totalHours)}
              copyValue={conversions.totalHours.toString()}
              onCopy={copyToClipboard}
              copied={copied === "totalHours"}
              copyKey="totalHours"
            />
            <StatCard
              label="Total Days"
              value={formatNumber(conversions.totalDays)}
              copyValue={conversions.totalDays.toString()}
              onCopy={copyToClipboard}
              copied={copied === "totalDays"}
              copyKey="totalDays"
            />
            <StatCard
              label="Total Weeks"
              value={formatNumber(conversions.totalWeeks)}
              copyValue={conversions.totalWeeks.toString()}
              onCopy={copyToClipboard}
              copied={copied === "totalWeeks"}
              copyKey="totalWeeks"
            />
            <StatCard
              label="Total Months"
              value={formatNumber(conversions.totalMonths)}
              copyValue={conversions.totalMonths.toString()}
              onCopy={copyToClipboard}
              copied={copied === "totalMonths"}
              copyKey="totalMonths"
            />
            <StatCard
              label="Total Years"
              value={formatNumber(conversions.totalYears)}
              copyValue={conversions.totalYears.toString()}
              onCopy={copyToClipboard}
              copied={copied === "totalYears"}
              copyKey="totalYears"
            />
            <StatCard
              label="Milliseconds"
              value={formatNumber(conversions.milliseconds)}
              copyValue={conversions.milliseconds.toString()}
              onCopy={copyToClipboard}
              copied={copied === "milliseconds"}
              copyKey="milliseconds"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-background p-4 space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="size-5" />
            Quick Conversions
          </h3>
          <div className="flex flex-wrap gap-2">
            {quickConversions.map((qc) => (
              <Button
                key={qc.label}
                variant="outline"
                size="sm"
                onClick={() => applyQuick(qc.seconds)}
              >
                {qc.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Calendar className="size-5" />
            Conversion Reference
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>1 minute = 60 seconds</li>
            <li>1 hour = 60 minutes = 3,600 seconds</li>
            <li>1 day = 24 hours = 86,400 seconds</li>
            <li>1 week = 7 days = 604,800 seconds</li>
            <li>1 month (avg) = 30.44 days = 2,629,746 seconds</li>
            <li>1 year = 365.25 days = 31,556,952 seconds</li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg border bg-background p-4 space-y-2">
        <h3 className="font-semibold">Common Use Cases</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Video Length</p>
            <p className="text-xs text-muted-foreground">
              Convert video duration from seconds to readable format
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Scientific Data</p>
            <p className="text-xs text-muted-foreground">
              Interpret large time measurements in experiments
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Programming</p>
            <p className="text-xs text-muted-foreground">
              Convert timestamps and durations in code
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
        <p className="text-lg font-bold font-mono truncate">{value}</p>
        {onCopy && copyValue && (
          <Button
            variant="ghost"
            size="icon"
            className="size-6 shrink-0"
            onClick={() => onCopy(copyValue, copyKey || "")}
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          </Button>
        )}
      </div>
    </div>
  )
}

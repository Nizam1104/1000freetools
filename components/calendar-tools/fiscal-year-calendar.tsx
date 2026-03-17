"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Download } from "lucide-react"

const FISCAL_YEAR_PRESETS = [
  { name: "US Federal", startMonth: 10, startDay: 1 },
  { name: "UK Government", startMonth: 4, startDay: 6 },
  { name: "Australia", startMonth: 7, startDay: 1 },
  { name: "India", startMonth: 4, startDay: 1 },
  { name: "Japan", startMonth: 4, startDay: 1 },
  { name: "Germany", startMonth: 1, startDay: 1 },
  { name: "France", startMonth: 1, startDay: 1 },
  { name: "Custom", startMonth: 1, startDay: 1 },
]

export default function FiscalYearCalendar() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [fiscalStartMonth, setFiscalStartMonth] = useState<number>(10)
  const [fiscalStartDay, setFiscalStartDay] = useState<number>(1)
  const [preset, setPreset] = useState<string>("US Federal")

  const fiscalInfo = useMemo(() => {
    const fiscalYearStart = new Date(selectedYear, fiscalStartMonth - 1, fiscalStartDay)
    const fiscalYearEnd = new Date(selectedYear + 1, fiscalStartMonth - 1, fiscalStartDay - 1)

    const quarters = []
    for (let i = 0; i < 4; i++) {
      const quarterStart = new Date(fiscalYearStart)
      quarterStart.setMonth(fiscalStartMonth - 1 + i * 3)
      const quarterEnd = new Date(quarterStart)
      quarterEnd.setMonth(quarterStart.getMonth() + 3)
      quarterEnd.setDate(0)

      quarters.push({
        number: i + 1,
        start: new Date(quarterStart),
        end: new Date(quarterEnd),
      })
    }

    const now = new Date()
    const currentFiscalYear = now >= fiscalYearStart && now <= fiscalYearEnd ? selectedYear : now > fiscalYearEnd ? selectedYear + 1 : selectedYear - 1
    const currentFiscalStart = new Date(currentFiscalYear, fiscalStartMonth - 1, fiscalStartDay)
    const daysInFiscalYear = Math.floor((fiscalYearEnd.getTime() - fiscalYearStart.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const daysElapsed = now >= fiscalYearStart && now <= fiscalYearEnd ? Math.floor((now.getTime() - fiscalYearStart.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0
    const daysRemaining = daysInFiscalYear - daysElapsed

    return {
      fiscalYearStart,
      fiscalYearEnd,
      quarters,
      currentFiscalYear,
      daysInFiscalYear,
      daysElapsed,
      daysRemaining,
      progress: (daysElapsed / daysInFiscalYear) * 100,
    }
  }, [selectedYear, fiscalStartMonth, fiscalStartDay])

  const handlePresetChange = useCallback((presetName: string) => {
    setPreset(presetName)
    const presetData = FISCAL_YEAR_PRESETS.find((p) => p.name === presetName)
    if (presetData) {
      setFiscalStartMonth(presetData.startMonth)
      setFiscalStartDay(presetData.startDay)
    }
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Configuration */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="selected-year">Calendar Year</Label>
            <Input
              id="selected-year"
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value) || new Date().getFullYear())}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preset">Preset</Label>
            <Select value={preset} onValueChange={handlePresetChange}>
              <SelectTrigger id="preset">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FISCAL_YEAR_PRESETS.map((p) => (
                  <SelectItem key={p.name} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="start-month">Start Month</Label>
            <Select value={fiscalStartMonth.toString()} onValueChange={(v) => setFiscalStartMonth(parseInt(v))}>
              <SelectTrigger id="start-month">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((m, i) => (
                  <SelectItem key={m} value={(i + 1).toString()}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="start-day">Start Day</Label>
            <Input
              id="start-day"
              type="number"
              value={fiscalStartDay}
              onChange={(e) => setFiscalStartDay(parseInt(e.target.value) || 1)}
              min="1"
              max="31"
            />
          </div>
        </div>
      </section>

      {/* Fiscal Year Summary */}
      <section className="rounded-lg border bg-muted/30 p-6">
        <div className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Fiscal Year {fiscalInfo.currentFiscalYear}</p>
            <p className="text-2xl font-bold">
              {formatDate(fiscalInfo.fiscalYearStart)} - {formatDate(fiscalInfo.fiscalYearEnd)}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(
                `FY${fiscalInfo.currentFiscalYear}: ${formatDate(fiscalInfo.fiscalYearStart)} to ${formatDate(fiscalInfo.fiscalYearEnd)}`,
                "fy"
              )}
            >
              {copied === "fy" ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span className="ml-1">Copy Dates</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Fiscal Year Progress</span>
          <span>{fiscalInfo.progress.toFixed(1)}%</span>
        </div>
        <div className="h-4 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${Math.min(100, fiscalInfo.progress)}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-muted-foreground">Days Elapsed</p>
            <p className="font-semibold">{fiscalInfo.daysElapsed}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Days Remaining</p>
            <p className="font-semibold">{fiscalInfo.daysRemaining}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Days</p>
            <p className="font-semibold">{fiscalInfo.daysInFiscalYear}</p>
          </div>
        </div>
      </section>

      {/* Quarters */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Fiscal Quarters</Label>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fiscalInfo.quarters.map((q) => (
            <div key={q.number} className="rounded-lg border bg-background p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">Q{q.number}</span>
                <span className="text-xs text-muted-foreground">
                  {Math.floor((q.end.getTime() - q.start.getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {q.start.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </p>
              <p className="text-xs text-muted-foreground">to</p>
              <p className="text-sm">
                {q.end.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly Breakdown */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Monthly Breakdown</Label>
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">
            {months.map((month, idx) => {
              const monthDate = new Date(selectedYear, idx, 1)
              const isFiscalStart = idx === fiscalStartMonth - 1
              const quarterNum = Math.floor(((idx - (fiscalStartMonth - 1) + 12) % 12) / 3) + 1
              return (
                <div
                  key={month}
                  className={`p-3 text-center ${isFiscalStart ? "bg-primary/10" : ""}`}
                >
                  <p className="font-medium text-sm">{month}</p>
                  <p className="text-xs text-muted-foreground">Q{quarterNum}</p>
                  {isFiscalStart && (
                    <span className="text-xs text-primary font-medium">Fiscal Start</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Fiscal Year</h4>
            <p className="text-sm text-muted-foreground">
              A fiscal year (FY) is a one-year period used for financial reporting and budgeting.
              Different organizations and countries use different fiscal year start dates.
              The US federal government starts on October 1, while many companies use January 1
              (calendar year) or other dates that align with their business cycles.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

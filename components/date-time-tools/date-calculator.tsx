"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function DateCalculator() {
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [operation, setOperation] = useState<string>("difference")
  const [duration, setDuration] = useState<string>("")
  const [durationUnit, setDurationUnit] = useState<string>("days")
  const [copied, setCopied] = useState<string | null>(null)

  const dateDiff = useMemo(() => {
    if (!startDate || !endDate) return null

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffMs = end.getTime() - start.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    const years = Math.floor(Math.abs(diffDays) / 365.25)
    const remainingDays = Math.abs(diffDays) % 365.25
    const months = Math.floor(remainingDays / 30.44)
    const days = Math.floor(remainingDays % 30.44)

    return {
      totalDays: diffDays,
      weeks: Math.floor(Math.abs(diffDays) / 7),
      months: Math.floor(Math.abs(diffDays) / 30.44),
      years: years,
      breakdown: { years, months, days },
      isNegative: diffDays < 0,
    }
  }, [startDate, endDate])

  const calculatedDate = useMemo(() => {
    if (!startDate || !duration) return null

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
      case "business":
        let businessDays = dur
        while (businessDays !== 0) {
          result.setDate(result.getDate() + Math.sign(businessDays))
          const day = result.getDay()
          if (day !== 0 && day !== 6) {
            businessDays -= Math.sign(businessDays)
          }
        }
        break
    }

    return result
  }, [startDate, duration, durationUnit])

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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Date Calculator</h2>
        <p className="text-muted-foreground">
          Calculate the difference between dates or add/subtract time from a date.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => setOperation("difference")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              operation === "difference"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Date Difference
          </button>
          <button
            onClick={() => setOperation("add")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              operation === "add"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Add/Subtract Time
          </button>
        </div>

        {operation === "difference" ? (
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

            {dateDiff && (
              <div className="md:col-span-2 rounded-lg border bg-muted/30 p-4 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total Days</p>
                    <p className="text-2xl font-bold font-mono">{Math.abs(dateDiff.totalDays)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Weeks</p>
                    <p className="text-2xl font-bold font-mono">{dateDiff.weeks}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Months (approx)</p>
                    <p className="text-2xl font-bold font-mono">{dateDiff.months.toFixed(1)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Years (approx)</p>
                    <p className="text-2xl font-bold font-mono">{dateDiff.years.toFixed(1)}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {startDate && endDate ? (
                      <>
                        From {formatDate(new Date(startDate))} to {formatDate(new Date(endDate))} is{" "}
                        <strong>
                          {dateDiff.breakdown.years} years, {dateDiff.breakdown.months} months, and{" "}
                          {dateDiff.breakdown.days} days
                        </strong>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="number"
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
                  <option value="business">Business Days</option>
                </select>
              </div>
            </div>

            {calculatedDate && (
              <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Result Date</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">{formatDate(calculatedDate)}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(calculatedDate.toISOString().split("T")[0], "date")}
                  >
                    {copied === "date" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {startDate && duration ? (
                    <>
                      {duration} {durationUnit} from {formatDate(new Date(startDate))}
                    </>
                  ) : null}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Calendar as CalendarIcon } from "lucide-react"

export default function DateCalculator() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [excludeWeekends, setExcludeWeekends] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const calculateDifference = useCallback(() => {
    if (!startDate || !endDate) return null

    const start = new Date(startDate)
    const end = new Date(endDate)

    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let businessDays = 0
    if (excludeWeekends) {
      const current = new Date(Math.min(start.getTime(), end.getTime()))
      const final = new Date(Math.max(start.getTime(), end.getTime()))
      while (current <= final) {
        const day = current.getDay()
        if (day !== 0 && day !== 6) {
          businessDays++
        }
        current.setDate(current.getDate() + 1)
      }
    }

    const years = Math.floor(diffDays / 365)
    const remainingDaysAfterYears = diffDays % 365
    const months = Math.floor(remainingDaysAfterYears / 30)
    const days = remainingDaysAfterYears % 30

    return {
      totalDays: diffDays,
      weeks: Math.floor(diffDays / 7),
      months: Math.floor(diffDays / 30),
      years: years,
      yearsMonthsDays: `${years}y ${months}m ${days}d`,
      businessDays: businessDays || diffDays,
      isPast: start > end,
    }
  }, [startDate, endDate, excludeWeekends])

  const result = useMemo(() => calculateDifference(), [calculateDifference])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Date Inputs */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-base font-medium">
              Start Date
            </Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {startDate && (
              <p className="text-sm text-muted-foreground">{formatDate(startDate)}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date" className="text-base font-medium">
              End Date
            </Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {endDate && (
              <p className="text-sm text-muted-foreground">{formatDate(endDate)}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="exclude-weekends"
            checked={excludeWeekends}
            onCheckedChange={(checked) => setExcludeWeekends(checked as boolean)}
          />
          <Label htmlFor="exclude-weekends" className="text-sm cursor-pointer">
            Exclude weekends (calculate business days only)
          </Label>
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="space-y-4">
          <div className="rounded-lg border bg-primary/10 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {result.isPast ? "Time since" : "Time until"}
            </p>
            <p className="text-4xl font-bold">{result.totalDays.toLocaleString()} days</p>
            <p className="text-lg text-muted-foreground mt-1">{result.yearsMonthsDays}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold">{result.weeks.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Weeks</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold">{result.months.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Months (approx)</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold">{result.years.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Years (approx)</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-2xl font-bold">{result.businessDays.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {excludeWeekends ? "Business Days" : "Days"}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(`${result.totalDays} days (${result.yearsMonthsDays})`, "result")}
            >
              {copied === "result" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy Result
            </Button>
          </div>
        </section>
      )}

      {/* Add/Subtract Days Section */}
      <AddSubtractDaysSection copied={copied} setCopied={setCopied} copyToClipboard={copyToClipboard} />
    </div>
  )
}

function AddSubtractDaysSection({ copied, setCopied, copyToClipboard }: { copied: string | null; setCopied: (key: string) => void; copyToClipboard: (text: string, key: string) => Promise<void> }) {
  const [baseDate, setBaseDate] = useState("")
  const [daysToAdd, setDaysToAdd] = useState("")
  const [operation, setOperation] = useState<"add" | "subtract">("add")

  const resultDate = useMemo(() => {
    if (!baseDate || !daysToAdd) return null

    const base = new Date(baseDate)
    const days = parseInt(daysToAdd) || 0

    if (operation === "subtract") {
      base.setDate(base.getDate() - days)
    } else {
      base.setDate(base.getDate() + days)
    }

    return base
  }, [baseDate, daysToAdd, operation])

  return (
    <section className="space-y-4 pt-6 border-t">
      <h3 className="text-base font-semibold">Add or Subtract Days</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="base-date" className="text-sm">
            Start Date
          </Label>
          <Input
            id="base-date"
            type="date"
            value={baseDate}
            onChange={(e) => setBaseDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="days-input" className="text-sm">
            Days
          </Label>
          <div className="flex gap-2">
            <Button
              variant={operation === "add" ? "default" : "outline"}
              size="sm"
              onClick={() => setOperation("add")}
            >
              +
            </Button>
            <Button
              variant={operation === "subtract" ? "default" : "outline"}
              size="sm"
              onClick={() => setOperation("subtract")}
            >
              -
            </Button>
            <Input
              id="days-input"
              type="number"
              value={daysToAdd}
              onChange={(e) => setDaysToAdd(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm">Result</Label>
          <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/30">
            <CalendarIcon className="size-4 text-muted-foreground" />
            <span className="font-medium">
              {resultDate
                ? resultDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "-"}
            </span>
          </div>
        </div>
      </div>
      {resultDate && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(resultDate.toISOString().split("T")[0], "addsub")}
          >
            {copied === "addsub" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
            Copy Date
          </Button>
        </div>
      )}
    </section>
  )
}

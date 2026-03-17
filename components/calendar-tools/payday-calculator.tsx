"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, DollarSign, Calendar } from "lucide-react"

const PAY_FREQUENCIES = [
  { value: "weekly", label: "Weekly", periodsPerYear: 52 },
  { value: "biweekly", label: "Bi-weekly (every 2 weeks)", periodsPerYear: 26 },
  { value: "semimonthly", label: "Semi-monthly (twice a month)", periodsPerYear: 24 },
  { value: "monthly", label: "Monthly", periodsPerYear: 12 },
  { value: "quarterly", label: "Quarterly", periodsPerYear: 4 },
  { value: "annually", label: "Annually", periodsPerYear: 1 },
]

export default function PaydayCalculator() {
  const [payFrequency, setPayFrequency] = useState<string>("biweekly")
  const [payDate, setPayDate] = useState<string>("")
  const [annualSalary, setAnnualSalary] = useState<string>("")
  const [hourlyRate, setHourlyRate] = useState<string>("")
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40")
  const [startDate, setStartDate] = useState<string>("")
  const [numPaydays, setNumPaydays] = useState<string>("12")
  const [copied, setCopied] = useState<string | null>(null)

  const selectedFrequency = useMemo(() => {
    return PAY_FREQUENCIES.find((f) => f.value === payFrequency) || PAY_FREQUENCIES[1]
  }, [payFrequency])

  const payAmount = useMemo(() => {
    if (annualSalary) {
      return parseFloat(annualSalary) / selectedFrequency.periodsPerYear
    } else if (hourlyRate && hoursPerWeek) {
      const weeklyRate = parseFloat(hourlyRate) * parseFloat(hoursPerWeek)
      const annualRate = weeklyRate * 52
      return annualRate / selectedFrequency.periodsPerYear
    }
    return null
  }, [annualSalary, hourlyRate, hoursPerWeek, selectedFrequency])

  const upcomingPaydays = useMemo(() => {
    if (!payDate || !startDate) return []

    const paydates: Date[] = []
    const start = new Date(startDate)
    const pay = new Date(payDate)
    const count = parseInt(numPaydays) || 12

    let daysBetween: number

    switch (payFrequency) {
      case "weekly":
        daysBetween = 7
        break
      case "biweekly":
        daysBetween = 14
        break
      case "semimonthly":
        daysBetween = 15
        break
      case "monthly":
        daysBetween = 30
        break
      case "quarterly":
        daysBetween = 91
        break
      case "annually":
        daysBetween = 365
        break
      default:
        daysBetween = 14
    }

    let current = new Date(start)
    while (current < pay) {
      current.setDate(current.getDate() + daysBetween)
    }

    while (paydates.length < count) {
      paydates.push(new Date(current))
      current.setDate(current.getDate() + daysBetween)
    }

    return paydates
  }, [payDate, startDate, numPaydays, payFrequency])

  const nextPayday = useMemo(() => {
    const today = new Date()
    const future = upcomingPaydays.find((d) => d > today)
    return future || upcomingPaydays[0]
  }, [upcomingPaydays])

  const daysUntilNextPayday = useMemo(() => {
    if (!nextPayday) return 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const next = new Date(nextPayday)
    next.setHours(0, 0, 0, 0)
    return Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }, [nextPayday])

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
    setPayDate("")
    setAnnualSalary("")
    setHourlyRate("")
    setStartDate("")
  }, [])

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "-"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Pay Frequency */}
      <section className="space-y-3">
        <Label htmlFor="pay-frequency" className="text-base font-medium">Pay Frequency</Label>
        <Select value={payFrequency} onValueChange={setPayFrequency}>
          <SelectTrigger id="pay-frequency">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAY_FREQUENCIES.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Pay Date */}
      <section className="space-y-3">
        <Label htmlFor="pay-date" className="text-base font-medium">Next Pay Date</Label>
        <Input
          id="pay-date"
          type="date"
          value={payDate}
          onChange={(e) => setPayDate(e.target.value)}
        />
      </section>

      {/* Salary Information */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Salary Information (optional)</Label>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="annual-salary">Annual Salary</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="annual-salary"
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(e.target.value)}
                className="pl-9"
                placeholder="50000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hourly-rate">Hourly Rate</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="hourly-rate"
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="pl-9"
                placeholder="25"
              />
            </div>
          </div>
        </div>
        {hourlyRate && (
          <div className="space-y-2">
            <Label htmlFor="hours-per-week">Hours per Week</Label>
            <Input
              id="hours-per-week"
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              placeholder="40"
            />
          </div>
        )}
      </section>

      {/* Schedule Generation */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Generate Pay Schedule</Label>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Schedule Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="num-paydays">Number of Paydays</Label>
            <Input
              id="num-paydays"
              type="number"
              value={numPaydays}
              onChange={(e) => setNumPaydays(e.target.value)}
              min="1"
              max="52"
            />
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={handleClear} className="w-full">
          <Trash2 className="size-4 mr-2" />
          Clear
        </Button>
      </section>

      {/* Results */}
      {(payAmount || upcomingPaydays.length > 0) && (
        <section className="space-y-6">
          {/* Pay Amount */}
          {payAmount && (
            <div className="rounded-lg border bg-muted/30 p-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Gross Pay Per Period</p>
                <p className="text-4xl font-bold">{formatCurrency(payAmount)}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedFrequency.periodsPerYear} pay periods per year
                </p>
              </div>
            </div>
          )}

          {/* Next Payday */}
          {nextPayday && (
            <div className="rounded-lg border bg-background p-6">
              <div className="flex items-center gap-4">
                <Calendar className="size-12 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Next Payday</p>
                  <p className="text-2xl font-bold">
                    {nextPayday.toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-muted-foreground">
                    In {daysUntilNextPayday} day{daysUntilNextPayday !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pay Schedule */}
          {upcomingPaydays.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Upcoming Paydays</Label>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(
                    upcomingPaydays.map((d) => d.toLocaleDateString()).join(", "),
                    "schedule"
                  )}
                  className="h-7"
                >
                  {copied === "schedule" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <div className="rounded-lg border bg-background divide-y">
                {upcomingPaydays.map((date, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium">
                          {date.toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        {payAmount && (
                          <p className="text-sm text-muted-foreground">{formatCurrency(payAmount)}</p>
                        )}
                      </div>
                    </div>
                    {date > new Date() && (
                      <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        Upcoming
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Payday Calculator</h4>
            <p className="text-sm text-muted-foreground">
              Calculate your pay schedule based on your pay frequency. See upcoming paydates,
              calculate gross pay per period from annual salary or hourly rate, and plan your
              finances accordingly. Supports weekly, bi-weekly, semi-monthly, monthly,
              quarterly, and annual pay frequencies.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

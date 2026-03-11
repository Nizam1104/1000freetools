"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Plus, Trash2, Calendar } from "lucide-react"

const holidaysByCountry: Record<string, { name: string; month: number; day: number }[]> = {
  US: [
    { name: "New Year's Day", month: 0, day: 1 },
    { name: "Martin Luther King Jr. Day", month: 0, day: 15 },
    { name: "Presidents' Day", month: 1, day: 15 },
    { name: "Memorial Day", month: 4, day: 25 },
    { name: "Independence Day", month: 6, day: 4 },
    { name: "Labor Day", month: 8, day: 1 },
    { name: "Columbus Day", month: 9, day: 8 },
    { name: "Veterans Day", month: 10, day: 11 },
    { name: "Thanksgiving", month: 10, day: 22 },
    { name: "Christmas Day", month: 11, day: 25 },
  ],
  UK: [
    { name: "New Year's Day", month: 0, day: 1 },
    { name: "Good Friday", month: 2, day: 25 },
    { name: "Easter Monday", month: 2, day: 28 },
    { name: "Early May Bank Holiday", month: 4, day: 1 },
    { name: "Spring Bank Holiday", month: 4, day: 25 },
    { name: "Summer Bank Holiday", month: 7, day: 25 },
    { name: "Christmas Day", month: 11, day: 25 },
    { name: "Boxing Day", month: 11, day: 26 },
  ],
  IN: [
    { name: "Republic Day", month: 0, day: 26 },
    { name: "Independence Day", month: 7, day: 15 },
    { name: "Gandhi Jayanti", month: 9, day: 2 },
    { name: "Diwali", month: 9, day: 20 },
    { name: "Holi", month: 2, day: 15 },
  ],
  CA: [
    { name: "New Year's Day", month: 0, day: 1 },
    { name: "Family Day", month: 1, day: 15 },
    { name: "Good Friday", month: 2, day: 25 },
    { name: "Victoria Day", month: 4, day: 18 },
    { name: "Canada Day", month: 6, day: 1 },
    { name: "Labour Day", month: 8, day: 1 },
    { name: "Thanksgiving", month: 9, day: 8 },
    { name: "Christmas Day", month: 11, day: 25 },
  ],
  AU: [
    { name: "New Year's Day", month: 0, day: 1 },
    { name: "Australia Day", month: 0, day: 26 },
    { name: "Good Friday", month: 2, day: 25 },
    { name: "Easter Monday", month: 2, day: 28 },
    { name: "ANZAC Day", month: 3, day: 25 },
    { name: "Christmas Day", month: 11, day: 25 },
    { name: "Boxing Day", month: 11, day: 26 },
  ],
  DE: [
    { name: "New Year's Day", month: 0, day: 1 },
    { name: "Good Friday", month: 2, day: 25 },
    { name: "Easter Monday", month: 2, day: 28 },
    { name: "Labour Day", month: 4, day: 1 },
    { name: "German Unity Day", month: 9, day: 3 },
    { name: "Christmas Day", month: 11, day: 25 },
    { name: "Boxing Day", month: 11, day: 26 },
  ],
  FR: [
    { name: "New Year's Day", month: 0, day: 1 },
    { name: "Easter Monday", month: 2, day: 28 },
    { name: "Labour Day", month: 4, day: 1 },
    { name: "Victory in Europe Day", month: 4, day: 8 },
    { name: "Bastille Day", month: 6, day: 14 },
    { name: "Assumption of Mary", month: 7, day: 15 },
    { name: "All Saints' Day", month: 10, day: 1 },
    { name: "Christmas Day", month: 11, day: 25 },
  ],
  JP: [
    { name: "New Year's Day", month: 0, day: 1 },
    { name: "Coming of Age Day", month: 0, day: 8 },
    { name: "National Foundation Day", month: 1, day: 11 },
    { name: "Vernal Equinox Day", month: 2, day: 20 },
    { name: "Showa Day", month: 3, day: 29 },
    { name: "Constitution Day", month: 4, day: 3 },
    { name: "Marine Day", month: 6, day: 15 },
    { name: "Mountain Day", month: 7, day: 11 },
    { name: "Respect for the Aged Day", month: 8, day: 15 },
    { name: "Sports Day", month: 9, day: 8 },
    { name: "Culture Day", month: 10, day: 3 },
    { name: "Labour Thanksgiving Day", month: 10, day: 23 },
  ],
}

interface CustomHoliday {
  id: string
  date: string
  name: string
}

export default function BusinessDaysCalculator() {
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [selectedCountry, setSelectedCountry] = useState<string>("US")
  const [includeHolidays, setIncludeHolidays] = useState<boolean>(true)
  const [customHolidays, setCustomHolidays] = useState<CustomHoliday[]>([])
  const [newCustomHoliday, setNewCustomHoliday] = useState<string>("")
  const [newCustomHolidayName, setNewCustomHolidayName] = useState<string>("")
  const [operation, setOperation] = useState<string>("difference")
  const [businessDaysToAdd, setBusinessDaysToAdd] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const getHolidaysForYear = useCallback((year: number, country: string): Date[] => {
    const countryHolidays = holidaysByCountry[country] || []
    return countryHolidays.map((h) => new Date(year, h.month, h.day))
  }, [])

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const isHoliday = useCallback((date: Date, holidays: Date[]): boolean => {
    return holidays.some(
      (h) =>
        h.getDate() === date.getDate() &&
        h.getMonth() === date.getMonth() &&
        h.getFullYear() === date.getFullYear()
    )
  }, [])

  const isCustomHoliday = useCallback((date: Date, customHolidays: CustomHoliday[]): boolean => {
    return customHolidays.some(
      (h) => h.date === date.toISOString().split("T")[0]
    )
  }, [])

  const calculateBusinessDays = useMemo(() => {
    if (!startDate || !endDate) return null

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null

    const startYear = Math.min(start.getFullYear(), end.getFullYear())
    const endYear = Math.max(start.getFullYear(), end.getFullYear())

    let allHolidays: Date[] = []
    if (includeHolidays) {
      for (let year = startYear; year <= endYear; year++) {
        allHolidays = [...allHolidays, ...getHolidaysForYear(year, selectedCountry)]
      }
    }

    const isForward = end >= start
    const current = new Date(isForward ? start : end)
    const target = isForward ? end : start

    let businessDays = 0
    const excludedDays: { date: Date; reason: string }[] = []

    while (current <= target) {
      if (isWeekend(current)) {
        excludedDays.push({ date: new Date(current), reason: "Weekend" })
      } else if (isHoliday(current, allHolidays)) {
        excludedDays.push({ date: new Date(current), reason: "Holiday" })
      } else if (isCustomHoliday(current, customHolidays)) {
        excludedDays.push({ date: new Date(current), reason: "Custom Holiday" })
      } else {
        businessDays++
      }
      current.setDate(current.getDate() + 1)
    }

    const totalDays = Math.floor((target.getTime() - (isForward ? start : end).getTime()) / (1000 * 60 * 60 * 24)) + 1

    return {
      businessDays,
      totalDays,
      weekendDays: excludedDays.filter((d) => d.reason === "Weekend").length,
      holidayDays: excludedDays.filter((d) => d.reason === "Holiday").length,
      customHolidayDays: excludedDays.filter((d) => d.reason === "Custom Holiday").length,
      excludedDays,
    }
  }, [startDate, endDate, selectedCountry, includeHolidays, customHolidays, getHolidaysForYear, isHoliday, isCustomHoliday])

  const calculatedEndDate = useMemo(() => {
    if (!startDate || !businessDaysToAdd) return null

    const days = parseInt(businessDaysToAdd, 10)
    if (isNaN(days)) return null

    const start = new Date(startDate)
    const current = new Date(start)

    const startYear = start.getFullYear()
    const endYear = new Date(start.getFullYear() + Math.abs(days) / 5 + 1).getFullYear()

    let allHolidays: Date[] = []
    if (includeHolidays) {
      for (let year = startYear; year <= endYear; year++) {
        allHolidays = [...allHolidays, ...getHolidaysForYear(year, selectedCountry)]
      }
    }

    const direction = days >= 0 ? 1 : -1
    let remaining = Math.abs(days)

    while (remaining > 0) {
      current.setDate(current.getDate() + direction)

      if (!isWeekend(current) && !isHoliday(current, allHolidays) && !isCustomHoliday(current, customHolidays)) {
        remaining--
      }
    }

    return current
  }, [startDate, businessDaysToAdd, selectedCountry, includeHolidays, customHolidays, getHolidaysForYear, isHoliday, isCustomHoliday])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const addCustomHoliday = () => {
    if (!newCustomHoliday) return

    const holiday: CustomHoliday = {
      id: Date.now().toString(),
      date: newCustomHoliday,
      name: newCustomHolidayName || "Custom Holiday",
    }

    setCustomHolidays([...customHolidays, holiday])
    setNewCustomHoliday("")
    setNewCustomHolidayName("")
  }

  const removeCustomHoliday = (id: string) => {
    setCustomHolidays(customHolidays.filter((h) => h.id !== id))
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "IN", label: "India" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Business Days Calculator</h2>
        <p className="text-muted-foreground">
          Calculate working days between dates, excluding weekends and holidays.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setOperation("difference")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            operation === "difference"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Calculate Business Days
        </button>
        <button
          onClick={() => setOperation("add")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            operation === "add"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Add/Subtract Business Days
        </button>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country Holidays</Label>
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {countryOptions.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2 flex items-end">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="include-holidays"
                checked={includeHolidays}
                onChange={(e) => setIncludeHolidays(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="include-holidays" className="text-sm font-normal">
                Include country holidays
              </Label>
            </div>
          </div>
        </div>

        {operation === "difference" ? (
          <>
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

            {calculateBusinessDays && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard
                    label="Business Days"
                    value={calculateBusinessDays.businessDays.toString()}
                    highlight
                  />
                  <StatCard label="Total Days" value={calculateBusinessDays.totalDays.toString()} />
                  <StatCard
                    label="Weekend Days"
                    value={calculateBusinessDays.weekendDays.toString()}
                  />
                  <StatCard
                    label="Holiday Days"
                    value={(
                      calculateBusinessDays.holidayDays + calculateBusinessDays.customHolidayDays
                    ).toString()}
                  />
                </div>

                <div className="rounded-lg border bg-background p-4">
                  <p className="text-sm text-muted-foreground mb-2">Date Range</p>
                  <p className="font-medium">
                    {startDate && endDate
                      ? `${formatDate(new Date(startDate))} to ${formatDate(new Date(endDate))}`
                      : ""}
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
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
                <Label htmlFor="business-days">Business Days</Label>
                <Input
                  id="business-days"
                  type="number"
                  value={businessDaysToAdd}
                  onChange={(e) => setBusinessDaysToAdd(e.target.value)}
                  placeholder="e.g., 30 or -30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="result">Result Date</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="result"
                    type="text"
                    value={
                      calculatedEndDate
                        ? calculatedEndDate.toISOString().split("T")[0]
                        : ""
                    }
                    readOnly
                    className="bg-muted"
                  />
                  {calculatedEndDate && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        copyToClipboard(calculatedEndDate.toISOString().split("T")[0], "result")
                      }
                    >
                      {copied === "result" ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {calculatedEndDate && (
              <div className="rounded-lg border bg-background p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-xl font-bold">{formatDate(calculatedEndDate)}</p>
                <p className="text-sm text-muted-foreground">
                  {businessDaysToAdd} business days from {startDate
                    ? formatDate(new Date(startDate))
                    : ""}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="rounded-lg border bg-background p-4 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Calendar className="size-5" />
          Custom Holidays
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="custom-holiday-name">Holiday Name</Label>
            <Input
              id="custom-holiday-name"
              type="text"
              value={newCustomHolidayName}
              onChange={(e) => setNewCustomHolidayName(e.target.value)}
              placeholder="e.g., Company Anniversary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-holiday-date">Date</Label>
            <Input
              id="custom-holiday-date"
              type="date"
              value={newCustomHoliday}
              onChange={(e) => setNewCustomHoliday(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={addCustomHoliday} className="w-full">
              <Plus className="size-4 mr-2" />
              Add Holiday
            </Button>
          </div>
        </div>

        {customHolidays.length > 0 && (
          <div className="space-y-2">
            {customHolidays.map((holiday) => (
              <div
                key={holiday.id}
                className="flex items-center justify-between rounded-lg border bg-muted/30 p-3"
              >
                <div>
                  <p className="font-medium">{holiday.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(new Date(holiday.date))}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCustomHoliday(holiday.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-lg border p-4 space-y-1 ${
        highlight ? "bg-primary/10 border-primary/20" : "bg-muted/30"
      }`}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-xl font-bold font-mono ${highlight ? "text-primary" : ""}`}>{value}</p>
    </div>
  )
}

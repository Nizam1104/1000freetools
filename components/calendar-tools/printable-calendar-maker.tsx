"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, Info, Download, Printer } from "lucide-react"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function PrintableCalendarMaker() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonths, setSelectedMonths] = useState<number[]>([new Date().getMonth()])
  const [showWeekNumbers, setShowWeekNumbers] = useState(false)
  const [showHolidays, setShowHolidays] = useState(true)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")
  const [paperSize, setPaperSize] = useState<"letter" | "a4">("letter")
  const [copied, setCopied] = useState<string | null>(null)

  const toggleMonth = useCallback((month: number) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    )
  }, [])

  const selectAllMonths = useCallback(() => {
    setSelectedMonths([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  }, [])

  const clearMonths = useCallback(() => {
    setSelectedMonths([])
  }, [])

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getWeekNumber = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  }

  const holidays = useMemo(() => {
    if (!showHolidays) return {}
    return {
      [`${selectedYear}-0-1`]: "New Year's Day",
      [`${selectedYear}-1-14`]: "Valentine's Day",
      [`${selectedYear}-2-17`]: "St. Patrick's Day",
      [`${selectedYear}-3-22`]: "Earth Day",
      [`${selectedYear}-4-1`]: "May Day",
      [`${selectedYear}-6-4`]: "Independence Day (US)",
      [`${selectedYear}-9-31`]: "Halloween",
      [`${selectedYear}-10-11`]: "Veterans Day",
      [`${selectedYear}-10-28`]: "Thanksgiving (US)",
      [`${selectedYear}-11-25`]: "Christmas",
    }
  }, [selectedYear, showHolidays])

  const renderMonth = (month: number) => {
    const daysInMonth = getDaysInMonth(selectedYear, month)
    const firstDay = getFirstDayOfMonth(selectedYear, month)
    const weeks: (number | null)[][] = []
    let week: (number | null)[] = Array(firstDay).fill(null)

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day)
      if (week.length === 7) {
        weeks.push(week)
        week = []
      }
    }

    if (week.length > 0) {
      while (week.length < 7) week.push(null)
      weeks.push(week)
    }

    return (
      <div key={month} className="break-inside-avoid mb-8">
        <h3 className="text-xl font-bold text-center mb-4">{MONTHS[month]} {selectedYear}</h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 bg-muted">
            {WEEKDAYS.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {weeks.map((week, weekIdx) => (
              <React.Fragment key={weekIdx}>
                {showWeekNumbers && (
                  <div className="p-1 text-center text-xs text-muted-foreground border-r bg-muted/30">
                    {getWeekNumber(new Date(selectedYear, month, week[0] || 1))}
                  </div>
                )}
                {week.map((day, dayIdx) => {
                  const holidayKey = `${selectedYear}-${month}-${day}`
                  const holiday = day ? holidays[holidayKey as keyof typeof holidays] : null
                  return (
                    <div
                      key={dayIdx}
                      className={`p-2 min-h-16 border-r border-b last:border-r-0 ${day ? "" : "bg-muted/30"}`}
                    >
                      {day && (
                        <>
                          <span className={`text-sm ${holiday ? "text-red-500 font-medium" : ""}`}>{day}</span>
                          {holiday && (
                            <p className="text-xs text-red-500 mt-1 truncate">{holiday}</p>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Configuration */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value) || new Date().getFullYear())}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orientation">Orientation</Label>
            <Select value={orientation} onValueChange={(v) => setOrientation(v as any)}>
              <SelectTrigger id="orientation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="landscape">Landscape</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="paper-size">Paper Size</Label>
            <Select value={paperSize} onValueChange={(v) => setPaperSize(v as any)}>
              <SelectTrigger id="paper-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="letter">Letter (8.5x11)</SelectItem>
                <SelectItem value="a4">A4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="week-numbers"
              checked={showWeekNumbers}
              onCheckedChange={(v) => setShowWeekNumbers(v as boolean)}
            />
            <Label htmlFor="week-numbers" className="text-sm cursor-pointer">Show Week Numbers</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="holidays"
              checked={showHolidays}
              onCheckedChange={(v) => setShowHolidays(v as boolean)}
            />
            <Label htmlFor="holidays" className="text-sm cursor-pointer">Show Holidays</Label>
          </div>
        </div>
      </section>

      {/* Month Selection */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Select Months to Print</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={selectAllMonths}>
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={clearMonths}>
              Clear
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {MONTHS.map((month, idx) => (
            <Button
              key={month}
              variant={selectedMonths.includes(idx) ? "default" : "outline"}
              onClick={() => toggleMonth(idx)}
              className="justify-start"
            >
              {month}
            </Button>
          ))}
        </div>
      </section>

      {/* Actions */}
      <section className="flex gap-2">
        <Button onClick={handlePrint} disabled={selectedMonths.length === 0} className="flex-1">
          <Printer className="size-4 mr-2" />
          Print Calendar
        </Button>
      </section>

      {/* Preview */}
      {selectedMonths.length > 0 && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Preview</Label>
          <div className="rounded-lg border bg-background p-6">
            <div className="space-y-6">
              {selectedMonths.map((month) => renderMonth(month))}
            </div>
          </div>
        </section>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: ${paperSize === "letter" ? "letter" : "a4"} ${orientation};
            margin: 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Printable Calendar</h4>
            <p className="text-sm text-muted-foreground">
              Create and print custom calendars for any year. Select specific months,
              choose orientation and paper size, and optionally include week numbers
              and holidays. Perfect for planning, scheduling, or decorative purposes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

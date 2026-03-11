"use client"

import * as React from "react"
import { useState, useCallback, useMemo, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Printer, Download, Star } from "lucide-react"

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const dayNamesSunday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const dayNamesMonday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

interface MarkedDate {
  id: string
  date: number
  label: string
  color: string
}

export default function CalendarGenerator() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())
  const [weekStart, setWeekStart] = useState<"sunday" | "monday">("sunday")
  const [markedDates, setMarkedDates] = useState<MarkedDate[]>([])
  const [newMarkedDate, setNewMarkedDate] = useState<string>("")
  const [newMarkedLabel, setNewMarkedLabel] = useState<string>("")
  const [showWeekends, setShowWeekends] = useState<boolean>(true)
  const calendarRef = useRef<HTMLDivElement>(null)

  const calendar = useMemo(() => {
    const year = selectedYear
    const month = selectedMonth

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    let startDay = firstDay.getDay()
    if (weekStart === "monday") {
      startDay = startDay === 0 ? 6 : startDay - 1
    }

    const daysInMonth = lastDay.getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    const weeks: (number | null)[][] = []
    let currentWeek: (number | null)[] = []

    // Add previous month's days
    for (let i = startDay - 1; i >= 0; i--) {
      currentWeek.push(daysInPrevMonth - i)
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    // Add next month's days
    while (currentWeek.length < 7) {
      currentWeek.push(currentWeek.length + 1)
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    return {
      year,
      month,
      daysInMonth,
      weeks,
      firstDay,
      lastDay,
    }
  }, [selectedYear, selectedMonth, weekStart])

  const isWeekend = (day: number): boolean => {
    const date = new Date(calendar.year, calendar.month, day)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  const isToday = (day: number): boolean => {
    const today = new Date()
    return (
      day === today.getDate() &&
      calendar.month === today.getMonth() &&
      calendar.year === today.getFullYear()
    )
  }

  const getMarkedDate = (day: number): MarkedDate | undefined => {
    return markedDates.find((md) => md.date === day)
  }

  const addMarkedDate = () => {
    if (!newMarkedDate) return

    const day = parseInt(newMarkedDate, 10)
    if (day < 1 || day > calendar.daysInMonth) return

    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newMark: MarkedDate = {
      id: Date.now().toString(),
      date: day,
      label: newMarkedLabel || `Day ${day}`,
      color: randomColor,
    }

    setMarkedDates([...markedDates, newMark])
    setNewMarkedDate("")
    setNewMarkedLabel("")
  }

  const removeMarkedDate = (id: string) => {
    setMarkedDates(markedDates.filter((md) => md.id !== id))
  }

  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
    } else {
      setSelectedMonth(selectedMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
    } else {
      setSelectedMonth(selectedMonth + 1)
    }
  }

  const goToToday = () => {
    const today = new Date()
    setSelectedYear(today.getFullYear())
    setSelectedMonth(today.getMonth())
  }

  const handlePrint = () => {
    window.print()
  }

  const years = Array.from({ length: 101 }, (_, i) => 1950 + i)

  const dayNames = weekStart === "sunday" ? dayNamesSunday : dayNamesMonday

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Calendar Generator & Printable Calendar</h2>
        <p className="text-muted-foreground">
          Generate custom monthly calendars for any year and month. Mark special dates and print or download.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="size-4" />
            </Button>
            <div className="flex gap-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {monthNames.map((name, index) => (
                  <option key={name} value={index}>
                    {name}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="size-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="week-start" className="text-sm">Week Starts:</Label>
            <select
              id="week-start"
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value as "sunday" | "monday")}
              className="rounded-md border border-input bg-background px-2 py-1 text-sm"
            >
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-weekends"
              checked={showWeekends}
              onChange={(e) => setShowWeekends(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="show-weekends" className="text-sm font-normal">
              Highlight weekends
            </Label>
          </div>
        </div>
      </div>

      <div ref={calendarRef} className="rounded-lg border bg-background p-6">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold">{monthNames[calendar.month]} {calendar.year}</h3>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center font-semibold py-2 text-sm text-muted-foreground"
            >
              {day}
            </div>
          ))}

          {calendar.weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => {
                const isWeekendDay = day && isWeekend(day)
                const isTodayDay = day && isToday(day)
                const marked = day ? getMarkedDate(day) : undefined
                const isCurrentMonth = day && day <= calendar.daysInMonth && (weekIndex > 0 || dayIndex >= (weekStart === "sunday" ? new Date(calendar.year, calendar.month, 1).getDay() : (new Date(calendar.year, calendar.month, 1).getDay() - 1 + 7) % 7))

                return (
                  <div
                    key={dayIndex}
                    className={`
                      relative min-h-[80px] p-2 border rounded-lg
                      ${!isCurrentMonth ? "text-muted-foreground/50 bg-muted/30" : ""}
                      ${showWeekends && isWeekendDay && isCurrentMonth ? "bg-amber-50 dark:bg-amber-950/20" : ""}
                      ${isTodayDay ? "ring-2 ring-primary" : ""}
                    `}
                  >
                    {day && (
                      <>
                        <span className={`text-lg font-medium ${isTodayDay ? "text-primary font-bold" : ""}`}>
                          {day}
                        </span>
                        {marked && (
                          <div className="mt-1 space-y-1">
                            <div className={`text-xs px-1.5 py-0.5 rounded ${marked.color} text-white truncate`}>
                              {marked.label}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>

        {markedDates.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Star className="size-4" />
              Marked Dates
            </h4>
            <div className="flex flex-wrap gap-2">
              {markedDates.map((md) => (
                <div
                  key={md.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted"
                >
                  <div className={`w-3 h-3 rounded-full ${md.color}`}></div>
                  <span className="text-sm">{monthNames[calendar.month]} {md.date}: {md.label}</span>
                  <button
                    onClick={() => removeMarkedDate(md.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
        <h3 className="font-semibold">Mark Special Dates</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mark-date">Day of Month</Label>
            <Input
              id="mark-date"
              type="number"
              min="1"
              max={calendar.daysInMonth}
              value={newMarkedDate}
              onChange={(e) => setNewMarkedDate(e.target.value)}
              placeholder={`1-${calendar.daysInMonth}`}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="mark-label">Label</Label>
            <Input
              id="mark-label"
              type="text"
              value={newMarkedLabel}
              onChange={(e) => setNewMarkedLabel(e.target.value)}
              placeholder="e.g., Birthday, Meeting, Deadline"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={addMarkedDate} className="w-full">
              <Star className="size-4 mr-2" />
              Mark Date
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-background p-4 space-y-3">
        <h3 className="font-semibold">Calendar Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Print Ready</p>
            <p className="text-xs text-muted-foreground">
              Calendar is optimized for printing on standard paper
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Week Start Option</p>
            <p className="text-xs text-muted-foreground">
              Choose Sunday or Monday as the first day of the week
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Mark Events</p>
            <p className="text-xs text-muted-foreground">
              Highlight important dates with custom labels
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .calendar-print-area, .calendar-print-area * {
            visibility: visible;
          }
          .calendar-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, ChevronLeft, ChevronRight } from "lucide-react"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function PerpetualCalendar() {
  const [displayYear, setDisplayYear] = useState(new Date().getFullYear())
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getDayOfWeek = (year: number, month: number, day: number) => {
    return new Date(year, month, day).getDay()
  }

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(displayYear, displayMonth)
    const firstDay = getFirstDayOfMonth(displayYear, displayMonth)
    const days: (number | null)[] = Array(firstDay).fill(null)
    
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d)
    }
    
    return days
  }, [displayYear, displayMonth])

  const goToPreviousMonth = useCallback(() => {
    if (displayMonth === 0) {
      setDisplayMonth(11)
      setDisplayYear(displayYear - 1)
    } else {
      setDisplayMonth(displayMonth - 1)
    }
  }, [displayMonth, displayYear])

  const goToNextMonth = useCallback(() => {
    if (displayMonth === 11) {
      setDisplayMonth(0)
      setDisplayYear(displayYear + 1)
    } else {
      setDisplayMonth(displayMonth + 1)
    }
  }, [displayMonth, displayYear])

  const goToToday = useCallback(() => {
    const today = new Date()
    setDisplayYear(today.getFullYear())
    setDisplayMonth(today.getMonth())
    setSelectedDate(today.toISOString().split("T")[0])
  }, [])

  const jumpToYear = useCallback((year: number) => {
    setDisplayYear(year)
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

  const handleClear = useCallback(() => {
    setSelectedDate(null)
  }, [])

  const selectedDateInfo = useMemo(() => {
    if (!selectedDate) return null
    const date = new Date(selectedDate)
    return {
      fullDate: date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      dayOfYear: Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)),
      weekNumber: Math.ceil((((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 86400000) + 1) / 7),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    }
  }, [selectedDate])

  const today = new Date()
  const isToday = (day: number) => {
    return day === today.getDate() && displayMonth === today.getMonth() && displayYear === today.getFullYear()
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    const date = new Date(selectedDate)
    return day === date.getDate() && displayMonth === date.getMonth() && displayYear === date.getFullYear()
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Navigation */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="size-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Select value={displayMonth.toString()} onValueChange={(v) => setDisplayMonth(parseInt(v))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((m, i) => (
                  <SelectItem key={m} value={i.toString()}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Input
              type="number"
              value={displayYear}
              onChange={(e) => setDisplayYear(parseInt(e.target.value) || new Date().getFullYear())}
              className="w-24 text-center"
            />
          </div>
          
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="size-5" />
          </Button>
        </div>

        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={() => jumpToYear(displayYear - 1)}>
            -1 Year
          </Button>
          <Button variant="outline" size="sm" onClick={() => jumpToYear(displayYear + 1)}>
            +1 Year
          </Button>
        </div>
      </section>

      {/* Calendar Grid */}
      <section className="rounded-lg border bg-background overflow-hidden">
        <div className="text-center py-4 bg-muted">
          <h2 className="text-2xl font-bold">
            {MONTHS[displayMonth]} {displayYear}
          </h2>
        </div>
        
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium bg-muted/50 border-b">
              {day}
            </div>
          ))}
          
          {calendarDays.map((day, idx) => (
            <div
              key={idx}
              className={`p-3 text-center border-b border-r last:border-r-0 min-h-14 cursor-pointer transition-colors
                ${!day ? "bg-muted/30" : "hover:bg-muted"}
                ${isToday(day || 1) ? "bg-primary/10 font-bold" : ""}
                ${isSelected(day || 1) ? "bg-primary text-primary-foreground" : ""}
              `}
              onClick={() => day && setSelectedDate(new Date(displayYear, displayMonth, day).toISOString().split("T")[0])}
            >
              {day}
            </div>
          ))}
        </div>
      </section>

      {/* Selected Date Info */}
      {selectedDateInfo && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Selected Date</Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(selectedDateInfo.fullDate, "date")}
                className="h-7"
              >
                {copied === "date" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
              <Button variant="ghost" size="xs" onClick={handleClear} className="h-7">
                <Trash2 className="size-3.5" />
                <span className="text-xs">Clear</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-lg font-semibold">{selectedDateInfo.fullDate}</p>
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div>
                <p className="text-muted-foreground">Day of Year</p>
                <p className="font-medium">{selectedDateInfo.dayOfYear} / {displayYear % 4 === 0 ? 366 : 365}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Week Number</p>
                <p className="font-medium">{selectedDateInfo.weekNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Day Type</p>
                <p className={`font-medium ${selectedDateInfo.isWeekend ? "text-red-500" : ""}`}>
                  {selectedDateInfo.isWeekend ? "Weekend" : "Weekday"}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Year Overview */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Year {displayYear} Overview</Label>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {MONTHS.map((month, idx) => {
            const daysInMonth = getDaysInMonth(displayYear, idx)
            return (
              <Button
                key={month}
                variant={displayMonth === idx ? "default" : "outline"}
                size="sm"
                onClick={() => setDisplayMonth(idx)}
                className="flex flex-col h-auto py-2"
              >
                <span className="text-xs font-medium">{month}</span>
                <span className="text-xs text-muted-foreground">{daysInMonth} days</span>
              </Button>
            )
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Perpetual Calendar</h4>
            <p className="text-sm text-muted-foreground">
              A perpetual calendar can display any date from any year. Navigate through months
              and years to find specific dates, check what day of the week a date falls on,
              or plan events far into the future. Click on any date to see detailed information.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

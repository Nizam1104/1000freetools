"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Calendar, Sparkles } from "lucide-react"

const notableDates: Record<string, { event: string; year: number | null }> = {
  "07-04": { event: "Independence Day (USA)", year: 1776 },
  "12-25": { event: "Christmas Day", year: null },
  "01-01": { event: "New Year's Day", year: null },
  "10-31": { event: "Halloween", year: null },
  "02-14": { event: "Valentine's Day", year: null },
  "03-17": { event: "St. Patrick's Day", year: null },
  "11-11": { event: "Veterans Day (USA)", year: null },
  "07-20": { event: "Moon Landing", year: 1969 },
  "09-11": { event: "September 11 Attacks", year: 2001 },
  "06-06": { event: "D-Day (Normandy Landings)", year: 1944 },
  "04-15": { event: "Titanic Sinks", year: 1912 },
  "08-15": { event: "India Independence Day", year: 1947 },
  "01-26": { event: "Republic Day (India)", year: 1950 },
  "07-14": { event: "Bastille Day (France)", year: 1789 },
  "10-02": { event: "Gandhi Jayanti (India)", year: 1869 },
}

const dayFacts: Record<number, string> = {
  0: "Sunday is named after the Sun. In many cultures, it's considered the first day of the week.",
  1: "Monday is named after the Moon. In ISO 8601, it's the first day of the week.",
  2: "Tuesday is named after Tiw, the Norse god of war. It's associated with Mars in Romance languages.",
  3: "Wednesday is named after Woden (Odin). It's the middle of the work week.",
  4: "Thursday is named after Thor, the Norse god of thunder. It's associated with Jupiter.",
  5: "Friday is named after Frigg, the Norse goddess of love. It's associated with Venus.",
  6: "Saturday is named after Saturn, the Roman god. It's the only day named after a Roman deity in English.",
}

export default function DayOfWeekFinder() {
  const [selectedDate, setSelectDate] = useState<string>("")
  const [birthDate, setBirthDate] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const dayInfo = useMemo(() => {
    if (!selectedDate) return null

    const date = new Date(selectedDate)
    if (isNaN(date.getTime())) return null

    const dayIndex = date.getDay()
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayName = dayNames[dayIndex]

    const monthDay = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    const notableEvent = notableDates[monthDay]

    const isToday = new Date().toDateString() === date.toDateString()
    const isPast = date < new Date()
    const isFuture = date > new Date()

    return {
      dayName,
      dayIndex,
      date,
      notableEvent,
      isToday,
      isPast,
      isFuture,
      fact: dayFacts[dayIndex],
      formattedDate: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }
  }, [selectedDate])

  const birthDayInfo = useMemo(() => {
    if (!birthDate) return null

    const date = new Date(birthDate)
    if (isNaN(date.getTime())) return null

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayName = dayNames[date.getDay()]

    const today = new Date()
    let nextBirthday = new Date(today.getFullYear(), date.getMonth(), date.getDate())

    if (nextBirthday <= today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
    }

    const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const age = today.getFullYear() - date.getFullYear() - (today < new Date(today.getFullYear(), date.getMonth(), date.getDate()) ? 1 : 0)

    return {
      dayName,
      nextBirthday,
      daysUntil,
      age,
      formattedDate: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      nextBirthdayDay: nextBirthday.toLocaleDateString("en-US", { weekday: "long" }),
    }
  }, [birthDate])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const getQuickDates = () => {
    const today = new Date()
    const dates = [
      { label: "Today", value: today.toISOString().split("T")[0] },
      { label: "Tomorrow", value: new Date(today.setDate(today.getDate() + 1)).toISOString().split("T")[0] },
    ]
    today.setDate(today.getDate() - 1)
    dates.push({ label: "Yesterday", value: today.toISOString().split("T")[0] })
    return dates
  }

  const quickDates = getQuickDates()

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Day of the Week Finder</h2>
        <p className="text-muted-foreground">
          Find which day of the week any date falls on, past, present, or future.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="selected-date">Select a Date</Label>
          <div className="flex gap-2">
            <Input
              id="selected-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectDate(e.target.value)}
              className="flex-1"
            />
            {selectedDate && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(dayInfo?.formattedDate || "", "date")}
              >
                {copied === "date" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {quickDates.map((q) => (
              <Button
                key={q.label}
                variant="outline"
                size="sm"
                onClick={() => setSelectDate(q.value)}
              >
                {q.label}
              </Button>
            ))}
          </div>
        </div>

        {dayInfo && (
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-6 text-center space-y-2">
              {dayInfo.isToday && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Sparkles className="size-4" />
                  Today
                </div>
              )}
              <p className="text-5xl font-bold">{dayInfo.dayName}</p>
              <p className="text-lg text-muted-foreground">{dayInfo.formattedDate}</p>
              {dayInfo.isPast && <p className="text-sm text-muted-foreground">This date is in the past</p>}
              {dayInfo.isFuture && <p className="text-sm text-muted-foreground">This date is in the future</p>}
            </div>

            {dayInfo.notableEvent && (
              <div className="rounded-lg border bg-amber-50 dark:bg-amber-950/20 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-amber-600" />
                  <p className="font-semibold text-amber-800 dark:text-amber-200">Notable Event</p>
                </div>
                <p className="text-amber-700 dark:text-amber-300">
                  <strong>{dayInfo.notableEvent.event}</strong>
                  {dayInfo.notableEvent.year && ` - ${dayInfo.notableEvent.year}`}
                </p>
              </div>
            )}

            <div className="rounded-lg border bg-background p-4 space-y-3">
              <h3 className="font-semibold">About {dayInfo.dayName}</h3>
              <p className="text-sm text-muted-foreground">{dayInfo.fact}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Day Number" value={dayInfo.dayIndex.toString()} />
              <StatCard label="Week Number" value={getWeekNumber(dayInfo.date).toString()} />
              <StatCard label="Day of Year" value={getDayOfYear(dayInfo.date).toString()} />
              <StatCard
                label="Quarter"
                value={`Q${Math.floor(dayInfo.date.getMonth() / 3) + 1}`}
              />
            </div>
          </div>
        )}

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">What Day Was I Born?</h3>
          <div className="space-y-2">
            <Label htmlFor="birth-date">Your Birth Date</Label>
            <Input
              id="birth-date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          {birthDayInfo && (
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                <p className="text-sm text-muted-foreground">You were born on a</p>
                <p className="text-4xl font-bold">{birthDayInfo.dayName}</p>
                <p className="text-muted-foreground">{birthDayInfo.formattedDate}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border bg-background p-4 space-y-1">
                  <p className="text-sm text-muted-foreground">Current Age</p>
                  <p className="text-2xl font-bold">{birthDayInfo.age} years old</p>
                </div>
                <div className="rounded-lg border bg-background p-4 space-y-1">
                  <p className="text-sm text-muted-foreground">Next Birthday</p>
                  <p className="text-2xl font-bold">In {birthDayInfo.daysUntil} days</p>
                  <p className="text-sm text-muted-foreground">
                    ({birthDayInfo.nextBirthdayDay})
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

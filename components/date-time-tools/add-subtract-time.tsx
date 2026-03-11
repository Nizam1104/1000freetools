"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Clock, Plus, Minus } from "lucide-react"

export default function AddSubtractTime() {
  const [startTime, setStartTime] = useState<string>("12:00")
  const [startAmPm, setStartAmPm] = useState<string>("PM")
  const [startDate, setStartDate] = useState<string>("")
  const [operation, setOperation] = useState<string>("add")
  const [hours, setHours] = useState<string>("")
  const [minutes, setMinutes] = useState<string>("")
  const [seconds, setSeconds] = useState<string>("")
  const [format, setFormat] = useState<string>("12")
  const [copied, setCopied] = useState<string | null>(null)

  const result = useMemo(() => {
    if (!startTime) return null

    let startHours = parseInt(startTime.split(":")[0], 10)
    let startMinutes = parseInt(startTime.split(":")[1] || "0", 10)
    let startSeconds = 0

    if (format === "12") {
      if (startAmPm === "PM" && startHours !== 12) {
        startHours += 12
      } else if (startAmPm === "AM" && startHours === 12) {
        startHours = 0
      }
    }

    let totalSeconds = startHours * 3600 + startMinutes * 60 + startSeconds

    const addHours = parseInt(hours || "0", 10)
    const addMinutes = parseInt(minutes || "0", 10)
    const addSeconds = parseInt(seconds || "0", 10)

    const timeToAdd = addHours * 3600 + addMinutes * 60 + addSeconds

    if (operation === "add") {
      totalSeconds += timeToAdd
    } else {
      totalSeconds -= timeToAdd
    }

    // Handle negative time (previous day)
    let daysChanged = 0
    if (totalSeconds < 0) {
      daysChanged = Math.floor(totalSeconds / 86400)
      totalSeconds = totalSeconds % 86400
      if (totalSeconds < 0) {
        totalSeconds += 86400
        daysChanged--
      }
    } else if (totalSeconds >= 86400) {
      daysChanged = Math.floor(totalSeconds / 86400)
      totalSeconds = totalSeconds % 86400
    }

    const resultHours = Math.floor(totalSeconds / 3600)
    const resultMinutes = Math.floor((totalSeconds % 3600) / 60)
    const resultSeconds = totalSeconds % 60

    // Calculate result date if start date is provided
    let resultDate = null
    if (startDate) {
      resultDate = new Date(startDate)
      resultDate.setDate(resultDate.getDate() + daysChanged)
    }

    // Format for 12-hour display
    const displayHours12 = resultHours === 0 ? 12 : resultHours > 12 ? resultHours - 12 : resultHours
    const displayAmPm = resultHours >= 12 ? "PM" : "AM"

    return {
      hours24: resultHours,
      minutes: resultMinutes,
      seconds: resultSeconds,
      hours12: displayHours12,
      amPm: displayAmPm,
      daysChanged,
      resultDate,
      time24: `${String(resultHours).padStart(2, "0")}:${String(resultMinutes).padStart(2, "0")}:${String(resultSeconds).padStart(2, "0")}`,
      time12: `${String(displayHours12).padStart(2, "0")}:${String(resultMinutes).padStart(2, "0")}:${String(resultSeconds).padStart(2, "0")} ${displayAmPm}`,
    }
  }, [startTime, startAmPm, startDate, operation, hours, minutes, seconds, format])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const quickAdditions = [
    { label: "+15 min", hours: "0", minutes: "15", seconds: "0" },
    { label: "+30 min", hours: "0", minutes: "30", seconds: "0" },
    { label: "+45 min", hours: "0", minutes: "45", seconds: "0" },
    { label: "+1 hour", hours: "1", minutes: "0", seconds: "0" },
    { label: "+2 hours", hours: "2", minutes: "0", seconds: "0" },
    { label: "+8 hours", hours: "8", minutes: "0", seconds: "0" },
  ]

  const quickSubtractions = [
    { label: "-15 min", hours: "0", minutes: "15", seconds: "0" },
    { label: "-30 min", hours: "0", minutes: "30", seconds: "0" },
    { label: "-45 min", hours: "0", minutes: "45", seconds: "0" },
    { label: "-1 hour", hours: "1", minutes: "0", seconds: "0" },
    { label: "-2 hours", hours: "2", minutes: "0", seconds: "0" },
  ]

  const applyQuick = (item: typeof quickAdditions[0]) => {
    setHours(item.hours)
    setMinutes(item.minutes)
    setSeconds(item.seconds)
  }

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
        <h2 className="text-2xl font-bold">Add or Subtract Time</h2>
        <p className="text-muted-foreground">
          Add or subtract hours, minutes, and seconds from a start time. Perfect for scheduling, cooking, and travel.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => setFormat("12")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              format === "12"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            12-Hour Format
          </button>
          <button
            onClick={() => setFormat("24")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              format === "24"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            24-Hour Format
          </button>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <div className="flex gap-2">
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="flex-1"
                />
                {format === "12" && (
                  <select
                    value={startAmPm}
                    onChange={(e) => setStartAmPm(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date (optional)</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Include date to see day changes
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setOperation("add")}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                operation === "add"
                  ? "bg-green-600 text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <Plus className="size-4" />
              Add Time
            </button>
            <button
              onClick={() => setOperation("subtract")}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                operation === "subtract"
                  ? "bg-red-600 text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <Minus className="size-4" />
              Subtract Time
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hours">Hours</Label>
              <Input
                id="hours"
                type="number"
                min="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minutes">Minutes</Label>
              <Input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seconds">Seconds</Label>
              <Input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground self-center">Quick:</span>
            {(operation === "add" ? quickAdditions : quickSubtractions).map((item) => (
              <Button
                key={item.label}
                variant="outline"
                size="sm"
                onClick={() => applyQuick(item)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="rounded-lg border bg-background p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Clock className="size-6 text-muted-foreground" />
                  <span className="text-lg font-semibold">Result</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(result.time24, "time24")}
                  >
                    {copied === "time24" ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                    24h
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(result.time12, "time12")}
                  >
                    {copied === "time12" ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                    12h
                  </Button>
                </div>
              </div>

              <div className="text-center py-4">
                <div className="flex items-baseline justify-center gap-2 flex-wrap">
                  <span className="text-6xl font-bold font-mono">
                    {format === "12" ? result.hours12 : result.hours24}
                  </span>
                  <span className="text-4xl text-muted-foreground">:</span>
                  <span className="text-6xl font-bold font-mono">{String(result.minutes).padStart(2, "0")}</span>
                  <span className="text-4xl text-muted-foreground">:</span>
                  <span className="text-6xl font-bold font-mono">{String(result.seconds).padStart(2, "0")}</span>
                  {format === "12" && (
                    <span className="text-2xl font-semibold ml-2">{result.amPm}</span>
                  )}
                </div>

                {result.daysChanged !== 0 && (
                  <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20">
                    <p className="text-amber-800 dark:text-amber-200 font-medium">
                      {result.daysChanged > 0
                        ? `+${result.daysChanged} day${result.daysChanged > 1 ? "s" : ""} (rollover)`
                        : `${result.daysChanged} day${result.daysChanged < -1 ? "s" : ""} (previous day)`}
                    </p>
                    {result.resultDate && (
                      <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                        Result date: {formatDate(result.resultDate)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
                <p className="text-xs text-muted-foreground">24-Hour Format</p>
                <p className="text-2xl font-bold font-mono">{result.time24}</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
                <p className="text-xs text-muted-foreground">12-Hour Format</p>
                <p className="text-2xl font-bold font-mono">{result.time12}</p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <h3 className="font-semibold">Common Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Cooking & Recipes</p>
              <p className="text-xs text-muted-foreground">
                Calculate when food will be ready based on cooking time
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Travel Planning</p>
              <p className="text-xs text-muted-foreground">
                Add flight duration to departure time for arrival
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Meeting Scheduling</p>
              <p className="text-xs text-muted-foreground">
                Find end time based on meeting duration
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Shift Work</p>
              <p className="text-xs text-muted-foreground">
                Calculate shift end times including overtime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

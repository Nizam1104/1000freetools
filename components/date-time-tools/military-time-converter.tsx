"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Clock, Sun, Moon } from "lucide-react"

export default function MilitaryTimeConverter() {
  const [time12, setTime12] = useState<string>("12:00")
  const [ampm, setAmPm] = useState<string>("PM")
  const [time24, setTime24] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const conversion = useMemo(() => {
    // Convert 12-hour to 24-hour
    let hours12 = parseInt(time12.split(":")[0], 10)
    const minutes = time12.split(":")[1] || "00"

    if (ampm === "PM" && hours12 !== 12) {
      hours12 += 12
    } else if (ampm === "AM" && hours12 === 12) {
      hours12 = 0
    }

    const hours24 = String(hours12).padStart(2, "0")
    const converted24 = `${hours24}:${minutes}`

    // Convert 24-hour to 12-hour
    let inputHours24 = -1
    let inputMinutes = "00"

    if (time24) {
      const parts = time24.split(":")
      inputHours24 = parseInt(parts[0], 10)
      inputMinutes = parts[1] || "00"
    }

    let converted12Hours = inputHours24
    let convertedAmPm = "AM"

    if (inputHours24 >= 0) {
      if (inputHours24 === 0) {
        converted12Hours = 12
        convertedAmPm = "AM"
      } else if (inputHours24 < 12) {
        converted12Hours = inputHours24
        convertedAmPm = "AM"
      } else if (inputHours24 === 12) {
        converted12Hours = 12
        convertedAmPm = "PM"
      } else {
        converted12Hours = inputHours24 - 12
        convertedAmPm = "PM"
      }
    }

    return {
      from12to24: converted24,
      from24to12: converted12Hours >= 0 ? `${String(converted12Hours).padStart(2, "0")}:${inputMinutes} ${convertedAmPm}` : "",
      from24to12Hours: converted12Hours,
      from24to12AmPm: convertedAmPm,
    }
  }, [time12, ampm, time24])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handle24HourChange = (value: string) => {
    setTime24(value)
    // Clear 12-hour inputs when typing in 24-hour
    if (value) {
      const parts = value.split(":")
      let hours = parseInt(parts[0], 10)
      const minutes = parts[1] || "00"

      if (hours === 0) {
        setTime12("12:" + minutes)
        setAmPm("AM")
      } else if (hours < 12) {
        setTime12(`${String(hours).padStart(2, "0")}:${minutes}`)
        setAmPm("AM")
      } else if (hours === 12) {
        setTime12(`12:${minutes}`)
        setAmPm("PM")
      } else {
        setTime12(`${String(hours - 12).padStart(2, "0")}:${minutes}`)
        setAmPm("PM")
      }
    }
  }

  const timeChart = [
    { hour24: "00:00", hour12: "12:00 AM", period: "Midnight" },
    { hour24: "01:00", hour12: "1:00 AM", period: "Early Morning" },
    { hour24: "02:00", hour12: "2:00 AM", period: "Night" },
    { hour24: "03:00", hour12: "3:00 AM", period: "Night" },
    { hour24: "04:00", hour12: "4:00 AM", period: "Early Morning" },
    { hour24: "05:00", hour12: "5:00 AM", period: "Dawn" },
    { hour24: "06:00", hour12: "6:00 AM", period: "Morning" },
    { hour24: "07:00", hour12: "7:00 AM", period: "Morning" },
    { hour24: "08:00", hour12: "8:00 AM", period: "Morning" },
    { hour24: "09:00", hour12: "9:00 AM", period: "Morning" },
    { hour24: "10:00", hour12: "10:00 AM", period: "Late Morning" },
    { hour24: "11:00", hour12: "11:00 AM", period: "Late Morning" },
    { hour24: "12:00", hour12: "12:00 PM", period: "Noon" },
    { hour24: "13:00", hour12: "1:00 PM", period: "Afternoon" },
    { hour24: "14:00", hour12: "2:00 PM", period: "Afternoon" },
    { hour24: "15:00", hour12: "3:00 PM", period: "Afternoon" },
    { hour24: "16:00", hour12: "4:00 PM", period: "Late Afternoon" },
    { hour24: "17:00", hour12: "5:00 PM", period: "Evening" },
    { hour24: "18:00", hour12: "6:00 PM", period: "Evening" },
    { hour24: "19:00", hour12: "7:00 PM", period: "Evening" },
    { hour24: "20:00", hour12: "8:00 PM", period: "Night" },
    { hour24: "21:00", hour12: "9:00 PM", period: "Night" },
    { hour24: "22:00", hour12: "10:00 PM", period: "Night" },
    { hour24: "23:00", hour12: "11:00 PM", period: "Late Night" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Military Time Converter (24-Hour Clock)</h2>
        <p className="text-muted-foreground">
          Convert between 12-hour AM/PM and 24-hour military time format. Used by military, hospitals, and internationally.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Sun className="size-5 text-amber-500" />
            <h3 className="font-semibold">12-Hour Format (Standard)</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="time"
                value={time12}
                onChange={(e) => setTime12(e.target.value)}
                className="flex-1"
              />
              <select
                value={ampm}
                onChange={(e) => setAmPm(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            <div className="rounded-lg border bg-background p-4 space-y-2">
              <p className="text-sm text-muted-foreground">Converts to (24-Hour)</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold font-mono">{conversion.from12to24}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(conversion.from12to24, "24from12")}
                >
                  {copied === "24from12" ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Moon className="size-5 text-indigo-500" />
            <h3 className="font-semibold">24-Hour Format (Military)</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={time24}
                onChange={(e) => handle24HourChange(e.target.value)}
                placeholder="HH:MM (e.g., 14:30)"
                className="flex-1 font-mono"
                maxLength={5}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter time in 24-hour format (00:00 - 23:59)
            </p>

            {conversion.from24to12 && (
              <div className="rounded-lg border bg-background p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Converts to (12-Hour)</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold font-mono">{conversion.from24to12}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(conversion.from24to12, "12from24")}
                  >
                    {copied === "12from24" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-background p-4 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Clock className="size-5" />
          Quick Reference Chart
        </h3>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {timeChart.map((row) => (
              <div
                key={row.hour24}
                className="rounded-lg border bg-muted/30 p-3 text-center space-y-1"
              >
                <p className="text-xs text-muted-foreground">{row.period}</p>
                <p className="font-mono font-bold">{row.hour24}</p>
                <p className="text-sm">{row.hour12}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
          <h3 className="font-semibold">Conversion Rules</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-mono bg-muted px-1 rounded">00:00</span>
              <span>= Midnight (12:00 AM)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono bg-muted px-1 rounded">01:00-11:59</span>
              <span>= Same as AM (1:00-11:59 AM)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono bg-muted px-1 rounded">12:00</span>
              <span>= Noon (12:00 PM)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono bg-muted px-1 rounded">13:00-23:59</span>
              <span>= Subtract 12 for PM (1:00-11:59 PM)</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
          <h3 className="font-semibold">Where Military Time is Used</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Military and armed forces worldwide</li>
            <li>Hospitals and healthcare facilities</li>
            <li>Aviation and air traffic control</li>
            <li>Emergency services (police, fire)</li>
            <li>Public transportation schedules</li>
            <li>Most countries outside the US</li>
            <li>Scientific and technical fields</li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg border bg-background p-4 space-y-2">
        <h3 className="font-semibold">Benefits of 24-Hour Time</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">No Ambiguity</p>
            <p className="text-xs text-muted-foreground">
              Eliminates confusion between AM and PM
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">International Standard</p>
            <p className="text-xs text-muted-foreground">
              Used worldwide for clear communication
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Error Prevention</p>
            <p className="text-xs text-muted-foreground">
              Reduces mistakes in critical situations
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

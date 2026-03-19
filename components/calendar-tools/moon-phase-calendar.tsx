"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Moon, Sun } from "lucide-react"

const MOON_PHASES = [
  { name: "New Moon", icon: "🌑", illumination: 0 },
  { name: "Waxing Crescent", icon: "🌒", illumination: 0.25 },
  { name: "First Quarter", icon: "🌓", illumination: 0.5 },
  { name: "Waxing Gibbous", icon: "🌔", illumination: 0.75 },
  { name: "Full Moon", icon: "🌕", illumination: 1 },
  { name: "Waning Gibbous", icon: "🌖", illumination: 0.75 },
  { name: "Last Quarter", icon: "🌗", illumination: 0.5 },
  { name: "Waning Crescent", icon: "🌘", illumination: 0.25 },
]

export default function MoonPhaseCalendar() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [latitude, setLatitude] = useState<string>("40.7128")
  const [copied, setCopied] = useState<string | null>(null)

  const getMoonPhase = useCallback((date: Date) => {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    const day = date.getDate()

    // Calculate moon phase using a simplified algorithm
    let c: number
    let e: number
    let jd: number
    let b: number

    if (month < 3) {
      year--
      month += 12
    }

    ++month

    c = 365.25 * year
    e = 30.6 * month
    jd = c + e + day - 694039.09
    jd /= 29.5305882
    b = parseInt(String(jd))
    jd -= b
    b = Math.round(jd * 8)

    if (b >= 8) b = 0

    return MOON_PHASES[b]
  }, [])

  const getMoonAge = useCallback((date: Date) => {
    const knownNewMoon = new Date("2000-01-06")
    const synodicMonth = 29.53058867
    const daysSince = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24)
    const moonAge = daysSince % synodicMonth
    return Math.abs(moonAge)
  }, [])

  const currentMoonPhase = useMemo(() => {
    return getMoonPhase(new Date())
  }, [getMoonPhase])

  const currentMoonAge = useMemo(() => {
    return getMoonAge(new Date())
  }, [getMoonAge])

  const selectedMoonPhase = useMemo(() => {
    if (!selectedDate) return null
    return getMoonPhase(new Date(selectedDate))
  }, [selectedDate, getMoonPhase])

  const selectedMoonAge = useMemo(() => {
    if (!selectedDate) return null
    return getMoonAge(new Date(selectedDate))
  }, [selectedDate, getMoonAge])

  const monthPhases = useMemo(() => {
    const phases: { date: Date; phase: typeof MOON_PHASES[0]; age: number }[] = []
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(selectedYear, selectedMonth, d)
      phases.push({
        date,
        phase: getMoonPhase(date),
        age: getMoonAge(date),
      })
    }

    return phases
  }, [selectedYear, selectedMonth, getMoonPhase, getMoonAge])

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
    setSelectedDate("")
  }, [])

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const getMoonEmoji = (illumination: number) => {
    if (illumination === 0) return "🌑"
    if (illumination < 0.5) return "🌒"
    if (illumination === 0.5) return "🌓"
    if (illumination < 1) return "🌔"
    return "🌕"
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Configuration */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
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
            <Label htmlFor="month">Month</Label>
            <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
              <SelectTrigger id="month">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((m, i) => (
                  <SelectItem key={m} value={i.toString()}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude (optional)</Label>
            <Input
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="40.7128"
            />
          </div>
        </div>
      </section>

      {/* Current Moon Phase */}
      <section className="rounded-lg border bg-muted/30 p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-6xl">{currentMoonPhase.icon}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Moon Phase</p>
            <p className="text-2xl font-bold">{currentMoonPhase.name}</p>
            <p className="text-muted-foreground">
              Moon age: {currentMoonAge.toFixed(1)} days
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Moon className="size-5 text-muted-foreground" />
            <div className="w-48 h-4 rounded-full bg-gradient-to-r from-gray-900 via-gray-400 to-gray-900 overflow-hidden">
              <div
                className="h-full bg-white/50"
                style={{ width: `${currentMoonPhase.illumination * 100}%` }}
              />
            </div>
            <Sun className="size-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Date Checker */}
      <section className="space-y-3">
        <Label htmlFor="check-date">Check Moon Phase for Date</Label>
        <div className="flex gap-2">
          <Input
            id="check-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1"
          />
          {selectedMoonPhase && (
            <Button
              variant="outline"
              onClick={() => copyToClipboard(
                `${selectedDate}: ${selectedMoonPhase.name} (Age: ${selectedMoonAge?.toFixed(1)} days)`,
                "phase"
              )}
            >
              {copied === "phase" ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span className="ml-1">Copy</span>
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={handleClear}>
            <Trash2 className="size-4" />
          </Button>
        </div>
        {selectedMoonPhase && (
          <div className="rounded-lg border bg-background p-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{selectedMoonPhase.icon}</span>
              <div>
                <p className="font-semibold">{selectedMoonPhase.name}</p>
                <p className="text-sm text-muted-foreground">
                  Moon age: {selectedMoonAge?.toFixed(1)} days
                </p>
                <p className="text-sm text-muted-foreground">
                  Illumination: {(selectedMoonPhase.illumination * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Month Calendar */}
      <section className="space-y-3">
        <Label className="text-base font-medium">
          Moon Phases for {months[selectedMonth]} {selectedYear}
        </Label>
        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="grid grid-cols-7 bg-muted">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: new Date(selectedYear, selectedMonth, 1).getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2 min-h-20 bg-muted/30" />
            ))}
            {monthPhases.map((item, idx) => (
              <div
                key={idx}
                className="p-2 min-h-20 border-t border-r last:border-r-0 text-center cursor-pointer hover:bg-muted"
                onClick={() => setSelectedDate(item.date.toISOString().split("T")[0])}
              >
                <span className="text-sm font-medium">{item.date.getDate()}</span>
                <div className="text-2xl mt-1">{item.phase.icon}</div>
                <span className="text-xs text-muted-foreground">{item.phase.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase Legend */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="font-medium mb-3">Moon Phases</h4>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {MOON_PHASES.map((phase) => (
            <div key={phase.name} className="text-center">
              <div className="text-3xl">{phase.icon}</div>
              <p className="text-xs text-muted-foreground mt-1">{phase.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Moon Phases</h4>
            <p className="text-sm text-muted-foreground">
              The Moon completes a cycle of phases approximately every 29.5 days (synodic month).
              The phases are caused by the changing angles between the Sun, Earth, and Moon.
              A full lunar cycle includes: New Moon, Waxing Crescent, First Quarter, Waxing Gibbous,
              Full Moon, Waning Gibbous, Last Quarter, and Waning Crescent.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

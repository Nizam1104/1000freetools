"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Search,
  Calendar as CalendarIcon,
  Clock,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MoonPhase {
  phase: string
  illumination: number
  age: number
  distance: number
  angularDiameter: number
  moonrise: string
  moonset: string
  zodiacSign: string
  emoji: string
}

interface MoonEvent {
  type: "new" | "first-quarter" | "full" | "last-quarter"
  date: Date
  name: string
}

const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

const MOON_PHASES = [
  { name: "New Moon", value: 0, emoji: "🌑" },
  { name: "Waxing Crescent", value: 0.125, emoji: "🌒" },
  { name: "First Quarter", value: 0.25, emoji: "🌓" },
  { name: "Waxing Gibbous", value: 0.375, emoji: "🌔" },
  { name: "Full Moon", value: 0.5, emoji: "🌕" },
  { name: "Waning Gibbous", value: 0.625, emoji: "🌖" },
  { name: "Last Quarter", value: 0.75, emoji: "🌗" },
  { name: "Waning Crescent", value: 0.875, emoji: "🌘" },
]

// Calculate moon phase using a simplified algorithm
function getMoonPhase(date: Date): MoonPhase {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // Calculate the Julian Date
  let jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day - 1524.5
  if (month <= 2) {
    jd = Math.floor(365.25 * (year + 4715)) + Math.floor(30.6001 * (month + 13)) + day - 1524.5
  }

  // Known new moon reference (January 6, 2000)
  const knownNewMoon = 2451550.1
  const synodicMonth = 29.53058867

  // Days since known new moon
  const daysSinceNewMoon = jd - knownNewMoon
  const lunarCycles = daysSinceNewMoon / synodicMonth
  const currentCycle = lunarCycles - Math.floor(lunarCycles)

  // Moon age in days
  const age = currentCycle * synodicMonth

  // Find the closest phase
  let phaseIndex = Math.round(currentCycle * 8) % 8
  if (phaseIndex < 0) phaseIndex += 8

  // Illumination (approximate)
  const illumination = (1 - Math.cos(2 * Math.PI * currentCycle)) / 2 * 100

  // Distance (approximate, varies between 356,500 and 406,700 km)
  const meanDistance = 384400
  const distanceVariation = 25100
  const distance = meanDistance + distanceVariation * Math.cos(2 * Math.PI * (daysSinceNewMoon / 27.55))

  // Angular diameter (approximate)
  const angularDiameter = 0.5181 * (meanDistance / distance)

  // Zodiac sign (approximate, based on ecliptic longitude)
  const zodiacIndex = Math.floor((currentCycle * 12 + year + month + day) % 12)
  const zodiacSign = ZODIAC_SIGNS[Math.abs(zodiacIndex)]

  // Moonrise and moonset (approximate)
  const moonriseHour = Math.floor((age / synodicMonth) * 24) % 24
  const moonriseMinute = Math.floor(((age / synodicMonth) * 24 % 1) * 60)
  const moonsetHour = (moonriseHour + 12) % 24
  const moonsetMinute = moonriseMinute

  const formatTime = (h: number, m: number) => {
    const ampm = h >= 12 ? "PM" : "AM"
    const hour12 = h % 12 || 12
    return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`
  }

  return {
    phase: MOON_PHASES[phaseIndex].name,
    illumination: Math.round(illumination * 100) / 100,
    age: Math.round(age * 100) / 100,
    distance: Math.round(distance),
    angularDiameter: Math.round(angularDiameter * 1000) / 1000,
    moonrise: formatTime(moonriseHour, moonriseMinute),
    moonset: formatTime(moonsetHour, moonsetMinute),
    zodiacSign,
    emoji: MOON_PHASES[phaseIndex].emoji,
  }
}

function findMoonEvents(year: number): MoonEvent[] {
  const events: MoonEvent[] = []
  const knownNewMoon = new Date(2000, 0, 6, 18, 14)
  const synodicMonth = 29.53058867

  // Start from known new moon and find all events in the given year
  let currentDate = new Date(knownNewMoon)
  let phase = 0 // 0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter

  while (currentDate.getFullYear() <= year + 1) {
    if (currentDate.getFullYear() === year) {
      const phaseNames: Record<number, { type: MoonEvent["type"]; name: string }> = {
        0: { type: "new", name: "New Moon" },
        0.25: { type: "first-quarter", name: "First Quarter" },
        0.5: { type: "full", name: "Full Moon" },
        0.75: { type: "last-quarter", name: "Last Quarter" },
      }
      const event = phaseNames[phase]
      if (event) {
        events.push({
          type: event.type,
          date: new Date(currentDate),
          name: event.name,
        })
      }
    }

    // Move to next phase (approximately 7.4 days)
    currentDate = new Date(currentDate.getTime() + synodicMonth * 24 * 60 * 60 * 1000 / 4)
    phase = (phase + 0.25) % 1
  }

  return events.sort((a, b) => a.date.getTime() - b.date.getTime())
}

function findNextMoonEvent(fromDate: Date, eventType: MoonEvent["type"]): Date {
  const year = fromDate.getFullYear()
  const events = findMoonEvents(year)
  const nextYearEvents = findMoonEvents(year + 1)
  const allEvents = [...events, ...nextYearEvents]

  const event = allEvents.find(e => e.type === eventType && e.date > fromDate)
  return event ? event.date : fromDate
}

export default function MoonPhaseCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [searchEventType, setSearchEventType] = useState<MoonEvent["type"]>("full")
  const [searchResult, setSearchResult] = useState<Date | null>(null)

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const moonPhaseData = useMemo(() => getMoonPhase(selectedDate), [selectedDate])

  const currentMonthPhases = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const phases: { day: number; phase: MoonPhase }[] = []
    for (let day = 1; day <= daysInMonth; day++) {
      phases.push({
        day,
        phase: getMoonPhase(new Date(year, month, day)),
      })
    }
    return phases
  }, [currentDate])

  const yearMoonEvents = useMemo(() => findMoonEvents(currentDate.getFullYear()), [currentDate])

  const handleSearch = useCallback(() => {
    const result = findNextMoonEvent(new Date(), searchEventType)
    setSearchResult(result)
  }, [searchEventType])

  const navigateMonth = useCallback((direction: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + direction)
      return newDate
    })
  }, [])

  const goToToday = useCallback(() => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }, [])

  const getPhaseForDay = useCallback((day: number) => {
    return currentMonthPhases.find(p => p.day === day)?.phase
  }, [currentMonthPhases])

  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }, [firstDay, daysInMonth])

  const isToday = useCallback((day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }, [currentDate])

  const isSelected = useCallback((day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    )
  }, [currentDate, selectedDate])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Current Moon Phase Display */}
      <Card className="bg-gradient-to-r from-indigo-950 to-slate-900 text-white">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="text-8xl">{moonPhaseData.emoji}</div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/60">
                {moonPhaseData.illumination.toFixed(1)}% illuminated
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">{moonPhaseData.phase}</h2>
              <p className="text-white/70 mt-1">
                {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-xs text-white/60">Moon Age</div>
                  <div className="font-semibold">{moonPhaseData.age} days</div>
                </div>
                <div>
                  <div className="text-xs text-white/60">Distance</div>
                  <div className="font-semibold">{moonPhaseData.distance.toLocaleString()} km</div>
                </div>
                <div>
                  <div className="text-xs text-white/60">Moonrise</div>
                  <div className="font-semibold">{moonPhaseData.moonrise}</div>
                </div>
                <div>
                  <div className="text-xs text-white/60">Moonset</div>
                  <div className="font-semibold">{moonPhaseData.moonset}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation and Calendar */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                  <ChevronLeft className="size-4" />
                </Button>
                <div className="text-center min-w-32">
                  <div className="font-semibold">{months[currentDate.getMonth()]}</div>
                  <div className="text-sm text-muted-foreground">{currentDate.getFullYear()}</div>
                </div>
                <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                  <ChevronRight className="size-4" />
                </Button>
              </div>
              <Button variant="secondary" onClick={goToToday} size="sm">
                Today
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-7 bg-muted/50">
                {dayHeaders.map((day) => (
                  <div
                    key={day}
                    className="py-2 text-center text-xs font-semibold text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => {
                  const phase = day ? getPhaseForDay(day) : null
                  const today = day ? isToday(day) : false
                  const selected = day ? isSelected(day) : false

                  return (
                    <button
                      key={index}
                      onClick={() => day && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                      className={cn(
                        "min-h-20 p-1 text-center border-t border-r transition-colors hover:bg-muted/30",
                        !day && "bg-muted/10",
                        today && "bg-blue-50 dark:bg-blue-900/20",
                        selected && "ring-2 ring-primary ring-inset"
                      )}
                    >
                      {day && (
                        <>
                          <div
                            className={cn(
                              "size-6 mx-auto flex items-center justify-center rounded-full text-xs font-medium",
                              today && "bg-blue-500 text-white"
                            )}
                          >
                            {day}
                          </div>
                          {phase && (
                            <div className="text-lg mt-0.5">{phase.emoji}</div>
                          )}
                        </>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Moon Details Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="size-5" />
              Moon Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Phase</span>
                <span className="font-medium">{moonPhaseData.phase}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Illumination</span>
                <span className="font-medium">{moonPhaseData.illumination.toFixed(2)}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Moon Age</span>
                <span className="font-medium">{moonPhaseData.age} days</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Distance from Earth</span>
                <span className="font-medium">{moonPhaseData.distance.toLocaleString()} km</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Angular Diameter</span>
                <span className="font-medium">{moonPhaseData.angularDiameter}°</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Zodiac Sign</span>
                <Badge variant="secondary">{moonPhaseData.zodiacSign}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3" /> Moonrise
                </span>
                <span className="font-medium">{moonPhaseData.moonrise}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3" /> Moonset
                </span>
                <span className="font-medium">{moonPhaseData.moonset}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Events */}
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Find Moon Events</TabsTrigger>
          <TabsTrigger value="events">Year Events</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="size-5" />
                Search for Moon Events
              </CardTitle>
              <CardDescription>
                Find the next occurrence of specific moon phases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-48 space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select
                    value={searchEventType}
                    onValueChange={(v) => setSearchEventType(v as MoonEvent["type"])}
                  >
                    <SelectTrigger id="event-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Moon</SelectItem>
                      <SelectItem value="full">Full Moon</SelectItem>
                      <SelectItem value="first-quarter">First Quarter</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} className="gap-2">
                    <Search className="size-4" />
                    Find Next
                  </Button>
                </div>
              </div>

              {searchResult && (
                <div className="rounded-lg border bg-primary/10 p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Next {MOON_PHASES.find(p =>
                      p.name.toLowerCase().replace(" ", "-") === searchEventType
                    )?.name || searchEventType}
                  </p>
                  <p className="text-2xl font-bold">
                    {searchResult.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    In {Math.ceil((searchResult.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="size-5" />
                    Moon Events {currentDate.getFullYear()}
                  </CardTitle>
                  <CardDescription>
                    All major moon phases for the year
                  </CardDescription>
                </div>
                <Select
                  value={currentDate.getFullYear().toString()}
                  onValueChange={(v) => setCurrentDate(new Date(parseInt(v), 0, 1))}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i).map((y) => (
                      <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {yearMoonEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">
                          {event.type === "new" && "🌑"}
                          {event.type === "first-quarter" && "🌓"}
                          {event.type === "full" && "🌕"}
                          {event.type === "last-quarter" && "🌗"}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{event.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.date.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {event.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Moon Phase Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="size-5" />
            About Moon Phases
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            The Moon goes through a complete cycle of phases approximately every 29.5 days,
            known as a synodic month. The phases are caused by the changing angles between
            the Earth, Moon, and Sun.
          </p>
          <div className="grid sm:grid-cols-4 gap-4 pt-2">
            {MOON_PHASES.map((phase) => (
              <div key={phase.value} className="text-center p-3 rounded-lg bg-muted/30">
                <div className="text-3xl mb-1">{phase.emoji}</div>
                <div className="font-medium text-xs">{phase.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

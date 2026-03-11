"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  Leaf,
  Thermometer,
  Clock,
  MapPin,
  Search,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AstronomicalEvent {
  name: string
  date: Date
  type: "equinox" | "solstice" | "meteor-shower" | "eclipse" | "other"
  description: string
  icon: React.ReactNode
}

interface SeasonInfo {
  name: string
  startDate: Date
  endDate: Date
  description: string
  icon: React.ReactNode
  color: string
}

interface DaylightInfo {
  date: Date
  sunrise: string
  sunset: string
  daylightHours: number
  goldenHour: { morning: string; evening: string }
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

// Calculate seasons for Northern Hemisphere
function getSeasonDates(year: number): SeasonInfo[] {
  return [
    {
      name: "Spring",
      startDate: new Date(year, 2, 20), // March 20
      endDate: new Date(year, 5, 20), // June 20
      description: "Spring begins with the vernal equinox. Days grow longer, flowers bloom, and nature awakens.",
      icon: <Leaf className="size-5" />,
      color: "text-green-500",
    },
    {
      name: "Summer",
      startDate: new Date(year, 5, 20), // June 20
      endDate: new Date(year, 8, 22), // September 22
      description: "Summer begins with the summer solstice, the longest day of the year. Warm weather and outdoor activities.",
      icon: <Sun className="size-5" />,
      color: "text-orange-500",
    },
    {
      name: "Fall",
      startDate: new Date(year, 8, 22), // September 22
      endDate: new Date(year, 11, 21), // December 21
      description: "Fall begins with the autumnal equinox. Leaves change color, harvest season, and days grow shorter.",
      icon: <Leaf className="size-5" />,
      color: "text-amber-500",
    },
    {
      name: "Winter",
      startDate: new Date(year, 11, 21), // December 21
      endDate: new Date(year + 1, 2, 20), // March 20
      description: "Winter begins with the winter solstice, the shortest day of the year. Cold weather and holiday season.",
      icon: <Snowflake className="size-5" />,
      color: "text-blue-500",
    },
  ]
}

function getAstronomicalEvents(year: number): AstronomicalEvent[] {
  return [
    {
      name: "Vernal Equinox",
      date: new Date(year, 2, 20),
      type: "equinox",
      description: "Day and night are approximately equal. Marks the beginning of spring in the Northern Hemisphere.",
      icon: <Sun className="size-5" />,
    },
    {
      name: "Summer Solstice",
      date: new Date(year, 5, 20),
      type: "solstice",
      description: "The longest day of the year. The Sun reaches its highest point in the sky.",
      icon: <Sun className="size-5" />,
    },
    {
      name: "Autumnal Equinox",
      date: new Date(year, 8, 22),
      type: "equinox",
      description: "Day and night are approximately equal. Marks the beginning of fall in the Northern Hemisphere.",
      icon: <Leaf className="size-5" />,
    },
    {
      name: "Winter Solstice",
      date: new Date(year, 11, 21),
      type: "solstice",
      description: "The shortest day of the year. The Sun reaches its lowest point in the sky.",
      icon: <Snowflake className="size-5" />,
    },
    {
      name: "Perseid Meteor Shower",
      date: new Date(year, 7, 12),
      type: "meteor-shower",
      description: "One of the best meteor showers, peaking around August 12-13. Up to 60 meteors per hour.",
      icon: <Star className="size-5" />,
    },
    {
      name: "Geminid Meteor Shower",
      date: new Date(year, 11, 14),
      type: "meteor-shower",
      description: "The best meteor shower of the year, peaking around December 14. Up to 120 meteors per hour.",
      icon: <Star className="size-5" />,
    },
    {
      name: "Quadrantid Meteor Shower",
      date: new Date(year, 0, 4),
      type: "meteor-shower",
      description: "Early January meteor shower, peaking around January 4. Up to 80 meteors per hour.",
      icon: <Star className="size-5" />,
    },
    {
      name: "Lyrid Meteor Shower",
      date: new Date(year, 3, 22),
      type: "meteor-shower",
      description: "Spring meteor shower, peaking around April 22. About 20 meteors per hour.",
      icon: <Star className="size-5" />,
    },
  ]
}

// Approximate sunrise/sunset calculation
function getDaylightInfo(date: Date, latitude: number = 40): DaylightInfo {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  
  // Simplified calculation
  const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * (Math.PI / 180))
  const latRad = latitude * (Math.PI / 180)
  const decRad = declination * (Math.PI / 180)
  
  const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(decRad)) * (180 / Math.PI)
  const daylightHours = (hourAngle * 2) / 15
  
  // Solar noon is approximately 12:00
  const sunriseHour = 12 - hourAngle / 15
  const sunsetHour = 12 + hourAngle / 15
  
  const formatTime = (hour: number) => {
    const h = Math.floor(hour)
    const m = Math.floor((hour - h) * 60)
    const ampm = h >= 12 ? "PM" : "AM"
    const hour12 = h % 12 || 12
    return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`
  }
  
  return {
    date,
    sunrise: formatTime(sunriseHour),
    sunset: formatTime(sunsetHour),
    daylightHours: Math.round(daylightHours * 100) / 100,
    goldenHour: {
      morning: formatTime(sunriseHour + 1),
      evening: formatTime(sunsetHour - 1),
    },
  }
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

export default function SeasonalCalendar() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [latitude, setLatitude] = useState("40")
  const [hemisphere, setHemisphere] = useState<"north" | "south">("north")

  const seasonDates = useMemo(() => getSeasonDates(selectedYear), [selectedYear])
  const astronomicalEvents = useMemo(() => getAstronomicalEvents(selectedYear), [selectedYear])
  const daylightInfo = useMemo(() => getDaylightInfo(selectedDate, parseFloat(latitude) || 40), [selectedDate, latitude])

  const getCurrentSeason = useCallback((date: Date) => {
    const seasons = getSeasonDates(date.getFullYear())
    for (const season of seasons) {
      if (date >= season.startDate && date < season.endDate) {
        return season
      }
    }
    return seasons[3] // Winter
  }, [])

  const currentSeason = useMemo(() => getCurrentSeason(selectedDate), [selectedDate, getCurrentSeason])

  const getEventsForMonth = useCallback((year: number, month: number) => {
    return astronomicalEvents.filter(event => {
      return event.date.getFullYear() === year && event.date.getMonth() === month
    })
  }, [astronomicalEvents])

  const navigateMonth = useCallback((direction: number) => {
    setSelectedMonth(prev => {
      let newMonth = prev + direction
      let newYear = selectedYear

      if (newMonth < 0) {
        newMonth = 11
        newYear--
      } else if (newMonth > 11) {
        newMonth = 0
        newYear++
      }

      setSelectedYear(newYear)
      return newMonth
    })
  }, [selectedYear])

  const goToToday = useCallback(() => {
    const today = new Date()
    setSelectedYear(today.getFullYear())
    setSelectedMonth(today.getMonth())
    setSelectedDate(today)
  }, [])

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay()

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

  const monthEvents = useMemo(() => getEventsForMonth(selectedYear, selectedMonth), [getEventsForMonth, selectedYear, selectedMonth])

  const isToday = useCallback((day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear()
    )
  }, [selectedMonth, selectedYear])

  const isSelected = useCallback((day: number) => {
    return (
      day === selectedDate.getDate() &&
      selectedMonth === selectedDate.getMonth() &&
      selectedYear === selectedDate.getFullYear()
    )
  }, [selectedDate, selectedMonth, selectedYear])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Current Season Display */}
      <Card className={cn("border-0 bg-gradient-to-br", 
        currentSeason.name === "Spring" && "from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-900/30",
        currentSeason.name === "Summer" && "from-orange-100 to-yellow-200 dark:from-orange-900/30 dark:to-yellow-900/30",
        currentSeason.name === "Fall" && "from-amber-100 to-orange-200 dark:from-amber-900/30 dark:to-orange-900/30",
        currentSeason.name === "Winter" && "from-blue-100 to-slate-200 dark:from-blue-900/30 dark:to-slate-900/30",
      )}>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className={cn("p-4 rounded-full bg-white/50 dark:bg-slate-800/50", currentSeason.color)}>
              {currentSeason.icon}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold">{currentSeason.name}</h2>
              <p className="text-muted-foreground mt-1">{currentSeason.description}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span className="text-sm">
                    Starts: {currentSeason.startDate.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4" />
                  <span className="text-sm">
                    {daylightInfo.daylightHours} hours of daylight today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="size-5" />
            Location Settings
          </CardTitle>
          <CardDescription>
            Set your location for accurate sunrise/sunset times
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                min="-90"
                max="90"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="40.7128"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hemisphere">Hemisphere</Label>
              <Select value={hemisphere} onValueChange={(v) => setHemisphere(v as typeof hemisphere)}>
                <SelectTrigger id="hemisphere">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">Northern Hemisphere</SelectItem>
                  <SelectItem value="south">Southern Hemisphere</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={goToToday} variant="outline" className="w-full">
                Go to Today
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar and Daylight Info */}
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
                  <div className="font-semibold">{MONTHS[selectedMonth]}</div>
                  <div className="text-sm text-muted-foreground">{selectedYear}</div>
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
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="py-2 text-center text-xs font-semibold text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => {
                  const today = day ? isToday(day) : false
                  const selected = day ? isSelected(day) : false
                  const date = day ? new Date(selectedYear, selectedMonth, day) : null
                  const hasEvent = date && astronomicalEvents.some(e => 
                    e.date.getDate() === day && e.date.getMonth() === selectedMonth && e.date.getFullYear() === selectedYear
                  )

                  return (
                    <button
                      key={index}
                      onClick={() => day && setSelectedDate(new Date(selectedYear, selectedMonth, day))}
                      className={cn(
                        "min-h-20 p-2 text-center border-t border-r transition-colors hover:bg-muted/30",
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
                          {hasEvent && (
                            <div className="mt-1 flex justify-center gap-0.5">
                              <div className="size-1.5 rounded-full bg-amber-500" />
                            </div>
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

        {/* Daylight Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="size-5" />
              Daylight Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">
                {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 text-center">
                <Sun className="size-6 mx-auto mb-2 text-orange-500" />
                <div className="text-xs text-muted-foreground">Sunrise</div>
                <div className="font-semibold">{daylightInfo.sunrise}</div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-center">
                <Sun className="size-6 mx-auto mb-2 text-purple-500" />
                <div className="text-xs text-muted-foreground">Sunset</div>
                <div className="font-semibold">{daylightInfo.sunset}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm text-muted-foreground">Daylight Hours</span>
                <Badge variant="secondary">{daylightInfo.daylightHours}h</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm text-muted-foreground">Morning Golden Hour</span>
                <Badge variant="outline">{daylightInfo.goldenHour.morning}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm text-muted-foreground">Evening Golden Hour</span>
                <Badge variant="outline">{daylightInfo.goldenHour.evening}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events and Seasons */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">Astronomical Events</TabsTrigger>
          <TabsTrigger value="seasons">Seasons</TabsTrigger>
          <TabsTrigger value="daylight">Daylight Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="size-5" />
                Astronomical Events {selectedYear}
              </CardTitle>
              <CardDescription>
                Equinoxes, solstices, meteor showers, and eclipses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-3">
                  {astronomicalEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {event.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{event.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {event.date.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seasons {selectedYear}</CardTitle>
              <CardDescription>
                Start and end dates for each season
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {seasonDates.map((season, index) => (
                  <div
                    key={season.name}
                    className={cn(
                      "p-4 rounded-lg border-2",
                      season.name === "Spring" && "border-green-500 bg-green-50 dark:bg-green-900/20",
                      season.name === "Summer" && "border-orange-500 bg-orange-50 dark:bg-orange-900/20",
                      season.name === "Fall" && "border-amber-500 bg-amber-50 dark:bg-amber-900/20",
                      season.name === "Winter" && "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={season.color}>{season.icon}</div>
                      <h4 className="font-semibold">{season.name}</h4>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Starts: {season.startDate.toLocaleDateString()}</div>
                      <div>Ends: {season.endDate.toLocaleDateString()}</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{season.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daylight" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daylight Hours Throughout the Year</CardTitle>
              <CardDescription>
                How daylight changes over the seasons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MONTHS.map((month, index) => {
                  const date = new Date(selectedYear, index, 15)
                  const info = getDaylightInfo(date, parseFloat(latitude) || 40)
                  const maxHours = 16
                  const percentage = (info.daylightHours / maxHours) * 100

                  return (
                    <div key={month} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="w-20">{month}</span>
                        <div className="flex-1 mx-4">
                          <div className="h-4 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-yellow-400 transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                        <span className="w-16 text-right text-muted-foreground">
                          {info.daylightHours}h
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  )
}

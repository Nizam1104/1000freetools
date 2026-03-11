"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  History,
  Search,
  Info,
  Star,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface HistoricalEvent {
  date: string
  year: number
  title: string
  description: string
  category: "political" | "scientific" | "cultural" | "sports" | "other"
}

const HISTORICAL_EVENTS: HistoricalEvent[] = [
  { date: "01-01", year: 1863, title: "Emancipation Proclamation", description: "President Abraham Lincoln issued the Emancipation Proclamation, declaring all slaves in Confederate states to be free.", category: "political" },
  { date: "01-04", year: 1957, title: "Sputnik 1 Burns Up", description: "The first artificial satellite to orbit Earth burned up in the atmosphere.", category: "scientific" },
  { date: "02-14", year: 1929, title: "St. Valentine's Day Massacre", description: "Seven people were gunned down in a Chicago garage, marking a turning point in the public perception of organized crime.", category: "other" },
  { date: "02-20", year: 1962, title: "John Glenn Orbits Earth", description: "John Glenn became the first American to orbit the Earth aboard Friendship 7.", category: "scientific" },
  { date: "03-15", year: 44, title: "Assassination of Julius Caesar", description: "Roman dictator Julius Caesar was assassinated by a group of senators on the Ides of March.", category: "political" },
  { date: "04-12", year: 1961, title: "First Human in Space", description: "Yuri Gagarin became the first human to journey into outer space aboard Vostok 1.", category: "scientific" },
  { date: "04-15", year: 1912, title: "Titanic Sinks", description: "The RMS Titanic sank in the North Atlantic Ocean after hitting an iceberg.", category: "other" },
  { date: "05-20", year: 1927, title: "Lindbergh's Transatlantic Flight", description: "Charles Lindbergh began his solo nonstop flight across the Atlantic Ocean.", category: "scientific" },
  { date: "06-06", year: 1944, title: "D-Day Invasion", description: "Allied forces launched the largest amphibious invasion in history on the beaches of Normandy.", category: "political" },
  { date: "07-04", year: 1776, title: "Declaration of Independence", description: "The Continental Congress adopted the Declaration of Independence, announcing the colonies' separation from Great Britain.", category: "political" },
  { date: "07-20", year: 1969, title: "Moon Landing", description: "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon during Apollo 11.", category: "scientific" },
  { date: "08-28", year: 1963, title: "I Have a Dream Speech", description: "Martin Luther King Jr. delivered his famous speech during the March on Washington.", category: "political" },
  { date: "09-11", year: 2001, title: "September 11 Attacks", description: "Terrorist attacks on the World Trade Center and Pentagon changed the course of history.", category: "political" },
  { date: "10-12", year: 1492, title: "Columbus Reaches Americas", description: "Christopher Columbus made landfall in the Bahamas, beginning European exploration of the Americas.", category: "political" },
  { date: "11-09", year: 1989, title: "Berlin Wall Falls", description: "The Berlin Wall was opened, symbolizing the end of the Cold War.", category: "political" },
  { date: "11-22", year: 1963, title: "JFK Assassination", description: "President John F. Kennedy was assassinated in Dallas, Texas.", category: "political" },
  { date: "12-10", year: 1901, title: "First Nobel Prizes Awarded", description: "The first Nobel Prizes were awarded in Stockholm, Sweden.", category: "cultural" },
  { date: "12-17", year: 1903, title: "First Powered Flight", description: "The Wright brothers achieved the first powered, sustained, and controlled airplane flight.", category: "scientific" },
  { date: "12-25", year: 1066, title: "William the Conqueror Crowned", description: "William the Conqueror was crowned King of England at Westminster Abbey.", category: "political" },
]

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function PerpetualCalendar() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [searchYear, setSearchYear] = useState("")
  const [searchMonth, setSearchMonth] = useState("")
  const [searchDay, setSearchDay] = useState("")
  const [searchResult, setSearchResult] = useState<Date | null>(null)

  const getDaysInMonth = useCallback((year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }, [])

  const getFirstDayOfMonth = useCallback((year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }, [])

  const getDayOfWeek = useCallback((year: number, month: number, day: number) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[new Date(year, month, day).getDay()]
  }, [])

  const calendarData = useMemo(() => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth)

    const weeks: (number | null)[][] = []
    let currentWeek: (number | null)[] = []

    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null)
      }
      weeks.push(currentWeek)
    }

    return { weeks, daysInMonth, firstDay }
  }, [selectedYear, selectedMonth, getDaysInMonth, getFirstDayOfMonth])

  const historicalEventsForDate = useMemo(() => {
    if (!selectedDate) return []
    const month = selectedDate.getMonth() + 1
    const day = selectedDate.getDate()
    const dateStr = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    return HISTORICAL_EVENTS.filter(e => e.date === dateStr)
  }, [selectedDate])

  const isToday = useCallback((day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear()
    )
  }, [selectedMonth, selectedYear])

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

  const navigateYear = useCallback((direction: number) => {
    setSelectedYear(prev => {
      const newYear = prev + direction
      if (newYear >= 1900 && newYear <= 2100) {
        return newYear
      }
      return prev
    })
  }, [])

  const goToToday = useCallback(() => {
    const today = new Date()
    setSelectedYear(today.getFullYear())
    setSelectedMonth(today.getMonth())
    setSelectedDate(today)
  }, [])

  const handleSearch = useCallback(() => {
    const year = parseInt(searchYear)
    const month = parseInt(searchMonth) - 1
    const day = parseInt(searchDay)

    if (year && year >= 1900 && year <= 2100 && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
      const result = new Date(year, month, day)
      // Validate the date
      if (result.getDate() === day) {
        setSearchResult(result)
        setSelectedYear(year)
        setSelectedMonth(month)
        setSelectedDate(result)
      }
    }
  }, [searchYear, searchMonth, searchDay])

  const getZodiacSign = useCallback((month: number, day: number) => {
    const zodiacSigns = [
      { name: "Capricorn", endDay: 19 },
      { name: "Aquarius", endDay: 18 },
      { name: "Pisces", endDay: 20 },
      { name: "Aries", endDay: 19 },
      { name: "Taurus", endDay: 20 },
      { name: "Gemini", endDay: 20 },
      { name: "Cancer", endDay: 22 },
      { name: "Leo", endDay: 22 },
      { name: "Virgo", endDay: 22 },
      { name: "Libra", endDay: 22 },
      { name: "Scorpio", endDay: 21 },
      { name: "Sagittarius", endDay: 21 },
      { name: "Capricorn", endDay: 31 },
    ]
    return zodiacSigns[month].endDay >= day ? zodiacSigns[month].name : zodiacSigns[month + 1].name
  }, [])

  const getBirthstone = useCallback((month: number) => {
    const birthstones = [
      "Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl",
      "Ruby", "Peridot", "Sapphire", "Opal", "Topaz", "Turquoise"
    ]
    return birthstones[month]
  }, [])

  const getSeason = useCallback((month: number) => {
    if (month >= 2 && month <= 4) return "Spring"
    if (month >= 5 && month <= 7) return "Summer"
    if (month >= 8 && month <= 10) return "Fall"
    return "Winter"
  }, [])

  const yearRange = useMemo(() => {
    const years = []
    for (let y = 1900; y <= 2100; y += 10) {
      years.push(y)
    }
    return years
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Quick Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="size-5" />
            Find Any Date (1900-2100)
          </CardTitle>
          <CardDescription>
            Search for any date in the 20th or 21st century
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-24 space-y-2">
              <Label htmlFor="search-year">Year</Label>
              <Input
                id="search-year"
                type="number"
                min="1900"
                max="2100"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
                placeholder="YYYY"
              />
            </div>
            <div className="w-32 space-y-2">
              <Label htmlFor="search-month">Month</Label>
              <Select value={searchMonth} onValueChange={setSearchMonth}>
                <SelectTrigger id="search-month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((m, i) => (
                    <SelectItem key={m} value={(i + 1).toString()}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-24 space-y-2">
              <Label htmlFor="search-day">Day</Label>
              <Input
                id="search-day"
                type="number"
                min="1"
                max="31"
                value={searchDay}
                onChange={(e) => setSearchDay(e.target.value)}
                placeholder="Day"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} className="gap-2">
                <Search className="size-4" />
                Find Date
              </Button>
            </div>
          </div>
          {searchResult && (
            <div className="mt-4 p-4 rounded-lg bg-primary/10">
              <p className="font-medium">
                {searchResult.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Calendar */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateYear(-10)}>
                  <ChevronLeft className="size-4" />
                  <span className="sr-only">-10 years</span>
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateYear(-1)}>
                  <ChevronLeft className="size-4" />
                </Button>
                <div className="text-center min-w-48">
                  <div className="text-2xl font-bold">{selectedYear}</div>
                </div>
                <Button variant="outline" size="icon" onClick={() => navigateYear(1)}>
                  <ChevronRight className="size-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateYear(10)}>
                  <ChevronRight className="size-4" />
                  <span className="sr-only">+10 years</span>
                </Button>
              </div>
              <Button variant="secondary" onClick={goToToday} size="sm">
                Today
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Month Selector */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-6">
              {MONTHS.map((month, index) => (
                <Button
                  key={month}
                  variant={selectedMonth === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMonth(index)}
                  className="text-xs"
                >
                  {month.slice(0, 3)}
                </Button>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-7 bg-muted/50">
                {DAY_HEADERS.map((day) => (
                  <div
                    key={day}
                    className="py-3 text-center text-sm font-semibold text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {calendarData.weeks.map((week, weekIndex) => (
                  <React.Fragment key={weekIndex}>
                    {week.map((day, dayIndex) => {
                      const today = day ? isToday(day) : false
                      const selected = selectedDate && day === selectedDate.getDate() &&
                        selectedMonth === selectedDate.getMonth() &&
                        selectedYear === selectedDate.getFullYear()

                      return (
                        <button
                          key={dayIndex}
                          onClick={() => day && setSelectedDate(new Date(selectedYear, selectedMonth, day))}
                          className={cn(
                            "min-h-16 p-2 text-center border-t border-r transition-colors hover:bg-muted/30",
                            !day && "bg-muted/10",
                            today && "bg-blue-50 dark:bg-blue-900/20",
                            selected && "ring-2 ring-primary ring-inset"
                          )}
                        >
                          {day && (
                            <>
                              <div
                                className={cn(
                                  "size-7 mx-auto flex items-center justify-center rounded-full text-sm font-medium",
                                  today && "bg-blue-500 text-white"
                                )}
                              >
                                {day}
                              </div>
                            </>
                          )}
                        </button>
                      )
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Details Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="size-5" />
              Date Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDate ? (
              <>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-4xl font-bold">
                    {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
                  </div>
                  <div className="text-lg text-muted-foreground mt-1">
                    {selectedDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm text-muted-foreground">Day of Year</span>
                    <Badge variant="secondary">
                      {Math.floor((selectedDate.getTime() - new Date(selectedYear, 0, 0).getTime()) / (1000 * 60 * 60 * 24))}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm text-muted-foreground">Week Number</span>
                    <Badge variant="secondary">
                      {Math.ceil((((selectedDate.getTime() - new Date(selectedYear, 0, 1).getTime()) / 86400000) + new Date(selectedYear, 0, 1).getDay() + 1) / 7)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm text-muted-foreground">Season</span>
                    <Badge variant="secondary">{getSeason(selectedDate.getMonth())}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm text-muted-foreground">Zodiac Sign</span>
                    <Badge variant="secondary">{getZodiacSign(selectedDate.getMonth(), selectedDate.getDate())}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm text-muted-foreground">Birthstone</span>
                    <Badge variant="secondary">{getBirthstone(selectedDate.getMonth())}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm text-muted-foreground">Days Until End of Year</span>
                    <Badge variant="secondary">
                      {Math.floor((new Date(selectedYear, 11, 31).getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24))}
                    </Badge>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center">Select a date to see details</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Historical Events */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="events">Historical Events</TabsTrigger>
          <TabsTrigger value="quick-years">Quick Year Select</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="size-5" />
                This Day in History
              </CardTitle>
              <CardDescription>
                {selectedDate
                  ? `Historical events that happened on ${selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`
                  : "Select a date to see historical events"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDate && historicalEventsForDate.length > 0 ? (
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {historicalEventsForDate.map((event, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border bg-muted/30"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{event.year}</span>
                              <Badge
                                variant="outline"
                                className={cn(
                                  event.category === "political" && "border-red-500 text-red-500",
                                  event.category === "scientific" && "border-blue-500 text-blue-500",
                                  event.category === "cultural" && "border-purple-500 text-purple-500",
                                  event.category === "sports" && "border-green-500 text-green-500",
                                )}
                              >
                                {event.category}
                              </Badge>
                            </div>
                            <div className="font-medium mt-1">{event.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">{event.description}</div>
                          </div>
                          <Star className="size-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : selectedDate ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="size-12 mx-auto mb-3 opacity-50" />
                  <p>No recorded historical events for this date</p>
                  <p className="text-sm">Try selecting a different date</p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="size-12 mx-auto mb-3 opacity-50" />
                  <p>Select a date to view historical events</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quick-years" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Year Selection</CardTitle>
              <CardDescription>
                Jump to any decade from 1900 to 2100
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 21 }, (_, i) => 1900 + i * 10).map((decade) => (
                    <div key={decade} className="space-y-1">
                      <div className="text-xs font-medium text-muted-foreground text-center">
                        {decade}s
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {Array.from({ length: 10 }, (_, j) => decade + j).map((year) => (
                          <Button
                            key={year}
                            variant={selectedYear === year ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedYear(year)}
                            className="text-xs h-7"
                          >
                            {year.toString().slice(-2)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            About the Perpetual Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            This perpetual calendar allows you to view any date from 1900 to 2100,
            spanning over 200 years of history. Perfect for:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Finding the day of the week for any historical or future date</li>
            <li>Planning events years in advance</li>
            <li>Researching historical events by date</li>
            <li>Calculating ages, anniversaries, and milestones</li>
            <li>Genealogy and family history research</li>
          </ul>
          <p className="pt-2">
            The calendar uses the Gregorian calendar system, which is the most widely
            used civil calendar in the world today.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

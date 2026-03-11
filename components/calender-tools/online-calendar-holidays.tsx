"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronLeft,
  ChevronRight,
  ChevronLeftCircle,
  ChevronRightCircle,
  Globe,
  Calendar as CalendarIcon,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Holiday {
  name: string
  date: string
  type: "public" | "observance" | "religious"
  countries?: string[]
  description?: string
}

interface CountryHolidays {
  code: string
  name: string
  holidays: Holiday[]
}

const HOLIDAY_DATA: Record<string, CountryHolidays> = {
  US: {
    code: "US",
    name: "United States",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "public", description: "First day of the year" },
      { name: "Martin Luther King Jr. Day", date: "01-15", type: "public", description: "Third Monday of January" },
      { name: "Presidents' Day", date: "02-19", type: "public", description: "Third Monday of February" },
      { name: "Memorial Day", date: "05-27", type: "public", description: "Last Monday of May" },
      { name: "Juneteenth", date: "06-19", type: "public", description: "Commemorates the end of slavery" },
      { name: "Independence Day", date: "07-04", type: "public", description: "US Independence Day" },
      { name: "Labor Day", date: "09-02", type: "public", description: "First Monday of September" },
      { name: "Columbus Day", date: "10-14", type: "public", description: "Second Monday of October" },
      { name: "Veterans Day", date: "11-11", type: "public", description: "Honors military veterans" },
      { name: "Thanksgiving", date: "11-28", type: "public", description: "Fourth Thursday of November" },
      { name: "Christmas Day", date: "12-25", type: "public", description: "Celebration of Christmas" },
    ],
  },
  UK: {
    code: "UK",
    name: "United Kingdom",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "public" },
      { name: "Good Friday", date: "03-29", type: "public", description: "Friday before Easter" },
      { name: "Easter Monday", date: "04-01", type: "public", description: "Monday after Easter" },
      { name: "Early May Bank Holiday", date: "05-06", type: "public" },
      { name: "Spring Bank Holiday", date: "05-27", type: "public" },
      { name: "Summer Bank Holiday", date: "08-26", type: "public" },
      { name: "Christmas Day", date: "12-25", type: "public" },
      { name: "Boxing Day", date: "12-26", type: "public" },
    ],
  },
  IN: {
    code: "IN",
    name: "India",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "public" },
      { name: "Republic Day", date: "01-26", type: "public", description: "Commemorates the Constitution" },
      { name: "Holi", date: "03-25", type: "religious", description: "Festival of Colors" },
      { name: "Good Friday", date: "03-29", type: "public" },
      { name: "Independence Day", date: "08-15", type: "public", description: "Independence from Britain" },
      { name: "Gandhi Jayanti", date: "10-02", type: "public", description: "Birthday of Mahatma Gandhi" },
      { name: "Diwali", date: "11-01", type: "religious", description: "Festival of Lights" },
      { name: "Christmas Day", date: "12-25", type: "public" },
    ],
  },
  CA: {
    code: "CA",
    name: "Canada",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "public" },
      { name: "Good Friday", date: "03-29", type: "public" },
      { name: "Victoria Day", date: "05-20", type: "public" },
      { name: "Canada Day", date: "07-01", type: "public", description: "National Day" },
      { name: "Labour Day", date: "09-02", type: "public" },
      { name: "Thanksgiving", date: "10-14", type: "public" },
      { name: "Remembrance Day", date: "11-11", type: "public" },
      { name: "Christmas Day", date: "12-25", type: "public" },
      { name: "Boxing Day", date: "12-26", type: "public" },
    ],
  },
  AU: {
    code: "AU",
    name: "Australia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "public" },
      { name: "Australia Day", date: "01-26", type: "public", description: "National Day" },
      { name: "Good Friday", date: "03-29", type: "public" },
      { name: "Easter Monday", date: "04-01", type: "public" },
      { name: "ANZAC Day", date: "04-25", type: "public", description: "Honors military service" },
      { name: "Queen's Birthday", date: "06-10", type: "public" },
      { name: "Christmas Day", date: "12-25", type: "public" },
      { name: "Boxing Day", date: "12-26", type: "public" },
    ],
  },
  DE: {
    code: "DE",
    name: "Germany",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "public" },
      { name: "Good Friday", date: "03-29", type: "public" },
      { name: "Easter Monday", date: "04-01", type: "public" },
      { name: "Labour Day", date: "05-01", type: "public" },
      { name: "Ascension Day", date: "05-09", type: "public" },
      { name: "Whit Monday", date: "05-20", type: "public" },
      { name: "German Unity Day", date: "10-03", type: "public", description: "Reunification Day" },
      { name: "Christmas Day", date: "12-25", type: "public" },
      { name: "Boxing Day", date: "12-26", type: "public" },
    ],
  },
  FR: {
    code: "FR",
    name: "France",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "public" },
      { name: "Easter Monday", date: "04-01", type: "public" },
      { name: "Labour Day", date: "05-01", type: "public" },
      { name: "Victory in Europe Day", date: "05-08", type: "public" },
      { name: "Ascension Day", date: "05-09", type: "public" },
      { name: "Whit Monday", date: "05-20", type: "public" },
      { name: "Bastille Day", date: "07-14", type: "public", description: "National Day" },
      { name: "Assumption of Mary", date: "08-15", type: "public" },
      { name: "All Saints' Day", date: "11-01", type: "public" },
      { name: "Armistice Day", date: "11-11", type: "public" },
      { name: "Christmas Day", date: "12-25", type: "public" },
    ],
  },
  JP: {
    code: "JP",
    name: "Japan",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "public" },
      { name: "Coming of Age Day", date: "01-08", type: "public" },
      { name: "National Foundation Day", date: "02-11", type: "public" },
      { name: "Emperor's Birthday", date: "02-23", type: "public" },
      { name: "Vernal Equinox Day", date: "03-20", type: "public" },
      { name: "Showa Day", date: "04-29", type: "public" },
      { name: "Constitution Memorial Day", date: "05-03", type: "public" },
      { name: "Greenery Day", date: "05-04", type: "public" },
      { name: "Children's Day", date: "05-05", type: "public" },
      { name: "Marine Day", date: "07-15", type: "public" },
      { name: "Mountain Day", date: "08-11", type: "public" },
      { name: "Respect for the Aged Day", date: "09-16", type: "public" },
      { name: "Autumnal Equinox Day", date: "09-23", type: "public" },
      { name: "Sports Day", date: "10-14", type: "public" },
      { name: "Culture Day", date: "11-03", type: "public" },
      { name: "Labour Thanksgiving Day", date: "11-23", type: "public" },
    ],
  },
}

const INTERNATIONAL_HOLIDAYS: Holiday[] = [
  { name: "New Year's Day", date: "01-01", type: "public", description: "First day of the year globally" },
  { name: "Valentine's Day", date: "02-14", type: "observance", description: "Day of love and romance" },
  { name: "International Women's Day", date: "03-08", type: "observance", description: "Celebrates women's achievements" },
  { name: "Earth Day", date: "04-22", type: "observance", description: "Environmental awareness" },
  { name: "International Labour Day", date: "05-01", type: "public", description: "Workers' rights" },
  { name: "World Environment Day", date: "06-05", type: "observance" },
  { name: "International Friendship Day", date: "07-30", type: "observance" },
  { name: "International Youth Day", date: "08-12", type: "observance" },
  { name: "International Day of Peace", date: "09-21", type: "observance" },
  { name: "World Teachers' Day", date: "10-05", type: "observance" },
  { name: "United Nations Day", date: "10-24", type: "observance" },
  { name: "World AIDS Day", date: "12-01", type: "observance" },
  { name: "Human Rights Day", date: "12-10", type: "observance" },
  { name: "Christmas Day", date: "12-25", type: "religious", description: "Celebrated worldwide" },
]

export default function OnlineCalendarHolidays() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["US"])
  const [showInternational, setShowInternational] = useState(true)
  const [showPublic, setShowPublic] = useState(true)
  const [showObservance, setShowObservance] = useState(true)
  const [showReligious, setShowReligious] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = useCallback((year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }, [])

  const getFirstDayOfMonth = useCallback((year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }, [])

  const getHolidaysForMonth = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const holidays: (Holiday & { country?: string })[] = []

    // Add country-specific holidays
    selectedCountries.forEach((countryCode) => {
      const countryData = HOLIDAY_DATA[countryCode]
      if (countryData) {
        countryData.holidays.forEach((holiday) => {
          const holidayMonth = parseInt(holiday.date.split("-")[0]) - 1
          if (holidayMonth === month) {
            holidays.push({ ...holiday, country: countryData.name })
          }
        })
      }
    })

    // Add international holidays
    if (showInternational) {
      INTERNATIONAL_HOLIDAYS.forEach((holiday) => {
        const holidayMonth = parseInt(holiday.date.split("-")[0]) - 1
        if (holidayMonth === month) {
          holidays.push(holiday)
        }
      })
    }

    return holidays
  }, [currentDate, selectedCountries, showInternational])

  const getHolidayForDay = useCallback((day: number) => {
    const dateStr = `${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return getHolidaysForMonth.filter((h) => h.date === dateStr)
  }, [currentDate, getHolidaysForMonth])

  const isToday = useCallback((day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }, [currentDate])

  const navigateMonth = useCallback((direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + direction)
      return newDate
    })
  }, [])

  const navigateYear = useCallback((direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setFullYear(newDate.getFullYear() + direction)
      return newDate
    })
  }, [])

  const goToToday = useCallback(() => {
    setCurrentDate(new Date())
  }, [])

  const toggleCountry = useCallback((code: string) => {
    setSelectedCountries((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    )
  }, [])

  const getHolidayTypeColor = (type: string) => {
    switch (type) {
      case "public":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
      case "observance":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
      case "religious":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())

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

  const selectedDateHolidays = useMemo(() => {
    if (!selectedDate) return []
    return getHolidayForDay(selectedDate.getDate())
  }, [selectedDate, getHolidayForDay])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="size-5" />
                Holiday Calendar
              </CardTitle>
              <CardDescription>
                Browse holidays from around the world
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigateYear(-1)}>
                <ChevronLeftCircle className="size-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                <ChevronLeft className="size-5" />
              </Button>
              <div className="text-center min-w-32">
                <div className="font-semibold">{months[currentDate.getMonth()]}</div>
                <div className="text-sm text-muted-foreground">{currentDate.getFullYear()}</div>
              </div>
              <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                <ChevronRight className="size-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateYear(1)}>
                <ChevronRightCircle className="size-5" />
              </Button>
              <Button variant="secondary" onClick={goToToday} size="sm">
                Today
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Country Selection */}
          <div className="space-y-3 mb-4">
            <Label className="text-sm font-medium">Select Countries</Label>
            <div className="flex flex-wrap gap-2">
              {Object.values(HOLIDAY_DATA).map((country) => (
                <Button
                  key={country.code}
                  variant={selectedCountries.includes(country.code) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCountry(country.code)}
                  className="gap-1"
                >
                  {country.code}
                </Button>
              ))}
            </div>
          </div>

          {/* Holiday Type Filters */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="show-international"
                checked={showInternational}
                onCheckedChange={(checked) => setShowInternational(checked as boolean)}
              />
              <Label htmlFor="show-international" className="cursor-pointer text-sm">
                International
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="show-public"
                checked={showPublic}
                onCheckedChange={(checked) => setShowPublic(checked as boolean)}
              />
              <Label htmlFor="show-public" className="cursor-pointer text-sm">
                Public Holidays
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="show-observance"
                checked={showObservance}
                onCheckedChange={(checked) => setShowObservance(checked as boolean)}
              />
              <Label htmlFor="show-observance" className="cursor-pointer text-sm">
                Observances
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="show-religious"
                checked={showReligious}
                onCheckedChange={(checked) => setShowReligious(checked as boolean)}
              />
              <Label htmlFor="show-religious" className="cursor-pointer text-sm">
                Religious
              </Label>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 bg-muted/50">
              {dayHeaders.map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-sm font-semibold text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const holidays = day ? getHolidayForDay(day) : []
                const filteredHolidays = holidays.filter((h) => {
                  if (h.type === "public" && !showPublic) return false
                  if (h.type === "observance" && !showObservance) return false
                  if (h.type === "religious" && !showReligious) return false
                  return true
                })
                const hasHolidays = filteredHolidays.length > 0
                const isTodayDate = day ? isToday(day) : false
                const isSelected = selectedDate && day === selectedDate.getDate()

                return (
                  <button
                    key={index}
                    onClick={() => day && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                    className={cn(
                      "min-h-24 p-2 text-left border-t border-r transition-colors hover:bg-muted/30",
                      !day && "bg-muted/10",
                      isTodayDate && "bg-blue-50 dark:bg-blue-900/20",
                      isSelected && "ring-2 ring-primary ring-inset"
                    )}
                  >
                    {day && (
                      <>
                        <div
                          className={cn(
                            "size-7 flex items-center justify-center rounded-full text-sm font-medium",
                            isTodayDate && "bg-blue-500 text-white"
                          )}
                        >
                          {day}
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {filteredHolidays.slice(0, 2).map((holiday, i) => (
                            <div
                              key={i}
                              className={cn(
                                "text-xs px-1.5 py-0.5 rounded truncate",
                                getHolidayTypeColor(holiday.type)
                              )}
                            >
                              {holiday.name}
                            </div>
                          ))}
                          {filteredHolidays.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{filteredHolidays.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Holiday Details Panel */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* This Month's Holidays */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {months[currentDate.getMonth()]} Holidays
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {getHolidaysForMonth.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No holidays this month</p>
                ) : (
                  getHolidaysForMonth.map((holiday, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-2 rounded-lg border bg-muted/30"
                    >
                      <CalendarIcon className="size-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{holiday.name}</span>
                          <Badge variant="outline" className={getHolidayTypeColor(holiday.type)}>
                            {holiday.type}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(holiday.date.split("-")[1]))
                            .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                          {holiday.country && ` - ${holiday.country}`}
                        </div>
                        {holiday.description && (
                          <p className="text-xs text-muted-foreground mt-1">{holiday.description}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Selected Date Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="size-4" />
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                : "Select a Date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {!selectedDate ? (
                  <p className="text-sm text-muted-foreground">Click on a date to see holiday details</p>
                ) : selectedDateHolidays.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No holidays on this date</p>
                ) : (
                  selectedDateHolidays.map((holiday, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border bg-muted/30 space-y-2"
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{holiday.name}</span>
                        <Badge variant="outline" className={getHolidayTypeColor(holiday.type)}>
                          {holiday.type}
                        </Badge>
                      </div>
                      {holiday.country && (
                        <div className="text-sm text-muted-foreground">
                          <Globe className="size-3 inline mr-1" />
                          {holiday.country}
                        </div>
                      )}
                      {holiday.description && (
                        <p className="text-sm text-muted-foreground">{holiday.description}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

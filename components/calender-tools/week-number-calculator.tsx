"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Copy, Check, ChevronLeft, ChevronRight, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type WeekStandard = "iso" | "us"

interface WeekInfo {
  weekNumber: number
  year: number
  startDate: Date
  endDate: Date
  isCurrentWeek: boolean
}

export default function WeekNumberCalculator() {
  const [activeTab, setActiveTab] = useState<"date-to-week" | "week-to-date" | "browse">("date-to-week")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [weekStandard, setWeekStandard] = useState<WeekStandard>("iso")
  const [inputWeek, setInputWeek] = useState("")
  const [inputYear, setInputYear] = useState(new Date().getFullYear().toString())
  const [browseYear, setBrowseYear] = useState(new Date().getFullYear().toString())
  const [copied, setCopied] = useState<string | null>(null)

  // ISO 8601: Week starts on Monday, week 1 contains the first Thursday of the year
  // US: Week starts on Sunday, week 1 is the first week of January
  const getWeekNumber = useCallback((date: Date, standard: WeekStandard): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    
    if (standard === "iso") {
      // ISO 8601 week number
      const dayNum = d.getUTCDay() || 7
      d.setUTCDate(d.getUTCDate() + 4 - dayNum)
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
      return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
    } else {
      // US week number (Sunday start, week 1 = first week of January)
      const startOfYear = new Date(Date.UTC(date.getFullYear(), 0, 1))
      const diff = d.getTime() - startOfYear.getTime()
      const dayOfWeek = startOfYear.getUTCDay()
      return Math.ceil((diff / 86400000 + dayOfWeek + 1) / 7)
    }
  }, [])

  const getWeekRange = useCallback((weekNum: number, year: number, standard: WeekStandard): { start: Date; end: Date } => {
    if (standard === "iso") {
      // Find the first Thursday of the year
      const jan4 = new Date(Date.UTC(year, 0, 4))
      const dayOfWeek = jan4.getUTCDay() || 7
      // Monday of week 1
      const week1Monday = new Date(jan4)
      week1Monday.setUTCDate(jan4.getUTCDate() - dayOfWeek + 1)
      
      // Calculate the Monday of the requested week
      const targetMonday = new Date(week1Monday)
      targetMonday.setUTCDate(week1Monday.getUTCDate() + (weekNum - 1) * 7)
      
      // Sunday of that week (end of week)
      const targetSunday = new Date(targetMonday)
      targetSunday.setUTCDate(targetMonday.getUTCDate() + 6)
      
      return { start: targetMonday, end: targetSunday }
    } else {
      // US standard: weeks start on Sunday
      const jan1 = new Date(Date.UTC(year, 0, 1))
      const dayOfWeek = jan1.getUTCDay()
      // First Sunday of the year
      const firstSunday = new Date(jan1)
      firstSunday.setUTCDate(jan1.getUTCDate() + (7 - dayOfWeek) % 7)
      
      // Calculate the Sunday of the requested week
      const targetSunday = new Date(firstSunday)
      targetSunday.setUTCDate(firstSunday.getUTCDate() + (weekNum - 1) * 7)
      
      // Saturday of that week (end of week)
      const targetSaturday = new Date(targetSunday)
      targetSaturday.setUTCDate(targetSunday.getUTCDate() + 6)
      
      // Start is the Sunday before (or the first Sunday for week 1)
      const targetStart = new Date(targetSunday)
      
      return { start: targetStart, end: targetSaturday }
    }
  }, [])

  const dateToWeekResult = useMemo(() => {
    if (!selectedDate) return null
    const date = new Date(selectedDate)
    const weekNum = getWeekNumber(date, weekStandard)
    const weekInfo = getWeekRange(weekNum, date.getFullYear(), weekStandard)
    const today = new Date()
    const isCurrentWeek = 
      today.getFullYear() === date.getFullYear() &&
      getWeekNumber(today, weekStandard) === weekNum
    
    return {
      weekNumber: weekNum,
      year: date.getFullYear(),
      startDate: weekInfo.start,
      endDate: weekInfo.end,
      isCurrentWeek,
    }
  }, [selectedDate, weekStandard, getWeekNumber, getWeekRange])

  const weekToDateResult = useMemo(() => {
    const weekNum = parseInt(inputWeek)
    const yearNum = parseInt(inputYear)
    if (!weekNum || !yearNum || weekNum < 1 || weekNum > 53) return null
    
    const weekInfo = getWeekRange(weekNum, yearNum, weekStandard)
    const today = new Date()
    const isCurrentWeek = 
      today.getFullYear() === yearNum &&
      getWeekNumber(today, weekStandard) === weekNum
    
    return {
      weekNumber: weekNum,
      year: yearNum,
      startDate: weekInfo.start,
      endDate: weekInfo.end,
      isCurrentWeek,
    }
  }, [inputWeek, inputYear, weekStandard, getWeekRange, getWeekNumber])

  const allWeeksOfYear = useMemo(() => {
    const yearNum = parseInt(browseYear)
    if (!yearNum) return []
    
    const weeks: WeekInfo[] = []
    const maxWeeks = weekStandard === "iso" ? 53 : 53
    const today = new Date()
    
    for (let week = 1; week <= maxWeeks; week++) {
      const weekInfo = getWeekRange(week, yearNum, weekStandard)
      // Check if this week actually belongs to this year
      if (weekInfo.start.getFullYear() === yearNum || weekInfo.end.getFullYear() === yearNum) {
        weeks.push({
          weekNumber: week,
          year: yearNum,
          startDate: weekInfo.start,
          endDate: weekInfo.end,
          isCurrentWeek: today.getFullYear() === yearNum && getWeekNumber(today, weekStandard) === week,
        })
      }
    }
    
    return weeks
  }, [browseYear, weekStandard, getWeekRange, getWeekNumber])

  const currentWeekInfo = useMemo(() => {
    const today = new Date()
    const weekNum = getWeekNumber(today, weekStandard)
    const weekInfo = getWeekRange(weekNum, today.getFullYear(), weekStandard)
    return {
      weekNumber: weekNum,
      year: today.getFullYear(),
      startDate: weekInfo.start,
      endDate: weekInfo.end,
      isCurrentWeek: true,
    }
  }, [weekStandard, getWeekNumber, getWeekRange])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Current Week Display */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Week</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-4xl font-bold">{currentWeekInfo.weekNumber}</span>
                <div>
                  <p className="text-sm font-medium">Week of {formatDate(currentWeekInfo.startDate)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFullDate(currentWeekInfo.startDate)} - {formatFullDate(currentWeekInfo.endDate)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {weekStandard === "iso" ? "ISO 8601" : "US Standard"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Week Standard Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="size-5" />
            Week Number Standard
          </CardTitle>
          <CardDescription>
            Choose the week numbering system to use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => setWeekStandard("iso")}
              className={cn(
                "p-4 rounded-lg border-2 text-left transition-colors",
                weekStandard === "iso"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              )}
            >
              <div className="font-semibold mb-1">ISO 8601</div>
              <p className="text-sm text-muted-foreground">
                Week starts on Monday. Week 1 contains the first Thursday of the year.
                Used internationally and in most European countries.
              </p>
            </button>
            <button
              onClick={() => setWeekStandard("us")}
              className={cn(
                "p-4 rounded-lg border-2 text-left transition-colors",
                weekStandard === "us"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              )}
            >
              <div className="font-semibold mb-1">US Standard</div>
              <p className="text-sm text-muted-foreground">
                Week starts on Sunday. Week 1 is the first week of January.
                Commonly used in the United States.
              </p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Main Calculator Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="date-to-week">Date to Week</TabsTrigger>
          <TabsTrigger value="week-to-date">Week to Date</TabsTrigger>
          <TabsTrigger value="browse">Browse Year</TabsTrigger>
        </TabsList>

        {/* Date to Week Tab */}
        <TabsContent value="date-to-week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Week Number from Date</CardTitle>
              <CardDescription>
                Enter a date to find its week number
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date-input">Select Date</Label>
                <Input
                  id="date-input"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              {dateToWeekResult && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="rounded-lg border bg-primary/10 p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Week Number</p>
                    <p className="text-5xl font-bold">{dateToWeekResult.weekNumber}</p>
                    <p className="text-lg text-muted-foreground mt-1">
                      of {dateToWeekResult.year}
                    </p>
                    {dateToWeekResult.isCurrentWeek && (
                      <Badge className="mt-2">Current Week</Badge>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-sm text-muted-foreground mb-1">Week Starts</p>
                      <p className="font-semibold">{formatFullDate(dateToWeekResult.startDate)}</p>
                      <p className="text-sm text-muted-foreground">
                        ({dateToWeekResult.startDate.toLocaleDateString("en-US", { weekday: "long" })})
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-sm text-muted-foreground mb-1">Week Ends</p>
                      <p className="font-semibold">{formatFullDate(dateToWeekResult.endDate)}</p>
                      <p className="text-sm text-muted-foreground">
                        ({dateToWeekResult.endDate.toLocaleDateString("en-US", { weekday: "long" })})
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(
                        `Week ${dateToWeekResult.weekNumber}, ${dateToWeekResult.year}: ${formatDate(dateToWeekResult.startDate)} - ${formatDate(dateToWeekResult.endDate)}`,
                        "date-to-week"
                      )}
                    >
                      {copied === "date-to-week" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                      Copy Result
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Week to Date Tab */}
        <TabsContent value="week-to-date" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Date Range from Week Number</CardTitle>
              <CardDescription>
                Enter a week number to find its date range
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="week-input">Week Number</Label>
                  <Input
                    id="week-input"
                    type="number"
                    min="1"
                    max="53"
                    placeholder="1-53"
                    value={inputWeek}
                    onChange={(e) => setInputWeek(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year-input">Year</Label>
                  <Input
                    id="year-input"
                    type="number"
                    placeholder="YYYY"
                    value={inputYear}
                    onChange={(e) => setInputYear(e.target.value)}
                  />
                </div>
              </div>

              {weekToDateResult && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="rounded-lg border bg-primary/10 p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Date Range for Week {weekToDateResult.weekNumber}</p>
                    <p className="text-2xl font-bold">
                      {formatDate(weekToDateResult.startDate)} - {formatDate(weekToDateResult.endDate)}
                    </p>
                    {weekToDateResult.isCurrentWeek && (
                      <Badge className="mt-2">Current Week</Badge>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                      <p className="font-semibold">{formatFullDate(weekToDateResult.startDate)}</p>
                      <p className="text-sm text-muted-foreground">
                        {weekStandard === "iso" ? "Monday" : "Sunday"}
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-sm text-muted-foreground mb-1">End Date</p>
                      <p className="font-semibold">{formatFullDate(weekToDateResult.endDate)}</p>
                      <p className="text-sm text-muted-foreground">
                        {weekStandard === "iso" ? "Sunday" : "Saturday"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(
                        `Week ${weekToDateResult.weekNumber}, ${weekToDateResult.year}: ${formatDate(weekToDateResult.startDate)} - ${formatDate(weekToDateResult.endDate)}`,
                        "week-to-date"
                      )}
                    >
                      {copied === "week-to-date" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                      Copy Result
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Browse Year Tab */}
        <TabsContent value="browse" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Browse Weeks of the Year</CardTitle>
                  <CardDescription>
                    View all weeks in a year
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setBrowseYear((parseInt(browseYear) - 1).toString())}>
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Select value={browseYear} onValueChange={setBrowseYear}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i).map((y) => (
                        <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={() => setBrowseYear((parseInt(browseYear) + 1).toString())}>
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="grid gap-2">
                  {allWeeksOfYear.map((week) => (
                    <div
                      key={week.weekNumber}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border transition-colors",
                        week.isCurrentWeek && "bg-primary/10 border-primary/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "size-10 flex items-center justify-center rounded-lg font-bold",
                          week.isCurrentWeek ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                          {week.weekNumber}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {formatDate(week.startDate)} - {formatDate(week.endDate)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFullDate(week.startDate).split(", ")[0]} to {formatFullDate(week.endDate).split(", ")[0]}
                          </p>
                        </div>
                      </div>
                      {week.isCurrentWeek && (
                        <Badge>Current</Badge>
                      )}
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
            About Week Numbers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong>ISO 8601</strong> is the international standard for week numbering:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Weeks start on Monday</li>
            <li>Week 1 is the week containing the first Thursday of the year</li>
            <li>This means week 1 always contains January 4th</li>
            <li>Some years have 53 weeks instead of 52</li>
          </ul>
          <p className="pt-2">
            <strong>US Standard</strong> is commonly used in North America:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Weeks start on Sunday</li>
            <li>Week 1 is the first week of January</li>
            <li>The first week may be incomplete if January 1st is not a Sunday</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

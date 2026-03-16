"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Printer, Plus, Trash2, Calendar, DollarSign, FileText, PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface FiscalEvent {
  id: string
  name: string
  date: string
  type: "deadline" | "report" | "meeting" | "holiday" | "other"
  quarter?: number
  color: string
}

type FiscalYearStart = "january" | "april" | "july" | "october"

const FISCAL_YEAR_OPTIONS = [
  { value: "january", label: "January - December (Calendar Year)", months: [0, 11] },
  { value: "april", label: "April - March (UK, Japan, India)", months: [3, 2] },
  { value: "july", label: "July - June (Australia, many nonprofits)", months: [6, 5] },
  { value: "october", label: "October - September (US Federal)", months: [9, 8] },
]

const EVENT_COLORS = [
  { value: "#ef4444", label: "Red", class: "bg-red-500" },
  { value: "#f97316", label: "Orange", class: "bg-orange-500" },
  { value: "#eab308", label: "Yellow", class: "bg-yellow-500" },
  { value: "#22c55e", label: "Green", class: "bg-green-500" },
  { value: "#3b82f6", label: "Blue", class: "bg-blue-500" },
  { value: "#8b5cf6", label: "Purple", class: "bg-purple-500" },
  { value: "#ec4899", label: "Pink", class: "bg-pink-500" },
  { value: "#14b8a6", label: "Teal", class: "bg-teal-500" },
]

const EVENT_TYPES = [
  { value: "deadline", label: "Deadline", color: "#ef4444" },
  { value: "report", label: "Financial Report", color: "#3b82f6" },
  { value: "meeting", label: "Board Meeting", color: "#8b5cf6" },
  { value: "holiday", label: "Business Holiday", color: "#22c55e" },
  { value: "other", label: "Other", color: "#f97316" },
]

const QUARTER_COLORS = [
  "#3b82f6", // Q1 - Blue
  "#22c55e", // Q2 - Green
  "#f97316", // Q3 - Orange
  "#8b5cf6", // Q4 - Purple
]

export default function FiscalYearCalendar() {
  const [fiscalYearStart, setFiscalYearStart] = useState<FiscalYearStart>("april")
  const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear().toString())
  const [showWeekNumbers, setShowWeekNumbers] = useState(true)
  const [highlightQuarters, setHighlightQuarters] = useState(true)
  const [events, setEvents] = useState<FiscalEvent[]>([
    { id: "1", name: "Q1 End / Q2 Start", date: `${new Date().getFullYear()}-06-30`, type: "report", quarter: 1, color: "#3b82f6" },
    { id: "2", name: "Q2 Financial Report", date: `${new Date().getFullYear()}-07-15`, type: "report", quarter: 2, color: "#22c55e" },
    { id: "3", name: "Q3 End / Q4 Start", date: `${new Date().getFullYear()}-12-31`, type: "report", quarter: 3, color: "#f97316" },
    { id: "4", name: "Year-End Closing", date: `${new Date().getFullYear() + 1}-03-31`, type: "deadline", quarter: 4, color: "#8b5cf6" },
    { id: "5", name: "Annual Report Due", date: `${new Date().getFullYear() + 1}-04-15`, type: "deadline", quarter: 4, color: "#ef4444" },
  ])
  const [newEventName, setNewEventName] = useState("")
  const [newEventDate, setNewEventDate] = useState("")
  const [newEventType, setNewEventType] = useState<FiscalEvent["type"]>("deadline")
  const [newEventColor, setNewEventColor] = useState("#ef4444")
  const [newEventQuarter, setNewEventQuarter] = useState("")

  const fiscalYearNum = parseInt(fiscalYear)

  const getFiscalYearRange = useMemo(() => {
    const option = FISCAL_YEAR_OPTIONS.find(o => o.value === fiscalYearStart)
    if (!option) return { start: new Date(fiscalYearNum, 0, 1), end: new Date(fiscalYearNum + 1, 0, 0) }

    const startMonth = option.months[0]
    const endMonth = option.months[1]

    const startDate = new Date(fiscalYearNum, startMonth, 1)
    const endDate = new Date(fiscalYearNum + (endMonth < startMonth ? 1 : 0), endMonth + 1, 0)

    return { start: startDate, end: endDate }
  }, [fiscalYearStart, fiscalYearNum])

  const getQuarterForDate = useCallback((date: Date) => {
    const { start } = getFiscalYearRange
    const monthsSinceStart = (date.getFullYear() - start.getFullYear()) * 12 + (date.getMonth() - start.getMonth())
    return Math.floor(monthsSinceStart / 3) + 1
  }, [getFiscalYearRange])

  const getQuarterDates = useMemo(() => {
    const { start, end } = getFiscalYearRange
    const quarters = []
    const monthsPerQuarter = 3

    for (let q = 0; q < 4; q++) {
      const quarterStart = new Date(start)
      quarterStart.setMonth(start.getMonth() + q * monthsPerQuarter)

      const quarterEnd = new Date(quarterStart)
      quarterEnd.setMonth(quarterStart.getMonth() + monthsPerQuarter)
      quarterEnd.setDate(0) // Last day of previous month

      quarters.push({
        quarter: q + 1,
        start: quarterStart,
        end: quarterEnd > end ? end : quarterEnd,
      })
    }

    return quarters
  }, [getFiscalYearRange])

  const addEvent = useCallback(() => {
    if (!newEventName || !newEventDate) return
    const date = new Date(newEventDate)
    setEvents(prev => [...prev, {
      id: Date.now().toString(),
      name: newEventName,
      date: newEventDate,
      type: newEventType,
      color: newEventColor,
      quarter: newEventQuarter ? parseInt(newEventQuarter) : getQuarterForDate(date),
    }])
    setNewEventName("")
    setNewEventDate("")
    setNewEventQuarter("")
  }, [newEventName, newEventDate, newEventType, newEventColor, newEventQuarter, getQuarterForDate])

  const removeEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id))
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const handleDownload = useCallback(() => {
    const content = document.getElementById("fiscal-calendar-preview")
    if (!content) return

    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Fiscal Year Calendar ${fiscalYearNum}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .quarters { display: flex; gap: 10px; margin-bottom: 20px; }
            .quarter { padding: 10px 15px; border-radius: 6px; color: white; font-size: 12px; }
            .events { margin-top: 20px; }
            .event { padding: 8px 12px; margin: 5px 0; border-radius: 6px; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Fiscal Year Calendar</h1>
            <p>${fiscalYearStart.charAt(0).toUpperCase() + fiscalYearStart.slice(1)} ${fiscalYearNum} - ${fiscalYearNum + 1}</p>
          </div>
          <div class="quarters">
            ${getQuarterDates.map(q => `<div class="quarter" style="background: ${QUARTER_COLORS[q.quarter - 1]}">Q${q.quarter}: ${q.start.toLocaleDateString()} - ${q.end.toLocaleDateString()}</div>`).join('')}
          </div>
          <div class="events">
            <h3>Key Dates</h3>
            ${events.map(e => `<div class="event" style="background: ${e.color}20; border-left: 3px solid ${e.color}">${e.name} - ${e.date}</div>`).join('')}
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }, [fiscalYearNum, fiscalYearStart, getQuarterDates, events])

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const monthsData = useMemo(() => {
    const { start, end } = getFiscalYearRange
    const result = []

    for (let m = 0; m < 12; m++) {
      const monthIndex = (start.getMonth() + m) % 12
      const year = start.getFullYear() + Math.floor((start.getMonth() + m) / 12)
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
      const firstDay = new Date(year, monthIndex, 1).getDay()

      const days: (number | null)[] = []
      for (let i = 0; i < firstDay; i++) {
        days.push(null)
      }
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
      }

      const quarter = getQuarterDates.find(q => {
        const qStartMonth = q.start.getMonth()
        const qEndMonth = q.end.getMonth()
        if (qStartMonth <= qEndMonth) {
          return monthIndex >= qStartMonth && monthIndex <= qEndMonth
        }
        return monthIndex >= qStartMonth || monthIndex <= qEndMonth
      })

      result.push({
        name: months[monthIndex],
        year,
        monthIndex,
        days,
        quarter: quarter?.quarter,
      })
    }

    return result
  }, [getFiscalYearRange, getQuarterDates])

  const getEventsForMonth = useCallback((year: number, month: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getFullYear() === year && eventDate.getMonth() === month
    })
  }, [events])

  const getEventsForQuarter = useCallback((quarter: number) => {
    return events.filter(e => e.quarter === quarter)
  }, [events])

  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="size-5" />
            Fiscal Year Calendar Settings
          </CardTitle>
          <CardDescription>
            Generate calendars for any fiscal year with quarters and financial deadlines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fiscal Year Selection */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fiscal-year-start">Fiscal Year Type</Label>
              <Select value={fiscalYearStart} onValueChange={(v) => setFiscalYearStart(v as FiscalYearStart)}>
                <SelectTrigger id="fiscal-year-start">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FISCAL_YEAR_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fiscal-year">Fiscal Year</Label>
              <Input
                id="fiscal-year"
                type="number"
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
              />
            </div>
          </div>

          {/* Display Options */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="show-week-numbers"
                checked={showWeekNumbers}
                onCheckedChange={(checked) => setShowWeekNumbers(checked as boolean)}
              />
              <Label htmlFor="show-week-numbers" className="cursor-pointer">Show Week Numbers</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="highlight-quarters"
                checked={highlightQuarters}
                onCheckedChange={(checked) => setHighlightQuarters(checked as boolean)}
              />
              <Label htmlFor="highlight-quarters" className="cursor-pointer">Highlight Quarters</Label>
            </div>
          </div>

          {/* Add Event */}
          <div className="space-y-4">
            <h4 className="font-medium">Add Financial Event</h4>
            <div className="grid sm:grid-cols-5 gap-2">
              <Input
                placeholder="Event name"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                className="sm:col-span-2"
              />
              <Input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
              />
              <Select value={newEventType} onValueChange={(v) => setNewEventType(v as FiscalEvent["type"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Select value={newEventColor} onValueChange={setNewEventColor}>
                  <SelectTrigger className="w-12">
                    <div className={cn("size-4 rounded", EVENT_COLORS.find(c => c.value === newEventColor)?.class)} />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_COLORS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        <div className={cn("size-4 rounded", c.class)} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addEvent} size="sm">
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
            {events.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border"
                    style={{ backgroundColor: `${event.color}20`, borderColor: event.color }}
                  >
                    <span>{event.name}</span>
                    {event.quarter && <Badge variant="outline" className="text-[10px]">Q{event.quarter}</Badge>}
                    <button onClick={() => removeEvent(event.id)} className="hover:opacity-70 ml-1">
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={handlePrint} className="gap-2">
              <Printer className="size-4" />
              Print Calendar
            </Button>
            <Button onClick={handleDownload} variant="outline" className="gap-2">
              <Download className="size-4" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quarter Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="size-5" />
            Fiscal Year Overview
          </CardTitle>
          <CardDescription>
            {fiscalYearStart.charAt(0).toUpperCase() + fiscalYearStart.slice(1)} {fiscalYearNum} - {fiscalYearNum + 1}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {getQuarterDates.map((q, index) => {
              const quarterEvents = getEventsForQuarter(q.quarter)
              return (
                <div
                  key={q.quarter}
                  className={cn(
                    "rounded-lg border p-4 space-y-2",
                    highlightQuarters && "border-t-4"
                  )}
                  style={highlightQuarters ? { borderTopColor: QUARTER_COLORS[index] } : {}}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold" style={highlightQuarters ? { color: QUARTER_COLORS[index] } : {}}>
                      Q{q.quarter}
                    </h4>
                    <Badge variant="outline">{quarterEvents.length} events</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {q.start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {q.end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((q.end.getTime() - q.start.getTime()) / (1000 * 60 * 60 * 24))} days
                  </p>
                  {quarterEvents.length > 0 && (
                    <div className="pt-2 border-t space-y-1">
                      {quarterEvents.slice(0, 3).map((event, i) => (
                        <div key={i} className="text-xs truncate" style={{ color: event.color }}>
                          {event.name}
                        </div>
                      ))}
                      {quarterEvents.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{quarterEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Tabs defaultValue="year" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="year">Year View</TabsTrigger>
          <TabsTrigger value="quarters">By Quarter</TabsTrigger>
        </TabsList>

        <TabsContent value="year" className="space-y-4">
          <Card id="fiscal-calendar-preview">
            <CardHeader>
              <CardTitle>Fiscal Year Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {monthsData.map((monthData) => {
                  const monthEvents = getEventsForMonth(monthData.year, monthData.monthIndex)

                  return (
                    <div key={monthData.name} className="border rounded-lg overflow-hidden">
                      <div
                        className={cn(
                          "py-2 text-center font-semibold text-sm text-white",
                          highlightQuarters && monthData.quarter
                        )}
                        style={highlightQuarters && monthData.quarter ? { backgroundColor: QUARTER_COLORS[monthData.quarter - 1] } : { backgroundColor: '#3b82f6' }}
                      >
                        {monthData.name} {monthData.year}
                        {monthData.quarter && <span className="ml-2 text-xs opacity-80">Q{monthData.quarter}</span>}
                      </div>
                      <div className="grid grid-cols-7 text-xs">
                        {dayHeaders.map((d, i) => (
                          <div key={i} className="text-center py-1 text-muted-foreground font-medium bg-muted/30">
                            {d}
                          </div>
                        ))}
                        {monthData.days.map((day, index) => {
                          const dayEvents = day ? monthEvents.filter(e => new Date(e.date).getDate() === day) : []

                          return (
                            <div
                              key={index}
                              className={cn(
                                "min-h-8 p-0.5 text-center border-t border-r text-xs",
                                !day && "bg-muted/20"
                              )}
                            >
                              {day && (
                                <>
                                  <span>{day}</span>
                                  {dayEvents.slice(0, 1).map((event, i) => (
                                    <div
                                      key={i}
                                      className="truncate text-[9px] mt-0.5"
                                      style={{ color: event.color }}
                                    >
                                      {event.name}
                                    </div>
                                  ))}
                                </>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quarters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Events by Quarter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {getQuarterDates.map((q, index) => {
                  const quarterEvents = getEventsForQuarter(q.quarter)

                  return (
                    <div key={q.quarter} className="space-y-3">
                      <div
                        className="flex items-center justify-between p-3 rounded-lg text-white"
                        style={{ backgroundColor: QUARTER_COLORS[index] }}
                      >
                        <h4 className="font-semibold">Quarter {q.quarter}</h4>
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {quarterEvents.length} events
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {quarterEvents.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No events scheduled</p>
                        ) : (
                          quarterEvents.map((event) => (
                            <div
                              key={event.id}
                              className="flex items-center gap-3 p-3 rounded-lg border"
                              style={{ backgroundColor: `${event.color}10` }}
                            >
                              <div
                                className="size-3 rounded-full"
                                style={{ backgroundColor: event.color }}
                              />
                              <div className="flex-1">
                                <div className="font-medium text-sm">{event.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(event.date).toLocaleDateString(undefined, {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {EVENT_TYPES.find(t => t.value === event.type)?.label}
                              </Badge>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Financial Deadlines Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Financial Deadlines Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {events
                .filter(e => e.type === "deadline" || e.type === "report")
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="size-3 rounded-full"
                        style={{ backgroundColor: event.color }}
                      />
                      <div>
                        <div className="font-medium text-sm">{event.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString(undefined, {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {event.quarter && (
                        <Badge variant="outline">Q{event.quarter}</Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={event.type === "deadline" ? "border-red-500 text-red-500" : "border-blue-500 text-blue-500"}
                      >
                        {event.type === "deadline" ? "Deadline" : "Report"}
                      </Badge>
                    </div>
                  </div>
                ))}
              {events.filter(e => e.type === "deadline" || e.type === "report").length === 0 && (
                <p className="text-sm text-muted-foreground">No financial deadlines or reports scheduled</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #fiscal-calendar-preview, #fiscal-calendar-preview * {
            visibility: visible;
          }
          #fiscal-calendar-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

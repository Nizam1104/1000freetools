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
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarFeed {
  id: string
  name: string
  url: string
  color: string
  enabled: boolean
  events: CalendarEvent[]
  lastSync?: Date
  error?: string
}

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  calendarId: string
  allDay: boolean
  description?: string
  location?: string
}

interface TimeSlot {
  hour: number
  events: CalendarEvent[]
  isFree: boolean
  isBusy: boolean
  conflicts: number
}

const CALENDAR_COLORS = [
  { value: "#3b82f6", label: "Blue", class: "bg-blue-500" },
  { value: "#22c55e", label: "Green", class: "bg-green-500" },
  { value: "#f97316", label: "Orange", class: "bg-orange-500" },
  { value: "#8b5cf6", label: "Purple", class: "bg-purple-500" },
  { value: "#ec4899", label: "Pink", class: "bg-pink-500" },
  { value: "#14b8a6", label: "Teal", class: "bg-teal-500" },
  { value: "#ef4444", label: "Red", class: "bg-red-500" },
  { value: "#eab308", label: "Yellow", class: "bg-yellow-500" },
]

const CALENDAR_TYPES = [
  { value: "google", label: "Google Calendar", icon: "📅", urlPattern: "https://calendar.google.com/calendar/ical/..." },
  { value: "outlook", label: "Outlook/Office 365", icon: "📆", urlPattern: "https://outlook.office365.com/calendar/published/..." },
  { value: "apple", label: "Apple iCloud", icon: "🍎", urlPattern: "webcal://p01-calendarws.icloud.com/..." },
  { value: "ical", label: "iCal/ICS URL", icon: "📋", urlPattern: "https://example.com/calendar.ics" },
  { value: "custom", label: "Custom URL", icon: "🔗", urlPattern: "https://..." },
]

// Mock event generator for demonstration
function generateMockEvents(calendarId: string, color: string): CalendarEvent[] {
  const today = new Date()
  const events: CalendarEvent[] = []
  const eventTemplates = [
    { title: "Team Meeting", duration: 60, hour: 10 },
    { title: "Project Review", duration: 90, hour: 14 },
    { title: "Client Call", duration: 30, hour: 11 },
    { title: "Lunch Break", duration: 60, hour: 12 },
    { title: "Workshop", duration: 120, hour: 15 },
    { title: "Standup", duration: 15, hour: 9 },
    { title: "Planning Session", duration: 60, hour: 13 },
  ]

  for (let dayOffset = -3; dayOffset <= 10; dayOffset++) {
    const date = new Date(today)
    date.setDate(date.getDate() + dayOffset)

    // Skip weekends for some calendars
    if (dayOffset % 3 !== 0 && (date.getDay() === 0 || date.getDay() === 6)) continue

    const numEvents = Math.floor(Math.random() * 3)
    const selectedTemplates = eventTemplates.sort(() => Math.random() - 0.5).slice(0, numEvents)

    selectedTemplates.forEach((template, index) => {
      const start = new Date(date)
      start.setHours(template.hour + index * 2, 0, 0, 0)
      const end = new Date(start)
      end.setMinutes(end.getMinutes() + template.duration)

      events.push({
        id: `${calendarId}-${dayOffset}-${index}`,
        title: template.title,
        start,
        end,
        calendarId,
        allDay: false,
        location: Math.random() > 0.5 ? "Conference Room A" : undefined,
        description: "Mock event for demonstration",
      })
    })
  }

  return events
}

export default function CalendarSyncOverlay() {
  const [calendars, setCalendars] = useState<CalendarFeed[]>([])
  const [newCalendarName, setNewCalendarName] = useState("")
  const [newCalendarUrl, setNewCalendarUrl] = useState("")
  const [newCalendarType, setNewCalendarType] = useState("google")
  const [newCalendarColor, setNewCalendarColor] = useState("#3b82f6")
  const [viewDate, setViewDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week")
  const [showConflicts, setShowConflicts] = useState(true)
  const [showFreeTime, setShowFreeTime] = useState(true)
  const [syncing, setSyncing] = useState<string | null>(null)

  const addCalendar = useCallback(() => {
    if (!newCalendarName || !newCalendarUrl) return

    const newCalendar: CalendarFeed = {
      id: Date.now().toString(),
      name: newCalendarName,
      url: newCalendarUrl,
      color: newCalendarColor,
      enabled: true,
      events: generateMockEvents(Date.now().toString(), newCalendarColor),
      lastSync: new Date(),
    }

    setCalendars(prev => [...prev, newCalendar])
    setNewCalendarName("")
    setNewCalendarUrl("")
  }, [newCalendarName, newCalendarUrl, newCalendarColor])

  const removeCalendar = useCallback((id: string) => {
    setCalendars(prev => prev.filter(c => c.id !== id))
  }, [])

  const toggleCalendar = useCallback((id: string) => {
    setCalendars(prev => prev.map(c =>
      c.id === id ? { ...c, enabled: !c.enabled } : c
    ))
  }, [])

  const syncCalendar = useCallback(async (id: string) => {
    setSyncing(id)
    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setCalendars(prev => prev.map(c =>
      c.id === id ? { ...c, lastSync: new Date(), events: generateMockEvents(id, c.color) } : c
    ))
    setSyncing(null)
  }, [])

  const syncAll = useCallback(async () => {
    setSyncing("all")
    await new Promise(resolve => setTimeout(resolve, 1500))
    setCalendars(prev => prev.map(c => ({
      ...c,
      lastSync: new Date(),
      events: generateMockEvents(c.id, c.color),
    })))
    setSyncing(null)
  }, [])

  const allEvents = useMemo(() => {
    return calendars
      .filter(c => c.enabled)
      .flatMap(c => c.events)
      .sort((a, b) => a.start.getTime() - b.start.getTime())
  }, [calendars])

  const conflicts = useMemo(() => {
    if (!showConflicts) return []

    const conflictEvents: { events: CalendarEvent[]; time: Date }[] = []
    const enabledEvents = allEvents

    for (let i = 0; i < enabledEvents.length; i++) {
      for (let j = i + 1; j < enabledEvents.length; j++) {
        const event1 = enabledEvents[i]
        const event2 = enabledEvents[j]

        // Check if events overlap and are from different calendars
        if (event1.calendarId !== event2.calendarId &&
            event1.start < event2.end &&
            event2.start < event1.end) {
          conflictEvents.push({
            events: [event1, event2],
            time: event1.start,
          })
        }
      }
    }

    return conflictEvents
  }, [allEvents, showConflicts])

  const freeTimeSlots = useMemo(() => {
    if (!showFreeTime || viewMode !== "day") return []

    const today = new Date(viewDate)
    today.setHours(0, 0, 0, 0)

    const dayEvents = allEvents.filter(e => {
      const eventDate = new Date(e.start)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate.getTime() === today.getTime()
    })

    const slots: TimeSlot[] = []
    for (let hour = 8; hour <= 18; hour++) {
      const hourEvents = dayEvents.filter(e => e.start.getHours() === hour)
      slots.push({
        hour,
        events: hourEvents,
        isFree: hourEvents.length === 0,
        isBusy: hourEvents.length > 0,
        conflicts: 0,
      })
    }

    return slots
  }, [allEvents, showFreeTime, viewMode, viewDate])

  const navigateDate = useCallback((direction: number) => {
    setViewDate(prev => {
      const newDate = new Date(prev)
      if (viewMode === "day") {
        newDate.setDate(newDate.getDate() + direction)
      } else if (viewMode === "week") {
        newDate.setDate(newDate.getDate() + direction * 7)
      } else {
        newDate.setMonth(newDate.getMonth() + direction)
      }
      return newDate
    })
  }, [viewMode])

  const goToToday = useCallback(() => {
    setViewDate(new Date())
  }, [])

  const getEventsForDay = useCallback((date: Date) => {
    const dayStart = new Date(date)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayEnd.getDate() + 1)

    return allEvents.filter(e => e.start >= dayStart && e.start < dayEnd)
  }, [allEvents])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
  }

  const currentCalendarType = CALENDAR_TYPES.find(t => t.value === newCalendarType)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Add Calendar Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="size-5" />
            Connect Calendar Feeds
          </CardTitle>
          <CardDescription>
            Add calendar URLs to overlay and compare schedules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-5 gap-3">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="calendar-name">Calendar Name</Label>
              <Input
                id="calendar-name"
                value={newCalendarName}
                onChange={(e) => setNewCalendarName(e.target.value)}
                placeholder="e.g., Work Calendar"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendar-type">Type</Label>
              <Select value={newCalendarType} onValueChange={setNewCalendarType}>
                <SelectTrigger id="calendar-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CALENDAR_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendar-color">Color</Label>
              <Select value={newCalendarColor} onValueChange={setNewCalendarColor}>
                <SelectTrigger id="calendar-color">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CALENDAR_COLORS.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      <div className={cn("size-4 rounded-full", c.class)} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-5">
              <Label htmlFor="calendar-url">Calendar URL (iCal/ICS feed)</Label>
              <div className="flex gap-2">
                <Input
                  id="calendar-url"
                  value={newCalendarUrl}
                  onChange={(e) => setNewCalendarUrl(e.target.value)}
                  placeholder={currentCalendarType?.urlPattern}
                  className="flex-1"
                />
                <Button onClick={addCalendar} size="sm">
                  <Plus className="size-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Tip: In Google Calendar, go to Settings → Integrate calendar → Copy the Secret address in iCal format
              </p>
            </div>
          </div>

          {/* Connected Calendars */}
          {calendars.length > 0 && (
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Connected Calendars ({calendars.length})</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={syncAll}
                  disabled={syncing === "all"}
                  className="gap-2"
                >
                  <RefreshCw className={cn("size-4", syncing === "all" && "animate-spin")} />
                  Sync All
                </Button>
              </div>
              <div className="space-y-2">
                {calendars.map((calendar) => (
                  <div
                    key={calendar.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
                  >
                    <Checkbox
                      checked={calendar.enabled}
                      onCheckedChange={() => toggleCalendar(calendar.id)}
                    />
                    <div
                      className="size-4 rounded-full"
                      style={{ backgroundColor: calendar.color, opacity: calendar.enabled ? 1 : 0.5 }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{calendar.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{calendar.url}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {calendar.lastSync && (
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                          Synced: {calendar.lastSync.toLocaleTimeString()}
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => syncCalendar(calendar.id)}
                        disabled={syncing === calendar.id}
                      >
                        <RefreshCw className={cn("size-4", syncing === calendar.id && "animate-spin")} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCalendar(calendar.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigateDate(-1)}>
                <ChevronLeft className="size-4" />
              </Button>
              <div className="text-center min-w-32">
                <div className="font-semibold">
                  {viewMode === "month"
                    ? viewDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })
                    : formatDate(viewDate)}
                </div>
              </div>
              <Button variant="outline" size="icon" onClick={() => navigateDate(1)}>
                <ChevronRight className="size-4" />
              </Button>
              <Button variant="secondary" onClick={goToToday} size="sm" className="ml-2">
                Today
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Select value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Switch
                  checked={showConflicts}
                  onCheckedChange={setShowConflicts}
                  id="show-conflicts"
                />
                <Label htmlFor="show-conflicts" className="text-sm">Show Conflicts</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={showFreeTime}
                  onCheckedChange={setShowFreeTime}
                  id="show-free"
                />
                <Label htmlFor="show-free" className="text-sm">Highlight Free Time</Label>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Calendar Legend */}
      {calendars.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              {calendars.map((calendar) => (
                <button
                  key={calendar.id}
                  onClick={() => toggleCalendar(calendar.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-opacity",
                    calendar.enabled ? "opacity-100" : "opacity-50"
                  )}
                >
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: calendar.color }}
                  />
                  <span>{calendar.name}</span>
                  {calendar.enabled ? (
                    <Eye className="size-3 text-muted-foreground" />
                  ) : (
                    <EyeOff className="size-3 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Calendar View */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="conflicts">Conflicts ({conflicts.length})</TabsTrigger>
          <TabsTrigger value="free-time">Free Time Finder</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Overlaid Calendar View</CardTitle>
              <CardDescription>
                All enabled calendars shown together
              </CardDescription>
            </CardHeader>
            <CardContent>
              {viewMode === "day" ? (
                <div className="space-y-2">
                  {freeTimeSlots.map((slot) => (
                    <div
                      key={slot.hour}
                      className={cn(
                        "flex gap-2 p-3 rounded-lg border min-h-16",
                        slot.isFree && showFreeTime && "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      )}
                    >
                      <div className="w-16 text-sm text-muted-foreground font-medium pt-1">
                        {slot.hour}:00
                      </div>
                      <div className="flex-1 flex flex-wrap gap-1">
                        {slot.events.length === 0 ? (
                          <span className="text-sm text-muted-foreground">Free time</span>
                        ) : (
                          slot.events.map((event) => {
                            const calendar = calendars.find(c => c.id === event.calendarId)
                            return (
                              <div
                                key={event.id}
                                className="px-2 py-1 rounded text-xs text-white truncate max-w-full"
                                style={{ backgroundColor: calendar?.color }}
                              >
                                {event.title} ({formatTime(event.start)} - {formatTime(event.end)})
                              </div>
                            )
                          })
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.from({ length: viewMode === "week" ? 7 : 14 }, (_, i) => {
                    const date = new Date(viewDate)
                    if (viewMode === "week") {
                      const day = date.getDay()
                      date.setDate(date.getDate() - day + i)
                    } else {
                      date.setDate(date.getDate() + i)
                    }
                    const dayEvents = getEventsForDay(date)
                    const isToday = new Date().toDateString() === date.toDateString()

                    return (
                      <div
                        key={i}
                        className={cn(
                          "p-4 rounded-lg border",
                          isToday && "bg-primary/5 border-primary/30"
                        )}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className={cn("font-semibold", isToday && "text-primary")}>
                              {date.toLocaleDateString(undefined, { weekday: "long" })}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                            </div>
                          </div>
                          {isToday && <Badge>Today</Badge>}
                        </div>
                        {dayEvents.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No events</p>
                        ) : (
                          <div className="space-y-2">
                            {dayEvents.map((event) => {
                              const calendar = calendars.find(c => c.id === event.calendarId)
                              return (
                                <div
                                  key={event.id}
                                  className="flex items-center gap-2 p-2 rounded text-sm"
                                  style={{ backgroundColor: `${calendar?.color}20` }}
                                >
                                  <div
                                    className="size-3 rounded-full"
                                    style={{ backgroundColor: calendar?.color }}
                                  />
                                  <div className="flex-1">
                                    <div className="font-medium">{event.title}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {formatTime(event.start)} - {formatTime(event.end)}
                                      {event.location && ` • ${event.location}`}
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {calendar?.name}
                                  </Badge>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conflicts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="size-5" />
                Schedule Conflicts
              </CardTitle>
              <CardDescription>
                Overlapping events from different calendars
              </CardDescription>
            </CardHeader>
            <CardContent>
              {conflicts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="size-12 text-green-500 mx-auto mb-3" />
                  <p className="font-medium">No conflicts found!</p>
                  <p className="text-sm text-muted-foreground">
                    All your calendars are perfectly synchronized
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {conflicts.map((conflict, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="size-4 text-red-500" />
                          <span className="font-medium text-red-700 dark:text-red-300">
                            Conflict at {formatTime(conflict.time)}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {conflict.events.map((event) => {
                            const calendar = calendars.find(c => c.id === event.calendarId)
                            return (
                              <div
                                key={event.id}
                                className="flex items-center gap-2 p-2 rounded bg-white dark:bg-slate-800"
                              >
                                <div
                                  className="size-3 rounded-full"
                                  style={{ backgroundColor: calendar?.color }}
                                />
                                <div className="flex-1">
                                  <div className="font-medium">{event.title}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatTime(event.start)} - {formatTime(event.end)}
                                    {calendar && ` • ${calendar.name}`}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="free-time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="size-5" />
                Free Time Finder
              </CardTitle>
              <CardDescription>
                Find available time slots across all calendars
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 5 }, (_, i) => {
                    const date = new Date(viewDate)
                    date.setDate(date.getDate() + i)
                    const dayEvents = getEventsForDay(date)
                    const busyHours = new Set(dayEvents.map(e => e.start.getHours()))
                    const freeSlots = Array.from({ length: 10 }, (_, h) => h + 9)
                      .filter(h => !busyHours.has(h))

                    return (
                      <div
                        key={i}
                        className="p-4 rounded-lg border"
                      >
                        <div className="font-medium mb-2">
                          {date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                        </div>
                        {freeSlots.length === 0 ? (
                          <p className="text-sm text-muted-foreground">Fully booked</p>
                        ) : (
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground mb-1">
                              {freeSlots.length} free hour(s)
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {freeSlots.slice(0, 5).map((hour) => (
                                <Badge
                                  key={hour}
                                  variant="secondary"
                                  className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                >
                                  {hour}:00
                                </Badge>
                              ))}
                              {freeSlots.length > 5 && (
                                <Badge variant="outline" className="text-xs">
                                  +{freeSlots.length - 5} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Demo Calendars Button */}
      {calendars.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Calendar className="size-12 text-muted-foreground mx-auto" />
              <div>
                <p className="font-medium">No calendars connected yet</p>
                <p className="text-sm text-muted-foreground">
                  Add calendar feeds to start comparing schedules
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCalendars([
                      {
                        id: "1",
                        name: "Work Calendar",
                        url: "https://calendar.google.com/...",
                        color: "#3b82f6",
                        enabled: true,
                        events: generateMockEvents("1", "#3b82f6"),
                        lastSync: new Date(),
                      },
                      {
                        id: "2",
                        name: "Personal Calendar",
                        url: "https://outlook.office365.com/...",
                        color: "#22c55e",
                        enabled: true,
                        events: generateMockEvents("2", "#22c55e"),
                        lastSync: new Date(),
                      },
                      {
                        id: "3",
                        name: "Team Calendar",
                        url: "https://calendar.google.com/...",
                        color: "#f97316",
                        enabled: true,
                        events: generateMockEvents("3", "#f97316"),
                        lastSync: new Date(),
                      },
                    ])
                  }}
                >
                  <Users className="size-4 mr-2" />
                  Load Demo Calendars
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Add missing Chevron icons
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

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Info, Plus, X } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  date: string
  color: string
  url?: string
}

const EVENT_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#22c55e",
  "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6",
  "#a855f7", "#d946ef", "#f43f5e", "#64748b", "#1e293b"
]

export default function CalendarSyncOverlay() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDate, setNewEventDate] = useState("")
  const [newEventColor, setNewEventColor] = useState(EVENT_COLORS[0])
  const [newEventUrl, setNewEventUrl] = useState("")
  const [calendarName, setCalendarName] = useState("My Calendar")
  const [copied, setCopied] = useState<string | null>(null)

  const addEvent = useCallback(() => {
    if (!newEventTitle || !newEventDate) return
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      date: newEventDate,
      color: newEventColor,
      url: newEventUrl || undefined,
    }
    setEvents((prev) => [...prev, event])
    setNewEventTitle("")
    setNewEventDate("")
    setNewEventUrl("")
  }, [newEventTitle, newEventDate, newEventColor, newEventUrl])

  const removeEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [events])

  const generateICS = useCallback(() => {
    let ics = "BEGIN:VCALENDAR\n"
    ics += "VERSION:2.0\n"
    ics += `PRODID:-//${calendarName}//EN\n`
    ics += "CALSCALE:GREGORIAN\n"
    ics += "METHOD:PUBLISH\n"

    for (const event of events) {
      ics += "BEGIN:VEVENT\n"
      ics += `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z\n`
      ics += `DTSTART;VALUE=DATE:${event.date.replace(/-/g, "")}\n`
      ics += `SUMMARY:${event.title}\n`
      ics += `UID:${event.id}@calendar\n`
      if (event.url) {
        ics += `URL:${event.url}\n`
      }
      ics += "END:VEVENT\n"
    }

    ics += "END:VCALENDAR"
    return ics
  }, [events, calendarName])

  const generateGoogleCalendarUrl = useCallback(() => {
    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE"
    const params = events.map((event) => {
      const dateStr = event.date.replace(/-/g, "")
      return `&text=${encodeURIComponent(event.title)}&dates=${dateStr}/${dateStr}&details=${encodeURIComponent(event.url || "")}`
    })
    return baseUrl + params.join("")
  }, [events])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadICS = useCallback(() => {
    const ics = generateICS()
    const blob = new Blob([ics], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${calendarName.replace(/\s+/g, "_")}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }, [generateICS, calendarName])

  const handleClear = useCallback(() => {
    setEvents([])
    setCalendarName("My Calendar")
  }, [])

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const calendarDays = useMemo(() => {
    const days = []
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startOffset = firstDay.getDay()

    for (let i = 0; i < startOffset; i++) {
      days.push({ day: null, date: null })
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(currentYear, currentMonth, d)
      const dateStr = date.toISOString().split("T")[0]
      const dayEvents = events.filter((e) => e.date === dateStr)
      days.push({
        day: d,
        date: dateStr,
        events: dayEvents,
      })
    }

    return days
  }, [currentMonth, currentYear, events])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Calendar Name */}
      <section className="space-y-2">
        <Label htmlFor="calendar-name">Calendar Name</Label>
        <Input
          id="calendar-name"
          value={calendarName}
          onChange={(e) => setCalendarName(e.target.value)}
          placeholder="My Calendar"
        />
      </section>

      {/* Add Event */}
      <section className="space-y-4">
        <Label>Add Event</Label>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <Input
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            placeholder="Event title"
            className="lg:col-span-2"
          />
          <Input
            type="date"
            value={newEventDate}
            onChange={(e) => setNewEventDate(e.target.value)}
          />
          <div className="flex items-center gap-1">
            {EVENT_COLORS.slice(0, 5).map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${newEventColor === color ? "border-primary" : "border-transparent"}`}
                style={{ backgroundColor: color }}
                onClick={() => setNewEventColor(color)}
              />
            ))}
          </div>
          <Button onClick={addEvent} disabled={!newEventTitle || !newEventDate}>
            <Plus className="size-4 mr-1" />
            Add
          </Button>
        </div>
        <Input
          value={newEventUrl}
          onChange={(e) => setNewEventUrl(e.target.value)}
          placeholder="Event URL (optional)"
        />
      </section>

      {/* Calendar Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">
            {new Date(currentYear, currentMonth).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
          </Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadICS} disabled={events.length === 0}>
              Download .ICS
            </Button>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(generateICS(), "ics")} disabled={events.length === 0}>
              {copied === "ics" ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span className="ml-1">Copy ICS</span>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="grid grid-cols-7 bg-muted">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {calendarDays.map((item, idx) => (
              <div
                key={idx}
                className={`min-h-24 border-t border-r p-1 ${!item.day ? "bg-muted/30" : ""}`}
              >
                {item.day && (
                  <>
                    <span className="text-sm font-medium">{item.day}</span>
                    <div className="mt-1 space-y-1">
                      {item.events?.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className="text-xs px-1 py-0.5 rounded truncate"
                          style={{ backgroundColor: event.color + "30", color: event.color }}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {item.events && item.events.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{item.events.length - 3} more
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      {sortedEvents.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Events ({sortedEvents.length})</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <Trash2 className="size-4 mr-1" />
              Clear All
            </Button>
          </div>
          <div className="rounded-lg border bg-background divide-y">
            {sortedEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeEvent(event.id)}>
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Export Options */}
      {events.length > 0 && (
        <section className="rounded-lg border bg-muted/30 p-4">
          <h4 className="font-medium mb-3">Export Options</h4>
          <div className="space-y-2 text-sm">
            <Button variant="outline" className="w-full justify-start" onClick={downloadICS}>
              Download ICS file for import to any calendar app
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.open(generateGoogleCalendarUrl(), "_blank")}>
              Add to Google Calendar
            </Button>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Calendar Sync</h4>
            <p className="text-sm text-muted-foreground">
              Create a custom calendar with your events and export it as an ICS file.
              Import the ICS file into Google Calendar, Apple Calendar, Outlook, or any
              other calendar application that supports the iCalendar format.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

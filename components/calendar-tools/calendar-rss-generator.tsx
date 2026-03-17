"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Download, Plus, X } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: string
  recurrence: "none" | "daily" | "weekly" | "monthly" | "yearly"
}

export default function CalendarRssGenerator() {
  const [calendarName, setCalendarName] = useState("My Events Calendar")
  const [calendarDescription, setCalendarDescription] = useState("A calendar of upcoming events")
  const [websiteUrl, setWebsiteUrl] = useState("https://example.com")
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDescription, setNewEventDescription] = useState("")
  const [newEventDate, setNewEventDate] = useState("")
  const [newEventTime, setNewEventTime] = useState("12:00")
  const [newEventDuration, setNewEventDuration] = useState("60")
  const [newEventRecurrence, setNewEventRecurrence] = useState<CalendarEvent["recurrence"]>("none")
  const [copied, setCopied] = useState<string | null>(null)

  const addEvent = useCallback(() => {
    if (!newEventTitle || !newEventDate) return
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      description: newEventDescription,
      date: newEventDate,
      time: newEventTime,
      duration: newEventDuration,
      recurrence: newEventRecurrence,
    }
    setEvents((prev) => [...prev, event])
    setNewEventTitle("")
    setNewEventDescription("")
    setNewEventTime("12:00")
    setNewEventDuration("60")
  }, [newEventTitle, newEventDescription, newEventDate, newEventTime, newEventDuration, newEventRecurrence])

  const removeEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [events])

  const generateRSS = useMemo(() => {
    let rss = `<?xml version="1.0" encoding="UTF-8"?>\n`
    rss += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:calendar="http://www.w3.org/2002/12/cal/rfc2445#">\n`
    rss += `  <channel>\n`
    rss += `    <title>${calendarName}</title>\n`
    rss += `    <description>${calendarDescription}</description>\n`
    rss += `    <link>${websiteUrl}</link>\n`
    rss += `    <atom:link href="${websiteUrl}/calendar.xml" rel="self" type="application/rss+xml"/>\n`
    rss += `    <language>en-us</language>\n`
    rss += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`

    for (const event of sortedEvents) {
      const eventDate = new Date(`${event.date}T${event.time}`)
      const endDate = new Date(eventDate.getTime() + parseInt(event.duration) * 60000)
      
      rss += `    <item>\n`
      rss += `      <title>${event.title}</title>\n`
      rss += `      <description>${event.description}</description>\n`
      rss += `      <link>${websiteUrl}/events/${event.id}</link>\n`
      rss += `      <guid isPermaLink="false">${event.id}</guid>\n`
      rss += `      <pubDate>${eventDate.toUTCString()}</pubDate>\n`
      rss += `      <calendar:dtstart>${eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z</calendar:dtstart>\n`
      rss += `      <calendar:dtend>${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z</calendar:dtend>\n`
      if (event.recurrence !== "none") {
        rss += `      <calendar:rrule>FREQ=${event.recurrence.toUpperCase()}</calendar:rrule>\n`
      }
      rss += `    </item>\n`
    }

    rss += `  </channel>\n`
    rss += `</rss>`

    return rss
  }, [calendarName, calendarDescription, websiteUrl, sortedEvents])

  const generateICS = useMemo(() => {
    let ics = `BEGIN:VCALENDAR\n`
    ics += `VERSION:2.0\n`
    ics += `PRODID:-//${calendarName}//EN\n`
    ics += `CALSCALE:GREGORIAN\n`
    ics += `METHOD:PUBLISH\n`
    ics += `X-WR-CALNAME:${calendarName}\n`
    ics += `X-WR-CALDESC:${calendarDescription}\n`

    for (const event of sortedEvents) {
      const eventDate = new Date(`${event.date}T${event.time}`)
      const endDate = new Date(eventDate.getTime() + parseInt(event.duration) * 60000)
      
      ics += `BEGIN:VEVENT\n`
      ics += `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z\n`
      ics += `DTSTART:${eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z\n`
      ics += `DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z\n`
      ics += `SUMMARY:${event.title}\n`
      ics += `DESCRIPTION:${event.description}\n`
      ics += `UID:${event.id}@calendar\n`
      if (event.recurrence !== "none") {
        ics += `RRULE:FREQ=${event.recurrence.toUpperCase()}\n`
      }
      ics += `END:VEVENT\n`
    }

    ics += `END:VCALENDAR`
    return ics
  }, [calendarName, calendarDescription, sortedEvents])

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
    setEvents([])
  }, [])

  const downloadRSS = useCallback(() => {
    const blob = new Blob([generateRSS], { type: "application/rss+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${calendarName.replace(/\s+/g, "_")}.xml`
    link.click()
    URL.revokeObjectURL(url)
  }, [generateRSS, calendarName])

  const downloadICS = useCallback(() => {
    const blob = new Blob([generateICS], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${calendarName.replace(/\s+/g, "_")}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }, [generateICS, calendarName])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Configuration */}
      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="calendar-name">Calendar Name</Label>
          <Input
            id="calendar-name"
            value={calendarName}
            onChange={(e) => setCalendarName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="calendar-description">Description</Label>
          <Textarea
            id="calendar-description"
            value={calendarDescription}
            onChange={(e) => setCalendarDescription(e.target.value)}
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website-url">Website URL</Label>
          <Input
            id="website-url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
      </section>

      {/* Add Event */}
      <section className="space-y-3">
        <Label>Add Event</Label>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
          <Input
            type="time"
            value={newEventTime}
            onChange={(e) => setNewEventTime(e.target.value)}
          />
          <Input
            type="number"
            value={newEventDuration}
            onChange={(e) => setNewEventDuration(e.target.value)}
            placeholder="Duration (min)"
          />
          <Select value={newEventRecurrence} onValueChange={(v) => setNewEventRecurrence(v as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No recurrence</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          value={newEventDescription}
          onChange={(e) => setNewEventDescription(e.target.value)}
          placeholder="Event description (optional)"
          rows={2}
        />
        <Button onClick={addEvent} disabled={!newEventTitle || !newEventDate} className="w-full sm:w-auto">
          <Plus className="size-4 mr-1" />
          Add Event
        </Button>
      </section>

      {/* Export Options */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Export Calendar</Label>
          <Button variant="ghost" size="sm" onClick={handleClear} disabled={events.length === 0}>
            <Trash2 className="size-4 mr-1" />
            Clear All
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-background p-4 space-y-3">
            <h4 className="font-medium">RSS Feed</h4>
            <p className="text-sm text-muted-foreground">For web syndication and feed readers</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(generateRSS, "rss")} disabled={events.length === 0}>
                {copied === "rss" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-1">Copy RSS</span>
              </Button>
              <Button variant="outline" size="sm" onClick={downloadRSS} disabled={events.length === 0}>
                <Download className="size-4 mr-1" />
                Download XML
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-background p-4 space-y-3">
            <h4 className="font-medium">iCalendar (ICS)</h4>
            <p className="text-sm text-muted-foreground">For calendar applications</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(generateICS, "ics")} disabled={events.length === 0}>
                {copied === "ics" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-1">Copy ICS</span>
              </Button>
              <Button variant="outline" size="sm" onClick={downloadICS} disabled={events.length === 0}>
                <Download className="size-4 mr-1" />
                Download ICS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      {sortedEvents.length > 0 && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Events ({sortedEvents.length})</Label>
          <div className="rounded-lg border bg-background divide-y">
            {sortedEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3">
                <div className="flex-1">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()} at {event.time} ({event.duration} min)
                    {event.recurrence !== "none" && ` - ${event.recurrence}`}
                  </p>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeEvent(event.id)}>
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Calendar RSS</h4>
            <p className="text-sm text-muted-foreground">
              Generate RSS feeds and iCalendar (ICS) files for your events. RSS feeds allow
              users to subscribe to your calendar updates, while ICS files can be imported
              into Google Calendar, Apple Calendar, Outlook, and other calendar applications.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

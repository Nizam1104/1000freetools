"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Plus, Trash2, Download, Rss, Calendar, Clock, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string
  title: string
  description: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  location: string
  url: string
}

export default function CalendarRSSGenerator() {
  const [feedTitle, setFeedTitle] = useState("My Calendar Feed")
  const [feedDescription, setFeedDescription] = useState("Calendar events feed")
  const [feedUrl, setFeedUrl] = useState("https://example.com/calendar")
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    description: "",
    startDate: "",
    startTime: "09:00",
    endDate: "",
    endTime: "17:00",
    location: "",
    url: "",
  })
  const [format, setFormat] = useState<"ics" | "rss" | "atom">("ics")
  const [copied, setCopied] = useState<string | null>(null)

  const addEvent = useCallback(() => {
    if (!newEvent.title || !newEvent.startDate || !newEvent.endDate) return

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title || "",
      description: newEvent.description || "",
      startDate: newEvent.startDate || "",
      startTime: newEvent.startTime || "09:00",
      endDate: newEvent.endDate || "",
      endTime: newEvent.endTime || "17:00",
      location: newEvent.location || "",
      url: newEvent.url || "",
    }

    setEvents(prev => [...prev, event])
    setNewEvent({
      title: "",
      description: "",
      startDate: "",
      startTime: "09:00",
      endDate: "",
      endTime: "17:00",
      location: "",
      url: "",
    })
  }, [newEvent])

  const removeEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id))
  }, [])

  const generateICS = useMemo(() => {
    const now = new Date()
    const timestamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Calendar RSS Generator//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${feedTitle}
X-WR-CALDESC:${feedDescription}
X-WR-RELCALID:${feedUrl}
`

    events.forEach(event => {
      const startDateTime = `${event.startDate}T${event.startTime.replace(":", "")}00`
      const endDateTime = `${event.endDate}T${event.endTime.replace(":", "")}00`
      const uid = `${event.id}@calendar-rss-generator`
      const dtstamp = timestamp

      ics += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:${escapeICS(event.title)}
DESCRIPTION:${escapeICS(event.description)}
`

      if (event.location) {
        ics += `LOCATION:${escapeICS(event.location)}
`
      }

      if (event.url) {
        ics += `URL:${event.url}
`
      }

      ics += `END:VEVENT
`
    })

    ics += `END:VCALENDAR`
    return ics
  }, [feedTitle, feedDescription, feedUrl, events])

  const generateRSS = useMemo(() => {
    const now = new Date().toUTCString()

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:cal="http://www.w3.org/2002/12/cal#" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXML(feedTitle)}</title>
    <description>${escapeXML(feedDescription)}</description>
    <link>${feedUrl}</link>
    <lastBuildDate>${now}</lastBuildDate>
    <pubDate>${now}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${feedUrl}/feed.xml" rel="self" type="application/rss+xml"/>
`

    events.forEach(event => {
      const eventDate = new Date(`${event.startDate}T${event.startTime}`)
      rss += `    <item>
      <title>${escapeXML(event.title)}</title>
      <description>${escapeXML(event.description)}</description>
      <link>${event.url || feedUrl}</link>
      <guid isPermaLink="false">${event.id}</guid>
      <pubDate>${eventDate.toUTCString()}</pubDate>
      <cal:dtstart>${event.startDate}T${event.startTime.replace(":", "")}00Z</cal:dtstart>
      <cal:dtend>${event.endDate}T${event.endTime.replace(":", "")}00Z</cal:dtend>
`

      if (event.location) {
        rss += `      <cal:location>${escapeXML(event.location)}</cal:location>
`
      }

      rss += `    </item>
`
    })

    rss += `  </channel>
</rss>`
    return rss
  }, [feedTitle, feedDescription, feedUrl, events])

  const generateAtom = useMemo(() => {
    const now = new Date().toISOString()

    let atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:cal="http://www.w3.org/2002/12/cal#">
  <title>${escapeXML(feedTitle)}</title>
  <subtitle>${escapeXML(feedDescription)}</subtitle>
  <link href="${feedUrl}" rel="alternate"/>
  <link href="${feedUrl}/feed.atom" rel="self"/>
  <id>${feedUrl}</id>
  <updated>${now}</updated>
`

    events.forEach(event => {
      const eventDate = new Date(`${event.startDate}T${event.startTime}`)
      atom += `  <entry>
    <title>${escapeXML(event.title)}</title>
    <content type="html">${escapeXML(event.description)}</content>
    <link href="${event.url || feedUrl}"/>
    <id>urn:uuid:${event.id}</id>
    <published>${eventDate.toISOString()}</published>
    <updated>${now}</updated>
    <cal:dtstart>${event.startDate}T${event.startTime.replace(":", "")}00Z</cal:dtstart>
    <cal:dtend>${event.endDate}T${event.endTime.replace(":", "")}00Z</cal:dtend>
`

      if (event.location) {
        atom += `    <cal:location>${escapeXML(event.location)}</cal:location>
`
      }

      atom += `  </entry>
`
    })

    atom += `</feed>`
    return atom
  }, [feedTitle, feedDescription, feedUrl, events])

  const currentFeed = useMemo(() => {
    switch (format) {
      case "ics":
        return generateICS
      case "rss":
        return generateRSS
      case "atom":
        return generateAtom
    }
  }, [format, generateICS, generateRSS, generateAtom])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadFeed = useCallback(() => {
    const extension = format === "ics" ? "ics" : format === "rss" ? "xml" : "atom"
    const mimeType = format === "ics" ? "text/calendar" : "application/xml"
    const filename = `${feedTitle.toLowerCase().replace(/\s+/g, "-")}.${extension}`

    const blob = new Blob([currentFeed], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [currentFeed, format, feedTitle])

  function escapeICS(text: string): string {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\n/g, "\\n")
  }

  function escapeXML(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Feed Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rss className="size-5" />
            Calendar Feed Configuration
          </CardTitle>
          <CardDescription>
            Create an RSS/ICS/Atom feed from your events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="feed-title">Feed Title</Label>
              <Input
                id="feed-title"
                value={feedTitle}
                onChange={(e) => setFeedTitle(e.target.value)}
                placeholder="My Calendar Feed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feed-url">Feed URL</Label>
              <Input
                id="feed-url"
                value={feedUrl}
                onChange={(e) => setFeedUrl(e.target.value)}
                placeholder="https://example.com/calendar"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feed-description">Feed Description</Label>
            <Textarea
              id="feed-description"
              value={feedDescription}
              onChange={(e) => setFeedDescription(e.target.value)}
              placeholder="Description of your calendar feed"
              rows={2}
            />
          </div>

          {/* Format Selection */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant={format === "ics" ? "default" : "outline"}
              onClick={() => setFormat("ics")}
              className="gap-2"
            >
              <Calendar className="size-4" />
              iCalendar (.ics)
            </Button>
            <Button
              variant={format === "rss" ? "default" : "outline"}
              onClick={() => setFormat("rss")}
              className="gap-2"
            >
              <Rss className="size-4" />
              RSS 2.0
            </Button>
            <Button
              variant={format === "atom" ? "default" : "outline"}
              onClick={() => setFormat("atom")}
              className="gap-2"
            >
              <FileText className="size-4" />
              Atom
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            Add Events
          </CardTitle>
          <CardDescription>
            Add events to include in your calendar feed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Event Title</Label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Meeting, Conference, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-location">Location</Label>
              <Input
                id="event-location"
                value={newEvent.location}
                onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Conference Room A, Online, etc."
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-start-date">Start Date</Label>
              <Input
                id="event-start-date"
                type="date"
                value={newEvent.startDate}
                onChange={(e) => setNewEvent(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-start-time">Start Time</Label>
              <Input
                id="event-start-time"
                type="time"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-end-date">End Date</Label>
              <Input
                id="event-end-date"
                type="date"
                value={newEvent.endDate}
                onChange={(e) => setNewEvent(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-end-time">End Time</Label>
              <Input
                id="event-end-time"
                type="time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              value={newEvent.description}
              onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Event details, agenda, notes..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-url">Event URL (optional)</Label>
            <Input
              id="event-url"
              value={newEvent.url}
              onChange={(e) => setNewEvent(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://example.com/event-details"
            />
          </div>

          <Button onClick={addEvent} className="w-full gap-2">
            <Plus className="size-4" />
            Add Event
          </Button>

          {/* Events List */}
          {events.length > 0 && (
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-medium">Events ({events.length})</h4>
              <div className="space-y-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="size-3" />
                        {event.startDate} {event.startTime} - {event.endDate} {event.endTime}
                        {event.location && (
                          <>
                            <span className="mx-1">•</span>
                            {event.location}
                          </>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEvent(event.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5" />
                Generated Feed
              </CardTitle>
              <CardDescription>
                {format === "ics" ? "iCalendar format" : format === "rss" ? "RSS 2.0 format" : "Atom format"}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(currentFeed, "feed")}
              >
                {copied === "feed" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadFeed}
                className="gap-2"
              >
                <Download className="size-4" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={currentFeed}
            readOnly
            className="font-mono text-xs h-96"
          />
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use Your Calendar Feed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">iCalendar (.ics)</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Import into Google Calendar: Settings → Import &amp; Export</li>
              <li>Add to Apple Calendar: File → Import</li>
              <li>Subscribe in Outlook: File → Account Settings → Internet Calendars</li>
              <li>Use the download button to get the .ics file</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">RSS Feed</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Subscribe in feed readers like Feedly, Inoreader</li>
              <li>Add to calendar apps that support RSS calendars</li>
              <li>Use the feed URL in your website or app</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Atom Feed</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Modern alternative to RSS with better date handling</li>
              <li>Supported by most modern feed readers</li>
              <li>Better for programmatic consumption</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

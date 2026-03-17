"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Download, Plus, X } from "lucide-react"

interface SchoolEvent {
  id: string
  name: string
  startDate: string
  endDate: string
  type: "holiday" | "exam" | "break" | "event" | "deadline"
}

const EVENT_TYPES = [
  { value: "holiday", label: "Holiday", color: "#22c55e" },
  { value: "exam", label: "Exam Period", color: "#ef4444" },
  { value: "break", label: "Break", color: "#3b82f6" },
  { value: "event", label: "School Event", color: "#f59e0b" },
  { value: "deadline", label: "Deadline", color: "#8b5cf6" },
]

export default function AcademicCalendarMaker() {
  const [schoolName, setSchoolName] = useState("My School")
  const [academicYear, setAcademicYear] = useState(`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`)
  const [events, setEvents] = useState<SchoolEvent[]>([])
  const [newEventName, setNewEventName] = useState("")
  const [newEventStart, setNewEventStart] = useState("")
  const [newEventEnd, setNewEventEnd] = useState("")
  const [newEventType, setNewEventType] = useState<SchoolEvent["type"]>("event")
  const [copied, setCopied] = useState<string | null>(null)

  const addEvent = useCallback(() => {
    if (!newEventName || !newEventStart) return
    const event: SchoolEvent = {
      id: Date.now().toString(),
      name: newEventName,
      startDate: newEventStart,
      endDate: newEventEnd || newEventStart,
      type: newEventType,
    }
    setEvents((prev) => [...prev, event])
    setNewEventName("")
    setNewEventStart("")
    setNewEventEnd("")
  }, [newEventName, newEventStart, newEventEnd, newEventType])

  const removeEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
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

  const handleClear = useCallback(() => {
    setEvents([])
  }, [])

  const exportCalendar = useCallback(() => {
    const data = {
      schoolName,
      academicYear,
      events,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${schoolName.replace(/\s+/g, "_")}_calendar.json`
    link.click()
    URL.revokeObjectURL(url)
  }, [schoolName, academicYear, events])

  const getEventTypeColor = (type: SchoolEvent["type"]) => {
    return EVENT_TYPES.find((t) => t.value === type)?.color || "#64748b"
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const startYear = parseInt(academicYear.split("-")[0]) || new Date().getFullYear()

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Configuration */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="school-name">School/Institution Name</Label>
            <Input
              id="school-name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Enter school name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="academic-year">Academic Year</Label>
            <Input
              id="academic-year"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              placeholder="2024-2025"
            />
          </div>
        </div>
      </section>

      {/* Add Event */}
      <section className="space-y-3">
        <Label>Add Event</Label>
        <div className="grid sm:grid-cols-5 gap-3">
          <Input
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            placeholder="Event name"
            className="sm:col-span-2"
          />
          <Input
            type="date"
            value={newEventStart}
            onChange={(e) => setNewEventStart(e.target.value)}
          />
          <Input
            type="date"
            value={newEventEnd}
            onChange={(e) => setNewEventEnd(e.target.value)}
            placeholder="End date"
          />
          <Select value={newEventType} onValueChange={(v) => setNewEventType(v as SchoolEvent["type"])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={addEvent} disabled={!newEventName} className="w-full sm:w-auto">
          <Plus className="size-4 mr-1" />
          Add Event
        </Button>
      </section>

      {/* Calendar Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">{schoolName} - {academicYear}</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportCalendar} disabled={events.length === 0}>
              <Download className="size-4 mr-1" />
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear} disabled={events.length === 0}>
              <Trash2 className="size-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-background overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">
            {months.map((month, idx) => {
              const monthDate = new Date(startYear, idx, 1)
              const monthEvents = events.filter((e) => {
                const eventStart = new Date(e.startDate)
                const eventEnd = new Date(e.endDate)
                return eventStart.getMonth() === idx && eventStart.getFullYear() === startYear ||
                       eventEnd.getMonth() === idx && eventEnd.getFullYear() === startYear
              })

              return (
                <div key={month} className="p-3 min-h-32">
                  <h4 className="font-semibold mb-2">{month}</h4>
                  <div className="space-y-1">
                    {monthEvents.map((event) => (
                      <div
                        key={event.id}
                        className="text-xs px-2 py-1 rounded truncate"
                        style={{ backgroundColor: getEventTypeColor(event.type) + "20", color: getEventTypeColor(event.type) }}
                        title={event.name}
                      >
                        {new Date(event.startDate).getDate()}: {event.name}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Events List */}
      {sortedEvents.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">All Events ({sortedEvents.length})</Label>
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
                    style={{ backgroundColor: getEventTypeColor(event.type) }}
                  />
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: getEventTypeColor(event.type) + "20", color: getEventTypeColor(event.type) }}>
                    {EVENT_TYPES.find((t) => t.value === event.type)?.label}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => removeEvent(event.id)}>
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Legend */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="font-medium mb-3">Event Types</h4>
        <div className="flex flex-wrap gap-4">
          {EVENT_TYPES.map((type) => (
            <div key={type.value} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: type.color }} />
              <span className="text-sm">{type.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Academic Calendar</h4>
            <p className="text-sm text-muted-foreground">
              Create a custom academic calendar for your school or institution. Add holidays,
              exam periods, breaks, and important events. Export the calendar for sharing
              with students, parents, and staff.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

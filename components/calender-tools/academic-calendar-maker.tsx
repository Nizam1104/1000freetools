"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Download, Printer, Calendar, GraduationCap, BookOpen, TestTube, Coffee } from "lucide-react"
import { cn } from "@/lib/utils"

interface Term {
  id: string
  name: string
  startDate: string
  endDate: string
  color: string
}

interface Event {
  id: string
  name: string
  date: string
  type: "holiday" | "exam" | "break" | "deadline" | "other"
  termId?: string
  color: string
}

const TERM_COLORS = [
  { value: "#3b82f6", label: "Blue", class: "bg-blue-500" },
  { value: "#8b5cf6", label: "Purple", class: "bg-purple-500" },
  { value: "#ec4899", label: "Pink", class: "bg-pink-500" },
  { value: "#14b8a6", label: "Teal", class: "bg-teal-500" },
  { value: "#f59e0b", label: "Amber", class: "bg-amber-500" },
  { value: "#10b981", label: "Green", class: "bg-green-500" },
]

const EVENT_COLORS = [
  { value: "#ef4444", label: "Red", class: "bg-red-500" },
  { value: "#f97316", label: "Orange", class: "bg-orange-500" },
  { value: "#eab308", label: "Yellow", class: "bg-yellow-500" },
  { value: "#22c55e", label: "Green", class: "bg-green-500" },
  { value: "#3b82f6", label: "Blue", class: "bg-blue-500" },
  { value: "#8b5cf6", label: "Purple", class: "bg-purple-500" },
]

const EVENT_TYPES = [
  { value: "holiday", label: "Holiday", icon: Coffee },
  { value: "exam", label: "Exam", icon: TestTube },
  { value: "break", label: "Break", icon: Coffee },
  { value: "deadline", label: "Deadline", icon: Calendar },
  { value: "other", label: "Other", icon: Calendar },
]

export default function AcademicCalendarMaker() {
  const [schoolName, setSchoolName] = useState("Academic Year Calendar")
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear().toString())
  const [startDate, setStartDate] = useState(`${new Date().getFullYear()}-08-15`)
  const [endDate, setEndDate] = useState(`${new Date().getFullYear() + 1}-06-15`)
  const [terms, setTerms] = useState<Term[]>([
    { id: "1", name: "Fall Semester", startDate: `${new Date().getFullYear()}-08-15`, endDate: `${new Date().getFullYear()}-12-15`, color: "#3b82f6" },
    { id: "2", name: "Spring Semester", startDate: `${new Date().getFullYear() + 1}-01-10`, endDate: `${new Date().getFullYear() + 1}-05-15`, color: "#8b5cf6" },
  ])
  const [events, setEvents] = useState<Event[]>([
    { id: "1", name: "Labor Day", date: `${new Date().getFullYear()}-09-02`, type: "holiday", color: "#ef4444" },
    { id: "2", name: "Thanksgiving Break", date: `${new Date().getFullYear()}-11-28`, type: "break", color: "#f97316" },
    { id: "3", name: "Winter Break", date: `${new Date().getFullYear()}-12-20`, type: "break", color: "#22c55e" },
    { id: "4", name: "Final Exams", date: `${new Date().getFullYear() + 1}-05-10`, type: "exam", color: "#ef4444" },
  ])
  const [newTermName, setNewTermName] = useState("")
  const [newTermStart, setNewTermStart] = useState("")
  const [newTermEnd, setNewTermEnd] = useState("")
  const [newTermColor, setNewTermColor] = useState("#3b82f6")
  const [newEventName, setNewEventName] = useState("")
  const [newEventDate, setNewEventDate] = useState("")
  const [newEventType, setNewEventType] = useState<Event["type"]>("holiday")
  const [newEventColor, setNewEventColor] = useState("#ef4444")
  const [newEventTerm, setNewEventTerm] = useState("")

  const addTerm = useCallback(() => {
    if (!newTermName || !newTermStart || !newTermEnd) return
    setTerms(prev => [...prev, {
      id: Date.now().toString(),
      name: newTermName,
      startDate: newTermStart,
      endDate: newTermEnd,
      color: newTermColor,
    }])
    setNewTermName("")
    setNewTermStart("")
    setNewTermEnd("")
  }, [newTermName, newTermStart, newTermEnd, newTermColor])

  const removeTerm = useCallback((id: string) => {
    setTerms(prev => prev.filter(t => t.id !== id))
    setEvents(prev => prev.map(e => e.termId === id ? { ...e, termId: undefined } : e))
  }, [])

  const addEvent = useCallback(() => {
    if (!newEventName || !newEventDate) return
    setEvents(prev => [...prev, {
      id: Date.now().toString(),
      name: newEventName,
      date: newEventDate,
      type: newEventType,
      color: newEventColor,
      termId: newEventTerm || undefined,
    }])
    setNewEventName("")
    setNewEventDate("")
  }, [newEventName, newEventDate, newEventType, newEventColor, newEventTerm])

  const removeEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id))
  }, [])

  const getTermForDate = useCallback((dateStr: string) => {
    return terms.find(term => {
      const date = new Date(dateStr)
      const start = new Date(term.startDate)
      const end = new Date(term.endDate)
      return date >= start && date <= end
    })
  }, [terms])

  const getEventsForMonth = useCallback((year: number, month: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getFullYear() === year && eventDate.getMonth() === month
    })
  }, [events])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const handleDownload = useCallback(() => {
    const content = document.getElementById("calendar-preview")
    if (!content) return

    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${schoolName} - Academic Calendar ${academicYear}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; }
            .subtitle { font-size: 14px; color: #666; margin-top: 5px; }
            .terms { display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
            .term { padding: 10px 15px; border-radius: 8px; color: white; font-size: 12px; }
            .events { margin-top: 20px; }
            .event { padding: 8px 12px; margin: 5px 0; border-radius: 6px; font-size: 13px; }
            .months { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; }
            .month { border: 1px solid #ddd; border-radius: 8px; padding: 10px; }
            .month-title { font-weight: bold; text-align: center; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${schoolName}</div>
            <div class="subtitle">Academic Calendar ${academicYear}</div>
          </div>
          <div class="terms">
            ${terms.map(t => `<div class="term" style="background: ${t.color}">${t.name}: ${t.startDate} to ${t.endDate}</div>`).join('')}
          </div>
          <div class="events">
            <h3>Important Dates</h3>
            ${events.map(e => `<div class="event" style="background: ${e.color}20; border-left: 3px solid ${e.color}">${e.name} - ${e.date}</div>`).join('')}
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }, [schoolName, academicYear, terms, events])

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const calendarYear = parseInt(academicYear)

  const monthsData = useMemo(() => {
    return months.map((month, index) => {
      const year = index < 7 ? calendarYear : calendarYear + 1
      const daysInMonth = new Date(year, index + 1, 0).getDate()
      const firstDay = new Date(year, index, 1).getDay()
      const monthEvents = getEventsForMonth(year, index)

      const days: (number | null)[] = []
      for (let i = 0; i < firstDay; i++) {
        days.push(null)
      }
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
      }

      return {
        name: month,
        year,
        days,
        events: monthEvents,
      }
    })
  }, [calendarYear, getEventsForMonth])

  const getEventTypeIcon = (type: Event["type"]) => {
    const typeInfo = EVENT_TYPES.find(t => t.value === type)
    const Icon = typeInfo?.icon || Calendar
    return <Icon className="size-3" />
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="size-5" />
            Academic Calendar Settings
          </CardTitle>
          <CardDescription>
            Create a custom academic year calendar for your school or university
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid sm:grid-cols-3 gap-4">
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
                placeholder="Start year (e.g., 2024)"
              />
            </div>
            <div className="space-y-2">
              <Label>Academic Year Range</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Terms/Semesters */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4" />
              <h4 className="font-medium">Terms / Semesters</h4>
            </div>
            <div className="grid sm:grid-cols-4 gap-2">
              <Input
                placeholder="Term name"
                value={newTermName}
                onChange={(e) => setNewTermName(e.target.value)}
              />
              <Input
                type="date"
                value={newTermStart}
                onChange={(e) => setNewTermStart(e.target.value)}
                placeholder="Start"
              />
              <Input
                type="date"
                value={newTermEnd}
                onChange={(e) => setNewTermEnd(e.target.value)}
                placeholder="End"
              />
              <div className="flex gap-2">
                <Select value={newTermColor} onValueChange={setNewTermColor}>
                  <SelectTrigger className="w-20">
                    <div className={cn("size-4 rounded", TERM_COLORS.find(c => c.value === newTermColor)?.class)} />
                  </SelectTrigger>
                  <SelectContent>
                    {TERM_COLORS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        <div className={cn("size-4 rounded", c.class)} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addTerm} size="sm">
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
            {terms.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {terms.map((term) => (
                  <div
                    key={term.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-white"
                    style={{ backgroundColor: term.color }}
                  >
                    <span>{term.name}</span>
                    <span className="text-xs opacity-80">
                      {new Date(term.startDate).toLocaleDateString()} - {new Date(term.endDate).toLocaleDateString()}
                    </span>
                    <button onClick={() => removeTerm(term.id)} className="hover:opacity-70">
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Events */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <h4 className="font-medium">Holidays, Exams & Breaks</h4>
            </div>
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
              <Select value={newEventType} onValueChange={(v) => setNewEventType(v as Event["type"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      <div className="flex items-center gap-2">
                        <t.icon className="size-3" />
                        {t.label}
                      </div>
                    </SelectItem>
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
                {events.map((event) => {
                  const Icon = EVENT_TYPES.find(t => t.value === event.type)?.icon || Calendar
                  return (
                    <div
                      key={event.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border"
                      style={{ backgroundColor: `${event.color}20`, borderColor: event.color }}
                    >
                      <Icon className="size-3" style={{ color: event.color }} />
                      <span>{event.name}</span>
                      <span className="text-muted-foreground">{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                      <button onClick={() => removeEvent(event.id)} className="hover:opacity-70 ml-1">
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  )
                })}
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

      {/* Calendar Preview */}
      <Card id="calendar-preview">
        <CardHeader>
          <CardTitle>Calendar Preview</CardTitle>
          <CardDescription>
            {schoolName} - Academic Year {calendarYear}-{calendarYear + 1}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Terms Legend */}
          <div className="flex flex-wrap gap-3 mb-6">
            {terms.map((term) => (
              <div
                key={term.id}
                className="px-3 py-1.5 rounded-lg text-sm text-white"
                style={{ backgroundColor: term.color }}
              >
                {term.name}
              </div>
            ))}
          </div>

          {/* Months Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {monthsData.map((monthData) => (
              <div key={monthData.name} className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 py-2 text-center font-semibold text-sm">
                  {monthData.name} {monthData.year}
                </div>
                <div className="grid grid-cols-7 text-xs">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i} className="text-center py-1 text-muted-foreground font-medium">
                      {d}
                    </div>
                  ))}
                  {monthData.days.map((day, index) => {
                    const monthNum = months.findIndex(m => m === monthData.name) + 1
                    const dateStr = day ? `${monthData.year}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}` : ""
                    const term = day ? getTermForDate(dateStr) : null
                    const dayEvents = day ? monthData.events.filter(e => new Date(e.date).getDate() === day) : []

                    return (
                      <div
                        key={index}
                        className={cn(
                          "min-h-8 p-0.5 text-center border-t border-r text-xs",
                          !day && "bg-muted/20",
                          term && day && "text-white"
                        )}
                        style={term && day ? { backgroundColor: term.color } : {}}
                      >
                        {day && (
                          <>
                            <span>{day}</span>
                            {dayEvents.slice(0, 1).map((event, i) => (
                              <div
                                key={i}
                                className="truncate text-[9px] mt-0.5"
                                style={{ color: term ? "white" : event.color }}
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
            ))}
          </div>

          {/* Events Summary */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-3">Important Dates Summary</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => {
                const Icon = EVENT_TYPES.find(t => t.value === event.type)?.icon || Calendar
                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-2 p-2 rounded-lg border"
                    style={{ backgroundColor: `${event.color}10` }}
                  >
                    <Icon className="size-4" style={{ color: event.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{event.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {EVENT_TYPES.find(t => t.value === event.type)?.label}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #calendar-preview, #calendar-preview * {
            visibility: visible;
          }
          #calendar-preview {
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

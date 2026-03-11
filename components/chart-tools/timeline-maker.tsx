"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Download, Trash2, Plus, Calendar, Image as ImageIcon } from "lucide-react"

interface TimelineEvent {
  id: string
  title: string
  description: string
  date: string
  image?: string
  color: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B"]

const TEMPLATES = {
  project: [
    { title: "Project Kickoff", description: "Initial meeting with stakeholders", date: "2024-01-15" },
    { title: "Requirements Gathering", description: "Collect and document all requirements", date: "2024-01-30" },
    { title: "Design Phase", description: "Create wireframes and mockups", date: "2024-02-15" },
    { title: "Development", description: "Build the application", date: "2024-03-01" },
    { title: "Testing", description: "QA and user acceptance testing", date: "2024-04-01" },
    { title: "Launch", description: "Deploy to production", date: "2024-04-15" },
  ],
  history: [
    { title: "Founded", description: "Company was established", date: "2010-01-01" },
    { title: "First Product", description: "Launched our first product", date: "2012-06-15" },
    { title: "Series A", description: "Raised $5M in funding", date: "2015-03-20" },
    { title: "Expansion", description: "Opened international offices", date: "2018-09-10" },
    { title: "IPO", description: "Went public on NASDAQ", date: "2022-01-15" },
  ],
  personal: [
    { title: "Graduation", description: "Completed university degree", date: "2018-05-20" },
    { title: "First Job", description: "Started career at Tech Corp", date: "2018-07-01" },
    { title: "Promotion", description: "Promoted to Senior Developer", date: "2020-03-15" },
    { title: "New Role", description: "Joined as Engineering Manager", date: "2023-01-10" },
  ],
}

export default function TimelineMaker() {
  const [chartTitle, setChartTitle] = useState("Project Timeline")
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
  const [events, setEvents] = useState<TimelineEvent[]>([
    { id: "1", title: "Start", description: "Project begins", date: "2024-01-01", color: COLORS[0] },
    { id: "2", title: "Milestone 1", description: "First major milestone", date: "2024-02-15", color: COLORS[1] },
    { id: "3", title: "Milestone 2", description: "Second major milestone", date: "2024-04-01", color: COLORS[2] },
    { id: "4", title: "Completion", description: "Project completed", date: "2024-06-01", color: COLORS[3] },
  ])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showDescriptions, setShowDescriptions] = useState(true)
  const [showDates, setShowDates] = useState(true)
  const [lineStyle, setLineStyle] = useState<'solid' | 'dashed' | 'dotted'>('solid')
  const [copied, setCopied] = useState<string | null>(null)

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [events])

  const addEvent = useCallback(() => {
    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      title: "New Event",
      description: "Event description",
      date: new Date().toISOString().split('T')[0],
      color: COLORS[events.length % COLORS.length]
    }
    setEvents(prev => [...prev, newEvent])
    setSelectedId(newEvent.id)
  }, [events.length])

  const removeEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id))
    if (selectedId === id) setSelectedId(null)
  }, [selectedId])

  const updateEvent = useCallback((id: string, updates: Partial<TimelineEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))
  }, [])

  const loadTemplate = useCallback((template: keyof typeof TEMPLATES) => {
    const templateEvents = TEMPLATES[template].map((t, idx) => ({
      id: `template-${idx}`,
      ...t,
      color: COLORS[idx % COLORS.length]
    }))
    setEvents(templateEvents)
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadChart = useCallback(() => {
    alert("Download functionality would export the timeline as PNG/PDF")
  }, [])

  const exportEmbedCode = useCallback(() => {
    const code = `<div class="timeline">
  <h2>${chartTitle}</h2>
  ${sortedEvents.map(e => `
  <div class="event" style="border-color: ${e.color}">
    <div class="date">${e.date}</div>
    <div class="title">${e.title}</div>
    <div class="description">${e.description}</div>
  </div>`).join('')}
</div>`
    copyToClipboard(code, "embed")
  }, [chartTitle, sortedEvents, copyToClipboard])

  const selectedEvent = events.find(e => e.id === selectedId)

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="chart-title" className="text-base font-medium">Timeline</Label>
            <Input
              id="chart-title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Enter timeline title"
              className="max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportEmbedCode}>
              <Copy className="size-4 mr-1" />
              Embed Code
            </Button>
            <Button variant="outline" size="sm" onClick={downloadChart}>
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </section>

      {/* Templates and Options */}
      <section className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Templates:</span>
            <Select onValueChange={loadTemplate}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-6 w-px bg-border"></div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Orientation:</span>
            <Button
              variant={orientation === 'horizontal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOrientation('horizontal')}
            >
              Horizontal
            </Button>
            <Button
              variant={orientation === 'vertical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOrientation('vertical')}
            >
              Vertical
            </Button>
          </div>

          <div className="h-6 w-px bg-border"></div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Line Style:</span>
            <Select value={lineStyle} onValueChange={(v) => setLineStyle(v as any)}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" onClick={addEvent}>
            <Plus className="size-4 mr-1" />
            Add Event
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="show-descriptions"
              checked={showDescriptions}
              onCheckedChange={setShowDescriptions}
            />
            <Label htmlFor="show-descriptions" className="text-sm cursor-pointer">Show Descriptions</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="show-dates"
              checked={showDates}
              onCheckedChange={setShowDates}
            />
            <Label htmlFor="show-dates" className="text-sm cursor-pointer">Show Dates</Label>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Events ({events.length})</h3>
        <div className="rounded-lg border bg-background overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3 text-left font-medium">Color</th>
                <th className="p-3 text-left font-medium">Title</th>
                <th className="p-3 text-left font-medium">Date</th>
                <th className="p-3 text-left font-medium">Description</th>
                <th className="p-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedEvents.map((event) => (
                <tr key={event.id} className={`hover:bg-muted/30 ${selectedId === event.id ? 'bg-primary/10' : ''}`}>
                  <td className="p-3">
                    <Input
                      type="color"
                      value={event.color}
                      onChange={(e) => updateEvent(event.id, { color: e.target.value })}
                      className="w-10 h-6 p-0"
                    />
                  </td>
                  <td className="p-3">
                    <Input
                      value={event.title}
                      onChange={(e) => updateEvent(event.id, { title: e.target.value })}
                      className="w-40"
                    />
                  </td>
                  <td className="p-3">
                    <Input
                      type="date"
                      value={event.date}
                      onChange={(e) => updateEvent(event.id, { date: e.target.value })}
                      className="w-36"
                    />
                  </td>
                  <td className="p-3">
                    <Input
                      value={event.description}
                      onChange={(e) => updateEvent(event.id, { description: e.target.value })}
                      className="w-48"
                    />
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="xs" onClick={() => setSelectedId(event.id)}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="xs" onClick={() => removeEvent(event.id)}>
                      <Trash2 className="size-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Timeline Preview */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Timeline Preview</Label>
        <div className="rounded-lg border bg-background p-6 overflow-hidden">
          <h3 className="text-lg font-semibold text-center mb-8">{chartTitle}</h3>
          
          {orientation === 'horizontal' ? (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2" 
                style={{ 
                  borderStyle: lineStyle,
                  borderTopWidth: lineStyle === 'solid' ? 4 : 2
                }} 
              />
              
              {/* Events */}
              <div className="relative flex justify-between items-center min-h-[200px]">
                {sortedEvents.map((event, idx) => {
                  const isTop = idx % 2 === 0
                  return (
                    <div
                      key={event.id}
                      className="flex flex-col items-center z-10"
                      style={{ minWidth: `${100 / sortedEvents.length}%` }}
                    >
                      {isTop ? (
                        <>
                          <div className="mb-4 text-center max-w-[150px]">
                            {showDates && (
                              <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                                <Calendar className="size-3" />
                                {formatDate(event.date)}
                              </div>
                            )}
                            <div className="font-semibold text-sm" style={{ color: event.color }}>
                              {event.title}
                            </div>
                            {showDescriptions && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {event.description}
                              </div>
                            )}
                          </div>
                          <div
                            className="w-4 h-4 rounded-full border-2 bg-background"
                            style={{ borderColor: event.color }}
                          />
                        </>
                      ) : (
                        <>
                          <div
                            className="w-4 h-4 rounded-full border-2 bg-background"
                            style={{ borderColor: event.color }}
                          />
                          <div className="mt-4 text-center max-w-[150px]">
                            {showDates && (
                              <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                                <Calendar className="size-3" />
                                {formatDate(event.date)}
                              </div>
                            )}
                            <div className="font-semibold text-sm" style={{ color: event.color }}>
                              {event.title}
                            </div>
                            {showDescriptions && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {event.description}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="relative pl-8">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-muted"
                style={{ 
                  borderStyle: lineStyle,
                  borderLeftWidth: lineStyle === 'solid' ? 4 : 2
                }}
              />
              
              {/* Events */}
              <div className="space-y-8">
                {sortedEvents.map((event) => (
                  <div key={event.id} className="relative flex items-start gap-4">
                    <div
                      className="w-4 h-4 rounded-full border-2 bg-background shrink-0 mt-1 z-10"
                      style={{ borderColor: event.color }}
                    />
                    <div className="flex-1">
                      {showDates && (
                        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <Calendar className="size-3" />
                          {formatDate(event.date)}
                        </div>
                      )}
                      <div className="font-semibold" style={{ color: event.color }}>
                        {event.title}
                      </div>
                      {showDescriptions && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {event.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Properties Panel */}
      {selectedEvent && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Edit Event</Label>
            <Button variant="ghost" size="sm" onClick={() => removeEvent(selectedEvent.id)}>
              <Trash2 className="size-4 mr-1" />
              Delete
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg border bg-background p-4">
            <div className="space-y-2">
              <Label htmlFor="event-title" className="text-sm">Title</Label>
              <Input
                id="event-title"
                value={selectedEvent.title}
                onChange={(e) => updateEvent(selectedEvent.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-date" className="text-sm">Date</Label>
              <Input
                id="event-date"
                type="date"
                value={selectedEvent.date}
                onChange={(e) => updateEvent(selectedEvent.id, { date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-description" className="text-sm">Description</Label>
              <Input
                id="event-description"
                value={selectedEvent.description}
                onChange={(e) => updateEvent(selectedEvent.id, { description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-color" className="text-sm">Color</Label>
              <Input
                id="event-color"
                type="color"
                value={selectedEvent.color}
                onChange={(e) => updateEvent(selectedEvent.id, { color: e.target.value })}
                className="w-full h-9"
              />
            </div>
          </div>
        </section>
      )}

      {/* Summary */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Timeline Summary</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground">Total Events</p>
            <p className="text-2xl font-semibold">{events.length}</p>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground">First Event</p>
            <p className="text-lg font-semibold">{sortedEvents[0] ? formatDate(sortedEvents[0].date) : '-'}</p>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground">Last Event</p>
            <p className="text-lg font-semibold">{sortedEvents[sortedEvents.length - 1] ? formatDate(sortedEvents[sortedEvents.length - 1].date) : '-'}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

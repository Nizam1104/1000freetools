"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Download, Plus, X } from "lucide-react"

interface Door {
  id: number
  date: string
  content: string
  color: string
  revealed: boolean
}

const COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"]

export default function AdventCalendarCreator() {
  const [calendarName, setCalendarName] = useState("My Advent Calendar")
  const [year, setYear] = useState(new Date().getFullYear())
  const [startDate, setStartDate] = useState("12-01")
  const [doors, setDoors] = useState<Door[]>(
    Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      date: "",
      content: `Day ${i + 1} surprise!`,
      color: COLORS[i % COLORS.length],
      revealed: false,
    }))
  )
  const [copied, setCopied] = useState<string | null>(null)

  const updateDoor = useCallback((id: number, field: keyof Door, value: any) => {
    setDoors((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)))
  }, [])

  const toggleReveal = useCallback((id: number) => {
    setDoors((prev) => prev.map((d) => (d.id === id ? { ...d, revealed: !d.revealed } : d)))
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

  const handleClear = useCallback(() => {
    setDoors((prev) => prev.map((d) => ({ ...d, content: `Day ${d.id} surprise!`, revealed: false })))
  }, [])

  const exportCalendar = useCallback(() => {
    const data = { calendarName, year, startDate, doors }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${calendarName.replace(/\s+/g, "_")}.json`
    link.click()
    URL.revokeObjectURL(url)
  }, [calendarName, year, startDate, doors])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Configuration */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="calendar-name">Calendar Name</Label>
            <Input
              id="calendar-name"
              value={calendarName}
              onChange={(e) => setCalendarName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="MM-DD"
            />
          </div>
        </div>
      </section>

      {/* Doors Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">{calendarName} - {year}</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportCalendar}>
              <Download className="size-4 mr-1" />
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <Trash2 className="size-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {doors.map((door) => (
            <div
              key={door.id}
              className="aspect-square rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:scale-105"
              style={{
                backgroundColor: door.revealed ? "#fef3c7" : door.color,
                borderColor: door.revealed ? door.color : "transparent",
              }}
              onClick={() => toggleReveal(door.id)}
            >
              <div className="h-full flex flex-col items-center justify-center p-2">
                <span className="text-2xl font-bold text-white drop-shadow-lg">{door.id}</span>
                {door.revealed && (
                  <p className="text-xs text-center mt-1 text-gray-800 line-clamp-3">
                    {door.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Door Editor */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Edit Door Contents</Label>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-auto">
          {doors.map((door) => (
            <div key={door.id} className="rounded-lg border bg-background p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Door {door.id}</span>
                <input
                  type="color"
                  value={door.color}
                  onChange={(e) => updateDoor(door.id, "color", e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer"
                />
              </div>
              <Input
                value={door.content}
                onChange={(e) => updateDoor(door.id, "content", e.target.value)}
                placeholder="Enter surprise..."
                className="text-sm"
              />
              <Button
                variant={door.revealed ? "default" : "outline"}
                size="sm"
                onClick={() => toggleReveal(door.id)}
                className="w-full"
              >
                {door.revealed ? "Hide" : "Reveal"}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Advent Calendar</h4>
            <p className="text-sm text-muted-foreground">
              Create a custom digital Advent calendar with 24 doors for the countdown to Christmas.
              Click on each door to reveal its surprise. Customize the content for each day
              with messages, activities, or treats. Perfect for families and classrooms.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

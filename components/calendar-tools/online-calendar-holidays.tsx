"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, Trash2, Info, Download, Plus, X } from "lucide-react"

interface Holiday {
  id: string
  name: string
  date: string
  type: "public" | "observance" | "religious" | "custom"
  recurring: boolean
}

const PRESET_HOLIDAYS: Holiday[] = [
  { id: "1", name: "New Year's Day", date: "01-01", type: "public", recurring: true },
  { id: "2", name: "Martin Luther King Jr. Day", date: "01-15", type: "public", recurring: true },
  { id: "3", name: "Presidents' Day", date: "02-19", type: "public", recurring: true },
  { id: "4", name: "Memorial Day", date: "05-27", type: "public", recurring: true },
  { id: "5", name: "Independence Day", date: "07-04", type: "public", recurring: true },
  { id: "6", name: "Labor Day", date: "09-02", type: "public", recurring: true },
  { id: "7", name: "Columbus Day", date: "10-14", type: "public", recurring: true },
  { id: "8", name: "Veterans Day", date: "11-11", type: "public", recurring: true },
  { id: "9", name: "Thanksgiving", date: "11-28", type: "public", recurring: true },
  { id: "10", name: "Christmas Day", date: "12-25", type: "public", recurring: true },
  { id: "11", name: "Valentine's Day", date: "02-14", type: "observance", recurring: true },
  { id: "12", name: "Halloween", date: "10-31", type: "observance", recurring: true },
  { id: "13", name: "Easter", date: "03-31", type: "religious", recurring: true },
  { id: "14", name: "Good Friday", date: "03-29", type: "religious", recurring: true },
]

export default function OnlineCalendarHolidays() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [holidays, setHolidays] = useState<Holiday[]>(PRESET_HOLIDAYS)
  const [newHolidayName, setNewHolidayName] = useState("")
  const [newHolidayDate, setNewHolidayDate] = useState("")
  const [newHolidayType, setNewHolidayType] = useState<Holiday["type"]>("custom")
  const [newHolidayRecurring, setNewHolidayRecurring] = useState(true)
  const [filterType, setFilterType] = useState<string>("all")
  const [copied, setCopied] = useState<string | null>(null)

  const addHoliday = useCallback(() => {
    if (!newHolidayName || !newHolidayDate) return
    const holiday: Holiday = {
      id: Date.now().toString(),
      name: newHolidayName,
      date: newHolidayDate,
      type: newHolidayType,
      recurring: newHolidayRecurring,
    }
    setHolidays((prev) => [...prev, holiday])
    setNewHolidayName("")
    setNewHolidayDate("")
  }, [newHolidayName, newHolidayDate, newHolidayType, newHolidayRecurring])

  const removeHoliday = useCallback((id: string) => {
    setHolidays((prev) => prev.filter((h) => h.id !== id))
  }, [])

  const toggleHoliday = useCallback((id: string) => {
    setHolidays((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name: h.name } : h))
    )
  }, [])

  const filteredHolidays = useMemo(() => {
    let filtered = holidays
    if (filterType !== "all") {
      filtered = filtered.filter((h) => h.type === filterType)
    }
    return filtered.sort((a, b) => a.date.localeCompare(b.date))
  }, [holidays, filterType])

  const holidaysForYear = useMemo(() => {
    return filteredHolidays.map((holiday) => {
      const [month, day] = holiday.date.split("-")
      let date: Date

      if (holiday.recurring) {
        date = new Date(selectedYear, parseInt(month) - 1, parseInt(day))
      } else {
        date = new Date(`${selectedYear}-${holiday.date}`)
      }

      const dayOfWeek = date.getDay()
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

      return {
        ...holiday,
        fullDate: date,
        dayOfWeek: dayNames[dayOfWeek],
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      }
    })
  }, [filteredHolidays, selectedYear])

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
    setHolidays(PRESET_HOLIDAYS)
  }, [])

  const exportHolidays = useCallback(() => {
    let ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Holiday Calendar//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:Holidays ${selectedYear}\n`

    for (const holiday of holidaysForYear) {
      ics += `BEGIN:VEVENT\n`
      ics += `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z\n`
      ics += `DTSTART;VALUE=DATE:${holiday.fullDate.toISOString().split("T")[0].replace(/-/g, "")}\n`
      ics += `SUMMARY:${holiday.name}\n`
      ics += `UID:${holiday.id}@holidays\n`
      ics += `END:VEVENT\n`
    }

    ics += `END:VCALENDAR`

    const blob = new Blob([ics], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `holidays_${selectedYear}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }, [holidaysForYear, selectedYear])

  const getTypeColor = (type: Holiday["type"]) => {
    switch (type) {
      case "public": return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "observance": return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "religious": return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
      case "custom": return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Configuration */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value) || new Date().getFullYear())}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="filter">Filter by Type</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger id="filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="public">Public Holidays</SelectItem>
                <SelectItem value="observance">Observances</SelectItem>
                <SelectItem value="religious">Religious</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Add Holiday */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Add Custom Holiday</Label>
        <div className="grid sm:grid-cols-5 gap-3">
          <Input
            value={newHolidayName}
            onChange={(e) => setNewHolidayName(e.target.value)}
            placeholder="Holiday name"
            className="sm:col-span-2"
          />
          <Input
            type="date"
            value={newHolidayDate}
            onChange={(e) => setNewHolidayDate(e.target.value)}
          />
          <Select value={newHolidayType} onValueChange={(v) => setNewHolidayType(v as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="observance">Observance</SelectItem>
              <SelectItem value="religious">Religious</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Checkbox
              id="recurring"
              checked={newHolidayRecurring}
              onCheckedChange={(v) => setNewHolidayRecurring(v as boolean)}
            />
            <Label htmlFor="recurring" className="text-sm cursor-pointer">Recurring</Label>
          </div>
        </div>
        <Button onClick={addHoliday} disabled={!newHolidayName || !newHolidayDate} className="w-full sm:w-auto">
          <Plus className="size-4 mr-1" />
          Add Holiday
        </Button>
      </section>

      {/* Actions */}
      <section className="flex gap-2">
        <Button variant="outline" onClick={exportHolidays} className="flex-1">
          <Download className="size-4 mr-2" />
          Export to Calendar
        </Button>
        <Button variant="ghost" onClick={handleClear}>
          <Trash2 className="size-4 mr-2" />
          Reset to Defaults
        </Button>
      </section>

      {/* Holidays List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">
            Holidays for {selectedYear} ({holidaysForYear.length})
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(
              holidaysForYear.map((h) => `${h.name}: ${h.fullDate.toLocaleDateString()}`).join("\n"),
              "list"
            )}
            className="h-7"
          >
            {copied === "list" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy List</span>
          </Button>
        </div>

        <div className="rounded-lg border bg-background divide-y">
          {holidaysForYear.map((holiday) => (
            <div key={holiday.id} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-lg font-bold">
                    {holiday.fullDate.getDate()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{holiday.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {holiday.dayOfWeek}, {holiday.fullDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                    {holiday.isWeekend && (
                      <span className="ml-2 text-orange-500">(Weekend)</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded capitalize ${getTypeColor(holiday.type)}`}>
                  {holiday.type}
                </span>
                {!PRESET_HOLIDAYS.find((h) => h.id === holiday.id) && (
                  <Button variant="ghost" size="sm" onClick={() => removeHoliday(holiday.id)}>
                    <X className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly View */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Monthly Overview</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 12 }, (_, i) => {
            const monthHolidays = holidaysForYear.filter((h) => h.fullDate.getMonth() === i)
            const monthName = new Date(selectedYear, i).toLocaleDateString(undefined, { month: "long" })
            return (
              <div key={i} className="rounded-lg border bg-background p-3">
                <h4 className="font-medium text-sm mb-2">{monthName}</h4>
                <div className="space-y-1">
                  {monthHolidays.slice(0, 3).map((h) => (
                    <div key={h.id} className="text-xs">
                      <span className="font-medium">{h.fullDate.getDate()}</span>: {h.name}
                    </div>
                  ))}
                  {monthHolidays.length > 3 && (
                    <p className="text-xs text-muted-foreground">+{monthHolidays.length - 3} more</p>
                  )}
                  {monthHolidays.length === 0 && (
                    <p className="text-xs text-muted-foreground">No holidays</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Holiday Calendar</h4>
            <p className="text-sm text-muted-foreground">
              View and manage holidays for any year. Includes US federal holidays,
              observances, and religious holidays. Add custom holidays and export
              to your calendar application. Filter by type and see which holidays
              fall on weekends.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

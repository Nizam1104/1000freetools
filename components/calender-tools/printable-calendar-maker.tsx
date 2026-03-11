"use client"

import * as React from "react"
import { useState, useMemo, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Calendar, Download, Printer, Plus, Trash2, Palette, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface Holiday {
  id: string
  date: string
  name: string
  color: string
}

const FONT_OPTIONS = [
  { value: "font-sans", label: "Sans Serif" },
  { value: "font-serif", label: "Serif" },
  { value: "font-mono", label: "Monospace" },
]

const COLOR_OPTIONS = [
  { value: "#000000", label: "Black", bg: "bg-black" },
  { value: "#1e293b", label: "Slate", bg: "bg-slate-800" },
  { value: "#dc2626", label: "Red", bg: "bg-red-600" },
  { value: "#2563eb", label: "Blue", bg: "bg-blue-600" },
  { value: "#16a34a", label: "Green", bg: "bg-green-600" },
  { value: "#9333ea", label: "Purple", bg: "bg-purple-600" },
  { value: "#ea580c", label: "Orange", bg: "bg-orange-600" },
  { value: "#0891b2", label: "Cyan", bg: "bg-cyan-600" },
]

const LAYOUT_OPTIONS = [
  { value: "monthly", label: "Monthly", icon: Calendar },
  { value: "yearly", label: "Yearly", icon: FileText },
  { value: "weekly", label: "Weekly", icon: Calendar },
]

export default function PrintableCalendarMaker() {
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [month, setMonth] = useState(new Date().getMonth().toString())
  const [layout, setLayout] = useState("monthly")
  const [fontClass, setFontClass] = useState("font-sans")
  const [primaryColor, setPrimaryColor] = useState("#2563eb")
  const [showWeekNumbers, setShowWeekNumbers] = useState(true)
  const [showNotes, setShowNotes] = useState(true)
  const [notes, setNotes] = useState("")
  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: "1", date: `${new Date().getFullYear()}-01-01`, name: "New Year's Day", color: "#dc2626" },
    { id: "2", date: `${new Date().getFullYear()}-12-25`, name: "Christmas", color: "#16a34a" },
  ])
  const [newHolidayName, setNewHolidayName] = useState("")
  const [newHolidayDate, setNewHolidayDate] = useState("")
  const [newHolidayColor, setNewHolidayColor] = useState("#dc2626")
  const printRef = useRef<HTMLDivElement>(null)

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const getDaysInMonth = useCallback((year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }, [])

  const getFirstDayOfMonth = useCallback((year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }, [])

  const calendarData = useMemo(() => {
    const yearNum = parseInt(year) || new Date().getFullYear()
    const monthNum = parseInt(month) || 0
    const daysInMonth = getDaysInMonth(yearNum, monthNum)
    const firstDay = getFirstDayOfMonth(yearNum, monthNum)
    const weeks: (number | null)[][] = []
    let currentWeek: (number | null)[] = []

    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null)
      }
      weeks.push(currentWeek)
    }

    return { weeks, yearNum, monthNum }
  }, [year, month, getDaysInMonth, getFirstDayOfMonth])

  const getHolidayForDate = useCallback((day: number) => {
    const dateStr = `${calendarData.yearNum}-${String(calendarData.monthNum + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return holidays.find(h => h.date === dateStr)
  }, [calendarData, holidays])

  const addHoliday = useCallback(() => {
    if (!newHolidayName || !newHolidayDate) return
    setHolidays(prev => [...prev, {
      id: Date.now().toString(),
      date: newHolidayDate,
      name: newHolidayName,
      color: newHolidayColor
    }])
    setNewHolidayName("")
    setNewHolidayDate("")
  }, [newHolidayName, newHolidayDate, newHolidayColor])

  const removeHoliday = useCallback((id: string) => {
    setHolidays(prev => prev.filter(h => h.id !== id))
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const handleDownload = useCallback(() => {
    const printContent = printRef.current
    if (!printContent) return

    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Calendar ${months[calendarData.monthNum]} ${calendarData.yearNum}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 20px; }
            .calendar-container { max-width: 800px; margin: 0 auto; }
            .calendar-header { text-align: center; margin-bottom: 20px; }
            .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: #e5e7eb; border: 1px solid #e5e7eb; }
            .calendar-cell { background: white; padding: 10px; min-height: 80px; }
            .day-header { font-weight: bold; text-align: center; background: #f3f4f6; padding: 8px; }
            .day-number { font-weight: bold; margin-bottom: 4px; }
            .holiday { color: ${primaryColor}; font-size: 0.85em; }
            .notes-section { margin-top: 20px; border-top: 2px solid #e5e7eb; padding-top: 20px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }, [calendarData, months, primaryColor])

  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar Settings</CardTitle>
          <CardDescription>Customize your printable calendar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={layout} onValueChange={setLayout} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {LAYOUT_OPTIONS.map((opt) => (
                <TabsTrigger key={opt.value} value={opt.value} className="gap-2">
                  <opt.icon className="size-4" />
                  {opt.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year-select">Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger id="year-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i).map((y) => (
                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {layout !== "yearly" && (
              <div className="space-y-2">
                <Label htmlFor="month-select">Month</Label>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger id="month-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m, i) => (
                      <SelectItem key={i} value={i.toString()}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="font-select">Font Style</Label>
              <Select value={fontClass} onValueChange={setFontClass}>
                <SelectTrigger id="font-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FONT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color-select">Primary Color</Label>
              <Select value={primaryColor} onValueChange={setPrimaryColor}>
                <SelectTrigger id="color-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center gap-2">
                        <div className={cn("size-4 rounded-full", opt.bg)} />
                        {opt.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
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
                id="show-notes"
                checked={showNotes}
                onCheckedChange={(checked) => setShowNotes(checked as boolean)}
              />
              <Label htmlFor="show-notes" className="cursor-pointer">Include Notes Section</Label>
            </div>
          </div>

          {/* Holidays Section */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Palette className="size-4" />
              <h4 className="font-medium">Holidays & Events</h4>
            </div>
            <div className="grid sm:grid-cols-4 gap-2">
              <Input
                placeholder="Event name"
                value={newHolidayName}
                onChange={(e) => setNewHolidayName(e.target.value)}
              />
              <Input
                type="date"
                value={newHolidayDate}
                onChange={(e) => setNewHolidayDate(e.target.value)}
              />
              <Select value={newHolidayColor} onValueChange={setNewHolidayColor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center gap-2">
                        <div className={cn("size-4 rounded-full", opt.bg)} />
                        {opt.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addHoliday} size="sm" className="gap-1">
                <Plus className="size-4" />
                Add
              </Button>
            </div>
            {holidays.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {holidays.map((holiday) => (
                  <div
                    key={holiday.id}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs border"
                    style={{ backgroundColor: `${holiday.color}20`, borderColor: holiday.color }}
                  >
                    <div className="size-2 rounded-full" style={{ backgroundColor: holiday.color }} />
                    <span>{holiday.name}</span>
                    <button onClick={() => removeHoliday(holiday.id)} className="hover:opacity-70">
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showNotes && (
            <div className="space-y-2">
              <Label htmlFor="notes">Personal Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes or reminders to appear on the calendar..."
                rows={3}
              />
            </div>
          )}

          <div className="flex gap-2 pt-4">
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
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Your calendar will look like this</CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={printRef} className={cn(fontClass, "calendar-container")}>
            <div className="calendar-header text-center mb-6">
              <h2 className="text-3xl font-bold" style={{ color: primaryColor }}>
                {layout === "yearly" ? year : `${months[calendarData.monthNum]} ${calendarData.yearNum}`}
              </h2>
            </div>

            {layout === "monthly" && (
              <div className="calendar-grid border rounded-lg overflow-hidden">
                {/* Day Headers */}
                {dayHeaders.map((day) => (
                  <div
                    key={day}
                    className="day-header font-semibold text-center py-2 bg-muted/50"
                    style={{ color: primaryColor }}
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {calendarData.weeks.map((week, weekIndex) => (
                  <React.Fragment key={weekIndex}>
                    {showWeekNumbers && (
                      <div className="day-header text-center py-2 bg-muted/30 text-xs">
                        W{weekIndex + 1}
                      </div>
                    )}
                    {week.map((day, dayIndex) => {
                      const holiday = day ? getHolidayForDate(day) : null
                      return (
                        <div
                          key={dayIndex}
                          className={cn(
                            "calendar-cell min-h-24 p-2 border-t border-r",
                            !day && "bg-muted/20"
                          )}
                        >
                          {day && (
                            <>
                              <div className="day-number font-semibold">{day}</div>
                              {holiday && (
                                <div className="holiday mt-1 text-xs truncate" style={{ color: holiday.color }}>
                                  {holiday.name}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )
                    })}
                  </React.Fragment>
                ))}
              </div>
            )}

            {layout === "yearly" && (
              <div className="grid grid-cols-3 gap-4">
                {months.map((_, monthIndex) => {
                  const daysInMonth = getDaysInMonth(calendarData.yearNum, monthIndex)
                  const firstDay = getFirstDayOfMonth(calendarData.yearNum, monthIndex)
                  return (
                    <div key={monthIndex} className="border rounded-lg p-2">
                      <h4 className="font-semibold text-center mb-2 text-sm" style={{ color: primaryColor }}>
                        {months[monthIndex]}
                      </h4>
                      <div className="grid grid-cols-7 gap-px text-xs">
                        {dayHeaders.map((d) => (
                          <div key={d} className="text-center font-medium text-muted-foreground">{d.charAt(0)}</div>
                        ))}
                        {Array.from({ length: firstDay }).map((_, i) => (
                          <div key={`empty-${i}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => (
                          <div key={i + 1} className="text-center py-1">{i + 1}</div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {layout === "weekly" && (
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-7">
                  {dayHeaders.map((day) => (
                    <div key={day} className="font-semibold text-center py-3 bg-muted/50 border-r" style={{ color: primaryColor }}>
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {calendarData.weeks[0]?.map((day, index) => (
                    <div key={index} className="min-h-32 p-2 border-t border-r">
                      {day && (
                        <>
                          <div className="font-semibold">{day}</div>
                          <div className="text-xs text-muted-foreground mt-1">Notes:</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showNotes && notes && (
              <div className="notes-section mt-8">
                <h3 className="font-semibold mb-2" style={{ color: primaryColor }}>Notes</h3>
                <p className="text-sm whitespace-pre-wrap">{notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .calendar-container, .calendar-container * {
            visibility: visible;
          }
          .calendar-container {
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

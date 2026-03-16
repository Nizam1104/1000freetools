"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Calendar as CalendarIcon, Clock, CalendarDays, Repeat } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CronExpressionFromDateTimePicker() {
  const [mode, setMode] = useState<"recurring" | "onetime">("recurring")
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  })
  const [selectedTime, setSelectedTime] = useState("09:00")
  const [recurrenceType, setRecurrenceType] = useState<"daily" | "weekly" | "monthly" | "yearly" | "custom">("daily")
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5])
  const [selectedDayOfMonth, setSelectedDayOfMonth] = useState("1")
  const [selectedMonth, setSelectedMonth] = useState("1")
  const [copied, setCopied] = useState(false)

  const generatedCron = useMemo(() => {
    const [hour, minute] = selectedTime.split(":")

    if (mode === "onetime") {
      // For one-time, we still generate a cron but note it's for that specific date
      return `${minute} ${hour} * * *`
    }

    switch (recurrenceType) {
      case "daily":
        return `${minute} ${hour} * * *`
      case "weekly":
        const days = selectedDays.length > 0 ? selectedDays.join(",") : "*"
        return `${minute} ${hour} * * ${days}`
      case "monthly":
        return `${minute} ${hour} ${selectedDayOfMonth} * *`
      case "yearly":
        return `${minute} ${hour} ${selectedDayOfMonth} ${selectedMonth} *`
      case "custom":
        return `${minute} ${hour} * * *`
      default:
        return `${minute} ${hour} * * *`
    }
  }, [mode, selectedTime, recurrenceType, selectedDays, selectedDayOfMonth, selectedMonth])

  const humanReadable = useMemo(() => {
    const [hour, minute] = selectedTime.split(":")
    const hourNum = parseInt(hour)
    const timeStr = formatTime(hourNum, parseInt(minute))

    if (mode === "onetime") {
      return `One-time execution on ${new Date(selectedDate).toLocaleDateString()} at ${timeStr}`
    }

    switch (recurrenceType) {
      case "daily":
        return `Every day at ${timeStr}`
      case "weekly":
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const days = selectedDays.map((d) => dayNames[d]).join(", ")
        return `Every ${days} at ${timeStr}`
      case "monthly":
        const daySuffix = getDaySuffix(parseInt(selectedDayOfMonth))
        return `On the ${selectedDayOfMonth}${daySuffix} of every month at ${timeStr}`
      case "yearly":
        const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return `Every year on ${monthNames[parseInt(selectedMonth)]} ${selectedDayOfMonth}${getDaySuffix(parseInt(selectedDayOfMonth))} at ${timeStr}`
      default:
        return `At ${timeStr}`
    }
  }, [mode, selectedDate, selectedTime, recurrenceType, selectedDays, selectedDayOfMonth, selectedMonth])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedCron)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [generatedCron])

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    )
  }

  const dayNamesShort = ["S", "M", "T", "W", "T", "F", "S"]
  const dayNamesFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="size-5" />
            CRON from Date/Time Picker
          </CardTitle>
          <CardDescription>
            Generate CRON expressions using a visual date and time picker
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Mode Selection */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Button
              variant={mode === "recurring" ? "default" : "outline"}
              onClick={() => setMode("recurring")}
              className="flex items-center gap-2"
            >
              <Repeat className="size-4" />
              Recurring Schedule
            </Button>
            <Button
              variant={mode === "onetime" ? "default" : "outline"}
              onClick={() => setMode("onetime")}
              className="flex items-center gap-2"
            >
              <CalendarDays className="size-4" />
              One-Time Execution
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="datetime" className="space-y-4">
        <TabsList>
          <TabsTrigger value="datetime">Date & Time</TabsTrigger>
          <TabsTrigger value="recurrence">Recurrence</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Date & Time Tab */}
        <TabsContent value="datetime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="size-5" />
                Select Date
              </CardTitle>
              <CardDescription>
                {mode === "onetime" ? "Choose the specific date for execution" : "Reference date for schedule"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date-picker">Date</Label>
                  <Input
                    id="date-picker"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Selected:</p>
                  <p className="font-medium">{new Date(selectedDate).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="size-5" />
                Select Time
              </CardTitle>
              <CardDescription>Choose the time of day for execution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="time-picker">Time</Label>
                  <Input
                    id="time-picker"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Selected:</p>
                  <p className="font-medium">{formatTime(parseInt(selectedTime.split(":")[0]), parseInt(selectedTime.split(":")[1]))}</p>
                </div>

                {/* Quick Time Selection */}
                <div className="space-y-2">
                  <Label>Quick Select</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Midnight", value: "00:00" },
                      { label: "6 AM", value: "06:00" },
                      { label: "9 AM", value: "09:00" },
                      { label: "Noon", value: "12:00" },
                      { label: "3 PM", value: "15:00" },
                      { label: "6 PM", value: "18:00" },
                      { label: "9 PM", value: "21:00" },
                    ].map((quick) => (
                      <Button
                        key={quick.value}
                        variant={selectedTime === quick.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(quick.value)}
                      >
                        {quick.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recurrence Tab */}
        <TabsContent value="recurrence" className="space-y-4">
          {mode === "onetime" ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                One-time execution does not require recurrence settings
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Recurrence Pattern</CardTitle>
                  <CardDescription>How often should this task repeat?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { value: "daily", label: "Daily", icon: "📅" },
                      { value: "weekly", label: "Weekly", icon: "📆" },
                      { value: "monthly", label: "Monthly", icon: "🗓️" },
                      { value: "yearly", label: "Yearly", icon: "🎉" },
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={recurrenceType === option.value ? "default" : "outline"}
                        className="flex flex-col items-center gap-2 h-auto py-4"
                        onClick={() => setRecurrenceType(option.value as typeof recurrenceType)}
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span>{option.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {recurrenceType === "weekly" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select Days of Week</CardTitle>
                    <CardDescription>Which days should the task run?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {dayNamesShort.map((day, idx) => (
                        <Button
                          key={idx}
                          variant={selectedDays.includes(idx) ? "default" : "outline"}
                          size="lg"
                          className="size-12 rounded-full"
                          onClick={() => toggleDay(idx)}
                          title={dayNamesFull[idx]}
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDays([1, 2, 3, 4, 5])}
                      >
                        Weekdays
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDays([0, 6])}
                      >
                        Weekends
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDays([0, 1, 2, 3, 4, 5, 6])}
                      >
                        Every Day
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDays([])}
                      >
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {recurrenceType === "monthly" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select Day of Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedDayOfMonth} onValueChange={setSelectedDayOfMonth}>
                      <SelectTrigger className="max-w-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}{getDaySuffix(day)} of each month
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        variant={selectedDayOfMonth === "1" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDayOfMonth("1")}
                      >
                        1st (Beginning)
                      </Button>
                      <Button
                        variant={selectedDayOfMonth === "15" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDayOfMonth("15")}
                      >
                        15th (Mid-month)
                      </Button>
                      <Button
                        variant={selectedDayOfMonth === "28" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDayOfMonth("28")}
                      >
                        28th (End of month)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {recurrenceType === "yearly" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select Date</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Month</Label>
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                              <SelectItem key={i} value={(i + 1).toString()}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Day</Label>
                        <Select value={selectedDayOfMonth} onValueChange={setSelectedDayOfMonth}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                              <SelectItem key={day} value={day.toString()}>
                                {day}{getDaySuffix(day)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated CRON Expression</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <code className="flex-1 font-mono text-xl p-4 rounded-lg bg-muted border text-center">
                  {generatedCron}
                </code>
                <Button variant="outline" onClick={copyToClipboard}>
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
              </div>

              <div className="rounded-lg border bg-primary/10 p-4">
                <p className="text-sm text-muted-foreground mb-1">Human Readable</p>
                <p className="text-lg font-medium">{humanReadable}</p>
              </div>

              {mode === "onetime" && (
                <div className="p-4 rounded-lg border bg-amber-50 dark:bg-amber-950/20">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Note:</strong> This CRON expression will run at the specified time every day.
                    For true one-time execution, you'll need to disable the job after it runs or use a different scheduling mechanism.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Example Output */}
          <Card>
            <CardHeader>
              <CardTitle>Next 5 Execution Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {generateNextRuns(generatedCron, 5).map((run, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-sm text-muted-foreground">Run #{idx + 1}</span>
                    <span className="font-mono text-sm">
                      {run.toLocaleString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function formatTime(hour: number, minute: number): string {
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th"
  switch (day % 10) {
    case 1: return "st"
    case 2: return "nd"
    case 3: return "rd"
    default: return "th"
  }
}

function generateNextRuns(cron: string, count: number): Date[] {
  const runs: Date[] = []
  const now = new Date()
  const parts = cron.split(" ")
  const minute = parseInt(parts[0])
  const hour = parseInt(parts[1])

  let current = new Date(now)
  current.setMinutes(minute, 0, 0)
  if (current <= now) {
    current.setDate(current.getDate() + 1)
  }
  current.setHours(hour)

  for (let i = 0; i < count; i++) {
    runs.push(new Date(current))
    current = new Date(current.getTime() + 24 * 60 * 60 * 1000)
  }

  return runs
}

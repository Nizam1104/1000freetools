"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Sliders, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

function formatHour(hour: number): string {
  if (hour === 0) return "12 AM"
  if (hour < 12) return `${hour} AM`
  if (hour === 12) return "12 PM"
  return `${hour - 12} PM`
}

function getMonthName(month: number): string {
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return months[month]
}

function getDayName(day: number): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return days[day]
}

function explainCron(expression: string): string {
  const parts = expression.split(" ")
  const explanations: string[] = []

  // Minute
  if (parts[0] === "*") explanations.push("every minute")
  else if (parts[0].startsWith("*/")) explanations.push(`every ${parts[0].slice(2)} minutes`)
  else explanations.push(`at minute ${parts[0]}`)

  // Hour
  if (parts[1] !== "*") {
    if (parts[1].includes("-")) {
      const [start, end] = parts[1].split("-")
      explanations.push(`between ${formatHour(parseInt(start))} and ${formatHour(parseInt(end))}`)
    } else {
      explanations.push(`at ${formatHour(parseInt(parts[1]))}`)
    }
  }

  // Day of Month
  if (parts[2] !== "*") {
    if (parts[2].includes(",")) explanations.push(`on days ${parts[2]}`)
    else explanations.push(`on day ${parts[2]}`)
  }

  // Month
  if (parts[3] !== "*") {
    if (parts[3].includes(",")) {
      const months = parts[3].split(",").map((m) => getMonthName(parseInt(m)))
      explanations.push(`in ${months.join(", ")}`)
    } else explanations.push(`in ${getMonthName(parseInt(parts[3]))}`)
  }

  // Day of Week
  if (parts[4] !== "*") {
    if (parts[4].includes("-")) {
      const [start, end] = parts[4].split("-")
      explanations.push(`from ${getDayName(parseInt(start))} to ${getDayName(parseInt(end))}`)
    } else if (parts[4].includes(",")) {
      const days = parts[4].split(",").map((d) => getDayName(parseInt(d)))
      explanations.push(`on ${days.join(", ")}`)
    } else {
      explanations.push(`on ${getDayName(parseInt(parts[4]))}`)
    }
  }

  return `Runs ${explanations.join(", ")}`
}

function buildFieldValue(type: string, value: number, step: number, range: number[], specific: number[], min: number, max: number): string {
  switch (type) {
    case "every":
      return "*"
    case "specific":
      return specific.length > 0 ? specific.join(",") : value.toString()
    case "range":
      return `${range[0]}-${range[1]}`
    case "step":
      return `*/${step}`
    default:
      return "*"
  }
}

function toggleSpecificValue(values: number[], value: number, setter: (v: number[]) => void, min: number, max: number) {
  if (values.includes(value)) {
    setter(values.filter((v) => v !== value))
  } else {
    setter([...values, value].sort((a, b) => a - b))
  }
}

export default function CronExpressionEditorGui() {
  const [minute, setMinute] = useState("*")
  const [hour, setHour] = useState("*")
  const [dayOfMonth, setDayOfMonth] = useState("*")
  const [month, setMonth] = useState("*")
  const [dayOfWeek, setDayOfWeek] = useState("*")

  const [minuteType, setMinuteType] = useState<"every" | "specific" | "range" | "step">("every")
  const [minuteValue, setMinuteValue] = useState(0)
  const [minuteStep, setMinuteStep] = useState(5)
  const [minuteRange, setMinuteRange] = useState([0, 30])
  const [minuteSpecific, setMinuteSpecific] = useState<number[]>([])

  const [hourType, setHourType] = useState<"every" | "specific" | "range" | "step">("every")
  const [hourValue, setHourValue] = useState(9)
  const [hourStep, setHourStep] = useState(2)
  const [hourRange, setHourRange] = useState([9, 17])
  const [hourSpecific, setHourSpecific] = useState<number[]>([])

  const [dayType, setDayType] = useState<"every" | "specific" | "range" | "step">("every")
  const [dayValue, setDayValue] = useState(1)
  const [dayStep, setDayStep] = useState(7)
  const [dayRange, setDayRange] = useState([1, 15])
  const [daySpecific, setDaySpecific] = useState<number[]>([])

  const [monthType, setMonthType] = useState<"every" | "specific" | "range">("every")
  const [monthValue, setMonthValue] = useState(1)
  const [monthRange, setMonthRange] = useState([1, 6])
  const [monthSpecific, setMonthSpecific] = useState<number[]>([])

  const [dayWeekType, setDayWeekType] = useState<"every" | "specific" | "range">("every")
  const [dayWeekValue, setDayWeekValue] = useState(1)
  const [dayWeekRange, setDayWeekRange] = useState([1, 5])
  const [dayWeekSpecific, setDayWeekSpecific] = useState<number[]>([])

  const [copied, setCopied] = useState(false)

  const cronExpression = useMemo(() => {
    const min = buildFieldValue(minuteType, minuteValue, minuteStep, minuteRange, minuteSpecific, 0, 59)
    const hr = buildFieldValue(hourType, hourValue, hourStep, hourRange, hourSpecific, 0, 23)
    const day = buildFieldValue(dayType, dayValue, dayStep, dayRange, daySpecific, 1, 31)
    const mon = buildFieldValue(monthType, monthValue, 1, monthRange, monthSpecific, 1, 12)
    const dow = buildFieldValue(dayWeekType, dayWeekValue, 1, dayWeekRange, dayWeekSpecific, 0, 6)
    return `${min} ${hr} ${day} ${mon} ${dow}`
  }, [minuteType, minuteValue, minuteStep, minuteRange, minuteSpecific,
      hourType, hourValue, hourStep, hourRange, hourSpecific,
      dayType, dayValue, dayStep, dayRange, daySpecific,
      monthType, monthValue, monthRange, monthSpecific,
      dayWeekType, dayWeekValue, dayWeekRange, dayWeekSpecific])

  const humanReadable = useMemo(() => {
    return explainCron(cronExpression)
  }, [cronExpression])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cronExpression)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [cronExpression])

  const resetAll = () => {
    setMinute("*")
    setHour("*")
    setDayOfMonth("*")
    setMonth("*")
    setDayOfWeek("*")
    setMinuteType("every")
    setHourType("every")
    setDayType("every")
    setMonthType("every")
    setDayWeekType("every")
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sliders className="size-5" />
            CRON Expression Editor with GUI
          </CardTitle>
          <CardDescription>
            Use interactive controls to build your CRON expression
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" onClick={resetAll}>
            Reset All
          </Button>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="size-5" />
            Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-lg border bg-muted/30 p-4 font-mono text-xl text-center">
              {cronExpression}
            </div>
            <Button variant="outline" onClick={copyToClipboard}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
          </div>
          <div className="rounded-lg border bg-primary/10 p-4">
            <p className="font-medium text-sm text-muted-foreground mb-1">Human Readable</p>
            <p className="text-lg capitalize">{humanReadable}</p>
          </div>
        </CardContent>
      </Card>

      {/* Field Editors */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Minute Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Minute (0-59)</CardTitle>
            <CardDescription>When within the hour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={minuteType === "every" ? "default" : "outline"}
                size="sm"
                onClick={() => setMinuteType("every")}
              >
                Every
              </Button>
              <Button
                variant={minuteType === "step" ? "default" : "outline"}
                size="sm"
                onClick={() => setMinuteType("step")}
              >
                Every N
              </Button>
              <Button
                variant={minuteType === "specific" ? "default" : "outline"}
                size="sm"
                onClick={() => setMinuteType("specific")}
              >
                Specific
              </Button>
            </div>

            {minuteType === "step" && (
              <div className="space-y-2">
                <Label>Every {minuteStep} minutes</Label>
                <Slider
                  value={[minuteStep]}
                  onValueChange={([v]) => setMinuteStep(v)}
                  min={1}
                  max={30}
                  step={1}
                />
              </div>
            )}

            {minuteType === "specific" && (
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                  <Button
                    key={m}
                    variant={minuteSpecific.includes(m) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSpecificValue(minuteSpecific, m, setMinuteSpecific, 0, 59)}
                  >
                    {m}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hour Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Hour (0-23)</CardTitle>
            <CardDescription>When within the day</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={hourType === "every" ? "default" : "outline"}
                size="sm"
                onClick={() => setHourType("every")}
              >
                Every
              </Button>
              <Button
                variant={hourType === "specific" ? "default" : "outline"}
                size="sm"
                onClick={() => setHourType("specific")}
              >
                Specific
              </Button>
              <Button
                variant={hourType === "range" ? "default" : "outline"}
                size="sm"
                onClick={() => setHourType("range")}
              >
                Range
              </Button>
            </div>

            {hourType === "specific" && (
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                  <Button
                    key={h}
                    variant={hourSpecific.includes(h) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSpecificValue(hourSpecific, h, setHourSpecific, 0, 23)}
                  >
                    {formatHour(h)}
                  </Button>
                ))}
              </div>
            )}

            {hourType === "range" && (
              <div className="space-y-2">
                <Label>From {formatHour(hourRange[0])} to {formatHour(hourRange[1])}</Label>
                <Slider
                  value={hourRange}
                  onValueChange={setHourRange}
                  min={0}
                  max={23}
                  step={1}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Day of Month Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Day of Month (1-31)</CardTitle>
            <CardDescription>Which day of the month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={dayType === "every" ? "default" : "outline"}
                size="sm"
                onClick={() => setDayType("every")}
              >
                Every
              </Button>
              <Button
                variant={dayType === "specific" ? "default" : "outline"}
                size="sm"
                onClick={() => setDayType("specific")}
              >
                Specific
              </Button>
              <Button
                variant={dayType === "range" ? "default" : "outline"}
                size="sm"
                onClick={() => setDayType("range")}
              >
                Range
              </Button>
            </div>

            {dayType === "specific" && (
              <div className="flex flex-wrap gap-1">
                {[1, 15].map((d) => (
                  <Button
                    key={d}
                    variant={daySpecific.includes(d) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSpecificValue(daySpecific, d, setDaySpecific, 1, 31)}
                  >
                    {d}
                  </Button>
                ))}
              </div>
            )}

            {dayType === "range" && (
              <div className="space-y-2">
                <Label>From day {dayRange[0]} to {dayRange[1]}</Label>
                <Slider
                  value={dayRange}
                  onValueChange={setDayRange}
                  min={1}
                  max={31}
                  step={1}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Month Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Month (1-12)</CardTitle>
            <CardDescription>Which month of the year</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={monthType === "every" ? "default" : "outline"}
                size="sm"
                onClick={() => setMonthType("every")}
              >
                Every
              </Button>
              <Button
                variant={monthType === "specific" ? "default" : "outline"}
                size="sm"
                onClick={() => setMonthType("specific")}
              >
                Specific
              </Button>
              <Button
                variant={monthType === "range" ? "default" : "outline"}
                size="sm"
                onClick={() => setMonthType("range")}
              >
                Range
              </Button>
            </div>

            {monthType === "specific" && (
              <div className="flex flex-wrap gap-1">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
                  <Button
                    key={m}
                    variant={monthSpecific.includes(i + 1) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSpecificValue(monthSpecific, i + 1, setMonthSpecific, 1, 12)}
                  >
                    {m}
                  </Button>
                ))}
              </div>
            )}

            {monthType === "range" && (
              <div className="space-y-2">
                <Label>From {getMonthName(monthRange[0])} to {getMonthName(monthRange[1])}</Label>
                <Slider
                  value={monthRange}
                  onValueChange={setMonthRange}
                  min={1}
                  max={12}
                  step={1}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Day of Week Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Day of Week (0-6)</CardTitle>
            <CardDescription>Which day of the week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={dayWeekType === "every" ? "default" : "outline"}
                size="sm"
                onClick={() => setDayWeekType("every")}
              >
                Every
              </Button>
              <Button
                variant={dayWeekType === "specific" ? "default" : "outline"}
                size="sm"
                onClick={() => setDayWeekType("specific")}
              >
                Specific
              </Button>
              <Button
                variant={dayWeekType === "range" ? "default" : "outline"}
                size="sm"
                onClick={() => setDayWeekType("range")}
              >
                Range
              </Button>
            </div>

            {dayWeekType === "specific" && (
              <div className="flex flex-wrap gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                  <Button
                    key={d}
                    variant={dayWeekSpecific.includes(i) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSpecificValue(dayWeekSpecific, i, setDayWeekSpecific, 0, 6)}
                  >
                    {d}
                  </Button>
                ))}
              </div>
            )}

            {dayWeekType === "range" && (
              <div className="space-y-2">
                <Label>From {getDayName(dayWeekRange[0])} to {getDayName(dayWeekRange[1])}</Label>
                <Slider
                  value={dayWeekRange}
                  onValueChange={setDayWeekRange}
                  min={0}
                  max={6}
                  step={1}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Presets</CardTitle>
          <CardDescription>Start with a common schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {[
              { label: "Every minute", cron: "* * * * *" },
              { label: "Every 5 min", cron: "*/5 * * * *" },
              { label: "Every hour", cron: "0 * * * *" },
              { label: "Daily midnight", cron: "0 0 * * *" },
              { label: "Daily 9 AM", cron: "0 9 * * *" },
              { label: "Weekdays 9 AM", cron: "0 9 * * 1-5" },
              { label: "Weekly Sunday", cron: "0 0 * * 0" },
              { label: "Monthly 1st", cron: "0 0 1 * *" },
            ].map((preset, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => {
                  const parts = preset.cron.split(" ")
                  // Reset to simple values for preset
                  setMinuteType("every")
                  setHourType("every")
                  setDayType("every")
                  setMonthType("every")
                  setDayWeekType("every")
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

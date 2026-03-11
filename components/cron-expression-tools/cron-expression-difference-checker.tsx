"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, GitCompare, AlertCircle, CheckCircle2, Clock, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CronExpressionDifferenceChecker() {
  const [cronA, setCronA] = useState("0 9 * * 1-5")
  const [cronB, setCronB] = useState("0 10 * * 1-5")
  const [copied, setCopied] = useState<string | null>(null)

  const comparison = useMemo(() => {
    return compareCronExpressions(cronA, cronB)
  }, [cronA, cronB])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const fieldNames = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="size-5" />
            CRON Expression Difference Checker
          </CardTitle>
          <CardDescription>
            Compare two CRON expressions side-by-side and identify differences
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">A</Badge>
              First Expression
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cron-a">CRON Expression A</Label>
              <Input
                id="cron-a"
                value={cronA}
                onChange={(e) => setCronA(e.target.value)}
                placeholder="* * * * *"
                className="font-mono"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(cronA, "cronA")}
              >
                {copied === "cronA" ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary">B</Badge>
              Second Expression
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cron-b">CRON Expression B</Label>
              <Input
                id="cron-b"
                value={cronB}
                onChange={(e) => setCronB(e.target.value)}
                placeholder="* * * * *"
                className="font-mono"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(cronB, "cronB")}
              >
                {copied === "cronB" ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Result */}
      {comparison.valid && (
        <>
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Comparison Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  comparison.identical ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"
                )}>
                  {comparison.identical ? (
                    <CheckCircle2 className="size-5 text-green-600" />
                  ) : (
                    <AlertCircle className="size-5 text-amber-600" />
                  )}
                  <span className="font-medium">
                    {comparison.identical ? "Expressions are identical" : "Expressions differ"}
                  </span>
                </div>
                {comparison.overlaps && (
                  <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30">
                    <Clock className="size-3 mr-1" />
                    Execution times overlap
                  </Badge>
                )}
              </div>

              <Alert>
                <AlertDescription>
                  {comparison.summary}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Field-by-Field Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Field-by-Field Comparison</CardTitle>
              <CardDescription>Detailed breakdown of differences in each field</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comparison.fields && comparison.fields.map((field, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 rounded-lg border",
                      field.different ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800" : "bg-muted/30"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{fieldNames[idx]}</span>
                        {field.different ? (
                          <Badge variant="destructive" className="text-xs">Different</Badge>
                        ) : (
                          <Badge variant="default" className="text-xs bg-green-500">Same</Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Expression A</p>
                        <code className="block font-mono text-sm p-2 rounded bg-background">
                          {field.valueA}
                        </code>
                        <p className="text-xs text-muted-foreground">{field.descriptionA}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Expression B</p>
                        <code className="block font-mono text-sm p-2 rounded bg-background">
                          {field.valueB}
                        </code>
                        <p className="text-xs text-muted-foreground">{field.descriptionB}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Overlap Analysis */}
          {comparison.overlapDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="size-5" />
                  Execution Overlap Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {comparison.overlapDetails.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-950/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Badge variant="default">A</Badge>
                      Schedule A
                    </h4>
                    <p className="text-sm">{comparison.overlapDetails.scheduleA}</p>
                  </div>
                  <div className="p-4 rounded-lg border bg-purple-50 dark:bg-purple-950/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Badge variant="secondary">B</Badge>
                      Schedule B
                    </h4>
                    <p className="text-sm">{comparison.overlapDetails.scheduleB}</p>
                  </div>
                </div>
                {comparison.overlapDetails.overlapTimes && (
                  <div className="p-4 rounded-lg border bg-amber-50 dark:bg-amber-950/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="size-4" />
                      Potential Overlap Times
                    </h4>
                    <p className="text-sm">{comparison.overlapDetails.overlapTimes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Visual Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Visual Comparison (24-hour view)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">A</Badge>
                    <span className="text-sm font-mono">{cronA}</span>
                  </div>
                  <div className="h-8 rounded bg-muted relative overflow-hidden">
                    {comparison.timelineA && comparison.timelineA.map((slot, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "absolute h-full",
                          slot.active ? "bg-primary" : "bg-transparent"
                        )}
                        style={{
                          left: `${(idx / 24) * 100}%`,
                          width: `${(1 / 24) * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">B</Badge>
                    <span className="text-sm font-mono">{cronB}</span>
                  </div>
                  <div className="h-8 rounded bg-muted relative overflow-hidden">
                    {comparison.timelineB && comparison.timelineB.map((slot, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "absolute h-full",
                          slot.active ? "bg-secondary" : "bg-transparent"
                        )}
                        style={{
                          left: `${(idx / 24) * 100}%`,
                          width: `${(1 / 24) * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground pt-2">
                  <span>12 AM</span>
                  <span>6 AM</span>
                  <span>12 PM</span>
                  <span>6 PM</span>
                  <span>11 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Quick Compare Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Compare Examples</CardTitle>
          <CardDescription>Click to compare these common expression pairs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { a: "0 9 * * *", b: "0 10 * * *", desc: "9 AM vs 10 AM daily" },
              { a: "0 9 * * 1-5", b: "0 9 * * 1", desc: "Weekdays vs Monday only" },
              { a: "*/5 * * * *", b: "*/10 * * * *", desc: "Every 5 min vs Every 10 min" },
              { a: "0 0 * * *", b: "0 0 1 * *", desc: "Daily vs Monthly" },
              { a: "0 */2 * * *", b: "0 */4 * * *", desc: "Every 2 hours vs Every 4 hours" },
              { a: "0 9 * * *", b: "0 9 * * 0", desc: "Daily 9 AM vs Sunday 9 AM" },
            ].map((preset, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="justify-start h-auto py-2 px-3"
                onClick={() => {
                  setCronA(preset.a)
                  setCronB(preset.b)
                }}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-primary">{preset.a}</span>
                    <GitCompare className="size-3" />
                    <span className="text-secondary-foreground">{preset.b}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{preset.desc}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface FieldComparison {
  valueA: string
  valueB: string
  descriptionA: string
  descriptionB: string
  different: boolean
}

interface OverlapDetails {
  description: string
  scheduleA: string
  scheduleB: string
  overlapTimes?: string
}

function compareCronExpressions(cronA: string, cronB: string) {
  const partsA = cronA.trim().split(/\s+/)
  const partsB = cronB.trim().split(/\s+/)

  if (partsA.length !== 5 || partsB.length !== 5) {
    return { valid: false, identical: false, summary: "Invalid CRON expression format" }
  }

  const fields: FieldComparison[] = []
  let hasDifference = false

  const fieldDescriptions = [
    (v: string) => describeField(v, 0, 59, "minute"),
    (v: string) => describeField(v, 0, 23, "hour"),
    (v: string) => describeField(v, 1, 31, "day"),
    (v: string) => describeField(v, 1, 12, "month"),
    (v: string) => describeDayOfWeek(v),
  ]

  for (let i = 0; i < 5; i++) {
    const different = partsA[i] !== partsB[i]
    if (different) hasDifference = true

    fields.push({
      valueA: partsA[i],
      valueB: partsB[i],
      descriptionA: fieldDescriptions[i](partsA[i]),
      descriptionB: fieldDescriptions[i](partsB[i]),
      different,
    })
  }

  // Generate timeline for 24-hour view
  const timelineA = generate24HourTimeline(cronA)
  const timelineB = generate24HourTimeline(cronB)

  // Check for overlaps
  const overlaps = timelineA.some((slot, idx) => slot.active && timelineB[idx].active)

  const overlapDetails: OverlapDetails | null = overlaps
    ? {
        description: "These expressions have overlapping execution times. Both tasks may run simultaneously at certain hours.",
        scheduleA: describeSchedule(cronA),
        scheduleB: describeSchedule(cronB),
        overlapTimes: getOverlapTimes(cronA, cronB),
      }
    : {
        description: "These expressions do not have overlapping execution times. The tasks will run at different times.",
        scheduleA: describeSchedule(cronA),
        scheduleB: describeSchedule(cronB),
      }

  return {
    valid: true,
    identical: !hasDifference,
    summary: hasDifference
      ? `The expressions differ in ${fields.filter((f) => f.different).length} field(s): ${fields.filter((f) => f.different).map((f, i) => ["Minute", "Hour", "Day", "Month", "Day of Week"][i]).join(", ")}.`
      : "Both expressions are identical and will execute at the same times.",
    fields,
    overlaps,
    overlapDetails,
    timelineA,
    timelineB,
  }
}

function describeField(value: string, min: number, max: number, unit: string): string {
  if (value === "*") return `Every ${unit}`
  if (value.startsWith("*/")) return `Every ${value.slice(2)} ${unit}s`
  if (value.includes("-")) {
    const [start, end] = value.split("-")
    return `From ${start} to ${end}`
  }
  if (value.includes(",")) return `At ${value.replace(/,/g, ", ")}`
  return `At ${value}`
}

function describeDayOfWeek(value: string): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  if (value === "*") return "Every day"
  if (value === "1-5") return "Weekdays (Mon-Fri)"
  if (value === "0,6") return "Weekends"
  if (value.includes(",")) {
    return value.split(",").map((d) => days[parseInt(d)] || d).join(", ")
  }
  if (value.includes("-")) {
    const [start, end] = value.split("-")
    return `${days[parseInt(start)]} to ${days[parseInt(end)]}`
  }
  return days[parseInt(value)] || value
}

function generate24HourTimeline(cron: string): { active: boolean }[] {
  const parts = cron.trim().split(/\s+/)
  const timeline: { active: boolean }[] = []

  const hours = parseField(parts[1], 0, 23)

  for (let h = 0; h < 24; h++) {
    timeline.push({ active: hours.includes(h) })
  }

  return timeline
}

function describeSchedule(cron: string): string {
  const parts = cron.trim().split(/\s+/)
  const minute = parts[0]
  const hour = parts[1]
  const dayOfWeek = parts[4]

  const hourDesc = hour === "*" ? "every hour" : hour.includes(",") ? `at hours ${hour}` : `at ${formatHour(parseInt(hour))}`
  const minuteDesc = minute === "*" ? "" : minute === "0" ? "" : `:${minute}`
  const dayDesc = dayOfWeek === "*" ? "" : dayOfWeek === "1-5" ? " on weekdays" : dayOfWeek === "0" ? " on Sundays" : ` on day ${dayOfWeek}`

  return `${hourDesc}${minuteDesc}${dayDesc}`.trim()
}

function getOverlapTimes(cronA: string, cronB: string): string {
  const partsA = cronA.split(/\s+/)
  const partsB = cronB.split(/\s+/)

  const hoursA = parseField(partsA[1], 0, 23)
  const hoursB = parseField(partsB[1], 0, 23)

  const commonHours = hoursA.filter((h) => hoursB.includes(h))

  if (commonHours.length === 0) return "No overlapping hours"
  if (commonHours.length === 24) return "All hours overlap"

  return `Overlap at: ${commonHours.map((h) => formatHour(h)).join(", ")}`
}

function parseField(field: string, min: number, max: number): number[] {
  if (field === "*") return Array.from({ length: max - min + 1 }, (_, i) => i + min)
  if (field.startsWith("*/")) {
    const step = parseInt(field.slice(2))
    return Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step)
  }
  if (field.includes("-")) {
    const [start, end] = field.split("-").map(Number)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }
  if (field.includes(",")) return field.split(",").map(Number)
  return [parseInt(field)]
}

function formatHour(hour: number): string {
  if (hour === 0) return "12 AM"
  if (hour < 12) return `${hour} AM`
  if (hour === 12) return "12 PM"
  return `${hour - 12} PM`
}

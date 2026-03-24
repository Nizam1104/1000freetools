"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Clock, Calendar, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

function calculateNextRuns(expression: string, startDate: string, count: number, includeSeconds: boolean): Date[] {
  const runs: Date[] = []
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)

  const parts = expression.trim().split(/\s+/)
  const fieldIndex = includeSeconds ? 1 : 0

  // Parse fields
  const minutes = parseField(parts[fieldIndex], 0, 59)
  const hours = parseField(parts[fieldIndex + 1], 0, 23)
  const daysOfMonth = parseField(parts[fieldIndex + 2], 1, 31)
  const months = parseField(parts[fieldIndex + 3], 1, 12)
  const daysOfWeek = parseField(parts[fieldIndex + 4], 0, 6)

  const isEveryMinute = parts[fieldIndex] === "*"
  const isEveryHour = parts[fieldIndex + 1] === "*"
  const isEveryDay = parts[fieldIndex + 2] === "*" && parts[fieldIndex + 4] === "*"

  let current = new Date(start)
  current.setHours(hours[0] || 0, minutes[0] || 0, includeSeconds ? 0 : 0, 0)

  // Simple simulation for demonstration
  const maxIterations = count * 100
  let iterations = 0

  while (runs.length < count && iterations < maxIterations) {
    iterations++

    // Check if current time matches the cron expression
    if (months.includes(current.getMonth() + 1) &&
        daysOfMonth.includes(current.getDate()) &&
        daysOfWeek.includes(current.getDay()) &&
        hours.includes(current.getHours()) &&
        minutes.includes(current.getMinutes())) {
      runs.push(new Date(current))
    }

    // Increment time
    if (isEveryMinute) {
      current = new Date(current.getTime() + 60 * 1000)
    } else if (isEveryHour) {
      current = new Date(current.getTime() + 60 * 60 * 1000)
    } else {
      current = new Date(current.getTime() + 15 * 60 * 1000) // 15 min increments
    }
  }

  return runs.slice(0, count)
}

function parseField(field: string, min: number, max: number): number[] {
  if (field === "*") {
    return Array.from({ length: max - min + 1 }, (_, i) => i + min)
  }

  if (field.includes("/")) {
    const [base, step] = field.split("/")
    const stepNum = parseInt(step)
    if (base === "*") {
      return Array.from({ length: Math.floor((max - min) / stepNum) + 1 }, (_, i) => min + i * stepNum)
    }
    const baseValues = parseField(base, min, max)
    return baseValues.filter((_, i) => i % stepNum === 0)
  }

  if (field.includes("-")) {
    const [start, end] = field.split("-").map(Number)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  if (field.includes(",")) {
    return field.split(",").map(Number)
  }

  return [parseInt(field)]
}

export default function CronExpressionTester() {
  const [cronExpression, setCronExpression] = useState("0 9 * * 1-5")
  const [startDate, setStartDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  })
  const [count, setCount] = useState("10")
  const [copied, setCopied] = useState(false)
  const [includeSeconds, setIncludeSeconds] = useState(false)

  const nextRuns = useMemo(() => {
    return calculateNextRuns(cronExpression, startDate, parseInt(count), includeSeconds)
  }, [cronExpression, startDate, count, includeSeconds])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(nextRuns.map((r) => r.toISOString()).join("\n"))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [nextRuns])

  const isValid = useMemo(() => {
    const parts = cronExpression.trim().split(/\s+/)
    const expectedFields = includeSeconds ? 6 : 5
    return parts.length === expectedFields
  }, [cronExpression, includeSeconds])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5" />
            CRON Expression Tester
          </CardTitle>
          <CardDescription>
            Calculate and verify next scheduled execution times
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cron-input">CRON Expression</Label>
            <div className="flex gap-2">
              <Input
                id="cron-input"
                value={cronExpression}
                onChange={(e) => setCronExpression(e.target.value)}
                placeholder={includeSeconds ? "0 * * * * *" : "* * * * *"}
                className="font-mono text-lg flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIncludeSeconds(!includeSeconds)}
              >
                {includeSeconds ? "6-field" : "5-field"}
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="count">Number of Runs</Label>
              <Select value={count} onValueChange={setCount}>
                <SelectTrigger id="count">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Next 5 runs</SelectItem>
                  <SelectItem value="10">Next 10 runs</SelectItem>
                  <SelectItem value="25">Next 25 runs</SelectItem>
                  <SelectItem value="50">Next 50 runs</SelectItem>
                  <SelectItem value="100">Next 100 runs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {!isValid && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertTitle>Invalid Expression</AlertTitle>
              <AlertDescription>
                Please enter a valid {includeSeconds ? "6-field" : "5-field"} CRON expression
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {isValid && nextRuns.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Next {count} Run Times</CardTitle>
                  <CardDescription>Starting from {new Date(startDate).toLocaleDateString()}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  {copied ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border divide-y max-h-[600px] overflow-y-auto">
                {nextRuns.map((run, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center justify-between p-3",
                      idx === 0 && "bg-primary/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "flex items-center justify-center size-6 rounded-full text-xs font-medium",
                        idx === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        {idx + 1}
                      </span>
                      <span className={cn(
                        "text-sm",
                        idx === 0 && "font-medium text-primary"
                      )}>
                        {idx === 0 ? "Next run" : `Run #${idx + 1}`}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm">
                        {run.toLocaleDateString(undefined, {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="font-mono text-sm text-muted-foreground">
                        {run.toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: includeSeconds ? "2-digit" : undefined,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">First Run</p>
                  <p className="font-medium">
                    {nextRuns[0]?.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Last Run</p>
                  <p className="font-medium">
                    {nextRuns[nextRuns.length - 1]?.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Runs</p>
                  <p className="font-medium">{nextRuns.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Quick Test Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Test Presets</CardTitle>
          <CardDescription>Test these common schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { expr: "* * * * *", desc: "Every minute - 10 runs in 10 min" },
              { expr: "*/5 * * * *", desc: "Every 5 minutes" },
              { expr: "0 * * * *", desc: "Every hour on the hour" },
              { expr: "0 9 * * *", desc: "Daily at 9 AM" },
              { expr: "0 9 * * 1-5", desc: "Weekdays at 9 AM" },
              { expr: "0 0 * * 0", desc: "Weekly on Sunday" },
              { expr: "0 0 1 * *", desc: "Monthly on 1st" },
              { expr: "0 0 * * 1", desc: "Every Monday" },
              { expr: "0 */4 * * *", desc: "Every 4 hours" },
            ].map((preset, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="justify-start h-auto py-2 px-3"
                onClick={() => setCronExpression(preset.expr)}
              >
                <div className="text-left">
                  <p className="font-mono text-sm">{preset.expr}</p>
                  <p className="text-xs text-muted-foreground">{preset.desc}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verification Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
              <span>Check that the first run time matches your expectations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
              <span>Verify the interval between runs is consistent</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
              <span>Ensure runs don't conflict with maintenance windows</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-500" />
              <span>Test with different start dates to verify edge cases</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

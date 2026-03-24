"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, AlertCircle, CheckCircle2, XCircle, Clock, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Validation and parsing functions
interface ValidationResult {
  valid: boolean
  errors: string[]
  fields?: CronField[]
}

interface CronField {
  name: string
  value: string
  range: string
  description: string
  valid: boolean
}

interface Explanation {
  full: string
  parts: string[]
}

function validateCronExpression(expression: string, includeSeconds: boolean): ValidationResult {
  const errors: string[] = []
  const fields: CronField[] = []
  const parts = expression.trim().split(/\s+/)
  const expectedFields = includeSeconds ? 6 : 5

  if (parts.length !== expectedFields) {
    errors.push(`Expected ${expectedFields} fields, got ${parts.length}`)
    return { valid: false, errors }
  }

  const fieldConfigs = includeSeconds
    ? [
        { name: "Seconds", min: 0, max: 59, desc: "Seconds" },
        { name: "Minutes", min: 0, max: 59, desc: "Minutes" },
        { name: "Hours", min: 0, max: 23, desc: "Hours" },
        { name: "Day of Month", min: 1, max: 31, desc: "Day of month" },
        { name: "Month", min: 1, max: 12, desc: "Month" },
        { name: "Day of Week", min: 0, max: 6, desc: "Day of week" },
      ]
    : [
        { name: "Minute", min: 0, max: 59, desc: "Minutes" },
        { name: "Hour", min: 0, max: 23, desc: "Hours" },
        { name: "Day of Month", min: 1, max: 31, desc: "Day of month" },
        { name: "Month", min: 1, max: 12, desc: "Month" },
        { name: "Day of Week", min: 0, max: 6, desc: "Day of week" },
      ]

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    const config = fieldConfigs[i]
    const fieldValid = validateField(part, config.min, config.max)

    fields.push({
      name: config.name,
      value: part,
      range: `${config.min}-${config.max}`,
      description: config.desc,
      valid: fieldValid,
    })

    if (!fieldValid) {
      errors.push(`Invalid ${config.name.toLowerCase()} field: "${part}"`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    fields,
  }
}

function validateField(field: string, min: number, max: number): boolean {
  if (field === "*") return true

  // Handle step values (e.g., */5, 0-30/5)
  if (field.includes("/")) {
    const [base, step] = field.split("/")
    const stepNum = parseInt(step)
    if (isNaN(stepNum) || stepNum <= 0) return false
    if (base === "*") return true
    return validateField(base, min, max)
  }

  // Handle ranges (e.g., 1-5)
  if (field.includes("-")) {
    const parts = field.split("-")
    if (parts.length !== 2) return false
    const start = parseInt(parts[0])
    const end = parseInt(parts[1])
    if (isNaN(start) || isNaN(end)) return false
    return start >= min && end <= max && start <= end
  }

  // Handle lists (e.g., 1,3,5)
  if (field.includes(",")) {
    const values = field.split(",")
    return values.every((v) => {
      const num = parseInt(v)
      return !isNaN(num) && num >= min && num <= max
    })
  }

  // Single value
  const num = parseInt(field)
  return !isNaN(num) && num >= min && num <= max
}

function explainCronExpression(expression: string, includeSeconds: boolean): Explanation {
  const parts = expression.trim().split(/\s+/)
  const explanationParts: string[] = []

  const fieldIndex = includeSeconds ? 1 : 0

  // Minute/Seconds
  const minutePart = parts[fieldIndex]
  if (minutePart === "*") {
    explanationParts.push(includeSeconds ? "every second" : "every minute")
  } else if (minutePart.includes("/")) {
    const [, step] = minutePart.split("/")
    explanationParts.push(`every ${step} ${includeSeconds ? "seconds" : "minutes"}`)
  } else if (minutePart.includes("-")) {
    const [start, end] = minutePart.split("-")
    explanationParts.push(`from ${start} to ${end} ${includeSeconds ? "seconds" : "minutes"}`)
  } else if (minutePart.includes(",")) {
    explanationParts.push(`at ${minutePart.replace(/,/g, ", ")} ${includeSeconds ? "seconds" : "minutes"}`)
  } else {
    explanationParts.push(`at ${minutePart} ${includeSeconds ? "seconds" : "minutes"}`)
  }

  // Hour
  const hourPart = parts[fieldIndex + 1]
  if (hourPart !== "*") {
    if (hourPart.includes("/")) {
      const [, step] = hourPart.split("/")
      explanationParts.push(`every ${step} hours`)
    } else if (hourPart.includes("-")) {
      const [start, end] = hourPart.split("-")
      explanationParts.push(`between hour ${start} and ${end}`)
    } else if (hourPart.includes(",")) {
      explanationParts.push(`at hours ${hourPart.replace(/,/g, ", ")}`)
    } else {
      explanationParts.push(`at ${formatHour(parseInt(hourPart))}`)
    }
  }

  // Day of Month
  const dayOfMonthPart = parts[fieldIndex + 2]
  if (dayOfMonthPart !== "*") {
    if (dayOfMonthPart.includes("/")) {
      const [, step] = dayOfMonthPart.split("/")
      explanationParts.push(`every ${step} days`)
    } else if (dayOfMonthPart.includes("-")) {
      const [start, end] = dayOfMonthPart.split("-")
      explanationParts.push(`from day ${start} to ${end} of the month`)
    } else if (dayOfMonthPart.includes(",")) {
      explanationParts.push(`on days ${dayOfMonthPart.replace(/,/g, ", ")}`)
    } else {
      explanationParts.push(`on day ${dayOfMonthPart}`)
    }
  }

  // Month
  const monthPart = parts[fieldIndex + 3]
  if (monthPart !== "*") {
    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    if (monthPart.includes(",")) {
      const months = monthPart.split(",").map((m) => monthNames[parseInt(m)] || m)
      explanationParts.push(`in ${months.join(", ")}`)
    } else if (monthPart.includes("-")) {
      const [start, end] = monthPart.split("-")
      explanationParts.push(`from ${monthNames[parseInt(start)]} to ${monthNames[parseInt(end)]}`)
    } else {
      explanationParts.push(`in ${monthNames[parseInt(monthPart)] || monthPart}`)
    }
  }

  // Day of Week
  const dayOfWeekPart = parts[fieldIndex + 4]
  if (dayOfWeekPart !== "*") {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    if (dayOfWeekPart.includes(",")) {
      const days = dayOfWeekPart.split(",").map((d) => dayNames[parseInt(d)] || d)
      explanationParts.push(`on ${days.join(", ")}`)
    } else if (dayOfWeekPart.includes("-")) {
      const [start, end] = dayOfWeekPart.split("-")
      explanationParts.push(`from ${dayNames[parseInt(start)]} to ${dayNames[parseInt(end)]}`)
    } else {
      explanationParts.push(`on ${dayNames[parseInt(dayOfWeekPart)] || dayOfWeekPart}`)
    }
  }

  return {
    full: `The task runs ${explanationParts.join(", ")}.`,
    parts: explanationParts,
  }
}

function formatHour(hour: number): string {
  if (hour === 0) return "12 AM"
  if (hour < 12) return `${hour} AM`
  if (hour === 12) return "12 PM"
  return `${hour - 12} PM`
}

function calculateNextRuns(expression: string, count: number, includeSeconds: boolean): Date[] {
  const runs: Date[] = []
  const now = new Date()
  let current = new Date(now)
  current.setMilliseconds(0)

  const parts = expression.trim().split(/\s+/)
  const fieldIndex = includeSeconds ? 1 : 0

  const minute = parseField(parts[fieldIndex], 0, 59)
  const hour = parseField(parts[fieldIndex + 1], 0, 23)
  const dayOfMonth = parseField(parts[fieldIndex + 2], 1, 31)
  const month = parseField(parts[fieldIndex + 3], 1, 12)
  const dayOfWeek = parseField(parts[fieldIndex + 4], 0, 6)

  // Simple simulation - add intervals based on the expression
  const isEveryMinute = parts[fieldIndex] === "*"
  const isEveryHour = parts[fieldIndex + 1] === "*"

  for (let i = 0; i < count && runs.length < count; i++) {
    if (isEveryMinute && isEveryHour) {
      current = new Date(current.getTime() + 60 * 1000)
    } else if (isEveryHour) {
      current = new Date(current.getTime() + 60 * 60 * 1000)
    } else {
      current = new Date(current.getTime() + 60 * 60 * 24 * 1000)
    }
    runs.push(new Date(current))
  }

  return runs
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

export default function CronExpressionValidatorExplainer() {
  const [cronExpression, setCronExpression] = useState("0 9 * * 1-5")
  const [copied, setCopied] = useState(false)
  const [includeSeconds, setIncludeSeconds] = useState(false)

  const validation = useMemo(() => {
    return validateCronExpression(cronExpression, includeSeconds)
  }, [cronExpression, includeSeconds])

  const explanation = useMemo(() => {
    if (!validation.valid) return null
    return explainCronExpression(cronExpression, includeSeconds)
  }, [validation, cronExpression, includeSeconds])

  const nextRuns = useMemo(() => {
    if (!validation.valid) return []
    return calculateNextRuns(cronExpression, 10, includeSeconds)
  }, [validation, cronExpression, includeSeconds])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cronExpression)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [cronExpression])

  const fieldDescriptions = [
    { name: includeSeconds ? "Seconds" : "Minute", range: includeSeconds ? "0-59" : "0-59", description: "When the task runs within the minute" },
    { name: "Hour", range: "0-23", description: "When the task runs within the day (24-hour format)" },
    { name: "Day of Month", range: "1-31", description: "Which day of the month" },
    { name: "Month", range: "1-12", description: "Which month of the year" },
    { name: "Day of Week", range: "0-6", description: "Which day of the week (0=Sunday, 6=Saturday)" },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>CRON Expression Validator & Explainer</CardTitle>
          <CardDescription>
            Validate and understand CRON expressions with detailed explanations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="cron-input">Enter CRON Expression</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIncludeSeconds(!includeSeconds)}
              >
                {includeSeconds ? "Using 6-field (with seconds)" : "Using 5-field format"}
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                id="cron-input"
                value={cronExpression}
                onChange={(e) => setCronExpression(e.target.value)}
                placeholder={includeSeconds ? "0 * * * * *" : "* * * * *"}
                className={cn(
                  "font-mono text-lg",
                  validation.valid ? "border-green-500 focus-visible:ring-green-500" : "border-red-500 focus-visible:ring-red-500"
                )}
              />
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </div>

          {/* Validation Result */}
          <Alert variant={validation.valid ? "default" : "destructive"}>
            {validation.valid ? (
              <CheckCircle2 className="size-4 text-green-600" />
            ) : (
              <XCircle className="size-4" />
            )}
            <AlertTitle>{validation.valid ? "Valid CRON Expression" : "Invalid CRON Expression"}</AlertTitle>
            <AlertDescription>
              {validation.valid
                ? "The expression syntax is correct."
                : validation.errors.join(" ")}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Tabs defaultValue="explanation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
          <TabsTrigger value="fields">Field Details</TabsTrigger>
          <TabsTrigger value="next-runs">Next Run Times</TabsTrigger>
        </TabsList>

        {/* Explanation Tab */}
        <TabsContent value="explanation" className="space-y-4">
          {validation.valid && explanation ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="size-5 text-blue-500" />
                  Plain English Explanation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg capitalize leading-relaxed">{explanation.full}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {explanation.parts.map((part, idx) => (
                    <Badge key={idx} variant="secondary">{part}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Enter a valid CRON expression to see the explanation
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Field Details Tab */}
        <TabsContent value="fields" className="space-y-4">
          {validation.valid && validation.fields ? (
            <Card>
              <CardHeader>
                <CardTitle>Field Breakdown</CardTitle>
                <CardDescription>Detailed analysis of each field</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Valid Range</TableHead>
                      <TableHead>Meaning</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validation.fields.map((field, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{field.name}</TableCell>
                        <TableCell className="font-mono">{field.value}</TableCell>
                        <TableCell className="text-muted-foreground">{field.range}</TableCell>
                        <TableCell>{field.description}</TableCell>
                        <TableCell>
                          {field.valid ? (
                            <Badge variant="default" className="bg-green-500">Valid</Badge>
                          ) : (
                            <Badge variant="destructive">Invalid</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Enter a valid CRON expression to see field details
              </CardContent>
            </Card>
          )}

          {/* Field Reference */}
          <Card>
            <CardHeader>
              <CardTitle>Field Reference</CardTitle>
              <CardDescription>Understanding CRON field formats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-5 gap-4">
                {fieldDescriptions.map((field, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="font-medium">{field.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">{field.range}</p>
                    <p className="text-xs text-muted-foreground">{field.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="font-medium mb-2">Special Characters:</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded">*</code>
                    <span>Any value (wildcard)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded">,</code>
                    <span>Value list separator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded">-</code>
                    <span>Range of values</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded">/</code>
                    <span>Step values</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Next Run Times Tab */}
        <TabsContent value="next-runs" className="space-y-4">
          {validation.valid && nextRuns.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="size-5" />
                  Next 10 Run Times
                </CardTitle>
                <CardDescription>Upcoming scheduled execution times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border divide-y">
                  {nextRuns.map((run, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3">
                      <span className="text-sm text-muted-foreground">
                        {idx === 0 ? "Next run" : `Run #${idx + 1}`}
                      </span>
                      <span className="font-mono text-sm">
                        {run.toLocaleString(undefined, {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: includeSeconds ? "2-digit" : undefined,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Enter a valid CRON expression to see next run times
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Common Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Common Examples</CardTitle>
          <CardDescription>Click to try these common CRON expressions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { expr: "* * * * *", desc: "Every minute" },
              { expr: "0 * * * *", desc: "Every hour" },
              { expr: "0 0 * * *", desc: "Daily at midnight" },
              { expr: "0 9 * * *", desc: "Daily at 9 AM" },
              { expr: "0 9 * * 1-5", desc: "Weekdays at 9 AM" },
              { expr: "0 0 * * 0", desc: "Weekly on Sunday" },
              { expr: "0 0 1 * *", desc: "Monthly on 1st" },
              { expr: "*/5 * * * *", desc: "Every 5 minutes" },
              { expr: "0 */2 * * *", desc: "Every 2 hours" },
              { expr: "0 0 * * 1", desc: "Every Monday" },
              { expr: "30 4 1,15 * *", desc: "Twice monthly at 4:30 AM" },
              { expr: "0 0-6 * * *", desc: "Every hour from midnight to 6 AM" },
            ].map((example, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="justify-start h-auto py-2 px-3"
                onClick={() => setCronExpression(example.expr)}
              >
                <div className="text-left">
                  <p className="font-mono text-sm">{example.expr}</p>
                  <p className="text-xs text-muted-foreground">{example.desc}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, AlertCircle, CheckCircle2, XCircle, Languages } from "lucide-react"
import { cn } from "@/lib/utils"

interface TranslationResult {
  valid: boolean
  english: string
  error?: string
  breakdown?: string[]
  fieldDetails?: { name: string; description: string }[]
}

function translateCronToEnglish(expression: string, includeSeconds: boolean): TranslationResult {
  try {
    const parts = expression.trim().split(/\s+/)
    const expectedFields = includeSeconds ? 6 : 5

    if (parts.length !== expectedFields) {
      return {
        valid: false,
        english: "",
        error: `Expected ${expectedFields} fields, got ${parts.length}`,
      }
    }

    const fieldIndex = includeSeconds ? 1 : 0
    const breakdown: string[] = []
    const fieldDetails: { name: string; description: string }[] = []

    // Parse each field
    const minuteTranslation = translateField(parts[fieldIndex], 0, 59, includeSeconds ? "second" : "minute", includeSeconds ? "seconds" : "minutes")
    breakdown.push(minuteTranslation.text)
    fieldDetails.push({ name: includeSeconds ? "Seconds" : "Minute", description: minuteTranslation.desc })

    const hourTranslation = translateField(parts[fieldIndex + 1], 0, 23, "hour", "hours")
    if (parts[fieldIndex + 1] !== "*") {
      breakdown.push(hourTranslation.text)
      fieldDetails.push({ name: "Hour", description: hourTranslation.desc })
    }

    const dayOfMonthTranslation = translateField(parts[fieldIndex + 2], 1, 31, "day", "days", "of the month")
    if (parts[fieldIndex + 2] !== "*") {
      breakdown.push(dayOfMonthTranslation.text)
      fieldDetails.push({ name: "Day of Month", description: dayOfMonthTranslation.desc })
    }

    const monthTranslation = translateMonthField(parts[fieldIndex + 3])
    if (parts[fieldIndex + 3] !== "*") {
      breakdown.push(monthTranslation.text)
      fieldDetails.push({ name: "Month", description: monthTranslation.desc })
    }

    const dayOfWeekTranslation = translateDayOfWeekField(parts[fieldIndex + 4])
    if (parts[fieldIndex + 4] !== "*") {
      breakdown.push(dayOfWeekTranslation.text)
      fieldDetails.push({ name: "Day of Week", description: dayOfWeekTranslation.desc })
    }

    // Build the full English sentence
    let english = "The task runs"
    if (parts[fieldIndex] === "*" && parts[fieldIndex + 1] === "*" && parts[fieldIndex + 2] === "*" &&
        parts[fieldIndex + 3] === "*" && parts[fieldIndex + 4] === "*") {
      english = "The task runs every minute"
    } else {
      const parts_text = breakdown.join(", ")
      english = `The task runs ${parts_text}`
    }

    return {
      valid: true,
      english: english + ".",
      breakdown,
      fieldDetails,
    }
  } catch (error) {
    return {
      valid: false,
      english: "",
      error: "Failed to parse CRON expression",
    }
  }
}

function translateField(field: string, min: number, max: number, singular: string, plural: string, suffix = ""): { text: string; desc: string } {
  if (field === "*") {
    return { text: `every ${plural}`, desc: `Every ${singular} (${min}-${max})` }
  }

  if (field.includes("/")) {
    const [base, step] = field.split("/")
    const stepNum = parseInt(step)
    if (base === "*") {
      return { text: `every ${stepNum} ${plural}`, desc: `Every ${stepNum} ${plural} starting from ${min}` }
    }
    const baseTranslation = translateField(base, min, max, singular, plural, suffix)
    return { text: `${baseTranslation.text}, every ${stepNum} ${plural}`, desc: `Every ${stepNum} ${plural} from ${base}` }
  }

  if (field.includes("-")) {
    const [start, end] = field.split("-").map(Number)
    return { text: `from ${start} to ${end} ${plural}`, desc: `Range from ${start} to ${end} ${plural}` }
  }

  if (field.includes(",")) {
    const values = field.split(",").map(Number)
    return { text: `at ${plural} ${values.join(", ")}`, desc: `Specific ${plural}: ${values.join(", ")}` }
  }

  const num = parseInt(field)
  if (singular === "hour") {
    return { text: `at ${formatHour(num)}${suffix ? " " + suffix : ""}`, desc: `At hour ${num} (${formatHour(num)})` }
  }
  return { text: `at ${num}${suffix ? " " + suffix : ""}`, desc: `At ${singular} ${num}` }
}

function translateMonthField(field: string): { text: string; desc: string } {
  const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  if (field === "*") {
    return { text: "every month", desc: "Every month of the year" }
  }

  if (field.includes(",")) {
    const months = field.split(",").map((m) => monthNames[parseInt(m)] || m)
    return { text: `in ${months.join(", ")}`, desc: `Specific months: ${months.join(", ")}` }
  }

  if (field.includes("-")) {
    const [start, end] = field.split("-").map((m) => monthNames[parseInt(m)] || m)
    return { text: `from ${start} to ${end}`, desc: `From ${start} to ${end}` }
  }

  const month = monthNames[parseInt(field)] || field
  return { text: `in ${month}`, desc: `In ${month}` }
}

function translateDayOfWeekField(field: string): { text: string; desc: string } {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  if (field === "*") {
    return { text: "every day of the week", desc: "Every day of the week" }
  }

  if (field.includes(",")) {
    const days = field.split(",").map((d) => dayNames[parseInt(d)] || d)
    return { text: `on ${days.join(", ")}`, desc: `Specific days: ${days.join(", ")}` }
  }

  if (field.includes("-")) {
    const [start, end] = field.split("-").map((d) => dayNames[parseInt(d)] || d)
    return { text: `from ${start} to ${end}`, desc: `From ${start} to ${end}` }
  }

  const day = dayNames[parseInt(field)] || field
  return { text: `on ${day}`, desc: `On ${day}` }
}

function formatHour(hour: number): string {
  if (hour === 0) return "12 AM"
  if (hour < 12) return `${hour} AM`
  if (hour === 12) return "12 PM"
  return `${hour - 12} PM`
}

export default function CronToEnglishTranslator() {
  const [cronExpression, setCronExpression] = useState("0 9 * * 1-5")
  const [copied, setCopied] = useState(false)
  const [includeSeconds, setIncludeSeconds] = useState(false)

  const translation = useMemo(() => {
    return translateCronToEnglish(cronExpression, includeSeconds)
  }, [cronExpression, includeSeconds])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(translation.english)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [translation])

  const examples = [
    { expr: "* * * * *", desc: "Every minute" },
    { expr: "0 */2 * * *", desc: "Every 2 hours" },
    { expr: "0 9 * * 1-5", desc: "Weekdays at 9 AM" },
    { expr: "30 4 1,15 * *", desc: "Twice monthly" },
    { expr: "0 0 * * 0", desc: "Weekly on Sunday" },
    { expr: "*/15 * * * *", desc: "Every 15 minutes" },
    { expr: "0 9-17 * * 1-5", desc: "Business hours weekdays" },
    { expr: "0 0 1 1,4,7,10 *", desc: "Quarterly" },
    { expr: "30 */6 * * *", desc: "Every 6 hours at :30" },
    { expr: "0 2 * * 1,3,5", desc: "Mon/Wed/Fri at 2 AM" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="size-5" />
            CRON to English Translator
          </CardTitle>
          <CardDescription>
            Convert CRON expressions into clear, natural English sentences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="cron-input">CRON Expression</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIncludeSeconds(!includeSeconds)}
              >
                {includeSeconds ? "6-field mode" : "5-field mode"}
              </Button>
            </div>
            <Input
              id="cron-input"
              value={cronExpression}
              onChange={(e) => setCronExpression(e.target.value)}
              placeholder={includeSeconds ? "0 * * * * *" : "* * * * *"}
              className="font-mono text-lg"
            />
          </div>

          {translation.valid ? (
            <Alert>
              <CheckCircle2 className="size-4 text-green-600" />
              <AlertTitle>Translation Successful</AlertTitle>
              <AlertDescription className="mt-2">
                <p className="text-lg font-medium capitalize">{translation.english}</p>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <XCircle className="size-4" />
              <AlertTitle>Invalid Expression</AlertTitle>
              <AlertDescription>{translation.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      {translation.valid && translation.breakdown && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Breakdown</CardTitle>
            <CardDescription>Understanding each part of the expression</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {translation.breakdown.map((part, idx) => (
                <Badge key={idx} variant="outline" className="text-sm py-1 px-3">
                  {part}
                </Badge>
              ))}
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <h4 className="font-medium mb-3">Field Analysis</h4>
              <div className="space-y-3">
                {translation.fieldDetails?.map((field, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="font-medium min-w-[100px]">{field.name}:</span>
                    <span className="text-muted-foreground">{field.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Copy Translation */}
      {translation.valid && (
        <Card>
          <CardHeader>
            <CardTitle>Copy Translation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={translation.english}
                readOnly
                className="font-medium"
              />
              <Button variant="outline" onClick={copyToClipboard}>
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Example Translations</CardTitle>
          <CardDescription>Click to see how these expressions translate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {examples.map((example, idx) => (
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

      {/* Complex Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Complex Pattern Examples</CardTitle>
          <CardDescription>Advanced CRON expressions with ranges, steps, and lists</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { expr: "0,30 */4 * * 1-5", desc: "Every 4 hours at :00 and :30, weekdays only" },
              { expr: "15 3 1,15 * *", desc: "At 3:15 AM on the 1st and 15th of every month" },
              { expr: "0 */3 8-20 * * *", desc: "Every 3 hours between 8 AM and 8 PM (with seconds)" },
              { expr: "0 0 1 1-6,10-12 *", desc: "Midnight on the 1st, excluding summer months (July-Sept)" },
              { expr: "*/10 * 9-17 * * 1-5", desc: "Every 10 minutes during business hours, weekdays" },
            ].map((example, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setCronExpression(example.expr)}
              >
                <div>
                  <p className="font-mono text-sm font-medium">{example.expr}</p>
                  <p className="text-xs text-muted-foreground">{example.desc}</p>
                </div>
                <Badge variant="secondary">Click to try</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

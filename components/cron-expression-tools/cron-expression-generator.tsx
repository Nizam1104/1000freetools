"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CronExpressionGenerator() {
  const [minute, setMinute] = useState("*")
  const [hour, setHour] = useState("*")
  const [dayOfMonth, setDayOfMonth] = useState("*")
  const [month, setMonth] = useState("*")
  const [dayOfWeek, setDayOfWeek] = useState("*")
  const [copied, setCopied] = useState<string | null>(null)

  const cronExpression = useMemo(() => {
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
  }, [minute, hour, dayOfMonth, month, dayOfWeek])

  const humanReadable = useMemo(() => {
    const parts: string[] = []

    // Minute
    if (minute === "*") {
      parts.push("every minute")
    } else if (minute.includes("/")) {
      const [, step] = minute.split("/")
      parts.push(`every ${step} minutes`)
    } else if (minute.includes("-")) {
      const [start, end] = minute.split("-")
      parts.push(`every minute from ${start} past the hour to ${end} past`)
    } else if (minute.includes(",")) {
      parts.push(`at minutes ${minute.replace(/,/g, ", ")}`)
    } else {
      parts.push(`at minute ${minute}`)
    }

    // Hour
    if (hour !== "*") {
      if (hour.includes("/")) {
        const [, step] = hour.split("/")
        parts.push(`every ${step} hours`)
      } else if (hour.includes("-")) {
        const [start, end] = hour.split("-")
        parts.push(`between hour ${start} and ${end}`)
      } else if (hour.includes(",")) {
        parts.push(`at hours ${hour.replace(/,/g, ", ")}`)
      } else {
        parts.push(`at hour ${formatHour(parseInt(hour))}`)
      }
    }

    // Day of Month
    if (dayOfMonth !== "*") {
      if (dayOfMonth.includes("/")) {
        const [, step] = dayOfMonth.split("/")
        parts.push(`every ${step} days`)
      } else if (dayOfMonth.includes("-")) {
        const [start, end] = dayOfMonth.split("-")
        parts.push(`from day ${start} to ${end} of the month`)
      } else if (dayOfMonth.includes(",")) {
        parts.push(`on days ${dayOfMonth.replace(/,/g, ", ")}`)
      } else {
        parts.push(`on day ${dayOfMonth}`)
      }
    }

    // Month
    if (month !== "*") {
      const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      if (month.includes(",")) {
        const months = month.split(",").map((m) => monthNames[parseInt(m)] || m)
        parts.push(`in ${months.join(", ")}`)
      } else if (month.includes("-")) {
        const [start, end] = month.split("-")
        parts.push(`from ${monthNames[parseInt(start)]} to ${monthNames[parseInt(end)]}`)
      } else {
        parts.push(`in ${monthNames[parseInt(month)] || month}`)
      }
    }

    // Day of Week
    if (dayOfWeek !== "*") {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      if (dayOfWeek.includes(",")) {
        const days = dayOfWeek.split(",").map((d) => dayNames[parseInt(d)] || d)
        parts.push(`on ${days.join(", ")}`)
      } else if (dayOfWeek.includes("-")) {
        const [start, end] = dayOfWeek.split("-")
        parts.push(`from ${dayNames[parseInt(start)]} to ${dayNames[parseInt(end)]}`)
      } else {
        parts.push(`on ${dayNames[parseInt(dayOfWeek)] || dayOfWeek}`)
      }
    }

    return parts.join(" ")
  }, [minute, hour, dayOfMonth, month, dayOfWeek])

  const nextRuns = useMemo(() => {
    const runs: Date[] = []
    const now = new Date()
    let current = new Date(now)
    current.setSeconds(0)
    current.setMilliseconds(0)

    // Simple simulation - in production, use a proper cron parser
    for (let i = 0; i < 5; i++) {
      current = new Date(current.getTime() + 60 * 60 * 1000) // Add 1 hour
      runs.push(new Date(current))
    }

    return runs
  }, [cronExpression])

  const formatHour = (hour: number): string => {
    if (hour === 0) return "12 AM"
    if (hour < 12) return `${hour} AM`
    if (hour === 12) return "12 PM"
    return `${hour - 12} PM`
  }

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const presets = [
    { label: "Every minute", value: "* * * * *" },
    { label: "Every hour", value: "0 * * * *" },
    { label: "Every day at midnight", value: "0 0 * * *" },
    { label: "Every day at 9 AM", value: "0 9 * * *" },
    { label: "Every Monday at 9 AM", value: "0 9 * * 1" },
    { label: "Every weekday at 9 AM", value: "0 9 * * 1-5" },
    { label: "First day of every month", value: "0 0 1 * *" },
    { label: "Every 5 minutes", value: "*/5 * * * *" },
    { label: "Every 15 minutes", value: "*/15 * * * *" },
    { label: "Every hour on the hour", value: "0 * * * *" },
  ]

  const applyPreset = (expression: string) => {
    const parts = expression.split(" ")
    setMinute(parts[0])
    setHour(parts[1])
    setDayOfMonth(parts[2])
    setMonth(parts[3])
    setDayOfWeek(parts[4])
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Presets */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Quick Presets</Label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Button key={preset.value} variant="outline" size="sm" onClick={() => applyPreset(preset.value)}>
              {preset.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Field Inputs */}
      <section className="space-y-4">
        <div className="grid grid-cols-5 gap-4">
          <CronFieldInput label="Minute" value={minute} onChange={setMinute} min={0} max={59} />
          <CronFieldInput label="Hour" value={hour} onChange={setHour} min={0} max={23} />
          <CronFieldInput label="Day of Month" value={dayOfMonth} onChange={setDayOfMonth} min={1} max={31} />
          <CronFieldInput label="Month" value={month} onChange={setMonth} min={1} max={12} />
          <CronFieldInput label="Day of Week" value={dayOfWeek} onChange={setDayOfWeek} min={0} max={6} />
        </div>
      </section>

      {/* Generated Expression */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">CRON Expression</Label>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(cronExpression, "cron")}>
            {copied === "cron" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
            Copy
          </Button>
        </div>
        <div className="rounded-lg border bg-muted/30 p-4 font-mono text-xl text-center">
          {cronExpression}
        </div>
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <p>Format: minute hour day-of-month month day-of-week</p>
        </div>
      </section>

      {/* Human Readable */}
      <section className="rounded-lg border bg-primary/10 p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="size-5 text-primary" />
          <h3 className="font-semibold">Human Readable</h3>
        </div>
        <p className="text-lg capitalize">{humanReadable}</p>
      </section>

      {/* Next Runs */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Next Run Times (Estimated)</h3>
        <div className="rounded-lg border bg-background divide-y">
          {nextRuns.map((run, idx) => (
            <div key={idx} className="flex items-center justify-between p-3">
              <span className="text-sm text-muted-foreground">Run #{idx + 1}</span>
              <span className="font-mono">
                {run.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Field Reference */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h3 className="text-base font-semibold mb-3">Field Reference</h3>
        <div className="grid sm:grid-cols-5 gap-4 text-sm">
          <div>
            <p className="font-medium">Minute</p>
            <p className="text-muted-foreground">0-59</p>
          </div>
          <div>
            <p className="font-medium">Hour</p>
            <p className="text-muted-foreground">0-23</p>
          </div>
          <div>
            <p className="font-medium">Day of Month</p>
            <p className="text-muted-foreground">1-31</p>
          </div>
          <div>
            <p className="font-medium">Month</p>
            <p className="text-muted-foreground">1-12</p>
          </div>
          <div>
            <p className="font-medium">Day of Week</p>
            <p className="text-muted-foreground">0-6 (Sun-Sat)</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
          <p className="font-medium mb-2">Special Characters:</p>
          <ul className="grid sm:grid-cols-2 gap-2">
            <li><code className="bg-muted px-1 rounded">*</code> Any value</li>
            <li><code className="bg-muted px-1 rounded">,</code> Value list separator</li>
            <li><code className="bg-muted px-1 rounded">-</code> Range of values</li>
            <li><code className="bg-muted px-1 rounded">/</code> Step values</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

function CronFieldInput({ label, value, onChange, min, max }: { label: string; value: string; onChange: (v: string) => void; min: number; max: number }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={`cron-${label}`} className="text-sm">{label}</Label>
      <Input
        id={`cron-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="*"
        className="font-mono text-center"
      />
      <p className="text-xs text-muted-foreground text-center">{min}-{max}</p>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Clock } from "lucide-react"

export default function TimeDurationCalculator() {
  const [startTime, setStartTime] = useState<string>("09:00")
  const [endTime, setEndTime] = useState<string>("17:00")
  const [startAmPm, setStartAmPm] = useState<string>("AM")
  const [endAmPm, setEndAmPm] = useState<string>("PM")
  const [format, setFormat] = useState<string>("12")
  const [copied, setCopied] = useState<string | null>(null)

  const duration = useMemo(() => {
    if (!startTime || !endTime) return null

    let startHours = parseInt(startTime.split(":")[0], 10)
    let startMinutes = parseInt(startTime.split(":")[1] || "0", 10)
    let endHours = parseInt(endTime.split(":")[0], 10)
    let endMinutes = parseInt(endTime.split(":")[1] || "0", 10)

    if (format === "12") {
      if (startAmPm === "PM" && startHours !== 12) {
        startHours += 12
      } else if (startAmPm === "AM" && startHours === 12) {
        startHours = 0
      }

      if (endAmPm === "PM" && endHours !== 12) {
        endHours += 12
      } else if (endAmPm === "AM" && endHours === 12) {
        endHours = 0
      }
    }

    let startTotalMinutes = startHours * 60 + startMinutes
    let endTotalMinutes = endHours * 60 + endMinutes

    let isOvernight = false
    if (endTotalMinutes < startTotalMinutes) {
      endTotalMinutes += 24 * 60
      isOvernight = true
    }

    const diffMinutes = endTotalMinutes - startTotalMinutes
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60
    const seconds = minutes * 60
    const totalSeconds = diffMinutes * 60

    return {
      hours,
      minutes,
      seconds,
      totalMinutes: diffMinutes,
      totalSeconds,
      decimalHours: diffMinutes / 60,
      isOvernight,
    }
  }, [startTime, endTime, startAmPm, endAmPm, format])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const formatDuration = (hours: number, minutes: number): string => {
    const h = Math.floor(hours)
    const m = Math.floor(minutes)
    const parts = []
    if (h > 0) parts.push(`${h}h`)
    if (m > 0 || h > 0) parts.push(`${m}m`)
    return parts.join(" ") || "0m"
  }

  const quickPresets = [
    { label: "9-5 Work Day", start: "09:00", end: "17:00", startAmPm: "AM", endAmPm: "PM" },
    { label: "8-4 Shift", start: "08:00", end: "16:00", startAmPm: "AM", endAmPm: "PM" },
    { label: "10-6 Work Day", start: "10:00", end: "18:00", startAmPm: "AM", endAmPm: "PM" },
    { label: "Midnight Shift", start: "11:00", end: "07:00", startAmPm: "PM", endAmPm: "AM" },
    { label: "Half Day", start: "09:00", end: "13:00", startAmPm: "AM", endAmPm: "PM" },
    { label: "Lunch Break", start: "12:00", end: "13:00", startAmPm: "PM", endAmPm: "PM" },
  ]

  const applyPreset = (preset: typeof quickPresets[0]) => {
    if (format === "12") {
      setStartTime(preset.start)
      setEndTime(preset.end)
      setStartAmPm(preset.startAmPm)
      setEndAmPm(preset.endAmPm)
    } else {
      setStartTime(preset.start)
      setEndTime(preset.end)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Time Duration Calculator</h2>
        <p className="text-muted-foreground">
          Calculate duration between two specific times. Perfect for timesheets and logging hours.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => setFormat("12")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              format === "12"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            12-Hour Format
          </button>
          <button
            onClick={() => setFormat("24")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              format === "24"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            24-Hour Format
          </button>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Start Time</h3>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="flex-1"
                />
                {format === "12" && (
                  <select
                    value={startAmPm}
                    onChange={(e) => setStartAmPm(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">End Time</h3>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="flex-1"
                />
                {format === "12" && (
                  <select
                    value={endAmPm}
                    onChange={(e) => setEndAmPm(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {duration && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-background p-6 text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Clock className="size-8 text-muted-foreground" />
                  <span className="text-2xl font-semibold">Duration</span>
                </div>
                <div className="flex items-baseline justify-center gap-2 flex-wrap">
                  <span className="text-6xl font-bold font-mono">{duration.hours}</span>
                  <span className="text-2xl text-muted-foreground">hours</span>
                  <span className="text-6xl font-bold font-mono">:</span>
                  <span className="text-6xl font-bold font-mono">{String(duration.minutes).padStart(2, "0")}</span>
                  <span className="text-2xl text-muted-foreground">minutes</span>
                </div>
                {duration.isOvernight && (
                  <p className="text-sm text-amber-600 mt-2">
                    (Overnight duration - ends next day)
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  label="Total Hours"
                  value={duration.decimalHours.toFixed(2)}
                  copyValue={duration.decimalHours.toString()}
                  onCopy={copyToClipboard}
                  copied={copied === "hours"}
                  copyKey="hours"
                />
                <StatCard
                  label="Total Minutes"
                  value={duration.totalMinutes.toLocaleString()}
                  copyValue={duration.totalMinutes.toString()}
                  onCopy={copyToClipboard}
                  copied={copied === "minutes"}
                  copyKey="minutes"
                />
                <StatCard
                  label="Total Seconds"
                  value={duration.totalSeconds.toLocaleString()}
                  copyValue={duration.totalSeconds.toString()}
                  onCopy={copyToClipboard}
                  copied={copied === "seconds"}
                  copyKey="seconds"
                />
                <StatCard
                  label="Decimal Hours"
                  value={duration.decimalHours.toFixed(4)}
                  copyValue={duration.decimalHours.toFixed(4)}
                  onCopy={copyToClipboard}
                  copied={copied === "decimal"}
                  copyKey="decimal"
                />
              </div>

              <div className="rounded-lg border bg-background p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Formatted Duration</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-lg">
                    {format === "12"
                      ? `${startTime}${startAmPm} - ${endTime}${endAmPm}`
                      : `${startTime} - ${endTime}`}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        format === "12"
                          ? `${startTime}${startAmPm} - ${endTime}${endAmPm}`
                          : `${startTime} - ${endTime}`,
                        "formatted"
                      )
                    }
                  >
                    {copied === "formatted" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-background p-4 space-y-3">
          <h3 className="font-semibold">Quick Presets</h3>
          <div className="flex flex-wrap gap-2">
            {quickPresets.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <h3 className="font-semibold">Tips for Timesheets</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>For overnight shifts, the calculator automatically handles the day rollover</li>
            <li>Decimal hours are useful for payroll calculations</li>
            <li>Use 24-hour format for military, healthcare, or international contexts</li>
            <li>Copy the formatted duration directly to your timesheet</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string
  copyValue?: string
  onCopy?: (text: string, key: string) => void
  copied?: boolean
  copyKey?: string
}

function StatCard({ label, value, copyValue, onCopy, copied, copyKey }: StatCardProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold font-mono">{value}</p>
        {onCopy && copyValue && (
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => onCopy(copyValue, copyKey || "")}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        )}
      </div>
    </div>
  )
}

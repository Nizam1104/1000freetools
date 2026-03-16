"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Trash2, CheckCircle2, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeValidationResult {
  time: string
  valid: boolean
  format: string
  parsed?: { hours: number; minutes: number; seconds?: number; ampm?: string }
  reason: string
}

export default function TimeValidator() {
  const [times, setTimes] = useState<string>("")
  const [mode, setMode] = useState<"auto" | "12" | "24">("auto")
  const [copied, setCopied] = useState<string | null>(null)

  const validateTime = useCallback((time: string, selectedMode: "auto" | "12" | "24"): TimeValidationResult => {
    const trimmed = time.trim()
    
    if (!trimmed) {
      return { time: trimmed, valid: false, format: "", reason: "Empty time" }
    }
    
    // Pattern for 12-hour format: HH:MM:SS AM/PM
    const pattern12 = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM|am|pm|Am|Pm)?$/
    // Pattern for 24-hour format: HH:MM:SS
    const pattern24 = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/
    
    const match12 = pattern12.exec(trimmed)
    const match24 = pattern24.exec(trimmed)
    
    if (selectedMode === "12" || (selectedMode === "auto" && match12)) {
      if (match12) {
        const [, hoursStr, minutesStr, secondsStr, ampm] = match12
        const hours = parseInt(hoursStr, 10)
        const minutes = parseInt(minutesStr, 10)
        const seconds = secondsStr ? parseInt(secondsStr, 10) : undefined
        
        if (hours < 1 || hours > 12) {
          return { time: trimmed, valid: false, format: "12-hour", reason: "Hours must be 1-12 for 12-hour format" }
        }
        if (minutes < 0 || minutes > 59) {
          return { time: trimmed, valid: false, format: "12-hour", reason: "Minutes must be 0-59" }
        }
        if (seconds !== undefined && (seconds < 0 || seconds > 59)) {
          return { time: trimmed, valid: false, format: "12-hour", reason: "Seconds must be 0-59" }
        }
        if (!ampm) {
          return { time: trimmed, valid: false, format: "12-hour", reason: "AM/PM indicator required" }
        }
        
        return {
          time: trimmed,
          valid: true,
          format: "12-hour",
          parsed: { hours, minutes, seconds, ampm: ampm.toUpperCase() },
          reason: "Valid 12-hour time format",
        }
      }
      if (selectedMode === "12") {
        return { time: trimmed, valid: false, format: "12-hour", reason: "Invalid 12-hour format (expected HH:MM AM/PM)" }
      }
    }
    
    if (selectedMode === "24" || (selectedMode === "auto" && match24)) {
      if (match24) {
        const [, hoursStr, minutesStr, secondsStr] = match24
        const hours = parseInt(hoursStr, 10)
        const minutes = parseInt(minutesStr, 10)
        const seconds = secondsStr ? parseInt(secondsStr, 10) : undefined
        
        if (hours < 0 || hours > 23) {
          return { time: trimmed, valid: false, format: "24-hour", reason: "Hours must be 0-23 for 24-hour format" }
        }
        if (minutes < 0 || minutes > 59) {
          return { time: trimmed, valid: false, format: "24-hour", reason: "Minutes must be 0-59" }
        }
        if (seconds !== undefined && (seconds < 0 || seconds > 59)) {
          return { time: trimmed, valid: false, format: "24-hour", reason: "Seconds must be 0-59" }
        }
        
        return {
          time: trimmed,
          valid: true,
          format: "24-hour",
          parsed: { hours, minutes, seconds },
          reason: "Valid 24-hour time format",
        }
      }
      if (selectedMode === "24") {
        return { time: trimmed, valid: false, format: "24-hour", reason: "Invalid 24-hour format (expected HH:MM or HH:MM:SS)" }
      }
    }
    
    return { time: trimmed, valid: false, format: "", reason: "Invalid time format" }
  }, [])

  const results = useMemo(() => {
    const lines = times.split(/[\n,;]/).map(t => t.trim()).filter(t => t)
    return lines.map(time => validateTime(time, mode))
  }, [times, mode, validateTime])

  const stats = useMemo(() => {
    const valid = results.filter(r => r.valid).length
    const invalid = results.filter(r => !r.valid).length
    return { valid, invalid, total: results.length }
  }, [results])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const validTimes = useMemo(() => results.filter(r => r.valid).map(r => r.time).join("\n"), [results])
  const invalidTimes = useMemo(() => results.filter(r => !r.valid).map(r => r.time).join("\n"), [results])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Time Format</Label>
        <Tabs value={mode} onValueChange={(v) => setMode(v as "auto" | "12" | "24")}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="auto">Auto-detect</TabsTrigger>
            <TabsTrigger value="12">12-Hour (AM/PM)</TabsTrigger>
            <TabsTrigger value="24">24-Hour</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* Time Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="time-input" className="text-base font-medium">
            Times
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(times, "input")}
              className="h-7"
              disabled={!times}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setTimes("")}
              className="h-7"
              disabled={!times}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="time-input"
          value={times}
          onChange={(e) => setTimes(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter times (one per line, or separated by comma/semicolon)..."
        />
        <p className="text-xs text-muted-foreground">
          Supports formats: HH:MM, HH:MM:SS. Optional AM/PM for 12-hour format.
        </p>
      </section>

      {/* Statistics */}
      {stats.total > 0 && (
        <section className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border bg-background p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.valid}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Valid</div>
          </div>
          <div className="rounded-lg border bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 p-4 text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.invalid}</div>
            <div className="text-sm text-red-700 dark:text-red-300">Invalid</div>
          </div>
        </section>
      )}

      {/* Results */}
      {results.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Validation Results</h3>
            <div className="flex gap-2">
              {validTimes && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(validTimes, "valid")}
                >
                  <CheckCircle2 className="size-3.5 mr-1 text-green-600" />
                  Copy Valid
                </Button>
              )}
              {invalidTimes && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(invalidTimes, "invalid")}
                >
                  <XCircle className="size-3.5 mr-1 text-red-600" />
                  Copy Invalid
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3",
                  result.valid 
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900" 
                    : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                )}
              >
                {result.valid ? (
                  <CheckCircle2 className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm break-all">{result.time}</div>
                  {result.valid && result.parsed && (
                    <div className="grid gap-1 mt-2 text-xs">
                      <div className="flex gap-2">
                        <span className="text-muted-foreground">Format:</span>
                        <span className="font-medium">{result.format}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-muted-foreground">Parsed:</span>
                        <span className="font-mono">
                          {result.parsed.hours}:{result.parsed.minutes.toString().padStart(2, '0')}
                          {result.parsed.seconds !== undefined && `:${result.parsed.seconds.toString().padStart(2, '0')}`}
                          {result.parsed.ampm && ` ${result.parsed.ampm}`}
                        </span>
                      </div>
                    </div>
                  )}
                  {!result.valid && (
                    <div className="text-xs mt-1 text-red-700 dark:text-red-300">
                      {result.reason}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Time Examples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Test Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { time: "2:30 PM", valid: true, desc: "12-hour with AM/PM" },
            { time: "14:30", valid: true, desc: "24-hour format" },
            { time: "09:15:30", valid: true, desc: "With seconds" },
            { time: "25:00", valid: false, desc: "Invalid hours" },
            { time: "12:60", valid: false, desc: "Invalid minutes" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setTimes(example.time)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {example.valid ? (
                  <CheckCircle2 className="size-4 text-green-600" />
                ) : (
                  <XCircle className="size-4 text-red-600" />
                )}
                <code className="text-xs font-mono">{example.time}</code>
              </div>
              <span className="text-xs text-muted-foreground">{example.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/components/ui/native-select"
import { Copy, Check, Trash2, CheckCircle2, XCircle, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface DateValidationResult {
  date: string
  valid: boolean
  format: string
  parsed?: { year: number; month: number; day: number }
  reason: string
}

export default function DateValidator() {
  const [dates, setDates] = useState<string>("")
  const [format, setFormat] = useState<"auto" | "mmddyyyy" | "ddmmyyyy" | "yyyymmdd" | "yyyyddmm">("auto")
  const [copied, setCopied] = useState<string | null>(null)

  const isLeapYear = useCallback((year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
  }, [])

  const getDaysInMonth = useCallback((month: number, year: number): number => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (month === 2 && isLeapYear(year)) {
      return 29
    }
    return daysInMonth[month - 1]
  }, [isLeapYear])

  const validateDate = useCallback((date: string, selectedFormat: "auto" | "mmddyyyy" | "ddmmyyyy" | "yyyymmdd" | "yyyyddmm"): DateValidationResult => {
    const trimmed = date.trim()
    
    if (!trimmed) {
      return { date: trimmed, valid: false, format: "", reason: "Empty date" }
    }
    
    // Remove common separators and extract parts
    const separators = ["-", "/", ".", " "]
    let separator = separators.find(s => trimmed.includes(s))
    const parts = separator ? trimmed.split(separator).map(p => p.trim()) : null
    
    if (!parts || parts.length !== 3) {
      return { date: trimmed, valid: false, format: "", reason: "Invalid date format (expected MM/DD/YYYY, DD/MM/YYYY, or YYYY-MM-DD)" }
    }
    
    const numParts = parts.map(p => parseInt(p, 10))
    if (numParts.some(n => isNaN(n))) {
      return { date: trimmed, valid: false, format: "", reason: "Date contains non-numeric characters" }
    }
    
    let month: number, day: number, year: number
    let formatName = ""
    
    if (selectedFormat === "auto") {
      // Try to auto-detect format
      if (numParts[0] > 31) {
        // First part is year (YYYY-MM-DD or YYYY-DD-MM)
        year = numParts[0]
        if (numParts[1] > 12) {
          day = numParts[1]
          month = numParts[2]
          formatName = "YYYY-DD-MM"
        } else {
          month = numParts[1]
          day = numParts[2]
          formatName = "YYYY-MM-DD"
        }
      } else if (numParts[2] > 31 || (numParts[2] > 12 && numParts[2] < 100)) {
        // Last part is year (MM/DD/YYYY or DD/MM/YYYY)
        year = numParts[2]
        if (numParts[0] > 12) {
          day = numParts[0]
          month = numParts[1]
          formatName = "DD/MM/YYYY"
        } else if (numParts[1] > 12) {
          month = numParts[0]
          day = numParts[1]
          formatName = "MM/DD/YYYY"
        } else {
          // Ambiguous - assume MM/DD/YYYY (US format)
          month = numParts[0]
          day = numParts[1]
          year = numParts[2]
          formatName = "MM/DD/YYYY (assumed)"
        }
      } else {
        // Assume MM/DD/YYYY for 2-digit years
        month = numParts[0]
        day = numParts[1]
        year = numParts[2]
        if (year < 100) {
          year += year < 50 ? 2000 : 1900
        }
        formatName = "MM/DD/YY"
      }
    } else {
      // Use specified format
      switch (selectedFormat) {
        case "mmddyyyy":
          month = numParts[0]
          day = numParts[1]
          year = numParts[2]
          formatName = "MM/DD/YYYY"
          break
        case "ddmmyyyy":
          day = numParts[0]
          month = numParts[1]
          year = numParts[2]
          formatName = "DD/MM/YYYY"
          break
        case "yyyymmdd":
          year = numParts[0]
          month = numParts[1]
          day = numParts[2]
          formatName = "YYYY-MM-DD"
          break
        case "yyyyddmm":
          year = numParts[0]
          day = numParts[1]
          month = numParts[2]
          formatName = "YYYY-DD-MM"
          break
      }
    }
    
    // Validate ranges
    if (year < 1 || year > 9999) {
      return { date: trimmed, valid: false, format: formatName, reason: "Year must be between 1 and 9999" }
    }
    
    if (month < 1 || month > 12) {
      return { date: trimmed, valid: false, format: formatName, reason: "Month must be between 1 and 12" }
    }
    
    const maxDays = getDaysInMonth(month, year)
    if (day < 1 || day > maxDays) {
      return { 
        date: trimmed, 
        valid: false, 
        format: formatName, 
        reason: `Day must be between 1 and ${maxDays} for ${month}/${year}` 
      }
    }
    
    return {
      date: trimmed,
      valid: true,
      format: formatName,
      parsed: { year, month, day },
      reason: "Valid date",
    }
  }, [getDaysInMonth])

  const results = useMemo(() => {
    const lines = dates.split(/[\n,;]/).map(d => d.trim()).filter(d => d)
    return lines.map(date => validateDate(date, format))
  }, [dates, format, validateDate])

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

  const validDates = useMemo(() => results.filter(r => r.valid).map(r => r.date).join("\n"), [results])
  const invalidDates = useMemo(() => results.filter(r => !r.valid).map(r => r.date).join("\n"), [results])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Format Selection */}
      <section className="space-y-3">
        <Label htmlFor="format-select" className="text-base font-medium">
          Date Format
        </Label>
        <NativeSelect
          id="format-select"
          value={format}
          onChange={(e) => setFormat(e.target.value as typeof format)}
          className="w-full sm:w-72"
        >
          <option value="auto">Auto-detect</option>
          <option value="mmddyyyy">MM/DD/YYYY (US)</option>
          <option value="ddmmyyyy">DD/MM/YYYY (International)</option>
          <option value="yyyymmdd">YYYY-MM-DD (ISO)</option>
          <option value="yyyyddmm">YYYY-DD-MM</option>
        </NativeSelect>
      </section>

      {/* Date Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="date-input" className="text-base font-medium">
            Dates
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(dates, "input")}
              className="h-7"
              disabled={!dates}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setDates("")}
              className="h-7"
              disabled={!dates}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="date-input"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder="Enter dates (one per line, or separated by comma/semicolon)..."
        />
        <p className="text-xs text-muted-foreground">
          Supports separators: / - . (space). Validates month days and leap years.
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
              {validDates && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(validDates, "valid")}
                >
                  <CheckCircle2 className="size-3.5 mr-1 text-green-600" />
                  Copy Valid
                </Button>
              )}
              {invalidDates && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => copyToClipboard(invalidDates, "invalid")}
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
                  <div className="font-mono text-sm break-all">{result.date}</div>
                  {result.valid && result.parsed && (
                    <div className="grid gap-1 mt-2 text-xs">
                      <div className="flex gap-2">
                        <span className="text-muted-foreground">Format:</span>
                        <span className="font-medium">{result.format}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-muted-foreground">Parsed:</span>
                        <span className="font-mono">
                          Year: {result.parsed.year}, Month: {result.parsed.month}, Day: {result.parsed.day}
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

      {/* Date Examples */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Test Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { date: "12/25/2024", valid: true, desc: "US format" },
            { date: "25/12/2024", valid: true, desc: "International format" },
            { date: "2024-02-29", valid: true, desc: "ISO format (leap year)" },
            { date: "02/29/2023", valid: false, desc: "Invalid (not a leap year)" },
            { date: "13/01/2024", valid: false, desc: "Invalid month" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setDates(example.date)}
              className="text-left rounded-lg border bg-background p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {example.valid ? (
                  <CheckCircle2 className="size-4 text-green-600" />
                ) : (
                  <XCircle className="size-4 text-red-600" />
                )}
                <code className="text-xs font-mono">{example.date}</code>
              </div>
              <span className="text-xs text-muted-foreground">{example.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

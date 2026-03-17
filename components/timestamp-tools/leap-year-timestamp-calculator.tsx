"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Calendar, RefreshCw } from "lucide-react"

export function LeapYearTimestampCalculator() {
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const isLeapYear = useCallback((y: number): boolean => {
    return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0)
  }, [])

  const getLeapYears = useCallback((startYear: number, endYear: number): number[] => {
    const leapYears: number[] = []
    for (let y = startYear; y <= endYear; y++) {
      if (isLeapYear(y)) {
        leapYears.push(y)
      }
    }
    return leapYears
  }, [isLeapYear])

  const calculateTimestamps = useCallback((inputYear: number): {
    isLeap: boolean;
    nextLeap: number;
    prevLeap: number;
    leapDayTimestamp: number | null;
    leapDayDate: string | null;
    totalDays: number;
    leapYearsInRange: number[];
  } => {
    const isLeap = isLeapYear(inputYear)
    
    // Find next leap year
    let nextLeap = inputYear + 1
    while (!isLeapYear(nextLeap)) {
      nextLeap++
    }
    
    // Find previous leap year
    let prevLeap = inputYear - 1
    while (!isLeapYear(prevLeap)) {
      prevLeap--
    }
    
    // Leap day timestamp (Feb 29)
    let leapDayTimestamp: number | null = null
    let leapDayDate: string | null = null
    if (isLeap) {
      const leapDay = new Date(inputYear, 1, 29) // Month is 0-indexed
      leapDayTimestamp = Math.floor(leapDay.getTime() / 1000)
      leapDayDate = leapDay.toISOString().split('T')[0]
    }
    
    // Total days in year
    const totalDays = isLeap ? 366 : 365
    
    // Leap years in range (1900-2100)
    const leapYearsInRange = getLeapYears(1900, 2100)
    
    return {
      isLeap,
      nextLeap,
      prevLeap,
      leapDayTimestamp,
      leapDayDate,
      totalDays,
      leapYearsInRange
    }
  }, [isLeapYear, getLeapYears])

  const handleCalculate = useCallback(() => {
    const inputYear = parseInt(year)
    
    if (isNaN(inputYear) || inputYear < 1 || inputYear > 9999) {
      setOutput("Please enter a valid year (1-9999)")
      return
    }
    
    const result = calculateTimestamps(inputYear)
    
    setOutput(`
# Leap Year Analysis for ${inputYear}

## Basic Information
| Property | Value |
|----------|-------|
| **Is Leap Year** | ${result.isLeap ? '✅ Yes' : '❌ No'} |
| **Total Days** | ${result.totalDays} |
| **Previous Leap Year** | ${result.prevLeap} |
| **Next Leap Year** | ${result.nextLeap} |

## Leap Day (February 29)
${result.isLeap ? `
| Property | Value |
|----------|-------|
| **Date** | ${result.leapDayDate} |
| **Unix Timestamp** | ${result.leapDayTimestamp} |
| **Day of Week** | ${new Date(inputYear, 1, 29).toLocaleDateString('en-US', { weekday: 'long' })} |
` : '*No leap day in this year*'}

## Leap Year Pattern
- Leap years occur every 4 years
- Exception: Years divisible by 100 are NOT leap years
- Exception: Years divisible by 400 ARE leap years

## Upcoming Leap Years
${getLeapYears(inputYear, inputYear + 20).slice(1).join(', ')}
`.trim())
  }, [year, calculateTimestamps, getLeapYears])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setYear(new Date().getFullYear().toString())
    setOutput("")
  }, [])

  const handleDownload = useCallback(() => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `leap-year-${year}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [output, year])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Leap Year Timestamp Calculator</h2>
            <p className="text-sm text-muted-foreground">
              Calculate leap year information and timestamps
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="year">Year:</Label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="1"
            max="9999"
            className="border rounded px-3 py-2 text-sm w-32"
          />
        </div>
        <Button variant="outline" size="sm" onClick={() => setYear(new Date().getFullYear().toString())}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Current Year
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleCalculate} className="flex-1">
          <Calendar className="h-4 w-4 mr-2" />
          Calculate
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Results</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[500px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!output} title="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">Leap Year Rules</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>A year is a leap year if it's divisible by 4</li>
          <li>Except if it's divisible by 100 (then it's NOT a leap year)</li>
          <li>Unless it's also divisible by 400 (then it IS a leap year)</li>
          <li>Examples: 2000 was a leap year, 1900 was not, 2024 is a leap year</li>
        </ul>
      </div>
    </div>
  )
}

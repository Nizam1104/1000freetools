"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function LeapYearChecker() {
  const [yearInput, setYearInput] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const year = useMemo(() => {
    const y = parseInt(yearInput, 10)
    return isNaN(y) ? null : y
  }, [yearInput])

  const leapYearResult = useMemo(() => {
    if (year === null) return null

    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)

    const upcomingLeapYears: number[] = []
    let checkYear = year
    while (upcomingLeapYears.length < 5) {
      checkYear++
      if ((checkYear % 4 === 0 && checkYear % 100 !== 0) || (checkYear % 400 === 0)) {
        upcomingLeapYears.push(checkYear)
      }
    }

    return {
      isLeap,
      daysInYear: isLeap ? 366 : 365,
      nextLeap: upcomingLeapYears[0],
      upcomingLeapYears,
    }
  }, [year])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Leap Year Checker</h2>
        <p className="text-muted-foreground">
          Check if a year is a leap year and see upcoming leap years.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="year-input">Enter Year</Label>
          <Input
            id="year-input"
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value.replace(/[^0-9]/g, ""))}
            className="font-mono w-48"
            placeholder="e.g., 2024"
            type="text"
            inputMode="numeric"
          />
        </div>

        {leapYearResult && year !== null && (
          <div className="space-y-4">
            <div className={`rounded-lg border p-6 ${leapYearResult.isLeap ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" : "bg-muted/30"}`}>
              <div className="flex items-center gap-3">
                {leapYearResult.isLeap ? (
                  <>
                    <span className="text-4xl">✓</span>
                    <div>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                        {year} is a Leap Year
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {leapYearResult.daysInYear} days (February has 29 days)
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-4xl">✗</span>
                    <div>
                      <p className="text-2xl font-bold">
                        {year} is NOT a Leap Year
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {leapYearResult.daysInYear} days (February has 28 days)
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="rounded-lg border bg-background p-4 space-y-3">
              <h3 className="text-sm font-medium">Leap Year Rules</h3>
              <p className="text-sm text-muted-foreground">
                A year is a leap year if:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>It is divisible by 4</li>
                <li>EXCEPT if it is divisible by 100 (not a leap year)</li>
                <li>UNLESS it is also divisible by 400 (is a leap year)</li>
              </ul>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="text-sm font-medium">Upcoming Leap Years</h3>
              <div className="flex flex-wrap gap-2">
                {leapYearResult.upcomingLeapYears.map((y) => (
                  <span
                    key={y}
                    className="px-3 py-1 bg-background rounded border font-mono"
                  >
                    {y}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

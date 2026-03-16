"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("")
  const [targetDate, setTargetDate] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const age = useMemo(() => {
    if (!birthDate) return null

    const birth = new Date(birthDate)
    const target = targetDate ? new Date(targetDate) : new Date()

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null

    let years = target.getFullYear() - birth.getFullYear()
    let months = target.getMonth() - birth.getMonth()
    let days = target.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = years * 12 + months
    const totalHours = totalDays * 24
    const totalMinutes = totalHours * 60
    const totalSeconds = totalMinutes * 60

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthday: getNextBirthday(birth, target),
    }
  }, [birthDate, targetDate])

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
        <h2 className="text-2xl font-bold">Age Calculator</h2>
        <p className="text-muted-foreground">
          Calculate exact age in years, months, days, and more.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birth-date">Date of Birth</Label>
            <Input
              id="birth-date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-date">Calculate Age On (optional)</Label>
            <Input
              id="target-date"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
            {!targetDate && (
              <p className="text-xs text-muted-foreground">Leave empty for current age</p>
            )}
          </div>
        </div>

        {age && (
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground mb-2">Your Age</p>
              <div className="flex flex-wrap items-baseline gap-4">
                <span className="text-4xl font-bold">{age.years}</span>
                <span className="text-lg">years,</span>
                <span className="text-4xl font-bold">{age.months}</span>
                <span className="text-lg">months,</span>
                <span className="text-4xl font-bold">{age.days}</span>
                <span className="text-lg">days</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Total Days" value={age.totalDays.toLocaleString()} />
              <StatCard label="Total Weeks" value={age.totalWeeks.toLocaleString()} />
              <StatCard label="Total Months" value={age.totalMonths.toLocaleString()} />
              <StatCard label="Total Hours" value={age.totalHours.toLocaleString()} />
              <StatCard label="Total Minutes" value={age.totalMinutes.toLocaleString()} />
              <StatCard label="Total Seconds" value={age.totalSeconds.toLocaleString()} />
            </div>

            {age.nextBirthday && (
              <div className="rounded-lg border bg-background p-4">
                <p className="text-sm text-muted-foreground mb-2">Next Birthday</p>
                <p className="text-lg font-medium">
                  {age.nextBirthday.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  In {age.nextBirthday.days} days ({age.nextBirthday.weekday})
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-bold font-mono">{value}</p>
    </div>
  )
}

function getNextBirthday(birth: Date, from: Date): { date: Date; days: number; weekday: string } | null {
  const now = new Date(from)
  let next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())

  if (next <= now) {
    next.setFullYear(next.getFullYear() + 1)
  }

  const daysUntil = Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return {
    date: next,
    days: daysUntil,
    weekday: next.toLocaleDateString("en-US", { weekday: "long" }),
  }
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Calendar, ArrowRightLeft } from "lucide-react"

interface HijriDate {
  day: number
  month: number
  monthName: string
  year: number
  weekday: string
}

const HIJRI_MONTHS = [
  "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
  "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
]

const HIJRI_WEEKDAYS = ["Al-Ahad", "Al-Ithnayn", "Al-Thulatha", "Al-Arbi'a", "Al-Khamis", "Al-Jumu'ah", "Al-Sabt"]

export default function HijriCalendarConverter() {
  const [conversionMode, setConversionMode] = useState<"gregorian-to-hijri" | "hijri-to-gregorian">("gregorian-to-hijri")
  const [gregorianDate, setGregorianDate] = useState<string>("")
  const [hijriDay, setHijriDay] = useState<string>("")
  const [hijriMonth, setHijriMonth] = useState<string>("1")
  const [hijriYear, setHijriYear] = useState<string>("")
  const [adjustedHijri, setAdjustedHijri] = useState<number>(0)
  const [copied, setCopied] = useState<string | null>(null)

  const gregorianToHijri = useCallback((date: Date): HijriDate => {
    // Simplified Hijri conversion algorithm
    const gd = date.getDate()
    const gm = date.getMonth() + 1
    const gy = date.getFullYear()

    // Julian Day Number calculation
    const a = Math.floor((14 - gm) / 12)
    const y = gy + 4800 - a
    const m = gm + 12 * a - 3
    const jdn = gd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045

    // Convert to Hijri
    const l = jdn - 1948440 + 10632
    const n = Math.floor((l - 1) / 10631)
    const l2 = l - 10631 * n + 354
    const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238)
    const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29
    const hijriMonth = Math.floor((24 * l3) / 709)
    const hijriDay = l3 - Math.floor((709 * hijriMonth) / 24)
    const hijriYear = 30 * n + j - 30

    const weekday = date.getDay()

    return {
      day: hijriDay,
      month: hijriMonth,
      monthName: HIJRI_MONTHS[hijriMonth - 1],
      year: hijriYear,
      weekday: HIJRI_WEEKDAYS[weekday],
    }
  }, [])

  const hijriToGregorian = useCallback((day: number, month: number, year: number): Date => {
    // Simplified Hijri to Gregorian conversion
    const hYear = year
    const hMonth = month
    const hDay = day

    // Approximate conversion
    const gYear = Math.floor(hYear * 0.97 + 622)
    const daysInHijriYear = Math.floor(hYear * 354.367)
    const daysSinceEpoch = daysInHijriYear + Math.floor((hMonth - 1) * 29.5) + hDay

    const gDays = Math.floor(daysSinceEpoch * 0.97) + 227015

    // Convert Julian Day to Gregorian
    const f = gDays + 1401 + Math.floor((Math.floor((4 * gDays + 274277) / 146097) * 3) / 4) - 38
    const e = 4 * f + 3
    const g = Math.floor((e % 1461) / 4)
    const h = 5 * g + 2

    const d = Math.floor((h % 153) / 5) + 1
    const m = (Math.floor(h / 153) + 2) % 12 + 1
    const y = Math.floor(e / 1461) - 4716 + Math.floor((12 + 2 - m) / 12)

    return new Date(y, m - 1, d)
  }, [])

  const hijriResult = useMemo(() => {
    if (!gregorianDate) return null
    const date = new Date(gregorianDate)
    const result = gregorianToHijri(date)
    return { ...result, adjustedYear: result.year + adjustedHijri }
  }, [gregorianDate, gregorianToHijri, adjustedHijri])

  const gregorianResult = useMemo(() => {
    if (!hijriDay || !hijriYear) return null
    const day = parseInt(hijriDay)
    const month = parseInt(hijriMonth)
    const year = parseInt(hijriYear)
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null
    return hijriToGregorian(day, month, year)
  }, [hijriDay, hijriMonth, hijriYear, hijriToGregorian])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setGregorianDate("")
    setHijriDay("")
    setHijriMonth("1")
    setHijriYear("")
    setAdjustedHijri(0)
  }, [])

  const today = new Date()
  const todayHijri = gregorianToHijri(today)

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selector */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Conversion Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={conversionMode === "gregorian-to-hijri" ? "default" : "outline"}
            onClick={() => setConversionMode("gregorian-to-hijri")}
            className="flex-1"
          >
            <Calendar className="size-4 mr-2" />
            Gregorian → Hijri
          </Button>
          <Button
            variant={conversionMode === "hijri-to-gregorian" ? "default" : "outline"}
            onClick={() => setConversionMode("hijri-to-gregorian")}
            className="flex-1"
          >
            <ArrowRightLeft className="size-4 mr-2" />
            Hijri → Gregorian
          </Button>
        </div>
      </section>

      {/* Today's Date Display */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Today (Gregorian)</p>
            <p className="font-semibold">
              {today.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Today (Hijri)</p>
            <p className="font-semibold">
              {todayHijri.day} {todayHijri.monthName} {todayHijri.year}
            </p>
          </div>
        </div>
      </section>

      {/* Gregorian to Hijri */}
      {conversionMode === "gregorian-to-hijri" && (
        <section className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gregorian-date">Select Gregorian Date</Label>
            <Input
              id="gregorian-date"
              type="date"
              value={gregorianDate}
              onChange={(e) => setGregorianDate(e.target.value)}
            />
          </div>

          {hijriResult && (
            <div className="rounded-lg border bg-background p-6">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Hijri Adjustment</Label>
                  <Select value={adjustedHijri.toString()} onValueChange={(v) => setAdjustedHijri(parseInt(v))}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="-1">-1 day</SelectItem>
                      <SelectItem value="0">No adjustment</SelectItem>
                      <SelectItem value="1">+1 day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-4xl font-bold">{hijriResult.day} {hijriResult.monthName} {hijriResult.adjustedYear}</p>
                <p className="text-muted-foreground">{hijriResult.weekday}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(`${hijriResult.day} ${hijriResult.monthName} ${hijriResult.adjustedYear}`, "hijri")}
                >
                  {copied === "hijri" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  <span className="ml-1">Copy</span>
                </Button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Hijri to Gregorian */}
      {conversionMode === "hijri-to-gregorian" && (
        <section className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hijri-day">Day</Label>
              <Input
                id="hijri-day"
                type="number"
                value={hijriDay}
                onChange={(e) => setHijriDay(e.target.value)}
                min="1"
                max="30"
                placeholder="1-30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hijri-month">Month</Label>
              <Select value={hijriMonth} onValueChange={setHijriMonth}>
                <SelectTrigger id="hijri-month">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HIJRI_MONTHS.map((month, idx) => (
                    <SelectItem key={idx} value={(idx + 1).toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hijri-year">Year</Label>
              <Input
                id="hijri-year"
                type="number"
                value={hijriYear}
                onChange={(e) => setHijriYear(e.target.value)}
                min="1"
                placeholder="e.g., 1445"
              />
            </div>
          </div>

          {gregorianResult && (
            <div className="rounded-lg border bg-background p-6">
              <div className="text-center space-y-3">
                <p className="text-3xl font-bold">
                  {gregorianResult.toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(gregorianResult.toLocaleDateString(), "gregorian")}
                >
                  {copied === "gregorian" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  <span className="ml-1">Copy</span>
                </Button>
              </div>
            </div>
          )}
        </section>
      )}

      <Button variant="ghost" size="sm" onClick={handleClear} className="w-full">
        <Trash2 className="size-4 mr-2" />
        Clear
      </Button>

      {/* Hijri Months Info */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="font-medium mb-3">Islamic (Hijri) Months</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
          {HIJRI_MONTHS.map((month, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="font-mono text-muted-foreground">{(idx + 1).toString().padStart(2, "0")}</span>
              <span>{month}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Hijri Calendar</h4>
            <p className="text-sm text-muted-foreground">
              The Islamic (Hijri) calendar is a lunar calendar with 12 months of 29 or 30 days.
              A Hijri year is approximately 11 days shorter than a Gregorian year. The calendar
              begins from the Prophet Muhammad's migration (Hijra) from Mecca to Medina in 622 CE.
              Actual moon sighting may vary the date by ±1 day.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

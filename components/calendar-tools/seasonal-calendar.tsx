"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Sun, Cloud, Snowflake, Leaf } from "lucide-react"

const SEASONS_NORTHERN = [
  { name: "Spring", start: { month: 2, day: 20 }, end: { month: 5, day: 20 }, icon: "🌱" },
  { name: "Summer", start: { month: 5, day: 21 }, end: { month: 8, day: 22 }, icon: "☀️" },
  { name: "Autumn", start: { month: 8, day: 23 }, end: { month: 11, day: 21 }, icon: "🍂" },
  { name: "Winter", start: { month: 11, day: 22 }, end: { month: 2, day: 19 }, icon: "❄️" },
]

const SEASONS_SOUTHERN = [
  { name: "Autumn", start: { month: 2, day: 20 }, end: { month: 5, day: 20 }, icon: "🍂" },
  { name: "Winter", start: { month: 5, day: 21 }, end: { month: 8, day: 22 }, icon: "❄️" },
  { name: "Spring", start: { month: 8, day: 23 }, end: { month: 11, day: 21 }, icon: "🌱" },
  { name: "Summer", start: { month: 11, day: 22 }, end: { month: 2, day: 19 }, icon: "☀️" },
]

export default function SeasonalCalendar() {
  const [hemisphere, setHemisphere] = useState<"northern" | "southern">("northern")
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const seasons = hemisphere === "northern" ? SEASONS_NORTHERN : SEASONS_SOUTHERN

  const getCurrentSeason = useCallback((date: Date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()

    for (const season of seasons) {
      const startMonth = season.start.month
      const startDay = season.start.day
      const endMonth = season.end.month
      const endDay = season.end.day

      if (startMonth < endMonth) {
        if ((month > startMonth || (month === startMonth && day >= startDay)) &&
            (month < endMonth || (month === endMonth && day <= endDay))) {
          return season
        }
      } else {
        // Season spans year boundary (e.g., Winter)
        if ((month >= startMonth && day >= startDay) || (month <= endMonth && day <= endDay)) {
          return season
        }
      }
    }

    return seasons[0]
  }, [seasons])

  const seasonDates = useMemo(() => {
    const year = selectedYear
    return seasons.map((season) => {
      const startDate = new Date(year, season.start.month - 1, season.start.day)
      const endDate = new Date(year, season.end.month - 1, season.end.day)
      
      // Handle year boundary
      let actualEndDate = endDate
      if (season.start.month > season.end.month) {
        actualEndDate = new Date(year + 1, season.end.month - 1, season.end.day)
      }

      return {
        ...season,
        startDate,
        endDate: actualEndDate,
        days: Math.floor((actualEndDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1,
      }
    })
  }, [selectedYear, seasons])

  const selectedSeason = useMemo(() => {
    if (!selectedDate) return null
    const date = new Date(selectedDate)
    return getCurrentSeason(date)
  }, [selectedDate, getCurrentSeason])

  const currentSeason = getCurrentSeason(new Date())

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const getSeasonIcon = (icon: string) => {
    switch (icon) {
      case "☀️": return <Sun className="size-6" />
      case "❄️": return <Snowflake className="size-6" />
      case "🌱": return <Leaf className="size-6" />
      case "🍂": return <Cloud className="size-6" />
      default: return <Sun className="size-6" />
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Configuration */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hemisphere">Hemisphere</Label>
            <Select value={hemisphere} onValueChange={(v) => setHemisphere(v as any)}>
              <SelectTrigger id="hemisphere">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="northern">Northern Hemisphere</SelectItem>
                <SelectItem value="southern">Southern Hemisphere</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value) || new Date().getFullYear())}
            />
          </div>
        </div>
      </section>

      {/* Current Season */}
      <section className="rounded-lg border bg-muted/30 p-6">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-4xl">
            {getSeasonIcon(currentSeason.icon)}
            <span>{currentSeason.icon}</span>
          </div>
          <p className="text-sm text-muted-foreground">Current Season ({hemisphere === "northern" ? "Northern" : "Southern"} Hemisphere)</p>
          <p className="text-3xl font-bold">{currentSeason.name}</p>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </section>

      {/* Date Checker */}
      <section className="space-y-3">
        <Label htmlFor="check-date">Check Season for Date</Label>
        <div className="flex gap-2">
          <Input
            id="check-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1"
          />
          {selectedSeason && (
            <Button
              variant="outline"
              onClick={() => copyToClipboard(`${selectedDate} is in ${selectedSeason.name}`, "season")}
            >
              {copied === "season" ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span className="ml-1">Copy</span>
            </Button>
          )}
        </div>
        {selectedSeason && (
          <div className="rounded-lg border bg-background p-4 text-center">
            <span className="text-3xl">{selectedSeason.icon}</span>
            <p className="font-semibold mt-2">{selectedSeason.name}</p>
          </div>
        )}
      </section>

      {/* Season Dates */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Season Dates for {selectedYear}</Label>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seasonDates.map((season) => (
            <div key={season.name} className="rounded-lg border bg-background p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{season.icon}</span>
                <span className="font-bold">{season.name}</span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">Starts:</p>
                <p className="font-medium">
                  {season.startDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </p>
                <p className="text-muted-foreground">Ends:</p>
                <p className="font-medium">
                  {season.endDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </p>
                <p className="text-muted-foreground pt-2">Duration:</p>
                <p className="font-medium">{season.days} days</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Timeline */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="font-medium mb-4">Year Overview</h4>
        <div className="flex h-12 rounded-full overflow-hidden">
          {seasonDates.map((season, idx) => {
            const totalDays = seasonDates.reduce((s, s2) => s + s2.days, 0)
            const width = (season.days / totalDays) * 100
            const colors = ["#22c55e", "#fbbf24", "#f97316", "#3b82f6"]
            return (
              <div
                key={season.name}
                className="flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${width}%`, backgroundColor: colors[idx] }}
                title={`${season.name}: ${season.days} days`}
              >
                {width > 10 && season.icon}
              </div>
            )
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Jan</span>
          <span>Apr</span>
          <span>Jul</span>
          <span>Oct</span>
          <span>Dec</span>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Seasons</h4>
            <p className="text-sm text-muted-foreground">
              Seasons are caused by Earth's axial tilt of approximately 23.5 degrees.
              The Northern and Southern Hemispheres experience opposite seasons.
              Astronomical seasons begin on solstices and equinoxes, while meteorological
              seasons use fixed dates for consistency in record-keeping.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

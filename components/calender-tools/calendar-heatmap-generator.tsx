"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy, Check, Download, Upload, BarChart3, Palette, Trash2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeatmapData {
  date: string
  value: number
}

interface ColorScheme {
  name: string
  colors: string[]
  type: "sequential" | "diverging"
}

const COLOR_SCHEMES: ColorScheme[] = [
  {
    name: "GitHub",
    colors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    type: "sequential",
  },
  {
    name: "Blue",
    colors: ["#f0f9ff", "#b3cde3", "#6e9fd4", "#2b65a8", "#0d326d"],
    type: "sequential",
  },
  {
    name: "Purple",
    colors: ["#f5f0ff", "#d4b9f0", "#a67ce0", "#7a44c9", "#4b1f8f"],
    type: "sequential",
  },
  {
    name: "Orange",
    colors: ["#fff5eb", "#fee0c2", "#fdae76", "#e76824", "#a63603"],
    type: "sequential",
  },
  {
    name: "Red-Yellow-Green",
    colors: ["#d73027", "#fee08b", "#1a9850"],
    type: "diverging",
  },
  {
    name: "Blue-White-Red",
    colors: ["#2166ac", "#f7f7f7", "#b2182b"],
    type: "diverging",
  },
  {
    name: "Sunset",
    colors: ["#355c7d", "#6c5b7b", "#c06c84", "#f67280", "#f8b195"],
    type: "sequential",
  },
  {
    name: "Ocean",
    colors: ["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"],
    type: "sequential",
  },
]

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAYS = ["Mon", "Wed", "Fri"]

export default function CalendarHeatmapGenerator() {
  const [data, setData] = useState<HeatmapData[]>([])
  const [dataInput, setDataInput] = useState("")
  const [selectedScheme, setSelectedScheme] = useState("GitHub")
  const [year, setYear] = useState(new Date().getFullYear())
  const [cellSize, setCellSize] = useState(12)
  const [copied, setCopied] = useState<string | null>(null)
  const [showExport, setShowExport] = useState(false)

  const parseDataInput = useCallback(() => {
    const lines = dataInput.trim().split("\n")
    const parsed: HeatmapData[] = []

    lines.forEach(line => {
      const parts = line.split(/[,;\t]/)
      if (parts.length >= 2) {
        const date = parts[0].trim()
        const value = parseFloat(parts[1].trim())
        if (!isNaN(value) && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          parsed.push({ date, value })
        }
      }
    })

    setData(parsed)
  }, [dataInput])

  const generateRandomData = useCallback(() => {
    const generated: HeatmapData[] = []
    const startDate = new Date(year, 0, 1)
    const endDate = new Date(year, 11, 31)

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      // Random activity with some patterns
      const dayOfWeek = d.getDay()
      let baseValue = Math.random() * 10

      // Less activity on weekends
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        baseValue *= 0.3
      }

      // Some random spikes
      if (Math.random() > 0.9) {
        baseValue *= 3
      }

      generated.push({
        date: d.toISOString().split("T")[0],
        value: Math.round(baseValue * 10) / 10,
      })
    }

    setData(generated)
    setDataInput(generated.map(d => `${d.date}, ${d.value}`).join("\n"))
  }, [year])

  const clearData = useCallback(() => {
    setData([])
    setDataInput("")
  }, [])

  const getColorForValue = useCallback((value: number, maxValue: number): string => {
    const scheme = COLOR_SCHEMES.find(s => s.name === selectedScheme) || COLOR_SCHEMES[0]
    const colors = scheme.colors

    if (value === 0) return colors[0]

    if (scheme.type === "sequential") {
      const normalizedValue = Math.min(value / maxValue, 1)
      const colorIndex = Math.min(
        Math.floor(normalizedValue * (colors.length - 1)) + 1,
        colors.length - 1
      )
      return colors[colorIndex]
    } else {
      // Diverging
      const midIndex = Math.floor(colors.length / 2)
      const normalizedValue = Math.min(value / maxValue, 1)

      if (normalizedValue < 0.5) {
        const localIndex = Math.floor(normalizedValue * 2 * midIndex)
        return colors[localIndex]
      } else {
        const localIndex = midIndex + Math.floor((normalizedValue - 0.5) * 2 * (colors.length - midIndex - 1))
        return colors[Math.min(localIndex + 1, colors.length - 1)]
      }
    }
  }, [selectedScheme])

  const heatmapData = useMemo(() => {
    if (data.length === 0) return []

    const maxValue = Math.max(...data.map(d => d.value), 1)
    const dataMap = new Map(data.map(d => [d.date, d.value]))

    const startDate = new Date(year, 0, 1)
    const endDate = new Date(year, 11, 31)

    const weeks: { date: string; value: number; color: string }[][] = []
    let currentWeek: { date: string; value: number; color: string }[] = []

    // Start from the first Monday of the year
    const firstDay = new Date(startDate)
    while (firstDay.getDay() !== 1) {
      firstDay.setDate(firstDay.getDate() - 1)
    }

    for (let d = new Date(firstDay); d <= endDate || currentWeek.length > 0; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0]
      const value = dataMap.get(dateStr) || 0
      const color = getColorForValue(value, maxValue)

      currentWeek.push({ date: dateStr, value, color })

      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }

      // Stop if we've gone past the end of the year and completed the last week
      if (d > endDate && currentWeek.length === 0) break
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    return { weeks, maxValue }
  }, [data, year, getColorForValue])

  const statistics = useMemo(() => {
    if (data.length === 0) return null

    const values = data.map(d => d.value)
    const total = values.reduce((a, b) => a + b, 0)
    const average = total / values.filter(v => v > 0).length || 0
    const max = Math.max(...values)
    const min = Math.min(...values.filter(v => v > 0)) || 0
    const activeDays = values.filter(v => v > 0).length
    const streak = calculateLongestStreak(data)

    return { total, average, max, min, activeDays, streak }
  }, [data])

  function calculateLongestStreak(data: HeatmapData[]): number {
    if (data.length === 0) return 0

    const sortedDates = data
      .filter(d => d.value > 0)
      .map(d => new Date(d.date).getTime())
      .sort((a, b) => a - b)

    if (sortedDates.length === 0) return 0

    let longestStreak = 1
    let currentStreak = 1
    const dayMs = 24 * 60 * 60 * 1000

    for (let i = 1; i < sortedDates.length; i++) {
      const diff = sortedDates[i] - sortedDates[i - 1]
      if (diff <= dayMs * 1.5) {
        currentStreak++
        longestStreak = Math.max(longestStreak, currentStreak)
      } else {
        currentStreak = 1
      }
    }

    return longestStreak
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

  const generateSVG = useMemo(() => {
    if (!heatmapData || !('weeks' in heatmapData) || !heatmapData.weeks || heatmapData.weeks.length === 0) return ""

    const weeks = heatmapData.weeks
    const weekWidth = cellSize + 3
    const dayHeight = cellSize + 3
    const leftMargin = 30
    const topMargin = 20
    const bottomMargin = 20

    const width = leftMargin + weeks.length * weekWidth + 20
    const height = topMargin + 7 * dayHeight + bottomMargin + 20

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`
    svg += `<style>.month-label { font: 10px sans-serif; fill: #666; }.day-label { font: 8px sans-serif; fill: #666; }.total-label { font: 12px sans-serif; fill: #333; font-weight: bold; }</style>`

    // Month labels
    let prevMonth = -1
    weeks.forEach((week, weekIndex) => {
      const firstDay = new Date(week[0]?.date || `${year}-01-01`)
      const month = firstDay.getMonth()
      if (month !== prevMonth) {
        svg += `<text x="${leftMargin + weekIndex * weekWidth}" y="15" class="month-label">${MONTHS[month]}</text>`
        prevMonth = month
      }
    })

    // Day labels
    DAYS.forEach((day, index) => {
      svg += `<text x="5" y="${topMargin + (index * 2 + 1) * dayHeight + 4}" class="day-label">${day}</text>`
    })

    // Cells
    weeks.forEach((week, weekIndex) => {
      week.forEach((day, dayIndex) => {
        const x = leftMargin + weekIndex * weekWidth
        const y = topMargin + dayIndex * dayHeight
        const dateObj = new Date(day.date)
        const dateStr = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

        svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${day.color}" rx="2" data-date="${day.date}" data-value="${day.value}">`
        svg += `<title>${dateStr}: ${day.value}</title>`
        svg += `</rect>`
      })
    })

    // Total
    if (statistics) {
      svg += `<text x="${width - 20}" y="${height - 5}" text-anchor="end" class="total-label">Total: ${Math.round(statistics.total)}</text>`
    }

    svg += `</svg>`
    return svg
  }, [heatmapData, cellSize, year, statistics])

  const downloadSVG = useCallback(() => {
    const blob = new Blob([generateSVG], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `heatmap-${year}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }, [generateSVG, year])

  const downloadPNG = useCallback(() => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const svgBlob = new Blob([generateSVG], { type: "image/svg+xml" })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width * 2
      canvas.height = img.height * 2
      ctx.scale(2, 2)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)

      canvas.toBlob((blob) => {
        if (blob) {
          const pngUrl = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = pngUrl
          a.download = `heatmap-${year}.png`
          a.click()
          URL.revokeObjectURL(pngUrl)
        }
      })
    }
    img.src = url
  }, [generateSVG, year])

  return (
    <TooltipProvider>
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Data Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-5" />
              Heatmap Data Input
            </CardTitle>
            <CardDescription>
              Enter your date-value pairs to generate a contribution heatmap
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color-scheme">Color Scheme</Label>
                <Select value={selectedScheme} onValueChange={setSelectedScheme}>
                  <SelectTrigger id="color-scheme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COLOR_SCHEMES.map((scheme) => (
                      <SelectItem key={scheme.name} value={scheme.name}>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {scheme.colors.map((c, i) => (
                              <div key={i} className="size-3 rounded-sm" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                          {scheme.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cell-size">Cell Size: {cellSize}px</Label>
                <Input
                  id="cell-size"
                  type="range"
                  min="6"
                  max="20"
                  value={cellSize}
                  onChange={(e) => setCellSize(parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Data (date, value per line)</Label>
              <div className="flex gap-2">
                <Textarea
                  value={dataInput}
                  onChange={(e) => setDataInput(e.target.value)}
                  placeholder="2024-01-15, 5&#10;2024-01-16, 3&#10;2024-01-17, 8"
                  className="font-mono text-sm flex-1"
                  rows={4}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={parseDataInput} className="gap-2">
                  <Upload className="size-4" />
                  Parse Data
                </Button>
                <Button onClick={generateRandomData} variant="outline" className="gap-2">
                  <BarChart3 className="size-4" />
                  Generate Random
                </Button>
                <Button onClick={clearData} variant="outline" className="gap-2">
                  <Trash2 className="size-4" />
                  Clear
                </Button>
              </div>
            </div>

            {data.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{data.length} data points</Badge>
                <Badge variant="outline">Year: {year}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        {statistics && (
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{Math.round(statistics.total)}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{statistics.average.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">Average</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{statistics.max}</div>
                  <div className="text-xs text-muted-foreground">Max</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{statistics.min}</div>
                  <div className="text-xs text-muted-foreground">Min</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{statistics.activeDays}</div>
                  <div className="text-xs text-muted-foreground">Active Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{statistics.streak}</div>
                  <div className="text-xs text-muted-foreground">Best Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Heatmap */}
        {heatmapData && 'weeks' in heatmapData && heatmapData.weeks && heatmapData.weeks.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contribution Heatmap</CardTitle>
                  <CardDescription>
                    {year} activity visualization
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowExport(!showExport)}>
                    <Download className="size-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <svg width="100%" viewBox={`0 0 ${30 + heatmapData.weeks.length * (cellSize + 3) + 20} ${20 + 7 * (cellSize + 3) + 40}`}>
                  {/* Month labels */}
                  {(() => {
                    const elements: React.ReactNode[] = []
                    let prevMonth = -1
                    heatmapData.weeks.forEach((week, weekIndex) => {
                      const firstDay = new Date(week[0]?.date || `${year}-01-01`)
                      const month = firstDay.getMonth()
                      if (month !== prevMonth) {
                        elements.push(
                          <text
                            key={`month-${weekIndex}`}
                            x={30 + weekIndex * (cellSize + 3)}
                            y="15"
                            className="text-[10px] fill-muted-foreground"
                          >
                            {MONTHS[month]}
                          </text>
                        )
                        prevMonth = month
                      }
                    })
                    return elements
                  })()}

                  {/* Day labels */}
                  {DAYS.map((day, index) => (
                    <text
                      key={`day-${index}`}
                      x="5"
                      y={20 + (index * 2 + 1) * (cellSize + 3) + 4}
                      className="text-[8px] fill-muted-foreground"
                    >
                      {day}
                    </text>
                  ))}

                  {/* Cells */}
                  {heatmapData.weeks.map((week, weekIndex) =>
                    week.map((day, dayIndex) => {
                      const dateObj = new Date(day.date)
                      const dateStr = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })

                      return (
                        <Tooltip key={`${weekIndex}-${dayIndex}`}>
                          <TooltipTrigger asChild>
                            <rect
                              x={30 + weekIndex * (cellSize + 3)}
                              y={20 + dayIndex * (cellSize + 3)}
                              width={cellSize}
                              height={cellSize}
                              fill={day.color}
                              rx={2}
                              className="cursor-pointer"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{dateStr}, {year}: {day.value}</p>
                          </TooltipContent>
                        </Tooltip>
                      )
                    })
                  )}
                </svg>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-4">
                <span className="text-xs text-muted-foreground">Less</span>
                <div className="flex gap-0.5">
                  {(COLOR_SCHEMES.find(s => s.name === selectedScheme) || COLOR_SCHEMES[0]).colors.map((color, i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: color,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">More</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Export Options */}
        {showExport && (
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button onClick={downloadSVG} variant="outline" className="gap-2">
                  <Download className="size-4" />
                  Download SVG
                </Button>
                <Button onClick={downloadPNG} variant="outline" className="gap-2">
                  <Download className="size-4" />
                  Download PNG
                </Button>
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(generateSVG, "svg")}
                  className="gap-2"
                >
                  {copied === "svg" ? <Check className="size-4" /> : <Copy className="size-4" />}
                  Copy SVG Code
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sample Data Format */}
        <Card>
          <CardHeader>
            <CardTitle>Data Format Guide</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Enter your data in one of these formats (one entry per line):</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><code className="bg-muted px-1 rounded">2024-01-15, 5</code> - Comma separated</li>
              <li><code className="bg-muted px-1 rounded">2024-01-15; 5</code> - Semicolon separated</li>
              <li><code className="bg-muted px-1 rounded">2024-01-15[TAB]5</code> - Tab separated</li>
            </ul>
            <p className="pt-2">
              Values can be any positive number. Higher values will show darker colors.
            </p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

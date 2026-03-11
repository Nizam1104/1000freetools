"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Download, Printer, Baby, Calendar, Info, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface PregnancyWeek {
  week: number
  trimester: number
  startDate: Date
  endDate: Date
  babySize: string
  babyLength: string
  babyWeight: string
  development: string
  symptoms: string[]
  milestones: string[]
}

interface DueDateResult {
  dueDate: Date
  conceptionDate: Date
  currentWeek: number
  currentDay: number
  trimester: number
  daysRemaining: number
  weeksRemaining: number
}

const PREGNANCY_DATA: Record<number, PregnancyWeek> = {
  1: {
    week: 1,
    trimester: 1,
    startDate: new Date(),
    endDate: new Date(),
    babySize: "Poppy seed",
    babyLength: "0.1 mm",
    babyWeight: "N/A",
    development: "Menstruation occurs. Ovulation typically happens around day 14.",
    symptoms: ["Menstrual bleeding", "Cramping"],
    milestones: ["Last menstrual period begins"],
  },
  4: {
    week: 4,
    trimester: 1,
    startDate: new Date(),
    endDate: new Date(),
    babySize: "Poppy seed",
    babyLength: "0.04 inches",
    babyWeight: "N/A",
    development: "Implantation complete. Neural tube forming. Heart begins to develop.",
    symptoms: ["Missed period", "Fatigue", "Breast tenderness", "Nausea"],
    milestones: ["First positive pregnancy test", "Heart begins forming"],
  },
  8: {
    week: 8,
    trimester: 1,
    startDate: new Date(),
    endDate: new Date(),
    babySize: "Raspberry",
    babyLength: "0.63 inches",
    babyWeight: "0.04 oz",
    development: "All major organs present. Fingers and toes forming. Heartbeat detectable.",
    symptoms: ["Morning sickness", "Frequent urination", "Food aversions"],
    milestones: ["Heartbeat detectable on ultrasound", "Embryo becomes fetus"],
  },
  12: {
    week: 12,
    trimester: 1,
    startDate: new Date(),
    endDate: new Date(),
    babySize: "Plum",
    babyLength: "2.13 inches",
    babyWeight: "0.49 oz",
    development: "Reflexes developing. Fingernails forming. Can make fists.",
    symptoms: ["Energy returning", "Decreased nausea", "Visible bump"],
    milestones: ["End of first trimester", "Risk of miscarriage decreases"],
  },
  16: {
    week: 16,
    trimester: 2,
    startDate: new Date(),
    endDate: new Date(),
    babySize: "Avocado",
    babyLength: "4.57 inches",
    babyWeight: "3.5 oz",
    development: "Facial muscles developing. Can suck thumb. Hearing developing.",
    symptoms: ["Increased energy", "Back pain", "Round ligament pain"],
    milestones: ["Gender may be visible on ultrasound", "May feel movement"],
  },
  20: {
    week: 20,
    trimester: 2,
    startDate: new Date(),
    endDate: new Date(),
    babySize: "Banana",
    babyLength: "6.5 inches",
    babyWeight: "10.2 oz",
    development: "Vernix covering skin. Can hear sounds. Swallowing amniotic fluid.",
    symptoms: ["Stronger movements", "Braxton Hicks contractions", "Leg cramps"],
    milestones: ["Halfway point", "Anatomy scan typically done"],
  },
  24: {
    week: 24,
    trimester: 2,
    startDate: new Date(),
    endDate: new Date(),
    babySize: "Ear of corn",
    babyLength: "11.8 inches",
    babyWeight: "1.3 lbs",
    development: "Lungs developing surfactant. Eyes opening. Taste buds forming.",
    symptoms: ["Back pain", "Swelling", "Shortness of breath"],
    milestones: ["Viability milestone", "Glucose screening test"],
  },
  28: {
    week: 28,
    trimester: 3,
    startDate: new Date(),
    endDate: new Date(),
    babySize: "Eggplant",
    babyLength: "14.8 inches",
    babyWeight: "2.2 lbs",
    development: "Brain developing rapidly. Can blink. Regular sleep cycles.",
    symptoms: ["Fatigue returning", "Frequent urination", "Heartburn"],
    milestones: ["Start of third trimester", "Baby can survive with intensive care"],
  },
  32: {
    week: 32,
    trimester: 3,
    startDate: new Date(),
    endDate: new Date(),
    babySize: "Squash",
    babyLength: "16.7 inches",
    babyWeight: "3.75 lbs",
    development: "Bones hardening. Practicing breathing movements. Gaining weight rapidly.",
    symptoms: ["Braxton Hicks intensify", "Difficulty sleeping", "Pelvic pressure"],
    milestones: ["Baby may turn head-down", "More frequent prenatal visits"],
  },
  36: {
    week: 36,
    trimester: 3,
    startDate: new Date(),
    endDate: new Date(),
    babySize: "Papaya",
    babyLength: "18.7 inches",
    babyWeight: "5.78 lbs",
    development: "Lungs nearly mature. Immune system developing. Less room to move.",
    symptoms: ["Pelvic pressure", "Nesting instinct", "Lightening"],
    milestones: ["Baby considered early term", "Weekly prenatal visits begin"],
  },
  40: {
    week: 40,
    trimester: 3,
    startDate: new Date(),
    endDate: new Date(),
    babySize: "Watermelon",
    babyLength: "20.2 inches",
    babyWeight: "7.63 lbs",
    development: "Fully developed. Lungs mature. Ready for birth.",
    symptoms: ["Contractions", "Water breaking", "Bloody show"],
    milestones: ["Full term", "Due date reached"],
  },
}

export default function PregnancyDueDateCalendar() {
  const [calculationMethod, setCalculationMethod] = useState<"lmp" | "conception">("lmp")
  const [lmpDate, setLmpDate] = useState("")
  const [conceptionDate, setConceptionDate] = useState("")
  const [cycleLength, setCycleLength] = useState("28")
  const [result, setResult] = useState<DueDateResult | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [selectedWeek, setSelectedWeek] = useState(1)

  const calculateDueDate = useCallback(() => {
    let lmp: Date
    let conception: Date

    if (calculationMethod === "lmp" && lmpDate) {
      lmp = new Date(lmpDate)
      conception = new Date(lmp)
      conception.setDate(conception.getDate() + parseInt(cycleLength) - 14)
    } else if (calculationMethod === "conception" && conceptionDate) {
      conception = new Date(conceptionDate)
      lmp = new Date(conception)
      lmp.setDate(lmp.getDate() - (parseInt(cycleLength) - 14))
    } else {
      return
    }

    // Naegele's rule: Add 280 days (40 weeks) to LMP
    const dueDate = new Date(lmp)
    dueDate.setDate(dueDate.getDate() + 280)

    // Calculate current progress
    const today = new Date()
    const daysSinceLMP = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24))
    const currentWeek = Math.floor(daysSinceLMP / 7)
    const currentDay = daysSinceLMP % 7
    const trimester = currentWeek < 13 ? 1 : currentWeek < 27 ? 2 : 3
    const daysRemaining = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
    const weeksRemaining = Math.floor(daysRemaining / 7)

    setResult({
      dueDate,
      conceptionDate: conception,
      currentWeek: Math.min(40, Math.max(0, currentWeek)),
      currentDay,
      trimester,
      daysRemaining,
      weeksRemaining,
    })
  }, [calculationMethod, lmpDate, conceptionDate, cycleLength])

  const getWeekData = useCallback((weekNum: number): PregnancyWeek => {
    const baseWeek = PREGNANCY_DATA[weekNum] || PREGNANCY_DATA[40]
    if (result) {
      const weekStart = new Date(result.conceptionDate)
      weekStart.setDate(weekStart.getDate() + (weekNum - 2) * 7)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 7)
      return { ...baseWeek, startDate: weekStart, endDate: weekEnd }
    }
    return baseWeek
  }, [result])

  const currentWeekData = useMemo(() => {
    if (!result) return null
    return getWeekData(result.currentWeek)
  }, [result, getWeekData])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const trimesterInfo = [
    {
      trimester: 1,
      name: "First Trimester",
      weeks: "Weeks 1-12",
      description: "Major organs and structures form. Highest risk period for miscarriage.",
      color: "from-pink-500 to-rose-500",
    },
    {
      trimester: 2,
      name: "Second Trimester",
      weeks: "Weeks 13-26",
      description: "Baby grows rapidly. Movement felt. Energy typically returns.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      trimester: 3,
      name: "Third Trimester",
      weeks: "Weeks 27-40",
      description: "Final growth and development. Baby prepares for birth.",
      color: "from-blue-500 to-cyan-500",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Calculation Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="size-5" />
            Due Date Calculator
          </CardTitle>
          <CardDescription>
            Calculate your baby's due date and track pregnancy progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant={calculationMethod === "lmp" ? "default" : "outline"}
              onClick={() => setCalculationMethod("lmp")}
              className="flex-1"
            >
              Last Menstrual Period
            </Button>
            <Button
              variant={calculationMethod === "conception" ? "default" : "outline"}
              onClick={() => setCalculationMethod("conception")}
              className="flex-1"
            >
              Conception Date
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {calculationMethod === "lmp" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="lmp-date">First Day of Last Period</Label>
                  <Input
                    id="lmp-date"
                    type="date"
                    value={lmpDate}
                    onChange={(e) => setLmpDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cycle-length">Cycle Length (days)</Label>
                  <Select value={cycleLength} onValueChange={setCycleLength}>
                    <SelectTrigger id="cycle-length">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35].map((days) => (
                        <SelectItem key={days} value={days.toString()}>{days} days</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="conception-date">Conception Date</Label>
                <Input
                  id="conception-date"
                  type="date"
                  value={conceptionDate}
                  onChange={(e) => setConceptionDate(e.target.value)}
                />
              </div>
            )}
          </div>

          <Button onClick={calculateDueDate} className="w-full">
            Calculate Due Date
          </Button>

          {result && (
            <div className="space-y-4 pt-4 border-t">
              <div className="rounded-lg border bg-primary/10 p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Estimated Due Date</p>
                <p className="text-4xl font-bold">
                  {result.dueDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Conception date: {result.conceptionDate.toLocaleDateString()}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-lg border bg-muted/30 p-4 text-center">
                  <p className="text-2xl font-bold">{result.currentWeek}</p>
                  <p className="text-xs text-muted-foreground mt-1">Weeks Pregnant</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4 text-center">
                  <p className="text-2xl font-bold">Day {result.currentDay + 1}</p>
                  <p className="text-xs text-muted-foreground mt-1">Of Week {result.currentWeek + 1}</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4 text-center">
                  <p className="text-2xl font-bold">{result.weeksRemaining}</p>
                  <p className="text-xs text-muted-foreground mt-1">Weeks to Go</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4 text-center">
                  <p className="text-2xl font-bold">{result.trimester}</p>
                  <p className="text-xs text-muted-foreground mt-1">Trimester</p>
                </div>
              </div>

              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(
                    `Due Date: ${result.dueDate.toLocaleDateString()} | Currently: Week ${result.currentWeek}, Day ${result.currentDay + 1}`,
                    "result"
                  )}
                >
                  {copied === "result" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy Summary
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1">
                  <Printer className="size-4" />
                  Print
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {result && currentWeekData && (
        <>
          {/* Current Week Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="size-5" />
                Week {result.currentWeek} - Your Baby's Development
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="text-3xl mb-2">👶</div>
                  <div className="text-sm text-muted-foreground">Size</div>
                  <div className="font-semibold">{currentWeekData.babySize}</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="text-3xl mb-2">📏</div>
                  <div className="text-sm text-muted-foreground">Length</div>
                  <div className="font-semibold">{currentWeekData.babyLength}</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="text-3xl mb-2">⚖️</div>
                  <div className="text-sm text-muted-foreground">Weight</div>
                  <div className="font-semibold">{currentWeekData.babyWeight}</div>
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Development This Week</h4>
                <p className="text-sm text-muted-foreground">{currentWeekData.development}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Common Symptoms</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {currentWeekData.symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-primary" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Milestones</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {currentWeekData.milestones.map((milestone, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-green-500" />
                        {milestone}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Week by Week Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Week-by-Week Pregnancy Calendar</CardTitle>
              <CardDescription>
                Track your pregnancy journey week by week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All Weeks</TabsTrigger>
                  <TabsTrigger value="trimester">By Trimester</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <ScrollArea className="h-96">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => {
                        const weekData = getWeekData(week)
                        const isCurrentWeek = result && week === result.currentWeek
                        const isPastWeek = result && week < result.currentWeek

                        return (
                          <button
                            key={week}
                            onClick={() => setSelectedWeek(week)}
                            className={cn(
                              "p-3 rounded-lg border text-left transition-colors",
                              isCurrentWeek && "ring-2 ring-primary bg-primary/10",
                              isPastWeek && "opacity-60",
                              selectedWeek === week && "border-primary"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">Week {week}</span>
                              {isCurrentWeek && <Badge>Current</Badge>}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {weekData.babySize}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="trimester" className="space-y-4">
                  <div className="space-y-6">
                    {trimesterInfo.map((t) => (
                      <div key={t.trimester}>
                        <div className={cn("h-2 rounded-full bg-gradient-to-r mb-3", t.color)} />
                        <h4 className="font-semibold mb-2">{t.name} ({t.weeks})</h4>
                        <p className="text-sm text-muted-foreground mb-3">{t.description}</p>
                        <div className="grid sm:grid-cols-3 gap-2">
                          {Array.from({ length: 13 }, (_, i) => {
                            const weekNum = (t.trimester - 1) * 13 + i + 1
                            if (weekNum > 40) return null
                            const weekData = getWeekData(weekNum)
                            return (
                              <button
                                key={weekNum}
                                onClick={() => setSelectedWeek(weekNum)}
                                className={cn(
                                  "p-2 rounded border text-sm text-left hover:bg-muted",
                                  selectedWeek === weekNum && "border-primary bg-primary/10"
                                )}
                              >
                                W{weekNum}: {weekData.babySize}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="milestones" className="space-y-4">
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {[4, 8, 12, 16, 20, 24, 28, 32, 36, 40].map((week) => {
                        const weekData = getWeekData(week)
                        return (
                          <div
                            key={week}
                            className="flex items-start gap-4 p-4 rounded-lg border"
                          >
                            <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                              {week}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">Week {week} - {weekData.babySize}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{weekData.development}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {weekData.milestones.map((milestone, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {milestone}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Trimester Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="size-5" />
                Trimester Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {trimesterInfo.map((t) => (
                  <div
                    key={t.trimester}
                    className={cn(
                      "p-4 rounded-lg border-2",
                      result?.trimester === t.trimester && "border-primary bg-primary/5"
                    )}
                  >
                    <div className={cn("h-2 rounded-full bg-gradient-to-r mb-3", t.color)} />
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{t.weeks}</p>
                    <p className="text-sm">{t.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!result && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Baby className="size-12 text-muted-foreground mx-auto" />
              <div>
                <p className="font-medium">Calculate Your Due Date</p>
                <p className="text-sm text-muted-foreground">
                  Enter your last menstrual period or conception date to get started
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-section, .printable-section * {
            visibility: visible;
          }
          .printable-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

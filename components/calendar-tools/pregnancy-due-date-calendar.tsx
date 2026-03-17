"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Trash2, Info, Calendar } from "lucide-react"

export default function PregnancyDueDateCalendar() {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>("")
  const [cycleLength, setCycleLength] = useState<string>("28")
  const [conceptionDate, setConceptionDate] = useState<string>("")
  const [ivfTransferDate, setIvfTransferDate] = useState<string>("")
  const [embryoAge, setEmbryoAge] = useState<string>("5")
  const [calculationMethod, setCalculationMethod] = useState<"lmp" | "conception" | "ivf">("lmp")
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [copied, setCopied] = useState<string | null>(null)

  const calculateDueDate = useCallback(() => {
    let result: Date | null = null

    if (calculationMethod === "lmp" && lastPeriodDate) {
      // Naegele's rule: LMP + 280 days (40 weeks)
      const lmp = new Date(lastPeriodDate)
      const cycleAdjustment = parseInt(cycleLength) - 28
      result = new Date(lmp)
      result.setDate(result.getDate() + 280 + cycleAdjustment)
    } else if (calculationMethod === "conception" && conceptionDate) {
      // Conception date + 266 days (38 weeks)
      const conception = new Date(conceptionDate)
      result = new Date(conception)
      result.setDate(result.getDate() + 266)
    } else if (calculationMethod === "ivf" && ivfTransferDate) {
      // IVF transfer date + (266 - embryo age in days)
      const transfer = new Date(ivfTransferDate)
      const embryoDays = parseInt(embryoAge)
      result = new Date(transfer)
      result.setDate(result.getDate() + 266 - embryoDays)
    }

    setDueDate(result)
  }, [calculationMethod, lastPeriodDate, cycleLength, conceptionDate, ivfTransferDate, embryoAge])

  const pregnancyInfo = useMemo(() => {
    if (!dueDate) return null

    const now = new Date()
    const conceptionEstimate = new Date(dueDate)
    conceptionEstimate.setDate(conceptionEstimate.getDate() - 266)

    const daysPregnant = Math.floor((now.getTime() - conceptionEstimate.getTime()) / (1000 * 60 * 60 * 24))
    const weeksPregnant = Math.floor(daysPregnant / 7)
    const daysInWeek = daysPregnant % 7

    const daysRemaining = Math.floor((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const weeksRemaining = Math.floor(daysRemaining / 7)

    const trimester = weeksPregnant < 13 ? 1 : weeksPregnant < 27 ? 2 : 3

    return {
      weeksPregnant,
      daysInWeek,
      weeksRemaining,
      daysRemaining,
      trimester,
      daysPregnant,
      conceptionEstimate,
    }
  }, [dueDate])

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
    setLastPeriodDate("")
    setConceptionDate("")
    setIvfTransferDate("")
    setDueDate(null)
  }, [])

  React.useEffect(() => {
    calculateDueDate()
  }, [calculateDueDate])

  const getTrimesterInfo = (trimester: number) => {
    switch (trimester) {
      case 1:
        return { name: "First Trimester", weeks: "Weeks 1-12", description: "Early development stage" }
      case 2:
        return { name: "Second Trimester", weeks: "Weeks 13-26", description: "Growth and development" }
      case 3:
        return { name: "Third Trimester", weeks: "Weeks 27-40", description: "Final preparation" }
      default:
        return { name: "", weeks: "", description: "" }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Calculation Method */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Calculation Method</Label>
        <Select value={calculationMethod} onValueChange={(v) => setCalculationMethod(v as any)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lmp">Last Menstrual Period (LMP)</SelectItem>
            <SelectItem value="conception">Conception Date</SelectItem>
            <SelectItem value="ivf">IVF Transfer Date</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Input Fields */}
      {calculationMethod === "lmp" && (
        <section className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lmp-date">Last Period Start Date</Label>
              <Input
                id="lmp-date"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycle-length">Cycle Length (days)</Label>
              <Input
                id="cycle-length"
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                min="20"
                max="45"
              />
            </div>
          </div>
        </section>
      )}

      {calculationMethod === "conception" && (
        <section className="space-y-2">
          <Label htmlFor="conception-date">Conception Date</Label>
          <Input
            id="conception-date"
            type="date"
            value={conceptionDate}
            onChange={(e) => setConceptionDate(e.target.value)}
          />
        </section>
      )}

      {calculationMethod === "ivf" && (
        <section className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ivf-date">IVF Transfer Date</Label>
              <Input
                id="ivf-date"
                type="date"
                value={ivfTransferDate}
                onChange={(e) => setIvfTransferDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="embryo-age">Embryo Age (days)</Label>
              <Select value={embryoAge} onValueChange={setEmbryoAge}>
                <SelectTrigger id="embryo-age">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days (Day 3 embryo)</SelectItem>
                  <SelectItem value="5">5 days (Blastocyst)</SelectItem>
                  <SelectItem value="6">6 days (Blastocyst)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      )}

      <Button variant="ghost" size="sm" onClick={handleClear} className="w-full">
        <Trash2 className="size-4 mr-2" />
        Clear
      </Button>

      {/* Results */}
      {dueDate && pregnancyInfo && (
        <section className="space-y-6">
          {/* Due Date Display */}
          <div className="rounded-lg border bg-muted/30 p-6 text-center">
            <Calendar className="size-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Estimated Due Date</p>
            <p className="text-3xl font-bold mt-1">
              {dueDate.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(dueDate.toLocaleDateString(), "dueDate")}
              >
                {copied === "dueDate" ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span className="ml-1">Copy Date</span>
              </Button>
            </div>
          </div>

          {/* Current Progress */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Current Progress</p>
              <p className="text-2xl font-bold">
                Week {pregnancyInfo.weeksPregnant} + {pregnancyInfo.daysInWeek}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {getTrimesterInfo(pregnancyInfo.trimester).name}
              </p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Time Remaining</p>
              <p className="text-2xl font-bold">
                {pregnancyInfo.weeksRemaining} weeks, {pregnancyInfo.daysRemaining % 7} days
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {pregnancyInfo.daysRemaining} days left
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Pregnancy Progress</span>
              <span>{Math.min(100, Math.round((pregnancyInfo.weeksPregnant / 40) * 100))}%</span>
            </div>
            <div className="h-4 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-pink-500 transition-all"
                style={{ width: `${Math.min(100, (pregnancyInfo.weeksPregnant / 40) * 100)}%` }}
              />
            </div>
          </div>

          {/* Trimester Info */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="font-medium mb-2">{getTrimesterInfo(pregnancyInfo.trimester).name}</h4>
            <p className="text-sm text-muted-foreground">
              {getTrimesterInfo(pregnancyInfo.trimester).weeks} - {getTrimesterInfo(pregnancyInfo.trimester).description}
            </p>
          </div>

          {/* Key Dates */}
          <div className="rounded-lg border bg-background divide-y">
            <div className="flex justify-between p-3">
              <span className="text-sm text-muted-foreground">Conception (estimated)</span>
              <span className="font-medium">{pregnancyInfo.conceptionEstimate.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between p-3">
              <span className="text-sm text-muted-foreground">End of First Trimester</span>
              <span className="font-medium">
                {new Date(dueDate.getTime() - (40 - 12) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between p-3">
              <span className="text-sm text-muted-foreground">End of Second Trimester</span>
              <span className="font-medium">
                {new Date(dueDate.getTime() - (40 - 26) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-muted/50">
              <span className="font-medium">Due Date</span>
              <span className="font-bold">{dueDate.toLocaleDateString()}</span>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Due Date Calculation</h4>
            <p className="text-sm text-muted-foreground">
              The due date is estimated using Naegele's rule (LMP + 280 days) or by adding 
              266 days to the conception date. Only about 5% of babies are born on their 
              due date - most arrive within 2 weeks before or after. Always consult your 
              healthcare provider for accurate dating.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

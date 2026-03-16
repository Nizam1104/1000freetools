"use client"

import * as React from "react"
import { useState, useCallback, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Check, Clock, Calendar, PartyPopper } from "lucide-react"

interface Milestone {
  days: number
  label: string
  date: Date
}

export default function TimeUntilCalculator() {
  const [targetDate, setTargetDate] = useState<string>("")
  const [targetTime, setTargetTime] = useState<string>("00:00")
  const [eventName, setEventName] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState<{
    years: number
    days: number
    hours: number
    minutes: number
    seconds: number
    totalSeconds: number
    isPast: boolean
  } | null>(null)

  useEffect(() => {
    const updateTimeLeft = () => {
      if (!targetDate) {
        setTimeLeft(null)
        return
      }

      const target = new Date(`${targetDate}T${targetTime}`)
      const now = new Date()
      const diff = target.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({
          years: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
          isPast: true,
        })
        return
      }

      const totalSeconds = Math.floor(diff / 1000)
      const years = Math.floor(totalSeconds / (365.25 * 24 * 60 * 60))
      const remainingAfterYears = totalSeconds - years * 365.25 * 24 * 60 * 60
      const days = Math.floor(remainingAfterYears / (24 * 60 * 60))
      const remainingAfterDays = remainingAfterYears - days * 24 * 60 * 60
      const hours = Math.floor(remainingAfterDays / (60 * 60))
      const remainingAfterHours = remainingAfterDays - hours * 60 * 60
      const minutes = Math.floor(remainingAfterHours / 60)
      const seconds = remainingAfterHours % 60

      setTimeLeft({
        years,
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
        isPast: false,
      })
    }

    updateTimeLeft()
    const interval = setInterval(updateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [targetDate, targetTime])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const [copied, setCopied] = useState<string | null>(null)

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const quickEvents = [
    { label: "New Year's Day", month: 0, day: 1 },
    { label: "Valentine's Day", month: 1, day: 14 },
    { label: "Halloween", month: 9, day: 31 },
    { label: "Christmas", month: 11, day: 25 },
    { label: "Next Birthday", month: null, day: null },
  ]

  const setQuickEvent = (event: typeof quickEvents[0]) => {
    const now = new Date()
    let target = new Date(now.getFullYear(), event.month!, event.day!)

    if (target <= now && event.month !== null) {
      target = new Date(now.getFullYear() + 1, event.month!, event.day!)
    }

    setTargetDate(target.toISOString().split("T")[0])
    setEventName(event.label)
  }

  const percentageOfYear = useMemo(() => {
    if (!timeLeft || timeLeft.isPast) return null
    const totalSecondsInYear = 365.25 * 24 * 60 * 60
    return ((timeLeft.totalSeconds / totalSecondsInYear) * 100).toFixed(2)
  }, [timeLeft])

  const milestones = useMemo((): Milestone[] => {
    if (!timeLeft || timeLeft.isPast) return []

    const milestones: Milestone[] = []
    const now = new Date()
    const target = new Date(`${targetDate}T${targetTime}`)

    const checkMilestone = (days: number, label: string) => {
      const milestoneDate = new Date(target)
      milestoneDate.setDate(milestoneDate.getDate() - days)
      if (milestoneDate > now) {
        milestones.push({ days, label, date: milestoneDate })
      }
    }

    checkMilestone(100, "100 Days")
    checkMilestone(50, "50 Days")
    checkMilestone(30, "30 Days")
    checkMilestone(14, "2 Weeks")
    checkMilestone(7, "1 Week")
    checkMilestone(1, "1 Day")

    return milestones
  }, [timeLeft, targetDate, targetTime])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Time Until Calculator</h2>
        <p className="text-muted-foreground">
          Calculate time left until a future date with live updating countdown.
          Perfect for events, deadlines, and special occasions.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="event-name">Event Name (optional)</Label>
            <Input
              id="event-name"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g., My Birthday, Project Deadline"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-date">Target Date</Label>
            <Input
              id="target-date"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-time">Target Time</Label>
            <Input
              id="target-time"
              type="time"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Quick:</span>
          {quickEvents.map((event) => (
            <Button
              key={event.label}
              variant="outline"
              size="sm"
              onClick={() => setQuickEvent(event)}
            >
              {event.label}
            </Button>
          ))}
        </div>
      </div>

      {timeLeft && (
        <div className="space-y-4">
          {timeLeft.isPast ? (
            <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 p-6 text-center space-y-2">
              <PartyPopper className="size-12 mx-auto text-green-600" />
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                {eventName ? `${eventName} has arrived!` : "The event has arrived!"}
              </p>
              <p className="text-muted-foreground">
                {targetDate && formatDate(new Date(targetDate))}
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-lg border bg-background p-6">
                {eventName && (
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold">{eventName}</h3>
                    <p className="text-muted-foreground">{formatDate(new Date(`${targetDate}T${targetTime}`))}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {timeLeft.years > 0 && (
                    <TimeBlock label="Years" value={timeLeft.years} />
                  )}
                  <TimeBlock label="Days" value={timeLeft.days} />
                  <TimeBlock label="Hours" value={timeLeft.hours} />
                  <TimeBlock label="Minutes" value={timeLeft.minutes} />
                  <TimeBlock
                    label="Seconds"
                    value={timeLeft.seconds}
                    highlight={timeLeft.seconds <= 10}
                  />
                </div>

                <div className="mt-6 pt-4 border-t flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {timeLeft.totalSeconds.toLocaleString()} seconds remaining
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`${timeLeft.years}y ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`, "time")}
                  >
                    {copied === "time" ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                    Copy
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="size-5 text-muted-foreground" />
                    <h4 className="font-semibold">Detailed Breakdown</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Days</span>
                      <span className="font-mono">{Math.floor(timeLeft.totalSeconds / (24 * 60 * 60)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Hours</span>
                      <span className="font-mono">{Math.floor(timeLeft.totalSeconds / (60 * 60)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Minutes</span>
                      <span className="font-mono">{Math.floor(timeLeft.totalSeconds / 60).toLocaleString()}</span>
                    </div>
                    {percentageOfYear && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">% of Year</span>
                        <span className="font-mono">{percentageOfYear}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {milestones.length > 0 && (
                  <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-5 text-muted-foreground" />
                      <h4 className="font-semibold">Upcoming Milestones</h4>
                    </div>
                    <div className="space-y-2">
                      {milestones.map((m) => (
                        <div key={m.days} className="flex items-center justify-between text-sm">
                          <span>{m.label}</span>
                          <span className="font-mono text-muted-foreground">
                            {m.date.toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {!timeLeft && (
        <div className="text-center py-12 text-muted-foreground">
          <Clock className="size-12 mx-auto mb-4 opacity-50" />
          <p>Select a future date to see the countdown</p>
        </div>
      )}

      <div className="rounded-lg border bg-background p-4 space-y-2">
        <h3 className="font-semibold">Common Use Cases</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Event Planning</p>
            <p className="text-xs text-muted-foreground">
              Track time until weddings, parties, or conferences
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Project Deadlines</p>
            <p className="text-xs text-muted-foreground">
              Monitor time remaining for project completion
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Special Occasions</p>
            <p className="text-xs text-muted-foreground">
              Count down to birthdays, anniversaries, holidays
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TimeBlock({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`text-center p-4 rounded-lg border ${highlight ? "bg-red-50 dark:bg-red-950/20 border-red-200" : "bg-muted/30"}`}>
      <p className={`text-4xl md:text-5xl font-bold font-mono ${highlight ? "text-red-600 animate-pulse" : ""}`}>
        {String(value).padStart(2, "0")}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}

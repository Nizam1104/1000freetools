"use client"

import * as React from "react"
import { useState, useCallback, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Clock } from "lucide-react"

export default function EventCountdown() {
  const [eventName, setEventName] = useState<string>("")
  const [eventDate, setEventDate] = useState<string>("")
  const [eventTime, setEventTime] = useState<string>("00:00")
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
    total: number
  } | null>(null)
  const [isPast, setIsPast] = useState<boolean>(false)
  const [copied, setCopied] = useState<string | null>(null)

  const calculateTimeLeft = useCallback(() => {
    if (!eventDate) return null

    const eventDateTime = new Date(`${eventDate}T${eventTime}`)
    const now = new Date()
    const difference = eventDateTime.getTime() - now.getTime()

    if (difference <= 0) {
      setIsPast(true)
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      }
    }

    setIsPast(false)
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    }
  }, [eventDate, eventTime])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

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
    setEventName("")
    setEventDate("")
    setEventTime("00:00")
    setTimeLeft(null)
    setIsPast(false)
  }, [])

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0")
  }

  const getTimeLeftText = () => {
    if (!timeLeft) return ""
    if (isPast) return `${eventName || "Event"} has passed!`
    
    const parts = []
    if (timeLeft.days > 0) parts.push(`${timeLeft.days} day${timeLeft.days !== 1 ? "s" : ""}`)
    if (timeLeft.hours > 0) parts.push(`${timeLeft.hours} hour${timeLeft.hours !== 1 ? "s" : ""}`)
    if (timeLeft.minutes > 0) parts.push(`${timeLeft.minutes} minute${timeLeft.minutes !== 1 ? "s" : ""}`)
    if (timeLeft.seconds >= 0) parts.push(`${timeLeft.seconds} second${timeLeft.seconds !== 1 ? "s" : ""}`)
    
    return parts.join(", ")
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Event Details */}
      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="event-name" className="text-base font-medium">
            Event Name
          </Label>
          <Input
            id="event-name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g., New Year 2025, Birthday, Wedding"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="event-date" className="text-base font-medium">
              Event Date
            </Label>
            <Input
              id="event-date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-time" className="text-base font-medium">
              Event Time
            </Label>
            <Input
              id="event-time"
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={handleClear} className="w-full">
          <Trash2 className="size-4 mr-2" />
          Clear
        </Button>
      </section>

      {/* Countdown Display */}
      {timeLeft && (
        <section className="space-y-4">
          {eventName && (
            <div className="text-center">
              <h3 className="text-2xl font-bold">{eventName}</h3>
              <p className="text-muted-foreground">
                {new Date(`${eventDate}T${eventTime}`).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}

          {isPast ? (
            <div className="rounded-lg border bg-muted/30 p-8 text-center">
              <Clock className="size-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl font-semibold">
                {eventName ? `${eventName} has passed!` : "This event has passed!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border bg-muted/30 p-4 text-center"
                >
                  <p className="text-4xl font-bold font-mono">{formatNumber(item.value)}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Time Left Text */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Time remaining:</p>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(getTimeLeftText(), "text")}
                className="h-7"
              >
                {copied === "text" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <p className="font-medium mt-1">{getTimeLeftText()}</p>
          </div>

          {/* Progress Bar */}
          {!isPast && timeLeft.total > 0 && (
            <div className="space-y-2">
              <div className="h-4 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000"
                  style={{
                    width: `${Math.min(100, (1 - timeLeft.total / (365 * 24 * 60 * 60 * 1000)) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Countdown in progress...
              </p>
            </div>
          )}
        </section>
      )}

      {/* Quick Presets */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Quick Presets</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { name: "New Year", days: 365 },
            { name: "Valentine's Day", days: 45 },
            { name: "Halloween", days: 240 },
            { name: "Christmas", days: 280 },
            { name: "1 Week", days: 7 },
            { name: "30 Days", days: 30 },
          ].map((preset) => {
            const date = new Date()
            date.setDate(date.getDate() + preset.days)
            return (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => {
                  setEventName(preset.name)
                  setEventDate(date.toISOString().split("T")[0])
                }}
              >
                {preset.name}
              </Button>
            )
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Event Countdown</h4>
            <p className="text-sm text-muted-foreground">
              Track the time remaining until any important event. Set the date and time,
              and watch the countdown update in real-time. Perfect for birthdays, holidays,
              deadlines, weddings, or any special occasion.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

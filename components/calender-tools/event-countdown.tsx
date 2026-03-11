"use client"

import * as React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Share2, Code, Play, Pause, RotateCcw, Sparkles, Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

interface CountdownEvent {
  id: string
  name: string
  date: string
  color: string
  backgroundImage?: string
}

const COLOR_OPTIONS = [
  { value: "#3b82f6", label: "Blue", from: "from-blue-500", to: "to-blue-700" },
  { value: "#8b5cf6", label: "Purple", from: "from-purple-500", to: "to-purple-700" },
  { value: "#ec4899", label: "Pink", from: "from-pink-500", to: "to-pink-700" },
  { value: "#ef4444", label: "Red", from: "from-red-500", to: "to-red-700" },
  { value: "#f97316", label: "Orange", from: "from-orange-500", to: "to-orange-700" },
  { value: "#eab308", label: "Yellow", from: "from-yellow-500", to: "to-yellow-700" },
  { value: "#22c55e", label: "Green", from: "from-green-500", to: "to-green-700" },
  { value: "#14b8a6", label: "Teal", from: "from-teal-500", to: "to-teal-700" },
  { value: "#06b6d4", label: "Cyan", from: "from-cyan-500", to: "to-cyan-700" },
  { value: "#6366f1", label: "Indigo", from: "from-indigo-500", to: "to-indigo-700" },
]

const BACKGROUND_OPTIONS = [
  { value: "gradient-1", label: "Sunset", class: "from-orange-400 via-pink-500 to-purple-600" },
  { value: "gradient-2", label: "Ocean", class: "from-blue-400 via-cyan-500 to-teal-600" },
  { value: "gradient-3", label: "Forest", class: "from-green-400 via-emerald-500 to-teal-600" },
  { value: "gradient-4", label: "Midnight", class: "from-slate-900 via-purple-900 to-slate-900" },
  { value: "gradient-5", label: "Fire", class: "from-red-500 via-orange-500 to-yellow-500" },
  { value: "gradient-6", label: "Aurora", class: "from-green-400 via-blue-500 to-purple-600" },
]

export default function EventCountdown() {
  const [eventName, setEventName] = useState("My Event")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("00:00")
  const [selectedColor, setSelectedColor] = useState("#3b82f6")
  const [selectedBackground, setSelectedBackground] = useState("gradient-1")
  const [countdowns, setCountdowns] = useState<CountdownEvent[]>([])
  const [activeCountdown, setActiveCountdown] = useState<CountdownEvent | null>(null)
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 })
  const [isRunning, setIsRunning] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [showEmbedCode, setShowEmbedCode] = useState(false)

  // Calculate time left
  const calculateTimeLeft = useCallback((targetDate: string): CountdownTime => {
    const target = new Date(targetDate).getTime()
    const now = new Date().getTime()
    const total = target - now

    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
    }

    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((total % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds, total }
  }, [])

  // Update countdown timer
  useEffect(() => {
    if (!activeCountdown || !isRunning) return

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(activeCountdown.date))
    }, 1000)

    return () => clearInterval(timer)
  }, [activeCountdown, isRunning, calculateTimeLeft])

  const addCountdown = useCallback(() => {
    if (!eventName || !eventDate) return

    const dateTime = `${eventDate}T${eventTime}:00`
    const newCountdown: CountdownEvent = {
      id: Date.now().toString(),
      name: eventName,
      date: dateTime,
      color: selectedColor,
    }

    setCountdowns(prev => [...prev, newCountdown])
    setActiveCountdown(newCountdown)
    setTimeLeft(calculateTimeLeft(dateTime))
  }, [eventName, eventDate, eventTime, selectedColor, calculateTimeLeft])

  const selectCountdown = useCallback((countdown: CountdownEvent) => {
    setActiveCountdown(countdown)
    setTimeLeft(calculateTimeLeft(countdown.date))
    setIsRunning(true)
  }, [calculateTimeLeft])

  const removeCountdown = useCallback((id: string) => {
    setCountdowns(prev => prev.filter(c => c.id !== id))
    if (activeCountdown?.id === id) {
      setActiveCountdown(null)
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 })
    }
  }, [activeCountdown])

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev)
  }, [])

  const resetTimer = useCallback(() => {
    if (activeCountdown) {
      setTimeLeft(calculateTimeLeft(activeCountdown.date))
      setIsRunning(true)
    }
  }, [activeCountdown, calculateTimeLeft])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const generateShareLink = useCallback(() => {
    if (!activeCountdown) return ""
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const params = new URLSearchParams({
      name: activeCountdown.name,
      date: activeCountdown.date,
      color: activeCountdown.color,
    })
    return `${baseUrl}/countdown?${params.toString()}`
  }, [activeCountdown])

  const generateEmbedCode = useMemo(() => {
    if (!activeCountdown) return ""

    const backgroundClass = BACKGROUND_OPTIONS.find(b => b.value === selectedBackground)?.class || BACKGROUND_OPTIONS[0].class

    return `<!-- Event Countdown Embed Code -->
<div class="countdown-container" style="max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 16px; background: linear-gradient(135deg, var(--tw-gradient-stops));" data-gradient="${selectedBackground}">
  <style>
    .countdown-container {
      font-family: system-ui, -apple-system, sans-serif;
      text-align: center;
      color: white;
    }
    .countdown-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .countdown-subtitle {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 32px;
    }
    .countdown-timer {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
    .countdown-item {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      padding: 16px 24px;
      border-radius: 12px;
      min-width: 80px;
    }
    .countdown-value {
      font-size: 36px;
      font-weight: bold;
      line-height: 1;
    }
    .countdown-label {
      font-size: 12px;
      text-transform: uppercase;
      opacity: 0.8;
      margin-top: 4px;
    }
  </style>
  <div class="countdown-title">${activeCountdown.name}</div>
  <div class="countdown-subtitle">Counting down to ${new Date(activeCountdown.date).toLocaleDateString()}</div>
  <div class="countdown-timer" id="countdown-${activeCountdown.id}">
    <div class="countdown-item">
      <div class="countdown-value" id="days-${activeCountdown.id}">0</div>
      <div class="countdown-label">Days</div>
    </div>
    <div class="countdown-item">
      <div class="countdown-value" id="hours-${activeCountdown.id}">0</div>
      <div class="countdown-label">Hours</div>
    </div>
    <div class="countdown-item">
      <div class="countdown-value" id="minutes-${activeCountdown.id}">0</div>
      <div class="countdown-label">Minutes</div>
    </div>
    <div class="countdown-item">
      <div class="countdown-value" id="seconds-${activeCountdown.id}">0</div>
      <div class="countdown-label">Seconds</div>
    </div>
  </div>
  <script>
    (function() {
      const targetDate = new Date("${activeCountdown.date}").getTime();
      const container = document.getElementById("countdown-${activeCountdown.id}");
      
      function updateCountdown() {
        const now = new Date().getTime();
        const total = targetDate - now;
        
        if (total <= 0) {
          container.innerHTML = '<div style="font-size: 24px; font-weight: bold;">Event Started!</div>';
          return;
        }
        
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((total % (1000 * 60)) / 1000);
        
        document.getElementById("days-${activeCountdown.id}").textContent = days;
        document.getElementById("hours-${activeCountdown.id}").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes-${activeCountdown.id}").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds-${activeCountdown.id}").textContent = seconds.toString().padStart(2, '0');
      }
      
      updateCountdown();
      setInterval(updateCountdown, 1000);
    })();
  </script>
</div>`
  }, [activeCountdown, selectedBackground])

  const currentBackground = BACKGROUND_OPTIONS.find(b => b.value === selectedBackground)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Live Countdown Display */}
      {activeCountdown && (
        <Card className={cn(
          "overflow-hidden border-0",
          currentBackground?.class
        )}>
          <CardContent className="p-8 md:p-12">
            <div className="text-center text-white space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">{activeCountdown.name}</h2>
                <p className="text-white/80 mt-2">
                  {new Date(activeCountdown.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              {timeLeft.total > 0 ? (
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 min-w-24">
                    <div className="text-4xl md:text-6xl font-bold">{timeLeft.days}</div>
                    <div className="text-sm md:text-base uppercase opacity-80 mt-1">Days</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 min-w-24">
                    <div className="text-4xl md:text-6xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                    <div className="text-sm md:text-base uppercase opacity-80 mt-1">Hours</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 min-w-24">
                    <div className="text-4xl md:text-6xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                    <div className="text-sm md:text-base uppercase opacity-80 mt-1">Minutes</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 min-w-24">
                    <div className="text-4xl md:text-6xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                    <div className="text-sm md:text-base uppercase opacity-80 mt-1">Seconds</div>
                  </div>
                </div>
              ) : (
                <div className="text-4xl md:text-6xl font-bold animate-pulse">
                  <Sparkles className="inline mr-2" />
                  Event Started!
                  <Sparkles className="inline ml-2" />
                </div>
              )}

              <div className="flex justify-center gap-2 pt-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={toggleTimer}
                  className="gap-1"
                >
                  {isRunning ? <Pause className="size-4" /> : <Play className="size-4" />}
                  {isRunning ? "Pause" : "Resume"}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={resetTimer}
                  className="gap-1"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create New Countdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5" />
            Create Countdown Timer
          </CardTitle>
          <CardDescription>
            Set up a live countdown timer for your upcoming event
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input
                id="event-name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g., New Year 2025, Product Launch"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-date">Target Date</Label>
              <Input
                id="event-date"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-time">Time</Label>
              <Input
                id="event-time"
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color-select">Theme Color</Label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger id="color-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center gap-2">
                        <div className={cn("size-4 rounded-full", opt.from.replace("from-", "bg-"))} />
                        {opt.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Background Style</Label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {BACKGROUND_OPTIONS.map((bg) => (
                <button
                  key={bg.value}
                  onClick={() => setSelectedBackground(bg.value)}
                  className={cn(
                    "h-16 rounded-lg bg-gradient-to-br transition-all",
                    bg.class,
                    selectedBackground === bg.value && "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  <span className="sr-only">{bg.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button onClick={addCountdown} className="w-full gap-2">
            <Play className="size-4" />
            Start Countdown
          </Button>

          {/* Saved Countdowns */}
          {countdowns.length > 0 && (
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-medium">Saved Countdowns</h4>
              <div className="flex flex-wrap gap-2">
                {countdowns.map((countdown) => (
                  <div
                    key={countdown.id}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors",
                      activeCountdown?.id === countdown.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                    )}
                    onClick={() => selectCountdown(countdown)}
                  >
                    <div
                      className="size-3 rounded-full"
                      style={{ backgroundColor: countdown.color }}
                    />
                    <span className="text-sm font-medium">{countdown.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeCountdown(countdown.id)
                      }}
                      className="hover:text-destructive"
                    >
                      <RotateCcw className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Share & Embed */}
      {activeCountdown && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="size-5" />
              Share & Embed
            </CardTitle>
            <CardDescription>
              Share your countdown or embed it on your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Share Link */}
            <div className="space-y-2">
              <Label>Shareable Link</Label>
              <div className="flex gap-2">
                <Input value={generateShareLink()} readOnly className="font-mono text-sm" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generateShareLink(), "link")}
                >
                  {copied === "link" ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
              </div>
            </div>

            {/* Embed Code Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowEmbedCode(!showEmbedCode)}
              className="gap-2"
            >
              <Code className="size-4" />
              {showEmbedCode ? "Hide" : "Show"} Embed Code
            </Button>

            {/* Embed Code */}
            {showEmbedCode && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>HTML Embed Code</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generateEmbedCode, "embed")}
                  >
                    {copied === "embed" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={generateEmbedCode}
                  readOnly
                  className="font-mono text-xs h-64"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Preset Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            Quick Start: Popular Events
          </CardTitle>
          <CardDescription>
            Start a countdown for upcoming popular events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "New Year 2026", date: "2026-01-01T00:00:00" },
              { name: "Valentine's Day", date: "2026-02-14T00:00:00" },
              { name: "Earth Day", date: "2026-04-22T00:00:00" },
              { name: "Halloween", date: "2026-10-31T00:00:00" },
              { name: "Christmas 2026", date: "2026-12-25T00:00:00" },
              { name: "New Year 2027", date: "2027-01-01T00:00:00" },
            ].map((preset) => {
              const timeLeft = calculateTimeLeft(preset.date)
              return (
                <button
                  key={preset.name}
                  onClick={() => {
                    setEventName(preset.name)
                    setEventDate(preset.date.split("T")[0])
                    setEventTime(preset.date.split("T")[1]?.slice(0, 5) || "00:00")
                    const newCountdown: CountdownEvent = {
                      id: Date.now().toString(),
                      name: preset.name,
                      date: preset.date,
                      color: selectedColor,
                    }
                    setCountdowns(prev => [...prev, newCountdown])
                    setActiveCountdown(newCountdown)
                    setTimeLeft(timeLeft)
                    setIsRunning(true)
                  }}
                  className="p-4 rounded-lg border text-left hover:bg-muted transition-colors"
                >
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {timeLeft.total > 0
                      ? `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`
                      : "Event passed"}
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

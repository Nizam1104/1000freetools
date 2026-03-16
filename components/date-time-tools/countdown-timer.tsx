"use client"

import * as React from "react"
import { useState, useCallback, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Plus, Trash2, Share2, Bell, BellOff } from "lucide-react"

interface Timer {
  id: string
  name: string
  targetDate: string
  targetTime: string
  isRunning: boolean
  completed: boolean
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
}

export default function CountdownTimer() {
  const [timers, setTimers] = useState<Timer[]>([])
  const [newTimerName, setNewTimerName] = useState<string>("")
  const [newTimerDate, setNewTimerDate] = useState<string>("")
  const [newTimerTime, setNewTimerTime] = useState<string>("12:00")
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false)
  const [completedTimers, setCompletedTimers] = useState<Set<string>>(new Set())
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "granted") {
      setNotificationsEnabled(true)
    }
  }, [])

  const calculateTimeLeft = useCallback((targetDate: string, targetTime: string): TimeLeft | null => {
    if (!targetDate || !targetTime) return null

    const target = new Date(`${targetDate}T${targetTime}`)
    const now = new Date()
    const diff = target.getTime() - now.getTime()

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 }
    }

    const totalSeconds = Math.floor(diff / 1000)
    const days = Math.floor(totalSeconds / (24 * 60 * 60))
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = totalSeconds % 60

    return { days, hours, minutes, seconds, totalSeconds }
  }, [])

  const [timeLeftStates, setTimeLeftStates] = useState<Record<string, TimeLeft | null>>({})

  useEffect(() => {
    const updateTimers = () => {
      const newStates: Record<string, TimeLeft | null> = {}
      const newCompleted = new Set(completedTimers)

      timers.forEach((timer) => {
        if (timer.isRunning && !timer.completed) {
          const timeLeft = calculateTimeLeft(timer.targetDate, timer.targetTime)
          newStates[timer.id] = timeLeft

          if (timeLeft && timeLeft.totalSeconds === 0) {
            newCompleted.add(timer.id)
            setTimers((prev) =>
              prev.map((t) => (t.id === timer.id ? { ...t, completed: true, isRunning: false } : t))
            )

            if (notificationsEnabled && "Notification" in window) {
              new Notification("Countdown Complete!", {
                body: `${timer.name} has reached zero!`,
                icon: "/favicon.ico",
              })
            }
          }
        }
      })

      setTimeLeftStates(newStates)
      setCompletedTimers(newCompleted)
    }

    updateTimers()
    const interval = setInterval(updateTimers, 1000)
    return () => clearInterval(interval)
  }, [timers, calculateTimeLeft, completedTimers, notificationsEnabled])

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        setNotificationsEnabled(true)
      }
    }
  }

  const addTimer = () => {
    if (!newTimerDate || !newTimerTime) return

    const newTimer: Timer = {
      id: Date.now().toString(),
      name: newTimerName || "Untitled Timer",
      targetDate: newTimerDate,
      targetTime: newTimerTime,
      isRunning: true,
      completed: false,
    }

    setTimers([...timers, newTimer])
    setNewTimerName("")
    setNewTimerDate("")
    setNewTimerTime("12:00")
  }

  const toggleTimer = (id: string) => {
    setTimers(
      timers.map((t) =>
        t.id === id ? { ...t, isRunning: !t.isRunning, completed: false } : t
      )
    )
  }

  const resetTimer = (id: string) => {
    setTimers(timers.map((t) => (t.id === id ? { ...t, completed: false, isRunning: false } : t)))
  }

  const deleteTimer = (id: string) => {
    setTimers(timers.filter((t) => t.id !== id))
  }

  const shareTimer = (timer: Timer) => {
    const url = `${window.location.origin}?timer=${timer.name}&date=${timer.targetDate}&time=${timer.targetTime}`
    navigator.clipboard.writeText(url)
  }

  const formatTimeLeft = (timeLeft: TimeLeft): string => {
    const parts = []
    if (timeLeft.days > 0) parts.push(`${timeLeft.days}d`)
    if (timeLeft.hours > 0 || timeLeft.days > 0) parts.push(`${String(timeLeft.hours).padStart(2, "0")}h`)
    parts.push(`${String(timeLeft.minutes).padStart(2, "0")}m`)
    parts.push(`${String(timeLeft.seconds).padStart(2, "0")}s`)
    return parts.join(" ")
  }

  const formatFullTimeLeft = (timeLeft: TimeLeft): React.JSX.Element => {
    return (
      <div className="flex items-baseline justify-center gap-2 flex-wrap">
        {timeLeft.days > 0 && (
          <div className="text-center">
            <p className="text-4xl md:text-6xl font-bold font-mono">{timeLeft.days}</p>
            <p className="text-xs md:text-sm text-muted-foreground">Days</p>
          </div>
        )}
        <div className="text-center">
          <p className="text-4xl md:text-6xl font-bold font-mono">{String(timeLeft.hours).padStart(2, "0")}</p>
          <p className="text-xs md:text-sm text-muted-foreground">Hours</p>
        </div>
        <span className="text-4xl md:text-6xl font-bold">:</span>
        <div className="text-center">
          <p className="text-4xl md:text-6xl font-bold font-mono">{String(timeLeft.minutes).padStart(2, "0")}</p>
          <p className="text-xs md:text-sm text-muted-foreground">Minutes</p>
        </div>
        <span className="text-4xl md:text-6xl font-bold">:</span>
        <div className="text-center">
          <p className={`text-4xl md:text-6xl font-bold font-mono ${timeLeft.totalSeconds <= 10 ? "text-red-500 animate-pulse" : ""}`}>
            {String(timeLeft.seconds).padStart(2, "0")}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">Seconds</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Countdown Timer</h2>
        <p className="text-muted-foreground">
          Create custom countdown timers with live updates and notifications.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
        <h3 className="font-semibold">Create New Timer</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="timer-name">Timer Name</Label>
            <Input
              id="timer-name"
              type="text"
              value={newTimerName}
              onChange={(e) => setNewTimerName(e.target.value)}
              placeholder="Event name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timer-date">Target Date</Label>
            <Input
              id="timer-date"
              type="date"
              value={newTimerDate}
              onChange={(e) => setNewTimerDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timer-time">Target Time</Label>
            <Input
              id="timer-time"
              type="time"
              value={newTimerTime}
              onChange={(e) => setNewTimerTime(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={addTimer} className="w-full">
              <Plus className="size-4 mr-2" />
              Create Timer
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={requestNotificationPermission}
            className={notificationsEnabled ? "text-green-600" : ""}
          >
            {notificationsEnabled ? (
              <>
                <Bell className="size-4 mr-2" />
                Notifications Enabled
              </>
            ) : (
              <>
                <BellOff className="size-4 mr-2" />
                Enable Notifications
              </>
            )}
          </Button>
        </div>
      </div>

      {timers.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No timers yet. Create your first countdown timer above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {timers.map((timer) => {
            const timeLeft = timeLeftStates[timer.id]
            const isCompleted = timer.completed || !!(timeLeft && timeLeft.totalSeconds === 0)

            return (
              <div
                key={timer.id}
                className={`rounded-lg border p-6 space-y-4 ${
                  isCompleted ? "bg-green-50 dark:bg-green-950/20 border-green-200" : "bg-background"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{timer.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Target: {new Date(`${timer.targetDate}T${timer.targetTime}`).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleTimer(timer.id)}
                      disabled={isCompleted}
                    >
                      {timer.isRunning ? <Pause className="size-4" /> : <Play className="size-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => resetTimer(timer.id)}
                    >
                      <RotateCcw className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => shareTimer(timer)}
                    >
                      <Share2 className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteTimer(timer.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>

                {isCompleted ? (
                  <div className="text-center py-4">
                    <p className="text-3xl font-bold text-green-600">Time's Up!</p>
                    <p className="text-muted-foreground">{timer.name} has completed</p>
                  </div>
                ) : timeLeft ? (
                  <div className="py-4">{formatFullTimeLeft(timeLeft)}</div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Calculating...
                  </div>
                )}

                {!isCompleted && timeLeft && (
                  <div className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                      {formatTimeLeft(timeLeft)} remaining
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

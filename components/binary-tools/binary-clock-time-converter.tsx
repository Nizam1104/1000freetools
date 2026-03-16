"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryClockTimeConverter() {
  const [mode, setMode] = useState<"clock" | "converter">("clock")
  const [customTime, setCustomTime] = useState<string>("")
  const [format, setFormat] = useState<"24" | "12">("24")
  const [copied, setCopied] = useState<string | null>(null)

  // Get current time
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const timeToBinary = useCallback((hours: number, minutes: number, seconds: number) => {
    return {
      hours: hours.toString(2).padStart(5, "0"), // 5 bits for 0-23
      minutes: minutes.toString(2).padStart(6, "0"), // 6 bits for 0-59
      seconds: seconds.toString(2).padStart(6, "0"), // 6 bits for 0-59
    }
  }, [])

  const binaryTime = useMemo(() => {
    if (mode === "clock") {
      return timeToBinary(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds())
    } else {
      if (!customTime) return null
      const [hours, minutes, seconds] = customTime.split(":").map(Number)
      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return null
      return timeToBinary(hours, minutes, seconds)
    }
  }, [mode, currentTime, customTime, timeToBinary])

  const displayTime = useMemo(() => {
    if (mode === "clock") {
      return currentTime.toLocaleTimeString(format === "12" ? "en-US" : "en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: format === "12",
      })
    } else {
      return customTime || "--:--:--"
    }
  }, [mode, currentTime, customTime, format])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const formatBinary = (binary: string): string => {
    return binary.replace(/(.{4})/g, "$1 ").trim()
  }

  // Bit visualization component
  const BitColumn = ({ binary, label }: { binary: string; label: string }) => (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <div className="flex flex-col gap-1">
        {binary.split("").map((bit, idx) => (
          <div
            key={idx}
            className={cn(
              "w-8 h-8 rounded flex items-center justify-center font-mono text-sm transition-colors",
              bit === "1" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}
          >
            {bit}
          </div>
        ))}
      </div>
      <span className="text-xs text-muted-foreground">2⁰-2⁵</span>
    </div>
  )

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selector */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "clock" ? "default" : "outline"}
            onClick={() => setMode("clock")}
            className="flex-1"
          >
            <Clock className="size-4 mr-2" />
            Live Clock
          </Button>
          <Button
            variant={mode === "converter" ? "default" : "outline"}
            onClick={() => setMode("converter")}
            className="flex-1"
          >
            Converter
          </Button>
        </div>
      </section>

      {/* Time Display */}
      <section className="space-y-4">
        <div className="rounded-lg border bg-muted/30 p-6">
          <p className="text-sm text-muted-foreground text-center mb-2">Current Time</p>
          <p className="font-mono text-4xl font-bold text-center">{displayTime}</p>
          
          {mode === "clock" && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant={format === "24" ? "default" : "outline"}
                size="xs"
                onClick={() => setFormat("24")}
                className="h-7"
              >
                24-hour
              </Button>
              <Button
                variant={format === "12" ? "default" : "outline"}
                size="xs"
                onClick={() => setFormat("12")}
                className="h-7"
              >
                12-hour
              </Button>
            </div>
          )}
        </div>

        {mode === "converter" && (
          <div className="space-y-3">
            <Label htmlFor="custom-time">Custom Time (HH:MM:SS)</Label>
            <Input
              id="custom-time"
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="font-mono text-lg"
              step={1}
            />
          </div>
        )}
      </section>

      {/* Binary Visualization */}
      {binaryTime && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Binary Representation</h3>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(
                `${binaryTime.hours} ${binaryTime.minutes} ${binaryTime.seconds}`,
                "binary"
              )}
              className="h-7"
            >
              {copied === "binary" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          {/* Binary Clock Style Display */}
          <div className="rounded-lg border bg-background p-6">
            <div className="flex justify-center gap-8">
              <BitColumn binary={binaryTime.hours} label="Hours" />
              <div className="text-2xl font-bold self-center">:</div>
              <BitColumn binary={binaryTime.minutes} label="Minutes" />
              <div className="text-2xl font-bold self-center">:</div>
              <BitColumn binary={binaryTime.seconds} label="Seconds" />
            </div>
          </div>

          {/* Linear Binary Display */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Hours (5 bits):</span>
              <span className="font-mono">{formatBinary(binaryTime.hours)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Minutes (6 bits):</span>
              <span className="font-mono">{formatBinary(binaryTime.minutes)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Seconds (6 bits):</span>
              <span className="font-mono">{formatBinary(binaryTime.seconds)}</span>
            </div>
            <div className="pt-3 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Full Binary:</span>
                <span className="font-mono text-sm">
                  {binaryTime.hours}{binaryTime.minutes}{binaryTime.seconds}
                </span>
              </div>
            </div>
          </div>

          {/* Value Breakdown */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-xs text-muted-foreground">Hours</p>
              <p className="font-mono text-lg">
                {mode === "clock" ? currentTime.getHours() : parseInt(customTime.split(":")[0] || "0")}
              </p>
              <p className="text-xs text-muted-foreground">= {binaryTime.hours}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-xs text-muted-foreground">Minutes</p>
              <p className="font-mono text-lg">
                {mode === "clock" ? currentTime.getMinutes() : parseInt(customTime.split(":")[1] || "0")}
              </p>
              <p className="text-xs text-muted-foreground">= {binaryTime.minutes}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-xs text-muted-foreground">Seconds</p>
              <p className="font-mono text-lg">
                {mode === "clock" ? currentTime.getSeconds() : parseInt(customTime.split(":")[2] || "0")}
              </p>
              <p className="text-xs text-muted-foreground">= {binaryTime.seconds}</p>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Binary Clock</h4>
            <p className="text-sm text-muted-foreground">
              A binary clock displays time using binary numbers. Each column represents hours, minutes, 
              or seconds in binary format. Lit bits (1) represent active powers of 2.
            </p>
            <p className="text-sm text-muted-foreground">
              Hours use 5 bits (0-23), while minutes and seconds use 6 bits each (0-59).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

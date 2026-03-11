"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QrCodeCalendarEvent() {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [startTime, setStartTime] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const formatDateTime = (date: string, time: string): string => {
    if (!date) return ""
    const dateTime = time ? `${date}T${time}` : date
    // Format as YYYYMMDDTHHMMSSZ for iCalendar
    const d = new Date(dateTime)
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const generateCalendarQrCode = useCallback(async () => {
    if (!title) {
      setError("Please enter an event title")
      return
    }
    if (!startDate) {
      setError("Please select a start date")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Generate iCalendar format
      const dtStart = formatDateTime(startDate, startTime)
      const dtEnd = formatDateTime(endDate || startDate, endTime)
      
      const icsContent = [
        "BEGIN:VEVENT",
        `SUMMARY:${title}`,
        description ? `DESCRIPTION:${description}` : "",
        location ? `LOCATION:${location}` : "",
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        "END:VEVENT",
      ].filter(Boolean).join("\n")

      // Using qrserver.com API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(icsContent)}&margin=10`
      
      setQrCodeUrl(qrUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }, [title, description, location, startDate, startTime, endDate, endTime])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadQrCode = useCallback(async () => {
    if (!qrCodeUrl) return
    
    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `event-qr-${title.replace(/[^a-z0-9]/gi, "-")}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }, [qrCodeUrl, title])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (title && startDate) {
        generateCalendarQrCode()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [title, description, location, startDate, startTime, endDate, endTime, generateCalendarQrCode])

  const clearAll = useCallback(() => {
    setTitle("")
    setDescription("")
    setLocation("")
    setStartDate("")
    setStartTime("")
    setEndDate("")
    setEndTime("")
    setQrCodeUrl("")
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Event Title */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="title" className="text-base font-medium">
            Event Title
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="h-7"
            disabled={!title}
          >
            <Trash2 className="size-3.5" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>

        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={cn(
            "text-sm",
            error && "border-destructive"
          )}
          placeholder="Team Meeting"
        />

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </section>

      {/* Date & Time */}
      <section className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="start-date" className="text-sm">
            Start Date *
          </Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-sm"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="start-time" className="text-sm">
            Start Time
          </Label>
          <Input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="text-sm"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="end-date" className="text-sm">
            End Date
          </Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="text-sm"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="end-time" className="text-sm">
            End Time
          </Label>
          <Input
            id="end-time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="text-sm"
          />
        </div>
      </section>

      {/* Location */}
      <section className="space-y-3">
        <Label htmlFor="location" className="text-sm">
          Location
        </Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="text-sm"
          placeholder="Conference Room A or https://zoom.us/j/..."
        />
      </section>

      {/* Description */}
      <section className="space-y-3">
        <Label htmlFor="description" className="text-sm">
          Description
        </Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-sm"
          placeholder="Agenda: Weekly team sync..."
        />
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* QR Code Result */}
      {qrCodeUrl && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Event QR Code</Label>
            <Button
              variant="default"
              size="sm"
              onClick={downloadQrCode}
            >
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="rounded-lg border bg-background p-6">
              <img
                src={qrCodeUrl}
                alt="Event QR Code"
                className="w-48 h-48"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-muted-foreground" />
                  <span className="font-medium">{title}</span>
                </div>
                {startDate && (
                  <div className="text-sm text-muted-foreground">
                    {new Date(startDate).toLocaleDateString()} {startTime && `at ${startTime}`}
                  </div>
                )}
                {location && (
                  <div className="text-sm text-muted-foreground">
                    {location}
                  </div>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                When scanned, this QR code will prompt users to add the event 
                to their calendar (Google Calendar, Apple Calendar, Outlook, etc.).
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!qrCodeUrl && (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="size-12 mx-auto mb-4 opacity-50" />
          <p>Enter event details to generate a calendar QR code</p>
        </div>
      )}

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <h3 className="text-sm font-medium">Use Cases</h3>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Event invitations and RSVPs</li>
          <li>Meeting room bookings</li>
          <li>Conference schedules</li>
          <li>Webinar registrations</li>
          <li>Appointment reminders</li>
        </ul>
      </section>
    </div>
  )
}

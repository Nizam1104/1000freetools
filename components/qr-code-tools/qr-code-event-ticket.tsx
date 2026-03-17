"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Download, Ticket } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeEventTicket() {
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [venue, setVenue] = useState("")
  const [ticketType, setTicketType] = useState("General Admission")
  const [ticketNumber, setTicketNumber] = useState("")
  const [attendeeName, setAttendeeName] = useState("")
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const generateTicketNumber = useCallback(() => {
    const num = `TKT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    setTicketNumber(num)
  }, [])

  const generateQR = useCallback(() => {
    const data = {
      type: "event_ticket",
      eventName: eventName,
      eventDate: eventDate,
      eventTime: eventTime,
      venue: venue,
      ticketType: ticketType,
      ticketNumber: ticketNumber,
      attendeeName: attendeeName
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [eventName, eventDate, eventTime, venue, ticketType, ticketNumber, attendeeName])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setEventName("")
    setEventDate("")
    setEventTime("")
    setVenue("")
    setTicketType("General Admission")
    setTicketNumber("")
    setAttendeeName("")
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
        <rect width="400" height="200" fill="white"/>
        <rect x="0" y="0" width="400" height="200" fill="none" stroke="#1f2937" stroke-width="2" stroke-dasharray="10,5"/>
        <circle cx="200" cy="0" r="10" fill="white"/>
        <circle cx="200" cy="200" r="10" fill="white"/>
        <text x="200" y="40" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">${eventName || "Event Name"}</text>
        <text x="200" y="65" text-anchor="middle" font-size="12" fill="#6b7280">${eventDate || "Date"} ${eventTime || "Time"}</text>
        <text x="200" y="85" text-anchor="middle" font-size="12" fill="#6b7280">${venue || "Venue"}</text>
        <line x1="300" y1="20" x2="300" y2="180" stroke="#1f2937" stroke-width="2" stroke-dasharray="5,5"/>
        <rect x="320" y="40" width="60" height="60" fill="#374151"/>
        <text x="350" y="75" text-anchor="middle" font-size="8" fill="white">QR</text>
        <text x="200" y="120" text-anchor="middle" font-size="10" fill="#6b7280">${ticketType}</text>
        <text x="200" y="140" text-anchor="middle" font-size="10" fill="#6b7280">${attendeeName || "Attendee"}</text>
        <text x="200" y="160" text-anchor="middle" font-size="8" fill="#9ca3af">${ticketNumber || "Ticket #"}</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${eventName || "ticket"}.svg`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, eventName, eventDate, eventTime, venue, ticketType, attendeeName, ticketNumber])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code Event Ticket</h2>
            <p className="text-sm text-muted-foreground">
              Create digital event tickets with QR codes
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Summer Music Festival 2024"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventDate">Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventTime">Time</Label>
              <Input
                id="eventTime"
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input
              id="venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Central Park, New York"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ticketType">Ticket Type</Label>
              <select
                id="ticketType"
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option>General Admission</option>
                <option>VIP</option>
                <option>Premium</option>
                <option>Student</option>
                <option>Early Bird</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="attendeeName">Attendee Name</Label>
              <Input
                id="attendeeName"
                value={attendeeName}
                onChange={(e) => setAttendeeName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="ticketNumber">Ticket Number</Label>
              <Button variant="outline" size="sm" onClick={generateTicketNumber}>
                Generate
              </Button>
            </div>
            <Input
              id="ticketNumber"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value.toUpperCase())}
              placeholder="TKT-XXXXX"
              readOnly
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!eventName}>
              <Ticket className="h-4 w-4 mr-2" />
              Generate Ticket QR
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ticket Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrData ? (
              <>
                <div className="border-2 border-dashed rounded-lg p-6">
                  <div className="text-center space-y-2">
                    <Ticket className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="font-bold text-lg">{eventName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {eventDate} at {eventTime}
                    </p>
                    <p className="text-sm">{venue}</p>
                    <div className="flex justify-center gap-4 text-sm mt-4">
                      <span className="bg-muted px-3 py-1 rounded">{ticketType}</span>
                      <span className="bg-muted px-3 py-1 rounded">{attendeeName}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-2">{ticketNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleCopy} className="flex-1" variant="outline">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? "Copied" : "Copy Data"}
                  </Button>
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Fill in event details to preview ticket</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

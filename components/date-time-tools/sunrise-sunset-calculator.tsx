"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download, Sun, Moon, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SunriseSunsetCalculator() {
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  // Calculate sunrise and sunset times using simplified algorithm
  const calculateSunTimes = useCallback((lat: number, lon: number, dateStr: string): {
    sunrise: string;
    sunset: string;
    solarNoon: string;
    dayLength: string;
    civilTwilightBegin: string;
    civilTwilightEnd: string;
  } => {
    const date = new Date(dateStr)
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    
    // Convert to radians
    const latRad = lat * Math.PI / 180
    
    // Solar declination
    const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * Math.PI / 180)
    const declinationRad = declination * Math.PI / 180
    
    // Hour angle
    const cosHourAngle = (Math.sin(-0.833 * Math.PI / 180) - Math.sin(latRad) * Math.sin(declinationRad)) / 
                         (Math.cos(latRad) * Math.cos(declinationRad))
    
    // Check for polar day/night
    if (cosHourAngle > 1) {
      return {
        sunrise: "No sunrise (polar night)",
        sunset: "No sunset (polar night)",
        solarNoon: "N/A",
        dayLength: "0 hours",
        civilTwilightBegin: "N/A",
        civilTwilightEnd: "N/A"
      }
    }
    
    if (cosHourAngle < -1) {
      return {
        sunrise: "No sunset (midnight sun)",
        sunset: "No sunrise (midnight sun)",
        solarNoon: "N/A",
        dayLength: "24 hours",
        civilTwilightBegin: "N/A",
        civilTwilightEnd: "N/A"
      }
    }
    
    const hourAngle = Math.acos(cosHourAngle) * 180 / Math.PI
    
    // Equation of time (approximation)
    const B = (360 / 365) * (dayOfYear - 81) * Math.PI / 180
    const equationOfTime = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B)
    
    // Solar noon in minutes from midnight UTC
    const solarNoonMinutes = 720 - 4 * lon - equationOfTime
    
    // Sunrise and sunset in minutes from midnight UTC
    const sunriseMinutes = solarNoonMinutes - hourAngle * 4
    const sunsetMinutes = solarNoonMinutes + hourAngle * 4
    
    // Convert to local time (approximate using longitude)
    const timezoneOffset = Math.round(lon / 15) * 60
    
    const formatTime = (minutes: number): string => {
      let mins = minutes + timezoneOffset
      while (mins < 0) mins += 1440
      while (mins >= 1440) mins -= 1440
      const hours = Math.floor(mins / 60)
      const minsRemainder = Math.floor(mins % 60)
      return `${hours.toString().padStart(2, '0')}:${minsRemainder.toString().padStart(2, '0')}`
    }
    
    const dayLengthHours = (sunsetMinutes - sunriseMinutes) / 60
    const dayLengthH = Math.floor(dayLengthHours)
    const dayLengthM = Math.floor((dayLengthHours - dayLengthH) * 60)
    
    // Civil twilight (sun 6 degrees below horizon)
    const cosCivilTwilight = (Math.sin(-6 * Math.PI / 180) - Math.sin(latRad) * Math.sin(declinationRad)) /
                            (Math.cos(latRad) * Math.cos(declinationRad))
    
    let civilTwilightBegin = "N/A"
    let civilTwilightEnd = "N/A"
    
    if (cosCivilTwilight >= -1 && cosCivilTwilight <= 1) {
      const civilHourAngle = Math.acos(cosCivilTwilight) * 180 / Math.PI
      const civilBegin = solarNoonMinutes - civilHourAngle * 4
      const civilEnd = solarNoonMinutes + civilHourAngle * 4
      civilTwilightBegin = formatTime(civilBegin)
      civilTwilightEnd = formatTime(civilEnd)
    }
    
    return {
      sunrise: formatTime(sunriseMinutes),
      sunset: formatTime(sunsetMinutes),
      solarNoon: formatTime(solarNoonMinutes),
      dayLength: `${dayLengthH}h ${dayLengthM}m`,
      civilTwilightBegin,
      civilTwilightEnd
    }
  }, [])

  const handleCalculate = useCallback(() => {
    const lat = parseFloat(latitude)
    const lon = parseFloat(longitude)
    
    if (isNaN(lat) || isNaN(lon) || !date) {
      setOutput("Please enter valid coordinates and date")
      return
    }
    
    if (lat < -90 || lat > 90) {
      setOutput("Latitude must be between -90 and 90")
      return
    }
    
    if (lon < -180 || lon > 180) {
      setOutput("Longitude must be between -180 and 180")
      return
    }
    
    const result = calculateSunTimes(lat, lon, date)
    
    setOutput(`
# Sunrise/Sunset Calculator Results

**Location:** ${lat.toFixed(4)}°, ${lon.toFixed(4)}°
**Date:** ${date}

| Event | Time |
|-------|------|
| 🌅 Sunrise | ${result.sunrise} |
| 🌇 Sunset | ${result.sunset} |
| ☀️ Solar Noon | ${result.solarNoon} |
| 📏 Day Length | ${result.dayLength} |
| 🌄 Civil Twilight Begin | ${result.civilTwilightBegin} |
| 🌅 Civil Twilight End | ${result.civilTwilightEnd} |
`.trim())
  }, [latitude, longitude, date, calculateSunTimes])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setLatitude("")
    setLongitude("")
    setDate(new Date().toISOString().split('T')[0])
    setOutput("")
  }, [])

  const handleUseCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6))
          setLongitude(position.coords.longitude.toFixed(6))
        },
        () => {
          // Default to a major city if geolocation fails
          setLatitude("40.7128")
          setLongitude("-74.0060")
        }
      )
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Sunrise/Sunset Calculator</h2>
            <p className="text-sm text-muted-foreground">
              Calculate sunrise, sunset, and twilight times for any location
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <div className="flex gap-2">
            <Input
              id="latitude"
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="40.7128"
              step="any"
              min="-90"
              max="90"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="-74.0060"
            step="any"
            min="-180"
            max="180"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleCalculate} className="flex-1">
          <Sun className="h-4 w-4 mr-2" />
          Calculate
        </Button>
        <Button variant="outline" onClick={handleUseCurrentLocation}>
          Use My Location
        </Button>
        <Button variant="outline" onClick={handleClear} title="Clear">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Label htmlFor="output">Results</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-muted"
          />
          <Button onClick={handleCopy} disabled={!output} variant="outline">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy Results"}
          </Button>
        </div>
      )}

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-medium">About This Calculator</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Calculates times based on your coordinates and date</li>
          <li>Times are shown in local timezone (approximated from longitude)</li>
          <li>Civil twilight is when the sun is 6° below the horizon</li>
          <li>May show polar day/night for extreme latitudes</li>
        </ul>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Copy, Check, Download, Share2, Gift, Image, Type, Palette, Lock, Unlock } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdventDoor {
  day: number
  type: "image" | "message" | "both"
  image?: string
  message: string
  color: string
  unlocked: boolean
}

const DOOR_COLORS = [
  { value: "#dc2626", label: "Red", class: "bg-red-600" },
  { value: "#16a34a", label: "Green", class: "bg-green-600" },
  { value: "#ca8a04", label: "Gold", class: "bg-yellow-600" },
  { value: "#2563eb", label: "Blue", class: "bg-blue-600" },
  { value: "#9333ea", label: "Purple", class: "bg-purple-600" },
  { value: "#ea580c", label: "Orange", class: "bg-orange-600" },
  { value: "#be185d", label: "Pink", class: "bg-pink-600" },
  { value: "#0891b2", label: "Cyan", class: "bg-cyan-600" },
]

const DEFAULT_MESSAGES = [
  "Day 1: The countdown begins! 🎄",
  "Day 2: Warm up with some hot cocoa! ☕",
  "Day 3: Watch a holiday movie tonight! 🎬",
  "Day 4: Bake some cookies! 🍪",
  "Day 5: Write a letter to someone special! 💌",
  "Day 6: Decorate your home! 🏠",
  "Day 7: Sing holiday songs! 🎵",
  "Day 8: Make a handmade gift! 🎁",
  "Day 9: Read a holiday story! 📚",
  "Day 10: Do a random act of kindness! 💝",
  "Day 11: Look at holiday lights! ✨",
  "Day 12: Halfway there! Keep going! 🌟",
  "Day 13: Make a snowman (or snow angel)! ⛄",
  "Day 14: Try a new holiday recipe! 🍽️",
  "Day 15: Call a friend or family member! 📞",
  "Day 16: Make holiday cards! 🎴",
  "Day 17: Wrap presents! 🎀",
  "Day 18: Drink eggnog or cider! 🥛",
  "Day 19: Build a gingerbread house! 🏠",
  "Day 20: Watch the stars tonight! ⭐",
  "Day 21: Winter solstice - longest night! 🌙",
  "Day 22: Only 3 days until Christmas! 🎅",
  "Day 23: Christmas Eve Eve! Prepare! 🎄",
  "Day 24: Merry Christmas Eve! 🎁",
]

export default function AdventCalendarCreator() {
  const [calendarTitle, setCalendarTitle] = useState("My Advent Calendar")
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear().toString())
  const [doors, setDoors] = useState<AdventDoor[]>(
    Array.from({ length: 24 }, (_, i) => ({
      day: i + 1,
      type: "message",
      message: DEFAULT_MESSAGES[i],
      color: DOOR_COLORS[i % DOOR_COLORS.length].value,
      unlocked: false,
    }))
  )
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null)
  const [editMode, setEditMode] = useState(true)
  const [startDate, setStartDate] = useState("12-01")
  const [allowFuture, setAllowFuture] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [showShareCode, setShowShareCode] = useState(false)

  const updateDoor = useCallback((day: number, updates: Partial<AdventDoor>) => {
    setDoors(prev => prev.map(d => d.day === day ? { ...d, ...updates } : d))
  }, [])

  const openDoor = useCallback((day: number) => {
    if (!editMode) {
      const today = new Date()
      const startMonth = parseInt(startDate.split("-")[0])
      const startDay = parseInt(startDate.split("-")[1])
      const startDateObj = new Date(parseInt(calendarYear), startMonth - 1, startDay)
      
      const daysSinceStart = Math.floor((today.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24))
      
      if (allowFuture || daysSinceStart >= day - 1) {
        setDoors(prev => prev.map(d => d.day === day ? { ...d, unlocked: true } : d))
        setSelectedDoor(day)
      }
    } else {
      setSelectedDoor(day)
    }
  }, [editMode, allowFuture, startDate, calendarYear])

  const resetCalendar = useCallback(() => {
    setDoors(prev => prev.map(d => ({ ...d, unlocked: false })))
    setSelectedDoor(null)
  }, [])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const generateShareCode = useMemo(() => {
    const calendarData = {
      title: calendarTitle,
      year: calendarYear,
      startDate: startDate,
      doors: doors.map(d => ({
        day: d.day,
        type: d.type,
        message: d.message,
        color: d.color,
      })),
    }
    return btoa(JSON.stringify(calendarData))
  }, [calendarTitle, calendarYear, startDate, doors])

  const generateEmbedHTML = useMemo(() => {
    const doorsHTML = doors.map(door => `
      <div class="advent-door" data-day="${door.day}" style="--door-color: ${door.color}">
        <div class="door-front">${door.day}</div>
        <div class="door-content">${door.message}</div>
      </div>
    `).join("")

    return `<!DOCTYPE html>
<html>
<head>
  <title>${calendarTitle}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: system-ui, sans-serif; 
      background: linear-gradient(135deg, #1a472a, #2d5a3d);
      min-height: 100vh;
      padding: 20px;
    }
    .calendar-container {
      max-width: 900px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      color: #fff;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .subtitle {
      text-align: center;
      color: rgba(255,255,255,0.8);
      margin-bottom: 30px;
    }
    .advent-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 15px;
    }
    .advent-door {
      aspect-ratio: 1;
      position: relative;
      perspective: 1000px;
      cursor: pointer;
    }
    .door-front, .door-content {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      padding: 10px;
      text-align: center;
      backface-visibility: hidden;
      transition: transform 0.6s;
    }
    .door-front {
      background: var(--door-color);
      color: white;
      font-size: 32px;
      font-weight: bold;
      border: 3px solid rgba(255,255,255,0.3);
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }
    .door-content {
      background: white;
      color: #333;
      font-size: 14px;
      transform: rotateY(180deg);
      border: 3px solid var(--door-color);
      overflow: auto;
    }
    .advent-door.open .door-front {
      transform: rotateY(-180deg);
    }
    .advent-door.open .door-content {
      transform: rotateY(0deg);
    }
    .advent-door.locked {
      cursor: not-allowed;
      opacity: 0.7;
    }
    .advent-door.locked .door-front {
      background: #666;
    }
    @media (max-width: 600px) {
      .advent-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
      }
      .door-front {
        font-size: 20px;
      }
      .door-content {
        font-size: 11px;
      }
    }
  </style>
</head>
<body>
  <div class="calendar-container">
    <h1>🎄 ${calendarTitle} 🎄</h1>
    <p class="subtitle">Open a door each day until Christmas!</p>
    <div class="advent-grid">
      ${doorsHTML}
    </div>
  </div>
  <script>
    document.querySelectorAll('.advent-door').forEach(door => {
      door.addEventListener('click', () => {
        if (!door.classList.contains('locked')) {
          door.classList.toggle('open');
        }
      });
    });
  </script>
</body>
</html>`
  }, [calendarTitle, doors])

  const selectedDoorData = useMemo(() => {
    if (selectedDoor === null) return null
    return doors.find(d => d.day === selectedDoor)
  }, [selectedDoor, doors])

  const currentDay = useMemo(() => {
    const today = new Date()
    const startMonth = parseInt(startDate.split("-")[0])
    const startDay = parseInt(startDate.split("-")[1])
    const startDateObj = new Date(parseInt(calendarYear), startMonth - 1, startDay)
    return Math.floor((today.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1
  }, [startDate, calendarYear])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="size-5" />
            Advent Calendar Creator
          </CardTitle>
          <CardDescription>
            Design a custom digital advent calendar with 24 doors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calendar-title">Calendar Title</Label>
              <Input
                id="calendar-title"
                value={calendarTitle}
                onChange={(e) => setCalendarTitle(e.target.value)}
                placeholder="My Advent Calendar"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendar-year">Year</Label>
              <Input
                id="calendar-year"
                type="number"
                value={calendarYear}
                onChange={(e) => setCalendarYear(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={`${calendarYear}-${startDate}`}
                onChange={(e) => setStartDate(e.target.value.slice(5))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={editMode}
                  onCheckedChange={setEditMode}
                  id="edit-mode"
                />
                <Label htmlFor="edit-mode" className="cursor-pointer">Edit Mode</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={allowFuture}
                  onCheckedChange={setAllowFuture}
                  id="allow-future"
                  disabled={editMode}
                />
                <Label htmlFor="allow-future" className="cursor-pointer">Allow Future Doors</Label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetCalendar}>
                Reset All Doors
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowShareCode(!showShareCode)}>
                <Share2 className="size-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Door Editor */}
      {selectedDoorData && editMode && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Door {selectedDoorData.day}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Content Type</Label>
                <div className="flex gap-2">
                  <Button
                    variant={selectedDoorData.type === "message" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateDoor(selectedDoorData.day, { type: "message" })}
                    className="gap-1"
                  >
                    <Type className="size-4" />
                    Message
                  </Button>
                  <Button
                    variant={selectedDoorData.type === "image" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateDoor(selectedDoorData.day, { type: "image" })}
                    className="gap-1"
                  >
                    <Image className="size-4" />
                    Image
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Door Color</Label>
                <div className="flex flex-wrap gap-1">
                  {DOOR_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateDoor(selectedDoorData.day, { color: color.value })}
                      className={cn(
                        "size-8 rounded-lg border-2 transition-transform hover:scale-110",
                        color.class,
                        selectedDoorData.color === color.value && "border-white ring-2 ring-primary"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="door-message">Message</Label>
              <Textarea
                id="door-message"
                value={selectedDoorData.message}
                onChange={(e) => updateDoor(selectedDoorData.day, { message: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar Preview</CardTitle>
          <CardDescription>
            {editMode ? "Click on a door to edit it" : `Day ${currentDay} of 24 - Click to open!`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {doors.map((door) => {
              const isToday = door.day === currentDay
              const isPast = door.day < currentDay
              const isFuture = door.day > currentDay

              return (
                <button
                  key={door.day}
                  onClick={() => openDoor(door.day)}
                  className={cn(
                    "aspect-square rounded-xl relative perspective-1000 transition-all duration-300",
                    editMode && "hover:scale-105 cursor-pointer",
                    !editMode && door.unlocked && "scale-95"
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Front of door */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-xl flex items-center justify-center text-white font-bold text-xl border-4 border-white/30 shadow-lg transition-transform duration-500",
                      editMode || !isFuture ? "" : "bg-gray-600",
                      editMode || isFuture ? "" : door.unlocked ? "opacity-0 rotate-y-180" : ""
                    )}
                    style={{
                      backgroundColor: editMode || isFuture ? door.color : undefined,
                      backfaceVisibility: "hidden",
                      transform: (editMode || isFuture) || !door.unlocked ? "rotateY(0deg)" : "rotateY(-180deg)",
                    }}
                  >
                    <div className="text-center">
                      <div className="text-3xl">{door.day}</div>
                      {!editMode && isFuture && (
                        <Lock className="size-4 mx-auto mt-1 opacity-50" />
                      )}
                      {isToday && !editMode && (
                        <div className="text-xs mt-1 animate-pulse">Today!</div>
                      )}
                    </div>
                  </div>

                  {/* Back of door (content) */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-xl flex items-center justify-center bg-white text-gray-800 p-2 text-sm border-4 shadow-lg transition-transform duration-500 overflow-hidden",
                      door.unlocked ? "rotate-y-0" : "rotate-y-180"
                    )}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: door.unlocked ? "rotateY(0deg)" : "rotateY(180deg)",
                      borderColor: door.color,
                    }}
                  >
                    <div className="text-center">
                      {door.type === "image" && door.image ? (
                        <img src={door.image} alt="" className="w-full h-full object-contain" />
                      ) : (
                        <p className="text-xs">{door.message}</p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Share Options */}
      {showShareCode && (
        <Card>
          <CardHeader>
            <CardTitle>Share Your Calendar</CardTitle>
            <CardDescription>
              Share your advent calendar with friends and family
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Embed Code (HTML)</Label>
              <div className="flex gap-2">
                <Textarea
                  value={generateEmbedHTML}
                  readOnly
                  className="font-mono text-xs h-48 flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generateEmbedHTML, "embed")}
                  className="h-fit"
                >
                  {copied === "embed" ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Share Code (for other users)</Label>
              <div className="flex gap-2">
                <Input value={generateShareCode} readOnly className="font-mono text-xs flex-1" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generateShareCode, "share")}
                >
                  {copied === "share" ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
              </div>
            </div>

            <Button onClick={() => {
              const blob = new Blob([generateEmbedHTML], { type: "text/html" })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = `${calendarTitle.toLowerCase().replace(/\s+/g, "-")}.html`
              a.click()
              URL.revokeObjectURL(url)
            }} className="w-full gap-2">
              <Download className="size-4" />
              Download as HTML File
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p><strong>Edit Mode:</strong> Click on any door to customize its message and color.</p>
          <p><strong>Preview Mode:</strong> Turn off Edit Mode to preview the calendar as users will see it.</p>
          <p><strong>Daily Opening:</strong> Starting from your selected start date, one door unlocks each day.</p>
          <p><strong>Share:</strong> Download the HTML file or copy the embed code to share your calendar.</p>
        </CardContent>
      </Card>
    </div>
  )
}

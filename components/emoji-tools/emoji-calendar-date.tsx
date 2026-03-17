"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar, Copy, Check, Sparkles } from "lucide-react"

interface HolidayEmoji {
  holiday: string
  date: string
  emojis: string[]
  description: string
}

interface MonthEmojis {
  month: string
  emojis: string[]
  description: string
}

const HOLIDAY_EMOJIS: HolidayEmoji[] = [
  { holiday: "New Year's Day", date: "January 1", emojis: ["🎉", "🥳", "🍾", "✨", "🎊"], description: "Celebrate the new year" },
  { holiday: "Valentine's Day", date: "February 14", emojis: ["❤️", "💕", "🌹", "💝", "😍", "💌"], description: "Love and romance" },
  { holiday: "St. Patrick's Day", date: "March 17", emojis: ["🍀", "☘️", "🇮🇪", "🌈", "🍺"], description: "Irish celebration" },
  { holiday: "Easter", date: "April (varies)", emojis: ["🐰", "🥚", "🐣", "🌷", "🍫"], description: "Spring and Easter bunny" },
  { holiday: "Mother's Day", date: "May (varies)", emojis: ["👩", "💐", "❤️", "🌸", "🎁"], description: "Honor mothers" },
  { holiday: "Father's Day", date: "June (varies)", emojis: ["👨", "👔", "🎁", "❤️", "🔧"], description: "Honor fathers" },
  { holiday: "Independence Day", date: "July 4", emojis: ["🇺🇸", "🎆", "🎇", "🗽", "🦅"], description: "American independence" },
  { holiday: "Halloween", date: "October 31", emojis: ["🎃", "👻", "🦇", "🕷️", "💀", "🍬"], description: "Spooky Halloween fun" },
  { holiday: "Thanksgiving", date: "November (varies)", emojis: ["🦃", "🍂", "🍁", "🥧", "🌽"], description: "Gratitude and harvest" },
  { holiday: "Christmas", date: "December 25", emojis: ["🎄", "🎅", "🎁", "⭐", "❄️", "🦌"], description: "Christmas celebration" },
  { holiday: "Birthday", date: "Any day", emojis: ["🎂", "🎉", "🎈", "🎁", "🥳"], description: "Birthday celebration" },
  { holiday: "Wedding", date: "Any day", emojis: ["💒", "💍", "👰", "🤵", "💕", "🥂"], description: "Wedding celebration" },
]

const MONTH_EMOJIS: MonthEmojis[] = [
  { month: "January", emojis: ["❄️", "🎆", "🧣", "☃️", "🎿"], description: "Winter and new year" },
  { month: "February", emojis: ["❤️", "🌹", "💝", "🍫", "💌"], description: "Love and Valentine's" },
  { month: "March", emojis: ["🍀", "☘️", "🌸", "🌷", "🌦️"], description: "Spring begins" },
  { month: "April", emojis: ["🌧️", "🌷", "🐝", "🌱", "🪁"], description: "Spring showers" },
  { month: "May", emojis: ["🌺", "🦋", "🌻", "🌞", "💐"], description: "Flowers bloom" },
  { month: "June", emojis: ["☀️", "🏖️", "🌊", "🍦", "🌻"], description: "Summer begins" },
  { month: "July", emojis: ["🇺🇸", "🎆", "🏖️", "🍉", "☀️"], description: "Summer and fireworks" },
  { month: "August", emojis: ["☀️", "🏖️", "🌻", "🍉", "🌊"], description: "Peak summer" },
  { month: "September", emojis: ["🍂", "📚", "🍁", "🎒", "🌾"], description: "Fall begins" },
  { month: "October", emojis: ["🎃", "🍂", "👻", "🍁", "🦇"], description: "Fall and Halloween" },
  { month: "November", emojis: ["🍁", "🦃", "🍂", "🌽", "🥧"], description: "Thanksgiving" },
  { month: "December", emojis: ["🎄", "❄️", "🎅", "🎁", "☃️"], description: "Winter and Christmas" },
]

export default function EmojiCalendarDate() {
  const [copied, setCopied] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState("")

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const filteredMonths = selectedMonth ? MONTH_EMOJIS.filter(m => m.month === selectedMonth) : MONTH_EMOJIS

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="holidays" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="holidays" className="text-sm px-4 py-2"><Calendar className="size-4 mr-2" />Holidays</TabsTrigger>
          <TabsTrigger value="months" className="text-sm px-4 py-2">Months</TabsTrigger>
          <TabsTrigger value="dates" className="text-sm px-4 py-2">Special Dates</TabsTrigger>
        </TabsList>

        <TabsContent value="holidays" className="space-y-6 mt-4">
          <section className="space-y-3">
            <Label className="text-base font-medium">Holiday Emojis</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {HOLIDAY_EMOJIS.map((holiday, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{holiday.holiday}</CardTitle>
                      <span className="text-xs text-muted-foreground">{holiday.date}</span>
                    </div>
                    <CardDescription>{holiday.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {holiday.emojis.map((emoji, i) => (
                        <button key={i} onClick={() => copyToClipboard(emoji, `holiday-${idx}-${i}`)} className="text-3xl hover:scale-125 transition-transform">
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="months" className="space-y-6 mt-4">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Monthly Emoji Suggestions</Label>
              <Button variant="outline" size="sm" onClick={() => setSelectedMonth(selectedMonth ? "" : "")}>
                {selectedMonth ? "Show All" : "Filter"}
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMonths.map((month, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{month.month}</CardTitle>
                    <CardDescription>{month.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {month.emojis.map((emoji, i) => (
                        <button key={i} onClick={() => copyToClipboard(emoji, `month-${idx}-${i}`)} className="text-2xl hover:scale-125 transition-transform">
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="dates" className="space-y-6 mt-4">
          <section className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Special Date Emojis</CardTitle>
                <CardDescription>Find emojis for any special occasion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">🎂 Birthday</h4>
                    <div className="flex flex-wrap gap-2">
                      {["🎂", "🎉", "🎈", "🎁", "🥳", "🍰", "🕯️"].map((emoji, i) => (
                        <button key={i} onClick={() => copyToClipboard(emoji, `bday-${i}`)} className="text-2xl hover:scale-125 transition-transform">{emoji}</button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">💒 Wedding</h4>
                    <div className="flex flex-wrap gap-2">
                      {["💒", "💍", "👰", "🤵", "💕", "🥂", "💐", "🎊"].map((emoji, i) => (
                        <button key={i} onClick={() => copyToClipboard(emoji, `wedding-${i}`)} className="text-2xl hover:scale-125 transition-transform">{emoji}</button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">🎓 Graduation</h4>
                    <div className="flex flex-wrap gap-2">
                      {["🎓", "📜", "🎉", "👨‍🎓", "👩‍🎓", "✨", "📚"].map((emoji, i) => (
                        <button key={i} onClick={() => copyToClipboard(emoji, `grad-${i}`)} className="text-2xl hover:scale-125 transition-transform">{emoji}</button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">🏠 Housewarming</h4>
                    <div className="flex flex-wrap gap-2">
                      {["🏠", "🔑", "📦", "🎉", "🥂", "🍾", "✨"].map((emoji, i) => (
                        <button key={i} onClick={() => copyToClipboard(emoji, `house-${i}`)} className="text-2xl hover:scale-125 transition-transform">{emoji}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}

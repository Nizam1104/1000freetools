"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Calendar, Sparkles, Copy, Check } from "lucide-react"

interface TrendingEmoji {
  emoji: string
  name: string
  trend: "up" | "down" | "stable"
  change: number
  category: string
}

interface SeasonalPrediction {
  event: string
  date: string
  emojis: string[]
  description: string
}

const TRENDING_EMOJIS: TrendingEmoji[] = [
  { emoji: "🔥", name: "Fire", trend: "up", change: 25, category: "Objects" },
  { emoji: "😂", name: "Tears of Joy", trend: "stable", change: 0, category: "Smileys" },
  { emoji: "❤️", name: "Red Heart", trend: "up", change: 15, category: "Hearts" },
  { emoji: "🥺", name: "Pleading Face", trend: "up", change: 30, category: "Smileys" },
  { emoji: "✨", name: "Sparkles", trend: "up", change: 20, category: "Symbols" },
  { emoji: "👀", name: "Eyes", trend: "down", change: -10, category: "Body" },
  { emoji: "💀", name: "Skull", trend: "up", change: 45, category: "Objects" },
  { emoji: "🙏", name: "Folded Hands", trend: "stable", change: 5, category: "Hands" },
  { emoji: "🎉", name: "Party Popper", trend: "up", change: 18, category: "Activities" },
  { emoji: "😍", name: "Heart Eyes", trend: "down", change: -5, category: "Smileys" },
  { emoji: "🤣", name: "Rolling Laughing", trend: "stable", change: 2, category: "Smileys" },
  { emoji: "💯", name: "Hundred Points", trend: "up", change: 12, category: "Symbols" },
]

const SEASONAL_PREDICTIONS: SeasonalPrediction[] = [
  { event: "Valentine's Day", date: "February 14", emojis: ["❤️", "💕", "🌹", "💝", "😍"], description: "Love and romance emojis will trend" },
  { event: "Halloween", date: "October 31", emojis: ["🎃", "👻", "🦇", "🕷️", "💀"], description: "Spooky and Halloween themed emojis" },
  { event: "Christmas", date: "December 25", emojis: ["🎄", "🎅", "🎁", "⭐", "❄️"], description: "Holiday and winter emojis" },
  { event: "New Year", date: "January 1", emojis: ["🎉", "🥳", "🍾", "✨", "🎊"], description: "Celebration and party emojis" },
  { event: "Summer", date: "June - August", emojis: ["☀️", "🏖️", "🌊", "🍦", "🕶️"], description: "Summer and vacation themed" },
  { event: "Back to School", date: "September", emojis: ["📚", "✏️", "🎒", "📝", "🏫"], description: "Education and learning emojis" },
]

export default function EmojiPredictionTrends() {
  const [copied, setCopied] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const filteredTrending = selectedCategory === "all" 
    ? TRENDING_EMOJIS 
    : TRENDING_EMOJIS.filter(e => e.category === selectedCategory)

  const categories = ["all", ...Array.from(new Set(TRENDING_EMOJIS.map(e => e.category)))]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="trending" className="text-sm px-4 py-2">
            <TrendingUp className="size-4 mr-2" />
            Trending Now
          </TabsTrigger>
          <TabsTrigger value="predictions" className="text-sm px-4 py-2">
            <Calendar className="size-4 mr-2" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-sm px-4 py-2">
            <Sparkles className="size-4 mr-2" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-6 mt-4">
          {/* Category Filter */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Filter by Category</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(cat)}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>
          </section>

          {/* Trending Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTrending.map((item, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{item.emoji}</span>
                    <div className={cn("flex items-center gap-1 text-sm", item.trend === "up" ? "text-green-500" : item.trend === "down" ? "text-red-500" : "text-gray-500")}>
                      {item.trend === "up" ? <TrendingUp className="size-4" /> : item.trend === "down" ? <TrendingDown className="size-4" /> : <span className="text-xs">-</span>}
                      <span>{Math.abs(item.change)}%</span>
                    </div>
                  </div>
                  <CardTitle className="text-base mt-2">{item.name}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => copyToClipboard(item.emoji, item.emoji)}>
                    {copied === item.emoji ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                    Copy
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6 mt-4">
          <section className="space-y-3">
            <Label className="text-base font-medium">Upcoming Events & Predictions</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SEASONAL_PREDICTIONS.map((prediction, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{prediction.event}</CardTitle>
                      <span className="text-xs text-muted-foreground">{prediction.date}</span>
                    </div>
                    <CardDescription>{prediction.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {prediction.emojis.map((emoji, i) => (
                        <button key={i} onClick={() => copyToClipboard(emoji, `pred-${idx}-${i}`)} className="text-3xl hover:scale-125 transition-transform">
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

        <TabsContent value="insights" className="space-y-6 mt-4">
          <section className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Emoji Usage Insights</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-3xl font-bold">😂</p>
                    <p className="text-sm text-muted-foreground mt-1">Most Used Emoji</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-3xl font-bold">❤️</p>
                    <p className="text-sm text-muted-foreground mt-1">Most Loved</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-3xl font-bold">🔥</p>
                    <p className="text-sm text-muted-foreground mt-1">Fastest Growing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Trending Categories</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { category: "Smileys & Emotion", percentage: 45 },
                    { category: "Hearts & Love", percentage: 25 },
                    { category: "Hands & Gestures", percentage: 15 },
                    { category: "Symbols", percentage: 10 },
                    { category: "Other", percentage: 5 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.category}</span>
                        <span className="text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

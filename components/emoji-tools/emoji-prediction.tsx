"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Calendar, Star, Clock, Sparkles, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrendingEmoji {
  emoji: string
  name: string
  rank: number
  change: number
  usage: string
  platforms: string[]
  category: string
}

interface EmojiOfTheDay {
  emoji: string
  name: string
  meaning: string
  usage: string
  funFact: string
}

const TRENDING_EMOJIS: TrendingEmoji[] = [
  { emoji: "🔥", name: "Fire", rank: 1, change: 2, usage: "2.5M posts/day", platforms: ["Twitter", "Instagram", "TikTok"], category: "Objects" },
  { emoji: "😂", name: "Tears of Joy", rank: 2, change: -1, usage: "2.3M posts/day", platforms: ["Twitter", "Facebook", "WhatsApp"], category: "Smileys" },
  { emoji: "❤️", name: "Red Heart", rank: 3, change: 0, usage: "2.1M posts/day", platforms: ["Instagram", "Twitter", "TikTok"], category: "Hearts" },
  { emoji: "✨", name: "Sparkles", rank: 4, change: 5, usage: "1.8M posts/day", platforms: ["TikTok", "Instagram", "Twitter"], category: "Symbols" },
  { emoji: "🥺", name: "Pleading Face", rank: 5, change: 3, usage: "1.5M posts/day", platforms: ["Twitter", "TikTok", "Discord"], category: "Smileys" },
  { emoji: "💀", name: "Skull", rank: 6, change: 1, usage: "1.4M posts/day", platforms: ["TikTok", "Twitter", "Instagram"], category: "Objects" },
  { emoji: "👀", name: "Eyes", rank: 7, change: -2, usage: "1.2M posts/day", platforms: ["Twitter", "Instagram", "TikTok"], category: "Body" },
  { emoji: "🙏", name: "Folded Hands", rank: 8, change: 0, usage: "1.1M posts/day", platforms: ["Twitter", "WhatsApp", "Facebook"], category: "Hands" },
  { emoji: "😭", name: "Loudly Crying", rank: 9, change: -3, usage: "1.0M posts/day", platforms: ["Twitter", "TikTok", "Instagram"], category: "Smileys" },
  { emoji: "💯", name: "Hundred Points", rank: 10, change: 1, usage: "950K posts/day", platforms: ["Twitter", "Instagram", "Snapchat"], category: "Symbols" },
  { emoji: "🤣", name: "ROFL", rank: 11, change: -1, usage: "900K posts/day", platforms: ["Facebook", "Twitter", "WhatsApp"], category: "Smileys" },
  { emoji: "🎉", name: "Party Popper", rank: 12, change: 4, usage: "850K posts/day", platforms: ["Instagram", "Twitter", "Facebook"], category: "Activities" },
]

const EMOJI_OF_THE_DAY: EmojiOfTheDay = {
  emoji: "🦋",
  name: "Butterfly",
  meaning: "Represents transformation, beauty, and freedom. Often used to symbolize personal growth or positive change.",
  usage: "Use when celebrating personal milestones, expressing beauty, or discussing transformation and change.",
  funFact: "The butterfly emoji was added to Unicode 10.0 in 2017 and quickly became popular for mental health awareness posts.",
}

const HISTORICAL_DATA = [
  { month: "Jan", top: "❤️", usage: 85 },
  { month: "Feb", top: "💕", usage: 92 },
  { month: "Mar", top: "🌸", usage: 78 },
  { month: "Apr", top: "🐰", usage: 65 },
  { month: "May", top: "🌹", usage: 72 },
  { month: "Jun", top: "🏖️", usage: 68 },
  { month: "Jul", top: "🎆", usage: 75 },
  { month: "Aug", top: "☀️", usage: 82 },
  { month: "Sep", top: "🍂", usage: 70 },
  { month: "Oct", top: "🎃", usage: 88 },
  { month: "Nov", top: "🦃", usage: 62 },
  { month: "Dec", top: "🎄", usage: 95 },
]

const SEASONAL_PREDICTIONS = [
  { season: "Winter", emojis: ["❄️", "☃️", "🎄", "🎁", "🥶"], prediction: "Holiday and cold weather emojis will trend" },
  { season: "Spring", emojis: ["🌸", "🌷", "🐰", "🌧️", "🌈"], prediction: "Nature and renewal emojis popular" },
  { season: "Summer", emojis: ["☀️", "🏖️", "🍦", "🌊", "🕶️"], prediction: "Beach and vacation emojis dominate" },
  { season: "Fall", emojis: ["🍂", "🎃", "🍁", "🦇", "☕"], prediction: "Cozy and Halloween emojis trend" },
]

const EVENT_PREDICTIONS = [
  { event: "Valentine's Day", date: "Feb 14", emojis: ["❤️", "💕", "🌹", "💝", "😍"] },
  { event: "Halloween", date: "Oct 31", emojis: ["🎃", "👻", "🦇", "🍬", "💀"] },
  { event: "Christmas", date: "Dec 25", emojis: ["🎄", "🎁", "🎅", "⭐", "🦌"] },
  { event: "New Year", date: "Jan 1", emojis: ["🎉", "🎊", "🥂", "✨", "🎆"] },
  { event: "Birthday", date: "Any", emojis: ["🎂", "🎉", "🎁", "🥳", "🎈"] },
]

export default function EmojiPrediction() {
  const [selectedPlatform, setSelectedPlatform] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [copied, setCopied] = useState<string | null>(null)

  const platforms = ["All", "Twitter", "Instagram", "TikTok", "Facebook", "WhatsApp"]
  const categories = ["All", "Smileys", "Hearts", "Hands", "Objects", "Symbols", "Activities", "Body"]

  const filteredTrending = useMemo(() => {
    return TRENDING_EMOJIS.filter((emoji) => {
      const matchesPlatform = selectedPlatform === "All" || emoji.platforms.includes(selectedPlatform)
      const matchesCategory = selectedCategory === "All" || emoji.category === selectedCategory
      return matchesPlatform && matchesCategory
    })
  }, [selectedPlatform, selectedCategory])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="trending" className="text-sm px-4 py-2">
            <TrendingUp className="size-4 mr-2" />
            Trending Now
          </TabsTrigger>
          <TabsTrigger value="daily" className="text-sm px-4 py-2">
            <Star className="size-4 mr-2" />
            Emoji of the Day
          </TabsTrigger>
          <TabsTrigger value="history" className="text-sm px-4 py-2">
            <Calendar className="size-4 mr-2" />
            Historical Trends
          </TabsTrigger>
          <TabsTrigger value="predictions" className="text-sm px-4 py-2">
            <Sparkles className="size-4 mr-2" />
            Predictions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-6 mt-4">
          {/* Filters */}
          <section className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Platform</Label>
                <div className="flex flex-wrap gap-1">
                  {platforms.map((platform) => (
                    <Button
                      key={platform}
                      variant={selectedPlatform === platform ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPlatform(platform)}
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Category</Label>
                <div className="flex flex-wrap gap-1">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Trending List */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Top Trending Emojis</Label>
              <span className="text-sm text-muted-foreground">Updated hourly</span>
            </div>
            <div className="space-y-2">
              {filteredTrending.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-muted/30"
                >
                  <div className="flex items-center gap-3 w-24">
                    <span className={cn(
                      "text-lg font-bold",
                      item.rank <= 3 ? "text-yellow-500" : "text-muted-foreground"
                    )}>
                      #{item.rank}
                    </span>
                    {item.change > 0 ? (
                      <TrendingUp className="size-4 text-green-500" />
                    ) : item.change < 0 ? (
                      <TrendingDown className="size-4 text-red-500" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  <span className="text-4xl w-16 text-center">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.usage}</p>
                  </div>
                  <div className="hidden sm:flex gap-1">
                    {item.platforms.slice(0, 3).map((platform) => (
                      <span key={platform} className="text-xs px-2 py-1 bg-background rounded">
                        {platform}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => copyToClipboard(item.emoji, item.emoji)}
                  >
                    {copied === item.emoji ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="daily" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Star className="size-5 text-yellow-500" />
                <CardTitle>Emoji of the Day</CardTitle>
              </div>
              <CardDescription>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <span className="text-8xl">{EMOJI_OF_THE_DAY.emoji}</span>
                <div>
                  <h3 className="text-2xl font-bold">{EMOJI_OF_THE_DAY.name}</h3>
                  <p className="text-muted-foreground">{EMOJI_OF_THE_DAY.emoji}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-1">Meaning</h4>
                  <p className="text-sm text-muted-foreground">{EMOJI_OF_THE_DAY.meaning}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">How to Use</h4>
                  <p className="text-sm text-muted-foreground">{EMOJI_OF_THE_DAY.usage}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-1 flex items-center gap-2">
                    <Sparkles className="size-4" />
                    Fun Fact
                  </h4>
                  <p className="text-sm text-muted-foreground">{EMOJI_OF_THE_DAY.funFact}</p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => copyToClipboard(EMOJI_OF_THE_DAY.emoji, "daily")}
              >
                {copied === "daily" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy Emoji
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6 mt-4">
          <section className="space-y-3">
            <Label className="text-base font-medium">Monthly Top Emoji Trends</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {HISTORICAL_DATA.map((item, idx) => (
                <div key={idx} className="rounded-lg border p-4 text-center bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-2">{item.month}</p>
                  <span className="text-4xl">{item.top}</span>
                  <div className="mt-2 w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${item.usage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.usage}%</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <Label className="text-base font-medium">Year in Review</Label>
            <div className="rounded-lg border p-6 bg-muted/30">
              <div className="flex items-center justify-center gap-4 text-6xl">
                {["❤️", "😂", "🔥", "✨", "🥺", "💀"].map((emoji, idx) => (
                  <span key={idx} className="hover:scale-125 transition-transform cursor-pointer">
                    {emoji}
                  </span>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Most used emojis of the year
              </p>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6 mt-4">
          {/* Seasonal Predictions */}
          <section className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Calendar className="size-4" />
              Seasonal Predictions
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SEASONAL_PREDICTIONS.map((item, idx) => (
                <div key={idx} className="rounded-lg border p-4 bg-muted/30">
                  <h4 className="font-medium mb-2">{item.season}</h4>
                  <div className="flex gap-2 mb-2">
                    {item.emojis.map((emoji, eIdx) => (
                      <span key={eIdx} className="text-2xl">{emoji}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.prediction}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Event Predictions */}
          <section className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Clock className="size-4" />
              Upcoming Events
            </Label>
            <div className="space-y-2">
              {EVENT_PREDICTIONS.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-lg border bg-background">
                  <div className="w-32">
                    <p className="font-medium">{item.event}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <div className="flex-1 flex gap-2">
                    {item.emojis.map((emoji, eIdx) => (
                      <button
                        key={eIdx}
                        onClick={() => copyToClipboard(emoji, `event-${idx}-${eIdx}`)}
                        className="text-2xl hover:scale-125 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Forecast */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Trending Forecast</Label>
            <div className="rounded-lg border p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <div className="flex items-center gap-4 mb-4">
                <Sparkles className="size-6 text-purple-500" />
                <h4 className="font-medium">Next Week's Predicted Top Emojis</h4>
              </div>
              <div className="flex flex-wrap gap-4 text-4xl">
                {["🔥", "✨", "😍", "🎉", "💕", "🌟"].map((emoji, idx) => (
                  <span key={idx} className="animate-pulse">{emoji}</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Based on current trends and upcoming events
              </p>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}

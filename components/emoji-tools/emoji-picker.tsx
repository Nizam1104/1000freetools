"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmojiData {
  emoji: string
  name: string
  category: string
  keywords: string[]
}

const EMOJI_DATA: EmojiData[] = [
  // Smileys & Emotion
  { emoji: "😀", name: "Grinning Face", category: "smileys", keywords: ["happy", "smile", "grin"] },
  { emoji: "😃", name: "Grinning Face with Big Eyes", category: "smileys", keywords: ["happy", "joy", "smile"] },
  { emoji: "😄", name: "Grinning Face with Smiling Eyes", category: "smileys", keywords: ["happy", "joy", "laugh"] },
  { emoji: "😁", name: "Beaming Face with Smiling Eyes", category: "smileys", keywords: ["happy", "grin", "smile"] },
  { emoji: "😆", name: "Grinning Squinting Face", category: "smileys", keywords: ["happy", "laugh", "lol"] },
  { emoji: "😅", name: "Grinning Face with Sweat", category: "smileys", keywords: ["nervous", "relief", "sweat"] },
  { emoji: "🤣", name: "Rolling on the Floor Laughing", category: "smileys", keywords: ["laugh", "rofl", "funny"] },
  { emoji: "😂", name: "Face with Tears of Joy", category: "smileys", keywords: ["laugh", "cry", "tears"] },
  { emoji: "🙂", name: "Slightly Smiling Face", category: "smileys", keywords: ["smile", "happy", "slight"] },
  { emoji: "🙃", name: "Upside-Down Face", category: "smileys", keywords: ["silly", "upside", "sarcastic"] },
  { emoji: "😉", name: "Winking Face", category: "smileys", keywords: ["wink", "flirt", "playful"] },
  { emoji: "😊", name: "Smiling Face with Smiling Eyes", category: "smileys", keywords: ["happy", "blush", "smile"] },
  { emoji: "😇", name: "Smiling Face with Halo", category: "smileys", keywords: ["angel", "innocent", "halo"] },
  { emoji: "🥰", name: "Smiling Face with Hearts", category: "smileys", keywords: ["love", "hearts", "adore"] },
  { emoji: "😍", name: "Smiling Face with Heart-Eyes", category: "smileys", keywords: ["love", "heart", "crush"] },
  { emoji: "🤩", name: "Star-Struck", category: "smileys", keywords: ["star", "excited", "amazed"] },
  { emoji: "😘", name: "Face Blowing a Kiss", category: "smileys", keywords: ["kiss", "love", "heart"] },
  { emoji: "😗", name: "Kissing Face", category: "smileys", keywords: ["kiss", "love", "lips"] },
  { emoji: "😚", name: "Kissing Face with Closed Eyes", category: "smileys", keywords: ["kiss", "love", "closed"] },
  { emoji: "😙", name: "Kissing Face with Smiling Eyes", category: "smileys", keywords: ["kiss", "smile", "love"] },
  { emoji: "😋", name: "Face Savoring Food", category: "smileys", keywords: ["yum", "delicious", "tongue"] },
  { emoji: "😛", name: "Face with Tongue", category: "smileys", keywords: ["tongue", "playful", "silly"] },
  { emoji: "😜", name: "Winking Face with Tongue", category: "smileys", keywords: ["wink", "tongue", "joke"] },
  { emoji: "🤪", name: "Zany Face", category: "smileys", keywords: ["crazy", "wacky", "silly"] },
  { emoji: "😝", name: "Squinting Face with Tongue", category: "smileys", keywords: ["tongue", "squint", "playful"] },
  { emoji: "🤑", name: "Money-Mouth Face", category: "smileys", keywords: ["money", "rich", "greedy"] },
  { emoji: "🤗", name: "Smiling Face with Open Hands", category: "smileys", keywords: ["hug", "embrace", "welcome"] },
  { emoji: "🤭", name: "Face with Hand Over Mouth", category: "smileys", keywords: ["oops", "secret", "giggle"] },
  { emoji: "🤫", name: "Shushing Face", category: "smileys", keywords: ["quiet", "shush", "secret"] },
  { emoji: "🤔", name: "Thinking Face", category: "smileys", keywords: ["think", "hmm", "ponder"] },
  { emoji: "🤐", name: "Zipper-Mouth Face", category: "smileys", keywords: ["zipper", "quiet", "sealed"] },
  { emoji: "🤨", name: "Face with Raised Eyebrow", category: "smileys", keywords: ["skeptical", "suspicious", "raised"] },
  { emoji: "😐", name: "Neutral Face", category: "smileys", keywords: ["neutral", "meh", "blank"] },
  { emoji: "😑", name: "Expressionless Face", category: "smileys", keywords: ["expressionless", "blank", "deadpan"] },
  { emoji: "😶", name: "Face Without Mouth", category: "smileys", keywords: ["silent", "quiet", "speechless"] },
  { emoji: "😏", name: "Smirking Face", category: "smileys", keywords: ["smirk", "smug", "confident"] },
  { emoji: "😒", name: "Unamused Face", category: "smileys", keywords: ["unamused", "annoyed", "meh"] },
  { emoji: "🙄", name: "Face with Rolling Eyes", category: "smileys", keywords: ["roll", "eyes", "whatever"] },
  { emoji: "😬", name: "Grimacing Face", category: "smileys", keywords: ["grimace", "awkward", "nervous"] },
  { emoji: "🤥", name: "Lying Face", category: "smileys", keywords: ["lie", "pinocchio", "dishonest"] },
  { emoji: "😌", name: "Relieved Face", category: "smileys", keywords: ["relieved", "calm", "peaceful"] },
  { emoji: "😔", name: "Pensive Face", category: "smileys", keywords: ["sad", "pensive", "thoughtful"] },
  { emoji: "😪", name: "Sleepy Face", category: "smileys", keywords: ["sleepy", "tired", "drowsy"] },
  { emoji: "🤤", name: "Drooling Face", category: "smileys", keywords: ["drool", "desire", "want"] },
  { emoji: "😴", name: "Sleeping Face", category: "smileys", keywords: ["sleep", "zzz", "bed"] },
  { emoji: "😷", name: "Face with Medical Mask", category: "smileys", keywords: ["mask", "sick", "health"] },
  { emoji: "🤒", name: "Face with Thermometer", category: "smileys", keywords: ["sick", "thermometer", "fever"] },
  { emoji: "🤕", name: "Face with Head-Bandage", category: "smileys", keywords: ["injured", "bandage", "hurt"] },
  { emoji: "🤢", name: "Nauseated Face", category: "smileys", keywords: ["nauseous", "sick", "vomit"] },
  { emoji: "🤮", name: "Face Vomiting", category: "smileys", keywords: ["vomit", "sick", "puke"] },
  { emoji: "🤧", name: "Sneezing Face", category: "smileys", keywords: ["sneeze", "achoo", "sick"] },
  { emoji: "🥵", name: "Hot Face", category: "smileys", keywords: ["hot", "heat", "sweating"] },
  { emoji: "🥶", name: "Cold Face", category: "smileys", keywords: ["cold", "freezing", "ice"] },
  { emoji: "🥴", name: "Woozy Face", category: "smileys", keywords: ["woozy", "dizzy", "drunk"] },
  { emoji: "😵", name: "Dizzy Face", category: "smileys", keywords: ["dizzy", "dead", "x"] },
  { emoji: "🤯", name: "Exploding Head", category: "smileys", keywords: ["mind", "blown", "shocked"] },
  { emoji: "🤠", name: "Cowboy Hat Face", category: "smileys", keywords: ["cowboy", "hat", "western"] },
  { emoji: "🥳", name: "Partying Face", category: "smileys", keywords: ["party", "celebrate", "birthday"] },
  { emoji: "😎", name: "Smiling Face with Sunglasses", category: "smileys", keywords: ["cool", "sunglasses", "summer"] },
  { emoji: "🤓", name: "Nerd Face", category: "smileys", keywords: ["nerd", "geek", "glasses"] },
  { emoji: "🧐", name: "Face with Monocle", category: "smileys", keywords: ["monocle", "fancy", "sophisticated"] },
  { emoji: "😕", name: "Confused Face", category: "smileys", keywords: ["confused", "puzzled", "uncertain"] },
  { emoji: "😟", name: "Worried Face", category: "smileys", keywords: ["worried", "concerned", "anxious"] },
  { emoji: "🙁", name: "Slightly Frowning Face", category: "smileys", keywords: ["sad", "frown", "disappointed"] },
  { emoji: "☹️", name: "Frowning Face", category: "smileys", keywords: ["sad", "frown", "unhappy"] },
  { emoji: "😮", name: "Face with Open Mouth", category: "smileys", keywords: ["surprised", "shock", "wow"] },
  { emoji: "😯", name: "Hushed Face", category: "smileys", keywords: ["hushed", "surprised", "quiet"] },
  { emoji: "😲", name: "Astonished Face", category: "smileys", keywords: ["astonished", "amazed", "shocked"] },
  { emoji: "😳", name: "Flushed Face", category: "smileys", keywords: ["flushed", "blush", "embarrassed"] },
  { emoji: "🥺", name: "Pleading Face", category: "smileys", keywords: ["plead", "puppy", "beg"] },
  { emoji: "😦", name: "Frowning Face with Open Mouth", category: "smileys", keywords: ["frown", "shocked", "scared"] },
  { emoji: "😧", name: "Anguished Face", category: "smileys", keywords: ["anguished", "stunned", "worried"] },
  { emoji: "😨", name: "Fearful Face", category: "smileys", keywords: ["fear", "scared", "worried"] },
  { emoji: "😰", name: "Anxious Face with Sweat", category: "smileys", keywords: ["anxious", "nervous", "sweat"] },
  { emoji: "😥", name: "Sad but Relieved Face", category: "smileys", keywords: ["relieved", "phew", "close"] },
  { emoji: "😢", name: "Crying Face", category: "smileys", keywords: ["cry", "sad", "tear"] },
  { emoji: "😭", name: "Loudly Crying Face", category: "smileys", keywords: ["cry", "sob", "sad"] },
  { emoji: "😱", name: "Face Screaming in Fear", category: "smileys", keywords: ["scream", "fear", "scared"] },
  { emoji: "😖", name: "Confounded Face", category: "smileys", keywords: ["confounded", "frustrated", "ugh"] },
  { emoji: "😣", name: "Persevering Face", category: "smileys", keywords: ["persevere", "struggle", "pain"] },
  { emoji: "😞", name: "Disappointed Face", category: "smileys", keywords: ["disappointed", "sad", "letdown"] },
  { emoji: "😓", name: "Downcast Face with Sweat", category: "smileys", keywords: ["sweat", "disappointed", "tired"] },
  { emoji: "😩", name: "Weary Face", category: "smileys", keywords: ["weary", "tired", "exhausted"] },
  { emoji: "😫", name: "Tired Face", category: "smileys", keywords: ["tired", "frustrated", "upset"] },
  { emoji: "🥱", name: "Yawning Face", category: "smileys", keywords: ["yawn", "tired", "bored"] },
  { emoji: "😤", name: "Face with Steam From Nose", category: "smileys", keywords: ["angry", "frustrated", "steam"] },
  { emoji: "😡", name: "Enraged Face", category: "smileys", keywords: ["angry", "mad", "rage"] },
  { emoji: "😠", name: "Angry Face", category: "smileys", keywords: ["angry", "mad", "annoyed"] },
  { emoji: "🤬", name: "Face with Symbols on Mouth", category: "smileys", keywords: ["curse", "swear", "censor"] },
  { emoji: "😈", name: "Smiling Face with Horns", category: "smileys", keywords: ["devil", "evil", "horns"] },
  { emoji: "👿", name: "Angry Face with Horns", category: "smileys", keywords: ["devil", "angry", "demon"] },
  { emoji: "💀", name: "Skull", category: "smileys", keywords: ["skull", "death", "dead"] },
  { emoji: "☠️", name: "Skull and Crossbones", category: "smileys", keywords: ["skull", "poison", "danger"] },
  { emoji: "💩", name: "Pile of Poo", category: "smileys", keywords: ["poop", "shit", "poo"] },
  { emoji: "🤡", name: "Clown Face", category: "smileys", keywords: ["clown", "circus", "funny"] },
  { emoji: "👹", name: "Ogre", category: "smileys", keywords: ["ogre", "monster", "japanese"] },
  { emoji: "👺", name: "Goblin", category: "smileys", keywords: ["goblin", "tengu", "japanese"] },
  { emoji: "👻", name: "Ghost", category: "smileys", keywords: ["ghost", "boo", "halloween"] },
  { emoji: "👽", name: "Alien", category: "smileys", keywords: ["alien", "ufo", "extraterrestrial"] },
  { emoji: "👾", name: "Alien Monster", category: "smileys", keywords: ["alien", "monster", "game"] },
  { emoji: "🤖", name: "Robot", category: "smileys", keywords: ["robot", "ai", "machine"] },
  // Hands & Gestures
  { emoji: "👋", name: "Waving Hand", category: "hands", keywords: ["wave", "hello", "goodbye"] },
  { emoji: "🤚", name: "Raised Back of Hand", category: "hands", keywords: ["hand", "raised", "back"] },
  { emoji: "🖐️", name: "Hand with Fingers Splayed", category: "hands", keywords: ["hand", "fingers", "splayed"] },
  { emoji: "✋", name: "Raised Hand", category: "hands", keywords: ["hand", "raised", "stop"] },
  { emoji: "🖖", name: "Vulcan Salute", category: "hands", keywords: ["vulcan", "spock", "trek"] },
  { emoji: "👌", name: "OK Hand", category: "hands", keywords: ["ok", "perfect", "good"] },
  { emoji: "🤌", name: "Pinched Fingers", category: "hands", keywords: ["pinched", "italian", "fingers"] },
  { emoji: "🤏", name: "Pinching Hand", category: "hands", keywords: ["pinch", "small", "tiny"] },
  { emoji: "✌️", name: "Victory Hand", category: "hands", keywords: ["victory", "peace", "v"] },
  { emoji: "🤞", name: "Crossed Fingers", category: "hands", keywords: ["cross", "fingers", "luck"] },
  { emoji: "🤟", name: "Love-You Gesture", category: "hands", keywords: ["love", "ily", "gesture"] },
  { emoji: "🤘", name: "Sign of the Horns", category: "hands", keywords: ["horns", "rock", "metal"] },
  { emoji: "🤙", name: "Call Me Hand", category: "hands", keywords: ["call", "phone", "hang"] },
  { emoji: "👈", name: "Backhand Index Pointing Left", category: "hands", keywords: ["point", "left", "finger"] },
  { emoji: "👉", name: "Backhand Index Pointing Right", category: "hands", keywords: ["point", "right", "finger"] },
  { emoji: "👆", name: "Backhand Index Pointing Up", category: "hands", keywords: ["point", "up", "finger"] },
  { emoji: "🖕", name: "Middle Finger", category: "hands", keywords: ["middle", "finger", "rude"] },
  { emoji: "👇", name: "Backhand Index Pointing Down", category: "hands", keywords: ["point", "down", "finger"] },
  { emoji: "☝️", name: "Index Pointing Up", category: "hands", keywords: ["point", "up", "finger"] },
  { emoji: "👍", name: "Thumbs Up", category: "hands", keywords: ["thumbs", "up", "like"] },
  { emoji: "👎", name: "Thumbs Down", category: "hands", keywords: ["thumbs", "down", "dislike"] },
  { emoji: "✊", name: "Raised Fist", category: "hands", keywords: ["fist", "raised", "power"] },
  { emoji: "👊", name: "Oncoming Fist", category: "hands", keywords: ["fist", "punch", "fistbump"] },
  { emoji: "🤛", name: "Left-Facing Fist", category: "hands", keywords: ["fist", "left", "fistbump"] },
  { emoji: "🤜", name: "Right-Facing Fist", category: "hands", keywords: ["fist", "right", "fistbump"] },
  { emoji: "👏", name: "Clapping Hands", category: "hands", keywords: ["clap", "applause", "praise"] },
  { emoji: "🙌", name: "Raising Hands", category: "hands", keywords: ["raise", "hands", "praise"] },
  { emoji: "👐", name: "Open Hands", category: "hands", keywords: ["open", "hands", "embrace"] },
  { emoji: "🤲", name: "Palms Up Together", category: "hands", keywords: ["palms", "together", "prayer"] },
  { emoji: "🤝", name: "Handshake", category: "hands", keywords: ["handshake", "deal", "agreement"] },
  { emoji: "🙏", name: "Folded Hands", category: "hands", keywords: ["pray", "thanks", "namaste"] },
  // Hearts
  { emoji: "❤️", name: "Red Heart", category: "hearts", keywords: ["heart", "love", "red"] },
  { emoji: "🧡", name: "Orange Heart", category: "hearts", keywords: ["heart", "orange", "love"] },
  { emoji: "💛", name: "Yellow Heart", category: "hearts", keywords: ["heart", "yellow", "love"] },
  { emoji: "💚", name: "Green Heart", category: "hearts", keywords: ["heart", "green", "love"] },
  { emoji: "💙", name: "Blue Heart", category: "hearts", keywords: ["heart", "blue", "love"] },
  { emoji: "💜", name: "Purple Heart", category: "hearts", keywords: ["heart", "purple", "love"] },
  { emoji: "🖤", name: "Black Heart", category: "hearts", keywords: ["heart", "black", "dark"] },
  { emoji: "💔", name: "Broken Heart", category: "hearts", keywords: ["heart", "broken", "sad"] },
  { emoji: "❣️", name: "Heart Exclamation", category: "hearts", keywords: ["heart", "exclamation", "love"] },
  { emoji: "💕", name: "Two Hearts", category: "hearts", keywords: ["hearts", "love", "two"] },
  { emoji: "💞", name: "Revolving Hearts", category: "hearts", keywords: ["hearts", "revolving", "love"] },
  { emoji: "💓", name: "Beating Heart", category: "hearts", keywords: ["heart", "beating", "pulse"] },
  { emoji: "💗", name: "Growing Heart", category: "hearts", keywords: ["heart", "growing", "love"] },
  { emoji: "💖", name: "Sparkling Heart", category: "hearts", keywords: ["heart", "sparkle", "love"] },
  { emoji: "💘", name: "Heart with Arrow", category: "hearts", keywords: ["heart", "arrow", "cupid"] },
  { emoji: "💝", name: "Heart with Ribbon", category: "hearts", keywords: ["heart", "ribbon", "gift"] },
  { emoji: "💟", name: "Heart Decoration", category: "hearts", keywords: ["heart", "decoration", "purple"] },
  { emoji: "☮️", name: "Peace Symbol", category: "symbols", keywords: ["peace", "symbol", "hippie"] },
  { emoji: "✝️", name: "Latin Cross", category: "symbols", keywords: ["cross", "christian", "religion"] },
  { emoji: "☪️", name: "Star and Crescent", category: "symbols", keywords: ["star", "crescent", "islam"] },
  { emoji: "🕉️", name: "Om", category: "symbols", keywords: ["om", "hindu", "religion"] },
  { emoji: "☸️", name: "Wheel of Dharma", category: "symbols", keywords: ["wheel", "dharma", "buddhist"] },
  { emoji: "✡️", name: "Star of David", category: "symbols", keywords: ["star", "david", "jewish"] },
  { emoji: "🔯", name: "Dotted Six-Pointed Star", category: "symbols", keywords: ["star", "six", "pointed"] },
  { emoji: "♈", name: "Aries", category: "symbols", keywords: ["aries", "zodiac", "ram"] },
  { emoji: "♉", name: "Taurus", category: "symbols", keywords: ["taurus", "zodiac", "bull"] },
  { emoji: "♊", name: "Gemini", category: "symbols", keywords: ["gemini", "zodiac", "twins"] },
  { emoji: "♋", name: "Cancer", category: "symbols", keywords: ["cancer", "zodiac", "crab"] },
  { emoji: "♌", name: "Leo", category: "symbols", keywords: ["leo", "zodiac", "lion"] },
  { emoji: "♍", name: "Virgo", category: "symbols", keywords: ["virgo", "zodiac", "maiden"] },
  { emoji: "♎", name: "Libra", category: "symbols", keywords: ["libra", "zodiac", "scales"] },
  { emoji: "♏", name: "Scorpio", category: "symbols", keywords: ["scorpio", "zodiac", "scorpion"] },
  { emoji: "♐", name: "Sagittarius", category: "symbols", keywords: ["sagittarius", "zodiac", "archer"] },
  { emoji: "♑", name: "Capricorn", category: "symbols", keywords: ["capricorn", "zodiac", "goat"] },
  { emoji: "♒", name: "Aquarius", category: "symbols", keywords: ["aquarius", "zodiac", "water"] },
  { emoji: "♓", name: "Pisces", category: "symbols", keywords: ["pisces", "zodiac", "fish"] },
]

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "smileys", label: "Smileys" },
  { id: "hands", label: "Hands" },
  { id: "hearts", label: "Hearts" },
  { id: "symbols", label: "Symbols" },
]

export default function EmojiPicker() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [copied, setCopied] = useState<string | null>(null)

  const filteredEmojis = useMemo(() => {
    return EMOJI_DATA.filter((emoji) => {
      const matchesSearch =
        searchQuery === "" ||
        emoji.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emoji.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        emoji.emoji.includes(searchQuery)

      const matchesCategory = selectedCategory === "all" || emoji.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const copyToClipboard = useCallback(async (emoji: string, key: string) => {
    try {
      await navigator.clipboard.writeText(emoji)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Search Section */}
      <section className="space-y-3">
        <Label htmlFor="emoji-search" className="text-base font-medium">
          Search Emojis
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="emoji-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            placeholder="Search by name, keyword, or paste an emoji..."
          />
        </div>
      </section>

      {/* Category Tabs */}
      <section>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start overflow-x-auto">
            {CATEGORIES.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm px-4 py-2">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </section>

      {/* Emoji Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            {filteredEmojis.length} emoji{filteredEmojis.length !== 1 ? "s" : ""} found
          </h3>
        </div>

        {filteredEmojis.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No emojis found matching your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
            {filteredEmojis.map((emojiData, idx) => (
              <button
                key={idx}
                onClick={() => copyToClipboard(emojiData.emoji, emojiData.emoji)}
                className="aspect-square flex items-center justify-center text-2xl hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                title={emojiData.name}
                aria-label={`Copy ${emojiData.name}`}
              >
                {copied === emojiData.emoji ? (
                  <Check className="size-5 text-green-600" />
                ) : (
                  emojiData.emoji
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Selected Emoji Info */}
      {copied && copied !== "input" && (
        <section className="rounded-lg border bg-muted/30 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Copied to clipboard</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(copied, copied)}
              className="h-7"
            >
              <Check className="size-3.5 mr-1" />
              <span className="text-xs">Copy again</span>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{copied}</span>
            <div>
              <p className="font-medium">{EMOJI_DATA.find((e) => e.emoji === copied)?.name}</p>
              <p className="text-sm text-muted-foreground">Click any emoji above to copy</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Search, Info } from "lucide-react"

interface EmojiMeaning {
  emoji: string
  name: string
  unicode: string
  meaning: string
  usage: string
  platformVariations: Record<string, string>
  relatedEmojis: string[]
}

const EMOJI_MEANINGS: EmojiMeaning[] = [
  {
    emoji: "😀",
    name: "Grinning Face",
    unicode: "U+1F600",
    meaning: "A happy, grinning face showing teeth. Used to express general happiness, excitement, or positive feelings.",
    usage: "Great for expressing joy, greeting someone cheerfully, or showing enthusiasm about something.",
    platformVariations: {
      Apple: "😀",
      Google: "😀",
      Samsung: "😀",
      Microsoft: "😀",
    },
    relatedEmojis: ["😃", "😄", "😁", "😊"],
  },
  {
    emoji: "😂",
    name: "Face with Tears of Joy",
    unicode: "U+1F602",
    meaning: "A face laughing so hard that tears are streaming down. One of the most popular emojis, expressing extreme amusement or laughter.",
    usage: "Use when something is extremely funny, hilarious, or when you're laughing uncontrollably.",
    platformVariations: {
      Apple: "😂",
      Google: "😂",
      Samsung: "😂",
      Microsoft: "😂",
    },
    relatedEmojis: ["🤣", "😆", "😅", "😹"],
  },
  {
    emoji: "🤣",
    name: "Rolling on the Floor Laughing",
    unicode: "U+1F923",
    meaning: "A face tilted to the side with tears, representing uncontrollable laughter. Indicates something is hilariously funny.",
    usage: "When something is so funny you're literally rolling on the floor laughing. More intense than 😂.",
    platformVariations: {
      Apple: "🤣",
      Google: "🤣",
      Samsung: "🤣",
      Microsoft: "🤣",
    },
    relatedEmojis: ["😂", "😆", "😹", "💀"],
  },
  {
    emoji: "❤️",
    name: "Red Heart",
    unicode: "U+2764",
    meaning: "The classic red heart emoji representing love, affection, and deep caring. The most universal symbol of love.",
    usage: "Express love for people, things, or ideas. Use in romantic contexts or to show deep appreciation.",
    platformVariations: {
      Apple: "❤️",
      Google: "❤️",
      Samsung: "❤️",
      Microsoft: "❤️",
    },
    relatedEmojis: ["💕", "💖", "💗", "💓"],
  },
  {
    emoji: "🔥",
    name: "Fire",
    unicode: "U+1F525",
    meaning: "A flame representing something that is excellent, attractive, exciting, or trending. Slang for 'hot' or 'lit'.",
    usage: "Compliment someone's appearance, celebrate achievements, or indicate something is trending or popular.",
    platformVariations: {
      Apple: "🔥",
      Google: "🔥",
      Samsung: "🔥",
      Microsoft: "🔥",
    },
    relatedEmojis: ["✨", "💯", "👏", "🙌"],
  },
  {
    emoji: "👍",
    name: "Thumbs Up",
    unicode: "U+1F44D",
    meaning: "A hand giving a thumbs up gesture. Universally represents approval, agreement, or 'good job'.",
    usage: "Show approval, agreement, or acknowledgment. Can also mean 'okay' or 'sounds good'.",
    platformVariations: {
      Apple: "👍",
      Google: "👍",
      Samsung: "👍",
      Microsoft: "👍",
    },
    relatedEmojis: ["👌", "✅", "🙆", "💪"],
  },
  {
    emoji: "🙏",
    name: "Folded Hands",
    unicode: "U+1F64F",
    meaning: "Two hands pressed together. Represents prayer, gratitude, pleading, or a high-five depending on context.",
    usage: "Say thank you, pray, plead for something, or give a high-five. Context determines meaning.",
    platformVariations: {
      Apple: "🙏",
      Google: "🙏",
      Samsung: "🙏",
      Microsoft: "🙏",
    },
    relatedEmojis: ["🤲", "👐", "🙌", "🤝"],
  },
  {
    emoji: "💀",
    name: "Skull",
    unicode: "U+1F480",
    meaning: "A human skull. In modern slang, represents 'dying' from laughter or extreme embarrassment. Also used for literal death or danger.",
    usage: "Express that something is so funny you're 'dead', or indicate danger, death, or Halloween themes.",
    platformVariations: {
      Apple: "💀",
      Google: "💀",
      Samsung: "💀",
      Microsoft: "💀",
    },
    relatedEmojis: ["☠️", "👻", "🤣", "😂"],
  },
  {
    emoji: "🤔",
    name: "Thinking Face",
    unicode: "U+1F914",
    meaning: "A face with a hand on chin, appearing to be in deep thought. Represents thinking, pondering, or skepticism.",
    usage: "When you're thinking about something, pondering a question, or expressing mild skepticism.",
    platformVariations: {
      Apple: "🤔",
      Google: "🤔",
      Samsung: "🤔",
      Microsoft: "🤔",
    },
    relatedEmojis: ["🧐", "😐", "🤨", "😕"],
  },
  {
    emoji: "😭",
    name: "Loudly Crying Face",
    unicode: "U+1F62D",
    meaning: "A face with streams of tears flowing down. Represents intense sadness, grief, or sometimes overwhelming positive emotion.",
    usage: "Express extreme sadness, grief, or being overwhelmed with emotion (positive or negative).",
    platformVariations: {
      Apple: "😭",
      Google: "😭",
      Samsung: "😭",
      Microsoft: "😭",
    },
    relatedEmojis: ["😢", "😿", "💔", "😞"],
  },
  {
    emoji: "🎉",
    name: "Party Popper",
    unicode: "U+1F389",
    meaning: "A party popper with confetti exploding. Represents celebration, congratulations, or festive occasions.",
    usage: "Celebrate achievements, birthdays, holidays, or any festive occasion. Add excitement to messages.",
    platformVariations: {
      Apple: "🎉",
      Google: "🎉",
      Samsung: "🎉",
      Microsoft: "🎉",
    },
    relatedEmojis: ["🎊", "🥳", "✨", "🎈"],
  },
  {
    emoji: "✨",
    name: "Sparkles",
    unicode: "U+2728",
    meaning: "Three sparkles or stars. Represents something special, magical, new, or exciting. Often used for emphasis or decoration.",
    usage: "Add emphasis, indicate something is special or new, or decorate messages for a magical feel.",
    platformVariations: {
      Apple: "✨",
      Google: "✨",
      Samsung: "✨",
      Microsoft: "✨",
    },
    relatedEmojis: ["⭐", "🌟", "💫", "🎇"],
  },
  {
    emoji: "👀",
    name: "Eyes",
    unicode: "U+1F440",
    meaning: "A pair of eyes looking to the side. Represents looking, watching, noticing, or being interested in something.",
    usage: "Indicate you're watching something, express interest, or draw attention to something important.",
    platformVariations: {
      Apple: "👀",
      Google: "👀",
      Samsung: "👀",
      Microsoft: "👀",
    },
    relatedEmojis: ["👁️", "🔍", "🧐", "😳"],
  },
  {
    emoji: "💯",
    name: "Hundred Points",
    unicode: "U+1F4AF",
    meaning: "The number 100 with underline. Represents perfection, keeping it real, or full agreement. Slang for 'keep it 100' (be authentic).",
    usage: "Express full agreement, indicate something is perfect, or emphasize authenticity.",
    platformVariations: {
      Apple: "💯",
      Google: "💯",
      Samsung: "💯",
      Microsoft: "💯",
    },
    relatedEmojis: ["🔥", "👌", "✅", "🙌"],
  },
  {
    emoji: "🥺",
    name: "Pleading Face",
    unicode: "U+1F97A",
    meaning: "A face with large, puppy-dog eyes looking up. Represents pleading, begging, or feeling touched emotionally.",
    usage: "Beg for something, express being emotionally moved, or show vulnerability in a cute way.",
    platformVariations: {
      Apple: "🥺",
      Google: "🥺",
      Samsung: "🥺",
      Microsoft: "🥺",
    },
    relatedEmojis: ["😢", "🥲", "😿", "💕"],
  },
]

export default function EmojiMeaningFinder() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiMeaning | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const filteredEmojis = useMemo(() => {
    if (!searchQuery.trim()) return EMOJI_MEANINGS

    const query = searchQuery.toLowerCase()
    return EMOJI_MEANINGS.filter(
      (emoji) =>
        emoji.name.toLowerCase().includes(query) ||
        emoji.meaning.toLowerCase().includes(query) ||
        emoji.usage.toLowerCase().includes(query) ||
        emoji.emoji.includes(query) ||
        emoji.unicode.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleEmojiSelect = (emoji: EmojiMeaning) => {
    setSelectedEmoji(emoji)
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Search Section */}
      <section className="space-y-3">
        <Label htmlFor="emoji-search" className="text-base font-medium">
          Find Emoji Meaning
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="emoji-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            placeholder="Search by emoji, name, or meaning..."
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Enter an emoji or search term to find its meaning, usage, and platform variations.
        </p>
      </section>

      {/* Results Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            {filteredEmojis.length} result{filteredEmojis.length !== 1 ? "s" : ""}
          </h3>
        </div>

        {filteredEmojis.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No emojis found matching your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmojis.map((emojiData) => (
              <button
                key={emojiData.unicode}
                onClick={() => handleEmojiSelect(emojiData)}
                className={`rounded-lg border p-4 text-left transition-all hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring ${
                  selectedEmoji?.unicode === emojiData.unicode ? "border-primary bg-muted/50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{emojiData.emoji}</span>
                  <div>
                    <p className="font-medium">{emojiData.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{emojiData.unicode}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Emoji Details */}
      {selectedEmoji && (
        <section className="space-y-4 rounded-lg border bg-background p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="text-6xl">{selectedEmoji.emoji}</span>
              <div>
                <h3 className="text-xl font-semibold">{selectedEmoji.name}</h3>
                <p className="text-sm text-muted-foreground font-mono">{selectedEmoji.unicode}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(selectedEmoji.emoji, "emoji")}
            >
              {copied === "emoji" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy Emoji
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Info className="size-4 text-muted-foreground" />
                <h4 className="font-medium">Meaning</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedEmoji.meaning}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Usage</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedEmoji.usage}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Platform Variations</h4>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(selectedEmoji.platformVariations).map(([platform, emoji]) => (
                  <div key={platform} className="text-center">
                    <span className="text-3xl">{emoji}</span>
                    <p className="text-xs text-muted-foreground mt-1">{platform}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Related Emojis</h4>
              <div className="flex flex-wrap gap-2">
                {selectedEmoji.relatedEmojis.map((related) => (
                  <button
                    key={related}
                    onClick={() => copyToClipboard(related, related)}
                    className="text-2xl hover:bg-muted rounded p-1 transition-colors"
                    title={`Copy ${related}`}
                  >
                    {copied === related ? "✓" : related}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

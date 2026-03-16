"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Volume2, Accessibility } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmojiDescription {
  emoji: string
  name: string
  description: string
  category: string
  keywords: string[]
}

const EMOJI_DESCRIPTIONS: Record<string, EmojiDescription> = {
  "😀": { emoji: "😀", name: "Grinning Face", description: "A happy, grinning face", category: "Smileys", keywords: ["happy", "smile", "grin"] },
  "😂": { emoji: "😂", name: "Face with Tears of Joy", description: "Laughing so hard with tears", category: "Smileys", keywords: ["laugh", "cry", "funny"] },
  "😍": { emoji: "😍", name: "Smiling Face with Heart-Eyes", description: "Love and adoration", category: "Smileys", keywords: ["love", "heart", "adore"] },
  "🥰": { emoji: "🥰", name: "Smiling Face with Hearts", description: "Surrounded by love", category: "Smileys", keywords: ["love", "hearts", "affection"] },
  "😎": { emoji: "😎", name: "Smiling Face with Sunglasses", description: "Cool and confident", category: "Smileys", keywords: ["cool", "sunglasses", "summer"] },
  "🤔": { emoji: "🤔", name: "Thinking Face", description: "Deep in thought", category: "Smileys", keywords: ["think", "hmm", "ponder"] },
  "🙏": { emoji: "🙏", name: "Folded Hands", description: "Prayer or gratitude", category: "Hands", keywords: ["pray", "thanks", "please"] },
  "💀": { emoji: "💀", name: "Skull", description: "Death or dying from laughter", category: "Objects", keywords: ["dead", "death", "skull"] },
  "🔥": { emoji: "🔥", name: "Fire", description: "Hot, trending, or excellent", category: "Objects", keywords: ["fire", "hot", "trending"] },
  "✨": { emoji: "✨", name: "Sparkles", description: "Something special or magical", category: "Symbols", keywords: ["sparkle", "special", "magic"] },
  "❤️": { emoji: "❤️", name: "Red Heart", description: "Love and affection", category: "Hearts", keywords: ["heart", "love", "red"] },
  "💔": { emoji: "💔", name: "Broken Heart", description: "Heartbreak or sadness", category: "Hearts", keywords: ["broken", "heart", "sad"] },
  "💕": { emoji: "💕", name: "Two Hearts", description: "Mutual love", category: "Hearts", keywords: ["hearts", "love", "two"] },
  "💯": { emoji: "💯", name: "Hundred Points", description: "Perfect score or agreement", category: "Symbols", keywords: ["hundred", "perfect", "score"] },
  "👍": { emoji: "👍", name: "Thumbs Up", description: "Approval or agreement", category: "Hands", keywords: ["thumbs", "up", "approve"] },
  "👎": { emoji: "👎", name: "Thumbs Down", description: "Disapproval", category: "Hands", keywords: ["thumbs", "down", "dislike"] },
  "👏": { emoji: "👏", name: "Clapping Hands", description: "Applause or praise", category: "Hands", keywords: ["clap", "applause", "praise"] },
  "🙌": { emoji: "🙌", name: "Raising Hands", description: "Celebration or praise", category: "Hands", keywords: ["raise", "hands", "praise"] },
  "🤝": { emoji: "🤝", name: "Handshake", description: "Agreement or partnership", category: "Hands", keywords: ["handshake", "deal", "agree"] },
  "💪": { emoji: "💪", name: "Flexed Biceps", description: "Strength or power", category: "Hands", keywords: ["muscle", "strong", "power"] },
  "🌟": { emoji: "🌟", name: "Glowing Star", description: "Something shining or special", category: "Symbols", keywords: ["star", "glow", "special"] },
  "⭐": { emoji: "⭐", name: "Star", description: "A shining star", category: "Symbols", keywords: ["star", "shine", "night"] },
  "🌙": { emoji: "🌙", name: "Crescent Moon", description: "Night time or sleep", category: "Symbols", keywords: ["moon", "night", "sleep"] },
  "☀️": { emoji: "☀️", name: "Sun", description: "Sunny day or warmth", category: "Symbols", keywords: ["sun", "sunny", "warm"] },
  "🌈": { emoji: "🌈", name: "Rainbow", description: "Hope and diversity", category: "Symbols", keywords: ["rainbow", "color", "hope"] },
  "☁️": { emoji: "☁️", name: "Cloud", description: "Cloudy weather", category: "Symbols", keywords: ["cloud", "weather", "sky"] },
  "🌊": { emoji: "🌊", name: "Water Wave", description: "Ocean waves", category: "Symbols", keywords: ["wave", "ocean", "water"] },
  "💧": { emoji: "💧", name: "Droplet", description: "Water drop", category: "Symbols", keywords: ["drop", "water", "liquid"] },
  "🌸": { emoji: "🌸", name: "Cherry Blossom", description: "Spring flowers", category: "Nature", keywords: ["flower", "blossom", "spring"] },
  "🎉": { emoji: "🎉", name: "Party Popper", description: "Celebration", category: "Activities", keywords: ["party", "celebrate", "popper"] },
  "🎊": { emoji: "🎊", name: "Confetti Ball", description: "Festive celebration", category: "Activities", keywords: ["confetti", "ball", "celebrate"] },
  "🎁": { emoji: "🎁", name: "Wrapped Gift", description: "Present or gift", category: "Activities", keywords: ["gift", "present", "wrap"] },
  "🎂": { emoji: "🎂", name: "Birthday Cake", description: "Birthday celebration", category: "Food", keywords: ["cake", "birthday", "celebrate"] },
  "🎄": { emoji: "🎄", name: "Christmas Tree", description: "Holiday decoration", category: "Activities", keywords: ["tree", "christmas", "holiday"] },
  "🎃": { emoji: "🎃", name: "Jack-O-Lantern", description: "Halloween pumpkin", category: "Activities", keywords: ["pumpkin", "halloween", "jack"] },
  "🎈": { emoji: "🎈", name: "Balloon", description: "Party balloon", category: "Activities", keywords: ["balloon", "party", "float"] },
  "🎀": { emoji: "🎀", name: "Ribbon", description: "Decorative bow", category: "Activities", keywords: ["ribbon", "bow", "decorate"] },
  "🎯": { emoji: "🎯", name: "Bullseye", description: "Target achieved", category: "Activities", keywords: ["target", "bullseye", "goal"] },
  "🎪": { emoji: "🎪", name: "Circus Tent", description: "Circus or carnival", category: "Activities", keywords: ["circus", "tent", "carnival"] },
  "🍕": { emoji: "🍕", name: "Pizza", description: "Pizza slice", category: "Food", keywords: ["pizza", "slice", "food"] },
  "🍔": { emoji: "🍔", name: "Hamburger", description: "Burger", category: "Food", keywords: ["burger", "hamburger", "food"] },
  "🍟": { emoji: "🍟", name: "French Fries", description: "Fried potato strips", category: "Food", keywords: ["fries", "potato", "food"] },
  "🌭": { emoji: "🌭", name: "Hot Dog", description: "Hot dog sausage", category: "Food", keywords: ["hotdog", "sausage", "food"] },
  "🍿": { emoji: "🍿", name: "Popcorn", description: "Movie snack", category: "Food", keywords: ["popcorn", "movie", "snack"] },
  "🧁": { emoji: "🧁", name: "Cupcake", description: "Small cake", category: "Food", keywords: ["cupcake", "cake", "sweet"] },
  "🍰": { emoji: "🍰", name: "Shortcake", description: "Dessert cake", category: "Food", keywords: ["cake", "dessert", "sweet"] },
  "🍫": { emoji: "🍫", name: "Chocolate Bar", description: "Chocolate candy", category: "Food", keywords: ["chocolate", "candy", "sweet"] },
  "🍬": { emoji: "🍬", name: "Candy", description: "Sweet candy", category: "Food", keywords: ["candy", "sweet", "sugar"] },
  "🍭": { emoji: "🍭", name: "Lollipop", description: "Candy on stick", category: "Food", keywords: ["lollipop", "candy", "sweet"] },
  "🐶": { emoji: "🐶", name: "Dog Face", description: "Dog or puppy", category: "Animals", keywords: ["dog", "puppy", "pet"] },
  "🐱": { emoji: "🐱", name: "Cat Face", description: "Cat or kitten", category: "Animals", keywords: ["cat", "kitten", "pet"] },
  "🐭": { emoji: "🐭", name: "Mouse Face", description: "Mouse", category: "Animals", keywords: ["mouse", "rodent", "animal"] },
  "🐹": { emoji: "🐹", name: "Hamster", description: "Hamster pet", category: "Animals", keywords: ["hamster", "pet", "animal"] },
  "🐰": { emoji: "🐰", name: "Rabbit Face", description: "Bunny rabbit", category: "Animals", keywords: ["rabbit", "bunny", "pet"] },
  "🦊": { emoji: "🦊", name: "Fox", description: "Fox animal", category: "Animals", keywords: ["fox", "animal", "wild"] },
  "🐻": { emoji: "🐻", name: "Bear", description: "Bear animal", category: "Animals", keywords: ["bear", "animal", "wild"] },
  "🐼": { emoji: "🐼", name: "Panda", description: "Panda bear", category: "Animals", keywords: ["panda", "bear", "animal"] },
  "🐨": { emoji: "🐨", name: "Koala", description: "Koala bear", category: "Animals", keywords: ["koala", "bear", "australia"] },
  "🐯": { emoji: "🐯", name: "Tiger Face", description: "Tiger", category: "Animals", keywords: ["tiger", "cat", "wild"] },
}

export default function EmojiToText() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"emoji-to-text" | "text-to-emoji">("emoji-to-text")
  const [copied, setCopied] = useState<string | null>(null)
  const [showAccessibility, setShowAccessibility] = useState(false)
  const [includeCategory, setIncludeCategory] = useState(false)

  const emojiRegex = useMemo(
    () =>
      /[\p{Emoji_Presentation}\p{Extended_Pictographic}](?:\uFE0F)?(?:\u200D[\p{Emoji_Presentation}\p{Extended_Pictographic}](?:\uFE0F)?)*|[\u{1F1E6}-\u{1F1FF}]{2}|[#*0-9]\uFE0F?\u20E3/gu,
    []
  )

  const convertEmojiToText = useCallback(() => {
    const text = inputText
    let result = text

    // Replace each emoji with its description
    const matches = text.match(emojiRegex) || []
    matches.forEach((emoji) => {
      const desc = EMOJI_DESCRIPTIONS[emoji]
      if (desc) {
        const replacement = includeCategory
          ? `[${desc.name} - ${desc.category}: ${desc.description}]`
          : `[${desc.name}: ${desc.description}]`
        result = result.replace(emoji, replacement)
      } else {
        result = result.replace(emoji, `[Emoji: ${emoji}]`)
      }
    })

    setOutputText(result)
  }, [inputText, emojiRegex, includeCategory])

  const convertTextToEmoji = useCallback(() => {
    const text = inputText.toLowerCase()
    let result = text

    const emojiMap: Record<string, string> = {
      "happy": "😀",
      "laugh": "😂",
      "love": "❤️",
      "heart": "❤️",
      "fire": "🔥",
      "hot": "🔥",
      "cool": "😎",
      "think": "🤔",
      "pray": "🙏",
      "thanks": "🙏",
      "dead": "💀",
      "sparkle": "✨",
      "special": "✨",
      "broken": "💔",
      "perfect": "💯",
      "thumbs up": "👍",
      "approve": "👍",
      "clap": "👏",
      "praise": "🙌",
      "strong": "💪",
      "star": "⭐",
      "moon": "🌙",
      "sun": "☀️",
      "rainbow": "🌈",
      "cloud": "☁️",
      "wave": "🌊",
      "water": "💧",
      "flower": "🌸",
      "party": "🎉",
      "celebrate": "🎉",
      "gift": "🎁",
      "birthday": "🎂",
      "cake": "🎂",
      "christmas": "🎄",
      "halloween": "🎃",
      "pumpkin": "🎃",
      "balloon": "🎈",
      "target": "🎯",
      "pizza": "🍕",
      "burger": "🍔",
      "fries": "🍟",
      "popcorn": "🍿",
      "cupcake": "🧁",
      "chocolate": "🍫",
      "candy": "🍬",
      "dog": "🐶",
      "cat": "🐱",
      "rabbit": "🐰",
      "bear": "🐻",
      "panda": "🐼",
      "tiger": "🐯",
    }

    Object.entries(emojiMap).forEach(([word, emoji]) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi")
      result = result.replace(regex, emoji)
    })

    setOutputText(result)
  }, [inputText])

  const convert = useCallback(() => {
    if (mode === "emoji-to-text") {
      convertEmojiToText()
    } else {
      convertTextToEmoji()
    }
  }, [mode, convertEmojiToText, convertTextToEmoji])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const speakText = useCallback(() => {
    if ("speechSynthesis" in window && outputText) {
      const utterance = new SpeechSynthesisUtterance(outputText)
      speechSynthesis.speak(utterance)
    }
  }, [outputText])

  const getAccessibilityText = useCallback(() => {
    const text = inputText
    const matches = text.match(emojiRegex) || []
    
    if (matches.length === 0) return "No emojis found"
    
    return matches.map((emoji) => {
      const desc = EMOJI_DESCRIPTIONS[emoji]
      return desc ? desc.name : `emoji ${emoji}`
    }).join(", ")
  }, [inputText, emojiRegex])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Conversion Mode</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={mode === "emoji-to-text" ? "default" : "outline"}
            onClick={() => setMode("emoji-to-text")}
          >
            <Accessibility className="size-4 mr-2" />
            Emoji to Text
          </Button>
          <Button
            variant={mode === "text-to-emoji" ? "default" : "outline"}
            onClick={() => setMode("text-to-emoji")}
          >
            <span className="text-lg mr-2">📝</span>
            Text to Emoji
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-text" className="text-base font-medium">
            {mode === "emoji-to-text" ? "Enter Emoji Text" : "Enter Plain Text"}
          </Label>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="xs" onClick={() => setInputText("")}>
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        <Textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="font-sans text-sm min-h-[100px]"
          placeholder={
            mode === "emoji-to-text"
              ? "Paste emoji text here, e.g., I love you ❤️🔥"
              : "Type text to convert, e.g., I am happy and love pizza"
          }
        />
        {mode === "emoji-to-text" && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="include-category"
              checked={includeCategory}
              onChange={(e) => setIncludeCategory(e.target.checked)}
              className="rounded border-muted"
            />
            <Label htmlFor="include-category" className="text-sm cursor-pointer">
              Include emoji category in output
            </Label>
          </div>
        )}
        <Button onClick={convert} className="w-full sm:w-auto">
          {mode === "emoji-to-text" ? "Convert to Text" : "Convert to Emoji"}
        </Button>
      </section>

      {/* Accessibility Info */}
      {mode === "emoji-to-text" && inputText && (
        <section className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAccessibility(!showAccessibility)}
          >
            <Accessibility className="size-4 mr-2" />
            Accessibility Info
          </Button>
          {showAccessibility && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Screen Reader Text:</strong> {getAccessibilityText()}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Output Section */}
      {outputText && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === "emoji-to-text" ? "Text Output" : "Emoji Output"}
            </Label>
            <div className="flex items-center gap-2">
              {mode === "emoji-to-text" && (
                <Button variant="ghost" size="icon-sm" onClick={speakText}>
                  <Volume2 className="size-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(outputText, "output")}
              >
                {copied === "output" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy
              </Button>
            </div>
          </div>
          <div
            className={cn(
              "rounded-lg border bg-muted/30 p-4",
              mode === "emoji-to-text" ? "font-sans" : "text-2xl"
            )}
          >
            {outputText}
          </div>
        </section>
      )}

      {/* Quick Reference */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Quick Reference</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.entries(EMOJI_DESCRIPTIONS).slice(0, 24).map(([emoji, desc]) => (
            <button
              key={emoji}
              onClick={() => {
                if (mode === "emoji-to-text") {
                  setInputText((prev) => prev + emoji)
                } else {
                  setInputText((prev) => prev + desc.name.toLowerCase() + " ")
                }
              }}
              className="rounded-lg border p-3 text-left hover:bg-muted/50 transition-colors"
            >
              <span className="text-2xl">{emoji}</span>
              <p className="text-xs text-muted-foreground mt-1 truncate">{desc.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Emoji Categories */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Browse by Category</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Smileys", "Hearts", "Hands", "Animals", "Food", "Nature", "Symbols", "Activities"].map((category) => {
            const emojis = Object.values(EMOJI_DESCRIPTIONS).filter((e) => e.category === category)
            return (
              <div
                key={category}
                className="rounded-lg border p-3 bg-muted/30"
              >
                <p className="font-medium text-sm mb-2">{category}</p>
                <div className="flex flex-wrap gap-1">
                  {emojis.slice(0, 6).map((e) => (
                    <button
                      key={e.emoji}
                      onClick={() => setInputText((prev) => prev + e.emoji)}
                      className="text-xl hover:scale-125 transition-transform"
                    >
                      {e.emoji}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

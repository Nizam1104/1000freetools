"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Search, Globe, BookOpen, Sparkles } from "lucide-react"

interface EmojiTranslation {
  emoji: string
  name: string
  unicode: string
  meaning: string
  translations: Record<string, string>
  platformVariations: Record<string, string>
  relatedEmojis: { emoji: string; name: string }[]
  categories: string[]
}

const EMOJI_TRANSLATIONS: EmojiTranslation[] = [
  {
    emoji: "😀",
    name: "Grinning Face",
    unicode: "U+1F600",
    meaning: "A happy, grinning face showing teeth. Used to express general happiness and excitement.",
    translations: {
      Spanish: "Cara sonriente",
      French: "Visage souriant",
      German: "Grinsendes Gesicht",
      Japanese: "にっこり笑った顔",
      Chinese: "笑脸",
      Korean: "웃는 얼굴",
      Portuguese: "Rosto sorrindo",
      Italian: "Faccia sorridente",
    },
    platformVariations: {
      iOS: "😀",
      Android: "😀",
      Windows: "😀",
      Samsung: "😀",
    },
    relatedEmojis: [
      { emoji: "😃", name: "Grinning Face with Big Eyes" },
      { emoji: "😄", name: "Grinning Face with Smiling Eyes" },
      { emoji: "😁", name: "Beaming Face with Smiling Eyes" },
      { emoji: "😊", name: "Smiling Face with Smiling Eyes" },
    ],
    categories: ["Smileys", "Happy", "Positive"],
  },
  {
    emoji: "😂",
    name: "Face with Tears of Joy",
    unicode: "U+1F602",
    meaning: "A face laughing so hard that tears are streaming down. One of the most popular emojis.",
    translations: {
      Spanish: "Cara con lágrimas de alegría",
      French: "Visage pleurant de rire",
      German: "Gesicht mit Freudentränen",
      Japanese: "涙を流して笑う顔",
      Chinese: "笑哭",
      Korean: "기쁨의 눈물을 흘리는 얼굴",
      Portuguese: "Rosto chorando de rir",
      Italian: "Faccia che piange dalle risate",
    },
    platformVariations: {
      iOS: "😂",
      Android: "😂",
      Windows: "😂",
      Samsung: "😂",
    },
    relatedEmojis: [
      { emoji: "🤣", name: "Rolling on the Floor Laughing" },
      { emoji: "😆", name: "Grinning Squinting Face" },
      { emoji: "😅", name: "Grinning Face with Sweat" },
      { emoji: "😹", name: "Cat with Tears of Joy" },
    ],
    categories: ["Smileys", "Laugh", "Funny"],
  },
  {
    emoji: "❤️",
    name: "Red Heart",
    unicode: "U+2764",
    meaning: "The classic red heart representing love, affection, and deep caring.",
    translations: {
      Spanish: "Corazón rojo",
      French: "Cœur rouge",
      German: "Rotes Herz",
      Japanese: "赤いハート",
      Chinese: "红心",
      Korean: "빨간 하트",
      Portuguese: "Coração vermelho",
      Italian: "Cuore rosso",
    },
    platformVariations: {
      iOS: "❤️",
      Android: "❤️",
      Windows: "❤️",
      Samsung: "❤️",
    },
    relatedEmojis: [
      { emoji: "💕", name: "Two Hearts" },
      { emoji: "💖", name: "Sparkling Heart" },
      { emoji: "💗", name: "Growing Heart" },
      { emoji: "💓", name: "Beating Heart" },
    ],
    categories: ["Hearts", "Love", "Romance"],
  },
  {
    emoji: "🔥",
    name: "Fire",
    unicode: "U+1F525",
    meaning: "A flame representing something excellent, attractive, or trending. Slang for 'hot' or 'lit'.",
    translations: {
      Spanish: "Fuego",
      French: "Feu",
      German: "Feuer",
      Japanese: "炎",
      Chinese: "火",
      Korean: "불",
      Portuguese: "Fogo",
      Italian: "Fuoco",
    },
    platformVariations: {
      iOS: "🔥",
      Android: "🔥",
      Windows: "🔥",
      Samsung: "🔥",
    },
    relatedEmojis: [
      { emoji: "✨", name: "Sparkles" },
      { emoji: "💯", name: "Hundred Points" },
      { emoji: "👏", name: "Clapping Hands" },
      { emoji: "🙌", name: "Raising Hands" },
    ],
    categories: ["Objects", "Trending", "Hot"],
  },
  {
    emoji: "👍",
    name: "Thumbs Up",
    unicode: "U+1F44D",
    meaning: "A hand giving a thumbs up gesture. Universally represents approval or agreement.",
    translations: {
      Spanish: "Pulgar hacia arriba",
      French: "Pouce vers le haut",
      German: "Daumen hoch",
      Japanese: "親指を立てる",
      Chinese: "大拇指",
      Korean: "엄지 척",
      Portuguese: "Polegar para cima",
      Italian: "Pollice in su",
    },
    platformVariations: {
      iOS: "👍",
      Android: "👍",
      Windows: "👍",
      Samsung: "👍",
    },
    relatedEmojis: [
      { emoji: "👌", name: "OK Hand" },
      { emoji: "✅", name: "Check Mark" },
      { emoji: "🙆", name: "Person Gesturing OK" },
      { emoji: "💪", name: "Flexed Biceps" },
    ],
    categories: ["Hands", "Approval", "Positive"],
  },
  {
    emoji: "🙏",
    name: "Folded Hands",
    unicode: "U+1F64F",
    meaning: "Two hands pressed together. Represents prayer, gratitude, or pleading.",
    translations: {
      Spanish: "Manos juntas",
      French: "Mains jointes",
      German: "Gefaltete Hände",
      Japanese: "合掌",
      Chinese: "合十",
      Korean: "모은 손",
      Portuguese: "Mãos juntas",
      Italian: "Mani giunte",
    },
    platformVariations: {
      iOS: "🙏",
      Android: "🙏",
      Windows: "🙏",
      Samsung: "🙏",
    },
    relatedEmojis: [
      { emoji: "🤲", name: "Palms Up Together" },
      { emoji: "👐", name: "Open Hands" },
      { emoji: "🙌", name: "Raising Hands" },
      { emoji: "🤝", name: "Handshake" },
    ],
    categories: ["Hands", "Prayer", "Thanks"],
  },
  {
    emoji: "🎉",
    name: "Party Popper",
    unicode: "U+1F389",
    meaning: "A party popper with confetti. Represents celebration and festive occasions.",
    translations: {
      Spanish: "Lanzador de confeti",
      French: "Cotillon",
      German: "Konfettiparty",
      Japanese: "クラッカー",
      Chinese: "礼花",
      Korean: "파티 팝퍼",
      Portuguese: "Lançador de confetes",
      Italian: "Sparacoriandoli",
    },
    platformVariations: {
      iOS: "🎉",
      Android: "🎉",
      Windows: "🎉",
      Samsung: "🎉",
    },
    relatedEmojis: [
      { emoji: "🎊", name: "Confetti Ball" },
      { emoji: "🥳", name: "Partying Face" },
      { emoji: "✨", name: "Sparkles" },
      { emoji: "🎈", name: "Balloon" },
    ],
    categories: ["Activities", "Celebration", "Party"],
  },
  {
    emoji: "💀",
    name: "Skull",
    unicode: "U+1F480",
    meaning: "A human skull. In slang, represents 'dying' from laughter. Also used for danger.",
    translations: {
      Spanish: "Calavera",
      French: "Crâne",
      German: "Schädel",
      Japanese: "ドクロ",
      Chinese: "骷髅",
      Korean: "해골",
      Portuguese: "Caveira",
      Italian: "Teschio",
    },
    platformVariations: {
      iOS: "💀",
      Android: "💀",
      Windows: "💀",
      Samsung: "💀",
    },
    relatedEmojis: [
      { emoji: "☠️", name: "Skull and Crossbones" },
      { emoji: "👻", name: "Ghost" },
      { emoji: "🤣", name: "Rolling on the Floor Laughing" },
      { emoji: "😂", name: "Face with Tears of Joy" },
    ],
    categories: ["Objects", "Death", "Halloween"],
  },
  {
    emoji: "🤔",
    name: "Thinking Face",
    unicode: "U+1F914",
    meaning: "A face with hand on chin, appearing to be in deep thought or skepticism.",
    translations: {
      Spanish: "Cara pensativa",
      French: "Visage en réflexion",
      German: "Nachdenkliches Gesicht",
      Japanese: "考え中の顔",
      Chinese: "思考",
      Korean: "생각하는 얼굴",
      Portuguese: "Rosto pensativo",
      Italian: "Faccia pensierosa",
    },
    platformVariations: {
      iOS: "🤔",
      Android: "🤔",
      Windows: "🤔",
      Samsung: "🤔",
    },
    relatedEmojis: [
      { emoji: "🧐", name: "Face with Monocle" },
      { emoji: "😐", name: "Neutral Face" },
      { emoji: "🤨", name: "Face with Raised Eyebrow" },
      { emoji: "😕", name: "Confused Face" },
    ],
    categories: ["Smileys", "Thinking", "Pondering"],
  },
  {
    emoji: "🥺",
    name: "Pleading Face",
    unicode: "U+1F97A",
    meaning: "A face with large puppy-dog eyes. Represents pleading or feeling touched emotionally.",
    translations: {
      Spanish: "Cara suplicante",
      French: "Visage suppliant",
      German: "Bettelndes Gesicht",
      Japanese: "懇願する顔",
      Chinese: "恳求的脸",
      Korean: "간청하는 얼굴",
      Portuguese: "Rosto implorando",
      Italian: "Faccia supplichevole",
    },
    platformVariations: {
      iOS: "🥺",
      Android: "🥺",
      Windows: "🥺",
      Samsung: "🥺",
    },
    relatedEmojis: [
      { emoji: "😢", name: "Crying Face" },
      { emoji: "🥲", name: "Smiling Face with Tear" },
      { emoji: "😿", name: "Crying Cat" },
      { emoji: "💕", name: "Two Hearts" },
    ],
    categories: ["Smileys", "Pleading", "Emotional"],
  },
  {
    emoji: "✨",
    name: "Sparkles",
    unicode: "U+2728",
    meaning: "Three sparkles. Represents something special, magical, or new.",
    translations: {
      Spanish: "Destellos",
      French: "Étincelles",
      German: "Funkeln",
      Japanese: "キラキラ",
      Chinese: "火花",
      Korean: "반짝임",
      Portuguese: "Brilhos",
      Italian: "Scintille",
    },
    platformVariations: {
      iOS: "✨",
      Android: "✨",
      Windows: "✨",
      Samsung: "✨",
    },
    relatedEmojis: [
      { emoji: "⭐", name: "Star" },
      { emoji: "🌟", name: "Glowing Star" },
      { emoji: "💫", name: "Dizzy" },
      { emoji: "🎇", name: "Sparkler" },
    ],
    categories: ["Symbols", "Magic", "Special"],
  },
  {
    emoji: "👀",
    name: "Eyes",
    unicode: "U+1F440",
    meaning: "A pair of eyes looking to the side. Represents watching or being interested.",
    translations: {
      Spanish: "Ojos",
      French: "Yeux",
      German: "Augen",
      Japanese: "目",
      Chinese: "眼睛",
      Korean: "눈",
      Portuguese: "Olhos",
      Italian: "Occhi",
    },
    platformVariations: {
      iOS: "👀",
      Android: "👀",
      Windows: "👀",
      Samsung: "👀",
    },
    relatedEmojis: [
      { emoji: "👁️", name: "Eye" },
      { emoji: "🔍", name: "Magnifying Glass" },
      { emoji: "🧐", name: "Face with Monocle" },
      { emoji: "😳", name: "Flushed Face" },
    ],
    categories: ["Body", "Watching", "Interest"],
  },
]

const CATEGORIES = ["All", "Smileys", "Hearts", "Hands", "Objects", "Symbols", "Activities", "Body"]

export default function EmojiTranslator() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiTranslation | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [inputText, setInputText] = useState("")
  const [translatedOutput, setTranslatedOutput] = useState("")

  const filteredEmojis = useMemo(() => {
    return EMOJI_TRANSLATIONS.filter((emoji) => {
      const matchesSearch =
        searchQuery === "" ||
        emoji.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emoji.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emoji.emoji.includes(searchQuery) ||
        emoji.categories.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || emoji.categories.includes(selectedCategory)

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const translateTextToEmoji = useCallback(() => {
    const text = inputText.toLowerCase()
    let result = text

    const emojiMap: Record<string, string> = {
      "happy": "😀",
      "love": "❤️",
      "fire": "🔥",
      "hot": "🔥",
      "thumbs up": "👍",
      "ok": "👍",
      "pray": "🙏",
      "thanks": "🙏",
      "party": "🎉",
      "celebrate": "🎉",
      "dead": "💀",
      "thinking": "🤔",
      "please": "🥺",
      "sparkle": "✨",
      "special": "✨",
      "eyes": "👀",
      "watching": "👀",
      "laugh": "😂",
      "cry": "😂",
      "heart": "❤️",
      "smile": "😊",
      "sad": "😢",
      "angry": "😠",
      "cool": "😎",
      "sleep": "😴",
      "food": "🍕",
      "drink": "🍺",
      "money": "💰",
      "star": "⭐",
      "moon": "🌙",
      "sun": "☀️",
      "cloud": "☁️",
      "rain": "🌧️",
      "snow": "❄️",
    }

    Object.entries(emojiMap).forEach(([word, emoji]) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi")
      result = result.replace(regex, emoji)
    })

    setTranslatedOutput(result)
  }, [inputText])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="search" className="text-sm px-4 py-2">
            <BookOpen className="size-4 mr-2" />
            Search & Translate
          </TabsTrigger>
          <TabsTrigger value="text" className="text-sm px-4 py-2">
            <Globe className="size-4 mr-2" />
            Text to Emoji
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6 mt-4">
          {/* Search Section */}
          <section className="space-y-3">
            <Label htmlFor="emoji-search" className="text-base font-medium">
              Search Emoji by Name or Keyword
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="emoji-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                placeholder="Search by name, meaning, or paste an emoji..."
              />
            </div>
          </section>

          {/* Category Filter */}
          <section>
            <Label className="text-base font-medium mb-3 block">Filter by Category</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
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
                    onClick={() => setSelectedEmoji(emojiData)}
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
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedEmoji.categories.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs px-2 py-0.5 bg-muted rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(selectedEmoji.emoji, "emoji")}
                >
                  {copied === "emoji" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-4 text-muted-foreground" />
                    <h4 className="font-medium">Meaning</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedEmoji.meaning}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="size-4 text-muted-foreground" />
                    <h4 className="font-medium">Translations</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(selectedEmoji.translations).map(([lang, translation]) => (
                      <div key={lang} className="text-center p-2 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">{lang}</p>
                        <p className="text-sm font-medium">{translation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-muted-foreground" />
                    <h4 className="font-medium">Platform Variations</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(selectedEmoji.platformVariations).map(([platform, emoji]) => (
                      <div key={platform} className="text-center p-2 bg-muted/30 rounded-lg">
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
                        key={related.emoji}
                        onClick={() => copyToClipboard(related.emoji, related.emoji)}
                        className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg hover:bg-muted transition-colors"
                        title={`Copy ${related.name}`}
                      >
                        <span className="text-xl">{related.emoji}</span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">{related.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </TabsContent>

        <TabsContent value="text" className="space-y-6 mt-4">
          {/* Text to Emoji Translator */}
          <section className="space-y-3">
            <Label htmlFor="input-text" className="text-base font-medium">
              Enter Text to Translate
            </Label>
            <Textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="font-sans text-sm min-h-[100px]"
              placeholder="Type text like 'I am happy and love you'..."
            />
            <Button onClick={translateTextToEmoji} className="w-full sm:w-auto">
              <Sparkles className="size-4 mr-2" />
              Translate to Emoji
            </Button>
          </section>

          {/* Output */}
          {translatedOutput && (
            <section className="space-y-3">
              <Label className="text-base font-medium">Translated Output</Label>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-lg">{translatedOutput}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(translatedOutput, "output")}
              >
                {copied === "output" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy Translation
              </Button>
            </section>
          )}

          {/* Quick Reference */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Quick Reference</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { word: "happy", emoji: "😀" },
                { word: "love", emoji: "❤️" },
                { word: "fire", emoji: "🔥" },
                { word: "ok", emoji: "👍" },
                { word: "pray", emoji: "🙏" },
                { word: "party", emoji: "🎉" },
                { word: "dead", emoji: "💀" },
                { word: "thinking", emoji: "🤔" },
              ].map((item) => (
                <button
                  key={item.word}
                  onClick={() => setInputText((prev) => prev + " " + item.word)}
                  className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-sm">{item.word}</span>
                </button>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Add Textarea import
import { Textarea } from "@/components/ui/textarea"

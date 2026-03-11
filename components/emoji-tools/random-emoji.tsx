"use client"

import * as React from "react"
import { useState, useCallback, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Shuffle, Sparkles, Star, History, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmojiItem {
  emoji: string
  name: string
  category: string
  keywords: string[]
}

const EMOJI_DATA: EmojiItem[] = [
  { emoji: "😀", name: "Grinning Face", category: "Smileys", keywords: ["happy", "smile", "grin"] },
  { emoji: "😂", name: "Tears of Joy", category: "Smileys", keywords: ["laugh", "cry", "funny"] },
  { emoji: "😍", name: "Heart Eyes", category: "Smileys", keywords: ["love", "heart", "adore"] },
  { emoji: "🥰", name: "Smiling with Hearts", category: "Smileys", keywords: ["love", "hearts", "affection"] },
  { emoji: "😎", name: "Sunglasses", category: "Smileys", keywords: ["cool", "sunglasses", "summer"] },
  { emoji: "🤔", name: "Thinking", category: "Smileys", keywords: ["think", "hmm", "ponder"] },
  { emoji: "🙏", name: "Folded Hands", category: "Hands", keywords: ["pray", "thanks", "please"] },
  { emoji: "💀", name: "Skull", category: "Objects", keywords: ["dead", "death", "skull"] },
  { emoji: "🔥", name: "Fire", category: "Objects", keywords: ["fire", "hot", "trending"] },
  { emoji: "✨", name: "Sparkles", category: "Symbols", keywords: ["sparkle", "special", "magic"] },
  { emoji: "❤️", name: "Red Heart", category: "Hearts", keywords: ["heart", "love", "red"] },
  { emoji: "💔", name: "Broken Heart", category: "Hearts", keywords: ["broken", "heart", "sad"] },
  { emoji: "💕", name: "Two Hearts", category: "Hearts", keywords: ["hearts", "love", "two"] },
  { emoji: "💯", name: "Hundred Points", category: "Symbols", keywords: ["hundred", "perfect", "score"] },
  { emoji: "👍", name: "Thumbs Up", category: "Hands", keywords: ["thumbs", "up", "approve"] },
  { emoji: "👎", name: "Thumbs Down", category: "Hands", keywords: ["thumbs", "down", "dislike"] },
  { emoji: "👏", name: "Clapping", category: "Hands", keywords: ["clap", "applause", "praise"] },
  { emoji: "🙌", name: "Raised Hands", category: "Hands", keywords: ["raise", "hands", "praise"] },
  { emoji: "🤝", name: "Handshake", category: "Hands", keywords: ["handshake", "deal", "agree"] },
  { emoji: "💪", name: "Flexed Biceps", category: "Hands", keywords: ["muscle", "strong", "power"] },
  { emoji: "🌟", name: "Glowing Star", category: "Symbols", keywords: ["star", "glow", "special"] },
  { emoji: "⭐", name: "Star", category: "Symbols", keywords: ["star", "shine", "night"] },
  { emoji: "🌙", name: "Crescent Moon", category: "Symbols", keywords: ["moon", "night", "sleep"] },
  { emoji: "☀️", name: "Sun", category: "Symbols", keywords: ["sun", "sunny", "warm"] },
  { emoji: "🌈", name: "Rainbow", category: "Symbols", keywords: ["rainbow", "color", "hope"] },
  { emoji: "☁️", name: "Cloud", category: "Symbols", keywords: ["cloud", "weather", "sky"] },
  { emoji: "🌊", name: "Water Wave", category: "Symbols", keywords: ["wave", "ocean", "water"] },
  { emoji: "💧", name: "Droplet", category: "Symbols", keywords: ["drop", "water", "liquid"] },
  { emoji: "🌸", name: "Cherry Blossom", category: "Nature", keywords: ["flower", "blossom", "spring"] },
  { emoji: "🎉", name: "Party Popper", category: "Activities", keywords: ["party", "celebrate", "popper"] },
  { emoji: "🎊", name: "Confetti Ball", category: "Activities", keywords: ["confetti", "ball", "celebrate"] },
  { emoji: "🎁", name: "Wrapped Gift", category: "Activities", keywords: ["gift", "present", "wrap"] },
  { emoji: "🎂", name: "Birthday Cake", category: "Food", keywords: ["cake", "birthday", "celebrate"] },
  { emoji: "🎄", name: "Christmas Tree", category: "Activities", keywords: ["tree", "christmas", "holiday"] },
  { emoji: "🎃", name: "Jack-O-Lantern", category: "Activities", keywords: ["pumpkin", "halloween", "jack"] },
  { emoji: "🎈", name: "Balloon", category: "Activities", keywords: ["balloon", "party", "float"] },
  { emoji: "🎀", name: "Ribbon", category: "Activities", keywords: ["ribbon", "bow", "decorate"] },
  { emoji: "🎯", name: "Bullseye", category: "Activities", keywords: ["target", "bullseye", "goal"] },
  { emoji: "🎪", name: "Circus Tent", category: "Activities", keywords: ["circus", "tent", "carnival"] },
  { emoji: "🍕", name: "Pizza", category: "Food", keywords: ["pizza", "slice", "food"] },
  { emoji: "🍔", name: "Hamburger", category: "Food", keywords: ["burger", "hamburger", "food"] },
  { emoji: "🍟", name: "French Fries", category: "Food", keywords: ["fries", "potato", "food"] },
  { emoji: "🌭", name: "Hot Dog", category: "Food", keywords: ["hotdog", "sausage", "food"] },
  { emoji: "🍿", name: "Popcorn", category: "Food", keywords: ["popcorn", "movie", "snack"] },
  { emoji: "🧁", name: "Cupcake", category: "Food", keywords: ["cupcake", "cake", "sweet"] },
  { emoji: "🍰", name: "Shortcake", category: "Food", keywords: ["cake", "dessert", "sweet"] },
  { emoji: "🍫", name: "Chocolate Bar", category: "Food", keywords: ["chocolate", "candy", "sweet"] },
  { emoji: "🍬", name: "Candy", category: "Food", keywords: ["candy", "sweet", "sugar"] },
  { emoji: "🍭", name: "Lollipop", category: "Food", keywords: ["lollipop", "candy", "sweet"] },
  { emoji: "🐶", name: "Dog Face", category: "Animals", keywords: ["dog", "puppy", "pet"] },
  { emoji: "🐱", name: "Cat Face", category: "Animals", keywords: ["cat", "kitten", "pet"] },
  { emoji: "🐭", name: "Mouse Face", category: "Animals", keywords: ["mouse", "rodent", "animal"] },
  { emoji: "🐹", name: "Hamster", category: "Animals", keywords: ["hamster", "pet", "animal"] },
  { emoji: "🐰", name: "Rabbit Face", category: "Animals", keywords: ["rabbit", "bunny", "pet"] },
  { emoji: "🦊", name: "Fox", category: "Animals", keywords: ["fox", "animal", "wild"] },
  { emoji: "🐻", name: "Bear", category: "Animals", keywords: ["bear", "animal", "wild"] },
  { emoji: "🐼", name: "Panda", category: "Animals", keywords: ["panda", "bear", "animal"] },
  { emoji: "🐨", name: "Koala", category: "Animals", keywords: ["koala", "bear", "australia"] },
  { emoji: "🐯", name: "Tiger Face", category: "Animals", keywords: ["tiger", "cat", "wild"] },
  { emoji: "🦁", name: "Lion", category: "Animals", keywords: ["lion", "king", "wild"] },
  { emoji: "🐮", name: "Cow", category: "Animals", keywords: ["cow", "farm", "animal"] },
  { emoji: "🐷", name: "Pig", category: "Animals", keywords: ["pig", "farm", "animal"] },
  { emoji: "🐸", name: "Frog", category: "Animals", keywords: ["frog", "amphibian", "animal"] },
  { emoji: "🐵", name: "Monkey", category: "Animals", keywords: ["monkey", "primate", "animal"] },
  { emoji: "🐔", name: "Chicken", category: "Animals", keywords: ["chicken", "bird", "farm"] },
  { emoji: "🐧", name: "Penguin", category: "Animals", keywords: ["penguin", "bird", "antarctica"] },
  { emoji: "🐦", name: "Bird", category: "Animals", keywords: ["bird", "fly", "animal"] },
  { emoji: "🦆", name: "Duck", category: "Animals", keywords: ["duck", "bird", "water"] },
  { emoji: "🦅", name: "Eagle", category: "Animals", keywords: ["eagle", "bird", "predator"] },
  { emoji: "🦉", name: "Owl", category: "Animals", keywords: ["owl", "bird", "wise"] },
  { emoji: "🦇", name: "Bat", category: "Animals", keywords: ["bat", "animal", "night"] },
  { emoji: "🐺", name: "Wolf", category: "Animals", keywords: ["wolf", "animal", "wild"] },
  { emoji: "🐗", name: "Boar", category: "Animals", keywords: ["boar", "animal", "wild"] },
  { emoji: "🐴", name: "Horse", category: "Animals", keywords: ["horse", "animal", "farm"] },
  { emoji: "🦄", name: "Unicorn", category: "Animals", keywords: ["unicorn", "magic", "fantasy"] },
  { emoji: "🐝", name: "Honeybee", category: "Animals", keywords: ["bee", "insect", "honey"] },
  { emoji: "🐛", name: "Bug", category: "Animals", keywords: ["bug", "insect", "caterpillar"] },
  { emoji: "🦋", name: "Butterfly", category: "Animals", keywords: ["butterfly", "insect", "beautiful"] },
  { emoji: "🐌", name: "Snail", category: "Animals", keywords: ["snail", "slow", "shell"] },
  { emoji: "🐞", name: "Lady Beetle", category: "Animals", keywords: ["ladybug", "insect", "cute"] },
  { emoji: "🐜", name: "Ant", category: "Animals", keywords: ["ant", "insect", "small"] },
  { emoji: "🦟", name: "Mosquito", category: "Animals", keywords: ["mosquito", "insect", "bite"] },
  { emoji: "🦗", name: "Cricket", category: "Animals", keywords: ["cricket", "insect", "sound"] },
  { emoji: "🕷️", name: "Spider", category: "Animals", keywords: ["spider", "arachnid", "web"] },
  { emoji: "🦂", name: "Scorpion", category: "Animals", keywords: ["scorpion", "arachnid", "dangerous"] },
  { emoji: "🐢", name: "Turtle", category: "Animals", keywords: ["turtle", "slow", "shell"] },
  { emoji: "🐍", name: "Snake", category: "Animals", keywords: ["snake", "reptile", "dangerous"] },
  { emoji: "🦎", name: "Lizard", category: "Animals", keywords: ["lizard", "reptile", "animal"] },
  { emoji: "🦖", name: "T-Rex", category: "Animals", keywords: ["dinosaur", "trex", "extinct"] },
  { emoji: "🦕", name: "Sauropod", category: "Animals", keywords: ["dinosaur", "long", "extinct"] },
  { emoji: "🐙", name: "Octopus", category: "Animals", keywords: ["octopus", "sea", "tentacles"] },
  { emoji: "🦑", name: "Squid", category: "Animals", keywords: ["squid", "sea", "animal"] },
  { emoji: "🦐", name: "Shrimp", category: "Animals", keywords: ["shrimp", "sea", "food"] },
  { emoji: "🦞", name: "Lobster", category: "Animals", keywords: ["lobster", "sea", "food"] },
  { emoji: "🦀", name: "Crab", category: "Animals", keywords: ["crab", "sea", "shellfish"] },
  { emoji: "🐡", name: "Blowfish", category: "Animals", keywords: ["fish", "blowfish", "sea"] },
  { emoji: "🐠", name: "Tropical Fish", category: "Animals", keywords: ["fish", "tropical", "sea"] },
  { emoji: "🐟", name: "Fish", category: "Animals", keywords: ["fish", "sea", "animal"] },
  { emoji: "🦈", name: "Shark", category: "Animals", keywords: ["shark", "sea", "predator"] },
  { emoji: "🐬", name: "Dolphin", category: "Animals", keywords: ["dolphin", "sea", "smart"] },
  { emoji: "🐳", name: "Spouting Whale", category: "Animals", keywords: ["whale", "sea", "large"] },
  { emoji: "🐋", name: "Whale", category: "Animals", keywords: ["whale", "sea", "mammal"] },
  { emoji: "🦭", name: "Seal", category: "Animals", keywords: ["seal", "sea", "mammal"] },
  { emoji: "🐊", name: "Crocodile", category: "Animals", keywords: ["crocodile", "reptile", "dangerous"] },
  { emoji: "🐅", name: "Tiger", category: "Animals", keywords: ["tiger", "cat", "wild"] },
  { emoji: "🐆", name: "Leopard", category: "Animals", keywords: ["leopard", "cat", "wild"] },
  { emoji: "🦓", name: "Zebra", category: "Animals", keywords: ["zebra", "stripes", "wild"] },
  { emoji: "🦍", name: "Gorilla", category: "Animals", keywords: ["gorilla", "ape", "strong"] },
  { emoji: "🦧", name: "Orangutan", category: "Animals", keywords: ["orangutan", "ape", "animal"] },
  { emoji: "🐘", name: "Elephant", category: "Animals", keywords: ["elephant", "large", "trunk"] },
  { emoji: "🦛", name: "Hippopotamus", category: "Animals", keywords: ["hippo", "large", "water"] },
  { emoji: "🦏", name: "Rhinoceros", category: "Animals", keywords: ["rhino", "horn", "animal"] },
  { emoji: "🐪", name: "Camel", category: "Animals", keywords: ["camel", "desert", "hump"] },
  { emoji: "🐫", name: "Two-Hump Camel", category: "Animals", keywords: ["camel", "desert", "humps"] },
  { emoji: "🦒", name: "Giraffe", category: "Animals", keywords: ["giraffe", "tall", "spots"] },
  { emoji: "🦘", name: "Kangaroo", category: "Animals", keywords: ["kangaroo", "australia", "jump"] },
  { emoji: "🐃", name: "Water Buffalo", category: "Animals", keywords: ["buffalo", "animal", "farm"] },
  { emoji: "🐂", name: "Ox", category: "Animals", keywords: ["ox", "animal", "farm"] },
  { emoji: "🐄", name: "Cow", category: "Animals", keywords: ["cow", "animal", "farm"] },
  { emoji: "🐎", name: "Horse", category: "Animals", keywords: ["horse", "animal", "fast"] },
  { emoji: "🐖", name: "Pig", category: "Animals", keywords: ["pig", "animal", "farm"] },
  { emoji: "🐏", name: "Ram", category: "Animals", keywords: ["ram", "sheep", "animal"] },
  { emoji: "🐑", name: "Ewe", category: "Animals", keywords: ["sheep", "animal", "wool"] },
  { emoji: "🦙", name: "Llama", category: "Animals", keywords: ["llama", "animal", "wool"] },
  { emoji: "🐐", name: "Goat", category: "Animals", keywords: ["goat", "animal", "farm"] },
  { emoji: "🦌", name: "Deer", category: "Animals", keywords: ["deer", "animal", "antlers"] },
  { emoji: "🐕", name: "Dog", category: "Animals", keywords: ["dog", "pet", "animal"] },
  { emoji: "🐩", name: "Poodle", category: "Animals", keywords: ["poodle", "dog", "fancy"] },
  { emoji: "🦮", name: "Guide Dog", category: "Animals", keywords: ["dog", "guide", "service"] },
  { emoji: "🐕‍🦺", name: "Service Dog", category: "Animals", keywords: ["dog", "service", "help"] },
  { emoji: "🐈", name: "Cat", category: "Animals", keywords: ["cat", "pet", "animal"] },
  { emoji: "🐈‍⬛", name: "Black Cat", category: "Animals", keywords: ["cat", "black", "pet"] },
  { emoji: "🐓", name: "Rooster", category: "Animals", keywords: ["rooster", "chicken", "bird"] },
  { emoji: "🦃", name: "Turkey", category: "Animals", keywords: ["turkey", "bird", "thanksgiving"] },
  { emoji: "🦚", name: "Peacock", category: "Animals", keywords: ["peacock", "bird", "colorful"] },
  { emoji: "🦜", name: "Parrot", category: "Animals", keywords: ["parrot", "bird", "talk"] },
  { emoji: "🦢", name: "Swan", category: "Animals", keywords: ["swan", "bird", "elegant"] },
  { emoji: "🦩", name: "Flamingo", category: "Animals", keywords: ["flamingo", "bird", "pink"] },
  { emoji: "🕊️", name: "Dove", category: "Animals", keywords: ["dove", "bird", "peace"] },
  { emoji: "🐇", name: "Rabbit", category: "Animals", keywords: ["rabbit", "bunny", "animal"] },
  { emoji: "🦝", name: "Raccoon", category: "Animals", keywords: ["raccoon", "animal", "trash"] },
  { emoji: "🦨", name: "Skunk", category: "Animals", keywords: ["skunk", "animal", "smell"] },
  { emoji: "🦡", name: "Badger", category: "Animals", keywords: ["badger", "animal", "dig"] },
  { emoji: "🦦", name: "Otter", category: "Animals", keywords: ["otter", "animal", "water"] },
  { emoji: "🦥", name: "Sloth", category: "Animals", keywords: ["sloth", "animal", "slow"] },
  { emoji: "🐁", name: "Mouse", category: "Animals", keywords: ["mouse", "rodent", "small"] },
  { emoji: "🐀", name: "Rat", category: "Animals", keywords: ["rat", "rodent", "animal"] },
  { emoji: "🐿️", name: "Chipmunk", category: "Animals", keywords: ["chipmunk", "rodent", "cute"] },
  { emoji: "🦔", name: "Hedgehog", category: "Animals", keywords: ["hedgehog", "spiky", "cute"] },
  { emoji: "🐾", name: "Paw Prints", category: "Animals", keywords: ["paw", "prints", "animal"] },
  { emoji: "🐉", name: "Dragon", category: "Animals", keywords: ["dragon", "mythical", "fire"] },
  { emoji: "🐲", name: "Dragon Face", category: "Animals", keywords: ["dragon", "face", "mythical"] },
  { emoji: "🦴", name: "Bone", category: "Objects", keywords: ["bone", "dog", "skeleton"] },
  { emoji: "🦷", name: "Tooth", category: "Objects", keywords: ["tooth", "dental", "health"] },
  { emoji: "👁️", name: "Eye", category: "Body", keywords: ["eye", "see", "body"] },
  { emoji: "👀", name: "Eyes", category: "Body", keywords: ["eyes", "see", "looking"] },
  { emoji: "🧠", name: "Brain", category: "Body", keywords: ["brain", "smart", "think"] },
  { emoji: "🫀", name: "Anatomical Heart", category: "Body", keywords: ["heart", "organ", "body"] },
  { emoji: "🫁", name: "Lungs", category: "Body", keywords: ["lungs", "organ", "breathe"] },
  { emoji: "🦠", name: "Microbe", category: "Objects", keywords: ["microbe", "germ", "virus"] },
]

const CATEGORIES = ["All", "Smileys", "Hearts", "Hands", "Animals", "Food", "Nature", "Symbols", "Activities", "Objects", "Body"]

export default function RandomEmoji() {
  const [randomEmoji, setRandomEmoji] = useState<EmojiItem | null>(null)
  const [history, setHistory] = useState<EmojiItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinResult, setSpinResult] = useState<EmojiItem[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [wheelRotation, setWheelRotation] = useState(0)

  const generateRandom = useCallback(() => {
    const filtered = selectedCategory === "All"
      ? EMOJI_DATA
      : EMOJI_DATA.filter((e) => e.category === selectedCategory)
    
    const random = filtered[Math.floor(Math.random() * filtered.length)]
    setRandomEmoji(random)
    setHistory((prev) => [random, ...prev].slice(0, 10))
  }, [selectedCategory])

  const generateMultiple = useCallback((count: number) => {
    const filtered = selectedCategory === "All"
      ? EMOJI_DATA
      : EMOJI_DATA.filter((e) => e.category === selectedCategory)
    
    const results: EmojiItem[] = []
    for (let i = 0; i < count; i++) {
      const random = filtered[Math.floor(Math.random() * filtered.length)]
      results.push(random)
    }
    setSpinResult(results)
  }, [selectedCategory])

  const spinWheel = useCallback(() => {
    setIsSpinning(true)
    setWheelRotation((prev) => prev + 720 + Math.random() * 360)
    
    setTimeout(() => {
      generateMultiple(5)
      setIsSpinning(false)
    }, 2000)
  }, [generateMultiple])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="single" className="text-sm px-4 py-2">
            <Sparkles className="size-4 mr-2" />
            Single Random
          </TabsTrigger>
          <TabsTrigger value="wheel" className="text-sm px-4 py-2">
            <Shuffle className="size-4 mr-2" />
            Spin Wheel
          </TabsTrigger>
          <TabsTrigger value="multiple" className="text-sm px-4 py-2">
            <Star className="size-4 mr-2" />
            Multiple
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-6 mt-4">
          {/* Category Filter */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-muted-foreground" />
              <Label className="text-base font-medium">Category Filter</Label>
            </div>
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

          {/* Generate Button */}
          <Button onClick={generateRandom} className="w-full sm:w-auto">
            <Shuffle className="size-4 mr-2" />
            Generate Random Emoji
          </Button>

          {/* Result */}
          {randomEmoji && (
            <section className="space-y-4">
              <div className="rounded-lg border bg-muted/30 p-8 flex flex-col items-center justify-center">
                <span className="text-9xl mb-4">{randomEmoji.emoji}</span>
                <h3 className="text-xl font-semibold">{randomEmoji.name}</h3>
                <p className="text-sm text-muted-foreground">{randomEmoji.category}</p>
                <div className="flex flex-wrap gap-1 mt-2 justify-center">
                  {randomEmoji.keywords.map((keyword) => (
                    <span key={keyword} className="text-xs px-2 py-0.5 bg-muted rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(randomEmoji.emoji, "emoji")}
                >
                  {copied === "emoji" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy Emoji
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(`${randomEmoji.emoji} ${randomEmoji.name}`, "name")}
                >
                  {copied === "name" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy with Name
                </Button>
              </div>
            </section>
          )}

          {/* History */}
          {history.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  <History className="size-4" />
                  Recent Emojis
                </Label>
                <Button variant="ghost" size="sm" onClick={clearHistory}>
                  Clear
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(item.emoji, `history-${idx}`)}
                    className="text-3xl p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    title={item.name}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            </section>
          )}
        </TabsContent>

        <TabsContent value="wheel" className="space-y-6 mt-4">
          {/* Spin Wheel */}
          <section className="space-y-4">
            <div className="flex items-center justify-center">
              <div
                className={cn(
                  "w-48 h-48 rounded-full border-4 border-primary flex items-center justify-center transition-transform duration-1000",
                  isSpinning && "animate-spin"
                )}
                style={{ transform: `rotate(${wheelRotation}deg)` }}
              >
                <div className="text-center">
                  <Shuffle className="size-12 mx-auto mb-2" />
                  <p className="font-medium">Spin!</p>
                </div>
              </div>
            </div>
            <Button onClick={spinWheel} disabled={isSpinning} className="w-full sm:w-auto">
              <Shuffle className="size-4 mr-2" />
              {isSpinning ? "Spinning..." : "Spin the Wheel"}
            </Button>
          </section>

          {/* Results */}
          {spinResult.length > 0 && !isSpinning && (
            <section className="space-y-3">
              <Label className="text-base font-medium">Wheel Results</Label>
              <div className="grid grid-cols-5 gap-4">
                {spinResult.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(item.emoji, `wheel-${idx}`)}
                    className="rounded-lg border p-4 text-center hover:bg-muted/50 transition-all"
                  >
                    <span className="text-4xl">{item.emoji}</span>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{item.name}</p>
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(spinResult.map((e) => e.emoji).join(" "), "all")}
              >
                {copied === "all" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy All
              </Button>
            </section>
          )}
        </TabsContent>

        <TabsContent value="multiple" className="space-y-6 mt-4">
          {/* Category Filter */}
          <section className="space-y-3">
            <Label className="text-base font-medium">Category</Label>
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

          {/* Generate Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => generateMultiple(5)}>Generate 5</Button>
            <Button onClick={() => generateMultiple(10)}>Generate 10</Button>
            <Button onClick={() => generateMultiple(20)}>Generate 20</Button>
          </div>

          {/* Results */}
          {spinResult.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Generated Emojis ({spinResult.length})</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(spinResult.map((e) => e.emoji).join(" "), "multi")}
                >
                  {copied === "multi" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy All
                </Button>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-3xl break-words">{spinResult.map((e) => e.emoji).join(" ")}</p>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {spinResult.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(item.emoji, `multi-${idx}`)}
                    className="aspect-square flex items-center justify-center text-2xl hover:bg-muted rounded-lg transition-colors"
                    title={item.name}
                  >
                    {copied === `multi-${idx}` ? <Check className="size-5 text-green-600" /> : item.emoji}
                  </button>
                ))}
              </div>
            </section>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

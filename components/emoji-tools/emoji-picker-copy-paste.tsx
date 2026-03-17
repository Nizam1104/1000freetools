"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Copy, Check, Search, Smile, Heart, Hand, Activity, Flag, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmojiCategory {
  id: string
  name: string
  icon: React.ReactNode
  emojis: string[]
}

const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    id: "smileys",
    name: "Smileys & Emotion",
    icon: <Smile className="size-4" />,
    emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖"],
  },
  {
    id: "hearts",
    name: "Hearts & Love",
    icon: <Heart className="size-4" />,
    emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "💌", "💋"],
  },
  {
    id: "hands",
    name: "Hands & Gestures",
    icon: <Hand className="size-4" />,
    emojis: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "💅", "🤳", "💪"],
  },
  {
    id: "animals",
    name: "Animals & Nature",
    icon: <Activity className="size-4" />,
    emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷️", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🦈", "🐬", "🐳", "🐋", "🦭", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🐈", "🐓", "🦃", "🦚", "🦜", "🦢", "🦩", "🕊️", "🐇", "🦝", "🦨", "🦡", "🦦", "🦥", "🐁", "🐀", "🐿️", "🦔", "🌵", "🎄", "🌲", "🌳", "🌴", "🌱", "🌿", "☘️", "🍀", "🎍", "🎋", "🍃", "🍂", "🍁", "🍄", "🐚", "🌾", "💐", "🌷", "🌹", "🥀", "🌺", "🌸", "🌼", "🌻", "🌞", "🌝", "🌛", "🌜", "🌚", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "🌙", "🌎", "🌍", "🌏", "💫", "⭐", "🌟", "🌠", "🌌", "☁️", "⛅", "⛈️", "🌤️", "🌥️", "🌦️", "🌧️", "🌨️", "🌩️", "🌪️", "🌫️", "🌬️", "🌀", "🌈", "🌂", "☂️", "☔", "⛱️", "⚡", "❄️", "☃️", "⛄", "☄️", "🔥", "💧", "🌊"],
  },
  {
    id: "food",
    name: "Food & Drink",
    icon: <Heart className="size-4" />,
    emojis: ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🫐", "🥝", "🍅", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️", "🥒", "🥬", "🥦", "🧄", "🧅", "🍄", "🥜", "🍞", "🥐", "🥖", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🥙", "🥚", "🍳", "🥘", "🍲", "🥣", "🥗", "🍿", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🍡", "🥟", "🥡", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧋", "🧃", "🧉", "🧊"],
  },
  {
    id: "activities",
    name: "Activities & Sports",
    icon: <Activity className="size-4" />,
    emojis: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🥅", "⛳", "🪁", "🏹", "🎣", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌", "🎿", "🏂", "🏋️", "🤼", "🤸", "⛹️", "🤺", "🤾", "🏌️", "🏇", "🧘", "🏄", "🏊", "🤽", "🚣", "🧗", "🚵", "🚴", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎗️", "🎫", "🎟️", "🎪", "🤹", "🎭", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🎻", "🎲", "♟️", "🎯", "🎳", "🎮", "🎰", "🧩"],
  },
  {
    id: "travel",
    name: "Travel & Places",
    icon: <Flag className="size-4" />,
    emojis: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🛴", "🚲", "🛵", "🏍️", "🚨", "🚔", "🚍", "🚘", "🚖", "🚡", "🚠", "🚟", "🚃", "🚋", "🚞", "🚝", "🚄", "🚅", "🚈", "🚂", "🚆", "🚇", "🚊", "🚉", "✈️", "🛫", "🛬", "🛩️", "💺", "🛰️", "🚀", "🛸", "🚁", "🛶", "⛵", "🚤", "🛥️", "🛳️", "⛴️", "🚢", "⚓", "⛽", "🚧", "🚦", "🚥", "🚏", "🗺️", "🗿", "🗽", "🗼", "🏰", "🏯", "🏟️", "🎡", "🎢", "🎠", "⛲", "⛱️", "🏖️", "🏝️", "🏜️", "🌋", "⛰️", "🏔️", "🗻", "🏕️", "⛺", "🏠", "🏡", "🏘️", "🏗️", "🏭", "🏢", "🏬", "🏣", "🏤", "🏥", "🏦", "🏨", "🏪", "🏫", "🏩", "💒", "🏛️", "⛪", "🕌", "🕍", "🕋"],
  },
  {
    id: "objects",
    name: "Objects",
    icon: <Smile className="size-4" />,
    emojis: ["⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🕹️", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙️", "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🔌", "💡", "🔦", "🕯️", "🧯", "💸", "💵", "💴", "💶", "💷", "💰", "💳", "💎", "⚖️", "🧰", "🔧", "🔨", "⛏️", "🔩", "⚙️", "🧲", "🔫", "💣", "🔪", "🗡️", "⚔️", "🛡️", "🚬", "⚰️", "🏺", "🔮", "📿", "💈", "🔭", "🔬", "💊", "💉", "🩸", "🧬", "🦠", "🧫", "🧪", "🌡️", "🧹", "🧺", "🧻", "🚽", "🚰", "🚿", "🛁", "🛀", "🧼", "🧽", "🧴", "🛎️", "🔑", "🗝️", "🚪", "🪑", "🛋️", "🛏️", "🛌", "🧸", "🖼️", "🪞", "🪟", "🛍️", "🛒", "🎁", "🎈", "🎏", "🎀", "🎊", "🎉", "🎎", "🏮", "🎐", "🧧", "✉️", "📩", "📨", "📧", "💌", "📥", "📤", "📦", "🏷️", "📪", "📫", "📬", "📭", "📮", "📯", "📜", "📃", "📄", "📑", "📊", "📈", "📉", "🗒️", "🗓️", "📆", "📅", "🗑️", "📇", "🗃️", "🗳️", "🗄️", "📋", "📁", "📂", "📰", "📓", "📔", "📒", "📕", "📗", "📘", "📙", "📚", "📖", "🔖", "🔗", "📎", "📐", "📏", "📌", "📍", "✂️", "🖊️", "🖋️", "✒️", "🖌️", "🖍️", "📝", "✏️", "🔍", "🔎", "🔏", "🔐", "🔒", "🔓"],
  },
  {
    id: "symbols",
    name: "Symbols",
    icon: <Heart className="size-4" />,
    emojis: ["☮️", "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️", "📴", "📳", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️", "🆚", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "❌", "⭕", "🛑", "⛔", "📛", "🚫", "💯", "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "🚭", "❗", "❕", "❓", "❔", "‼️", "⁉️", "🔅", "🔆", "〽️", "⚠️", "🚸", "🔱", "⚜️", "🔰", "♻️", "✅", "🈯", "💹", "❇️", "✳️", "❎", "🌐", "💠", "Ⓜ️", "🌀", "💤", "🏧", "🚾", "♿", "🅿️", "🛗", "🈳", "🈂️", "🛂", "🛃", "🛄", "🛅", "🚹", "🚺", "🚼", "⚧️", "🚻", "🚮", "🎦", "📶", "🈁", "🔣", "ℹ️", "🔤", "🔡", "🔠", "🆖", "🆗", "🆙", "🆒", "🆕", "🆓", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔢", "#️⃣", "*️⃣", "⏏️", "▶️", "⏸️", "⏯️", "⏹️", "⏺️", "⏭️", "⏮️", "⏩", "⏪", "⏫", "⏬", "◀️", "🔼", "🔽", "➡️", "⬅️", "⬆️", "⬇️", "↗️", "↘️", "↙️", "↖️", "🔄", "↪️", "↩️", "🔃", "🔁", "🔂", "🔀", "🎵", "🎶", "➕", "➖", "➗", "✖️", "♾️", "💲", "💱", "™️", "©️", "®️", "〰️", "➰", "➿", "✔️", "☑️", "🔘", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", "⚫", "⚪", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫", "⬛", "⬜", "◼️", "◻️", "◾", "◽", "▪️", "▫️", "🔶", "🔷", "🔸", "🔹", "🔺", "🔻", "💥", "💫", "💦", "💨", "💣", "💬", "💭", "💤"],
  },
  {
    id: "flags",
    name: "Flags",
    icon: <Flag className="size-4" />,
    emojis: ["🏁", "🚩", "🎌", "🏴", "🏳️", "🏳️‍🌈", "🏳️‍⚧️", "🏴‍☠️", "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇩🇪", "🇫🇷", "🇮🇹", "🇪🇸", "🇯🇵", "🇨🇳", "🇮🇳", "🇧🇷", "🇲🇽", "🇰🇷", "🇷🇺", "🇿🇦", "🇳🇬", "🇪🇬", "🇸🇦", "🇦🇪", "🇹🇷", "🇬🇷", "🇸🇪", "🇳🇴", "🇩🇰", "🇫🇮", "🇵🇱", "🇳🇱", "🇧🇪", "🇨🇭", "🇦🇹", "🇵🇹", "🇮🇪", "🇳🇿", "🇸🇬", "🇲🇾", "🇹🇭", "🇻🇳", "🇵🇭", "🇮🇩", "🇦🇷", "🇨🇱", "🇨🇴", "🇵🇪", "🇻🇪"],
  },
]

export default function EmojiPickerCopyPaste() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("smileys")
  const [copied, setCopied] = useState<string | null>(null)
  const [recentEmojis, setRecentEmojis] = useState<string[]>([])
  const [outputText, setOutputText] = useState("")

  const filteredEmojis = useMemo(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const allEmojis = EMOJI_CATEGORIES.flatMap((cat) => cat.emojis)
      return allEmojis.filter((emoji) => emoji.includes(query))
    }
    const category = EMOJI_CATEGORIES.find((cat) => cat.id === selectedCategory)
    return category?.emojis || []
  }, [searchQuery, selectedCategory])

  const copyToClipboard = useCallback(async (emoji: string, key: string) => {
    try {
      await navigator.clipboard.writeText(emoji)
      setCopied(key)
      setRecentEmojis((prev) => {
        const updated = [emoji, ...prev.filter((e) => e !== emoji)].slice(0, 20)
        return updated
      })
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const insertEmoji = useCallback((emoji: string) => {
    setOutputText((prev) => prev + emoji)
    setRecentEmojis((prev) => {
      const updated = [emoji, ...prev.filter((e) => e !== emoji)].slice(0, 20)
      return updated
    })
  }, [])

  const copyOutput = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      setCopied("output")
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [outputText])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="picker" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="picker" className="text-sm px-4 py-2">Picker</TabsTrigger>
          <TabsTrigger value="recent" className="text-sm px-4 py-2">
            <Clock className="size-4 mr-2" />
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="picker" className="space-y-6 mt-4">
          {/* Output Text Area */}
          <section className="space-y-3">
            <Label htmlFor="output-text" className="text-base font-medium">Your Text</Label>
            <div className="flex gap-2">
              <Input id="output-text" value={outputText} onChange={(e) => setOutputText(e.target.value)} className="flex-1" placeholder="Click emojis to add them here..." />
              <Button variant="outline" onClick={copyOutput}>
                {copied === "output" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </section>

          {/* Search */}
          <section className="space-y-3">
            <Label htmlFor="emoji-search" className="text-base font-medium">Search Emojis</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input id="emoji-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" placeholder="Search emojis by name or symbol..." />
            </div>
          </section>

          {/* Category Tabs */}
          {!searchQuery && (
            <section className="space-y-3">
              <div className="flex flex-wrap gap-1 border-b pb-2">
                {EMOJI_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn("flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors", selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-muted")}
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.name}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Emoji Grid */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">{filteredEmojis.length} emoji{filteredEmojis.length !== 1 ? "s" : ""}</h3>
            </div>

            {filteredEmojis.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-sm">No emojis found</p>
              </div>
            ) : (
              <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-1">
                {filteredEmojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => insertEmoji(emoji)}
                    className="aspect-square flex items-center justify-center text-xl hover:bg-muted rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    title={`Insert ${emoji}`}
                  >
                    {copied === emoji ? <Check className="size-4 text-green-600" /> : emoji}
                  </button>
                ))}
              </div>
            )}
          </section>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6 mt-4">
          {recentEmojis.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">No recent emojis. Click on emojis to add them here.</p>
            </div>
          ) : (
            <section className="space-y-3">
              <Label className="text-base font-medium">Recent Emojis</Label>
              <div className="grid grid-cols-8 sm:grid-cols-12 gap-2">
                {recentEmojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => insertEmoji(emoji)}
                    className="aspect-square flex items-center justify-center text-2xl hover:bg-muted rounded transition-colors"
                  >
                    {emoji}
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

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Package, Check, Copy, Filter, Layers, Image } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmojiPack {
  id: string
  name: string
  description: string
  emojis: string[]
  count: number
}

interface SkinTone {
  id: string
  name: string
  modifier: string
}

const EMOJI_PACKS: EmojiPack[] = [
  {
    id: "smileys",
    name: "Smileys & Emotion",
    description: "Happy, sad, and expressive faces",
    emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖"],
    count: 80,
  },
  {
    id: "hearts",
    name: "Hearts & Love",
    description: "All types of hearts and love symbols",
    emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "💌", "💋", "💑", "💏"],
    count: 23,
  },
  {
    id: "hands",
    name: "Hands & Gestures",
    description: "Hand signs and gestures",
    emojis: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "💅", "🤳", "💪"],
    count: 34,
  },
  {
    id: "animals",
    name: "Animals & Nature",
    description: "Animals, plants, and nature",
    emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷️", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🦈", "🐬", "🐳", "🐋", "🦭", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🐈", "🐓", "🦃", "🦚", "🦜", "🦢", "🦩", "🕊️", "🐇", "🦝", "🦨", "🦡", "🦦", "🦥", "🐁", "🐀", "🐿️", "🦔"],
    count: 96,
  },
  {
    id: "food",
    name: "Food & Drink",
    description: "Delicious food and beverages",
    emojis: ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🫐", "🥝", "🍅", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️", "🥒", "🥬", "🥦", "🧄", "🧅", "🍄", "🥜", "🍞", "🥐", "🥖", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🥙", "🥚", "🍳", "🥘", "🍲", "🥣", "🥗", "🍿", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🍡", "🥟", "🥡", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤"],
    count: 95,
  },
  {
    id: "activities",
    name: "Activities & Sports",
    description: "Sports, games, and activities",
    emojis: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🥅", "⛳", "🪁", "🏹", "🎣", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌", "🎿", "🏂", "🏋️", "🤼", "🤸", "⛹️", "🤺", "🤾", "🏌️", "🏇", "🧘", "🏄", "🏊", "🤽", "🚣", "🧗", "🚵", "🚴", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎗️", "🎫", "🎟️", "🎪", "🤹", "🎭", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🎻", "🎲", "♟️", "🎯", "🎳", "🎮", "🎰", "🧩"],
    count: 83,
  },
  {
    id: "travel",
    name: "Travel & Places",
    description: "Vehicles, buildings, and locations",
    emojis: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🛴", "🚲", "🛵", "🏍️", "🚨", "🚔", "🚍", "🚘", "🚖", "🚡", "🚠", "🚟", "🚃", "🚋", "🚞", "🚝", "🚄", "🚅", "🚈", "🚂", "🚆", "🚇", "🚊", "🚉", "✈️", "🛫", "🛬", "🛩️", "💺", "🛰️", "🚀", "🛸", "🚁", "🛶", "⛵", "🚤", "🛥️", "🛳️", "⛴️", "🚢", "⚓", "⛽", "🚧", "🚦", "🚥", "🚏", "🗺️", "🗿", "🗽", "🗼", "🏰", "🏯", "🏟️", "🎡", "🎢", "🎠", "⛲", "⛱️", "🏖️", "🏝️", "🏜️", "🌋", "⛰️", "🏔️", "🗻", "🏕️", "⛺", "🏠", "🏡", "🏘️", "🏗️", "🏭", "🏢", "🏬", "🏣", "🏤", "🏥", "🏦", "🏨", "🏪", "🏫", "🏩", "💒", "🏛️", "⛪", "🕌", "🕍", "🕋"],
    count: 106,
  },
  {
    id: "objects",
    name: "Objects",
    description: "Everyday objects and items",
    emojis: ["⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🕹️", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙️", "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🔌", "💡", "🔦", "🕯️", "🧯", "💸", "💵", "💴", "💶", "💷", "💰", "💳", "💎", "⚖️", "🧰", "🔧", "🔨", "⛏️", "🔩", "⚙️", "🧲", "🔫", "💣", "🔪", "🗡️", "⚔️", "🛡️", "🚬", "⚰️", "🏺", "🔮", "📿", "💈", "🔭", "🔬", "💊", "💉", "🩸", "🧬", "🦠", "🧫", "🧪", "🌡️", "🧹", "🧺", "🧻", "🚽", "🚰", "🚿", "🛁", "🛀", "🧼", "🧽", "🧴", "🛎️", "🔑", "🗝️", "🚪", "🪑", "🛋️", "🛏️", "🛌", "🧸", "🖼️", "🪞", "🪟", "🛍️", "🛒", "🎁", "🎈", "🎏", "🎀", "🎊", "🎉", "🎎", "🏮", "🎐", "🧧", "✉️", "📩", "📨", "📧", "💌", "📥", "📤", "📦", "🏷️", "📪", "📫", "📬", "📭", "📮", "📯", "📜", "📃", "📄", "📑", "📊", "📈", "📉", "🗒️", "🗓️", "📆", "📅", "🗑️", "📇", "🗃️", "🗳️", "🗄️", "📋", "📁", "📂", "📰", "📓", "📔", "📒", "📕", "📗", "📘", "📙", "📚", "📖", "🔖", "🔗", "📎", "📐", "📏", "📌", "📍", "✂️", "🖊️", "🖋️", "✒️", "🖌️", "🖍️", "📝", "✏️", "🔍", "🔎", "🔏", "🔐", "🔒", "🔓"],
    count: 160,
  },
  {
    id: "symbols",
    name: "Symbols",
    description: "Symbols, signs, and icons",
    emojis: ["☮️", "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️", "📴", "📳", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️", "🆚", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "❌", "⭕", "🛑", "⛔", "📛", "🚫", "💯", "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "🚭", "❗", "❕", "❓", "❔", "‼️", "⁉️", "🔅", "🔆", "〽️", "⚠️", "🚸", "🔱", "⚜️", "🔰", "♻️", "✅", "🈯", "💹", "❇️", "✳️", "❎", "🌐", "💠", "Ⓜ️", "🌀", "💤", "🏧", "🚾", "♿", "🅿️", "🛗", "🈳", "🈂️", "🛂", "🛃", "🛄", "🛅", "🚹", "🚺", "🚼", "⚧️", "🚻", "🚮", "🎦", "📶", "🈁", "🔣", "ℹ️", "🔤", "🔡", "🔠", "🆖", "🆗", "🆙", "🆒", "🆕", "🆓", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔢", "#️⃣", "*️⃣", "⏏️", "▶️", "⏸️", "⏯️", "⏹️", "⏺️", "⏭️", "⏮️", "⏩", "⏪", "⏫", "⏬", "◀️", "🔼", "🔽", "➡️", "⬅️", "⬆️", "⬇️", "↗️", "↘️", "↙️", "↖️", "🔄", "↪️", "↩️", "🔃", "🔁", "🔂", "🔀", "🎵", "🎶", "➕", "➖", "➗", "✖️", "♾️", "💲", "💱", "™️", "©️", "®️", "〰️", "➰", "➿", "✔️", "☑️", "🔘", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", "⚫", "⚪", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫", "⬛", "⬜", "◼️", "◻️", "◾", "◽", "▪️", "▫️", "🔶", "🔷", "🔸", "🔹", "🔺", "🔻", "💥", "💫", "💦", "💨", "💣", "💬", "💭", "💤"],
    count: 200,
  },
  {
    id: "flags",
    name: "Flags",
    description: "Country and regional flags",
    emojis: ["🏁", "🚩", "🎌", "🏴", "🏳️", "🏳️‍🌈", "🏳️‍⚧️", "🏴‍☠️", "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇩🇪", "🇫🇷", "🇮🇹", "🇪🇸", "🇯🇵", "🇨🇳", "🇮🇳", "🇧🇷", "🇲🇽", "🇰🇷", "🇷🇺", "🇿🇦", "🇳🇬", "🇪🇬", "🇸🇦", "🇦🇪", "🇹🇷", "🇬🇷", "🇸🇪", "🇳🇴", "🇩🇰", "🇫🇮", "🇵🇱", "🇳🇱", "🇧🇪", "🇨🇭", "🇦🇹", "🇵🇹", "🇮🇪", "🇳🇿", "🇸🇬", "🇲🇾", "🇹🇭", "🇻🇳", "🇵🇭", "🇮🇩", "🇦🇷", "🇨🇱", "🇨🇴", "🇵🇪", "🇻🇪"],
    count: 53,
  },
]

const SKIN_TONES: SkinTone[] = [
  { id: "default", name: "Default", modifier: "" },
  { id: "light", name: "Light", modifier: "🏻" },
  { id: "medium-light", name: "Medium-Light", modifier: "🏼" },
  { id: "medium", name: "Medium", modifier: "🏽" },
  { id: "medium-dark", name: "Medium-Dark", modifier: "🏾" },
  { id: "dark", name: "Dark", modifier: "🏿" },
]

const SIZE_OPTIONS = [
  { id: "small", name: "Small (64x64)", size: 64 },
  { id: "medium", name: "Medium (128x128)", size: 128 },
  { id: "large", name: "Large (256x256)", size: 256 },
  { id: "xlarge", name: "Extra Large (512x512)", size: 512 },
]

export default function BulkEmojiDownloader() {
  const [selectedPacks, setSelectedPacks] = useState<string[]>([])
  const [selectedSkinTone, setSelectedSkinTone] = useState("default")
  const [selectedSize, setSelectedSize] = useState(128)
  const [outputFormat, setOutputFormat] = useState<"png" | "svg" | "json" | "text">("png")
  const [isDownloading, setIsDownloading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const togglePack = useCallback((packId: string) => {
    setSelectedPacks((prev) =>
      prev.includes(packId) ? prev.filter((id) => id !== packId) : [...prev, packId]
    )
  }, [])

  const selectAll = useCallback(() => {
    setSelectedPacks(EMOJI_PACKS.map((p) => p.id))
  }, [])

  const deselectAll = useCallback(() => {
    setSelectedPacks([])
  }, [])

  const getSelectedEmojis = useCallback(() => {
    const emojis = EMOJI_PACKS.filter((p) => selectedPacks.includes(p.id))
      .flatMap((p) => p.emojis)

    const skinTone = SKIN_TONES.find((t) => t.id === selectedSkinTone)?.modifier || ""
    if (skinTone) {
      return emojis.map((emoji) => {
        const handEmojis = ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "💅", "🤳", "💪"]
        if (handEmojis.includes(emoji.replace(/\uFE0F/g, ""))) {
          return emoji.replace(/\uFE0F/g, "") + skinTone
        }
        return emoji
      })
    }
    return emojis
  }, [selectedPacks, selectedSkinTone])

  const downloadPack = useCallback(async () => {
    setIsDownloading(true)
    const emojis = getSelectedEmojis()

    if (outputFormat === "text") {
      const content = emojis.join(" ")
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = "emoji-pack.txt"
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } else if (outputFormat === "json") {
      const content = JSON.stringify({ emojis, count: emojis.length, skinTone: selectedSkinTone, size: selectedSize }, null, 2)
      const blob = new Blob([content], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = "emoji-pack.json"
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } else {
      setTimeout(() => {
        alert(`Would download ${emojis.length} emojis as ${outputFormat.toUpperCase()} at ${selectedSize}x${selectedSize}px`)
        setIsDownloading(false)
      }, 1000)
      return
    }

    setIsDownloading(false)
  }, [getSelectedEmojis, outputFormat, selectedSkinTone, selectedSize])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const selectedEmojis = getSelectedEmojis()
  const totalEmojis = selectedEmojis.length

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="select" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="select" className="text-sm px-4 py-2">
            <Package className="size-4 mr-2" />
            Select Packs
          </TabsTrigger>
          <TabsTrigger value="preview" className="text-sm px-4 py-2">
            <Layers className="size-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="export" className="text-sm px-4 py-2">
            <Download className="size-4 mr-2" />
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="select" className="space-y-6 mt-4">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-muted-foreground" />
              <Label className="text-base font-medium">Select Emoji Packs</Label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAll}>Select All</Button>
              <Button variant="outline" size="sm" onClick={deselectAll}>Deselect All</Button>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMOJI_PACKS.map((pack) => (
              <Card
                key={pack.id}
                className={cn(
                  "cursor-pointer transition-all",
                  selectedPacks.includes(pack.id) && "border-primary bg-muted/50"
                )}
                onClick={() => togglePack(pack.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedPacks.includes(pack.id)}
                        onCheckedChange={() => togglePack(pack.id)}
                      />
                      <CardTitle className="text-base">{pack.name}</CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground">{pack.count} emojis</span>
                  </div>
                  <CardDescription>{pack.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {pack.emojis.slice(0, 12).map((emoji, idx) => (
                      <span key={idx} className="text-lg">{emoji}</span>
                    ))}
                    {pack.emojis.length > 12 && (
                      <span className="text-xs text-muted-foreground self-center">+{pack.emojis.length - 12} more</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {totalEmojis > 0 && (
            <section className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Selected: {totalEmojis} emojis</p>
                  <p className="text-sm text-muted-foreground">from {selectedPacks.length} pack{selectedPacks.length !== 1 ? "s" : ""}</p>
                </div>
                <Button onClick={() => {}}>Continue to Export</Button>
              </div>
            </section>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-6 mt-4">
          {totalEmojis === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="size-12 mx-auto mb-4 opacity-50" />
              <p>Select emoji packs to preview</p>
            </div>
          ) : (
            <>
              <section className="space-y-3">
                <Label className="text-base font-medium">Skin Tone Preview</Label>
                <div className="flex flex-wrap gap-4 p-4 rounded-lg border bg-muted/30">
                  {["👍", "👋", "🙏", "👏", "✊"].map((emoji, idx) => {
                    const modifier = SKIN_TONES.find((t) => t.id === selectedSkinTone)?.modifier || ""
                    return (
                      <div key={idx} className="text-center">
                        <span className="text-4xl">{emoji + modifier}</span>
                      </div>
                    )
                  })}
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">All Selected Emojis ({totalEmojis})</Label>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(selectedEmojis.join(""), "all")}>
                    {copied === "all" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                    Copy All
                  </Button>
                </div>
                <div className="rounded-lg border bg-background p-4">
                  <p className="text-2xl break-words leading-relaxed">{selectedEmojis.join(" ")}</p>
                </div>
              </section>
            </>
          )}
        </TabsContent>

        <TabsContent value="export" className="space-y-6 mt-4">
          {totalEmojis === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Download className="size-12 mx-auto mb-4 opacity-50" />
              <p>Select emoji packs to export</p>
            </div>
          ) : (
            <>
              <section className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Settings</CardTitle>
                    <CardDescription>Configure your emoji pack export</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Skin Tone Modifier</Label>
                      <div className="flex flex-wrap gap-2">
                        {SKIN_TONES.map((tone) => (
                          <Button
                            key={tone.id}
                            variant={selectedSkinTone === tone.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedSkinTone(tone.id)}
                          >
                            {tone.modifier || "👋"} {tone.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Image Size (for PNG/SVG)</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {SIZE_OPTIONS.map((size) => (
                          <Button
                            key={size.id}
                            variant={selectedSize === size.size ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedSize(size.size)}
                          >
                            {size.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Output Format</Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: "png", name: "PNG", icon: <Image className="size-4" /> },
                          { id: "svg", name: "SVG", icon: <Image className="size-4" /> },
                          { id: "json", name: "JSON", icon: <Package className="size-4" /> },
                          { id: "text", name: "Text", icon: <Copy className="size-4" /> },
                        ].map((format) => (
                          <Button
                            key={format.id}
                            variant={outputFormat === format.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setOutputFormat(format.id as typeof outputFormat)}
                          >
                            {format.icon}<span className="ml-2">{format.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="rounded-lg border bg-muted/30 p-4">
                <h4 className="font-medium mb-3">Export Summary</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div><p className="text-muted-foreground">Total Emojis</p><p className="text-2xl font-bold">{totalEmojis}</p></div>
                  <div><p className="text-muted-foreground">Packs</p><p className="text-2xl font-bold">{selectedPacks.length}</p></div>
                  <div><p className="text-muted-foreground">Size</p><p className="text-2xl font-bold">{selectedSize}px</p></div>
                  <div><p className="text-muted-foreground">Format</p><p className="text-2xl font-bold uppercase">{outputFormat}</p></div>
                </div>
              </section>

              <Button onClick={downloadPack} disabled={isDownloading} size="lg" className="w-full sm:w-auto">
                <Download className="size-5 mr-2" />
                {isDownloading ? "Preparing Download..." : `Download ${totalEmojis} Emojis`}
              </Button>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => copyToClipboard(selectedEmojis.join(" "), "emojis")}>
                  {copied === "emojis" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy Emojis
                </Button>
                <Button variant="outline" onClick={() => copyToClipboard(JSON.stringify(selectedEmojis), "json")}>
                  {copied === "json" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                  Copy as JSON
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

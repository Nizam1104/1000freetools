"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Sparkles, Type, Circle, Square, Star, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface FontStyle {
  id: string
  name: string
  icon: React.ReactNode
  transform: (char: string) => string
  description: string
}

const FONT_STYLES: FontStyle[] = [
  {
    id: "bold",
    name: "Bold",
    icon: <Type className="size-4" />,
    description: "Bold text style",
    transform: (char: string) => {
      const boldMap: Record<string, string> = {
        "a": "𝐚", "b": "𝐛", "c": "𝐜", "d": "𝐝", "e": "𝐞", "f": "𝐟", "g": "𝐠", "h": "𝐡", "i": "𝐢",
        "j": "𝐣", "k": "𝐤", "l": "𝐥", "m": "𝐦", "n": "𝐧", "o": "𝐨", "p": "𝐩", "q": "𝐪", "r": "𝐫",
        "s": "𝐬", "t": "𝐭", "u": "𝐮", "v": "𝐯", "w": "𝐰", "x": "𝐱", "y": "𝐲", "z": "𝐳",
        "A": "𝐀", "B": "𝐁", "C": "𝐂", "D": "𝐃", "E": "𝐄", "F": "𝐅", "G": "𝐆", "H": "𝐇", "I": "𝐈",
        "J": "𝐉", "K": "𝐊", "L": "𝐋", "M": "𝐌", "N": "𝐍", "O": "𝐎", "P": "𝐏", "Q": "𝐐", "R": "𝐑",
        "S": "𝐒", "T": "𝐓", "U": "𝐔", "V": "𝐕", "W": "𝐖", "X": "𝐗", "Y": "𝐘", "Z": "𝐙",
        "0": "𝟎", "1": "𝟏", "2": "𝟐", "3": "𝟑", "4": "𝟒", "5": "𝟓", "6": "𝟔", "7": "𝟕", "8": "𝟖", "9": "𝟗",
      }
      return boldMap[char] || char
    },
  },
  {
    id: "italic",
    name: "Italic",
    icon: <Type className="size-4 italic" />,
    description: "Italic text style",
    transform: (char: string) => {
      const italicMap: Record<string, string> = {
        "a": "𝑎", "b": "𝑏", "c": "𝑐", "d": "𝑑", "e": "𝑒", "f": "𝑓", "g": "𝑔", "h": "ℎ", "i": "𝑖",
        "j": "𝑗", "k": "𝑘", "l": "𝑙", "m": "𝑚", "n": "𝑛", "o": "𝑜", "p": "𝑝", "q": "𝑞", "r": "𝑟",
        "s": "𝑠", "t": "𝑡", "u": "𝑢", "v": "𝑣", "w": "𝑤", "x": "𝑥", "y": "𝑦", "z": "𝑧",
        "A": "𝐴", "B": "𝐵", "C": "𝐶", "D": "𝐷", "E": "𝐸", "F": "𝐹", "G": "𝐺", "H": "𝐻", "I": "𝐼",
        "J": "𝐽", "K": "𝐾", "L": "𝐿", "M": "𝑀", "N": "𝑁", "O": "𝑂", "P": "𝑃", "Q": "𝑄", "R": "𝑅",
        "S": "𝑆", "T": "𝑇", "U": "𝑈", "V": "𝑉", "W": "𝑊", "X": "𝑋", "Y": "𝑌", "Z": "𝑍",
      }
      return italicMap[char] || char
    },
  },
  {
    id: "script",
    name: "Script",
    icon: <Type className="size-4" style={{ fontFamily: "cursive" }} />,
    description: "Elegant script style",
    transform: (char: string) => {
      const scriptMap: Record<string, string> = {
        "a": "𝒶", "b": "𝒷", "c": "𝒸", "d": "𝒹", "e": "𝑒", "f": "𝒻", "g": "𝑔", "h": "𝒽", "i": "𝒾",
        "j": "𝒿", "k": "𝓀", "l": "𝓁", "m": "𝓂", "n": "𝓃", "o": "𝑜", "p": "𝓅", "q": "𝓆", "r": "𝓇",
        "s": "𝓈", "t": "𝓉", "u": "𝓊", "v": "𝓋", "w": "𝓌", "x": "𝓍", "y": "𝓎", "z": "𝓏",
        "A": "𝒜", "B": "𝐵", "C": "𝒞", "D": "𝒟", "E": "𝐸", "F": "𝐹", "G": "𝒢", "H": "𝐻", "I": "𝐼",
        "J": "𝒥", "K": "𝒦", "L": "𝐿", "M": "𝑀", "N": "𝑁", "O": "𝒪", "P": "𝒫", "Q": "𝒬", "R": "𝑅",
        "S": "𝒮", "T": "𝒯", "U": "𝒰", "V": "𝒱", "W": "𝒲", "X": "𝒳", "Y": "𝒴", "Z": "𝒵",
      }
      return scriptMap[char] || char
    },
  },
  {
    id: "circled",
    name: "Circled",
    icon: <Circle className="size-4" />,
    description: "Circled letters",
    transform: (char: string) => {
      const circledMap: Record<string, string> = {
        "a": "ⓐ", "b": "ⓑ", "c": "ⓒ", "d": "ⓓ", "e": "ⓔ", "f": "ⓕ", "g": "ⓖ", "h": "ⓗ", "i": "ⓘ",
        "j": "ⓙ", "k": "ⓚ", "l": "ⓛ", "m": "ⓜ", "n": "ⓝ", "o": "ⓞ", "p": "ⓟ", "q": "ⓠ", "r": "ⓡ",
        "s": "ⓢ", "t": "ⓣ", "u": "ⓤ", "v": "ⓥ", "w": "ⓦ", "x": "ⓧ", "y": "ⓨ", "z": "ⓩ",
        "A": "Ⓐ", "B": "Ⓑ", "C": "Ⓒ", "D": "Ⓓ", "E": "Ⓔ", "F": "Ⓕ", "G": "Ⓖ", "H": "Ⓗ", "I": "Ⓘ",
        "J": "Ⓙ", "K": "Ⓚ", "L": "Ⓛ", "M": "Ⓜ", "N": "Ⓝ", "O": "Ⓞ", "P": "Ⓟ", "Q": "Ⓠ", "R": "Ⓡ",
        "S": "Ⓢ", "T": "Ⓣ", "U": "Ⓤ", "V": "Ⓥ", "W": "Ⓦ", "X": "Ⓧ", "Y": "Ⓨ", "Z": "Ⓩ",
      }
      return circledMap[char] || char
    },
  },
  {
    id: "superscript",
    name: "Superscript",
    icon: <Type className="size-4" style={{ verticalAlign: "super" }} />,
    description: "Superscript text",
    transform: (char: string) => {
      const superscriptMap: Record<string, string> = {
        "a": "ᵃ", "b": "ᵇ", "c": "ᶜ", "d": "ᵈ", "e": "ᵉ", "f": "ᶠ", "g": "ᵍ", "h": "ʰ", "i": "ⁱ",
        "j": "ʲ", "k": "ᵏ", "l": "ˡ", "m": "ᵐ", "n": "ⁿ", "o": "ᵒ", "p": "ᵖ", "q": "q", "r": "ʳ",
        "s": "ˢ", "t": "ᵗ", "u": "ᵘ", "v": "ᵛ", "w": "ʷ", "x": "ˣ", "y": "ʸ", "z": "ᶻ",
        "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
      }
      return superscriptMap[char] || char
    },
  },
  {
    id: "small-caps",
    name: "Small Caps",
    icon: <Type className="size-4" style={{ fontVariant: "small-caps" }} />,
    description: "Small capital letters",
    transform: (char: string) => {
      const smallCapsMap: Record<string, string> = {
        "a": "ᴀ", "b": "ʙ", "c": "ᴄ", "d": "ᴅ", "e": "ᴇ", "f": "ꜰ", "g": "ɢ", "h": "ʜ", "i": "ɪ",
        "j": "ᴊ", "k": "ᴋ", "l": "ʟ", "m": "ᴍ", "n": "ɴ", "o": "ᴏ", "p": "ᴘ", "q": "ǫ", "r": "ʀ",
        "s": "s", "t": "ᴛ", "u": "ᴜ", "v": "ᴠ", "w": "ᴡ", "x": "x", "y": "ʏ", "z": "ᴢ",
      }
      return smallCapsMap[char.toLowerCase()] || char
    },
  },
]

const EMOJI_DECORATIONS = [
  { name: "Stars", prefix: "✨", suffix: "✨" },
  { name: "Hearts", prefix: "💕", suffix: "💕" },
  { name: "Sparkles", prefix: "⭐", suffix: "⭐" },
  { name: "Fire", prefix: "🔥", suffix: "🔥" },
  { name: "Crown", prefix: "👑", suffix: "👑" },
]

export default function EmojiFontGenerator() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [selectedStyle, setSelectedStyle] = useState<FontStyle | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [decoration, setDecoration] = useState<{ name: string; prefix: string; suffix: string } | null>(null)

  const transformText = useCallback((style: FontStyle) => {
    if (!inputText.trim()) return
    let result = inputText.split("").map((char) => style.transform(char)).join("")
    if (decoration) {
      result = `${decoration.prefix} ${result} ${decoration.suffix}`
    }
    setOutputText(result)
    setSelectedStyle(style)
  }, [inputText, decoration])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const addDecoration = (dec: typeof EMOJI_DECORATIONS[0]) => {
    setDecoration(dec)
    if (selectedStyle && inputText) {
      let result = inputText.split("").map((char) => selectedStyle.transform(char)).join("")
      result = `${dec.prefix} ${result} ${dec.suffix}`
      setOutputText(result)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <Label htmlFor="input-text" className="text-base font-medium">Enter Text to Transform</Label>
        <Input id="input-text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type your text here..." maxLength={100} />
        <p className="text-sm text-muted-foreground">Perfect for social media bios, usernames, and special text effects</p>
      </section>

      {/* Font Style Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Sparkles className="size-4" />
          Select Font Style
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {FONT_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => transformText(style)}
              className={cn("rounded-lg border p-4 text-left transition-all hover:bg-muted/50", selectedStyle?.id === style.id ? "border-primary bg-muted/50" : "")}
            >
              <div className="flex items-center gap-2 mb-2">
                {style.icon}
                <span className="font-medium text-sm">{style.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{style.description}</p>
              <p className="text-sm mt-2 truncate">{style.transform("Aa")}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Emoji Decorations */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Add Emoji Decorations</Label>
        <div className="flex flex-wrap gap-2">
          {EMOJI_DECORATIONS.map((dec) => (
            <Button key={dec.name} variant={decoration?.name === dec.name ? "default" : "outline"} size="sm" onClick={() => addDecoration(dec)}>
              {dec.prefix} {dec.name} {dec.suffix}
            </Button>
          ))}
          {decoration && <Button variant="ghost" size="sm" onClick={() => setDecoration(null)}>Clear</Button>}
        </div>
      </section>

      {/* Output Section */}
      {outputText && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Transformed Text</Label>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(outputText, "output")}>
              {copied === "output" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy
            </Button>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 break-words">
            <p className="text-lg">{outputText}</p>
          </div>
        </section>
      )}

      {/* Quick Examples */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Quick Examples</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { text: "Hello World", style: "bold" },
            { text: "Follow Me", style: "script" },
            { text: "New Post", style: "italic" },
            { text: "Link in Bio", style: "circled" },
            { text: "Subscribe", style: "superscript" },
            { text: "Username", style: "small-caps" },
          ].map((example, idx) => {
            const style = FONT_STYLES.find((s) => s.id === example.style)
            const transformed = example.text.split("").map((char) => style?.transform(char) || char).join("")
            return (
              <button
                key={idx}
                onClick={() => {
                  setInputText(example.text)
                  if (style) transformText(style)
                }}
                className="rounded-lg border p-3 text-left hover:bg-muted/50 transition-colors"
              >
                <p className="text-xs text-muted-foreground mb-1">{example.style}</p>
                <p className="text-sm">{transformed}</p>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

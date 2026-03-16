"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Sparkles, Type, Circle, Square, Star, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface FontStyle {
  id: string
  name: string
  icon: React.ReactNode
  transform: (char: string) => string
  description: string
}

// Unicode character mappings for different font styles
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
    id: "bold-italic",
    name: "Bold Italic",
    icon: <Type className="size-4 font-bold italic" />,
    description: "Bold italic style",
    transform: (char: string) => {
      const boldItalicMap: Record<string, string> = {
        "a": "𝒂", "b": "𝒃", "c": "𝒄", "d": "𝒅", "e": "𝒆", "f": "𝒇", "g": "𝒈", "h": "𝒉", "i": "𝒊",
        "j": "𝒋", "k": "𝒌", "l": "𝒍", "m": "𝒎", "n": "𝒏", "o": "𝒐", "p": "𝒑", "q": "𝒒", "r": "𝒓",
        "s": "𝒔", "t": "𝒕", "u": "𝒖", "v": "𝒗", "w": "𝒘", "x": "𝒙", "y": "𝒚", "z": "𝒛",
        "A": "𝑨", "B": "𝑩", "C": "𝑪", "D": "𝑫", "E": "𝑬", "F": "𝑭", "G": "𝑮", "H": "𝑯", "I": "𝑰",
        "J": "𝑱", "K": "𝑲", "L": "𝑳", "M": "𝑴", "N": "𝑵", "O": "𝑶", "P": "𝑷", "Q": "𝑸", "R": "𝑹",
        "S": "𝑺", "T": "𝑻", "U": "𝑼", "V": "𝑽", "W": "𝑾", "X": "𝑿", "Y": "𝒀", "Z": "𝒁",
      }
      return boldItalicMap[char] || char
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
    id: "bold-script",
    name: "Bold Script",
    icon: <Type className="size-4 font-bold" style={{ fontFamily: "cursive" }} />,
    description: "Bold script style",
    transform: (char: string) => {
      const boldScriptMap: Record<string, string> = {
        "a": "𝓪", "b": "𝓫", "c": "𝓬", "d": "𝓭", "e": "𝓮", "f": "𝓯", "g": "𝓰", "h": "𝓱", "i": "𝓲",
        "j": "𝓳", "k": "𝓴", "l": "𝓵", "m": "𝓶", "n": "𝓷", "o": "𝓸", "p": "𝓹", "q": "𝓺", "r": "𝓻",
        "s": "𝓼", "t": "𝓽", "u": "𝓾", "v": "𝓿", "w": "𝔀", "x": "𝔁", "y": "𝔂", "z": "𝔃",
        "A": "𝓐", "B": "𝓑", "C": "𝓒", "D": "𝓓", "E": "𝓔", "F": "𝓕", "G": "𝓖", "H": "𝓗", "I": "𝓘",
        "J": "𝓙", "K": "𝓚", "L": "𝓛", "M": "𝓜", "N": "𝓝", "O": "𝓞", "P": "𝓟", "Q": "𝓠", "R": "𝓡",
        "S": "𝓢", "T": "𝓣", "U": "𝓤", "V": "𝓥", "W": "𝓦", "X": "𝓧", "Y": "𝓨", "Z": "𝓩",
      }
      return boldScriptMap[char] || char
    },
  },
  {
    id: "fraktur",
    name: "Fraktur",
    icon: <Type className="size-4" style={{ fontFamily: "serif" }} />,
    description: "Gothic fraktur style",
    transform: (char: string) => {
      const frakturMap: Record<string, string> = {
        "a": "𝔞", "b": "𝔟", "c": "𝔠", "d": "𝔡", "e": "𝔢", "f": "𝔣", "g": "𝔤", "h": "𝔥", "i": "𝔦",
        "j": "𝔧", "k": "𝔨", "l": "𝔩", "m": "𝔪", "n": "𝔫", "o": "𝔬", "p": "𝔭", "q": "𝔮", "r": "𝔯",
        "s": "𝔰", "t": "𝔱", "u": "𝔲", "v": "𝔳", "w": "𝔴", "x": "𝔵", "y": "𝔶", "z": "𝔷",
        "A": "𝔄", "B": "𝔅", "C": "ℭ", "D": "𝔇", "E": "𝔈", "F": "𝔉", "G": "𝔊", "H": "ℌ", "I": "ℑ",
        "J": "𝔍", "K": "𝔎", "L": "𝔏", "M": "𝔐", "N": "𝔑", "O": "𝔒", "P": "𝔓", "Q": "𝔔", "R": "ℜ",
        "S": "𝔖", "T": "𝔗", "U": "𝔘", "V": "𝔙", "W": "𝔚", "X": "𝔛", "Y": "𝔜", "Z": "ℨ",
      }
      return frakturMap[char] || char
    },
  },
  {
    id: "double-struck",
    name: "Double Struck",
    icon: <Type className="size-4" />,
    description: "Mathematical double-struck",
    transform: (char: string) => {
      const doubleStruckMap: Record<string, string> = {
        "a": "𝕒", "b": "𝕓", "c": "𝕔", "d": "𝕕", "e": "𝕖", "f": "𝕗", "g": "𝕘", "h": "𝕙", "i": "𝕚",
        "j": "𝕛", "k": "𝕜", "l": "𝕝", "m": "𝕞", "n": "𝕟", "o": "𝕠", "p": "𝕡", "q": "𝕢", "r": "𝕣",
        "s": "𝕤", "t": "𝕥", "u": "𝕦", "v": "𝕧", "w": "𝕨", "x": "𝕩", "y": "𝕪", "z": "𝕫",
        "A": "𝔸", "B": "𝔹", "C": "ℂ", "D": "𝔻", "E": "𝔼", "F": "𝔽", "G": "𝔾", "H": "ℍ", "I": "𝕀",
        "J": "𝕁", "K": "𝕂", "L": "𝕃", "M": "𝕄", "N": "ℕ", "O": "𝕆", "P": "ℙ", "Q": "ℚ", "R": "ℝ",
        "S": "𝕊", "T": "𝕋", "U": "𝕌", "V": "𝕍", "W": "𝕎", "X": "𝕏", "Y": "𝕐", "Z": "ℤ",
        "0": "𝟘", "1": "𝟙", "2": "𝟚", "3": "𝟛", "4": "𝟜", "5": "𝟝", "6": "𝟞", "7": "𝟟", "8": "𝟠", "9": "𝟡",
      }
      return doubleStruckMap[char] || char
    },
  },
  {
    id: "monospace",
    name: "Monospace",
    icon: <Type className="size-4 font-mono" />,
    description: "Fixed-width monospace",
    transform: (char: string) => {
      const monospaceMap: Record<string, string> = {
        "a": "𝚊", "b": "𝚋", "c": "𝚌", "d": "𝚍", "e": "𝚎", "f": "𝚏", "g": "𝚐", "h": "𝚑", "i": "𝚒",
        "j": "𝚓", "k": "𝚔", "l": "𝚕", "m": "𝚖", "n": "𝚗", "o": "𝚘", "p": "𝚙", "q": "𝚚", "r": "𝚛",
        "s": "𝚜", "t": "𝚝", "u": "𝚞", "v": "𝚟", "w": "𝚠", "x": "𝚡", "y": "𝚢", "z": "𝚣",
        "A": "𝙰", "B": "𝙱", "C": "𝙲", "D": "𝙳", "E": "𝙴", "F": "𝙵", "G": "𝙶", "H": "𝙷", "I": "𝙸",
        "J": "𝙹", "K": "𝙺", "L": "𝙻", "M": "𝙼", "N": "𝙽", "O": "𝙾", "P": "𝙿", "Q": "𝚀", "R": "𝚁",
        "S": "𝚂", "T": "𝚃", "U": "𝚄", "V": "𝚅", "W": "𝚆", "X": "𝚇", "Y": "𝚈", "Z": "𝚉",
        "0": "𝟶", "1": "𝟷", "2": "𝟸", "3": "𝟹", "4": "𝟺", "5": "𝟻", "6": "𝟼", "7": "𝟽", "8": "𝟾", "9": "𝟿",
      }
      return monospaceMap[char] || char
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
        "0": "⓪", "1": "①", "2": "②", "3": "③", "4": "④", "5": "⑤", "6": "⑥", "7": "⑦", "8": "⑧", "9": "⑨",
      }
      return circledMap[char] || char
    },
  },
  {
    id: "squared",
    name: "Squared",
    icon: <Square className="size-4" />,
    description: "Squared letters",
    transform: (char: string) => {
      const squaredMap: Record<string, string> = {
        "a": "🄰", "b": "🄱", "c": "🄲", "d": "🄳", "e": "🄴", "f": "🄵", "g": "🄶", "h": "🄷", "i": "🄸",
        "j": "🄹", "k": "🄺", "l": "🄻", "m": "🄼", "n": "🄽", "o": "🄾", "p": "🄿", "q": "🅀", "r": "🅁",
        "s": "🅂", "t": "🅃", "u": "🅄", "v": "🅅", "w": "🅆", "x": "🅇", "y": "🅈", "z": "🅉",
        "A": "🄰", "B": "🄱", "C": "🄲", "D": "🄳", "E": "🄴", "F": "🄵", "G": "🄶", "H": "🄷", "I": "🄸",
        "J": "🄹", "K": "🄺", "L": "🄻", "M": "🄼", "N": "🄽", "O": "🄾", "P": "🄿", "Q": "🅀", "R": "🅁",
        "S": "🅂", "T": "🅃", "U": "🅄", "V": "🅅", "W": "🅆", "X": "🅇", "Y": "🅈", "Z": "🅉",
      }
      return squaredMap[char] || char
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
  {
    id: "upside-down",
    name: "Upside Down",
    icon: <RotateCcw className="size-4" />,
    description: "Flipped upside down",
    transform: (char: string) => {
      const upsideDownMap: Record<string, string> = {
        "a": "ɐ", "b": "q", "c": "ɔ", "d": "p", "e": "ǝ", "f": "ɟ", "g": "ƃ", "h": "ɥ", "i": "ᴉ",
        "j": "ɾ", "k": "ʞ", "l": "l", "m": "ɯ", "n": "u", "o": "o", "p": "d", "q": "b", "r": "ɹ",
        "s": "s", "t": "ʇ", "u": "n", "v": "ʌ", "w": "ʍ", "x": "x", "y": "ʎ", "z": "z",
        "A": "∀", "B": "𐐒", "C": "Ɔ", "D": "p", "E": "Ǝ", "F": "Ⅎ", "G": "פ", "H": "H", "I": "I",
        "J": "ſ", "K": "ʞ", "L": "˥", "M": "W", "N": "N", "O": "O", "P": "Ԁ", "Q": "Ό", "R": "ᴚ",
        "S": "S", "T": "⊥", "U": "∩", "V": "Λ", "W": "M", "X": "X", "Y": "⅄", "Z": "Z",
        "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "h", "5": "S", "6": "9", "7": "L", "8": "8", "9": "6",
        ".": "˙", ",": "'", "'": ",", "!": "¡", "?": "¿", "-": "-", "_": "‾",
      }
      return upsideDownMap[char] || char
    },
  },
]

const EMOJI_DECORATIONS = [
  { name: "Stars", prefix: "✨", suffix: "✨" },
  { name: "Hearts", prefix: "💕", suffix: "💕" },
  { name: "Sparkles", prefix: "⭐", suffix: "⭐" },
  { name: "Fire", prefix: "🔥", suffix: "🔥" },
  { name: "Crown", prefix: "👑", suffix: "👑" },
  { name: "Flowers", prefix: "🌸", suffix: "🌸" },
]

export default function EmojiFont() {
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

  const clearDecoration = () => {
    setDecoration(null)
    if (selectedStyle && inputText) {
      const result = inputText.split("").map((char) => selectedStyle.transform(char)).join("")
      setOutputText(result)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <Label htmlFor="input-text" className="text-base font-medium">
          Enter Text to Transform
        </Label>
        <Input
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text here..."
          maxLength={100}
        />
        <p className="text-sm text-muted-foreground">
          Perfect for social media bios, usernames, and special text effects
        </p>
      </section>

      {/* Font Style Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <Sparkles className="size-4" />
          Select Font Style
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {FONT_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => transformText(style)}
              className={cn(
                "rounded-lg border p-4 text-left transition-all hover:bg-muted/50",
                selectedStyle?.id === style.id ? "border-primary bg-muted/50" : ""
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                {style.icon}
                <span className="font-medium text-sm">{style.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{style.description}</p>
              <p className="text-sm mt-2 truncate">
                {style.transform("Aa")}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Emoji Decorations */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Add Emoji Decorations</Label>
        <div className="flex flex-wrap gap-2">
          {EMOJI_DECORATIONS.map((dec) => (
            <Button
              key={dec.name}
              variant={decoration?.name === dec.name ? "default" : "outline"}
              size="sm"
              onClick={() => addDecoration(dec)}
            >
              {dec.prefix} {dec.name} {dec.suffix}
            </Button>
          ))}
          {decoration && (
            <Button variant="ghost" size="sm" onClick={clearDecoration}>
              Clear
            </Button>
          )}
        </div>
      </section>

      {/* Output Section */}
      {outputText && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Transformed Text</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(outputText, "output")}
            >
              {copied === "output" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy
            </Button>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 break-words">
            <p className="text-lg">{outputText}</p>
          </div>
          
          {/* Preview in different contexts */}
          <div className="space-y-2">
            <Label className="text-sm">Preview</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border p-3 bg-background">
                <p className="text-xs text-muted-foreground mb-1">Bio Preview</p>
                <p className="text-sm">{outputText}</p>
              </div>
              <div className="rounded-lg border p-3 bg-background">
                <p className="text-xs text-muted-foreground mb-1">Username Preview</p>
                <p className="text-sm truncate">{outputText.slice(0, 30)}</p>
              </div>
            </div>
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
            { text: "Check This", style: "fraktur" },
            { text: "Link in Bio", style: "circled" },
            { text: "Subscribe", style: "double-struck" },
          ].map((example, idx) => {
            const style = FONT_STYLES.find((s) => s.id === example.style)
            const transformed = example.text.split("").map((char) => style?.transform(char) || char).join("")
            return (
              <button
                key={idx}
                onClick={() => {
                  setInputText(example.text)
                  if (style) {
                    transformText(style)
                  }
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

      {/* Usage Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-2">
        <Label className="text-base font-medium">Tips</Label>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Copy and paste the transformed text into social media bios, usernames, or posts</li>
          <li>Some platforms may not display all characters correctly</li>
          <li>Combine with emoji decorations for extra flair</li>
          <li>Keep text short for best compatibility</li>
        </ul>
      </section>
    </div>
  )
}

// Add missing import
import { RotateCcw } from "lucide-react"

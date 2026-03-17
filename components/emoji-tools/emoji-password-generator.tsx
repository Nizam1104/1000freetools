"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, RefreshCw, Shield, Key } from "lucide-react"
import { cn } from "@/lib/utils"

const EMOJI_SETS = {
  smileys: ["😀", "😂", "😍", "🥰", "😎", "🤔", "🙏", "💀", "🔥", "✨"],
  hearts: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💕", "💖", "💗"],
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"],
  food: ["🍕", "🍔", "🍟", "🌭", "🍿", "🧁", "🍰", "🍫", "🍬", "🍭"],
  nature: ["🌟", "⭐", "🌙", "☀️", "🌈", "☁️", "🌊", "🌸", "🌹", "🌻"],
  symbols: ["💯", "✨", "⭐", "🔥", "💫", "💥", "💦", "💨", "🎵", "🎶"],
  objects: ["🔑", "💎", "👑", "💰", "💳", "📱", "💻", "📷", "🎮", "🎲"],
}

export default function EmojiPasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([16])
  const [includeEmojis, setIncludeEmojis] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [selectedEmojiSets, setSelectedEmojiSets] = useState<string[]>(["smileys", "hearts"])
  const [copied, setCopied] = useState<string | null>(null)
  const [strength, setStrength] = useState(0)

  const generatePassword = useCallback(() => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    let availableChars = chars
    if (includeNumbers) availableChars += numbers
    if (includeSymbols) availableChars += symbols

    let emojiPool: string[] = []
    if (includeEmojis) {
      selectedEmojiSets.forEach(set => {
        emojiPool = [...emojiPool, ...(EMOJI_SETS[set as keyof typeof EMOJI_SETS] || [])]
      })
    }

    let result = ""
    const emojiCount = includeEmojis ? Math.floor(length[0] / 4) : 0
    const charCount = length[0] - emojiCount

    for (let i = 0; i < charCount; i++) {
      result += availableChars.charAt(Math.floor(Math.random() * availableChars.length))
    }

    for (let i = 0; i < emojiCount; i++) {
      if (emojiPool.length > 0) {
        result += emojiPool[Math.floor(Math.random() * emojiPool.length)]
      }
    }

    // Shuffle the result
    result = result.split("").sort(() => Math.random() - 0.5).join("")
    setPassword(result)

    // Calculate strength
    let str = 0
    if (result.length >= 12) str += 25
    if (result.length >= 16) str += 25
    if (includeEmojis) str += 20
    if (includeNumbers && includeSymbols) str += 30
    setStrength(Math.min(100, str))
  }, [length, includeEmojis, includeNumbers, includeSymbols, selectedEmojiSets])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const toggleEmojiSet = (set: string) => {
    setSelectedEmojiSets(prev => 
      prev.includes(set) ? prev.filter(s => s !== set) : [...prev, set]
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Password Display */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Generated Password</Label>
        <div className="flex gap-2">
          <Input value={password} readOnly className="font-mono text-lg" placeholder="Click Generate to create a password" />
          <Button variant="outline" onClick={() => copyToClipboard(password, "password")} disabled={!password}>
            {copied === "password" ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        </div>
        {password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Password Strength</span>
              <span className={cn(strength >= 75 ? "text-green-500" : strength >= 50 ? "text-yellow-500" : "text-red-500")}>
                {strength >= 75 ? "Strong" : strength >= 50 ? "Medium" : "Weak"}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className={cn("h-full rounded-full transition-all", strength >= 75 ? "bg-green-500" : strength >= 50 ? "bg-yellow-500" : "bg-red-500")} style={{ width: `${strength}%` }} />
            </div>
          </div>
        )}
      </section>

      {/* Length Slider */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Password Length: {length[0]} characters</Label>
        <Slider value={length} onValueChange={setLength} min={8} max={32} step={1} className="w-full" />
      </section>

      {/* Options */}
      <section className="space-y-4">
        <Label className="text-base font-medium">Password Options</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Checkbox checked={includeEmojis} onCheckedChange={(v) => setIncludeEmojis(!!v)} id="emojis" />
            <Label htmlFor="emojis" className="cursor-pointer flex items-center gap-2">
              <span className="text-xl">😀</span> Include Emojis
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={includeNumbers} onCheckedChange={(v) => setIncludeNumbers(!!v)} id="numbers" />
            <Label htmlFor="numbers" className="cursor-pointer flex items-center gap-2">
              <span>123</span> Include Numbers
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={includeSymbols} onCheckedChange={(v) => setIncludeSymbols(!!v)} id="symbols" />
            <Label htmlFor="symbols" className="cursor-pointer flex items-center gap-2">
              <span>!@#</span> Include Symbols
            </Label>
          </div>
        </div>
      </section>

      {/* Emoji Sets */}
      {includeEmojis && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Select Emoji Sets</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.keys(EMOJI_SETS).map((set) => (
              <button
                key={set}
                onClick={() => toggleEmojiSet(set)}
                className={cn("rounded-lg border p-3 text-left transition-all", selectedEmojiSets.includes(set) ? "border-primary bg-muted/50" : "hover:bg-muted/50")}
              >
                <div className="text-lg mb-1">{EMOJI_SETS[set as keyof typeof EMOJI_SETS].slice(0, 4).join("")}</div>
                <p className="text-xs text-muted-foreground capitalize">{set}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Generate Button */}
      <Button onClick={generatePassword} size="lg" className="w-full sm:w-auto">
        <RefreshCw className="size-5 mr-2" />
        Generate Password
      </Button>

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-muted-foreground" />
          <Label className="text-base font-medium">Password Security Tips</Label>
        </div>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Use at least 12 characters for better security</li>
          <li>Include a mix of emojis, letters, numbers, and symbols</li>
          <li>Don't use the same password for multiple accounts</li>
          <li>Consider using a password manager to store your passwords</li>
          <li>Note: Not all apps support emoji passwords</li>
        </ul>
      </section>

      {/* Example Passwords */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Example Passwords</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "🔥Secure123!Pass",
            "Love❤️2024@Safe",
            "Star⭐Power#99",
            "🎮Gamer$Pro2024",
          ].map((example, idx) => (
            <div key={idx} className="rounded-lg border p-3 bg-background flex items-center justify-between">
              <code className="text-sm">{example}</code>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(example, `example-${idx}`)}>
                {copied === `example-${idx}` ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

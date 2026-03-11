"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordPatternGenerator() {
  const [wordCount, setWordCount] = useState<number>(4)
  const [separator, setSeparator] = useState<string>("-")
  const [capitalize, setCapitalize] = useState<"none" | "first" | "all">("first")
  const [includeNumber, setIncludeNumber] = useState<boolean>(true)
  const [includeSymbol, setIncludeSymbol] = useState<boolean>(false)
  const [passphrases, setPassphrases] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  // Common word list for passphrases
  const wordList = useMemo(() => [
    "correct", "horse", "battery", "staple", "purple", "monkey", "dishwasher",
    "elephant", "umbrella", "bicycle", "mountain", "ocean", "forest", "river",
    "sunset", "rainbow", "thunder", "lightning", "crystal", "diamond", "golden",
    "silver", "bronze", "copper", "iron", "steel", "titanium", "platinum",
    "wizard", "dragon", "phoenix", "unicorn", "griffin", "pegasus", "knight",
    "castle", "tower", "bridge", "garden", "meadow", "valley", "canyon",
    "island", "planet", "star", "comet", "galaxy", "nebula", "cosmos",
    "apple", "banana", "cherry", "orange", "lemon", "grape", "melon",
    "tiger", "lion", "bear", "wolf", "eagle", "hawk", "falcon",
    "summer", "winter", "spring", "autumn", "morning", "evening", "midnight",
    "happy", "brave", "calm", "eager", "fancy", "gentle", "jolly",
    "quick", "quiet", "rapid", "swift", "bold", "wise", "kind",
  ], [])

  const generatePassphrase = useCallback(() => {
    const array = new Uint32Array(wordCount)
    crypto.getRandomValues(array)

    const words: string[] = []
    for (let i = 0; i < wordCount; i++) {
      let word = wordList[array[i] % wordList.length]
      
      if (capitalize === "first") {
        word = word.charAt(0).toUpperCase() + word.slice(1)
      } else if (capitalize === "all") {
        word = word.toUpperCase()
      }
      
      words.push(word)
    }

    let passphrase = words.join(separator)

    if (includeNumber) {
      const numArray = new Uint32Array(1)
      crypto.getRandomValues(numArray)
      passphrase += separator + (numArray[0] % 100)
    }

    if (includeSymbol) {
      const symbols = "!@#$%^&*"
      const symArray = new Uint32Array(1)
      crypto.getRandomValues(symArray)
      passphrase += symbols[symArray[0] % symbols.length]
    }

    return passphrase
  }, [wordCount, separator, capitalize, includeNumber, includeSymbol, wordList])

  const generateMultiple = useCallback(() => {
    const newPassphrases: string[] = []
    for (let i = 0; i < 5; i++) {
      newPassphrases.push(generatePassphrase())
    }
    setPassphrases(newPassphrases)
  }, [generatePassphrase])

  React.useEffect(() => {
    generateMultiple()
  }, [wordCount, separator, capitalize, includeNumber, includeSymbol, generateMultiple])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const calculateEntropy = useCallback((passphrase: string) => {
    // Rough entropy calculation
    const wordListSize = wordList.length
    const numberOptions = includeNumber ? 100 : 1
    const symbolOptions = includeSymbol ? 8 : 1
    
    const totalCombinations = Math.pow(wordListSize, wordCount) * numberOptions * symbolOptions
    return Math.log2(totalCombinations).toFixed(1)
  }, [wordCount, wordList.length, includeNumber, includeSymbol])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Generated Passphrases */}
      {passphrases.length > 0 && (
        <section className="space-y-3">
          {passphrases.map((passphrase, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="flex-1 rounded-lg border bg-muted/30 p-4 font-mono text-lg break-all">
                {passphrase}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(passphrase, `pp-${idx}`)}
                className="shrink-0"
              >
                {copied === `pp-${idx}` ? <Check className="size-5" /> : <Copy className="size-5" />}
              </Button>
            </div>
          ))}
          
          {passphrases[0] && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Entropy: <span className="font-medium text-foreground">{calculateEntropy(passphrases[0])} bits</span></span>
              <span>Length: <span className="font-medium text-foreground">{passphrases[0].length} characters</span></span>
            </div>
          )}
        </section>
      )}

      {/* Options */}
      <section className="space-y-4">
        {/* Word Count */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Number of Words</Label>
            <span className="font-mono text-sm font-medium">{wordCount} words</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {[3, 4, 5, 6, 7].map((count) => (
              <Button
                key={count}
                variant={wordCount === count ? "default" : "outline"}
                size="xs"
                onClick={() => setWordCount(count)}
                className="h-7 px-3"
              >
                {count}
              </Button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="space-y-3">
          <Label>Word Separator</Label>
          <div className="flex gap-1 flex-wrap">
            {[
              { value: "-", label: "Hyphen (-)" },
              { value: "_", label: "Underscore (_)" },
              { value: ".", label: "Dot (.)" },
              { value: " ", label: "Space" },
              { value: "", label: "None" },
            ].map((s) => (
              <Button
                key={s.value}
                variant={separator === s.value ? "default" : "outline"}
                size="xs"
                onClick={() => setSeparator(s.value)}
                className="h-7 px-3"
              >
                {s.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Capitalization */}
        <div className="space-y-3">
          <Label>Capitalization</Label>
          <div className="flex gap-1">
            {[
              { value: "none", label: "lowercase" },
              { value: "first", label: "Capitalize" },
              { value: "all", label: "UPPERCASE" },
            ].map((c) => (
              <Button
                key={c.value}
                variant={capitalize === c.value ? "default" : "outline"}
                size="xs"
                onClick={() => setCapitalize(c.value as typeof capitalize)}
                className="h-7 px-3"
              >
                {c.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="include-number"
              checked={includeNumber}
              onChange={(e) => setIncludeNumber(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="include-number" className="text-sm font-normal cursor-pointer">
              Add random number
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="include-symbol"
              checked={includeSymbol}
              onChange={(e) => setIncludeSymbol(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="include-symbol" className="text-sm font-normal cursor-pointer">
              Add special character
            </Label>
          </div>
        </div>
      </section>

      {/* Generate Button */}
      <Button onClick={generateMultiple} className="w-full">
        Generate New Passphrases
      </Button>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Passphrases</h4>
            <p className="text-sm text-muted-foreground">
              Passphrases are sequences of random words that are easier to remember than 
              random characters but still provide strong security. The "correct horse battery 
              staple" method was popularized by XKCD comic #936.
            </p>
            <p className="text-sm text-muted-foreground">
              With 4 words from a 1000-word list, you get approximately 40 bits of entropy.
              Adding more words, numbers, or symbols increases security significantly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

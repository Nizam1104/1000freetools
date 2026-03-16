"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, ArrowUpDown } from "lucide-react"

const flipMap: Record<string, string> = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
  'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
  'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
  'y': 'ʎ', 'z': 'z',
  'A': '∀', 'B': '𐐒', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H',
  'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ',
  'Q': 'Ό', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X',
  'Y': '⅄', 'Z': 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'h', '5': 'S', '6': '9', '7': 'L',
  '8': '8', '9': '6',
  '.': '˙', ',': "'", "'": ',', '"': ',,', '`': ',', '?': '¿', '!': '¡',
  '[': ']', ']': '[', '(': ')', ')': '(', '{': '}', '}': '{', '<': '>', '>': '<',
  '&': '⅋', '_': '‾', '-': '-', ';': '؛', '/': '\\', '\\': '/'
}

export default function UpsideDownTextGenerator() {
  const [inputText, setInputText] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const output = useMemo(() => {
    if (!inputText.trim()) return ""
    
    // Flip each character and reverse the string
    return inputText
      .split('')
      .map(char => flipMap[char] || char)
      .reverse()
      .join('')
  }, [inputText])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setInputText("")
  }, [])

  const loadSample = useCallback(() => {
    setInputText("Hello World! Flip this text upside down.")
  }, [])

  const commonPhrases = [
    "Hello World",
    "Upside Down",
    "Flip Text",
    "What's up?",
    "How are you?"
  ]

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            Normal Text
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={loadSample}
              className="h-7"
            >
              <span className="text-xs">Sample</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(inputText, "input")}
              className="h-7"
              disabled={!inputText}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter text to flip upside down..."
        />

        {/* Quick Phrases */}
        <div className="flex flex-wrap gap-2">
          {commonPhrases.map((phrase) => (
            <Button
              key={phrase}
              variant="outline"
              size="sm"
              onClick={() => setInputText(phrase)}
              className="text-xs"
            >
              {phrase}
            </Button>
          ))}
        </div>
      </section>

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Upside Down Text</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(output, "output")}
              className="h-7"
            >
              {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-2xl break-all leading-relaxed">{output}</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <ArrowUpDown className="size-4" />
            <span className="text-sm">Works both ways - paste upside down text to flip it back!</span>
          </div>
        </section>
      )}

      {/* Character Map */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Character Mapping</Label>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {Object.entries(flipMap)
            .filter(([k]) => k.match(/^[a-z]$/i))
            .slice(0, 26)
            .map(([normal, flipped]) => (
              <div key={normal} className="rounded border p-2 text-center">
                <div className="text-lg font-medium">{normal}</div>
                <div className="text-lg text-muted-foreground">{flipped}</div>
              </div>
            ))}
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-2">
          {Object.entries(flipMap)
            .filter(([k]) => k.match(/^[0-9.,?!'"\[\](){}]$/))
            .map(([normal, flipped]) => (
              <div key={normal} className="rounded border p-2 text-center">
                <div className="text-lg font-medium">{normal}</div>
                <div className="text-lg text-muted-foreground">{flipped}</div>
              </div>
            ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Upside Down Text</h4>
            <p className="text-sm text-muted-foreground">
              This tool flips text upside down using Unicode characters that resemble 
              inverted Latin letters. The text is both flipped character-by-character 
              AND reversed to maintain readability when viewed upside down.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Uses Unicode "turned" letters (ɐ, ʇ, ʎ, etc.)</li>
              <li>String is reversed for proper orientation</li>
              <li>Works with letters, numbers, and punctuation</li>
              <li>Unsupported characters remain unchanged</li>
              <li>Great for social media, fun messages, and puzzles</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Example:</strong> "Hello" → "ollǝH"
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

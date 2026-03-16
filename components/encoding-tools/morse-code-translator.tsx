"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MorseCodeTranslator() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)

  const morseCodeMap: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
    '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
    ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
    '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
  }

  const reverseMorseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([k, v]) => [v, k])
  )

  const encodeMorse = useCallback((text: string): string => {
    return text.toUpperCase()
      .split('')
      .map(char => morseCodeMap[char] || char)
      .join(' ')
  }, [])

  const decodeMorse = useCallback((morse: string): string => {
    return morse
      .split(' ')
      .map(code => reverseMorseMap[code] || code)
      .join('')
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    if (mode === "encode") {
      setOutput(encodeMorse(value))
    } else {
      setOutput(decodeMorse(value))
    }
  }, [mode, encodeMorse, decodeMorse])

  const handleModeChange = useCallback((newMode: "encode" | "decode") => {
    setMode(newMode)
    if (newMode === "encode") {
      setOutput(encodeMorse(input))
    } else {
      setOutput(decodeMorse(input))
    }
  }, [input, encodeMorse, decodeMorse])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => handleModeChange("encode")}
            className="flex-1"
          >
            Text to Morse
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex-1"
          >
            Morse to Text
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "encode" ? "Text to Translate" : "Morse Code"}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(input, "input")}
              className="h-7"
              disabled={!input}
            >
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                setInput("")
                setOutput("")
              }}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Textarea
          id="input"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className="font-mono text-sm min-h-[120px]"
          placeholder={mode === "encode" ? "Enter text to translate to Morse code..." : "Enter Morse code (use . for dots, - for dashes, spaces between letters, / for words)..."}
        />
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "encode" ? "Morse Code" : "Decoded Text"}
          </Label>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copyToClipboard(output, "output")}
            className="h-7"
            disabled={!output}
          >
            {copied === "output" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="text-xs">Copy</span>
          </Button>
        </div>

        <Textarea
          id="output"
          value={output}
          readOnly
          className="font-mono text-sm min-h-[120px] bg-muted/50"
          placeholder="Result will appear here..."
        />
      </section>

      {/* Morse Code Reference */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Morse Code Reference</Label>
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 gap-px bg-border border-b">
            {['A', 'B', 'C', 'D', 'E', 'F'].map(letter => (
              <div key={letter} className="bg-background px-3 py-2 text-center">
                <div className="font-medium">{letter}</div>
                <div className="font-mono text-sm text-muted-foreground">{morseCodeMap[letter]}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-px bg-border border-b">
            {['G', 'H', 'I', 'J', 'K', 'L'].map(letter => (
              <div key={letter} className="bg-background px-3 py-2 text-center">
                <div className="font-medium">{letter}</div>
                <div className="font-mono text-sm text-muted-foreground">{morseCodeMap[letter]}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-px bg-border border-b">
            {['M', 'N', 'O', 'P', 'Q', 'R'].map(letter => (
              <div key={letter} className="bg-background px-3 py-2 text-center">
                <div className="font-medium">{letter}</div>
                <div className="font-mono text-sm text-muted-foreground">{morseCodeMap[letter]}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-px bg-border border-b">
            {['S', 'T', 'U', 'V', 'W', 'X'].map(letter => (
              <div key={letter} className="bg-background px-3 py-2 text-center">
                <div className="font-medium">{letter}</div>
                <div className="font-mono text-sm text-muted-foreground">{morseCodeMap[letter]}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-px bg-border border-b">
            {['Y', 'Z', '0', '1', '2', '3'].map(letter => (
              <div key={letter} className="bg-background px-3 py-2 text-center">
                <div className="font-medium">{letter}</div>
                <div className="font-mono text-sm text-muted-foreground">{morseCodeMap[letter]}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-px bg-border">
            {['4', '5', '6', '7', '8', '9'].map(letter => (
              <div key={letter} className="bg-background px-3 py-2 text-center">
                <div className="font-medium">{letter}</div>
                <div className="font-mono text-sm text-muted-foreground">{morseCodeMap[letter]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Volume2, Play } from "lucide-react"
import { cn } from "@/lib/utils"

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

export default function TextToMorseCode() {
  const [inputText, setInputText] = useState<string>("")
  const [outputFormat, setOutputFormat] = useState<'spaces' | 'newlines' | 'compact'>('spaces')
  const [copied, setCopied] = useState<string | null>(null)

  const morseOutput = useMemo(() => {
    if (!inputText.trim()) return ""

    const upperText = inputText.toUpperCase()
    const morseChars = upperText.split('').map(char => {
      const morse = morseCodeMap[char]
      return morse || '?'
    })

    if (outputFormat === 'spaces') {
      return morseChars.join(' ')
    } else if (outputFormat === 'newlines') {
      return morseChars.join('\n')
    } else {
      return morseChars.join('')
    }
  }, [inputText, outputFormat])

  const textOutput = useMemo(() => {
    if (!inputText.trim()) return ""

    const morse = inputText.trim()
    const separators = outputFormat === 'newlines' ? '\n' : ' '
    const morseChars = morse.split(separators).filter(s => s.trim())

    return morseChars.map(code => {
      const char = reverseMorseMap[code]
      return char || '?'
    }).join('')
  }, [inputText, outputFormat])

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

  const playMorseAudio = useCallback(() => {
    const morse = morseOutput
    if (!morse) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const frequency = 600
    const dotDuration = 0.05

    const playTone = (duration: number, time: number) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, time)
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + duration)
      
      oscillator.start(time)
      oscillator.stop(time + duration)
    }

    let currentTime = audioContext.currentTime + 0.1

    for (let i = 0; i < morse.length; i++) {
      const symbol = morse[i]
      
      if (symbol === '.') {
        playTone(dotDuration, currentTime)
        currentTime += dotDuration * 2
      } else if (symbol === '-') {
        playTone(dotDuration * 3, currentTime)
        currentTime += dotDuration * 4
      } else if (symbol === ' ') {
        currentTime += dotDuration * 3
      } else if (symbol === '/') {
        currentTime += dotDuration * 7
      }
    }
  }, [morseOutput])

  const commonPhrases = [
    "SOS",
    "HELLO WORLD",
    "MORSE CODE",
    "12345",
    "CALL ME"
  ]

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            Text to Convert
          </Label>
          <div className="flex items-center gap-2">
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
              disabled={!inputText}
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
          placeholder="Enter text to convert to Morse code..."
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

      {/* Output Format */}
      <section className="space-y-2">
        <Label className="text-sm">Output Format</Label>
        <div className="flex gap-2">
          <Button
            variant={outputFormat === 'spaces' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOutputFormat('spaces')}
            className="flex-1 text-xs"
          >
            With Spaces
          </Button>
          <Button
            variant={outputFormat === 'newlines' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOutputFormat('newlines')}
            className="flex-1 text-xs"
          >
            New Lines
          </Button>
          <Button
            variant={outputFormat === 'compact' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOutputFormat('compact')}
            className="flex-1 text-xs"
          >
            Compact
          </Button>
        </div>
      </section>

      {/* Morse Code Output */}
      {morseOutput && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Morse Code</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={playMorseAudio}
                className="h-7"
              >
                <Volume2 className="size-3.5" />
                <span className="text-xs ml-1">Play</span>
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(morseOutput, "morse")}
                className="h-7"
              >
                {copied === "morse" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-lg break-all tracking-wider">{morseOutput}</p>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Legend:</span> <code className="bg-muted px-1 rounded">.</code> dot (dit) | <code className="bg-muted px-1 rounded">-</code> dash (dah) | <code className="bg-muted px-1 rounded">/</code> word space
          </div>
        </section>
      )}

      {/* Morse Code Reference Table */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Morse Code Reference</Label>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-lg border p-3">
            <h4 className="text-sm font-medium mb-2">Letters</h4>
            <div className="grid grid-cols-2 gap-1 text-xs font-mono">
              {Object.entries(morseCodeMap)
                .filter(([k]) => k.match(/^[A-Z]$/))
                .slice(0, 13)
                .map(([char, code]) => (
                  <div key={char} className="flex justify-between">
                    <span>{char}</span>
                    <span className="text-muted-foreground">{code}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-lg border p-3">
            <h4 className="text-sm font-medium mb-2">Letters (cont.)</h4>
            <div className="grid grid-cols-2 gap-1 text-xs font-mono">
              {Object.entries(morseCodeMap)
                .filter(([k]) => k.match(/^[A-Z]$/))
                .slice(13)
                .map(([char, code]) => (
                  <div key={char} className="flex justify-between">
                    <span>{char}</span>
                    <span className="text-muted-foreground">{code}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-lg border p-3">
            <h4 className="text-sm font-medium mb-2">Numbers & Symbols</h4>
            <div className="grid grid-cols-2 gap-1 text-xs font-mono">
              {Object.entries(morseCodeMap)
                .filter(([k]) => k.match(/^[0-9.,?'"\/()&:;=+\-_@$]$/))
                .map(([char, code]) => (
                  <div key={char} className="flex justify-between">
                    <span>{char}</span>
                    <span className="text-muted-foreground">{code}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Morse Code</h4>
            <p className="text-sm text-muted-foreground">
              Morse code is a method of encoding text using sequences of two signal durations: 
              dots (dits) and dashes (dahs). It was developed by Samuel Morse and Alfred Vail 
              in the 1830s for telegraph communication.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Dot (.) = 1 time unit</li>
              <li>Dash (-) = 3 time units</li>
              <li>Space between parts of same letter = 1 unit</li>
              <li>Space between letters = 3 units</li>
              <li>Space between words = 7 units</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>SOS</strong> (<code className="bg-muted px-1">...</code> <code className="bg-muted px-1">---</code> <code className="bg-muted px-1">...</code>) is the most famous Morse code distress signal.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

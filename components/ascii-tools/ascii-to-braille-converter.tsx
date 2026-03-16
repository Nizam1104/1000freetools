"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const braillePatterns: Record<string, string> = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
  'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
  'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
  'y': '⠽', 'z': '⠵',
  '0': '⠼⠚', '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑',
  '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊',
  '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', ';': '⠆', ':': '⠒',
  '-': '⠤', '(': '⠐⠣', ')': '⠐⠜', '/': '⠸⠌', "'": '⠄', '"': '⠐⠂'
}

const reverseBrailleMap = Object.fromEntries(
  Object.entries(braillePatterns).map(([k, v]) => [v, k])
)

export default function AsciiToBrailleConverter() {
  const [inputText, setInputText] = useState<string>("")
  const [mode, setMode] = useState<'to-braille' | 'from-braille'>('to-braille')
  const [copied, setCopied] = useState<string | null>(null)

  const output = useMemo(() => {
    if (!inputText.trim()) return ""

    if (mode === 'to-braille') {
      return inputText.toLowerCase().split('').map(char => {
        return braillePatterns[char] || char
      }).join('')
    } else {
      // Simple braille to ASCII (character by character)
      return inputText.split('').map(char => {
        return reverseBrailleMap[char] || char
      }).join('')
    }
  }, [inputText, mode])

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
    if (mode === 'to-braille') {
      setInputText("Hello World!")
    } else {
      setInputText("⠓⠑⠇⠇⠕ ⠺⠕⠗⠇⠙⠖")
    }
  }, [mode])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="flex gap-2">
        <Button
          variant={mode === 'to-braille' ? 'default' : 'outline'}
          onClick={() => {
            setMode('to-braille')
            setInputText("")
          }}
          className="flex-1"
        >
          ASCII to Braille
        </Button>
        <Button
          variant={mode === 'from-braille' ? 'default' : 'outline'}
          onClick={() => {
            setMode('from-braille')
            setInputText("")
          }}
          className="flex-1"
        >
          Braille to ASCII
        </Button>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === 'to-braille' ? 'ASCII Text' : 'Braille Text'}
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
          className="font-mono text-sm min-h-[120px]"
          placeholder={mode === 'to-braille' ? "Enter ASCII text to convert to Braille..." : "Enter Braille text to convert to ASCII..."}
        />
      </section>

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === 'to-braille' ? 'Braille Output' : 'ASCII Output'}
            </Label>
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
            <p className={cn(
              "text-lg break-all",
              mode === 'to-braille' ? "font-mono" : "font-mono"
            )}>
              {output}
            </p>
          </div>
        </section>
      )}

      {/* Braille Alphabet Reference */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Braille Alphabet Reference</Label>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-lg border p-3">
            <h4 className="text-sm font-medium mb-2">Letters A-J</h4>
            <div className="grid grid-cols-5 gap-2 text-center">
              {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map(char => (
                <div key={char}>
                  <div className="text-2xl">{braillePatterns[char]}</div>
                  <div className="text-xs text-muted-foreground uppercase">{char}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-3">
            <h4 className="text-sm font-medium mb-2">Letters K-T</h4>
            <div className="grid grid-cols-5 gap-2 text-center">
              {['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'].map(char => (
                <div key={char}>
                  <div className="text-2xl">{braillePatterns[char]}</div>
                  <div className="text-xs text-muted-foreground uppercase">{char}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-3">
            <h4 className="text-sm font-medium mb-2">Letters U-Z & Numbers</h4>
            <div className="grid grid-cols-4 gap-2 text-center">
              {['u', 'v', 'w', 'x', 'y', 'z'].map(char => (
                <div key={char}>
                  <div className="text-2xl">{braillePatterns[char]}</div>
                  <div className="text-xs text-muted-foreground uppercase">{char}</div>
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
            <h4 className="text-sm font-medium">About Braille</h4>
            <p className="text-sm text-muted-foreground">
              Braille is a tactile writing system used by people who are visually impaired. 
              It consists of patterns of raised dots arranged in cells of up to six dots 
              in a 3×2 grid. Each pattern represents a letter, number, or punctuation mark.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Invented by Louis Braille in 1824</li>
              <li>Uses a 6-dot cell (2 columns × 3 rows)</li>
              <li>64 possible combinations (including blank)</li>
              <li>Numbers use the first 10 letters (a-j) with a number prefix ⠼</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

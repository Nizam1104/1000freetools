"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, RefreshCw } from "lucide-react"

export default function Rot13Cipher() {
  const [inputText, setInputText] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const rot13 = (text: string): string => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const code = char.charCodeAt(0)
      const base = code >= 97 ? 97 : 65 // lowercase or uppercase
      return String.fromCharCode(base + ((code - base + 13) % 26))
    })
  }

  const output = useMemo(() => {
    if (!inputText.trim()) return ""
    return rot13(inputText)
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

  const handleSwap = useCallback(() => {
    setInputText(output)
  }, [output])

  const loadSample = useCallback(() => {
    setInputText("Hello, World! This is a secret message.")
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            Input Text
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
          placeholder="Enter text to encode/decode with ROT13..."
        />
      </section>

      {/* Swap Button */}
      {output && (
        <section className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwap}
            className="gap-2"
          >
            <RefreshCw className="size-4" />
            Swap Input/Output
          </Button>
        </section>
      )}

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">ROT13 Output</Label>
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
            <p className="font-mono text-lg break-all">{output}</p>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>ROT13 is its own inverse - apply it twice to get the original text</p>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About ROT13</h4>
            <p className="text-sm text-muted-foreground">
              ROT13 ("rotate by 13 places") is a simple letter substitution cipher that replaces 
              a letter with the 13th letter after it in the alphabet. It's a special case of the 
              Caesar cipher which was developed in ancient Rome.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>A ↔ N, B ↔ O, C ↔ P, ..., M ↔ Z</li>
              <li>Only affects letters (A-Z, a-z)</li>
              <li>Numbers, punctuation, and whitespace unchanged</li>
              <li>ROT13(ROT13(x)) = x (self-inverse)</li>
              <li>Not secure - used for hiding spoilers, puzzles, jokes</li>
            </ul>
            <div className="mt-2 p-2 bg-muted rounded text-xs font-mono">
              <p>Example: "Hello, World!" → "Uryyb, Jbeyq!"</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordPronunciationGenerator() {
  const [password, setPassword] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const pronunciation = useMemo(() => {
    if (!password) return null

    const symbolNames: Record<string, string> = {
      "!": "exclamation",
      "@": "at",
      "#": "hash",
      $: "dollar",
      "%": "percent",
      "^": "caret",
      "&": "ampersand",
      "*": "asterisk",
      "(": "open-paren",
      ")": "close-paren",
      "-": "hyphen",
      "_": "underscore",
      "=": "equals",
      "+": "plus",
      "[": "open-bracket",
      "]": "close-bracket",
      "{": "open-brace",
      "}": "close-brace",
      "\\": "backslash",
      "|": "pipe",
      ";": "semicolon",
      ":": "colon",
      "'": "apostrophe",
      '"': "quote",
      ",": "comma",
      ".": "dot",
      "<": "less-than",
      ">": "greater-than",
      "/": "slash",
      "?": "question",
      "~": "tilde",
      "`": "backtick",
    }

    const numberNames: Record<string, string> = {
      "0": "zero",
      "1": "one",
      "2": "two",
      "3": "three",
      "4": "four",
      "5": "five",
      "6": "six",
      "7": "seven",
      "8": "eight",
      "9": "nine",
    }

    const result: { char: string; pronunciation: string; type: "letter" | "number" | "symbol" }[] = []

    for (const char of password) {
      if (/[a-zA-Z]/.test(char)) {
        result.push({
          char,
          pronunciation: char.toLowerCase(),
          type: "letter",
        })
      } else if (/\d/.test(char)) {
        result.push({
          char,
          pronunciation: numberNames[char],
          type: "number",
        })
      } else {
        result.push({
          char,
          pronunciation: symbolNames[char] || `char-${char.charCodeAt(0)}`,
          type: "symbol",
        })
      }
    }

    return result
  }, [password])

  const phoneticString = useMemo(() => {
    if (!pronunciation) return ""
    return pronunciation.map(p => p.pronunciation).join(" ")
  }, [pronunciation])

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
    setPassword("")
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Password Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-base font-medium">
            Password
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(password, "password")}
              className="h-7"
              disabled={!password}
            >
              {copied === "password" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              className="h-7"
              disabled={!password}
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>

        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="font-mono text-lg"
          placeholder="Enter password to generate pronunciation..."
          autoComplete="off"
        />
      </section>

      {/* Results */}
      {pronunciation && (
        <section className="space-y-4">
          {/* Phonetic Display */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Phonetic Pronunciation</Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(phoneticString, "phonetic")}
                className="h-7"
              >
                {copied === "phonetic" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-mono text-sm">{phoneticString}</p>
            </div>
          </div>

          {/* Character by Character */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Character Breakdown</Label>
            <div className="rounded-lg border bg-background overflow-hidden">
              <div className="grid grid-cols-3 gap-px bg-border">
                <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Character</div>
                <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Type</div>
                <div className="bg-muted/50 px-3 py-2 text-xs font-medium">Say</div>
              </div>
              <div className="divide-y">
                {pronunciation.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-px bg-border">
                    <div className="bg-background px-3 py-2">
                      <span className="font-mono">{item.char}</span>
                    </div>
                    <div className="bg-background px-3 py-2">
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        item.type === "letter" && "bg-blue-500/10 text-blue-500",
                        item.type === "number" && "bg-green-500/10 text-green-500",
                        item.type === "symbol" && "bg-purple-500/10 text-purple-500"
                      )}>
                        {item.type}
                      </span>
                    </div>
                    <div className="bg-background px-3 py-2 font-mono text-sm">
                      {item.pronunciation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Display */}
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm font-medium mb-3">Visual Guide</p>
            <div className="flex flex-wrap gap-2">
              {pronunciation.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center font-mono text-lg mb-1",
                    item.type === "letter" && "bg-blue-500/10 text-blue-500",
                    item.type === "number" && "bg-green-500/10 text-green-500",
                    item.type === "symbol" && "bg-purple-500/10 text-purple-500"
                  )}>
                    {item.char}
                  </div>
                  <p className="text-xs text-muted-foreground max-w-[60px] truncate">
                    {item.pronunciation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Password Pronunciation Guide</h4>
            <p className="text-sm text-muted-foreground">
              This tool converts your password into a phonetic pronunciation guide, making it 
              easier to communicate complex passwords verbally or remember them.
            </p>
            <p className="text-sm text-muted-foreground">
              For example, "P@ssw0rd" becomes "P at s s w zero r d" - much easier to say 
              and remember than trying to describe each character!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

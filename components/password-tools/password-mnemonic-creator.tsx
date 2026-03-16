"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordMnemonicCreator() {
  const [password, setPassword] = useState<string>("")
  const [mnemonic, setMnemonic] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const symbolNames: Record<string, string> = {
    "!": "exclamation",
    "@": "at-sign",
    "#": "hashtag",
    $: "dollar",
    "%": "percent",
    "^": "caret",
    "&": "and-sign",
    "*": "asterisk",
    "(": "parenthesis",
    ")": "parenthesis",
    "-": "hyphen",
    "_": "underscore",
    "=": "equals",
    "+": "plus",
  }

  const generateMnemonic = useCallback((pwd: string) => {
    if (!pwd) return ""

    const words: string[] = []
    let currentWord = ""

    for (let i = 0; i < pwd.length; i++) {
      const char = pwd[i]

      if (/[a-zA-Z]/.test(char)) {
        currentWord += char.toLowerCase()
      } else if (/\d/.test(char)) {
        if (currentWord) {
          words.push(currentWord)
          currentWord = ""
        }
        const numWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
        words.push(numWords[parseInt(char)])
      } else {
        if (currentWord) {
          words.push(currentWord)
          currentWord = ""
        }
        const symbolName = symbolNames[char] || `symbol-${char.charCodeAt(0)}`
        words.push(symbolName)
      }
    }

    if (currentWord) {
      words.push(currentWord)
    }

    // Create a memorable sentence
    const sentenceTemplates = [
      (w: string[]) => `${w.join(" ")} is my secret code`,
      (w: string[]) => `Remember: ${w.join(" ")}`,
      (w: string[]) => `The password is: ${w.join(" ")}`,
      (w: string[]) => `${w.join(" ")} - keep this safe!`,
    ]

    const template = sentenceTemplates[Math.floor(Math.random() * sentenceTemplates.length)]
    return template(words)
  }, [])

  const generateStory = useCallback((pwd: string) => {
    if (!pwd) return ""

    const charDescriptions: Record<string, string> = {
      "a": "an apple",
      "b": "a bear",
      "c": "a cat",
      "d": "a dog",
      "e": "an elephant",
      "f": "a fox",
      "g": "a goat",
      "h": "a horse",
      "i": "an iguana",
      "j": "a jaguar",
      "k": "a kangaroo",
      "l": "a lion",
      "m": "a monkey",
      "n": "a newt",
      "o": "an owl",
      "p": "a panda",
      "q": "a quail",
      "r": "a rabbit",
      "s": "a snake",
      "t": "a tiger",
      "u": "an urchin",
      "v": "a vulture",
      "w": "a wolf",
      "x": "a xerus",
      "y": "a yak",
      "z": "a zebra",
      "0": "nothing",
      "1": "one thing",
      "2": "two things",
      "3": "three things",
      "4": "four things",
      "5": "five things",
      "6": "six things",
      "7": "seven things",
      "8": "eight things",
      "9": "nine things",
      "!": "surprise",
      "@": "at home",
      "#": "hashtag",
      $: "money",
      "%": "percent",
      "^": "up high",
      "&": "together",
      "*": "a star",
    }

    const story: string[] = []
    for (const char of pwd.toLowerCase()) {
      const desc = charDescriptions[char] || `something with ${char}`
      story.push(desc)
    }

    return `Story: ${story.join(", then ")}`
  }, [])

  React.useEffect(() => {
    setMnemonic(generateMnemonic(password))
  }, [password, generateMnemonic])

  const storyMnemonic = useMemo(() => generateStory(password), [password, generateStory])

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
    setMnemonic("")
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
          placeholder="Enter password to create mnemonic..."
          autoComplete="off"
        />
      </section>

      {/* Mnemonic Results */}
      {mnemonic && (
        <section className="space-y-4">
          {/* Phonetic Mnemonic */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Phonetic Mnemonic</Label>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(mnemonic, "mnemonic")}
                className="h-7"
              >
                {copied === "mnemonic" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span className="text-xs">Copy</span>
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-mono text-sm">{mnemonic}</p>
            </div>
          </div>

          {/* Story Mnemonic */}
          {storyMnemonic && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Memory Story</Label>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => copyToClipboard(storyMnemonic, "story")}
                  className="h-7"
                >
                  {copied === "story" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <div className="rounded-lg border bg-blue-500/10 border-blue-500/30 p-4">
                <p className="text-sm">{storyMnemonic}</p>
              </div>
            </div>
          )}

          {/* Character Breakdown */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Character Breakdown</Label>
            <div className="flex flex-wrap gap-2">
              {password.split("").map((char, idx) => {
                const charName = /[a-zA-Z]/.test(char) 
                  ? char.toLowerCase()
                  : /\d/.test(char)
                  ? ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][parseInt(char)]
                  : symbolNames[char] || `char-${char.charCodeAt(0)}`
                
                return (
                  <div key={idx} className="text-center">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-mono font-bold">
                      {char}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[60px] truncate">
                      {charName}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tips */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="size-5 text-yellow-500 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Memory Tips</h4>
            <p className="text-sm text-muted-foreground">
              Mnemonics help you remember complex passwords by converting them into 
              memorable phrases or stories. The brain remembers stories and patterns 
              better than random characters.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Read the mnemonic aloud several times</li>
              <li>Create a vivid mental image of the story</li>
              <li>Associate each character with something meaningful</li>
              <li>Practice recalling the password using the mnemonic</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

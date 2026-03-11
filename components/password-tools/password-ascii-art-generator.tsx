"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordAsciiArtGenerator() {
  const [password, setPassword] = useState<string>("")
  const [style, setStyle] = useState<"block" | "slant" | "small" | "bubble">("block")
  const [copied, setCopied] = useState<string | null>(null)

  // Simple ASCII art fonts
  const fonts = useMemo(() => ({
    block: {
      "A": [" ██ ", "██ ██", "█████", "██ ██", "██ ██"],
      "B": ["████ ", "██ ██", "████ ", "██ ██", "████ "],
      "C": [" ████", "██   ", "██   ", "██   ", " ████"],
      "D": ["████ ", "██ ██", "██ ██", "██ ██", "████ "],
      "E": ["█████", "██   ", "████ ", "██   ", "█████"],
      "F": ["█████", "██   ", "████ ", "██   ", "██   "],
      "G": [" ████", "██   ", "██ ██", "██ ██", " ████"],
      "H": ["██ ██", "██ ██", "█████", "██ ██", "██ ██"],
      "I": ["█████", "  ██  ", "  ██  ", "  ██  ", "█████"],
      "J": ["█████", "   ██ ", "   ██ ", "██ ██", " ███ "],
      "K": ["██ ██", "██ ██", "████ ", "██ ██", "██ ██"],
      "L": ["██   ", "██   ", "██   ", "██   ", "█████"],
      "M": ["██  ██", "██ ███", "██████", "██  ██", "██  ██"],
      "N": ["██  ██", "███ ██", "██████", "██ ███", "██  ██"],
      "O": [" ███ ", "██ ██", "██ ██", "██ ██", " ███ "],
      "P": ["████ ", "██ ██", "████ ", "██   ", "██   "],
      "Q": [" ███ ", "██ ██", "██ ██", "██ ███", " ████"],
      "R": ["████ ", "██ ██", "████ ", "██ ██", "██ ██"],
      "S": [" ████", "██   ", " ███ ", "   ██", "████ "],
      "T": ["█████", "  ██  ", "  ██  ", "  ██  ", "  ██  "],
      "U": ["██ ██", "██ ██", "██ ██", "██ ██", " ███ "],
      "V": ["██ ██", "██ ██", "██ ██", " ███ ", "  █  "],
      "W": ["██  ██", "██  ██", "██ ███", "██████", "██  ██"],
      "X": ["██ ██", " ███ ", "  ██  ", " ███ ", "██ ██"],
      "Y": ["██ ██", " ███ ", "  ██  ", "  ██  ", "  ██  "],
      "Z": ["█████", "   ██", "  ██ ", " ██  ", "█████"],
      "0": [" ███ ", "██ ██", "██ ██", "██ ██", " ███ "],
      "1": ["  ██ ", " ███ ", "  ██ ", "  ██ ", "█████"],
      "2": [" ███ ", "██ ██", "  ██ ", " ██  ", "█████"],
      "3": [" ███ ", "██ ██", " ███ ", "   ██", " ███ "],
      "4": ["██  ██", "██ ██", "█████", "   ██", "   ██"],
      "5": ["█████", "██   ", " ███ ", "   ██", " ███ "],
      "6": [" ███ ", "██   ", "████ ", "██ ██", " ███ "],
      "7": ["█████", "   ██", "  ██ ", " ██  ", " ██  "],
      "8": [" ███ ", "██ ██", " ███ ", "██ ██", " ███ "],
      "9": [" ███ ", "██ ██", " ████", "   ██", " ███ "],
      " ": ["    ", "    ", "    ", "    ", "    "],
      "!": [" ██ ", " ██ ", " ██ ", "    ", " ██ "],
      "@": [" ████ ", "██  ██", "██ @ ██", "██  ██", " ████ "],
      "#": ["      ", " ████ ", "██ ██ ██", " ████ ", "      "],
      "$": [" ████ ", "██ ███", " ████ ", "███ ██", " ████ "],
      "%": ["██  ██", "   ██ ", "  ██  ", " ██   ", "██  ██"],
      "^": ["  ██  ", " ████ ", "██  ██", "      ", "      "],
      "&": [" ███ ", "██  ██", " ███ ", "██  ██", " ████"],
      "*": ["      ", " ████ ", "██████", " ████ ", "      "],
    },
    slant: {
      "A": ["  __  ", " /  \\ ", "/ /\\ \\", "|  __|", "| |  "],
      "B": [" ___  ", "| __| ", "| __| ", "| |__ ", "|___| "],
      "C": ["  ___  ", " / __| ", "| |    ", "| |___ ", " \\____|"],
      "D": [" ___  ", "|   \\ ", "| |\\ \\ ", "| | \\ \\", "|___/ "],
      "E": [" _____ ", "| ____|", "| |__  ", "|  __| ", "|_____|"],
      "F": [" _____ ", "| ____|", "| |__  ", "|  __| ", "| |    "],
      "G": ["  ___  ", " / _ \\ ", "| | | |", "| |_| |", " \\___/ "],
      "H": [" _   _ ", "| | | |", "| |_| |", "|  _  |", "|_| |_|"],
      "I": [" ___ ", "|_ _|", " | | ", " | | ", "|___|"],
      "J": ["     _ ", "    | |", " _  | |", "| \\_| |", " \\___/ "],
      "K": [" _  _  ", "| |/ / ", "|   <  ", "| . \\  ", "|_|\\_\\ "],
      "L": [" _     ", "| |    ", "| |__  ", "|  __| ", "|_____|"],
      "M": [" __  __ ", "|  \\/  |", "| |\\/| |", "| |  | |", "|_|  |_|"],
      "N": [" _  _ ", "| \\| |", "| .` |", "|_|\\_|", "      "],
      "O": ["  ___  ", " / _ \\ ", "| | | |", "| | | |", " \\___/ "],
      "P": [" ___  ", "| _ \\ ", "|  _/ ", "| |   ", "|_|   "],
      "Q": ["  ___  ", " / _ \\ ", "| | | |", "| |_| |", " \\_\\_\\_|"],
      "R": [" ___  ", "| _ \\ ", "|   / ", "| |\\ \\ ", "|_| \\_\\"],
      "S": [" ___ ", "/ __|", "\\__ \\", "|___/", "    "],
      "T": [" _____ ", "|_   _|", "  | |  ", "  | |  ", "  |_|  "],
      "U": [" _   _ ", "| | | |", "| | | |", "| |_| |", " \\___/ "],
      "V": ["__   __", "\\ \\ / /", " \\ V / ", "  \\_/  ", "       "],
      "W": [" __      __", " \\ \\    / /", "  \\ \\/\\/ / ", "   \\_/\\_/  ", "           "],
      "X": ["__  __", "\\ \\/ /", " >  < ", "/_/\\_\\", "      "],
      "Y": ["__   __", "  \\ \\ / /", "   \\ V / ", "    |_|  ", "         "],
      "Z": [" ______ ", "|__  / |", "  / /| |", " / /_| |", "/____|_|"],
      "0": ["  ___  ", " / _ \\ ", "| | | |", "| | | |", " \\___/ "],
      "1": [" _ ", "/ |", "| |", "| |", "|_|"],
      "2": [" ___ ", "|__ \\", "   ) |", "  / / ", " /_/  "],
      "3": [" _____ ", "|__  / ", "  / /  ", " / /_  ", "|____| "],
      "4": [" _  _  ", "| || | ", "| || |_ ", "|__   _|", "   |_|  "],
      "5": [" _____ ", "| ___|", "|___ \\ ", " ___) |", "|____/ "],
      "6": ["  __  ", " / /  ", "/ /_  ", "|  _| ", "|___| "],
      "7": [" ______ ", "|__  / |", "  / /| |", " / /_| |", "/____|_|"],
      "8": ["  ___  ", " / _ \\ ", "| (_) |", " \\__, |", "   /_/ "],
      "9": ["  ___  ", " / _ \\ ", "| (_) |", " \\__, |", "   /_/ "],
      " ": [" ", " ", " ", " ", " "],
      "!": [" _ ", "| |", "| |", "|_|", "(_)"],
      "@": ["  ___  ", " / _ \\ ", "| | | |", "| | | |", " \\___/ "],
      "#": ["       ", "  _  _  ", " | || | ", " | || |_ ", " |__   _|", "    |_|  "],
      "$": ["  ___  ", " / __| ", "| (__  ", " \\___| ", "       "],
      "%": [" __     ", "|  |    ", "|  |    ", "|__|    ", "        "],
      "^": ["   _   ", "  | |  ", "  | |  ", "  |_|  ", "       "],
      "&": ["  ___  ", " / _ \\ ", "| (_) |", " \\__, |", "   /_/ "],
      "*": ["   _   ", " _| |_ ", "|_   _|", "  |_|  ", "       "],
    },
    small: {
      "A": [" _ ", "/_\\", "| |"],
      "B": ["__ ", "|_)", "|_ "],
      "C": [" _ ", "/ /", "\\_\\"],
      "D": ["__ ", "|  \\", "|_/"],
      "E": ["__ ", "|_)", "|__"],
      "F": ["__ ", "|_)", "|  "],
      "G": [" _ ", "/ /", "\\_["],
      "H": ["   ", "|_|", "| |"],
      "I": ["__", "  ", "__"],
      "J": [" _ ", "  |", "__|"],
      "K": ["  _", "|/ ", "| \\"],
      "L": ["  ", "| ", "|_"],
      "M": [" __ __ ", "|  V  |", "|_| |_||"],
      "N": [" _ _ ", "| \\| |", "| |\\| |"],
      "O": [" _ ", "| |", "|_|"],
      "P": [" __ ", "|_)", "|  "],
      "Q": [" _ ", "| |", "|_\\|"],
      "R": [" __ ", "|_)", "|\\ \\"],
      "S": [" __ ", "/_/", "__\\"],
      "T": ["___", " | ", " | "],
      "U": ["| |", "| |", "|_|"],
      "V": ["\\ /", " V ", "   "],
      "W": ["\\   /", " \\ / ", "  V  "],
      "X": ["\\ /", " X ", "/ \\"],
      "Y": ["\\ /", " | ", " | "],
      "Z": ["__/", " / ", "/__"],
      "0": [" _ ", "| |", "|_|"],
      "1": [" ", "|", " "],
      "2": [" _ ", " _|", "|_ "],
      "3": [" _ ", " _|", " _|"],
      "4": ["|_|", "  |", "  |"],
      "5": ["|_ ", "|_)", " _|"],
      "6": [" _ ", "|_ ", "|_|"],
      "7": ["__ ", "  |", "  |"],
      "8": [" _ ", "|_|", "|_|"],
      "9": [" _ ", "|_|", " _|"],
      " ": [" ", " ", " "],
      "!": ["|", "|", "|"],
      "@": [" _ ", "@_@", " _ "],
      "#": ["#", "#", "#"],
      "$": ["$", "$", "$"],
      "%": ["%", "%", "%"],
      "^": ["^", " ", " "],
      "&": ["&", "&", "&"],
      "*": ["*", "*", "*"],
    },
    bubble: {
      "A": [" ⓐ ", "   ", "   "],
      "B": [" ⓑ ", "   ", "   "],
      "C": [" ⓒ ", "   ", "   "],
      "D": [" ⓓ ", "   ", "   "],
      "E": [" ⓔ ", "   ", "   "],
      "F": [" ⓕ ", "   ", "   "],
      "G": [" ⓖ ", "   ", "   "],
      "H": [" ⓗ ", "   ", "   "],
      "I": [" ⓘ ", "   ", "   "],
      "J": [" ⓙ ", "   ", "   "],
      "K": [" ⓚ ", "   ", "   "],
      "L": [" ⓛ ", "   ", "   "],
      "M": [" ⓜ ", "   ", "   "],
      "N": [" ⓝ ", "   ", "   "],
      "O": [" ⓞ ", "   ", "   "],
      "P": [" ⓟ ", "   ", "   "],
      "Q": [" ⓠ ", "   ", "   "],
      "R": [" ⓡ ", "   ", "   "],
      "S": [" ⓢ ", "   ", "   "],
      "T": [" ⓣ ", "   ", "   "],
      "U": [" ⓤ ", "   ", "   "],
      "V": [" ⓥ ", "   ", "   "],
      "W": [" ⓦ ", "   ", "   "],
      "X": [" ⓧ ", "   ", "   "],
      "Y": [" ⓨ ", "   ", "   "],
      "Z": [" ⓩ ", "   ", "   "],
      "0": [" ⓪ ", "   ", "   "],
      "1": [" ① ", "   ", "   "],
      "2": [" ② ", "   ", "   "],
      "3": [" ③ ", "   ", "   "],
      "4": [" ④ ", "   ", "   "],
      "5": [" ⑤ ", "   ", "   "],
      "6": [" ⑥ ", "   ", "   "],
      "7": [" ⑦ ", "   ", "   "],
      "8": [" ⑧ ", "   ", "   "],
      "9": [" ⑨ ", "   ", "   "],
      " ": ["   ", "   ", "   "],
      "!": [" ! ", "   ", "   "],
      "@": [" @ ", "   ", "   "],
      "#": [" # ", "   ", "   "],
      "$": [" $ ", "   ", "   "],
      "%": [" % ", "   ", "   "],
      "^": [" ^ ", "   ", "   "],
      "&": [" & ", "   ", "   "],
      "*": [" * ", "   ", "   "],
    },
  }), [])

  const generateAsciiArt = useCallback(() => {
    if (!password) return ""
    
    const font = fonts[style]
    const height = style === "block" || style === "slant" ? 5 : style === "small" ? 3 : 3
    
    const lines: string[] = Array(height).fill("")
    
    for (const char of password.toUpperCase()) {
      const charArt = font[char as keyof typeof font] || font[" "]
      if (charArt) {
        for (let i = 0; i < height; i++) {
          lines[i] += (charArt[i] || "   ") + " "
        }
      }
    }
    
    return lines.join("\n")
  }, [password, style, fonts])

  const asciiArt = useMemo(() => generateAsciiArt(), [generateAsciiArt])

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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Password Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-base font-medium">
            Password / Text
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="font-mono text-lg"
          placeholder="Enter text to convert to ASCII art..."
        />
      </section>

      {/* Style Selector */}
      <section className="space-y-3">
        <Label>ASCII Art Style</Label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "block", label: "Block" },
            { value: "slant", label: "Slant" },
            { value: "small", label: "Small" },
            { value: "bubble", label: "Bubble" },
          ].map((s) => (
            <Button
              key={s.value}
              variant={style === s.value ? "default" : "outline"}
              onClick={() => setStyle(s.value as typeof style)}
              size="sm"
            >
              {s.label}
            </Button>
          ))}
        </div>
      </section>

      {/* ASCII Art Output */}
      {asciiArt && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">ASCII Art Output</Label>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(asciiArt, "ascii")}
              className="h-7"
            >
              {copied === "ascii" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 overflow-x-auto">
            <pre className="font-mono text-sm whitespace-pre">{asciiArt}</pre>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">ASCII Art Password</h4>
            <p className="text-sm text-muted-foreground">
              Transform your password into ASCII art for fun visual representations.
              Great for creating unique signatures, adding flair to documents, or
              just having fun with text!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

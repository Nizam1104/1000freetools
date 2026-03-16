"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

type ReverseType = "all" | "words" | "lines" | "upside"

export default function TextReverser() {
  const [inputText, setInputText] = useState<string>("")
  const [reverseType, setReverseType] = useState<ReverseType>("all")
  const [copied, setCopied] = useState<string | null>(null)

  const upsideDownMap: Record<string, string> = {
    a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ",
    i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d",
    q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x",
    y: "ʎ", z: "z",
    A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H",
    I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ",
    Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X",
    Y: "⅄", Z: "Z",
    "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "h", "5": "S",
    "6": "9", "7": "L", "8": "8", "9": "6",
    ".": "˙", ",": "'", "'": ",", "?": "¿", "!": "¡",
    "(": ")", ")": "(", "[": "]", "]": "[", "<": ">", ">": "<",
    "_": "‾", "-": "-", "&": "⅋", "@": "℀",
  }

  const output = useMemo(() => {
    if (!inputText) return ""

    switch (reverseType) {
      case "all":
        return inputText.split("").reverse().join("")
      case "words":
        return inputText
          .split(" ")
          .map((word) => word.split("").reverse().join(""))
          .join(" ")
      case "lines":
        return inputText
          .split("\n")
          .map((line) => line.split("").reverse().join(""))
          .join("\n")
      case "upside":
        return inputText
          .split("")
          .map((char) => upsideDownMap[char] || char)
          .reverse()
          .join("")
      default:
        return inputText
    }
  }, [inputText, reverseType, upsideDownMap])

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
      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-text" className="text-base font-medium">
            Input Text
          </Label>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(inputText, "input")}
            >
              {copied === "input" ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInputText("")}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>

        <Textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Enter text to reverse..."
        />
      </section>

      {/* Reverse Type Selection */}
      <section className="space-y-3">
        <Label>Reverse Type</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={reverseType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setReverseType("all")}
          >
            Reverse All
          </Button>
          <Button
            variant={reverseType === "words" ? "default" : "outline"}
            size="sm"
            onClick={() => setReverseType("words")}
          >
            Reverse Words
          </Button>
          <Button
            variant={reverseType === "lines" ? "default" : "outline"}
            size="sm"
            onClick={() => setReverseType("lines")}
          >
            Reverse Lines
          </Button>
          <Button
            variant={reverseType === "upside" ? "default" : "outline"}
            size="sm"
            onClick={() => setReverseType("upside")}
          >
            Upside Down
          </Button>
        </div>
      </section>

      {/* Output Section */}
      {output && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Reversed Output</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(output, "output")}
            >
              {copied === "output" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              {copied === "output" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-mono text-sm whitespace-pre-wrap break-all">{output}</p>
          </div>
        </section>
      )}
    </div>
  )
}

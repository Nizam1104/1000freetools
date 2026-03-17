"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface UnicodeInfo {
  codePoint: number
  character: string
  name: string
  category: string
}

export default function UnicodeCharacterEncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"text-to-unicode" | "unicode-to-text">("text-to-unicode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [format, setFormat] = useState<"hex" | "decimal" | "escape">("hex")
  const [showDetails, setShowDetails] = useState<boolean>(false)

  const textToUnicode = useCallback((text: string, fmt: typeof format): string => {
    const codePoints = Array.from(text).map(char => {
      const code = char.codePointAt(0) || 0
      if (fmt === "hex") {
        return `U+${code.toString(16).toUpperCase().padStart(4, "0")}`
      } else if (fmt === "decimal") {
        return code.toString()
      } else {
        return `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`
      }
    })
    return codePoints.join(" ")
  }, [])

  const unicodeToText = useCallback((unicode: string, fmt: typeof format): string => {
    let result = ""
    if (fmt === "escape") {
      try {
        result = JSON.parse(`"${unicode}"`)
      } catch {
        const matches = unicode.match(/\\u([0-9A-Fa-f]{4})/g)
        if (matches) {
          result = matches.map(m => String.fromCharCode(parseInt(m.slice(2), 16))).join("")
        }
      }
    } else if (fmt === "hex") {
      const matches = unicode.match(/U\+([0-9A-Fa-f]{4,6})/g)
      if (matches) {
        result = matches.map(m => {
          const code = parseInt(m.slice(2), 16)
          return String.fromCodePoint(code)
        }).join("")
      }
    } else {
      const matches = unicode.match(/\d+/g)
      if (matches) {
        result = matches.map(m => {
          const code = parseInt(m, 10)
          return String.fromCodePoint(code)
        }).join("")
      }
    }
    return result
  }, [])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)
    try {
      if (mode === "text-to-unicode") {
        setOutput(textToUnicode(value, format))
      } else {
        setOutput(unicodeToText(value, format))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setOutput("")
    }
  }, [mode, format, textToUnicode, unicodeToText])

  const handleModeChange = useCallback((newMode: typeof mode) => {
    setMode(newMode)
    setError(null)
    if (newMode === "text-to-unicode") {
      setOutput(textToUnicode(input, format))
    } else {
      setOutput(unicodeToText(input, format))
    }
  }, [input, format, textToUnicode, unicodeToText])

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
    setInput("")
    setOutput("")
    setError(null)
  }, [])

  const getUnicodeDetails = useCallback((): UnicodeInfo[] => {
    return Array.from(input).map(char => {
      const code = char.codePointAt(0) || 0
      return {
        codePoint: code,
        character: char,
        name: getUnicodeName(code),
        category: getUnicodeCategory(code)
      }
    })
  }, [input])

  const getUnicodeName = (code: number): string => {
    const names: Record<number, string> = {
      0x0020: "SPACE",
      0x0041: "LATIN CAPITAL LETTER A",
      0x0061: "LATIN SMALL LETTER A",
      0x03B1: "GREEK SMALL LETTER ALPHA",
      0x03C0: "GREEK SMALL LETTER PI",
      0x2665: "BLACK HEART SUIT",
      0x1F600: "GRINNING FACE",
      0x1F602: "FACE WITH TEARS OF JOY",
      0x2764: "HEAVY BLACK HEART",
      0x1F4A9: "PILE OF POO",
    }
    return names[code] || "Unknown character"
  }

  const getUnicodeCategory = (code: number): string => {
    if (code >= 0x0041 && code <= 0x005A) return "Uppercase Letter"
    if (code >= 0x0061 && code <= 0x007A) return "Lowercase Letter"
    if (code >= 0x0030 && code <= 0x0039) return "Decimal Number"
    if (code >= 0x0370 && code <= 0x03FF) return "Greek"
    if (code >= 0x4E00 && code <= 0x9FFF) return "CJK Ideograph"
    if (code >= 0x1F600 && code <= 0x1F64F) return "Emoticon"
    if (code === 0x0020) return "Whitespace"
    return "Other"
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Unicode Character Encoder/Decoder</h2>
        <p className="text-sm text-muted-foreground">
          Convert text to Unicode code points and vice versa
        </p>
      </div>

      {/* Mode Selection */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "text-to-unicode" ? "default" : "outline"}
            onClick={() => handleModeChange("text-to-unicode")}
            className="flex-1"
          >
            Text to Unicode
          </Button>
          <Button
            variant={mode === "unicode-to-text" ? "default" : "outline"}
            onClick={() => handleModeChange("unicode-to-text")}
            className="flex-1"
          >
            Unicode to Text
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Label className="text-sm">Output Format:</Label>
          <div className="flex gap-2">
            <Button
              variant={format === "hex" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setFormat("hex")
                handleInputChange(input)
              }}
            >
              U+XXXX (Hex)
            </Button>
            <Button
              variant={format === "decimal" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setFormat("decimal")
                handleInputChange(input)
              }}
            >
              Decimal
            </Button>
            <Button
              variant={format === "escape" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setFormat("escape")
                handleInputChange(input)
              }}
            >
              \uXXXX (Escape)
            </Button>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === "text-to-unicode" ? "Text Input" : "Unicode Code Points"}
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
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className={cn(
            "font-mono text-sm min-h-[120px]",
            error ? "border-destructive focus-visible:border-destructive" : ""
          )}
          placeholder={mode === "text-to-unicode" ? "Enter text (e.g., Hello, \u03B1\u03B2\u03B3, \u{1F600})..." : "Enter Unicode (e.g., U+0048 U+0065 U+006C U+006C U+006F)..."}
        />

        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            {error}
          </p>
        )}
      </section>

      {/* Output Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="output" className="text-base font-medium">
            {mode === "text-to-unicode" ? "Unicode Code Points" : "Decoded Text"}
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

      {/* Character Details */}
      {showDetails && input && mode === "text-to-unicode" && (
        <section className="space-y-3">
          <Label className="text-base font-medium">Character Details</Label>
          <div className="rounded-lg border bg-muted/30 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">Char</th>
                  <th className="px-4 py-2 text-left">Code Point</th>
                  <th className="px-4 py-2 text-left">Hex</th>
                  <th className="px-4 py-2 text-left">Category</th>
                </tr>
              </thead>
              <tbody>
                {getUnicodeDetails().map((info, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 font-mono">{info.character}</td>
                    <td className="px-4 py-2 font-mono">{info.codePoint}</td>
                    <td className="px-4 py-2 font-mono">U+{info.codePoint.toString(16).toUpperCase().padStart(4, "0")}</td>
                    <td className="px-4 py-2">{info.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {input && mode === "text-to-unicode" && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide" : "Show"} Character Details
          </Button>
        </div>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Unicode</h4>
            <p className="text-sm text-muted-foreground">
              Unicode is a universal character encoding standard that assigns a unique number
              (code point) to every character, regardless of platform, program, or language.
              It supports over 149,000 characters from more than 160 scripts.
            </p>
            <p className="text-sm text-muted-foreground">
              Code points are typically written as U+XXXX where XXXX is a hexadecimal number.
              The standard includes characters from virtually all writing systems in use today.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

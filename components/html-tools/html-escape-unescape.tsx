"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"

export function HtmlEscapeUnescape() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"escape" | "unescape">("escape")
  const [copied, setCopied] = useState(false)

  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  }

  const escapeHTML = useCallback((str: string): string => {
    return str.replace(/[&<>"'`=\/]/g, (char) => htmlEntities[char] || char)
  }, [])

  const unescapeHTML = useCallback((str: string): string => {
    const entityMap: Record<string, string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&#x27;': '/',
      '&#x60;': '`',
      '&#x3D;': '=',
      '&nbsp;': ' ',
      '&copy;': '©',
      '&reg;': '®',
      '&trade;': '™',
      '&euro;': '€',
      '&pound;': '£',
      '&yen;': '¥',
      '&cent;': '¢',
      '&ndash;': '–',
      '&mdash;': '—',
      '&lsquo;': '\u2018',
      '&rsquo;': '\u2019',
      '&ldquo;': '\u201c',
      '&rdquo;': '\u201d',
      '&hellip;': '…',
      '&bull;': '•',
      '&middot;': '·',
      '&minus;': '−',
      '&plusmn;': '±',
      '&times;': '×',
      '&divide;': '÷',
    }
    return str.replace(/&(#?[a-zA-Z0-9]+);/g, (match) => {
      if (match.startsWith('&#x')) {
        return String.fromCharCode(parseInt(match.slice(3, -1), 16))
      } else if (match.startsWith('&#')) {
        return String.fromCharCode(parseInt(match.slice(2, -1)))
      }
      return entityMap[match] || match
    })
  }, [])

  const handleConvert = useCallback(() => {
    try {
      const result = mode === "escape" ? escapeHTML(input) : unescapeHTML(input)
      setOutput(result)
    } catch (error) {
      setOutput("Error: Conversion failed")
    }
  }, [input, mode, escapeHTML, unescapeHTML])

  const handleCopy = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
  }, [])

  const handleSwap = useCallback(() => {
    setMode(mode === "escape" ? "unescape" : "escape")
    setInput(output)
    setOutput(input)
  }, [mode, input, output])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Escape / Unescape</h2>
            <p className="text-sm text-muted-foreground">
              Convert special characters to HTML entities and back
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSwap}>
            Swap Mode
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Button
          variant={mode === "escape" ? "default" : "outline"}
          onClick={() => setMode("escape")}
        >
          Escape (Text → HTML Entities)
        </Button>
        <Button
          variant={mode === "unescape" ? "default" : "outline"}
          onClick={() => setMode("unescape")}
        >
          Unescape (HTML Entities → Text)
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="input">
            {mode === "escape" ? "Plain Text" : "HTML Encoded Text"}
          </Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "escape" 
              ? "Enter text to escape...\n\nExample: <script>alert('XSS')</script>"
              : "Enter HTML encoded text to unescape...\n\nExample: &lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;"
            }
            className="min-h-[400px] font-mono text-sm"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} className="flex-1">
              {mode === "escape" ? "Escape" : "Unescape"}
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">
            {mode === "escape" ? "HTML Encoded" : "Plain Text"}
          </Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="min-h-[400px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!output} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">Common HTML Entities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex justify-between"><span>&lt;</span><span className="text-muted-foreground">&amp;lt;</span></div>
          <div className="flex justify-between"><span>&gt;</span><span className="text-muted-foreground">&amp;gt;</span></div>
          <div className="flex justify-between"><span>&amp;</span><span className="text-muted-foreground">&amp;amp;</span></div>
          <div className="flex justify-between"><span>&quot;</span><span className="text-muted-foreground">&amp;quot;</span></div>
          <div className="flex justify-between"><span>&apos;</span><span className="text-muted-foreground">&amp;#39;</span></div>
          <div className="flex justify-between"><span>©</span><span className="text-muted-foreground">&amp;copy;</span></div>
          <div className="flex justify-between"><span>®</span><span className="text-muted-foreground">&amp;reg;</span></div>
          <div className="flex justify-between"><span>™</span><span className="text-muted-foreground">&amp;trade;</span></div>
          <div className="flex justify-between"><span>€</span><span className="text-muted-foreground">&amp;euro;</span></div>
          <div className="flex justify-between"><span>£</span><span className="text-muted-foreground">&amp;pound;</span></div>
          <div className="flex justify-between"><span>¥</span><span className="text-muted-foreground">&amp;yen;</span></div>
          <div className="flex justify-between"><span>…</span><span className="text-muted-foreground">&amp;hellip;</span></div>
        </div>
      </div>
    </div>
  )
}

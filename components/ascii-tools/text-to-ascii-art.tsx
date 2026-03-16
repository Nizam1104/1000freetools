"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, Download } from "lucide-react"
import { cn } from "@/lib/utils"

// Simple ASCII art font (block letters)
const asciiFont: Record<string, string[]> = {
  'A': [
    '  ██  ',
    ' ████ ',
    '██  ██',
    '██████',
    '██  ██',
    '██  ██'
  ],
  'B': [
    '█████ ',
    '██  ██',
    '█████ ',
    '██  ██',
    '██  ██',
    '█████ '
  ],
  'C': [
    ' ████ ',
    '██    ',
    '██    ',
    '██    ',
    '██    ',
    ' ████ '
  ],
  'D': [
    '████  ',
    '██  ██',
    '██  ██',
    '██  ██',
    '██  ██',
    '████  '
  ],
  'E': [
    '██████',
    '██    ',
    '████  ',
    '██    ',
    '██    ',
    '██████'
  ],
  'F': [
    '██████',
    '██    ',
    '████  ',
    '██    ',
    '██    ',
    '██    '
  ],
  'G': [
    ' ████ ',
    '██    ',
    '██ ███',
    '██  ██',
    '██  ██',
    ' ████ '
  ],
  'H': [
    '██  ██',
    '██  ██',
    '██████',
    '██  ██',
    '██  ██',
    '██  ██'
  ],
  'I': [
    '████',
    ' ██ ',
    ' ██ ',
    ' ██ ',
    ' ██ ',
    '████'
  ],
  'J': [
    '  ████',
    '   ██ ',
    '   ██ ',
    '   ██ ',
    '██ ██ ',
    ' ███  '
  ],
  'K': [
    '██  ██',
    '██ ██ ',
    '████  ',
    '██ ██ ',
    '██  ██',
    '██  ██'
  ],
  'L': [
    '██    ',
    '██    ',
    '██    ',
    '██    ',
    '██    ',
    '██████'
  ],
  'M': [
    '██  ██',
    '██████',
    '██ █ ██',
    '██  ██',
    '██  ██',
    '██  ██'
  ],
  'N': [
    '██  ██',
    '███ ██',
    '██ ███',
    '██  ██',
    '██  ██',
    '██  ██'
  ],
  'O': [
    ' ████ ',
    '██  ██',
    '██  ██',
    '██  ██',
    '██  ██',
    ' ████ '
  ],
  'P': [
    '█████ ',
    '██  ██',
    '█████ ',
    '██    ',
    '██    ',
    '██    '
  ],
  'Q': [
    ' ████ ',
    '██  ██',
    '██  ██',
    '██  ██',
    '██ ██ ',
    ' ████ '
  ],
  'R': [
    '█████ ',
    '██  ██',
    '█████ ',
    '██ ██ ',
    '██  ██',
    '██  ██'
  ],
  'S': [
    ' ████ ',
    '██    ',
    ' ████ ',
    '    ██',
    '    ██',
    '█████ '
  ],
  'T': [
    '██████',
    '  ██  ',
    '  ██  ',
    '  ██  ',
    '  ██  ',
    '  ██  '
  ],
  'U': [
    '██  ██',
    '██  ██',
    '██  ██',
    '██  ██',
    '██  ██',
    ' ████ '
  ],
  'V': [
    '██  ██',
    '██  ██',
    '██  ██',
    '██  ██',
    ' ████ ',
    '  ██  '
  ],
  'W': [
    '██  ██',
    '██  ██',
    '██  ██',
    '██ █ ██',
    '██████',
    '██  ██'
  ],
  'X': [
    '██  ██',
    ' ████ ',
    '  ██  ',
    '  ██  ',
    ' ████ ',
    '██  ██'
  ],
  'Y': [
    '██  ██',
    ' ████ ',
    '  ██  ',
    '  ██  ',
    '  ██  ',
    '  ██  '
  ],
  'Z': [
    '██████',
    '   ██ ',
    '  ██  ',
    ' ██   ',
    '██    ',
    '██████'
  ],
  '0': [
    ' ████ ',
    '██  ██',
    '██  ██',
    '██  ██',
    '██  ██',
    ' ████ '
  ],
  '1': [
    '  ██  ',
    ' ███  ',
    '  ██  ',
    '  ██  ',
    '  ██  ',
    '██████'
  ],
  '2': [
    ' ████ ',
    '██  ██',
    '   ██ ',
    '  ██  ',
    ' ██   ',
    '██████'
  ],
  '3': [
    ' ████ ',
    '██  ██',
    '  ███ ',
    '    ██',
    '██  ██',
    ' ████ '
  ],
  '4': [
    '██  ██',
    '██  ██',
    '██████',
    '    ██',
    '    ██',
    '    ██'
  ],
  '5': [
    '██████',
    '██    ',
    '████  ',
    '    ██',
    '██  ██',
    ' ████ '
  ],
  '6': [
    ' ████ ',
    '██    ',
    '████  ',
    '██  ██',
    '██  ██',
    ' ████ '
  ],
  '7': [
    '██████',
    '    ██',
    '   ██ ',
    '  ██  ',
    ' ██   ',
    ' ██   '
  ],
  '8': [
    ' ████ ',
    '██  ██',
    ' ████ ',
    '██  ██',
    '██  ██',
    ' ████ '
  ],
  '9': [
    ' ████ ',
    '██  ██',
    '██  ██',
    ' ████ ',
    '    ██',
    ' ████ '
  ],
  ' ': [
    '      ',
    '      ',
    '      ',
    '      ',
    '      ',
    '      '
  ],
  '!': [
    ' ██ ',
    ' ██ ',
    ' ██ ',
    '    ',
    ' ██ ',
    '    '
  ],
  '?': [
    ' ████ ',
    '██  ██',
    '   ██ ',
    '  ██  ',
    '      ',
    '  ██  '
  ],
  '.': [
    '      ',
    '      ',
    '      ',
    '      ',
    '      ',
    ' ██   '
  ],
  ',': [
    '      ',
    '      ',
    '      ',
    '      ',
    '  ██  ',
    ' ██   '
  ],
  '-': [
    '      ',
    '      ',
    '██████',
    '      ',
    '      ',
    '      '
  ],
  ':': [
    '      ',
    '      ',
    '  ██  ',
    '      ',
    '  ██  ',
    '      '
  ],
  "'": [
    ' ██ ',
    ' ██ ',
    '    ',
    '    ',
    '    ',
    '    '
  ],
  '"': [
    ' ██ ██ ',
    ' ██ ██ ',
    '       ',
    '       ',
    '       ',
    '       '
  ]
}

type FontStyle = 'block' | 'slant' | 'simple'

export default function TextToAsciiArt() {
  const [inputText, setInputText] = useState<string>("")
  const [fontStyle, setFontStyle] = useState<FontStyle>('block')
  const [character, setCharacter] = useState<string>('█')
  const [outputWidth, setOutputWidth] = useState<number>(80)
  const [copied, setCopied] = useState<string | null>(null)

  const generateAsciiArt = useCallback((text: string, style: FontStyle, char: string): string => {
    const lines: string[] = []
    const charHeight = 6
    
    // Get the appropriate font based on style
    const font = asciiFont
    
    // Process each character
    for (let lineIdx = 0; lineIdx < charHeight; lineIdx++) {
      let line = ''
      for (const char of text.toUpperCase()) {
        const charArt = font[char] || font[' '] || Array(6).fill('      ')
        const charLine = charArt[lineIdx] || '      '
        
        // Replace block character with custom character
        const styledLine = charLine.replace(/█/g, char).replace(/░/g, ' ')
        line += styledLine + ' '
      }
      lines.push(line)
    }
    
    return lines.join('\n')
  }, [])

  const output = useMemo(() => {
    if (!inputText.trim()) return ""
    return generateAsciiArt(inputText.slice(0, 20), fontStyle, character)
  }, [inputText, fontStyle, character, generateAsciiArt])

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

  const handleDownload = useCallback(() => {
    if (!output) return
    
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ascii-art.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [output])

  const loadSample = useCallback(() => {
    setInputText("HELLO")
  }, [])

  const commonWords = ["HELLO", "WORLD", "ASCII", "CODE", "TEXT"]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
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
          onChange={(e) => setInputText(e.target.value.slice(0, 20))}
          className="font-mono text-sm uppercase"
          placeholder="Enter text (max 20 chars)..."
        />

        {/* Quick Words */}
        <div className="flex flex-wrap gap-2">
          {commonWords.map((word) => (
            <Button
              key={word}
              variant="outline"
              size="sm"
              onClick={() => setInputText(word)}
              className="text-xs"
            >
              {word}
            </Button>
          ))}
        </div>
      </section>

      {/* Style Options */}
      <section className="space-y-4">
        {/* Font Style */}
        <div className="space-y-2">
          <Label className="text-sm">Character Style</Label>
          <div className="flex gap-2">
            <Button
              variant={character === '█' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCharacter('█')}
              className="font-mono"
            >
              Block █
            </Button>
            <Button
              variant={character === '#' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCharacter('#')}
              className="font-mono"
            >
              Hash #
            </Button>
            <Button
              variant={character === '*' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCharacter('*')}
              className="font-mono"
            >
              Asterisk *
            </Button>
            <Button
              variant={character === '@' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCharacter('@')}
              className="font-mono"
            >
              At @
            </Button>
            <Button
              variant={character === '░' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCharacter('░')}
              className="font-mono"
            >
              Light ░
            </Button>
          </div>
        </div>
      </section>

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">ASCII Art Output</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={handleDownload}
                className="h-7"
              >
                <Download className="size-3.5" />
                <span className="text-xs">Download</span>
              </Button>
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
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 overflow-x-auto">
            <pre className="font-mono text-sm leading-none whitespace-pre">
              {output}
            </pre>
          </div>

          <div className="text-sm text-muted-foreground">
            <span>Characters: <span className="font-medium text-foreground">{inputText.length}</span></span>
            <span className="mx-2">•</span>
            <span>Output lines: <span className="font-medium text-foreground">6</span></span>
            <span className="mx-2">•</span>
            <span>Output width: <span className="font-medium text-foreground">{output.split('\n')[0]?.length || 0} chars</span></span>
          </div>
        </section>
      )}

      {/* Character Reference */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Supported Characters</Label>
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="grid grid-cols-10 md:grid-cols-15 gap-1 text-center font-mono text-sm">
            {['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
              '0','1','2','3','4','5','6','7','8','9',' ','!','?','.',',','-',"'",'"',':'].map(char => (
              <div key={char} className="p-1 hover:bg-muted rounded cursor-default">
                {char === ' ' ? '(space)' : char}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About ASCII Art</h4>
            <p className="text-sm text-muted-foreground">
              ASCII art is a graphic design technique that uses computers for presentation 
              and consists of pictures pieced together from the 95 printable characters 
              defined by the ASCII Standard. Modern ASCII art often uses Unicode box-drawing 
              characters for more detailed images.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Popular in early computing and BBS systems</li>
              <li>Used in code comments, README files, and documentation</li>
              <li>Can be created with any monospace font</li>
              <li>Often used for logos, banners, and signatures</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

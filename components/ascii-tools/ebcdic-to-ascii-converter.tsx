"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, ArrowRightLeft } from "lucide-react"
import { cn } from "@/lib/utils"

// EBCDIC to ASCII mapping (common characters)
const ebcdicToAscii: Record<number, string> = {
  0x40: ' ', 0x41: 'a', 0x42: 'b', 0x43: 'c', 0x44: 'd', 0x45: 'e', 0x46: 'f', 0x47: 'g',
  0x48: 'h', 0x49: 'i', 0x4A: 'j', 0x4B: 'k', 0x4C: 'l', 0x4D: 'm', 0x4E: 'n', 0x4F: 'o',
  0x50: 'p', 0x51: 'q', 0x52: 'r', 0x53: 's', 0x54: 't', 0x55: 'u', 0x56: 'v', 0x57: 'w',
  0x58: 'x', 0x59: 'y', 0x5A: 'z',
  0x60: '-', 0x61: ' ', 0x62: ' ', 0x63: ' ', 0x64: ' ', 0x65: ' ', 0x66: ' ', 0x67: ' ',
  0x68: ' ', 0x69: ' ', 0x6A: ' ', 0x6B: '.', 0x6C: '<', 0x6D: '(', 0x6E: '+', 0x6F: '|',
  0x70: '&', 0x71: ' ', 0x72: ' ', 0x73: ' ', 0x74: ' ', 0x75: ' ', 0x76: ' ', 0x77: ' ',
  0x78: ' ', 0x79: '!', 0x7A: '$', 0x7B: '*', 0x7C: ')', 0x7D: ';', 0x7E: '~', 0x7F: '-',
  0x80: ' ', 0x81: ' ', 0x82: ' ', 0x83: ' ', 0x84: ' ', 0x85: '\n', 0x86: ' ', 0x87: ' ',
  0x88: ' ', 0x89: ' ', 0x8A: ' ', 0x8B: ' ', 0x8C: ' ', 0x8D: '\r', 0x8E: ' ', 0x8F: ' ',
  0x90: ' ', 0x91: ' ', 0x92: ' ', 0x93: ' ', 0x94: ' ', 0x95: ' ', 0x96: ' ', 0x97: ' ',
  0x98: ' ', 0x99: ' ', 0x9A: ' ', 0x9B: ' ', 0x9C: ' ', 0x9D: ' ', 0x9E: ' ', 0x9F: ' ',
  0xA0: ' ', 0xA1: ' ', 0xA2: ' ', 0xA3: ' ', 0xA4: ' ', 0xA5: ' ', 0xA6: ' ', 0xA7: ' ',
  0xA8: ' ', 0xA9: ' ', 0xAA: ' ', 0xAB: ' ', 0xAC: ' ', 0xAD: ' ', 0xAE: ' ', 0xAF: ' ',
  0xB0: ' ', 0xB1: ' ', 0xB2: ' ', 0xB3: ' ', 0xB4: ' ', 0xB5: ' ', 0xB6: ' ', 0xB7: ' ',
  0xB8: ' ', 0xB9: ' ', 0xBA: ' ', 0xBB: ' ', 0xBC: ' ', 0xBD: ' ', 0xBE: ' ', 0xBF: ' ',
  0xC0: '{', 0xC1: 'A', 0xC2: 'B', 0xC3: 'C', 0xC4: 'D', 0xC5: 'E', 0xC6: 'F', 0xC7: 'G',
  0xC8: 'H', 0xC9: 'I', 0xCA: ' ', 0xCB: ' ', 0xCC: ' ', 0xCD: ' ', 0xCE: ' ', 0xCF: ' ',
  0xD0: '}', 0xD1: 'J', 0xD2: 'K', 0xD3: 'L', 0xD4: 'M', 0xD5: 'N', 0xD6: 'O', 0xD7: 'P',
  0xD8: 'Q', 0xD9: 'R', 0xDA: ' ', 0xDB: ' ', 0xDC: ' ', 0xDD: ' ', 0xDE: ' ', 0xDF: ' ',
  0xE0: '\\', 0xE1: ' ', 0xE2: 'S', 0xE3: 'T', 0xE4: 'U', 0xE5: 'V', 0xE6: 'W', 0xE7: 'X',
  0xE8: 'Y', 0xE9: 'Z', 0xEA: ' ', 0xEB: ' ', 0xEC: ' ', 0xED: ' ', 0xEE: ' ', 0xEF: ' ',
  0xF0: '0', 0xF1: '1', 0xF2: '2', 0xF3: '3', 0xF4: '4', 0xF5: '5', 0xF6: '6', 0xF7: '7',
  0xF8: '8', 0xF9: '9', 0xFA: ' ', 0xFB: ' ', 0xFC: ' ', 0xFD: ' ', 0xFE: ' ', 0xFF: ' '
}

// Create reverse mapping (ASCII to EBCDIC)
const asciiToEbcdic: Record<string, number> = {}
Object.entries(ebcdicToAscii).forEach(([ebcdic, ascii]) => {
  if (ascii && !asciiToEbcdic[ascii]) {
    asciiToEbcdic[ascii] = parseInt(ebcdic)
  }
})

export default function EbcdicToAsciiConverter() {
  const [inputText, setInputText] = useState<string>("")
  const [mode, setMode] = useState<'ebcdic-to-ascii' | 'ascii-to-ebcdic'>('ebcdic-to-ascii')
  const [inputFormat, setInputFormat] = useState<'text' | 'hex' | 'binary'>('hex')
  const [copied, setCopied] = useState<string | null>(null)

  const output = useMemo(() => {
    if (!inputText.trim()) return ""

    if (mode === 'ebcdic-to-ascii') {
      let bytes: number[] = []

      if (inputFormat === 'hex') {
        bytes = inputText.split(/\s+/).filter(b => b).map(b => parseInt(b.replace(/0x/gi, ''), 16))
      } else if (inputFormat === 'binary') {
        bytes = inputText.split(/\s+/).filter(b => b).map(b => parseInt(b, 2))
      } else {
        bytes = inputText.split('').map(c => c.charCodeAt(0))
      }

      return bytes.map(byte => {
        const ascii = ebcdicToAscii[byte]
        return ascii || '?'
      }).join('')
    } else {
      // ASCII to EBCDIC
      const chars = inputText.split('')
      if (inputFormat === 'hex') {
        return chars.map(c => {
          const ebcdic = asciiToEbcdic[c] || 0x00
          return ebcdic.toString(16).toUpperCase().padStart(2, '0')
        }).join(' ')
      } else if (inputFormat === 'binary') {
        return chars.map(c => {
          const ebcdic = asciiToEbcdic[c] || 0x00
          return ebcdic.toString(2).padStart(8, '0')
        }).join(' ')
      } else {
        return chars.map(c => {
          const ebcdic = asciiToEbcdic[c] || 0x00
          return String.fromCharCode(ebcdic)
        }).join('')
      }
    }
  }, [inputText, mode, inputFormat])

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
    if (mode === 'ebcdic-to-ascii') {
      setInputFormat('hex')
      setInputText("C8 85 93 93 96 40 D6 82 8A 85 83 8A")
    } else {
      setInputFormat('hex')
      setInputText("Hello EBCDIC")
    }
  }, [mode])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="flex gap-2">
        <Button
          variant={mode === 'ebcdic-to-ascii' ? 'default' : 'outline'}
          onClick={() => {
            setMode('ebcdic-to-ascii')
            setInputText("")
            setInputFormat('hex')
          }}
          className="flex-1"
        >
          EBCDIC to ASCII
        </Button>
        <Button
          variant={mode === 'ascii-to-ebcdic' ? 'default' : 'outline'}
          onClick={() => {
            setMode('ascii-to-ebcdic')
            setInputText("")
            setInputFormat('text')
          }}
          className="flex-1"
        >
          ASCII to EBCDIC
        </Button>
      </section>

      {/* Input Format */}
      <section className="space-y-2">
        <Label className="text-sm">Input Format</Label>
        <div className="flex gap-2">
          {mode === 'ebcdic-to-ascii' ? (
            <>
              <Button
                variant={inputFormat === 'hex' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputFormat('hex')}
                className="flex-1 text-xs"
              >
                Hexadecimal
              </Button>
              <Button
                variant={inputFormat === 'binary' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputFormat('binary')}
                className="flex-1 text-xs"
              >
                Binary
              </Button>
              <Button
                variant={inputFormat === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputFormat('text')}
                className="flex-1 text-xs"
              >
                Raw Text
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={inputFormat === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputFormat('text')}
                className="flex-1"
              >
                Text
              </Button>
              <Button
                variant={inputFormat === 'hex' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputFormat('hex')}
                className="flex-1 text-xs"
              >
                Hex Output
              </Button>
              <Button
                variant={inputFormat === 'binary' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputFormat('binary')}
                className="flex-1 text-xs"
              >
                Binary Output
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === 'ebcdic-to-ascii' ? 'EBCDIC Input' : 'ASCII Input'}
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
          placeholder={
            mode === 'ebcdic-to-ascii' 
              ? inputFormat === 'hex' 
                ? "Enter EBCDIC hex bytes (e.g., C8 85 93 93 96)..." 
                : inputFormat === 'binary'
                ? "Enter EBCDIC binary bytes (e.g., 11001000 10000101)..."
                : "Enter EBCDIC text..."
              : "Enter ASCII text to convert..."
          }
        />
      </section>

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === 'ebcdic-to-ascii' ? 'ASCII Output' : 'EBCDIC Output'}
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

          <div className={cn(
            "rounded-lg border p-4",
            mode === 'ebcdic-to-ascii' ? "bg-muted/30" : "bg-muted/30"
          )}>
            <p className="font-mono text-lg break-all whitespace-pre-wrap">{output}</p>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About EBCDIC</h4>
            <p className="text-sm text-muted-foreground">
              EBCDIC (Extended Binary Coded Decimal Interchange Code) is an 8-bit character 
              encoding used mainly on IBM mainframe and midrange computer systems. It was 
              developed by IBM in 1963 and is still used in legacy systems today.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>8-bit encoding (256 possible characters)</li>
              <li>Non-contiguous letter ordering (unlike ASCII)</li>
              <li>Still used in IBM z/OS, OS/390 systems</li>
              <li>Common in banking, insurance, government legacy systems</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Example:</strong> "HELLO" in EBCDIC hex = C8 85 93 93 96
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

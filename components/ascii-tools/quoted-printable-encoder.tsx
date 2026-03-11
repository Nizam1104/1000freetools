"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, ArrowRightLeft } from "lucide-react"
import { cn } from "@/lib/utils"

// Quoted-Printable encoding/decoding
const QuotedPrintable = {
  encode: (input: string, maxLineLength: number = 76): string => {
    let output = ""
    let lineLength = 0
    
    for (let i = 0; i < input.length; i++) {
      const char = input[i]
      const code = char.charCodeAt(0)
      
      let encoded: string
      
      // Encode non-printable characters and special chars
      if (code < 32 || code > 126 || char === '=' || char === '_' || char === '?') {
        encoded = `=${code.toString(16).toUpperCase().padStart(2, '0')}`
      } else if (char === ' ') {
        // Soft line break handling for trailing spaces
        if (i + 1 < input.length && input[i + 1] === '\n') {
          encoded = '=20'
        } else if (lineLength >= maxLineLength - 1) {
          encoded = '=\n'
          lineLength = 0
          continue
        } else {
          encoded = ' '
        }
      } else {
        encoded = char
      }
      
      // Handle line breaks
      if (lineLength + encoded.length > maxLineLength && char !== '\n') {
        output += '=\n'
        lineLength = 0
      }
      
      if (char === '\n') {
        output += '\n'
        lineLength = 0
      } else {
        output += encoded
        lineLength += encoded.length
      }
    }
    
    return output
  },
  
  decode: (input: string): string => {
    // Remove soft line breaks
    let clean = input.replace(/=\n/g, '')
    
    return clean.replace(/=([0-9A-Fa-f]{2})/g, (_, hex) => {
      const code = parseInt(hex, 16)
      return String.fromCharCode(code)
    })
  }
}

export default function QuotedPrintableEncoder() {
  const [inputText, setInputText] = useState<string>("")
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [maxLineLength, setMaxLineLength] = useState<number>(76)
  const [copied, setCopied] = useState<string | null>(null)

  const output = useMemo(() => {
    if (!inputText.trim()) return ""

    try {
      if (mode === 'encode') {
        return QuotedPrintable.encode(inputText, maxLineLength)
      } else {
        return QuotedPrintable.decode(inputText)
      }
    } catch (err) {
      return `Error: ${err instanceof Error ? err.message : 'Conversion failed'}`
    }
  }, [inputText, mode, maxLineLength])

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
    if (mode === 'encode') {
      setInputText("Hello! This is a test with special characters: café, naïve, 日本語")
    } else {
      setInputText("Hello=21=20This=20is=20a=20test=20with=20special=20characters=3A=20caf=C3=A9")
    }
  }, [mode])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="flex gap-2">
        <Button
          variant={mode === 'encode' ? 'default' : 'outline'}
          onClick={() => {
            setMode('encode')
            setInputText("")
          }}
          className="flex-1"
        >
          Encode to Quoted-Printable
        </Button>
        <Button
          variant={mode === 'decode' ? 'default' : 'outline'}
          onClick={() => {
            setMode('decode')
            setInputText("")
          }}
          className="flex-1"
        >
          Decode from Quoted-Printable
        </Button>
      </section>

      {/* Options */}
      {mode === 'encode' && (
        <section className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="max-line-length">Max Line Length</Label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                id="max-line-length"
                min="40"
                max="99"
                value={maxLineLength}
                onChange={(e) => setMaxLineLength(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="font-mono text-sm w-12 text-right">{maxLineLength}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              RFC 2045 recommends 76 characters maximum
            </p>
          </div>
        </section>
      )}

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === 'encode' ? 'Plain Text' : 'Quoted-Printable Encoded'}
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
          className="font-mono text-sm min-h-[150px]"
          placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter Quoted-Printable encoded text..."}
        />
      </section>

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === 'encode' ? 'Quoted-Printable Output' : 'Decoded Text'}
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
            output.startsWith('Error:') ? "bg-destructive/10 border-destructive/30" : "bg-muted/30"
          )}>
            <p className="font-mono text-sm break-all whitespace-pre-wrap">{output}</p>
          </div>

          {!output.startsWith('Error:') && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Input: <span className="font-medium text-foreground">{inputText.length} chars</span></span>
              <span>Output: <span className="font-medium text-foreground">{output.length} chars</span></span>
              {mode === 'encode' && (
                <span>Expansion: <span className="font-medium text-foreground">{((output.length / inputText.length - 1) * 100).toFixed(1)}%</span></span>
              )}
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About Quoted-Printable</h4>
            <p className="text-sm text-muted-foreground">
              Quoted-Printable is an encoding method used in MIME (email) to transmit 
              8-bit data over 7-bit channels. It's designed for text that is mostly 
              ASCII with occasional non-ASCII characters.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Printable ASCII chars remain unchanged</li>
              <li>Non-printable chars encoded as =XX (hex)</li>
              <li>Soft line breaks: = at end of line</li>
              <li>Efficient for mostly-ASCII text</li>
              <li>Used in email (MIME) and Usenet</li>
            </ul>
            <div className="mt-2 p-2 bg-muted rounded text-xs font-mono">
              <p>Examples:</p>
              <p>Space at line end → =20</p>
              <p>é (U+00E9) → =C3=A9 (UTF-8)</p>
              <p>= sign → =3D</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

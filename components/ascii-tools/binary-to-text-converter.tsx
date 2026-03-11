"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, ArrowRightLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BinaryToTextConverter() {
  const [inputText, setInputText] = useState<string>("")
  const [mode, setMode] = useState<'binary-to-text' | 'text-to-binary'>('binary-to-text')
  const [bitLength, setBitLength] = useState<8 | 16>(8)
  const [delimiter, setDelimiter] = useState<'space' | 'none' | 'newline'>('space')
  const [copied, setCopied] = useState<string | null>(null)

  const binaryToText = (binary: string): string => {
    // Remove all non-binary characters except spaces
    const cleanBinary = binary.replace(/[^01\s]/g, '').trim()
    const bits = cleanBinary.split(/[\s\n]+/).filter(b => b.length > 0)
    
    return bits.map(byte => {
      const num = parseInt(byte, 2)
      if (isNaN(num)) return '?'
      if (num >= 32 && num <= 126) {
        return String.fromCharCode(num)
      } else if (num === 10) return '\n'
      else if (num === 13) return '\r'
      else if (num === 9) return '\t'
      else return ' '
    }).join('')
  }

  const textToBinary = (text: string): string => {
    const bits = text.split('').map(char => {
      const code = char.charCodeAt(0)
      return code.toString(2).padStart(bitLength, '0')
    })

    if (delimiter === 'space') {
      return bits.join(' ')
    } else if (delimiter === 'newline') {
      return bits.join('\n')
    } else {
      return bits.join('')
    }
  }

  const output = useMemo(() => {
    if (!inputText.trim()) return ""

    try {
      if (mode === 'binary-to-text') {
        return binaryToText(inputText)
      } else {
        return textToBinary(inputText)
      }
    } catch (err) {
      return `Error: ${err instanceof Error ? err.message : 'Unknown error'}`
    }
  }, [inputText, mode, bitLength, delimiter])

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
    if (mode === 'binary-to-text') {
      setInputText("01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100")
    } else {
      setInputText("Hello Binary!")
    }
  }, [mode])

  const validateBinary = useMemo(() => {
    if (mode !== 'binary-to-text') return null
    
    const cleanBinary = inputText.replace(/[^01\s]/g, '').trim()
    const bits = cleanBinary.split(/[\s\n]+/).filter(b => b.length > 0)
    const invalid = bits.filter(b => !/^[01]+$/.test(b) || b.length !== 8)
    
    return {
      total: bits.length,
      valid: bits.length - invalid.length,
      invalid: invalid.length
    }
  }, [inputText, mode])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="flex gap-2">
        <Button
          variant={mode === 'binary-to-text' ? 'default' : 'outline'}
          onClick={() => {
            setMode('binary-to-text')
            setInputText("")
          }}
          className="flex-1"
        >
          Binary to Text
        </Button>
        <Button
          variant={mode === 'text-to-binary' ? 'default' : 'outline'}
          onClick={() => {
            setMode('text-to-binary')
            setInputText("")
          }}
          className="flex-1"
        >
          Text to Binary
        </Button>
      </section>

      {/* Options */}
      {mode === 'text-to-binary' && (
        <section className="space-y-4">
          {/* Bit Length */}
          <div className="space-y-2">
            <Label className="text-sm">Bit Length</Label>
            <div className="flex gap-2">
              <Button
                variant={bitLength === 8 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBitLength(8)}
                className="flex-1"
              >
                8-bit (ASCII)
              </Button>
              <Button
                variant={bitLength === 16 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBitLength(16)}
                className="flex-1"
              >
                16-bit (Unicode)
              </Button>
            </div>
          </div>

          {/* Delimiter */}
          <div className="space-y-2">
            <Label className="text-sm">Output Delimiter</Label>
            <div className="flex gap-2">
              <Button
                variant={delimiter === 'space' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDelimiter('space')}
                className="flex-1 text-xs"
              >
                Spaces
              </Button>
              <Button
                variant={delimiter === 'newline' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDelimiter('newline')}
                className="flex-1 text-xs"
              >
                Newlines
              </Button>
              <Button
                variant={delimiter === 'none' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDelimiter('none')}
                className="flex-1 text-xs"
              >
                None
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === 'binary-to-text' ? 'Binary Input' : 'Text Input'}
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
          placeholder={
            mode === 'binary-to-text' 
              ? "Enter binary code (e.g., 01001000 01100101 01101100)..." 
              : "Enter text to convert to binary..."
          }
        />

        {validateBinary && (
          <div className={cn(
            "text-sm",
            validateBinary.invalid > 0 ? "text-amber-500" : "text-green-500"
          )}>
            {validateBinary.valid} valid bytes
            {validateBinary.invalid > 0 && ` • ${validateBinary.invalid} invalid (must be 8 bits)`}
          </div>
        )}
      </section>

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === 'binary-to-text' ? 'Text Output' : 'Binary Output'}
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
            <p className={cn(
              "break-all whitespace-pre-wrap",
              mode === 'binary-to-text' ? "font-mono" : "font-mono"
            )}>
              {output}
            </p>
          </div>

          {!output.startsWith('Error:') && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Length: <span className="font-medium text-foreground">{output.length} characters</span></span>
              {mode === 'text-to-binary' && (
                <span>Bits: <span className="font-medium text-foreground">{output.replace(/[^01]/g, '').length} bits</span></span>
              )}
            </div>
          )}
        </section>
      )}

      {/* Binary Reference */}
      {mode === 'binary-to-text' && (
        <section className="rounded-lg border bg-muted/30 p-4">
          <h4 className="text-sm font-medium mb-3">Common Binary Values (ASCII)</h4>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-xs font-mono">
            {[
              { binary: '01000001', char: 'A' },
              { binary: '01000010', char: 'B' },
              { binary: '01000011', char: 'C' },
              { binary: '01001000', char: 'H' },
              { binary: '01001001', char: 'I' },
              { binary: '01001100', char: 'L' },
              { binary: '01001111', char: 'O' },
              { binary: '01010111', char: 'W' },
              { binary: '00100000', char: '(space)' },
              { binary: '00110000', char: '0' },
              { binary: '00110001', char: '1' },
              { binary: '00110010', char: '2' },
            ].map(({ binary, char }) => (
              <div key={binary} className="bg-muted p-2 rounded text-center">
                <div className="text-muted-foreground">{binary}</div>
                <div className="font-medium">{char}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Binary Code</h4>
            <p className="text-sm text-muted-foreground">
              Binary code represents text using only two symbols: 0 and 1. Each character 
              is typically encoded as 8 bits (1 byte) using ASCII encoding. Computers process 
              all data as binary at the lowest level.
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>8 bits = 1 byte = 1 ASCII character</li>
              <li>ASCII range: 0-127 (standard), 0-255 (extended)</li>
              <li>Printable characters: 32-126 (space to ~)</li>
              <li>Control characters: 0-31, 127 (non-printable)</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Example:</strong> "Hi" = 01001000 01101001
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

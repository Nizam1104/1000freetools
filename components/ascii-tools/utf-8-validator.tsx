"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  stats: {
    characters: number
    bytes: number
    asciiChars: number
    multiByteChars: number
    invalidSequences: number
  }
  byteSequence: { char: string; codePoint: number; bytes: number[]; valid: boolean }[]
}

export default function Utf8Validator() {
  const [inputText, setInputText] = useState<string>("")
  const [inputMode, setInputMode] = useState<'text' | 'hex' | 'binary'>('text')
  const [copied, setCopied] = useState<string | null>(null)

  const validation = useMemo((): ValidationResult | null => {
    if (!inputText.trim()) return null

    const errors: string[] = []
    const warnings: string[] = []
    const byteSequence: ValidationResult['byteSequence'] = []
    
    let bytes: number[] = []
    let characters = 0
    let asciiChars = 0
    let multiByteChars = 0
    let invalidSequences = 0

    // Convert input to bytes based on mode
    if (inputMode === 'text') {
      const encoder = new TextEncoder()
      bytes = Array.from(encoder.encode(inputText))
      
      // Analyze each character
      for (const char of inputText) {
        const codePoint = char.codePointAt(0) || 0
        const charBytes = Array.from(new TextEncoder().encode(char))
        const isValid = isValidUTF8Sequence(charBytes)
        
        byteSequence.push({
          char,
          codePoint,
          bytes: charBytes,
          valid: isValid
        })

        characters++
        if (charBytes.length === 1) {
          asciiChars++
        } else {
          multiByteChars++
        }
        if (!isValid) {
          invalidSequences++
          errors.push(`Invalid UTF-8 sequence for character "${char}" (U+${codePoint.toString(16).toUpperCase()})`)
        }
      }
    } else if (inputMode === 'hex') {
      const hexStrings = inputText.split(/[\s,]+/).filter(b => b.length > 0)
      bytes = hexStrings.map(h => parseInt(h.replace(/0x/gi, ''), 16)).filter(b => !isNaN(b))
      
      // Validate UTF-8 byte sequence
      let i = 0
      while (i < bytes.length) {
        const byte = bytes[i]
        let expectedLength = 0
        
        if (byte < 0x80) {
          expectedLength = 1
          asciiChars++
        } else if (byte < 0xC0) {
          errors.push(`Unexpected continuation byte at position ${i}: 0x${byte.toString(16).toUpperCase()}`)
          invalidSequences++
          i++
          continue
        } else if (byte < 0xE0) {
          expectedLength = 2
          multiByteChars++
        } else if (byte < 0xF0) {
          expectedLength = 3
          multiByteChars++
        } else if (byte < 0xF8) {
          expectedLength = 4
          multiByteChars++
        } else {
          errors.push(`Invalid leading byte at position ${i}: 0x${byte.toString(16).toUpperCase()}`)
          invalidSequences++
          i++
          continue
        }

        // Check if we have enough bytes
        if (i + expectedLength > bytes.length) {
          errors.push(`Truncated UTF-8 sequence at position ${i}: expected ${expectedLength} bytes`)
          invalidSequences++
          break
        }

        // Validate continuation bytes
        let isValid = true
        for (let j = 1; j < expectedLength; j++) {
          const contByte = bytes[i + j]
          if (contByte < 0x80 || contByte >= 0xC0) {
            errors.push(`Invalid continuation byte at position ${i + j}: 0x${contByte.toString(16).toUpperCase()}`)
            isValid = false
            invalidSequences++
          }
        }

        if (isValid) {
          characters++
        }

        i += expectedLength
      }
    } else {
      // Binary mode
      const binaryStrings = inputText.split(/[\s,]+/).filter(b => b.length > 0)
      bytes = binaryStrings.map(b => parseInt(b, 2)).filter(b => !isNaN(b) && b >= 0 && b <= 255)
      
      // Similar validation as hex mode
      let i = 0
      while (i < bytes.length) {
        const byte = bytes[i]
        let expectedLength = 0
        
        if (byte < 0x80) {
          expectedLength = 1
          asciiChars++
        } else if (byte < 0xC0) {
          errors.push(`Unexpected continuation byte at position ${i}`)
          invalidSequences++
          i++
          continue
        } else if (byte < 0xE0) {
          expectedLength = 2
          multiByteChars++
        } else if (byte < 0xF0) {
          expectedLength = 3
          multiByteChars++
        } else if (byte < 0xF8) {
          expectedLength = 4
          multiByteChars++
        } else {
          errors.push(`Invalid leading byte at position ${i}`)
          invalidSequences++
          i++
          continue
        }

        if (i + expectedLength > bytes.length) {
          errors.push(`Truncated UTF-8 sequence at position ${i}`)
          invalidSequences++
          break
        }

        let isValid = true
        for (let j = 1; j < expectedLength; j++) {
          const contByte = bytes[i + j]
          if (contByte < 0x80 || contByte >= 0xC0) {
            errors.push(`Invalid continuation byte at position ${i + j}`)
            isValid = false
            invalidSequences++
          }
        }

        if (isValid) {
          characters++
        }

        i += expectedLength
      }
    }

    // Check for overlong encodings
    if (inputMode === 'text') {
      // Text mode already validated by browser
    }

    // Add warnings for potential issues
    if (bytes.length === 0) {
      warnings.push('No bytes to validate')
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      stats: {
        characters,
        bytes: bytes.length,
        asciiChars,
        multiByteChars,
        invalidSequences
      },
      byteSequence
    }
  }, [inputText, inputMode])

  const isValidUTF8Sequence = (bytes: number[]): boolean => {
    if (bytes.length === 0) return false
    if (bytes.length === 1) return bytes[0] < 0x80
    
    const firstByte = bytes[0]
    let expectedLength = 0
    
    if (firstByte < 0xC0) return false
    if (firstByte < 0xE0) expectedLength = 2
    else if (firstByte < 0xF0) expectedLength = 3
    else if (firstByte < 0xF8) expectedLength = 4
    else return false

    if (bytes.length !== expectedLength) return false

    for (let i = 1; i < expectedLength; i++) {
      if (bytes[i] < 0x80 || bytes[i] >= 0xC0) return false
    }

    return true
  }

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
    if (inputMode === 'text') {
      setInputText("Hello 世界！Привет! 🌍")
    } else if (inputMode === 'hex') {
      setInputText("48 65 6C 6C 6F 20 E4 B8 96 E7 95 8C")
    } else {
      setInputText("01001000 01100101 01101100 01101100 01101111")
    }
  }, [inputMode])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Mode */}
      <section className="space-y-2">
        <Label className="text-sm">Input Mode</Label>
        <div className="flex gap-2">
          <Button
            variant={inputMode === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setInputMode('text')
              setInputText("")
            }}
            className="flex-1"
          >
            Text
          </Button>
          <Button
            variant={inputMode === 'hex' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setInputMode('hex')
              setInputText("")
            }}
            className="flex-1"
          >
            Hexadecimal
          </Button>
          <Button
            variant={inputMode === 'binary' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setInputMode('binary')
              setInputText("")
            }}
            className="flex-1"
          >
            Binary
          </Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {inputMode === 'text' ? 'Text to Validate' : `UTF-8 ${inputMode.toUpperCase()} Bytes`}
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
            inputMode === 'text' 
              ? "Enter text to validate UTF-8 encoding..." 
              : inputMode === 'hex'
              ? "Enter hex bytes (e.g., 48 65 6C 6C 6F)..."
              : "Enter binary bytes (e.g., 01001000 01100101)..."
          }
        />
      </section>

      {/* Validation Results */}
      {validation && (
        <>
          {/* Status Banner */}
          <section className={cn(
            "rounded-lg border p-4",
            validation.valid ? "bg-green-500/10 border-green-500/30" : "bg-destructive/10 border-destructive/30"
          )}>
            <div className="flex items-center gap-3">
              {validation.valid ? (
                <CheckCircle2 className="size-5 text-green-500" />
              ) : (
                <AlertCircle className="size-5 text-destructive" />
              )}
              <div>
                <p className={cn(
                  "font-medium",
                  validation.valid ? "text-green-500" : "text-destructive"
                )}>
                  {validation.valid 
                    ? "Valid UTF-8 Encoding" 
                    : `Invalid UTF-8 - ${validation.errors.length} error(s) found`}
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-xl font-bold">{validation.stats.characters}</p>
              <p className="text-xs text-muted-foreground">Characters</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-xl font-bold">{validation.stats.bytes}</p>
              <p className="text-xs text-muted-foreground">Bytes</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-xl font-bold text-green-500">{validation.stats.asciiChars}</p>
              <p className="text-xs text-muted-foreground">ASCII (1-byte)</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-xl font-bold text-blue-500">{validation.stats.multiByteChars}</p>
              <p className="text-xs text-muted-foreground">Multi-byte</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className={cn(
                "text-xl font-bold",
                validation.stats.invalidSequences > 0 ? "text-destructive" : "text-green-500"
              )}>
                {validation.stats.invalidSequences}
              </p>
              <p className="text-xs text-muted-foreground">Invalid</p>
            </div>
          </section>

          {/* Errors */}
          {validation.errors.length > 0 && (
            <section className="space-y-3">
              <Label className="text-base font-medium text-destructive">Errors</Label>
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 max-h-[300px] overflow-y-auto">
                <ul className="space-y-2 text-sm">
                  {validation.errors.map((error, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertCircle className="size-4 text-destructive mt-0.5 shrink-0" />
                      <span className="text-destructive">{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Warnings */}
          {validation.warnings.length > 0 && (
            <section className="space-y-3">
              <Label className="text-base font-medium text-amber-500">Warnings</Label>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                <ul className="space-y-2 text-sm">
                  {validation.warnings.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertCircle className="size-4 text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-amber-500">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Byte Sequence Table */}
          {validation.byteSequence.length > 0 && validation.byteSequence.length <= 50 && (
            <section className="space-y-3">
              <Label className="text-base font-medium">Byte Sequence Analysis</Label>
              <div className="rounded-lg border bg-muted/30 overflow-hidden">
                <div className="max-h-[400px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted sticky top-0">
                      <tr>
                        <th className="text-left p-2 font-medium">Char</th>
                        <th className="text-left p-2 font-medium">Code Point</th>
                        <th className="text-left p-2 font-medium">Bytes (hex)</th>
                        <th className="text-left p-2 font-medium">Bytes (binary)</th>
                        <th className="text-center p-2 font-medium">Valid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {validation.byteSequence.map((item, idx) => (
                        <tr key={idx} className={cn(
                          "border-t",
                          !item.valid && "bg-destructive/10"
                        )}>
                          <td className="p-2 font-mono">{item.char}</td>
                          <td className="p-2 font-mono text-xs">U+{item.codePoint.toString(16).toUpperCase().padStart(4, '0')}</td>
                          <td className="p-2 font-mono text-xs">{item.bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ')}</td>
                          <td className="p-2 font-mono text-xs">{item.bytes.map(b => b.toString(2).padStart(8, '0')).join(' ')}</td>
                          <td className="p-2 text-center">
                            {item.valid ? (
                              <CheckCircle2 className="size-4 text-green-500 inline" />
                            ) : (
                              <AlertCircle className="size-4 text-destructive inline" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">UTF-8 Encoding Rules</h4>
            <p className="text-sm text-muted-foreground">
              UTF-8 is a variable-length character encoding that uses 1-4 bytes per character.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono mt-2">
              <div className="bg-muted p-2 rounded">
                <div className="font-medium">1 byte (ASCII):</div>
                <div>0xxxxxxx (0-127)</div>
              </div>
              <div className="bg-muted p-2 rounded">
                <div className="font-medium">2 bytes:</div>
                <div>110xxxxx 10xxxxxx</div>
              </div>
              <div className="bg-muted p-2 rounded">
                <div className="font-medium">3 bytes:</div>
                <div>1110xxxx 10xxxxxx 10xxxxxx</div>
              </div>
              <div className="bg-muted p-2 rounded">
                <div className="font-medium">4 bytes:</div>
                <div>11110xxx 10xxxxxx 10xxxxxx 10xxxxxx</div>
              </div>
            </div>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mt-2">
              <li>Continuation bytes always start with 10xxxxxx</li>
              <li>Overlong encodings are invalid</li>
              <li>Code points U+D800-U+DFFF (surrogates) are invalid</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

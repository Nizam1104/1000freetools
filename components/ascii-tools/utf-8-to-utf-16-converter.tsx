"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, ArrowRightLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Utf8ToUtf16Converter() {
  const [inputText, setInputText] = useState<string>("")
  const [mode, setMode] = useState<'utf8-to-utf16' | 'utf16-to-utf8'>('utf8-to-utf16')
  const [outputFormat, setOutputFormat] = useState<'hex' | 'binary' | 'text'>('hex')
  const [endianness, setEndianness] = useState<'BE' | 'LE'>('BE')
  const [copied, setCopied] = useState<string | null>(null)

  const output = useMemo(() => {
    if (!inputText.trim()) return ""

    try {
      if (mode === 'utf8-to-utf16') {
        // Convert text to UTF-16
        const bytes: number[] = []
        for (let i = 0; i < inputText.length; i++) {
          let code = inputText.charCodeAt(i)
          
          // Handle surrogate pairs for characters outside BMP
          if (code >= 0xD800 && code <= 0xDFFF && i + 1 < inputText.length) {
            const next = inputText.charCodeAt(i + 1)
            if (next >= 0xDC00 && next <= 0xDFFF) {
              // Combine surrogate pair
              code = 0x10000 + ((code - 0xD800) * 0x400) + (next - 0xDC00)
              i++
            }
          }
          
          if (code <= 0xFFFF) {
            // BMP character - 2 bytes
            if (endianness === 'BE') {
              bytes.push((code >> 8) & 0xFF, code & 0xFF)
            } else {
              bytes.push(code & 0xFF, (code >> 8) & 0xFF)
            }
          } else {
            // Supplementary character - 4 bytes (surrogate pair)
            code -= 0x10000
            const high = 0xD800 + (code >> 10)
            const low = 0xDC00 + (code & 0x3FF)
            
            if (endianness === 'BE') {
              bytes.push((high >> 8) & 0xFF, high & 0xFF)
              bytes.push((low >> 8) & 0xFF, low & 0xFF)
            } else {
              bytes.push(high & 0xFF, (high >> 8) & 0xFF)
              bytes.push(low & 0xFF, (low >> 8) & 0xFF)
            }
          }
        }
        
        // Format output
        if (outputFormat === 'hex') {
          return bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ')
        } else if (outputFormat === 'binary') {
          return bytes.map(b => b.toString(2).padStart(8, '0')).join(' ')
        } else {
          // Add BOM and return as string
          const bom = endianness === 'BE' ? '\uFEFF' : '\uFFFE'
          return bom + String.fromCharCode(...bytes.filter((_, i) => i % 2 === 0).map((_, i, arr) => {
            const idx = i * 2
            return endianness === 'BE' 
              ? (bytes[idx] << 8) | bytes[idx + 1]
              : bytes[idx] | (bytes[idx + 1] << 8)
          }).filter(c => c >= 0 && c <= 0xFFFF))
        }
      } else {
        // Convert UTF-16 back to UTF-8/text
        let bytes: number[] = []
        
        if (outputFormat === 'hex') {
          const hexStrings = inputText.split(/[\s,]+/).filter(b => b.length > 0)
          bytes = hexStrings.map(h => parseInt(h.replace(/0x/gi, ''), 16)).filter(b => !isNaN(b))
        } else if (outputFormat === 'binary') {
          const binaryStrings = inputText.split(/[\s,]+/).filter(b => b.length > 0)
          bytes = binaryStrings.map(b => parseInt(b, 2)).filter(b => !isNaN(b))
        } else {
          bytes = Array.from(new TextEncoder().encode(inputText))
        }
        
        // Detect BOM
        let detectedEndianness = endianness
        if (bytes.length >= 2) {
          if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
            detectedEndianness = 'BE'
            bytes = bytes.slice(2)
          } else if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
            detectedEndianness = 'LE'
            bytes = bytes.slice(2)
          }
        }
        
        // Convert UTF-16 bytes to string
        let result = ""
        for (let i = 0; i < bytes.length; i += 2) {
          let code: number
          if (detectedEndianness === 'BE') {
            code = (bytes[i] << 8) | (bytes[i + 1] || 0)
          } else {
            code = bytes[i] | ((bytes[i + 1] || 0) << 8)
          }
          
          // Handle surrogate pairs
          if (code >= 0xD800 && code <= 0xDBFF && i + 2 < bytes.length) {
            const next = detectedEndianness === 'BE' 
              ? (bytes[i + 2] << 8) | (bytes[i + 3] || 0)
              : bytes[i + 2] | ((bytes[i + 3] || 0) << 8)
            
            if (next >= 0xDC00 && next <= 0xDFFF) {
              const fullCode = 0x10000 + ((code - 0xD800) * 0x400) + (next - 0xDC00)
              result += String.fromCodePoint(fullCode)
              i += 2
              continue
            }
          }
          
          if (code >= 0 && code <= 0xFFFF) {
            result += String.fromCharCode(code)
          }
        }
        
        return result
      }
    } catch (err) {
      return `Error: ${err instanceof Error ? err.message : 'Conversion failed'}`
    }
  }, [inputText, mode, outputFormat, endianness])

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
    if (mode === 'utf8-to-utf16') {
      setInputText("Hello 世界")
    } else {
      setOutputFormat('hex')
      setInputText("00 48 00 65 00 6C 00 6C 00 6F 4E 16")
    }
  }, [mode])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Mode Selection */}
      <section className="flex gap-2">
        <Button
          variant={mode === 'utf8-to-utf16' ? 'default' : 'outline'}
          onClick={() => {
            setMode('utf8-to-utf16')
            setInputText("")
            setOutputFormat('hex')
          }}
          className="flex-1"
        >
          UTF-8 to UTF-16
        </Button>
        <Button
          variant={mode === 'utf16-to-utf8' ? 'default' : 'outline'}
          onClick={() => {
            setMode('utf16-to-utf8')
            setInputText("")
            setOutputFormat('hex')
          }}
          className="flex-1"
        >
          UTF-16 to UTF-8
        </Button>
      </section>

      {/* Options */}
      <section className="space-y-4">
        {/* Endianness */}
        <div className="space-y-2">
          <Label className="text-sm">Byte Order (Endianness)</Label>
          <div className="flex gap-2">
            <Button
              variant={endianness === 'BE' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setEndianness('BE')}
              className="flex-1"
            >
              Big Endian (BE)
            </Button>
            <Button
              variant={endianness === 'LE' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setEndianness('LE')}
              className="flex-1"
            >
              Little Endian (LE)
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            BE: Most significant byte first | LE: Least significant byte first
          </p>
        </div>

        {/* Output Format (for UTF-8 to UTF-16 mode) */}
        {mode === 'utf8-to-utf16' && (
          <div className="space-y-2">
            <Label className="text-sm">Output Format</Label>
            <div className="flex gap-2">
              <Button
                variant={outputFormat === 'hex' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOutputFormat('hex')}
                className="flex-1 text-xs"
              >
                Hexadecimal
              </Button>
              <Button
                variant={outputFormat === 'binary' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOutputFormat('binary')}
                className="flex-1 text-xs"
              >
                Binary
              </Button>
              <Button
                variant={outputFormat === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOutputFormat('text')}
                className="flex-1 text-xs"
              >
                Text (with BOM)
              </Button>
            </div>
          </div>
        )}

        {/* Input Format (for UTF-16 to UTF-8 mode) */}
        {mode === 'utf16-to-utf8' && (
          <div className="space-y-2">
            <Label className="text-sm">Input Format</Label>
            <div className="flex gap-2">
              <Button
                variant={outputFormat === 'hex' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOutputFormat('hex')}
                className="flex-1 text-xs"
              >
                Hexadecimal
              </Button>
              <Button
                variant={outputFormat === 'binary' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOutputFormat('binary')}
                className="flex-1 text-xs"
              >
                Binary
              </Button>
              <Button
                variant={outputFormat === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOutputFormat('text')}
                className="flex-1 text-xs"
              >
                Text
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === 'utf8-to-utf16' ? 'UTF-8 Text' : 'UTF-16 Data'}
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
            mode === 'utf8-to-utf16' 
              ? "Enter UTF-8 text to convert..." 
              : outputFormat === 'hex'
              ? "Enter UTF-16 hex bytes (e.g., 00 48 00 65)..."
              : outputFormat === 'binary'
              ? "Enter UTF-16 binary bytes..."
              : "Enter UTF-16 text..."
          }
        />
      </section>

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === 'utf8-to-utf16' ? 'UTF-16 Output' : 'UTF-8/Text Output'}
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
        </section>
      )}

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">UTF-8 vs UTF-16</h4>
            <p className="text-sm text-muted-foreground">
              UTF-8 and UTF-16 are both Unicode encoding forms. UTF-8 uses 1-4 bytes per 
              character and is backward compatible with ASCII. UTF-16 uses 2 or 4 bytes 
              and is commonly used in Windows and Java.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="bg-muted p-2 rounded text-xs">
                <p className="font-medium">UTF-8</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>1-4 bytes per character</li>
                  <li>ASCII compatible</li>
                  <li>Web standard</li>
                  <li>Variable length</li>
                </ul>
              </div>
              <div className="bg-muted p-2 rounded text-xs">
                <p className="font-medium">UTF-16</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>2 or 4 bytes per character</li>
                  <li>Used in Windows, Java</li>
                  <li>Endianness matters</li>
                  <li>May include BOM</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Example:</strong> "A" = 00 41 (UTF-16 BE) | 41 (UTF-8)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

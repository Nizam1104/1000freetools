"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Info, ArrowRightLeft } from "lucide-react"
import { cn } from "@/lib/utils"

// ASCII85 encoding/decoding
const ASCII85 = {
  encode: (input: string): string => {
    const bytes = new TextEncoder().encode(input)
    let output = ""

    for (let i = 0; i < bytes.length; i += 4) {
      const chunk = Array.from(bytes.slice(i, i + 4))

      // Pad with zeros if needed
      while (chunk.length < 4) {
        chunk.push(0)
      }
      
      // Convert 4 bytes to 5 ASCII85 characters
      const value = (chunk[0] << 24) | (chunk[1] << 16) | (chunk[2] << 8) | chunk[3]
      
      if (value === 0 && chunk.length === 4) {
        output += 'z'
      } else {
        const chars: number[] = []
        let temp = value
        for (let j = 0; j < 5; j++) {
          chars.unshift(33 + (temp % 85))
          temp = Math.floor(temp / 85)
        }
        
        // Adjust for padding
        const outputChars = chunk.length === 4 ? 5 : chunk.length + 1
        output += String.fromCharCode(...chars.slice(0, outputChars))
      }
    }
    
    return `<~${output}~>`
  },
  
  decode: (input: string): string => {
    // Remove delimiters and whitespace
    let clean = input.replace(/<~|~>|[\s\n\r]/g, '')
    
    let output: number[] = []
    let i = 0
    
    while (i < clean.length) {
      const char = clean[i]
      
      if (char === 'z') {
        output.push(0, 0, 0, 0)
        i++
      } else {
        let value = 0
        const charsToRead = Math.min(5, clean.length - i)
        
        for (let j = 0; j < charsToRead; j++) {
          value = value * 85 + (clean.charCodeAt(i + j) - 33)
        }
        
        // Handle padding
        const outputBytes = charsToRead === 5 ? 4 : charsToRead - 1
        
        for (let j = 3; j >= 4 - outputBytes; j--) {
          output.push((value >> (j * 8)) & 0xFF)
        }
        
        i += charsToRead
      }
    }
    
    // Remove padding zeros
    const paddingCount = clean.endsWith('y') ? 3 : clean.endsWith('v') ? 2 : clean.endsWith('u') ? 1 : 0
    
    try {
      return new TextDecoder().decode(new Uint8Array(output.slice(0, output.length - paddingCount)))
    } catch {
      return new TextDecoder('latin1').decode(new Uint8Array(output.slice(0, output.length - paddingCount)))
    }
  }
}

export default function Ascii85Encoder() {
  const [inputText, setInputText] = useState<string>("")
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [includeDelimiters, setIncludeDelimiters] = useState<boolean>(true)
  const [copied, setCopied] = useState<string | null>(null)

  const output = useMemo(() => {
    if (!inputText.trim()) return ""

    try {
      if (mode === 'encode') {
        let encoded = ASCII85.encode(inputText)
        if (!includeDelimiters) {
          encoded = encoded.replace(/<~|~>/g, '')
        }
        return encoded
      } else {
        return ASCII85.decode(inputText)
      }
    } catch (err) {
      return `Error: ${err instanceof Error ? err.message : 'Conversion failed'}`
    }
  }, [inputText, mode, includeDelimiters])

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
      setInputText("Hello, World!")
    } else {
      setInputText("<~87cURD_*#TDfTZ*)T~>")
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
          Encode to ASCII85
        </Button>
        <Button
          variant={mode === 'decode' ? 'default' : 'outline'}
          onClick={() => {
            setMode('decode')
            setInputText("")
          }}
          className="flex-1"
        >
          Decode from ASCII85
        </Button>
      </section>

      {/* Options */}
      {mode === 'encode' && (
        <section className="flex items-center gap-2">
          <input
            type="checkbox"
            id="include-delimiters"
            checked={includeDelimiters}
            onChange={(e) => setIncludeDelimiters(e.target.checked)}
            className="size-4 rounded border-gray-300"
          />
          <Label htmlFor="include-delimiters" className="text-sm font-normal cursor-pointer">
            Include delimiters (&lt;~ and ~&gt;)
          </Label>
        </section>
      )}

      {/* Input Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="input" className="text-base font-medium">
            {mode === 'encode' ? 'Plain Text' : 'ASCII85 Encoded'}
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
          placeholder={mode === 'encode' ? "Enter text to encode to ASCII85..." : "Enter ASCII85 encoded text..."}
        />
      </section>

      {/* Output */}
      {output && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {mode === 'encode' ? 'ASCII85 Output' : 'Decoded Text'}
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
              <span>Input length: <span className="font-medium text-foreground">{inputText.length} chars</span></span>
              <span>Output length: <span className="font-medium text-foreground">{output.length} chars</span></span>
              {mode === 'encode' && (
                <span>Ratio: <span className="font-medium text-foreground">{((output.length / inputText.length) * 100).toFixed(1)}%</span></span>
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
            <h4 className="text-sm font-medium">About ASCII85 (Base85)</h4>
            <p className="text-sm text-muted-foreground">
              ASCII85, also known as Base85, is an encoding scheme that converts binary 
              data to ASCII text. It encodes 4 bytes into 5 printable ASCII characters, 
              achieving about 25% size expansion (better than Base64's 33%).
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Uses 85 printable ASCII characters (33-117)</li>
              <li>4 bytes → 5 characters (25% expansion)</li>
              <li>Special 'z' character represents 4 zero bytes</li>
              <li>Used in PDF, PostScript, and Git</li>
              <li>Delimiters: &lt;~ and ~&gt; (Adobe format)</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Example:</strong> "Man" → 9jqo (Base85) vs TWFu (Base64)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

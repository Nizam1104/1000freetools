"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function XxencodeXxdecodeTool() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // XXencode alphabet (different from Uuencode)
  const xxAlphabet = "+-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  const encodeXxencode = useCallback((text: string): string => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    
    let result = ""
    
    let i = 0
    while (i < bytes.length) {
      const chunk = bytes.slice(i, i + 45)
      const length = chunk.length
      
      // Encode length character
      result += xxAlphabet[Math.ceil(length * 4 / 3)]
      
      // Encode 3 bytes at a time into 4 characters
      for (let j = 0; j < chunk.length; j += 3) {
        const b0 = chunk[j]
        const b1 = j + 1 < chunk.length ? chunk[j + 1] : 0
        const b2 = j + 2 < chunk.length ? chunk[j + 2] : 0
        
        result += xxAlphabet[b0 >> 2]
        result += xxAlphabet[((b0 & 0x03) << 4) | (b1 >> 4)]
        
        if (j + 1 < chunk.length) {
          result += xxAlphabet[((b1 & 0x0F) << 2) | (b2 >> 6)]
        }
        
        if (j + 2 < chunk.length) {
          result += xxAlphabet[b2 & 0x3F]
        }
      }
      
      result += '\n'
      i += 45
    }
    
    if (result.length === 0) {
      result = xxAlphabet[0] + '\n'
    }
    
    return result.trim()
  }, [])

  const decodeXxencode = useCallback((text: string): string => {
    const lines = text.split('\n').filter(line => line.trim().length > 0)
    let content = ""
    
    for (const line of lines) {
      if (line.length === 0) continue
      
      // Get length from first character
      const length = xxAlphabet.indexOf(line[0])
      if (length === -1 || length === 0) continue
      
      // Decode the rest of the line
      let decoded = ''
      for (let i = 1; i < line.length && decoded.length < length; i += 4) {
        const c0 = xxAlphabet.indexOf(line[i])
        const c1 = i + 1 < line.length ? xxAlphabet.indexOf(line[i + 1]) : 0
        const c2 = i + 2 < line.length ? xxAlphabet.indexOf(line[i + 2]) : 0
        const c3 = i + 3 < line.length ? xxAlphabet.indexOf(line[i + 3]) : 0
        
        if (c0 === -1) continue
        
        decoded += String.fromCharCode((c0 << 2) | (c1 >> 4))
        
        if (decoded.length < length && c1 !== -1) {
          decoded += String.fromCharCode(((c1 & 0x0F) << 4) | (c2 >> 2))
        }
        
        if (decoded.length < length && c2 !== -1) {
          decoded += String.fromCharCode(((c2 & 0x03) << 6) | c3)
        }
      }
      
      content += decoded
    }
    
    return content
  }, [])

  const handleEncode = useCallback(() => {
    try {
      setError(null)
      const result = encodeXxencode(input)
      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Encoding failed")
      setOutput("")
    }
  }, [input, encodeXxencode])

  const handleDecode = useCallback(() => {
    try {
      setError(null)
      const result = decodeXxencode(input)
      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid XXencode input")
      setOutput("")
    }
  }, [input, decodeXxencode])

  const handleCopy = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }, [])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setError(null)
  }, [])

  const handleSwap = useCallback(() => {
    setMode(mode === "encode" ? "decode" : "encode")
    setInput(output)
    setOutput(input)
    setError(null)
  }, [mode, input, output])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">XXencode/XXdecode Tool</h1>
        <p className="text-sm text-muted-foreground">
          Encode binary data to XXencode format and decode XXencoded data. An alternative to Uuencode with a different character set.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={mode === "encode" ? "default" : "outline"}
              onClick={() => setMode("encode")}
              className="text-sm"
            >
              XXencode
            </Button>
            <Button
              variant={mode === "decode" ? "default" : "outline"}
              onClick={() => setMode("decode")}
              className="text-sm"
            >
              XXdecode
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "encode" ? "Text to Encode" : "XXencoded Data"}
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Paste XXencoded data..."}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button
                onClick={mode === "encode" ? handleEncode : handleDecode}
                disabled={!input.trim()}
                className="flex-1"
              >
                {mode === "encode" ? "XXencode" : "XXdecode"}
              </Button>
              <Button
                variant="outline"
                onClick={handleSwap}
                disabled={!input && !output}
                title="Swap input and output"
              >
                ⇅
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleClear}
                disabled={!input && !output}
                title="Clear all"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="output">
              {mode === "encode" ? "XXencoded Output" : "Decoded Text"}
            </Label>
            <Textarea
              id="output"
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className={cn(
                "min-h-[200px] font-mono text-sm",
                error && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleCopy(output, "output")}
                disabled={!output}
                className="flex-1"
              >
                {copied === "output" ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">About XXencode</h3>
          <p className="text-sm text-muted-foreground">
            XXencode is a binary-to-text encoding scheme similar to Uuencode but uses a different 
            character set. It starts with + and - instead of space and !, making it more compatible 
            with systems that might interpret spaces specially. The alphabet is: 
            +-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz. 
            It's used for encoding binary files for email transmission and Usenet posts.
          </p>
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Base85Ascii85EncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [variant, setVariant] = useState<"adobe" | "rfc1924">("adobe")

  // Adobe Ascii85 alphabet
  const adobeAlphabet = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstu"
  // RFC 1924 alphabet
  const rfc1924Alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~"

  const encodeBase85 = useCallback((text: string, useRfc1924: boolean): string => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    const alphabet = useRfc1924 ? rfc1924Alphabet : adobeAlphabet
    
    let result = ""
    let i = 0

    while (i < bytes.length) {
      // Get 4 bytes (pad with zeros if needed)
      const b0 = i < bytes.length ? bytes[i] : 0
      const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0
      const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0
      const b3 = i + 3 < bytes.length ? bytes[i + 3] : 0

      // Combine into 32-bit number
      let value = (b0 << 24) | (b1 << 16) | (b2 << 8) | b3
      value >>>= 0 // Convert to unsigned

      // Special case: all zeros
      if (b0 === 0 && b1 === 0 && b2 === 0 && b3 === 0 && i + 4 <= bytes.length) {
        result += useRfc1924 ? '0' : 'z'
      } else {
        // Convert to 5 base-85 digits
        const digits: number[] = []
        for (let j = 0; j < 5; j++) {
          digits.unshift(value % 85)
          value = Math.floor(value / 85)
        }

        // Only output as many characters as we had input bytes
        const outputCount = Math.min(5, bytes.length - i + 1)
        for (let j = 0; j < outputCount; j++) {
          result += alphabet[digits[j]]
        }
      }

      i += 4
    }

    // Add Adobe delimiters if using Adobe variant
    if (useRfc1924 === false) {
      result = "<~" + result + "~>"
    }

    return result
  }, [])

  const decodeBase85 = useCallback((text: string, useRfc1924: boolean): string => {
    const alphabet = useRfc1924 ? rfc1924Alphabet : adobeAlphabet
    
    // Remove Adobe delimiters if present
    let cleanText = text.trim()
    if (!useRfc1924) {
      if (cleanText.startsWith("<~") && cleanText.endsWith("~>")) {
        cleanText = cleanText.slice(2, -2)
      }
    }

    // Remove whitespace
    cleanText = cleanText.replace(/\s/g, "")

    // Handle special 'z' character for Adobe
    cleanText = cleanText.replace(/z/g, '!!!!!')

    const bytes: number[] = []

    for (let i = 0; i < cleanText.length; i += 5) {
      const chunk = cleanText.slice(i, i + 5)
      
      // Convert from base-85
      let value = 0
      for (let j = 0; j < chunk.length; j++) {
        const charIndex = alphabet.indexOf(chunk[j])
        if (charIndex === -1) {
          throw new Error(`Invalid Base85 character: ${chunk[j]}`)
        }
        value = value * 85 + charIndex
      }

      // Pad with 'u' (last char in alphabet) if chunk is short
      for (let j = chunk.length; j < 5; j++) {
        value = value * 85 + (alphabet.length - 1)
      }

      // Extract 4 bytes
      const outputBytes = Math.min(4, Math.ceil((chunk.length * 8) / 8))
      for (let j = 3; j >= 0 && bytes.length < Math.ceil(cleanText.length * 4 / 5); j--) {
        if (j < outputBytes || chunk.length < 5) {
          bytes.unshift(value & 0xFF)
          value >>>= 8
        }
      }
    }

    const decoder = new TextDecoder()
    return decoder.decode(new Uint8Array(bytes))
  }, [])

  const handleEncode = useCallback(() => {
    try {
      setError(null)
      const result = encodeBase85(input, variant === "rfc1924")
      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Encoding failed")
      setOutput("")
    }
  }, [input, encodeBase85, variant])

  const handleDecode = useCallback(() => {
    try {
      setError(null)
      const result = decodeBase85(input, variant === "rfc1924")
      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid Base85 input")
      setOutput("")
    }
  }, [input, decodeBase85, variant])

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
        <h1 className="text-2xl font-semibold mb-2">Base85 (Ascii85) Encoder/Decoder</h1>
        <p className="text-sm text-muted-foreground">
          Encode data to Base85/Ascii85 format and decode Base85 strings. Used in PDF files and PostScript.
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
              Encode
            </Button>
            <Button
              variant={mode === "decode" ? "default" : "outline"}
              onClick={() => setMode("decode")}
              className="text-sm"
            >
              Decode
            </Button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Label htmlFor="variant" className="text-sm">Variant:</Label>
            <select
              id="variant"
              value={variant}
              onChange={(e) => setVariant(e.target.value as "adobe" | "rfc1924")}
              className="text-sm border rounded-md px-2 py-1 bg-background"
            >
              <option value="adobe">Adobe Ascii85</option>
              <option value="rfc1924">RFC 1924</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "encode" ? "Text to Encode" : "Base85 to Decode"}
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base85 string..."}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button
                onClick={mode === "encode" ? handleEncode : handleDecode}
                disabled={!input.trim()}
                className="flex-1"
              >
                {mode === "encode" ? "Encode" : "Decode"}
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
              {mode === "encode" ? "Base85 Output" : "Decoded Text"}
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
          <h3 className="text-sm font-medium mb-2">About Base85/Ascii85</h3>
          <p className="text-sm text-muted-foreground">
            Base85 (Ascii85) is a binary-to-text encoding that uses 85 ASCII characters. 
            It's more efficient than Base64, producing 25% smaller output. Adobe Ascii85 
            (used in PDF and PostScript) wraps output with &lt;~ and ~&gt; delimiters. 
            RFC 1924 is an alternative variant with a different character set.
          </p>
        </div>
      </div>
    </div>
  )
}

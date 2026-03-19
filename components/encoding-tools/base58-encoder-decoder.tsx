"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Base58 alphabet (Bitcoin)
const base58Alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
// Base58 alphabet (Flickr)
const base58FlickrAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"

export default function Base58EncoderDecoder() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [alphabet, setAlphabet] = useState<"bitcoin" | "flickr">("bitcoin")

  const encodeBase58 = useCallback((text: string, useBitcoin: boolean): string => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    const base58 = useBitcoin ? base58Alphabet : base58FlickrAlphabet
    
    // Count leading zeros
    let zeros = 0
    while (zeros < bytes.length && bytes[zeros] === 0) {
      zeros++
    }

    // Convert to big integer
    let value = BigInt(0)
    for (let i = 0; i < bytes.length; i++) {
      value = value * BigInt(256) + BigInt(bytes[i])
    }

    // Convert to Base58
    let result = ""
    while (value > BigInt(0)) {
      const remainder = value % BigInt(58)
      value = value / BigInt(58)
      result = base58[Number(remainder)] + result
    }

    // Add leading '1's for each leading zero byte
    const leadingChar = useBitcoin ? '1' : '1'
    result = leadingChar.repeat(zeros) + result

    return result
  }, [])

  const decodeBase58 = useCallback((text: string, useBitcoin: boolean): string => {
    const base58 = useBitcoin ? base58Alphabet : base58FlickrAlphabet
    
    // Validate input
    for (let i = 0; i < text.length; i++) {
      if (!base58.includes(text[i])) {
        throw new Error(`Invalid Base58 character: ${text[i]}`)
      }
    }

    // Count leading '1's
    let zeros = 0
    while (zeros < text.length && text[zeros] === '1') {
      zeros++
    }

    // Convert from Base58 to big integer
    let value = BigInt(0)
    for (let i = 0; i < text.length; i++) {
      value = value * BigInt(58) + BigInt(base58.indexOf(text[i]))
    }

    // Convert to bytes
    const bytes: number[] = []
    while (value > BigInt(0)) {
      bytes.unshift(Number(value % BigInt(256)))
      value = value / BigInt(256)
    }

    // Add leading zeros
    while (bytes.length < zeros) {
      bytes.unshift(0)
    }

    // Convert to string
    const decoder = new TextDecoder()
    return decoder.decode(new Uint8Array(bytes))
  }, [])

  const handleEncode = useCallback(() => {
    try {
      setError(null)
      const result = encodeBase58(input, alphabet === "bitcoin")
      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Encoding failed")
      setOutput("")
    }
  }, [input, encodeBase58, alphabet])

  const handleDecode = useCallback(() => {
    try {
      setError(null)
      const result = decodeBase58(input.replace(/\s/g, ""), alphabet === "bitcoin")
      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid Base58 input")
      setOutput("")
    }
  }, [input, decodeBase58, alphabet])

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
        <h1 className="text-2xl font-semibold mb-2">Base58 Encoder/Decoder</h1>
        <p className="text-sm text-muted-foreground">
          Encode data to Base58 format (used in Bitcoin addresses) and decode Base58 strings back to original data.
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
            <Label htmlFor="alphabet" className="text-sm">Alphabet:</Label>
            <select
              id="alphabet"
              value={alphabet}
              onChange={(e) => setAlphabet(e.target.value as "bitcoin" | "flickr")}
              className="text-sm border rounded-md px-2 py-1 bg-background"
            >
              <option value="bitcoin">Bitcoin</option>
              <option value="flickr">Flickr</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "encode" ? "Text to Encode" : "Base58 to Decode"}
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base58 string..."}
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
              {mode === "encode" ? "Base58 Output" : "Decoded Text"}
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
          <h3 className="text-sm font-medium mb-2">About Base58</h3>
          <p className="text-sm text-muted-foreground">
            Base58 is a binary-to-text encoding scheme used primarily in cryptocurrency addresses. 
            It uses 58 characters (alphanumeric excluding 0, O, I, and l to avoid confusion). 
            The Bitcoin alphabet starts with 1-9, while the Flickr alphabet has a different order.
            Base58 includes checksum validation for Bitcoin addresses to prevent typos.
          </p>
        </div>
      </div>
    </div>
  )
}
